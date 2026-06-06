var Wt=Object.defineProperty;var Ft=Object.getOwnPropertyDescriptor;var _=(n,t,e,i)=>{for(var s=i>1?void 0:i?Ft(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&Wt(t,e,s),s};var z=globalThis,j=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),ft=new WeakMap,k=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(j&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=ft.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ft.set(e,t))}return t}toString(){return this.cssText}},gt=n=>new k(typeof n=="string"?n:n+"",void 0,J),X=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new k(e,n,J)},vt=(n,t)=>{if(j)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=z.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},Q=j?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return gt(e)})(n):n;var{is:Gt,defineProperty:Yt,getOwnPropertyDescriptor:Jt,getOwnPropertyNames:Xt,getOwnPropertySymbols:Qt,getPrototypeOf:te}=Object,D=globalThis,yt=D.trustedTypes,ee=yt?yt.emptyScript:"",ie=D.reactiveElementPolyfillSupport,P=(n,t)=>n,R={toAttribute(n,t){switch(t){case Boolean:n=n?ee:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Z=(n,t)=>!Gt(n,t),bt={attribute:!0,type:String,converter:R,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??=Symbol("metadata"),D.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=bt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Yt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=Jt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let c=s?.call(this);r?.call(this,o),this.requestUpdate(t,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??bt}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let t=te(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let e=this.properties,i=[...Xt(e),...Qt(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(Q(s))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return vt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:R).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:R;this._$Em=s;let c=o.fromAttribute(e,r.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(t!==void 0){let o=this.constructor;if(s===!1&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??Z)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:o}=r,c=this[s];o!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,r,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[P("elementProperties")]=new Map,v[P("finalized")]=new Map,ie?.({ReactiveElement:v}),(D.reactiveElementVersions??=[]).push("2.1.2");var ot=globalThis,$t=n=>n,q=ot.trustedTypes,xt=q?q.createPolicy("lit-html",{createHTML:n=>n}):void 0,kt="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,Pt="?"+b,se=`<${Pt}>`,A=document,T=()=>A.createComment(""),O=n=>n===null||typeof n!="object"&&typeof n!="function",at=Array.isArray,ne=n=>at(n)||typeof n?.[Symbol.iterator]=="function",tt=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,St=/-->/g,At=/>/g,x=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),wt=/'/g,Et=/"/g,Rt=/^(?:script|style|textarea|title)$/i,ct=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),l=ct(1),ve=ct(2),ye=ct(3),w=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Ct=new WeakMap,S=A.createTreeWalker(A,129);function Ht(n,t){if(!at(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return xt!==void 0?xt.createHTML(t):t}var re=(n,t)=>{let e=n.length-1,i=[],s,r=t===2?"<svg>":t===3?"<math>":"",o=H;for(let c=0;c<e;c++){let a=n[c],p,h,u=-1,g=0;for(;g<a.length&&(o.lastIndex=g,h=o.exec(a),h!==null);)g=o.lastIndex,o===H?h[1]==="!--"?o=St:h[1]!==void 0?o=At:h[2]!==void 0?(Rt.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=x):h[3]!==void 0&&(o=x):o===x?h[0]===">"?(o=s??H,u=-1):h[1]===void 0?u=-2:(u=o.lastIndex-h[2].length,p=h[1],o=h[3]===void 0?x:h[3]==='"'?Et:wt):o===Et||o===wt?o=x:o===St||o===At?o=H:(o=x,s=void 0);let y=o===x&&n[c+1].startsWith("/>")?" ":"";r+=o===H?a+se:u>=0?(i.push(p),a.slice(0,u)+kt+a.slice(u)+b+y):a+b+(u===-2?c:y)}return[Ht(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},N=class n{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0,c=t.length-1,a=this.parts,[p,h]=re(t,e);if(this.el=n.createElement(p,i),S.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=S.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(kt)){let g=h[o++],y=s.getAttribute(u).split(b),L=/([.?@])?(.*)/.exec(g);a.push({type:1,index:r,name:L[2],strings:y,ctor:L[1]==="."?it:L[1]==="?"?st:L[1]==="@"?nt:C}),s.removeAttribute(u)}else u.startsWith(b)&&(a.push({type:6,index:r}),s.removeAttribute(u));if(Rt.test(s.tagName)){let u=s.textContent.split(b),g=u.length-1;if(g>0){s.textContent=q?q.emptyScript:"";for(let y=0;y<g;y++)s.append(u[y],T()),S.nextNode(),a.push({type:2,index:++r});s.append(u[g],T())}}}else if(s.nodeType===8)if(s.data===Pt)a.push({type:2,index:r});else{let u=-1;for(;(u=s.data.indexOf(b,u+1))!==-1;)a.push({type:7,index:r}),u+=b.length-1}r++}}static createElement(t,e){let i=A.createElement("template");return i.innerHTML=t,i}};function E(n,t,e=n,i){if(t===w)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,r=O(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=E(n,s._$AS(n,t.values),s,i)),t}var et=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);S.currentNode=s;let r=S.nextNode(),o=0,c=0,a=i[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new U(r,r.nextSibling,this,t):a.type===1?p=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(p=new rt(r,this,t)),this._$AV.push(p),a=i[++c]}o!==a?.index&&(r=S.nextNode(),o++)}return S.currentNode=A,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},U=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),O(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ne(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=N.createElement(Ht(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new et(s,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=Ct.get(t.strings);return e===void 0&&Ct.set(t.strings,e=new N(t)),e}k(t){at(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new n(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=$t(t).nextSibling;$t(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,e=this,i,s){let r=this.strings,o=!1;if(r===void 0)t=E(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{let c=t,a,p;for(t=r[0],a=0;a<r.length-1;a++)p=E(this,c[i+a],e,a),p===w&&(p=this._$AH[a]),o||=!O(p)||p!==this._$AH[a],p===d?t=d:t!==d&&(t+=(p??"")+r[a+1]),this._$AH[a]=p}o&&!s&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},it=class extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},st=class extends C{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},nt=class extends C{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??d)===w)return;let i=this._$AH,s=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var oe=ot.litHtmlPolyfillSupport;oe?.(N,U),(ot.litHtmlVersions??=[]).push("3.3.3");var Tt=(n,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let r=e?.renderBefore??null;i._$litPart$=s=new U(t.insertBefore(T(),r),r,void 0,e??{})}return s._$AI(n),s};var lt=globalThis,$=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Tt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};$._$litElement$=!0,$.finalized=!0,lt.litElementHydrateSupport?.({LitElement:$});var ae=lt.litElementPolyfillSupport;ae?.({LitElement:$});(lt.litElementVersions??=[]).push("4.2.2");var Ot=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var ce={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:Z},le=(n=ce,t,e)=>{let{kind:i,metadata:s}=e,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(e.name,n),i==="accessor"){let{name:o}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,a,n,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,n,c),c}}}if(i==="setter"){let{name:o}=e;return function(c){let a=this[o];t.call(this,c),this.requestUpdate(o,a,n,!0,c)}}throw Error("Unsupported decorator location: "+i)};function V(n){return(t,e)=>typeof e=="object"?le(n,t,e):((i,s,r)=>{let o=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(n,t,e)}function f(n){return V({...n,state:!0,attribute:!1})}var I={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,STOP:4096,PLAY:16384,GROUPING:524288};var dt=(n,t,e)=>Math.min(e,Math.max(t,n)),pt=n=>Math.round(dt(n??0,0,1)*100);function W(n,t){return n.states[t]?.attributes.friendly_name??t}function M(n){return(n?.attributes.group_members??[]).filter(e=>e!==n?.entity_id)}function Nt(n){return n?M(n).length>0||n.state==="playing":!1}function K(n,t){return((n?.attributes.supported_features??0)&t)===t}function ht(n){return K(n,I.PLAY)||K(n,I.PAUSE)||K(n,I.NEXT_TRACK)||K(n,I.PREVIOUS_TRACK)}function ut(n){let t=n.map(i=>i.attributes.volume_level).filter(i=>typeof i=="number");if(t.length===0)return 0;let e=t.reduce((i,s)=>i+s,0)/t.length;return Math.round(e*100)}function Ut(n,t){let e=Math.round(t)-ut(n);if(e===0)return[];let i=[];for(let s of n){let r=pt(s.attributes.volume_level),o=dt(r+e,0,100);o!==r&&i.push(mt(s.entity_id,o/100))}return i}function It(n,t){return{domain:"media_player",service:"join",data:{entity_id:n,group_members:[t]}}}function F(n){return{domain:"media_player",service:"unjoin",data:{entity_id:n}}}function mt(n,t){return{domain:"media_player",service:"volume_set",data:{entity_id:n,volume_level:dt(t,0,1)}}}function Mt(n,t){return{domain:"media_player",service:"volume_mute",data:{entity_id:n,is_volume_muted:t}}}function G(n,t){return{domain:"media_player",service:t,data:{entity_id:n}}}function Lt(n,t){let e={};for(let i of t)for(let s of M(n.states[i]))e[s]=i;return e}function zt(n,t){if(t.zone_groups){let s=new Set;for(let r of Object.values(t.zone_groups))for(let o of r)s.add(o);return[...s].filter(r=>n.states[r])}let e=new Set(t.sources??[]),i=[];for(let[s,r]of Object.entries(n.entities??{}))s.startsWith("media_player.")&&r.platform==="binary_moip"&&!e.has(s)&&n.states[s]&&i.push(s);return i}function de(n,t){let e=n.entities?.[t];if(!e)return null;let i=e.area_id??null;return!i&&e.device_id&&(i=n.devices?.[e.device_id]?.area_id??null),i?n.areas?.[i]?.name??null:null}function jt(n,t,e){if(t.zone_groups)return Object.entries(t.zone_groups).map(([s,r])=>({label:s,zones:r.filter(o=>n.states[o])})).filter(s=>s.zones.length>0);let i={};for(let s of e){let r=de(n,s)??"Zones";(i[r]??=[]).push(s)}return Object.entries(i).sort((s,r)=>s[0].localeCompare(r[0])).map(([s,r])=>({label:s,zones:r}))}var pe=new Set(["playing","paused","buffering","on"]),Y=n=>!!n&&pe.has(n),Dt=[{type:"library",label:"Music Assistant",icon:"mdi:music-box-multiple",categories:["playlists","radio"]},{type:"connect",label:"Spotify Connect",icon:"mdi:spotify"}],Zt=n=>n.type==="connect",qt={playlists:{label:"Playlists",icon:"mdi:playlist-music"},radio:{label:"Radio",icon:"mdi:radio"},artists:{label:"Artists",icon:"mdi:account-music"},albums:{label:"Albums",icon:"mdi:album"},tracks:{label:"Tracks",icon:"mdi:music-note"},podcasts:{label:"Podcasts",icon:"mdi:podcast"},audiobooks:{label:"Audiobooks",icon:"mdi:book-music"}},_t=n=>qt[n]?.label??n,Vt=n=>qt[n]?.icon??"mdi:folder-music";function Bt(n,t,e={}){let i={entity_id:n,media_id:t,enqueue:"replace"};return e.mediaType&&(i.media_type=e.mediaType),e.radioMode&&(i.radio_mode=!0),{domain:"music_assistant",service:"play_media",data:i}}function Kt(n,t,e){let i={type:"media_player/browse_media",entity_id:n};return t!==void 0&&(i.media_content_id=t,i.media_content_type=e),i}var he="2.2.0";console.info(`%c binary-moip-card %c ${he} `,"color:#fff;background:#3399ff;border-radius:3px 0 0 3px;padding:2px 4px","color:#3399ff;background:#222;border-radius:0 3px 3px 0;padding:2px 4px");window.customCards=[...window.customCards??[],{type:"binary-moip-card",name:"Binary MoIP Audio",description:"Streaming-as-parent whole-home audio: pick an input, swap its content, control its zones."}];var m=class extends ${constructor(){super(...arguments);this._showAddZones=!1;this._pickerOpen=!1;this._openSource=null;this._nav=[];this._children=null;this._browseLoading=!1;this._browseError=null;this._connectHint=null;this._picked={}}setConfig(e){if(!e||!Array.isArray(e.inputs)||e.inputs.length===0)throw new Error("binary-moip-card: `inputs` (a non-empty list) is required");for(let i of e.inputs)if(!i.entity||!i.kind)throw new Error("binary-moip-card: each input needs `entity` and `kind`");this._config=e}get _sources(){return this._config.sources??Dt}getCardSize(){return 6}static getStubConfig(){return{type:"custom:binary-moip-card",inputs:[]}}get _selectedInput(){let e=this._config.inputs;if(this._selected){let i=e.find(s=>s.entity===this._selected);if(i&&this.hass.states[i.entity])return i}return e.find(i=>this.hass.states[i.entity])??e[0]}_src(e){return this.hass.states[e.entity]}get _zoneCfg(){return{zone_groups:this._config.zone_groups,sources:this._config.inputs.map(e=>e.entity)}}_currentSource(e){let i=this._src(e);if(!Y(i?.state))return{label:"Idle",icon:e.icon??"mdi:music"};let s=this._picked[e.entity];if(s)return s;let r=this._sources.find(o=>o.type==="library");return{label:r?.label??"Music Assistant",icon:r?.icon??"mdi:music-box-multiple"}}_resetPicker(){this._pickerOpen=!1,this._openSource=null,this._nav=[],this._children=null,this._browseError=null,this._connectHint=null}_openChangeSource(){this._resetPicker(),this._pickerOpen=!0}async _loadChildren(e,i){this._children=null,this._browseLoading=!0,this._browseError=null;try{let s=await this.hass.callWS(Kt(e,i?.media_content_id,i?.media_content_type));this._children=s.children??[]}catch{this._browseError="Couldn't reach Music Assistant.",this._children=[]}finally{this._browseLoading=!1}}_selectSource(e,i){this._openSource=i,this._nav=[],this._children=null,this._connectHint=null,Zt(this._sources[i])&&(this._connectHint=`Cast from your Spotify app to ${e.name}.`)}_browseInto(e,i){e.ma_player&&(this._nav=[...this._nav,i],this._loadChildren(e.ma_player,i))}_navBack(e){let i=this._nav.slice(0,-1);this._nav=i,this._children=null,i.length&&e.ma_player&&this._loadChildren(e.ma_player,i[i.length-1])}_onItem(e,i,s){if(i.can_play&&e.ma_player){this._run(Bt(e.ma_player,i.media_content_id));let r=[...this._nav.map(o=>o.title),i.title].filter(Boolean).join(" \xB7 ");this._picked={...this._picked,[e.entity]:{label:s.label??"Music Assistant",icon:s.icon??"mdi:music-box-multiple",item:r}},this._resetPicker()}else i.can_expand&&this._browseInto(e,i)}async _run(e){if(!e)return;let i=Array.isArray(e)?e:[e];await Promise.all(i.map(s=>this.hass.callService(s.domain,s.service,s.data)))}render(){if(!this.hass||!this._config)return d;let e=this._selectedInput,i=e?this._src(e):void 0,s=M(i).map(r=>this.hass.states[r]).filter(r=>!!r);return l`
      <ha-card>
        ${this._config.title?l`<h1 class="card-header">${this._config.title}</h1>`:d}
        <div class="content">
          ${this._renderRail(e)}
          ${e?this._renderStreamCard(e):l`<div class="note">No input available</div>`}
          ${e&&s.length?this._renderMaster(e,s):d}
          ${s.map(r=>this._renderZoneRow(r))}
          ${e&&i&&s.length===0?l`<div class="note">No zones yet — add one below to hear this.</div>`:d}
          ${e&&i?this._renderAddZones(e,i):d}
        </div>
      </ha-card>
    `}_renderRail(e){return l`
      <div class="rail">
        ${this._config.inputs.map(i=>{let s=this._src(i),r=Nt(s),o=i.kind==="stream",c=o?this._currentSource(i).label:i.name,a=o?i.name:"Line-in",p=i.icon??(o?"mdi:cast-audio":"mdi:music-box-outline"),h=e&&i.entity===e.entity;return l`
            <button
              class="tile ${h?"selected":""}"
              @click=${()=>{this._selected=i.entity,this._showAddZones=!1,this._resetPicker()}}
            >
              <div class="tile-top">
                <ha-icon icon=${p}></ha-icon>
                ${r?l`<span class="dot"></span>`:d}
              </div>
              <div class="tile-headline">${c}</div>
              <div class="tile-sub">${a}</div>
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
      `;else if(this._pickerOpen)i=this._renderSourcePicker(e);else{let s=this._src(e),r=this._currentSource(e),o=r.item??(Y(s?.state)?e.name:"Tap Change source");i=l`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${r.icon}></ha-icon>
          <div class="meta">
            <div class="title">${r.label}</div>
            <div class="artist">${o}</div>
          </div>
          <button class="change-btn" @click=${()=>this._openChangeSource()}>
            Change source
          </button>
        </div>
        <div class="sep"></div>
        ${this._renderNowPlaying(s)}
      `}return l`<div class="subcard">${i}</div>`}_renderSourcePicker(e){let i=this._sources,s=this._openSource,r=s!=null?i[s]:void 0,o=r?.type==="library"&&this._nav.length>0,c=s==null?`Change source \u2014 ${e.name}`:this._nav.length?this._nav[this._nav.length-1].title:r?.label??"Source",a=l`
      <div class="picker-head">
        ${s!=null?l`<button class="icon-btn" title="Back" @click=${()=>o?this._navBack(e):this._selectSourceList()}>
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>`:d}
        <span class="picker-title">${c}</span>
        <button class="icon-btn" title="Close" @click=${()=>this._resetPicker()}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `,p;return s==null?p=i.map((h,u)=>l`
          <button class="preset-row" @click=${()=>this._selectSource(e,u)}>
            <ha-icon icon=${h.icon??(h.type==="connect"?"mdi:cast":"mdi:music-box-multiple")}></ha-icon>
            <span>${h.label??(h.type==="connect"?"Spotify Connect":"Music Assistant")}</span>
            ${h.type==="connect"?l`<span class="on-other">cast</span>`:l`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
          </button>
        `):r?.type==="connect"?p=l`<div class="hint">${this._connectHint}</div>`:r?.type==="library"&&(p=this._renderLibraryBody(e,r)),l`<div class="picker">${a}${p}</div>`}_selectSourceList(){this._openSource=null,this._nav=[],this._children=null,this._connectHint=null}_renderLibraryBody(e,i){if(this._browseLoading)return l`<div class="hint">Loading…</div>`;if(this._browseError)return l`<div class="note">${this._browseError}</div>`;if(this._nav.length===0)return(i.categories??["playlists","radio"]).map(o=>l`
          <button
            class="preset-row"
            @click=${()=>this._browseInto(e,{title:_t(o),media_content_id:o,media_content_type:"music_assistant",can_expand:!0})}
          >
            <ha-icon icon=${Vt(o)}></ha-icon>
            <span>${_t(o)}</span>
            <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>
        `);let s=this._children??[];return s.length?s.map(r=>l`
        <button class="preset-row" @click=${()=>this._onItem(e,r,i)}>
          ${r.thumbnail?l`<img class="thumb" src=${r.thumbnail} alt="" />`:l`<ha-icon icon=${r.can_play?"mdi:play-circle-outline":"mdi:folder-outline"}></ha-icon>`}
          <span>${r.title}</span>
          ${r.can_play?d:l`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
        </button>
      `):l`<div class="hint">Nothing here.</div>`}_renderNowPlaying(e){if(!e)return d;if(!ht(e))return l`<div class="note">No transport for this input.</div>`;let i=e.attributes,s=!Y(e.state),r=e.state==="playing";return l`
      <div class="now-playing ${s?"idle":""}">
        <div class="art">
          ${i.entity_picture?l`<img src=${i.entity_picture} alt="" />`:l`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${s?"Nothing playing":i.media_title??""}</div>
          <div class="artist">${s?"Pick a source":i.media_artist??""}</div>
        </div>
        <div class="transport">
          <button class="icon-btn" @click=${()=>this._run(G(e.entity_id,"media_previous_track"))}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn big" @click=${()=>this._run(G(e.entity_id,"media_play_pause"))}>
            <ha-icon icon=${r?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${()=>this._run(G(e.entity_id,"media_next_track"))}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `}_renderMaster(e,i){let s=ut(i);return l`
      <div class="row master">
        <ha-icon icon="mdi:speaker-multiple"></ha-icon>
        <span class="row-name">All zones</span>
        <input type="range" min="0" max="100" .value=${String(s)}
          @change=${r=>this._run(Ut(i,Number(r.target.value)))} />
        <span class="pct">${s}%</span>
        <button class="icon-btn" title="Turn off — remove all zones"
          @click=${()=>this._turnOff(e,i)}>
          <ha-icon icon="mdi:power"></ha-icon>
        </button>
      </div>
    `}_turnOff(e,i){let s=i.map(c=>F(c.entity_id)),r=this._src(e);r&&ht(r)&&s.push({domain:"media_player",service:"media_stop",data:{entity_id:e.entity}}),this._run(s);let o={...this._picked};delete o[e.entity],this._picked=o}_renderZoneRow(e){let i=!!e.attributes.is_volume_muted,s=pt(e.attributes.volume_level);return l`
      <div class="row">
        <button class="icon-btn" title="Mute"
          @click=${()=>this._run(Mt(e.entity_id,!i))}>
          <ha-icon icon=${i?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
        </button>
        <span class="row-name">${W(this.hass,e.entity_id)}</span>
        <input type="range" min="0" max="100" .value=${String(s)}
          @change=${r=>this._run(mt(e.entity_id,Number(r.target.value)/100))} />
        <span class="pct">${s}%</span>
        <button class="icon-btn" title="Remove from session"
          @click=${()=>this._run(F(e.entity_id))}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `}_renderAddZones(e,i){if(!this._showAddZones)return l`
        <button class="add-btn" @click=${()=>this._showAddZones=!0}>
          <ha-icon icon="mdi:plus"></ha-icon> Add zones
        </button>
      `;let s=new Set(M(i)),r=Lt(this.hass,this._zoneCfg.sources),o=jt(this.hass,this._zoneCfg,zt(this.hass,this._zoneCfg));return l`
      <div class="picker">
        <div class="picker-head">
          <span>Add zones</span>
          <button class="icon-btn" @click=${()=>this._showAddZones=!1}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${o.map(c=>l`
            <div class="picker-group">${c.label}</div>
            ${c.zones.map(a=>{let p=s.has(a),h=r[a],u=h&&h!==e.entity;return l`
                <label class="picker-row">
                  <input type="checkbox" .checked=${p}
                    @change=${()=>this._run(p?F(a):It(e.entity,a))} />
                  <span>${W(this.hass,a)}</span>
                  ${u?l`<span class="on-other">on ${W(this.hass,h)}</span>`:d}
                </label>
              `})}
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

    .row { display: flex; align-items: center; gap: 8px; }
    .row.master {
      border-top: 1px solid var(--divider-color);
      padding-top: 12px; font-weight: 500;
    }
    .row-name { flex: 0 0 auto; min-width: 84px; color: var(--primary-text-color); }
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
  `,_([V({attribute:!1})],m.prototype,"hass",2),_([f()],m.prototype,"_config",2),_([f()],m.prototype,"_selected",2),_([f()],m.prototype,"_showAddZones",2),_([f()],m.prototype,"_pickerOpen",2),_([f()],m.prototype,"_openSource",2),_([f()],m.prototype,"_nav",2),_([f()],m.prototype,"_children",2),_([f()],m.prototype,"_browseLoading",2),_([f()],m.prototype,"_browseError",2),_([f()],m.prototype,"_connectHint",2),_([f()],m.prototype,"_picked",2),m=_([Ot("binary-moip-card")],m);export{m as BinaryMoipCard};
