!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var i in n)("object"==typeof exports?exports:t)[i]=n[i]}}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return t[i].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="./dist/",e(0)}(function(t){for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e))switch(typeof t[e]){case"function":break;case"object":t[e]=function(e){var n=e.slice(1),i=t[e[0]];return function(t,e,o){i.apply(this,[t,e,o].concat(n))}}(t[e]);break;default:t[e]=t[t[e]]}return t}([function(t,e,n){t.exports=n(8)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={ks:"icon",fa:"fa"};e.default={VERSION:"1.0.0",data:function(){return{}},computed:{classes:function(){var t=n[this.library];return t+" "+t+"-"+this.name+" fa-"+this.size+"\n              fa-rotate-"+this.rotate+" fa-"+this.animate},styles:function(){return"font-size: "+this.size}},props:{library:{type:String,default:"ks"},name:{type:String,required:!0},size:{type:String,default:"2x"},rotate:{type:String,default:"normal"},animate:{type:String,default:"stop"}}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(7),s=i(o);e.default={components:{"ks-icon":s.default},props:{columns:{type:Array,default:function(){return[]}},data:{type:Array,default:function(){return[]}},icons:{type:Object,default:function(){return{desc:"xiangxiajiantou",asc:"xiangshangjiantou"}}}},data:function(){return this._ksparent=this.$parent,this._options={templates:{},columnkeys:[]},{tempData:this.data,tempColumns:this.columns,allchecked:!1}},computed:{columns:{get:function(){return this.tempColumns},set:function(t){var e=this;this._options.columnkeys=this.columns.map(function(t){return t.template&&(e._options.templates[t.key]=t.template),t.key})}},data:{get:function(){return this.tempData},set:function(t){var e=this;this.tempData=this.filterData(t,this._options.columnkeys),this.allchecked=this.isAllChecked(this.tempData),this.$nextTick(function(){e.$parent.$compile(e.$els.tbody)})}}},watch:{},filters:{getIcon:function(t){var e=this.icons.desc;return"asc"==t&&(e=this.icons.asc),e},render:function(t,e,n,i){var o=(this._options.templates||{})[e];return"function"==typeof o?o.call(this._ksparent,n,i):t}},methods:{sort:function(t){var e=this.columns[t],n="asc"==e.sortable?"desc":"asc";this.columns[t].sortable=n,this.$emit("change-sort",e.key,n)},customSchema:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return t.filter(function(t){return!~e.indexOf(t)})},filterData:function(t,e){return t.map(function(t,n){var i={};return e.forEach(function(e){switch(e){case"table-idx":i[e]=n+1;break;case"operator":i[e]="";break;default:t.hasOwnProperty(e)&&(i[e]=t[e])}}),i})},change:function(t){var e;if("ks-table-allchecked"==t.target.name){var n=!1;this.allchecked?n=!0:e=-1,this.tempData=this.tempData.map(function(t){return t.checked=n,t})}else this.allchecked=this.isAllChecked(this.tempData),e=t.target.id.split("_")[2];this.$emit("change-checked",this.data,e)},isAllChecked:function(t){var e=t.filter(function(t){if(!t.checked)return!0});return!e.length}},created:function(){var t=this;this.columns=this.columns,this.data=this.data,this.$nextTick(function(){t.$parent.$compile(t.$els.tbody)})}}},function(t,e){},3,function(t,e){t.exports=" <i :class=classes :style=styles></i> "},function(t,e){t.exports=' <div class=KsTable-striped> <table v-on:change=change> <thead v-el:thead> <tr> <th v-for="item in columns"> <ks-icon v-bind:name="item.sortable | getIcon" v-if=item.sortable size=1x v-on:click=sort($index)></ks-icon> <input type=checkbox name=ks-table-allchecked v-model=allchecked v-if=item.checked /> <div v-text=item.title style="display: inline-block" v-bind:style="{\'width\':item.width}"></div> </th> </tr> </thead> <tbody v-el:tbody> <tr v-for="(index, item) in data"> <td v-for="(key, val) in item"> <input type=checkbox id=KsTable_{{_uid}}_{{index}} v-if="key==\'checked\'" v-model=item.checked /> <div v-if="key!=\'checked\'" v-html="val | render key item index"> </div> </td> </tr> </tbody> </table> </div> '},function(t,e,n){var i,o;n(3),i=n(1),o=n(5),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports.default),o&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)},function(t,e,n){var i,o;n(4),i=n(2),o=n(6),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports.default),o&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)}]))});