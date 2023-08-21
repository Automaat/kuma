import{d as L,j as N,o as i,a as c,w as t,z as T,g as a,b as e,M as I,f as S,X as O,r as K,h as s,B as P,q as h,G as W,t as l,e as A,F as Z,L as G,v as $,V as U,D as B,H as D}from"./index-71775e0b.js";import{_ as j}from"./MultizoneInfo.vue_vue_type_script_setup_true_lang-d0f998fa.js";import{r as H,g as J,m as X,e as Y,A as Q,o as ee,S as te,_ as oe,s as ne,f as ae}from"./RouteView.vue_vue_type_script_setup_true_lang-8b9f8d0f.js";import{A as se}from"./AppCollection-dc492073.js";import{_ as ie}from"./RouteTitle.vue_vue_type_script_setup_true_lang-e5a1aa1a.js";const le=L({__name:"DeleteResourceModal",props:{actionButtonText:{type:String,required:!1,default:"Yes, delete"},confirmationText:{type:String,required:!1,default:""},deleteFunction:{type:Function,required:!0},isVisible:{type:Boolean,required:!0},modalId:{type:String,required:!0},title:{type:String,required:!1,default:"Delete"}},emits:["cancel","delete"],setup(C,{emit:d}){const r=C,o=N(!1);async function w(){o.value=!1;try{await r.deleteFunction(),d("delete")}catch{o.value=!0}}return(p,m)=>(i(),c(e(O),{"action-button-text":r.actionButtonText,"confirmation-text":r.confirmationText,"is-visible":r.isVisible,"modal-id":r.modalId,title:r.title,type:"danger","data-testid":"delete-resource-modal",onCanceled:m[0]||(m[0]=_=>d("cancel")),onProceed:w},{"body-content":t(()=>[T(p.$slots,"body-content"),a(),o.value?(i(),c(e(I),{key:0,class:"mt-4",appearance:"danger","is-dismissible":""},{alertMessage:t(()=>[T(p.$slots,"error")]),_:3})):S("",!0)]),_:3},8,["action-button-text","confirmation-text","is-visible","modal-id","title"]))}}),re=L({__name:"ZoneListView",props:{page:{type:Number,required:!0},size:{type:Number,required:!0}},setup(C){const d=C,r=H(),{t:o}=J(),w=X(),p=Y(),m=N(!1),_=N("");function q(b){return b.map(g=>{var M;const{name:y}=g,V={name:"zone-cp-detail-view",params:{zone:y}};let u="",v="kubernetes",k=!0;(((M=g.zoneInsight)==null?void 0:M.subscriptions)??[]).forEach(f=>{if(f.version&&f.version.kumaCp){u=f.version.kumaCp.version;const{kumaCpGlobalCompatible:F=!0}=f.version.kumaCp;k=F}f.config&&(v=JSON.parse(f.config).environment)});const z=ne(g);return{detailViewRoute:V,name:y,status:z,zoneCpVersion:u,type:v,warnings:!k}})}async function E(){await w.deleteZone({name:_.value})}function x(){m.value=!m.value}function R(b){x(),_.value=b}return(b,g)=>{const y=K("RouterLink");return i(),c(oe,{name:"zone-cp-list-view"},{default:t(({route:V})=>[s(Q,null,P({title:t(()=>[h("h1",null,[s(ie,{title:e(o)("zone-cps.routes.items.title"),render:!0},null,8,["title"])])]),default:t(()=>[a(),a(),e(p).getters["config/getMulticlusterStatus"]===!1?(i(),c(j,{key:0})):(i(),c(ee,{key:1,src:`/zone-cps?size=${d.size}&page=${d.page}`},{default:t(({data:u,error:v,refresh:k})=>[s(e(W),null,{body:t(()=>[s(se,{class:"zone-cp-collection","data-testid":"zone-cp-collection",headers:[{label:"Name",key:"name"},{label:"Zone CP Version",key:"zoneCpVersion"},{label:"Type",key:"type"},{label:"Status",key:"status"},{label:"Warnings",key:"warnings",hideLabel:!0},{label:"Actions",key:"actions",hideLabel:!0}],"page-number":d.page,"page-size":d.size,total:u==null?void 0:u.total,items:u?q(u.items):void 0,error:v,onChange:V.update},{name:t(({row:n,rowValue:z})=>[s(y,{to:n.detailViewRoute,"data-testid":"detail-view-link"},{default:t(()=>[a(l(z),1)]),_:2},1032,["to"])]),zoneCpVersion:t(({rowValue:n})=>[a(l(n||e(o)("common.collection.none")),1)]),type:t(({rowValue:n})=>[a(l(n||e(o)("common.collection.none")),1)]),status:t(({rowValue:n})=>[n?(i(),c(te,{key:0,status:n},null,8,["status"])):(i(),A(Z,{key:1},[a(l(e(o)("common.collection.none")),1)],64))]),warnings:t(({rowValue:n})=>[n?(i(),c(e(G),{key:0,label:e(o)("zone-cps.list.version_mismatch")},{default:t(()=>[s(e($),{class:"mr-1",icon:"warning",color:"var(--black-500)","secondary-color":"var(--yellow-300)",size:"20","hide-title":""})]),_:1},8,["label"])):(i(),A(Z,{key:1},[a(l(e(o)("common.collection.none")),1)],64))]),actions:t(({row:n})=>[s(e(U),{class:"actions-dropdown","data-testid":"actions-dropdown","kpop-attributes":{placement:"bottomEnd",popoverClasses:"mt-5 more-actions-popover"},width:"150"},{default:t(()=>[s(e(B),{class:"non-visual-button",appearance:"secondary",size:"small"},{icon:t(()=>[s(e($),{color:"var(--black-400)",icon:"more",size:"16"})]),_:1})]),items:t(()=>[s(e(D),{item:{to:n.detailViewRoute,label:e(o)("common.collection.actions.view")}},null,8,["item"]),a(),e(r)("KUMA_ZONE_CREATION_FLOW")==="enabled"?(i(),c(e(D),{key:0,"has-divider":"","is-dangerous":"","data-testid":"dropdown-delete-item",onClick:z=>R(n.name)},{default:t(()=>[a(l(e(o)("common.collection.actions.delete")),1)]),_:2},1032,["onClick"])):S("",!0)]),_:2},1024)]),_:2},1032,["page-number","page-size","total","items","error","onChange"])]),_:2},1024),a(),m.value?(i(),c(le,{key:0,"confirmation-text":_.value,"delete-function":E,"is-visible":m.value,"modal-id":"delete-zone-modal","action-button-text":e(o)("zones.delete.confirmModal.proceedText"),title:e(o)("zones.delete.confirmModal.title"),onCancel:x,onDelete:()=>{x(),k()}},{"body-content":t(()=>[h("p",null,l(e(o)("zones.delete.confirmModal.text1",{zoneName:_.value})),1),a(),h("p",null,l(e(o)("zones.delete.confirmModal.text2")),1)]),error:t(()=>[a(l(e(o)("zones.delete.confirmModal.errorText")),1)]),_:2},1032,["confirmation-text","is-visible","action-button-text","title","onDelete"])):S("",!0)]),_:2},1032,["src"]))]),_:2},[e(r)("KUMA_ZONE_CREATION_FLOW")==="enabled"&&e(p).getters["config/getMulticlusterStatus"]?{name:"actions",fn:t(()=>[s(e(B),{appearance:"creation",icon:"plus",to:{name:"zone-create-view"},"data-testid":"create-zone-link"},{default:t(()=>[a(l(e(o)("zones.index.create")),1)]),_:1})]),key:"0"}:void 0]),1024)]),_:1})}}});const fe=ae(re,[["__scopeId","data-v-bf5d087e"]]);export{fe as default};