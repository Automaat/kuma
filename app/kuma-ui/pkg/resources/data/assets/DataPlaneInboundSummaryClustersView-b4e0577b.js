import{K as C}from"./index-fce48c05.js";import{d as b,a as t,o as n,b as r,w as s,e as o,m as c,f as l,c as y,l as m,a0 as x,_ as v}from"./index-8b41e05d.js";import{_ as w}from"./CodeBlock.vue_vue_type_style_index_0_lang-d5972669.js";import{E as R}from"./ErrorBlock-8cc33bf1.js";import{_ as S}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-98865510.js";import"./uniqueId-90cc9b93.js";import"./TextWithCopyButton-88c3bd13.js";import"./CopyButton-3b3b21ab.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-ee25e124.js";const V={key:2},k={class:"toolbar"},E=b({__name:"DataPlaneInboundSummaryClustersView",setup(B){return(I,$)=>{const d=t("RouteTitle"),_=t("KButton"),u=t("DataSource"),f=t("AppView"),h=t("RouteView");return n(),r(h,{params:{codeSearch:"",codeFilter:!1,codeRegExp:!1,mesh:"",dataPlane:"",service:""},name:"data-plane-inbound-summary-clusters-view"},{default:s(({route:e})=>[o(f,null,{title:s(()=>[c("h3",null,[o(d,{title:"Clusters"})])]),default:s(()=>[l(),c("div",null,[o(u,{src:`/meshes/${e.params.mesh}/dataplanes/${e.params.dataPlane}/data-path/clusters`},{default:s(({data:i,error:p,refresh:g})=>[p?(n(),r(R,{key:0,error:p},null,8,["error"])):i===void 0?(n(),r(S,{key:1})):(n(),y("div",V,[c("div",k,[o(_,{appearance:"primary",onClick:g},{default:s(()=>[o(m(x),{size:m(C)},null,8,["size"]),l(`
                  Refresh
                `)]),_:2},1032,["onClick"])]),l(),o(w,{language:"json",code:`${i.split(`
`).filter(a=>a.startsWith(`localhost:${e.params.service}::`)).join(`
`)}`,"is-searchable":"",query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter,"is-reg-exp-mode":e.params.codeRegExp,onQueryChange:a=>e.update({codeSearch:a}),onFilterModeChange:a=>e.update({codeFilter:a}),onRegExpModeChange:a=>e.update({codeRegExp:a})},null,8,["code","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]))]),_:2},1032,["src"])])]),_:2},1024)]),_:1})}}});const z=v(E,[["__scopeId","data-v-33abbbb9"]]);export{z as default};
