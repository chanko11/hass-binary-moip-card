var Zt=Object.defineProperty;var qt=Object.getOwnPropertyDescriptor;var v=(n,t,e,s)=>{for(var i=s>1?void 0:s?qt(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Zt(t,e,i),i};var j=globalThis,L=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),ft=new WeakMap,P=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(L&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ft.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ft.set(e,t))}return t}toString(){return this.cssText}},gt=n=>new P(typeof n=="string"?n:n+"",void 0,Y),J=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new P(e,n,Y)},_t=(n,t)=>{if(L)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=j.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},X=L?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return gt(e)})(n):n;var{is:Vt,defineProperty:Kt,getOwnPropertyDescriptor:Wt,getOwnPropertyNames:Ft,getOwnPropertySymbols:Bt,getPrototypeOf:Gt}=Object,D=globalThis,vt=D.trustedTypes,Yt=vt?vt.emptyScript:"",Jt=D.reactiveElementPolyfillSupport,k=(n,t)=>n,H={toAttribute(n,t){switch(t){case Boolean:n=n?Yt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Z=(n,t)=>!Vt(n,t),yt={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??=Symbol("metadata"),D.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=yt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Kt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=Wt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let c=i?.call(this);r?.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??yt}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;let t=Gt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){let e=this.properties,s=[...Ft(e),...Bt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(X(i))}else t!==void 0&&e.push(X(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _t(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:H).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:H;this._$Em=i;let c=o.fromAttribute(e,r.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(t!==void 0){let o=this.constructor;if(i===!1&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??Z)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:o}=r,c=this[i];o!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,r,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[k("elementProperties")]=new Map,g[k("finalized")]=new Map,Jt?.({ReactiveElement:g}),(D.reactiveElementVersions??=[]).push("2.1.2");var rt=globalThis,$t=n=>n,q=rt.trustedTypes,bt=q?q.createPolicy("lit-html",{createHTML:n=>n}):void 0,Et="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,Pt="?"+y,Xt=`<${Pt}>`,A=document,T=()=>A.createComment(""),O=n=>n===null||typeof n!="object"&&typeof n!="function",ot=Array.isArray,Qt=n=>ot(n)||typeof n?.[Symbol.iterator]=="function",Q=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xt=/-->/g,At=/>/g,b=RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ct=/'/g,St=/"/g,kt=/^(?:script|style|textarea|title)$/i,at=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),p=at(1),ue=at(2),me=at(3),C=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),wt=new WeakMap,x=A.createTreeWalker(A,129);function Ht(n,t){if(!ot(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return bt!==void 0?bt.createHTML(t):t}var te=(n,t)=>{let e=n.length-1,s=[],i,r=t===2?"<svg>":t===3?"<math>":"",o=R;for(let c=0;c<e;c++){let a=n[c],h,u,d=-1,f=0;for(;f<a.length&&(o.lastIndex=f,u=o.exec(a),u!==null);)f=o.lastIndex,o===R?u[1]==="!--"?o=xt:u[1]!==void 0?o=At:u[2]!==void 0?(kt.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=b):u[3]!==void 0&&(o=b):o===b?u[0]===">"?(o=i??R,d=-1):u[1]===void 0?d=-2:(d=o.lastIndex-u[2].length,h=u[1],o=u[3]===void 0?b:u[3]==='"'?St:Ct):o===St||o===Ct?o=b:o===xt||o===At?o=R:(o=b,i=void 0);let _=o===b&&n[c+1].startsWith("/>")?" ":"";r+=o===R?a+Xt:d>=0?(s.push(h),a.slice(0,d)+Et+a.slice(d)+y+_):a+y+(d===-2?c:_)}return[Ht(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},U=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0,c=t.length-1,a=this.parts,[h,u]=te(t,e);if(this.el=n.createElement(h,s),x.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=x.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(Et)){let f=u[o++],_=i.getAttribute(d).split(y),z=/([.?@])?(.*)/.exec(f);a.push({type:1,index:r,name:z[2],strings:_,ctor:z[1]==="."?et:z[1]==="?"?st:z[1]==="@"?it:w}),i.removeAttribute(d)}else d.startsWith(y)&&(a.push({type:6,index:r}),i.removeAttribute(d));if(kt.test(i.tagName)){let d=i.textContent.split(y),f=d.length-1;if(f>0){i.textContent=q?q.emptyScript:"";for(let _=0;_<f;_++)i.append(d[_],T()),x.nextNode(),a.push({type:2,index:++r});i.append(d[f],T())}}}else if(i.nodeType===8)if(i.data===Pt)a.push({type:2,index:r});else{let d=-1;for(;(d=i.data.indexOf(y,d+1))!==-1;)a.push({type:7,index:r}),d+=y.length-1}r++}}static createElement(t,e){let s=A.createElement("template");return s.innerHTML=t,s}};function S(n,t,e=n,s){if(t===C)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,r=O(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=S(n,i._$AS(n,t.values),i,s)),t}var tt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??A).importNode(e,!0);x.currentNode=i;let r=x.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new M(r,r.nextSibling,this,t):a.type===1?h=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(h=new nt(r,this,t)),this._$AV.push(h),a=s[++c]}o!==a?.index&&(r=x.nextNode(),o++)}return x.currentNode=A,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},M=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),O(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==C&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Qt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=U.createElement(Ht(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new tt(i,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=wt.get(t.strings);return e===void 0&&wt.set(t.strings,e=new U(t)),e}k(t){ot(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new n(this.O(T()),this.O(T()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=$t(t).nextSibling;$t(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},w=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(t,e=this,s,i){let r=this.strings,o=!1;if(r===void 0)t=S(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==C,o&&(this._$AH=t);else{let c=t,a,h;for(t=r[0],a=0;a<r.length-1;a++)h=S(this,c[s+a],e,a),h===C&&(h=this._$AH[a]),o||=!O(h)||h!==this._$AH[a],h===l?t=l:t!==l&&(t+=(h??"")+r[a+1]),this._$AH[a]=h}o&&!i&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},et=class extends w{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},st=class extends w{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},it=class extends w{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??l)===C)return;let s=this._$AH,i=t===l&&s!==l||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==l&&(s===l||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},nt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var ee=rt.litHtmlPolyfillSupport;ee?.(U,M),(rt.litHtmlVersions??=[]).push("3.3.3");var Rt=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let r=e?.renderBefore??null;s._$litPart$=i=new M(t.insertBefore(T(),r),r,void 0,e??{})}return i._$AI(n),i};var ct=globalThis,$=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return C}};$._$litElement$=!0,$.finalized=!0,ct.litElementHydrateSupport?.({LitElement:$});var se=ct.litElementPolyfillSupport;se?.({LitElement:$});(ct.litElementVersions??=[]).push("4.2.2");var Tt=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var ie={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:Z},ne=(n=ie,t,e)=>{let{kind:s,metadata:i}=e,r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(e.name,n),s==="accessor"){let{name:o}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,a,n,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,n,c),c}}}if(s==="setter"){let{name:o}=e;return function(c){let a=this[o];t.call(this,c),this.requestUpdate(o,a,n,!0,c)}}throw Error("Unsupported decorator location: "+s)};function V(n){return(t,e)=>typeof e=="object"?ne(n,t,e):((s,i,r)=>{let o=i.hasOwnProperty(r);return i.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(i,r):void 0})(n,t,e)}function E(n){return V({...n,state:!0,attribute:!1})}var N={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,STOP:4096,PLAY:16384,GROUPING:524288};var lt=(n,t,e)=>Math.min(e,Math.max(t,n)),dt=n=>Math.round(lt(n??0,0,1)*100);function F(n,t){return n.states[t]?.attributes.friendly_name??t}function I(n){return(n?.attributes.group_members??[]).filter(e=>e!==n?.entity_id)}function Ot(n){return n?I(n).length>0||n.state==="playing":!1}function W(n,t){return((n?.attributes.supported_features??0)&t)===t}function Ut(n){return W(n,N.PLAY)||W(n,N.PAUSE)||W(n,N.NEXT_TRACK)||W(n,N.PREVIOUS_TRACK)}function pt(n){let t=n.map(s=>s.attributes.volume_level).filter(s=>typeof s=="number");if(t.length===0)return 0;let e=t.reduce((s,i)=>s+i,0)/t.length;return Math.round(e*100)}function Mt(n,t){let e=Math.round(t)-pt(n);if(e===0)return[];let s=[];for(let i of n){let r=dt(i.attributes.volume_level),o=lt(r+e,0,100);o!==r&&s.push(ut(i.entity_id,o/100))}return s}function Nt(n,t){return{domain:"media_player",service:"join",data:{entity_id:n,group_members:[t]}}}function ht(n){return{domain:"media_player",service:"unjoin",data:{entity_id:n}}}function ut(n,t){return{domain:"media_player",service:"volume_set",data:{entity_id:n,volume_level:lt(t,0,1)}}}function It(n,t){return{domain:"media_player",service:"volume_mute",data:{entity_id:n,is_volume_muted:t}}}function B(n,t){return{domain:"media_player",service:t,data:{entity_id:n}}}function zt(n,t){let e={};for(let s of t)for(let i of I(n.states[s]))e[i]=s;return e}function jt(n,t){if(t.zone_groups){let i=new Set;for(let r of Object.values(t.zone_groups))for(let o of r)i.add(o);return[...i].filter(r=>n.states[r])}let e=new Set(t.sources??[]),s=[];for(let[i,r]of Object.entries(n.entities??{}))i.startsWith("media_player.")&&r.platform==="binary_moip"&&!e.has(i)&&n.states[i]&&s.push(i);return s}function re(n,t){let e=n.entities?.[t];if(!e)return null;let s=e.area_id??null;return!s&&e.device_id&&(s=n.devices?.[e.device_id]?.area_id??null),s?n.areas?.[s]?.name??null:null}function Lt(n,t,e){if(t.zone_groups)return Object.entries(t.zone_groups).map(([i,r])=>({label:i,zones:r.filter(o=>n.states[o])})).filter(i=>i.zones.length>0);let s={};for(let i of e){let r=re(n,i)??"Zones";(s[r]??=[]).push(i)}return Object.entries(s).sort((i,r)=>i[0].localeCompare(r[0])).map(([i,r])=>({label:i,zones:r}))}function G(n){return n.type==="connect"}function Dt(n,t){if(G(t)||!n)return null;let e=t,s={entity_id:n,media_id:e.media_id,enqueue:"replace"};return e.media_type&&(s.media_type=e.media_type),e.radio_mode&&(s.radio_mode=!0),{domain:"music_assistant",service:"play_media",data:s}}function mt(n,t){let e=n?.attributes.media_content_id;return!e||typeof e!="string"?-1:t.findIndex(s=>{if(G(s))return!1;let i=s.media_id;return!!i&&(e===i||e.includes(i)||i.includes(e))})}var oe="2.0.0";console.info(`%c binary-moip-card %c ${oe} `,"color:#fff;background:#3399ff;border-radius:3px 0 0 3px;padding:2px 4px","color:#3399ff;background:#222;border-radius:0 3px 3px 0;padding:2px 4px");window.customCards=[...window.customCards??[],{type:"binary-moip-card",name:"Binary MoIP Audio",description:"Streaming-as-parent whole-home audio: pick an input, swap its content, control its zones."}];var ae=new Set(["playing","paused","buffering","on"]),m=class extends ${constructor(){super(...arguments);this._showContent=!1;this._showAddZones=!1;this._connectHint=null}setConfig(e){if(!e||!Array.isArray(e.inputs)||e.inputs.length===0)throw new Error("binary-moip-card: `inputs` (a non-empty list) is required");for(let s of e.inputs)if(!s.entity||!s.kind)throw new Error("binary-moip-card: each input needs `entity` and `kind`");this._config={...e,content:e.content??[]}}getCardSize(){return 6}static getStubConfig(){return{type:"custom:binary-moip-card",inputs:[]}}get _selectedInput(){let e=this._config.inputs;if(this._selected){let s=e.find(i=>i.entity===this._selected);if(s&&this.hass.states[s.entity])return s}return e.find(s=>this.hass.states[s.entity])??e[0]}_src(e){return this.hass.states[e.entity]}_ma(e){return e.ma_player?this.hass.states[e.ma_player]:void 0}get _zoneCfg(){return{zone_groups:this._config.zone_groups,sources:this._config.inputs.map(e=>e.entity)}}_streamContent(e){let s=this._src(e),i=this._config.content??[];if(!s||!ae.has(s.state))return{label:"Idle",icon:e.icon??"mdi:music"};let r=mt(this._ma(e),i);if(r>=0){let o=i[r];return{label:o.label,icon:o.icon??e.icon??"mdi:music"}}return{label:s.attributes.media_title||"Playing",icon:e.icon??"mdi:music"}}async _run(e){if(!e)return;let s=Array.isArray(e)?e:[e];await Promise.all(s.map(i=>this.hass.callService(i.domain,i.service,i.data)))}render(){if(!this.hass||!this._config)return l;let e=this._selectedInput,s=e?this._src(e):void 0,i=I(s).map(r=>this.hass.states[r]).filter(r=>!!r);return p`
      <ha-card>
        ${this._config.title?p`<h1 class="card-header">${this._config.title}</h1>`:l}
        <div class="content">
          ${this._renderRail(e)}
          ${e?this._renderContentSlot(e):p`<div class="note">No input available</div>`}
          ${e&&e.kind==="stream"&&this._showContent?this._renderContentPicker(e):l}
          ${i.length?this._renderMaster(i):l}
          ${i.map(r=>this._renderZoneRow(r))}
          ${e&&s?this._renderAddZones(e,s):l}
        </div>
      </ha-card>
    `}_renderRail(e){return p`
      <div class="rail">
        ${this._config.inputs.map(s=>{let i=this._src(s),r=Ot(i),o=s.kind==="stream",c=o?this._streamContent(s).label:s.name,a=o?s.name:"Line-in",h=s.icon??(o?"mdi:cast-audio":"mdi:music-box-outline"),u=e&&s.entity===e.entity;return p`
            <button
              class="tile ${u?"selected":""}"
              @click=${()=>{this._selected=s.entity,this._showContent=!1,this._showAddZones=!1,this._connectHint=null}}
            >
              <div class="tile-top">
                <ha-icon icon=${h}></ha-icon>
                ${r?p`<span class="dot"></span>`:l}
              </div>
              <div class="tile-headline">${c}</div>
              <div class="tile-sub">${a}</div>
              <div class="tile-state">${i?i.state:"unavailable"}</div>
            </button>
          `})}
      </div>
    `}_renderContentSlot(e){let s=this._src(e);if(e.kind==="physical")return p`
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
      ${s?this._renderNowPlaying(s):l}
    `}_renderContentPicker(e){let s=this._config.content??[],i=mt(this._ma(e),s);return p`
      <div class="picker">
        <div class="picker-head">
          <span>Change source — ${e.name}</span>
          <button class="icon-btn" @click=${()=>this._showContent=!1}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${s.map((r,o)=>{let c=G(r),a=r.icon??(c?"mdi:spotify":"mdi:playlist-music");return p`
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
    `}_renderNowPlaying(e){if(!Ut(e))return p`<div class="note">No transport for this input.</div>`;let s=e.attributes,i=e.state==="playing";return p`
      <div class="now-playing">
        <div class="art">
          ${s.entity_picture?p`<img src=${s.entity_picture} alt="" />`:p`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${s.media_title??""}</div>
          <div class="artist">${s.media_artist??""}</div>
        </div>
        <div class="transport">
          <button class="icon-btn" @click=${()=>this._run(B(e.entity_id,"media_previous_track"))}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn big" @click=${()=>this._run(B(e.entity_id,"media_play_pause"))}>
            <ha-icon icon=${i?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${()=>this._run(B(e.entity_id,"media_next_track"))}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `}_renderMaster(e){let s=pt(e);return p`
      <div class="row master">
        <ha-icon icon="mdi:speaker-multiple"></ha-icon>
        <span class="row-name">All zones</span>
        <input type="range" min="0" max="100" .value=${String(s)}
          @change=${i=>this._run(Mt(e,Number(i.target.value)))} />
        <span class="pct">${s}%</span>
      </div>
    `}_renderZoneRow(e){let s=!!e.attributes.is_volume_muted,i=dt(e.attributes.volume_level);return p`
      <div class="row">
        <button class="icon-btn" title="Mute"
          @click=${()=>this._run(It(e.entity_id,!s))}>
          <ha-icon icon=${s?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
        </button>
        <span class="row-name">${F(this.hass,e.entity_id)}</span>
        <input type="range" min="0" max="100" .value=${String(i)}
          @change=${r=>this._run(ut(e.entity_id,Number(r.target.value)/100))} />
        <span class="pct">${i}%</span>
        <button class="icon-btn" title="Remove from session"
          @click=${()=>this._run(ht(e.entity_id))}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `}_renderAddZones(e,s){if(!this._showAddZones)return p`
        <button class="add-btn" @click=${()=>this._showAddZones=!0}>
          <ha-icon icon="mdi:plus"></ha-icon> Add zones
        </button>
      `;let i=new Set(I(s)),r=zt(this.hass,this._zoneCfg.sources),o=Lt(this.hass,this._zoneCfg,jt(this.hass,this._zoneCfg));return p`
      <div class="picker">
        <div class="picker-head">
          <span>Add zones</span>
          <button class="icon-btn" @click=${()=>this._showAddZones=!1}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${o.map(c=>p`
            <div class="picker-group">${c.label}</div>
            ${c.zones.map(a=>{let h=i.has(a),u=r[a],d=u&&u!==e.entity;return p`
                <label class="picker-row">
                  <input type="checkbox" .checked=${h}
                    @change=${()=>this._run(h?ht(a):Nt(e.entity,a))} />
                  <span>${F(this.hass,a)}</span>
                  ${d?p`<span class="on-other">on ${F(this.hass,u)}</span>`:l}
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
  `,v([V({attribute:!1})],m.prototype,"hass",2),v([E()],m.prototype,"_config",2),v([E()],m.prototype,"_selected",2),v([E()],m.prototype,"_showContent",2),v([E()],m.prototype,"_showAddZones",2),v([E()],m.prototype,"_connectHint",2),m=v([Tt("binary-moip-card")],m);export{m as BinaryMoipCard};
