"use strict";(self.webpackChunkpyramid=self.webpackChunkpyramid||[]).push([[712],{1712:(f,i,a)=>{a.r(i),a.d(i,{FourModule:()=>g});var l=a(9808),t=a(5e3);let h=(()=>{class r{constructor(){this.rows=8,this.cols=7,this.numColors=4,this.numPatterns=14,this.squares=new Array(this.numColors*this.numPatterns),this.quilt=new Array(this.numColors*this.numPatterns),this.nq=0,this.colors=["#f88","#8f8","#88f","#f8f"],this.randcol=()=>"#"+Math.floor(16777215*Math.random()).toString(16),this.range=(n,e=0)=>[...Array(n).keys()].map(o=>o+e);for(let n=0,e=0;e<this.numColors;e++)for(let o=0;o<this.numPatterns;o++)this.squares[n++]={color:this.colors[e],pattern:o};console.log("squares",this.squares)}solve(){for(;this.squares.length>0;){const n=this.squares.length;for(let e=0;e<n;e++)if(this.match(e)){this.quilt[this.nq++]=this.squares.splice(e,1);break}if(n==this.squares.length){alert("DIDN'T WORK");break}}}shuffleArray(n){for(let e=n.length-1;e>0;e--){const o=Math.floor(Math.random()*(e+1));[n[e],n[o]]=[n[o],n[e]]}}match(n){let e=!0;return this.nq>this.cols&&e&&(e=this.quilt[this.nq-this.cols].color!=this.squares[n].color&&this.quilt[this.nq-this.cols].pattern!=this.squares[n].pattern),e&&this.nq%this.cols&&e&&(e=this.quilt[this.nq-1].color!=this.squares[n].color&&this.quilt[this.nq-1].pattern!=this.squares[n].pattern),e}}return r.\u0275fac=function(n){return new(n||r)},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-four"]],decls:25,vars:0,consts:[[1,"wrapper"],[1,"main-head"],[1,"main-nav"],["href",""],[1,"content"],[1,"side"],[1,"ad"],[1,"main-footer"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0)(1,"header",1),t._uU(2,"The header"),t.qZA(),t.TgZ(3,"nav",2)(4,"ul")(5,"li")(6,"a",3),t._uU(7,"Nav 1"),t.qZA()(),t.TgZ(8,"li")(9,"a",3),t._uU(10,"Nav 2"),t.qZA()(),t.TgZ(11,"li")(12,"a",3),t._uU(13,"Nav 3"),t.qZA()()()(),t.TgZ(14,"article",4)(15,"h1"),t._uU(16,"Main article area"),t.qZA(),t.TgZ(17,"p"),t._uU(18," In this layout, we display the areas in source order for any screen less that 500 pixels wide. We go to a two column layout, and then to a three column layout by redefining the grid, and the placement of items on the grid. "),t.qZA()(),t.TgZ(19,"aside",5),t._uU(20,"Sidebar"),t.qZA(),t.TgZ(21,"div",6),t._uU(22,"Advertising"),t.qZA(),t.TgZ(23,"footer",7),t._uU(24,"The footer"),t.qZA()())},styles:['.box[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;border-radius:8px;width:50px;height:50px;font-weight:700}.d[_ngcontent-%COMP%]{padding:10px}[_nghost-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar{height:6px}[_nghost-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-track{background:transparent}[_nghost-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:var(--blue-200);border-radius:20px}.main-head[_ngcontent-%COMP%]{grid-area:header;background-color:#0ff}.content[_ngcontent-%COMP%]{grid-area:content}.main-nav[_ngcontent-%COMP%]{grid-area:nav;background-color:#ff0}.side[_ngcontent-%COMP%]{grid-area:sidebar}.ad[_ngcontent-%COMP%]{grid-area:ad}.main-footer[_ngcontent-%COMP%]{grid-area:footer;background-color:#f0f}.wrapper[_ngcontent-%COMP%]{display:grid;gap:20px;grid-template-areas:"header" "nav" "content" "sidebar" "ad" "footer"}@media (min-width: 500px){.wrapper[_ngcontent-%COMP%]{grid-template-columns:1fr 3fr;grid-template-areas:"header  header" "nav     nav" "sidebar content" "ad      footer"}nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:flex;justify-content:space-between}}@media (min-width: 700px){.wrapper[_ngcontent-%COMP%]{grid-template-columns:1fr 4fr 1fr;grid-template-areas:"header header  header" "nav    content sidebar" "nav    content ad" "footer footer  footer"}nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{flex-direction:column}}']}),r})();var c=a(6037),d=a(3120);const u=[{path:"",component:h}];let g=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[l.ez,d.m8,c.Bz.forChild(u)]}),r})()}}]);