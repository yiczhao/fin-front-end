webpackJsonp([1],{

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(56)
	__vue_script__ = __webpack_require__(60)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] dev\\js\\views\\login.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(63)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Edgar\\Documents\\fin-front-end\\dev\\js\\views\\login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(57);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(59)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./login.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./login.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(58)();
	// imports


	// module
	exports.push([module.id, "\n.pd50{\n    padding: 50px;\n}\n.pd50 .box-footer{\n    text-align: center;\n}\n.pd50 .box-footer .btn{\n    width:20%;\n    margin-top: 20px;\n}\n", ""]);

	// exports


/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(61);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div class="box box-info pd50">
	//         <div class="box-header with-border">
	//             <h3 class="box-title">财务系统用户登录</h3>
	//         </div>
	//         <form class="form-horizontal">
	//             <div class="box-body">
	//                 <div class="form-group">
	//                     <label class="col-sm-2 control-label">用户名</label>
	//                     <div class="col-sm-10">
	//                         <input type="text" v-model="username" class="form-control" placeholder="请输入用户名">
	//                     </div>
	//                 </div>
	//                 <div class="form-group">
	//                     <label class="col-sm-2 control-label">密码</label>
	//                     <div class="col-sm-10">
	//                         <input type="password" v-model="password" class="form-control" placeholder="请输入密码">
	//                     </div>
	//                 </div>
	//             </div>
	//             <div class="box-footer">
	//                 <span @click="login" class="btn btn-info">登录</span>
	//             </div>
	//         </form>
	//     </div>
	// </template>
	// <style>
	//     .pd50{
	//         padding: 50px;
	//     }
	//     .pd50 .box-footer{
	//         text-align: center;
	//     }
	//     .pd50 .box-footer .btn{
	//         width:20%;
	//         margin-top: 20px;
	//     }
	// </style>
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            username: '15151527650',
	            password: '123456'
	        };
	    },

	    components: {},
	    methods: {
	        login: function login() {
	            var data = { 'username': this.username, 'password': this.password };
	            this.$http.post('./passport/login', data).then(function (response) {
	                if (response.data.code === 0) {
	                    sessionStorage.setItem('userData', (0, _stringify2.default)(response.data.data));
	                    this.$router.go({ name: 'default' });
	                } else {
	                    alert(response.data.message);
	                }
	            }, function (response) {
	                console.log(response);
	            });
	        }
	    }
	};
	// </script>

/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(9);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },

/***/ 63:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"box box-info pd50\">\n    <div class=\"box-header with-border\">\n        <h3 class=\"box-title\">财务系统用户登录</h3>\n    </div>\n    <form class=\"form-horizontal\">\n        <div class=\"box-body\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-2 control-label\">用户名</label>\n                <div class=\"col-sm-10\">\n                    <input type=\"text\" v-model=\"username\" class=\"form-control\" placeholder=\"请输入用户名\">\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"col-sm-2 control-label\">密码</label>\n                <div class=\"col-sm-10\">\n                    <input type=\"password\" v-model=\"password\" class=\"form-control\" placeholder=\"请输入密码\">\n                </div>\n            </div>\n        </div>\n        <div class=\"box-footer\">\n            <span @click=\"login\" class=\"btn btn-info\">登录</span>\n        </div>\n    </form>\n</div>\n";

/***/ }

});