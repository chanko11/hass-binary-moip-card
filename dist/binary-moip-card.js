var it=Object.defineProperty;var st=Object.getOwnPropertyDescriptor;var m=(n,t,e,i)=>{for(var s=i>1?void 0:i?st(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&it(t,e,s),s};var K=globalThis,G=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,se=Symbol(),$e=new WeakMap,T=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(G&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=$e.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&$e.set(e,t))}return t}toString(){return this.cssText}},we=n=>new T(typeof n=="string"?n:n+"",void 0,se),H=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new T(e,n,se)},Se=(n,t)=>{if(G)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=K.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},ne=G?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return we(e)})(n):n;var{is:nt,defineProperty:rt,getOwnPropertyDescriptor:ot,getOwnPropertyNames:at,getOwnPropertySymbols:ct,getPrototypeOf:lt}=Object,Y=globalThis,ke=Y.trustedTypes,dt=ke?ke.emptyScript:"",pt=Y.reactiveElementPolyfillSupport,I=(n,t)=>n,M={toAttribute(n,t){switch(t){case Boolean:n=n?dt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},J=(n,t)=>!nt(n,t),Ae={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:J};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ae){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&rt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=ot(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ae}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;let t=lt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){let e=this.properties,i=[...at(e),...ct(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(ne(s))}else t!==void 0&&e.push(ne(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Se(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:M).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:M;this._$Em=s;let a=o.fromAttribute(e,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(t!==void 0){let o=this.constructor;if(s===!1&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??J)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[I("elementProperties")]=new Map,x[I("finalized")]=new Map,pt?.({ReactiveElement:x}),(Y.reactiveElementVersions??=[]).push("2.1.2");var pe=globalThis,Ee=n=>n,X=pe.trustedTypes,Ce=X?X.createPolicy("lit-html",{createHTML:n=>n}):void 0,He="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,Ie="?"+w,ht=`<${Ie}>`,A=document,N=()=>A.createComment(""),U=n=>n===null||typeof n!="object"&&typeof n!="function",he=Array.isArray,ut=n=>he(n)||typeof n?.[Symbol.iterator]=="function",re=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pe=/-->/g,Re=/>/g,S=RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ze=/'/g,Le=/"/g,Me=/^(?:script|style|textarea|title)$/i,ue=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),l=ue(1),Ct=ue(2),Pt=ue(3),E=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Te=new WeakMap,k=A.createTreeWalker(A,129);function Oe(n,t){if(!he(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ce!==void 0?Ce.createHTML(t):t}var mt=(n,t)=>{let e=n.length-1,i=[],s,r=t===2?"<svg>":t===3?"<math>":"",o=O;for(let a=0;a<e;a++){let c=n[a],d,u,h=-1,_=0;for(;_<c.length&&(o.lastIndex=_,u=o.exec(c),u!==null);)_=o.lastIndex,o===O?u[1]==="!--"?o=Pe:u[1]!==void 0?o=Re:u[2]!==void 0?(Me.test(u[2])&&(s=RegExp("</"+u[2],"g")),o=S):u[3]!==void 0&&(o=S):o===S?u[0]===">"?(o=s??O,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?S:u[3]==='"'?Le:ze):o===Le||o===ze?o=S:o===Pe||o===Re?o=O:(o=S,s=void 0);let b=o===S&&n[a+1].startsWith("/>")?" ":"";r+=o===O?c+ht:h>=0?(i.push(d),c.slice(0,h)+He+c.slice(h)+w+b):c+w+(h===-2?a:b)}return[Oe(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},j=class n{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0,a=t.length-1,c=this.parts,[d,u]=mt(t,e);if(this.el=n.createElement(d,i),k.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=k.nextNode())!==null&&c.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(He)){let _=u[o++],b=s.getAttribute(h).split(w),F=/([.?@])?(.*)/.exec(_);c.push({type:1,index:r,name:F[2],strings:b,ctor:F[1]==="."?ae:F[1]==="?"?ce:F[1]==="@"?le:R}),s.removeAttribute(h)}else h.startsWith(w)&&(c.push({type:6,index:r}),s.removeAttribute(h));if(Me.test(s.tagName)){let h=s.textContent.split(w),_=h.length-1;if(_>0){s.textContent=X?X.emptyScript:"";for(let b=0;b<_;b++)s.append(h[b],N()),k.nextNode(),c.push({type:2,index:++r});s.append(h[_],N())}}}else if(s.nodeType===8)if(s.data===Ie)c.push({type:2,index:r});else{let h=-1;for(;(h=s.data.indexOf(w,h+1))!==-1;)c.push({type:7,index:r}),h+=w.length-1}r++}}static createElement(t,e){let i=A.createElement("template");return i.innerHTML=t,i}};function P(n,t,e=n,i){if(t===E)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,r=U(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=P(n,s._$AS(n,t.values),s,i)),t}var oe=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);k.currentNode=s;let r=k.nextNode(),o=0,a=0,c=i[0];for(;c!==void 0;){if(o===c.index){let d;c.type===2?d=new V(r,r.nextSibling,this,t):c.type===1?d=new c.ctor(r,c.name,c.strings,this,t):c.type===6&&(d=new de(r,this,t)),this._$AV.push(d),c=i[++a]}o!==c?.index&&(r=k.nextNode(),o++)}return k.currentNode=A,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},V=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),U(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ut(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=j.createElement(Oe(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new oe(s,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=Te.get(t.strings);return e===void 0&&Te.set(t.strings,e=new j(t)),e}k(t){he(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new n(this.O(N()),this.O(N()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Ee(t).nextSibling;Ee(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(t,e=this,i,s){let r=this.strings,o=!1;if(r===void 0)t=P(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{let a=t,c,d;for(t=r[0],c=0;c<r.length-1;c++)d=P(this,a[i+c],e,c),d===E&&(d=this._$AH[c]),o||=!U(d)||d!==this._$AH[c],d===p?t=p:t!==p&&(t+=(d??"")+r[c+1]),this._$AH[c]=d}o&&!s&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ae=class extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},ce=class extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},le=class extends R{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=P(this,t,e,0)??p)===E)return;let i=this._$AH,s=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==p&&(i===p||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},de=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}};var gt=pe.litHtmlPolyfillSupport;gt?.(j,V),(pe.litHtmlVersions??=[]).push("3.3.3");var Ne=(n,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let r=e?.renderBefore??null;i._$litPart$=s=new V(t.insertBefore(N(),r),r,void 0,e??{})}return s._$AI(n),s};var me=globalThis,y=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ne(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};y._$litElement$=!0,y.finalized=!0,me.litElementHydrateSupport?.({LitElement:y});var ft=me.litElementPolyfillSupport;ft?.({LitElement:y});(me.litElementVersions??=[]).push("4.2.2");var Q=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var _t={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:J},vt=(n=_t,t,e)=>{let{kind:i,metadata:s}=e,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(e.name,n),i==="accessor"){let{name:o}=e;return{set(a){let c=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,c,n,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,n,a),a}}}if(i==="setter"){let{name:o}=e;return function(a){let c=this[o];t.call(this,a),this.requestUpdate(o,c,n,!0,a)}}throw Error("Unsupported decorator location: "+i)};function z(n){return(t,e)=>typeof e=="object"?vt(n,t,e):((i,s,r)=>{let o=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(n,t,e)}function g(n){return z({...n,state:!0,attribute:!1})}var L={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,STOP:4096,PLAY:16384,GROUPING:524288};var ge=(n,t,e)=>Math.min(e,Math.max(t,n)),C=n=>Math.round(ge(n??0,0,1)*100);function $(n,t){return n.states[t]?.attributes.friendly_name??t}function Z(n){return(n?.attributes.group_members??[]).filter(e=>e!==n?.entity_id)}function je(n){return n?Z(n).length>0||n.state==="playing":!1}function ee(n,t){return((n?.attributes.supported_features??0)&t)===t}function te(n){return ee(n,L.PLAY)||ee(n,L.PAUSE)||ee(n,L.NEXT_TRACK)||ee(n,L.PREVIOUS_TRACK)}function fe(n){let t=n.map(i=>i.attributes.volume_level).filter(i=>typeof i=="number");if(t.length===0)return 0;let e=t.reduce((i,s)=>i+s,0)/t.length;return Math.round(e*100)}function Ve(n,t){let e=Math.round(t)-fe(n);if(e===0)return[];let i=[];for(let s of n){let r=C(s.attributes.volume_level),o=ge(r+e,0,100);o!==r&&i.push(D(s.entity_id,o/100))}return i}function Ze(n,t){return{domain:"media_player",service:"join",data:{entity_id:n,group_members:[t]}}}function _e(n){return{domain:"media_player",service:"unjoin",data:{entity_id:n}}}function D(n,t){return{domain:"media_player",service:"volume_set",data:{entity_id:n,volume_level:ge(t,0,1)}}}function W(n,t){return{domain:"media_player",service:"volume_mute",data:{entity_id:n,is_volume_muted:t}}}function ie(n,t){return{domain:"media_player",service:t,data:{entity_id:n}}}function De(n,t){let e={};for(let i of t)for(let s of Z(n.states[i]))e[s]=i;return e}function bt(n){let t=n.attributes.moip_role;return t?t==="zone":((n.attributes.supported_features??0)&L.VOLUME_SET)!==0}function Ue(n){return n?(Array.isArray(n)?n:[n]).map(t=>t.toLowerCase()):[]}function ve(n,t,e){let i=Ue(e.floors),s=Ue(e.areas);if(!i.length&&!s.length)return!0;let r=be(n,t),o=r?n.areas?.[r]:void 0,a=o?.floor_id??null,c=a?n.floors?.[a]:void 0;return!(s.length&&!(!!r&&s.includes(r.toLowerCase())||!!o?.name&&s.includes(o.name.toLowerCase()))||i.length&&!(!!a&&i.includes(a.toLowerCase())||!!c?.name&&i.includes(c.name.toLowerCase())))}function We(n,t){let e;if(t.zone_groups){let i=new Set;for(let s of Object.values(t.zone_groups))for(let r of s)i.add(r);e=[...i].filter(s=>n.states[s])}else{let i=new Set(t.sources??[]);e=[];for(let[s,r]of Object.entries(n.entities??{})){let o=n.states[s];s.startsWith("media_player.")&&r.platform==="binary_moip"&&!i.has(s)&&o&&bt(o)&&e.push(s)}}return e.filter(i=>ve(n,i,t))}function be(n,t){let e=n.entities?.[t];if(!e)return null;let i=e.area_id??null;return!i&&e.device_id&&(i=n.devices?.[e.device_id]?.area_id??null),i??null}function qe(n,t){let e=be(n,t);return(e?n.areas?.[e]?.picture:null)??null}function Fe(n,t,e){if(t.zone_groups)return Object.entries(t.zone_groups).map(([a,c])=>({label:a,zones:c.filter(d=>n.states[d])})).filter(a=>a.zones.length>0);let i={},s=[];for(let a of e){let c=be(n,a),u=(c?n.areas?.[c]:void 0)?.floor_id??null,h=u?n.floors?.[u]:void 0;u&&h?(i[u]??={name:h.name,level:h.level??0,zones:[]}).zones.push(a):s.push(a)}let r=(a,c)=>$(n,a).localeCompare($(n,c)),o=Object.values(i).sort((a,c)=>a.level-c.level||a.name.localeCompare(c.name)).map(a=>({label:a.name,zones:a.zones.sort(r)}));return s.length&&o.push({label:"Zones",zones:s.sort(r)}),o}var yt=new Set(["playing","paused","buffering","on"]),q=n=>!!n&&yt.has(n),Ke=[{type:"library",label:"Music Assistant",icon:"mdi:music-box-multiple",categories:["playlists","radio"]},{type:"connect",label:"Spotify Connect",icon:"mdi:spotify"}],Ge=n=>n.type==="connect",Ye={playlists:{label:"Playlists",icon:"mdi:playlist-music"},radio:{label:"Radio",icon:"mdi:radio"},artists:{label:"Artists",icon:"mdi:account-music"},albums:{label:"Albums",icon:"mdi:album"},tracks:{label:"Tracks",icon:"mdi:music-note"},podcasts:{label:"Podcasts",icon:"mdi:podcast"},audiobooks:{label:"Audiobooks",icon:"mdi:book-music"}},ye=n=>Ye[n]?.label??n,Je=n=>Ye[n]?.icon??"mdi:folder-music";function Xe(n,t,e={}){let i={entity_id:n,media_id:t,enqueue:"replace"};return e.mediaType&&(i.media_type=e.mediaType),e.radioMode&&(i.radio_mode=!0),{domain:"music_assistant",service:"play_media",data:i}}function Qe(n,t,e){let i={type:"media_player/browse_media",entity_id:n};return t!==void 0&&(i.media_content_id=t,i.media_content_type=e),i}function Be(){return{type:"binary_moip/spaces"}}function xe(n,t={}){let e={space:n,ref_type:t.refType??"auto"};return t.source&&(e.source=t.source),t.sample&&(e.sample=t.sample),t.level&&(e.level=t.level),t.setLevels!==void 0&&(e.set_levels=t.setLevels),{domain:"binary_moip",service:"calibration_play",data:e}}function et(n,t,e,i){let s={space:n,zone:t,level:e};return i!==void 0&&(s.value=i),{domain:"binary_moip",service:"calibration_set_anchor",data:s}}function tt(n){return{domain:"binary_moip",service:"space_deactivate",data:{space:n}}}var xt=["background","listening","party"];window.customCards=[...window.customCards??[],{type:"binary-moip-calibration-card",name:"Binary MoIP Calibration",description:"Guided walk-around calibration for Listening Spaces \u2014 one room at a time, match by SPL."}];var v=class extends y{constructor(){super(...arguments);this._spaces=[];this._error=null;this._stage="space";this._level="listening";this._walkIdx=0;this._mode="music";this._refSpl="";this._pendingVol={};this._fetched=!1}setConfig(e){this._config=e}getCardSize(){return 8}static getStubConfig(){return{type:"custom:binary-moip-calibration-card"}}updated(){this.hass&&!this._fetched&&(this._fetched=!0,this._fetchSpaces());let e=this._pendingVol,i=!1;for(let[s,r]of Object.entries(e)){let o=this.hass.states[s];o&&C(o.attributes.volume_level)===r&&(i||(e={...e},i=!0),delete e[s])}i&&(this._pendingVol=e)}async _fetchSpaces(){try{let e=await this.hass.callWS(Be());this._spaces=e.spaces??[],this._error=null}catch{this._error="Couldn't read Listening Spaces from the integration."}}_run(e){return this.hass.callService(e.domain,e.service,e.data)}get _space(){return this._spaces.find(e=>e.id===this._spaceId)}get _walkZones(){let e=this._space;if(!e)return[];let i=e.zones.find(r=>r.group_id===this._refZone),s=e.zones.filter(r=>r.group_id!==this._refZone);return i?[i,...s]:s}get _current(){return this._walkZones[this._walkIdx]}_solo(e){let i=this._space;if(i)for(let s of i.zones)s.entity_id&&this._run(W(s.entity_id,s.entity_id!==e))}_unmuteAll(){for(let e of this._space?.zones??[])e.entity_id&&this._run(W(e.entity_id,!1))}_pickSpace(e){this._spaceId=e,this._stage="level"}_pickLevel(e){this._level=e,this._stage="ref"}async _pickRef(e){this._refZone=e,this._walkIdx=0,this._mode="music",this._stage="walk",await this._run(xe(this._spaceId,{refType:"sample",source:this._config.source,level:this._level,setLevels:!0})),this._solo(this._current?.entity_id)}async _toMode(e){this._mode=e,await this._run(xe(this._spaceId,{refType:e==="pink"?"pink":"sample",setLevels:!1}))}async _goZone(e){e<0||e>=this._walkZones.length||(this._walkIdx===0&&e>0&&this._mode==="music"&&await this._toMode("pink"),this._walkIdx=e,this._solo(this._current?.entity_id))}async _finish(){this._unmuteAll(),this._spaceId&&await this._run(tt(this._spaceId)),this._stage="space",this._walkIdx=0,this._refZone=void 0,await this._fetchSpaces()}_volPct(e){return this._pendingVol[e]??C(this.hass.states[e]?.attributes.volume_level)}_setVol(e,i,s){this._pendingVol={...this._pendingVol,[e]:i},s&&this._run(D(e,i/100))}async _save(e){await this._run(et(this._spaceId,e.group_id,this._level)),await this._fetchSpaces()}render(){return!this.hass||!this._config?p:l`
      <ha-card>
        <h1 class="card-header">${this._config.title??"Calibrate"}</h1>
        <div class="content">
          ${this._error?l`<div class="note">${this._error}</div>`:p}
          ${this._renderStage()}
        </div>
      </ha-card>
    `}_renderStage(){switch(this._stage){case"space":return this._renderPickSpace();case"level":return this._renderPickLevel();case"ref":return this._renderPickRef();case"walk":return this._renderWalk()}}_step(e,i){return l`<div class="steps">Step ${e}/4 · ${i}</div>`}_renderPickSpace(){return this._spaces.length?l`
      ${this._step(1,"Pick a Space")}
      <div class="list">
        ${this._spaces.map(e=>l`
            <button class="row-btn" @click=${()=>this._pickSpace(e.id)}>
              <span>${e.name}</span>
              ${e.zones.length&&e.zones.every(i=>i.calibrated)?l`<ha-icon class="ok" icon="mdi:check-circle"></ha-icon>`:l`<span class="muted">${e.zones.filter(i=>i.calibrated).length}/${e.zones.length}</span>`}
              <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
            </button>
          `)}
      </div>
    `:l`<div class="note">No Listening Spaces yet — create one in the integration options.</div>`}_renderPickLevel(){return l`
      <button class="back" @click=${()=>this._stage="space"}><ha-icon icon="mdi:chevron-left"></ha-icon> ${this._space?.name}</button>
      ${this._step(2,"Pick a Level")}
      <div class="list">
        ${xt.map(e=>l`<button class="row-btn lvl" @click=${()=>this._pickLevel(e)}>
            <span>${e}</span><ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>`)}
      </div>
    `}_renderPickRef(){return l`
      <button class="back" @click=${()=>this._stage="level"}><ha-icon icon="mdi:chevron-left"></ha-icon> ${this._level}</button>
      ${this._step(3,"Pick the reference zone")}
      <div class="hint">Choose your most prominent listening position.</div>
      <div class="list">
        ${(this._space?.zones??[]).map(e=>l`<button class="row-btn" @click=${()=>this._pickRef(e.group_id)}>
            <ha-icon icon="mdi:target"></ha-icon><span>${e.name}</span>
            <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>`)}
      </div>
    `}_renderWalk(){let e=this._current;if(!e)return p;let i=this._walkZones.length,s=this._walkIdx===0,r=e.entity_id,o=r?this._volPct(r):0,a=e.anchors[this._level];return l`
      <button class="back" @click=${()=>this._stage="ref"}><ha-icon icon="mdi:chevron-left"></ha-icon> change reference</button>
      <div class="steps">${this._space?.name} · ${this._level} · zone ${this._walkIdx+1}/${i}</div>

      <div class="zonebig ${s?"ref":""}">
        <ha-icon icon=${s?"mdi:target":"mdi:speaker"}></ha-icon>
        <div class="zb-name">${e.name}${s?l` <span class="tag">reference</span>`:p}</div>
        <div class="zb-sub">only this room is playing${a!=null?` \xB7 saved ${Math.round(a)}`:""}</div>
      </div>

      ${s?l`<div class="audio">
            <button class="btn ${this._mode==="music"?"on":""}" @click=${()=>this._toMode("music")}>
              <ha-icon icon="mdi:music"></ha-icon> Music
            </button>
            <button class="btn ${this._mode==="pink"?"on":""}" @click=${()=>this._toMode("pink")}>
              <ha-icon icon="mdi:waveform"></ha-icon> Pink
            </button>
          </div>
          <div class="hint">Set a comfortable ${this._level} level with music, Save it, then switch to Pink and note the SPL on your meter app.</div>`:l`<div class="hint">Pink noise is playing. Adjust until your meter reads the target SPL, then Save.</div>`}

      <div class="spl">
        <label>${s?"Reference SPL":"Target SPL"}</label>
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
        <ha-icon icon="mdi:content-save"></ha-icon> ${s?"Save as reference":"Save"}
      </button>

      <div class="nav">
        <button class="btn ghost" ?disabled=${this._walkIdx===0} @click=${()=>this._goZone(this._walkIdx-1)}>
          <ha-icon icon="mdi:chevron-left"></ha-icon> Prev
        </button>
        ${this._walkIdx<i-1?l`<button class="btn" @click=${()=>this._goZone(this._walkIdx+1)}>Next <ha-icon icon="mdi:chevron-right"></ha-icon></button>`:l`<button class="btn on" @click=${this._finish}><ha-icon icon="mdi:check"></ha-icon> Finish</button>`}
      </div>
    `}};v.styles=H`
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
  `,m([z({attribute:!1})],v.prototype,"hass",2),m([g()],v.prototype,"_config",2),m([g()],v.prototype,"_spaces",2),m([g()],v.prototype,"_error",2),m([g()],v.prototype,"_stage",2),m([g()],v.prototype,"_spaceId",2),m([g()],v.prototype,"_level",2),m([g()],v.prototype,"_refZone",2),m([g()],v.prototype,"_walkIdx",2),m([g()],v.prototype,"_mode",2),m([g()],v.prototype,"_refSpl",2),m([g()],v.prototype,"_pendingVol",2),v=m([Q("binary-moip-calibration-card")],v);var $t="2.3.2";console.info(`%c binary-moip-card %c ${$t} `,"color:#fff;background:#3399ff;border-radius:3px 0 0 3px;padding:2px 4px","color:#3399ff;background:#222;border-radius:0 3px 3px 0;padding:2px 4px");window.customCards=[...window.customCards??[],{type:"binary-moip-card",name:"Binary MoIP Audio",description:"Streaming-as-parent whole-home audio: pick an input, swap its content, control its zones."}];var f=class extends y{constructor(){super(...arguments);this._showAddZones=!1;this._pickerOpen=!1;this._openSource=null;this._nav=[];this._children=null;this._browseLoading=!1;this._browseError=null;this._connectHint=null;this._picked={};this._pendingVol={};this._pendingMaster={};this._pendingMembers={};this._showSourceVol=!1}setConfig(e){if(!e||!Array.isArray(e.inputs)||e.inputs.length===0)throw new Error("binary-moip-card: `inputs` (a non-empty list) is required");for(let i of e.inputs)if(!i.entity||!i.kind)throw new Error("binary-moip-card: each input needs `entity` and `kind`");this._config=e}get _sources(){return this._config.sources??Ke}getCardSize(){return 6}static getStubConfig(){return{type:"custom:binary-moip-card",inputs:[]}}get _selectedInput(){let e=this._config.inputs;if(this._selected){let i=e.find(s=>s.entity===this._selected);if(i&&this.hass.states[i.entity])return i}return e.find(i=>this.hass.states[i.entity])??e[0]}_src(e){return this.hass.states[e.entity]}get _zoneCfg(){return{zone_groups:this._config.zone_groups,sources:this._config.inputs.map(e=>e.entity),floors:this._config.floors,areas:this._config.areas}}_currentSource(e){let i=this._src(e);if(!q(i?.state))return{label:"Idle",icon:e.icon??"mdi:music"};let s=(e.ma_player?this.hass.states[e.ma_player]:void 0)?.attributes??{};if(s.source==="Spotify Connect"||String(s.app_id??"").startsWith("spotify_connect")){let a=this._sources.find(c=>c.type==="connect");return{label:a?.label??"Spotify Connect",icon:a?.icon??"mdi:spotify"}}let r=this._picked[e.entity];if(r)return r;let o=this._sources.find(a=>a.type==="library");return{label:o?.label??"Music Assistant",icon:o?.icon??"mdi:music-box-multiple"}}_resetPicker(){this._pickerOpen=!1,this._openSource=null,this._nav=[],this._children=null,this._browseError=null,this._connectHint=null}_openChangeSource(){this._resetPicker(),this._pickerOpen=!0}async _loadChildren(e,i){this._children=null,this._browseLoading=!0,this._browseError=null;try{let s=await this.hass.callWS(Qe(e,i?.media_content_id,i?.media_content_type));this._children=s.children??[]}catch{this._browseError="Couldn't reach Music Assistant.",this._children=[]}finally{this._browseLoading=!1}}_selectSource(e,i){this._openSource=i,this._nav=[],this._children=null,this._connectHint=null,Ge(this._sources[i])&&(this._connectHint=`Cast from your Spotify app to ${e.name}.`)}_browseInto(e,i){e.ma_player&&(this._nav=[...this._nav,i],this._loadChildren(e.ma_player,i))}_navBack(e){let i=this._nav.slice(0,-1);this._nav=i,this._children=null,i.length&&e.ma_player&&this._loadChildren(e.ma_player,i[i.length-1])}_onItem(e,i,s){if(i.can_play&&e.ma_player){this._run(Xe(e.ma_player,i.media_content_id));let r=[...this._nav.map(o=>o.title),i.title].filter(Boolean).join(" \xB7 ");this._picked={...this._picked,[e.entity]:{label:s.label??"Music Assistant",icon:s.icon??"mdi:music-box-multiple",item:r}},this._resetPicker()}else i.can_expand&&this._browseInto(e,i)}async _run(e){if(!e)return;let i=Array.isArray(e)?e:[e];await Promise.all(i.map(s=>this.hass.callService(s.domain,s.service,s.data)))}updated(){let e=this._pendingVol,i=!1;for(let[c,d]of Object.entries(e)){let u=this.hass.states[c];u&&C(u.attributes.volume_level)===d&&(i||(e={...e},i=!0),delete e[c])}i&&(this._pendingVol=e);let s=this._pendingMaster,r=!1;for(let[c,d]of Object.entries(s)){let u=this._memberStates(c);u.length&&fe(u)===d&&(r||(s={...s},r=!0),delete s[c])}r&&(this._pendingMaster=s);let o=this._pendingMembers,a=!1;for(let[c,d]of Object.entries(o)){let u=new Set(Z(this.hass.states[c]));for(let[h,_]of Object.entries(d))u.has(h)===_&&(a?o[c]===d&&(o[c]={...d}):(o={...o},a=!0),delete o[c][h],Object.keys(o[c]).length||delete o[c])}a&&(this._pendingMembers=o)}_memberStates(e){let i=new Set(Z(this.hass.states[e])),s=this._pendingMembers[e];if(s)for(let[r,o]of Object.entries(s))o?i.add(r):i.delete(r);return[...i].map(r=>this.hass.states[r]).filter(r=>!!r).sort((r,o)=>$(this.hass,r.entity_id).localeCompare($(this.hass,o.entity_id)))}_inScope(e){return ve(this.hass,e,this._zoneCfg)}_volPct(e){return this._pendingVol[e]??C(this.hass.states[e]?.attributes.volume_level)}_setVol(e,i,s){this._pendingVol={...this._pendingVol,[e]:i},s&&this._run(D(e,i/100))}_setMember(e,i,s){let r=this._pendingMembers[e.entity]??{};this._pendingMembers={...this._pendingMembers,[e.entity]:{...r,[i]:s}},this._run(s?Ze(e.entity,i):_e(i))}render(){if(!this.hass||!this._config)return p;let e=this._selectedInput,i=e?this._src(e):void 0,s=e?this._memberStates(e.entity):[],r=s.filter(o=>this._inScope(o.entity_id));return l`
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
        ${this._config.inputs.map(i=>{let s=this._src(i),r=je(s),o=i.kind==="stream",a=o?this._currentSource(i).label:i.name,c=o?i.name:"Line-in",d=i.icon??(o?"mdi:cast-audio":"mdi:music-box-outline"),u=e&&i.entity===e.entity;return l`
            <button
              class="tile ${u?"selected":""}"
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
      `;else if(this._pickerOpen)i=this._renderSourcePicker(e);else{let s=this._src(e),r=this._currentSource(e),o=r.item??(q(s?.state)?e.name:"Tap Change source");i=l`
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
    `,d;if(s==null){let u=this._src(e),h=q(u?.state)&&te(u);d=l`
        ${i.map((_,b)=>l`
            <button class="preset-row" @click=${()=>this._selectSource(e,b)}>
              <ha-icon icon=${_.icon??(_.type==="connect"?"mdi:cast":"mdi:music-box-multiple")}></ha-icon>
              <span>${_.label??(_.type==="connect"?"Spotify Connect":"Music Assistant")}</span>
              ${_.type==="connect"?l`<span class="on-other">cast</span>`:l`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
            </button>
          `)}
        ${h?l`
              <button class="preset-row clear" @click=${()=>this._clearSource(e)}>
                <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
                <span>Turn off — stop playing</span>
              </button>
            `:p}
      `}else r?.type==="connect"?d=l`<div class="hint">${this._connectHint}</div>`:r?.type==="library"&&(d=this._renderLibraryBody(e,r));return l`<div class="picker">${c}${d}</div>`}_selectSourceList(){this._openSource=null,this._nav=[],this._children=null,this._connectHint=null}_clearSource(e){this._run({domain:"media_player",service:"media_stop",data:{entity_id:e.entity}});let i={...this._picked};delete i[e.entity],this._picked=i,this._resetPicker()}_renderLibraryBody(e,i){if(this._browseLoading)return l`<div class="hint">Loading…</div>`;if(this._browseError)return l`<div class="note">${this._browseError}</div>`;if(this._nav.length===0)return(i.categories??["playlists","radio"]).map(o=>l`
          <button
            class="preset-row"
            @click=${()=>this._browseInto(e,{title:ye(o),media_content_id:o,media_content_type:"music_assistant",can_expand:!0})}
          >
            <ha-icon icon=${Je(o)}></ha-icon>
            <span>${ye(o)}</span>
            <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>
        `);let s=this._children??[];return s.length?s.map(r=>l`
        <button class="preset-row" @click=${()=>this._onItem(e,r,i)}>
          ${r.thumbnail?l`<img class="thumb" src=${r.thumbnail} alt="" />`:l`<ha-icon icon=${r.can_play?"mdi:play-circle-outline":"mdi:folder-outline"}></ha-icon>`}
          <span>${r.title}</span>
          ${r.can_play?p:l`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
        </button>
      `):l`<div class="hint">Nothing here.</div>`}_renderNowPlaying(e){if(!e)return p;if(!te(e))return l`<div class="note">No transport for this input.</div>`;let i=e.attributes,s=!q(e.state),r=e.state==="playing";return l`
      <div class="now-playing ${s?"idle":""}">
        <div class="art">
          ${i.entity_picture?l`<img src=${i.entity_picture} alt="" />`:l`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${s?"Nothing playing":i.media_title??""}</div>
          <div class="artist">${s?"Pick a source":i.media_artist??""}</div>
        </div>
        <div class="transport">
          <button class="icon-btn" @click=${()=>this._run(ie(e.entity_id,"media_previous_track"))}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn big" @click=${()=>this._run(ie(e.entity_id,"media_play_pause"))}>
            <ha-icon icon=${r?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${()=>this._run(ie(e.entity_id,"media_next_track"))}>
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
    `}_commitMaster(e,i,s){let r=Ve(i,s),o={...this._pendingVol};for(let a of r)o[a.data.entity_id]=Math.round(a.data.volume_level*100);this._pendingVol=o,this._pendingMaster={...this._pendingMaster,[e.entity]:s},this._run(r)}_turnOff(e,i){let s={...this._pendingMembers[e.entity]??{}};for(let c of i)s[c.entity_id]=!1;this._pendingMembers={...this._pendingMembers,[e.entity]:s};let r=i.map(c=>_e(c.entity_id)),o=this._src(e);o&&te(o)&&r.push({domain:"media_player",service:"media_stop",data:{entity_id:e.entity}}),this._run(r);let a={...this._picked};delete a[e.entity],this._picked=a}_renderZoneRow(e,i,s=!1){let r=!!i.attributes.is_volume_muted,o=this._volPct(i.entity_id);return s?l`
        <div class="row locked" title="Outside this card's area — control it from its own card">
          <ha-icon class="lock" icon="mdi:lock-outline"></ha-icon>
          <span class="row-name">${$(this.hass,i.entity_id)}</span>
          <input type="range" min="0" max="100" .value=${String(o)} disabled />
          <span class="pct">${o}%</span>
        </div>
      `:l`
      <div class="row">
        <button class="icon-btn" title="Mute"
          @click=${()=>this._run(W(i.entity_id,!r))}>
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
              ${o.zones.map(a=>{let c=i.has(a),d=s[a],u=d&&d!==e.entity,h=qe(this.hass,a);return l`
                  <button
                    class="pick-tile ${h?"has-image":""} ${c?"selected":""}"
                    style=${h?`background-image: url("${h}")`:""}
                    @click=${()=>this._setMember(e,a,!c)}
                  >
                    ${c?l`<ha-icon class="pick-check" icon="mdi:check-circle"></ha-icon>`:p}
                    <span class="pick-name">${$(this.hass,a)}</span>
                    ${u?l`<span class="pick-other">on ${$(this.hass,d)}</span>`:p}
                  </button>
                `})}
            </div>
          `)}
      </div>
    `}};f.styles=H`
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
  `,m([z({attribute:!1})],f.prototype,"hass",2),m([g()],f.prototype,"_config",2),m([g()],f.prototype,"_selected",2),m([g()],f.prototype,"_showAddZones",2),m([g()],f.prototype,"_pickerOpen",2),m([g()],f.prototype,"_openSource",2),m([g()],f.prototype,"_nav",2),m([g()],f.prototype,"_children",2),m([g()],f.prototype,"_browseLoading",2),m([g()],f.prototype,"_browseError",2),m([g()],f.prototype,"_connectHint",2),m([g()],f.prototype,"_picked",2),m([g()],f.prototype,"_pendingVol",2),m([g()],f.prototype,"_pendingMaster",2),m([g()],f.prototype,"_pendingMembers",2),m([g()],f.prototype,"_showSourceVol",2),f=m([Q("binary-moip-card")],f);export{f as BinaryMoipCard};
