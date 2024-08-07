package config

import (
	"bytes"
	"context"
	"fmt"
	"os/exec"
	"runtime"

	"github.com/containernetworking/plugins/pkg/ns"
	"github.com/pkg/errors"
	"golang.org/x/sys/unix"

	. "github.com/kumahq/kuma/pkg/transparentproxy/iptables/consts"
)

func mount(src string, dest string, flags uintptr) error {
	if err := unix.Mount(src, dest, "", flags, ""); err != nil {
		return errors.Wrapf(err, "failed to mount %s to %s", src, dest)
	}

	return nil
}

func setupSandbox(netns ns.NetNS, needLock bool) error {
	// Unshare the current process's mount namespace to isolate it from other processes
	if err := unix.Unshare(unix.CLONE_NEWNS); err != nil {
		return errors.Wrap(err, "failed to unshare mount namespace")
	}

	if err := netns.Set(); err != nil {
		return fmt.Errorf("failed to reset network namespace: %v", err)
	}

	// Remount the root filesystem as a private mount. This ensures that any mounts
	// we perform do not affect the global namespace
	// More info: https://unix.stackexchange.com/questions/246312/why-is-my-bind-mount-visible-outside-its-mount-namespace
	if err := mount("", "/", unix.MS_PRIVATE|unix.MS_REC); err != nil {
		return errors.Wrap(err, "failed to remount root filesystem as private")
	}

	if needLock {
		// The abbility to change the xtables lock path using the XTABLES_LOCKFILE
		// environment variable was introduced in iptables-legacy version 1.8.6.
		// However, it is safe to mount /run/xtables.lock even when XTABLES_LOCKFILE
		// is set, as the path specified by XTABLES_LOCKFILE will take precedence
		// over /run/xtables.lock
		if err := mount(netns.Path(), PathLegacyXtablesLock, unix.MS_BIND|unix.MS_RDONLY); err != nil {
			return err
		}
	}

	// Bind mount /dev/null over /etc/nsswitch.conf to prevent NSS from making network calls
	// in the partially initialized network namespace. This prevents issues with iptables
	// which might use the `xt_owner` module that can trigger the `passwd` service lookup
	// More info: https://github.com/kumahq/kuma/issues/11038
	if err := mount(PathDevNull, PathNSSwitchConf, unix.MS_BIND|unix.MS_RDONLY); err != nil {
		return err
	}

	return nil
}

// runInSandbox sets up a lightweight sandbox ("container") to create an appropriate environment
// for running iptables commands. This is particularly useful in CNI, where commands are executed
// from the host but within the container's network namespace
func runInSandbox(l Logger, needLock bool, c *exec.Cmd) error {
	var executed bool
	chErr := make(chan error, 1)

	n, nerr := ns.GetCurrentNS()
	if nerr != nil {
		return errors.Wrap(nerr, "failed to get current network namespace")
	}

	if needLock {
		// The ability to change the xtables lock path using the XTABLES_LOCKFILE environment
		// variable was introduced in iptables-legacy version 1.8.6. However, it is safe to
		// set this environment variable without checking the version, as earlier versions
		// will simply ignore it
		c.Env = append(
			c.Env,
			fmt.Sprintf("%s=%s", EnvVarXtablesLockfile, n.Path()),
		)
	}

	// Once unshare(CLONE_NEWNS) is called, it cannot be undone explicitly.
	// Therefore, we must perform the unshare operation on a specific thread.
	// When we are done, we rely on the Go runtime to terminate the thread.
	// However, creating a new thread breaks out of the previously entered network namespace,
	// so we must also ensure that the network namespace is restored
	go func() {
		chErr <- func() error {
			// Lock the current goroutine to the OS thread to ensure namespace isolation.
			// Note: Do not call UnlockOSThread!
			runtime.LockOSThread()

			if err := setupSandbox(n, needLock); err != nil {
				return err
			}

			// Mark that the command has been executed to distinguish between
			// setupSandbox() and fn() errors
			executed = true

			// Execute the provided function within the sandbox
			return c.Run()
		}()
	}()

	err := <-chErr

	if err != nil && !executed {
		// If setting up the environment fails, continue in a best-effort approach
		// to handle environments with restrictive access controls
		l.Warnf("failed to set up the sandbox environment. This may be due to restrictive access controls (e.g., SELinux). Attempting to continue without the sandbox: %v", err)

		return c.Run()
	}

	return err
}

func execCmd(
	ctx context.Context,
	l Logger,
	cniMode bool,
	needLock bool,
	path string,
	args ...string,
) (*bytes.Buffer, *bytes.Buffer, error) {
	var stdout bytes.Buffer
	var stderr bytes.Buffer
	// #nosec G204
	cmd := exec.CommandContext(ctx, path, args...)
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	run := func(c *exec.Cmd) error { return c.Run() }

	if cniMode {
		run = func(c *exec.Cmd) error { return runInSandbox(l, needLock, c) }
	}

	if err := run(cmd); err != nil {
		return nil, nil, handleRunError(err, &stderr)
	}

	return &stdout, &stderr, nil
}
