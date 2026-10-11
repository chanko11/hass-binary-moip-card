var Ye=Object.defineProperty;var Je=Object.getOwnPropertyDescriptor;var p=(r,i,e,t)=>{for(var n=t>1?void 0:t?Je(i,e):i,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(t?o(i,e,n):o(n))||n);return t&&n&&Ye(i,e,n),n};var B=globalThis,ee=B.ShadowRoot&&(B.ShadyCSS===void 0||B.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,fe=Symbol(),Ee=new WeakMap,Z=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==fe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(ee&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=Ee.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&Ee.set(e,i))}return i}toString(){return this.cssText}},ze=r=>new Z(typeof r=="string"?r:r+"",void 0,fe),C=(r,...i)=>{let e=r.length===1?r[0]:i.reduce((t,n,s)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+r[s+1],r[0]);return new Z(e,r,fe)},Pe=(r,i)=>{if(ee)r.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),n=B.litNonce;n!==void 0&&t.setAttribute("nonce",n),t.textContent=e.cssText,r.appendChild(t)}},ve=ee?r=>r:r=>r instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return ze(e)})(r):r;var{is:Xe,defineProperty:Qe,getOwnPropertyDescriptor:Be,getOwnPropertyNames:et,getOwnPropertySymbols:tt,getPrototypeOf:it}=Object,te=globalThis,Le=te.trustedTypes,nt=Le?Le.emptyScript:"",st=te.reactiveElementPolyfillSupport,j=(r,i)=>r,D={toAttribute(r,i){switch(i){case Boolean:r=r?nt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,i){let e=r;switch(i){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ie=(r,i)=>!Xe(r,i),Re={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:ie};Symbol.metadata??=Symbol("metadata"),te.litPropertyMetadata??=new WeakMap;var $=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=Re){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),n=this.getPropertyDescriptor(i,t,e);n!==void 0&&Qe(this.prototype,i,n)}}static getPropertyDescriptor(i,e,t){let{get:n,set:s}=Be(this.prototype,i)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){let l=n?.call(this);s?.call(this,o),this.requestUpdate(i,l,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??Re}static _$Ei(){if(this.hasOwnProperty(j("elementProperties")))return;let i=it(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(j("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(j("properties"))){let e=this.properties,t=[...et(e),...tt(e)];for(let n of t)this.createProperty(n,e[n])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let n of t)e.unshift(ve(n))}else i!==void 0&&e.push(ve(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Pe(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),n=this.constructor._$Eu(i,t);if(n!==void 0&&t.reflect===!0){let s=(t.converter?.toAttribute!==void 0?t.converter:D).toAttribute(e,t.type);this._$Em=i,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(i,e){let t=this.constructor,n=t._$Eh.get(i);if(n!==void 0&&this._$Em!==n){let s=t.getPropertyOptions(n),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:D;this._$Em=n;let l=o.fromAttribute(e,s.type);this[n]=l??this._$Ej?.get(n)??l,this._$Em=null}}requestUpdate(i,e,t,n=!1,s){if(i!==void 0){let o=this.constructor;if(n===!1&&(s=this[i]),t??=o.getPropertyOptions(i),!((t.hasChanged??ie)(s,e)||t.useDefault&&t.reflect&&s===this._$Ej?.get(i)&&!this.hasAttribute(o._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:n,wrapped:s},o){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,o??e??this[i]),s!==!0||o!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),n===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[n,s]of t){let{wrapped:o}=s,l=this[n];o!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,s,l)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[j("elementProperties")]=new Map,$[j("finalized")]=new Map,st?.({ReactiveElement:$}),(te.reactiveElementVersions??=[]).push("2.1.2");var Se=globalThis,Te=r=>r,ne=Se.trustedTypes,Ie=ne?ne.createPolicy("lit-html",{createHTML:r=>r}):void 0,We="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,Ve="?"+w,rt=`<${Ve}>`,P=document,F=()=>P.createComment(""),K=r=>r===null||typeof r!="object"&&typeof r!="function",we=Array.isArray,ot=r=>we(r)||typeof r?.[Symbol.iterator]=="function",ge=`[ 	
\f\r]`,q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,He=/-->/g,Ne=/>/g,E=RegExp(`>|${ge}(?:([^\\s"'>=/]+)(${ge}*=${ge}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Oe=/'/g,Me=/"/g,Ze=/^(?:script|style|textarea|title)$/i,ke=r=>(i,...e)=>({_$litType$:r,strings:i,values:e}),a=ke(1),St=ke(2),wt=ke(3),L=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Ue=new WeakMap,z=P.createTreeWalker(P,129);function je(r,i){if(!we(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ie!==void 0?Ie.createHTML(i):i}var at=(r,i)=>{let e=r.length-1,t=[],n,s=i===2?"<svg>":i===3?"<math>":"",o=q;for(let l=0;l<e;l++){let c=r[l],h,f,m=-1,b=0;for(;b<c.length&&(o.lastIndex=b,f=o.exec(c),f!==null);)b=o.lastIndex,o===q?f[1]==="!--"?o=He:f[1]!==void 0?o=Ne:f[2]!==void 0?(Ze.test(f[2])&&(n=RegExp("</"+f[2],"g")),o=E):f[3]!==void 0&&(o=E):o===E?f[0]===">"?(o=n??q,m=-1):f[1]===void 0?m=-2:(m=o.lastIndex-f[2].length,h=f[1],o=f[3]===void 0?E:f[3]==='"'?Me:Oe):o===Me||o===Oe?o=E:o===He||o===Ne?o=q:(o=E,n=void 0);let x=o===E&&r[l+1].startsWith("/>")?" ":"";s+=o===q?c+rt:m>=0?(t.push(h),c.slice(0,m)+We+c.slice(m)+w+x):c+w+(m===-2?l:x)}return[je(r,s+(r[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},G=class r{constructor({strings:i,_$litType$:e},t){let n;this.parts=[];let s=0,o=0,l=i.length-1,c=this.parts,[h,f]=at(i,e);if(this.el=r.createElement(h,t),z.currentNode=this.el.content,e===2||e===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(n=z.nextNode())!==null&&c.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(let m of n.getAttributeNames())if(m.endsWith(We)){let b=f[o++],x=n.getAttribute(m).split(w),Q=/([.?@])?(.*)/.exec(b);c.push({type:1,index:s,name:Q[2],strings:x,ctor:Q[1]==="."?be:Q[1]==="?"?ye:Q[1]==="@"?xe:O}),n.removeAttribute(m)}else m.startsWith(w)&&(c.push({type:6,index:s}),n.removeAttribute(m));if(Ze.test(n.tagName)){let m=n.textContent.split(w),b=m.length-1;if(b>0){n.textContent=ne?ne.emptyScript:"";for(let x=0;x<b;x++)n.append(m[x],F()),z.nextNode(),c.push({type:2,index:++s});n.append(m[b],F())}}}else if(n.nodeType===8)if(n.data===Ve)c.push({type:2,index:s});else{let m=-1;for(;(m=n.data.indexOf(w,m+1))!==-1;)c.push({type:7,index:s}),m+=w.length-1}s++}}static createElement(i,e){let t=P.createElement("template");return t.innerHTML=i,t}};function N(r,i,e=r,t){if(i===L)return i;let n=t!==void 0?e._$Co?.[t]:e._$Cl,s=K(i)?void 0:i._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),s===void 0?n=void 0:(n=new s(r),n._$AT(r,e,t)),t!==void 0?(e._$Co??=[])[t]=n:e._$Cl=n),n!==void 0&&(i=N(r,n._$AS(r,i.values),n,t)),i}var _e=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,n=(i?.creationScope??P).importNode(e,!0);z.currentNode=n;let s=z.nextNode(),o=0,l=0,c=t[0];for(;c!==void 0;){if(o===c.index){let h;c.type===2?h=new Y(s,s.nextSibling,this,i):c.type===1?h=new c.ctor(s,c.name,c.strings,this,i):c.type===6&&(h=new $e(s,this,i)),this._$AV.push(h),c=t[++l]}o!==c?.index&&(s=z.nextNode(),o++)}return z.currentNode=P,n}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},Y=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,n){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=N(this,i,e),K(i)?i===d||i==null||i===""?(this._$AH!==d&&this._$AR(),this._$AH=d):i!==this._$AH&&i!==L&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):ot(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==d&&K(this._$AH)?this._$AA.nextSibling.data=i:this.T(P.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,n=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=G.createElement(je(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===n)this._$AH.p(e);else{let s=new _e(n,this),o=s.u(this.options);s.p(e),this.T(o),this._$AH=s}}_$AC(i){let e=Ue.get(i.strings);return e===void 0&&Ue.set(i.strings,e=new G(i)),e}k(i){we(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,n=0;for(let s of i)n===e.length?e.push(t=new r(this.O(F()),this.O(F()),this,this.options)):t=e[n],t._$AI(s),n++;n<e.length&&(this._$AR(t&&t._$AB.nextSibling,n),e.length=n)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=Te(i).nextSibling;Te(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},O=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,n,s){this.type=1,this._$AH=d,this._$AN=void 0,this.element=i,this.name=e,this._$AM=n,this.options=s,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=d}_$AI(i,e=this,t,n){let s=this.strings,o=!1;if(s===void 0)i=N(this,i,e,0),o=!K(i)||i!==this._$AH&&i!==L,o&&(this._$AH=i);else{let l=i,c,h;for(i=s[0],c=0;c<s.length-1;c++)h=N(this,l[t+c],e,c),h===L&&(h=this._$AH[c]),o||=!K(h)||h!==this._$AH[c],h===d?i=d:i!==d&&(i+=(h??"")+s[c+1]),this._$AH[c]=h}o&&!n&&this.j(i)}j(i){i===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},be=class extends O{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===d?void 0:i}},ye=class extends O{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==d)}},xe=class extends O{constructor(i,e,t,n,s){super(i,e,t,n,s),this.type=5}_$AI(i,e=this){if((i=N(this,i,e,0)??d)===L)return;let t=this._$AH,n=i===d&&t!==d||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,s=i!==d&&(t===d||n);n&&this.element.removeEventListener(this.name,this,t),s&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},$e=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){N(this,i)}};var ct=Se.litHtmlPolyfillSupport;ct?.(G,Y),(Se.litHtmlVersions??=[]).push("3.3.3");var De=(r,i,e)=>{let t=e?.renderBefore??i,n=t._$litPart$;if(n===void 0){let s=e?.renderBefore??null;t._$litPart$=n=new Y(i.insertBefore(F(),s),s,void 0,e??{})}return n._$AI(r),n};var Ae=globalThis,y=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=De(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}};y._$litElement$=!0,y.finalized=!0,Ae.litElementHydrateSupport?.({LitElement:y});var lt=Ae.litElementPolyfillSupport;lt?.({LitElement:y});(Ae.litElementVersions??=[]).push("4.2.2");var M=r=>(i,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,i)}):customElements.define(r,i)};var dt={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:ie},pt=(r=dt,i,e)=>{let{kind:t,metadata:n}=e,s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),t==="setter"&&((r=Object.create(r)).wrapped=!0),s.set(e.name,r),t==="accessor"){let{name:o}=e;return{set(l){let c=i.get.call(this);i.set.call(this,l),this.requestUpdate(o,c,r,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,r,l),l}}}if(t==="setter"){let{name:o}=e;return function(l){let c=this[o];i.call(this,l),this.requestUpdate(o,c,r,!0,l)}}throw Error("Unsupported decorator location: "+t)};function k(r){return(i,e)=>typeof e=="object"?pt(r,i,e):((t,n,s)=>{let o=n.hasOwnProperty(s);return n.constructor.createProperty(s,t),o?Object.getOwnPropertyDescriptor(n,s):void 0})(r,i,e)}function u(r){return k({...r,state:!0,attribute:!1})}var J={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,STOP:4096,PLAY:16384,GROUPING:524288};var qe=(r,i,e)=>Math.min(e,Math.max(i,r)),S=r=>Math.round(qe(r??0,0,1)*100);function ut(r){return(r?.attributes.group_members??[]).filter(e=>e!==r?.entity_id)}function Fe(r){return r?ut(r).length>0||r.state==="playing":!1}function re(r,i){return((r?.attributes.supported_features??0)&i)===i}function X(r){return re(r,J.PLAY)||re(r,J.PAUSE)||re(r,J.NEXT_TRACK)||re(r,J.PREVIOUS_TRACK)}function U(r,i){return{domain:"media_player",service:"volume_set",data:{entity_id:r,volume_level:qe(i,0,1)}}}function R(r,i){return{domain:"media_player",service:"volume_mute",data:{entity_id:r,is_volume_muted:i}}}function A(r,i){return{domain:"media_player",service:i,data:{entity_id:r}}}var ht=new Set(["playing","paused","buffering","on"]),T=r=>!!r&&ht.has(r),oe=[{type:"library",label:"Music Assistant",icon:"mdi:music-box-multiple",categories:["playlists","radio"]},{type:"connect",label:"Spotify Connect",icon:"mdi:spotify"}],ae=r=>r.type==="connect",Ke={playlists:{label:"Playlists",icon:"mdi:playlist-music"},radio:{label:"Radio",icon:"mdi:radio"},artists:{label:"Artists",icon:"mdi:account-music"},albums:{label:"Albums",icon:"mdi:album"},tracks:{label:"Tracks",icon:"mdi:music-note"},podcasts:{label:"Podcasts",icon:"mdi:podcast"},audiobooks:{label:"Audiobooks",icon:"mdi:book-music"}},W=r=>Ke[r]?.label??r,ce=r=>Ke[r]?.icon??"mdi:folder-music";function le(r,i,e={}){let t={entity_id:r,media_id:i,enqueue:"replace"};return e.mediaType&&(t.media_type=e.mediaType),e.radioMode&&(t.radio_mode=!0),{domain:"music_assistant",service:"play_media",data:t}}function de(r,i,e){let t={type:"media_player/browse_media",entity_id:r};return i!==void 0&&(t.media_content_id=i,t.media_content_type=e),t}function I(){return{type:"binary_moip/spaces"}}function V(){return{type:"binary_moip/spaces/subscribe"}}function Ce(r,i={}){let e={space:r,ref_type:i.refType??"auto"};return i.source&&(e.source=i.source),i.sample&&(e.sample=i.sample),i.level&&(e.level=i.level),i.setLevels!==void 0&&(e.set_levels=i.setLevels),{domain:"binary_moip",service:"calibration_play",data:e}}function Ge(r,i,e,t){let n={space:r,zone:i,level:e};return t!==void 0&&(n.value=t),{domain:"binary_moip",service:"calibration_set_anchor",data:n}}function H(r){return{domain:"binary_moip",service:"space_deactivate",data:{space:r}}}function pe(r,i={}){let e={space:r};return i.master!==void 0?e.master=i.master:i.level&&(e.level=i.level),i.source&&(e.source=i.source),{domain:"binary_moip",service:"space_activate",data:e}}function ue(r,i){return{domain:"binary_moip",service:"space_set_level",data:{space:r,level:i}}}function he(r,i){return{domain:"binary_moip",service:"space_set_master",data:{space:r,master:i}}}function me(r,i,e,t){let n={space:r,zone:i,action:e};return t!==void 0&&(n.delta=t),{domain:"binary_moip",service:"zone_set",data:n}}var mt=["background","listening","party"];window.customCards=[...window.customCards??[],{type:"binary-moip-calibration-card",name:"Binary MoIP Calibration",description:"Guided walk-around calibration for Listening Spaces \u2014 one room at a time, match by SPL."}];var _=class extends y{constructor(){super(...arguments);this._spaces=[];this._error=null;this._stage="space";this._level="listening";this._walkIdx=0;this._mode="music";this._refSpl="";this._pendingVol={};this._subscribed=!1}setConfig(e){this._config=e}getCardSize(){return 8}static getStubConfig(){return{type:"custom:binary-moip-calibration-card"}}connectedCallback(){super.connectedCallback(),this._subscribed=!1}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.(),this._unsub=void 0,this._subscribed=!1}_subscribeSpaces(){if(this._subscribed||!this.hass)return;this._subscribed=!0;let e=this.hass.connection;if(!e){this._fetchSpaces();return}e.subscribeMessage(t=>{this._spaces=t.spaces??[],this._error=null},V()).then(t=>{this.isConnected?this._unsub=t:t()}).catch(()=>{this._subscribed=!1,this._fetchSpaces()})}updated(){this._subscribeSpaces();let e=this._pendingVol,t=!1;for(let[n,s]of Object.entries(e)){let o=this.hass.states[n];o&&S(o.attributes.volume_level)===s&&(t||(e={...e},t=!0),delete e[n])}t&&(this._pendingVol=e)}async _fetchSpaces(){try{let e=await this.hass.callWS(I());this._spaces=e.spaces??[],this._error=null}catch{this._error="Couldn't read Listening Spaces from the integration."}}_run(e){return this.hass.callService(e.domain,e.service,e.data)}get _space(){return this._spaces.find(e=>e.id===this._spaceId)}get _walkZones(){let e=this._space;if(!e)return[];let t=e.zones.find(s=>s.group_id===this._refZone),n=e.zones.filter(s=>s.group_id!==this._refZone);return t?[t,...n]:n}get _current(){return this._walkZones[this._walkIdx]}_solo(e){let t=this._space;if(t)for(let n of t.zones)n.entity_id&&this._run(R(n.entity_id,n.entity_id!==e))}_unmuteAll(){for(let e of this._space?.zones??[])e.entity_id&&this._run(R(e.entity_id,!1))}_pickSpace(e){this._spaceId=e,this._stage="level"}_pickLevel(e){this._level=e,this._stage="ref"}async _pickRef(e){this._refZone=e,this._walkIdx=0,this._mode="music",this._stage="walk",await this._run(Ce(this._spaceId,{refType:"sample",source:this._config.source,level:this._level,setLevels:!0})),this._solo(this._current?.entity_id)}async _toMode(e){this._mode=e,await this._run(Ce(this._spaceId,{refType:e==="pink"?"pink":"sample",setLevels:!1}))}async _goZone(e){e<0||e>=this._walkZones.length||(this._walkIdx===0&&e>0&&this._mode==="music"&&await this._toMode("pink"),this._walkIdx=e,this._solo(this._current?.entity_id))}async _finish(){this._unmuteAll(),this._spaceId&&await this._run(H(this._spaceId)),this._stage="space",this._walkIdx=0,this._refZone=void 0,await this._fetchSpaces()}_volPct(e){return this._pendingVol[e]??S(this.hass.states[e]?.attributes.volume_level)}_setVol(e,t,n){this._pendingVol={...this._pendingVol,[e]:t},n&&this._run(U(e,t/100))}async _save(e){await this._run(Ge(this._spaceId,e.group_id,this._level)),await this._fetchSpaces()}render(){return!this.hass||!this._config?d:a`
      <ha-card>
        <h1 class="card-header">${this._config.title??"Calibrate"}</h1>
        <div class="content">
          ${this._error?a`<div class="note">${this._error}</div>`:d}
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
        ${mt.map(e=>a`<button class="row-btn lvl" @click=${()=>this._pickLevel(e)}>
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
    `}_renderWalk(){let e=this._current;if(!e)return d;let t=this._walkZones.length,n=this._walkIdx===0,s=e.entity_id,o=s?this._volPct(s):0,l=e.anchors[this._level];return a`
      <button class="back" @click=${()=>this._stage="ref"}><ha-icon icon="mdi:chevron-left"></ha-icon> change reference</button>
      <div class="steps">${this._space?.name} · ${this._level} · zone ${this._walkIdx+1}/${t}</div>

      <div class="zonebig ${n?"ref":""}">
        <ha-icon icon=${n?"mdi:target":"mdi:speaker"}></ha-icon>
        <div class="zb-name">${e.name}${n?a` <span class="tag">reference</span>`:d}</div>
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
        <input type="range" min="0" max="100" .value=${String(o)} ?disabled=${!s}
          @input=${c=>s&&this._setVol(s,Number(c.target.value),!1)}
          @change=${c=>s&&this._setVol(s,Number(c.target.value),!0)} />
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
    `}};_.styles=C`
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
  `,p([k({attribute:!1})],_.prototype,"hass",2),p([u()],_.prototype,"_config",2),p([u()],_.prototype,"_spaces",2),p([u()],_.prototype,"_error",2),p([u()],_.prototype,"_stage",2),p([u()],_.prototype,"_spaceId",2),p([u()],_.prototype,"_level",2),p([u()],_.prototype,"_refZone",2),p([u()],_.prototype,"_walkIdx",2),p([u()],_.prototype,"_mode",2),p([u()],_.prototype,"_refSpl",2),p([u()],_.prototype,"_pendingVol",2),_=p([M("binary-moip-calibration-card")],_);var ft=["background","listening","party"];window.customCards=[...window.customCards??[],{type:"binary-moip-spaces-card",name:"Binary MoIP Listening Spaces",description:"Space-first whole-home audio: turn Spaces on at a level, master, fine-tune zones."}];var g=class extends y{constructor(){super(...arguments);this._spaces=[];this._error=null;this._expanded={};this._pendingMaster={};this._pendingVol={};this._pickerSpace=null;this._openSource=null;this._nav=[];this._children=null;this._browseLoading=!1;this._browseError=null;this._connectHint=null;this._sourceVolSpace=null;this._selectedSpace=null;this._subscribed=!1}get _sources(){return this._config.sources??oe}_sourceInput(e){return this._inputs.find(t=>t.entity===e.source)}setConfig(e){this._config=e}getCardSize(){return 6}static getStubConfig(){return{type:"custom:binary-moip-spaces-card",inputs:[]}}connectedCallback(){super.connectedCallback(),this._subscribed=!1}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.(),this._unsub=void 0,this._subscribed=!1}_subscribeSpaces(){if(this._subscribed||!this.hass)return;this._subscribed=!0;let e=this.hass.connection;if(!e){this._fetchSpaces();return}e.subscribeMessage(t=>{this._spaces=t.spaces??[],this._error=null},V()).then(t=>{this.isConnected?this._unsub=t:t()}).catch(()=>{this._subscribed=!1,this._fetchSpaces()})}updated(){this._subscribeSpaces();let e=this._pendingVol,t=!1;for(let[n,s]of Object.entries(e)){let o=this.hass.states[n];o&&S(o.attributes.volume_level)===s&&(t||(e={...e},t=!0),delete e[n])}t&&(this._pendingVol=e)}async _fetchSpaces(){try{let e=await this.hass.callWS(I());this._spaces=e.spaces??[],this._error=null}catch{this._error="Couldn't read Listening Spaces from the integration."}}async _run(e){await this.hass.callService(e.domain,e.service,e.data)}async _runRefresh(e){await this._run(e),await this._fetchSpaces()}get _inputs(){return this._config.inputs??[]}_inputName(e){return this._inputs.find(t=>t.entity===e)?.name}_clearMaster(e){if(e in this._pendingMaster){let t={...this._pendingMaster};delete t[e],this._pendingMaster=t}}async _activate(e,t,n){let s=n??e.level??"listening",o=e.master_positions?.[s];o!=null&&(this._pendingMaster={...this._pendingMaster,[e.id]:Math.round(o)}),await this._runRefresh(pe(e.id,{source:t,level:s})),this._clearMaster(e.id)}_deactivate(e){this._clearMaster(e.id),this._runRefresh(H(e.id))}async _setLevel(e,t){let n=e.master_positions?.[t];n!=null&&(this._pendingMaster={...this._pendingMaster,[e.id]:Math.round(n)}),await this._runRefresh(ue(e.id,t)),this._clearMaster(e.id)}async _setMaster(e,t,n){this._pendingMaster={...this._pendingMaster,[e.id]:t},n&&(await this._runRefresh(he(e.id,t)),this._clearMaster(e.id))}_volPct(e){return this._pendingVol[e]??S(this.hass.states[e]?.attributes.volume_level)}_setZoneVol(e,t,n){this._pendingVol={...this._pendingVol,[e]:t},n&&this._run(U(e,t/100))}_zoneToggle(e,t,n){this._runRefresh(me(e.id,t.group_id,n?"on":"off"))}_resetPicker(){this._pickerSpace=null,this._openSource=null,this._nav=[],this._children=null,this._browseError=null,this._connectHint=null}_openPicker(e){this._resetPicker(),this._pickerSpace=e.id}async _loadChildren(e,t){this._children=null,this._browseLoading=!0,this._browseError=null;try{let n=await this.hass.callWS(de(e,t?.media_content_id,t?.media_content_type));this._children=n.children??[]}catch{this._browseError="Couldn't reach Music Assistant.",this._children=[]}finally{this._browseLoading=!1}}_selectSourceList(){this._openSource=null,this._nav=[],this._children=null,this._connectHint=null}_selectSource(e,t){this._openSource=t,this._nav=[],this._children=null,this._connectHint=null,ae(this._sources[t])&&(this._connectHint=`Cast from your Spotify app to ${e.name}.`)}_browseInto(e,t){e.ma_player&&(this._nav=[...this._nav,t],this._loadChildren(e.ma_player,t))}_navBack(e){let t=this._nav.slice(0,-1);this._nav=t,this._children=null,t.length&&e.ma_player&&this._loadChildren(e.ma_player,t[t.length-1])}_onItem(e,t){t.can_play&&e.ma_player?(this._run(le(e.ma_player,t.media_content_id)),this._resetPicker()):t.can_expand&&this._browseInto(e,t)}render(){if(!this.hass||!this._config)return d;let e=this._spaces.length?this._config.view==="select"?this._renderSelect():this._spaces.map(t=>this._renderSpace(t)):a`<div class="note">No Listening Spaces yet — create one in the integration options.</div>`;return a`
      <ha-card>
        ${this._config.title?a`<h1 class="card-header">${this._config.title}</h1>`:d}
        <div class="content">
          ${this._error?a`<div class="note">${this._error}</div>`:d}
          ${e}
        </div>
      </ha-card>
    `}_renderSpace(e){let t=this._pendingMaster[e.id]??(e.master!=null?Math.round(e.master):0),n=e.color?`--space-accent: var(--${e.color}-color);`:"";return a`
      <div class="space ${e.active?"active":""}" style=${n}>
        <div class="shead">
          <ha-icon class="shead-icon" icon=${e.icon||(e.active?"mdi:speaker-multiple":"mdi:speaker-off")}></ha-icon>
          <span class="sname">${e.name}</span>
          ${this._offBadge(e)}
          ${e.active?a`<button class="icon-btn" title="Turn off" @click=${()=>this._deactivate(e)}>
                <ha-icon icon="mdi:power"></ha-icon>
              </button>`:d}
        </div>
        ${e.active?this._renderActive(e,t):this._renderOff(e)}
        ${e.active?this._renderZonesBlock(e):d}
      </div>
    `}_renderSelect(){let e=this._spaces.find(t=>t.id===this._selectedSpace)??this._spaces[0];return a`
      <div class="srail ha-scrollbar">
        ${this._spaces.map(t=>this._renderTile(t,e?.id===t.id))}
      </div>
      ${e?this._renderDetail(e):d}
    `}_offBadge(e){let t=e.offline_zones??0;if(!t)return d;let n=t===(e.zones_total??e.zones.length);return a`<span class="offbadge" title="${t} of ${e.zones_total} zones offline (amp unreachable)">
      <ha-icon icon="mdi:cloud-off-outline"></ha-icon>${n?"offline":t}</span>`}_renderTile(e,t){let n=e.icon||(e.active?"mdi:speaker-multiple":"mdi:speaker-off"),s=e.color?`--stile-accent: var(--${e.color}-color);`:"",o=e.offline_zones??0,c=o>0&&o===(e.zones_total??e.zones.length)?"Offline":o?`${o} offline`:e.active?e.level??"on":"Off";return a`
      <button class="stile ${t?"sel":""} ${e.active?"active":""} ${o?"hasoff":""}"
        style=${s} @click=${()=>this._selectedSpace=e.id}>
        <div class="stile-top">
          <ha-icon icon=${n}></ha-icon>
          ${o?a`<ha-icon class="tile-off" icon="mdi:cloud-off-outline"></ha-icon>`:e.active?a`<span class="dot on"></span>`:d}
        </div>
        <div class="stile-name">${e.name}</div>
        <div class="stile-sub ${o?"off":""}">${c}</div>
      </button>
    `}_renderDetail(e){let t=this._pendingMaster[e.id]??(e.master!=null?Math.round(e.master):0),n=e.color?`--space-accent: var(--${e.color}-color);`:"";return a`
      <div class="space detail ${e.active?"active":""}" style=${n}>
        <div class="shead">
          <ha-icon class="shead-icon" icon=${e.icon||(e.active?"mdi:speaker-multiple":"mdi:speaker-off")}></ha-icon>
          <span class="sname">${e.name}</span>
          ${this._offBadge(e)}
          ${e.active?a`<button class="icon-btn" title="Turn off" @click=${()=>this._deactivate(e)}>
                <ha-icon icon="mdi:power"></ha-icon>
              </button>`:d}
        </div>
        ${e.active?this._renderActive(e,t):this._renderOff(e)}
        ${e.active?this._renderZonesBlock(e):d}
      </div>
    `}_renderZonesBlock(e){return a`
      <button class="expand" @click=${()=>this._expanded={...this._expanded,[e.id]:!this._expanded[e.id]}}>
        <ha-icon icon=${this._expanded[e.id]?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        ${this._expanded[e.id]?"Hide zones":"Zones"}
      </button>
      ${this._expanded[e.id]?a`<div class="zones">${e.zones.map(t=>this._renderZone(e,t))}</div>`:d}
    `}_renderOff(e){return this._inputs.length?a`
      <div class="hint">Off — pick a source to start:</div>
      <div class="chips">
        ${this._inputs.map(t=>a`<button class="chip" @click=${()=>this._activate(e,t.entity,"listening")}>
            <ha-icon icon=${t.icon??"mdi:cast-audio"}></ha-icon> ${t.name}
          </button>`)}
      </div>
    `:a`<div class="hint">Add <code>inputs</code> to the card config to choose a source.</div>`}_renderActive(e,t){return a`
      <div class="presets">
        ${ft.map(n=>a`<button class="preset ${e.level===n?"on":""}" @click=${()=>this._setLevel(e,n)}>
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
            ${this._sourceVolSpace===e.id?this._renderSourceVol(t.ma_player):d}
          `:d}
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
    `}_renderSourcePicker(e){let t=this._sources,n=this._openSource,s=n!=null?t[n]:void 0,o=s?.type==="library"&&this._nav.length>0,l=n==null?"Change content":this._nav.length?this._nav[this._nav.length-1].title:s?.label??"Source",c;return n==null?c=t.map((h,f)=>a`<button class="preset-row" @click=${()=>this._selectSource(e,f)}>
          <ha-icon icon=${h.icon??(h.type==="connect"?"mdi:cast":"mdi:music-box-multiple")}></ha-icon>
          <span>${h.label??(h.type==="connect"?"Spotify Connect":"Music Assistant")}</span>
          ${h.type==="connect"?a`<span class="on-other">cast</span>`:a`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
        </button>`):s?.type==="connect"?c=a`<div class="hint">${this._connectHint}</div>`:s?.type==="library"&&(c=this._renderLibraryBody(e,s)),a`
      <div class="picker">
        <div class="picker-head">
          ${n!=null?a`<button class="icon-btn" title="Back" @click=${()=>o?this._navBack(e):this._selectSourceList()}>
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </button>`:d}
          <span class="picker-title">${l}</span>
          <button class="icon-btn" title="Close" @click=${()=>this._resetPicker()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
        ${c}
      </div>
    `}_renderLibraryBody(e,t){if(this._browseLoading)return a`<div class="hint">Loading…</div>`;if(this._browseError)return a`<div class="note">${this._browseError}</div>`;if(this._nav.length===0)return(t.categories??["playlists","radio"]).map(o=>a`<button class="preset-row" @click=${()=>this._browseInto(e,{title:W(o),media_content_id:o,media_content_type:"music_assistant",can_expand:!0})}>
          <ha-icon icon=${ce(o)}></ha-icon>
          <span>${W(o)}</span>
          <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
        </button>`);let n=this._children??[];return n.length?n.map(s=>a`<button class="preset-row" @click=${()=>this._onItem(e,s)}>
        ${s.thumbnail?a`<img class="thumb" src=${s.thumbnail} alt="" />`:a`<ha-icon icon=${s.can_play?"mdi:play-circle-outline":"mdi:folder-outline"}></ha-icon>`}
        <span>${s.title}</span>
        ${s.can_play?d:a`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
      </button>`):a`<div class="hint">Nothing here.</div>`}_renderNowPlaying(e){let t=e?this.hass.states[e]:void 0;if(!t||!X(t))return d;let n=t.attributes,s=t.state==="playing",o=!T(t.state);return a`
      <div class="np">
        <div class="art">
          ${n.entity_picture?a`<img src=${n.entity_picture} alt="" />`:a`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="t">${o?"Nothing playing":n.media_title??""}</div>
          <div class="ar">${o?"":n.media_artist??""}</div>
        </div>
        <div class="tr">
          <button class="icon-btn" @click=${()=>this._run(A(e,"media_previous_track"))}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn big" @click=${()=>this._run(A(e,"media_play_pause"))}>
            <ha-icon icon=${s?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${()=>this._run(A(e,"media_next_track"))}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `}_renderZone(e,t){let n=t.entity_id;if(t.online===!1)return a`
        <div class="zone offline">
          <ha-icon class="off-ic" icon="mdi:cloud-off-outline"></ha-icon>
          <span class="zname">${t.name}</span>
          <span class="off-tag">Amp offline</span>
        </div>
      `;let s=n?!!this.hass.states[n]:!1,o=n?this._volPct(n):0,l=n?this.hass.states[n]?.attributes.source!=="None":!1,c=n?!!this.hass.states[n]?.attributes.is_volume_muted:!1;return a`
      <div class="zone">
        <button class="icon-btn" title=${l?"Drop from space":"Add to space"}
          @click=${()=>this._zoneToggle(e,t,!l)}>
          <ha-icon icon=${l?"mdi:speaker":"mdi:speaker-off"}></ha-icon>
        </button>
        <span class="zname">${t.name}</span>
        <button class="icon-btn" title=${c?"Unmute":"Mute"} ?disabled=${!s}
          @click=${()=>n&&this._run(R(n,!c))}>
          <ha-icon icon=${c?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
        </button>
        <input type="range" min="0" max="100" .value=${String(o)} ?disabled=${!s}
          @input=${h=>n&&this._setZoneVol(n,Number(h.target.value),!1)}
          @change=${h=>n&&this._setZoneVol(n,Number(h.target.value),!0)} />
        <span class="pctv">${o}%</span>
      </div>
    `}};g.styles=C`
    ha-card { overflow: hidden; }
    .content { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
    .note, .hint { color: var(--secondary-text-color); }
    .hint { font-size: 0.85rem; }

    .space { border: 1px solid var(--divider-color); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
    .space.active { border-color: var(--space-accent, var(--primary-color)); }

    /* select (master-detail) view: horizontal tile rail + one detail panel below */
    .srail { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
    .stile {
      --stile-accent: var(--primary-color);
      flex: 0 0 auto; width: 116px; text-align: left; padding: 8px 10px;
      border-radius: 12px; border: 1px solid var(--divider-color);
      background: none; color: var(--primary-text-color); cursor: pointer;
    }
    .stile.active { border-color: var(--stile-accent); }
    .stile.sel { outline: 2px solid var(--stile-accent); outline-offset: -2px; }
    .stile-top { display: flex; align-items: center; justify-content: space-between; }
    .stile-top ha-icon { color: var(--stile-accent); }
    .stile-name { font-weight: 600; margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .stile-sub { color: var(--secondary-text-color); font-size: 0.8rem; text-transform: capitalize; }
    .dot { width: 9px; height: 9px; border-radius: 50%; background: var(--disabled-text-color, #888); flex: 0 0 auto; }
    .dot.on { background: var(--stile-accent); }
    .space.detail { margin-top: 4px; }
    .shead { display: flex; align-items: center; gap: 8px; }
    .shead ha-icon { color: var(--primary-color); }
    .shead .shead-icon { color: var(--space-accent, var(--primary-color)); }
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
    .zone.offline { opacity: 0.72; }
    .zone.offline .off-ic { color: var(--error-color); }
    .zone.offline .zname { color: var(--secondary-text-color); flex: 1; }
    .off-tag { margin-left: auto; font-size: 0.72rem; font-weight: 600; text-transform: uppercase; color: var(--error-color); }
    .offbadge {
      display: inline-flex; align-items: center; gap: 3px;
      font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
      color: var(--error-color); background: color-mix(in srgb, var(--error-color) 14%, transparent);
      border-radius: 10px; padding: 1px 7px 1px 5px;
    }
    .offbadge ha-icon { --mdc-icon-size: 15px; }
    .stile.hasoff { border-color: color-mix(in srgb, var(--error-color) 55%, var(--divider-color)); }
    .stile-sub.off { color: var(--error-color); font-weight: 600; text-transform: none; }
    .tile-off { color: var(--error-color); --mdc-icon-size: 18px; }
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
  `,p([k({attribute:!1})],g.prototype,"hass",2),p([u()],g.prototype,"_config",2),p([u()],g.prototype,"_spaces",2),p([u()],g.prototype,"_error",2),p([u()],g.prototype,"_expanded",2),p([u()],g.prototype,"_pendingMaster",2),p([u()],g.prototype,"_pendingVol",2),p([u()],g.prototype,"_pickerSpace",2),p([u()],g.prototype,"_openSource",2),p([u()],g.prototype,"_nav",2),p([u()],g.prototype,"_children",2),p([u()],g.prototype,"_browseLoading",2),p([u()],g.prototype,"_browseError",2),p([u()],g.prototype,"_connectHint",2),p([u()],g.prototype,"_sourceVolSpace",2),p([u()],g.prototype,"_selectedSpace",2),g=p([M("binary-moip-spaces-card")],g);var vt=["background","listening","party"],gt="2.4.0";console.info(`%c binary-moip-card %c ${gt} `,"color:#fff;background:#3399ff;border-radius:3px 0 0 3px;padding:2px 4px","color:#3399ff;background:#222;border-radius:0 3px 3px 0;padding:2px 4px");window.customCards=[...window.customCards??[],{type:"binary-moip-card",name:"Binary MoIP Audio",description:"Streaming-as-parent whole-home audio: pick an input, swap its content, control its zones."}];var v=class extends y{constructor(){super(...arguments);this._pickerOpen=!1;this._openSource=null;this._nav=[];this._children=null;this._browseLoading=!1;this._browseError=null;this._connectHint=null;this._picked={};this._pendingVol={};this._showSourceVol=!1;this._spacesList=[];this._showAddSpaces=!1;this._expandedSpace=null;this._pendingSpaceMaster={};this._spacesSubscribed=!1}setConfig(e){if(!e||!Array.isArray(e.inputs)||e.inputs.length===0)throw new Error("binary-moip-card: `inputs` (a non-empty list) is required");for(let t of e.inputs)if(!t.entity||!t.kind)throw new Error("binary-moip-card: each input needs `entity` and `kind`");this._config=e}get _sources(){return this._config.sources??oe}getCardSize(){return 6}static getStubConfig(){return{type:"custom:binary-moip-card",inputs:[]}}get _selectedInput(){let e=this._config.inputs;if(this._selected){let t=e.find(n=>n.entity===this._selected);if(t&&this.hass.states[t.entity])return t}return e.find(t=>this.hass.states[t.entity])??e[0]}_src(e){return this.hass.states[e.entity]}_currentSource(e){let t=this._src(e);if(!T(t?.state))return{label:"Idle",icon:e.icon??"mdi:music"};let n=(e.ma_player?this.hass.states[e.ma_player]:void 0)?.attributes??{};if(n.source==="Spotify Connect"||String(n.app_id??"").startsWith("spotify_connect")){let l=this._sources.find(c=>c.type==="connect");return{label:l?.label??"Spotify Connect",icon:l?.icon??"mdi:spotify"}}let s=this._picked[e.entity];if(s)return s;let o=this._sources.find(l=>l.type==="library");return{label:o?.label??"Music Assistant",icon:o?.icon??"mdi:music-box-multiple"}}_resetPicker(){this._pickerOpen=!1,this._openSource=null,this._nav=[],this._children=null,this._browseError=null,this._connectHint=null}_openChangeSource(){this._resetPicker(),this._pickerOpen=!0}async _loadChildren(e,t){this._children=null,this._browseLoading=!0,this._browseError=null;try{let n=await this.hass.callWS(de(e,t?.media_content_id,t?.media_content_type));this._children=n.children??[]}catch{this._browseError="Couldn't reach Music Assistant.",this._children=[]}finally{this._browseLoading=!1}}_selectSource(e,t){this._openSource=t,this._nav=[],this._children=null,this._connectHint=null,ae(this._sources[t])&&(this._connectHint=`Cast from your Spotify app to ${e.name}.`)}_browseInto(e,t){e.ma_player&&(this._nav=[...this._nav,t],this._loadChildren(e.ma_player,t))}_navBack(e){let t=this._nav.slice(0,-1);this._nav=t,this._children=null,t.length&&e.ma_player&&this._loadChildren(e.ma_player,t[t.length-1])}_onItem(e,t,n){if(t.can_play&&e.ma_player){this._run(le(e.ma_player,t.media_content_id));let s=[...this._nav.map(o=>o.title),t.title].filter(Boolean).join(" \xB7 ");this._picked={...this._picked,[e.entity]:{label:n.label??"Music Assistant",icon:n.icon??"mdi:music-box-multiple",item:s}},this._resetPicker()}else t.can_expand&&this._browseInto(e,t)}async _run(e){if(!e)return;let t=Array.isArray(e)?e:[e];await Promise.all(t.map(n=>this.hass.callService(n.domain,n.service,n.data)))}connectedCallback(){super.connectedCallback(),this._spacesSubscribed=!1}disconnectedCallback(){super.disconnectedCallback(),this._spacesUnsub?.(),this._spacesUnsub=void 0,this._spacesSubscribed=!1}_subscribeSpaces(){if(this._spacesSubscribed||!this.hass)return;this._spacesSubscribed=!0;let e=this.hass.connection;if(!e){this._fetchSpacesOnce();return}e.subscribeMessage(t=>this._spacesList=t.spaces??[],V()).then(t=>{this.isConnected?this._spacesUnsub=t:t()}).catch(()=>{this._spacesSubscribed=!1,this._fetchSpacesOnce()})}_fetchSpacesOnce(){this.hass.callWS(I()).then(e=>this._spacesList=e.spaces??[]).catch(()=>{})}updated(){this._subscribeSpaces();let e=this._pendingVol,t=!1;for(let[n,s]of Object.entries(e)){let o=this.hass.states[n];o&&S(o.attributes.volume_level)===s&&(t||(e={...e},t=!0),delete e[n])}t&&(this._pendingVol=e)}_volPct(e){return this._pendingVol[e]??S(this.hass.states[e]?.attributes.volume_level)}_setVol(e,t,n){this._pendingVol={...this._pendingVol,[e]:t},n&&this._run(U(e,t/100))}_inputName(e){return this._config.inputs.find(t=>t.entity===e)?.name}async _refreshSpaces(){try{let e=await this.hass.callWS(I());this._spacesList=e.spaces??[]}catch{}}async _runSpace(e){await this._run(e),await this._refreshSpaces()}_renderSpaceSession(e){let t=this._spacesList.filter(n=>n.active&&n.source===e.entity);return a`
      ${t.length?t.map(n=>this._renderSpaceRow(n)):a`<div class="note">No listening spaces yet — add one below.</div>`}
      ${this._showAddSpaces?this._renderAddSpaces(e):a`<button class="add-btn" @click=${()=>this._showAddSpaces=!0}>
            <ha-icon icon="mdi:plus"></ha-icon> Add listening spaces
          </button>`}
    `}_renderSpaceRow(e){let t=this._expandedSpace===e.id,n=e.color?`--row-accent: var(--${e.color}-color);`:"",s=e.offline_zones??0,o=s>0&&s===(e.zones_total??e.zones.length);return a`
      <div class="sprow ${o?"alloff":""}" style=${n}>
        <div class="sprow-head">
          <ha-icon class="sp-icon" icon=${e.icon||"mdi:speaker-multiple"}></ha-icon>
          <span class="sprow-name">${e.name}</span>
          ${s?a`<span class="offbadge" title="${s} of ${e.zones_total} zones offline (amp unreachable)">
                <ha-icon icon="mdi:cloud-off-outline"></ha-icon>${o?"offline":s}
              </span>`:d}
          <button class="icon-btn" title="Turn off" @click=${()=>this._runSpace(H(e.id))}>
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </div>
        <div class="presets">
          ${vt.map(l=>a`<button class="preset ${e.level===l?"on":""}"
              @click=${()=>this._runSpace(ue(e.id,l))}>${l}</button>`)}
        </div>
        <button class="expand" @click=${()=>this._expandedSpace=t?null:e.id}>
          <ha-icon icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
          ${t?"Hide":"Fine control"}
        </button>
        ${t?this._renderSpaceDetail(e):d}
      </div>
    `}_renderSpaceDetail(e){let t=this._pendingSpaceMaster[e.id]??(e.master!=null?Math.round(e.master):0);return a`
      <div class="row master">
        <ha-icon icon="mdi:volume-high"></ha-icon>
        <span class="row-name">Master</span>
        <input type="range" min="0" max="100" .value=${String(t)}
          @input=${n=>this._pendingSpaceMaster={...this._pendingSpaceMaster,[e.id]:Number(n.target.value)}}
          @change=${async n=>{let s=Number(n.target.value);await this._runSpace(he(e.id,s));let o={...this._pendingSpaceMaster};delete o[e.id],this._pendingSpaceMaster=o}} />
        <span class="pct">${t}%</span>
      </div>
      ${e.zones.map(n=>this._renderSpaceZone(e,n))}
    `}_renderSpaceZone(e,t){let n=t.entity_id;if(t.online===!1)return a`
        <div class="row offline">
          <ha-icon class="off-ic" icon="mdi:cloud-off-outline"></ha-icon>
          <span class="row-name">${t.name}</span>
          <span class="off-tag">Amp offline</span>
        </div>
      `;let s=n?this._volPct(n):0,o=n?this.hass.states[n]?.attributes.source!=="None":!1,l=n?!!this.hass.states[n]?.attributes.is_volume_muted:!1;return a`
      <div class="row">
        <button class="icon-btn" title=${o?"Drop zone":"Add zone"}
          @click=${()=>this._runSpace(me(e.id,t.group_id,o?"off":"on"))}>
          <ha-icon icon=${o?"mdi:speaker":"mdi:speaker-off"}></ha-icon>
        </button>
        <span class="row-name">${t.name}</span>
        <button class="icon-btn" ?disabled=${!n} title=${l?"Unmute":"Mute"}
          @click=${()=>n&&this._run(R(n,!l))}>
          <ha-icon icon=${l?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
        </button>
        <input type="range" min="0" max="100" .value=${String(s)} ?disabled=${!n}
          @input=${c=>n&&this._setVol(n,Number(c.target.value),!1)}
          @change=${c=>n&&this._setVol(n,Number(c.target.value),!0)} />
        <span class="pct">${s}%</span>
      </div>
    `}_renderAddSpaces(e){return a`
      <div class="picker">
        <div class="picker-head">
          <span class="picker-title">Add listening spaces</span>
          <button class="icon-btn" @click=${()=>this._showAddSpaces=!1}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${this._spacesList.map(t=>{let n=t.active&&t.source===e.entity,s=t.active?t.source===e.entity?"here":"on "+(this._inputName(t.source)??"another source"):"idle";return a`<button class="preset-row" @click=${()=>n?this._runSpace(H(t.id)):this._runSpace(pe(t.id,{source:e.entity,level:t.level??"listening"}))}>
            <ha-icon icon=${t.icon||"mdi:speaker-multiple"}></ha-icon>
            <span>${t.name}</span>
            <span class="on-other">${s}</span>
            ${n?a`<ha-icon class="chev" icon="mdi:check-circle"></ha-icon>`:d}
          </button>`})}
      </div>
    `}render(){if(!this.hass||!this._config)return d;let e=this._selectedInput;return a`
      <ha-card>
        ${this._config.title?a`<h1 class="card-header">${this._config.title}</h1>`:d}
        <div class="content">
          ${this._renderRail(e)}
          ${e?this._renderStreamCard(e):a`<div class="note">No input available</div>`}
          ${e?this._renderSpaceSession(e):d}
        </div>
      </ha-card>
    `}_renderRail(e){return a`
      <div class="rail ha-scrollbar">
        ${this._config.inputs.map(t=>{let n=this._src(t),s=Fe(n),o=t.kind==="stream",l=o?this._currentSource(t).label:t.name,c=o?t.name:"Line-in",h=t.icon??(o?"mdi:cast-audio":"mdi:music-box-outline"),f=e&&t.entity===e.entity;return a`
            <button
              class="tile ${f?"selected":""}"
              @click=${()=>{this._selected=t.entity,this._showAddSpaces=!1,this._resetPicker()}}
            >
              <div class="tile-top">
                <ha-icon icon=${h}></ha-icon>
                ${s?a`<span class="dot"></span>`:d}
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
      `;else if(this._pickerOpen)t=this._renderSourcePicker(e);else{let n=this._src(e),s=this._currentSource(e),o=s.item??(T(n?.state)?e.name:"Tap Change source");t=a`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${s.icon}></ha-icon>
          <div class="meta">
            <div class="title">${s.label}</div>
            <div class="artist">${o}</div>
          </div>
          ${e.ma_player?a`<button class="icon-btn" title="Source volume"
                @click=${()=>this._showSourceVol=!this._showSourceVol}>
                <ha-icon icon="mdi:tune-vertical"></ha-icon>
              </button>`:d}
          <button class="change-btn" @click=${()=>this._openChangeSource()}>
            Change source
          </button>
        </div>
        ${e.ma_player&&this._showSourceVol?this._renderSourceVol(e.ma_player):d}
        <div class="sep"></div>
        ${this._renderNowPlaying(n)}
      `}return a`<div class="subcard">${t}</div>`}_renderSourcePicker(e){let t=this._sources,n=this._openSource,s=n!=null?t[n]:void 0,o=s?.type==="library"&&this._nav.length>0,l=n==null?`Change source \u2014 ${e.name}`:this._nav.length?this._nav[this._nav.length-1].title:s?.label??"Source",c=a`
      <div class="picker-head">
        ${n!=null?a`<button class="icon-btn" title="Back" @click=${()=>o?this._navBack(e):this._selectSourceList()}>
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>`:d}
        <span class="picker-title">${l}</span>
        <button class="icon-btn" title="Close" @click=${()=>this._resetPicker()}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `,h;if(n==null){let f=this._src(e),m=T(f?.state)&&X(f);h=a`
        ${t.map((b,x)=>a`
            <button class="preset-row" @click=${()=>this._selectSource(e,x)}>
              <ha-icon icon=${b.icon??(b.type==="connect"?"mdi:cast":"mdi:music-box-multiple")}></ha-icon>
              <span>${b.label??(b.type==="connect"?"Spotify Connect":"Music Assistant")}</span>
              ${b.type==="connect"?a`<span class="on-other">cast</span>`:a`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
            </button>
          `)}
        ${m?a`
              <button class="preset-row clear" @click=${()=>this._clearSource(e)}>
                <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
                <span>Turn off — stop playing</span>
              </button>
            `:d}
      `}else s?.type==="connect"?h=a`<div class="hint">${this._connectHint}</div>`:s?.type==="library"&&(h=this._renderLibraryBody(e,s));return a`<div class="picker">${c}${h}</div>`}_selectSourceList(){this._openSource=null,this._nav=[],this._children=null,this._connectHint=null}_clearSource(e){this._run({domain:"media_player",service:"media_stop",data:{entity_id:e.entity}});let t={...this._picked};delete t[e.entity],this._picked=t,this._resetPicker()}_renderLibraryBody(e,t){if(this._browseLoading)return a`<div class="hint">Loading…</div>`;if(this._browseError)return a`<div class="note">${this._browseError}</div>`;if(this._nav.length===0)return(t.categories??["playlists","radio"]).map(o=>a`
          <button
            class="preset-row"
            @click=${()=>this._browseInto(e,{title:W(o),media_content_id:o,media_content_type:"music_assistant",can_expand:!0})}
          >
            <ha-icon icon=${ce(o)}></ha-icon>
            <span>${W(o)}</span>
            <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>
        `);let n=this._children??[];return n.length?n.map(s=>a`
        <button class="preset-row" @click=${()=>this._onItem(e,s,t)}>
          ${s.thumbnail?a`<img class="thumb" src=${s.thumbnail} alt="" />`:a`<ha-icon icon=${s.can_play?"mdi:play-circle-outline":"mdi:folder-outline"}></ha-icon>`}
          <span>${s.title}</span>
          ${s.can_play?d:a`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
        </button>
      `):a`<div class="hint">Nothing here.</div>`}_renderNowPlaying(e){if(!e)return d;if(!X(e))return a`<div class="note">No transport for this input.</div>`;let t=e.attributes,n=!T(e.state),s=e.state==="playing";return a`
      <div class="now-playing ${n?"idle":""}">
        <div class="art">
          ${t.entity_picture?a`<img src=${t.entity_picture} alt="" />`:a`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${n?"Nothing playing":t.media_title??""}</div>
          <div class="artist">${n?"Pick a source":t.media_artist??""}</div>
        </div>
        <div class="transport">
          <button class="icon-btn" @click=${()=>this._run(A(e.entity_id,"media_previous_track"))}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn big" @click=${()=>this._run(A(e.entity_id,"media_play_pause"))}>
            <ha-icon icon=${s?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${()=>this._run(A(e.entity_id,"media_next_track"))}>
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
    `}};v.styles=C`
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

    /* Listening Space session rows (source-first card targets Spaces) */
    .sprow {
      --row-accent: var(--primary-color);
      border: 1px solid var(--divider-color); border-left: 3px solid var(--row-accent);
      border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 8px;
    }
    .sprow-head { display: flex; align-items: center; gap: 8px; }
    .sprow-head .sp-icon { color: var(--row-accent); }
    .sprow-name { flex: 1; font-weight: 600; }
    .sprow.alloff .sprow-name { color: var(--secondary-text-color); }
    .offbadge {
      display: inline-flex; align-items: center; gap: 3px;
      font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
      color: var(--error-color); background: color-mix(in srgb, var(--error-color) 14%, transparent);
      border-radius: 10px; padding: 1px 7px 1px 5px;
    }
    .offbadge ha-icon { --mdc-icon-size: 15px; }
    .row.offline { opacity: 0.72; }
    .row.offline .off-ic { color: var(--error-color); }
    .row.offline .row-name { color: var(--secondary-text-color); }
    .off-tag {
      margin-left: auto; font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
      color: var(--error-color);
    }
    .presets { display: flex; border: 1px solid var(--divider-color); border-radius: 8px; overflow: hidden; }
    .preset { flex: 1; padding: 6px; background: none; border: none; border-right: 1px solid var(--divider-color); cursor: pointer; color: var(--primary-text-color); text-transform: capitalize; font-size: 0.9rem; }
    .preset:last-child { border-right: none; }
    .preset.on { background: var(--row-accent); color: #fff; }
    .expand { align-self: flex-start; display: inline-flex; align-items: center; gap: 4px; background: none; border: none; color: var(--primary-color); cursor: pointer; padding: 0; font-size: 0.9rem; }
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
    .space-chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .space-chip {
      --chip-accent: var(--primary-color);
      display: inline-flex; align-items: center; gap: 4px; padding: 6px 10px;
      border-radius: 16px; border: 1px solid var(--divider-color);
      background: none; color: var(--primary-text-color); cursor: pointer;
    }
    .space-chip.on { background: var(--chip-accent); color: #fff; border-color: transparent; }
    .space-chip ha-icon { --mdc-icon-size: 18px; }
    .space-chip .x { --mdc-icon-size: 16px; }
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
  `,p([k({attribute:!1})],v.prototype,"hass",2),p([u()],v.prototype,"_config",2),p([u()],v.prototype,"_selected",2),p([u()],v.prototype,"_pickerOpen",2),p([u()],v.prototype,"_openSource",2),p([u()],v.prototype,"_nav",2),p([u()],v.prototype,"_children",2),p([u()],v.prototype,"_browseLoading",2),p([u()],v.prototype,"_browseError",2),p([u()],v.prototype,"_connectHint",2),p([u()],v.prototype,"_picked",2),p([u()],v.prototype,"_pendingVol",2),p([u()],v.prototype,"_showSourceVol",2),p([u()],v.prototype,"_spacesList",2),p([u()],v.prototype,"_showAddSpaces",2),p([u()],v.prototype,"_expandedSpace",2),p([u()],v.prototype,"_pendingSpaceMaster",2),v=p([M("binary-moip-card")],v);export{v as BinaryMoipCard};
