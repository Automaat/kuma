import{d as k,a as r,o as n,b as d,w as e,T as l,t as i,f as t,e as s,F as m,c as p,m as c,p as y}from"./index-Eji0C-Q5.js";import{S as b}from"./StatusBadge-3mjZmol0.js";import{T as _}from"./TextWithCopyButton-CMioPVeB.js";import{_ as v}from"./SubscriptionList.vue_vue_type_script_setup_true_lang-LWv7E6Qs.js";import"./CopyButton-ULULAS88.js";import"./index-FZCiQto1.js";import"./AccordionList-N9ZW6Ric.js";const w={class:"stack","data-testid":"detail-view-details"},x={class:"columns"},z={key:0,"data-testid":"zone-ingress-subscriptions"},F=k({__name:"ZoneIngressDetailView",props:{data:{}},setup(g){const o=g;return(I,V)=>{const u=r("KCard"),h=r("AppView"),f=r("RouteView");return n(),d(f,{name:"zone-ingress-detail-view"},{default:e(({t:a})=>[s(h,null,{default:e(()=>[c("div",w,[s(u,null,{default:e(()=>[c("div",x,[s(l,null,{title:e(()=>[t(i(a("http.api.property.status")),1)]),body:e(()=>[s(b,{status:o.data.state},null,8,["status"])]),_:2},1024),t(),s(l,null,{title:e(()=>[t(i(a("http.api.property.address")),1)]),body:e(()=>[o.data.zoneIngress.socketAddress.length>0?(n(),d(_,{key:0,text:o.data.zoneIngress.socketAddress},null,8,["text"])):(n(),p(m,{key:1},[t(i(a("common.detail.none")),1)],64))]),_:2},1024),t(),s(l,null,{title:e(()=>[t(i(a("http.api.property.advertisedAddress")),1)]),body:e(()=>[o.data.zoneIngress.advertisedSocketAddress.length>0?(n(),d(_,{key:0,text:o.data.zoneIngress.advertisedSocketAddress},null,8,["text"])):(n(),p(m,{key:1},[t(i(a("common.detail.none")),1)],64))]),_:2},1024)])]),_:2},1024),t(),o.data.zoneIngressInsight.subscriptions.length>0?(n(),p("div",z,[c("h2",null,i(a("zone-ingresses.routes.item.subscriptions.title")),1),t(),s(u,{class:"mt-4"},{default:e(()=>[s(v,{subscriptions:o.data.zoneIngressInsight.subscriptions},null,8,["subscriptions"])]),_:1})])):y("",!0)])]),_:2},1024)]),_:1})}}});export{F as default};