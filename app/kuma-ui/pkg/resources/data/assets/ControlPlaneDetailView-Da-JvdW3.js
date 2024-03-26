import{d as C,l as b,a as m,o as l,b as p,w as e,e as a,f as n,t as c,p as t,k as T,z as K,m as r,E as x,A as N,c as k,F as S,J as $,q as L,_ as E}from"./index-CasyeFB_.js";import{A}from"./AppCollection-BOBuExbI.js";import{S as F}from"./StatusBadge-CzlKhvso.js";const J=C({__name:"MeshInsightsList",props:{items:{}},setup(w){const{t:s}=b(),d=w;return(f,z)=>{var u;const y=m("RouterLink");return l(),p(A,{headers:[{label:t(s)("meshes.components.mesh-insights-list.name"),key:"name"},{label:t(s)("meshes.components.mesh-insights-list.services"),key:"services"},{label:t(s)("meshes.components.mesh-insights-list.dataplanes"),key:"dataplanes"}],items:d.items,total:(u=d.items)==null?void 0:u.length,"empty-state-message":t(s)("common.emptyState.message",{type:t(s)("meshes.common.type",{count:2})}),"empty-state-cta-to":t(s)("meshes.href.docs"),"empty-state-cta-text":t(s)("common.documentation")},{name:e(({row:o})=>[a(y,{to:{name:"mesh-detail-view",params:{mesh:o.name}}},{default:e(()=>[n(c(o.name),1)]),_:2},1032,["to"])]),services:e(({row:o})=>[n(c(o.services.internal),1)]),dataplanes:e(({row:o})=>[n(c(o.dataplanesByType.standard.online)+" / "+c(o.dataplanesByType.standard.total),1)]),_:1},8,["headers","items","total","empty-state-message","empty-state-cta-to","empty-state-cta-text"])}}}),Z=C({__name:"ZoneControlPlanesList",props:{items:{}},setup(w){const{t:s}=b(),d=T(),f=w;return(z,y)=>{var o;const u=m("RouterLink");return l(),p(A,{headers:[{label:t(s)("zone-cps.components.zone-control-planes-list.name"),key:"name"},{label:t(s)("zone-cps.components.zone-control-planes-list.status"),key:"status"}],items:f.items,total:(o=f.items)==null?void 0:o.length,"empty-state-title":t(s)("zone-cps.empty_state.title"),"empty-state-message":t(d)("create zones")?t(s)("zone-cps.empty_state.message"):t(s)("common.emptyState.message",{type:"Zones"}),"empty-state-cta-to":t(d)("create zones")?{name:"zone-create-view"}:void 0,"empty-state-cta-text":t(s)("zones.index.create")},{name:e(({row:_})=>[a(u,{to:{name:"zone-cp-detail-view",params:{zone:_.name}}},{default:e(()=>[n(c(_.name),1)]),_:2},1032,["to"])]),status:e(({row:_})=>[a(F,{status:_.state},null,8,["status"])]),_:1},8,["headers","items","total","empty-state-title","empty-state-message","empty-state-cta-to","empty-state-cta-text"])}}}),q={key:2,class:"stack","data-testid":"detail-view-details"},I={class:"columns"},M={class:"card-header"},j={class:"card-title"},G={key:0,class:"card-actions"},H={class:"card-header"},O={class:"card-title"},Q=C({__name:"ControlPlaneDetailView",setup(w){const s=K();return(d,f)=>{const z=m("RouteTitle"),y=m("RouterLink"),u=m("KButton"),o=m("DataSource"),_=m("KCard"),D=m("AppView"),P=m("RouteView");return l(),p(P,{name:"home"},{default:e(({can:g,t:h})=>[a(D,null,{title:e(()=>[r("h1",null,[a(z,{title:h("main-overview.routes.item.title")},null,8,["title"])])]),default:e(()=>[n(),a(o,{src:"/global-insight"},{default:e(({data:B,error:R})=>[R?(l(),p(x,{key:0,error:R},null,8,["error"])):B===void 0?(l(),p(N,{key:1})):(l(),k("div",q,[a(t(s),{"can-use-zones":g("use zones"),"global-insight":B},null,8,["can-use-zones","global-insight"]),n(),r("div",I,[g("use zones")?(l(),p(_,{key:0},{default:e(()=>[a(o,{src:"/zone-cps?page=1&size=10"},{default:e(({data:i,error:v})=>{var V;return[v?(l(),p(x,{key:0,error:v},null,8,["error"])):(l(),k(S,{key:1},[r("div",M,[r("div",j,[r("h2",null,c(h("main-overview.detail.zone_control_planes.title")),1),n(),a(y,{to:{name:"zone-cp-list-view"}},{default:e(()=>[n(c(h("main-overview.detail.health.view_all")),1)]),_:2},1024)]),n(),g("create zones")&&(((V=i==null?void 0:i.items)==null?void 0:V.length)??!1)?(l(),k("div",G,[a(u,{appearance:"primary",to:{name:"zone-create-view"}},{default:e(()=>[a(t($)),n(" "+c(h("zones.index.create")),1)]),_:2},1024)])):L("",!0)]),n(),a(Z,{"data-testid":"zone-control-planes-details",items:i==null?void 0:i.items},null,8,["items"])],64))]}),_:2},1024)]),_:2},1024)):L("",!0),n(),a(_,null,{default:e(()=>[a(o,{src:"/mesh-insights?page=1&size=10"},{default:e(({data:i,error:v})=>[v?(l(),p(x,{key:0,error:v},null,8,["error"])):(l(),k(S,{key:1},[r("div",H,[r("div",O,[r("h2",null,c(h("main-overview.detail.meshes.title")),1),n(),a(y,{to:{name:"mesh-list-view"}},{default:e(()=>[n(c(h("main-overview.detail.health.view_all")),1)]),_:2},1024)])]),n(),a(J,{"data-testid":"meshes-details",items:i==null?void 0:i.items},null,8,["items"])],64))]),_:2},1024)]),_:2},1024)])]))]),_:2},1024)]),_:2},1024)]),_:1})}}}),Y=E(Q,[["__scopeId","data-v-dada6fed"]]);export{Y as default};