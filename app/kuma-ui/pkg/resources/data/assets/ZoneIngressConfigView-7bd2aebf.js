import{E as f}from"./ErrorBlock-fb329d86.js";import{_ as h}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-aa1d93c7.js";import{_ as C}from"./ResourceCodeBlock.vue_vue_type_style_index_0_lang-0253b275.js";import{d as x,u as w,a as n,o as s,b as a,w as r,e as t,p as R,f as k,q as y}from"./index-6d2dc803.js";import"./index-52545d1d.js";import"./TextWithCopyButton-75a4d2e9.js";import"./CopyButton-ac094203.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-f556fed5.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-d187b12c.js";import"./toYaml-4e00099e.js";const N=x({__name:"ZoneIngressConfigView",setup(z){const p=w();return(V,E)=>{const m=n("RouteTitle"),l=n("DataSource"),d=n("KCard"),u=n("AppView"),g=n("RouteView");return s(),a(g,{name:"zone-ingress-config-view",params:{zoneIngress:"",codeSearch:"",codeFilter:!1,codeRegExp:!1}},{default:r(({route:e,t:_})=>[t(u,null,{title:r(()=>[R("h2",null,[t(m,{title:_("zone-ingresses.routes.item.navigation.zone-ingress-config-view")},null,8,["title"])])]),default:r(()=>[k(),t(d,null,{body:r(()=>[t(l,{src:`/zone-ingresses/${e.params.zoneIngress}`},{default:r(({data:i,error:c})=>[c!==void 0?(s(),a(f,{key:0,error:c},null,8,["error"])):i===void 0?(s(),a(h,{key:1})):(s(),a(C,{key:2,id:"code-block-zone-ingress",resource:i,"resource-fetcher":o=>y(p).getZoneIngress({name:e.params.zoneIngress},o),"is-searchable":"",query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter==="true","is-reg-exp-mode":e.params.codeRegExp==="true",onQueryChange:o=>e.update({codeSearch:o}),onFilterModeChange:o=>e.update({codeFilter:o}),onRegExpModeChange:o=>e.update({codeRegExp:o})},null,8,["resource","resource-fetcher","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"]))]),_:2},1032,["src"])]),_:2},1024)]),_:2},1024)]),_:1})}}});export{N as default};