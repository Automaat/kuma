import{d as $,r as m,m as y,o as p,w as e,b as t,e as a,q as k,p as _,L as v,t as n,c as u,F as f,v as X,s as A,an as K,C as R,R as B,O as j,S as G,K as M,_ as J}from"./index-D_WxlpfD.js";import{F as W}from"./FilterBar-mhZSb4tq.js";import{S as Z}from"./SummaryView-AYz_OLVZ.js";const H={key:0},Q={key:1},U=$({__name:"MeshServiceDetailView",props:{data:{}},setup(D){const d=D;return(Y,o)=>{const h=m("XBadge"),z=m("XAction"),L=m("KumaPort"),N=m("XAboutCard"),E=m("XCopyButton"),b=m("XLayout"),S=m("DataCollection"),V=m("DataLoader"),w=m("XCard"),C=m("XIcon"),I=m("XActionGroup"),P=m("RouterView"),q=m("AppView"),F=m("RouteView");return p(),y(F,{name:"mesh-service-detail-view",params:{mesh:"",service:"",page:1,size:Number,s:"",proxy:"",codeSearch:"",codeFilter:!1,codeRegExp:!1}},{default:e(({can:x,route:r,t:l,uri:T,me:c})=>[t(q,null,{default:e(()=>[t(b,{type:"stack"},{default:e(()=>[t(N,{title:l("services.mesh-service.about.title"),created:d.data.creationTime,modified:d.data.modificationTime},{default:e(()=>[t(v,{layout:"horizontal"},{title:e(()=>[a(n(l("http.api.property.state")),1)]),body:e(()=>[t(h,{appearance:d.data.spec.state==="Available"?"success":"danger"},{default:e(()=>[a(n(d.data.spec.state),1)]),_:1},8,["appearance"])]),_:2},1024),o[5]||(o[5]=a()),d.data.namespace.length>0?(p(),y(v,{key:0,layout:"horizontal"},{title:e(()=>[a(n(l("http.api.property.namespace")),1)]),body:e(()=>[t(h,{appearance:"decorative"},{default:e(()=>[a(n(d.data.namespace),1)]),_:1})]),_:2},1024)):_("",!0),o[6]||(o[6]=a()),x("use zones")&&d.data.zone?(p(),y(v,{key:1,layout:"horizontal"},{title:e(()=>[a(n(l("http.api.property.zone")),1)]),body:e(()=>[t(h,{appearance:"decorative"},{default:e(()=>[t(z,{to:{name:"zone-cp-detail-view",params:{zone:d.data.zone}}},{default:e(()=>[a(n(d.data.zone),1)]),_:1},8,["to"])]),_:1})]),_:2},1024)):_("",!0),o[7]||(o[7]=a()),t(v,{layout:"horizontal"},{title:e(()=>[a(n(l("http.api.property.ports")),1)]),body:e(()=>[d.data.spec.ports.length?(p(!0),u(f,{key:0},X(d.data.spec.ports,i=>(p(),y(L,{key:i.port,port:{...i,targetPort:void 0}},null,8,["port"]))),128)):(p(),u(f,{key:1},[a(n(l("common.detail.none")),1)],64))]),_:2},1024),o[8]||(o[8]=a()),t(v,{layout:"horizontal"},{title:e(()=>[a(n(l("http.api.property.selector")),1)]),body:e(()=>[Object.keys(d.data.spec.selector.dataplaneTags).length?(p(!0),u(f,{key:0},X(d.data.spec.selector.dataplaneTags,(i,s)=>(p(),y(h,{key:`${s}:${i}`,appearance:"info"},{default:e(()=>[a(n(s)+":"+n(i),1)]),_:2},1024))),128)):(p(),u(f,{key:1},[a(n(l("common.detail.none")),1)],64))]),_:2},1024)]),_:2},1032,["title","created","modified"]),o[25]||(o[25]=a()),t(w,null,{title:e(()=>[a(n(l("services.detail.hostnames.title")),1)]),default:e(()=>[o[10]||(o[10]=a()),t(V,{src:T(A(K),"/meshes/:mesh/:serviceType/:serviceName/_hostnames",{mesh:r.params.mesh,serviceType:"meshservices",serviceName:r.params.service})},{loadable:e(({data:i})=>[t(S,{type:"hostnames",items:(i==null?void 0:i.items)??[void 0]},{default:e(()=>[t(R,{type:"hostnames-collection","data-testid":"hostnames-collection",items:i==null?void 0:i.items,headers:[{...c.get("headers.hostname"),label:l("services.detail.hostnames.hostname"),key:"hostname"},{...c.get("headers.zones"),label:l("services.detail.hostnames.zone"),key:"zones"}],onResize:c.set},{hostname:e(({row:s})=>[k("b",null,[t(E,{text:s.hostname},null,8,["text"])])]),zones:e(({row:s})=>[t(b,{type:"separated"},{default:e(()=>[(p(!0),u(f,null,X(s.zones,(g,O)=>(p(),y(h,{key:O,appearance:"decorative"},{default:e(()=>[t(z,{to:{name:"zone-cp-detail-view",params:{zone:g.name}}},{default:e(()=>[a(n(g.name),1)]),_:2},1032,["to"])]),_:2},1024))),128))]),_:2},1024)]),_:2},1032,["items","headers","onResize"])]),_:2},1032,["items"])]),_:2},1032,["src"])]),_:2},1024),o[26]||(o[26]=a()),t(w,null,{title:e(()=>[a(n(l("services.detail.dpp-status.title")),1)]),default:e(()=>[o[14]||(o[14]=a()),t(b,{type:"columns",class:"columns-with-borders"},{default:e(()=>[t(B,{total:d.data.status.dataplaneProxies.total,online:d.data.status.dataplaneProxies.connected,"data-testid":"connected-dpps"},{icon:e(()=>[t(C,{name:"connected"})]),title:e(()=>[a(n(l("services.detail.dpp-status.connected")),1)]),_:2},1032,["total","online"]),o[13]||(o[13]=a()),t(B,{total:d.data.status.dataplaneProxies.healthy,"data-testid":"healthy-dpps"},{icon:e(()=>[t(C,{name:"health"})]),title:e(()=>[a(n(l("services.detail.dpp-status.healthy")),1)]),_:2},1032,["total"])]),_:2},1024)]),_:2},1024),o[27]||(o[27]=a()),k("div",null,[t(w,{class:"mt-4"},{title:e(()=>[a(n(l("services.detail.data_plane_proxies")),1)]),default:e(()=>[o[23]||(o[23]=a()),k("search",null,[t(W,{class:"data-plane-proxy-filter",placeholder:"name:dataplane-name",query:r.params.s,fields:{name:{description:"filter by name or parts of a name"},protocol:{description:"filter by “kuma.io/protocol” value"},tag:{description:"filter by tags (e.g. “tag: version:2”)"}},onChange:i=>r.update({page:1,...Object.fromEntries(i.entries())})},null,8,["query","onChange"])]),o[24]||(o[24]=a()),t(V,{src:T(A(j),"/meshes/:mesh/dataplanes/for/mesh-service/:tags",{mesh:r.params.mesh,tags:JSON.stringify({...x("use zones")&&d.data.zone?{"kuma.io/zone":d.data.zone}:{},...d.data.spec.selector.dataplaneTags})},{page:r.params.page,size:r.params.size,search:r.params.s})},{loadable:e(({data:i})=>[t(S,{type:"data-planes",items:(i==null?void 0:i.items)??[void 0],page:r.params.page,"page-size":r.params.size,total:i==null?void 0:i.total,onChange:r.update},{default:e(()=>[t(R,{class:"data-plane-collection","data-testid":"data-plane-collection",headers:[{...c.get("headers.name"),label:"Name",key:"name"},{...c.get("headers.namespace"),label:"Namespace",key:"namespace"},...x("use zones")?[{...c.get("headers.zone"),label:"Zone",key:"zone"}]:[],{...c.get("headers.certificate"),label:"Certificate Info",key:"certificate"},{...c.get("headers.status"),label:"Status",key:"status"},{...c.get("headers.warnings"),label:"Warnings",key:"warnings",hideLabel:!0},{...c.get("headers.actions"),label:"Actions",key:"actions",hideLabel:!0}],items:i==null?void 0:i.items,"is-selected-row":s=>s.name===r.params.proxy,onResize:c.set},{name:e(({row:s})=>[t(z,{class:"name-link",to:{name:"mesh-service-data-plane-summary-view",params:{mesh:s.mesh,proxy:s.id},query:{page:r.params.page,size:r.params.size,s:r.params.s}},"data-action":""},{default:e(()=>[a(n(s.name),1)]),_:2},1032,["to"])]),namespace:e(({row:s})=>[a(n(s.namespace),1)]),zone:e(({row:s})=>[s.zone?(p(),y(z,{key:0,to:{name:"zone-cp-detail-view",params:{zone:s.zone}}},{default:e(()=>[a(n(s.zone),1)]),_:2},1032,["to"])):(p(),u(f,{key:1},[a(n(l("common.collection.none")),1)],64))]),certificate:e(({row:s})=>{var g;return[(g=s.dataplaneInsight.mTLS)!=null&&g.certificateExpirationTime?(p(),u(f,{key:0},[a(n(l("common.formats.datetime",{value:Date.parse(s.dataplaneInsight.mTLS.certificateExpirationTime)})),1)],64)):(p(),u(f,{key:1},[a(n(l("data-planes.components.data-plane-list.certificate.none")),1)],64))]}),status:e(({row:s})=>[t(G,{status:s.status},null,8,["status"])]),warnings:e(({row:s})=>[s.isCertExpired||s.warnings.length>0?(p(),y(C,{key:0,class:"mr-1",name:"warning"},{default:e(()=>[k("ul",null,[s.warnings.length>0?(p(),u("li",H,n(l("data-planes.components.data-plane-list.version_mismatch")),1)):_("",!0),o[15]||(o[15]=a()),s.isCertExpired?(p(),u("li",Q,n(l("data-planes.components.data-plane-list.cert_expired")),1)):_("",!0)])]),_:2},1024)):(p(),u(f,{key:1},[a(n(l("common.collection.none")),1)],64))]),actions:e(({row:s})=>[t(I,null,{default:e(()=>[t(z,{to:{name:"data-plane-detail-view",params:{proxy:s.id}}},{default:e(()=>[a(n(l("common.collection.actions.view")),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["headers","items","is-selected-row","onResize"]),o[22]||(o[22]=a()),r.params.proxy?(p(),y(P,{key:0},{default:e(s=>[t(Z,{onClose:g=>r.replace({name:r.name,params:{mesh:r.params.mesh},query:{page:r.params.page,size:r.params.size,s:r.params.s}})},{default:e(()=>[typeof i<"u"?(p(),y(M(s.Component),{key:0,items:i.items},null,8,["items"])):_("",!0)]),_:2},1032,["onClose"])]),_:2},1024)):_("",!0)]),_:2},1032,["items","page","page-size","total","onChange"])]),_:2},1032,["src"])]),_:2},1024)])]),_:2},1024)]),_:2},1024)]),_:1})}}}),se=J(U,[["__scopeId","data-v-2b07add0"]]);export{se as default};
