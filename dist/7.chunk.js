webpackJsonp([7],Array(61).concat([
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(9);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(69)
	__vue_script__ = __webpack_require__(71)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] dev\\js\\views\\components\\datepicker.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(72)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Edgar\\Documents\\fin-front-end\\dev\\js\\views\\components\\datepicker.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(70);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(59)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-471eaf71&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./datepicker.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-471eaf71&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./datepicker.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(58)();
	// imports


	// module
	exports.push([module.id, "\r\n.datetime-picker[_v-471eaf71] {\r\n    position: relative;\r\n    display: inline-block;\r\n    font-family: \"Segoe UI\",\"Lucida Grande\",Helvetica,Arial,\"Microsoft YaHei\";\r\n    -webkit-font-smoothing: antialiased;\r\n    color: #333;\r\n}\r\n\r\n.datetime-picker *[_v-471eaf71] {\r\n    box-sizing: border-box;\r\n}\r\n\r\n.datetime-picker input[_v-471eaf71] {\r\n    width: 100%;\r\n    padding: 6px 12px;\r\n    height: 34px;\r\n    outline: 0 none;\r\n    border: 1px solid #ccc;\r\n    font-size: 14px;\r\n}\r\n\r\n.datetime-picker .picker-wrap[_v-471eaf71] {\r\n    position: absolute;\r\n    z-index: 1000;\r\n    width: 238px;\r\n    height: 280px;\r\n    margin-top: 2px;\r\n    background-color: #fff;\r\n    box-shadow: 0 0 6px #ccc;\r\n}\r\n\r\n.datetime-picker table[_v-471eaf71] {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    border-spacing: 0;\r\n    text-align: center;\r\n    font-size: 13px;\r\n}\r\n\r\n.datetime-picker tr[_v-471eaf71] {\r\n    height: 34px;\r\n    border: 0 none;\r\n}\r\n\r\n.datetime-picker th[_v-471eaf71], .datetime-picker td[_v-471eaf71] {\r\n    -webkit-user-select: none;\r\n       -moz-user-select: none;\r\n        -ms-user-select: none;\r\n            user-select: none;\r\n    width: 34px;\r\n    height: 34px;\r\n    padding: 0;\r\n    border: 0 none;\r\n    line-height: 34px;\r\n    text-align: center;\r\n}\r\n\r\n.datetime-picker td[_v-471eaf71] {\r\n    cursor: pointer;\r\n}\r\n\r\n.datetime-picker td[_v-471eaf71]:hover {\r\n    background-color: #f0f0f0;\r\n}\r\n\r\n.datetime-picker td.date-pass[_v-471eaf71], .datetime-picker td.date-future[_v-471eaf71] {\r\n    color: #aaa;\r\n}\r\n\r\n.datetime-picker td.date-active[_v-471eaf71] {\r\n    background-color: #ececec;\r\n    color: #3bb4f2;\r\n}\r\n\r\n.datetime-picker .date-head[_v-471eaf71] {\r\n    background-color: #3bb4f2;\r\n    text-align: center;\r\n    color: #fff;\r\n    font-size: 14px;\r\n}\r\n\r\n.datetime-picker .date-days[_v-471eaf71] {\r\n    color: #3bb4f2;\r\n    font-size: 14px;\r\n}\r\n\r\n.datetime-picker .show-year[_v-471eaf71] {\r\n    display: inline-block;\r\n    min-width: 62px;\r\n    vertical-align: middle;\r\n}\r\n\r\n.datetime-picker .show-month[_v-471eaf71] {\r\n    display: inline-block;\r\n    min-width: 28px;\r\n    vertical-align: middle;\r\n}\r\n\r\n.datetime-picker .btn-prev[_v-471eaf71],\r\n.datetime-picker .btn-next[_v-471eaf71] {\r\n    cursor: pointer;\r\n    display: inline-block;\r\n    padding: 0 10px;\r\n    vertical-align: middle;\r\n}\r\n\r\n.datetime-picker .btn-prev[_v-471eaf71]:hover,\r\n.datetime-picker .btn-next[_v-471eaf71]:hover {\r\n    background: rgba(16, 160, 234, 0.5);\r\n}\r\n.close[_v-471eaf71]{\r\n    position: absolute;\r\n    top: 8px;\r\n    right:10px;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <style scoped>
	// .datetime-picker {
	//     position: relative;
	//     display: inline-block;
	//     font-family: "Segoe UI","Lucida Grande",Helvetica,Arial,"Microsoft YaHei";
	//     -webkit-font-smoothing: antialiased;
	//     color: #333;
	// }
	//
	// .datetime-picker * {
	//     box-sizing: border-box;
	// }
	//
	// .datetime-picker input {
	//     width: 100%;
	//     padding: 6px 12px;
	//     height: 34px;
	//     outline: 0 none;
	//     border: 1px solid #ccc;
	//     font-size: 14px;
	// }
	//
	// .datetime-picker .picker-wrap {
	//     position: absolute;
	//     z-index: 1000;
	//     width: 238px;
	//     height: 280px;
	//     margin-top: 2px;
	//     background-color: #fff;
	//     box-shadow: 0 0 6px #ccc;
	// }
	//
	// .datetime-picker table {
	//     width: 100%;
	//     border-collapse: collapse;
	//     border-spacing: 0;
	//     text-align: center;
	//     font-size: 13px;
	// }
	//
	// .datetime-picker tr {
	//     height: 34px;
	//     border: 0 none;
	// }
	//
	// .datetime-picker th, .datetime-picker td {
	//     user-select: none;
	//     width: 34px;
	//     height: 34px;
	//     padding: 0;
	//     border: 0 none;
	//     line-height: 34px;
	//     text-align: center;
	// }
	//
	// .datetime-picker td {
	//     cursor: pointer;
	// }
	//
	// .datetime-picker td:hover {
	//     background-color: #f0f0f0;
	// }
	//
	// .datetime-picker td.date-pass, .datetime-picker td.date-future {
	//     color: #aaa;
	// }
	//
	// .datetime-picker td.date-active {
	//     background-color: #ececec;
	//     color: #3bb4f2;
	// }
	//
	// .datetime-picker .date-head {
	//     background-color: #3bb4f2;
	//     text-align: center;
	//     color: #fff;
	//     font-size: 14px;
	// }
	//
	// .datetime-picker .date-days {
	//     color: #3bb4f2;
	//     font-size: 14px;
	// }
	//
	// .datetime-picker .show-year {
	//     display: inline-block;
	//     min-width: 62px;
	//     vertical-align: middle;
	// }
	//
	// .datetime-picker .show-month {
	//     display: inline-block;
	//     min-width: 28px;
	//     vertical-align: middle;
	// }
	//
	// .datetime-picker .btn-prev,
	// .datetime-picker .btn-next {
	//     cursor: pointer;
	//     display: inline-block;
	//     padding: 0 10px;
	//     vertical-align: middle;
	// }
	//
	// .datetime-picker .btn-prev:hover,
	// .datetime-picker .btn-next:hover {
	//     background: rgba(16, 160, 234, 0.5);
	// }
	// .close{
	//     position: absolute;
	//     top: 8px;
	//     right:10px;
	// }
	// </style>
	//
	// <template>
	//     <div class="datetime-picker" :style="{ width: width }">
	//         <input
	//             type="text"
	//             :style="styleObj"
	//             :readonly="readonly"
	//             :value="value"
	//             @click="show = !show">
	//             <span class="fa fa-close close" v-show="value" @click="clear()"></span>
	//         <div class="picker-wrap" v-show="show">
	//             <table class="date-picker">
	//                 <thead>
	//                     <tr class="date-head">
	//                         <th colspan="4">
	//                             <span class="btn-prev" @click="yearClick(-1)">&lt;</span>
	//                             <span class="show-year">{{now.getFullYear()}}</span>
	//                             <span class="btn-next" @click="yearClick(1)">&gt;</span>
	//                         </th>
	//                         <th colspan="3">
	//                             <span class="btn-prev" @click="monthClick(-1)">&lt;</span>
	//                             <span class="show-month">{{months[now.getMonth()]}}</span>
	//                             <span class="btn-next" @click="monthClick(1)">&gt;</span>
	//                         </th>
	//                     </tr>
	//                     <tr class="date-days">
	//                         <th v-for="day in days">{{day}}</th>
	//                     </tr>
	//                 </thead>
	//                 <tbody>
	//                     <tr v-for="i in 6">
	//                         <td v-for="j in 7"
	//                             :class="date[i * 7 + j] && date[i * 7 + j].status"
	//                             :date="date[i * 7 + j] && date[i * 7 + j].date"
	//                             @click="pickDate(i * 7 + j)">{{date[i * 7 + j] && date[i * 7 + j].text}}</td>
	//                     </tr>
	//                 </tbody>
	//             </table>
	//         </div>
	//     </div>
	// </template>
	//
	// <script>
	exports.default = {
	    props: {
	        width: { type: String, default: '238px' },
	        readonly: { type: Boolean, default: false },
	        value: { type: String, default: '' },
	        valueDefault: { type: String, default: '' },
	        format: { type: String, default: 'YYYY-MM-DD' }
	    },
	    data: function data() {
	        return {
	            show: false,
	            days: ['日', '一', '二', '三', '四', '五', '六'],
	            months: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
	            date: [],
	            now: new Date()
	        };
	    },

	    watch: {
	        now: function now() {
	            this.update();
	        },
	        show: function show() {
	            this.update();
	        }
	    },
	    methods: {
	        close: function close() {
	            this.show = false;
	        },
	        clear: function clear() {
	            this.value = '';
	        },
	        update: function update() {
	            var arr = [];
	            var time = new Date(this.now);
	            time.setMonth(time.getMonth(), 1); // the first day
	            var curFirstDay = time.getDay();
	            curFirstDay === 0 && (curFirstDay = 7);
	            time.setDate(0); // the last day
	            var lastDayCount = time.getDate();
	            for (var i = curFirstDay; i > 0; i--) {
	                arr.push({
	                    text: lastDayCount - i + 1,
	                    time: new Date(time.getFullYear(), time.getMonth(), lastDayCount - i + 1),
	                    status: 'date-pass'
	                });
	            }

	            time.setMonth(time.getMonth() + 2, 0); // the last day of this month
	            var curDayCount = time.getDate();
	            time.setDate(1); // fix bug when month change
	            var value = this.value || this.stringify(new Date());
	            for (var _i = 0; _i < curDayCount; _i++) {
	                var tmpTime = new Date(time.getFullYear(), time.getMonth(), _i + 1);
	                var status = '';
	                this.stringify(tmpTime) === value && (status = 'date-active');
	                arr.push({
	                    text: _i + 1,
	                    time: tmpTime,
	                    status: status
	                });
	            }

	            var j = 1;
	            while (arr.length < 42) {
	                arr.push({
	                    text: j,
	                    time: new Date(time.getFullYear(), time.getMonth() + 1, j),
	                    status: 'date-future'
	                });
	                j++;
	            }
	            this.date = arr;
	        },
	        yearClick: function yearClick(flag) {
	            this.now.setFullYear(this.now.getFullYear() + flag);
	            this.now = new Date(this.now);
	        },
	        monthClick: function monthClick(flag) {
	            this.now.setMonth(this.now.getMonth() + flag);
	            this.now = new Date(this.now);
	        },
	        pickDate: function pickDate(index) {
	            this.show = false;
	            this.now = new Date(this.date[index].time);
	            this.value = this.stringify();
	        },
	        parse: function parse(str) {
	            var time = new Date(str);
	            return isNaN(time.getTime()) ? null : time;
	        },
	        stringify: function stringify() {
	            var time = arguments.length <= 0 || arguments[0] === undefined ? this.now : arguments[0];
	            var format = arguments.length <= 1 || arguments[1] === undefined ? this.format : arguments[1];

	            var year = time.getFullYear();
	            var month = time.getMonth() + 1;
	            var date = time.getDate();
	            var monthName = this.months[time.getMonth()];

	            var map = {
	                YYYY: year,
	                MMM: monthName,
	                MM: ('0' + month).slice(-2),
	                M: month,
	                DD: ('0' + date).slice(-2),
	                D: date
	            };
	            return format.replace(/Y+|M+|D+/g, function (str) {
	                return map[str];
	            });
	        }
	    },
	    ready: function ready() {
	        var _this = this;

	        this.now = this.parse(this.value) || this.parse(this.valueDefault) || new Date();
	        document.addEventListener('click', function (e) {
	            if (_this.$el && !_this.$el.contains(e.target)) {
	                _this.close();
	            }
	        }, false);
	    },
	    beforeDestroy: function beforeDestroy() {
	        document.removeEventListener('click', this.close, false);
	    }
	};
	// </script>

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"datetime-picker\" :style=\"{ width: width }\" _v-471eaf71=\"\">\n    <input type=\"text\" :style=\"styleObj\" :readonly=\"readonly\" :value=\"value\" @click=\"show = !show\" _v-471eaf71=\"\">\n        <span class=\"fa fa-close close\" v-show=\"value\" @click=\"clear()\" _v-471eaf71=\"\"></span>\n    <div class=\"picker-wrap\" v-show=\"show\" _v-471eaf71=\"\">\n        <table class=\"date-picker\" _v-471eaf71=\"\">\n            <thead _v-471eaf71=\"\">\n                <tr class=\"date-head\" _v-471eaf71=\"\">\n                    <th colspan=\"4\" _v-471eaf71=\"\">\n                        <span class=\"btn-prev\" @click=\"yearClick(-1)\" _v-471eaf71=\"\">&lt;</span>\n                        <span class=\"show-year\" _v-471eaf71=\"\">{{now.getFullYear()}}</span>\n                        <span class=\"btn-next\" @click=\"yearClick(1)\" _v-471eaf71=\"\">&gt;</span>\n                    </th>\n                    <th colspan=\"3\" _v-471eaf71=\"\">\n                        <span class=\"btn-prev\" @click=\"monthClick(-1)\" _v-471eaf71=\"\">&lt;</span>\n                        <span class=\"show-month\" _v-471eaf71=\"\">{{months[now.getMonth()]}}</span>\n                        <span class=\"btn-next\" @click=\"monthClick(1)\" _v-471eaf71=\"\">&gt;</span>\n                    </th>\n                </tr>\n                <tr class=\"date-days\" _v-471eaf71=\"\">\n                    <th v-for=\"day in days\" _v-471eaf71=\"\">{{day}}</th>\n                </tr>\n            </thead>\n            <tbody _v-471eaf71=\"\">\n                <tr v-for=\"i in 6\" _v-471eaf71=\"\">\n                    <td v-for=\"j in 7\" :class=\"date[i * 7 + j] &amp;&amp; date[i * 7 + j].status\" :date=\"date[i * 7 + j] &amp;&amp; date[i * 7 + j].date\" @click=\"pickDate(i * 7 + j)\" _v-471eaf71=\"\">{{date[i * 7 + j] &amp;&amp; date[i * 7 + j].text}}</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n";

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(74)
	__vue_script__ = __webpack_require__(76)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] dev\\js\\views\\components\\dialog.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(101)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Edgar\\Documents\\fin-front-end\\dev\\js\\views\\components\\dialog.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(75);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(59)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./dialog.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./dialog.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(58)();
	// imports


	// module
	exports.push([module.id, "\n\n.dialog-mask {\n    position: fixed;top:0;right:0;z-index:100;\n    width:100%;height: 100%;\n    background: #222;\n    opacity: 0.3;\n}\n\n.dialog .content {\n    /*clear*/\n    padding: 0;margin:0;min-height:auto;\n    /*clear end*/\n    z-index:1000;\n    position: absolute;\n    border-radius: 3px;\n    background: #ffffff;\n    border-top: 3px solid #00c0ef;\n    box-shadow: 0 1px 1px rgba(0,0,0,0.1);\n\n}\n.dialog .content .box-body{\n    text-align: center;\n}\n.box-header{\n    padding-top: 5px;\n}\n.btn-style{\n    padding: 2px;\n    font-size: 18px;\n    background-color: #00c0ef;\n    border-color: #00acd6;\n    border-radius: 3px;\n    box-shadow: none;\n    border: 1px solid transparent;\n    color: #fff;\n    font-weight: bold;\n}\n.dialog .content .box-header h3{\n    margin: 0;\n    padding: 8px 10px;\n    font-size: 16px;\n    letter-spacing: 1px;\n    font-weight: bold;\n}\n.close{\n    position: absolute;\n    right: 10px;\n    top: 6px;\n}\n.dialog .content .box-body{\n    font-size: 14px;\n    padding: 0 20px 10px 20px;\n\n}\n.btn-def{\n    background-color: #f4f4f4;\n    border: 1px solid #ddd;\n    border-radius: 3px;\n    padding: 3px 9px;\n}\n.mr10{\n    margin-right: 10px;\n}\n", ""]);

	// exports


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _align = __webpack_require__(77);

	var _align2 = _interopRequireDefault(_align);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    props: {
	        title: { type: String, default: '标题' },
	        show: { type: Boolean, default: false },
	        width: { type: Number },
	        cbClose: { type: Function }
	    },
	    data: function data() {
	        return {
	            align: {
	                points: ['cc', 'cc']
	            },
	            monitor: true
	        };
	    },

	    methods: {},
	    ready: function ready() {
	        // console.log(this.cbClose)
	    },

	    components: {
	        'align': _align2.default
	    }
	};
	// </script>
	// <style>
	//
	//     .dialog-mask {
	//         position: fixed;top:0;right:0;z-index:100;
	//         width:100%;height: 100%;
	//         background: #222;
	//         opacity: 0.3;
	//     }
	//
	//     .dialog .content {
	//         /*clear*/
	//         padding: 0;margin:0;min-height:auto;
	//         /*clear end*/
	//         z-index:1000;
	//         position: absolute;
	//         border-radius: 3px;
	//         background: #ffffff;
	//         border-top: 3px solid #00c0ef;
	//         box-shadow: 0 1px 1px rgba(0,0,0,0.1);
	//
	//     }
	//     .dialog .content .box-body{
	//         text-align: center;
	//     }
	//     .box-header{
	//         padding-top: 5px;
	//     }
	//     .btn-style{
	//         padding: 2px;
	//         font-size: 18px;
	//         background-color: #00c0ef;
	//         border-color: #00acd6;
	//         border-radius: 3px;
	//         box-shadow: none;
	//         border: 1px solid transparent;
	//         color: #fff;
	//         font-weight: bold;
	//     }
	//     .dialog .content .box-header h3{
	//         margin: 0;
	//         padding: 8px 10px;
	//         font-size: 16px;
	//         letter-spacing: 1px;
	//         font-weight: bold;
	//     }
	//     .close{
	//         position: absolute;
	//         right: 10px;
	//         top: 6px;
	//     }
	//     .dialog .content .box-body{
	//         font-size: 14px;
	//         padding: 0 20px 10px 20px;
	//
	//     }
	//     .btn-def{
	//         background-color: #f4f4f4;
	//         border: 1px solid #ddd;
	//         border-radius: 3px;
	//         padding: 3px 9px;
	//     }
	//     .mr10{
	//         margin-right: 10px;
	//     }
	// </style>
	// <template>
	//
	//     <div class="dialog" v-show="show">
	//         <align
	//                 :align="align"
	//                 :visible="show"
	//                 :monitor-buffer-time="80">
	//             <div class="content" :style="{width:width+'px'}">
	//                 <div class="box-header">
	//                     <h3 class="box-title" v-text="title"></h3>
	//                     <!-- tools box -->
	//                     <div class="close">
	//                         <button class="btn-style" @click="cbClose('cancel')">×</button>
	//                     </div><!-- /. tools -->
	//                 </div><!-- /.box-header -->
	//                 <div class="box-body">
	//                     <slot></slot>
	//                 </div>
	//             </div>
	//         </align>
	//         <div class="dialog-mask"></div>
	//     </div>
	// </template>
	// <script type="text/javascript">

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(78)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] dev\\js\\views\\components\\base\\align.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(100)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Edgar\\Documents\\fin-front-end\\dev\\js\\views\\components\\base\\align.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(79);

	var _domAlign = __webpack_require__(92);

	var _domAlign2 = _interopRequireDefault(_domAlign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// <slot></slot>
	// </template>
	//
	// <script>

	function isWindow(obj) {
	  /* eslint no-eq-null: 0 */
	  /* eslint eqeqeq: 0 */
	  return obj != null && obj == obj.window;
	}

	function buffer(fn, ms) {
	  var timer = void 0;

	  return function bufferFn() {
	    if (timer) {
	      clearTimeout(timer);
	    }
	    timer = setTimeout(fn, ms);
	  };
	}

	exports.default = {
	  props: (0, _utils.defaultProps)({
	    className: '',
	    align: {
	      type: Object,
	      require: true
	    },
	    watchProps: _utils.any,
	    visible: true,
	    target: function target() {
	      return window;
	    },
	    onAlign: function onAlign() {},
	    monitorBufferTime: 50,
	    monitorWindowResize: false,
	    disabled: false
	  }),

	  computed: {
	    currentNode: function currentNode() {
	      // console.log('computed',this.$el,getTrustSlotNode)
	      return (0, _utils.getTrustSlotNode)(this.$el);
	    }
	  },

	  watch: {
	    align: function align() {
	      this._doAlign();
	    },
	    visible: function visible(val) {
	      if (val) {
	        this._doAlign();
	      }
	    },
	    watchProps: function watchProps(newVal, oldVal) {
	      if (newVal !== oldVal) {
	        this._doAlign();
	      }
	    },
	    monitorWindowResize: function monitorWindowResize(val) {
	      if (val && !this.disabled) {
	        this._startMonitorWindowResize();
	      } else {
	        this._stopMonitorWindowResize();
	      }
	    }
	  },

	  beforeDestory: function beforeDestory() {
	    this._stopMonitorWindowResize();
	  },
	  compiled: function compiled() {
	    // console.log('compiled',this)
	    this._doAlign = (0, _utils.throttle)(this.__doAlign.bind(this), 50);
	  },
	  ready: function ready() {
	    // console.log('ready',this._doAlign())
	    this._doAlign();
	    this.resizeHandler = buffer(this._onWindowResize, this.monitorBufferTime);

	    if (this.monitorWindowResize && !this.disabled) {
	      this._startMonitorWindowResize();
	    } else {
	      this._stopMonitorWindowResize();
	    }

	    this._doAlign;
	  },


	  methods: {
	    __doAlign: function __doAlign() {
	      var target = this.target();
	      if (!target) {
	        return;
	      }
	      // console.log('target',target)
	      // return
	      var currentNode = this.currentNode;
	      // console.log('currentNode',currentNode)

	      var display = currentNode.style.display;
	      currentNode.style.left = '0';
	      currentNode.style.top = '0';
	      currentNode.style.display = 'block';
	      this.onAlign(currentNode, (0, _domAlign2.default)(currentNode, target, this.align));
	      currentNode.style.display = display;
	    },
	    _onWindowResize: function _onWindowResize() {
	      if (!this.disabled) {
	        this._doAlign();
	      }
	    },
	    _startMonitorWindowResize: function _startMonitorWindowResize() {
	      if (!this.hasListener) {
	        this.hasListener = true;
	        window.addEventListener('resize', this.resizeHandler, false);
	      }
	    },
	    _stopMonitorWindowResize: function _stopMonitorWindowResize() {
	      if (this.hasListener) {
	        this.hasListener = false;
	        window.removeEventListener('resize', this.resizeHandler, false);
	      }
	    }
	  }
	};

	// </script>

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.slotMixin = exports.KeyCode = exports.cx = exports.guid = exports.removeEndEventListener = exports.addEndEventListener = exports.addEventListener = exports.any = exports.oneOf = exports.oneOfType = exports.defaultProps = exports.getTrustSlotNode = exports.contains = exports.insertAfter = exports.insertBefore = exports.addStyle = exports.removeClass = exports.addClass = exports.isIE9 = exports.inBrowser = exports.throttle = exports.strToObj = exports.camelize = exports.camelcaseToHyphen = undefined;

	var _stringify = __webpack_require__(61);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _lang = __webpack_require__(80);

	Object.defineProperty(exports, 'camelcaseToHyphen', {
	  enumerable: true,
	  get: function get() {
	    return _lang.camelcaseToHyphen;
	  }
	});
	Object.defineProperty(exports, 'camelize', {
	  enumerable: true,
	  get: function get() {
	    return _lang.camelize;
	  }
	});
	Object.defineProperty(exports, 'strToObj', {
	  enumerable: true,
	  get: function get() {
	    return _lang.strToObj;
	  }
	});
	Object.defineProperty(exports, 'throttle', {
	  enumerable: true,
	  get: function get() {
	    return _lang.throttle;
	  }
	});

	var _env = __webpack_require__(81);

	Object.defineProperty(exports, 'inBrowser', {
	  enumerable: true,
	  get: function get() {
	    return _env.inBrowser;
	  }
	});
	Object.defineProperty(exports, 'isIE9', {
	  enumerable: true,
	  get: function get() {
	    return _env.isIE9;
	  }
	});

	var _dom = __webpack_require__(82);

	Object.defineProperty(exports, 'addClass', {
	  enumerable: true,
	  get: function get() {
	    return _dom.addClass;
	  }
	});
	Object.defineProperty(exports, 'removeClass', {
	  enumerable: true,
	  get: function get() {
	    return _dom.removeClass;
	  }
	});
	Object.defineProperty(exports, 'addStyle', {
	  enumerable: true,
	  get: function get() {
	    return _dom.addStyle;
	  }
	});
	Object.defineProperty(exports, 'insertBefore', {
	  enumerable: true,
	  get: function get() {
	    return _dom.insertBefore;
	  }
	});
	Object.defineProperty(exports, 'insertAfter', {
	  enumerable: true,
	  get: function get() {
	    return _dom.insertAfter;
	  }
	});
	Object.defineProperty(exports, 'contains', {
	  enumerable: true,
	  get: function get() {
	    return _dom.contains;
	  }
	});
	Object.defineProperty(exports, 'getTrustSlotNode', {
	  enumerable: true,
	  get: function get() {
	    return _dom.getTrustSlotNode;
	  }
	});

	var _props = __webpack_require__(86);

	Object.defineProperty(exports, 'defaultProps', {
	  enumerable: true,
	  get: function get() {
	    return _props.defaultProps;
	  }
	});
	Object.defineProperty(exports, 'oneOfType', {
	  enumerable: true,
	  get: function get() {
	    return _props.oneOfType;
	  }
	});
	Object.defineProperty(exports, 'oneOf', {
	  enumerable: true,
	  get: function get() {
	    return _props.oneOf;
	  }
	});
	Object.defineProperty(exports, 'any', {
	  enumerable: true,
	  get: function get() {
	    return _props.any;
	  }
	});

	var _event = __webpack_require__(87);

	Object.defineProperty(exports, 'addEventListener', {
	  enumerable: true,
	  get: function get() {
	    return _event.addEventListener;
	  }
	});
	Object.defineProperty(exports, 'addEndEventListener', {
	  enumerable: true,
	  get: function get() {
	    return _event.addEndEventListener;
	  }
	});
	Object.defineProperty(exports, 'removeEndEventListener', {
	  enumerable: true,
	  get: function get() {
	    return _event.removeEndEventListener;
	  }
	});

	var _guid = __webpack_require__(88);

	Object.defineProperty(exports, 'guid', {
	  enumerable: true,
	  get: function get() {
	    return _guid.guid;
	  }
	});
	exports.getPlainObject = getPlainObject;

	var _classnames = __webpack_require__(89);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _KeyCode2 = __webpack_require__(90);

	var _KeyCode3 = _interopRequireDefault(_KeyCode2);

	var _slotMixin2 = __webpack_require__(91);

	var _slotMixin3 = _interopRequireDefault(_slotMixin2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var cx = exports.cx = _classnames2.default;
	var KeyCode = exports.KeyCode = _KeyCode3.default;
	var slotMixin = exports.slotMixin = _slotMixin3.default;

	function getPlainObject(vueObject) {
	  return JSON.parse((0, _stringify2.default)(vueObject));
	}

/***/ },
/* 80 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.camelcaseToHyphen = camelcaseToHyphen;
	exports.camelize = camelize;
	exports.strToObj = strToObj;
	exports.throttle = throttle;
	function camelcaseToHyphen(str) {
	  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	var camelizeRE = /-(\w)/g;
	var toUpper = function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	};

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function strToObj(str) {
	  var strArr = str.split(' ');
	  var obj = {};
	  strArr.forEach(function (item) {
	    obj[item] = 1;
	  });
	  return obj;
	}

	// 节流函数
	function throttle(func, wait, options) {
	  var context = void 0,
	      args = void 0,
	      result = void 0;
	  var timeout = null;
	  var previous = 0;
	  if (!options) options = {};
	  var later = function later() {
	    previous = options.leading === false ? 0 : Date.now();
	    timeout = null;
	    result = func.apply(context, args);
	    if (!timeout) context = args = null;
	  };
	  return function () {
	    var now = Date.now();
	    if (!previous && options.leading === false) previous = now;
	    var remaining = wait - (now - previous);
	    context = this;
	    args = arguments;
	    if (remaining <= 0 || remaining > wait) {
	      if (timeout) {
	        clearTimeout(timeout);
	        timeout = null;
	      }
	      previous = now;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    } else if (!timeout && options.trailing !== false) {
	      timeout = setTimeout(later, remaining);
	    }
	    return result;
	  };
	}

/***/ },
/* 81 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Browser environment sniffing
	var inBrowser = exports.inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	var isIE9 = exports.isIE9 = inBrowser && navigator.userAgent.toLowerCase().indexOf('msie 9.0') > 0;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.scrollIntoView = undefined;

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.addStyle = addStyle;
	exports.insertBefore = insertBefore;
	exports.insertAfter = insertAfter;
	exports.contains = contains;
	exports.getTrustSlotNode = getTrustSlotNode;

	var _env = __webpack_require__(81);

	var _lang = __webpack_require__(80);

	var _domScrollIntoView = __webpack_require__(83);

	var _domScrollIntoView2 = _interopRequireDefault(_domScrollIntoView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (_env.isIE9 && el.hasOwnProperty('className')) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}

	function addClass(el, cls) {
	  if (el.classList) {
	    var clsArr = cls.split(' ');
	    clsArr.map(function (cl) {
	      return el.classList.add(cl);
	    });
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	function addStyle(el, clsObj) {
	  (0, _keys2.default)(clsObj).forEach(function (name) {
	    el.style[(0, _lang.camelize)(name)] = clsObj[name];
	  });
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function insertBefore(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function insertAfter(el, target) {
	  if (target.nextSibling) {
	    insertBefore(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	function contains(root, node) {
	  while (node) {
	    if (node === root) {
	      return true;
	    }
	    node = node.parentNode;
	  }
	  return false;
	}

	function getTrustSlotNode(node) {
	  var childNode = node.nextSibling;
	  if (childNode.nodeType !== 1) {
	    return getTrustSlotNode(childNode);
	  }
	  return childNode;
	}

	var scrollIntoView = exports.scrollIntoView = _domScrollIntoView2.default;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(84);

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(85);

	function scrollIntoView(elem, container, config) {
	  config = config || {};
	  // document 归一化到 window
	  if (container.nodeType === 9) {
	    container = util.getWindow(container);
	  }

	  var allowHorizontalScroll = config.allowHorizontalScroll;
	  var onlyScrollIfNeeded = config.onlyScrollIfNeeded;
	  var alignWithTop = config.alignWithTop;
	  var alignWithLeft = config.alignWithLeft;
	  var offsetTop = config.offsetTop || 0;
	  var offsetLeft = config.offsetLeft || 0;
	  var offsetBottom = config.offsetBottom || 0;
	  var offsetRight = config.offsetRight || 0;

	  allowHorizontalScroll = allowHorizontalScroll === undefined ? true : allowHorizontalScroll;

	  var isWin = util.isWindow(container);
	  var elemOffset = util.offset(elem);
	  var eh = util.outerHeight(elem);
	  var ew = util.outerWidth(elem);
	  var containerOffset = undefined;
	  var ch = undefined;
	  var cw = undefined;
	  var containerScroll = undefined;
	  var diffTop = undefined;
	  var diffBottom = undefined;
	  var win = undefined;
	  var winScroll = undefined;
	  var ww = undefined;
	  var wh = undefined;

	  if (isWin) {
	    win = container;
	    wh = util.height(win);
	    ww = util.width(win);
	    winScroll = {
	      left: util.scrollLeft(win),
	      top: util.scrollTop(win)
	    };
	    // elem 相对 container 可视视窗的距离
	    diffTop = {
	      left: elemOffset.left - winScroll.left - offsetLeft,
	      top: elemOffset.top - winScroll.top - offsetTop
	    };
	    diffBottom = {
	      left: elemOffset.left + ew - (winScroll.left + ww) + offsetRight,
	      top: elemOffset.top + eh - (winScroll.top + wh) + offsetBottom
	    };
	    containerScroll = winScroll;
	  } else {
	    containerOffset = util.offset(container);
	    ch = container.clientHeight;
	    cw = container.clientWidth;
	    containerScroll = {
	      left: container.scrollLeft,
	      top: container.scrollTop
	    };
	    // elem 相对 container 可视视窗的距离
	    // 注意边框, offset 是边框到根节点
	    diffTop = {
	      left: elemOffset.left - (containerOffset.left + (parseFloat(util.css(container, 'borderLeftWidth')) || 0)) - offsetLeft,
	      top: elemOffset.top - (containerOffset.top + (parseFloat(util.css(container, 'borderTopWidth')) || 0)) - offsetTop
	    };
	    diffBottom = {
	      left: elemOffset.left + ew - (containerOffset.left + cw + (parseFloat(util.css(container, 'borderRightWidth')) || 0)) + offsetRight,
	      top: elemOffset.top + eh - (containerOffset.top + ch + (parseFloat(util.css(container, 'borderBottomWidth')) || 0)) + offsetBottom
	    };
	  }

	  if (diffTop.top < 0 || diffBottom.top > 0) {
	    // 强制向上
	    if (alignWithTop === true) {
	      util.scrollTop(container, containerScroll.top + diffTop.top);
	    } else if (alignWithTop === false) {
	      util.scrollTop(container, containerScroll.top + diffBottom.top);
	    } else {
	      // 自动调整
	      if (diffTop.top < 0) {
	        util.scrollTop(container, containerScroll.top + diffTop.top);
	      } else {
	        util.scrollTop(container, containerScroll.top + diffBottom.top);
	      }
	    }
	  } else {
	    if (!onlyScrollIfNeeded) {
	      alignWithTop = alignWithTop === undefined ? true : !!alignWithTop;
	      if (alignWithTop) {
	        util.scrollTop(container, containerScroll.top + diffTop.top);
	      } else {
	        util.scrollTop(container, containerScroll.top + diffBottom.top);
	      }
	    }
	  }

	  if (allowHorizontalScroll) {
	    if (diffTop.left < 0 || diffBottom.left > 0) {
	      // 强制向上
	      if (alignWithLeft === true) {
	        util.scrollLeft(container, containerScroll.left + diffTop.left);
	      } else if (alignWithLeft === false) {
	        util.scrollLeft(container, containerScroll.left + diffBottom.left);
	      } else {
	        // 自动调整
	        if (diffTop.left < 0) {
	          util.scrollLeft(container, containerScroll.left + diffTop.left);
	        } else {
	          util.scrollLeft(container, containerScroll.left + diffBottom.left);
	        }
	      }
	    } else {
	      if (!onlyScrollIfNeeded) {
	        alignWithLeft = alignWithLeft === undefined ? true : !!alignWithLeft;
	        if (alignWithLeft) {
	          util.scrollLeft(container, containerScroll.left + diffTop.left);
	        } else {
	          util.scrollLeft(container, containerScroll.left + diffBottom.left);
	        }
	      }
	    }
	  }
	}

	module.exports = scrollIntoView;

/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

	function getClientPosition(elem) {
	  var box = undefined;
	  var x = undefined;
	  var y = undefined;
	  var doc = elem.ownerDocument;
	  var body = doc.body;
	  var docElem = doc && doc.documentElement;
	  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
	  box = elem.getBoundingClientRect();

	  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
	  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
	  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

	  x = box.left;
	  y = box.top;

	  // In IE, most of the time, 2 extra pixels are added to the top and left
	  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
	  // IE6 standards mode, this border can be overridden by setting the
	  // document element's border to zero -- thus, we cannot rely on the
	  // offset always being 2 pixels.

	  // In quirks mode, the offset can be determined by querying the body's
	  // clientLeft/clientTop, but in standards mode, it is found by querying
	  // the document element's clientLeft/clientTop.  Since we already called
	  // getClientBoundingRect we have already forced a reflow, so it is not
	  // too expensive just to query them all.

	  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
	  // 窗口边框标准是设 documentElement ,quirks 时设置 body
	  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
	  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
	  // 标准 ie 下 docElem.clientTop 就是 border-top
	  // ie7 html 即窗口边框改变不了。永远为 2
	  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

	  x -= docElem.clientLeft || body.clientLeft || 0;
	  y -= docElem.clientTop || body.clientTop || 0;

	  return {
	    left: x,
	    top: y
	  };
	}

	function getScroll(w, top) {
	  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
	  var method = 'scroll' + (top ? 'Top' : 'Left');
	  if (typeof ret !== 'number') {
	    var d = w.document;
	    // ie6,7,8 standard mode
	    ret = d.documentElement[method];
	    if (typeof ret !== 'number') {
	      // quirks mode
	      ret = d.body[method];
	    }
	  }
	  return ret;
	}

	function getScrollLeft(w) {
	  return getScroll(w);
	}

	function getScrollTop(w) {
	  return getScroll(w, true);
	}

	function getOffset(el) {
	  var pos = getClientPosition(el);
	  var doc = el.ownerDocument;
	  var w = doc.defaultView || doc.parentWindow;
	  pos.left += getScrollLeft(w);
	  pos.top += getScrollTop(w);
	  return pos;
	}
	function _getComputedStyle(elem, name, computedStyle_) {
	  var val = '';
	  var d = elem.ownerDocument;
	  var computedStyle = computedStyle_ || d.defaultView.getComputedStyle(elem, null);

	  // https://github.com/kissyteam/kissy/issues/61
	  if (computedStyle) {
	    val = computedStyle.getPropertyValue(name) || computedStyle[name];
	  }

	  return val;
	}

	var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
	var RE_POS = /^(top|right|bottom|left)$/;
	var CURRENT_STYLE = 'currentStyle';
	var RUNTIME_STYLE = 'runtimeStyle';
	var LEFT = 'left';
	var PX = 'px';

	function _getComputedStyleIE(elem, name) {
	  // currentStyle maybe null
	  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
	  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];

	  // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
	  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
	  // 在 ie 下不对，需要直接用 offset 方式
	  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了

	  // From the awesome hack by Dean Edwards
	  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
	  // If we're not dealing with a regular pixel number
	  // but a number that has a weird ending, we need to convert it to pixels
	  // exclude left right for relativity
	  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
	    // Remember the original values
	    var style = elem.style;
	    var left = style[LEFT];
	    var rsLeft = elem[RUNTIME_STYLE][LEFT];

	    // prevent flashing of content
	    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];

	    // Put in the new values to get a computed value out
	    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
	    ret = style.pixelLeft + PX;

	    // Revert the changed values
	    style[LEFT] = left;

	    elem[RUNTIME_STYLE][LEFT] = rsLeft;
	  }
	  return ret === '' ? 'auto' : ret;
	}

	var getComputedStyleX = undefined;
	if (typeof window !== 'undefined') {
	  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
	}

	function each(arr, fn) {
	  for (var i = 0; i < arr.length; i++) {
	    fn(arr[i]);
	  }
	}

	function isBorderBoxFn(elem) {
	  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
	}

	var BOX_MODELS = ['margin', 'border', 'padding'];
	var CONTENT_INDEX = -1;
	var PADDING_INDEX = 2;
	var BORDER_INDEX = 1;
	var MARGIN_INDEX = 0;

	function swap(elem, options, callback) {
	  var old = {};
	  var style = elem.style;
	  var name = undefined;

	  // Remember the old values, and insert the new ones
	  for (name in options) {
	    if (options.hasOwnProperty(name)) {
	      old[name] = style[name];
	      style[name] = options[name];
	    }
	  }

	  callback.call(elem);

	  // Revert the old values
	  for (name in options) {
	    if (options.hasOwnProperty(name)) {
	      style[name] = old[name];
	    }
	  }
	}

	function getPBMWidth(elem, props, which) {
	  var value = 0;
	  var prop = undefined;
	  var j = undefined;
	  var i = undefined;
	  for (j = 0; j < props.length; j++) {
	    prop = props[j];
	    if (prop) {
	      for (i = 0; i < which.length; i++) {
	        var cssProp = undefined;
	        if (prop === 'border') {
	          cssProp = prop + which[i] + 'Width';
	        } else {
	          cssProp = prop + which[i];
	        }
	        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
	      }
	    }
	  }
	  return value;
	}

	/**
	 * A crude way of determining if an object is a window
	 * @member util
	 */
	function isWindow(obj) {
	  // must use == for ie8
	  /* eslint eqeqeq:0 */
	  return obj != null && obj == obj.window;
	}

	var domUtils = {};

	each(['Width', 'Height'], function (name) {
	  domUtils['doc' + name] = function (refWin) {
	    var d = refWin.document;
	    return Math.max(
	    // firefox chrome documentElement.scrollHeight< body.scrollHeight
	    // ie standard mode : documentElement.scrollHeight> body.scrollHeight
	    d.documentElement['scroll' + name],
	    // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
	    d.body['scroll' + name], domUtils['viewport' + name](d));
	  };

	  domUtils['viewport' + name] = function (win) {
	    // pc browser includes scrollbar in window.innerWidth
	    var prop = 'client' + name;
	    var doc = win.document;
	    var body = doc.body;
	    var documentElement = doc.documentElement;
	    var documentElementProp = documentElement[prop];
	    // 标准模式取 documentElement
	    // backcompat 取 body
	    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
	  };
	});

	/*
	 得到元素的大小信息
	 @param elem
	 @param name
	 @param {String} [extra]  'padding' : (css width) + padding
	 'border' : (css width) + padding + border
	 'margin' : (css width) + padding + border + margin
	 */
	function getWH(elem, name, extra) {
	  if (isWindow(elem)) {
	    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
	  } else if (elem.nodeType === 9) {
	    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
	  }
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
	  var borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
	  var computedStyle = getComputedStyleX(elem);
	  var isBorderBox = isBorderBoxFn(elem, computedStyle);
	  var cssBoxValue = 0;
	  if (borderBoxValue == null || borderBoxValue <= 0) {
	    borderBoxValue = undefined;
	    // Fall back to computed then un computed css if necessary
	    cssBoxValue = getComputedStyleX(elem, name);
	    if (cssBoxValue == null || Number(cssBoxValue) < 0) {
	      cssBoxValue = elem.style[name] || 0;
	    }
	    // Normalize '', auto, and prepare for extra
	    cssBoxValue = parseFloat(cssBoxValue) || 0;
	  }
	  if (extra === undefined) {
	    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
	  }
	  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
	  var val = borderBoxValue || cssBoxValue;
	  if (extra === CONTENT_INDEX) {
	    if (borderBoxValueOrIsBorderBox) {
	      return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
	    }
	    return cssBoxValue;
	  }
	  if (borderBoxValueOrIsBorderBox) {
	    var padding = extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle);
	    return val + (extra === BORDER_INDEX ? 0 : padding);
	  }
	  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
	}

	var cssShow = {
	  position: 'absolute',
	  visibility: 'hidden',
	  display: 'block'
	};

	// fix #119 : https://github.com/kissyteam/kissy/issues/119
	function getWHIgnoreDisplay(elem) {
	  var val = undefined;
	  var args = arguments;
	  // in case elem is window
	  // elem.offsetWidth === undefined
	  if (elem.offsetWidth !== 0) {
	    val = getWH.apply(undefined, args);
	  } else {
	    swap(elem, cssShow, function () {
	      val = getWH.apply(undefined, args);
	    });
	  }
	  return val;
	}

	function css(el, name, v) {
	  var value = v;
	  if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
	    for (var i in name) {
	      if (name.hasOwnProperty(i)) {
	        css(el, i, name[i]);
	      }
	    }
	    return undefined;
	  }
	  if (typeof value !== 'undefined') {
	    if (typeof value === 'number') {
	      value += 'px';
	    }
	    el.style[name] = value;
	    return undefined;
	  }
	  return getComputedStyleX(el, name);
	}

	each(['width', 'height'], function (name) {
	  var first = name.charAt(0).toUpperCase() + name.slice(1);
	  domUtils['outer' + first] = function (el, includeMargin) {
	    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
	  };
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

	  domUtils[name] = function (elem, val) {
	    if (val !== undefined) {
	      if (elem) {
	        var computedStyle = getComputedStyleX(elem);
	        var isBorderBox = isBorderBoxFn(elem);
	        if (isBorderBox) {
	          val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
	        }
	        return css(elem, name, val);
	      }
	      return undefined;
	    }
	    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
	  };
	});

	// 设置 elem 相对 elem.ownerDocument 的坐标
	function setOffset(elem, offset) {
	  // set position first, in-case top/left are set even on static elem
	  if (css(elem, 'position') === 'static') {
	    elem.style.position = 'relative';
	  }

	  var old = getOffset(elem);
	  var ret = {};
	  var current = undefined;
	  var key = undefined;

	  for (key in offset) {
	    if (offset.hasOwnProperty(key)) {
	      current = parseFloat(css(elem, key)) || 0;
	      ret[key] = current + offset[key] - old[key];
	    }
	  }
	  css(elem, ret);
	}

	module.exports = _extends({
	  getWindow: function getWindow(node) {
	    var doc = node.ownerDocument || node;
	    return doc.defaultView || doc.parentWindow;
	  },
	  offset: function offset(el, value) {
	    if (typeof value !== 'undefined') {
	      setOffset(el, value);
	    } else {
	      return getOffset(el);
	    }
	  },

	  isWindow: isWindow,
	  each: each,
	  css: css,
	  clone: function clone(obj) {
	    var ret = {};
	    for (var i in obj) {
	      if (obj.hasOwnProperty(i)) {
	        ret[i] = obj[i];
	      }
	    }
	    var overflow = obj.overflow;
	    if (overflow) {
	      for (var i in obj) {
	        if (obj.hasOwnProperty(i)) {
	          ret.overflow[i] = obj.overflow[i];
	        }
	      }
	    }
	    return ret;
	  },
	  scrollLeft: function scrollLeft(w, v) {
	    if (isWindow(w)) {
	      if (v === undefined) {
	        return getScrollLeft(w);
	      }
	      window.scrollTo(v, getScrollTop(w));
	    } else {
	      if (v === undefined) {
	        return w.scrollLeft;
	      }
	      w.scrollLeft = v;
	    }
	  },
	  scrollTop: function scrollTop(w, v) {
	    if (isWindow(w)) {
	      if (v === undefined) {
	        return getScrollTop(w);
	      }
	      window.scrollTo(getScrollLeft(w), v);
	    } else {
	      if (v === undefined) {
	        return w.scrollTop;
	      }
	      w.scrollTop = v;
	    }
	  },

	  viewportWidth: 0,
	  viewportHeight: 0
	}, domUtils);

/***/ },
/* 86 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.defaultProps = defaultProps;
	exports.oneOfType = oneOfType;
	exports.oneOf = oneOf;
	var toString = Object.prototype.toString;

	// 返回vue匹配的props的对象
	function defaultProps(props) {
	  for (var i in props) {
	    if (props.hasOwnProperty(i)) {
	      var _ret = function () {
	        var defaultValue = props[i];

	        // 支持String， Number等类型
	        if (defaultValue && defaultValue.name && window[defaultValue.name] === defaultValue) {
	          props[i] = {
	            type: defaultValue,
	            default: null
	          };

	          return 'continue';
	        }

	        var type = toString.call(defaultValue).replace('[object ', '').replace(']', '');

	        // 如果传进来的是vue的原生props对象的话
	        if (type === 'Object') {
	          if (defaultValue.type != null || defaultValue.default != null || defaultValue.validator != null || defaultValue.twoWay != null || defaultValue.required != null) {
	            return 'continue';
	          }
	        }

	        // 支持 Object和Array的简洁声明方式
	        // Todo: 目前看来这样并没有什么卵用
	        if (type === 'Array' || type === 'Object') {
	          props[i] = {
	            type: window[type],
	            default: function _default() {
	              return defaultValue;
	            }
	          };
	          return 'continue';
	        }

	        props[i] = {
	          type: window[type],
	          default: defaultValue
	        };
	      }();

	      if (_ret === 'continue') continue;
	    }
	  }

	  return props;
	}

	function oneOfType(validList, defaultValue) {
	  var validaObj = {};

	  validaObj.default = defaultValue;
	  validaObj.validator = function (value) {
	    if (value == null) return true;

	    for (var j = 0; j < validList.length; j++) {
	      var currentValid = validList[j];
	      var validName = void 0;
	      if (typeof currentValid === 'string') {
	        validName = currentValid;
	      } else {
	        validName = currentValid.name;
	      }
	      if (toString.call(value).indexOf(validName) > -1) {
	        return true;
	      }
	    }
	    return false;
	  };

	  return validaObj;
	}

	function oneOf(validList, defaultValue) {
	  var validaObj = {};

	  validaObj.default = defaultValue;
	  validaObj.validator = function (value) {
	    if (value == null) return true;

	    for (var j = 0; j < validList.length; j++) {
	      if (value === validList[j]) {
	        return true;
	      }
	    }
	    return false;
	  };

	  return validaObj;
	}

	var any = exports.any = {
	  validator: function validator(value) {
	    return true;
	  }
	};

/***/ },
/* 87 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addEventListener = addEventListener;
	exports.addEndEventListener = addEndEventListener;
	exports.removeEndEventListener = removeEndEventListener;
	/**
	 * EVENT_NAME_MAP is used to determine which event fired when a
	 * transition/animation ends, based on the style property used to
	 * define that event.
	 */
	var EVENT_NAME_MAP = {
	  transitionend: {
	    transition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd',
	    MozTransition: 'mozTransitionEnd',
	    OTransition: 'oTransitionEnd',
	    msTransition: 'MSTransitionEnd'
	  },

	  animationend: {
	    animation: 'animationend',
	    WebkitAnimation: 'webkitAnimationEnd',
	    MozAnimation: 'mozAnimationEnd',
	    OAnimation: 'oAnimationEnd',
	    msAnimation: 'MSAnimationEnd'
	  }
	};

	var endEvents = [];

	var detectEvents = function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;

	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are useable, and if not remove them
	  // from the map
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }

	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }

	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	};

	if (typeof window !== 'undefined') {
	  detectEvents();
	}

	// We use the raw {add|remove}EventListener() call because EventListener
	// does not know how to remove event listeners and we really should
	// clean up. Also, these events are not triggered in older browsers
	// so we should be A-OK here.
	function addEventListener(target, eventName, eventListener) {
	  if (target.addEventListener) {
	    target.addEventListener(eventName, eventListener, false);
	    return {
	      remove: function remove() {
	        target.removeEventListener(eventName, eventListener, false);
	      }
	    };
	  } else if (target.attachEvent) {
	    target.attachEvent('on' + eventName, eventListener);
	    return {
	      remove: function remove() {
	        target.detachEvent('on' + eventName, eventListener);
	      }
	    };
	  }
	}

	var removeEventListener = function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	};

	function addEndEventListener(node, eventListener) {
	  if (endEvents.length === 0) {
	    // If CSS transitions are not supported, trigger an "end animation"
	    // event immediately.
	    window.setTimeout(eventListener, 0);
	    return;
	  }
	  endEvents.forEach(function (endEvent) {
	    addEventListener(node, endEvent, eventListener);
	  });
	}

	function removeEndEventListener(node, eventListener) {
	  if (endEvents.length === 0) {
	    return;
	  }
	  endEvents.forEach(function (endEvent) {
	    removeEventListener(node, endEvent, eventListener);
	  });
	}

/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.guid = guid;
	var seed = 0;

	function guid() {
	  return Date.now() + '_' + seed++;
	}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @ignore
	 * some key-codes definition and utils from closure-library
	 * @author yiminghe@gmail.com
	 */

	var KeyCode = {
	  /**
	   * MAC_ENTER
	   */
	  MAC_ENTER: 3,
	  /**
	   * BACKSPACE
	   */
	  BACKSPACE: 8,
	  /**
	   * TAB
	   */
	  TAB: 9,
	  /**
	   * NUMLOCK on FF/Safari Mac
	   */
	  NUM_CENTER: 12, // NUMLOCK on FF/Safari Mac
	  /**
	   * ENTER
	   */
	  ENTER: 13,
	  /**
	   * SHIFT
	   */
	  SHIFT: 16,
	  /**
	   * CTRL
	   */
	  CTRL: 17,
	  /**
	   * ALT
	   */
	  ALT: 18,
	  /**
	   * PAUSE
	   */
	  PAUSE: 19,
	  /**
	   * CAPS_LOCK
	   */
	  CAPS_LOCK: 20,
	  /**
	   * ESC
	   */
	  ESC: 27,
	  /**
	   * SPACE
	   */
	  SPACE: 32,
	  /**
	   * PAGE_UP
	   */
	  PAGE_UP: 33, // also NUM_NORTH_EAST
	  /**
	   * PAGE_DOWN
	   */
	  PAGE_DOWN: 34, // also NUM_SOUTH_EAST
	  /**
	   * END
	   */
	  END: 35, // also NUM_SOUTH_WEST
	  /**
	   * HOME
	   */
	  HOME: 36, // also NUM_NORTH_WEST
	  /**
	   * LEFT
	   */
	  LEFT: 37, // also NUM_WEST
	  /**
	   * UP
	   */
	  UP: 38, // also NUM_NORTH
	  /**
	   * RIGHT
	   */
	  RIGHT: 39, // also NUM_EAST
	  /**
	   * DOWN
	   */
	  DOWN: 40, // also NUM_SOUTH
	  /**
	   * PRINT_SCREEN
	   */
	  PRINT_SCREEN: 44,
	  /**
	   * INSERT
	   */
	  INSERT: 45, // also NUM_INSERT
	  /**
	   * DELETE
	   */
	  DELETE: 46, // also NUM_DELETE
	  /**
	   * ZERO
	   */
	  ZERO: 48,
	  /**
	   * ONE
	   */
	  ONE: 49,
	  /**
	   * TWO
	   */
	  TWO: 50,
	  /**
	   * THREE
	   */
	  THREE: 51,
	  /**
	   * FOUR
	   */
	  FOUR: 52,
	  /**
	   * FIVE
	   */
	  FIVE: 53,
	  /**
	   * SIX
	   */
	  SIX: 54,
	  /**
	   * SEVEN
	   */
	  SEVEN: 55,
	  /**
	   * EIGHT
	   */
	  EIGHT: 56,
	  /**
	   * NINE
	   */
	  NINE: 57,
	  /**
	   * QUESTION_MARK
	   */
	  QUESTION_MARK: 63, // needs localization
	  /**
	   * A
	   */
	  A: 65,
	  /**
	   * B
	   */
	  B: 66,
	  /**
	   * C
	   */
	  C: 67,
	  /**
	   * D
	   */
	  D: 68,
	  /**
	   * E
	   */
	  E: 69,
	  /**
	   * F
	   */
	  F: 70,
	  /**
	   * G
	   */
	  G: 71,
	  /**
	   * H
	   */
	  H: 72,
	  /**
	   * I
	   */
	  I: 73,
	  /**
	   * J
	   */
	  J: 74,
	  /**
	   * K
	   */
	  K: 75,
	  /**
	   * L
	   */
	  L: 76,
	  /**
	   * M
	   */
	  M: 77,
	  /**
	   * N
	   */
	  N: 78,
	  /**
	   * O
	   */
	  O: 79,
	  /**
	   * P
	   */
	  P: 80,
	  /**
	   * Q
	   */
	  Q: 81,
	  /**
	   * R
	   */
	  R: 82,
	  /**
	   * S
	   */
	  S: 83,
	  /**
	   * T
	   */
	  T: 84,
	  /**
	   * U
	   */
	  U: 85,
	  /**
	   * V
	   */
	  V: 86,
	  /**
	   * W
	   */
	  W: 87,
	  /**
	   * X
	   */
	  X: 88,
	  /**
	   * Y
	   */
	  Y: 89,
	  /**
	   * Z
	   */
	  Z: 90,
	  /**
	   * META
	   */
	  META: 91, // WIN_KEY_LEFT
	  /**
	   * WIN_KEY_RIGHT
	   */
	  WIN_KEY_RIGHT: 92,
	  /**
	   * CONTEXT_MENU
	   */
	  CONTEXT_MENU: 93,
	  /**
	   * NUM_ZERO
	   */
	  NUM_ZERO: 96,
	  /**
	   * NUM_ONE
	   */
	  NUM_ONE: 97,
	  /**
	   * NUM_TWO
	   */
	  NUM_TWO: 98,
	  /**
	   * NUM_THREE
	   */
	  NUM_THREE: 99,
	  /**
	   * NUM_FOUR
	   */
	  NUM_FOUR: 100,
	  /**
	   * NUM_FIVE
	   */
	  NUM_FIVE: 101,
	  /**
	   * NUM_SIX
	   */
	  NUM_SIX: 102,
	  /**
	   * NUM_SEVEN
	   */
	  NUM_SEVEN: 103,
	  /**
	   * NUM_EIGHT
	   */
	  NUM_EIGHT: 104,
	  /**
	   * NUM_NINE
	   */
	  NUM_NINE: 105,
	  /**
	   * NUM_MULTIPLY
	   */
	  NUM_MULTIPLY: 106,
	  /**
	   * NUM_PLUS
	   */
	  NUM_PLUS: 107,
	  /**
	   * NUM_MINUS
	   */
	  NUM_MINUS: 109,
	  /**
	   * NUM_PERIOD
	   */
	  NUM_PERIOD: 110,
	  /**
	   * NUM_DIVISION
	   */
	  NUM_DIVISION: 111,
	  /**
	   * F1
	   */
	  F1: 112,
	  /**
	   * F2
	   */
	  F2: 113,
	  /**
	   * F3
	   */
	  F3: 114,
	  /**
	   * F4
	   */
	  F4: 115,
	  /**
	   * F5
	   */
	  F5: 116,
	  /**
	   * F6
	   */
	  F6: 117,
	  /**
	   * F7
	   */
	  F7: 118,
	  /**
	   * F8
	   */
	  F8: 119,
	  /**
	   * F9
	   */
	  F9: 120,
	  /**
	   * F10
	   */
	  F10: 121,
	  /**
	   * F11
	   */
	  F11: 122,
	  /**
	   * F12
	   */
	  F12: 123,
	  /**
	   * NUMLOCK
	   */
	  NUMLOCK: 144,
	  /**
	   * SEMICOLON
	   */
	  SEMICOLON: 186, // needs localization
	  /**
	   * DASH
	   */
	  DASH: 189, // needs localization
	  /**
	   * EQUALS
	   */
	  EQUALS: 187, // needs localization
	  /**
	   * COMMA
	   */
	  COMMA: 188, // needs localization
	  /**
	   * PERIOD
	   */
	  PERIOD: 190, // needs localization
	  /**
	   * SLASH
	   */
	  SLASH: 191, // needs localization
	  /**
	   * APOSTROPHE
	   */
	  APOSTROPHE: 192, // needs localization
	  /**
	   * SINGLE_QUOTE
	   */
	  SINGLE_QUOTE: 222, // needs localization
	  /**
	   * OPEN_SQUARE_BRACKET
	   */
	  OPEN_SQUARE_BRACKET: 219, // needs localization
	  /**
	   * BACKSLASH
	   */
	  BACKSLASH: 220, // needs localization
	  /**
	   * CLOSE_SQUARE_BRACKET
	   */
	  CLOSE_SQUARE_BRACKET: 221, // needs localization
	  /**
	   * WIN_KEY
	   */
	  WIN_KEY: 224,
	  /**
	   * MAC_FF_META
	   */
	  MAC_FF_META: 224, // Firefox (Gecko) fires this for the meta key instead of 91
	  /**
	   * WIN_IME
	   */
	  WIN_IME: 229
	};

	/*
	 whether text and modified key is entered at the same time.
	 */
	KeyCode.isTextModifyingKeyEvent = function (e) {
	  var keyCode = e.keyCode;
	  if (e.altKey && !e.ctrlKey || e.metaKey ||
	  // Function keys don't generate text
	  keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
	    return false;
	  }

	  // The following keys are quite harmless, even in combination with
	  // CTRL, ALT or SHIFT.
	  switch (keyCode) {
	    case KeyCode.ALT:
	    case KeyCode.CAPS_LOCK:
	    case KeyCode.CONTEXT_MENU:
	    case KeyCode.CTRL:
	    case KeyCode.DOWN:
	    case KeyCode.END:
	    case KeyCode.ESC:
	    case KeyCode.HOME:
	    case KeyCode.INSERT:
	    case KeyCode.LEFT:
	    case KeyCode.MAC_FF_META:
	    case KeyCode.META:
	    case KeyCode.NUMLOCK:
	    case KeyCode.NUM_CENTER:
	    case KeyCode.PAGE_DOWN:
	    case KeyCode.PAGE_UP:
	    case KeyCode.PAUSE:
	    case KeyCode.PRINT_SCREEN:
	    case KeyCode.RIGHT:
	    case KeyCode.SHIFT:
	    case KeyCode.UP:
	    case KeyCode.WIN_KEY:
	    case KeyCode.WIN_KEY_RIGHT:
	      return false;
	    default:
	      return true;
	  }
	};

	/*
	 whether character is entered.
	 */
	KeyCode.isCharacterKey = function (keyCode) {
	  if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
	    return true;
	  }

	  if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
	    return true;
	  }

	  if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
	    return true;
	  }

	  // Safari sends zero key code for non-latin characters.
	  if (window.navigation.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
	    return true;
	  }

	  switch (keyCode) {
	    case KeyCode.SPACE:
	    case KeyCode.QUESTION_MARK:
	    case KeyCode.NUM_PLUS:
	    case KeyCode.NUM_MINUS:
	    case KeyCode.NUM_PERIOD:
	    case KeyCode.NUM_DIVISION:
	    case KeyCode.SEMICOLON:
	    case KeyCode.DASH:
	    case KeyCode.EQUALS:
	    case KeyCode.COMMA:
	    case KeyCode.PERIOD:
	    case KeyCode.SLASH:
	    case KeyCode.APOSTROPHE:
	    case KeyCode.SINGLE_QUOTE:
	    case KeyCode.OPEN_SQUARE_BRACKET:
	    case KeyCode.BACKSLASH:
	    case KeyCode.CLOSE_SQUARE_BRACKET:
	      return true;
	    default:
	      return false;
	  }
	};

	exports.default = KeyCode;

/***/ },
/* 91 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function getSlotNode(el) {
	  if (!el) return null;
	  if (el.nodeType === 1 && el.getAttribute('slot') === 'trigger') {
	    return el;
	  }
	  return getSlotNode(el.nextSibling);
	}

	exports.default = {
	  ready: function ready() {
	    this._bindTriggerEvent();
	  },


	  methods: {
	    _getTriggerTarget: function _getTriggerTarget() {
	      var el = getSlotNode(this.$el);

	      var els = void 0;
	      if (el.getAttribute('slot') === 'trigger') {
	        els = [el];
	      } else {
	        els = getSlotNode(this.$el).querySelectorAll('[slot="trigger"]');
	      }

	      var len = els.length;
	      if (len) {
	        var currentWrap = els[len - 1];
	        var children = currentWrap.children;
	        if (children && children.length === 1) {
	          return children[children.length - 1];
	        } else {
	          return currentWrap;
	        }
	      }
	      return null;
	    },
	    _bindTriggerEvent: function _bindTriggerEvent() {
	      var el = this._getTriggerTarget();
	      if (el) {
	        el.addEventListener('blur', this._onBlur.bind(this), false);
	        el.addEventListener('click', this._onClick.bind(this), false);
	        el.addEventListener('focus', this._onFocus.bind(this), false);
	        el.addEventListener('mousedown', this._onMouseDown.bind(this), false);
	        el.addEventListener('mouseenter', this._onMouseEnter.bind(this), false);
	        el.addEventListener('mouseleave', this._onMouseLeave.bind(this), false);
	        el.addEventListener('touchstart', this._onTouchStart.bind(this), false);
	      }
	    }
	  }
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * align dom node flexibly
	 * @author yiminghe@gmail.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = __webpack_require__(93);

	var _utils2 = _interopRequireDefault(_utils);

	var _getOffsetParent = __webpack_require__(94);

	var _getOffsetParent2 = _interopRequireDefault(_getOffsetParent);

	var _getVisibleRectForElement = __webpack_require__(95);

	var _getVisibleRectForElement2 = _interopRequireDefault(_getVisibleRectForElement);

	var _adjustForViewport = __webpack_require__(96);

	var _adjustForViewport2 = _interopRequireDefault(_adjustForViewport);

	var _getRegion = __webpack_require__(97);

	var _getRegion2 = _interopRequireDefault(_getRegion);

	var _getElFuturePos = __webpack_require__(98);

	var _getElFuturePos2 = _interopRequireDefault(_getElFuturePos);

	// http://yiminghe.iteye.com/blog/1124720

	function isFailX(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
	}

	function isFailY(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
	}

	function isCompleteFailX(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.left > visibleRect.right || elFuturePos.left + elRegion.width < visibleRect.left;
	}

	function isCompleteFailY(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.top > visibleRect.bottom || elFuturePos.top + elRegion.height < visibleRect.top;
	}

	function flip(points, reg, map) {
	  var ret = [];
	  _utils2['default'].each(points, function (p) {
	    ret.push(p.replace(reg, function (m) {
	      return map[m];
	    }));
	  });
	  return ret;
	}

	function flipOffset(offset, index) {
	  offset[index] = -offset[index];
	  return offset;
	}

	function convertOffset(str, offsetLen) {
	  var n = undefined;
	  if (/%$/.test(str)) {
	    n = parseInt(str.substring(0, str.length - 1), 10) / 100 * offsetLen;
	  } else {
	    n = parseInt(str, 10);
	  }
	  return n || 0;
	}

	function normalizeOffset(offset, el) {
	  offset[0] = convertOffset(offset[0], el.width);
	  offset[1] = convertOffset(offset[1], el.height);
	}

	function domAlign(el, refNode, align) {
	  var points = align.points;
	  var offset = align.offset || [0, 0];
	  var targetOffset = align.targetOffset || [0, 0];
	  var overflow = align.overflow;
	  var target = align.target || refNode;
	  var source = align.source || el;
	  offset = [].concat(offset);
	  targetOffset = [].concat(targetOffset);
	  overflow = overflow || {};
	  var newOverflowCfg = {};

	  var fail = 0;
	  // 当前节点可以被放置的显示区域
	  var visibleRect = (0, _getVisibleRectForElement2['default'])(source);
	  // 当前节点所占的区域, left/top/width/height
	  var elRegion = (0, _getRegion2['default'])(source);
	  // 参照节点所占的区域, left/top/width/height
	  var refNodeRegion = (0, _getRegion2['default'])(target);
	  // 将 offset 转换成数值，支持百分比
	  normalizeOffset(offset, elRegion);
	  normalizeOffset(targetOffset, refNodeRegion);
	  // 当前节点将要被放置的位置
	  var elFuturePos = (0, _getElFuturePos2['default'])(elRegion, refNodeRegion, points, offset, targetOffset);
	  // 当前节点将要所处的区域
	  var newElRegion = _utils2['default'].merge(elRegion, elFuturePos);

	  // 如果可视区域不能完全放置当前节点时允许调整
	  if (visibleRect && (overflow.adjustX || overflow.adjustY)) {
	    if (overflow.adjustX) {
	      // 如果横向不能放下
	      if (isFailX(elFuturePos, elRegion, visibleRect)) {
	        // 对齐位置反下
	        var newPoints = flip(points, /[lr]/ig, {
	          l: 'r',
	          r: 'l'
	        });
	        // 偏移量也反下
	        var newOffset = flipOffset(offset, 0);
	        var newTargetOffset = flipOffset(targetOffset, 0);
	        var newElFuturePos = (0, _getElFuturePos2['default'])(elRegion, refNodeRegion, newPoints, newOffset, newTargetOffset);
	        if (!isCompleteFailX(newElFuturePos, elRegion, visibleRect)) {
	          fail = 1;
	          points = newPoints;
	          offset = newOffset;
	          targetOffset = newTargetOffset;
	        }
	      }
	    }

	    if (overflow.adjustY) {
	      // 如果纵向不能放下
	      if (isFailY(elFuturePos, elRegion, visibleRect)) {
	        // 对齐位置反下
	        var newPoints = flip(points, /[tb]/ig, {
	          t: 'b',
	          b: 't'
	        });
	        // 偏移量也反下
	        var newOffset = flipOffset(offset, 1);
	        var newTargetOffset = flipOffset(targetOffset, 1);
	        var newElFuturePos = (0, _getElFuturePos2['default'])(elRegion, refNodeRegion, newPoints, newOffset, newTargetOffset);
	        if (!isCompleteFailY(newElFuturePos, elRegion, visibleRect)) {
	          fail = 1;
	          points = newPoints;
	          offset = newOffset;
	          targetOffset = newTargetOffset;
	        }
	      }
	    }

	    // 如果失败，重新计算当前节点将要被放置的位置
	    if (fail) {
	      elFuturePos = (0, _getElFuturePos2['default'])(elRegion, refNodeRegion, points, offset, targetOffset);
	      _utils2['default'].mix(newElRegion, elFuturePos);
	    }

	    // 检查反下后的位置是否可以放下了
	    // 如果仍然放不下只有指定了可以调整当前方向才调整
	    newOverflowCfg.adjustX = overflow.adjustX && isFailX(elFuturePos, elRegion, visibleRect);

	    newOverflowCfg.adjustY = overflow.adjustY && isFailY(elFuturePos, elRegion, visibleRect);

	    // 确实要调整，甚至可能会调整高度宽度
	    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
	      newElRegion = (0, _adjustForViewport2['default'])(elFuturePos, elRegion, visibleRect, newOverflowCfg);
	    }
	  }

	  // need judge to in case set fixed with in css on height auto element
	  if (newElRegion.width !== elRegion.width) {
	    _utils2['default'].css(source, 'width', source.width() + newElRegion.width - elRegion.width);
	  }

	  if (newElRegion.height !== elRegion.height) {
	    _utils2['default'].css(source, 'height', source.height() + newElRegion.height - elRegion.height);
	  }

	  // https://github.com/kissyteam/kissy/issues/190
	  // http://localhost:8888/kissy/src/overlay/demo/other/relative_align/align.html
	  // 相对于屏幕位置没变，而 left/top 变了
	  // 例如 <div 'relative'><el absolute></div>
	  _utils2['default'].offset(source, {
	    left: newElRegion.left,
	    top: newElRegion.top
	  }, {
	    useCssRight: align.useCssRight,
	    useCssBottom: align.useCssBottom
	  });

	  return {
	    points: points,
	    offset: offset,
	    targetOffset: targetOffset,
	    overflow: newOverflowCfg
	  };
	}

	domAlign.__getOffsetParent = _getOffsetParent2['default'];

	domAlign.__getVisibleRectForElement = _getVisibleRectForElement2['default'];

	exports['default'] = domAlign;

	/**
	 *  2012-04-26 yiminghe@gmail.com
	 *   - 优化智能对齐算法
	 *   - 慎用 resizeXX
	 *
	 *  2011-07-13 yiminghe@gmail.com note:
	 *   - 增加智能对齐，以及大小调整选项
	 **/
	module.exports = exports['default'];

/***/ },
/* 93 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

	var getComputedStyleX = undefined;

	function css(el, name, v) {
	  var value = v;
	  if (typeof name === 'object') {
	    for (var i in name) {
	      if (name.hasOwnProperty(i)) {
	        css(el, i, name[i]);
	      }
	    }
	    return undefined;
	  }
	  if (typeof value !== 'undefined') {
	    if (typeof value === 'number') {
	      value = value + 'px';
	    }
	    el.style[name] = value;
	    return undefined;
	  }
	  return getComputedStyleX(el, name);
	}

	function getClientPosition(elem) {
	  var box = undefined;
	  var x = undefined;
	  var y = undefined;
	  var doc = elem.ownerDocument;
	  var body = doc.body;
	  var docElem = doc && doc.documentElement;
	  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
	  box = elem.getBoundingClientRect();

	  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
	  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
	  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

	  x = box.left;
	  y = box.top;

	  // In IE, most of the time, 2 extra pixels are added to the top and left
	  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
	  // IE6 standards mode, this border can be overridden by setting the
	  // document element's border to zero -- thus, we cannot rely on the
	  // offset always being 2 pixels.

	  // In quirks mode, the offset can be determined by querying the body's
	  // clientLeft/clientTop, but in standards mode, it is found by querying
	  // the document element's clientLeft/clientTop.  Since we already called
	  // getClientBoundingRect we have already forced a reflow, so it is not
	  // too expensive just to query them all.

	  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
	  // 窗口边框标准是设 documentElement ,quirks 时设置 body
	  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
	  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
	  // 标准 ie 下 docElem.clientTop 就是 border-top
	  // ie7 html 即窗口边框改变不了。永远为 2
	  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

	  x -= docElem.clientLeft || body.clientLeft || 0;
	  y -= docElem.clientTop || body.clientTop || 0;

	  return { left: x, top: y };
	}

	function getScroll(w, top) {
	  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
	  var method = 'scroll' + (top ? 'Top' : 'Left');
	  if (typeof ret !== 'number') {
	    var d = w.document;
	    // ie6,7,8 standard mode
	    ret = d.documentElement[method];
	    if (typeof ret !== 'number') {
	      // quirks mode
	      ret = d.body[method];
	    }
	  }
	  return ret;
	}

	function getScrollLeft(w) {
	  return getScroll(w);
	}

	function getScrollTop(w) {
	  return getScroll(w, true);
	}

	function getOffset(el) {
	  var pos = getClientPosition(el);
	  var doc = el.ownerDocument;
	  var w = doc.defaultView || doc.parentWindow;
	  pos.left += getScrollLeft(w);
	  pos.top += getScrollTop(w);
	  return pos;
	}
	function _getComputedStyle(elem, name, cs) {
	  var computedStyle = cs;
	  var val = '';
	  var d = elem.ownerDocument;
	  computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null);

	  // https://github.com/kissyteam/kissy/issues/61
	  if (computedStyle) {
	    val = computedStyle.getPropertyValue(name) || computedStyle[name];
	  }

	  return val;
	}

	var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
	var RE_POS = /^(top|right|bottom|left)$/;
	var CURRENT_STYLE = 'currentStyle';
	var RUNTIME_STYLE = 'runtimeStyle';
	var LEFT = 'left';
	var PX = 'px';

	function _getComputedStyleIE(elem, name) {
	  // currentStyle maybe null
	  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
	  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];

	  // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
	  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
	  // 在 ie 下不对，需要直接用 offset 方式
	  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了

	  // From the awesome hack by Dean Edwards
	  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
	  // If we're not dealing with a regular pixel number
	  // but a number that has a weird ending, we need to convert it to pixels
	  // exclude left right for relativity
	  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
	    // Remember the original values
	    var style = elem.style;
	    var left = style[LEFT];
	    var rsLeft = elem[RUNTIME_STYLE][LEFT];

	    // prevent flashing of content
	    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];

	    // Put in the new values to get a computed value out
	    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
	    ret = style.pixelLeft + PX;

	    // Revert the changed values
	    style[LEFT] = left;

	    elem[RUNTIME_STYLE][LEFT] = rsLeft;
	  }
	  return ret === '' ? 'auto' : ret;
	}

	if (typeof window !== 'undefined') {
	  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
	}

	function getOffsetDirection(dir, option) {
	  if (dir === 'left') {
	    return option.useCssRight ? 'right' : dir;
	  }
	  return option.useCssBottom ? 'bottom' : dir;
	}

	function oppositeOffsetDirection(dir) {
	  if (dir === 'left') {
	    return 'right';
	  } else if (dir === 'right') {
	    return 'left';
	  } else if (dir === 'top') {
	    return 'bottom';
	  } else if (dir === 'bottom') {
	    return 'top';
	  }
	}

	// 设置 elem 相对 elem.ownerDocument 的坐标
	function setOffset(elem, offset, option) {
	  // set position first, in-case top/left are set even on static elem
	  if (css(elem, 'position') === 'static') {
	    elem.style.position = 'relative';
	  }
	  var presetH = -999;
	  var presetV = -999;
	  var horizontalProperty = getOffsetDirection('left', option);
	  var verticalProperty = getOffsetDirection('top', option);
	  var oppositeHorizontalProperty = oppositeOffsetDirection(horizontalProperty);
	  var oppositeVerticalProperty = oppositeOffsetDirection(verticalProperty);

	  if (horizontalProperty !== 'left') {
	    presetH = 999;
	  }

	  if (verticalProperty !== 'top') {
	    presetV = 999;
	  }

	  if ('left' in offset) {
	    elem.style[oppositeHorizontalProperty] = '';
	    elem.style[horizontalProperty] = presetH + 'px';
	  }
	  if ('top' in offset) {
	    elem.style[oppositeVerticalProperty] = '';
	    elem.style[verticalProperty] = presetV + 'px';
	  }
	  var old = getOffset(elem);
	  var ret = {};
	  var key = undefined;
	  for (key in offset) {
	    if (offset.hasOwnProperty(key)) {
	      var dir = getOffsetDirection(key, option);
	      var preset = key === 'left' ? presetH : presetV;
	      if (dir === key) {
	        ret[dir] = preset + offset[key] - old[key];
	      } else {
	        ret[dir] = preset + old[key] - offset[key];
	      }
	    }
	  }
	  css(elem, ret);
	}

	function each(arr, fn) {
	  for (var i = 0; i < arr.length; i++) {
	    fn(arr[i]);
	  }
	}

	function isBorderBoxFn(elem) {
	  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
	}

	var BOX_MODELS = ['margin', 'border', 'padding'];
	var CONTENT_INDEX = -1;
	var PADDING_INDEX = 2;
	var BORDER_INDEX = 1;
	var MARGIN_INDEX = 0;

	function swap(elem, options, callback) {
	  var old = {};
	  var style = elem.style;
	  var name = undefined;

	  // Remember the old values, and insert the new ones
	  for (name in options) {
	    if (options.hasOwnProperty(name)) {
	      old[name] = style[name];
	      style[name] = options[name];
	    }
	  }

	  callback.call(elem);

	  // Revert the old values
	  for (name in options) {
	    if (options.hasOwnProperty(name)) {
	      style[name] = old[name];
	    }
	  }
	}

	function getPBMWidth(elem, props, which) {
	  var value = 0;
	  var prop = undefined;
	  var j = undefined;
	  var i = undefined;
	  for (j = 0; j < props.length; j++) {
	    prop = props[j];
	    if (prop) {
	      for (i = 0; i < which.length; i++) {
	        var cssProp = undefined;
	        if (prop === 'border') {
	          cssProp = prop + which[i] + 'Width';
	        } else {
	          cssProp = prop + which[i];
	        }
	        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
	      }
	    }
	  }
	  return value;
	}

	/**
	 * A crude way of determining if an object is a window
	 * @member util
	 */
	function isWindow(obj) {
	  // must use == for ie8
	  /* eslint eqeqeq:0 */
	  return obj !== null && obj !== undefined && obj == obj.window;
	}

	var domUtils = {};

	each(['Width', 'Height'], function (name) {
	  domUtils['doc' + name] = function (refWin) {
	    var d = refWin.document;
	    return Math.max(
	    // firefox chrome documentElement.scrollHeight< body.scrollHeight
	    // ie standard mode : documentElement.scrollHeight> body.scrollHeight
	    d.documentElement['scroll' + name],
	    // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
	    d.body['scroll' + name], domUtils['viewport' + name](d));
	  };

	  domUtils['viewport' + name] = function (win) {
	    // pc browser includes scrollbar in window.innerWidth
	    var prop = 'client' + name;
	    var doc = win.document;
	    var body = doc.body;
	    var documentElement = doc.documentElement;
	    var documentElementProp = documentElement[prop];
	    // 标准模式取 documentElement
	    // backcompat 取 body
	    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
	  };
	});

	/*
	 得到元素的大小信息
	 @param elem
	 @param name
	 @param {String} [extra]  'padding' : (css width) + padding
	 'border' : (css width) + padding + border
	 'margin' : (css width) + padding + border + margin
	 */
	function getWH(elem, name, ex) {
	  var extra = ex;
	  if (isWindow(elem)) {
	    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
	  } else if (elem.nodeType === 9) {
	    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
	  }
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
	  var borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
	  var computedStyle = getComputedStyleX(elem);
	  var isBorderBox = isBorderBoxFn(elem, computedStyle);
	  var cssBoxValue = 0;
	  if (borderBoxValue === null || borderBoxValue === undefined || borderBoxValue <= 0) {
	    borderBoxValue = undefined;
	    // Fall back to computed then un computed css if necessary
	    cssBoxValue = getComputedStyleX(elem, name);
	    if (cssBoxValue === null || cssBoxValue === undefined || Number(cssBoxValue) < 0) {
	      cssBoxValue = elem.style[name] || 0;
	    }
	    // Normalize '', auto, and prepare for extra
	    cssBoxValue = parseFloat(cssBoxValue) || 0;
	  }
	  if (extra === undefined) {
	    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
	  }
	  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
	  var val = borderBoxValue || cssBoxValue;
	  if (extra === CONTENT_INDEX) {
	    if (borderBoxValueOrIsBorderBox) {
	      return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
	    }
	    return cssBoxValue;
	  } else if (borderBoxValueOrIsBorderBox) {
	    if (extra === BORDER_INDEX) {
	      return val;
	    }
	    return val + (extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
	  }
	  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
	}

	var cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' };

	// fix #119 : https://github.com/kissyteam/kissy/issues/119
	function getWHIgnoreDisplay() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var val = undefined;
	  var elem = args[0];
	  // in case elem is window
	  // elem.offsetWidth === undefined
	  if (elem.offsetWidth !== 0) {
	    val = getWH.apply(undefined, args);
	  } else {
	    swap(elem, cssShow, function () {
	      val = getWH.apply(undefined, args);
	    });
	  }
	  return val;
	}

	each(['width', 'height'], function (name) {
	  var first = name.charAt(0).toUpperCase() + name.slice(1);
	  domUtils['outer' + first] = function (el, includeMargin) {
	    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
	  };
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

	  domUtils[name] = function (elem, v) {
	    var val = v;
	    if (val !== undefined) {
	      if (elem) {
	        var computedStyle = getComputedStyleX(elem);
	        var isBorderBox = isBorderBoxFn(elem);
	        if (isBorderBox) {
	          val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
	        }
	        return css(elem, name, val);
	      }
	      return undefined;
	    }
	    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
	  };
	});

	function mix(to, from) {
	  for (var i in from) {
	    if (from.hasOwnProperty(i)) {
	      to[i] = from[i];
	    }
	  }
	  return to;
	}

	var utils = {
	  getWindow: function getWindow(node) {
	    if (node && node.document && node.setTimeout) {
	      return node;
	    }
	    var doc = node.ownerDocument || node;
	    return doc.defaultView || doc.parentWindow;
	  },
	  offset: function offset(el, value, option) {
	    if (typeof value !== 'undefined') {
	      setOffset(el, value, option || {});
	    } else {
	      return getOffset(el);
	    }
	  },
	  isWindow: isWindow,
	  each: each,
	  css: css,
	  clone: function clone(obj) {
	    var i = undefined;
	    var ret = {};
	    for (i in obj) {
	      if (obj.hasOwnProperty(i)) {
	        ret[i] = obj[i];
	      }
	    }
	    var overflow = obj.overflow;
	    if (overflow) {
	      for (i in obj) {
	        if (obj.hasOwnProperty(i)) {
	          ret.overflow[i] = obj.overflow[i];
	        }
	      }
	    }
	    return ret;
	  },
	  mix: mix,
	  getWindowScrollLeft: function getWindowScrollLeft(w) {
	    return getScrollLeft(w);
	  },
	  getWindowScrollTop: function getWindowScrollTop(w) {
	    return getScrollTop(w);
	  },
	  merge: function merge() {
	    var ret = {};

	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    for (var i = 0; i < args.length; i++) {
	      utils.mix(ret, args[i]);
	    }
	    return ret;
	  },
	  viewportWidth: 0,
	  viewportHeight: 0
	};

	mix(utils, domUtils);

	exports['default'] = utils;
	module.exports = exports['default'];

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = __webpack_require__(93);

	var _utils2 = _interopRequireDefault(_utils);

	/**
	 * 得到会导致元素显示不全的祖先元素
	 */

	function getOffsetParent(element) {
	  // ie 这个也不是完全可行
	  /*
	   <div style="width: 50px;height: 100px;overflow: hidden">
	   <div style="width: 50px;height: 100px;position: relative;" id="d6">
	   元素 6 高 100px 宽 50px<br/>
	   </div>
	   </div>
	   */
	  // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
	  //  In other browsers it only includes elements with position absolute, relative or
	  // fixed, not elements with overflow set to auto or scroll.
	  //        if (UA.ie && ieMode < 8) {
	  //            return element.offsetParent;
	  //        }
	  // 统一的 offsetParent 方法
	  var doc = element.ownerDocument;
	  var body = doc.body;
	  var parent = undefined;
	  var positionStyle = _utils2['default'].css(element, 'position');
	  var skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';

	  if (!skipStatic) {
	    return element.nodeName.toLowerCase() === 'html' ? null : element.parentNode;
	  }

	  for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
	    positionStyle = _utils2['default'].css(parent, 'position');
	    if (positionStyle !== 'static') {
	      return parent;
	    }
	  }
	  return null;
	}

	exports['default'] = getOffsetParent;
	module.exports = exports['default'];

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = __webpack_require__(93);

	var _utils2 = _interopRequireDefault(_utils);

	var _getOffsetParent = __webpack_require__(94);

	var _getOffsetParent2 = _interopRequireDefault(_getOffsetParent);

	/**
	 * 获得元素的显示部分的区域
	 */
	function getVisibleRectForElement(element) {
	  var visibleRect = {
	    left: 0,
	    right: Infinity,
	    top: 0,
	    bottom: Infinity
	  };
	  var el = (0, _getOffsetParent2['default'])(element);
	  var scrollX = undefined;
	  var scrollY = undefined;
	  var winSize = undefined;
	  var doc = element.ownerDocument;
	  var win = doc.defaultView || doc.parentWindow;
	  var body = doc.body;
	  var documentElement = doc.documentElement;

	  // Determine the size of the visible rect by climbing the dom accounting for
	  // all scrollable containers.
	  while (el) {
	    // clientWidth is zero for inline block elements in ie.
	    if ((navigator.userAgent.indexOf('MSIE') === -1 || el.clientWidth !== 0) &&
	    // body may have overflow set on it, yet we still get the entire
	    // viewport. In some browsers, el.offsetParent may be
	    // document.documentElement, so check for that too.
	    el !== body && el !== documentElement && _utils2['default'].css(el, 'overflow') !== 'visible') {
	      var pos = _utils2['default'].offset(el);
	      // add border
	      pos.left += el.clientLeft;
	      pos.top += el.clientTop;
	      visibleRect.top = Math.max(visibleRect.top, pos.top);
	      visibleRect.right = Math.min(visibleRect.right,
	      // consider area without scrollBar
	      pos.left + el.clientWidth);
	      visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
	      visibleRect.left = Math.max(visibleRect.left, pos.left);
	    } else if (el === body || el === documentElement) {
	      break;
	    }
	    el = (0, _getOffsetParent2['default'])(el);
	  }

	  // Clip by window's viewport.
	  scrollX = _utils2['default'].getWindowScrollLeft(win);
	  scrollY = _utils2['default'].getWindowScrollTop(win);
	  visibleRect.left = Math.max(visibleRect.left, scrollX);
	  visibleRect.top = Math.max(visibleRect.top, scrollY);
	  winSize = {
	    width: _utils2['default'].viewportWidth(win),
	    height: _utils2['default'].viewportHeight(win)
	  };
	  visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
	  visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
	  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
	}

	exports['default'] = getVisibleRectForElement;
	module.exports = exports['default'];

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = __webpack_require__(93);

	var _utils2 = _interopRequireDefault(_utils);

	function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
	  var pos = _utils2['default'].clone(elFuturePos);
	  var size = {
	    width: elRegion.width,
	    height: elRegion.height
	  };

	  if (overflow.adjustX && pos.left < visibleRect.left) {
	    pos.left = visibleRect.left;
	  }

	  // Left edge inside and right edge outside viewport, try to resize it.
	  if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
	    size.width -= pos.left + size.width - visibleRect.right;
	  }

	  // Right edge outside viewport, try to move it.
	  if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
	    // 保证左边界和可视区域左边界对齐
	    pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
	  }

	  // Top edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top < visibleRect.top) {
	    pos.top = visibleRect.top;
	  }

	  // Top edge inside and bottom edge outside viewport, try to resize it.
	  if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
	    size.height -= pos.top + size.height - visibleRect.bottom;
	  }

	  // Bottom edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
	    // 保证上边界和可视区域上边界对齐
	    pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
	  }

	  return _utils2['default'].mix(pos, size);
	}

	exports['default'] = adjustForViewport;
	module.exports = exports['default'];

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = __webpack_require__(93);

	var _utils2 = _interopRequireDefault(_utils);

	function getRegion(node) {
	  var offset = undefined;
	  var w = undefined;
	  var h = undefined;
	  if (!_utils2['default'].isWindow(node) && node.nodeType !== 9) {
	    offset = _utils2['default'].offset(node);
	    w = _utils2['default'].outerWidth(node);
	    h = _utils2['default'].outerHeight(node);
	  } else {
	    var win = _utils2['default'].getWindow(node);
	    offset = {
	      left: _utils2['default'].getWindowScrollLeft(win),
	      top: _utils2['default'].getWindowScrollTop(win)
	    };
	    w = _utils2['default'].viewportWidth(win);
	    h = _utils2['default'].viewportHeight(win);
	  }
	  offset.width = w;
	  offset.height = h;
	  return offset;
	}

	exports['default'] = getRegion;
	module.exports = exports['default'];

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _getAlignOffset = __webpack_require__(99);

	var _getAlignOffset2 = _interopRequireDefault(_getAlignOffset);

	function getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset) {
	  var xy = undefined;
	  var diff = undefined;
	  var p1 = undefined;
	  var p2 = undefined;

	  xy = {
	    left: elRegion.left,
	    top: elRegion.top
	  };

	  p1 = (0, _getAlignOffset2['default'])(refNodeRegion, points[1]);
	  p2 = (0, _getAlignOffset2['default'])(elRegion, points[0]);

	  diff = [p2.left - p1.left, p2.top - p1.top];

	  return {
	    left: xy.left - diff[0] + offset[0] - targetOffset[0],
	    top: xy.top - diff[1] + offset[1] - targetOffset[1]
	  };
	}

	exports['default'] = getElFuturePos;
	module.exports = exports['default'];

/***/ },
/* 99 */
/***/ function(module, exports) {

	/**
	 * 获取 node 上的 align 对齐点 相对于页面的坐标
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function getAlignOffset(region, align) {
	  var V = align.charAt(0);
	  var H = align.charAt(1);
	  var w = region.width;
	  var h = region.height;
	  var x = undefined;
	  var y = undefined;

	  x = region.left;
	  y = region.top;

	  if (V === 'c') {
	    y += h / 2;
	  } else if (V === 'b') {
	    y += h;
	  }

	  if (H === 'c') {
	    x += w / 2;
	  } else if (H === 'r') {
	    x += w;
	  }

	  return {
	    left: x,
	    top: y
	  };
	}

	exports['default'] = getAlignOffset;
	module.exports = exports['default'];

/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = "\r\n<slot></slot>\r\n";

/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"dialog\" v-show=\"show\">\n    <align\n            :align=\"align\"\n            :visible=\"show\"\n            :monitor-buffer-time=\"80\">\n        <div class=\"content\" :style=\"{width:width+'px'}\">\n            <div class=\"box-header\">\n                <h3 class=\"box-title\" v-text=\"title\"></h3>\n                <!-- tools box -->\n                <div class=\"close\">\n                    <button class=\"btn-style\" @click=\"cbClose('cancel')\">×</button>\n                </div><!-- /. tools -->\n            </div><!-- /.box-header -->\n            <div class=\"box-body\">\n                <slot></slot>\n            </div>\n        </div>\n    </align>\n    <div class=\"dialog-mask\"></div>\n</div>\n";

/***/ },
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(124)
	__vue_script__ = __webpack_require__(126)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] dev\\js\\views\\BFJZC\\subsidy-appropriation.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(127)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Edgar\\Documents\\fin-front-end\\dev\\js\\views\\BFJZC\\subsidy-appropriation.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(125);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(59)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./subsidy-appropriation.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./subsidy-appropriation.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(58)();
	// imports


	// module
	exports.push([module.id, "\n.box-tbl{\n    overflow:auto;\n}\n.page-bar{\n    margin: 25px auto;\n    text-align: center;\n}\nth{\n    min-width: 85px;\n}\n", ""]);

	// exports


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _datepicker = __webpack_require__(68);

	var _datepicker2 = _interopRequireDefault(_datepicker);

	var _dialog = __webpack_require__(73);

	var _dialog2 = _interopRequireDefault(_dialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <index title="补贴划付" ptitle="备付金支出"  isshow="isshow">
	//         <section class="content" slot="content">
	//             <div class="row">
	//                 <div class="col-xs-12">
	//                     <div class="box">
	//                         <div class="box-header">
	//                             <form class="form-inline manage-form">
	//                                 <br/>
	//                                 <div class="form-group">
	//                                     <select class="form-control" v-model="subCompanyID" >
	//                                     <option value="">请选择分公司</option>
	//                                         <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
	//                                     </select>
	//                                 </div>
	//                                 <div class="form-group">
	//                                     <select class="form-control" v-model="cityID">
	//                                     <option value="">请选择城市</option>
	//                                         <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
	//                                     </select>
	//                                 </div>
	//                                  <div class="form-group">
	//                                     <select class="form-control" v-model="timeRange">
	//                                         <option value="">请选择日期</option>
	//                                         <option value="0">昨天</option>
	//                                         <option value="1">最近一周</option>
	//                                         <option value="2">最近一个月</option>
	//                                         <option value="3">最近三个月</option>
	//                                         <option value="4">自定义时间</option>
	//                                     </select>
	//                                 </div>
	//                                 <div class="form-group" v-show="timeRange==4">
	//                                     <datepicker  :readonly="true" :value.sync="startDate" format="YYYY-MM-DD"></datepicker>至
	//                                     <datepicker  :readonly="true" :value.sync="endDate" format="YYYY-MM-DD"></datepicker>
	//                                 </div>
	//                                 <br/>
	//                                 <br/>
	//                                 <div class="form-group">
	//                                     <input type="text" class="form-control" v-model="merchantID" placeholder="商户ID">
	//                                 </div>
	//                                 <div class="form-group">
	//                                     <input type="text" class="form-control" v-model="keywords" placeholder="商户名、收款账户名、帐号">
	//                                 </div>
	//                                 <div class="form-group">
	//                                     <select class="form-control" v-model="createType">
	//                                         <option value="">请选择生成方式</option>
	//                                         <option value="1">系统生成</option>
	//                                         <option value="2">手工录入</option>
	//                                     </select>
	//                                 </div>
	//                                 <div class="form-group">
	//                                     <select class="form-control" v-model="activityID">
	//                                     <option value="0">请选择参与活动</option>
	//                                         <option v-for="(index,n) in typelists" v-text="n.value" :value="n.accountType"></option>
	//                                     </select>
	//                                 </div>
	//                                 <div class="form-group">
	//                                     <select class="form-control" v-model="status">
	//                                         <option value="">请选择状态</option>
	//                                         <option value="1">等待审核</option>
	//                                         <option value="2">等待划付</option>
	//                                         <option value="3">等待对账</option>
	//                                         <option value="4">对账成功</option>
	//                                         <option value="5">划付失败</option>
	//                                     </select>
	//                                 </div>
	//                                 <div class="form-group">
	//                                     <input type="text" class="form-control" v-model="remark" placeholder="备注">
	//                                 </div>
	//                                 <div class="form-group">
	//                                     <input type="button" class="btn btn-info" v-on:click="query" value="查询">
	//                                 </div>
	//                             </form>
	//                         </div>
	//                         <div class="box-body box-tbl">
	//                             <table id="table1" class="table table-bordered table-hover">
	//                                 <thead>
	//                                     <tr>
	//                                         <th>ID</th>
	//                                         <th>生成日期</th>
	//                                         <th>分公司</th>
	//                                         <th>城市</th>
	//                                         <th>付款账户</th>
	//                                         <th>商户ID</th>
	//                                         <th>商户名称</th>
	//                                         <th>收款账户信息</th>
	//                                         <th>生成方式</th>
	//                                         <th>三方应补</th>
	//                                         <th>划付金额</th>
	//                                         <th>交易</th>
	//                                         <th>状态</th>
	//                                         <th>操作</th>
	//                                         <th>活动名称</th>
	//                                         <th>备注</th>
	//                                     </tr>
	//                                 </thead>
	//                                 <tbody>
	//                                     <tr v-if="!!subsidyAppropriationList.length" v-for="sa in subsidyAppropriationList">
	//                                         <td>{{sa.id}}</td>
	//                                         <td>{{sa.createAT}}</td>
	//                                         <td>{{sa.subCompanyName}}</td>
	//                                         <td>{{sa.cityName}}</td>
	//                                         <td>{{sa.paymentAccountShortName}}</td>
	//                                         <td>{{sa.merchantID}}</td>
	//                                         <td>{{sa.merchantName}}</td>
	//                                         <td>{{sa.receiptAccountName}}<br/>{{sa.receiptAccountNumber}}</td>
	//                                         <td>
	//                                             <template v-if="sa.createType==1">
	//                                                 系统生成
	//                                             </template>
	//                                             <template v-if="sa.createType==2">
	//                                                 手工录入
	//                                             </template>
	//                                         </td>
	//                                         <td>{{sa.thirdPartySubsidyShould}}</td>
	//                                         <td>{{sa.payAmount}}</td>
	//                                         <td><a href="#">明细</a></td>
	//                                         <td>{{sa.status}}
	//                                             <template v-if="sa.status==1">
	//                                                 等待审核
	//                                             </template>
	//                                             <template v-if="sa.status==2">
	//                                                 等待划付
	//                                             </template>
	//                                             <template v-if="sa.status==3">
	//                                                 等待对账
	//                                             </template>
	//                                             <template v-if="sa.status==4">
	//                                                 对账成功
	//                                             </template>
	//                                             <template v-if="sa.status==5">
	//                                                 划付失败
	//                                             </template>
	//                                         </td>
	//                                         <td><a href="#">申请划付</a></td>
	//                                         <td>{{sa.activityName}}</td>
	//                                         <td>{{sa.remarks}}</td>
	//                                     </tr>
	//                                 </tbody>
	//                             </table>
	//                         </div>
	//                         <div class="box-footer">
	//                             <page :all="pageall"
	//                                   :cur.sync="pagecur"
	//                                   :page_size.sync="page_size">
	//                             </page>
	//                         </div>
	//                     </div>
	//                 </div>
	//             </div>
	//         </div>
	//     </index>
	// </template>
	// <style>
	//     .box-tbl{
	//         overflow:auto;
	//     }
	//     .page-bar{
	//         margin: 25px auto;
	//         text-align: center;
	//     }
	//     th{
	//         min-width: 85px;
	//     }
	// </style>
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            subCompanyID: "",
	            cityID: "",
	            createType: "",
	            status: "",
	            timeRange: '',
	            startDate: "",
	            endDate: "",
	            merchantID: "",
	            merchantName: "",
	            keywords: "",
	            id: "",
	            seriesNumber: "",
	            activityID: 0,
	            subcompanyList: [],
	            pageall: 1,
	            pagecur: 1,
	            page_size: 15,
	            cityList: [],
	            subsidyAppropriationList: []
	        };
	    },

	    methods: {
	        //获取补贴划付数据
	        getSubsidyAppropriationList: function getSubsidyAppropriationList(data) {
	            this.$http.post('./subsidypaydetail/list', data).then(function (response) {
	                // *** 判断请求是否成功如若成功则填充数据到模型
	                response.data.code == 0 ? this.$set('subsidyAppropriationList', response.data.data) : null;
	                response.data.code == 0 ? this.$set('pageall', response.data.total) : null;
	            }, function (response) {
	                console.log(response);
	            });
	        },
	        //获取分公司数据
	        getSubcompany: function getSubcompany(data) {
	            this.$http.post('./subcompany/list', data).then(function (response) {
	                // *** 判断请求是否成功如若成功则填充数据到模型
	                response.data.code == 0 ? this.$set('subcompanyList', response.data.data) : null;
	            }, function (response) {
	                console.log(response);
	            });
	        },
	        //获取城市数据
	        getCity: function getCity(data) {
	            this.$http.post('./city/list', data).then(function (response) {
	                // *** 判断请求是否成功如若成功则填充数据到模型
	                response.data.code == 0 ? this.$set('cityList', response.data.data) : null;
	            }, function (response) {
	                console.log(response);
	            });
	        },
	        getTwo: function getTwo(num) {
	            if (num.toString().length >= 2) return num;
	            var str = "";
	            for (var i = num.toString().length; i < 2; i++) {
	                str += "0";
	            }return str + num.toString();
	        },
	        query: function query() {
	            // let data=this.data;
	            var data = {
	                subCompanyID: this.subCompanyID,
	                cityID: this.cityID,
	                type: this.type,
	                timeRange: this.timeRange,
	                merchantID: this.merchantID,
	                merchantName: this.merchantName,
	                keywords: this.keywords,
	                id: this.id,
	                seriesNumber: this.seriesNumber,
	                phone: this.phone,
	                activityID: this.activityID
	            };
	            this.getSubsidyAppropriationList(data);
	        }
	    },
	    ready: function ready() {
	        this.getSubsidyAppropriationList({});
	        this.getSubcompany({});
	        this.getCity({});
	    },
	    watch: {
	        timeRange: function timeRange() {
	            console.log();
	            var d = new Date();
	            var day = d.getDate();
	            var month = d.getMonth() + 1;
	            var year = d.getFullYear();
	            var newD;
	            switch (this.timeRange) {
	                case '0':
	                    newD = year + "-" + this.getTwo(month) + "-" + this.getTwo(day - 1);
	                    break;
	                case '1':
	                    newD = year + "-" + this.getTwo(month) + "-" + this.getTwo(day - 7);
	                    break;
	                case '2':
	                    newD = year + "-" + this.getTwo(month - 1) + "-" + this.getTwo(day);
	                    break;
	                case '3':
	                    newD = year + "-" + this.getTwo(month - 3) + "-" + this.getTwo(day);
	                    break;
	                case '4':
	                    newD = year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
	                    break;
	            }
	            var endD = year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
	            this.startDate = newD;
	            this.endDate = endD;
	        }
	    },
	    components: {
	        'datepicker': _datepicker2.default,
	        'dialog': _dialog2.default
	    }
	};
	// </script>

/***/ },
/* 127 */
/***/ function(module, exports) {

	module.exports = "\n    <index title=\"补贴划付\" ptitle=\"备付金支出\"  isshow=\"isshow\">\n        <section class=\"content\" slot=\"content\">\n            <div class=\"row\">\n                <div class=\"col-xs-12\">\n                    <div class=\"box\">\n                        <div class=\"box-header\">\n                            <form class=\"form-inline manage-form\">\n                                <br/>\n                                <div class=\"form-group\">\n                                    <select class=\"form-control\" v-model=\"subCompanyID\" >\n                                    <option value=\"\">请选择分公司</option>\n                                        <option v-for=\"n in subcompanyList\" v-text=\"n.name\" :value=\"n.subCompanyID\"></option>\n                                    </select>\n                                </div>\n                                <div class=\"form-group\">\n                                    <select class=\"form-control\" v-model=\"cityID\">\n                                    <option value=\"\">请选择城市</option>\n                                        <option v-for=\"n in cityList\" v-text=\"n.name\" :value=\"n.cityID\"></option>\n                                    </select>\n                                </div>\n                                 <div class=\"form-group\">\n                                    <select class=\"form-control\" v-model=\"timeRange\">\n                                        <option value=\"\">请选择日期</option>\n                                        <option value=\"0\">昨天</option>\n                                        <option value=\"1\">最近一周</option>\n                                        <option value=\"2\">最近一个月</option>\n                                        <option value=\"3\">最近三个月</option>\n                                        <option value=\"4\">自定义时间</option>\n                                    </select>\n                                </div>\n                                <div class=\"form-group\" v-show=\"timeRange==4\">\n                                    <datepicker  :readonly=\"true\" :value.sync=\"startDate\" format=\"YYYY-MM-DD\"></datepicker>至\n                                    <datepicker  :readonly=\"true\" :value.sync=\"endDate\" format=\"YYYY-MM-DD\"></datepicker>\n                                </div>\n                                <br/>\n                                <br/>\n                                <div class=\"form-group\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"merchantID\" placeholder=\"商户ID\">\n                                </div>\n                                <div class=\"form-group\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"keywords\" placeholder=\"商户名、收款账户名、帐号\">\n                                </div>\n                                <div class=\"form-group\">\n                                    <select class=\"form-control\" v-model=\"createType\">\n                                        <option value=\"\">请选择生成方式</option>\n                                        <option value=\"1\">系统生成</option>\n                                        <option value=\"2\">手工录入</option>\n                                    </select>\n                                </div>\n                                <div class=\"form-group\">\n                                    <select class=\"form-control\" v-model=\"activityID\">\n                                    <option value=\"0\">请选择参与活动</option>\n                                        <option v-for=\"(index,n) in typelists\" v-text=\"n.value\" :value=\"n.accountType\"></option>\n                                    </select>\n                                </div>\n                                <div class=\"form-group\">\n                                    <select class=\"form-control\" v-model=\"status\">\n                                        <option value=\"\">请选择状态</option>\n                                        <option value=\"1\">等待审核</option>\n                                        <option value=\"2\">等待划付</option>\n                                        <option value=\"3\">等待对账</option>\n                                        <option value=\"4\">对账成功</option>\n                                        <option value=\"5\">划付失败</option>\n                                    </select>\n                                </div>\n                                <div class=\"form-group\">\n                                    <input type=\"text\" class=\"form-control\" v-model=\"remark\" placeholder=\"备注\">\n                                </div>\n                                <div class=\"form-group\">\n                                    <input type=\"button\" class=\"btn btn-info\" v-on:click=\"query\" value=\"查询\">\n                                </div>\n                            </form> \n                        </div>\n                        <div class=\"box-body box-tbl\">\n                            <table id=\"table1\" class=\"table table-bordered table-hover\">\n                                <thead>\n                                    <tr>\n                                        <th>ID</th>\n                                        <th>生成日期</th>\n                                        <th>分公司</th>\n                                        <th>城市</th>\n                                        <th>付款账户</th>\n                                        <th>商户ID</th>\n                                        <th>商户名称</th>\n                                        <th>收款账户信息</th>\n                                        <th>生成方式</th>\n                                        <th>三方应补</th>\n                                        <th>划付金额</th>\n                                        <th>交易</th>\n                                        <th>状态</th>\n                                        <th>操作</th>\n                                        <th>活动名称</th>\n                                        <th>备注</th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    <tr v-if=\"!!subsidyAppropriationList.length\" v-for=\"sa in subsidyAppropriationList\">\n                                        <td>{{sa.id}}</td>\n                                        <td>{{sa.createAT}}</td>\n                                        <td>{{sa.subCompanyName}}</td>\n                                        <td>{{sa.cityName}}</td>\n                                        <td>{{sa.paymentAccountShortName}}</td>\n                                        <td>{{sa.merchantID}}</td>\n                                        <td>{{sa.merchantName}}</td>\n                                        <td>{{sa.receiptAccountName}}<br/>{{sa.receiptAccountNumber}}</td>\n                                        <td>\n                                            <template v-if=\"sa.createType==1\">\n                                                系统生成\n                                            </template>\n                                            <template v-if=\"sa.createType==2\">\n                                                手工录入\n                                            </template>\n                                        </td>\n                                        <td>{{sa.thirdPartySubsidyShould}}</td>\n                                        <td>{{sa.payAmount}}</td>\n                                        <td><a href=\"#\">明细</a></td>\n                                        <td>{{sa.status}}\n                                            <template v-if=\"sa.status==1\">\n                                                等待审核\n                                            </template>\n                                            <template v-if=\"sa.status==2\">\n                                                等待划付\n                                            </template>\n                                            <template v-if=\"sa.status==3\">\n                                                等待对账\n                                            </template>\n                                            <template v-if=\"sa.status==4\">\n                                                对账成功\n                                            </template>\n                                            <template v-if=\"sa.status==5\">\n                                                划付失败\n                                            </template>\n                                        </td>\n                                        <td><a href=\"#\">申请划付</a></td>\n                                        <td>{{sa.activityName}}</td>\n                                        <td>{{sa.remarks}}</td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                        <div class=\"box-footer\">\n                            <page :all=\"pageall\"\n                                  :cur.sync=\"pagecur\"\n                                  :page_size.sync=\"page_size\">\n                            </page>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </index>\n</template>";

/***/ }
]));