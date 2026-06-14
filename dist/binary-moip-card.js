var Jt=Object.defineProperty;var Xt=Object.getOwnPropertyDescriptor;var g=(n,e,t,i)=>{for(var s=i>1?void 0:i?Xt(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&Jt(e,t,s),s};var V=globalThis,D=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol(),vt=new WeakMap,R=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==X)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(D&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=vt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&vt.set(t,e))}return e}toString(){return this.cssText}},yt=n=>new R(typeof n=="string"?n:n+"",void 0,X),Q=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new R(t,n,X)},bt=(n,e)=>{if(D)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=V.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)}},tt=D?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return yt(t)})(n):n;var{is:Qt,defineProperty:te,getOwnPropertyDescriptor:ee,getOwnPropertyNames:ie,getOwnPropertySymbols:se,getPrototypeOf:ne}=Object,Z=globalThis,$t=Z.trustedTypes,re=$t?$t.emptyScript:"",oe=Z.reactiveElementPolyfillSupport,H=(n,e)=>n,M={toAttribute(n,e){switch(e){case Boolean:n=n?re:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},q=(n,e)=>!Qt(n,e),xt={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??=Symbol("metadata"),Z.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=xt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&te(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:r}=ee(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){let a=s?.call(this);r?.call(this,o),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??xt}static _$Ei(){if(this.hasOwnProperty(H("elementProperties")))return;let e=ne(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(H("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(H("properties"))){let t=this.properties,i=[...ie(t),...se(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(tt(s))}else e!==void 0&&t.push(tt(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return bt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:M).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:M;this._$Em=s;let a=o.fromAttribute(t,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){if(e!==void 0){let o=this.constructor;if(s===!1&&(r=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??q)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[H("elementProperties")]=new Map,y[H("finalized")]=new Map,oe?.({ReactiveElement:y}),(Z.reactiveElementVersions??=[]).push("2.1.2");var at=globalThis,wt=n=>n,F=at.trustedTypes,St=F?F.createPolicy("lit-html",{createHTML:n=>n}):void 0,Rt="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,Ht="?"+$,ae=`<${Ht}>`,A=document,O=()=>A.createComment(""),N=n=>n===null||typeof n!="object"&&typeof n!="function",ct=Array.isArray,ce=n=>ct(n)||typeof n?.[Symbol.iterator]=="function",et=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,At=/-->/g,Et=/>/g,w=RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),kt=/'/g,Ct=/"/g,Mt=/^(?:script|style|textarea|title)$/i,lt=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),l=lt(1),xe=lt(2),we=lt(3),E=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Pt=new WeakMap,S=A.createTreeWalker(A,129);function Tt(n,e){if(!ct(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return St!==void 0?St.createHTML(e):e}var le=(n,e)=>{let t=n.length-1,i=[],s,r=e===2?"<svg>":e===3?"<math>":"",o=T;for(let a=0;a<t;a++){let c=n[a],d,h,p=-1,f=0;for(;f<c.length&&(o.lastIndex=f,h=o.exec(c),h!==null);)f=o.lastIndex,o===T?h[1]==="!--"?o=At:h[1]!==void 0?o=Et:h[2]!==void 0?(Mt.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=w):h[3]!==void 0&&(o=w):o===w?h[0]===">"?(o=s??T,p=-1):h[1]===void 0?p=-2:(p=o.lastIndex-h[2].length,d=h[1],o=h[3]===void 0?w:h[3]==='"'?Ct:kt):o===Ct||o===kt?o=w:o===At||o===Et?o=T:(o=w,s=void 0);let v=o===w&&n[a+1].startsWith("/>")?" ":"";r+=o===T?c+ae:p>=0?(i.push(d),c.slice(0,p)+Rt+c.slice(p)+$+v):c+$+(p===-2?a:v)}return[Tt(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},I=class n{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,o=0,a=e.length-1,c=this.parts,[d,h]=le(e,t);if(this.el=n.createElement(d,i),S.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=S.nextNode())!==null&&c.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(Rt)){let f=h[o++],v=s.getAttribute(p).split($),j=/([.?@])?(.*)/.exec(f);c.push({type:1,index:r,name:j[2],strings:v,ctor:j[1]==="."?st:j[1]==="?"?nt:j[1]==="@"?rt:C}),s.removeAttribute(p)}else p.startsWith($)&&(c.push({type:6,index:r}),s.removeAttribute(p));if(Mt.test(s.tagName)){let p=s.textContent.split($),f=p.length-1;if(f>0){s.textContent=F?F.emptyScript:"";for(let v=0;v<f;v++)s.append(p[v],O()),S.nextNode(),c.push({type:2,index:++r});s.append(p[f],O())}}}else if(s.nodeType===8)if(s.data===Ht)c.push({type:2,index:r});else{let p=-1;for(;(p=s.data.indexOf($,p+1))!==-1;)c.push({type:7,index:r}),p+=$.length-1}r++}}static createElement(e,t){let i=A.createElement("template");return i.innerHTML=e,i}};function k(n,e,t=n,i){if(e===E)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,r=N(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=k(n,s._$AS(n,e.values),s,i)),e}var it=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??A).importNode(t,!0);S.currentNode=s;let r=S.nextNode(),o=0,a=0,c=i[0];for(;c!==void 0;){if(o===c.index){let d;c.type===2?d=new L(r,r.nextSibling,this,e):c.type===1?d=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(d=new ot(r,this,e)),this._$AV.push(d),c=i[++a]}o!==c?.index&&(r=S.nextNode(),o++)}return S.currentNode=A,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},L=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=k(this,e,t),N(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ce(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=I.createElement(Tt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let r=new it(s,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=Pt.get(e.strings);return t===void 0&&Pt.set(e.strings,t=new I(e)),t}k(e){ct(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let r of e)s===t.length?t.push(i=new n(this.O(O()),this.O(O()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=wt(e).nextSibling;wt(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}_$AI(e,t=this,i,s){let r=this.strings,o=!1;if(r===void 0)e=k(this,e,t,0),o=!N(e)||e!==this._$AH&&e!==E,o&&(this._$AH=e);else{let a=e,c,d;for(e=r[0],c=0;c<r.length-1;c++)d=k(this,a[i+c],t,c),d===E&&(d=this._$AH[c]),o||=!N(d)||d!==this._$AH[c],d===u?e=u:e!==u&&(e+=(d??"")+r[c+1]),this._$AH[c]=d}o&&!s&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},st=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},nt=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},rt=class extends C{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=k(this,e,t,0)??u)===E)return;let i=this._$AH,s=e===u&&i!==u||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==u&&(i===u||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ot=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){k(this,e)}};var de=at.litHtmlPolyfillSupport;de?.(I,L),(at.litHtmlVersions??=[]).push("3.3.3");var Ot=(n,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let r=t?.renderBefore??null;i._$litPart$=s=new L(e.insertBefore(O(),r),r,void 0,t??{})}return s._$AI(n),s};var dt=globalThis,x=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ot(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};x._$litElement$=!0,x.finalized=!0,dt.litElementHydrateSupport?.({LitElement:x});var pe=dt.litElementPolyfillSupport;pe?.({LitElement:x});(dt.litElementVersions??=[]).push("4.2.2");var Nt=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};var he={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:q},ue=(n=he,e,t)=>{let{kind:i,metadata:s}=t,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(t.name,n),i==="accessor"){let{name:o}=t;return{set(a){let c=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,c,n,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,n,a),a}}}if(i==="setter"){let{name:o}=t;return function(a){let c=this[o];e.call(this,a),this.requestUpdate(o,c,n,!0,a)}}throw Error("Unsupported decorator location: "+i)};function W(n){return(e,t)=>typeof t=="object"?ue(n,e,t):((i,s,r)=>{let o=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(n,e,t)}function _(n){return W({...n,state:!0,attribute:!1})}var P={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,STOP:4096,PLAY:16384,GROUPING:524288};var pt=(n,e,t)=>Math.min(t,Math.max(e,n)),G=n=>Math.round(pt(n??0,0,1)*100);function b(n,e){return n.states[e]?.attributes.friendly_name??e}function U(n){return(n?.attributes.group_members??[]).filter(t=>t!==n?.entity_id)}function Lt(n){return n?U(n).length>0||n.state==="playing":!1}function K(n,e){return((n?.attributes.supported_features??0)&e)===e}function Y(n){return K(n,P.PLAY)||K(n,P.PAUSE)||K(n,P.NEXT_TRACK)||K(n,P.PREVIOUS_TRACK)}function ht(n){let e=n.map(i=>i.attributes.volume_level).filter(i=>typeof i=="number");if(e.length===0)return 0;let t=e.reduce((i,s)=>i+s,0)/e.length;return Math.round(t*100)}function Ut(n,e){let t=Math.round(e)-ht(n);if(t===0)return[];let i=[];for(let s of n){let r=G(s.attributes.volume_level),o=pt(r+t,0,100);o!==r&&i.push(mt(s.entity_id,o/100))}return i}function zt(n,e){return{domain:"media_player",service:"join",data:{entity_id:n,group_members:[e]}}}function ut(n){return{domain:"media_player",service:"unjoin",data:{entity_id:n}}}function mt(n,e){return{domain:"media_player",service:"volume_set",data:{entity_id:n,volume_level:pt(e,0,1)}}}function jt(n,e){return{domain:"media_player",service:"volume_mute",data:{entity_id:n,is_volume_muted:e}}}function J(n,e){return{domain:"media_player",service:e,data:{entity_id:n}}}function Vt(n,e){let t={};for(let i of e)for(let s of U(n.states[i]))t[s]=i;return t}function me(n){let e=n.attributes.moip_role;return e?e==="zone":((n.attributes.supported_features??0)&P.VOLUME_SET)!==0}function It(n){return n?(Array.isArray(n)?n:[n]).map(e=>e.toLowerCase()):[]}function gt(n,e,t){let i=It(t.floors),s=It(t.areas);if(!i.length&&!s.length)return!0;let r=ft(n,e),o=r?n.areas?.[r]:void 0,a=o?.floor_id??null,c=a?n.floors?.[a]:void 0;return!(s.length&&!(!!r&&s.includes(r.toLowerCase())||!!o?.name&&s.includes(o.name.toLowerCase()))||i.length&&!(!!a&&i.includes(a.toLowerCase())||!!c?.name&&i.includes(c.name.toLowerCase())))}function Dt(n,e){let t;if(e.zone_groups){let i=new Set;for(let s of Object.values(e.zone_groups))for(let r of s)i.add(r);t=[...i].filter(s=>n.states[s])}else{let i=new Set(e.sources??[]);t=[];for(let[s,r]of Object.entries(n.entities??{})){let o=n.states[s];s.startsWith("media_player.")&&r.platform==="binary_moip"&&!i.has(s)&&o&&me(o)&&t.push(s)}}return t.filter(i=>gt(n,i,e))}function ft(n,e){let t=n.entities?.[e];if(!t)return null;let i=t.area_id??null;return!i&&t.device_id&&(i=n.devices?.[t.device_id]?.area_id??null),i??null}function Zt(n,e){let t=ft(n,e);return(t?n.areas?.[t]?.picture:null)??null}function qt(n,e,t){if(e.zone_groups)return Object.entries(e.zone_groups).map(([a,c])=>({label:a,zones:c.filter(d=>n.states[d])})).filter(a=>a.zones.length>0);let i={},s=[];for(let a of t){let c=ft(n,a),h=(c?n.areas?.[c]:void 0)?.floor_id??null,p=h?n.floors?.[h]:void 0;h&&p?(i[h]??={name:p.name,level:p.level??0,zones:[]}).zones.push(a):s.push(a)}let r=(a,c)=>b(n,a).localeCompare(b(n,c)),o=Object.values(i).sort((a,c)=>a.level-c.level||a.name.localeCompare(c.name)).map(a=>({label:a.name,zones:a.zones.sort(r)}));return s.length&&o.push({label:"Zones",zones:s.sort(r)}),o}var ge=new Set(["playing","paused","buffering","on"]),z=n=>!!n&&ge.has(n),Ft=[{type:"library",label:"Music Assistant",icon:"mdi:music-box-multiple",categories:["playlists","radio"]},{type:"connect",label:"Spotify Connect",icon:"mdi:spotify"}],Wt=n=>n.type==="connect",Bt={playlists:{label:"Playlists",icon:"mdi:playlist-music"},radio:{label:"Radio",icon:"mdi:radio"},artists:{label:"Artists",icon:"mdi:account-music"},albums:{label:"Albums",icon:"mdi:album"},tracks:{label:"Tracks",icon:"mdi:music-note"},podcasts:{label:"Podcasts",icon:"mdi:podcast"},audiobooks:{label:"Audiobooks",icon:"mdi:book-music"}},_t=n=>Bt[n]?.label??n,Kt=n=>Bt[n]?.icon??"mdi:folder-music";function Gt(n,e,t={}){let i={entity_id:n,media_id:e,enqueue:"replace"};return t.mediaType&&(i.media_type=t.mediaType),t.radioMode&&(i.radio_mode=!0),{domain:"music_assistant",service:"play_media",data:i}}function Yt(n,e,t){let i={type:"media_player/browse_media",entity_id:n};return e!==void 0&&(i.media_content_id=e,i.media_content_type=t),i}var fe="2.3.1";console.info(`%c binary-moip-card %c ${fe} `,"color:#fff;background:#3399ff;border-radius:3px 0 0 3px;padding:2px 4px","color:#3399ff;background:#222;border-radius:0 3px 3px 0;padding:2px 4px");window.customCards=[...window.customCards??[],{type:"binary-moip-card",name:"Binary MoIP Audio",description:"Streaming-as-parent whole-home audio: pick an input, swap its content, control its zones."}];var m=class extends x{constructor(){super(...arguments);this._showAddZones=!1;this._pickerOpen=!1;this._openSource=null;this._nav=[];this._children=null;this._browseLoading=!1;this._browseError=null;this._connectHint=null;this._picked={};this._pendingVol={};this._pendingMaster={};this._pendingMembers={};this._showSourceVol=!1}setConfig(t){if(!t||!Array.isArray(t.inputs)||t.inputs.length===0)throw new Error("binary-moip-card: `inputs` (a non-empty list) is required");for(let i of t.inputs)if(!i.entity||!i.kind)throw new Error("binary-moip-card: each input needs `entity` and `kind`");this._config=t}get _sources(){return this._config.sources??Ft}getCardSize(){return 6}static getStubConfig(){return{type:"custom:binary-moip-card",inputs:[]}}get _selectedInput(){let t=this._config.inputs;if(this._selected){let i=t.find(s=>s.entity===this._selected);if(i&&this.hass.states[i.entity])return i}return t.find(i=>this.hass.states[i.entity])??t[0]}_src(t){return this.hass.states[t.entity]}get _zoneCfg(){return{zone_groups:this._config.zone_groups,sources:this._config.inputs.map(t=>t.entity),floors:this._config.floors,areas:this._config.areas}}_currentSource(t){let i=this._src(t);if(!z(i?.state))return{label:"Idle",icon:t.icon??"mdi:music"};let s=(t.ma_player?this.hass.states[t.ma_player]:void 0)?.attributes??{};if(s.source==="Spotify Connect"||String(s.app_id??"").startsWith("spotify_connect")){let a=this._sources.find(c=>c.type==="connect");return{label:a?.label??"Spotify Connect",icon:a?.icon??"mdi:spotify"}}let r=this._picked[t.entity];if(r)return r;let o=this._sources.find(a=>a.type==="library");return{label:o?.label??"Music Assistant",icon:o?.icon??"mdi:music-box-multiple"}}_resetPicker(){this._pickerOpen=!1,this._openSource=null,this._nav=[],this._children=null,this._browseError=null,this._connectHint=null}_openChangeSource(){this._resetPicker(),this._pickerOpen=!0}async _loadChildren(t,i){this._children=null,this._browseLoading=!0,this._browseError=null;try{let s=await this.hass.callWS(Yt(t,i?.media_content_id,i?.media_content_type));this._children=s.children??[]}catch{this._browseError="Couldn't reach Music Assistant.",this._children=[]}finally{this._browseLoading=!1}}_selectSource(t,i){this._openSource=i,this._nav=[],this._children=null,this._connectHint=null,Wt(this._sources[i])&&(this._connectHint=`Cast from your Spotify app to ${t.name}.`)}_browseInto(t,i){t.ma_player&&(this._nav=[...this._nav,i],this._loadChildren(t.ma_player,i))}_navBack(t){let i=this._nav.slice(0,-1);this._nav=i,this._children=null,i.length&&t.ma_player&&this._loadChildren(t.ma_player,i[i.length-1])}_onItem(t,i,s){if(i.can_play&&t.ma_player){this._run(Gt(t.ma_player,i.media_content_id));let r=[...this._nav.map(o=>o.title),i.title].filter(Boolean).join(" \xB7 ");this._picked={...this._picked,[t.entity]:{label:s.label??"Music Assistant",icon:s.icon??"mdi:music-box-multiple",item:r}},this._resetPicker()}else i.can_expand&&this._browseInto(t,i)}async _run(t){if(!t)return;let i=Array.isArray(t)?t:[t];await Promise.all(i.map(s=>this.hass.callService(s.domain,s.service,s.data)))}updated(){let t=this._pendingVol,i=!1;for(let[c,d]of Object.entries(t)){let h=this.hass.states[c];h&&G(h.attributes.volume_level)===d&&(i||(t={...t},i=!0),delete t[c])}i&&(this._pendingVol=t);let s=this._pendingMaster,r=!1;for(let[c,d]of Object.entries(s)){let h=this._memberStates(c);h.length&&ht(h)===d&&(r||(s={...s},r=!0),delete s[c])}r&&(this._pendingMaster=s);let o=this._pendingMembers,a=!1;for(let[c,d]of Object.entries(o)){let h=new Set(U(this.hass.states[c]));for(let[p,f]of Object.entries(d))h.has(p)===f&&(a?o[c]===d&&(o[c]={...d}):(o={...o},a=!0),delete o[c][p],Object.keys(o[c]).length||delete o[c])}a&&(this._pendingMembers=o)}_memberStates(t){let i=new Set(U(this.hass.states[t])),s=this._pendingMembers[t];if(s)for(let[r,o]of Object.entries(s))o?i.add(r):i.delete(r);return[...i].map(r=>this.hass.states[r]).filter(r=>!!r).sort((r,o)=>b(this.hass,r.entity_id).localeCompare(b(this.hass,o.entity_id)))}_inScope(t){return gt(this.hass,t,this._zoneCfg)}_volPct(t){return this._pendingVol[t]??G(this.hass.states[t]?.attributes.volume_level)}_setVol(t,i,s){this._pendingVol={...this._pendingVol,[t]:i},s&&this._run(mt(t,i/100))}_setMember(t,i,s){let r=this._pendingMembers[t.entity]??{};this._pendingMembers={...this._pendingMembers,[t.entity]:{...r,[i]:s}},this._run(s?zt(t.entity,i):ut(i))}render(){if(!this.hass||!this._config)return u;let t=this._selectedInput,i=t?this._src(t):void 0,s=t?this._memberStates(t.entity):[],r=s.filter(o=>this._inScope(o.entity_id));return l`
      <ha-card>
        ${this._config.title?l`<h1 class="card-header">${this._config.title}</h1>`:u}
        <div class="content">
          ${this._renderRail(t)}
          ${t?this._renderStreamCard(t):l`<div class="note">No input available</div>`}
          ${t&&r.length?this._renderMaster(t,r):u}
          ${t?s.map(o=>this._renderZoneRow(t,o,!this._inScope(o.entity_id))):u}
          ${t&&i&&s.length===0?l`<div class="note">No zones yet — add one below to hear this.</div>`:u}
          ${t&&i?this._renderAddZones(t):u}
        </div>
      </ha-card>
    `}_renderRail(t){return l`
      <div class="rail">
        ${this._config.inputs.map(i=>{let s=this._src(i),r=Lt(s),o=i.kind==="stream",a=o?this._currentSource(i).label:i.name,c=o?i.name:"Line-in",d=i.icon??(o?"mdi:cast-audio":"mdi:music-box-outline"),h=t&&i.entity===t.entity;return l`
            <button
              class="tile ${h?"selected":""}"
              @click=${()=>{this._selected=i.entity,this._showAddZones=!1,this._resetPicker()}}
            >
              <div class="tile-top">
                <ha-icon icon=${d}></ha-icon>
                ${r?l`<span class="dot"></span>`:u}
              </div>
              <div class="tile-headline">${a}</div>
              <div class="tile-sub">${c}</div>
              <div class="tile-state">${s?s.state:"unavailable"}</div>
            </button>
          `})}
      </div>
    `}_renderStreamCard(t){let i;if(t.kind==="physical")i=l`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${t.icon??"mdi:music-box-outline"}></ha-icon>
          <div class="meta">
            <div class="title">${t.name}</div>
            <div class="artist">Live input — control is at the source; no skip/pause.</div>
          </div>
        </div>
      `;else if(this._pickerOpen)i=this._renderSourcePicker(t);else{let s=this._src(t),r=this._currentSource(t),o=r.item??(z(s?.state)?t.name:"Tap Change source");i=l`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${r.icon}></ha-icon>
          <div class="meta">
            <div class="title">${r.label}</div>
            <div class="artist">${o}</div>
          </div>
          ${t.ma_player?l`<button class="icon-btn" title="Source volume"
                @click=${()=>this._showSourceVol=!this._showSourceVol}>
                <ha-icon icon="mdi:tune-vertical"></ha-icon>
              </button>`:u}
          <button class="change-btn" @click=${()=>this._openChangeSource()}>
            Change source
          </button>
        </div>
        ${t.ma_player&&this._showSourceVol?this._renderSourceVol(t.ma_player):u}
        <div class="sep"></div>
        ${this._renderNowPlaying(s)}
      `}return l`<div class="subcard">${i}</div>`}_renderSourcePicker(t){let i=this._sources,s=this._openSource,r=s!=null?i[s]:void 0,o=r?.type==="library"&&this._nav.length>0,a=s==null?`Change source \u2014 ${t.name}`:this._nav.length?this._nav[this._nav.length-1].title:r?.label??"Source",c=l`
      <div class="picker-head">
        ${s!=null?l`<button class="icon-btn" title="Back" @click=${()=>o?this._navBack(t):this._selectSourceList()}>
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>`:u}
        <span class="picker-title">${a}</span>
        <button class="icon-btn" title="Close" @click=${()=>this._resetPicker()}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `,d;if(s==null){let h=this._src(t),p=z(h?.state)&&Y(h);d=l`
        ${i.map((f,v)=>l`
            <button class="preset-row" @click=${()=>this._selectSource(t,v)}>
              <ha-icon icon=${f.icon??(f.type==="connect"?"mdi:cast":"mdi:music-box-multiple")}></ha-icon>
              <span>${f.label??(f.type==="connect"?"Spotify Connect":"Music Assistant")}</span>
              ${f.type==="connect"?l`<span class="on-other">cast</span>`:l`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
            </button>
          `)}
        ${p?l`
              <button class="preset-row clear" @click=${()=>this._clearSource(t)}>
                <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
                <span>Turn off — stop playing</span>
              </button>
            `:u}
      `}else r?.type==="connect"?d=l`<div class="hint">${this._connectHint}</div>`:r?.type==="library"&&(d=this._renderLibraryBody(t,r));return l`<div class="picker">${c}${d}</div>`}_selectSourceList(){this._openSource=null,this._nav=[],this._children=null,this._connectHint=null}_clearSource(t){this._run({domain:"media_player",service:"media_stop",data:{entity_id:t.entity}});let i={...this._picked};delete i[t.entity],this._picked=i,this._resetPicker()}_renderLibraryBody(t,i){if(this._browseLoading)return l`<div class="hint">Loading…</div>`;if(this._browseError)return l`<div class="note">${this._browseError}</div>`;if(this._nav.length===0)return(i.categories??["playlists","radio"]).map(o=>l`
          <button
            class="preset-row"
            @click=${()=>this._browseInto(t,{title:_t(o),media_content_id:o,media_content_type:"music_assistant",can_expand:!0})}
          >
            <ha-icon icon=${Kt(o)}></ha-icon>
            <span>${_t(o)}</span>
            <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>
        `);let s=this._children??[];return s.length?s.map(r=>l`
        <button class="preset-row" @click=${()=>this._onItem(t,r,i)}>
          ${r.thumbnail?l`<img class="thumb" src=${r.thumbnail} alt="" />`:l`<ha-icon icon=${r.can_play?"mdi:play-circle-outline":"mdi:folder-outline"}></ha-icon>`}
          <span>${r.title}</span>
          ${r.can_play?u:l`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
        </button>
      `):l`<div class="hint">Nothing here.</div>`}_renderNowPlaying(t){if(!t)return u;if(!Y(t))return l`<div class="note">No transport for this input.</div>`;let i=t.attributes,s=!z(t.state),r=t.state==="playing";return l`
      <div class="now-playing ${s?"idle":""}">
        <div class="art">
          ${i.entity_picture?l`<img src=${i.entity_picture} alt="" />`:l`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${s?"Nothing playing":i.media_title??""}</div>
          <div class="artist">${s?"Pick a source":i.media_artist??""}</div>
        </div>
        <div class="transport">
          <button class="icon-btn" @click=${()=>this._run(J(t.entity_id,"media_previous_track"))}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn big" @click=${()=>this._run(J(t.entity_id,"media_play_pause"))}>
            <ha-icon icon=${r?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${()=>this._run(J(t.entity_id,"media_next_track"))}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `}_renderSourceVol(t){let i=this._volPct(t);return l`
      <div class="row src-vol">
        <ha-icon icon="mdi:cast-audio"></ha-icon>
        <span class="row-name">Source vol</span>
        <input type="range" min="0" max="100" .value=${String(i)}
          @input=${s=>this._setVol(t,Number(s.target.value),!1)}
          @change=${s=>this._setVol(t,Number(s.target.value),!0)} />
        <span class="pct">${i}%</span>
      </div>
    `}_renderMaster(t,i){let s=i.length?Math.round(i.reduce((o,a)=>o+this._volPct(a.entity_id),0)/i.length):0,r=this._pendingMaster[t.entity]??s;return l`
      <div class="row master">
        <ha-icon icon="mdi:speaker-multiple"></ha-icon>
        <span class="row-name">All zones</span>
        <input type="range" min="0" max="100" .value=${String(r)}
          @input=${o=>this._pendingMaster={...this._pendingMaster,[t.entity]:Number(o.target.value)}}
          @change=${o=>this._commitMaster(t,i,Number(o.target.value))} />
        <span class="pct">${r}%</span>
        <button class="icon-btn" title="Turn off — remove all zones"
          @click=${()=>this._turnOff(t,i)}>
          <ha-icon icon="mdi:power"></ha-icon>
        </button>
      </div>
    `}_commitMaster(t,i,s){let r=Ut(i,s),o={...this._pendingVol};for(let a of r)o[a.data.entity_id]=Math.round(a.data.volume_level*100);this._pendingVol=o,this._pendingMaster={...this._pendingMaster,[t.entity]:s},this._run(r)}_turnOff(t,i){let s={...this._pendingMembers[t.entity]??{}};for(let c of i)s[c.entity_id]=!1;this._pendingMembers={...this._pendingMembers,[t.entity]:s};let r=i.map(c=>ut(c.entity_id)),o=this._src(t);o&&Y(o)&&r.push({domain:"media_player",service:"media_stop",data:{entity_id:t.entity}}),this._run(r);let a={...this._picked};delete a[t.entity],this._picked=a}_renderZoneRow(t,i,s=!1){let r=!!i.attributes.is_volume_muted,o=this._volPct(i.entity_id);return s?l`
        <div class="row locked" title="Outside this card's area — control it from its own card">
          <ha-icon class="lock" icon="mdi:lock-outline"></ha-icon>
          <span class="row-name">${b(this.hass,i.entity_id)}</span>
          <input type="range" min="0" max="100" .value=${String(o)} disabled />
          <span class="pct">${o}%</span>
        </div>
      `:l`
      <div class="row">
        <button class="icon-btn" title="Mute"
          @click=${()=>this._run(jt(i.entity_id,!r))}>
          <ha-icon icon=${r?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
        </button>
        <span class="row-name">${b(this.hass,i.entity_id)}</span>
        <input type="range" min="0" max="100" .value=${String(o)}
          @input=${a=>this._setVol(i.entity_id,Number(a.target.value),!1)}
          @change=${a=>this._setVol(i.entity_id,Number(a.target.value),!0)} />
        <span class="pct">${o}%</span>
        <button class="icon-btn" title="Turn off this zone"
          @click=${()=>this._setMember(t,i.entity_id,!1)}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `}_renderAddZones(t){if(!this._showAddZones)return l`
        <button class="add-btn" @click=${()=>this._showAddZones=!0}>
          <ha-icon icon="mdi:plus"></ha-icon> Add zones
        </button>
      `;let i=new Set(this._memberStates(t.entity).map(o=>o.entity_id)),s=Vt(this.hass,this._zoneCfg.sources),r=qt(this.hass,this._zoneCfg,Dt(this.hass,this._zoneCfg));return l`
      <div class="picker">
        <div class="picker-head">
          <span class="picker-title">Add zones</span>
          <button class="icon-btn" @click=${()=>this._showAddZones=!1}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${r.map(o=>l`
            <div class="picker-group">${o.label}</div>
            <div class="pick-grid">
              ${o.zones.map(a=>{let c=i.has(a),d=s[a],h=d&&d!==t.entity,p=Zt(this.hass,a);return l`
                  <button
                    class="pick-tile ${p?"has-image":""} ${c?"selected":""}"
                    style=${p?`background-image: url("${p}")`:""}
                    @click=${()=>this._setMember(t,a,!c)}
                  >
                    ${c?l`<ha-icon class="pick-check" icon="mdi:check-circle"></ha-icon>`:u}
                    <span class="pick-name">${b(this.hass,a)}</span>
                    ${h?l`<span class="pick-other">on ${b(this.hass,d)}</span>`:u}
                  </button>
                `})}
            </div>
          `)}
      </div>
    `}};m.styles=Q`
    ha-card { overflow: hidden; }
    .content { display: flex; flex-direction: column; gap: 12px; padding: 16px; }

    /* The source + now-playing (or, while changing source, the picker) sub-card. */
    .subcard {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 12px;
      background: var(--secondary-background-color);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .subcard .sep {
      height: 1px;
      background: var(--divider-color);
      margin: 2px 0;
    }

    .rail {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 4px;
    }
    .tile {
      flex: 0 0 auto;
      width: 110px;
      text-align: left;
      padding: 8px 10px;
      border-radius: 12px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .tile.selected {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    }
    .tile-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--primary-color);
    }
    .tile-headline {
      font-weight: 600;
      line-height: 1.15;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .tile-sub {
      font-size: 0.8rem;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tile-state {
      font-size: 0.72rem;
      color: var(--secondary-text-color);
      text-transform: capitalize;
    }
    .dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--success-color, #2e7d32);
    }

    .content-slot {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .slot-icon { color: var(--primary-color); --mdc-icon-size: 28px; }
    .change-btn {
      flex: 0 0 auto;
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: none;
      color: var(--primary-color);
      cursor: pointer;
    }
    .hint { font-size: 0.8rem; color: var(--secondary-text-color); }

    .now-playing { display: flex; align-items: center; gap: 12px; }
    .art {
      width: 56px; height: 56px; border-radius: 8px; overflow: hidden;
      flex: 0 0 auto; background: var(--secondary-background-color);
      display: flex; align-items: center; justify-content: center;
      color: var(--secondary-text-color);
    }
    .art img { width: 100%; height: 100%; object-fit: cover; }
    .meta { flex: 1 1 auto; min-width: 0; }
    .title {
      font-weight: 500; color: var(--primary-text-color);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .artist {
      color: var(--secondary-text-color); font-size: 0.85rem;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .transport { display: flex; align-items: center; gap: 4px; }
    .note { color: var(--secondary-text-color); font-size: 0.9rem; padding: 4px 0; }

    /* Add-zones picker tiles — responsive grid (2-up on phones, 3-up wider),
       with the zone's HA Area picture as the tile background. Tap to toggle. */
    .pick-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 8px;
      margin: 4px 0 8px;
    }
    .pick-tile {
      position: relative;
      min-height: 64px;
      padding: 8px 10px;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      background-size: cover;
      background-position: center;
      color: var(--primary-text-color);
      cursor: pointer;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 2px;
    }
    .pick-tile.has-image { color: #fff; border-color: transparent; }
    .pick-tile.has-image::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.65) 100%);
    }
    .pick-tile > * { position: relative; z-index: 1; }
    .pick-tile.selected { outline: 2px solid var(--primary-color); outline-offset: -2px; }
    .pick-check {
      position: absolute;
      top: 6px;
      right: 6px;
      z-index: 2;
      color: var(--primary-color);
      --mdc-icon-size: 20px;
    }
    .pick-tile.has-image .pick-check { color: #fff; }
    .pick-name { font-weight: 600; line-height: 1.15; }
    .pick-other { font-size: 0.72rem; opacity: 0.85; }

    .row { display: flex; align-items: center; gap: 8px; }
    .row.locked { opacity: 0.55; }
    /* Match .icon-btn footprint so the slider still left-aligns with other rows. */
    .row .lock {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 4px; --mdc-icon-size: 22px; color: var(--secondary-text-color);
    }
    .row.master {
      border-top: 1px solid var(--divider-color);
      padding-top: 12px; font-weight: 500;
    }
    /* Fixed width so every slider left-aligns -> relative volume at a glance. */
    .row-name {
      flex: 0 0 104px; width: 104px;
      color: var(--primary-text-color);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    input[type="range"] { flex: 1 1 auto; accent-color: var(--primary-color); }
    .pct {
      flex: 0 0 auto; width: 40px; text-align: right;
      color: var(--secondary-text-color); font-variant-numeric: tabular-nums;
    }
    .icon-btn {
      display: inline-flex; align-items: center; justify-content: center;
      background: none; border: none; color: var(--primary-text-color);
      cursor: pointer; padding: 4px; --mdc-icon-size: 22px;
    }
    .icon-btn.big { --mdc-icon-size: 30px; color: var(--primary-color); }
    .add-btn {
      align-self: flex-start;
      display: inline-flex; align-items: center; gap: 4px;
      padding: 6px 12px; border-radius: 8px;
      border: 1px dashed var(--divider-color);
      background: none; color: var(--primary-color); cursor: pointer;
    }
    .picker { display: flex; flex-direction: column; }
    .now-playing.idle .art, .now-playing.idle .meta { opacity: 0.55; }
    .picker-head {
      display: flex; align-items: center; gap: 6px;
      font-weight: 500; color: var(--primary-text-color);
    }
    .picker-title {
      flex: 1 1 auto; min-width: 0;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .picker-floor {
      margin-top: 10px; font-weight: 600; color: var(--primary-text-color);
    }
    .picker-group {
      margin-top: 8px; font-size: 0.8rem; text-transform: uppercase;
      letter-spacing: 0.05em; color: var(--secondary-text-color);
    }
    .picker-row, .preset-row {
      display: flex; align-items: center; gap: 8px; padding: 6px 0;
      color: var(--primary-text-color); cursor: pointer;
      background: none; border: none; width: 100%; text-align: left;
      font-size: 1rem;
    }
    .preset-row span { flex: 1 1 auto; min-width: 0;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .preset-row.selected { color: var(--primary-color); }
    .preset-row.clear {
      margin-top: 4px; border-top: 1px solid var(--divider-color);
      padding-top: 10px; color: var(--error-color, #db4437);
    }
    .preset-row .chev { color: var(--secondary-text-color); flex: 0 0 auto; }
    .thumb { width: 32px; height: 32px; border-radius: 4px; object-fit: cover; flex: 0 0 auto; }
    .on-other {
      margin-left: auto; font-size: 0.8rem; color: var(--secondary-text-color);
    }
  `,g([W({attribute:!1})],m.prototype,"hass",2),g([_()],m.prototype,"_config",2),g([_()],m.prototype,"_selected",2),g([_()],m.prototype,"_showAddZones",2),g([_()],m.prototype,"_pickerOpen",2),g([_()],m.prototype,"_openSource",2),g([_()],m.prototype,"_nav",2),g([_()],m.prototype,"_children",2),g([_()],m.prototype,"_browseLoading",2),g([_()],m.prototype,"_browseError",2),g([_()],m.prototype,"_connectHint",2),g([_()],m.prototype,"_picked",2),g([_()],m.prototype,"_pendingVol",2),g([_()],m.prototype,"_pendingMaster",2),g([_()],m.prototype,"_pendingMembers",2),g([_()],m.prototype,"_showSourceVol",2),m=g([Nt("binary-moip-card")],m);export{m as BinaryMoipCard};
