var It=Object.defineProperty;var Lt=Object.getOwnPropertyDescriptor;var S=(i,t,e,s)=>{for(var r=s>1?void 0:s?Lt(t,e):t,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&It(t,e,r),r};var I=globalThis,L=I.ShadowRoot&&(I.ShadyCSS===void 0||I.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),ut=new WeakMap,P=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(L&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ut.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ut.set(e,t))}return t}toString(){return this.cssText}},mt=i=>new P(typeof i=="string"?i:i+"",void 0,G),J=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,r,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new P(e,i,G)},ft=(i,t)=>{if(L)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=I.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},X=L?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return mt(e)})(i):i;var{is:Dt,defineProperty:qt,getOwnPropertyDescriptor:Vt,getOwnPropertyNames:Zt,getOwnPropertySymbols:Kt,getPrototypeOf:Wt}=Object,D=globalThis,gt=D.trustedTypes,Bt=gt?gt.emptyScript:"",Ft=D.reactiveElementPolyfillSupport,k=(i,t)=>i,R={toAttribute(i,t){switch(t){case Boolean:i=i?Bt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},q=(i,t)=>!Dt(i,t),_t={attribute:!0,type:String,converter:R,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??=Symbol("metadata"),D.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_t){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&qt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:n}=Vt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){let c=r?.call(this);n?.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_t}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;let t=Wt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){let e=this.properties,s=[...Zt(e),...Kt(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(X(r))}else t!==void 0&&e.push(X(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ft(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:R).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let n=s.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:R;this._$Em=r;let c=o.fromAttribute(e,n.type);this[r]=c??this._$Ej?.get(r)??c,this._$Em=null}}requestUpdate(t,e,s,r=!1,n){if(t!==void 0){let o=this.constructor;if(r===!1&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??q)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,n]of s){let{wrapped:o}=n,c=this[r];o!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,n,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[k("elementProperties")]=new Map,f[k("finalized")]=new Map,Ft?.({ReactiveElement:f}),(D.reactiveElementVersions??=[]).push("2.1.2");var it=globalThis,yt=i=>i,V=it.trustedTypes,vt=V?V.createPolicy("lit-html",{createHTML:i=>i}):void 0,Et="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,wt="?"+y,Gt=`<${wt}>`,x=document,T=()=>x.createComment(""),O=i=>i===null||typeof i!="object"&&typeof i!="function",nt=Array.isArray,Jt=i=>nt(i)||typeof i?.[Symbol.iterator]=="function",Y=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$t=/-->/g,bt=/>/g,$=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xt=/'/g,At=/"/g,Ct=/^(?:script|style|textarea|title)$/i,ot=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),u=ot(1),le=ot(2),de=ot(3),A=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),St=new WeakMap,b=x.createTreeWalker(x,129);function Pt(i,t){if(!nt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return vt!==void 0?vt.createHTML(t):t}var Xt=(i,t)=>{let e=i.length-1,s=[],r,n=t===2?"<svg>":t===3?"<math>":"",o=H;for(let c=0;c<e;c++){let a=i[c],p,h,l=-1,m=0;for(;m<a.length&&(o.lastIndex=m,h=o.exec(a),h!==null);)m=o.lastIndex,o===H?h[1]==="!--"?o=$t:h[1]!==void 0?o=bt:h[2]!==void 0?(Ct.test(h[2])&&(r=RegExp("</"+h[2],"g")),o=$):h[3]!==void 0&&(o=$):o===$?h[0]===">"?(o=r??H,l=-1):h[1]===void 0?l=-2:(l=o.lastIndex-h[2].length,p=h[1],o=h[3]===void 0?$:h[3]==='"'?At:xt):o===At||o===xt?o=$:o===$t||o===bt?o=H:(o=$,r=void 0);let _=o===$&&i[c+1].startsWith("/>")?" ":"";n+=o===H?a+Gt:l>=0?(s.push(p),a.slice(0,l)+Et+a.slice(l)+y+_):a+y+(l===-2?c:_)}return[Pt(i,n+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},U=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0,c=t.length-1,a=this.parts,[p,h]=Xt(t,e);if(this.el=i.createElement(p,s),b.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(r=b.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let l of r.getAttributeNames())if(l.endsWith(Et)){let m=h[o++],_=r.getAttribute(l).split(y),z=/([.?@])?(.*)/.exec(m);a.push({type:1,index:n,name:z[2],strings:_,ctor:z[1]==="."?tt:z[1]==="?"?et:z[1]==="@"?st:w}),r.removeAttribute(l)}else l.startsWith(y)&&(a.push({type:6,index:n}),r.removeAttribute(l));if(Ct.test(r.tagName)){let l=r.textContent.split(y),m=l.length-1;if(m>0){r.textContent=V?V.emptyScript:"";for(let _=0;_<m;_++)r.append(l[_],T()),b.nextNode(),a.push({type:2,index:++n});r.append(l[m],T())}}}else if(r.nodeType===8)if(r.data===wt)a.push({type:2,index:n});else{let l=-1;for(;(l=r.data.indexOf(y,l+1))!==-1;)a.push({type:7,index:n}),l+=y.length-1}n++}}static createElement(t,e){let s=x.createElement("template");return s.innerHTML=t,s}};function E(i,t,e=i,s){if(t===A)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl,n=O(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=E(i,r._$AS(i,t.values),r,s)),t}var Q=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??x).importNode(e,!0);b.currentNode=r;let n=b.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new M(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new rt(n,this,t)),this._$AV.push(p),a=s[++c]}o!==a?.index&&(n=b.nextNode(),o++)}return b.currentNode=x,r}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},M=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),O(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Jt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=U.createElement(Pt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{let n=new Q(r,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=St.get(t.strings);return e===void 0&&St.set(t.strings,e=new U(t)),e}k(t){nt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let n of t)r===e.length?e.push(s=new i(this.O(T()),this.O(T()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=yt(t).nextSibling;yt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},w=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,r){let n=this.strings,o=!1;if(n===void 0)t=E(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==A,o&&(this._$AH=t);else{let c=t,a,p;for(t=n[0],a=0;a<n.length-1;a++)p=E(this,c[s+a],e,a),p===A&&(p=this._$AH[a]),o||=!O(p)||p!==this._$AH[a],p===d?t=d:t!==d&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!r&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends w{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},et=class extends w{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},st=class extends w{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??d)===A)return;let s=this._$AH,r=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==d&&(s===d||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var Yt=it.litHtmlPolyfillSupport;Yt?.(U,M),(it.litHtmlVersions??=[]).push("3.3.3");var kt=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let n=e?.renderBefore??null;s._$litPart$=r=new M(t.insertBefore(T(),n),n,void 0,e??{})}return r._$AI(i),r};var at=globalThis,v=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=kt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};v._$litElement$=!0,v.finalized=!0,at.litElementHydrateSupport?.({LitElement:v});var Qt=at.litElementPolyfillSupport;Qt?.({LitElement:v});(at.litElementVersions??=[]).push("4.2.2");var Rt=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};var te={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:q},ee=(i=te,t,e)=>{let{kind:s,metadata:r}=e,n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),n.set(e.name,i),s==="accessor"){let{name:o}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,a,i,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,i,c),c}}}if(s==="setter"){let{name:o}=e;return function(c){let a=this[o];t.call(this,c),this.requestUpdate(o,a,i,!0,c)}}throw Error("Unsupported decorator location: "+s)};function Z(i){return(t,e)=>typeof e=="object"?ee(i,t,e):((s,r,n)=>{let o=r.hasOwnProperty(n);return r.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(r,n):void 0})(i,t,e)}function K(i){return Z({...i,state:!0,attribute:!1})}var N={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,STOP:4096,PLAY:16384,GROUPING:524288};var ct=(i,t,e)=>Math.min(e,Math.max(t,i)),lt=i=>Math.round(ct(i??0,0,1)*100);function C(i,t){return i.states[t]?.attributes.friendly_name??t}function j(i){return(i?.attributes.group_members??[]).filter(e=>e!==i?.entity_id)}function Ht(i){return i?j(i).length>0||i.state==="playing":!1}function B(i,t){return((i?.attributes.supported_features??0)&t)===t}function Tt(i){return B(i,N.PLAY)||B(i,N.PAUSE)||B(i,N.NEXT_TRACK)||B(i,N.PREVIOUS_TRACK)}function dt(i){let t=i.map(s=>s.attributes.volume_level).filter(s=>typeof s=="number");if(t.length===0)return 0;let e=t.reduce((s,r)=>s+r,0)/t.length;return Math.round(e*100)}function Ot(i,t){let e=Math.round(t)-dt(i);if(e===0)return[];let s=[];for(let r of i){let n=lt(r.attributes.volume_level),o=ct(n+e,0,100);o!==n&&s.push(ht(r.entity_id,o/100))}return s}function Ut(i,t){return{domain:"media_player",service:"join",data:{entity_id:i,group_members:[t]}}}function pt(i){return{domain:"media_player",service:"unjoin",data:{entity_id:i}}}function ht(i,t){return{domain:"media_player",service:"volume_set",data:{entity_id:i,volume_level:ct(t,0,1)}}}function Mt(i,t){return{domain:"media_player",service:"volume_mute",data:{entity_id:i,is_volume_muted:t}}}function F(i,t){return{domain:"media_player",service:t,data:{entity_id:i}}}function Nt(i,t){let e={};for(let s of t)for(let r of j(i.states[s]))e[r]=s;return e}function jt(i,t){if(t.zone_groups){let r=new Set;for(let n of Object.values(t.zone_groups))for(let o of n)r.add(o);return[...r].filter(n=>i.states[n])}let e=new Set(t.sources),s=[];for(let[r,n]of Object.entries(i.entities??{}))r.startsWith("media_player.")&&n.platform==="binary_moip"&&!e.has(r)&&i.states[r]&&s.push(r);return s}function se(i,t){let e=i.entities?.[t];if(!e)return null;let s=e.area_id??null;return!s&&e.device_id&&(s=i.devices?.[e.device_id]?.area_id??null),s?i.areas?.[s]?.name??null:null}function zt(i,t,e){if(t.zone_groups)return Object.entries(t.zone_groups).map(([r,n])=>({label:r,zones:n.filter(o=>i.states[o])})).filter(r=>r.zones.length>0);let s={};for(let r of e){let n=se(i,r)??"Zones";(s[n]??=[]).push(r)}return Object.entries(s).sort((r,n)=>r[0].localeCompare(n[0])).map(([r,n])=>({label:r,zones:n}))}var re="0.1.0";console.info(`%c binary-moip-source-card %c ${re} `,"color:#fff;background:#3399ff;border-radius:3px 0 0 3px;padding:2px 4px","color:#3399ff;background:#222;border-radius:0 3px 3px 0;padding:2px 4px");window.customCards=[...window.customCards??[],{type:"binary-moip-source-card",name:"Binary MoIP Source Session",description:"Source-first whole-home audio: pick a source, control its session and zones."}];var g=class extends v{constructor(){super(...arguments);this._showPicker=!1}setConfig(e){if(!e||!Array.isArray(e.sources)||e.sources.length===0)throw new Error("binary-moip-source-card: `sources` (a non-empty list) is required");this._config=e}getCardSize(){return 5}static getStubConfig(){return{type:"custom:binary-moip-source-card",sources:[]}}get _selectedSourceId(){let e=this._config.sources.filter(s=>this.hass.states[s]);return this._selected&&e.includes(this._selected)?this._selected:e[0]}async _run(e){let s=Array.isArray(e)?e:[e];await Promise.all(s.map(r=>this.hass.callService(r.domain,r.service,r.data)))}render(){if(!this.hass||!this._config)return d;let e=this._selectedSourceId,s=e?this.hass.states[e]:void 0,n=j(s).map(o=>this.hass.states[o]).filter(o=>!!o);return u`
      <ha-card>
        ${this._config.title?u`<h1 class="card-header">${this._config.title}</h1>`:d}
        <div class="content">
          ${this._renderChips(e)}
          ${s?this._renderNowPlaying(s):u`<div class="note">No source available</div>`}
          ${n.length?this._renderMaster(n):d}
          ${n.map(o=>this._renderZoneRow(o))}
          ${s?this._renderAddZones(s):d}
        </div>
      </ha-card>
    `}_renderChips(e){return u`
      <div class="chips">
        ${this._config.sources.map(s=>{let r=this.hass.states[s];if(!r)return d;let n=Ht(r);return u`
            <button
              class="chip ${s===e?"selected":""}"
              @click=${()=>this._selected=s}
            >
              ${n?u`<span class="dot"></span>`:d}
              ${C(this.hass,s)}
            </button>
          `})}
      </div>
    `}_renderNowPlaying(e){let s=C(this.hass,e.entity_id);if(!Tt(e))return u`<div class="note">${s} — no transport</div>`;let r=e.attributes,n=e.state==="playing";return u`
      <div class="now-playing">
        <div class="art">
          ${r.entity_picture?u`<img src=${r.entity_picture} alt="" />`:u`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${r.media_title??s}</div>
          <div class="artist">${r.media_artist??""}</div>
        </div>
        <div class="transport">
          <button class="icon-btn" @click=${()=>this._run(F(e.entity_id,"media_previous_track"))}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn big" @click=${()=>this._run(F(e.entity_id,"media_play_pause"))}>
            <ha-icon icon=${n?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${()=>this._run(F(e.entity_id,"media_next_track"))}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `}_renderMaster(e){let s=dt(e);return u`
      <div class="row master">
        <ha-icon icon="mdi:speaker-multiple"></ha-icon>
        <span class="row-name">All zones</span>
        <input
          type="range"
          min="0"
          max="100"
          .value=${String(s)}
          @change=${r=>this._run(Ot(e,Number(r.target.value)))}
        />
        <span class="pct">${s}%</span>
      </div>
    `}_renderZoneRow(e){let s=!!e.attributes.is_volume_muted,r=lt(e.attributes.volume_level);return u`
      <div class="row">
        <button
          class="icon-btn"
          title="Mute"
          @click=${()=>this._run(Mt(e.entity_id,!s))}
        >
          <ha-icon icon=${s?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
        </button>
        <span class="row-name">${C(this.hass,e.entity_id)}</span>
        <input
          type="range"
          min="0"
          max="100"
          .value=${String(r)}
          @change=${n=>this._run(ht(e.entity_id,Number(n.target.value)/100))}
        />
        <span class="pct">${r}%</span>
        <button
          class="icon-btn"
          title="Remove from session"
          @click=${()=>this._run(pt(e.entity_id))}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `}_renderAddZones(e){if(!this._showPicker)return u`
        <button class="add-btn" @click=${()=>this._showPicker=!0}>
          <ha-icon icon="mdi:plus"></ha-icon> Add zones
        </button>
      `;let s=new Set(j(e)),r=Nt(this.hass,this._config.sources),n=jt(this.hass,this._config),o=zt(this.hass,this._config,n);return u`
      <div class="picker">
        <div class="picker-head">
          <span>Add zones</span>
          <button class="icon-btn" @click=${()=>this._showPicker=!1}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${o.map(c=>u`
            <div class="picker-group">${c.label}</div>
            ${c.zones.map(a=>{let p=s.has(a),h=r[a],l=h&&h!==e.entity_id;return u`
                <label class="picker-row">
                  <input
                    type="checkbox"
                    .checked=${p}
                    @change=${()=>this._run(p?pt(a):Ut(e.entity_id,a))}
                  />
                  <span>${C(this.hass,a)}</span>
                  ${l?u`<span class="on-other">on ${C(this.hass,h)}</span>`:d}
                </label>
              `})}
          `)}
      </div>
    `}};g.styles=J`
    ha-card {
      overflow: hidden;
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 16px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 0.9rem;
      cursor: pointer;
    }
    .chip.selected {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 16%, transparent);
      color: var(--primary-color);
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--success-color, #2e7d32);
    }
    .now-playing {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .art {
      width: 56px;
      height: 56px;
      border-radius: 8px;
      overflow: hidden;
      flex: 0 0 auto;
      background: var(--secondary-background-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
    }
    .art img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .meta {
      flex: 1 1 auto;
      min-width: 0;
    }
    .title {
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .artist {
      color: var(--secondary-text-color);
      font-size: 0.85rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .transport {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .note {
      color: var(--secondary-text-color);
      font-size: 0.9rem;
      padding: 4px 0;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .row.master {
      border-top: 1px solid var(--divider-color);
      padding-top: 12px;
      font-weight: 500;
    }
    .row-name {
      flex: 0 0 auto;
      min-width: 84px;
      color: var(--primary-text-color);
    }
    input[type="range"] {
      flex: 1 1 auto;
      accent-color: var(--primary-color);
    }
    .pct {
      flex: 0 0 auto;
      width: 40px;
      text-align: right;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      color: var(--primary-text-color);
      cursor: pointer;
      padding: 4px;
      --mdc-icon-size: 22px;
    }
    .icon-btn.big {
      --mdc-icon-size: 30px;
      color: var(--primary-color);
    }
    .add-btn {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px dashed var(--divider-color);
      background: none;
      color: var(--primary-color);
      cursor: pointer;
    }
    .picker {
      border-top: 1px solid var(--divider-color);
      padding-top: 8px;
    }
    .picker-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .picker-group {
      margin-top: 8px;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
    }
    .picker-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .on-other {
      margin-left: auto;
      font-size: 0.8rem;
      color: var(--secondary-text-color);
    }
  `,S([Z({attribute:!1})],g.prototype,"hass",2),S([K()],g.prototype,"_config",2),S([K()],g.prototype,"_selected",2),S([K()],g.prototype,"_showPicker",2),g=S([Rt("binary-moip-source-card")],g);export{g as BinaryMoipSourceCard};
