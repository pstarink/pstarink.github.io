"use strict";(self.webpackChunkpyramid=self.webpackChunkpyramid||[]).push([[789],{8789:($,u,n)=>{n.r(u),n.d(u,{UsersModule:()=>I});var h=n(9808),v=n(6037),a=n(9600),y=n(7577),C=n(9028),U=n(4499),d=n(5861),T=n(655),c=n(4987),M=n(1169);let x=(()=>{class s extends M.e{constructor(o){super(),this.token="",Object.assign(this,o)}}return s.tableName="Users",s})();var p=n(9783),f=n(7489),Z=n(3120),e=n(5e3),A=n(1528),J=n(2e3),m=n(2382),E=n(845),N=n(5315),R=n(7773),Y=n(1435),B=n(9165),D=n(7329),b=n(2501),Q=n(5949),j=n(9711);function z(s,t){if(1&s){const o=e.EpF();e.TgZ(0,"dialog-header",7),e.NdJ("onClose",function(){e.CHM(o);const l=e.oxw();return e.KtG(l.displayModal=!1)}),e.qZA()}if(2&s){const o=e.oxw();e.Q6J("title",1===o.task?"Edit User":"New User")}}function F(s,t){if(1&s){const o=e.EpF();e.TgZ(0,"div",8)(1,"div",9)(2,"form-text",10,11),e.NdJ("ngModelChange",function(l){e.CHM(o);const g=e.oxw();return e.KtG(g.model.name=l)}),e.qZA(),e._UZ(4,"val-errors",12),e.qZA(),e.TgZ(5,"div",9)(6,"form-select",13,14),e.NdJ("ngModelChange",function(l){e.CHM(o);const g=e.oxw();return e.KtG(g.model.roleType=l)}),e.qZA(),e._UZ(8,"val-errors",15),e.qZA()()}if(2&s){const o=e.MAs(3),r=e.MAs(7),l=e.oxw();e.xp6(2),e.Q6J("ngModel",l.model.name),e.xp6(2),e.Q6J("control",o.control),e.xp6(2),e.Q6J("ngModel",l.model.roleType),e.xp6(2),e.Q6J("control",r.control)}}function G(s,t){if(1&s){const o=e.EpF();e.TgZ(0,"dialog-footer",16),e.NdJ("onReject",function(){e.CHM(o);const l=e.oxw();return e.KtG(l.displayModal=!1)})("onAccept",function(){e.CHM(o);const l=e.oxw();return e.KtG(l.submit())}),e.qZA()}}const O=function(){return{width:"50vw","max-width":"550px"}};let i=class{constructor(t,o,r,l){this.pyramid=t,this.store=o,this.msg=r,this.ns=l,this.cols=[],this.rows=[],this.displayModal=!1,this.EDIT=1,this.CREATE=2,this.task=this.EDIT}ngOnInit(){var t=this;return(0,d.Z)(function*(){t.store.profile$.pipe((0,c.t)(t)).subscribe(o=>t.profile=o),t.store.picklists$.pipe((0,c.t)(t)).subscribe(o=>t.picklists=o),t.store.users$.pipe((0,c.t)(t)).subscribe(o=>t.rows=f.sortBy(o,"name")),t.cols=[{type:"icon",field:"icon_edit",icon:"edit",wd:30,click:(o,r)=>t.onEdit(r)},{field:"name",header:"Name"},{field:"roleType",header:"Role",render:o=>t.picklists.name[o.roleType]},{type:"icon",field:"icon_delete",icon:"delete",wd:30,click:(o,r)=>t.onDelete(r)}]})()}refresh(){var t=this;return(0,d.Z)(function*(){const o=yield t.pyramid.list("Users");t.rows=f.sortBy(o,"name")})()}onEdit(t){var o=this;return(0,d.Z)(function*(){(0,Z.AV)(t),o.model=Object.assign({},t),o.task=o.EDIT,o.displayModal=!0})()}onDelete(t){var o=this;return(0,d.Z)(function*(){(yield o.ns.confirm("Delete User",`Are you sure you want to delete user ${t.name}?`))&&(yield o.pyramid.delete(`users/${t.id}`),o.msg.add({severity:"info",detail:"User deleted"}),o.refresh())})()}addUser(){var t=this;return(0,d.Z)(function*(){t.model=new x,t.task=t.CREATE,t.displayModal=!0})()}submit(){var t=this;return(0,d.Z)(function*(){t.displayModal=!1,t.model.updatedBy=t.profile.id,t.model.updatedOn=(new Date).toISOString(),t.task==t.EDIT?(yield t.pyramid.put("users",t.model),t.msg.add({severity:"info",detail:"User updated"})):(yield t.pyramid.post("users",t.model),t.msg.add({severity:"info",detail:"User created"})),t.refresh()})()}};i.\u0275fac=function(t){return new(t||i)(e.Y36(A.tG),e.Y36(J.d),e.Y36(p.ez),e.Y36(a.c))},i.\u0275cmp=e.Xpm({type:i,selectors:[["users"]],features:[e._Bn([p.ez])],decls:9,vars:9,consts:[[3,"visible","modal","draggable","resizable","visibleChange"],["pTemplate","header"],["pTemplate","content"],["pTemplate","footer"],[1,"mb-2"],["pButton","","pRipple","","type","button","icon","pi pi-plus-circle","label","Add User","tooltipPosition","right",3,"click"],["fxFlex","",3,"cols","value"],["icon","user",3,"title","onClose"],[1,"formgrid","grid","p-2"],[1,"field","col-12","md:col-6"],["label","Name","required","","minlength","4",3,"ngModel","ngModelChange"],["ctrl","ngModel"],["label","The user name",3,"control"],["label","Role","picklist","Role","required","",3,"ngModel","ngModelChange"],["role","ngModel"],["label","The user role",3,"control"],[3,"onReject","onAccept"]],template:function(t,o){1&t&&(e._UZ(0,"p-toast"),e.TgZ(1,"p-dialog",0),e.NdJ("visibleChange",function(l){return o.displayModal=l}),e.YNc(2,z,1,1,"ng-template",1),e.YNc(3,F,9,4,"ng-template",2),e.YNc(4,G,1,0,"ng-template",3),e.qZA(),e.TgZ(5,"div",4)(6,"button",5),e.NdJ("click",function(){return o.addUser()}),e.qZA()(),e.TgZ(7,"div"),e._UZ(8,"tbl",6),e.qZA()),2&t&&(e.xp6(1),e.Akn(e.DdM(8,O)),e.Q6J("visible",o.displayModal)("modal",!0)("draggable",!0)("resizable",!1),e.xp6(7),e.Q6J("cols",o.cols)("value",o.rows))},dependencies:[m.JJ,m.Q7,m.wO,m.On,p.jx,E.Hq,N.V,R.FN,Y.tM,B.o,D.Y,b.g,Q.A,j.$],encapsulation:2}),i=(0,T.gn)([(0,c.c)()],i);const H=[{path:"",component:i,canActivate:[C.a1]}];let I=(()=>{class s{}return s.\u0275fac=function(o){return new(o||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[h.ez,U.m,v.Bz.forChild(H),a.cB,a.yn,a.S8,a.zY,a.NY,y.R]}),s})()}}]);