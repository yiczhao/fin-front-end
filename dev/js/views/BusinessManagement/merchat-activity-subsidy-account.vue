<template>
    <index :title="'活动列表'"
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
                            <input type="number" class="form-control" v-model="defaultData.activityOperationID" placeholder="活动ID"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.activityName" placeholder="活动名称">
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.activityStatus">
                                <option value="">请选择状态</option>
                                <option value="1">待上线</option>
                                <option value="2">运行中</option>
                                <option value="3">已结束</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" @click="initList" data-ksa="subsidy_account_manage.search">查询</a>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" @click="excel" data-ksa="subsidy_account_manage.export">导出</a>
                        </div>
                    </form>
                </div>
                <div style="margin: 0 0 20px 20px;font-size: 18px;">
                    <span>商户ID：</span><span style="margin-right: 10px;">{{balance.merchantOperationID}}</span>
                    <span>商户名称：</span><span style="margin-right: 10px;">{{balance.merchantName}}</span>
                </div>
                <div v-if="zdlists.length>0" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>ID</th>
                                <th>名称</th>
                                <th>起止时间</th>
                                <th>状态 </th>
                                <th>已划付金额</th>
                                <th>待划付金额</th>
                                <th>退税款</th>
                                <th>欠发票金额</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists">
                                <td>{{trlist.activityOperationID }}</td>
                                <td>{{trlist.activityName }}</td>
                                <td>{{trlist.startDate | datetimes}}--{{trlist.endDate  | datetimes}}</td>
                                <td>
                                    <template v-if="trlist.activityStatus==1">待上线</template>
                                    <template v-if="trlist.activityStatus==2">运行中</template>
                                    <template v-if="trlist.activityStatus==3">已结束</template>
                                </td>
                                <td><a data-ksa="reserve_cash_order_manage.search" v-link="{name:'payment-details',params:{merchantOperationIDs:balance.merchantOperationID}}">{{trlist.paidAmount/100 | currency ''}}</a></td>
                                <td><a data-ksa="subsidy_pay_detail_manage.search" v-link="{name:'subsidy-appropriation',params:{subsidySHid:balance.merchantOperationID,subsidyHDid:trlist.activityOperationID}}">{{trlist.unpaidAmount/100 | currency ''}}</a></td>
                                <td><a data-ksa="suspension_tax_account_detail_manage.search" v-link="{name:'suspension-tax',params:{suspensionHDid:trlist.id,suspensionBTid:defaultData.merchantID,suspensionZHname:trlist.activityName,suspensionSHid:trlist.merchantID,suspensionZHbalance:trlist.suspensionTaxAmount,suspensionSHname:balance.merchantName}}">{{trlist.suspensionTaxAmount/100| currency ''}}</a></td>
                                <td><a data-ksa="invoice_account_detail.search" v-link="{name:'invoice-account',params:{invoiceHDid:trlist.id,invoiceBTid:defaultData.merchantID,invoiceZHname:trlist.activityName,invoiceSHid:trlist.merchantID,invoiceZHbalance:trlist.invoiceAmount,invoiceSHname:balance.merchantName}}">{{trlist.invoiceAmount/100| currency ''}}</a></td>
                                <td>
                                    <a data-ksa="trade_detail_manage.search" v-link="{name:'trade-info',params:{'activityOperationID':trlist.activityOperationID,'merchantOperationID':balance.merchantOperationID}}">交易明细</a>
                                    <a @click="applyPay(trlist)" data-ksa="subsidy_account_manage.with_draw">税金提现</a>
                                    <a @click="recharge(trlist)" data-toggle="modal" data-target="#modal_recharge" data-ksa="subsidy_account_manage.recharge">发票充值</a>
                                </td>
                            </tr>
                            <tr role="row">
                                <td></td>
                                <td>合计：</td>
                                <td></td>
                                <td></td>
                                <td>{{total.paidAmount/100 | currency ''}}</td>
                                <td>{{total.unpaidAmount/100 | currency ''}}</td>
                                <td>{{total.suspensionTaxAmount/100 | currency ''}}</td>
                                <td>{{total.invoiceAmount/100 | currency ''}}</td>
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
                                    <label style="width:13%;position: relative;top: -95px;" class="control-label">备注：</label>
                                    <textarea  style="display: inline-block;width: 80%;" rows="5" cols="5" class="form-control" v-model="applyData.remarks"></textarea>
                                </div>
                                <div class="form-group tc">
                                    <button  type="button" @click="applyPayTrue" class="btn btn-primary">申请提现</button>
                                </div>
                                <div class="form-group tc">
                                    <span v-show="applyText!=''" class="validation-error-label" v-text="applyText"></span>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                            <input style="width: 70%;display: inline-block" type="text" class="form-control" v-validate:val2="['required']" v-model="rechargeData.payoutAmount" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"></div>
                                        <div class="form-group" v-else>
                                            <label><i style="color:red;">*</i>上传凭证：</label>
                                            <input  style="display:none" @change="uploads($event)" type="file">
                                            <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick">上传凭证</a>
                                            <span v-text="uploadText" v-show="uploadText!=''"></span>
                                        </div>
                                        <div class="form-group">
                                            <label style="position: relative;top: -95px;" class="control-label">备注：</label>
                                            <textarea style="display: inline-block;width: 80%;" rows="5" cols="5" class="form-control" v-model="rechargeData.remarks"></textarea>
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
.validation-error-label{
    display: inline;
}
table tr th,table tr td{
    text-align: center;
}
</style>
<script>
    import model from '../../ajax/BusinessManagement/merchat-activity-subsidy-account'
    export default{
        data(){
            this.model =model(this)
            return{
                defaultData:{
                    'merchantID': '',
                    'activityOperationID': '',
                    'activityStatus': '',
                    'activityName': '',
                    'pageTotal': 1,
                    'pageIndex': 1,
                    'pageSize': 10,
                    mid:''
                },
                zdlists:[],
                total:{
                    'unpaidAmount': '',
                    'suspensionTaxAmount': '',
                    'paidAmount': '',
                    'invoiceAmount': '',
                    'consumptionTotalNumber': '',
                    'consumptionTotalAmount':'',
                },
                balance:{
                    merchantName:'',
                    merchantOperationID:''
                },
                redata:{
                    suspensionTaxAmount:'',
                    withdrawCashAmount:''
                },
                rechargeData:{
                    subsidyAccountID:'',
                    payoutAmount:'',
                    remarks:'',
                    certificateId:''
                },
                applyData:{
                    remarks:'',
                    id:'',
                    payoutAmount:'',
                    payType:'1'
                },
                rechargeInfo:{
                    val1:'',
                    val2:'',
                    val3:'',
                },
                errortext:'',
                applyText:'',
                uploadText:''
            }
        },
        methods:{
            // *** 请求账户数据
            getZlists(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.subsidyAccount_list(this.defaultData)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('zdlists', response.data.data)
                                this.defaultData.pageTotal=response.data.total
                            }
                        });
                this.model.subsidyAccount_total(this.defaultData)
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
                //初始化
                this.defaultData.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.subsidyAccountexcel+ $.param(this.defaultData));
            },
            applyPay({id}){
                this.applyData={
                    remarks:'',
                    id:'',
                    payoutAmount:'',
                    payType:'1'
                };
                this.applyData.id=id;
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
                                this.initList();
                            }
                        });
            },
            recharge({id,activityName,invoiceAmount}){
                this.rechargeData={
                    subsidyAccountID:'',
                    payoutAmount:'',
                    remarks:'',
                    certificateId:''
                },
                this.rechargeData.subsidyAccountID=id;
                this.rechargeInfo.val1=this.balance.merchantName;
                this.rechargeInfo.val2=activityName;
                this.rechargeInfo.val3=invoiceAmount;
            },
            rechargeTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.errortext='';
                if(!this.$vali.valid){this.fire=true;this.errortext='您的信息未填写完整';return;}
                if(this.rechargeData.certificateId==''){this.fire=true;this.errortext='请上传凭证';return;}
                let data={};
                $.extend(true, data,this.rechargeData);
                data.payoutAmount=accMul(data.payoutAmount,100);
                this.model.subsidyAccount_recharge(data)
                        .then((response)=>{
                            if(response.data.code == 0){
                                dialogs('success',response.data.message);
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
            }
        },
        ready(){
            let vm=this;
            (vm.$route.params.merchantID1==':merchantID1')?vm.defaultData.merchantID= '' : vm.defaultData.merchantID=vm.$route.params.merchantID1;
            (vm.$route.params.merchantName1==':merchantName1')? vm.balance.merchantName='' : vm.balance.merchantName=vm.$route.params.merchantName1;
            (vm.$route.params.merchantOperationID1==':merchantOperationID1')? vm.balance.merchantOperationID='' : vm.balance.merchantOperationID=vm.$route.params.merchantOperationID1;
            vm.getZlists();
            $('#modal_recharge').on('hidden.bs.modal', function () {
                $('body').css('padding-right',0);
                vm.uploadText='';
                vm.rechargeData.certificateId='';
            })
        }
    }
</script>