<template>
    <index :title="'预付款商户'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :isshow="'isshow'">
        <div class="content prepayment-lists" slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" data-toggle="modal" @click="showMerchants()" data-ksa="advance_payment_merchant_manage.add">添加</a>
                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form">
                                <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="商户ID" v-limitnumber="checkForm.merchantOperationID">

                                <input type="text" class="form-control" v-model="checkForm.merchantName" placeholder="商户名">

                                <select class="form-control" v-model="checkForm.subCompanyID" @change="getCity(checkForm.subCompanyID)">
                                    <option value="">全部分公司</option>
                                    <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                                </select>

                                <select class="form-control" v-model="checkForm.cityID">
                                    <option value="">全部城市</option>
                                    <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                                </select>

                                <select class="form-control" v-model="checkForm.status">
                                    <option value="">账户状态</option>
                                    <option value="0">停用</option>
                                    <option value="1">正常</option>
                                    <option v-for="(index,n) in typelists" v-text="n.value" :value="n.accountType"></option>
                                </select>
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="query" data-ksa="advance_payment_merchant_manage.search" style="margin-left: -21px;">查询</a>
                    </div>
                </div>

                <div v-show="!!prepaymentList.length" id="DataTables_Table_0_wrapper"
                     class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>商户ID</th>
                                <th>商户名称</th>
                                <th>分公司</th>
                                <th>城市</th>
                                <th>余额</th>
                                <th>状态</th>
                                <th>操作</th>
                                <th>开通时间</th>
                                <th>联系人</th>
                                <th>电话</th>
                                <th>工作人员</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(index,prepayment) in prepaymentList" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{prepayment.merchantOperationID}}</td>
                                <td>{{prepayment.merchantName}}</td>
                                <td>{{prepayment.subCompanyName}}</td>
                                <td>{{prepayment.cityName}}</td>
                                <td>
                                    {{prepayment.balanceAmount/100 | currency ''}}
                                </td>
                                <td>
                                    <template v-if="prepayment.status==0">
                                        <span style="color:rgb(255,​ 0,​ 0);">停用</span>
                                    </template>
                                    <template v-if="prepayment.status==1">
                                        <span style="color:rgb(0,​ 128,​ 0);">正常</span>
                                    </template>
                                </td>
                                <td>
                                    <a data-ksa="advance_payment_merchant_manage.recharge" @click="getRechargeInfo(prepayment.id)"
                                       v-if="prepayment.status==1">预付</a>
                                    <a v-link="{'name':'prepayment-store',params:{'id':prepayment.id,'storeMerchantName':prepayment.merchantName}}"
                                       v-if="prepayment.status==1" data-ksa="advance_payment_merchant_store_manage.search">门店</a>
                                    <a v-link=" {'name':'prepayment-info',params:{'id':prepayment.id}}" data-ksa="advance_payment_account_manage.search">明细</a>
                                    <a data-ksa="advance_payment_merchant_manage.enable_disable" 
                                       @click="show_waring(prepayment.id,0)" v-if="prepayment.status==0">启用</a>
                                    <a data-ksa="advance_payment_merchant_manage.enable_disable" 
                                       @click="show_waring(prepayment.id,1)" v-if="prepayment.status==1">停用</a>
                                </td>
                                <td>{{prepayment.startTime | datetime}}</td>
                                <td>{{prepayment.connectionPerson}}</td>
                                <td>{{prepayment.connectionPhone}}</td>
                                <td>{{prepayment.servicePerson}}</td>
                            </tr>
                            </tbody>
                            <tr role="row">
                                <th></th>
                                <th></th>
                                <th>合计：</th>
                                <th></th>
                                <th><B>{{total/100 | currency ''}}</B></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </table>
                    </div>

                    <div class="datatable-bottom">
                       <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" >Excel导出</a>
                       </div>

                       <div class="right">
                            <page :all="pageall"
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                       </div>
                    </div>
                </div>

                <div v-else style="padding: 30px;font-size: 16px;text-align: center">
                    未查询到预付款商户信息！
                </div>
                
                <!-- 添加商户 -->
                <content-dialog
                        :show.sync="modal_prepayment_info" :is-button="false" :type.sync="'infos'"
                        :title.sync="'添加商户'"  
                >
                        <div class="modal-body" style="width: 900px;">
                            <form class="form-inline manage-form">
                                    <input type="text" class="form-control"
                                           v-model="merchantInfo.merchantOperationID" placeholder="商户ID" v-limitnumber="merchantInfo.merchantOperationID">
                                    <input type="text" class="form-control" v-model="merchantInfo.merchantName"
                                           placeholder="商户名">
                                    <select class="form-control" v-model="merchantInfo.companyId"
                                            @change="getshCity(merchantInfo.companyId)">
                                        <option value="">全部分公司</option>
                                        <option v-for="n in subcompanyList" v-text="n.name"
                                                :value="n.subCompanyID"></option>
                                    </select>
                                    <select class="form-control" v-model="merchantInfo.cityId">
                                        <option value="">全部城市
                                        </option>
                                        <option v-for="n in shCity" v-text="n.name" :value="n.cityID"></option>
                                    </select>
                                    <input type="button" class="btn btn-info" @click="getMerchantList"
                                           value="查询">
                            </form>

                            <div class="dataTables_wrapper no-footer addbottom">
                                <div style="text-indent: 68%">已选择：</div>
                                <div class="col-md-7" style="height:300px;overflow: auto;border: 1px solid #ccc;">
                                    <table v-if="merchantList.length>0"
                                           class="table datatable-selection-single dataTable no-footer">
                                        <thead>
                                        <tr role="row">
                                            <th><input id="ckAll" type="checkbox" @click="checkAll($event)"/>全选</th>
                                            <th>分公司</th>
                                            <th>城市</th>
                                            <th>商户名</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(index,merchant) in merchantList">
                                            <td>
                                                <input type="checkbox" :value="merchant.merchantID"
                                                       :id="merchant.merchantID" name="ckbox"/>
                                                {{index+1}}
                                            </td>
                                            <td>{{merchant.subCompanyName}}</td>
                                            <td>{{merchant.cityName}}</td>
                                            <td>{{merchant.merchantName}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <span v-if="!merchantList.length>0 && firstAdd">
                                        未查询到商户数据！
                                    </span>
                                </div>
                                <div class="col-md-2">
                                    <input type="button" class="btn btn-info" @click="addTrue($event)" value="添加">
                                    <input type="button" class="btn btn-info" @click="delTrue($event)" value="删除">
                                    <input type="button" class="btn btn-info" @click="submit()" value="确认">
                                </div>
                                <div class="col-md-4">
                                    <ul id="IDS"></ul>
                                </div>
                            </div>
                        </div>
                </content-dialog>

                <!-- 预付 -->
                <content-dialog
                        :show.sync="modal_prepayment_recharge" :is-cancel="true" :type.sync="'infos'"
                        :title.sync="'预付充值'" @kok="subApplyAdvancePay" @kcancel="modal_prepayment_recharge = false"  
                >
                    <validator name="vali">
                        <div class="modal-body">
                            <div class="form-group">
                                <label>商户名：</label>{{applyAdvancePay.merchantName}}
                            </div>
                            <div class="form-group">
                                <label>余额：</label><span style="color:red">{{applyAdvancePay.balanceAmount/100 | currency ''}}</span>
                            </div>
                            <div class="form-group">
                                <label><i style="color:red">*</i>金额：</label>
                                <input v-validate:val1="['required']" type="text" class="form-control"
                                       name="advancePaymentAmount"
                                       v-model="applyAdvancePay.advancePaymentAmount" v-limitprice="applyAdvancePay.advancePaymentAmount"/>
                            </div>
                            <div class="form-group">
                                <label style="position: relative;top: 0px;"><i style="color:red">*</i>备注：</label>
                            <textarea v-validate:val2="['required']" class="form-control" maxlength="15" name="remarks"
                                      v-model="applyAdvancePay.remarks" placeholder="最多15字符"></textarea>
                            </div>
                            <div class="form-group">
                                <div><label>付款账户：</label>{{applyAdvancePay.payAccount}}</div>
                            </div>
                            <div class="form-group">
                                <label>收款信息：</label>
                                <br/>
                                <div class="collectionAccount-bgcolor">
                                    <label>账户名：</label> {{applyAdvancePay.collectionAccountName}}<br/>
                                    <label>账号：</label>{{applyAdvancePay.collectionAccountNumber}}<br/>
                                    <label>开户行：</label>{{applyAdvancePay.collectionBankName}}<br/>
                                    <label>提入行号：</label>{{applyAdvancePay.collectionBankNumber}}
                                </div>
                            </div>
                            <div class="form-group tc">
                                <span v-show="$vali.invalid&&saveerror" class="validation-error-label">您的信息未填写完整</span>
                            </div>
                        </div>
                    </validator>
                </content-dialog>

                <!-- 启用/停用 -->
                <content-dialog
                        :show.sync="modal_waring" :is-cancel="true" :type.sync="'infos'"
                        :title.sync="''"   @kok="change_status" @kcancel="modal_waring=false" 
                >
                        <div class="modal-body">
                            <button type="button" class="close" >×</button>
                            <h5 v-if="isEnable==0" class="modal-title">你确定启用该账户？</h5>
                            <h5 v-if="isEnable==1" class="modal-title">你确定停用该账户？</h5>
                        </div>
                </content-dialog>

            </div>
        </div>
    </index>
</template>

<script>
    import model from '../../ajax/BusinessManagement/prepayment_model'
    export default{
        data(){
            this.model = model(this)
            return {
                modal_prepayment_info: false,
                modal_prepayment_recharge: false,
                modal_waring: false,
                pageall: 1,
                checkForm:{
                    subCompanyID: "",
                    cityID: "",
                    merchantOperationID: "",
                    merchantName: "",
                    status: "",
                    pageIndex: 1,
                    pageSize: 10,
                },
                subcompanyList: [],
                cityList: [],
                shCity: [],
                prepaymentList: [],
                merchantList: [],
                addId: [],
                merchantInfo: {
                    companyId: "",
                    cityId: "",
                    merchantOperationID: "",
                    merchantName: "",
                    isAdvancePayment: "0",
                    isStore: "0",
                },
                applyAdvancePay: {
                    merchantName: "",//商户名
                    balanceAmount: "",//余额
                    advancePaymentMerchantId: "",//    预付款商户ID Integer
                    collectionBankName: "",//  开户行 String
                    collectionBankNumber: "",//    提入行号    String
                    subCompanyID: "",//    分公司ID   Integer
                    merchantID: "",//  商户ID    Integer
                    payAccount: "",//  付款账户    String
                    collectionAccountName: "",//   收款账户    String
                    collectionAccountNumber: "",// 收款账号    String
                    advancePaymentAmount: "",//    预付金额    Integer
                    remarks: "",// 备注  String
                    merchantAccountID: ""//商户账户ID   Integer
                },
                entity: {},
                count_balanceAmount: 0,
                isEnable: 0,
                _id: '',
                total: [],
                saveerror: false,
                firstAdd: false
            }
        },
        methods: {
            initList(){
                this.modal_prepayment_info=false;
                this.modal_prepayment_recharge=false;
                this.modal_waring=false;
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
            //获取预付款商户数据
            getPrepaymentList(data) {
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.prepayment_lists(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code == 0) ? this.$set('prepaymentList', response.data.data) : null;
                            (response.data.code == 0) ? this.$set('pageall', response.data.total) : null;
                        });
                this.model.total(data)
                        .then((res) => {
                            (res.data.code == 0) ? this.$set('total', res.data.data) : null;
                        });
            },
            //获取预付充值数据
            getRechargeInfo(prepaymentId) {
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.advancePaymentMerchant(prepaymentId)
                        .then((response)=>{
                            if (response.data.code == 0) {
                                this.$set('entity', response.data.data);
                                this.applyAdvancePay.advancePaymentMerchantId = this.entity.id;
                                this.applyAdvancePay.merchantName = this.entity.merchantName;//1
                                this.applyAdvancePay.balanceAmount = this.entity.balanceAmount;//2
                                this.applyAdvancePay.payAccount = this.entity.payAccount;//  付款账户    String  --5
                                this.applyAdvancePay.collectionAccountName = this.entity.collectionAccountName;//   收款账户    String   --6-1
                                this.applyAdvancePay.collectionAccountNumber = this.entity.collectionAccountNumber;// 收款账号    String   --6-2
                                this.applyAdvancePay.collectionBankName = this.entity.collectionBankName;//  开户行 String            --6-3
                                this.applyAdvancePay.collectionBankNumber = this.entity.collectionBankNumber;//    提入行号    String    --6-4
                                this.applyAdvancePay.advancePaymentAmount = "";//    预付金额    Integer   --3
                                this.applyAdvancePay.remarks = "";// 备注  String           --4
                                //判断是否有银行卡账号
                                if (this.applyAdvancePay.collectionAccountNumber == null) {
                                    dialogs('error', '该商户未设置划款账户，无法充值！');
                                    return false;
                                } else {
                                    //显示窗口
                                    this.saveerror = false;
                                    this.modal_prepayment_recharge = true;
                                }
                            }
                        });
            },
            //获取商户数据
            getMerchantList(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.firstAdd=true;
                this.$common_model.getmerchant_list(this.merchantInfo)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code == 0) ? this.$set('merchantList', response.data.data) : null;
                        });
            },
            //获取分公司数据
            getSubcompany(){
                this.$common_model.getcompany()
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code == 0) ? this.$set('subcompanyList', response.data.data) : null;
                        });
            },
            //获取城市数据
            getCity(_id) {
                this.cityID = '';
                let data = {
                    'subCompanyID': _id
                }
                this.$common_model.getcity(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code == 0) ? this.$set('cityList', response.data.data) : null;
                        });
            },
            getshCity(_id) {
                this.merchantInfo.cityId = '';
                let data = {
                    'subCompanyID': _id
                }
                this.$common_model.getcity(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code == 0) ? this.$set('shCity', response.data.data) : null;
                        });
            },
            checkAll(ck) {
                if (ck.target.checked) {
                    $("input[name='ckbox']").prop({'checked': true});
                } else {
                    $("input[name='ckbox']").prop({'checked': false});
                }
            },
            //显示选择商户窗口
            showMerchants() {
                this.merchantInfo.companyId = "", this.merchantInfo.cityId = "", this.merchantInfo.merchantOperationID = "", this.merchantInfo.merchantName = "", this.queryForMerchantList();
                this.firstAdd=false;
                this.merchantList=[];
            },
            queryForMerchantList() {
                //设置全选属性
                this.clear();
                this.getshCity();
                this.modal_prepayment_info = true;
            },
            subApplyAdvancePay() {
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.saveerror = true;
                if (this.$vali.invalid && this.saveerror)return;
                let entity = {
                    advancePaymentMerchantID: this.applyAdvancePay.advancePaymentMerchantId,
                    advancePaymentAmount: accMul(this.applyAdvancePay.advancePaymentAmount,100),
                    remarks: this.applyAdvancePay.remarks,
                }
                this.model.applyAdvancePay(entity)
                        .then((response)=>{
                            // *** 判断请求是否成功如若
                            if (response.data.code == 0) {
                                dialogs('success','提交成功！');
                                this.query();
                            }
                        });
                //关闭弹出层
                this.modal_prepayment_recharge = false;
            },
            //清除
            clear() {
                this.addId = [];
                $('.col-md-7 tr input[type="checkbox"]').prop('checked', false);
                $('.addbottom .col-md-4').children('ul').html('');
            },
            appendLi(a) {

                let _tr = $("input[value='" + a + "']").closest('tr');
                let _ul = $('.addbottom .col-md-4').children('ul');
                _ul.append('<li value="' + a + '">' + _tr.children('td:last').html() + '</li>');
                _tr.hide();
            },
            addTrue(e) {
                this.addId = Array.from($(".col-md-7 td input[type='checkbox']:checked"), i => i.value
                )
                ;
                for (let i = 0; i < this.addId.length; i++) {
                    this.appendLi(this.addId[i]);
                }
                $('.col-md-7 td input[type="checkbox"]').prop('checked', false);
                this.addId = [];
            },
            delTrue(e) {
                let _ul = $(e.target).parent('.col-md-2').next('.col-md-4').children('ul'),
                        _table = $(e.target).parent('.col-md-2').prev('.col-md-7').children('table').find('tr:hidden'),
                        _li = _ul.find('.check-li');
                for (let i = 0; i < _li.length; i++) {
                    _table.eq(_li.eq(i).index()).show();
                }
                _li.remove();
            },
            submit(e) {
                if(sessionStorage.getItem('isHttpin')==1)return;
                let _li = $("#IDS").children('li');
                if (!_li.length > 0)return;
                let data = {'merchantIDs': Array.from(_li, i => i.getAttribute('value')
                )
            }
                this.model.insertBatch(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若
                            if (response.data.code == 0) {
                                this.query();
                                dialogs();
                            }
                        });
                //关闭弹出层
                //$(".modal").modal("hide");
                this.modal_prepayment_info = false;

            },
            query() {
                //$('.modal').modal('hide');
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getPrepaymentList(this.checkForm);
            },
            show_waring(_id, status){
                this._id = _id;
                this.isEnable = status;
                this.modal_waring = true;
            },
            change_status(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                let data = {
                    'id': this._id,
                    'status': this.isEnable
                }
                this.model.status(data)
                        .then((res) => {
                            if(res.data.code == 0 && this.isEnable == 0)
                                {
                                    this.query()
                                    dialogs('success', '已启用！')
                                    this.modal_waring = false;
                                }
                            else if (res.data.code == 0 && this.isEnable == 1) {
                                    this.query()
                                    dialogs('success', '已停用！')
                                    this.modal_waring = false;
                            }
                        })
            }
        },
        ready() {
            this.getSubcompany();
            this.getCity();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.query();
        },
        watch: {
            'checkForm.pageSize+checkForm.pageIndex'(){
                this.query();
            }
        }
    }
</script>