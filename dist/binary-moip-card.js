var st=Object.defineProperty;var nt=Object.getOwnPropertyDescriptor;var m=(n,t,e,i)=>{for(var s=i>1?void 0:i?nt(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&st(t,e,s),s};var F=globalThis,K=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ie=Symbol(),xe=new WeakMap,I=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(K&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=xe.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&xe.set(e,t))}return t}toString(){return this.cssText}},$e=n=>new I(typeof n=="string"?n:n+"",void 0,ie),L=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new I(e,n,ie)},Se=(n,t)=>{if(K)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=F.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},se=K?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return $e(e)})(n):n;var{is:rt,defineProperty:ot,getOwnPropertyDescriptor:at,getOwnPropertyNames:ct,getOwnPropertySymbols:lt,getPrototypeOf:dt}=Object,G=globalThis,we=G.trustedTypes,pt=we?we.emptyScript:"",ut=G.reactiveElementPolyfillSupport,M=(n,t)=>n,z={toAttribute(n,t){switch(t){case Boolean:n=n?pt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Y=(n,t)=>!rt(n,t),Ae={attribute:!0,type:String,converter:z,reflect:!1,useDefault:!1,hasChanged:Y};Symbol.metadata??=Symbol("metadata"),G.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ae){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&ot(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=at(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ae}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;let t=dt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){let e=this.properties,i=[...ct(e),...lt(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(se(s))}else t!==void 0&&e.push(se(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Se(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:z).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:z;this._$Em=s;let a=o.fromAttribute(e,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(t!==void 0){let o=this.constructor;if(s===!1&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??Y)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[M("elementProperties")]=new Map,x[M("finalized")]=new Map,ut?.({ReactiveElement:x}),(G.reactiveElementVersions??=[]).push("2.1.2");var de=globalThis,ke=n=>n,J=de.trustedTypes,Ee=J?J.createPolicy("lit-html",{createHTML:n=>n}):void 0,Ie="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,Le="?"+S,ht=`<${Le}>`,k=document,N=()=>k.createComment(""),U=n=>n===null||typeof n!="object"&&typeof n!="function",pe=Array.isArray,mt=n=>pe(n)||typeof n?.[Symbol.iterator]=="function",ne=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ce=/-->/g,Pe=/>/g,w=RegExp(`>|${ne}(?:([^\\s"'>=/]+)(${ne}*=${ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Re=/'/g,Te=/"/g,Me=/^(?:script|style|textarea|title)$/i,ue=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),l=ue(1),Pt=ue(2),Rt=ue(3),E=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),He=new WeakMap,A=k.createTreeWalker(k,129);function ze(n,t){if(!pe(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ee!==void 0?Ee.createHTML(t):t}var gt=(n,t)=>{let e=n.length-1,i=[],s,r=t===2?"<svg>":t===3?"<math>":"",o=O;for(let a=0;a<e;a++){let c=n[a],d,h,u=-1,_=0;for(;_<c.length&&(o.lastIndex=_,h=o.exec(c),h!==null);)_=o.lastIndex,o===O?h[1]==="!--"?o=Ce:h[1]!==void 0?o=Pe:h[2]!==void 0?(Me.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=w):h[3]!==void 0&&(o=w):o===w?h[0]===">"?(o=s??O,u=-1):h[1]===void 0?u=-2:(u=o.lastIndex-h[2].length,d=h[1],o=h[3]===void 0?w:h[3]==='"'?Te:Re):o===Te||o===Re?o=w:o===Ce||o===Pe?o=O:(o=w,s=void 0);let b=o===w&&n[a+1].startsWith("/>")?" ":"";r+=o===O?c+ht:u>=0?(i.push(d),c.slice(0,u)+Ie+c.slice(u)+S+b):c+S+(u===-2?a:b)}return[ze(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},j=class n{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0,a=t.length-1,c=this.parts,[d,h]=gt(t,e);if(this.el=n.createElement(d,i),A.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=A.nextNode())!==null&&c.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(Ie)){let _=h[o++],b=s.getAttribute(u).split(S),q=/([.?@])?(.*)/.exec(_);c.push({type:1,index:r,name:q[2],strings:b,ctor:q[1]==="."?oe:q[1]==="?"?ae:q[1]==="@"?ce:R}),s.removeAttribute(u)}else u.startsWith(S)&&(c.push({type:6,index:r}),s.removeAttribute(u));if(Me.test(s.tagName)){let u=s.textContent.split(S),_=u.length-1;if(_>0){s.textContent=J?J.emptyScript:"";for(let b=0;b<_;b++)s.append(u[b],N()),A.nextNode(),c.push({type:2,index:++r});s.append(u[_],N())}}}else if(s.nodeType===8)if(s.data===Le)c.push({type:2,index:r});else{let u=-1;for(;(u=s.data.indexOf(S,u+1))!==-1;)c.push({type:7,index:r}),u+=S.length-1}r++}}static createElement(t,e){let i=k.createElement("template");return i.innerHTML=t,i}};function P(n,t,e=n,i){if(t===E)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,r=U(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=P(n,s._$AS(n,t.values),s,i)),t}var re=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??k).importNode(e,!0);A.currentNode=s;let r=A.nextNode(),o=0,a=0,c=i[0];for(;c!==void 0;){if(o===c.index){let d;c.type===2?d=new V(r,r.nextSibling,this,t):c.type===1?d=new c.ctor(r,c.name,c.strings,this,t):c.type===6&&(d=new le(r,this,t)),this._$AV.push(d),c=i[++a]}o!==c?.index&&(r=A.nextNode(),o++)}return A.currentNode=k,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},V=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),U(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):mt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=j.createElement(ze(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new re(s,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=He.get(t.strings);return e===void 0&&He.set(t.strings,e=new j(t)),e}k(t){pe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new n(this.O(N()),this.O(N()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=ke(t).nextSibling;ke(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(t,e=this,i,s){let r=this.strings,o=!1;if(r===void 0)t=P(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{let a=t,c,d;for(t=r[0],c=0;c<r.length-1;c++)d=P(this,a[i+c],e,c),d===E&&(d=this._$AH[c]),o||=!U(d)||d!==this._$AH[c],d===p?t=p:t!==p&&(t+=(d??"")+r[c+1]),this._$AH[c]=d}o&&!s&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},oe=class extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},ae=class extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},ce=class extends R{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=P(this,t,e,0)??p)===E)return;let i=this._$AH,s=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==p&&(i===p||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},le=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}};var ft=de.litHtmlPolyfillSupport;ft?.(j,V),(de.litHtmlVersions??=[]).push("3.3.3");var Oe=(n,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let r=e?.renderBefore??null;i._$litPart$=s=new V(t.insertBefore(N(),r),r,void 0,e??{})}return s._$AI(n),s};var he=globalThis,y=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Oe(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};y._$litElement$=!0,y.finalized=!0,he.litElementHydrateSupport?.({LitElement:y});var _t=he.litElementPolyfillSupport;_t?.({LitElement:y});(he.litElementVersions??=[]).push("4.2.2");var X=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var vt={attribute:!0,type:String,converter:z,reflect:!1,hasChanged:Y},bt=(n=vt,t,e)=>{let{kind:i,metadata:s}=e,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(e.name,n),i==="accessor"){let{name:o}=e;return{set(a){let c=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,c,n,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,n,a),a}}}if(i==="setter"){let{name:o}=e;return function(a){let c=this[o];t.call(this,a),this.requestUpdate(o,c,n,!0,a)}}throw Error("Unsupported decorator location: "+i)};function T(n){return(t,e)=>typeof e=="object"?bt(n,t,e):((i,s,r)=>{let o=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(n,t,e)}function g(n){return T({...n,state:!0,attribute:!1})}var H={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,STOP:4096,PLAY:16384,GROUPING:524288};var me=(n,t,e)=>Math.min(e,Math.max(t,n)),C=n=>Math.round(me(n??0,0,1)*100);function $(n,t){return n.states[t]?.attributes.friendly_name??t}function Z(n){return(n?.attributes.group_members??[]).filter(e=>e!==n?.entity_id)}function Ue(n){return n?Z(n).length>0||n.state==="playing":!1}function Q(n,t){return((n?.attributes.supported_features??0)&t)===t}function ee(n){return Q(n,H.PLAY)||Q(n,H.PAUSE)||Q(n,H.NEXT_TRACK)||Q(n,H.PREVIOUS_TRACK)}function ge(n){let t=n.map(i=>i.attributes.volume_level).filter(i=>typeof i=="number");if(t.length===0)return 0;let e=t.reduce((i,s)=>i+s,0)/t.length;return Math.round(e*100)}function je(n,t){let e=Math.round(t)-ge(n);if(e===0)return[];let i=[];for(let s of n){let r=C(s.attributes.volume_level),o=me(r+e,0,100);o!==r&&i.push(D(s.entity_id,o/100))}return i}function Ve(n,t){return{domain:"media_player",service:"join",data:{entity_id:n,group_members:[t]}}}function fe(n){return{domain:"media_player",service:"unjoin",data:{entity_id:n}}}function D(n,t){return{domain:"media_player",service:"volume_set",data:{entity_id:n,volume_level:me(t,0,1)}}}function Ze(n,t){return{domain:"media_player",service:"volume_mute",data:{entity_id:n,is_volume_muted:t}}}function te(n,t){return{domain:"media_player",service:t,data:{entity_id:n}}}function De(n,t){let e={};for(let i of t)for(let s of Z(n.states[i]))e[s]=i;return e}function yt(n){let t=n.attributes.moip_role;return t?t==="zone":((n.attributes.supported_features??0)&H.VOLUME_SET)!==0}function Ne(n){return n?(Array.isArray(n)?n:[n]).map(t=>t.toLowerCase()):[]}function _e(n,t,e){let i=Ne(e.floors),s=Ne(e.areas);if(!i.length&&!s.length)return!0;let r=ve(n,t),o=r?n.areas?.[r]:void 0,a=o?.floor_id??null,c=a?n.floors?.[a]:void 0;return!(s.length&&!(!!r&&s.includes(r.toLowerCase())||!!o?.name&&s.includes(o.name.toLowerCase()))||i.length&&!(!!a&&i.includes(a.toLowerCase())||!!c?.name&&i.includes(c.name.toLowerCase())))}function We(n,t){let e;if(t.zone_groups){let i=new Set;for(let s of Object.values(t.zone_groups))for(let r of s)i.add(r);e=[...i].filter(s=>n.states[s])}else{let i=new Set(t.sources??[]);e=[];for(let[s,r]of Object.entries(n.entities??{})){let o=n.states[s];s.startsWith("media_player.")&&r.platform==="binary_moip"&&!i.has(s)&&o&&yt(o)&&e.push(s)}}return e.filter(i=>_e(n,i,t))}function ve(n,t){let e=n.entities?.[t];if(!e)return null;let i=e.area_id??null;return!i&&e.device_id&&(i=n.devices?.[e.device_id]?.area_id??null),i??null}function qe(n,t){let e=ve(n,t);return(e?n.areas?.[e]?.picture:null)??null}function Fe(n,t,e){if(t.zone_groups)return Object.entries(t.zone_groups).map(([a,c])=>({label:a,zones:c.filter(d=>n.states[d])})).filter(a=>a.zones.length>0);let i={},s=[];for(let a of e){let c=ve(n,a),h=(c?n.areas?.[c]:void 0)?.floor_id??null,u=h?n.floors?.[h]:void 0;h&&u?(i[h]??={name:u.name,level:u.level??0,zones:[]}).zones.push(a):s.push(a)}let r=(a,c)=>$(n,a).localeCompare($(n,c)),o=Object.values(i).sort((a,c)=>a.level-c.level||a.name.localeCompare(c.name)).map(a=>({label:a.name,zones:a.zones.sort(r)}));return s.length&&o.push({label:"Zones",zones:s.sort(r)}),o}var xt=new Set(["playing","paused","buffering","on"]),W=n=>!!n&&xt.has(n),Ke=[{type:"library",label:"Music Assistant",icon:"mdi:music-box-multiple",categories:["playlists","radio"]},{type:"connect",label:"Spotify Connect",icon:"mdi:spotify"}],Ge=n=>n.type==="connect",Ye={playlists:{label:"Playlists",icon:"mdi:playlist-music"},radio:{label:"Radio",icon:"mdi:radio"},artists:{label:"Artists",icon:"mdi:account-music"},albums:{label:"Albums",icon:"mdi:album"},tracks:{label:"Tracks",icon:"mdi:music-note"},podcasts:{label:"Podcasts",icon:"mdi:podcast"},audiobooks:{label:"Audiobooks",icon:"mdi:book-music"}},be=n=>Ye[n]?.label??n,Je=n=>Ye[n]?.icon??"mdi:folder-music";function Xe(n,t,e={}){let i={entity_id:n,media_id:t,enqueue:"replace"};return e.mediaType&&(i.media_type=e.mediaType),e.radioMode&&(i.radio_mode=!0),{domain:"music_assistant",service:"play_media",data:i}}function Be(n,t,e){let i={type:"media_player/browse_media",entity_id:n};return t!==void 0&&(i.media_content_id=t,i.media_content_type=e),i}function Qe(){return{type:"binary_moip/spaces"}}function ye(n,t={}){let e={space:n,ref_type:t.refType??"auto"};return t.source&&(e.source=t.source),t.sample&&(e.sample=t.sample),t.level&&(e.level=t.level),t.setLevels!==void 0&&(e.set_levels=t.setLevels),{domain:"binary_moip",service:"calibration_play",data:e}}function et(n,t,e,i){let s={space:n,zone:t,level:e};return i!==void 0&&(s.value=i),{domain:"binary_moip",service:"calibration_set_anchor",data:s}}function tt(n,t,e){return{domain:"binary_moip",service:"calibration_clear_anchor",data:{space:n,zone:t,level:e}}}function it(n){return{domain:"binary_moip",service:"space_deactivate",data:{space:n}}}var $t=["background","listening","party"];window.customCards=[...window.customCards??[],{type:"binary-moip-calibration-card",name:"Binary MoIP Calibration",description:"Walk-around calibration for Listening Spaces: set a reference by music, match the rest by SPL with pink noise."}];var v=class extends y{constructor(){super(...arguments);this._spaces=[];this._level="background";this._refSpl="";this._error=null;this._pendingVol={};this._fetched=!1}setConfig(e){this._config=e}getCardSize(){return 8}static getStubConfig(){return{type:"custom:binary-moip-calibration-card"}}updated(){this.hass&&!this._fetched&&(this._fetched=!0,this._fetchSpaces());let e=this._pendingVol,i=!1;for(let[s,r]of Object.entries(e)){let o=this.hass.states[s];o&&C(o.attributes.volume_level)===r&&(i||(e={...e},i=!0),delete e[s])}i&&(this._pendingVol=e)}async _fetchSpaces(){try{let e=await this.hass.callWS(Qe());this._spaces=e.spaces??[],this._error=null,!this._spaceId&&this._spaces.length&&(this._spaceId=this._spaces[0].id)}catch{this._error="Couldn't read Listening Spaces from the integration."}}async _run(e){await this.hass.callService(e.domain,e.service,e.data)}get _space(){return this._spaces.find(e=>e.id===this._spaceId)}_playMusic(){this._spaceId&&this._run(ye(this._spaceId,{refType:"sample",source:this._config.source,level:this._level,setLevels:!0}))}_playPink(){this._spaceId&&this._run(ye(this._spaceId,{refType:"pink",setLevels:!1}))}async _stop(){this._spaceId&&await this._run(it(this._spaceId))}_volPct(e){return this._pendingVol[e]??C(this.hass.states[e]?.attributes.volume_level)}_setVol(e,i,s){this._pendingVol={...this._pendingVol,[e]:i},s&&this._run(D(e,i/100))}async _save(e){this._spaceId&&(await this._run(et(this._spaceId,e.group_id,this._level)),await this._fetchSpaces())}async _clear(e){this._spaceId&&(await this._run(tt(this._spaceId,e.group_id,this._level)),await this._fetchSpaces())}render(){if(!this.hass||!this._config)return p;let e=this._space;return l`
      <ha-card>
        <h1 class="card-header">${this._config.title??"Calibrate Listening Spaces"}</h1>
        <div class="content">
          ${this._error?l`<div class="note">${this._error}</div>`:p}
          ${this._renderSpacePicker()}
          ${e?this._renderSpace(e):l`<div class="note">No Listening Spaces yet — create one in the integration options.</div>`}
        </div>
      </ha-card>
    `}_renderSpacePicker(){return this._spaces.length?l`
      <div class="chips">
        ${this._spaces.map(e=>l`
            <button
              class="chip ${e.id===this._spaceId?"on":""}"
              @click=${()=>{this._spaceId=e.id,this._refZone=void 0}}
            >
              ${e.name}
              ${e.zones.every(i=>i.calibrated)&&e.zones.length?l`<ha-icon icon="mdi:check-circle"></ha-icon>`:p}
            </button>
          `)}
      </div>
    `:p}_renderSpace(e){return l`
      <div class="seg">
        ${$t.map(i=>l`
            <button class="seg-btn ${i===this._level?"on":""}" @click=${()=>this._level=i}>
              ${i}
            </button>
          `)}
      </div>

      <div class="audio">
        <button class="btn" @click=${this._playMusic}>
          <ha-icon icon="mdi:music"></ha-icon> Music
        </button>
        <button class="btn" @click=${this._playPink}>
          <ha-icon icon="mdi:waveform"></ha-icon> Pink noise
        </button>
        <button class="btn ghost" @click=${this._stop}>
          <ha-icon icon="mdi:stop"></ha-icon> Stop
        </button>
      </div>

      <div class="spl">
        <label>Reference SPL (your meter reading)</label>
        <input
          type="number"
          inputmode="decimal"
          .value=${this._refSpl}
          placeholder="e.g. 72"
          @input=${i=>this._refSpl=i.target.value}
        />
        <span class="unit">dB</span>
      </div>
      <div class="hint">
        Pick the reference zone, set it with <b>Music</b>, switch to <b>Pink noise</b>,
        read your meter into the box above — then match each room to that SPL and
        <b>Save</b>.
      </div>

      ${e.zones.map(i=>this._renderZone(i))}
    `}_renderZone(e){let i=this._refZone===e.group_id,s=e.entity_id,r=s?this._volPct(s):0,o=e.anchors[this._level];return l`
      <div class="zone ${i?"ref":""}">
        <div class="zhead">
          <button
            class="refbtn ${i?"on":""}"
            title="Set as reference zone"
            @click=${()=>this._refZone=e.group_id}
          >
            <ha-icon icon=${i?"mdi:target":"mdi:target-variant"}></ha-icon>
          </button>
          <span class="zname">${e.name}</span>
          <span class="anchor ${o==null?"uncal":""}">
            ${o==null?"uncalibrated":`${this._level}: ${Math.round(o)}`}
          </span>
        </div>
        <div class="zctl">
          <input
            type="range" min="0" max="100" .value=${String(r)}
            ?disabled=${!s}
            @input=${a=>s&&this._setVol(s,Number(a.target.value),!1)}
            @change=${a=>s&&this._setVol(s,Number(a.target.value),!0)}
          />
          <span class="pctv">${r}%</span>
          <button class="save" title="Save this level" @click=${()=>this._save(e)}>
            <ha-icon icon="mdi:content-save"></ha-icon>
          </button>
          ${o==null?p:l`<button class="save ghost" title="Clear" @click=${()=>this._clear(e)}>
                <ha-icon icon="mdi:close"></ha-icon>
              </button>`}
        </div>
      </div>
    `}};v.styles=L`
    ha-card { overflow: hidden; }
    .content { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
    .note { color: var(--secondary-text-color); }
    .hint { color: var(--secondary-text-color); font-size: 0.85rem; }

    .chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .chip {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 6px 12px; border-radius: 16px; cursor: pointer;
      border: 1px solid var(--divider-color); background: none;
      color: var(--primary-text-color); font-size: 0.95rem;
    }
    .chip.on { background: var(--primary-color); color: #fff; border-color: transparent; }
    .chip ha-icon { --mdc-icon-size: 16px; }

    .seg { display: flex; gap: 0; border: 1px solid var(--divider-color); border-radius: 10px; overflow: hidden; }
    .seg-btn {
      flex: 1; padding: 8px; background: none; border: none; cursor: pointer;
      color: var(--primary-text-color); text-transform: capitalize;
      border-right: 1px solid var(--divider-color);
    }
    .seg-btn:last-child { border-right: none; }
    .seg-btn.on { background: var(--primary-color); color: #fff; }

    .audio { display: flex; gap: 8px; }
    .btn {
      flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
      padding: 8px; border-radius: 8px; border: 1px solid var(--divider-color);
      background: none; color: var(--primary-text-color); cursor: pointer;
    }
    .btn.ghost { color: var(--secondary-text-color); }

    .spl { display: flex; align-items: center; gap: 8px; }
    .spl label { flex: 1; color: var(--secondary-text-color); font-size: 0.9rem; }
    .spl input { width: 80px; padding: 6px; }
    .spl .unit { color: var(--secondary-text-color); }

    .zone { border-top: 1px solid var(--divider-color); padding-top: 8px; display: flex; flex-direction: column; gap: 6px; }
    .zone.ref { background: color-mix(in srgb, var(--primary-color) 8%, transparent); border-radius: 8px; padding: 8px; }
    .zhead { display: flex; align-items: center; gap: 8px; }
    .refbtn { background: none; border: none; cursor: pointer; color: var(--secondary-text-color); padding: 2px; }
    .refbtn.on { color: var(--primary-color); }
    .zname { flex: 1; font-weight: 600; }
    .anchor { font-size: 0.82rem; color: var(--primary-text-color); }
    .anchor.uncal { color: var(--warning-color, #e0a030); }
    .zctl { display: flex; align-items: center; gap: 8px; }
    .zctl input[type="range"] { flex: 1; min-width: 0; }
    .pctv { width: 38px; text-align: right; font-variant-numeric: tabular-nums; }
    .save { background: none; border: none; cursor: pointer; color: var(--primary-color); padding: 4px; }
    .save.ghost { color: var(--secondary-text-color); }
    input[type="range"] { accent-color: var(--primary-color); }
  `,m([T({attribute:!1})],v.prototype,"hass",2),m([g()],v.prototype,"_config",2),m([g()],v.prototype,"_spaces",2),m([g()],v.prototype,"_spaceId",2),m([g()],v.prototype,"_level",2),m([g()],v.prototype,"_refZone",2),m([g()],v.prototype,"_refSpl",2),m([g()],v.prototype,"_error",2),m([g()],v.prototype,"_pendingVol",2),v=m([X("binary-moip-calibration-card")],v);var St="2.3.2";console.info(`%c binary-moip-card %c ${St} `,"color:#fff;background:#3399ff;border-radius:3px 0 0 3px;padding:2px 4px","color:#3399ff;background:#222;border-radius:0 3px 3px 0;padding:2px 4px");window.customCards=[...window.customCards??[],{type:"binary-moip-card",name:"Binary MoIP Audio",description:"Streaming-as-parent whole-home audio: pick an input, swap its content, control its zones."}];var f=class extends y{constructor(){super(...arguments);this._showAddZones=!1;this._pickerOpen=!1;this._openSource=null;this._nav=[];this._children=null;this._browseLoading=!1;this._browseError=null;this._connectHint=null;this._picked={};this._pendingVol={};this._pendingMaster={};this._pendingMembers={};this._showSourceVol=!1}setConfig(e){if(!e||!Array.isArray(e.inputs)||e.inputs.length===0)throw new Error("binary-moip-card: `inputs` (a non-empty list) is required");for(let i of e.inputs)if(!i.entity||!i.kind)throw new Error("binary-moip-card: each input needs `entity` and `kind`");this._config=e}get _sources(){return this._config.sources??Ke}getCardSize(){return 6}static getStubConfig(){return{type:"custom:binary-moip-card",inputs:[]}}get _selectedInput(){let e=this._config.inputs;if(this._selected){let i=e.find(s=>s.entity===this._selected);if(i&&this.hass.states[i.entity])return i}return e.find(i=>this.hass.states[i.entity])??e[0]}_src(e){return this.hass.states[e.entity]}get _zoneCfg(){return{zone_groups:this._config.zone_groups,sources:this._config.inputs.map(e=>e.entity),floors:this._config.floors,areas:this._config.areas}}_currentSource(e){let i=this._src(e);if(!W(i?.state))return{label:"Idle",icon:e.icon??"mdi:music"};let s=(e.ma_player?this.hass.states[e.ma_player]:void 0)?.attributes??{};if(s.source==="Spotify Connect"||String(s.app_id??"").startsWith("spotify_connect")){let a=this._sources.find(c=>c.type==="connect");return{label:a?.label??"Spotify Connect",icon:a?.icon??"mdi:spotify"}}let r=this._picked[e.entity];if(r)return r;let o=this._sources.find(a=>a.type==="library");return{label:o?.label??"Music Assistant",icon:o?.icon??"mdi:music-box-multiple"}}_resetPicker(){this._pickerOpen=!1,this._openSource=null,this._nav=[],this._children=null,this._browseError=null,this._connectHint=null}_openChangeSource(){this._resetPicker(),this._pickerOpen=!0}async _loadChildren(e,i){this._children=null,this._browseLoading=!0,this._browseError=null;try{let s=await this.hass.callWS(Be(e,i?.media_content_id,i?.media_content_type));this._children=s.children??[]}catch{this._browseError="Couldn't reach Music Assistant.",this._children=[]}finally{this._browseLoading=!1}}_selectSource(e,i){this._openSource=i,this._nav=[],this._children=null,this._connectHint=null,Ge(this._sources[i])&&(this._connectHint=`Cast from your Spotify app to ${e.name}.`)}_browseInto(e,i){e.ma_player&&(this._nav=[...this._nav,i],this._loadChildren(e.ma_player,i))}_navBack(e){let i=this._nav.slice(0,-1);this._nav=i,this._children=null,i.length&&e.ma_player&&this._loadChildren(e.ma_player,i[i.length-1])}_onItem(e,i,s){if(i.can_play&&e.ma_player){this._run(Xe(e.ma_player,i.media_content_id));let r=[...this._nav.map(o=>o.title),i.title].filter(Boolean).join(" \xB7 ");this._picked={...this._picked,[e.entity]:{label:s.label??"Music Assistant",icon:s.icon??"mdi:music-box-multiple",item:r}},this._resetPicker()}else i.can_expand&&this._browseInto(e,i)}async _run(e){if(!e)return;let i=Array.isArray(e)?e:[e];await Promise.all(i.map(s=>this.hass.callService(s.domain,s.service,s.data)))}updated(){let e=this._pendingVol,i=!1;for(let[c,d]of Object.entries(e)){let h=this.hass.states[c];h&&C(h.attributes.volume_level)===d&&(i||(e={...e},i=!0),delete e[c])}i&&(this._pendingVol=e);let s=this._pendingMaster,r=!1;for(let[c,d]of Object.entries(s)){let h=this._memberStates(c);h.length&&ge(h)===d&&(r||(s={...s},r=!0),delete s[c])}r&&(this._pendingMaster=s);let o=this._pendingMembers,a=!1;for(let[c,d]of Object.entries(o)){let h=new Set(Z(this.hass.states[c]));for(let[u,_]of Object.entries(d))h.has(u)===_&&(a?o[c]===d&&(o[c]={...d}):(o={...o},a=!0),delete o[c][u],Object.keys(o[c]).length||delete o[c])}a&&(this._pendingMembers=o)}_memberStates(e){let i=new Set(Z(this.hass.states[e])),s=this._pendingMembers[e];if(s)for(let[r,o]of Object.entries(s))o?i.add(r):i.delete(r);return[...i].map(r=>this.hass.states[r]).filter(r=>!!r).sort((r,o)=>$(this.hass,r.entity_id).localeCompare($(this.hass,o.entity_id)))}_inScope(e){return _e(this.hass,e,this._zoneCfg)}_volPct(e){return this._pendingVol[e]??C(this.hass.states[e]?.attributes.volume_level)}_setVol(e,i,s){this._pendingVol={...this._pendingVol,[e]:i},s&&this._run(D(e,i/100))}_setMember(e,i,s){let r=this._pendingMembers[e.entity]??{};this._pendingMembers={...this._pendingMembers,[e.entity]:{...r,[i]:s}},this._run(s?Ve(e.entity,i):fe(i))}render(){if(!this.hass||!this._config)return p;let e=this._selectedInput,i=e?this._src(e):void 0,s=e?this._memberStates(e.entity):[],r=s.filter(o=>this._inScope(o.entity_id));return l`
      <ha-card>
        ${this._config.title?l`<h1 class="card-header">${this._config.title}</h1>`:p}
        <div class="content">
          ${this._renderRail(e)}
          ${e?this._renderStreamCard(e):l`<div class="note">No input available</div>`}
          ${e&&r.length?this._renderMaster(e,r):p}
          ${e?s.map(o=>this._renderZoneRow(e,o,!this._inScope(o.entity_id))):p}
          ${e&&i&&s.length===0?l`<div class="note">No zones yet — add one below to hear this.</div>`:p}
          ${e&&i?this._renderAddZones(e):p}
        </div>
      </ha-card>
    `}_renderRail(e){return l`
      <div class="rail">
        ${this._config.inputs.map(i=>{let s=this._src(i),r=Ue(s),o=i.kind==="stream",a=o?this._currentSource(i).label:i.name,c=o?i.name:"Line-in",d=i.icon??(o?"mdi:cast-audio":"mdi:music-box-outline"),h=e&&i.entity===e.entity;return l`
            <button
              class="tile ${h?"selected":""}"
              @click=${()=>{this._selected=i.entity,this._showAddZones=!1,this._resetPicker()}}
            >
              <div class="tile-top">
                <ha-icon icon=${d}></ha-icon>
                ${r?l`<span class="dot"></span>`:p}
              </div>
              <div class="tile-headline">${a}</div>
              <div class="tile-sub">${c}</div>
              <div class="tile-state">${s?s.state:"unavailable"}</div>
            </button>
          `})}
      </div>
    `}_renderStreamCard(e){let i;if(e.kind==="physical")i=l`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${e.icon??"mdi:music-box-outline"}></ha-icon>
          <div class="meta">
            <div class="title">${e.name}</div>
            <div class="artist">Live input — control is at the source; no skip/pause.</div>
          </div>
        </div>
      `;else if(this._pickerOpen)i=this._renderSourcePicker(e);else{let s=this._src(e),r=this._currentSource(e),o=r.item??(W(s?.state)?e.name:"Tap Change source");i=l`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${r.icon}></ha-icon>
          <div class="meta">
            <div class="title">${r.label}</div>
            <div class="artist">${o}</div>
          </div>
          ${e.ma_player?l`<button class="icon-btn" title="Source volume"
                @click=${()=>this._showSourceVol=!this._showSourceVol}>
                <ha-icon icon="mdi:tune-vertical"></ha-icon>
              </button>`:p}
          <button class="change-btn" @click=${()=>this._openChangeSource()}>
            Change source
          </button>
        </div>
        ${e.ma_player&&this._showSourceVol?this._renderSourceVol(e.ma_player):p}
        <div class="sep"></div>
        ${this._renderNowPlaying(s)}
      `}return l`<div class="subcard">${i}</div>`}_renderSourcePicker(e){let i=this._sources,s=this._openSource,r=s!=null?i[s]:void 0,o=r?.type==="library"&&this._nav.length>0,a=s==null?`Change source \u2014 ${e.name}`:this._nav.length?this._nav[this._nav.length-1].title:r?.label??"Source",c=l`
      <div class="picker-head">
        ${s!=null?l`<button class="icon-btn" title="Back" @click=${()=>o?this._navBack(e):this._selectSourceList()}>
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>`:p}
        <span class="picker-title">${a}</span>
        <button class="icon-btn" title="Close" @click=${()=>this._resetPicker()}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `,d;if(s==null){let h=this._src(e),u=W(h?.state)&&ee(h);d=l`
        ${i.map((_,b)=>l`
            <button class="preset-row" @click=${()=>this._selectSource(e,b)}>
              <ha-icon icon=${_.icon??(_.type==="connect"?"mdi:cast":"mdi:music-box-multiple")}></ha-icon>
              <span>${_.label??(_.type==="connect"?"Spotify Connect":"Music Assistant")}</span>
              ${_.type==="connect"?l`<span class="on-other">cast</span>`:l`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
            </button>
          `)}
        ${u?l`
              <button class="preset-row clear" @click=${()=>this._clearSource(e)}>
                <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
                <span>Turn off — stop playing</span>
              </button>
            `:p}
      `}else r?.type==="connect"?d=l`<div class="hint">${this._connectHint}</div>`:r?.type==="library"&&(d=this._renderLibraryBody(e,r));return l`<div class="picker">${c}${d}</div>`}_selectSourceList(){this._openSource=null,this._nav=[],this._children=null,this._connectHint=null}_clearSource(e){this._run({domain:"media_player",service:"media_stop",data:{entity_id:e.entity}});let i={...this._picked};delete i[e.entity],this._picked=i,this._resetPicker()}_renderLibraryBody(e,i){if(this._browseLoading)return l`<div class="hint">Loading…</div>`;if(this._browseError)return l`<div class="note">${this._browseError}</div>`;if(this._nav.length===0)return(i.categories??["playlists","radio"]).map(o=>l`
          <button
            class="preset-row"
            @click=${()=>this._browseInto(e,{title:be(o),media_content_id:o,media_content_type:"music_assistant",can_expand:!0})}
          >
            <ha-icon icon=${Je(o)}></ha-icon>
            <span>${be(o)}</span>
            <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>
        `);let s=this._children??[];return s.length?s.map(r=>l`
        <button class="preset-row" @click=${()=>this._onItem(e,r,i)}>
          ${r.thumbnail?l`<img class="thumb" src=${r.thumbnail} alt="" />`:l`<ha-icon icon=${r.can_play?"mdi:play-circle-outline":"mdi:folder-outline"}></ha-icon>`}
          <span>${r.title}</span>
          ${r.can_play?p:l`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
        </button>
      `):l`<div class="hint">Nothing here.</div>`}_renderNowPlaying(e){if(!e)return p;if(!ee(e))return l`<div class="note">No transport for this input.</div>`;let i=e.attributes,s=!W(e.state),r=e.state==="playing";return l`
      <div class="now-playing ${s?"idle":""}">
        <div class="art">
          ${i.entity_picture?l`<img src=${i.entity_picture} alt="" />`:l`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${s?"Nothing playing":i.media_title??""}</div>
          <div class="artist">${s?"Pick a source":i.media_artist??""}</div>
        </div>
        <div class="transport">
          <button class="icon-btn" @click=${()=>this._run(te(e.entity_id,"media_previous_track"))}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn big" @click=${()=>this._run(te(e.entity_id,"media_play_pause"))}>
            <ha-icon icon=${r?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${()=>this._run(te(e.entity_id,"media_next_track"))}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `}_renderSourceVol(e){let i=this._volPct(e);return l`
      <div class="row src-vol">
        <ha-icon icon="mdi:cast-audio"></ha-icon>
        <span class="row-name">Source vol</span>
        <input type="range" min="0" max="100" .value=${String(i)}
          @input=${s=>this._setVol(e,Number(s.target.value),!1)}
          @change=${s=>this._setVol(e,Number(s.target.value),!0)} />
        <span class="pct">${i}%</span>
      </div>
    `}_renderMaster(e,i){let s=i.length?Math.round(i.reduce((o,a)=>o+this._volPct(a.entity_id),0)/i.length):0,r=this._pendingMaster[e.entity]??s;return l`
      <div class="row master">
        <ha-icon icon="mdi:speaker-multiple"></ha-icon>
        <span class="row-name">All zones</span>
        <input type="range" min="0" max="100" .value=${String(r)}
          @input=${o=>this._pendingMaster={...this._pendingMaster,[e.entity]:Number(o.target.value)}}
          @change=${o=>this._commitMaster(e,i,Number(o.target.value))} />
        <span class="pct">${r}%</span>
        <button class="icon-btn" title="Turn off — remove all zones"
          @click=${()=>this._turnOff(e,i)}>
          <ha-icon icon="mdi:power"></ha-icon>
        </button>
      </div>
    `}_commitMaster(e,i,s){let r=je(i,s),o={...this._pendingVol};for(let a of r)o[a.data.entity_id]=Math.round(a.data.volume_level*100);this._pendingVol=o,this._pendingMaster={...this._pendingMaster,[e.entity]:s},this._run(r)}_turnOff(e,i){let s={...this._pendingMembers[e.entity]??{}};for(let c of i)s[c.entity_id]=!1;this._pendingMembers={...this._pendingMembers,[e.entity]:s};let r=i.map(c=>fe(c.entity_id)),o=this._src(e);o&&ee(o)&&r.push({domain:"media_player",service:"media_stop",data:{entity_id:e.entity}}),this._run(r);let a={...this._picked};delete a[e.entity],this._picked=a}_renderZoneRow(e,i,s=!1){let r=!!i.attributes.is_volume_muted,o=this._volPct(i.entity_id);return s?l`
        <div class="row locked" title="Outside this card's area — control it from its own card">
          <ha-icon class="lock" icon="mdi:lock-outline"></ha-icon>
          <span class="row-name">${$(this.hass,i.entity_id)}</span>
          <input type="range" min="0" max="100" .value=${String(o)} disabled />
          <span class="pct">${o}%</span>
        </div>
      `:l`
      <div class="row">
        <button class="icon-btn" title="Mute"
          @click=${()=>this._run(Ze(i.entity_id,!r))}>
          <ha-icon icon=${r?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
        </button>
        <span class="row-name">${$(this.hass,i.entity_id)}</span>
        <input type="range" min="0" max="100" .value=${String(o)}
          @input=${a=>this._setVol(i.entity_id,Number(a.target.value),!1)}
          @change=${a=>this._setVol(i.entity_id,Number(a.target.value),!0)} />
        <span class="pct">${o}%</span>
        <button class="icon-btn" title="Turn off this zone"
          @click=${()=>this._setMember(e,i.entity_id,!1)}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `}_renderAddZones(e){if(!this._showAddZones)return l`
        <button class="add-btn" @click=${()=>this._showAddZones=!0}>
          <ha-icon icon="mdi:plus"></ha-icon> Add zones
        </button>
      `;let i=new Set(this._memberStates(e.entity).map(o=>o.entity_id)),s=De(this.hass,this._zoneCfg.sources),r=Fe(this.hass,this._zoneCfg,We(this.hass,this._zoneCfg));return l`
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
              ${o.zones.map(a=>{let c=i.has(a),d=s[a],h=d&&d!==e.entity,u=qe(this.hass,a);return l`
                  <button
                    class="pick-tile ${u?"has-image":""} ${c?"selected":""}"
                    style=${u?`background-image: url("${u}")`:""}
                    @click=${()=>this._setMember(e,a,!c)}
                  >
                    ${c?l`<ha-icon class="pick-check" icon="mdi:check-circle"></ha-icon>`:p}
                    <span class="pick-name">${$(this.hass,a)}</span>
                    ${h?l`<span class="pick-other">on ${$(this.hass,d)}</span>`:p}
                  </button>
                `})}
            </div>
          `)}
      </div>
    `}};f.styles=L`
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
  `,m([T({attribute:!1})],f.prototype,"hass",2),m([g()],f.prototype,"_config",2),m([g()],f.prototype,"_selected",2),m([g()],f.prototype,"_showAddZones",2),m([g()],f.prototype,"_pickerOpen",2),m([g()],f.prototype,"_openSource",2),m([g()],f.prototype,"_nav",2),m([g()],f.prototype,"_children",2),m([g()],f.prototype,"_browseLoading",2),m([g()],f.prototype,"_browseError",2),m([g()],f.prototype,"_connectHint",2),m([g()],f.prototype,"_picked",2),m([g()],f.prototype,"_pendingVol",2),m([g()],f.prototype,"_pendingMaster",2),m([g()],f.prototype,"_pendingMembers",2),m([g()],f.prototype,"_showSourceVol",2),f=m([X("binary-moip-card")],f);export{f as BinaryMoipCard};
