!function(t,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var e=n();for(var r in e)("object"==typeof exports?exports:t)[r]=e[r]}}(this,function(){return function(t){function n(r){if(e[r])return e[r].exports;var o=e[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var e={};return n.m=t,n.c=e,n.p="./dist/",n(0)}([function(t,n,e){t.exports=e(39)},function(t,n){var e=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=e)},function(t,n,e){t.exports=!e(3)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},function(t,n,e){var r=e(23),o=e(6);t.exports=function(t){return r(o(t))}},function(t,n,e){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(n,"__esModule",{value:!0});var o=e(10),i=r(o);n.default={VERSION:"1.0.0",data:function(){return{count:0}},props:{statusMapper:{type:Object,required:!0},status:{type:String,required:!0,towWay:!0},width:{type:Number,required:!0},height:{type:Number,required:!0}},methods:{slideClickHandle:function(t){var n=(0,i.default)(this.statusMapper);this.count=this.count<n.length-1?this.count+1:0,this.status=n[this.count]}},computed:{selectedSlide:function(){var t=this.statusMapper[this.status];return"box-shadow: "+t.slideColor+" 0 0 0 16.667px inset;\n              border: 1px solid "+t.slideColor+";"},selectedDot:function(){return"transform: translate("+(this.width-this.height)+"px, 0);"},classes:function(){return"KSAbstractSwitch KSAbstractSwitch__UID--"+this._uid},textStyles:function(){var t=this.statusMapper[this.status];return"font-size: "+t.fontSize+"px;color: "+t.fontColor},slideStyles:function(){var t=this.statusMapper[this.status];return"height: "+this.height+"px;width: "+this.width+"px;line-height: "+this.height+"px;\n              border-radius: "+this.height+"px;background: "+t.slideColor},dotStyles:function(){var t=this.statusMapper[this.status];return"height: "+this.height+"px;width: "+this.height+"px;background: "+t.dotColor}}}},function(t,n,e){t.exports={default:e(11),__esModule:!0}},function(t,n,e){e(36),t.exports=e(1).Object.keys},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n,e){var r=e(5);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,n,e){var r=e(8),o=e(32),i=e(31);t.exports=function(t){return function(n,e,u){var c,s=r(n),a=o(s.length),f=i(u,a);if(t&&e!=e){for(;a>f;)if(c=s[f++],c!=c)return!0}else for(;a>f;f++)if((t||f in s)&&s[f]===e)return t||f||0;return!t&&-1}}},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n,e){var r=e(12);t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,o){return t.call(n,e,r,o)}}return function(){return t.apply(n,arguments)}}},function(t,n,e){var r=e(5),o=e(4).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n,e){var r=e(4),o=e(1),i=e(16),u=e(21),c="prototype",s=function(t,n,e){var a,f,p,l=t&s.F,d=t&s.G,h=t&s.S,x=t&s.P,v=t&s.B,_=t&s.W,S=d?o:o[n]||(o[n]={}),y=S[c],b=d?r:h?r[n]:(r[n]||{})[c];d&&(e=n);for(a in e)f=!l&&b&&void 0!==b[a],f&&a in S||(p=f?b[a]:e[a],S[a]=d&&"function"!=typeof b[a]?e[a]:v&&f?i(p,r):_&&b[a]==p?function(t){var n=function(n,e,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,e)}return new t(n,e,r)}return t.apply(this,arguments)};return n[c]=t[c],n}(p):x&&"function"==typeof p?i(Function.call,p):p,x&&((S.virtual||(S.virtual={}))[a]=p,t&s.R&&y&&!y[a]&&u(y,a,p)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n,e){var r=e(24),o=e(28);t.exports=e(2)?function(t,n,e){return r.f(t,n,o(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n,e){t.exports=!e(2)&&!e(3)(function(){return 7!=Object.defineProperty(e(17)("div"),"a",{get:function(){return 7}}).a})},function(t,n,e){var r=e(15);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,n,e){var r=e(13),o=e(22),i=e(34),u=Object.defineProperty;n.f=e(2)?Object.defineProperty:function(t,n,e){if(r(t),n=i(n,!0),r(e),o)try{return u(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},function(t,n,e){var r=e(20),o=e(8),i=e(14)(!1),u=e(29)("IE_PROTO");t.exports=function(t,n){var e,c=o(t),s=0,a=[];for(e in c)e!=u&&r(c,e)&&a.push(e);for(;n.length>s;)r(c,e=n[s++])&&(~i(a,e)||a.push(e));return a}},function(t,n,e){var r=e(25),o=e(18);t.exports=Object.keys||function(t){return r(t,o)}},function(t,n,e){var r=e(19),o=e(1),i=e(3);t.exports=function(t,n){var e=(o.Object||{})[t]||Object[t],u={};u[t]=n(e),r(r.S+r.F*i(function(){e(1)}),"Object",u)}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,e){var r=e(30)("keys"),o=e(35);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,n,e){var r=e(4),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,n,e){var r=e(7),o=Math.max,i=Math.min;t.exports=function(t,n){return t=r(t),t<0?o(t+n,0):i(t,n)}},function(t,n,e){var r=e(7),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,n,e){var r=e(6);t.exports=function(t){return Object(r(t))}},function(t,n,e){var r=e(5);t.exports=function(t,n){if(!r(t))return t;var e,o;if(n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!r(o=e.call(t)))return o;if(!n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},function(t,n,e){var r=e(33),o=e(26);e(27)("keys",function(){return function(t){return o(r(t))}})},function(t,n){},function(t,n){t.exports=" <div :class=classes> <style> {{ '.KSAbstractSwitch__UID--' + _uid }} .KSAbstractSwitch__slide {\n      {{ slideStyles }}\n    }\n    {{ '.KSAbstractSwitch__UID--' + _uid }} .KSAbstractSwitch__dot {\n      {{ dotStyles }}\n    }\n    {{ '.KSAbstractSwitch__UID--' + _uid }} .KSAbstractSwitch__slide--selected {\n      {{ selectedSlide }}\n    }\n    {{ '.KSAbstractSwitch__UID--' + _uid }} .KSAbstractSwitch__text {\n      {{ textStyles }}\n    }\n    {{ '.KSAbstractSwitch__UID--' + _uid }} .KSAbstractSwitch__dot--selected {\n      {{ selectedDot }}\n    } </style> <div class=KSAbstractSwitch__slide @click=slideClickHandle :class=\"{'KSAbstractSwitch__slide--selected': count % 2}\"> <span class=KSAbstractSwitch__text :class=\"{'KSAbstractSwitch__text--selected': count % 2}\"> <slot></slot> {{statusMapper[status].text}} </span> <div class=KSAbstractSwitch__dot :class=\"{'KSAbstractSwitch__dot--selected': count % 2}\"></div> </div> </div> "},function(t,n,e){var r,o;e(37),r=e(9),o=e(38),t.exports=r||{},t.exports.__esModule&&(t.exports=t.exports.default),o&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)}])});