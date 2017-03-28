<template>
    <index title="补贴划付" ptitle="备付金支出"  isshow="isshow">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="reserve_cash_detail_manage"><a v-link="{name:'payment-details'}">付款明细</a></li>
                    <li data-ksa="pay_recheck"><a v-link="{name:'pay-recheck'}">划付复核</a></li>
                    <li class="active" data-ksa="subsidy_pay_detail_manage"><a v-link="{name:'subsidy-appropriation'}">补贴划付</a></li>
                    <!--<li class="active"><a v-link="{name:'limit-purchase-detail'}" data-ksa="advance_payment_account_manage">额度采购</a></li>-->
                    <li data-ksa="subsidy_tax_rebate_detail_manage"><a v-link="{name:'subsidy-tax-rebate'}">补贴退税</a></li>
                    <li data-ksa="subsidy_account_manage"><a v-link="{name:'subsidy-management'}">税金管理</a></li>
                    <li data-ksa="advance_payment_detail_manage"><a v-link="{name:'advance-payment-detail'}">预付款划付</a></li>
                    <li data-ksa="provider_pay_detail"><a v-link="{name:'provider-pay-detail'}">供应商划付</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" data-toggle="modal" @click="batchs()" data-ksa="subsidy_pay_detail_manage.apply_pay">一键审核</a>
                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form">
                                <select class="form-control" v-model="checkForm.subCompanyID" @change="getCity(checkForm.subCompanyID)">
                                    <option value="">全部分公司</option>
                                    <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                                </select>

                                <select class="form-control" v-model="checkForm.cityID">
                                    <option value="">全部城市</option>
                                    <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                                </select>

                                <select class="form-control" v-model="checkForm.timeRange" @change="getTime">
                                    <option value="5">今天</option>
                                    <option value="0">昨天</option>
                                    <option value="1">最近一周</option>
                                    <option value="2">最近一个月</option>
                                    <option value="3">最近三个月</option>
                                    <option value="4">自定义时间</option>
                                </select>

                                <div  v-show="checkForm.timeRange==4" class="inline">
                                    <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                                    <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                                </div>

                                <input type="text" class="form-control" v-model="checkForm.id" v-limitnumber="checkForm.id" placeholder="ID">

                                <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="商户ID" v-limitnumber="checkForm.merchantOperationID">

                                <input type="text" class="form-control" v-model="checkForm.keywords" placeholder="商户名、收款账户名、帐号">

                                <select class="form-control" v-model="checkForm.createType">
                                    <option value="">请选择生成方式</option>
                                    <option value="1">系统生成</option>
                                    <option value="2">手工单</option>
                                    <option value="3">手工结算</option>
                                    <option value="4">调账</option>
                                </select>

                                <input type="text" class="form-control" placeholder="活动ID" v-limitnumber="checkForm.activityOperationID" v-model="checkForm.activityOperationID">

                                <select class="form-control" v-model="checkForm.status">
                                    <option value="">请选择状态</option>
                                    <option value="1">等待审核</option>
                                    <option value="7">等待复核</option>
                                    <option value="2">等待划付</option>
                                    <option value="3">转账中</option>
                                    <option value="4">等待对账</option>
                                    <option value="5">对账成功</option>
                                    <option value="6">划付失败</option>
                                </select>

                                <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="备注">
                        </form> 
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="checkNew" data-ksa="subsidy_pay_detail_manage.search">查询</a>
                    </div>
                </div>

                <div v-show="!!subsidyAppropriationList.length" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                            <table   id="table1" class="table">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" v-model="checkAll" @click="chooseAll"/>ID</th>
                                        <th>生成日期</th>
                                        <th>分公司</th>
                                        <th>城市</th>
                                        <th>付款账户</th>
                                        <th>商户ID</th>
                                        <th>商户名称</th>
                                        <th>活动ID</th>
                                        <th>活动名称</th>
                                        <th>收款账户名</th>
                                        <th>收款账号</th>
                                        <th>提入行号</th>
                                        <th>是否建行</th>
                                        <th>生成方式</th>
                                        <th>三方应收</th>
                                        <th>划付金额</th>
                                        <th>暂扣税金</th>
                                        <th>交易</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                        <th>备注</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id="All" v-for="(index,sa) in subsidyAppropriationList" v-bind:class="{'odd':(index%2==0)}">
                                        <td>
                                            <input v-if="sa.status==1" type="checkbox" @click="checked(sa.ischeck,sa.id)" v-model="sa.ischeck"/>
                                            {{sa.id}}
                                        </td>
                                        <td>{{sa.createAT | datetime}}</td>
                                        <td>{{sa.subCompanyName}}</td>
                                        <td>{{sa.cityName}}</td>
                                        <td>{{sa.paymentAccountShortName}}</td>
                                        <td>{{sa.merchantOperationID}}</td>
                                        <td>{{sa.merchantName}}</td>
                                        <td>{{sa.activityOperationID}}</td>
                                        <td>{{sa.activityName}}</td>
                                        <td>{{sa.receiptAccountName}}</td>
                                        <td>{{sa.receiptAccountNumber}}</td>
                                        <td>
                                            <template v-if="sa.ccb"></template>
                                            <template v-else>{{sa.receiptBankNumber}}</template>
                                        </td>
                                        <td>
                                            <template v-if="sa.ccb">是</template>
                                            <template v-else>否</template>
                                        </td>
                                        <td>
                                            <template v-if="sa.createType==1">系统生成</template>
                                            <template v-if="sa.createType==2">手工单</template>
                                            <template v-if="sa.createType==3">手工结算</template>
                                            <template v-if="sa.createType==4">调账</template>
                                        </td>
                                        <td>{{sa.thirdPartySubsidyShould/100 | currency ''}}</td>
                                        <td>{{sa.payAmount/100 | currency ''}}</td>
                                        <td>{{sa.suspensionTaxAmount/100 | currency ''}}</td>
                                        <td><a v-link="{name:'trade-info',params:{subsidyPayId:sa.id}}" data-ksa="trade_detail_manage.search">明细</a> </td>
                                        <td>
                                            <template v-if="sa.status==0">
                                                已关闭
                                            </template>
                                            <template v-if="sa.status==1">
                                                等待审核
                                            </template>
                                            <template v-if="sa.status==2">
                                                等待划付
                                            </template>
                                            <template v-if="sa.status==3">
                                                转账中
                                            </template>
                                            <template v-if="sa.status==4">
                                                等待对账
                                            </template>
                                            <template v-if="sa.status==5">
                                                对账成功
                                            </template>
                                            <template v-if="sa.status==6">
                                                划付失败
                                            </template>
                                            <template v-if="sa.status==7">等待复核</template>
                                        </td>
                                        <td>
                                            <template v-if="sa.status==1">
                                                <a @click="showModalApplyPayById(sa.id)" data-ksa="subsidy_pay_detail_manage.apply_pay">申请划付</a>
                                                <a @click="updateById(sa.id)" data-ksa="subsidy_pay_detail_manage.update">更新</a>
                                            </template>
                                            <template v-if="sa.status==7">
                                                <a @click="goRecheck(sa.id,1)">查看</a>
                                            </template>
                                            <template v-if="sa.status!=7&&sa.status!=1">
                                                <a @click="gopayment(sa.id,1)" data-ksa="reserve_cash_order_manage.search">查看</a>
                                            </template>
                                        </td>
                                        <td>{{sa.remarks}}</td>
                                    </tr>
                                    <tr>
                                        <td>合计：</td>
                                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                        <td>{{total.thirdPartySubsidyShould/100 | currency ''}}</td>
                                        <td>{{total.payAmount/100 | currency ''}}</td>
                                        <td>{{total.suspensionTaxAmount/100 | currency ''}}</td><td></td><td></td><td></td><td></td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>

                    <div class="datatable-bottom">
                       <div class="left">
                            <a class="icon-file-excel" style="line-height:30px;" v-on:click="subsidyPayexcel" data-ksa="subsidy_pay_detail_manage.export">Excel导出</a>
                       </div>

                       <div class="right">
                            <page :all="pageall"
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                       </div>
                    </div>
                </div>

                <div class="no-list" v-else>
                    未查询到补贴划付信息！
                </div>
            </div>


            <content-dialog
                    :show.sync="modal_applyPay" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="dialogTitle" @kok="submit" @kcancel="modal_applyPay = false"
                    >
                    <div class="modal-body">
                        <div class="form-group">
                            您目前选择了 <span style="color:#ff9900; font-size:13px;font-family: Bold;font-weight: 700;">{{applyPayInfo.payCount}}</span> 条划付记录，
                            共计 <span style="color: #008000;font-family: Bold;font-weight: 700;">{{applyPayInfo.tradeCount}}</span>  笔，
                            三方应收： <span style="color: #ff0000;font-family: Bold;font-weight: 700;">{{applyPayInfo.thirdPartySubsidyShould/100 | currency ''}}</span>  元，
                            补贴划付： <span style="color: #ff0000;font-family: Bold;font-weight: 700;">{{applyPayInfo.payAmount/100 | currency ''}}</span>  元，
                            暂扣税金： <span style="color: #ff0000;font-family: Bold;font-weight: 700;">{{applyPayInfo.suspensionTaxAmount/100 | currency ''}}</span>  元
                        </div>
                        <div class="form-group">
                            <label class="payment-method"><i style="color:red;">*</i>付款方式：</label>
                            <select class="form-control" v-model="payTypes" style="width: 30%;display: inline-block;">
                                <option value="">请选择付款方式</option>
                                <option value="1">备付金账户</option>
                                <option value="2">商户预付款账户</option>
                                <option value="3">银行结算</option>
                            </select>
                        </div>
                        <div class="form-group" v-show="payTypes==1">
                            <label class="payment-method"><i style="color:red;">*</i>付款账号：</label>
                            <select class="form-control" v-model="subCompanyID" style="width: 30%;display: inline-block;">
                                <option value="">全部分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>

                        </div>
                        <div class="form-group"  v-show="payTypes==1">
                            <label><input type="checkbox" v-model="mergePay"/>
                                相同账户合并付款</label>
                        </div>
                    </div>
            </content-dialog>



        </div>
    </index>
</template>
<style scoped>
    .modal-body button{
        width:35%;
    }
</style>
<script>
    import model from '../../ajax/PaymentOfPayment/appropriation_model'
    export default{
        data(){
            this.model =model(this)
            return{
                modal_applyPay: false,
                checkForm:{
                    id:"",
                    subCompanyID:"",
                    cityID:"",
                    createType:"",
                    status:"",
                    startDate:"",
                    endDate:"",
                    merchantOperationID:"",
                    merchantName:"",
                    keywords:"",
                    remarks:"",
                    activityOperationID:"",
                    pageIndex:1,
                    pageSize:10,
                    timeRange:'3'
                },
                subCompanyID:'',
                subcompanyList:[],
                pageall:1,
                cityList:[],
                AccountS:[],
                showPayAccount:'',
                subsidyAppropriationList:[],
                payTypes:'',
                mergePay:false,
                applyPayInfo:{
                },
                applyPayRemarks:'',
                dialogTitle:'',
                submitId:'',
                total:{
                    thirdPartySubsidyShould:'',
                    suspensionTaxAmount:'',
                    payAmount:''
                }
            }
        },
        computed:{
            checkAll(){
                let clength=0;
                this.subsidyAppropriationList.map((value)=>{
                    (!value.ischeck&&value.status==1)?clength++:null;
                })
                return !clength
            }
        },
        methods:{
            chooseAll(){
                this.AccountS=[];
                let cloneData=_.cloneDeep(this.subsidyAppropriationList);
                cloneData.map((value)=>{
                    if(this.checkAll){
                        value.ischeck=false;
                    }else{
                        if(value.status==1){
                            this.AccountS.push(value.id);
                            value.ischeck=true;
                        }
                    }
                })
                this.subsidyAppropriationList=cloneData;
            },
            checked(bool,_id){
                if(!bool){
                    this.AccountS.push(_id);
                }else{
                    _.remove(this.AccountS, function(n) {
                        return n==_id;
                    })
                }
            },
            //获取补贴划付数据
             getSubsidyAppropriationList(data){
                 if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.appropriation_list(data)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('subsidyAppropriationList', response.data.data)
                            this.$set('pageall', response.data.total)
                        }
                    });
                 this.model.appropriation_total(data)
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
                        // *** 判断请求是否成功如若成功则填充数据到模型
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
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('cityList', response.data.data)
                        }
                    });
            },
            clear(){
                this.subCompanyID='';
                this.payTypes='';
                this.mergePay=false;
            },
            updateById(id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.subsidy_update(id)
                        .then((response)=>{
                            if(response.data.code==0){
                                //刷新数据
                                this.query();
                                //提示成功
                                dialogs('success','更新成功！');
                            }
                        });
            },
            batchs(){
                if(this.AccountS.length<=0){
                    dialogs('info','请勾选审核信息！');
                    return false
                }
                this.getApplyPayInfoByIDs(this.AccountS);
                this.dialogTitle='一键审核';
            },
            showModalApplyPayById(id){
                let array=[];
                array.push(parseInt(id));
                this.getApplyPayInfoByIDs(array);
                this.dialogTitle='申请划付';
            },
            getApplyPayInfoByIDs(idArray){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(idArray.length<=0){
                    return false
                }
                let data={
                    ids:idArray.toString(),
                    subsidyType:1
                }
                this.submitId=idArray;
                this.clear();
                this.model.select_subsidypay(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若
                            // *** 判断请求是否成功如若
                            if(response.data.code==0){
                                this.$set('applyPayInfo', response.data.data)
                                this.modal_applyPay = true;
                            }
                        });
            },
            submit(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.payTypes==''){
                    dialogs('info','请选择付款方式！');
                    return;
                }
                if(this.payTypes=='1' && this.subCompanyID==''){
                    dialogs('info','请选择分公司！');
                    return;
                }
                let data={
                    ids:this.submitId,
                    payType:this.payTypes,
                    subCompanyID:this.subCompanyID,
                    mergePay:this.mergePay
                }
                var mes;
                (this.submitId.length>1)?mes='审核成功':mes='申请成功';
                this.model.subsidy_applyPay(data)
                        .then((response)=>{
                        // *** 判断请求是否成功如若
                                if(response.data.code==0){
                                    dialogs('success',mes);
                                    this.modal_applyPay = false;
                                    this.query();
                                }else{
                                    dialogs('error',response.data.message);
                                    return;
                                }
                            });
            },
            checkNew(){
                this.checkForm.pageIndex=1;
                this.query();
            },
            query() {
                this.modal_applyPay = false;
                this.AccountS=[];
                if (this.checkForm.startDate=="" && this.checkForm.endDate=="") {
                    this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                    this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
                }
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getSubsidyAppropriationList(this.checkForm);
            },
            subsidyPayexcel(){
                if(!this.subsidyAppropriationList.length>0)return;
                if (this.checkForm.startDate=="" && this.checkForm.endDate=="") {
                    this.getTime();
                }
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.subsidyPayexcel+ $.param(this.checkForm));
            },
            gopayment(a,b){
                let data={
                    "streamID":a ,
                    "streamType": b
                }
                this.$common_model.skipToOrder(data)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.$router.go({name:'payment-details',params:{reserveCashOrderNumber:response.data.data.orderNumber,payType:response.data.data.payType}});
                            }
                })
            },
            goRecheck(a,b){
                let data={
                    "streamID":a ,
                    "streamType": b
                }
                this.$common_model.skipToRecheck(data)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.$router.go({name:'pay-recheck',params:{recheckId:response.data.data.id}});
                            }
                        })
            },
            getTime(){
                this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
            }
        },
        ready() {
            (this.$route.params.subsidyPayID==':subsidyPayID')?this.checkForm.id='':this.checkForm.id=this.$route.params.subsidyPayID;
            (this.$route.params.subsidySHid==':subsidySHid')?this.checkForm.merchantOperationID='':this.checkForm.merchantOperationID=this.$route.params.subsidySHid;
            (this.$route.params.subsidyHDid==':subsidyHDid')?this.checkForm.activityOperationID='':this.checkForm.activityOperationID=this.$route.params.subsidyHDid;
            this.getSubcompany();
            this.getCity();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.query();
        },
         watch:{
            'checkForm.pageIndex+checkForm.pageSize'(){
                this.query();
            }
       }
    }
</script>