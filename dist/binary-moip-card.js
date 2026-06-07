var Gt=Object.defineProperty;var Yt=Object.getOwnPropertyDescriptor;var g=(n,e,t,i)=>{for(var s=i>1?void 0:i?Yt(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&Gt(e,t,s),s};var j=globalThis,V=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),ft=new WeakMap,P=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(V&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=ft.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ft.set(t,e))}return e}toString(){return this.cssText}},_t=n=>new P(typeof n=="string"?n:n+"",void 0,J),X=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new P(t,n,J)},vt=(n,e)=>{if(V)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=j.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)}},Q=V?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return _t(t)})(n):n;var{is:Jt,defineProperty:Xt,getOwnPropertyDescriptor:Qt,getOwnPropertyNames:te,getOwnPropertySymbols:ee,getPrototypeOf:ie}=Object,D=globalThis,yt=D.trustedTypes,se=yt?yt.emptyScript:"",ne=D.reactiveElementPolyfillSupport,R=(n,e)=>n,H={toAttribute(n,e){switch(e){case Boolean:n=n?se:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Z=(n,e)=>!Jt(n,e),bt={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??=Symbol("metadata"),D.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=bt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Xt(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:r}=Qt(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){let c=s?.call(this);r?.call(this,o),this.requestUpdate(e,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??bt}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let e=ie(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let t=this.properties,i=[...te(t),...ee(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(Q(s))}else e!==void 0&&t.push(Q(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return vt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:H).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:H;this._$Em=s;let c=o.fromAttribute(t,r.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){if(e!==void 0){let o=this.constructor;if(s===!1&&(r=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??Z)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:o}=r,c=this[s];o!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,r,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[R("elementProperties")]=new Map,v[R("finalized")]=new Map,ne?.({ReactiveElement:v}),(D.reactiveElementVersions??=[]).push("2.1.2");var ot=globalThis,$t=n=>n,q=ot.trustedTypes,xt=q?q.createPolicy("lit-html",{createHTML:n=>n}):void 0,kt="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,Pt="?"+b,re=`<${Pt}>`,A=document,T=()=>A.createComment(""),O=n=>n===null||typeof n!="object"&&typeof n!="function",at=Array.isArray,oe=n=>at(n)||typeof n?.[Symbol.iterator]=="function",tt=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,St=/-->/g,wt=/>/g,S=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),At=/'/g,Et=/"/g,Rt=/^(?:script|style|textarea|title)$/i,ct=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),d=ct(1),ye=ct(2),be=ct(3),E=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Ct=new WeakMap,w=A.createTreeWalker(A,129);function Ht(n,e){if(!at(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return xt!==void 0?xt.createHTML(e):e}var ae=(n,e)=>{let t=n.length-1,i=[],s,r=e===2?"<svg>":e===3?"<math>":"",o=M;for(let c=0;c<t;c++){let a=n[c],l,p,h=-1,_=0;for(;_<a.length&&(o.lastIndex=_,p=o.exec(a),p!==null);)_=o.lastIndex,o===M?p[1]==="!--"?o=St:p[1]!==void 0?o=wt:p[2]!==void 0?(Rt.test(p[2])&&(s=RegExp("</"+p[2],"g")),o=S):p[3]!==void 0&&(o=S):o===S?p[0]===">"?(o=s??M,h=-1):p[1]===void 0?h=-2:(h=o.lastIndex-p[2].length,l=p[1],o=p[3]===void 0?S:p[3]==='"'?Et:At):o===Et||o===At?o=S:o===St||o===wt?o=M:(o=S,s=void 0);let y=o===S&&n[c+1].startsWith("/>")?" ":"";r+=o===M?a+re:h>=0?(i.push(l),a.slice(0,h)+kt+a.slice(h)+b+y):a+b+(h===-2?c:y)}return[Ht(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},N=class n{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,o=0,c=e.length-1,a=this.parts,[l,p]=ae(e,t);if(this.el=n.createElement(l,i),w.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=w.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(kt)){let _=p[o++],y=s.getAttribute(h).split(b),L=/([.?@])?(.*)/.exec(_);a.push({type:1,index:r,name:L[2],strings:y,ctor:L[1]==="."?it:L[1]==="?"?st:L[1]==="@"?nt:k}),s.removeAttribute(h)}else h.startsWith(b)&&(a.push({type:6,index:r}),s.removeAttribute(h));if(Rt.test(s.tagName)){let h=s.textContent.split(b),_=h.length-1;if(_>0){s.textContent=q?q.emptyScript:"";for(let y=0;y<_;y++)s.append(h[y],T()),w.nextNode(),a.push({type:2,index:++r});s.append(h[_],T())}}}else if(s.nodeType===8)if(s.data===Pt)a.push({type:2,index:r});else{let h=-1;for(;(h=s.data.indexOf(b,h+1))!==-1;)a.push({type:7,index:r}),h+=b.length-1}r++}}static createElement(e,t){let i=A.createElement("template");return i.innerHTML=e,i}};function C(n,e,t=n,i){if(e===E)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,r=O(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=C(n,s._$AS(n,e.values),s,i)),e}var et=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??A).importNode(t,!0);w.currentNode=s;let r=w.nextNode(),o=0,c=0,a=i[0];for(;a!==void 0;){if(o===a.index){let l;a.type===2?l=new I(r,r.nextSibling,this,e):a.type===1?l=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(l=new rt(r,this,e)),this._$AV.push(l),a=i[++c]}o!==a?.index&&(r=w.nextNode(),o++)}return w.currentNode=A,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},I=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),O(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):oe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=N.createElement(Ht(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let r=new et(s,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=Ct.get(e.strings);return t===void 0&&Ct.set(e.strings,t=new N(e)),t}k(e){at(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let r of e)s===t.length?t.push(i=new n(this.O(T()),this.O(T()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=$t(e).nextSibling;$t(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},k=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}_$AI(e,t=this,i,s){let r=this.strings,o=!1;if(r===void 0)e=C(this,e,t,0),o=!O(e)||e!==this._$AH&&e!==E,o&&(this._$AH=e);else{let c=e,a,l;for(e=r[0],a=0;a<r.length-1;a++)l=C(this,c[i+a],t,a),l===E&&(l=this._$AH[a]),o||=!O(l)||l!==this._$AH[a],l===u?e=u:e!==u&&(e+=(l??"")+r[a+1]),this._$AH[a]=l}o&&!s&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},it=class extends k{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},st=class extends k{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},nt=class extends k{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??u)===E)return;let i=this._$AH,s=e===u&&i!==u||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==u&&(i===u||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},rt=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}};var ce=ot.litHtmlPolyfillSupport;ce?.(N,I),(ot.litHtmlVersions??=[]).push("3.3.3");var Mt=(n,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let r=t?.renderBefore??null;i._$litPart$=s=new I(e.insertBefore(T(),r),r,void 0,t??{})}return s._$AI(n),s};var lt=globalThis,$=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Mt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};$._$litElement$=!0,$.finalized=!0,lt.litElementHydrateSupport?.({LitElement:$});var le=lt.litElementPolyfillSupport;le?.({LitElement:$});(lt.litElementVersions??=[]).push("4.2.2");var Tt=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};var de={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:Z},pe=(n=de,e,t)=>{let{kind:i,metadata:s}=t,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(t.name,n),i==="accessor"){let{name:o}=t;return{set(c){let a=e.get.call(this);e.set.call(this,c),this.requestUpdate(o,a,n,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,n,c),c}}}if(i==="setter"){let{name:o}=t;return function(c){let a=this[o];e.call(this,c),this.requestUpdate(o,a,n,!0,c)}}throw Error("Unsupported decorator location: "+i)};function F(n){return(e,t)=>typeof t=="object"?pe(n,e,t):((i,s,r)=>{let o=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(n,e,t)}function f(n){return F({...n,state:!0,attribute:!1})}var U={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,STOP:4096,PLAY:16384,GROUPING:524288};var dt=(n,e,t)=>Math.min(t,Math.max(e,n)),K=n=>Math.round(dt(n??0,0,1)*100);function x(n,e){return n.states[e]?.attributes.friendly_name??e}function z(n){return(n?.attributes.group_members??[]).filter(t=>t!==n?.entity_id)}function Ot(n){return n?z(n).length>0||n.state==="playing":!1}function B(n,e){return((n?.attributes.supported_features??0)&e)===e}function pt(n){return B(n,U.PLAY)||B(n,U.PAUSE)||B(n,U.NEXT_TRACK)||B(n,U.PREVIOUS_TRACK)}function ht(n){let e=n.map(i=>i.attributes.volume_level).filter(i=>typeof i=="number");if(e.length===0)return 0;let t=e.reduce((i,s)=>i+s,0)/e.length;return Math.round(t*100)}function Nt(n,e){let t=Math.round(e)-ht(n);if(t===0)return[];let i=[];for(let s of n){let r=K(s.attributes.volume_level),o=dt(r+t,0,100);o!==r&&i.push(mt(s.entity_id,o/100))}return i}function It(n,e){return{domain:"media_player",service:"join",data:{entity_id:n,group_members:[e]}}}function ut(n){return{domain:"media_player",service:"unjoin",data:{entity_id:n}}}function mt(n,e){return{domain:"media_player",service:"volume_set",data:{entity_id:n,volume_level:dt(e,0,1)}}}function Ut(n,e){return{domain:"media_player",service:"volume_mute",data:{entity_id:n,is_volume_muted:e}}}function G(n,e){return{domain:"media_player",service:e,data:{entity_id:n}}}function zt(n,e){let t={};for(let i of e)for(let s of z(n.states[i]))t[s]=i;return t}function Lt(n,e){if(e.zone_groups){let s=new Set;for(let r of Object.values(e.zone_groups))for(let o of r)s.add(o);return[...s].filter(r=>n.states[r])}let t=new Set(e.sources??[]),i=[];for(let[s,r]of Object.entries(n.entities??{}))s.startsWith("media_player.")&&r.platform==="binary_moip"&&!t.has(s)&&n.states[s]&&i.push(s);return i}function jt(n,e){let t=n.entities?.[e];if(!t)return null;let i=t.area_id??null;return!i&&t.device_id&&(i=n.devices?.[t.device_id]?.area_id??null),i??null}function Vt(n,e){let t=jt(n,e);return(t?n.areas?.[t]?.picture:null)??null}function Dt(n,e,t){if(e.zone_groups)return Object.entries(e.zone_groups).map(([c,a])=>({label:c,zones:a.filter(l=>n.states[l])})).filter(c=>c.zones.length>0);let i={},s=[];for(let c of t){let a=jt(n,c),p=(a?n.areas?.[a]:void 0)?.floor_id??null,h=p?n.floors?.[p]:void 0;p&&h?(i[p]??={name:h.name,level:h.level??0,zones:[]}).zones.push(c):s.push(c)}let r=(c,a)=>x(n,c).localeCompare(x(n,a)),o=Object.values(i).sort((c,a)=>c.level-a.level||c.name.localeCompare(a.name)).map(c=>({label:c.name,zones:c.zones.sort(r)}));return s.length&&o.push({label:"Zones",zones:s.sort(r)}),o}var he=new Set(["playing","paused","buffering","on"]),Y=n=>!!n&&he.has(n),Zt=[{type:"library",label:"Music Assistant",icon:"mdi:music-box-multiple",categories:["playlists","radio"]},{type:"connect",label:"Spotify Connect",icon:"mdi:spotify"}],qt=n=>n.type==="connect",Ft={playlists:{label:"Playlists",icon:"mdi:playlist-music"},radio:{label:"Radio",icon:"mdi:radio"},artists:{label:"Artists",icon:"mdi:account-music"},albums:{label:"Albums",icon:"mdi:album"},tracks:{label:"Tracks",icon:"mdi:music-note"},podcasts:{label:"Podcasts",icon:"mdi:podcast"},audiobooks:{label:"Audiobooks",icon:"mdi:book-music"}},gt=n=>Ft[n]?.label??n,Wt=n=>Ft[n]?.icon??"mdi:folder-music";function Bt(n,e,t={}){let i={entity_id:n,media_id:e,enqueue:"replace"};return t.mediaType&&(i.media_type=t.mediaType),t.radioMode&&(i.radio_mode=!0),{domain:"music_assistant",service:"play_media",data:i}}function Kt(n,e,t){let i={type:"media_player/browse_media",entity_id:n};return e!==void 0&&(i.media_content_id=e,i.media_content_type=t),i}var ue="2.2.0";console.info(`%c binary-moip-card %c ${ue} `,"color:#fff;background:#3399ff;border-radius:3px 0 0 3px;padding:2px 4px","color:#3399ff;background:#222;border-radius:0 3px 3px 0;padding:2px 4px");window.customCards=[...window.customCards??[],{type:"binary-moip-card",name:"Binary MoIP Audio",description:"Streaming-as-parent whole-home audio: pick an input, swap its content, control its zones."}];var m=class extends ${constructor(){super(...arguments);this._showAddZones=!1;this._pickerOpen=!1;this._openSource=null;this._nav=[];this._children=null;this._browseLoading=!1;this._browseError=null;this._connectHint=null;this._picked={};this._pendingVol={};this._pendingMaster={};this._pendingMembers={};this._showSourceVol=!1}setConfig(t){if(!t||!Array.isArray(t.inputs)||t.inputs.length===0)throw new Error("binary-moip-card: `inputs` (a non-empty list) is required");for(let i of t.inputs)if(!i.entity||!i.kind)throw new Error("binary-moip-card: each input needs `entity` and `kind`");this._config=t}get _sources(){return this._config.sources??Zt}getCardSize(){return 6}static getStubConfig(){return{type:"custom:binary-moip-card",inputs:[]}}get _selectedInput(){let t=this._config.inputs;if(this._selected){let i=t.find(s=>s.entity===this._selected);if(i&&this.hass.states[i.entity])return i}return t.find(i=>this.hass.states[i.entity])??t[0]}_src(t){return this.hass.states[t.entity]}get _zoneCfg(){return{zone_groups:this._config.zone_groups,sources:this._config.inputs.map(t=>t.entity)}}_currentSource(t){let i=this._src(t);if(!Y(i?.state))return{label:"Idle",icon:t.icon??"mdi:music"};let s=(t.ma_player?this.hass.states[t.ma_player]:void 0)?.attributes??{};if(s.source==="Spotify Connect"||String(s.app_id??"").startsWith("spotify_connect")){let c=this._sources.find(a=>a.type==="connect");return{label:c?.label??"Spotify Connect",icon:c?.icon??"mdi:spotify"}}let r=this._picked[t.entity];if(r)return r;let o=this._sources.find(c=>c.type==="library");return{label:o?.label??"Music Assistant",icon:o?.icon??"mdi:music-box-multiple"}}_resetPicker(){this._pickerOpen=!1,this._openSource=null,this._nav=[],this._children=null,this._browseError=null,this._connectHint=null}_openChangeSource(){this._resetPicker(),this._pickerOpen=!0}async _loadChildren(t,i){this._children=null,this._browseLoading=!0,this._browseError=null;try{let s=await this.hass.callWS(Kt(t,i?.media_content_id,i?.media_content_type));this._children=s.children??[]}catch{this._browseError="Couldn't reach Music Assistant.",this._children=[]}finally{this._browseLoading=!1}}_selectSource(t,i){this._openSource=i,this._nav=[],this._children=null,this._connectHint=null,qt(this._sources[i])&&(this._connectHint=`Cast from your Spotify app to ${t.name}.`)}_browseInto(t,i){t.ma_player&&(this._nav=[...this._nav,i],this._loadChildren(t.ma_player,i))}_navBack(t){let i=this._nav.slice(0,-1);this._nav=i,this._children=null,i.length&&t.ma_player&&this._loadChildren(t.ma_player,i[i.length-1])}_onItem(t,i,s){if(i.can_play&&t.ma_player){this._run(Bt(t.ma_player,i.media_content_id));let r=[...this._nav.map(o=>o.title),i.title].filter(Boolean).join(" \xB7 ");this._picked={...this._picked,[t.entity]:{label:s.label??"Music Assistant",icon:s.icon??"mdi:music-box-multiple",item:r}},this._resetPicker()}else i.can_expand&&this._browseInto(t,i)}async _run(t){if(!t)return;let i=Array.isArray(t)?t:[t];await Promise.all(i.map(s=>this.hass.callService(s.domain,s.service,s.data)))}updated(){let t=this._pendingVol,i=!1;for(let[a,l]of Object.entries(t)){let p=this.hass.states[a];p&&K(p.attributes.volume_level)===l&&(i||(t={...t},i=!0),delete t[a])}i&&(this._pendingVol=t);let s=this._pendingMaster,r=!1;for(let[a,l]of Object.entries(s)){let p=this._memberStates(a);p.length&&ht(p)===l&&(r||(s={...s},r=!0),delete s[a])}r&&(this._pendingMaster=s);let o=this._pendingMembers,c=!1;for(let[a,l]of Object.entries(o)){let p=new Set(z(this.hass.states[a]));for(let[h,_]of Object.entries(l))p.has(h)===_&&(c?o[a]===l&&(o[a]={...l}):(o={...o},c=!0),delete o[a][h],Object.keys(o[a]).length||delete o[a])}c&&(this._pendingMembers=o)}_memberStates(t){let i=new Set(z(this.hass.states[t])),s=this._pendingMembers[t];if(s)for(let[r,o]of Object.entries(s))o?i.add(r):i.delete(r);return[...i].map(r=>this.hass.states[r]).filter(r=>!!r).sort((r,o)=>x(this.hass,r.entity_id).localeCompare(x(this.hass,o.entity_id)))}_volPct(t){return this._pendingVol[t]??K(this.hass.states[t]?.attributes.volume_level)}_setVol(t,i,s){this._pendingVol={...this._pendingVol,[t]:i},s&&this._run(mt(t,i/100))}_setMember(t,i,s){let r=this._pendingMembers[t.entity]??{};this._pendingMembers={...this._pendingMembers,[t.entity]:{...r,[i]:s}},this._run(s?It(t.entity,i):ut(i))}render(){if(!this.hass||!this._config)return u;let t=this._selectedInput,i=t?this._src(t):void 0,s=t?this._memberStates(t.entity):[];return d`
      <ha-card>
        ${this._config.title?d`<h1 class="card-header">${this._config.title}</h1>`:u}
        <div class="content">
          ${this._renderRail(t)}
          ${t?this._renderStreamCard(t):d`<div class="note">No input available</div>`}
          ${t&&s.length?this._renderMaster(t,s):u}
          ${t?s.map(r=>this._renderZoneRow(t,r)):u}
          ${t&&i&&s.length===0?d`<div class="note">No zones yet — add one below to hear this.</div>`:u}
          ${t&&i?this._renderAddZones(t):u}
        </div>
      </ha-card>
    `}_renderRail(t){return d`
      <div class="rail">
        ${this._config.inputs.map(i=>{let s=this._src(i),r=Ot(s),o=i.kind==="stream",c=o?this._currentSource(i).label:i.name,a=o?i.name:"Line-in",l=i.icon??(o?"mdi:cast-audio":"mdi:music-box-outline"),p=t&&i.entity===t.entity;return d`
            <button
              class="tile ${p?"selected":""}"
              @click=${()=>{this._selected=i.entity,this._showAddZones=!1,this._resetPicker()}}
            >
              <div class="tile-top">
                <ha-icon icon=${l}></ha-icon>
                ${r?d`<span class="dot"></span>`:u}
              </div>
              <div class="tile-headline">${c}</div>
              <div class="tile-sub">${a}</div>
              <div class="tile-state">${s?s.state:"unavailable"}</div>
            </button>
          `})}
      </div>
    `}_renderStreamCard(t){let i;if(t.kind==="physical")i=d`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${t.icon??"mdi:music-box-outline"}></ha-icon>
          <div class="meta">
            <div class="title">${t.name}</div>
            <div class="artist">Live input — control is at the source; no skip/pause.</div>
          </div>
        </div>
      `;else if(this._pickerOpen)i=this._renderSourcePicker(t);else{let s=this._src(t),r=this._currentSource(t),o=r.item??(Y(s?.state)?t.name:"Tap Change source");i=d`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${r.icon}></ha-icon>
          <div class="meta">
            <div class="title">${r.label}</div>
            <div class="artist">${o}</div>
          </div>
          ${t.ma_player?d`<button class="icon-btn" title="Source volume"
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
      `}return d`<div class="subcard">${i}</div>`}_renderSourcePicker(t){let i=this._sources,s=this._openSource,r=s!=null?i[s]:void 0,o=r?.type==="library"&&this._nav.length>0,c=s==null?`Change source \u2014 ${t.name}`:this._nav.length?this._nav[this._nav.length-1].title:r?.label??"Source",a=d`
      <div class="picker-head">
        ${s!=null?d`<button class="icon-btn" title="Back" @click=${()=>o?this._navBack(t):this._selectSourceList()}>
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>`:u}
        <span class="picker-title">${c}</span>
        <button class="icon-btn" title="Close" @click=${()=>this._resetPicker()}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `,l;return s==null?l=i.map((p,h)=>d`
          <button class="preset-row" @click=${()=>this._selectSource(t,h)}>
            <ha-icon icon=${p.icon??(p.type==="connect"?"mdi:cast":"mdi:music-box-multiple")}></ha-icon>
            <span>${p.label??(p.type==="connect"?"Spotify Connect":"Music Assistant")}</span>
            ${p.type==="connect"?d`<span class="on-other">cast</span>`:d`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
          </button>
        `):r?.type==="connect"?l=d`<div class="hint">${this._connectHint}</div>`:r?.type==="library"&&(l=this._renderLibraryBody(t,r)),d`<div class="picker">${a}${l}</div>`}_selectSourceList(){this._openSource=null,this._nav=[],this._children=null,this._connectHint=null}_renderLibraryBody(t,i){if(this._browseLoading)return d`<div class="hint">Loading…</div>`;if(this._browseError)return d`<div class="note">${this._browseError}</div>`;if(this._nav.length===0)return(i.categories??["playlists","radio"]).map(o=>d`
          <button
            class="preset-row"
            @click=${()=>this._browseInto(t,{title:gt(o),media_content_id:o,media_content_type:"music_assistant",can_expand:!0})}
          >
            <ha-icon icon=${Wt(o)}></ha-icon>
            <span>${gt(o)}</span>
            <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>
        `);let s=this._children??[];return s.length?s.map(r=>d`
        <button class="preset-row" @click=${()=>this._onItem(t,r,i)}>
          ${r.thumbnail?d`<img class="thumb" src=${r.thumbnail} alt="" />`:d`<ha-icon icon=${r.can_play?"mdi:play-circle-outline":"mdi:folder-outline"}></ha-icon>`}
          <span>${r.title}</span>
          ${r.can_play?u:d`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
        </button>
      `):d`<div class="hint">Nothing here.</div>`}_renderNowPlaying(t){if(!t)return u;if(!pt(t))return d`<div class="note">No transport for this input.</div>`;let i=t.attributes,s=!Y(t.state),r=t.state==="playing";return d`
      <div class="now-playing ${s?"idle":""}">
        <div class="art">
          ${i.entity_picture?d`<img src=${i.entity_picture} alt="" />`:d`<ha-icon icon="mdi:music"></ha-icon>`}
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
    `}_renderSourceVol(t){let i=this._volPct(t);return d`
      <div class="row src-vol">
        <ha-icon icon="mdi:cast-audio"></ha-icon>
        <span class="row-name">Source vol</span>
        <input type="range" min="0" max="100" .value=${String(i)}
          @input=${s=>this._setVol(t,Number(s.target.value),!1)}
          @change=${s=>this._setVol(t,Number(s.target.value),!0)} />
        <span class="pct">${i}%</span>
      </div>
    `}_renderMaster(t,i){let s=i.length?Math.round(i.reduce((o,c)=>o+this._volPct(c.entity_id),0)/i.length):0,r=this._pendingMaster[t.entity]??s;return d`
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
    `}_commitMaster(t,i,s){let r=Nt(i,s),o={...this._pendingVol};for(let c of r)o[c.data.entity_id]=Math.round(c.data.volume_level*100);this._pendingVol=o,this._pendingMaster={...this._pendingMaster,[t.entity]:s},this._run(r)}_turnOff(t,i){let s={...this._pendingMembers[t.entity]??{}};for(let a of i)s[a.entity_id]=!1;this._pendingMembers={...this._pendingMembers,[t.entity]:s};let r=i.map(a=>ut(a.entity_id)),o=this._src(t);o&&pt(o)&&r.push({domain:"media_player",service:"media_stop",data:{entity_id:t.entity}}),this._run(r);let c={...this._picked};delete c[t.entity],this._picked=c}_renderZoneRow(t,i){let s=!!i.attributes.is_volume_muted,r=this._volPct(i.entity_id);return d`
      <div class="row">
        <button class="icon-btn" title="Mute"
          @click=${()=>this._run(Ut(i.entity_id,!s))}>
          <ha-icon icon=${s?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
        </button>
        <span class="row-name">${x(this.hass,i.entity_id)}</span>
        <input type="range" min="0" max="100" .value=${String(r)}
          @input=${o=>this._setVol(i.entity_id,Number(o.target.value),!1)}
          @change=${o=>this._setVol(i.entity_id,Number(o.target.value),!0)} />
        <span class="pct">${r}%</span>
        <button class="icon-btn" title="Turn off this zone"
          @click=${()=>this._setMember(t,i.entity_id,!1)}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `}_renderAddZones(t){if(!this._showAddZones)return d`
        <button class="add-btn" @click=${()=>this._showAddZones=!0}>
          <ha-icon icon="mdi:plus"></ha-icon> Add zones
        </button>
      `;let i=new Set(this._memberStates(t.entity).map(o=>o.entity_id)),s=zt(this.hass,this._zoneCfg.sources),r=Dt(this.hass,this._zoneCfg,Lt(this.hass,this._zoneCfg));return d`
      <div class="picker">
        <div class="picker-head">
          <span class="picker-title">Add zones</span>
          <button class="icon-btn" @click=${()=>this._showAddZones=!1}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${r.map(o=>d`
            <div class="picker-group">${o.label}</div>
            <div class="pick-grid">
              ${o.zones.map(c=>{let a=i.has(c),l=s[c],p=l&&l!==t.entity,h=Vt(this.hass,c);return d`
                  <button
                    class="pick-tile ${h?"has-image":""} ${a?"selected":""}"
                    style=${h?`background-image: url("${h}")`:""}
                    @click=${()=>this._setMember(t,c,!a)}
                  >
                    ${a?d`<ha-icon class="pick-check" icon="mdi:check-circle"></ha-icon>`:u}
                    <span class="pick-name">${x(this.hass,c)}</span>
                    ${p?d`<span class="pick-other">on ${x(this.hass,l)}</span>`:u}
                  </button>
                `})}
            </div>
          `)}
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
  `,g([F({attribute:!1})],m.prototype,"hass",2),g([f()],m.prototype,"_config",2),g([f()],m.prototype,"_selected",2),g([f()],m.prototype,"_showAddZones",2),g([f()],m.prototype,"_pickerOpen",2),g([f()],m.prototype,"_openSource",2),g([f()],m.prototype,"_nav",2),g([f()],m.prototype,"_children",2),g([f()],m.prototype,"_browseLoading",2),g([f()],m.prototype,"_browseError",2),g([f()],m.prototype,"_connectHint",2),g([f()],m.prototype,"_picked",2),g([f()],m.prototype,"_pendingVol",2),g([f()],m.prototype,"_pendingMaster",2),g([f()],m.prototype,"_pendingMembers",2),g([f()],m.prototype,"_showSourceVol",2),m=g([Tt("binary-moip-card")],m);export{m as BinaryMoipCard};
