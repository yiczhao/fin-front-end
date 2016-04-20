webpackJsonp([8],{

/***/ 128:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(129)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] dev\\js\\views\\default.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(130)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Edgar\\Documents\\fin-front-end\\dev\\js\\views\\default.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 129:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <index isshow="">
	//             <section class="content-wrapper" slot="content">
	//                 <div class="col-xs-12" style="background: #fff;padding: 20px;">
	//                     <p>[财务管理系统]欢迎您!</p>
	//                     <p>尊敬的[{{loginList.trueName}}]您好! 这是您第[{{loginList.loginedCount}}]次登录本系统!</p>
	//                     <p>最近一次登录时间：{{loginList.lastLoginedTime | datetime}} 最近一次登录IP地址：{{loginList.lastLoginedAddr}}</p>
	//                 </div>
	//             </section>
	//     </index>
	// </template>
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            loginList: {}
	        };
	    },

	    components: {},
	    ready: function ready() {
	        // *** 请求用户数据
	        !!sessionStorage.getItem('userData') ? this.$set('loginList', JSON.parse(sessionStorage.getItem('userData'))) : null;
	    },
	    props: {}
	};
	// </script>

/***/ },

/***/ 130:
/***/ function(module, exports) {

	module.exports = "\n<index isshow=\"\">\n        <section class=\"content-wrapper\" slot=\"content\">\n            <div class=\"col-xs-12\" style=\"background: #fff;padding: 20px;\">\n                <p>[财务管理系统]欢迎您!</p>\n                <p>尊敬的[{{loginList.trueName}}]您好! 这是您第[{{loginList.loginedCount}}]次登录本系统!</p>\n                <p>最近一次登录时间：{{loginList.lastLoginedTime | datetime}} 最近一次登录IP地址：{{loginList.lastLoginedAddr}}</p>\n            </div>\n        </section>\n</index>\n";

/***/ }

});