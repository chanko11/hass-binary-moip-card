var at=Object.defineProperty;var ct=Object.getOwnPropertyDescriptor;var h=(s,i,e,t)=>{for(var n=t>1?void 0:t?ct(i,e):i,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(t?o(i,e,n):o(n))||n);return t&&n&&at(i,e,n),n};var Q=globalThis,B=Q.ShadowRoot&&(Q.ShadyCSS===void 0||Q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,he=Symbol(),ze=new WeakMap,j=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==he)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(B&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=ze.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&ze.set(e,i))}return i}toString(){return this.cssText}},Le=s=>new j(typeof s=="string"?s:s+"",void 0,he),E=(s,...i)=>{let e=s.length===1?s[0]:i.reduce((t,n,r)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[r+1],s[0]);return new j(e,s,he)},Re=(s,i)=>{if(B)s.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),n=Q.litNonce;n!==void 0&&t.setAttribute("nonce",n),t.textContent=e.cssText,s.appendChild(t)}},ue=B?s=>s:s=>s instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return Le(e)})(s):s;var{is:lt,defineProperty:dt,getOwnPropertyDescriptor:pt,getOwnPropertyNames:ht,getOwnPropertySymbols:ut,getPrototypeOf:mt}=Object,ee=globalThis,Ie=ee.trustedTypes,gt=Ie?Ie.emptyScript:"",vt=ee.reactiveElementPolyfillSupport,W=(s,i)=>s,D={toAttribute(s,i){switch(i){case Boolean:s=s?gt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,i){let e=s;switch(i){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},te=(s,i)=>!lt(s,i),He={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:te};Symbol.metadata??=Symbol("metadata"),ee.litPropertyMetadata??=new WeakMap;var w=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=He){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),n=this.getPropertyDescriptor(i,t,e);n!==void 0&&dt(this.prototype,i,n)}}static getPropertyDescriptor(i,e,t){let{get:n,set:r}=pt(this.prototype,i)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){let l=n?.call(this);r?.call(this,o),this.requestUpdate(i,l,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??He}static _$Ei(){if(this.hasOwnProperty(W("elementProperties")))return;let i=mt(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(W("properties"))){let e=this.properties,t=[...ht(e),...ut(e)];for(let n of t)this.createProperty(n,e[n])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let n of t)e.unshift(ue(n))}else i!==void 0&&e.push(ue(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Re(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),n=this.constructor._$Eu(i,t);if(n!==void 0&&t.reflect===!0){let r=(t.converter?.toAttribute!==void 0?t.converter:D).toAttribute(e,t.type);this._$Em=i,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(i,e){let t=this.constructor,n=t._$Eh.get(i);if(n!==void 0&&this._$Em!==n){let r=t.getPropertyOptions(n),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:D;this._$Em=n;let l=o.fromAttribute(e,r.type);this[n]=l??this._$Ej?.get(n)??l,this._$Em=null}}requestUpdate(i,e,t,n=!1,r){if(i!==void 0){let o=this.constructor;if(n===!1&&(r=this[i]),t??=o.getPropertyOptions(i),!((t.hasChanged??te)(r,e)||t.useDefault&&t.reflect&&r===this._$Ej?.get(i)&&!this.hasAttribute(o._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:n,wrapped:r},o){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,o??e??this[i]),r!==!0||o!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),n===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[n,r]of t){let{wrapped:o}=r,l=this[n];o!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,r,l)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[W("elementProperties")]=new Map,w[W("finalized")]=new Map,vt?.({ReactiveElement:w}),(ee.reactiveElementVersions??=[]).push("2.1.2");var ye=globalThis,Te=s=>s,ie=ye.trustedTypes,Me=ie?ie.createPolicy("lit-html",{createHTML:s=>s}):void 0,je="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,We="?"+k,_t=`<${We}>`,L=document,F=()=>L.createComment(""),K=s=>s===null||typeof s!="object"&&typeof s!="function",xe=Array.isArray,ft=s=>xe(s)||typeof s?.[Symbol.iterator]=="function",me=`[ 	
\f\r]`,q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ne=/-->/g,Oe=/>/g,P=RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ve=/'/g,Ue=/"/g,De=/^(?:script|style|textarea|title)$/i,$e=s=>(i,...e)=>({_$litType$:s,strings:i,values:e}),a=$e(1),Ht=$e(2),Tt=$e(3),R=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Ze=new WeakMap,z=L.createTreeWalker(L,129);function qe(s,i){if(!xe(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Me!==void 0?Me.createHTML(i):i}var bt=(s,i)=>{let e=s.length-1,t=[],n,r=i===2?"<svg>":i===3?"<math>":"",o=q;for(let l=0;l<e;l++){let c=s[l],d,m,g=-1,f=0;for(;f<c.length&&(o.lastIndex=f,m=o.exec(c),m!==null);)f=o.lastIndex,o===q?m[1]==="!--"?o=Ne:m[1]!==void 0?o=Oe:m[2]!==void 0?(De.test(m[2])&&(n=RegExp("</"+m[2],"g")),o=P):m[3]!==void 0&&(o=P):o===P?m[0]===">"?(o=n??q,g=-1):m[1]===void 0?g=-2:(g=o.lastIndex-m[2].length,d=m[1],o=m[3]===void 0?P:m[3]==='"'?Ue:Ve):o===Ue||o===Ve?o=P:o===Ne||o===Oe?o=q:(o=P,n=void 0);let x=o===P&&s[l+1].startsWith("/>")?" ":"";r+=o===q?c+_t:g>=0?(t.push(d),c.slice(0,g)+je+c.slice(g)+k+x):c+k+(g===-2?l:x)}return[qe(s,r+(s[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},G=class s{constructor({strings:i,_$litType$:e},t){let n;this.parts=[];let r=0,o=0,l=i.length-1,c=this.parts,[d,m]=bt(i,e);if(this.el=s.createElement(d,t),z.currentNode=this.el.content,e===2||e===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(n=z.nextNode())!==null&&c.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(let g of n.getAttributeNames())if(g.endsWith(je)){let f=m[o++],x=n.getAttribute(g).split(k),X=/([.?@])?(.*)/.exec(f);c.push({type:1,index:r,name:X[2],strings:x,ctor:X[1]==="."?ve:X[1]==="?"?_e:X[1]==="@"?fe:N}),n.removeAttribute(g)}else g.startsWith(k)&&(c.push({type:6,index:r}),n.removeAttribute(g));if(De.test(n.tagName)){let g=n.textContent.split(k),f=g.length-1;if(f>0){n.textContent=ie?ie.emptyScript:"";for(let x=0;x<f;x++)n.append(g[x],F()),z.nextNode(),c.push({type:2,index:++r});n.append(g[f],F())}}}else if(n.nodeType===8)if(n.data===We)c.push({type:2,index:r});else{let g=-1;for(;(g=n.data.indexOf(k,g+1))!==-1;)c.push({type:7,index:r}),g+=k.length-1}r++}}static createElement(i,e){let t=L.createElement("template");return t.innerHTML=i,t}};function M(s,i,e=s,t){if(i===R)return i;let n=t!==void 0?e._$Co?.[t]:e._$Cl,r=K(i)?void 0:i._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(s),n._$AT(s,e,t)),t!==void 0?(e._$Co??=[])[t]=n:e._$Cl=n),n!==void 0&&(i=M(s,n._$AS(s,i.values),n,t)),i}var ge=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,n=(i?.creationScope??L).importNode(e,!0);z.currentNode=n;let r=z.nextNode(),o=0,l=0,c=t[0];for(;c!==void 0;){if(o===c.index){let d;c.type===2?d=new Y(r,r.nextSibling,this,i):c.type===1?d=new c.ctor(r,c.name,c.strings,this,i):c.type===6&&(d=new be(r,this,i)),this._$AV.push(d),c=t[++l]}o!==c?.index&&(r=z.nextNode(),o++)}return z.currentNode=L,n}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},Y=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,n){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=M(this,i,e),K(i)?i===p||i==null||i===""?(this._$AH!==p&&this._$AR(),this._$AH=p):i!==this._$AH&&i!==R&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):ft(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==p&&K(this._$AH)?this._$AA.nextSibling.data=i:this.T(L.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,n=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=G.createElement(qe(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===n)this._$AH.p(e);else{let r=new ge(n,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(i){let e=Ze.get(i.strings);return e===void 0&&Ze.set(i.strings,e=new G(i)),e}k(i){xe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,n=0;for(let r of i)n===e.length?e.push(t=new s(this.O(F()),this.O(F()),this,this.options)):t=e[n],t._$AI(r),n++;n<e.length&&(this._$AR(t&&t._$AB.nextSibling,n),e.length=n)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=Te(i).nextSibling;Te(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},N=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,n,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=i,this.name=e,this._$AM=n,this.options=r,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=p}_$AI(i,e=this,t,n){let r=this.strings,o=!1;if(r===void 0)i=M(this,i,e,0),o=!K(i)||i!==this._$AH&&i!==R,o&&(this._$AH=i);else{let l=i,c,d;for(i=r[0],c=0;c<r.length-1;c++)d=M(this,l[t+c],e,c),d===R&&(d=this._$AH[c]),o||=!K(d)||d!==this._$AH[c],d===p?i=p:i!==p&&(i+=(d??"")+r[c+1]),this._$AH[c]=d}o&&!n&&this.j(i)}j(i){i===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},ve=class extends N{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===p?void 0:i}},_e=class extends N{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==p)}},fe=class extends N{constructor(i,e,t,n,r){super(i,e,t,n,r),this.type=5}_$AI(i,e=this){if((i=M(this,i,e,0)??p)===R)return;let t=this._$AH,n=i===p&&t!==p||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,r=i!==p&&(t===p||n);n&&this.element.removeEventListener(this.name,this,t),r&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},be=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){M(this,i)}};var yt=ye.litHtmlPolyfillSupport;yt?.(G,Y),(ye.litHtmlVersions??=[]).push("3.3.3");var Fe=(s,i,e)=>{let t=e?.renderBefore??i,n=t._$litPart$;if(n===void 0){let r=e?.renderBefore??null;t._$litPart$=n=new Y(i.insertBefore(F(),r),r,void 0,e??{})}return n._$AI(s),n};var we=globalThis,y=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Fe(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}};y._$litElement$=!0,y.finalized=!0,we.litElementHydrateSupport?.({LitElement:y});var xt=we.litElementPolyfillSupport;xt?.({LitElement:y});(we.litElementVersions??=[]).push("4.2.2");var O=s=>(i,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,i)}):customElements.define(s,i)};var $t={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:te},wt=(s=$t,i,e)=>{let{kind:t,metadata:n}=e,r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),t==="setter"&&((s=Object.create(s)).wrapped=!0),r.set(e.name,s),t==="accessor"){let{name:o}=e;return{set(l){let c=i.get.call(this);i.set.call(this,l),this.requestUpdate(o,c,s,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,s,l),l}}}if(t==="setter"){let{name:o}=e;return function(l){let c=this[o];i.call(this,l),this.requestUpdate(o,c,s,!0,l)}}throw Error("Unsupported decorator location: "+t)};function A(s){return(i,e)=>typeof e=="object"?wt(s,i,e):((t,n,r)=>{let o=n.hasOwnProperty(r);return n.constructor.createProperty(r,t),o?Object.getOwnPropertyDescriptor(n,r):void 0})(s,i,e)}function u(s){return A({...s,state:!0,attribute:!1})}var V={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,STOP:4096,PLAY:16384,GROUPING:524288};var Se=(s,i,e)=>Math.min(e,Math.max(i,s)),$=s=>Math.round(Se(s??0,0,1)*100);function S(s,i){return s.states[i]?.attributes.friendly_name??i}function J(s){return(s?.attributes.group_members??[]).filter(e=>e!==s?.entity_id)}function Ge(s){return s?J(s).length>0||s.state==="playing":!1}function se(s,i){return((s?.attributes.supported_features??0)&i)===i}function U(s){return se(s,V.PLAY)||se(s,V.PAUSE)||se(s,V.NEXT_TRACK)||se(s,V.PREVIOUS_TRACK)}function ke(s){let i=s.map(t=>t.attributes.volume_level).filter(t=>typeof t=="number");if(i.length===0)return 0;let e=i.reduce((t,n)=>t+n,0)/i.length;return Math.round(e*100)}function Ye(s,i){let e=Math.round(i)-ke(s);if(e===0)return[];let t=[];for(let n of s){let r=$(n.attributes.volume_level),o=Se(r+e,0,100);o!==r&&t.push(I(n.entity_id,o/100))}return t}function Je(s,i){return{domain:"media_player",service:"join",data:{entity_id:s,group_members:[i]}}}function Ae(s){return{domain:"media_player",service:"unjoin",data:{entity_id:s}}}function I(s,i){return{domain:"media_player",service:"volume_set",data:{entity_id:s,volume_level:Se(i,0,1)}}}function H(s,i){return{domain:"media_player",service:"volume_mute",data:{entity_id:s,is_volume_muted:i}}}function C(s,i){return{domain:"media_player",service:i,data:{entity_id:s}}}function Xe(s,i){let e={};for(let t of i)for(let n of J(s.states[t]))e[n]=t;return e}function St(s){let i=s.attributes.moip_role;return i?i==="zone":((s.attributes.supported_features??0)&V.VOLUME_SET)!==0}function Ke(s){return s?(Array.isArray(s)?s:[s]).map(i=>i.toLowerCase()):[]}function Ce(s,i,e){let t=Ke(e.floors),n=Ke(e.areas);if(!t.length&&!n.length)return!0;let r=Ee(s,i),o=r?s.areas?.[r]:void 0,l=o?.floor_id??null,c=l?s.floors?.[l]:void 0;return!(n.length&&!(!!r&&n.includes(r.toLowerCase())||!!o?.name&&n.includes(o.name.toLowerCase()))||t.length&&!(!!l&&t.includes(l.toLowerCase())||!!c?.name&&t.includes(c.name.toLowerCase())))}function Qe(s,i){let e;if(i.zone_groups){let t=new Set;for(let n of Object.values(i.zone_groups))for(let r of n)t.add(r);e=[...t].filter(n=>s.states[n])}else{let t=new Set(i.sources??[]);e=[];for(let[n,r]of Object.entries(s.entities??{})){let o=s.states[n];n.startsWith("media_player.")&&r.platform==="binary_moip"&&!t.has(n)&&o&&St(o)&&e.push(n)}}return e.filter(t=>Ce(s,t,i))}function Ee(s,i){let e=s.entities?.[i];if(!e)return null;let t=e.area_id??null;return!t&&e.device_id&&(t=s.devices?.[e.device_id]?.area_id??null),t??null}function Be(s,i){let e=Ee(s,i);return(e?s.areas?.[e]?.picture:null)??null}function et(s,i,e){if(i.zone_groups)return Object.entries(i.zone_groups).map(([l,c])=>({label:l,zones:c.filter(d=>s.states[d])})).filter(l=>l.zones.length>0);let t={},n=[];for(let l of e){let c=Ee(s,l),m=(c?s.areas?.[c]:void 0)?.floor_id??null,g=m?s.floors?.[m]:void 0;m&&g?(t[m]??={name:g.name,level:g.level??0,zones:[]}).zones.push(l):n.push(l)}let r=(l,c)=>S(s,l).localeCompare(S(s,c)),o=Object.values(t).sort((l,c)=>l.level-c.level||l.name.localeCompare(c.name)).map(l=>({label:l.name,zones:l.zones.sort(r)}));return n.length&&o.push({label:"Zones",zones:n.sort(r)}),o}var kt=new Set(["playing","paused","buffering","on"]),T=s=>!!s&&kt.has(s),re=[{type:"library",label:"Music Assistant",icon:"mdi:music-box-multiple",categories:["playlists","radio"]},{type:"connect",label:"Spotify Connect",icon:"mdi:spotify"}],oe=s=>s.type==="connect",tt={playlists:{label:"Playlists",icon:"mdi:playlist-music"},radio:{label:"Radio",icon:"mdi:radio"},artists:{label:"Artists",icon:"mdi:account-music"},albums:{label:"Albums",icon:"mdi:album"},tracks:{label:"Tracks",icon:"mdi:music-note"},podcasts:{label:"Podcasts",icon:"mdi:podcast"},audiobooks:{label:"Audiobooks",icon:"mdi:book-music"}},Z=s=>tt[s]?.label??s,ae=s=>tt[s]?.icon??"mdi:folder-music";function ce(s,i,e={}){let t={entity_id:s,media_id:i,enqueue:"replace"};return e.mediaType&&(t.media_type=e.mediaType),e.radioMode&&(t.radio_mode=!0),{domain:"music_assistant",service:"play_media",data:t}}function le(s,i,e){let t={type:"media_player/browse_media",entity_id:s};return i!==void 0&&(t.media_content_id=i,t.media_content_type=e),t}function de(){return{type:"binary_moip/spaces"}}function Pe(s,i={}){let e={space:s,ref_type:i.refType??"auto"};return i.source&&(e.source=i.source),i.sample&&(e.sample=i.sample),i.level&&(e.level=i.level),i.setLevels!==void 0&&(e.set_levels=i.setLevels),{domain:"binary_moip",service:"calibration_play",data:e}}function it(s,i,e,t){let n={space:s,zone:i,level:e};return t!==void 0&&(n.value=t),{domain:"binary_moip",service:"calibration_set_anchor",data:n}}function pe(s){return{domain:"binary_moip",service:"space_deactivate",data:{space:s}}}function nt(s,i={}){let e={space:s};return i.master!==void 0?e.master=i.master:i.level&&(e.level=i.level),i.source&&(e.source=i.source),{domain:"binary_moip",service:"space_activate",data:e}}function st(s,i){return{domain:"binary_moip",service:"space_set_level",data:{space:s,level:i}}}function rt(s,i){return{domain:"binary_moip",service:"space_set_master",data:{space:s,master:i}}}function ot(s,i,e,t){let n={space:s,zone:i,action:e};return t!==void 0&&(n.delta=t),{domain:"binary_moip",service:"zone_set",data:n}}var At=["background","listening","party"];window.customCards=[...window.customCards??[],{type:"binary-moip-calibration-card",name:"Binary MoIP Calibration",description:"Guided walk-around calibration for Listening Spaces \u2014 one room at a time, match by SPL."}];var b=class extends y{constructor(){super(...arguments);this._spaces=[];this._error=null;this._stage="space";this._level="listening";this._walkIdx=0;this._mode="music";this._refSpl="";this._pendingVol={};this._fetched=!1}setConfig(e){this._config=e}getCardSize(){return 8}static getStubConfig(){return{type:"custom:binary-moip-calibration-card"}}updated(){this.hass&&!this._fetched&&(this._fetched=!0,this._fetchSpaces());let e=this._pendingVol,t=!1;for(let[n,r]of Object.entries(e)){let o=this.hass.states[n];o&&$(o.attributes.volume_level)===r&&(t||(e={...e},t=!0),delete e[n])}t&&(this._pendingVol=e)}async _fetchSpaces(){try{let e=await this.hass.callWS(de());this._spaces=e.spaces??[],this._error=null}catch{this._error="Couldn't read Listening Spaces from the integration."}}_run(e){return this.hass.callService(e.domain,e.service,e.data)}get _space(){return this._spaces.find(e=>e.id===this._spaceId)}get _walkZones(){let e=this._space;if(!e)return[];let t=e.zones.find(r=>r.group_id===this._refZone),n=e.zones.filter(r=>r.group_id!==this._refZone);return t?[t,...n]:n}get _current(){return this._walkZones[this._walkIdx]}_solo(e){let t=this._space;if(t)for(let n of t.zones)n.entity_id&&this._run(H(n.entity_id,n.entity_id!==e))}_unmuteAll(){for(let e of this._space?.zones??[])e.entity_id&&this._run(H(e.entity_id,!1))}_pickSpace(e){this._spaceId=e,this._stage="level"}_pickLevel(e){this._level=e,this._stage="ref"}async _pickRef(e){this._refZone=e,this._walkIdx=0,this._mode="music",this._stage="walk",await this._run(Pe(this._spaceId,{refType:"sample",source:this._config.source,level:this._level,setLevels:!0})),this._solo(this._current?.entity_id)}async _toMode(e){this._mode=e,await this._run(Pe(this._spaceId,{refType:e==="pink"?"pink":"sample",setLevels:!1}))}async _goZone(e){e<0||e>=this._walkZones.length||(this._walkIdx===0&&e>0&&this._mode==="music"&&await this._toMode("pink"),this._walkIdx=e,this._solo(this._current?.entity_id))}async _finish(){this._unmuteAll(),this._spaceId&&await this._run(pe(this._spaceId)),this._stage="space",this._walkIdx=0,this._refZone=void 0,await this._fetchSpaces()}_volPct(e){return this._pendingVol[e]??$(this.hass.states[e]?.attributes.volume_level)}_setVol(e,t,n){this._pendingVol={...this._pendingVol,[e]:t},n&&this._run(I(e,t/100))}async _save(e){await this._run(it(this._spaceId,e.group_id,this._level)),await this._fetchSpaces()}render(){return!this.hass||!this._config?p:a`
      <ha-card>
        <h1 class="card-header">${this._config.title??"Calibrate"}</h1>
        <div class="content">
          ${this._error?a`<div class="note">${this._error}</div>`:p}
          ${this._renderStage()}
        </div>
      </ha-card>
    `}_renderStage(){switch(this._stage){case"space":return this._renderPickSpace();case"level":return this._renderPickLevel();case"ref":return this._renderPickRef();case"walk":return this._renderWalk()}}_step(e,t){return a`<div class="steps">Step ${e}/4 · ${t}</div>`}_renderPickSpace(){return this._spaces.length?a`
      ${this._step(1,"Pick a Space")}
      <div class="list">
        ${this._spaces.map(e=>a`
            <button class="row-btn" @click=${()=>this._pickSpace(e.id)}>
              <span>${e.name}</span>
              ${e.zones.length&&e.zones.every(t=>t.calibrated)?a`<ha-icon class="ok" icon="mdi:check-circle"></ha-icon>`:a`<span class="muted">${e.zones.filter(t=>t.calibrated).length}/${e.zones.length}</span>`}
              <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
            </button>
          `)}
      </div>
    `:a`<div class="note">No Listening Spaces yet — create one in the integration options.</div>`}_renderPickLevel(){return a`
      <button class="back" @click=${()=>this._stage="space"}><ha-icon icon="mdi:chevron-left"></ha-icon> ${this._space?.name}</button>
      ${this._step(2,"Pick a Level")}
      <div class="list">
        ${At.map(e=>a`<button class="row-btn lvl" @click=${()=>this._pickLevel(e)}>
            <span>${e}</span><ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>`)}
      </div>
    `}_renderPickRef(){return a`
      <button class="back" @click=${()=>this._stage="level"}><ha-icon icon="mdi:chevron-left"></ha-icon> ${this._level}</button>
      ${this._step(3,"Pick the reference zone")}
      <div class="hint">Choose your most prominent listening position.</div>
      <div class="list">
        ${(this._space?.zones??[]).map(e=>a`<button class="row-btn" @click=${()=>this._pickRef(e.group_id)}>
            <ha-icon icon="mdi:target"></ha-icon><span>${e.name}</span>
            <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>`)}
      </div>
    `}_renderWalk(){let e=this._current;if(!e)return p;let t=this._walkZones.length,n=this._walkIdx===0,r=e.entity_id,o=r?this._volPct(r):0,l=e.anchors[this._level];return a`
      <button class="back" @click=${()=>this._stage="ref"}><ha-icon icon="mdi:chevron-left"></ha-icon> change reference</button>
      <div class="steps">${this._space?.name} · ${this._level} · zone ${this._walkIdx+1}/${t}</div>

      <div class="zonebig ${n?"ref":""}">
        <ha-icon icon=${n?"mdi:target":"mdi:speaker"}></ha-icon>
        <div class="zb-name">${e.name}${n?a` <span class="tag">reference</span>`:p}</div>
        <div class="zb-sub">only this room is playing${l!=null?` \xB7 saved ${Math.round(l)}`:""}</div>
      </div>

      ${n?a`<div class="audio">
            <button class="btn ${this._mode==="music"?"on":""}" @click=${()=>this._toMode("music")}>
              <ha-icon icon="mdi:music"></ha-icon> Music
            </button>
            <button class="btn ${this._mode==="pink"?"on":""}" @click=${()=>this._toMode("pink")}>
              <ha-icon icon="mdi:waveform"></ha-icon> Pink
            </button>
          </div>
          <div class="hint">Set a comfortable ${this._level} level with music, Save it, then switch to Pink and note the SPL on your meter app.</div>`:a`<div class="hint">Pink noise is playing. Adjust until your meter reads the target SPL, then Save.</div>`}

      <div class="spl">
        <label>${n?"Reference SPL":"Target SPL"}</label>
        <input type="number" inputmode="decimal" .value=${this._refSpl}
          placeholder="e.g. 72"
          @input=${c=>this._refSpl=c.target.value} />
        <span class="unit">dB</span>
      </div>

      <div class="vol">
        <input type="range" min="0" max="100" .value=${String(o)} ?disabled=${!r}
          @input=${c=>r&&this._setVol(r,Number(c.target.value),!1)}
          @change=${c=>r&&this._setVol(r,Number(c.target.value),!0)} />
        <span class="pctv">${o}%</span>
      </div>

      <button class="save-big" @click=${()=>this._save(e)}>
        <ha-icon icon="mdi:content-save"></ha-icon> ${n?"Save as reference":"Save"}
      </button>

      <div class="nav">
        <button class="btn ghost" ?disabled=${this._walkIdx===0} @click=${()=>this._goZone(this._walkIdx-1)}>
          <ha-icon icon="mdi:chevron-left"></ha-icon> Prev
        </button>
        ${this._walkIdx<t-1?a`<button class="btn" @click=${()=>this._goZone(this._walkIdx+1)}>Next <ha-icon icon="mdi:chevron-right"></ha-icon></button>`:a`<button class="btn on" @click=${this._finish}><ha-icon icon="mdi:check"></ha-icon> Finish</button>`}
      </div>
    `}};b.styles=E`
    ha-card { overflow: hidden; }
    .content { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
    .note { color: var(--secondary-text-color); }
    .hint { color: var(--secondary-text-color); font-size: 0.85rem; }
    .steps { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--secondary-text-color); }
    .back { align-self: flex-start; display: inline-flex; align-items: center; gap: 2px; background: none; border: none; color: var(--primary-color); cursor: pointer; padding: 0; }

    .list { display: flex; flex-direction: column; gap: 8px; }
    .row-btn {
      display: flex; align-items: center; gap: 10px; width: 100%;
      padding: 12px; border-radius: 10px; border: 1px solid var(--divider-color);
      background: none; color: var(--primary-text-color); cursor: pointer; font-size: 1rem;
    }
    .row-btn span { flex: 1; text-align: left; text-transform: capitalize; }
    .row-btn .chev { color: var(--secondary-text-color); }
    .row-btn .ok { color: var(--primary-color); }
    .muted { color: var(--secondary-text-color); font-size: 0.85rem; }

    .zonebig { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 10px; border-radius: 12px; background: var(--secondary-background-color); }
    .zonebig.ref { background: color-mix(in srgb, var(--primary-color) 12%, transparent); }
    .zonebig ha-icon { --mdc-icon-size: 36px; color: var(--primary-color); }
    .zb-name { font-size: 1.2rem; font-weight: 600; }
    .zb-name .tag { font-size: 0.7rem; background: var(--primary-color); color: #fff; border-radius: 4px; padding: 1px 5px; vertical-align: middle; }
    .zb-sub { color: var(--secondary-text-color); font-size: 0.85rem; }

    .audio { display: flex; gap: 8px; }
    .btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 10px; border-radius: 8px; border: 1px solid var(--divider-color); background: none; color: var(--primary-text-color); cursor: pointer; }
    .btn.on { background: var(--primary-color); color: #fff; border-color: transparent; }
    .btn.ghost { color: var(--secondary-text-color); }
    .btn[disabled] { opacity: 0.4; cursor: default; }

    .spl { display: flex; align-items: center; gap: 8px; }
    .spl label { flex: 1; color: var(--secondary-text-color); }
    .spl input { width: 84px; padding: 8px; font-size: 1rem; }
    .spl .unit { color: var(--secondary-text-color); }

    .vol { display: flex; align-items: center; gap: 10px; }
    .vol input[type="range"] { flex: 1; min-width: 0; }
    .pctv { width: 42px; text-align: right; font-variant-numeric: tabular-nums; }

    .save-big { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border-radius: 10px; border: none; background: var(--primary-color); color: #fff; cursor: pointer; font-size: 1rem; }
    .nav { display: flex; gap: 8px; }
    input[type="range"] { accent-color: var(--primary-color); }
  `,h([A({attribute:!1})],b.prototype,"hass",2),h([u()],b.prototype,"_config",2),h([u()],b.prototype,"_spaces",2),h([u()],b.prototype,"_error",2),h([u()],b.prototype,"_stage",2),h([u()],b.prototype,"_spaceId",2),h([u()],b.prototype,"_level",2),h([u()],b.prototype,"_refZone",2),h([u()],b.prototype,"_walkIdx",2),h([u()],b.prototype,"_mode",2),h([u()],b.prototype,"_refSpl",2),h([u()],b.prototype,"_pendingVol",2),b=h([O("binary-moip-calibration-card")],b);var Ct=["background","listening","party"];window.customCards=[...window.customCards??[],{type:"binary-moip-spaces-card",name:"Binary MoIP Listening Spaces",description:"Space-first whole-home audio: turn Spaces on at a level, master, fine-tune zones."}];var _=class extends y{constructor(){super(...arguments);this._spaces=[];this._error=null;this._expanded={};this._pendingMaster={};this._pendingVol={};this._pickerSpace=null;this._openSource=null;this._nav=[];this._children=null;this._browseLoading=!1;this._browseError=null;this._connectHint=null;this._sourceVolSpace=null;this._fetched=!1}get _sources(){return this._config.sources??re}_sourceInput(e){return this._inputs.find(t=>t.entity===e.source)}setConfig(e){this._config=e}getCardSize(){return 6}static getStubConfig(){return{type:"custom:binary-moip-spaces-card",inputs:[]}}updated(){this.hass&&!this._fetched&&(this._fetched=!0,this._fetchSpaces());let e=this._pendingVol,t=!1;for(let[n,r]of Object.entries(e)){let o=this.hass.states[n];o&&$(o.attributes.volume_level)===r&&(t||(e={...e},t=!0),delete e[n])}t&&(this._pendingVol=e)}async _fetchSpaces(){try{let e=await this.hass.callWS(de());this._spaces=e.spaces??[],this._error=null}catch{this._error="Couldn't read Listening Spaces from the integration."}}async _run(e){await this.hass.callService(e.domain,e.service,e.data)}async _runRefresh(e){await this._run(e),await this._fetchSpaces()}get _inputs(){return this._config.inputs??[]}_inputName(e){return this._inputs.find(t=>t.entity===e)?.name}_clearMaster(e){if(e in this._pendingMaster){let t={...this._pendingMaster};delete t[e],this._pendingMaster=t}}async _activate(e,t,n){let r=n??e.level??"listening",o=e.master_positions?.[r];o!=null&&(this._pendingMaster={...this._pendingMaster,[e.id]:Math.round(o)}),await this._runRefresh(nt(e.id,{source:t,level:r})),this._clearMaster(e.id)}_deactivate(e){this._clearMaster(e.id),this._runRefresh(pe(e.id))}async _setLevel(e,t){let n=e.master_positions?.[t];n!=null&&(this._pendingMaster={...this._pendingMaster,[e.id]:Math.round(n)}),await this._runRefresh(st(e.id,t)),this._clearMaster(e.id)}async _setMaster(e,t,n){this._pendingMaster={...this._pendingMaster,[e.id]:t},n&&(await this._runRefresh(rt(e.id,t)),this._clearMaster(e.id))}_volPct(e){return this._pendingVol[e]??$(this.hass.states[e]?.attributes.volume_level)}_setZoneVol(e,t,n){this._pendingVol={...this._pendingVol,[e]:t},n&&this._run(I(e,t/100))}_zoneToggle(e,t,n){this._runRefresh(ot(e.id,t.group_id,n?"on":"off"))}_resetPicker(){this._pickerSpace=null,this._openSource=null,this._nav=[],this._children=null,this._browseError=null,this._connectHint=null}_openPicker(e){this._resetPicker(),this._pickerSpace=e.id}async _loadChildren(e,t){this._children=null,this._browseLoading=!0,this._browseError=null;try{let n=await this.hass.callWS(le(e,t?.media_content_id,t?.media_content_type));this._children=n.children??[]}catch{this._browseError="Couldn't reach Music Assistant.",this._children=[]}finally{this._browseLoading=!1}}_selectSourceList(){this._openSource=null,this._nav=[],this._children=null,this._connectHint=null}_selectSource(e,t){this._openSource=t,this._nav=[],this._children=null,this._connectHint=null,oe(this._sources[t])&&(this._connectHint=`Cast from your Spotify app to ${e.name}.`)}_browseInto(e,t){e.ma_player&&(this._nav=[...this._nav,t],this._loadChildren(e.ma_player,t))}_navBack(e){let t=this._nav.slice(0,-1);this._nav=t,this._children=null,t.length&&e.ma_player&&this._loadChildren(e.ma_player,t[t.length-1])}_onItem(e,t){t.can_play&&e.ma_player?(this._run(ce(e.ma_player,t.media_content_id)),this._resetPicker()):t.can_expand&&this._browseInto(e,t)}render(){return!this.hass||!this._config?p:a`
      <ha-card>
        ${this._config.title?a`<h1 class="card-header">${this._config.title}</h1>`:p}
        <div class="content">
          ${this._error?a`<div class="note">${this._error}</div>`:p}
          ${this._spaces.length?this._spaces.map(e=>this._renderSpace(e)):a`<div class="note">No Listening Spaces yet — create one in the integration options.</div>`}
        </div>
      </ha-card>
    `}_renderSpace(e){let t=this._pendingMaster[e.id]??(e.master!=null?Math.round(e.master):0);return a`
      <div class="space ${e.active?"active":""}">
        <div class="shead">
          <ha-icon icon=${e.active?"mdi:speaker-multiple":"mdi:speaker-off"}></ha-icon>
          <span class="sname">${e.name}</span>
          ${e.active?a`<button class="icon-btn" title="Turn off" @click=${()=>this._deactivate(e)}>
                <ha-icon icon="mdi:power"></ha-icon>
              </button>`:p}
        </div>

        ${e.active?this._renderActive(e,t):this._renderOff(e)}

        ${e.active?a`<button class="expand" @click=${()=>this._expanded={...this._expanded,[e.id]:!this._expanded[e.id]}}>
              <ha-icon icon=${this._expanded[e.id]?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              ${this._expanded[e.id]?"Hide zones":"Zones"}
            </button>`:p}
        ${e.active&&this._expanded[e.id]?a`<div class="zones">${e.zones.map(n=>this._renderZone(e,n))}</div>`:p}
      </div>
    `}_renderOff(e){return this._inputs.length?a`
      <div class="hint">Off — pick a source to start:</div>
      <div class="chips">
        ${this._inputs.map(t=>a`<button class="chip" @click=${()=>this._activate(e,t.entity,"listening")}>
            <ha-icon icon=${t.icon??"mdi:cast-audio"}></ha-icon> ${t.name}
          </button>`)}
      </div>
    `:a`<div class="hint">Add <code>inputs</code> to the card config to choose a source.</div>`}_renderActive(e,t){return a`
      <div class="presets">
        ${Ct.map(n=>a`<button class="preset ${e.level===n?"on":""}" @click=${()=>this._setLevel(e,n)}>
            ${n}
          </button>`)}
      </div>
      <div class="master">
        <ha-icon icon="mdi:volume-high"></ha-icon>
        <input type="range" min="0" max="100" .value=${String(t)}
          @input=${n=>this._setMaster(e,Number(n.target.value),!1)}
          @change=${n=>this._setMaster(e,Number(n.target.value),!0)} />
        <span class="pctv">${t}%</span>
      </div>
      ${this._renderSource(e)}
    `}_renderSource(e){let t=this._sourceInput(e);return t?.ma_player&&this._pickerSpace===e.id?this._renderSourcePicker(t):a`
      <div class="src">
        <span>Source: ${this._inputName(e.source)??e.source??"\u2014"}</span>
        <div class="chips small">
          ${this._inputs.map(n=>a`<button class="chip ${n.entity===e.source?"on":""}"
              @click=${()=>this._activate(e,n.entity)}>${n.name}</button>`)}
        </div>
      </div>
      ${t?.ma_player?a`
            <div class="srcrow">
              <button class="change-btn" @click=${()=>this._openPicker(e)}>
                <ha-icon icon="mdi:playlist-music"></ha-icon> Change content
              </button>
              <button class="icon-btn" title="Source settings"
                @click=${()=>this._sourceVolSpace=this._sourceVolSpace===e.id?null:e.id}>
                <ha-icon icon="mdi:tune-vertical"></ha-icon>
              </button>
            </div>
            ${this._sourceVolSpace===e.id?this._renderSourceVol(t.ma_player):p}
          `:p}
      ${this._renderNowPlaying(e.source)}
    `}_renderSourceVol(e){let t=this._volPct(e);return a`
      <div class="srcvol">
        <ha-icon icon="mdi:cast-audio"></ha-icon>
        <span class="lbl">Source volume</span>
        <input type="range" min="0" max="100" .value=${String(t)}
          @input=${n=>this._setZoneVol(e,Number(n.target.value),!1)}
          @change=${n=>this._setZoneVol(e,Number(n.target.value),!0)} />
        <span class="pctv">${t}%</span>
      </div>
    `}_renderSourcePicker(e){let t=this._sources,n=this._openSource,r=n!=null?t[n]:void 0,o=r?.type==="library"&&this._nav.length>0,l=n==null?"Change content":this._nav.length?this._nav[this._nav.length-1].title:r?.label??"Source",c;return n==null?c=t.map((d,m)=>a`<button class="preset-row" @click=${()=>this._selectSource(e,m)}>
          <ha-icon icon=${d.icon??(d.type==="connect"?"mdi:cast":"mdi:music-box-multiple")}></ha-icon>
          <span>${d.label??(d.type==="connect"?"Spotify Connect":"Music Assistant")}</span>
          ${d.type==="connect"?a`<span class="on-other">cast</span>`:a`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
        </button>`):r?.type==="connect"?c=a`<div class="hint">${this._connectHint}</div>`:r?.type==="library"&&(c=this._renderLibraryBody(e,r)),a`
      <div class="picker">
        <div class="picker-head">
          ${n!=null?a`<button class="icon-btn" title="Back" @click=${()=>o?this._navBack(e):this._selectSourceList()}>
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </button>`:p}
          <span class="picker-title">${l}</span>
          <button class="icon-btn" title="Close" @click=${()=>this._resetPicker()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
        ${c}
      </div>
    `}_renderLibraryBody(e,t){if(this._browseLoading)return a`<div class="hint">Loading…</div>`;if(this._browseError)return a`<div class="note">${this._browseError}</div>`;if(this._nav.length===0)return(t.categories??["playlists","radio"]).map(o=>a`<button class="preset-row" @click=${()=>this._browseInto(e,{title:Z(o),media_content_id:o,media_content_type:"music_assistant",can_expand:!0})}>
          <ha-icon icon=${ae(o)}></ha-icon>
          <span>${Z(o)}</span>
          <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
        </button>`);let n=this._children??[];return n.length?n.map(r=>a`<button class="preset-row" @click=${()=>this._onItem(e,r)}>
        ${r.thumbnail?a`<img class="thumb" src=${r.thumbnail} alt="" />`:a`<ha-icon icon=${r.can_play?"mdi:play-circle-outline":"mdi:folder-outline"}></ha-icon>`}
        <span>${r.title}</span>
        ${r.can_play?p:a`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
      </button>`):a`<div class="hint">Nothing here.</div>`}_renderNowPlaying(e){let t=e?this.hass.states[e]:void 0;if(!t||!U(t))return p;let n=t.attributes,r=t.state==="playing",o=!T(t.state);return a`
      <div class="np">
        <div class="art">
          ${n.entity_picture?a`<img src=${n.entity_picture} alt="" />`:a`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="t">${o?"Nothing playing":n.media_title??""}</div>
          <div class="ar">${o?"":n.media_artist??""}</div>
        </div>
        <div class="tr">
          <button class="icon-btn" @click=${()=>this._run(C(e,"media_previous_track"))}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn big" @click=${()=>this._run(C(e,"media_play_pause"))}>
            <ha-icon icon=${r?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${()=>this._run(C(e,"media_next_track"))}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `}_renderZone(e,t){let n=t.entity_id,r=n?!!this.hass.states[n]:!1,o=n?this._volPct(n):0,l=n?this.hass.states[n]?.attributes.source!=="None":!1,c=n?!!this.hass.states[n]?.attributes.is_volume_muted:!1;return a`
      <div class="zone">
        <button class="icon-btn" title=${l?"Drop from space":"Add to space"}
          @click=${()=>this._zoneToggle(e,t,!l)}>
          <ha-icon icon=${l?"mdi:speaker":"mdi:speaker-off"}></ha-icon>
        </button>
        <span class="zname">${t.name}</span>
        <button class="icon-btn" title=${c?"Unmute":"Mute"} ?disabled=${!r}
          @click=${()=>n&&this._run(H(n,!c))}>
          <ha-icon icon=${c?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
        </button>
        <input type="range" min="0" max="100" .value=${String(o)} ?disabled=${!r}
          @input=${d=>n&&this._setZoneVol(n,Number(d.target.value),!1)}
          @change=${d=>n&&this._setZoneVol(n,Number(d.target.value),!0)} />
        <span class="pctv">${o}%</span>
      </div>
    `}};_.styles=E`
    ha-card { overflow: hidden; }
    .content { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
    .note, .hint { color: var(--secondary-text-color); }
    .hint { font-size: 0.85rem; }

    .space { border: 1px solid var(--divider-color); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
    .space.active { border-color: var(--primary-color); }
    .shead { display: flex; align-items: center; gap: 8px; }
    .shead ha-icon { color: var(--primary-color); }
    .sname { flex: 1; font-weight: 600; font-size: 1.05rem; }

    .presets { display: flex; gap: 0; border: 1px solid var(--divider-color); border-radius: 10px; overflow: hidden; }
    .preset { flex: 1; padding: 8px; background: none; border: none; border-right: 1px solid var(--divider-color); cursor: pointer; color: var(--primary-text-color); text-transform: capitalize; }
    .preset:last-child { border-right: none; }
    .preset.on { background: var(--primary-color); color: #fff; }

    .master { display: flex; align-items: center; gap: 8px; }
    .master input[type="range"] { flex: 1; min-width: 0; }
    .pctv { width: 42px; text-align: right; font-variant-numeric: tabular-nums; }

    .src { display: flex; flex-direction: column; gap: 4px; font-size: 0.85rem; color: var(--secondary-text-color); }
    .chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .chip { display: inline-flex; align-items: center; gap: 4px; padding: 6px 10px; border-radius: 14px; border: 1px solid var(--divider-color); background: none; color: var(--primary-text-color); cursor: pointer; }
    .chip.on { background: var(--primary-color); color: #fff; border-color: transparent; }
    .chip ha-icon { --mdc-icon-size: 18px; }
    .chips.small .chip { padding: 4px 8px; font-size: 0.82rem; }

    .expand { align-self: flex-start; display: inline-flex; align-items: center; gap: 4px; background: none; border: none; color: var(--primary-color); cursor: pointer; padding: 0; }
    .zones { display: flex; flex-direction: column; gap: 6px; }
    .zone { display: flex; align-items: center; gap: 8px; }
    .zname { flex: 0 0 96px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .zone input[type="range"] { flex: 1; min-width: 0; }

    .icon-btn { background: none; border: none; cursor: pointer; color: var(--primary-text-color); padding: 4px; --mdc-icon-size: 22px; }
    .icon-btn.big { --mdc-icon-size: 30px; color: var(--primary-color); }
    .icon-btn[disabled] { opacity: 0.4; cursor: default; }
    input[type="range"] { accent-color: var(--primary-color); }

    .np { display: flex; align-items: center; gap: 10px; }
    .np .art { width: 44px; height: 44px; border-radius: 6px; overflow: hidden; background: var(--secondary-background-color); display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
    .np .art img { width: 100%; height: 100%; object-fit: cover; }
    .np .meta { flex: 1; min-width: 0; }
    .np .t { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .np .ar { color: var(--secondary-text-color); font-size: 0.85rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .np .tr { display: flex; align-items: center; flex: 0 0 auto; }

    .srcrow { display: flex; align-items: center; gap: 8px; }
    .change-btn { display: inline-flex; align-items: center; gap: 4px; padding: 6px 10px; border-radius: 8px; border: 1px solid var(--divider-color); background: none; color: var(--primary-color); cursor: pointer; }
    .change-btn ha-icon { --mdc-icon-size: 18px; }
    .srcvol { display: flex; align-items: center; gap: 8px; }
    .srcvol .lbl { color: var(--secondary-text-color); font-size: 0.85rem; flex: 0 0 auto; }
    .srcvol input[type="range"] { flex: 1; min-width: 0; }
    .picker { display: flex; flex-direction: column; gap: 2px; }
    .picker-head { display: flex; align-items: center; gap: 6px; padding-bottom: 4px; }
    .picker-title { flex: 1; font-weight: 600; }
    .preset-row { display: flex; align-items: center; gap: 8px; padding: 8px 0; background: none; border: none; width: 100%; text-align: left; color: var(--primary-text-color); cursor: pointer; font-size: 1rem; }
    .preset-row span { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .preset-row .chev { color: var(--secondary-text-color); flex: 0 0 auto; }
    .on-other { margin-left: auto; font-size: 0.8rem; color: var(--secondary-text-color); }
    .thumb { width: 32px; height: 32px; border-radius: 4px; object-fit: cover; flex: 0 0 auto; }
  `,h([A({attribute:!1})],_.prototype,"hass",2),h([u()],_.prototype,"_config",2),h([u()],_.prototype,"_spaces",2),h([u()],_.prototype,"_error",2),h([u()],_.prototype,"_expanded",2),h([u()],_.prototype,"_pendingMaster",2),h([u()],_.prototype,"_pendingVol",2),h([u()],_.prototype,"_pickerSpace",2),h([u()],_.prototype,"_openSource",2),h([u()],_.prototype,"_nav",2),h([u()],_.prototype,"_children",2),h([u()],_.prototype,"_browseLoading",2),h([u()],_.prototype,"_browseError",2),h([u()],_.prototype,"_connectHint",2),h([u()],_.prototype,"_sourceVolSpace",2),_=h([O("binary-moip-spaces-card")],_);var Et="2.3.2";console.info(`%c binary-moip-card %c ${Et} `,"color:#fff;background:#3399ff;border-radius:3px 0 0 3px;padding:2px 4px","color:#3399ff;background:#222;border-radius:0 3px 3px 0;padding:2px 4px");window.customCards=[...window.customCards??[],{type:"binary-moip-card",name:"Binary MoIP Audio",description:"Streaming-as-parent whole-home audio: pick an input, swap its content, control its zones."}];var v=class extends y{constructor(){super(...arguments);this._showAddZones=!1;this._pickerOpen=!1;this._openSource=null;this._nav=[];this._children=null;this._browseLoading=!1;this._browseError=null;this._connectHint=null;this._picked={};this._pendingVol={};this._pendingMaster={};this._pendingMembers={};this._showSourceVol=!1}setConfig(e){if(!e||!Array.isArray(e.inputs)||e.inputs.length===0)throw new Error("binary-moip-card: `inputs` (a non-empty list) is required");for(let t of e.inputs)if(!t.entity||!t.kind)throw new Error("binary-moip-card: each input needs `entity` and `kind`");this._config=e}get _sources(){return this._config.sources??re}getCardSize(){return 6}static getStubConfig(){return{type:"custom:binary-moip-card",inputs:[]}}get _selectedInput(){let e=this._config.inputs;if(this._selected){let t=e.find(n=>n.entity===this._selected);if(t&&this.hass.states[t.entity])return t}return e.find(t=>this.hass.states[t.entity])??e[0]}_src(e){return this.hass.states[e.entity]}get _zoneCfg(){return{zone_groups:this._config.zone_groups,sources:this._config.inputs.map(e=>e.entity),floors:this._config.floors,areas:this._config.areas}}_currentSource(e){let t=this._src(e);if(!T(t?.state))return{label:"Idle",icon:e.icon??"mdi:music"};let n=(e.ma_player?this.hass.states[e.ma_player]:void 0)?.attributes??{};if(n.source==="Spotify Connect"||String(n.app_id??"").startsWith("spotify_connect")){let l=this._sources.find(c=>c.type==="connect");return{label:l?.label??"Spotify Connect",icon:l?.icon??"mdi:spotify"}}let r=this._picked[e.entity];if(r)return r;let o=this._sources.find(l=>l.type==="library");return{label:o?.label??"Music Assistant",icon:o?.icon??"mdi:music-box-multiple"}}_resetPicker(){this._pickerOpen=!1,this._openSource=null,this._nav=[],this._children=null,this._browseError=null,this._connectHint=null}_openChangeSource(){this._resetPicker(),this._pickerOpen=!0}async _loadChildren(e,t){this._children=null,this._browseLoading=!0,this._browseError=null;try{let n=await this.hass.callWS(le(e,t?.media_content_id,t?.media_content_type));this._children=n.children??[]}catch{this._browseError="Couldn't reach Music Assistant.",this._children=[]}finally{this._browseLoading=!1}}_selectSource(e,t){this._openSource=t,this._nav=[],this._children=null,this._connectHint=null,oe(this._sources[t])&&(this._connectHint=`Cast from your Spotify app to ${e.name}.`)}_browseInto(e,t){e.ma_player&&(this._nav=[...this._nav,t],this._loadChildren(e.ma_player,t))}_navBack(e){let t=this._nav.slice(0,-1);this._nav=t,this._children=null,t.length&&e.ma_player&&this._loadChildren(e.ma_player,t[t.length-1])}_onItem(e,t,n){if(t.can_play&&e.ma_player){this._run(ce(e.ma_player,t.media_content_id));let r=[...this._nav.map(o=>o.title),t.title].filter(Boolean).join(" \xB7 ");this._picked={...this._picked,[e.entity]:{label:n.label??"Music Assistant",icon:n.icon??"mdi:music-box-multiple",item:r}},this._resetPicker()}else t.can_expand&&this._browseInto(e,t)}async _run(e){if(!e)return;let t=Array.isArray(e)?e:[e];await Promise.all(t.map(n=>this.hass.callService(n.domain,n.service,n.data)))}updated(){let e=this._pendingVol,t=!1;for(let[c,d]of Object.entries(e)){let m=this.hass.states[c];m&&$(m.attributes.volume_level)===d&&(t||(e={...e},t=!0),delete e[c])}t&&(this._pendingVol=e);let n=this._pendingMaster,r=!1;for(let[c,d]of Object.entries(n)){let m=this._memberStates(c);m.length&&ke(m)===d&&(r||(n={...n},r=!0),delete n[c])}r&&(this._pendingMaster=n);let o=this._pendingMembers,l=!1;for(let[c,d]of Object.entries(o)){let m=new Set(J(this.hass.states[c]));for(let[g,f]of Object.entries(d))m.has(g)===f&&(l?o[c]===d&&(o[c]={...d}):(o={...o},l=!0),delete o[c][g],Object.keys(o[c]).length||delete o[c])}l&&(this._pendingMembers=o)}_memberStates(e){let t=new Set(J(this.hass.states[e])),n=this._pendingMembers[e];if(n)for(let[r,o]of Object.entries(n))o?t.add(r):t.delete(r);return[...t].map(r=>this.hass.states[r]).filter(r=>!!r).sort((r,o)=>S(this.hass,r.entity_id).localeCompare(S(this.hass,o.entity_id)))}_inScope(e){return Ce(this.hass,e,this._zoneCfg)}_volPct(e){return this._pendingVol[e]??$(this.hass.states[e]?.attributes.volume_level)}_setVol(e,t,n){this._pendingVol={...this._pendingVol,[e]:t},n&&this._run(I(e,t/100))}_setMember(e,t,n){let r=this._pendingMembers[e.entity]??{};this._pendingMembers={...this._pendingMembers,[e.entity]:{...r,[t]:n}},this._run(n?Je(e.entity,t):Ae(t))}render(){if(!this.hass||!this._config)return p;let e=this._selectedInput,t=e?this._src(e):void 0,n=e?this._memberStates(e.entity):[],r=n.filter(o=>this._inScope(o.entity_id));return a`
      <ha-card>
        ${this._config.title?a`<h1 class="card-header">${this._config.title}</h1>`:p}
        <div class="content">
          ${this._renderRail(e)}
          ${e?this._renderStreamCard(e):a`<div class="note">No input available</div>`}
          ${e&&r.length?this._renderMaster(e,r):p}
          ${e?n.map(o=>this._renderZoneRow(e,o,!this._inScope(o.entity_id))):p}
          ${e&&t&&n.length===0?a`<div class="note">No zones yet — add one below to hear this.</div>`:p}
          ${e&&t?this._renderAddZones(e):p}
        </div>
      </ha-card>
    `}_renderRail(e){return a`
      <div class="rail">
        ${this._config.inputs.map(t=>{let n=this._src(t),r=Ge(n),o=t.kind==="stream",l=o?this._currentSource(t).label:t.name,c=o?t.name:"Line-in",d=t.icon??(o?"mdi:cast-audio":"mdi:music-box-outline"),m=e&&t.entity===e.entity;return a`
            <button
              class="tile ${m?"selected":""}"
              @click=${()=>{this._selected=t.entity,this._showAddZones=!1,this._resetPicker()}}
            >
              <div class="tile-top">
                <ha-icon icon=${d}></ha-icon>
                ${r?a`<span class="dot"></span>`:p}
              </div>
              <div class="tile-headline">${l}</div>
              <div class="tile-sub">${c}</div>
              <div class="tile-state">${n?n.state:"unavailable"}</div>
            </button>
          `})}
      </div>
    `}_renderStreamCard(e){let t;if(e.kind==="physical")t=a`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${e.icon??"mdi:music-box-outline"}></ha-icon>
          <div class="meta">
            <div class="title">${e.name}</div>
            <div class="artist">Live input — control is at the source; no skip/pause.</div>
          </div>
        </div>
      `;else if(this._pickerOpen)t=this._renderSourcePicker(e);else{let n=this._src(e),r=this._currentSource(e),o=r.item??(T(n?.state)?e.name:"Tap Change source");t=a`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${r.icon}></ha-icon>
          <div class="meta">
            <div class="title">${r.label}</div>
            <div class="artist">${o}</div>
          </div>
          ${e.ma_player?a`<button class="icon-btn" title="Source volume"
                @click=${()=>this._showSourceVol=!this._showSourceVol}>
                <ha-icon icon="mdi:tune-vertical"></ha-icon>
              </button>`:p}
          <button class="change-btn" @click=${()=>this._openChangeSource()}>
            Change source
          </button>
        </div>
        ${e.ma_player&&this._showSourceVol?this._renderSourceVol(e.ma_player):p}
        <div class="sep"></div>
        ${this._renderNowPlaying(n)}
      `}return a`<div class="subcard">${t}</div>`}_renderSourcePicker(e){let t=this._sources,n=this._openSource,r=n!=null?t[n]:void 0,o=r?.type==="library"&&this._nav.length>0,l=n==null?`Change source \u2014 ${e.name}`:this._nav.length?this._nav[this._nav.length-1].title:r?.label??"Source",c=a`
      <div class="picker-head">
        ${n!=null?a`<button class="icon-btn" title="Back" @click=${()=>o?this._navBack(e):this._selectSourceList()}>
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>`:p}
        <span class="picker-title">${l}</span>
        <button class="icon-btn" title="Close" @click=${()=>this._resetPicker()}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `,d;if(n==null){let m=this._src(e),g=T(m?.state)&&U(m);d=a`
        ${t.map((f,x)=>a`
            <button class="preset-row" @click=${()=>this._selectSource(e,x)}>
              <ha-icon icon=${f.icon??(f.type==="connect"?"mdi:cast":"mdi:music-box-multiple")}></ha-icon>
              <span>${f.label??(f.type==="connect"?"Spotify Connect":"Music Assistant")}</span>
              ${f.type==="connect"?a`<span class="on-other">cast</span>`:a`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
            </button>
          `)}
        ${g?a`
              <button class="preset-row clear" @click=${()=>this._clearSource(e)}>
                <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
                <span>Turn off — stop playing</span>
              </button>
            `:p}
      `}else r?.type==="connect"?d=a`<div class="hint">${this._connectHint}</div>`:r?.type==="library"&&(d=this._renderLibraryBody(e,r));return a`<div class="picker">${c}${d}</div>`}_selectSourceList(){this._openSource=null,this._nav=[],this._children=null,this._connectHint=null}_clearSource(e){this._run({domain:"media_player",service:"media_stop",data:{entity_id:e.entity}});let t={...this._picked};delete t[e.entity],this._picked=t,this._resetPicker()}_renderLibraryBody(e,t){if(this._browseLoading)return a`<div class="hint">Loading…</div>`;if(this._browseError)return a`<div class="note">${this._browseError}</div>`;if(this._nav.length===0)return(t.categories??["playlists","radio"]).map(o=>a`
          <button
            class="preset-row"
            @click=${()=>this._browseInto(e,{title:Z(o),media_content_id:o,media_content_type:"music_assistant",can_expand:!0})}
          >
            <ha-icon icon=${ae(o)}></ha-icon>
            <span>${Z(o)}</span>
            <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>
        `);let n=this._children??[];return n.length?n.map(r=>a`
        <button class="preset-row" @click=${()=>this._onItem(e,r,t)}>
          ${r.thumbnail?a`<img class="thumb" src=${r.thumbnail} alt="" />`:a`<ha-icon icon=${r.can_play?"mdi:play-circle-outline":"mdi:folder-outline"}></ha-icon>`}
          <span>${r.title}</span>
          ${r.can_play?p:a`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
        </button>
      `):a`<div class="hint">Nothing here.</div>`}_renderNowPlaying(e){if(!e)return p;if(!U(e))return a`<div class="note">No transport for this input.</div>`;let t=e.attributes,n=!T(e.state),r=e.state==="playing";return a`
      <div class="now-playing ${n?"idle":""}">
        <div class="art">
          ${t.entity_picture?a`<img src=${t.entity_picture} alt="" />`:a`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${n?"Nothing playing":t.media_title??""}</div>
          <div class="artist">${n?"Pick a source":t.media_artist??""}</div>
        </div>
        <div class="transport">
          <button class="icon-btn" @click=${()=>this._run(C(e.entity_id,"media_previous_track"))}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn big" @click=${()=>this._run(C(e.entity_id,"media_play_pause"))}>
            <ha-icon icon=${r?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${()=>this._run(C(e.entity_id,"media_next_track"))}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `}_renderSourceVol(e){let t=this._volPct(e);return a`
      <div class="row src-vol">
        <ha-icon icon="mdi:cast-audio"></ha-icon>
        <span class="row-name">Source vol</span>
        <input type="range" min="0" max="100" .value=${String(t)}
          @input=${n=>this._setVol(e,Number(n.target.value),!1)}
          @change=${n=>this._setVol(e,Number(n.target.value),!0)} />
        <span class="pct">${t}%</span>
      </div>
    `}_renderMaster(e,t){let n=t.length?Math.round(t.reduce((o,l)=>o+this._volPct(l.entity_id),0)/t.length):0,r=this._pendingMaster[e.entity]??n;return a`
      <div class="row master">
        <ha-icon icon="mdi:speaker-multiple"></ha-icon>
        <span class="row-name">All zones</span>
        <input type="range" min="0" max="100" .value=${String(r)}
          @input=${o=>this._pendingMaster={...this._pendingMaster,[e.entity]:Number(o.target.value)}}
          @change=${o=>this._commitMaster(e,t,Number(o.target.value))} />
        <span class="pct">${r}%</span>
        <button class="icon-btn" title="Turn off — remove all zones"
          @click=${()=>this._turnOff(e,t)}>
          <ha-icon icon="mdi:power"></ha-icon>
        </button>
      </div>
    `}_commitMaster(e,t,n){let r=Ye(t,n),o={...this._pendingVol};for(let l of r)o[l.data.entity_id]=Math.round(l.data.volume_level*100);this._pendingVol=o,this._pendingMaster={...this._pendingMaster,[e.entity]:n},this._run(r)}_turnOff(e,t){let n={...this._pendingMembers[e.entity]??{}};for(let c of t)n[c.entity_id]=!1;this._pendingMembers={...this._pendingMembers,[e.entity]:n};let r=t.map(c=>Ae(c.entity_id)),o=this._src(e);o&&U(o)&&r.push({domain:"media_player",service:"media_stop",data:{entity_id:e.entity}}),this._run(r);let l={...this._picked};delete l[e.entity],this._picked=l}_renderZoneRow(e,t,n=!1){let r=!!t.attributes.is_volume_muted,o=this._volPct(t.entity_id);return n?a`
        <div class="row locked" title="Outside this card's area — control it from its own card">
          <ha-icon class="lock" icon="mdi:lock-outline"></ha-icon>
          <span class="row-name">${S(this.hass,t.entity_id)}</span>
          <input type="range" min="0" max="100" .value=${String(o)} disabled />
          <span class="pct">${o}%</span>
        </div>
      `:a`
      <div class="row">
        <button class="icon-btn" title="Mute"
          @click=${()=>this._run(H(t.entity_id,!r))}>
          <ha-icon icon=${r?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
        </button>
        <span class="row-name">${S(this.hass,t.entity_id)}</span>
        <input type="range" min="0" max="100" .value=${String(o)}
          @input=${l=>this._setVol(t.entity_id,Number(l.target.value),!1)}
          @change=${l=>this._setVol(t.entity_id,Number(l.target.value),!0)} />
        <span class="pct">${o}%</span>
        <button class="icon-btn" title="Turn off this zone"
          @click=${()=>this._setMember(e,t.entity_id,!1)}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `}_renderAddZones(e){if(!this._showAddZones)return a`
        <button class="add-btn" @click=${()=>this._showAddZones=!0}>
          <ha-icon icon="mdi:plus"></ha-icon> Add zones
        </button>
      `;let t=new Set(this._memberStates(e.entity).map(o=>o.entity_id)),n=Xe(this.hass,this._zoneCfg.sources),r=et(this.hass,this._zoneCfg,Qe(this.hass,this._zoneCfg));return a`
      <div class="picker">
        <div class="picker-head">
          <span class="picker-title">Add zones</span>
          <button class="icon-btn" @click=${()=>this._showAddZones=!1}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${r.map(o=>a`
            <div class="picker-group">${o.label}</div>
            <div class="pick-grid">
              ${o.zones.map(l=>{let c=t.has(l),d=n[l],m=d&&d!==e.entity,g=Be(this.hass,l);return a`
                  <button
                    class="pick-tile ${g?"has-image":""} ${c?"selected":""}"
                    style=${g?`background-image: url("${g}")`:""}
                    @click=${()=>this._setMember(e,l,!c)}
                  >
                    ${c?a`<ha-icon class="pick-check" icon="mdi:check-circle"></ha-icon>`:p}
                    <span class="pick-name">${S(this.hass,l)}</span>
                    ${m?a`<span class="pick-other">on ${S(this.hass,d)}</span>`:p}
                  </button>
                `})}
            </div>
          `)}
      </div>
    `}};v.styles=E`
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
  `,h([A({attribute:!1})],v.prototype,"hass",2),h([u()],v.prototype,"_config",2),h([u()],v.prototype,"_selected",2),h([u()],v.prototype,"_showAddZones",2),h([u()],v.prototype,"_pickerOpen",2),h([u()],v.prototype,"_openSource",2),h([u()],v.prototype,"_nav",2),h([u()],v.prototype,"_children",2),h([u()],v.prototype,"_browseLoading",2),h([u()],v.prototype,"_browseError",2),h([u()],v.prototype,"_connectHint",2),h([u()],v.prototype,"_picked",2),h([u()],v.prototype,"_pendingVol",2),h([u()],v.prototype,"_pendingMaster",2),h([u()],v.prototype,"_pendingMembers",2),h([u()],v.prototype,"_showSourceVol",2),v=h([O("binary-moip-card")],v);export{v as BinaryMoipCard};
