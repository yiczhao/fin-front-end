<template>
    <index :title="'预付款账户明细'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :p2title="'预付款商户'"
           :h2name="'prepayment-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-left" style="width:220px">
                        <a data-toggle="modal" data-target="#modal_add" class="btn btn-add add-top"
                        @click="getRechargeInfo(defaultData.advancePaymentMerchantID)" data-ksa="advance_payment_merchant_manage.recharge">预付充值</a>
                        <a class="btn btn-add add-top" data-ksa="advance_payment_merchant_manage.recharge" style="margin-right:0px;" @click="adjustBalance">余额校正</a>
                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="defaultData.dateS" @change="getTime">
                                <option value="0">昨天</option>
                                <option value="1">最近一周</option>
                                <option value="2">最近一个月</option>
                                <option value="3">最近三个月</option>
                                <option value="4">自定义时间</option>
                            </select>

                            <div  v-show="defaultData.dateS==4" class="inline">
                                <datepicker :readonly="true" :value.sync="defaultData.startDate"
                                            format="YYYY-MM-DD"></datepicker>
                                至
                                <datepicker :readonly="true" :value.sync="defaultData.endDate"
                                            format="YYYY-MM-DD"></datepicker>
                            </div>

                        <input type="text" class="form-control" v-model="defaultData.orderNumber" placeholder="订单号" v-limitnumber="defaultData.orderNumber">

                        <input type="text" class="form-control" v-model="defaultData.merchantName"
                               placeholder="商户名">

                        <select class="form-control" v-model="defaultData.status">
                            <option value="">请选择状态</option>
                            <option value="7">等待复核</option>
                            <option value="8">复核不通过</option>
                            <option value="2">等待划付</option>
                            <option value="3">转账中</option>
                            <option value="4">等待对账</option>
                            <option value="5">对账成功</option>
                            <option value="6">划付失败</option>
                            <option value="0">已关闭</option>
                        </select>

                        <input type="text" class="form-control" v-model="defaultData.remarks" placeholder="备注">
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="checkNew" data-ksa="advance_payment_account_manage.search">查询</a>
                    </div>
                </div>

                <div v-show="!!zdlists.length" v-show="!!zdlists.length" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer"
                     v-cloak>
                    <div class="datatable-header" v-if="!!blanceList">
                        <span>账户名：{{blanceList.merchantName}}</span>
                        <span>账户余额：{{blanceList.balanceAmount/100 | currency ''}}元</span>
                    </div>

                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>订单号</th>
                                <th>商户名称</th>
                                <th>收入</th>
                                <th>支出</th>
                                <th>状态</th>
                                <th>交易时间</th>
                                <th>操作</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.orderNumber}}</td>
                                <td>{{trlist.merchantName}}</td>
                                <td>
                                    <template v-if="trlist.payType==2">-</template>
                                    {{trlist.incomeAmount/100 | currency ''}}
                                </td>
                                <td>
                                    <template v-if="trlist.payType==2">-</template>
                                    {{trlist.payoutAmount/100 | currency ''}}
                                </td>
                                <td>
                                    <template v-if="trlist.status==0">已关闭</template>
                                    <template v-if="trlist.status==1">等待审核</template>
                                    <template v-if="trlist.status==2">等待划付</template>
                                    <template v-if="trlist.status==3">转账中</template>
                                    <template v-if="trlist.status==4">等待对账</template>
                                    <template v-if="trlist.status==5">对账成功</template>
                                    <template v-if="trlist.status==6">划付失败</template>
                                    <template v-if="trlist.status==7">等待复核</template>
                                    <template v-if="trlist.status==8">复核不通过</template>
                                </td>
                                <td>{{trlist.tradeTime | datetime}}</td>
                                <td v-if="trlist.orderNumber!=null">
                                    <template v-if="trlist.status==7||trlist.status==8">
                                        <a v-link="{'name':'pay-recheck',params:{'recheckId':trlist.payRecheckID}}">查看</a>
                                    </template>
                                    <template v-else>
                                        <a data-ksa="reserve_cash_order_manage.search" v-link="{'name':'payment-details',params:{'reserveCashOrderNumber':trlist.orderNumber,'payType':2}}"
                                           v-if="trlist.purpose!=6&&trlist.purpose!=4">查看</a>
                                        <a data-ksa="reserve_cash_order_manage.search" v-link="{'name':'payment-details',params:{'reserveCashOrderNumber':trlist.orderNumber,'payType':1}}"
                                           v-if="trlist.purpose!=6&&trlist.purpose==4">查看</a>
                                    </template>
                                </td>
                                <td v-else></td>
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>合计：</td>
                                <td>{{total.incomeAmount/100| currency '' }}</td>
                                <td>{{total.payoutAmount/100| currency '' }}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">

                       <div class="right">
                            <page :all="pageall"
                                  :cur.sync="defaultData.pageIndex"
                                  :page_size.sync="defaultData.pageSize">
                            </page>
                       </div>
                    </div>
                </div>

                <div class="no-list" v-else>
                    未找到数据
                </div>
            </div>

            <content-dialog
                    :show.sync="adjustBalance_modal" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="'余额校正'" @kok="adjustBalanceTrue" @kcancel="adjustBalance_modal = false"
            >
                <div class="modal-body">
                    <div class="form-group">
                        <label>商户名：</label>{{blanceList.merchantName}}
                    </div>
                    <div class="form-group">
                        <label>余额：</label><span>{{blanceList.balanceAmount/100 | currency ''}}</span>
                    </div>
                    <div class="form-group">
                        <label><i style="color:red">*</i>金额：</label>
                        <input type="text" class="form-control" v-model="adjustBalanceData.amount"  v-limitprice="adjustBalanceData.amount"  @blur="getadjustBalanceAmout"/>
                    </div>
                    <div class="form-group">
                        <label>矫正后金额：</label><span>{{adjustBalanceData.adjustBalanceAmout | currency ''}}</span>
                    </div>
                    <div class="form-group">
                        <label style="position: relative;top: -40px;"><i style="color:red">*</i>备注：</label>
                        <textarea class="form-control" v-model="adjustBalanceData.remarks"></textarea>
                    </div>
                </div>
            </content-dialog>

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
                                <input v-validate:val1="['required']" type="text" class="form-control" name="advancePaymentAmount"
                                       v-model="applyAdvancePay.advancePaymentAmount"  v-limitprice="applyAdvancePay.advancePaymentAmount"/>
                            </div>
                            <div class="form-group">
                                <label style="position: relative;top: -40px;"><i style="color:red">*</i>备注：</label>
                                    <textarea v-validate:val2="['required']" class="form-control" name="remarks"
                                              v-model="applyAdvancePay.remarks"></textarea>
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
        </div>
    </index>
</template>
<style lang="sass" scoped>
    .form-group {
        text-align: left;
    }

    .form-group.tc {
        text-align: center;
    }

    .modal-body .form-control {
        text-align: left;
        width: 80%;
        display: inline-block;
    }

    .modal-body label {
        width: 19%;
        display: inline-block;
    }

    .modal-body label i {
        color: red;
    }

    .modal-body .waring {
        color: red;
        margin-left: 5px;
    }
    td span {
        cursor: pointer;
        color: #3c8dbc;
    }

    td span:hover {
        opacity: 80;
    }

    .m20 {
        margin-bottom: 20px;
    }

    .datatable-header {
        padding-bottom: 20px;
        font-size: 16px;

    span {
        margin-right: 20px;
    }

    }
    .prepayment-modal-btns {
        text-align: center;
    }

    .collectionAccount-bgcolor {
        margin-left: 30px;
        background-color: #c0c0c0;
    }

    .btns {
        text-align: center;
    }

    .addbottom {
        margin-top: 15px;

    .col-md-2 {
        text-align: center;

    input {
        margin-bottom: 10px;
    }

    }
    .col-md-7 {
        height: 300px;
        overflow: auto;
        border: 1px solid #ccc;
    }

    .col-md-1 {
        padding-top: 40px;

    input {
        margin: 15px 0;
    }

    }
    ul {
        list-style: none;
        border: 1px solid #ccc;
        padding: 10px;
        height: 300px;
        overflow: auto;

    li {
        margin: 5px 0;
        cursor: pointer;
        padding-left: 3px;
    }

    li.check-li {
        background: #ccc;
    }

    }
    }
    .tc{
        text-align: center;
        .validation-error-label{
            display: inline-block;
        }
    }
</style>
<script>
    import model from '../../ajax/BusinessManagement/info_model'
    export default{
        data(){
            this.model = model(this)
            return {
                modal_prepayment_recharge: false,
                adjustBalance_modal: false,
                pageall: 1,
                blanceList:{},
                total: {},
                defaultData: {
                    "advancePaymentMerchantID": '',
                    "orderNumber": '',
                    "merchantName": '',
                    "status": '',
                    "purpose": '',
                    "payType": '',
                    "remarks": '',
                    "startDate": '',
                    dateS: '3',
                    pageIndex:1,
                    pageSize:10,
                    "endDate": ''
                },
                zdlists: [],
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
                adjustBalanceData:{
                    advancePaymentMerchantID:'',
                    amount:'',
                    adjustBalanceAmout:'',
                    remarks:''
                },
                saveerror:false
            }
        },
        methods: {
            // *** 请求账户列表数据
            getZlists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if (data.endDate < data.startDate) {
                    let a = data.endDate, b = data.startDate;
                    this.checkForm.startDate = a;
                    this.checkForm.endDate = b;
                    data.startDate = a;
                    data.endDate = b;
                }
                this.model.advancePaymentAccount_list(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code == 0) ? this.$set('zdlists', response.data.data) : null;
                            (response.data.code == 0) ? this.$set('pageall', response.data.total) : null;
                        });
                this.model.total(data)
                        .then((res) => {
                            (res.data.code == 0) ? this.$set('total', res.data.data) : null;
                        });
                this.model.getBlance(this.defaultData.advancePaymentMerchantID)
                        .then((res)=>{
                            (res.data.code==0)?this.$set('blanceList',res.data.data):null;
                        })
            },
            checkNew(){
                this.defaultData.pageIndex=1;
                this.initList();
            },
            initList(){
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
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
                                    this.saveerror=false;
                                    this.modal_prepayment_recharge = true;
                                }
                            }
                        });
            },
            subApplyAdvancePay() {
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.saveerror=true;
                if(this.$vali.invalid&&this.saveerror)return;
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
                                this.initList();
                                this.modal_prepayment_recharge = false;
                            }
                        });
                //关闭弹出层
                this.modal_prepayment_recharge = false;
            },
            getTime(){
                this.defaultData.startDate = init_date(this.defaultData.dateS)[0];
                this.defaultData.endDate = init_date(this.defaultData.dateS)[1];
            },
            adjustBalance(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.adjustBalanceData.amount='';
                this.adjustBalanceData.adjustBalanceAmout='';
                this.adjustBalanceData.remarks='';
                this.adjustBalance_modal=true;
            },
            getadjustBalanceAmout(){
                this.adjustBalanceData.adjustBalanceAmout=this.blanceList.balanceAmount/100+ parseFloat(this.adjustBalanceData.amount);
            },
            adjustBalanceTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.adjustBalanceData.amount==''||this.adjustBalanceData.remarks==''){
                    dialogs('info','请填写必填信息！');
                    return;
                }
                if(this.adjustBalanceData.amount==0){
                    dialogs('info','填写金额不可为0！');
                    return;
                }
                let data=_.cloneDeep(this.adjustBalanceData);
                data.amount=accMul(data.amount,100);
                this.model.advancePaymentMerchantAdjust(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若
                            if (response.data.code == 0) {
                                dialogs('success',response.data.message);
                                this.initList();
                                this.adjustBalance_modal = false;
                            }
                        });
            }
        },
        ready() {
            (this.$route.params.id != ':id') ?  this.adjustBalanceData.advancePaymentMerchantID=this.defaultData.advancePaymentMerchantID = this.$route.params.id : null;
            (this.$route.params.orderNumber != ':orderNumber') ? this.defaultData.orderNumber = this.$route.params.orderNumber : null;
            this.getTime();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.defaultData=back_json.fetchArray(this.$route.path):null;
            this.initList();

        },
        watch: {
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.initList();
            }
        }
    }
</script>