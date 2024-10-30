import{d as P,e as p,o as c,m,w as e,a as n,k as y,X as u,b as a,t as l,p as r,c as k,l as N,ao as X,A as B,H as x,E as L}from"./index-CgC5RQPZ.js";import{S}from"./SummaryView-CQgHCBGu.js";const E={class:"columns"},G={key:0},K=y("h3",null,`
          Affected Data Plane Proxies
        `,-1),M=P({__name:"PolicyDetailView",props:{data:{}},setup(w){const s=w;return(T,Z)=>{const _=p("XAction"),f=p("XBadge"),g=p("KCard"),C=p("XActionGroup"),b=p("RouterView"),v=p("DataCollection"),V=p("DataLoader"),R=p("AppView"),A=p("RouteView");return c(),m(A,{name:"policy-detail-view",params:{page:1,size:50,s:"",mesh:"",policy:"",policyPath:"",dataPlane:""}},{default:e(({route:t,t:h,uri:D,can:z,me:d})=>[n(R,null,{default:e(()=>[n(g,null,{default:e(()=>[y("div",E,[n(u,null,{title:e(()=>[a(`
              Type
            `)]),body:e(()=>[a(l(s.data.type),1)]),_:1}),a(),s.data.namespace.length>0?(c(),m(u,{key:0},{title:e(()=>[a(`
              Namespace
            `)]),body:e(()=>[a(l(s.data.namespace),1)]),_:1})):r("",!0),a(),z("use zones")&&s.data.zone?(c(),m(u,{key:1},{title:e(()=>[a(`
              Zone
            `)]),body:e(()=>[n(_,{to:{name:"zone-cp-detail-view",params:{zone:s.data.zone}}},{default:e(()=>[a(l(s.data.zone),1)]),_:1},8,["to"])]),_:1})):r("",!0),a(),s.data.spec?(c(),m(u,{key:2},{title:e(()=>[a(l(h("http.api.property.targetRef")),1)]),body:e(()=>[s.data.spec.targetRef?(c(),m(f,{key:0,appearance:"neutral"},{default:e(()=>[a(l(s.data.spec.targetRef.kind),1),s.data.spec.targetRef.name?(c(),k("span",G,[a(":"),y("b",null,l(s.data.spec.targetRef.name),1)])):r("",!0)]),_:1})):(c(),m(f,{key:1,appearance:"neutral"},{default:e(()=>[a(`
                Mesh
              `)]),_:1}))]),_:2},1024)):r("",!0)])]),_:2},1024),a(),y("div",null,[K,a(),n(g,{class:"mt-4"},{default:e(()=>[n(V,{src:D(N(X),"/meshes/:mesh/policy-path/:path/policy/:name/dataplanes",{mesh:t.params.mesh,path:t.params.policyPath,name:t.params.policy},{page:t.params.page,size:t.params.size})},{loadable:e(({data:i})=>[n(v,{type:"data-planes",items:(i==null?void 0:i.items)??[void 0],page:t.params.page,"page-size":t.params.size,total:i==null?void 0:i.total,onChange:t.update},{default:e(()=>[n(B,{headers:[{...d.get("headers.name"),label:"Name",key:"name"},{...d.get("headers.namespace"),label:"Namespace",key:"namespace"},...z("use zones")?[{...d.get("headers.zone"),label:"Zone",key:"zone"}]:[],{...d.get("headers.actions"),label:"Actions",key:"actions",hideLabel:!0}],items:i==null?void 0:i.items,"is-selected-row":o=>o.id===t.params.dataPlane,onResize:d.set},{name:e(({row:o})=>[n(_,{"data-action":"",to:{name:"data-plane-detail-view",params:{dataPlane:o.id}}},{default:e(()=>[a(l(o.name),1)]),_:2},1032,["to"])]),namespace:e(({row:o})=>[a(l(o.namespace),1)]),zone:e(({row:o})=>[o.zone?(c(),m(_,{key:0,to:{name:"zone-cp-detail-view",params:{zone:o.zone}}},{default:e(()=>[a(l(o.zone),1)]),_:2},1032,["to"])):(c(),k(x,{key:1},[a(l(h("common.collection.none")),1)],64))]),actions:e(({row:o})=>[n(C,null,{default:e(()=>[n(_,{to:{name:"data-plane-detail-view",params:{dataPlane:o.id}}},{default:e(()=>[a(l(h("common.collection.actions.view")),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["headers","items","is-selected-row","onResize"]),a(),n(b,null,{default:e(({Component:o})=>[t.child()?(c(),m(S,{key:0,onClose:q=>t.replace({params:{mesh:t.params.mesh},query:{page:t.params.page,size:t.params.size,s:t.params.s}})},{default:e(()=>[typeof i<"u"?(c(),m(L(o),{key:0,items:i.items},null,8,["items"])):r("",!0)]),_:2},1032,["onClose"])):r("",!0)]),_:2},1024)]),_:2},1032,["items","page","page-size","total","onChange"])]),_:2},1032,["src"])]),_:2},1024)])]),_:2},1024)]),_:1})}}});export{M as default};
