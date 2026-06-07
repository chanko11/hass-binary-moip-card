var Bt=Object.defineProperty;var Kt=Object.getOwnPropertyDescriptor;var _=(n,e,t,i)=>{for(var s=i>1?void 0:i?Kt(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&Bt(e,t,s),s};var j=globalThis,V=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),ft=new WeakMap,P=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(V&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=ft.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ft.set(t,e))}return e}toString(){return this.cssText}},gt=n=>new P(typeof n=="string"?n:n+"",void 0,J),X=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new P(t,n,J)},vt=(n,e)=>{if(V)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=j.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)}},Q=V?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return gt(t)})(n):n;var{is:Gt,defineProperty:Yt,getOwnPropertyDescriptor:Jt,getOwnPropertyNames:Xt,getOwnPropertySymbols:Qt,getPrototypeOf:te}=Object,D=globalThis,yt=D.trustedTypes,ee=yt?yt.emptyScript:"",ie=D.reactiveElementPolyfillSupport,R=(n,e)=>n,T={toAttribute(n,e){switch(e){case Boolean:n=n?ee:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Z=(n,e)=>!Gt(n,e),bt={attribute:!0,type:String,converter:T,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??=Symbol("metadata"),D.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=bt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Yt(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:r}=Jt(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){let a=s?.call(this);r?.call(this,o),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??bt}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let e=te(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let t=this.properties,i=[...Xt(t),...Qt(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(Q(s))}else e!==void 0&&t.push(Q(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return vt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:T).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:T;this._$Em=s;let a=o.fromAttribute(t,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){if(e!==void 0){let o=this.constructor;if(s===!1&&(r=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??Z)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[R("elementProperties")]=new Map,v[R("finalized")]=new Map,ie?.({ReactiveElement:v}),(D.reactiveElementVersions??=[]).push("2.1.2");var ot=globalThis,$t=n=>n,q=ot.trustedTypes,xt=q?q.createPolicy("lit-html",{createHTML:n=>n}):void 0,kt="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,Pt="?"+b,se=`<${Pt}>`,w=document,M=()=>w.createComment(""),I=n=>n===null||typeof n!="object"&&typeof n!="function",at=Array.isArray,ne=n=>at(n)||typeof n?.[Symbol.iterator]=="function",tt=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,St=/-->/g,wt=/>/g,x=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),At=/'/g,Et=/"/g,Rt=/^(?:script|style|textarea|title)$/i,lt=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),p=lt(1),ve=lt(2),ye=lt(3),A=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Ct=new WeakMap,S=w.createTreeWalker(w,129);function Tt(n,e){if(!at(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return xt!==void 0?xt.createHTML(e):e}var re=(n,e)=>{let t=n.length-1,i=[],s,r=e===2?"<svg>":e===3?"<math>":"",o=H;for(let a=0;a<t;a++){let l=n[a],c,d,h=-1,g=0;for(;g<l.length&&(o.lastIndex=g,d=o.exec(l),d!==null);)g=o.lastIndex,o===H?d[1]==="!--"?o=St:d[1]!==void 0?o=wt:d[2]!==void 0?(Rt.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=x):d[3]!==void 0&&(o=x):o===x?d[0]===">"?(o=s??H,h=-1):d[1]===void 0?h=-2:(h=o.lastIndex-d[2].length,c=d[1],o=d[3]===void 0?x:d[3]==='"'?Et:At):o===Et||o===At?o=x:o===St||o===wt?o=H:(o=x,s=void 0);let y=o===x&&n[a+1].startsWith("/>")?" ":"";r+=o===H?l+se:h>=0?(i.push(c),l.slice(0,h)+kt+l.slice(h)+b+y):l+b+(h===-2?a:y)}return[Tt(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},N=class n{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,o=0,a=e.length-1,l=this.parts,[c,d]=re(e,t);if(this.el=n.createElement(c,i),S.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=S.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(kt)){let g=d[o++],y=s.getAttribute(h).split(b),z=/([.?@])?(.*)/.exec(g);l.push({type:1,index:r,name:z[2],strings:y,ctor:z[1]==="."?it:z[1]==="?"?st:z[1]==="@"?nt:C}),s.removeAttribute(h)}else h.startsWith(b)&&(l.push({type:6,index:r}),s.removeAttribute(h));if(Rt.test(s.tagName)){let h=s.textContent.split(b),g=h.length-1;if(g>0){s.textContent=q?q.emptyScript:"";for(let y=0;y<g;y++)s.append(h[y],M()),S.nextNode(),l.push({type:2,index:++r});s.append(h[g],M())}}}else if(s.nodeType===8)if(s.data===Pt)l.push({type:2,index:r});else{let h=-1;for(;(h=s.data.indexOf(b,h+1))!==-1;)l.push({type:7,index:r}),h+=b.length-1}r++}}static createElement(e,t){let i=w.createElement("template");return i.innerHTML=e,i}};function E(n,e,t=n,i){if(e===A)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,r=I(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=E(n,s._$AS(n,e.values),s,i)),e}var et=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??w).importNode(t,!0);S.currentNode=s;let r=S.nextNode(),o=0,a=0,l=i[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new O(r,r.nextSibling,this,e):l.type===1?c=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(c=new rt(r,this,e)),this._$AV.push(c),l=i[++a]}o!==l?.index&&(r=S.nextNode(),o++)}return S.currentNode=w,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},O=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=E(this,e,t),I(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ne(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=N.createElement(Tt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let r=new et(s,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=Ct.get(e.strings);return t===void 0&&Ct.set(e.strings,t=new N(e)),t}k(e){at(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let r of e)s===t.length?t.push(i=new n(this.O(M()),this.O(M()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=$t(e).nextSibling;$t(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}_$AI(e,t=this,i,s){let r=this.strings,o=!1;if(r===void 0)e=E(this,e,t,0),o=!I(e)||e!==this._$AH&&e!==A,o&&(this._$AH=e);else{let a=e,l,c;for(e=r[0],l=0;l<r.length-1;l++)c=E(this,a[i+l],t,l),c===A&&(c=this._$AH[l]),o||=!I(c)||c!==this._$AH[l],c===u?e=u:e!==u&&(e+=(c??"")+r[l+1]),this._$AH[l]=c}o&&!s&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},it=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},st=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},nt=class extends C{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=E(this,e,t,0)??u)===A)return;let i=this._$AH,s=e===u&&i!==u||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==u&&(i===u||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},rt=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){E(this,e)}};var oe=ot.litHtmlPolyfillSupport;oe?.(N,O),(ot.litHtmlVersions??=[]).push("3.3.3");var Ht=(n,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let r=t?.renderBefore??null;i._$litPart$=s=new O(e.insertBefore(M(),r),r,void 0,t??{})}return s._$AI(n),s};var ct=globalThis,$=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ht(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};$._$litElement$=!0,$.finalized=!0,ct.litElementHydrateSupport?.({LitElement:$});var ae=ct.litElementPolyfillSupport;ae?.({LitElement:$});(ct.litElementVersions??=[]).push("4.2.2");var Mt=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};var le={attribute:!0,type:String,converter:T,reflect:!1,hasChanged:Z},ce=(n=le,e,t)=>{let{kind:i,metadata:s}=t,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(t.name,n),i==="accessor"){let{name:o}=t;return{set(a){let l=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,l,n,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,n,a),a}}}if(i==="setter"){let{name:o}=t;return function(a){let l=this[o];e.call(this,a),this.requestUpdate(o,l,n,!0,a)}}throw Error("Unsupported decorator location: "+i)};function F(n){return(e,t)=>typeof t=="object"?ce(n,e,t):((i,s,r)=>{let o=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(n,e,t)}function f(n){return F({...n,state:!0,attribute:!1})}var U={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,STOP:4096,PLAY:16384,GROUPING:524288};var dt=(n,e,t)=>Math.min(t,Math.max(e,n)),K=n=>Math.round(dt(n??0,0,1)*100);function k(n,e){return n.states[e]?.attributes.friendly_name??e}function L(n){return(n?.attributes.group_members??[]).filter(t=>t!==n?.entity_id)}function It(n){return n?L(n).length>0||n.state==="playing":!1}function B(n,e){return((n?.attributes.supported_features??0)&e)===e}function pt(n){return B(n,U.PLAY)||B(n,U.PAUSE)||B(n,U.NEXT_TRACK)||B(n,U.PREVIOUS_TRACK)}function ht(n){let e=n.map(i=>i.attributes.volume_level).filter(i=>typeof i=="number");if(e.length===0)return 0;let t=e.reduce((i,s)=>i+s,0)/e.length;return Math.round(t*100)}function Nt(n,e){let t=Math.round(e)-ht(n);if(t===0)return[];let i=[];for(let s of n){let r=K(s.attributes.volume_level),o=dt(r+t,0,100);o!==r&&i.push(mt(s.entity_id,o/100))}return i}function Ot(n,e){return{domain:"media_player",service:"join",data:{entity_id:n,group_members:[e]}}}function ut(n){return{domain:"media_player",service:"unjoin",data:{entity_id:n}}}function mt(n,e){return{domain:"media_player",service:"volume_set",data:{entity_id:n,volume_level:dt(e,0,1)}}}function Ut(n,e){return{domain:"media_player",service:"volume_mute",data:{entity_id:n,is_volume_muted:e}}}function G(n,e){return{domain:"media_player",service:e,data:{entity_id:n}}}function Lt(n,e){let t={};for(let i of e)for(let s of L(n.states[i]))t[s]=i;return t}function zt(n,e){if(e.zone_groups){let s=new Set;for(let r of Object.values(e.zone_groups))for(let o of r)s.add(o);return[...s].filter(r=>n.states[r])}let t=new Set(e.sources??[]),i=[];for(let[s,r]of Object.entries(n.entities??{}))s.startsWith("media_player.")&&r.platform==="binary_moip"&&!t.has(s)&&n.states[s]&&i.push(s);return i}function de(n,e){let t=n.entities?.[e];if(!t)return null;let i=t.area_id??null;return!i&&t.device_id&&(i=n.devices?.[t.device_id]?.area_id??null),i??null}function jt(n,e,t){if(e.zone_groups)return Object.entries(e.zone_groups).map(([a,l])=>({label:a,zones:l.filter(c=>n.states[c])})).filter(a=>a.zones.length>0);let i={},s=[];for(let a of t){let l=de(n,a);l?(i[l]??=[]).push(a):s.push(a)}let r=Object.entries(i).map(([a,l])=>{let c=n.areas?.[a],d=c?.floor_id??null,h=d?n.floors?.[d]:void 0;return{label:c?.name??a,zones:l,floor:h?.name??null,_floorLevel:h?.level??null}});r.sort((a,l)=>{let c=a._floorLevel??Number.POSITIVE_INFINITY,d=l._floorLevel??Number.POSITIVE_INFINITY;return c!==d?c-d:a.label.localeCompare(l.label)});let o=r.map(({label:a,zones:l,floor:c})=>({label:a,zones:l,floor:c}));return s.length&&o.push({label:"Zones",zones:s,floor:null}),o}var pe=new Set(["playing","paused","buffering","on"]),Y=n=>!!n&&pe.has(n),Vt=[{type:"library",label:"Music Assistant",icon:"mdi:music-box-multiple",categories:["playlists","radio"]},{type:"connect",label:"Spotify Connect",icon:"mdi:spotify"}],Dt=n=>n.type==="connect",Zt={playlists:{label:"Playlists",icon:"mdi:playlist-music"},radio:{label:"Radio",icon:"mdi:radio"},artists:{label:"Artists",icon:"mdi:account-music"},albums:{label:"Albums",icon:"mdi:album"},tracks:{label:"Tracks",icon:"mdi:music-note"},podcasts:{label:"Podcasts",icon:"mdi:podcast"},audiobooks:{label:"Audiobooks",icon:"mdi:book-music"}},_t=n=>Zt[n]?.label??n,qt=n=>Zt[n]?.icon??"mdi:folder-music";function Ft(n,e,t={}){let i={entity_id:n,media_id:e,enqueue:"replace"};return t.mediaType&&(i.media_type=t.mediaType),t.radioMode&&(i.radio_mode=!0),{domain:"music_assistant",service:"play_media",data:i}}function Wt(n,e,t){let i={type:"media_player/browse_media",entity_id:n};return e!==void 0&&(i.media_content_id=e,i.media_content_type=t),i}var he="2.2.0";console.info(`%c binary-moip-card %c ${he} `,"color:#fff;background:#3399ff;border-radius:3px 0 0 3px;padding:2px 4px","color:#3399ff;background:#222;border-radius:0 3px 3px 0;padding:2px 4px");window.customCards=[...window.customCards??[],{type:"binary-moip-card",name:"Binary MoIP Audio",description:"Streaming-as-parent whole-home audio: pick an input, swap its content, control its zones."}];var m=class extends ${constructor(){super(...arguments);this._showAddZones=!1;this._pickerOpen=!1;this._openSource=null;this._nav=[];this._children=null;this._browseLoading=!1;this._browseError=null;this._connectHint=null;this._picked={};this._pendingVol={};this._pendingMaster={};this._pendingMembers={};this._showSourceVol=!1}setConfig(t){if(!t||!Array.isArray(t.inputs)||t.inputs.length===0)throw new Error("binary-moip-card: `inputs` (a non-empty list) is required");for(let i of t.inputs)if(!i.entity||!i.kind)throw new Error("binary-moip-card: each input needs `entity` and `kind`");this._config=t}get _sources(){return this._config.sources??Vt}getCardSize(){return 6}static getStubConfig(){return{type:"custom:binary-moip-card",inputs:[]}}get _selectedInput(){let t=this._config.inputs;if(this._selected){let i=t.find(s=>s.entity===this._selected);if(i&&this.hass.states[i.entity])return i}return t.find(i=>this.hass.states[i.entity])??t[0]}_src(t){return this.hass.states[t.entity]}get _zoneCfg(){return{zone_groups:this._config.zone_groups,sources:this._config.inputs.map(t=>t.entity)}}_currentSource(t){let i=this._src(t);if(!Y(i?.state))return{label:"Idle",icon:t.icon??"mdi:music"};let s=(t.ma_player?this.hass.states[t.ma_player]:void 0)?.attributes??{};if(s.source==="Spotify Connect"||String(s.app_id??"").startsWith("spotify_connect")){let a=this._sources.find(l=>l.type==="connect");return{label:a?.label??"Spotify Connect",icon:a?.icon??"mdi:spotify"}}let r=this._picked[t.entity];if(r)return r;let o=this._sources.find(a=>a.type==="library");return{label:o?.label??"Music Assistant",icon:o?.icon??"mdi:music-box-multiple"}}_resetPicker(){this._pickerOpen=!1,this._openSource=null,this._nav=[],this._children=null,this._browseError=null,this._connectHint=null}_openChangeSource(){this._resetPicker(),this._pickerOpen=!0}async _loadChildren(t,i){this._children=null,this._browseLoading=!0,this._browseError=null;try{let s=await this.hass.callWS(Wt(t,i?.media_content_id,i?.media_content_type));this._children=s.children??[]}catch{this._browseError="Couldn't reach Music Assistant.",this._children=[]}finally{this._browseLoading=!1}}_selectSource(t,i){this._openSource=i,this._nav=[],this._children=null,this._connectHint=null,Dt(this._sources[i])&&(this._connectHint=`Cast from your Spotify app to ${t.name}.`)}_browseInto(t,i){t.ma_player&&(this._nav=[...this._nav,i],this._loadChildren(t.ma_player,i))}_navBack(t){let i=this._nav.slice(0,-1);this._nav=i,this._children=null,i.length&&t.ma_player&&this._loadChildren(t.ma_player,i[i.length-1])}_onItem(t,i,s){if(i.can_play&&t.ma_player){this._run(Ft(t.ma_player,i.media_content_id));let r=[...this._nav.map(o=>o.title),i.title].filter(Boolean).join(" \xB7 ");this._picked={...this._picked,[t.entity]:{label:s.label??"Music Assistant",icon:s.icon??"mdi:music-box-multiple",item:r}},this._resetPicker()}else i.can_expand&&this._browseInto(t,i)}async _run(t){if(!t)return;let i=Array.isArray(t)?t:[t];await Promise.all(i.map(s=>this.hass.callService(s.domain,s.service,s.data)))}updated(){let t=this._pendingVol,i=!1;for(let[l,c]of Object.entries(t)){let d=this.hass.states[l];d&&K(d.attributes.volume_level)===c&&(i||(t={...t},i=!0),delete t[l])}i&&(this._pendingVol=t);let s=this._pendingMaster,r=!1;for(let[l,c]of Object.entries(s)){let d=this._memberStates(l);d.length&&ht(d)===c&&(r||(s={...s},r=!0),delete s[l])}r&&(this._pendingMaster=s);let o=this._pendingMembers,a=!1;for(let[l,c]of Object.entries(o)){let d=new Set(L(this.hass.states[l]));for(let[h,g]of Object.entries(c))d.has(h)===g&&(a?o[l]===c&&(o[l]={...c}):(o={...o},a=!0),delete o[l][h],Object.keys(o[l]).length||delete o[l])}a&&(this._pendingMembers=o)}_memberStates(t){let i=new Set(L(this.hass.states[t])),s=this._pendingMembers[t];if(s)for(let[r,o]of Object.entries(s))o?i.add(r):i.delete(r);return[...i].map(r=>this.hass.states[r]).filter(r=>!!r).sort((r,o)=>k(this.hass,r.entity_id).localeCompare(k(this.hass,o.entity_id)))}_volPct(t){return this._pendingVol[t]??K(this.hass.states[t]?.attributes.volume_level)}_setVol(t,i,s){this._pendingVol={...this._pendingVol,[t]:i},s&&this._run(mt(t,i/100))}_setMember(t,i,s){let r=this._pendingMembers[t.entity]??{};this._pendingMembers={...this._pendingMembers,[t.entity]:{...r,[i]:s}},this._run(s?Ot(t.entity,i):ut(i))}render(){if(!this.hass||!this._config)return u;let t=this._selectedInput,i=t?this._src(t):void 0,s=t?this._memberStates(t.entity):[];return p`
      <ha-card>
        ${this._config.title?p`<h1 class="card-header">${this._config.title}</h1>`:u}
        <div class="content">
          ${this._renderRail(t)}
          ${t?this._renderStreamCard(t):p`<div class="note">No input available</div>`}
          ${t&&s.length?this._renderMaster(t,s):u}
          ${t?s.map(r=>this._renderZoneRow(t,r)):u}
          ${t&&i&&s.length===0?p`<div class="note">No zones yet — add one below to hear this.</div>`:u}
          ${t&&i?this._renderAddZones(t):u}
        </div>
      </ha-card>
    `}_renderRail(t){return p`
      <div class="rail">
        ${this._config.inputs.map(i=>{let s=this._src(i),r=It(s),o=i.kind==="stream",a=o?this._currentSource(i).label:i.name,l=o?i.name:"Line-in",c=i.icon??(o?"mdi:cast-audio":"mdi:music-box-outline"),d=t&&i.entity===t.entity;return p`
            <button
              class="tile ${d?"selected":""}"
              @click=${()=>{this._selected=i.entity,this._showAddZones=!1,this._resetPicker()}}
            >
              <div class="tile-top">
                <ha-icon icon=${c}></ha-icon>
                ${r?p`<span class="dot"></span>`:u}
              </div>
              <div class="tile-headline">${a}</div>
              <div class="tile-sub">${l}</div>
              <div class="tile-state">${s?s.state:"unavailable"}</div>
            </button>
          `})}
      </div>
    `}_renderStreamCard(t){let i;if(t.kind==="physical")i=p`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${t.icon??"mdi:music-box-outline"}></ha-icon>
          <div class="meta">
            <div class="title">${t.name}</div>
            <div class="artist">Live input — control is at the source; no skip/pause.</div>
          </div>
        </div>
      `;else if(this._pickerOpen)i=this._renderSourcePicker(t);else{let s=this._src(t),r=this._currentSource(t),o=r.item??(Y(s?.state)?t.name:"Tap Change source");i=p`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${r.icon}></ha-icon>
          <div class="meta">
            <div class="title">${r.label}</div>
            <div class="artist">${o}</div>
          </div>
          ${t.ma_player?p`<button class="icon-btn" title="Source volume"
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
      `}return p`<div class="subcard">${i}</div>`}_renderSourcePicker(t){let i=this._sources,s=this._openSource,r=s!=null?i[s]:void 0,o=r?.type==="library"&&this._nav.length>0,a=s==null?`Change source \u2014 ${t.name}`:this._nav.length?this._nav[this._nav.length-1].title:r?.label??"Source",l=p`
      <div class="picker-head">
        ${s!=null?p`<button class="icon-btn" title="Back" @click=${()=>o?this._navBack(t):this._selectSourceList()}>
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>`:u}
        <span class="picker-title">${a}</span>
        <button class="icon-btn" title="Close" @click=${()=>this._resetPicker()}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `,c;return s==null?c=i.map((d,h)=>p`
          <button class="preset-row" @click=${()=>this._selectSource(t,h)}>
            <ha-icon icon=${d.icon??(d.type==="connect"?"mdi:cast":"mdi:music-box-multiple")}></ha-icon>
            <span>${d.label??(d.type==="connect"?"Spotify Connect":"Music Assistant")}</span>
            ${d.type==="connect"?p`<span class="on-other">cast</span>`:p`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
          </button>
        `):r?.type==="connect"?c=p`<div class="hint">${this._connectHint}</div>`:r?.type==="library"&&(c=this._renderLibraryBody(t,r)),p`<div class="picker">${l}${c}</div>`}_selectSourceList(){this._openSource=null,this._nav=[],this._children=null,this._connectHint=null}_renderLibraryBody(t,i){if(this._browseLoading)return p`<div class="hint">Loading…</div>`;if(this._browseError)return p`<div class="note">${this._browseError}</div>`;if(this._nav.length===0)return(i.categories??["playlists","radio"]).map(o=>p`
          <button
            class="preset-row"
            @click=${()=>this._browseInto(t,{title:_t(o),media_content_id:o,media_content_type:"music_assistant",can_expand:!0})}
          >
            <ha-icon icon=${qt(o)}></ha-icon>
            <span>${_t(o)}</span>
            <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>
        `);let s=this._children??[];return s.length?s.map(r=>p`
        <button class="preset-row" @click=${()=>this._onItem(t,r,i)}>
          ${r.thumbnail?p`<img class="thumb" src=${r.thumbnail} alt="" />`:p`<ha-icon icon=${r.can_play?"mdi:play-circle-outline":"mdi:folder-outline"}></ha-icon>`}
          <span>${r.title}</span>
          ${r.can_play?u:p`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
        </button>
      `):p`<div class="hint">Nothing here.</div>`}_renderNowPlaying(t){if(!t)return u;if(!pt(t))return p`<div class="note">No transport for this input.</div>`;let i=t.attributes,s=!Y(t.state),r=t.state==="playing";return p`
      <div class="now-playing ${s?"idle":""}">
        <div class="art">
          ${i.entity_picture?p`<img src=${i.entity_picture} alt="" />`:p`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${s?"Nothing playing":i.media_title??""}</div>
          <div class="artist">${s?"Pick a source":i.media_artist??""}</div>
        </div>
        <div class="transport">
          <button class="icon-btn" @click=${()=>this._run(G(t.entity_id,"media_previous_track"))}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn big" @click=${()=>this._run(G(t.entity_id,"media_play_pause"))}>
            <ha-icon icon=${r?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${()=>this._run(G(t.entity_id,"media_next_track"))}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `}_renderSourceVol(t){let i=this._volPct(t);return p`
      <div class="row src-vol">
        <ha-icon icon="mdi:cast-audio"></ha-icon>
        <span class="row-name">Source vol</span>
        <input type="range" min="0" max="100" .value=${String(i)}
          @input=${s=>this._setVol(t,Number(s.target.value),!1)}
          @change=${s=>this._setVol(t,Number(s.target.value),!0)} />
        <span class="pct">${i}%</span>
      </div>
    `}_renderMaster(t,i){let s=i.length?Math.round(i.reduce((o,a)=>o+this._volPct(a.entity_id),0)/i.length):0,r=this._pendingMaster[t.entity]??s;return p`
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
    `}_commitMaster(t,i,s){let r=Nt(i,s),o={...this._pendingVol};for(let a of r)o[a.data.entity_id]=Math.round(a.data.volume_level*100);this._pendingVol=o,this._pendingMaster={...this._pendingMaster,[t.entity]:s},this._run(r)}_turnOff(t,i){let s={...this._pendingMembers[t.entity]??{}};for(let l of i)s[l.entity_id]=!1;this._pendingMembers={...this._pendingMembers,[t.entity]:s};let r=i.map(l=>ut(l.entity_id)),o=this._src(t);o&&pt(o)&&r.push({domain:"media_player",service:"media_stop",data:{entity_id:t.entity}}),this._run(r);let a={...this._picked};delete a[t.entity],this._picked=a}_renderZoneRow(t,i){let s=!!i.attributes.is_volume_muted,r=this._volPct(i.entity_id);return p`
      <div class="row">
        <button class="icon-btn" title="Mute"
          @click=${()=>this._run(Ut(i.entity_id,!s))}>
          <ha-icon icon=${s?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
        </button>
        <span class="row-name">${k(this.hass,i.entity_id)}</span>
        <input type="range" min="0" max="100" .value=${String(r)}
          @input=${o=>this._setVol(i.entity_id,Number(o.target.value),!1)}
          @change=${o=>this._setVol(i.entity_id,Number(o.target.value),!0)} />
        <span class="pct">${r}%</span>
        <button class="icon-btn" title="Turn off this zone"
          @click=${()=>this._setMember(t,i.entity_id,!1)}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `}_renderAddZones(t){if(!this._showAddZones)return p`
        <button class="add-btn" @click=${()=>this._showAddZones=!0}>
          <ha-icon icon="mdi:plus"></ha-icon> Add zones
        </button>
      `;let i=new Set(this._memberStates(t.entity).map(a=>a.entity_id)),s=Lt(this.hass,this._zoneCfg.sources),r=jt(this.hass,this._zoneCfg,zt(this.hass,this._zoneCfg)),o;return p`
      <div class="picker">
        <div class="picker-head">
          <span class="picker-title">Add zones</span>
          <button class="icon-btn" @click=${()=>this._showAddZones=!1}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${r.map(a=>{let l=a.floor!=null&&a.floor!==o;return o=a.floor,p`
            ${l?p`<div class="picker-floor">${a.floor}</div>`:u}
            <div class="picker-group">${a.label}</div>
            ${a.zones.map(c=>{let d=i.has(c),h=s[c],g=h&&h!==t.entity;return p`
                <label class="picker-row">
                  <input type="checkbox" .checked=${d}
                    @change=${()=>this._setMember(t,c,!d)} />
                  <span>${k(this.hass,c)}</span>
                  ${g?p`<span class="on-other">on ${k(this.hass,h)}</span>`:u}
                </label>
              `})}
          `})}
      </div>
    `}};m.styles=X`
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

    .row { display: flex; align-items: center; gap: 8px; }
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
    .preset-row .chev { color: var(--secondary-text-color); flex: 0 0 auto; }
    .thumb { width: 32px; height: 32px; border-radius: 4px; object-fit: cover; flex: 0 0 auto; }
    .on-other {
      margin-left: auto; font-size: 0.8rem; color: var(--secondary-text-color);
    }
  `,_([F({attribute:!1})],m.prototype,"hass",2),_([f()],m.prototype,"_config",2),_([f()],m.prototype,"_selected",2),_([f()],m.prototype,"_showAddZones",2),_([f()],m.prototype,"_pickerOpen",2),_([f()],m.prototype,"_openSource",2),_([f()],m.prototype,"_nav",2),_([f()],m.prototype,"_children",2),_([f()],m.prototype,"_browseLoading",2),_([f()],m.prototype,"_browseError",2),_([f()],m.prototype,"_connectHint",2),_([f()],m.prototype,"_picked",2),_([f()],m.prototype,"_pendingVol",2),_([f()],m.prototype,"_pendingMaster",2),_([f()],m.prototype,"_pendingMembers",2),_([f()],m.prototype,"_showSourceVol",2),m=_([Mt("binary-moip-card")],m);export{m as BinaryMoipCard};
