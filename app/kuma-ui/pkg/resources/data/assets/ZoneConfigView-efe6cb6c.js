import{_ as C}from"./CodeBlock.vue_vue_type_style_index_0_lang-c05e0113.js";import{d as V,r as o,o as n,g as p,w as t,h as d,a8 as v,m,l as c,j as r,F as _,D as g,C as N}from"./index-47bd6918.js";const S=["data-testid","innerHTML"],A=V({__name:"ZoneConfigView",props:{data:{},notifications:{default:()=>[]}},setup(k){const l=k;function y(f){var s;const i=((s=f.zoneInsight)==null?void 0:s.subscriptions)??[];if(i.length>0){const a=i[i.length-1];if(a.config)return JSON.stringify(JSON.parse(a.config),null,2)}return null}return(f,i)=>{const s=o("RouteTitle"),a=o("KAlert"),h=o("KCard"),w=o("AppView"),b=o("RouteView");return n(),p(b,{name:"zone-cp-config-view",params:{zone:""}},{default:t(({t:u})=>[d(w,null,v({title:t(()=>[m("h2",null,[d(s,{title:u("zone-cps.routes.item.navigation.zone-cp-config-view"),render:!0},null,8,["title"])])]),default:t(()=>[c(),c(),d(h,{class:"mt-4"},{body:t(()=>[(n(!0),r(_,null,g([y(l.data)],(e,z)=>(n(),r(_,{key:z},[e!==null?(n(),p(C,{key:0,id:"code-block-zone-config",language:"json",code:e,"is-searchable":"","query-key":"zone-config"},null,8,["code"])):(n(),p(a,{key:1,class:"mt-4","data-testid":"warning-no-subscriptions",appearance:"warning"},{alertMessage:t(()=>[c(N(u("zone-cps.detail.no_subscriptions")),1)]),_:2},1024))],64))),128))]),_:2},1024)]),_:2},[l.notifications.length>0?{name:"notifications",fn:t(()=>[m("ul",null,[(n(!0),r(_,null,g(l.notifications,e=>(n(),r("li",{key:e.kind,"data-testid":`warning-${e.kind}`,innerHTML:u(`common.warnings.${e.kind}`,e.payload)},null,8,S))),128)),c()])]),key:"0"}:void 0]),1024)]),_:1})}}});export{A as default};