"use strict";(self.webpackChunkpyramid=self.webpackChunkpyramid||[]).push([[540],{1540:(Y,v,r)=>{r.r(v),r.d(v,{LoginModule:()=>F});var d=r(9808),b=r(1528),e=r(5e3),g=r(6037),h=r(2382),m=r(1424),u=r(1777),a=r(5730),p=r(9783),f=r(5921);const y=["input"];function _(n,l){if(1&n){const t=e.EpF();e.TgZ(0,"i",5),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.clear())}),e.qZA()}}function T(n,l){if(1&n){const t=e.EpF();e.TgZ(0,"i",6),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.onMaskToggle())}),e.ALo(1,"mapper"),e.qZA()}if(2&n){const t=e.oxw();e.Q6J("ngClass",e.xi3(1,1,t.unmasked,t.toggleIconClass))}}function C(n,l){1&n&&e.GkF(0)}function L(n,l){1&n&&e.GkF(0)}function k(n,l){if(1&n&&(e.ynx(0),e.YNc(1,L,1,0,"ng-container",8),e.BQk()),2&n){const t=e.oxw(2);e.xp6(1),e.Q6J("ngTemplateOutlet",t.contentTemplate)}}const x=function(n){return{width:n}};function M(n,l){if(1&n&&(e.TgZ(0,"div",11),e._UZ(1,"div",0),e.ALo(2,"mapper"),e.qZA(),e.TgZ(3,"div",12),e._uU(4),e.qZA()),2&n){const t=e.oxw(2);e.xp6(1),e.Q6J("ngClass",e.xi3(2,3,t.meter,t.strengthClass))("ngStyle",e.VKq(6,x,t.meter?t.meter.width:"")),e.xp6(3),e.Oqu(t.infoText)}}function P(n,l){1&n&&e.GkF(0)}const I=function(n,l){return{showTransitionParams:n,hideTransitionParams:l}},A=function(n){return{value:"visible",params:n}};function S(n,l){if(1&n){const t=e.EpF();e.TgZ(0,"div",6,7),e.NdJ("click",function(s){e.CHM(t);const o=e.oxw();return e.KtG(o.onOverlayClick(s))})("@overlayAnimation.start",function(s){e.CHM(t);const o=e.oxw();return e.KtG(o.onAnimationStart(s))})("@overlayAnimation.done",function(s){e.CHM(t);const o=e.oxw();return e.KtG(o.onAnimationEnd(s))}),e.YNc(2,C,1,0,"ng-container",8),e.YNc(3,k,2,1,"ng-container",9),e.YNc(4,M,5,8,"ng-template",null,10,e.W1O),e.YNc(6,P,1,0,"ng-container",8),e.qZA()}if(2&n){const t=e.MAs(5),i=e.oxw();e.Q6J("ngClass","p-password-panel p-component")("@overlayAnimation",e.VKq(9,A,e.WLB(6,I,i.showTransitionOptions,i.hideTransitionOptions))),e.xp6(2),e.Q6J("ngTemplateOutlet",i.headerTemplate),e.xp6(1),e.Q6J("ngIf",i.contentTemplate)("ngIfElse",t),e.xp6(3),e.Q6J("ngTemplateOutlet",i.footerTemplate)}}let O=(()=>{class n{constructor(t,i){this.el=t,this.zone=i,this.promptLabel="Enter a password",this.weakLabel="Weak",this.mediumLabel="Medium",this.strongLabel="Strong",this.feedback=!0}set showPassword(t){this.el.nativeElement.type=t?"text":"password"}ngDoCheck(){this.updateFilledState()}onInput(t){this.updateFilledState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}createPanel(){this.panel=document.createElement("div"),this.panel.className="p-password-panel p-component p-password-panel-overlay p-connected-overlay",this.meter=document.createElement("div"),this.meter.className="p-password-meter",this.info=document.createElement("div"),this.info.className="p-password-info",this.info.textContent=this.promptLabel,this.panel.appendChild(this.meter),this.panel.appendChild(this.info),this.panel.style.minWidth=a.p.getOuterWidth(this.el.nativeElement)+"px",document.body.appendChild(this.panel)}showOverlay(){this.feedback&&(this.panel||this.createPanel(),this.panel.style.zIndex=String(++a.p.zindex),this.panel.style.display="block",this.zone.runOutsideAngular(()=>{setTimeout(()=>{a.p.addClass(this.panel,"p-connected-overlay-visible"),this.bindScrollListener(),this.bindDocumentResizeListener()},1)}),a.p.absolutePosition(this.panel,this.el.nativeElement))}hideOverlay(){this.feedback&&this.panel&&(a.p.addClass(this.panel,"p-connected-overlay-hidden"),a.p.removeClass(this.panel,"p-connected-overlay-visible"),this.unbindScrollListener(),this.unbindDocumentResizeListener(),this.zone.runOutsideAngular(()=>{setTimeout(()=>{this.ngOnDestroy()},150)}))}onFocus(){this.showOverlay()}onBlur(){this.hideOverlay()}onKeyup(t){if(this.feedback){let s=t.target.value,o=null,c=null;if(0===s.length)o=this.promptLabel,c="0px 0px";else{var i=this.testStrength(s);i<30?(o=this.weakLabel,c="0px -10px"):i>=30&&i<80?(o=this.mediumLabel,c="0px -20px"):i>=80&&(o=this.strongLabel,c="0px -30px")}(!this.panel||!a.p.hasClass(this.panel,"p-connected-overlay-visible"))&&this.showOverlay(),this.meter.style.backgroundPosition=c,this.info.textContent=o}}testStrength(t){let s,i=0;return s=t.match("[0-9]"),i+=25*this.normalize(s?s.length:1/4,1),s=t.match("[a-zA-Z]"),i+=10*this.normalize(s?s.length:.5,3),s=t.match("[!@#$%^&*?_~.,;=]"),i+=35*this.normalize(s?s.length:1/6,1),s=t.match("[A-Z]"),i+=30*this.normalize(s?s.length:1/6,1),i*=t.length/8,i>100?100:i}normalize(t,i){return t-i<=0?t/i:1+t/(t+i/4)*.5}get disabled(){return this.el.nativeElement.disabled}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new a.V(this.el.nativeElement,()=>{a.p.hasClass(this.panel,"p-connected-overlay-visible")&&this.hideOverlay()})),this.scrollHandler.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}bindDocumentResizeListener(){this.documentResizeListener=this.onWindowResize.bind(this),window.addEventListener("resize",this.documentResizeListener)}unbindDocumentResizeListener(){this.documentResizeListener&&(window.removeEventListener("resize",this.documentResizeListener),this.documentResizeListener=null)}onWindowResize(){a.p.isTouchDevice()||this.hideOverlay()}ngOnDestroy(){this.panel&&(this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.unbindDocumentResizeListener(),document.body.removeChild(this.panel),this.panel=null,this.meter=null,this.info=null)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(e.SBq),e.Y36(e.R0b))},n.\u0275dir=e.lG2({type:n,selectors:[["","pPassword",""]],hostAttrs:[1,"p-inputtext","p-component","p-element"],hostVars:2,hostBindings:function(t,i){1&t&&e.NdJ("input",function(o){return i.onInput(o)})("focus",function(){return i.onFocus()})("blur",function(){return i.onBlur()})("keyup",function(o){return i.onKeyup(o)}),2&t&&e.ekj("p-filled",i.filled)},inputs:{promptLabel:"promptLabel",weakLabel:"weakLabel",mediumLabel:"mediumLabel",strongLabel:"strongLabel",feedback:"feedback",showPassword:"showPassword"}}),n})(),Z=(()=>{class n{transform(t,i,...s){return i(t,...s)}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275pipe=e.Yjl({name:"mapper",type:n,pure:!0}),n})();const z={provide:h.JU,useExisting:(0,e.Gpc)(()=>R),multi:!0};let R=(()=>{class n{constructor(t,i,s,o){this.cd=t,this.config=i,this.el=s,this.overlayService=o,this.mediumRegex="^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})",this.strongRegex="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})",this.feedback=!0,this.showTransitionOptions=".12s cubic-bezier(0, 0, 0.2, 1)",this.hideTransitionOptions=".1s linear",this.showClear=!1,this.onFocus=new e.vpe,this.onBlur=new e.vpe,this.onClear=new e.vpe,this.overlayVisible=!1,this.focused=!1,this.unmasked=!1,this.value=null,this.onModelChange=()=>{},this.onModelTouched=()=>{}}ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"content":default:this.contentTemplate=t.template;break;case"header":this.headerTemplate=t.template;break;case"footer":this.footerTemplate=t.template}})}ngOnInit(){this.infoText=this.promptText(),this.mediumCheckRegExp=new RegExp(this.mediumRegex),this.strongCheckRegExp=new RegExp(this.strongRegex),this.translationSubscription=this.config.translationObserver.subscribe(()=>{this.updateUI(this.value||"")})}onAnimationStart(t){switch(t.toState){case"visible":this.overlay=t.element,f.P9.set("overlay",this.overlay,this.config.zIndex.overlay),this.appendContainer(),this.alignOverlay(),this.bindScrollListener(),this.bindResizeListener();break;case"void":this.unbindScrollListener(),this.unbindResizeListener(),this.overlay=null}}onAnimationEnd(t){"void"===t.toState&&f.P9.clear(t.element)}appendContainer(){this.appendTo&&("body"===this.appendTo?document.body.appendChild(this.overlay):document.getElementById(this.appendTo).appendChild(this.overlay))}alignOverlay(){this.appendTo?(this.overlay.style.minWidth=a.p.getOuterWidth(this.input.nativeElement)+"px",a.p.absolutePosition(this.overlay,this.input.nativeElement)):a.p.relativePosition(this.overlay,this.input.nativeElement)}onInput(t){this.value=t.target.value,this.onModelChange(this.value),this.onModelTouched()}onInputFocus(t){this.focused=!0,this.feedback&&(this.overlayVisible=!0),this.onFocus.emit(t)}onInputBlur(t){this.focused=!1,this.feedback&&(this.overlayVisible=!1),this.onBlur.emit(t)}onKeyDown(t){"Escape"===t.key&&(this.overlayVisible=!1)}onKeyUp(t){this.feedback&&(this.updateUI(t.target.value),this.overlayVisible||(this.overlayVisible=!0))}updateUI(t){let i=null,s=null;switch(this.testStrength(t)){case 1:i=this.weakText(),s={strength:"weak",width:"33.33%"};break;case 2:i=this.mediumText(),s={strength:"medium",width:"66.66%"};break;case 3:i=this.strongText(),s={strength:"strong",width:"100%"};break;default:i=this.promptText(),s=null}this.meter=s,this.infoText=i}onMaskToggle(){this.unmasked=!this.unmasked}onOverlayClick(t){this.overlayService.add({originalEvent:t,target:this.el.nativeElement})}testStrength(t){let i=0;return this.strongCheckRegExp.test(t)?i=3:this.mediumCheckRegExp.test(t)?i=2:t.length&&(i=1),i}writeValue(t){this.value=void 0===t?null:t,this.feedback&&this.updateUI(this.value||""),this.cd.markForCheck()}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){this.disabled=t}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new a.V(this.input.nativeElement,()=>{this.overlayVisible&&(this.overlayVisible=!1)})),this.scrollHandler.bindScrollListener()}bindResizeListener(){this.resizeListener||(this.resizeListener=()=>{this.overlayVisible&&!a.p.isTouchDevice()&&(this.overlayVisible=!1)},window.addEventListener("resize",this.resizeListener))}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}unbindResizeListener(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)}unbindOutsideClickListener(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)}containerClass(t){return{"p-password p-component p-inputwrapper":!0,"p-input-icon-right":t}}inputFieldClass(t){return{"p-password-input":!0,"p-disabled":t}}toggleIconClass(t){return t?"pi pi-eye-slash":"pi pi-eye"}strengthClass(t){return`p-password-strength ${t?t.strength:""}`}filled(){return null!=this.value&&this.value.toString().length>0}promptText(){return this.promptLabel||this.getTranslation(p.ws.PASSWORD_PROMPT)}weakText(){return this.weakLabel||this.getTranslation(p.ws.WEAK)}mediumText(){return this.mediumLabel||this.getTranslation(p.ws.MEDIUM)}strongText(){return this.strongLabel||this.getTranslation(p.ws.STRONG)}restoreAppend(){this.overlay&&this.appendTo&&("body"===this.appendTo?document.body.removeChild(this.overlay):document.getElementById(this.appendTo).removeChild(this.overlay))}inputType(t){return t?"text":"password"}getTranslation(t){return this.config.getTranslation(t)}clear(){this.value=null,this.onModelChange(this.value),this.writeValue(this.value),this.onClear.emit()}ngOnDestroy(){this.overlay&&(f.P9.clear(this.overlay),this.overlay=null),this.restoreAppend(),this.unbindResizeListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.translationSubscription&&this.translationSubscription.unsubscribe()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(e.sBO),e.Y36(p.b4),e.Y36(e.SBq),e.Y36(p.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["p-password"]],contentQueries:function(t,i,s){if(1&t&&e.Suo(s,p.jx,4),2&t){let o;e.iGM(o=e.CRH())&&(i.templates=o)}},viewQuery:function(t,i){if(1&t&&e.Gf(y,5),2&t){let s;e.iGM(s=e.CRH())&&(i.input=s.first)}},hostAttrs:[1,"p-element","p-inputwrapper"],hostVars:8,hostBindings:function(t,i){2&t&&e.ekj("p-inputwrapper-filled",i.filled())("p-inputwrapper-focus",i.focused)("p-password-clearable",i.showClear)("p-password-mask",i.toggleMask)},inputs:{ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",label:"label",disabled:"disabled",promptLabel:"promptLabel",mediumRegex:"mediumRegex",strongRegex:"strongRegex",weakLabel:"weakLabel",mediumLabel:"mediumLabel",strongLabel:"strongLabel",inputId:"inputId",feedback:"feedback",appendTo:"appendTo",toggleMask:"toggleMask",inputStyleClass:"inputStyleClass",panelStyle:"panelStyle",panelStyleClass:"panelStyleClass",styleClass:"styleClass",style:"style",inputStyle:"inputStyle",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",placeholder:"placeholder",showClear:"showClear"},outputs:{onFocus:"onFocus",onBlur:"onBlur",onClear:"onClear"},features:[e._Bn([z])],decls:9,vars:27,consts:[[3,"ngClass","ngStyle"],["pInputText","",3,"ngClass","ngStyle","value","input","focus","blur","keyup","keydown"],["input",""],["class","p-password-clear-icon pi pi-times",3,"click",4,"ngIf"],[3,"ngClass","click",4,"ngIf"],[1,"p-password-clear-icon","pi","pi-times",3,"click"],[3,"ngClass","click"],["overlay",""],[4,"ngTemplateOutlet"],[4,"ngIf","ngIfElse"],["content",""],[1,"p-password-meter"],["className","p-password-info"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.ALo(1,"mapper"),e.TgZ(2,"input",1,2),e.NdJ("input",function(o){return i.onInput(o)})("focus",function(o){return i.onInputFocus(o)})("blur",function(o){return i.onInputBlur(o)})("keyup",function(o){return i.onKeyUp(o)})("keydown",function(o){return i.onKeyDown(o)}),e.ALo(4,"mapper"),e.ALo(5,"mapper"),e.qZA(),e.YNc(6,_,1,0,"i",3),e.YNc(7,T,2,4,"i",4),e.YNc(8,S,7,11,"div",4),e.qZA()),2&t&&(e.Tol(i.styleClass),e.Q6J("ngClass",e.xi3(1,18,i.toggleMask,i.containerClass))("ngStyle",i.style),e.xp6(2),e.Tol(i.inputStyleClass),e.Q6J("ngClass",e.xi3(4,21,i.disabled,i.inputFieldClass))("ngStyle",i.inputStyle)("value",i.value),e.uIk("label",i.label)("aria-label",i.ariaLabel)("aria-labelledBy",i.ariaLabelledBy)("id",i.inputId)("type",e.xi3(5,24,i.unmasked,i.inputType))("placeholder",i.placeholder),e.xp6(4),e.Q6J("ngIf",i.showClear&&null!=i.value),e.xp6(1),e.Q6J("ngIf",i.toggleMask),e.xp6(1),e.Q6J("ngIf",i.overlayVisible))},dependencies:[d.mk,d.O5,d.tP,d.PC,m.o,Z],styles:[".p-password{position:relative;display:inline-flex}.p-password-panel{position:absolute;top:0;left:0}.p-password .p-password-panel{min-width:100%}.p-password-meter{height:10px}.p-password-strength{height:100%;width:0%;transition:width 1s ease-in-out}.p-fluid .p-password{display:flex}.p-password-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-password-clearable{position:relative}\n"],encapsulation:2,data:{animation:[(0,u.X$)("overlayAnimation",[(0,u.eR)(":enter",[(0,u.oB)({opacity:0,transform:"scaleY(0.8)"}),(0,u.jt)("{{showTransitionParams}}")]),(0,u.eR)(":leave",[(0,u.jt)("{{hideTransitionParams}}",(0,u.oB)({opacity:0}))])])]},changeDetection:0}),n})(),E=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[d.ez,m.j,p.m8]}),n})();var w=r(845);function D(n,l){1&n&&(e.TgZ(0,"span"),e._uU(1,"log in with your credentials"),e.qZA())}function B(n,l){if(1&n&&(e.TgZ(0,"span",15),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Oqu(t.error)}}let H=(()=>{class n{constructor(t,i,s){this.router=t,this.route=i,this.biz=s,this.returnUrl=null,this.error=null,this.email="user@pyramid.com",this.password="secret",this.returnUrl=this.route.snapshot.queryParams.returnUrl||"dash"}login(){this.biz.login(this.email,this.password).subscribe({next:()=>this.router.navigate([this.returnUrl]),error:t=>this.error=t.error})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.F0),e.Y36(g.gz),e.Y36(b.Kc))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-login"]],decls:20,vars:5,consts:[[1,"bg-pattern"],[1,"h-screen","flex","align-items-center","justify-content-center"],[1,"surface-card","p-4","shadow-4","border-round","w-full","md:w-6","lg:w-4"],[1,"text-center","mb-6"],["src","assets/layout/images/pyramid-light.png","alt","Image","height","50",1,"mb-3"],[1,"text-3xl","mb-3"],[4,"ngIf"],["class","text-red-500",4,"ngIf"],["for","email",1,"mb-2"],["id","email","pInputText","",1,"w-full","mb-3",3,"ngModel","ngModelChange"],["for","pwd",1,"mb-2"],["id","pwd","type","password","pPassword","",1,"w-full","mb-3",3,"ngModel","feedback","ngModelChange"],[1,"flex","justify-content-between","align-items-center","mt-4"],[1,"no-underline","ml-2","text-blue-600","cursor-pointer"],["pButton","","pRipple","","label","LOGIN","icon","pi pi-user",3,"click"],[1,"text-red-500"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),e._UZ(4,"img",4),e.TgZ(5,"div",5),e._uU(6,"Welcome Back"),e.qZA(),e.YNc(7,D,2,0,"span",6),e.YNc(8,B,2,1,"span",7),e.qZA(),e.TgZ(9,"div")(10,"label",8),e._uU(11,"Email"),e.qZA(),e.TgZ(12,"input",9),e.NdJ("ngModelChange",function(o){return i.email=o}),e.qZA(),e.TgZ(13,"label",10),e._uU(14,"Password"),e.qZA(),e.TgZ(15,"input",11),e.NdJ("ngModelChange",function(o){return i.password=o}),e.qZA(),e.TgZ(16,"div",12)(17,"a",13),e._uU(18,"Need help?"),e.qZA(),e.TgZ(19,"button",14),e.NdJ("click",function(){return i.login()}),e.qZA()()()()()()),2&t&&(e.xp6(7),e.Q6J("ngIf",!i.error),e.xp6(1),e.Q6J("ngIf",i.error),e.xp6(4),e.Q6J("ngModel",i.email),e.xp6(3),e.Q6J("ngModel",i.password)("feedback",!1))},dependencies:[d.O5,h.Fj,h.JJ,h.On,m.o,O,w.Hq],styles:[".error[_ngcontent-%COMP%]{color:#8b0000}.frosted[_ngcontent-%COMP%]{background-color:#fafafa40;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}.bg-pattern[_ngcontent-%COMP%]{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0yOCA2NkwwIDUwTDAgMTZMMjggMEw1NiAxNkw1NiA1MEwyOCA2NkwyOCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZjNmOSIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+CjxwYXRoIGQ9Ik0yOCAwTDI4IDM0TDAgNTBMMCA4NEwyOCAxMDBMNTYgODRMNTYgNTBMMjggMzQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZWNmMyIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+Cjwvc3ZnPg==)}i[_ngcontent-%COMP%]{opacity:.6;transition-duration:.12s;color:#2196f3}i[_ngcontent-%COMP%]:hover{opacity:1}"]}),n})();var N=r(1484);const J=[{path:"",component:H}];let F=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[d.ez,g.Bz.forChild(J),h.u5,h.UX,m.j,E,w.hJ,N.h]}),n})()}}]);