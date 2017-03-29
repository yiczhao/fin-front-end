<template>
    <index title="批量提现"
           :ptitle="'备付金支出'"
           :p2title="'税金管理'"
           :hname="'payment-details'"
           :h2name="'subsidy-management'"
           isshow="isshow">
        <div class="content pay-recheck" slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-left">
                        <span class="btn btn-add add-top" @click="batchsBtn" data-ksa="subsidy_account_manage.with_draw" style="margin-top:20px;">确定提现</span>
                        <span class="btn btn-add add-top" v-link="{name:'subsidy-management'}" style="margin-top:20px;">返回上一步</span>
                    </div>
                    <div class="heading-middle" style="padding-right: 20px;">
                        共{{recheckLists.length}}条记录，已选{{checkedIds.lengths}}个记录，合计可提现{{withdrawCashAmounts/100 | currency ''}}元
                    </div>
                </div>
                <div v-show="recheckLists.length>0" class="dataTables_wrapper">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" v-model="checkAll" @click="chooseAll"></th>
                                    <th>活动ID</th>
                                    <th>活动名称</th>
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>收款账号</th>
                                    <th>收款账户名</th>
                                    <th>退税款</th>
                                    <th>可提现金额</th>
                                </tr>
                            </thead>
                            <tr v-for="(index,n) in recheckLists" v-bind:class="{'odd':(index%2==0)}">
                                <td><input type="checkbox" v-if="n.withdrawCashAmount!=0" @click="checked(n)" v-model="n.ischeck"/></td>
                                <td>{{n.activityOperationID}}</td>
                                <td>{{n.activityName}}</td>
                                <td>{{n.merchantOperationID}}</td>
                                <td>{{n.merchantName}}</td>
                                <td>{{n.receiptAccountNumber}}</td>
                                <td>{{n.receiptAccountName}}</td>
                                <td>{{n.suspensionTaxAmount/100 | currency ''}}</td>
                                <td>{{n.withdrawCashAmount/100 | currency ''}}</td>
                            </tr>
                            <tr>
                                <td>合计：</td>
                                <td></td>
                                <td></td><td></td><td></td><td></td><td></td>
                                <td>{{suspensionTaxAmount/100 | currency ''}}</td>
                                <td>{{total/100 | currency ''}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="no-list" v-show="!recheckLists.length>0" v-cloak>
                    未查询到数据！
                </div>
            </div>
            <content-dialog
                    :show.sync="show" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="dtitle" @kok="batchs" @kcancel="show = false"
            >
                <validator name="vali">
                <div class="form-group">
                    <label class="control-label">合计提现金额 {{withdrawCashAmounts/100 | currency ''}} 元</label>
                </div>
                <div class="form-group">
                    <label class="control-label"style="width: 14%;"><i style="color:red;">*</i>付款方式：</label>
                    <select v-validate:val1="['required']" class="form-control" v-model="batchsData.payType" style="display: inline-block;width: 80%;">
                        <option value="">请选择付款方式</option>
                        <option value="1">备付金账户</option>
                        <option value="2">商户预付款账户</option>
                        <option value="5">网银转账</option>
                    </select>
                </div>
                <div class="form-group" v-show="batchsData.payType==1">
                    <label class="payment-method"><i style="color:red;">*</i>付款账号：</label>
                    <select class="form-control" v-model="batchsData.bankAccountID" style="width: 30%;display: inline-block;">
                        <option value="">--请选择--</option>
                        <option v-for="n in bankAccountList" v-text="n.shortName" :value="n.id"></option>
                    </select>

                </div>
                <div class="form-group" v-show="batchsData.payType==1">
                    <label style="padding-left: 13%"><input type="checkbox" v-model="batchsData.mergePay"/>
                        相同账户合并付款</label>
                </div>
                <div class="form-group">
                    <label style="width:15%;text-align:right;position: relative;top: -95px;" class="control-label"><i style="color:red;">*</i>备注：</label>
                    <textarea v-validate:val2="['required']" style="display: inline-block;width: 80%;" rows="5" cols="5" class="form-control" v-model="batchsData.remarks"></textarea>
                </div>
                </validator>
            </content-dialog>
        </div>
    </index>
</template>
<script>
    import model from '../../ajax/PaymentOfPayment/subsidy_management_model'

    export default {
        data(){
            this.model =model(this)
            return {
                show:false,
                total:0,
                batchsData:{
                    mergePay:false,
                    remarks:'',
                    payType:'',
                    bankAccountID:''
                },
                recheckLists:[],
                checkedIds:{
                    ids:[],
                    lengths:0
                },
                id:'',
                subcompanyList:[],
                bankAccountList: [],
                dtitle:'',
                remarks:'',
                withdrawCashAmounts:0,
                suspensionTaxAmount:0
            }
        },
        methods:{
            getLists(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.total=this.suspensionTaxAmount=this.withdrawCashAmounts=0;
                this.model.subsidyManagement_batch(JSON.parse(sessionStorage.getItem('batchData')))
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('recheckLists', response.data.data);
                                response.data.data.map((value)=>{
                                    this.total+=value.withdrawCashAmount;
                                    this.suspensionTaxAmount+=value.suspensionTaxAmount;
                                })
                            }
                        });
            },
            //获取付款账户数据
            getBankAccountList(_type){
                this.$common_model.getbankAccount(_type)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('bankAccountList', response.data.data)
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
            query(){
                this.show=false;
                this.checkedIds={
                    ids:[],
                    lengths:0
                };
                this.getLists();
            },
            chooseAll(){
                this.checkedIds={
                    ids:[],
                    lengths:0
                };
                this.withdrawCashAmounts=0;
                let cloneData=_.cloneDeep(this.recheckLists);
                cloneData.map((value)=>{
                    if(value.withdrawCashAmount==0)return;
                    if(this.checkAll){
                        value.ischeck=false;
                        this.withdrawCashAmounts=0;
                    }else{
                        this.checkedIds.ids.push(value.id);
                        this.checkedIds.lengths++;
                        this.withdrawCashAmounts+=value.withdrawCashAmount;
                        value.ischeck=true;
                    }
                })
                this.recheckLists=cloneData;
            },
            checked({ischeck,id,withdrawCashAmount}){
                if(!ischeck){
                    this.checkedIds.ids.push(id);
                    this.withdrawCashAmounts+=withdrawCashAmount;
                    this.checkedIds.lengths++;
                }else{
                    this.withdrawCashAmounts-=withdrawCashAmount;
                    this.checkedIds.lengths--;
                    _.remove(this.checkedIds.ids, function(n) {
                        return n==id;
                    })
                }
            },
            batchsBtn(){
                if(!this.checkedIds.lengths){
                    dialogs('info','未勾选提现信息！');
                    return;
                }
                if(this.withdrawCashAmounts==0){
                    dialogs('info','可提现金额为0！');
                    return;
                }
                this.dtitle='批量提现';
                this.batchsData={
                      mergePay:false,
                      remarks:'',
                      payType:'',
                      bankAccountID:''
                 };
                this.show=true;
            },
            batchs(){
                if(!this.$vali.valid){
                    dialogs('info','请填写必填信息！');
                    return;
                }
                if(this.batchsData.payType==''){
                    this.applyText='请选择付款方式！';
                    return;
                }
                if(this.batchsData.payType=='1' && this.batchsData.bankAccountID==''){
                    dialogs('info','请选择付款账户！');
                    return;
                }
                let data={
                    'bankAccountID':this.batchsData.bankAccountID,
                    'payType':this.batchsData.payType,
                    'remarks':this.batchsData.remarks,
                    'mergePay':this.batchsData.mergePay,
                    'ids':this.checkedIds.ids,
                }
                this.model.subsidyManagement_batchs(data)
                        .then( (response)=> {
                            if(response.data.code==0){
                                dialogs('success',response.data.message);
                            }else{
                                dialogs('error',response.data.message);
                                return;
                            }
                            if(back_json.num==0){
                                back_json.num++;
                            }
                            this.query();
                        })
            }
        },
        computed:{
            checkAll(){
                let clength=0;
                this.recheckLists.map((value)=>{
                    (!value.ischeck)?clength++:null;
                })
                return !clength
            }
        },
        ready(){
            this.getSubcompany();
            this.getBankAccountList('1');
            this.query();
        },
        watch:{
        }
    }
</script>
