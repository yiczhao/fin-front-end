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
	//     <div class="login-container">
	//         <div class="page-container" style="min-height:907px">
	//         <!-- Page content -->
	//         <div class="page-content">
	//             <!-- Main content -->
	//             <div class="content-wrapper">
	//                 <!-- Content area -->
	//                 <div class="content">
	//                     <!-- Simple login form -->
	//                     <form action="index.html" class="form-validate">
	//                         <div class="panel panel-body login-form">
	//                             <div class="text-center">
	//                                 <div class="icon-object border-slate-300 text-slate-300"><i class="icon-reading"></i></div>
	//                                 <h5 class="content-group">财务管理系统<small class="display-block">登录</small></h5>
	//                             </div>
	//                             <div class="form-group has-feedback has-feedback-left">
	//                                 <input @keyup.enter="login" type="text" class="form-control" v-model="username" placeholder="用户名">
	//                                 <div class="form-control-feedback">
	//                                     <i class="icon-user text-muted"></i>
	//                                 </div>
	//                                 <label v-show="usershow" class="validation-error-label" v-text="usererror"></label>
	//                             </div>
	//                             <div class="form-group has-feedback has-feedback-left">
	//                                 <input @keyup.enter="login" type="password" class="form-control" name="password" v-model="password" placeholder="密码">
	//                                 <div class="form-control-feedback">
	//                                     <i class="icon-lock2 text-muted"></i>
	//                                 </div>
	//                                 <label v-show="passshow" class="validation-error-label" v-text="passerror"></label>
	//                             </div>
	//                             <div class="form-group">
	//                                 <span @click="login" class="btn btn-primary btn-block">登录 <i class="icon-circle-right2 position-right"></i></span>
	//                             </div>
	//                         </div>
	//                     </form>
	//                     <!-- /simple login form -->
	//                     <!-- Footer -->
	//                     <!-- /footer -->
	//                 </div>
	//                 <!-- /content area -->
	//             </div>
	//             <!-- /main content -->
	//         </div>
	//         <!-- /page content -->
	//     </div>
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
	            username: '',
	            password: '',
	            usererror: '',
	            passerror: '',
	            usershow: false,
	            passshow: false
	        };
	    },

	    components: {},
	    methods: {
	        login: function login() {
	            if (this.username == '') {
	                this.usererror = '请输入用户名';this.usershow = true;return;
	            }
	            if (this.password == '') {
	                this.passerror = '请输入密码';this.passshow = true;return;
	            }
	            if (this.usershow || this.passshow) {
	                return false;
	            }
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
	    },
	    watch: {
	        username: function username() {
	            if (this.username == '') {
	                this.usererror = '请输入用户名';this.usershow = true;
	            } else {
	                this.usererror = '';this.usershow = false;
	            }
	        },
	        password: function password() {
	            if (this.password == '') {
	                this.passerror = '请输入密码';this.passshow = true;
	            } else {
	                this.passerror = '';this.passshow = false;
	            }
	        }
	    },
	    ready: function ready() {}
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

	module.exports = "\n<div class=\"login-container\">\n    <div class=\"page-container\" style=\"min-height:907px\">\n    <!-- Page content -->\n    <div class=\"page-content\">\n        <!-- Main content -->\n        <div class=\"content-wrapper\">\n            <!-- Content area -->\n            <div class=\"content\">\n                <!-- Simple login form -->\n                <form action=\"index.html\" class=\"form-validate\">\n                    <div class=\"panel panel-body login-form\">\n                        <div class=\"text-center\">\n                            <div class=\"icon-object border-slate-300 text-slate-300\"><i class=\"icon-reading\"></i></div>\n                            <h5 class=\"content-group\">财务管理系统<small class=\"display-block\">登录</small></h5>\n                        </div>\n                        <div class=\"form-group has-feedback has-feedback-left\">\n                            <input @keyup.enter=\"login\" type=\"text\" class=\"form-control\" v-model=\"username\" placeholder=\"用户名\">\n                            <div class=\"form-control-feedback\">\n                                <i class=\"icon-user text-muted\"></i>\n                            </div>\n                            <label v-show=\"usershow\" class=\"validation-error-label\" v-text=\"usererror\"></label>\n                        </div>\n                        <div class=\"form-group has-feedback has-feedback-left\">\n                            <input @keyup.enter=\"login\" type=\"password\" class=\"form-control\" name=\"password\" v-model=\"password\" placeholder=\"密码\">\n                            <div class=\"form-control-feedback\">\n                                <i class=\"icon-lock2 text-muted\"></i>\n                            </div>\n                            <label v-show=\"passshow\" class=\"validation-error-label\" v-text=\"passerror\"></label>\n                        </div>\n                        <div class=\"form-group\">\n                            <span @click=\"login\" class=\"btn btn-primary btn-block\">登录 <i class=\"icon-circle-right2 position-right\"></i></span>\n                        </div>\n                    </div>\n                </form>\n                <!-- /simple login form -->\n                <!-- Footer -->\n                <!-- /footer -->\n            </div>\n            <!-- /content area -->\n        </div>\n        <!-- /main content -->\n    </div>\n    <!-- /page content -->\n</div>\n</div>\n";

/***/ }

});