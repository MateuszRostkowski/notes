(this["webpackJsonpnotes-app"]=this["webpackJsonpnotes-app"]||[]).push([[0],{202:function(e,t){},415:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(8),r=a.n(o),l=(a(78),a(79),a(12)),i=a(1),s=a(2),m=a(67),u=a(68),d=a.n(u),b=a(69),f=a.n(b),E=function(e){var t=e.value,a=e.language;return c.a.createElement(f.a,{language:a},t)},v={mode:"markdown",autofocus:!0},p=function(e){var t=e.noteId,a=localStorage.getItem("typing_mode"),o="preview"===a?"preview":"edit"===a?"edit":"both",r=Object(n.useState)(o),l=Object(s.a)(r,2),i=l[0],u=l[1],b=Object(n.useState)(""),f=Object(s.a)(b,2),p=f[0],g=f[1],h=Object(n.useState)(""),O=Object(s.a)(h,2),j=O[0],N=O[1];return Object(n.useEffect)((function(){localStorage.setItem("typing_mode",i)}),[i]),Object(n.useEffect)((function(){var e=localStorage.getItem(t);e&&(N(JSON.parse(e).name),g(JSON.parse(e).value))}),[t]),Object(n.useEffect)((function(){t&&p&&localStorage.setItem(t,JSON.stringify({name:j,value:p}))}),[p,t,j]),c.a.createElement("div",{className:"note"},c.a.createElement("div",{className:"note-wrapper".concat("both"===i?" note-wrapper--both":"")},c.a.createElement("div",{className:"mode-buttons-container"},c.a.createElement("button",{className:"mode-button".concat("edit"===i?" mode-button-active":""),onClick:function(){return u("edit")}},"Edit"),c.a.createElement("button",{className:"mode-button".concat("preview"===i?" mode-button-active":""),onClick:function(){return u("preview")}},"Preview"),c.a.createElement("button",{className:"mode-button".concat("both"===i?" mode-button-active":""),onClick:function(){return u("both")}},"Both")),c.a.createElement("h1",{className:"note-title"},j),c.a.createElement("div",{className:"note-container"},("edit"===i||"both"===i)&&c.a.createElement("div",{className:"code-mirror-container"},c.a.createElement(m.Controlled,{value:p,options:v,onBeforeChange:function(e,t,a){g(a)}})),("preview"===i||"both"===i)&&c.a.createElement("div",{className:"react-markdown-container markdown-body"},c.a.createElement(d.a,{renderers:{code:E},source:p,escapeHtml:!1})))))},g=function(){var e=localStorage.getItem("note_lists")||"[]";return JSON.parse(e)},h=a(71),O=document.getElementById("modal-root"),j=function(e){var t=e.children;return Object(n.useEffect)((function(){return O.classList.add("shown"),function(){O.classList.remove("shown")}}),[]),r.a.createPortal(t,O)},N=function(e){var t=e.toggleMode,a=Object(i.f)().push,o=Object(n.useState)(""),r=Object(s.a)(o,2),l=r[0],m=r[1];return c.a.createElement(j,null,c.a.createElement("div",{className:"add-note-wrappper"},c.a.createElement("div",{className:"add-note-container"},c.a.createElement("a",{href:"/",onClick:function(e){e.preventDefault(),t()}},"Close"),c.a.createElement("input",{value:l,onChange:function(e){return m(e.target.value)}}),c.a.createElement("button",{onClick:function(){if(l)if("note_lists"!==l&&"typing_mode"!==l){var e=g(),n=[{name:l}].concat(Object(h.a)(e));localStorage.setItem(l,JSON.stringify({name:l,value:""})),localStorage.setItem("note_lists",JSON.stringify(n)),a("/".concat(l)),t()}else alert("this name is not allowed");else t()}},"Add new note")),c.a.createElement("div",{onClick:t,className:"add-note-background"})))},w=a(417);var S=function(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),a=t[0],o=t[1],r=Object(n.useState)([]),m=Object(s.a)(r,2),u=m[0],d=m[1],b=Object(n.useState)(!1),f=Object(s.a)(b,2),E=f[0],v=f[1],p=Object(i.g)().noteId;Object(n.useEffect)((function(){var e=g();d(e)}),[a]);var h=function(){return o(!a)};return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"sidebar-toggle",onClick:function(){return v(!E)}},c.a.createElement("span",{className:"burger-line burger-line-1"}),c.a.createElement("span",{className:"burger-line burger-line-1"}),c.a.createElement("span",{className:"burger-line burger-line-1"})),c.a.createElement(w.a,{in:E,timeout:200,classNames:"sidebar-wrapper"},c.a.createElement("div",{className:"sidebar-wrapper"},c.a.createElement("div",{className:"sidebar-container"},c.a.createElement("h1",null,"Notes app"),c.a.createElement("a",{href:"/",onClick:function(e){e.preventDefault(),h()}},"Add note"),c.a.createElement("div",{className:"links-container"},u.map((function(e,t){return c.a.createElement(l.b,{key:t,to:"/".concat(e.name),className:p===e.name?"active-item":""},e.name)})))))),a&&c.a.createElement(N,{toggleMode:h}))},k=function(){return c.a.createElement("div",{className:"error-container"},c.a.createElement("h1",null,"Nie znale\u017aono notatki"))},y=function(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),a=t[0],o=t[1];return Object(n.useEffect)((function(){setTimeout((function(){o(!0)}),1e3)}),[]),c.a.createElement("div",{className:"empty-container"},c.a.createElement("h1",null,"Nie masz jeszcze \u017cadnej notatki"),c.a.createElement("p",{className:"add-new-info".concat(a?" add-new-info--shown":"")},"\u2190 Wci\u015bnij tutaj aby doda\u0107 now\u0105 notatk\u0119"))};var I=function(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),a=t[0],o=t[1],r=Object(n.useState)(!1),l=Object(s.a)(r,2),m=l[0],u=l[1],d=Object(i.g)().noteId,b=Object(i.f)().push;return Object(n.useEffect)((function(){document.title=d||"notes";var e=g();e&&0!==e.length?(u(!1),!d&&e.length>0&&b("/".concat(e[0].name)),e.some((function(e){return e.name===d}))?o(!1):o(!0)):u(!0)}),[d,b]),c.a.createElement("div",{className:"home-container"},c.a.createElement(S,null),!a&&!m&&c.a.createElement(p,{key:d,noteId:d}),!a&&m&&c.a.createElement(y,null),a&&!m&&c.a.createElement(k,null))};function C(){return c.a.createElement(l.a,{basename:"/"},c.a.createElement("div",null,c.a.createElement(i.c,null,c.a.createElement(i.a,{path:"/:noteId",children:c.a.createElement(I,null)}),c.a.createElement(i.a,{path:"/"},c.a.createElement(I,null)))))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(409),a(410),a(411),a(66),a(412),a(414);r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},73:function(e,t,a){e.exports=a(415)},78:function(e,t,a){},79:function(e,t,a){}},[[73,1,2]]]);
//# sourceMappingURL=main.47bc6b5b.chunk.js.map