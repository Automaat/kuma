import{K as x}from"./index-fce48c05.js";import{d as A,k as I,o as u,c as D,e as g,l as o,a6 as B,f as c,m as K,r as v,t as p,_ as L,N as q,z as r,H as E,a7 as w,b as h,W as N,w as l,P as V,A as W,C as j,a8 as H,a9 as U}from"./index-78599b4f.js";import{_ as F}from"./EmptyBlock.vue_vue_type_script_setup_true_lang-2e4ee74c.js";const X=["href"],Z=A({__name:"DocumentationLink",props:{href:{}},setup(_){const{t:m}=I(),f=_;return(e,S)=>(u(),D("a",{class:"docs-link",href:f.href,target:"_blank"},[g(o(B),{size:o(x),title:o(m)("common.documentation")},null,8,["size","title"]),c(),K("span",null,[v(e.$slots,"default",{},()=>[c(p(o(m)("common.documentation")),1)],!0)])],8,X))}});const G=L(Z,[["__scopeId","data-v-1e7645ce"]]),J={key:0,class:"app-collection-toolbar"},z=5,Q=A({__name:"AppCollection",props:{isSelectedRow:{type:[Function,null],default:null},total:{default:0},pageNumber:{default:1},pageSize:{default:30},items:{},headers:{},error:{default:void 0},emptyStateTitle:{default:void 0},emptyStateMessage:{default:void 0},emptyStateCtaTo:{default:void 0},emptyStateCtaText:{default:void 0}},emits:["change"],setup(_,{emit:m}){const{t:f}=I(),e=_,S=m,M=q(),k=r(e.items),C=r(0),b=r(0),y=r(e.pageNumber),T=r(e.pageSize),O=E(()=>{const t=e.headers.filter(a=>["details","warnings","actions"].includes(a.key));if(t.length>4)return"initial";const s=100-t.length*z,n=e.headers.length-t.length;return`calc(${s}% / ${n})`});w(()=>e.items,(t,s)=>{t!==s&&(C.value++,k.value=e.items)}),w(()=>e.pageNumber,function(){e.pageNumber!==y.value&&b.value++});function P(t){if(!t)return{};const s={};return e.isSelectedRow!==null&&e.isSelectedRow(t)&&(s.class="is-selected"),s}const R=t=>{const s=t.target.closest("tr");if(s){const n=s.querySelector("a");n!==null&&n.click()}};return(t,s)=>{var n;return u(),h(o(U),{key:b.value,class:"app-collection",style:H(`--column-width: ${O.value}; --special-column-width: ${z}%;`),"has-error":typeof e.error<"u","pagination-total-items":e.total,"initial-fetcher-params":{page:e.pageNumber,pageSize:e.pageSize},headers:e.headers,"fetcher-cache-key":String(C.value),fetcher:({page:a,pageSize:i,query:$})=>{const d={};return y.value!==a&&(d.page=a),T.value!==i&&(d.size=i),y.value=a,T.value=i,Object.keys(d).length>0&&S("change",d),{data:k.value}},"cell-attrs":({headerKey:a})=>({class:`${a}-column`}),"row-attrs":P,"disable-sorting":"","hide-pagination-when-optional":"","onRow:click":R},N({_:2},[((n=e.items)==null?void 0:n.length)===0?{name:"empty-state",fn:l(()=>[g(F,null,N({default:l(()=>[c(p(e.emptyStateTitle??o(f)("common.emptyState.title"))+" ",1),c()]),_:2},[e.emptyStateMessage?{name:"message",fn:l(()=>[c(p(e.emptyStateMessage),1)]),key:"0"}:void 0,e.emptyStateCtaTo?{name:"cta",fn:l(()=>[typeof e.emptyStateCtaTo=="string"?(u(),h(G,{key:0,href:e.emptyStateCtaTo},{default:l(()=>[c(p(e.emptyStateCtaText),1)]),_:1},8,["href"])):(u(),h(o(V),{key:1,appearance:"primary",to:e.emptyStateCtaTo},{default:l(()=>[g(o(W),{size:o(x)},null,8,["size"]),c(" "+p(e.emptyStateCtaText),1)]),_:1},8,["to"]))]),key:"1"}:void 0]),1024)]),key:"0"}:void 0,j(Object.keys(o(M)),a=>({name:a,fn:l(({row:i,rowValue:$})=>[a==="toolbar"?(u(),D("div",J,[v(t.$slots,"toolbar",{},void 0,!0)])):v(t.$slots,a,{key:1,row:i,rowValue:$},void 0,!0)])}))]),1032,["style","has-error","pagination-total-items","initial-fetcher-params","headers","fetcher-cache-key","fetcher","cell-attrs"])}}});const ae=L(Q,[["__scopeId","data-v-06f2a961"]]);export{ae as A,G as D};