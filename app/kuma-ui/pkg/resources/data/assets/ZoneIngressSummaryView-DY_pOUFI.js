import{d as x,e as l,o as a,m as i,w as e,a as r,k as c,t as n,b as t,c as m,H as u,J as S,Y as p,S as v,p as A,a1 as _,q as C}from"./index-wlZh7JTj.js";const b={class:"stack-with-borders"},R=x({__name:"ZoneIngressSummaryView",props:{items:{}},setup(y){const g=y;return(B,D)=>{const k=l("XEmptyState"),z=l("RouteTitle"),h=l("RouterLink"),f=l("AppView"),I=l("DataCollection"),w=l("RouteView");return a(),i(w,{name:"zone-ingress-summary-view",params:{zoneIngress:""}},{default:e(({route:V,t:o})=>[r(I,{items:g.items,predicate:d=>d.id===V.params.zoneIngress,find:!0},{empty:e(()=>[r(k,null,{title:e(()=>[c("h2",null,n(o("common.collection.summary.empty_title",{type:"ZoneIngress"})),1)]),default:e(()=>[t(),c("p",null,n(o("common.collection.summary.empty_message",{type:"ZoneIngress"})),1)]),_:2},1024)]),default:e(({items:d})=>[(a(!0),m(u,null,S([d[0]],s=>(a(),i(f,{key:s.id},{title:e(()=>[c("h2",null,[r(h,{to:{name:"zone-ingress-detail-view",params:{zone:s.zoneIngress.zone,zoneIngress:s.id}}},{default:e(()=>[r(z,{title:o("zone-ingresses.routes.item.title",{name:s.name})},null,8,["title"])]),_:2},1032,["to"])])]),default:e(()=>[t(),c("div",b,[r(p,{layout:"horizontal"},{title:e(()=>[t(n(o("http.api.property.status")),1)]),body:e(()=>[r(v,{status:s.state},null,8,["status"])]),_:2},1024),t(),s.namespace.length>0?(a(),i(p,{key:0,layout:"horizontal"},{title:e(()=>[t(n(o("data-planes.routes.item.namespace")),1)]),body:e(()=>[t(n(s.namespace),1)]),_:2},1024)):A("",!0),t(),r(p,{layout:"horizontal"},{title:e(()=>[t(n(o("http.api.property.address")),1)]),body:e(()=>[s.zoneIngress.socketAddress.length>0?(a(),i(_,{key:0,text:s.zoneIngress.socketAddress},null,8,["text"])):(a(),m(u,{key:1},[t(n(o("common.detail.none")),1)],64))]),_:2},1024),t(),r(p,{layout:"horizontal"},{title:e(()=>[t(n(o("http.api.property.advertisedAddress")),1)]),body:e(()=>[s.zoneIngress.advertisedSocketAddress.length>0?(a(),i(_,{key:0,text:s.zoneIngress.advertisedSocketAddress},null,8,["text"])):(a(),m(u,{key:1},[t(n(o("common.detail.none")),1)],64))]),_:2},1024)])]),_:2},1024))),128))]),_:2},1032,["items","predicate"])]),_:1})}}}),Z=C(R,[["__scopeId","data-v-20c06e1f"]]);export{Z as default};
