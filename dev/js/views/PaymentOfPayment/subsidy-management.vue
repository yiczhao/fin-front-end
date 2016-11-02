<template>
    <index :title="'退税管理'"
           :ptitle="'备付金支出'"
           :hname="'payment-details'"
           :isshow="'isshow'">
        <div class="content subsidy-management" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li><a v-link="{name:'payment-details'}" data-ksa="reserve_cash_detail_manage">付款明细</a></li>
                    <li><a v-link="{name:'pay-recheck'}" data-ksa="pay_recheck">划付复核</a></li>
                    <li><a v-link="{name:'subsidy-appropriation'}" data-ksa="subsidy_pay_detail_manage">补贴划付</a></li>
                    <!--<li><a v-link="{name:'limit-purchase-detail'}" data-ksa="advance_payment_account_manage">额度采购</a></li>-->
                    <li><a v-link="{name:'subsidy-tax-rebate'}" data-ksa="subsidy_tax_rebate_detail_manage">补贴退税</a></li>
                    <li class="active"><a v-link="{name:'subsidy-management'}" data-ksa="">退税管理</a></li>
                    <li><a v-link="{name:'advance-payment-detail'}" data-ksa="advance_payment_detail_manage">预付款划付</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left" style="width: 225px;">
                        <a class="btn btn-add add-top" data-ksa="" style="margin-right:0px;" @click="batchApply">批量提现</a>
                        <a class="btn btn-add add-top" data-ksa="" style="margin-right:0px;" @click="recharges">发票充值</a>
                    </div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="defaultData.subCompanyID" @change="getCity(defaultData.subCompanyID)">
                                <option value="">全部分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                            <select class="form-control" v-model="defaultData.cityID">
                                <option value="">全部城市</option>
                                <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                            </select>
                            <input type="text" class="form-control" v-model="defaultData.activityOperationID" placeholder="活动ID（多个ID以逗号隔开）">
                            <input type="text" class="form-control" v-model="defaultData.merchantOperationID" placeholder="商户ID（多个ID以逗号隔开）">
                            <input type="text" class="form-control" v-model="defaultData.activityName" placeholder="活动名称">
                            <input type="text" class="form-control" v-model="defaultData.merchantName" placeholder="商户名称">
                        </form>
                    </div>
                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="initList" data-ksa="">查询</a>
                    </div>
                </div>
                <div v-show="zdlists.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>分公司</th>
                                <th>城市</th>
                                <th>活动ID</th>
                                <th>活动名称</th>
                                <th>商户ID</th>
                                <th>商户名称</th>
                                <th>交易笔数</th>
                                <th>三方应收</th>
                                <th>商户应补</th>
                                <th>商户实补</th>
                                <th>暂扣税金</th>
                                <th>佣金</th>
                                <th>已划付</th>
                                <th>待划付</th>
                                <th>退税款</th>
                                <th>欠发票金额</th>
                                <th>交易</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.subCompanyName}}</td>
                                <td>{{trlist.cityName}}</td>
                                <td>{{trlist.activityOperationID}}</td>
                                <td>{{trlist.activityName}}</td>
                                <td>{{trlist.merchantOperationID}}</td>
                                <td>{{trlist.merchantName}}</td>
                                <td>{{trlist.consumptionCount}}</td>
                                <td>{{trlist.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyActual/100 | currency ''}}</td>
                                <td>{{trlist.suspensionTax/100 | currency ''}}</td>
                                <td>{{trlist.commission33211/100 | currency ''}}</td>
                                <td><a data-ksa="" v-link="{name:'paid-amount',params:{paidId:trlist.id,paidHd:trlist.activityName,paidSh:trlist.merchantName}}">{{trlist.paidAmount/100 | currency ''}}</a></td>
                                <td><a data-ksa="" v-link="{name:'unpaid-amount',params:{unpaidId:trlist.id,unpaidHd:trlist.activityName,unpaidSh:trlist.merchantName,unpaidTs:trlist.suspensionTaxAmount,unpaidYe:trlist.unpaidAmount}}">{{trlist.unpaidAmount/100 | currency ''}}</a></td>
                                <td><a data-ksa="suspension_tax_account_detail_manage.search" v-link="{name:'suspension-tax',params:{suspensionHDid:trlist.id,suspensionBTid:trlist.merchantID,suspensionSHid:trlist.merchantID}}">{{trlist.suspensionTaxAmount/100| currency ''}}</a></td>
                                <td><a data-ksa="invoice_account_detail.search" v-link="{name:'invoice-account',params:{invoiceHDid:trlist.id,invoiceBTid:trlist.merchantID}}">{{trlist.invoiceAmount/100| currency ''}}</a></td>
                                <td>
                                    <a data-ksa="trade_detail_manage.search" v-link="{name:'trade-info',params:{'activityOperationID':trlist.activityOperationID,'merchantOperationID':trlist.merchantOperationID}}">明细</a>
                                </td>
                                <td>
                                    <a @click="recharge(trlist)" data-ksa="subsidy_account_manage.recharge">发票充值</a>
                                    <a @click="applyPay(trlist)" data-ksa="subsidy_account_manage.with_draw">税金提现</a>
                                </td>
                            </tr>
                            <tr role="row" v-show="total!=''">
                                <td></td>
                                <td>合计：</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{{total.consumptionCount}}</td>
                                <td>{{total.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{total.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{total.merchantSubsidyActual/100 | currency ''}}</td>
                                <td>{{total.suspensionTax/100 | currency ''}}</td>
                                <td>{{total.commission33211/100 | currency ''}}</td>
                                <td>{{total.paidAmount/100 | currency ''}}</td>
                                <td>{{total.unpaidAmount/100 | currency ''}}</td>
                                <td>{{total.suspensionTaxAmount/100 | currency ''}}</td>
                                <td>{{total.invoiceAmount/100 | currency ''}}</td>
                                <td></td>
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
                        :title.sync="'申请提现'"
                >
                    <div class="modal-body">
                        <div class="form-group">
                            <label style="width: 15%;text-align: right;">商户：</label>
                            <span>{{rechargeInfo.val1}}</span><span>({{rechargeInfo.val4}})</span>
                        </div>
                        <div class="form-group">
                            <label style="width: 15%;text-align: right;">活动：</label>
                            <span>{{rechargeInfo.val2}}</span><span>({{rechargeInfo.val5}})</span>
                        </div>
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
                            </select>
                        </div>
                        <div class="form-group" v-show="applyData.payType==1">
                            <label style="padding-left: 13%"><input type="checkbox" v-model="applyData.mergePay"/>
                                相同账户合并付款</label>
                        </div>
                        <div class="form-group">
                            <label style="width: 15%;text-align: right;"><i style="color:red;">*</i>金额：</label>
                            <input style="width: 80%;display: inline-block" type="text" class="form-control" placeholder="单位：元" v-model="applyData.payoutAmount" v-limitprice="applyData.payoutAmount">
                        </div>
                        <div class="form-group">
                            <label style="width: 15%;text-align: right;position: relative;top: -95px;" class="control-label"><i style="color:red;">*</i>备注：</label>
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
                                <label style="width: 15%;text-align: right;">商户：</label>
                               <span>{{rechargeInfo.val1}}</span><span>({{rechargeInfo.val4}})</span>
                            </div>
                            <div class="form-group">
                                <label style="width: 15%;text-align: right;">活动：</label>
                                <span>{{rechargeInfo.val2}}</span><span>({{rechargeInfo.val5}})</span>
                            </div>
                            <div class="form-group">
                                <label style="width: 15%;text-align: right;">余额：</label>
                                <span>{{rechargeInfo.val3/100 | currency '' }}元</span>
                            </div>
                            <div class="form-group">
                                <label style="width: 15%;text-align: right;"><i style="color:red;">*</i>金额：</label>
                                <input style="width: 70%;display: inline-block" placeholder="单位：元" type="text" class="form-control" v-validate:val2="['required']" v-model="rechargeData.payoutAmount" v-limitprice="rechargeData.payoutAmount">
                            </div>
                            <div class="form-group" v-else>
                                <label style="width: 15%;text-align: right;">上传凭证：</label>
                                <input  style="display:none" @change="uploads($event)" type="file">
                                <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick">上传凭证</a>
                                <span v-text="uploadText" v-show="uploadText!=''"></span>
                            </div>
                            <div class="form-group">
                                <label style="width: 15%;text-align: right;position: relative;top: -95px;" class="control-label">备注：</label>
                                <textarea style="display: inline-block;width: 70%;" rows="5" cols="5" class="form-control" v-model="rechargeData.remarks"></textarea>
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

                <content-dialog
                        :show.sync="modal_batch" :is-button="false" :type.sync="'infos'"
                        :title.sync="'批量提现'"
                >
                    <div class="form-group">
                        <label style="position: relative;top: -95px;" class="control-label">活动ID：</label>
                        <textarea style="display: inline-block;width: 88%;" rows="5" cols="5" class="form-control" v-model="batchData.activityOperationID"></textarea>
                    </div>
                    <div class="form-group">
                        <label style="position: relative;top: -95px;" class="control-label">商户ID：</label>
                        <textarea style="display: inline-block;width: 88%;" rows="5" cols="5" class="form-control" v-model="batchData.merchantOperationID"></textarea>
                    </div>
                    <div class="form-group tc">
                        <a @click="batchApplyNext" class="btn btn-primary">下一步</a>
                    </div>
                </content-dialog>

                <content-dialog
                        :show.sync="modal_recharges" :is-button="false" :type.sync="'infos'"
                        :title.sync="'发票充值'"
                >
                    <validator name="valis">
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="labels"><i>*</i>商户ID：</label>
                            <input type="text" v-validate:val1="['required']" class="form-control input" v-model="rechargesData.merchantID" v-limitnumber="rechargesData.merchantID">
                        </div>
                        <div class="form-group">
                            <label class="labels"><i>*</i>活动ID：</label>
                            <input  type="text" v-validate:val2="['required']" class="form-control input" v-model="rechargesData.activityID" v-limitnumber="rechargesData.activityID">
                        </div>
                        <div class="form-group">
                            <label class="labels"><i>*</i>金额：</label>
                            <input type="text" v-validate:val3="['required']" placeholder="单位：元" class="form-control input" v-model="rechargesData.incomeAmount" v-limitprice="rechargesData.incomeAmount">
                        </div>
                        <div class="form-group" v-else>
                            <label class="labels">上传凭证：</label>
                            <input  style="display:none" @change="uploads($event)" type="file">
                            <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick($event)">上传凭证</a>
                            <span v-text="uploadText" v-show="uploadText!=''"></span>
                        </div>
                        <div class="form-group">
                            <label style="position: relative;top: -95px;" class="control-label labels">备注：</label>
                            <textarea style="display: inline-block;width: 80%;" rows="5" cols="5" class="form-control" v-model="rechargesData.remarks"></textarea>
                        </div>
                        <div class="form-group tc">
                            <a @click="rechargesTrue" class="btn btn-primary">保存并继续</a>
                            <a @click="initList" class="btn btn-default">取消</a>
                        </div>
                        <div class="form-group tc">
                            <span v-show="$valis.invalid && fire" class="validation-error-label" v-text="errortext"></span>
                        </div>
                    </div>
                    </validator>
                </content-dialog>
            </div>
        </div>
    </index>
</template>
<style lang="sass">
    .subsidy-management{
        .form-group{
            .labels{
                display: inline-block;
                width: 15%;
                i{
                    color:red;
                }
            }
            .input{
                width: 80%;display: inline-block
            }
        }
            .validation-error-label, .validation-valid-label{
                display: inline-block;
        }
    }
</style>
<script>
    import model from '../../ajax/PaymentOfPayment/subsidy_management_model'
    export default{
        data(){
            this.model =model(this)
            return{
                modal_applyPay: false,
                modal_recharge: false,
                modal_batch: false,
                modal_recharges: false,
                defaultData:{
                    'subCompanyID': '',
                    'cityID': '',
                    'merchantOperationID': '',
                    'activityOperationID': '',
                    'merchantName': '',
                    'activityName': '',
                    'pageTotal': 1,
                    'pageIndex': 1,
                    'pageSize': 10,
                    mid:''
                },
                zdlists:[],
                subcompanyList:[],
                cityList:[],
                total:{},
                redata:{
                    suspensionTaxAmount:'',
                    withdrawCashAmount:''
                },
                batchData:{
                    activityOperationID:'',
                    merchantOperationID:''
                },
                rechargeData:{
                    subsidyAccountID:'',
                    payoutAmount:'',
                    remarks:'',
                    certificateId:''
                },
                rechargesData:{
                    activityID:'',
                    merchantID:'',
                    incomeAmount:'',
                    remarks:'',
                    certificateId:''
                },
                applyData:{
                    remarks:'',
                    ids:[],
                    payoutAmount:'',
                    mergePay:false,
                    payType:''
                },
                rechargeInfo:{
                    val1:'',
                    val2:'',
                    val3:'',
                    val4:'',
                    val5:'',
                },
                errortext:'',
                applyText:'',
                fire:false,
                uploadText:''
            }
        },
        methods:{
            // *** 请求账户数据
            getZlists(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.subsidyManagement_list(this.defaultData)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('zdlists', response.data.data)
                                this.defaultData.pageTotal=response.data.total
                                
                            }
                        });
                this.model.subsidyManagement_total(this.defaultData)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('total', response.data.data)

                            }
                        });
            },
            //获取分公司数据
            getSubcompany(){
                this.$common_model.getcompany()
                        .then((response)=>{
                            if(response.data.code==0){
                                this.$set('subcompanyList', response.data.data)
                            }
                        });
            },
            //获取城市数据
            getCity(_id){
                this.cityID='';
                let data={
                    'subCompanyID':_id
                }
                this.$common_model.getcity(data)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.$set('cityList', response.data.data)
                            }
                        });
            },
            initList(){
                this.modal_applyPay = false;
                this.modal_recharge = false;
                this.modal_batch = false;
                this.modal_recharges = false;
                back_json.saveArray(this.$route.path,this.defaultData);
                this. getZlists();
            },
            excel(){
                if(!this.zdlists.length>0||sessionStorage.getItem('isHttpin')==1)return;
                //初始化
                this.defaultData.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.subsidyAccountExcel+ $.param(this.defaultData));
            },
            applyPay({id,merchantName,activityName,invoiceAmount,activityOperationID,merchantOperationID}){
                this.applyData={
                    remarks:'',
                    ids:[],
                    payoutAmount:'',
                    mergePay:false,
                    payType:''
                };
                this.rechargeInfo.val1=merchantName;
                this.rechargeInfo.val2=activityName;
                this.rechargeInfo.val3=invoiceAmount;
                this.rechargeInfo.val4=merchantOperationID;
                this.rechargeInfo.val5=activityOperationID;
                this.applyData.ids=[id];
                let data={
                    id:id,
                }
                this.model.subsidyManagement_info(data)
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
                let data=_.cloneDeep(this.applyData);
                data.payoutAmount=accMul(data.payoutAmount,100);
                this.model.subsidyManagement_applyPay(data)
                        .then((response)=>{
                            if(response.data.code == 0){
                                dialogs('success',response.data.message);
                                this.initList();
                            }
                        });
            },
            recharge({id,merchantName,activityName,invoiceAmount,activityOperationID,merchantOperationID}){
                this.rechargeData={
                    subsidyAccountID:'',
                    payoutAmount:'',
                    remarks:'',
                    certificateId:''
                },
                this.rechargeData.subsidyAccountID=id;
                this.rechargeInfo.val1=merchantName;
                this.rechargeInfo.val2=activityName;
                this.rechargeInfo.val3=invoiceAmount;
                this.rechargeInfo.val4=merchantOperationID;
                this.rechargeInfo.val5=activityOperationID;
                this.uploadText='';
                this.modal_recharge = true;
            },
            rechargeTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.errortext='';
                if(!this.$vali.valid){this.fire=true;this.errortext='您的信息未填写完整';return;}
                let data=_.cloneDeep(this.rechargeData);
                data.payoutAmount=accMul(data.payoutAmount,100);
                this.model.subsidyManagement_recharge(data)
                        .then((response)=>{
                            if(response.data.code == 0){
                                dialogs('success',response.data.message);
                                this.initList();
                                 this.modal_recharge = false;
                            }
                        });
            },
            uploadClick(e){
                $(e.target).siblings('input[type="file"]').val('');
                $(e.target).siblings('input[type="file"]').click();
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
                                    vm.rechargesData.certificateId=response.data.data;
                                    vm.saveerror='';
                                    vm.uploadText=files.name;
                                    dialogs('success','上传成功！');
                                }
                            })
                }
            },
            batchApply(){
                this.batchData={
                    activityOperationID:'',
                    merchantOperationID:''
                }
                this.modal_batch=true;
            },
            batchApplyNext(){
                if(this.batchData.activityOperationID==''&&this.batchData.merchantOperationID==''){
                    dialogs('info','活动ID及商户ID不能都为空！');
                    return;
                }
                this.model.subsidyManagement_batch(this.batchData)
                        .then((res)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(res.data.code==0){
                                sessionStorage.setItem('batchData',JSON.stringify(this.batchData));
                                this.$router.go({'name':'subsidy-management-batchpay'});
                            }
                        });
            },
            recharges(){
                this.rechargesData={
                    activityID:'',
                    merchantID:'',
                    incomeAmount:'',
                    remarks:'',
                    certificateId:''
                };
                this.modal_recharges=true;
                this.fire=false;
                this.errortext='';
            },
            rechargesTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.errortext='';
                if(!this.$valis.valid){this.fire=true;this.errortext='您的信息未填写完整';return;}
                let data=_.cloneDeep(this.rechargesData);
                data.incomeAmount=accMul(data.incomeAmount,100);
                this.model.rechargeByMerchantAndActivity(data)
                        .then((response)=>{
                            if(response.data.code == 0){
                                dialogs('success',response.data.message);
                                this.recharges();
                            }
                        });
            },
        },
        watch:{
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.initList()
            }
        },
        ready(){
            let vm=this;
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.getSubcompany();
            vm.getCity();
            vm.getZlists();
        }
    }
</script>