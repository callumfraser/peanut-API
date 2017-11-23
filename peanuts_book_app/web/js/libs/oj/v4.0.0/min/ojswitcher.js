/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","ojs/ojcomponentcore","ojs/ojcustomelement"],function(a){function g(c){var b,d=this;b={childList:!0};d.DS=null;d.zEa=new MutationObserver(function(a){a.forEach(function(a){"childList"===a.type&&(a.addedNodes&&Array.prototype.forEach.call(a.addedNodes,function(a){if(1===a.nodeType){var b=a.getAttribute("slot");d.Hda(a,b,!1);d.Rna()}}),a.removedNodes&&Array.prototype.forEach.call(a.removedNodes,function(a){1===a.nodeType&&(void 0!==a._ojSwitcher_orig_display_style&&(a.style.display=
a._ojSwitcher_orig_display_style),d.Rna())}))})});d.Rna=function(){d.DS=null};d.mKa=function(){d.DS||(d.DS=a.J.lo(c));return d.DS};d.Tl=function(){d.zEa.observe(c,b)};d.QVa=function(a){var b=d.mKa(),c;for(c in b)b[c].forEach(function(b){d.Hda(b,c,a)})};d.Hda=function(b,d,g){var k=c.value;void 0===b._ojSwitcher_orig_display_style&&Object.defineProperty(b,"_ojSwitcher_orig_display_style",{value:b.style.display});d===k?"none"===b.style.display?(b.style.display="",a.Components.Bo(b,g?{initialRender:!0}:
void 0)):g&&a.Components.Bo(b,{initialRender:!0}):"none"!==b.style.display&&(b.style.display="none",a.Components.jq(b))}}a.J.$a("oj-switcher",null,{properties:{value:{type:"string"}},extension:{Gq:function(a){var b=a._ojSwitcher,d=!1;b||(d=!0,b=new g(a),b.Tl(),Object.defineProperty(a,"_ojSwitcher",{value:b}));b.QVa(d)}}});a.J.register("oj-switcher",{metadata:a.J.getMetadata("oj-switcher")})});