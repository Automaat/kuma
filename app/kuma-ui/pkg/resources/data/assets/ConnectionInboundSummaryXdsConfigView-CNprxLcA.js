import{d as h,r as o,o as C,m as R,w as a,b as s,e as c,p as b,ab as w,t as T}from"./index-suKzKgYa.js";const S=h({__name:"ConnectionInboundSummaryXdsConfigView",props:{data:{},routeName:{}},setup(i){const t=i;return(V,r)=>{const d=o("RouteTitle"),m=o("XAction"),l=o("XCodeBlock"),u=o("DataLoader"),g=o("AppView"),_=o("RouteView");return C(),R(_,{params:{codeSearch:"",codeFilter:!1,codeRegExp:!1,proxyType:"",mesh:"",proxy:"",connection:""},name:t.routeName},{default:a(({t:p,route:e,uri:f})=>[s(d,{render:!1,title:p("connections.routes.item.navigation.xds")},null,8,["title"]),r[0]||(r[0]=c()),s(g,null,{default:a(()=>[s(u,{src:f(b(w),"/connections/xds/for/:proxyType/:name/:mesh/inbound/:inbound",{mesh:e.params.mesh||"*",name:e.params.proxy,inbound:`${t.data.port}`,proxyType:{ingresses:"zone-ingress",egresses:"zone-egress"}[e.params.proxyType]??"dataplane"})},{default:a(({data:x,refresh:y})=>[s(l,{language:"json",code:JSON.stringify(x,null,2),"is-searchable":"",query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter,"is-reg-exp-mode":e.params.codeRegExp,onQueryChange:n=>e.update({codeSearch:n}),onFilterModeChange:n=>e.update({codeFilter:n}),onRegExpModeChange:n=>e.update({codeRegExp:n})},{"primary-actions":a(()=>[s(m,{action:"refresh",appearance:"primary",onClick:y},{default:a(()=>[c(T(p("common.refresh")),1)]),_:2},1032,["onClick"])]),_:2},1032,["code","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]),_:2},1032,["src"])]),_:2},1024)]),_:1},8,["name"])}}});export{S as default};
