import{d as $,r as i,o,m as y,w as a,b as p,e as s,s as v,T as F,p as z,ah as G,q as g,t as l,v as C,a9 as K,C as O,c as u,F as _,S as P,K as Z,_ as j}from"./index-suKzKgYa.js";import{F as U}from"./FilterBar-BpGE94sv.js";import{S as W}from"./SummaryView-Dm5BXWGC.js";const H={key:0},J={key:1},M=$({__name:"DataPlaneListView",props:{mesh:{}},setup(b){const w=b;return(Q,m)=>{const T=i("RouteTitle"),x=i("XI18n"),h=i("XIcon"),X=i("XSelect"),f=i("XAction"),S=i("XCopyButton"),V=i("XLayout"),I=i("XActionGroup"),L=i("RouterView"),D=i("DataCollection"),A=i("DataLoader"),B=i("XCard"),N=i("AppView"),R=i("RouteView");return o(),y(R,{name:"data-plane-list-view",params:{page:1,size:Number,dataplaneType:"all",s:"",mesh:"",proxy:""}},{default:a(({can:k,route:t,t:r,me:c,uri:E})=>[p(T,{render:!1,title:r("data-planes.routes.items.title")},null,8,["title"]),m[14]||(m[14]=s()),p(N,{docs:r("data-planes.href.docs.data_plane_proxy")},{default:a(()=>[p(x,{path:"data-planes.routes.items.intro","default-path":"common.i18n.ignore-error"}),m[13]||(m[13]=s()),p(B,null,{default:a(()=>[v("search",null,[p(U,{class:"data-plane-proxy-filter",placeholder:"service:backend",query:t.params.s,fields:{name:{description:"filter by name or parts of a name"},protocol:{description:"filter by “kuma.io/protocol” value"},service:{description:"filter by “kuma.io/service” value"},tag:{description:"filter by tags (e.g. “tag: version:2”)"},...k("use zones")&&{zone:{description:"filter by “kuma.io/zone” value"}}},onChange:n=>t.update({page:1,...Object.fromEntries(n.entries())})},null,8,["query","fields","onChange"]),m[1]||(m[1]=s()),p(X,{label:"Type",selected:t.params.dataplaneType,onChange:n=>t.update({page:1,dataplaneType:n})},F({selected:a(({item:n})=>[n!=="all"?(o(),y(h,{key:0,size:z(G),name:n},null,8,["size","name"])):g("",!0),s(" "+l(r(`data-planes.type.${n}`)),1)]),_:2},[C(["all","standard","builtin","delegated"],n=>({name:`${n}-option`,fn:a(()=>[n!=="all"?(o(),y(h,{key:0,name:n},null,8,["name"])):g("",!0),s(" "+l(r(`data-planes.type.${n}`)),1)])}))]),1032,["selected","onChange"])]),m[12]||(m[12]=s()),p(A,{src:E(z(K),"/meshes/:mesh/dataplanes/of/:type",{mesh:t.params.mesh,type:t.params.dataplaneType},{page:t.params.page,size:t.params.size,search:t.params.s})},{loadable:a(({data:n})=>[p(D,{type:"data-planes",items:(n==null?void 0:n.items)??[void 0],total:n==null?void 0:n.total,page:t.params.page,"page-size":t.params.size,onChange:t.update},{default:a(()=>[p(O,{class:"data-plane-collection","data-testid":"data-plane-collection",headers:[{...c.get("headers.type"),label:" ",key:"type"},{...c.get("headers.name"),label:"Name",key:"name"},{...c.get("headers.namespace"),label:"Namespace",key:"namespace"},...k("use zones")?[{...c.get("headers.zone"),label:"Zone",key:"zone"}]:[],...k("use service-insights",w.mesh)?[{...c.get("headers.services"),label:"Services",key:"services"}]:[],{...c.get("headers.certificate"),label:"Certificate Info",key:"certificate"},{...c.get("headers.status"),label:"Status",key:"status"},{...c.get("headers.warnings"),label:"Warnings",key:"warnings",hideLabel:!0},{...c.get("headers.actions"),label:"Actions",key:"actions",hideLabel:!0}],items:n==null?void 0:n.items,"is-selected-row":e=>e.name===t.params.proxy,onResize:c.set},{type:a(({row:e})=>[p(h,{name:e.dataplaneType},{default:a(()=>[s(l(r(`data-planes.type.${e.dataplaneType}`)),1)]),_:2},1032,["name"])]),name:a(({row:e})=>[p(f,{"data-action":"",class:"name-link",title:e.name,to:{name:"data-plane-summary-view",params:{mesh:e.mesh,proxy:e.id},query:{page:t.params.page,size:t.params.size,s:t.params.s,dataplaneType:t.params.dataplaneType}}},{default:a(()=>[s(l(e.name),1)]),_:2},1032,["title","to"])]),namespace:a(({row:e})=>[s(l(e.namespace),1)]),services:a(({row:e})=>[e.services.length>0?(o(),y(V,{key:0,type:"separated",truncate:""},{default:a(()=>[(o(!0),u(_,null,C(e.services,(d,q)=>(o(),u("div",{key:q},[p(S,{text:d},{default:a(()=>[e.dataplaneType==="standard"?(o(),y(f,{key:0,to:{name:"service-detail-view",params:{service:d}}},{default:a(()=>[s(l(d),1)]),_:2},1032,["to"])):e.dataplaneType==="delegated"?(o(),y(f,{key:1,to:{name:"delegated-gateway-detail-view",params:{service:d}}},{default:a(()=>[s(l(d),1)]),_:2},1032,["to"])):(o(),u(_,{key:2},[s(l(d),1)],64))]),_:2},1032,["text"])]))),128))]),_:2},1024)):(o(),u(_,{key:1},[s(l(r("common.collection.none")),1)],64))]),zone:a(({row:e})=>[e.zone?(o(),y(f,{key:0,to:{name:"zone-cp-detail-view",params:{zone:e.zone}}},{default:a(()=>[s(l(e.zone),1)]),_:2},1032,["to"])):(o(),u(_,{key:1},[s(l(r("common.collection.none")),1)],64))]),certificate:a(({row:e})=>{var d;return[(d=e.dataplaneInsight.mTLS)!=null&&d.certificateExpirationTime?(o(),u(_,{key:0},[s(l(r("common.formats.datetime",{value:Date.parse(e.dataplaneInsight.mTLS.certificateExpirationTime)})),1)],64)):(o(),u(_,{key:1},[s(l(r("data-planes.components.data-plane-list.certificate.none")),1)],64))]}),status:a(({row:e})=>[p(P,{status:e.status},null,8,["status"])]),warnings:a(({row:e})=>[e.isCertExpired||e.warnings.length>0?(o(),y(h,{key:0,class:"mr-1",name:"warning"},{default:a(()=>[v("ul",null,[e.warnings.length>0?(o(),u("li",H,l(r("data-planes.components.data-plane-list.version_mismatch")),1)):g("",!0),m[2]||(m[2]=s()),e.isCertExpired?(o(),u("li",J,l(r("data-planes.components.data-plane-list.cert_expired")),1)):g("",!0)])]),_:2},1024)):(o(),u(_,{key:1},[s(l(r("common.collection.none")),1)],64))]),actions:a(({row:e})=>[p(I,null,{default:a(()=>[p(f,{to:{name:"data-plane-detail-view",params:{proxy:e.id}}},{default:a(()=>[s(l(r("common.collection.actions.view")),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["headers","items","is-selected-row","onResize"]),m[11]||(m[11]=s()),p(L,null,{default:a(({Component:e})=>[t.child()?(o(),y(W,{key:0,onClose:d=>t.replace({name:t.name,params:{mesh:t.params.mesh},query:{page:t.params.page,size:t.params.size,s:t.params.s}})},{default:a(()=>[typeof n<"u"?(o(),y(Z(e),{key:0,items:n.items},null,8,["items"])):g("",!0)]),_:2},1032,["onClose"])):g("",!0)]),_:2},1024)]),_:2},1032,["items","total","page","page-size","onChange"])]),_:2},1032,["src"])]),_:2},1024)]),_:2},1032,["docs"])]),_:1})}}}),te=j(M,[["__scopeId","data-v-21435c81"]]);export{te as default};
