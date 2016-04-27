webpackJsonp([15],{

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(162)
	__vue_script__ = __webpack_require__(164)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] dev\\js\\views\\SHGL\\limitaccount-management.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(165)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Edgar\\Documents\\fin-front-end\\dev\\js\\views\\SHGL\\limitaccount-management.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 162:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(163);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(59)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./limitaccount-management.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./limitaccount-management.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(58)();
	// imports


	// module
	exports.push([module.id, "\n.limitmanage .validation-error-label{\n    margin-left: 20%;\n}\n.limitmanage .timeerror,.suberror,.suberror1{\n    display: none;\n}\n.limitmanage .suberror,.suberror1{\n    padding-top: 3px;\n}\n.limitmanage  .form-group{\n    text-align: left;\n}\n.limitmanage  .form-group.tc{\n    text-align: center;\n}\n.limitmanage .modal-body .form-control{\n    text-align: left;\n    width:67%;\n    display: inline-block;\n}\n.limitmanage .modal-body label{\n    width:20%;\n    display: inline-block;\n}\n.limitmanage .modal-body label i{\n    color:red;\n}\n.limitmanage  .modal-body .waring{\n    color: red;\n    margin-left: 5px;\n}\n.limitmanage  .modal-body button{\n    width:35%;\n}\n.limitmanage td span{\n    cursor: pointer;\n    color: #3c8dbc;\n}\n.limitmanage td span:hover{\n    opacity: 80;\n}\n.limitmanage .page-bar{\n    margin: 25px auto;\n    text-align: center;\n}\n", ""]);

	// exports


/***/ },

/***/ 164:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <index :title="'额度采购账户列表'"
	//            :ptitle="'商户管理'"
	//            :hname="'business-lists'"
	//            :isshow="'isshow'">
	//         <div class="content limitmanage" slot="content">
	//         <div class="panel panel-flat">
	//             <div class="panel-heading">
	//                 <div>
	//                     <span style="margin:0 20px 10px 0;display: inline-block">商户名：南昌玩聚和他(她)朋友们咖啡馆</span>
	//                     <span style="margin:0 20px 10px 0;display: inline-block">累计总额度：70,000.00</span>
	//                     <span style="margin:0 20px 10px 0;display: inline-block">累计使用：65,461.0</span>
	//                     <span style="margin:0 20px 10px 0;display: inline-block">使用比：93.51%</span>
	//                     <span style="margin:0 20px 10px 0;display: inline-block">剩余额度：4,539.00</span>
	//                 </div>
	//                 <form class="form-inline manage-form">
	//                     <div class="form-group">
	//                         <input type="text" class="form-control" v-model="defaultData.accountNumber" placeholder="账户名">
	//                     </div>
	//                     <div class="form-group">
	//                         <input type="button" class="btn btn-info" @click="checkNew" value="查询">
	//                     </div>
	//                 </form>
	//             </div>
	//             <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
	//                 <div class="datatable-scroll">
	//                     <table id="table1" class="table datatable-selection-single dataTable no-footer">
	//                         <thead>
	//                             <tr role="row">
	//                                 <th>账户ID</th>
	//                                 <th>账户名</th>
	//                                 <th>总额度</th>
	//                                 <th>总本金</th>
	//                                 <th>剩余额度</th>
	//                                 <th>剩余本金</th>
	//                                 <th>当前折扣率</th>
	//                                 <th>首次充值时间 </th>
	//                                 <th>循环次数</th>
	//                                 <th>优先级</th>
	//                                 <th>供货商</th>
	//                                 <th>操作 </th>
	//                                 <th>备注</th>
	//                             </tr>
	//                         </thead>
	//                     <tbody>
	//                         <tr role="row">
	//                             <td>1</td>
	//                             <td>卡说账户</td>
	//                             <td>{{ 400000/100 | currency '' }}</td>
	//                             <td>{{ 400000/100 | currency '' }}</td>
	//                             <td>{{ 400000/100 | currency '' }}</td>
	//                             <td>{{ 400000/100 | currency '' }}</td>
	//                             <td>80%</td>
	//                             <td>2015-06-15 16:34:47</td>
	//                             <td>3</td>
	//                             <td>3</td>
	//                             <td><a href="">江西广播电台</a></td>
	//                             <td><a data-toggle="modal" data-target="#modal_pay" href="javascript:void(0)">充值</a></td>
	//                             <td>餐饮软件置换</td>
	//                         </tr>
	//                     </tbody>
	//                 </table>
	//                 </div>
	//                 <div class="datatable-footer">
	//                     <page :all="pageall"
	//                           :cur.sync="pagecur"
	//                           :page_size.sync="page_size">
	//                     </page>
	//                 </div>
	//             </div>
	//             <div style="padding: 30px;font-size: 16px;text-align: center" v-else>
	//                 未找到您要查询的账户
	//             </div>
	//         </div>
	//             <div id="modal_waring" data-backdrop="static" class="modal fade" style="display: none;">
	//                 <div class="modal-dialog">
	//                     <div class="modal-content">
	//                         <div class="modal-header">
	//                             <button type="button" class="close" data-dismiss="modal">×</button>
	//                             <h5 class="modal-title" v-text="waring"></h5>
	//                         </div>
	//                         <div class="modal-body">
	//                             <div class="form-group tc">
	//                                 <button v-show="waring=='你确认启用该账户？'" type="button" @click="startTrue" class="btn btn-primary">确认</button>
	//                                 <button v-show="waring=='你确认删除该账户？'" type="button" @click="delTrue" class="btn btn-primary">确认</button>
	//                                 <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
	//                             </div>
	//                         </div>
	//                     </div>
	//                 </div>
	//             </div>
	//             <validator name="vali">
	//                 <form novalidate>
	//                     <div id="modal_pay" data-backdrop="static"  class="modal fade" style="display: none;">
	//                         <div class="modal-dialog modal-sm">
	//                             <div class="modal-content">
	//                                 <div class="modal-header">
	//                                     <button type="button" class="close" data-dismiss="modal">×</button>
	//                                     <h5 class="modal-title">充值</h5>
	//                                 </div>
	//                                 <div class="modal-body">
	//                                     <div class="form-group">
	//                                         <label>商户名：</label>
	//                                         <span>南昌玩聚和他(她)朋友们咖啡馆</span>
	//                                     </div>
	//                                     <div class="form-group">
	//                                         <label>额度余额：</label>
	//                                         <span>4,539.00</span>
	//                                     </div>
	//                                     <div class="form-group">
	//                                         <label>本金余额：</label>
	//                                         <span>3,631.20</span>
	//                                     </div>
	//                                     <div class="form-group">
	//                                         <label><i>*</i>额度：</label>
	//                                         <input type="text" class="form-control" id="val1" v-validate:val1="['required']" placeholder="">
	//                                         <span v-if="$vali.val1.required && $vali.val1.dirty" class="validation-error-label">请输入额度</span>
	//                                     </div>
	//                                     <div class="form-group">
	//                                         <label><i>*</i>本金：</label>
	//                                         <input type="text" class="form-control" id="val2" v-validate:val2="['required']" placeholder="">
	//                                         <span v-if="$vali.val2.required && $vali.val2.dirty" class="validation-error-label">请输入简额度</span>
	//                                     </div>
	//                                     <div class="form-group">
	//                                         <label><i>*</i>折扣</label>
	//                                         <input type="text" class="form-control" id="val3" v-validate:val3="['required']">
	//                                         <span v-if="$vali.val3.required && $vali.val3.dirty" class="validation-error-label">请输入折扣</span>
	//                                     </div>
	//                                     <div class="form-group">
	//                                         <label><i>*</i>方式</label>
	//                                         <label><input type="radio" value="one" v-model="payType">
	//                                         现金转账</label>
	//                                         <label><input type="radio" value="two" v-model="payType">
	//                                         资源置换</label>
	//                                     </div>
	//                                     <templete v-show="payType=='one'">
	//                                         <div class="form-group">
	//                                             <label>付款账户：</label>
	//                                             <span>南昌备付金</span>
	//                                         </div>
	//                                         <div class="form-group">
	//                                             <label>收款信息：</label>
	//                                             <p>账户名：魏璇</p>
	//                                             <p>账  号：6214837910896095</p>
	//                                             <p>开户行：招商银行股份有限公司南昌营业部</p>
	//                                             <p>提入行号：308421022022</p>
	//                                         </div>
	//                                     </templete>
	//                                     <div class="form-group" v-else>
	//                                         <label><i>*</i>上传凭证</label>
	//                                         <input type="file">
	//                                     </div>
	//                                     <div class="form-group">
	//                                         <label><i>*</i>类型</label>
	//                                         <label><input type="radio" v-model="zdhf" value="one">
	//                                         循环充值</label>
	//                                         <label><input type="radio" v-model="zdhf" value="two">
	//                                         结算充值</label>
	//                                     </div>
	//                                     <div class="form-group">
	//                                         <label for="tarea" class="w28"><i>*</i>备注：</label>
	//                                         <textarea class="form-control" width="70%" cols="20" rows="3"></textarea>
	//                                     </div>
	//                                     <div class="form-group tc">
	//                                         <button type="button" @click="addBtn" class="btn btn-primary">充值</button>
	//                                     </div>
	//                                     <div class="form-group">
	//                                         <span class="suberror validation-error-label">你的信息未填写完整</span>
	//                                     </div>
	//                                 </div>
	//                             </div>
	//                         </div>
	//                     </div>
	//                 </form>
	//                 </validator>
	//         </div>
	//     </index>
	// </template>
	// <style>
	//     .limitmanage .validation-error-label{
	//         margin-left: 20%;
	//     }
	//     .limitmanage .timeerror,.suberror,.suberror1{
	//         display: none;
	//     }
	//     .limitmanage .suberror,.suberror1{
	//         padding-top: 3px;
	//     }
	//     .limitmanage  .form-group{
	//         text-align: left;
	//     }
	//     .limitmanage  .form-group.tc{
	//         text-align: center;
	//     }
	//     .limitmanage .modal-body .form-control{
	//         text-align: left;
	//         width:67%;
	//         display: inline-block;
	//     }
	//     .limitmanage .modal-body label{
	//         width:20%;
	//         display: inline-block;
	//     }
	//     .limitmanage .modal-body label i{
	//         color:red;
	//     }
	//     .limitmanage  .modal-body .waring{
	//         color: red;
	//         margin-left: 5px;
	//     }
	//     .limitmanage  .modal-body button{
	//         width:35%;
	//     }
	//     .limitmanage td span{
	//         cursor: pointer;
	//         color: #3c8dbc;
	//     }
	//     .limitmanage td span:hover{
	//         opacity: 80;
	//     }
	//     .limitmanage .page-bar{
	//         margin: 25px auto;
	//         text-align: center;
	//     }
	// </style>
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            pagecur: 1,
	            page_size: 15,
	            pageall: 1,
	            loginList: {},
	            defaultData: { "companyId": "", "accountType": "", "accountNumber": "", "pageIndex": 1, "pageSize": 15 },
	            zdlists: [],
	            accountId: '',
	            zdhf: 'one',
	            payType: 'one'
	        };
	    },

	    methods: {
	        getZlists: function getZlists(data) {
	            this.$http.post('./bankaccount/list', data).then(function (response) {
	                // *** 判断请求是否成功如若成功则填充数据到模型
	                response.data.code == 0 ? this.$set('zdlists', response.data.data) : null;
	                response.data.code == 0 ? this.$set('pageall', response.data.total) : null;
	            }, function (response) {
	                console.log(response);
	            });
	        },
	        addUser: function addUser() {
	            this.errorHide();
	            this.relist = {
	                startDate: '', companyId: '', accountType: '', shortName: '', accountName: '', accountNumber: '', bankName: ''
	            }, this.accountId = '';
	            this.addtitle = '添加账户';
	        },
	        initList: function initList() {
	            $(".modal").modal("hide");
	            this.getZlists(this.defaultData);
	        },
	        addBtn: function addBtn() {
	            this.errorHide();
	            if (!this.$vali.valid) {
	                $('.suberror').show();return;
	            }
	            if (this.relist.startDate == '') {
	                $('.timeerror').show();return;
	            }
	            // *** 新增修改保存
	            var data = {
	                "id": this.accountId,
	                "companyId": this.relist.companyId,
	                "shortName": this.relist.shortName,
	                "accountName": this.relist.accountName,
	                "accountNumber": this.relist.accountNumber,
	                "bankName": this.relist.bankName,
	                "accountType": this.relist.accountType,
	                "startDate": this.relist.startDate
	            };
	            this.$http.post('./bankaccount/save', data).then(function (response) {
	                this.initList();
	            }, function (response) {
	                console.log(response);
	            });
	        }
	    },
	    ready: function ready() {
	        !!sessionStorage.getItem('userData') ? this.$set('loginList', JSON.parse(sessionStorage.getItem('userData'))) : null;
	        var vm = this;
	        $('#modal_fzr,#modal_add').on('show.bs.modal', function () {
	            this.fire = false;
	            vm.$resetValidation();
	        });
	    },
	    components: {},
	    watch: {
	        pagecur: function pagecur() {
	            this.defaultData.pageIndex = this.pagecur;
	            this.initList();
	        },
	        page_size: function page_size() {
	            this.defaultData.pageSize = this.page_size;
	            this.initList();
	        }
	    },
	    validators: {
	        numeric: function numeric(val) {
	            return (/^[-+]?[0-9]+$/.test(val)
	            );
	        }
	    }
	};
	// </script>

/***/ },

/***/ 165:
/***/ function(module, exports) {

	module.exports = "\n<index :title=\"'额度采购账户列表'\"\n       :ptitle=\"'商户管理'\"\n       :hname=\"'business-lists'\"\n       :isshow=\"'isshow'\">\n    <div class=\"content limitmanage\" slot=\"content\">\n    <div class=\"panel panel-flat\">\n        <div class=\"panel-heading\">\n            <div>\n                <span style=\"margin:0 20px 10px 0;display: inline-block\">商户名：南昌玩聚和他(她)朋友们咖啡馆</span>\n                <span style=\"margin:0 20px 10px 0;display: inline-block\">累计总额度：70,000.00</span>\n                <span style=\"margin:0 20px 10px 0;display: inline-block\">累计使用：65,461.0</span>\n                <span style=\"margin:0 20px 10px 0;display: inline-block\">使用比：93.51%</span>\n                <span style=\"margin:0 20px 10px 0;display: inline-block\">剩余额度：4,539.00</span>\n            </div>\n            <form class=\"form-inline manage-form\">\n                <div class=\"form-group\">\n                    <input type=\"text\" class=\"form-control\" v-model=\"defaultData.accountNumber\" placeholder=\"账户名\">\n                </div>\n                <div class=\"form-group\">\n                    <input type=\"button\" class=\"btn btn-info\" @click=\"checkNew\" value=\"查询\">\n                </div>\n            </form>\n        </div>\n        <div id=\"DataTables_Table_0_wrapper\" class=\"dataTables_wrapper no-footer\">\n            <div class=\"datatable-scroll\">\n                <table id=\"table1\" class=\"table datatable-selection-single dataTable no-footer\">\n                    <thead>\n                        <tr role=\"row\">\n                            <th>账户ID</th>\n                            <th>账户名</th>\n                            <th>总额度</th>\n                            <th>总本金</th>\n                            <th>剩余额度</th>\n                            <th>剩余本金</th>\n                            <th>当前折扣率</th>\n                            <th>首次充值时间 </th>\n                            <th>循环次数</th>\n                            <th>优先级</th>\n                            <th>供货商</th>\n                            <th>操作 </th>\n                            <th>备注</th>\n                        </tr>\n                    </thead>\n                <tbody>\n                    <tr role=\"row\">\n                        <td>1</td>\n                        <td>卡说账户</td>\n                        <td>{{ 400000/100 | currency '' }}</td>\n                        <td>{{ 400000/100 | currency '' }}</td>\n                        <td>{{ 400000/100 | currency '' }}</td>\n                        <td>{{ 400000/100 | currency '' }}</td>\n                        <td>80%</td>\n                        <td>2015-06-15 16:34:47</td>\n                        <td>3</td>\n                        <td>3</td>\n                        <td><a href=\"\">江西广播电台</a></td>\n                        <td><a data-toggle=\"modal\" data-target=\"#modal_pay\" href=\"javascript:void(0)\">充值</a></td>\n                        <td>餐饮软件置换</td>\n                    </tr>\n                </tbody>\n            </table>\n            </div>\n            <div class=\"datatable-footer\">\n                <page :all=\"pageall\"\n                      :cur.sync=\"pagecur\"\n                      :page_size.sync=\"page_size\">\n                </page>\n            </div>\n        </div>\n        <div style=\"padding: 30px;font-size: 16px;text-align: center\" v-else>\n            未找到您要查询的账户\n        </div>\n    </div>\n        <div id=\"modal_waring\" data-backdrop=\"static\" class=\"modal fade\" style=\"display: none;\">\n            <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n                        <h5 class=\"modal-title\" v-text=\"waring\"></h5>\n                    </div>\n                    <div class=\"modal-body\">\n                        <div class=\"form-group tc\">\n                            <button v-show=\"waring=='你确认启用该账户？'\" type=\"button\" @click=\"startTrue\" class=\"btn btn-primary\">确认</button>\n                            <button v-show=\"waring=='你确认删除该账户？'\" type=\"button\" @click=\"delTrue\" class=\"btn btn-primary\">确认</button>\n                            <button type=\"button\" class=\"btn btn-gray\" data-dismiss=\"modal\">取消</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <validator name=\"vali\">\n            <form novalidate>\n                <div id=\"modal_pay\" data-backdrop=\"static\"  class=\"modal fade\" style=\"display: none;\">\n                    <div class=\"modal-dialog modal-sm\">\n                        <div class=\"modal-content\">\n                            <div class=\"modal-header\">\n                                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n                                <h5 class=\"modal-title\">充值</h5>\n                            </div>\n                            <div class=\"modal-body\">\n                                <div class=\"form-group\">\n                                    <label>商户名：</label>\n                                    <span>南昌玩聚和他(她)朋友们咖啡馆</span>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label>额度余额：</label>\n                                    <span>4,539.00</span>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label>本金余额：</label>\n                                    <span>3,631.20</span>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label><i>*</i>额度：</label>\n                                    <input type=\"text\" class=\"form-control\" id=\"val1\" v-validate:val1=\"['required']\" placeholder=\"\">\n                                    <span v-if=\"$vali.val1.required && $vali.val1.dirty\" class=\"validation-error-label\">请输入额度</span>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label><i>*</i>本金：</label>\n                                    <input type=\"text\" class=\"form-control\" id=\"val2\" v-validate:val2=\"['required']\" placeholder=\"\">\n                                    <span v-if=\"$vali.val2.required && $vali.val2.dirty\" class=\"validation-error-label\">请输入简额度</span>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label><i>*</i>折扣</label>\n                                    <input type=\"text\" class=\"form-control\" id=\"val3\" v-validate:val3=\"['required']\">\n                                    <span v-if=\"$vali.val3.required && $vali.val3.dirty\" class=\"validation-error-label\">请输入折扣</span>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label><i>*</i>方式</label>\n                                    <label><input type=\"radio\" value=\"one\" v-model=\"payType\">\n                                    现金转账</label>\n                                    <label><input type=\"radio\" value=\"two\" v-model=\"payType\">\n                                    资源置换</label>\n                                </div>\n                                <templete v-show=\"payType=='one'\">\n                                    <div class=\"form-group\">\n                                        <label>付款账户：</label>\n                                        <span>南昌备付金</span>\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <label>收款信息：</label>\n                                        <p>账户名：魏璇</p>\n                                        <p>账  号：6214837910896095</p>\n                                        <p>开户行：招商银行股份有限公司南昌营业部</p>\n                                        <p>提入行号：308421022022</p>\n                                    </div>\n                                </templete>\n                                <div class=\"form-group\" v-else>\n                                    <label><i>*</i>上传凭证</label>\n                                    <input type=\"file\">\n                                </div>\n                                <div class=\"form-group\">\n                                    <label><i>*</i>类型</label>\n                                    <label><input type=\"radio\" v-model=\"zdhf\" value=\"one\">\n                                    循环充值</label>\n                                    <label><input type=\"radio\" v-model=\"zdhf\" value=\"two\">\n                                    结算充值</label>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"tarea\" class=\"w28\"><i>*</i>备注：</label>\n                                    <textarea class=\"form-control\" width=\"70%\" cols=\"20\" rows=\"3\"></textarea>\n                                </div>\n                                <div class=\"form-group tc\">\n                                    <button type=\"button\" @click=\"addBtn\" class=\"btn btn-primary\">充值</button>\n                                </div>\n                                <div class=\"form-group\">\n                                    <span class=\"suberror validation-error-label\">你的信息未填写完整</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </form>\n            </validator>\n    </div>\n</index>\n";

/***/ }

});