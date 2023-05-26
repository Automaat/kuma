var Fe=Object.defineProperty;var Ke=(e,n,t)=>n in e?Fe(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var W=(e,n,t)=>(Ke(e,typeof n!="symbol"?n+"":n,t),t);import{d as re,r as O,c as A,v as G,o as c,j as y,i as m,h as i,g as C,e as L,A as Me,U as Pe,V as ze,t as P,y as Te,F as z,q as j,f as M,k as Re,Q as je,p as ue,m as de,D as Ae,W as Ce,B as Ee,E as qe,x as Be,b as R,w as S,N as De,H as He,I as Qe,X as Ge,Y as Ye,K as Ze,L as Je,Z as We,M as Xe,C as Se,_ as et}from"./index-8d80a271.js";import{c as X,z as tt,b as at,e as nt,_ as st}from"./kongponents.es-176426e1.js";import{C as lt}from"./ContentWrapper-4cbb9347.js";import{D as ot}from"./DataOverview-bfa57785.js";import{_ as it}from"./EmptyBlock.vue_vue_type_script_setup_true_lang-92154385.js";import{_ as ce}from"./_plugin-vue_export-helper-c27b6911.js";import{a as B,D as ie}from"./DefinitionListItem-56ada3b3.js";import{_ as rt}from"./ResourceCodeBlock.vue_vue_type_script_setup_true_lang-d548267a.js";import{S as ut}from"./StatusBadge-4b1e7b88.js";import{T as dt}from"./TagList-b39ced52.js";import{T as ct}from"./TextWithCopyButton-40f68948.js";import{u as pt,b as ft}from"./index-4917657d.js";import{u as mt}from"./store-5737c223.js";import{d as vt}from"./datadogLogEvents-302eea7b.js";import{Q as H}from"./QueryParameter-70743f73.js";const xe=[{key:"status",label:"Status"},{key:"entity",label:"Name"},{key:"type",label:"Type"},{key:"service",label:"Service"},{key:"protocol",label:"Protocol"},{key:"zone",label:"Zone"},{key:"lastConnected",label:"Last Connected"},{key:"lastUpdated",label:"Last Updated"},{key:"totalUpdates",label:"Total Updates"},{key:"dpVersion",label:"Kuma DP version"},{key:"envoyVersion",label:"Envoy version"}],gt=["entity"],yt=xe.filter(e=>!gt.includes(e.key)).map(e=>({tableHeaderKey:e.key,label:e.label,isChecked:!1})),Ie=["status","entity","type","service","protocol","zone","lastUpdated","dpVersion"];function ht(e,n=Ie){return xe.filter(t=>n.includes(t.key)?e?!0:t.key!=="zone":!1)}function _t(e,n,t){return Math.max(n,Math.min(e,t))}const bt=["ControlLeft","ControlRight","ShiftLeft","ShiftRight","AltLeft"];class kt{constructor(n,t){W(this,"commands");W(this,"keyMap");W(this,"boundTriggerShortcuts");this.commands=t,this.keyMap=Object.fromEntries(Object.entries(n).map(([T,r])=>[T.toLowerCase(),r])),this.boundTriggerShortcuts=this.triggerShortcuts.bind(this)}registerListener(){document.addEventListener("keydown",this.boundTriggerShortcuts)}unRegisterListener(){document.removeEventListener("keydown",this.boundTriggerShortcuts)}triggerShortcuts(n){wt(n,this.keyMap,this.commands)}}function wt(e,n,t){const T=Tt(e.code),r=[e.ctrlKey?"ctrl":"",e.shiftKey?"shift":"",e.altKey?"alt":"",T].filter(h=>h!=="").join("+"),u=n[r];if(!u)return;const p=t[u];p.isAllowedContext&&!p.isAllowedContext(e)||(p.shouldPreventDefaultAction&&e.preventDefault(),!(p.isDisabled&&p.isDisabled())&&p.trigger(e))}function Tt(e){return bt.includes(e)?"":e.replace(/^Key/,"").toLowerCase()}function Ct(e,n){const t=" "+e,T=t.matchAll(/ ([-\s\w]+):\s*/g),r=[];for(const u of Array.from(T)){if(u.index===void 0)continue;const p=Dt(u[1]);if(n.length>0&&!n.includes(p))throw new Error(`Unknown field “${p}”. Known fields: ${n.join(", ")}`);const h=u.index+u[0].length,D=t.substring(h);let _;if(/^\s*["']/.test(D)){const d=D.match(/['"](.*?)['"]/);if(d!==null)_=d[1];else throw new Error(`Quote mismatch for field “${p}”.`)}else{const d=D.indexOf(" "),b=d===-1?D.length:d;_=D.substring(0,b)}_!==""&&r.push([p,_])}return r}function Dt(e){return e.trim().replace(/\s+/g,"-").replace(/-[a-z]/g,(n,t)=>t===0?n:n.substring(1).toUpperCase())}const Oe=e=>(ue("data-v-2fcde9ea"),e=e(),de(),e),St=Oe(()=>m("span",{class:"visually-hidden"},"Focus filter",-1)),Pt=["for"],At=["id","placeholder"],Et={key:0,class:"k-suggestion-box","data-testid":"k-filter-bar-suggestion-box"},xt={class:"k-suggestion-list"},It={key:0,class:"k-filter-bar-error"},Ot={key:0},Ut=["title","data-filter-field"],Vt={class:"visually-hidden"},Nt=Oe(()=>m("span",{class:"visually-hidden"},"Clear query",-1)),$t=re({__name:"KFilterBar",props:{id:{type:String,required:!0},fields:{type:Object,required:!0},placeholder:{type:String,required:!1,default:null},query:{type:String,required:!1,default:""}},emits:["fields-change"],setup(e,{emit:n}){const t=e,T=O(null),r=O(null),u=O(t.query),p=O([]),h=O(null),D=O(!1),_=O(-1),N=A(()=>Object.keys(t.fields)),d=A(()=>Object.entries(t.fields).slice(0,5).map(([a,l])=>({fieldName:a,...l}))),b=A(()=>N.value.length>0?`Filter by ${N.value.join(", ")}`:"Filter"),k=A(()=>t.placeholder??b.value);G(()=>p.value,function(a,l){x(a,l)||(h.value=null,n("fields-change",{fields:a,query:u.value}))}),G(()=>u.value,function(){u.value===""&&(h.value=null),D.value=!0});const w={Enter:"submitQuery",Escape:"closeSuggestionBox",ArrowDown:"jumpToNextSuggestion",ArrowUp:"jumpToPreviousSuggestion"},g={submitQuery:{trigger:E,isAllowedContext(a){return r.value!==null&&a.composedPath().includes(r.value)},shouldPreventDefaultAction:!0},jumpToNextSuggestion:{trigger:V,isAllowedContext(a){return r.value!==null&&a.composedPath().includes(r.value)},shouldPreventDefaultAction:!0},jumpToPreviousSuggestion:{trigger:ee,isAllowedContext(a){return r.value!==null&&a.composedPath().includes(r.value)},shouldPreventDefaultAction:!0},closeSuggestionBox:{trigger:s,isAllowedContext(a){return T.value!==null&&a.composedPath().includes(T.value)}}};function F(){const a=new kt(w,g);Re(function(){a.registerListener()}),je(function(){a.unRegisterListener()}),o(u.value)}F();function U(a){const l=a.target;o(l.value)}function E(){if(r.value instanceof HTMLInputElement)if(_.value===-1)o(r.value.value),D.value=!1;else{const a=d.value[_.value].fieldName;a&&Q(r.value,a)}}function V(){Y(1)}function ee(){Y(-1)}function Y(a){_.value=_t(_.value+a,-1,d.value.length-1)}function te(){r.value instanceof HTMLInputElement&&r.value.focus()}function Z(a){const v=a.currentTarget.getAttribute("data-filter-field");v&&r.value instanceof HTMLInputElement&&Q(r.value,v)}function Q(a,l){const v=u.value===""||u.value.endsWith(" ")?"":" ";u.value+=v+l+":",a.focus(),_.value=-1}function ae(){u.value="",r.value instanceof HTMLInputElement&&(r.value.value="",r.value.focus(),o(""))}function ne(a){a.relatedTarget===null&&s(),T.value instanceof HTMLElement&&a.relatedTarget instanceof Node&&!T.value.contains(a.relatedTarget)&&s()}function s(){D.value=!1}function o(a){h.value=null;try{const l=Ct(a,N.value);l.sort((v,K)=>v[0].localeCompare(K[0])),p.value=l}catch(l){if(l instanceof Error)h.value=l,D.value=!0;else throw l}}function x(a,l){return JSON.stringify(a)===JSON.stringify(l)}return(a,l)=>(c(),y("div",{ref_key:"filterBar",ref:T,class:"k-filter-bar","data-testid":"k-filter-bar"},[m("button",{class:"k-focus-filter-input-button",title:"Focus filter",type:"button","data-testid":"k-filter-bar-focus-filter-input-button",onClick:te},[St,i(),C(L(X),{"aria-hidden":"true",class:"k-filter-icon",color:"var(--grey-400)","data-testid":"k-filter-bar-filter-icon","hide-title":"",icon:"filter",size:"20"})]),i(),m("label",{for:`${t.id}-filter-bar-input`,class:"visually-hidden"},[Me(a.$slots,"default",{},()=>[i(P(b.value),1)],!0)],8,Pt),i(),Pe(m("input",{id:`${t.id}-filter-bar-input`,ref_key:"filterInput",ref:r,"onUpdate:modelValue":l[0]||(l[0]=v=>u.value=v),class:"k-filter-bar-input",type:"text",placeholder:k.value,"data-testid":"k-filter-bar-filter-input",onFocus:l[1]||(l[1]=v=>D.value=!0),onBlur:ne,onChange:U},null,40,At),[[ze,u.value]]),i(),D.value?(c(),y("div",Et,[m("div",xt,[h.value!==null?(c(),y("p",It,P(h.value.message),1)):(c(),y("button",{key:1,class:Te(["k-submit-query-button",{"k-submit-query-button-is-selected":_.value===-1}]),title:"Submit query",type:"button","data-testid":"k-filter-bar-submit-query-button",onClick:E},`
          Submit `+P(u.value),3)),i(),(c(!0),y(z,null,j(d.value,(v,K)=>(c(),y("div",{key:`${t.id}-${K}`,class:Te(["k-suggestion-list-item",{"k-suggestion-list-item-is-selected":_.value===K}])},[m("b",null,P(v.fieldName),1),v.description!==""?(c(),y("span",Ot,": "+P(v.description),1)):M("",!0),i(),m("button",{class:"k-apply-suggestion-button",title:`Add ${v.fieldName}:`,type:"button","data-filter-field":v.fieldName,"data-testid":"k-filter-bar-apply-suggestion-button",onClick:Z},[m("span",Vt,"Add "+P(v.fieldName)+":",1),i(),C(L(X),{"aria-hidden":"true",color:"currentColor","hide-title":"",icon:"chevronRight",size:"16"})],8,Ut)],2))),128))])])):M("",!0),i(),u.value!==""?(c(),y("button",{key:1,class:"k-clear-query-button",title:"Clear query",type:"button","data-testid":"k-filter-bar-clear-query-button",onClick:ae},[Nt,i(),C(L(X),{"aria-hidden":"true",color:"currentColor",icon:"clear","hide-title":"",size:"20"})])):M("",!0)],512))}});const Lt=ce($t,[["__scopeId","data-v-2fcde9ea"]]),Ue=e=>(ue("data-v-fc544ac8"),e=e(),de(),e),Ft={class:"entity-section-list"},Kt={class:"entity-title","data-testid":"data-plane-proxy-title"},Mt={class:"mt-2 heading-with-icon"},zt={key:0},Rt=Ue(()=>m("h4",null,"Insights",-1)),jt={class:"block-list"},qt={key:0,class:"mt-2"},Bt=Ue(()=>m("summary",null,`
                  Responses (acknowledged / sent)
                `,-1)),Ht=re({__name:"DataPlaneEntitySummary",props:{dataPlaneOverview:{type:Object,required:!0}},setup(e){const n=e,t=pt(),{t:T}=ft(),r=A(()=>({name:"data-plane-detail-view",params:{mesh:n.dataPlaneOverview.mesh,dataPlane:n.dataPlaneOverview.name}})),u=A(()=>Ae(n.dataPlaneOverview.dataplane)),p=A(()=>{var b;const d=Array.from(((b=n.dataPlaneOverview.dataplaneInsight)==null?void 0:b.subscriptions)??[]);return d.reverse(),d.map(k=>{const w=k.connectTime!==void 0?Ce(k.connectTime):"—",g=k.disconnectTime!==void 0?Ce(k.disconnectTime):"—",F=Object.entries(k.status).filter(([U])=>!["total","lastUpdateTime"].includes(U)).map(([U,E])=>{const V=`${E.responsesAcknowledged??0} / ${E.responsesSent??0}`;return{type:U.toUpperCase(),ratio:V,responsesSent:E.responsesSent??0,responsesAcknowledged:E.responsesAcknowledged??0,responsesRejected:E.responsesRejected??0}});return{subscription:k,formattedConnectDate:w,formattedDisconnectDate:g,statuses:F}})}),h=A(()=>{const{status:d}=Ee(n.dataPlaneOverview.dataplane,n.dataPlaneOverview.dataplaneInsight);return d}),D=A(()=>{const d=qe(n.dataPlaneOverview.dataplaneInsight);return d!==null?Object.entries(d).map(([b,k])=>({name:b,version:k})):[]}),_=A(()=>{var E;const d=((E=n.dataPlaneOverview.dataplaneInsight)==null?void 0:E.subscriptions)??[];if(d.length===0)return[];const b=d[d.length-1];if(!b.version)return[];const k=[],w=b.version.envoy,g=b.version.kumaDp;if(!(w.kumaDpCompatible!==void 0?w.kumaDpCompatible:!0)){const V=`Envoy ${w.version} is not supported by Kuma DP ${g.version}.`;k.push(V)}if(!(g.kumaCpCompatible!==void 0?g.kumaCpCompatible:!0)){const V=`Kuma DP ${g.version} is not supported by this Kuma control plane.`;k.push(V)}return k});async function N(d){const{mesh:b,name:k}=n.dataPlaneOverview;return await t.getDataplaneFromMesh({mesh:b,name:k},d)}return(d,b)=>{const k=Be("router-link");return c(),R(L(tt),null,{body:S(()=>[m("div",Ft,[m("section",null,[m("h3",Kt,[m("span",null,[i(`
              DPP:

              `),C(ct,{text:e.dataPlaneOverview.name},{default:S(()=>[C(k,{to:r.value},{default:S(()=>[i(P(e.dataPlaneOverview.name),1)]),_:1},8,["to"])]),_:1},8,["text"])]),i(),C(ut,{status:h.value},null,8,["status"])]),i(),C(ie,{class:"mt-4"},{default:S(()=>[u.value!==null?(c(),R(B,{key:0,term:"Tags"},{default:S(()=>[C(dt,{tags:u.value},null,8,["tags"])]),_:1})):M("",!0),i(),D.value.length>0?(c(),R(B,{key:1,term:"Dependencies"},{default:S(()=>[m("ul",null,[(c(!0),y(z,null,j(D.value,(w,g)=>(c(),y("li",{key:g},P(w.name)+": "+P(w.version),1))),128))]),i(),_.value.length>0?(c(),y(z,{key:0},[m("h5",Mt,[i(`
                  Warnings

                  `),C(L(X),{class:"ml-1",icon:"warning",color:"var(--black-500)","secondary-color":"var(--yellow-300)",size:"20"})]),i(),(c(!0),y(z,null,j(_.value,(w,g)=>(c(),y("p",{key:g},P(w),1))),128))],64)):M("",!0)]),_:1})):M("",!0)]),_:1})]),i(),p.value.length>0?(c(),y("section",zt,[Rt,i(),m("div",jt,[(c(!0),y(z,null,j(p.value,(w,g)=>(c(),y("div",{key:g},[C(ie,null,{default:S(()=>[C(B,{term:"Connect time","data-testid":`data-plane-connect-time-${g}`},{default:S(()=>[i(P(w.formattedConnectDate),1)]),_:2},1032,["data-testid"]),i(),C(B,{term:"Disconnect time","data-testid":`data-plane-disconnect-time-${g}`},{default:S(()=>[i(P(w.formattedDisconnectDate),1)]),_:2},1032,["data-testid"]),i(),C(B,{term:L(T)("http.api.property.controlPlaneInstanceId")},{default:S(()=>[i(P(w.subscription.controlPlaneInstanceId),1)]),_:2},1032,["term"])]),_:2},1024),i(),w.statuses.length>0?(c(),y("details",qt,[Bt,i(),C(ie,null,{default:S(()=>[(c(!0),y(z,null,j(w.statuses,(F,U)=>(c(),R(B,{key:`${g}-${U}`,term:F.type,"data-testid":`data-plane-subscription-status-${g}-${U}`},{default:S(()=>[i(P(F.ratio),1)]),_:2},1032,["term","data-testid"]))),128))]),_:2},1024)])):M("",!0)]))),128))])])):M("",!0),i(),C(rt,{id:"code-block-data-plane-summary","resource-fetcher":N,"resource-fetcher-watch-key":n.dataPlaneOverview.name,"code-max-height":"250px"},null,8,["resource-fetcher-watch-key"])])]),_:1})}}});const Qt=ce(Ht,[["__scopeId","data-v-fc544ac8"]]),Gt=["protocol","service","zone"];function Yt(e){const n=new Map;for(const[t,T]of e){const r=Gt.includes(t),u=r?"tag":t;n.has(u)||n.set(u,[]);const p=n.get(u);let h;u==="tag"?h=(r?`kuma.io/${t}:${T}`:T).replace(/\s+/g,""):h=T,p.push(h.trim())}return n}const Zt=e=>(ue("data-v-9d5cd6d1"),e=e(),de(),e),Jt={key:0},Wt=Zt(()=>m("label",{for:"data-planes-type-filter",class:"mr-2"},`
              Type:
            `,-1)),Xt=["value"],ea=["for"],ta=["id","checked","onChange"],aa=re({__name:"DataPlaneList",props:{dataPlaneOverviews:{type:Array,required:!0},isLoading:{type:Boolean,required:!1,default:!1},error:{type:[Error,null],required:!1,default:null},nextUrl:{type:String,required:!1,default:null},pageOffset:{type:Number,required:!1,default:0},selectedDppName:{type:String,required:!1,default:null},isGatewayView:{type:Boolean,required:!1,default:!1},gatewayType:{type:String,required:!1,default:"true"},dppFilterFields:{type:Object,required:!0}},emits:["load-data"],setup(e,{emit:n}){const t=e,T={true:"All",builtin:"Builtin",delegated:"Delegated"},r={title:"No Data",message:"There are no data plane proxies present."},u=mt(),p=O(Ie),h=O({headers:[],data:[]}),D=O(H.get("filterQuery")??""),_=O(t.gatewayType),N=O({}),d=O(null),b=A(()=>u.getters["config/getMulticlusterStatus"]),k=A(()=>({name:u.getters["config/getEnvironment"]==="universal"?"universal-dataplane":"kubernetes-dataplane"})),w=A(()=>"tag"in t.dppFilterFields?'tag: "kuma.io/protocol: http"':"name"in t.dppFilterFields?"name: cluster":"field: value"),g=A(()=>{let s=ht(b.value,p.value);return t.isGatewayView?s=s.filter(o=>o.key!=="protocol"):s=s.filter(o=>o.key!=="type"),{data:h.value.data,headers:s}}),F=A(()=>yt.filter(s=>t.isGatewayView?s.tableHeaderKey!=="protocol":s.tableHeaderKey!=="type").filter(s=>b.value?!0:s.tableHeaderKey!=="zone").map(s=>{const o=p.value.includes(s.tableHeaderKey);return{...s,isChecked:o}}));G(_,function(){V(0)}),G(N,function(){V(0)}),G(()=>t.dataPlaneOverviews,function(){Z()});function U(){const s=Se.get("dpVisibleTableHeaderKeys");Array.isArray(s)&&(p.value=s),Z()}U();function E(s){V(s)}function V(s){const o={...N.value};"gateway"in o||(o.gateway=_.value),n("load-data",s,o)}function ee(s){s.stopPropagation()}function Y(s,o){const x=s.target,a=p.value.findIndex(l=>l===o);x.checked&&a===-1?p.value.push(o):!x.checked&&a>-1&&p.value.splice(a,1),Se.set("dpVisibleTableHeaderKeys",Array.from(new Set(p.value)))}function te(){et.logger.info(vt.CREATE_DATA_PLANE_PROXY_CLICKED)}function Z(){var s;try{h.value.data=ae(t.dataPlaneOverviews??[]),Q({name:t.selectedDppName??((s=t.dataPlaneOverviews[0])==null?void 0:s.name)})}catch(o){console.error(o)}}function Q({name:s}){s&&t.dataPlaneOverviews.length>0?(d.value=t.dataPlaneOverviews.find(o=>o.name===s)??t.dataPlaneOverviews[0],H.set(t.isGatewayView?"gateway":"dpp",d.value.name)):(d.value=null,H.set(t.isGatewayView?"gateway":"dpp",null))}function ae(s){return s.map(o=>{var me,ve,ge,ye,he,_e;const x=o.mesh,a=o.name,l=((me=o.dataplane.networking.gateway)==null?void 0:me.type)||"STANDARD",v={name:l==="STANDARD"?"data-plane-detail-view":"gateway-detail-view",params:{mesh:x,dataPlane:a}},K=["kuma.io/protocol","kuma.io/service","kuma.io/zone"],J=Ae(o.dataplane).filter(f=>K.includes(f.label)),se=(ve=J.find(f=>f.label==="kuma.io/service"))==null?void 0:ve.value,Ve=(ge=J.find(f=>f.label==="kuma.io/protocol"))==null?void 0:ge.value,le=(ye=J.find(f=>f.label==="kuma.io/zone"))==null?void 0:ye.value;let pe;se!==void 0&&(pe={name:"service-detail-view",params:{mesh:x,service:se}});let fe;le!==void 0&&(fe={name:"zone-detail-view",params:{zone:le}});const{status:Ne}=Ee(o.dataplane,o.dataplaneInsight),$e=((he=o.dataplaneInsight)==null?void 0:he.subscriptions)??[],Le={totalUpdates:0,totalRejectedUpdates:0,dpVersion:null,envoyVersion:null,selectedTime:NaN,selectedUpdateTime:NaN,version:null},I=$e.reduce((f,$)=>{var be,ke;if($.connectTime){const we=Date.parse($.connectTime);(!f.selectedTime||we>f.selectedTime)&&(f.selectedTime=we)}const oe=Date.parse($.status.lastUpdateTime);return oe&&(!f.selectedUpdateTime||oe>f.selectedUpdateTime)&&(f.selectedUpdateTime=oe),{totalUpdates:f.totalUpdates+parseInt($.status.total.responsesSent??"0",10),totalRejectedUpdates:f.totalRejectedUpdates+parseInt($.status.total.responsesRejected??"0",10),dpVersion:((be=$.version)==null?void 0:be.kumaDp.version)||f.dpVersion,envoyVersion:((ke=$.version)==null?void 0:ke.envoy.version)||f.envoyVersion,selectedTime:f.selectedTime,selectedUpdateTime:f.selectedUpdateTime,version:$.version||f.version}},Le),q={entity:o,detailViewRoute:v,type:l,zone:{title:le??"—",route:fe},service:{title:se??"—",route:pe},protocol:Ve??"—",status:Ne,totalUpdates:I.totalUpdates,totalRejectedUpdates:I.totalRejectedUpdates,dpVersion:I.dpVersion??"—",envoyVersion:I.envoyVersion??"—",warnings:[],unsupportedEnvoyVersion:!1,unsupportedKumaDPVersion:!1,kumaDpAndKumaCpMismatch:!1,lastUpdated:I.selectedUpdateTime?De(new Date(I.selectedUpdateTime).toUTCString()):"—",lastConnected:I.selectedTime?De(new Date(I.selectedTime).toUTCString()):"—",overview:o};if(I.version){const{kind:f}=He(I.version);switch(f!==Qe&&q.warnings.push(f),f){case Ye:q.unsupportedEnvoyVersion=!0;break;case Ge:q.unsupportedKumaDPVersion=!0;break}}return b.value&&I.dpVersion&&J.find($=>$.label===Ze)&&typeof((_e=I.version)==null?void 0:_e.kumaDp.kumaCpCompatible)=="boolean"&&!I.version.kumaDp.kumaCpCompatible&&(q.warnings.push(Je),q.kumaDpAndKumaCpMismatch=!0),q})}function ne({fields:s,query:o}){const x=H.get("filterFields"),a=x!==null?JSON.parse(x):{},l=JSON.stringify(a),v=Object.fromEntries(Yt(s)),K=JSON.stringify(v);H.set("filterQuery",o||null),H.set("filterFields",K),l!==K&&(N.value=v)}return(s,o)=>(c(),R(lt,null,{content:S(()=>{var x;return[C(ot,{"selected-entity-name":(x=d.value)==null?void 0:x.name,"page-size":L(Xe),"is-loading":t.isLoading,error:e.error,"empty-state":r,"table-data":g.value,"table-data-is-empty":g.value.data.length===0,next:t.nextUrl!==null,"page-offset":t.pageOffset,onTableAction:Q,onLoadData:E},{additionalControls:S(()=>[C(Lt,{id:"data-plane-proxy-filter",class:"data-plane-proxy-filter",placeholder:w.value,query:D.value,fields:t.dppFilterFields,onFieldsChange:ne},null,8,["placeholder","query","fields"]),i(),t.isGatewayView?(c(),y("div",Jt,[Wt,i(),Pe(m("select",{id:"data-planes-type-filter","onUpdate:modelValue":o[0]||(o[0]=a=>_.value=a),"data-testid":"data-planes-type-filter"},[(c(),y(z,null,j(T,(a,l)=>m("option",{key:l,value:l},P(a),9,Xt)),64))],512),[[We,_.value]])])):M("",!0),i(),C(L(at),{label:"Columns",icon:"cogwheel","button-appearance":"outline"},{items:S(()=>[m("div",{onClick:ee},[(c(!0),y(z,null,j(F.value,(a,l)=>(c(),R(L(nt),{key:l,class:"table-header-selector-item",item:a},{default:S(()=>[m("label",{for:`data-plane-table-header-checkbox-${l}`,class:"k-checkbox table-header-selector-item-checkbox"},[m("input",{id:`data-plane-table-header-checkbox-${l}`,checked:a.isChecked,type:"checkbox",class:"k-input",onChange:v=>Y(v,a.tableHeaderKey)},null,40,ta),i(" "+P(a.label),1)],8,ea)]),_:2},1032,["item"]))),128))])]),_:1}),i(),C(L(st),{appearance:"creation",to:k.value,icon:"plus","data-testid":"data-plane-create-data-plane-button",onClick:te},{default:S(()=>[i(`
            Create data plane proxy
          `)]),_:1},8,["to"])]),_:1},8,["selected-entity-name","page-size","is-loading","error","table-data","table-data-is-empty","next","page-offset"])]}),sidebar:S(()=>[d.value!==null?(c(),R(Qt,{key:0,"data-plane-overview":d.value},null,8,["data-plane-overview"])):(c(),R(it,{key:1}))]),_:1}))}});const _a=ce(aa,[["__scopeId","data-v-9d5cd6d1"]]);export{_a as D};
