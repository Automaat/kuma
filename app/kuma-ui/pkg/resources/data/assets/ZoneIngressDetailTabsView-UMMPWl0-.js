import{d as R,l as V,R as x,a as s,o as n,b as l,w as t,q as u,e as o,m as k,f as g,F as C,C as T,c as h}from"./index-Eji0C-Q5.js";import{E as y}from"./ErrorBlock-tZ_qs6LA.js";import{_ as B}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-X5ne7YO2.js";import{N as I}from"./NavTabs-IrEuU4Ds.js";import{T as N}from"./TextWithCopyButton-CMioPVeB.js";import"./index-FZCiQto1.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-xZZ4Psen.js";import"./CopyButton-ULULAS88.js";const H=R({__name:"ZoneIngressDetailTabsView",setup(D){var _;const{t:a}=V(),w=(((_=x().getRoutes().find(e=>e.name==="zone-ingress-detail-tabs-view"))==null?void 0:_.children)??[]).map(e=>{var i,m;const p=typeof e.name>"u"?(i=e.children)==null?void 0:i[0]:e,r=p.name,d=((m=p.meta)==null?void 0:m.module)??"";return{title:a(`zone-ingresses.routes.item.navigation.${r}`),routeName:r,module:d}});return(e,p)=>{const r=s("RouteTitle"),d=s("RouterView"),f=s("DataSource"),i=s("AppView"),m=s("RouteView");return n(),l(m,{name:"zone-ingress-detail-tabs-view",params:{zone:"",zoneIngress:""}},{default:t(({route:c})=>[o(i,{breadcrumbs:[{to:{name:"zone-cp-list-view"},text:u(a)("zone-cps.routes.item.breadcrumbs")},{to:{name:"zone-ingress-list-view",params:{zone:c.params.zone}},text:u(a)("zone-ingresses.routes.item.breadcrumbs")}]},{title:t(()=>[k("h1",null,[o(N,{text:c.params.zoneIngress},{default:t(()=>[o(r,{title:u(a)("zone-ingresses.routes.item.title",{name:c.params.zoneIngress})},null,8,["title"])]),_:2},1032,["text"])])]),default:t(()=>[g(),o(f,{src:`/zone-ingress-overviews/${c.params.zoneIngress}`},{default:t(({data:b,error:z})=>[z!==void 0?(n(),l(y,{key:0,error:z},null,8,["error"])):b===void 0?(n(),l(B,{key:1})):(n(),h(C,{key:2},[o(I,{class:"route-zone-ingress-detail-view-tabs",tabs:u(w)},null,8,["tabs"]),g(),o(d,null,{default:t(v=>[(n(),l(T(v.Component),{data:b},null,8,["data"]))]),_:2},1024)],64))]),_:2},1032,["src"])]),_:2},1032,["breadcrumbs"])]),_:1})}}});export{H as default};