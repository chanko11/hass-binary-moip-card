var Kt=Object.defineProperty;var Ft=Object.getOwnPropertyDescriptor;var y=(s,t,e,n)=>{for(var i=n>1?void 0:n?Ft(t,e):t,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=(n?o(t,e,i):o(i))||i);return n&&i&&Kt(t,e,i),i};var L=globalThis,D=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),ft=new WeakMap,k=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(D&&t===void 0){let n=e!==void 0&&e.length===1;n&&(t=ft.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&ft.set(e,t))}return t}toString(){return this.cssText}},gt=s=>new k(typeof s=="string"?s:s+"",void 0,Y),J=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((n,i,r)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[r+1],s[0]);return new k(e,s,Y)},_t=(s,t)=>{if(D)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let n=document.createElement("style"),i=L.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=e.cssText,s.appendChild(n)}},X=D?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let n of t.cssRules)e+=n.cssText;return gt(e)})(s):s;var{is:Wt,defineProperty:Bt,getOwnPropertyDescriptor:Gt,getOwnPropertyNames:Yt,getOwnPropertySymbols:Jt,getPrototypeOf:Xt}=Object,Z=globalThis,yt=Z.trustedTypes,Qt=yt?yt.emptyScript:"",te=Z.reactiveElementPolyfillSupport,H=(s,t)=>s,R={toAttribute(s,t){switch(t){case Boolean:s=s?Qt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},q=(s,t)=>!Wt(s,t),vt={attribute:!0,type:String,converter:R,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??=Symbol("metadata"),Z.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=vt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let n=Symbol(),i=this.getPropertyDescriptor(t,n,e);i!==void 0&&Bt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,n){let{get:i,set:r}=Gt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let c=i?.call(this);r?.call(this,o),this.requestUpdate(t,c,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??vt}static _$Ei(){if(this.hasOwnProperty(H("elementProperties")))return;let t=Xt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(H("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(H("properties"))){let e=this.properties,n=[...Yt(e),...Jt(e)];for(let i of n)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[n,i]of e)this.elementProperties.set(n,i)}this._$Eh=new Map;for(let[e,n]of this.elementProperties){let i=this._$Eu(e,n);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let i of n)e.unshift(X(i))}else t!==void 0&&e.push(X(t));return e}static _$Eu(t,e){let n=e.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _t(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){let n=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,n);if(i!==void 0&&n.reflect===!0){let r=(n.converter?.toAttribute!==void 0?n.converter:R).toAttribute(e,n.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let n=this.constructor,i=n._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=n.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:R;this._$Em=i;let c=o.fromAttribute(e,r.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,n,i=!1,r){if(t!==void 0){let o=this.constructor;if(i===!1&&(r=this[t]),n??=o.getPropertyOptions(t),!((n.hasChanged??q)(r,e)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,n))))return;this.C(t,e,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:i,wrapped:r},o){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[i,r]of n){let{wrapped:o}=r,c=this[i];o!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,r,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(e)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[H("elementProperties")]=new Map,g[H("finalized")]=new Map,te?.({ReactiveElement:g}),(Z.reactiveElementVersions??=[]).push("2.1.2");var rt=globalThis,$t=s=>s,V=rt.trustedTypes,bt=V?V.createPolicy("lit-html",{createHTML:s=>s}):void 0,Et="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,Pt="?"+v,ee=`<${Pt}>`,A=document,O=()=>A.createComment(""),U=s=>s===null||typeof s!="object"&&typeof s!="function",ot=Array.isArray,ne=s=>ot(s)||typeof s?.[Symbol.iterator]=="function",Q=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xt=/-->/g,At=/>/g,b=RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ct=/'/g,wt=/"/g,kt=/^(?:script|style|textarea|title)$/i,at=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),p=at(1),ge=at(2),_e=at(3),C=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),St=new WeakMap,x=A.createTreeWalker(A,129);function Ht(s,t){if(!ot(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return bt!==void 0?bt.createHTML(t):t}var ie=(s,t)=>{let e=s.length-1,n=[],i,r=t===2?"<svg>":t===3?"<math>":"",o=T;for(let c=0;c<e;c++){let a=s[c],u,h,d=-1,f=0;for(;f<a.length&&(o.lastIndex=f,h=o.exec(a),h!==null);)f=o.lastIndex,o===T?h[1]==="!--"?o=xt:h[1]!==void 0?o=At:h[2]!==void 0?(kt.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=b):h[3]!==void 0&&(o=b):o===b?h[0]===">"?(o=i??T,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,u=h[1],o=h[3]===void 0?b:h[3]==='"'?wt:Ct):o===wt||o===Ct?o=b:o===xt||o===At?o=T:(o=b,i=void 0);let _=o===b&&s[c+1].startsWith("/>")?" ":"";r+=o===T?a+ee:d>=0?(n.push(u),a.slice(0,d)+Et+a.slice(d)+v+_):a+v+(d===-2?c:_)}return[Ht(s,r+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},M=class s{constructor({strings:t,_$litType$:e},n){let i;this.parts=[];let r=0,o=0,c=t.length-1,a=this.parts,[u,h]=ie(t,e);if(this.el=s.createElement(u,n),x.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=x.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(Et)){let f=h[o++],_=i.getAttribute(d).split(v),j=/([.?@])?(.*)/.exec(f);a.push({type:1,index:r,name:j[2],strings:_,ctor:j[1]==="."?et:j[1]==="?"?nt:j[1]==="@"?it:S}),i.removeAttribute(d)}else d.startsWith(v)&&(a.push({type:6,index:r}),i.removeAttribute(d));if(kt.test(i.tagName)){let d=i.textContent.split(v),f=d.length-1;if(f>0){i.textContent=V?V.emptyScript:"";for(let _=0;_<f;_++)i.append(d[_],O()),x.nextNode(),a.push({type:2,index:++r});i.append(d[f],O())}}}else if(i.nodeType===8)if(i.data===Pt)a.push({type:2,index:r});else{let d=-1;for(;(d=i.data.indexOf(v,d+1))!==-1;)a.push({type:7,index:r}),d+=v.length-1}r++}}static createElement(t,e){let n=A.createElement("template");return n.innerHTML=t,n}};function w(s,t,e=s,n){if(t===C)return t;let i=n!==void 0?e._$Co?.[n]:e._$Cl,r=U(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(s),i._$AT(s,e,n)),n!==void 0?(e._$Co??=[])[n]=i:e._$Cl=i),i!==void 0&&(t=w(s,i._$AS(s,t.values),i,n)),t}var tt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:n}=this._$AD,i=(t?.creationScope??A).importNode(e,!0);x.currentNode=i;let r=x.nextNode(),o=0,c=0,a=n[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new N(r,r.nextSibling,this,t):a.type===1?u=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(u=new st(r,this,t)),this._$AV.push(u),a=n[++c]}o!==a?.index&&(r=x.nextNode(),o++)}return x.currentNode=A,i}p(t){let e=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}},N=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,i){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),U(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==C&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ne(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:n}=t,i=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=M.createElement(Ht(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new tt(i,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=St.get(t.strings);return e===void 0&&St.set(t.strings,e=new M(t)),e}k(t){ot(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,n,i=0;for(let r of t)i===e.length?e.push(n=new s(this.O(O()),this.O(O()),this,this.options)):n=e[i],n._$AI(r),i++;i<e.length&&(this._$AR(n&&n._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let n=$t(t).nextSibling;$t(t).remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},S=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,i,r){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=l}_$AI(t,e=this,n,i){let r=this.strings,o=!1;if(r===void 0)t=w(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==C,o&&(this._$AH=t);else{let c=t,a,u;for(t=r[0],a=0;a<r.length-1;a++)u=w(this,c[n+a],e,a),u===C&&(u=this._$AH[a]),o||=!U(u)||u!==this._$AH[a],u===l?t=l:t!==l&&(t+=(u??"")+r[a+1]),this._$AH[a]=u}o&&!i&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},et=class extends S{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},nt=class extends S{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},it=class extends S{constructor(t,e,n,i,r){super(t,e,n,i,r),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??l)===C)return;let n=this._$AH,i=t===l&&n!==l||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==l&&(n===l||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},st=class{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}};var se=rt.litHtmlPolyfillSupport;se?.(M,N),(rt.litHtmlVersions??=[]).push("3.3.3");var Rt=(s,t,e)=>{let n=e?.renderBefore??t,i=n._$litPart$;if(i===void 0){let r=e?.renderBefore??null;n._$litPart$=i=new N(t.insertBefore(O(),r),r,void 0,e??{})}return i._$AI(s),i};var ct=globalThis,$=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return C}};$._$litElement$=!0,$.finalized=!0,ct.litElementHydrateSupport?.({LitElement:$});var re=ct.litElementPolyfillSupport;re?.({LitElement:$});(ct.litElementVersions??=[]).push("4.2.2");var Tt=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};var oe={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:q},ae=(s=oe,t,e)=>{let{kind:n,metadata:i}=e,r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),n==="setter"&&((s=Object.create(s)).wrapped=!0),r.set(e.name,s),n==="accessor"){let{name:o}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,a,s,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,s,c),c}}}if(n==="setter"){let{name:o}=e;return function(c){let a=this[o];t.call(this,c),this.requestUpdate(o,a,s,!0,c)}}throw Error("Unsupported decorator location: "+n)};function K(s){return(t,e)=>typeof e=="object"?ae(s,t,e):((n,i,r)=>{let o=i.hasOwnProperty(r);return i.constructor.createProperty(r,n),o?Object.getOwnPropertyDescriptor(i,r):void 0})(s,t,e)}function E(s){return K({...s,state:!0,attribute:!1})}var I={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,STOP:4096,PLAY:16384,GROUPING:524288};var lt=(s,t,e)=>Math.min(e,Math.max(t,s)),dt=s=>Math.round(lt(s??0,0,1)*100);function B(s,t){return s.states[t]?.attributes.friendly_name??t}function z(s){return(s?.attributes.group_members??[]).filter(e=>e!==s?.entity_id)}function Ot(s){return s?z(s).length>0||s.state==="playing":!1}function W(s,t){return((s?.attributes.supported_features??0)&t)===t}function Ut(s){return W(s,I.PLAY)||W(s,I.PAUSE)||W(s,I.NEXT_TRACK)||W(s,I.PREVIOUS_TRACK)}function pt(s){let t=s.map(n=>n.attributes.volume_level).filter(n=>typeof n=="number");if(t.length===0)return 0;let e=t.reduce((n,i)=>n+i,0)/t.length;return Math.round(e*100)}function Mt(s,t){let e=Math.round(t)-pt(s);if(e===0)return[];let n=[];for(let i of s){let r=dt(i.attributes.volume_level),o=lt(r+e,0,100);o!==r&&n.push(ht(i.entity_id,o/100))}return n}function Nt(s,t){return{domain:"media_player",service:"join",data:{entity_id:s,group_members:[t]}}}function ut(s){return{domain:"media_player",service:"unjoin",data:{entity_id:s}}}function ht(s,t){return{domain:"media_player",service:"volume_set",data:{entity_id:s,volume_level:lt(t,0,1)}}}function It(s,t){return{domain:"media_player",service:"volume_mute",data:{entity_id:s,is_volume_muted:t}}}function G(s,t){return{domain:"media_player",service:t,data:{entity_id:s}}}function zt(s,t){let e={};for(let n of t)for(let i of z(s.states[n]))e[i]=n;return e}function jt(s,t){if(t.zone_groups){let i=new Set;for(let r of Object.values(t.zone_groups))for(let o of r)i.add(o);return[...i].filter(r=>s.states[r])}let e=new Set(t.sources??[]),n=[];for(let[i,r]of Object.entries(s.entities??{}))i.startsWith("media_player.")&&r.platform==="binary_moip"&&!e.has(i)&&s.states[i]&&n.push(i);return n}function ce(s,t){let e=s.entities?.[t];if(!e)return null;let n=e.area_id??null;return!n&&e.device_id&&(n=s.devices?.[e.device_id]?.area_id??null),n?s.areas?.[n]?.name??null:null}function Lt(s,t,e){if(t.zone_groups)return Object.entries(t.zone_groups).map(([i,r])=>({label:i,zones:r.filter(o=>s.states[o])})).filter(i=>i.zones.length>0);let n={};for(let i of e){let r=ce(s,i)??"Zones";(n[r]??=[]).push(i)}return Object.entries(n).sort((i,r)=>i[0].localeCompare(r[0])).map(([i,r])=>({label:i,zones:r}))}function P(s){return s.type==="connect"}function Dt(s,t){if(P(t)||!s)return null;let e=t,n={entity_id:s,media_id:e.media_id,enqueue:"replace"};return e.media_type&&(n.media_type=e.media_type),e.radio_mode&&(n.radio_mode=!0),{domain:"music_assistant",service:"play_media",data:n}}function le(s,t){let e=s?.attributes.media_content_id;return!e||typeof e!="string"?-1:t.findIndex(n=>{if(P(n))return!1;let i=n.media_id;return!!i&&(e===i||e.includes(i)||i.includes(e))})}var Zt=new Set(["playing","paused","buffering","on"]);function qt(s){return!s||typeof s!="string"||!s.includes("://")?null:s.slice(0,s.indexOf("://")).split("--")[0].toLowerCase()||null}function mt(s,t,e){if(!s||!Zt.has(s.state))return-1;let n=le(t,e);if(n>=0)return n;if(qt(t?.attributes.media_content_id)==="spotify"){let i=e.findIndex(P);if(i>=0)return i}return-1}function Vt(s,t,e){let n="mdi:music";if(!s||!Zt.has(s.state))return{label:"Idle",icon:n};let i=mt(s,t,e);if(i>=0){let o=e[i],c=o.icon??(P(o)?"mdi:spotify":n);return{label:o.label,icon:c}}let r=qt(t?.attributes.media_content_id);return r==="spotify"?{label:"Spotify Connect",icon:"mdi:spotify"}:r&&["http","https","tunein","radiobrowser","icyx"].includes(r)?{label:"Radio",icon:"mdi:radio"}:r&&r!=="library"?{label:r[0].toUpperCase()+r.slice(1),icon:n}:{label:"Playing",icon:n}}var de="2.0.1";console.info(`%c binary-moip-card %c ${de} `,"color:#fff;background:#3399ff;border-radius:3px 0 0 3px;padding:2px 4px","color:#3399ff;background:#222;border-radius:0 3px 3px 0;padding:2px 4px");window.customCards=[...window.customCards??[],{type:"binary-moip-card",name:"Binary MoIP Audio",description:"Streaming-as-parent whole-home audio: pick an input, swap its content, control its zones."}];var m=class extends ${constructor(){super(...arguments);this._showContent=!1;this._showAddZones=!1;this._connectHint=null}setConfig(e){if(!e||!Array.isArray(e.inputs)||e.inputs.length===0)throw new Error("binary-moip-card: `inputs` (a non-empty list) is required");for(let n of e.inputs)if(!n.entity||!n.kind)throw new Error("binary-moip-card: each input needs `entity` and `kind`");this._config={...e,content:e.content??[]}}getCardSize(){return 6}static getStubConfig(){return{type:"custom:binary-moip-card",inputs:[]}}get _selectedInput(){let e=this._config.inputs;if(this._selected){let n=e.find(i=>i.entity===this._selected);if(n&&this.hass.states[n.entity])return n}return e.find(n=>this.hass.states[n.entity])??e[0]}_src(e){return this.hass.states[e.entity]}_ma(e){return e.ma_player?this.hass.states[e.ma_player]:void 0}get _zoneCfg(){return{zone_groups:this._config.zone_groups,sources:this._config.inputs.map(e=>e.entity)}}_streamContent(e){return Vt(this._src(e),this._ma(e),this._config.content??[])}async _run(e){if(!e)return;let n=Array.isArray(e)?e:[e];await Promise.all(n.map(i=>this.hass.callService(i.domain,i.service,i.data)))}render(){if(!this.hass||!this._config)return l;let e=this._selectedInput,n=e?this._src(e):void 0,i=z(n).map(r=>this.hass.states[r]).filter(r=>!!r);return p`
      <ha-card>
        ${this._config.title?p`<h1 class="card-header">${this._config.title}</h1>`:l}
        <div class="content">
          ${this._renderRail(e)}
          ${e?this._renderContentSlot(e):p`<div class="note">No input available</div>`}
          ${e&&e.kind==="stream"&&this._showContent?this._renderContentPicker(e):l}
          ${i.length?this._renderMaster(i):l}
          ${i.map(r=>this._renderZoneRow(r))}
          ${e&&n?this._renderAddZones(e,n):l}
        </div>
      </ha-card>
    `}_renderRail(e){return p`
      <div class="rail">
        ${this._config.inputs.map(n=>{let i=this._src(n),r=Ot(i),o=n.kind==="stream",c=o?this._streamContent(n).label:n.name,a=o?n.name:"Line-in",u=n.icon??(o?"mdi:cast-audio":"mdi:music-box-outline"),h=e&&n.entity===e.entity;return p`
            <button
              class="tile ${h?"selected":""}"
              @click=${()=>{this._selected=n.entity,this._showContent=!1,this._showAddZones=!1,this._connectHint=null}}
            >
              <div class="tile-top">
                <ha-icon icon=${u}></ha-icon>
                ${r?p`<span class="dot"></span>`:l}
              </div>
              <div class="tile-headline">${c}</div>
              <div class="tile-sub">${a}</div>
              <div class="tile-state">${i?i.state:"unavailable"}</div>
            </button>
          `})}
      </div>
    `}_renderContentSlot(e){let n=this._src(e);if(e.kind==="physical")return p`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${e.icon??"mdi:music-box-outline"}></ha-icon>
          <div class="meta">
            <div class="title">${e.name}</div>
            <div class="artist">Live input — control is at the source; no skip/pause.</div>
          </div>
        </div>
      `;let i=this._streamContent(e);return p`
      <div class="content-slot">
        <ha-icon class="slot-icon" icon=${i.icon}></ha-icon>
        <div class="meta">
          <div class="title">${i.label}</div>
          <div class="artist">${e.name}</div>
        </div>
        <button
          class="change-btn"
          @click=${()=>{this._showContent=!this._showContent,this._connectHint=null}}
        >
          Change source
        </button>
      </div>
      <div class="hint">Switching the source keeps the same zones.</div>
      ${n?this._renderNowPlaying(n):l}
    `}_renderContentPicker(e){let n=this._config.content??[],i=mt(this._src(e),this._ma(e),n);return p`
      <div class="picker">
        <div class="picker-head">
          <span>Change source — ${e.name}</span>
          <button class="icon-btn" @click=${()=>this._showContent=!1}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${n.map((r,o)=>{let c=P(r),a=r.icon??(c?"mdi:spotify":"mdi:playlist-music");return p`
            <button
              class="preset-row ${o===i?"selected":""}"
              @click=${()=>{c?this._connectHint=`Cast from your Spotify app to ${e.name}.`:(this._run(Dt(e.ma_player,r)),this._showContent=!1)}}
            >
              <ha-icon icon=${a}></ha-icon>
              <span>${r.label}</span>
              ${c?p`<span class="on-other">cast from app</span>`:l}
            </button>
          `})}
        ${this._connectHint?p`<div class="hint">${this._connectHint}</div>`:l}
      </div>
    `}_renderNowPlaying(e){if(!Ut(e))return p`<div class="note">No transport for this input.</div>`;let n=e.attributes,i=e.state==="playing";return p`
      <div class="now-playing">
        <div class="art">
          ${n.entity_picture?p`<img src=${n.entity_picture} alt="" />`:p`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${n.media_title??""}</div>
          <div class="artist">${n.media_artist??""}</div>
        </div>
        <div class="transport">
          <button class="icon-btn" @click=${()=>this._run(G(e.entity_id,"media_previous_track"))}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn big" @click=${()=>this._run(G(e.entity_id,"media_play_pause"))}>
            <ha-icon icon=${i?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${()=>this._run(G(e.entity_id,"media_next_track"))}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `}_renderMaster(e){let n=pt(e);return p`
      <div class="row master">
        <ha-icon icon="mdi:speaker-multiple"></ha-icon>
        <span class="row-name">All zones</span>
        <input type="range" min="0" max="100" .value=${String(n)}
          @change=${i=>this._run(Mt(e,Number(i.target.value)))} />
        <span class="pct">${n}%</span>
      </div>
    `}_renderZoneRow(e){let n=!!e.attributes.is_volume_muted,i=dt(e.attributes.volume_level);return p`
      <div class="row">
        <button class="icon-btn" title="Mute"
          @click=${()=>this._run(It(e.entity_id,!n))}>
          <ha-icon icon=${n?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
        </button>
        <span class="row-name">${B(this.hass,e.entity_id)}</span>
        <input type="range" min="0" max="100" .value=${String(i)}
          @change=${r=>this._run(ht(e.entity_id,Number(r.target.value)/100))} />
        <span class="pct">${i}%</span>
        <button class="icon-btn" title="Remove from session"
          @click=${()=>this._run(ut(e.entity_id))}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `}_renderAddZones(e,n){if(!this._showAddZones)return p`
        <button class="add-btn" @click=${()=>this._showAddZones=!0}>
          <ha-icon icon="mdi:plus"></ha-icon> Add zones
        </button>
      `;let i=new Set(z(n)),r=zt(this.hass,this._zoneCfg.sources),o=Lt(this.hass,this._zoneCfg,jt(this.hass,this._zoneCfg));return p`
      <div class="picker">
        <div class="picker-head">
          <span>Add zones</span>
          <button class="icon-btn" @click=${()=>this._showAddZones=!1}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${o.map(c=>p`
            <div class="picker-group">${c.label}</div>
            ${c.zones.map(a=>{let u=i.has(a),h=r[a],d=h&&h!==e.entity;return p`
                <label class="picker-row">
                  <input type="checkbox" .checked=${u}
                    @change=${()=>this._run(u?ut(a):Nt(e.entity,a))} />
                  <span>${B(this.hass,a)}</span>
                  ${d?p`<span class="on-other">on ${B(this.hass,h)}</span>`:l}
                </label>
              `})}
          `)}
      </div>
    `}};m.styles=J`
    ha-card { overflow: hidden; }
    .content { display: flex; flex-direction: column; gap: 12px; padding: 16px; }

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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
    .picker { border-top: 1px solid var(--divider-color); padding-top: 8px; }
    .picker-head {
      display: flex; align-items: center; justify-content: space-between;
      font-weight: 500; color: var(--primary-text-color);
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
    .preset-row.selected { color: var(--primary-color); }
    .on-other {
      margin-left: auto; font-size: 0.8rem; color: var(--secondary-text-color);
    }
  `,y([K({attribute:!1})],m.prototype,"hass",2),y([E()],m.prototype,"_config",2),y([E()],m.prototype,"_selected",2),y([E()],m.prototype,"_showContent",2),y([E()],m.prototype,"_showAddZones",2),y([E()],m.prototype,"_connectHint",2),m=y([Tt("binary-moip-card")],m);export{m as BinaryMoipCard};
