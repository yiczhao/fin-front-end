<template>
    <index :title="'活动列表'"
           :ptitle="'商户管理'"
           :p2title="'商户列表'"
           :hname="'business-lists'"
           :h2name="'business-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">

                <div class="heading">
                    <div class="heading-left">

                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form">

                                <input type="number" class="form-control" v-model="defaultData.activityOperationID" placeholder="活动ID" v-limitnumber="defaultData.activityOperationID">

                                <input type="text" class="form-control" v-model="defaultData.activityName" placeholder="活动名称">

                                <select class="form-control" v-model="defaultData.activityStatus">
                                    <option value="">请选择状态</option>
                                    <option value="1">待上线</option>
                                    <option value="2">运行中</option>
                                    <option value="3">已结束</option>
                                </select>
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="initList" data-ksa="subsidy_account_manage.search">查询</a>
                    </div>
                </div>

                <div style="margin: 0 0 20px 20px;font-size: 18px;">
                    <span>商户ID：</span><span style="margin-right: 10px;">{{balance.merchantOperationID}}</span>
                    <span>商户名称：</span><span style="margin-right: 10px;">{{balance.merchantName}}</span>
                </div>

                <div v-show="zdlists.length>0" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
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
                            <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
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
                                    <a @click="recharge(trlist)" data-ksa="subsidy_account_manage.recharge">发票充值</a>
                                </td>
                            </tr>
                            <tr role="row">
                                <td>合计：</td>
                                <td></td>
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

                    <div class="datatable-bottom">
                       <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" @click="excel" data-ksa="subsidy_account_manage.export">Excel导出</a>
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

                <content-dialog
                        :show.sync="modal_applyPay" :is-button="false" :type.sync="'infos'"
                        :title.sync="'税金提现'"
                >
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="control-label">税金池余额：{{redata.suspensionTaxAmount/100 | currency ''}} 元</label>
                            <label class="control-label">可提现金额：{{redata.withdrawCashAmount/100 | currency ''}} 元</label>
                        </div>
                        <div class="form-group">
                            <label class="control-label"><i style="color:red;">*</i>付款方式：</label>
                            <select class="form-control" v-model="applyData.payType" style="display: inline-block;width: 80%;">
                                <option value="">请选择付款方式</option>
                                <option value="1">备付金账户</option>
                                <option value="2">商户预付款账户</option>
                                <option value="5">网银转账</option>
                            </select>
                        </div>
                        <div class="form-group" v-show="applyData.payType==1">
                            <label style="padding-left: 13%"><input type="checkbox" v-model="applyData.mergePay"/>
                                相同账户合并付款</label>
                        </div>
                        <div class="form-group">
                            <label style="width: 13%"><i style="color:red;">*</i>金额：</label>
                            <input style="width: 80%;display: inline-block" type="text" class="form-control" v-model="applyData.payoutAmount" v-limitprice="applyData.payoutAmount"></div>
                        <div class="form-group">
                            <label style="width:13%;position: relative;top: -95px;" class="control-label"><i style="color:red;">*</i>备注：</label>
                            <textarea  style="display: inline-block;width: 80%;" rows="5" cols="5" class="form-control" v-model="applyData.remarks"></textarea>
                        </div>
                        <div class="form-group tc">
                            <button  type="button" @click="applyPayTrue" class="btn btn-primary">申请提现</button>
                        </div>
                        <div class="form-group tc">
                            <span v-show="applyText!=''" class="validation-error-label" v-text="applyText"></span>
                        </div>
                    </div>
                </content-dialog>
                <content-dialog
                        :show.sync="modal_recharge" :is-button="false" :type.sync="'infos'"
                        :title.sync="'发票充值'" 
                >
                    <validator name="vali">
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
                                <input style="width: 70%;display: inline-block" type="text" class="form-control" v-validate:val2="['required']" v-model="rechargeData.payoutAmount" v-limitprice="rechargeData.payoutAmount"></div>
                            <div class="form-group" v-else>
                                <label>上传凭证：</label>
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
                    </validator>
                </content-dialog>

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
                modal_applyPay: false,
                modal_recharge: false,
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
                    mergePay:false,
                    payType:''
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
                this.modal_applyPay = false;
                this.modal_recharge = false;
                back_json.saveArray(this.$route.path,this.defaultData);
                this. getZlists();
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
                    mergePay:false,
                    payType:''
                };
                this.applyData.id=id;
                this.applyText='';
                let data={
                    id:id,
                }
                this.model.subsidyAccount_info(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('redata', response.data.data);
                                this.modal_applyPay = true;
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
                if(this.applyData.remarks==''){
                    this.applyText='请填写备注！';
                    return;
                }
                if(this.applyData.payType==''){
                    this.applyText='请选择付款方式！';
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
                this.uploadText='';
                this.errortext='';
                this.fire=false;
                this.rechargeInfo.val1=this.balance.merchantName;
                this.rechargeInfo.val2=activityName;
                this.rechargeInfo.val3=invoiceAmount;
                this.modal_recharge = true;
            },
            rechargeTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.errortext='';
                if(!this.$vali.valid){this.fire=true;this.errortext='您的信息未填写完整';return;}
                let data={};
                $.extend(true, data,this.rechargeData);
                data.payoutAmount=accMul(data.payoutAmount,100);
                this.model.subsidyAccount_recharge(data)
                        .then((response)=>{
                            if(response.data.code == 0){
                                dialogs('success',response.data.message);
                                this.initList();
                                 this.modal_recharge = false;
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
        },
        watch:{
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.initList()
            }
        },
        ready(){
            let vm=this;
            (vm.$route.params.merchantID1==':merchantID1')?vm.defaultData.merchantID= '' : vm.defaultData.merchantID=vm.$route.params.merchantID1;
            (vm.$route.params.merchantName1==':merchantName1')? vm.balance.merchantName='' : vm.balance.merchantName=vm.$route.params.merchantName1;
            (vm.$route.params.merchantOperationID1==':merchantOperationID1')? vm.balance.merchantOperationID='' : vm.balance.merchantOperationID=vm.$route.params.merchantOperationID1;
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.getZlists();
             $('#modal_recharge').on('hidden.bs.modal', function () {
                 $('body').css('padding-right',0);
                vm.uploadText='';
               vm.rechargeData.certificateId='';
            })
           
        }
    }
</script>