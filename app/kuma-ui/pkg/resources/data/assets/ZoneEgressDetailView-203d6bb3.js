import{d as y,a as l,o,b as g,w as e,e as t,p,a0 as f,f as n,t as i,q as V,c as d,F as c,J as z,v as C}from"./index-d015481a.js";import{S as E}from"./StatusBadge-ed77f93c.js";import{T as v}from"./TextWithCopyButton-b83bb297.js";import{_ as x}from"./SubscriptionList.vue_vue_type_script_setup_true_lang-faa926a7.js";import{g as B}from"./dataplane-7a46b268.js";import"./CopyButton-7634543f.js";import"./index-52545d1d.js";import"./AccordionList-cad8a61c.js";const b={class:"stack","data-testid":"detail-view-details"},I={class:"columns"},N={key:0},L=y({__name:"ZoneEgressDetailView",props:{data:{}},setup(h){const s=h;return(S,D)=>{const m=l("KCard"),w=l("AppView"),k=l("RouteView");return o(),g(k,{name:"zone-egress-detail-view"},{default:e(({t:r})=>[t(w,null,{default:e(()=>{var u;return[p("div",b,[t(m,null,{default:e(()=>[p("div",I,[t(f,null,{title:e(()=>[n(i(r("http.api.property.status")),1)]),body:e(()=>[t(E,{status:V(B)(s.data.zoneEgressInsight)},null,8,["status"])]),_:2},1024),n(),t(f,null,{title:e(()=>[n(i(r("http.api.property.address")),1)]),body:e(()=>{var a,_;return[(a=s.data.zoneEgress.networking)!=null&&a.address&&((_=s.data.zoneEgress.networking)!=null&&_.port)?(o(),g(v,{key:0,text:`${s.data.zoneEgress.networking.address}:${s.data.zoneEgress.networking.port}`},null,8,["text"])):(o(),d(c,{key:1},[n(i(r("common.detail.none")),1)],64))]}),_:2},1024)])]),_:2},1024),n(),(o(!0),d(c,null,z([((u=s.data.zoneEgressInsight)==null?void 0:u.subscriptions)??[]],a=>(o(),d(c,{key:a},[a.length>0?(o(),d("div",N,[p("h2",null,i(r("zone-egresses.routes.item.subscriptions.title")),1),n(),t(m,{class:"mt-4"},{default:e(()=>[t(x,{subscriptions:a},null,8,["subscriptions"])]),_:2},1024)])):C("",!0)],64))),128))])]}),_:2},1024)]),_:1})}}});export{L as default};