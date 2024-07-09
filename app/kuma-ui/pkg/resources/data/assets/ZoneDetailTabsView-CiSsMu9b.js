import{_ as O}from"./DeleteResourceModal.vue_vue_type_script_setup_true_lang-D78HWNht.js";import{d as I,O as Z,j as L,D as S,r as o,o as u,m as d,w as e,b as t,l as a,R as C,k as b,U as B,e as s,s as $,t as r,E as G,p as k,T as w}from"./index-DOjcqG3h.js";const j=I({__name:"ZoneDetailTabsView",setup(M){const x=Z(),{t:n}=L(),z=S([]),y=l=>{const p=[];l.zoneInsight.store==="memory"&&p.push({kind:"ZONE_STORE_TYPE_MEMORY",payload:{}}),w(l.zoneInsight,"version.kumaCp.kumaCpGlobalCompatible","true")||p.push({kind:"INCOMPATIBLE_ZONE_AND_GLOBAL_CPS_VERSIONS",payload:{zoneCpVersion:w(l.zoneInsight,"version.kumaCp.version",n("common.collection.none"))}}),z.value=p};async function T(l){await x.deleteZone({name:l})}return(l,p)=>{const v=o("RouteTitle"),f=o("XAction"),V=o("XTeleportTemplate"),h=o("XDisclosure"),A=o("XActionGroup"),D=o("XTabs"),g=o("RouterView"),R=o("AppView"),X=o("DataLoader"),N=o("RouteView");return u(),d(N,{name:"zone-cp-detail-tabs-view",params:{zone:""}},{default:e(({can:E,route:i})=>[t(X,{src:`/zone-cps/${i.params.zone}`,onChange:y},{default:e(({data:m})=>[m?(u(),d(R,{key:0,breadcrumbs:[{to:{name:"zone-cp-list-view"},text:a(n)("zone-cps.routes.item.breadcrumbs")}]},C({title:e(()=>[b("h1",null,[t(B,{text:i.params.zone},{default:e(()=>[t(v,{title:a(n)("zone-cps.routes.item.title",{name:i.params.zone})},null,8,["title"])]),_:2},1032,["text"])])]),default:e(()=>{var _;return[s(),s(),t(D,{selected:(_=i.child())==null?void 0:_.name},C({_:2},[$(i.children,({name:c})=>({name:`${c}-tab`,fn:e(()=>[t(f,{to:{name:c}},{default:e(()=>[s(r(a(n)(`zone-cps.routes.item.navigation.${c}`)),1)]),_:2},1032,["to"])])}))]),1032,["selected"]),s(),t(g,null,{default:e(c=>[(u(),d(G(c.Component),{data:m,notifications:z.value},null,8,["data","notifications"]))]),_:2},1024)]}),_:2},[E("create zones")?{name:"actions",fn:e(()=>[t(A,null,{control:e(()=>[t(f,{type:"expand",appearance:"primary"},{default:e(()=>[s(r(a(n)("zones.action_menu.toggle_button")),1)]),_:1})]),default:e(()=>[s(),t(h,null,{default:e(({expanded:_,toggle:c})=>[t(f,{appearance:"danger","data-testid":"delete-button",onClick:c},{default:e(()=>[s(r(a(n)("zones.action_menu.delete_button")),1)]),_:2},1032,["onClick"]),s(),t(V,{to:{name:"modal-layer"}},{default:e(()=>[_?(u(),d(O,{key:0,"confirmation-text":m.name,"delete-function":()=>T(m.name),"is-visible":"","action-button-text":a(n)("common.delete_modal.proceed_button"),title:a(n)("common.delete_modal.title",{type:"Zone"}),"data-testid":"delete-zone-modal",onCancel:c,onDelete:()=>i.replace({name:"zone-cp-list-view"})},{default:e(()=>[b("p",null,r(a(n)("common.delete_modal.text1",{type:"Zone",name:m.name})),1),s(),b("p",null,r(a(n)("common.delete_modal.text2")),1)]),_:2},1032,["confirmation-text","delete-function","action-button-text","title","onCancel","onDelete"])):k("",!0)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),key:"0"}:void 0]),1032,["breadcrumbs"])):k("",!0)]),_:2},1032,["src"])]),_:1})}}});export{j as default};