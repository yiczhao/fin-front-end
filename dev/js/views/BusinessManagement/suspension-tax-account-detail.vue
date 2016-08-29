<template>
    <index :title="'暂扣税金账户明细'"
           :ptitle="'商户管理'"
           :p2title="'商户列表'"
           :hname="'business-lists'"
           :h2name="'business-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <a @click="applyPay(applyData)" class="btn btn-info">提现</a>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="dateS">
                                <option value="0">昨天</option>
                                <option value="1">最近一周</option>
                                <option value="2">最近一个月</option>
                                <option value="3">最近三个月</option>
                                <option value="4">自定义时间</option>
                            </select>
                        </div>
                        <div class="form-group" v-show="dateS==4">
                            <datepicker :readonly="true" :value.sync="defaultData.startDate"
                                        format="YYYY-MM-DD"></datepicker>
                            至
                            <datepicker :readonly="true" :value.sync="defaultData.endDate"
                                        format="YYYY-MM-DD"></datepicker>
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control" v-model="defaultData.orderID" placeholder="订单号"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.payType">
                                <option value="">请选择付款方式</option>
                                <option value="2">备付金</option>
                                <option value="1">预付款</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.status">
                                <option value="">请选择状态</option>
                                <option value="5">对账成功</option>
                                <option value="4">等待对账</option>
                                <option value="3">转账中</option>
                                <option value="2">等待划付</option>
                                <option value="6">划付失败</option>
                                <option value="0">已关闭</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.remarks" placeholder="备注">
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" @click="initList">查询</a>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" @click="excel">导出</a>
                        </div>
                    </form>
                </div>
                <div style="margin: 0 0 20px 20px;font-size: 18px;">
                    <span>商户名：</span><span style="margin-right: 10px;">{{balance.merchantName}}</span>
                    <span>活动名：</span><span style="margin-right: 10px;">{{balance.accountName}}</span>
                    <span>账户余额：</span><span style="margin-right: 10px;">{{balance.balanceAmount/100| currency '' }}</span>
                </div>
                <div v-if="zdlists.length>0" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>订单号</th>
                                <th>收入</th>
                                <th>支出</th>
                                <th>付款方式 </th>
                                <th>状态</th>
                                <th>交易时间</th>
                                <th>操作</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists">
                                <td>{{trlist.orderID }}</td>
                                <td>{{trlist.incomeAmount/100 | currency ''}}</td>
                                <td>{{trlist.payoutAmount/100 | currency ''}}</td>
                                <td>
                                    <template v-if="trlist.payType==1">备付金</template>
                                    <template v-if="trlist.payType==2">预付款</template>
                                </td>
                                <td>
                                    <template v-if="trlist.status==0">已关闭</template>
                                    <template v-if="trlist.status==2">等待划付 </template>
                                    <template v-if="trlist.status==3">转账中</template>
                                    <template v-if="trlist.status==4">等待对账</template>
                                    <template v-if="trlist.status==5">对账成功</template>
                                    <template v-if="trlist.status==6">划付失败</template>
                                </td>
                                <td>{{trlist.tradeTime  | datetime}}</td>
                                <td>
                                    <a v-link="{name:'payment-details',params:{reserveCashOrderNumber:trlist.orderID,payType:trlist.payType}}">查看</a>
                                </td>
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            <tr role="row">
                                <td>合计：</td>
                                <td>{{total.incomeAmount/100 | currency ''}}</td>
                                <td>{{total.payoutAmount/100 | currency ''}}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-footer">
                        <page :all="defaultData.pageTotal"
                              :cur.sync="defaultData.pageIndex"
                              :page_size.sync="defaultData.pageSize">
                        </page>
                    </div>
                </div>
                <div style="padding: 30px;font-size: 16px;text-align: center" v-else>
                    未找到数据
                </div>

                <div data-backdrop="static"  id="modal_applyPay" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">申请提现</h5>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label class="control-label">税金池余额：{{redata.suspensionTaxAmount/100 | currency ''}} 元</label>
                                    <label class="control-label">可提现金额：{{redata.withdrawCashAmount/100 | currency ''}} 元</label>
                                </div>
                                <div class="form-group">
                                    <label class="control-label"><i style="color:red;">*</i>付款方式：</label>
                                    <select class="form-control" v-model="applyData.payType" style="display: inline-block;width: 80%;">
                                        <option value="1">备付金账户</option>
                                        <option value="2">商户预付款账户</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label style="width: 13%"><i style="color:red;">*</i>金额：</label>
                                    <input style="width: 80%;display: inline-block" type="text" class="form-control" v-model="applyData.payoutAmount" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"></div>
                                <div class="form-group">
                                    <label style="position: relative;top: -95px;width: 13%" class="control-label">备注：</label>
                                    <textarea style="display: inline-block;width: 80%;"  rows="5" cols="5" class="form-control" v-model="applyData.remarks"></textarea>
                                </div>
                                <div class="form-group tc">
                                    <button  type="button" @click="applyPayTrue" class="btn btn-primary">申请提现</button>
                                </div>
                                <div class="form-group tc" style="display: inline;">
                                    <span v-show="applyText!=''" class="validation-error-label" v-text="applyText"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </index>
</template>
<style>

</style>
<script>
    import model from '../../ajax/BusinessManagement/suspension-tax-account-detail'
    import datepicker from '../components/datepicker.vue'
    export default{
        components:{
            'datepicker': datepicker
        },
        data(){
            this.model =model(this)
            return{
                origin:window.origin,
                defaultData:{
                    'subsidyAccountID': '',
                    'orderID': '',
                    'startDate': '',
                    'endDate': '',
                    'payType': '',
                    'status': '',
                    'remarks': '',
                    'pageTotal': 1,
                    'pageIndex': 1,
                    'pageSize': 10,
                    mid:''
                },
                zdlists:[],
                total:{
                    'incomeAmount': '',
                    'payoutAmount': '',
                },
                balance:{
                    accountName:'',
                    merchantName:'',
                    balanceAmount:''
                },
                redata:{
                    suspensionTaxAmount:'',
                    withdrawCashAmount:''
                },
                applyData:{
                    remarks:'',
                    id:'',
                    payoutAmount:'',
                    payType:'1'
                },
                applyText:'',
                dateS:'3'
            }
        },
        methods:{
            // *** 请求账户数据
            getZlists(){
                let data=this.defaultData
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(data.endValue<data.startValue){
                    this.defaultData.endValue=b;
                    data.startValue=a;
                    data.endValue=b;
                }
                this.model.suspensionTaxAccountDetail_list(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('zdlists', response.data.data)
                                this.defaultData.pageTotal=response.data.total
                            }
                        });
                this.model.suspensionTaxAccountDetail_total(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('total', response.data.data)
                            }
                        });
            },
            initList(){
                $('.modal').modal('hide');
                if(this.defaultData.pageIndex==1){
                    this. getZlists();
                    return;
                }
                this.defaultData.pageIndex=1;
            },
            excel(){
                if(!this.zdlists.length>0||sessionStorage.getItem('isHttpin')==1)return;
                this.defaultData.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.suspensionTaxAccountDetailexcel+ $.param(this.defaultData));
            },
            applyPay({id}){
                this.applyData.remarks='';
                this.applyData.payoutAmount='';
                this.applyData.payType='1';
                let data={
                    id:id,
                }
                this.model.subsidyAccount_info(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('redata', response.data.data);
                                $('#modal_applyPay').modal('show');
                            }
                        });
            },
            applyPayTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.applyText='';
                if(this.applyData.payoutAmount==''){
                    this.applyText='请填写提现金额！';
                    return;
                }
                let data={};
                $.extend(true, data,this.applyData);
                data.payoutAmount=accMul(data.payoutAmount,100);
                this.model.subsidyAccount_applyPay(data)
                        .then((response)=>{
                            if(response.data.code == 0){
                                dialogs('success',response.data.message);
                                this.balance.balanceAmount=response.data.data;
                                this.initList();
                            }
                        });
            },
            getTime(){
                this.defaultData.startDate=init_date(this.dateS)[0];
                this.defaultData.endDate=init_date(this.dateS)[1];
            },
        },
        watch:{
            'defaultData.pageIndex':{
                handler:function(){
                    this.getZlists()
                },
                deep:true
            },
            'defaultData.pageSize':{
                handler:function(){
                    this.getZlists()
                },
                deep:true
            },
            dateS(){
                this.getTime();
            }
        },
        ready(){
            let vm=this;
            (vm.$route.params.suspensionZHname==':suspensionZHname')?vm.balance.accountName= '' : vm.balance.accountName=vm.$route.params.suspensionZHname;
            (vm.$route.params.suspensionSHname==':suspensionSHname')? vm.balance.merchantName='' : vm.balance.merchantName=vm.$route.params.suspensionSHname;
            (vm.$route.params.suspensionZHbalance==':suspensionZHbalance')? vm.balance.balanceAmount='' : vm.balance.balanceAmount=vm.$route.params.suspensionZHbalance;
            (vm.$route.params.suspensionBTid==':suspensionBTid')? vm.defaultData.merchantID='' : vm.defaultData.merchantID=vm.$route.params.suspensionBTid;
            (vm.$route.params.orderId==':orderId')? vm.defaultData.orderID='' : vm.defaultData.orderID=vm.$route.params.orderId;
            (vm.$route.params.suspensionHDid==':suspensionHDid')? vm.applyData.id=vm.defaultData.subsidyAccountID='' : vm.applyData.id=vm.defaultData.subsidyAccountID=vm.$route.params.suspensionHDid;
            vm.getTime();
            vm.getZlists();
            $('#modal_recharge').on('hidden.bs.modal', function () {
                $('body').css('padding-right',0);
                vm.uploadText='';
                vm.recharge.certificatesID='';
            })
        }
    }
</script>