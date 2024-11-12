import{d as N,e as c,o as l,m,w as a,a as i,b as s,k,T as B,l as v,ak as P,p as y,t as o,J as z,aj as $,A as q,c as _,H as u,a1 as K,S as F,E as H,q as M}from"./index-COT-_p62.js";import{F as j}from"./FilterBar-Dq3XUXeG.js";import{S as G}from"./SummaryView-BaqCyaq5.js";const O=["innerHTML"],Z={key:0},J={key:1},U=N({__name:"DataPlaneListView",props:{mesh:{}},setup(w){const T=w;return(W,Q)=>{const b=c("RouteTitle"),g=c("XIcon"),C=c("XSelect"),f=c("XAction"),x=c("KTruncate"),S=c("XActionGroup"),V=c("RouterView"),L=c("DataCollection"),A=c("DataLoader"),D=c("KCard"),I=c("AppView"),E=c("RouteView");return l(),m(E,{name:"data-plane-list-view",params:{page:1,size:50,dataplaneType:"all",s:"",mesh:"",dataPlane:""}},{default:a(({can:h,route:t,t:p,me:r,uri:R})=>[i(b,{render:!1,title:p("data-planes.routes.items.title")},null,8,["title"]),s(),i(I,{docs:p("data-planes.href.docs.data_plane_proxy")},{default:a(()=>[k("div",{innerHTML:p("data-planes.routes.items.intro",{},{defaultMessage:""})},null,8,O),s(),i(D,null,{default:a(()=>[k("search",null,[i(j,{class:"data-plane-proxy-filter",placeholder:"service:backend",query:t.params.s,fields:{name:{description:"filter by name or parts of a name"},protocol:{description:"filter by “kuma.io/protocol” value"},service:{description:"filter by “kuma.io/service” value"},tag:{description:"filter by tags (e.g. “tag: version:2”)"},...h("use zones")&&{zone:{description:"filter by “kuma.io/zone” value"}}},onChange:n=>t.update({...Object.fromEntries(n.entries())})},null,8,["query","fields","onChange"]),s(),i(C,{label:"Type",selected:t.params.dataplaneType,onChange:n=>t.update({dataplaneType:n})},B({selected:a(({item:n})=>[n!=="all"?(l(),m(g,{key:0,size:v(P),name:n},null,8,["size","name"])):y("",!0),s(" "+o(p(`data-planes.type.${n}`)),1)]),_:2},[z(["all","standard","builtin","delegated"],n=>({name:`${n}-option`,fn:a(()=>[n!=="all"?(l(),m(g,{key:0,name:n},null,8,["name"])):y("",!0),s(" "+o(p(`data-planes.type.${n}`)),1)])}))]),1032,["selected","onChange"])]),s(),i(A,{src:R(v($),"/meshes/:mesh/dataplanes/of/:type",{mesh:t.params.mesh,type:t.params.dataplaneType},{page:t.params.page,size:t.params.size,search:t.params.s})},{loadable:a(({data:n})=>[i(L,{type:"data-planes",items:(n==null?void 0:n.items)??[void 0],total:n==null?void 0:n.total,page:t.params.page,"page-size":t.params.size,onChange:t.update},{default:a(()=>[i(q,{class:"data-plane-collection","data-testid":"data-plane-collection",headers:[{...r.get("headers.type"),label:" ",key:"type"},{...r.get("headers.name"),label:"Name",key:"name"},{...r.get("headers.namespace"),label:"Namespace",key:"namespace"},...h("use zones")?[{...r.get("headers.zone"),label:"Zone",key:"zone"}]:[],...h("use service-insights",T.mesh)?[{...r.get("headers.services"),label:"Services",key:"services"}]:[],{...r.get("headers.certificate"),label:"Certificate Info",key:"certificate"},{...r.get("headers.status"),label:"Status",key:"status"},{...r.get("headers.warnings"),label:"Warnings",key:"warnings",hideLabel:!0},{...r.get("headers.actions"),label:"Actions",key:"actions",hideLabel:!0}],items:n==null?void 0:n.items,"is-selected-row":e=>e.name===t.params.dataPlane,onResize:r.set},{type:a(({row:e})=>[i(g,{name:e.dataplaneType},{default:a(()=>[s(o(p(`data-planes.type.${e.dataplaneType}`)),1)]),_:2},1032,["name"])]),name:a(({row:e})=>[i(f,{"data-action":"",class:"name-link",title:e.name,to:{name:"data-plane-summary-view",params:{mesh:e.mesh,dataPlane:e.id},query:{page:t.params.page,size:t.params.size,s:t.params.s,dataplaneType:t.params.dataplaneType}}},{default:a(()=>[s(o(e.name),1)]),_:2},1032,["title","to"])]),namespace:a(({row:e})=>[s(o(e.namespace),1)]),services:a(({row:e})=>[e.services.length>0?(l(),m(x,{key:0,width:"auto"},{default:a(()=>[(l(!0),_(u,null,z(e.services,(d,X)=>(l(),_("div",{key:X},[i(K,{text:d},{default:a(()=>[e.dataplaneType==="standard"?(l(),m(f,{key:0,to:{name:"service-detail-view",params:{service:d}}},{default:a(()=>[s(o(d),1)]),_:2},1032,["to"])):e.dataplaneType==="delegated"?(l(),m(f,{key:1,to:{name:"delegated-gateway-detail-view",params:{service:d}}},{default:a(()=>[s(o(d),1)]),_:2},1032,["to"])):(l(),_(u,{key:2},[s(o(d),1)],64))]),_:2},1032,["text"])]))),128))]),_:2},1024)):(l(),_(u,{key:1},[s(o(p("common.collection.none")),1)],64))]),zone:a(({row:e})=>[e.zone?(l(),m(f,{key:0,to:{name:"zone-cp-detail-view",params:{zone:e.zone}}},{default:a(()=>[s(o(e.zone),1)]),_:2},1032,["to"])):(l(),_(u,{key:1},[s(o(p("common.collection.none")),1)],64))]),certificate:a(({row:e})=>{var d;return[(d=e.dataplaneInsight.mTLS)!=null&&d.certificateExpirationTime?(l(),_(u,{key:0},[s(o(p("common.formats.datetime",{value:Date.parse(e.dataplaneInsight.mTLS.certificateExpirationTime)})),1)],64)):(l(),_(u,{key:1},[s(o(p("data-planes.components.data-plane-list.certificate.none")),1)],64))]}),status:a(({row:e})=>[i(F,{status:e.status},null,8,["status"])]),warnings:a(({row:e})=>[e.isCertExpired||e.warnings.length>0?(l(),m(g,{key:0,class:"mr-1",name:"warning"},{default:a(()=>[k("ul",null,[e.warnings.length>0?(l(),_("li",Z,o(p("data-planes.components.data-plane-list.version_mismatch")),1)):y("",!0),s(),e.isCertExpired?(l(),_("li",J,o(p("data-planes.components.data-plane-list.cert_expired")),1)):y("",!0)])]),_:2},1024)):(l(),_(u,{key:1},[s(o(p("common.collection.none")),1)],64))]),actions:a(({row:e})=>[i(S,null,{default:a(()=>[i(f,{to:{name:"data-plane-detail-view",params:{dataPlane:e.id}}},{default:a(()=>[s(o(p("common.collection.actions.view")),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["headers","items","is-selected-row","onResize"]),s(),i(V,null,{default:a(({Component:e})=>[t.child()?(l(),m(G,{key:0,onClose:d=>t.replace({name:t.name,params:{mesh:t.params.mesh},query:{page:t.params.page,size:t.params.size,s:t.params.s}})},{default:a(()=>[typeof n<"u"?(l(),m(H(e),{key:0,items:n.items},null,8,["items"])):y("",!0)]),_:2},1032,["onClose"])):y("",!0)]),_:2},1024)]),_:2},1032,["items","total","page","page-size","onChange"])]),_:2},1032,["src"])]),_:2},1024)]),_:2},1032,["docs"])]),_:1})}}}),te=M(U,[["__scopeId","data-v-d396f3c0"]]);export{te as default};