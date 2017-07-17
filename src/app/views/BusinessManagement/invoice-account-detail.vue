<template>
    <index :title="'发票账户明细'"
           :ptitle="'备付金支出'"
           :p2title="'税金管理'"
           :hname="'payment-details'"
           :h2name="'subsidy-management'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" @click="recharge()" data-toggle="modal" data-target="#modal_recharge"  data-ksa="subsidy_account_manage.recharge">充值</a>
                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="dateS" @change="getTime">
                                <option value="0">昨天</option>
                                <option value="1">最近一周</option>
                                <option value="2">最近一个月</option>
                                <option value="3">最近三个月</option>
                                <option value="4">自定义时间</option>
                            </select>

                            <div  v-show="dateS==4" class="inline">
                                <datepicker :readonly="true" :value.sync="defaultData.startDate"
                                            format="YYYY-MM-DD"></datepicker>
                                至
                                <datepicker :readonly="true" :value.sync="defaultData.endDate"
                                            format="YYYY-MM-DD"></datepicker>
                            </div>

                            <input type="number" class="form-control" v-model="defaultData.orderID" placeholder="订单号" v-limitnumber="defaultData.orderID">

                            <select class="form-control" v-model="defaultData.payType">
                                <option value="">请选择付款方式</option>
                                <option value="1">备付金</option>
                                <option value="2">预付款</option>
                                <option value="5">网银转账</option>
                            </select>

                            <select class="form-control" v-model="defaultData.status">
                                <option value="">请选择状态</option>
                                <option value="5">对账成功</option>
                                <option value="4">等待对账</option>
                                <option value="3">转账中</option>
                                <option value="2">等待划付</option>
                                <option value="6">划付失败</option>
                                <option value="0">已关闭</option>
                            </select>

                            <input type="text" class="form-control" v-model="defaultData.remarks" placeholder="备注">
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="checkNew" data-ksa="invoice_account_detail.search">查询</a>
                    </div>
                </div>
                <div style="margin: 0 0 20px 20px;font-size: 18px;">
                    <span class="mr20">商户号：{{balance.backendMerchantCode}}</span>
                    <span class="mr20">商户简称：{{balance.backendMerchantName}}</span>
                    <span class="mr20">门店号：{{balance.backendStoreCode}}</span>
                    <span class="mr20">门店名称：{{balance.backendName}}</span>
                    <span>商盟ID：</span><span style="margin-right: 10px;">{{balance.merchantId}}</span>
                    <span>商盟商户名称：</span><span style="margin-right: 10px;">{{balance.merchantName}}</span>
                </div>
                <div style="margin: 0 0 20px 20px;font-size: 18px;">
                    <span>活动ID：</span><span style="margin-right: 10px;">{{balance.activityId}}</span>
                    <span>活动名：</span><span style="margin-right: 10px;">{{balance.activityName}}</span>
                    <span>欠发票金额：</span><span style="margin-right: 10px;">{{balance.invoiceAmount/100 | currency ''}}元</span>
                </div>

                <div v-show="zdlists.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>订单号</th>
                                <th>欠发票增加</th>
                                <th>收发票</th>
                                <th>付款方式 </th>
                                <th>状态</th>
                                <th>交易时间</th>
                                <th>操作</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.orderID }}</td>
                                <td>{{trlist.incomeAmount/100 | currency ''}}</td>
                                <td>{{trlist.payoutAmount/100 | currency ''}}</td>
                                <td>
                                    <template v-if="trlist.payType==1">备付金</template>
                                    <template v-if="trlist.payType==2">预付款</template>
                                    <template v-if="trlist.payType==5">网银转账</template>
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
                                    <a v-if="trlist.certificateId!=0" href="{{origin}}/file/download/{{trlist.certificateId}}">下载凭证</a>
                                    <a v-if="trlist.orderID!=''" v-link="{'name':'payment-details',params:{'reserveCashOrderNumber':trlist.orderID,'payType':trlist.payType}}">查看</a>
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

                    <div class="datatable-bottom">
                       <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" @click="excel" data-ksa="invoice_account_detail.export">Excel导出</a>
                       </div>

                       <div class="right">
                            <page :all="defaultData.pageTotal"
                                  :cur.sync="defaultData.pageIndex"
                                  :page_size.sync="defaultData.pageSize">
                            </page>
                       </div>
                    </div>
                </div>
                
                <div class="no-list" v-else>
                    未找到数据
                </div>

                <validator name="vali">
                    <form novalidate>
                        <div id="modal_recharge" data-backdrop="static"  class="modal fade" style="display: none;">
                            <div class="modal-dialog modal-sm">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">×</button>
                                        <h5 class="modal-title">发票充值</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label>商户名：</label>
                                            <span>{{rechargeInfo.val1}}</span>
                                        </div>
                                        <div class="form-group">
                                            <label>活动名：</label>
                                            <span>{{rechargeInfo.val2}}</span>
                                        </div>
                                        <div class="form-group">
                                            <label>余额：</label>
                                            <span>{{rechargeInfo.val3/100 | currency '' }}</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i style="color:red;">*</i>金额：</label>
                                            <input style="width: 70%;display: inline-block" placeholder="单位：元" type="text" class="form-control" v-validate:val2="['required']" v-model="rechargeData.payoutAmount" v-limitprice="rechargeData.payoutAmount">
                                        </div>
                                        <div class="form-group" v-else>
                                            <label>上传凭证：</label>
                                            <input  style="display:none" @change="uploads($event)" type="file">
                                            <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick">上传凭证</a>
                                            <span v-text="uploadText" v-show="uploadText!=''"></span>
                                        </div>
                                        <div class="form-group">
                                            <label style="position: relative;top: -95px;" class="control-label">备注：</label>
                                            <textarea style="display: inline-block;width: 70%;" rows="5" cols="5" class="form-control" v-model="rechargeData.remarks"></textarea>
                                        </div>
                                        <div class="form-group tc">
                                            <button type="button" @click="rechargeTrue" class="btn btn-primary">充值</button>
                                        </div>
                                        <div class="form-group tc">
                                            <span v-show="($vali.invalid && fire) || errortext!=''" class="validation-error-label" v-text="errortext"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </validator>
            </div>
        </div>
    </index>
</template>
<style>

</style>
<script>
    import model from '../../ajax/BusinessManagement/invoice-account-detail'
    export default{
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
                    activityName:'',
                    activityId:'',
                    merchantName:'',
                    merchantId:'',
                    backendMerchantCode: "",
                    backendMerchantName: "",
                    backendName: "",
                    backendStoreCode: "",
                    invoiceAmount:''
                },
                rechargeData:{
                    subsidyAccountID:'',
                    payoutAmount:'',
                    remarks:'',
                    certificateId:''
                },
                rechargeInfo:{
                    val1:'',
                    val2:'',
                    val3:'',
                },
                errortext:'',
                uploadText:'',
                dateS:'4'
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
                this.model.invoiceAccountDetail_list(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('zdlists', response.data.data)
                                this.defaultData.pageTotal=response.data.total
                            }
                        });
                this.model.invoiceAccountDetail_total(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('total', response.data.data)
                            }
                        });
            },
            //获取分公司数据
            getBlance(){
                let data={
                    id:this.$route.params.invoiceHDid
                }
                this.$common_model.suspensionTaxAccountDetail_info(data)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.balance={
                                    activityId:response.data.data.activity.operationId,
                                    activityName:response.data.data.activity.name,
                                    merchantId:response.data.data.merchant.operationId,
                                    merchantName:response.data.data.merchant.name,
                                    backendMerchantCode:response.data.data.merchant.backendMerchantCode,
                                    backendMerchantName:response.data.data.merchant.backendMerchantName,
                                    backendName:response.data.data.merchant.backendName,
                                    backendStoreCode:response.data.data.merchant.backendStoreCode,
                                    invoiceAmount:response.data.data.subsidyAccount.invoiceAmount
                                }
                            }
                        });
            },
            checkNew(){
                this.defaultData.pageIndex=1;
                this.initList();
            },
            initList(){
                $('.modal').modal('hide');
                back_json.saveArray(this.$route.path,this.defaultData);
                this. getZlists();
            },
            excel(){
                if(!this.zdlists.length>0||sessionStorage.getItem('isHttpin')==1)return;
                this.defaultData.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.invoiceRechargeexcel+ $.param(this.defaultData));
            },
            recharge(){
                this.rechargeData.payoutAmount='';
                this.rechargeData.remarks='';
                this.rechargeData.certificateId='';
                this.rechargeInfo.val1=this.balance.activityName;
                this.rechargeInfo.val2=this.balance.merchantName;
                this.rechargeInfo.val3=this.balance.invoiceAmount;
            },
            rechargeTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.errortext='';
                if(!this.$vali.valid){this.fire=true;this.errortext='您的信息未填写完整';return;}
                let data={};
                $.extend(true,data,this.rechargeData);
                data.payoutAmount=accMul(data.payoutAmount,100);
                this.model.subsidyAccount_recharge(data)
                        .then((response)=>{
                            if(response.data.code == 0){
                                dialogs('success',response.data.message);
                                this.balance.invoiceAmount=response.data.data;
                                this.initList();
                            }
                        });
            },
            uploadClick(){
                $('input[type="file"]').val('');
                $('input[type="file"]').click();
            },
            uploads(e){
                if(e.target.value==''&&this.uploadText!=''){
                    return;
                }
                let files=e.target.files[0];
                let vm=this;
                var reader = new FileReader();
                if(!check_upload(files.name)){
                    return;
                }
                if(check_upload_size(files.size)){
                    return;
                }
                reader.readAsDataURL(files);
                reader.onload = function(e){
                    let datas={
                        name:files.name,
                        data:this.result.split(',')[1]
                    }
                    vm.$common_model.upload(datas)
                            .then((response)=>{
                                if(response.data.code == 0){
                                    vm.rechargeData.certificateId=response.data.data;
                                    vm.saveerror='';
                                    vm.uploadText=files.name;
                                    dialogs('success','上传成功！');
                                }
                            })
                }
            },
            getTime(){
                this.defaultData.startDate=init_date(this.dateS)[0];
                this.defaultData.endDate=init_date(this.dateS)[1];
            },
        },
        watch:{
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.initList()
            }
        },
        ready(){
            let vm=this;
            (vm.$route.params.invoiceBTid==':invoiceBTid')? vm.defaultData.merchantID='' : vm.defaultData.merchantID=vm.$route.params.invoiceBTid;
            (vm.$route.params.invoiceHDid==':invoiceHDid')? vm.rechargeData.subsidyAccountID=vm.defaultData.subsidyAccountID='' : vm.rechargeData.subsidyAccountID=vm.defaultData.subsidyAccountID=vm.$route.params.invoiceHDid;
            vm.getTime();
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.getZlists();
            vm.getBlance();
            $('#modal_recharge').on('hidden.bs.modal', function () {
                $('body').css('padding-right',0);
                vm.uploadText='';
                vm.rechargeData.certificateId='';
            })
        }
    }
</script>