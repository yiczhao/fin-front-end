<template>
    <index title="补贴退税" ptitle="备付金支出"  isshow="isshow">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="reserve_cash_detail_manage"><a v-link="{name:'payment-details'}">付款明细</a></li>
                    <li data-ksa="pay_recheck"><a v-link="{name:'pay-recheck'}">划付复核</a></li>
                    <li data-ksa="subsidy_pay_detail_manage"><a v-link="{name:'subsidy-appropriation'}">补贴划付</a></li>
                    <!--<li class="active"><a v-link="{name:'limit-purchase-detail'}" data-ksa="advance_payment_account_manage">额度采购</a></li>-->
                    <li class="active" data-ksa="subsidy_tax_rebate_detail_manage"><a v-link="{name:'subsidy-tax-rebate'}">补贴退税</a></li>
                    <li data-ksa="subsidy_account_manage"><a v-link="{name:'subsidy-management'}">税金管理</a></li>
                    <li data-ksa="advance_payment_detail_manage"><a v-link="{name:'advance-payment-detail'}">预付款划付</a></li>
                    <li data-ksa="provider_pay_detail"><a v-link="{name:'provider-pay-detail'}">供应商划付</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top"  @click="batchs()" data-ksa="subsidy_tax_rebate_detail_manage.apply_pay">一键审核</a>
                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form">
                                <select class="form-control" v-model="checkForm.subCompanyID"  @change="getCity(checkForm.subCompanyID)">
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
                                <datepicker :value.sync="checkForm.startDate"></datepicker>
                                <span>至</span>
                                <datepicker :value.sync="checkForm.endDate"></datepicker>
                            </div>

                                <input type="text" class="form-control" v-model="checkForm.id" v-limitnumber="checkForm.id" placeholder="ID">

                            <input type="text" class="form-control" v-model="checkForm.backendMerchantCode" placeholder="商户号">
                            <input type="text" class="form-control" v-model="checkForm.backendMerchantName" placeholder="商户简称">
                            <input type="text" class="form-control" v-model="checkForm.backendStoreCode" placeholder="门店号">
                            <input type="text" class="form-control" v-model="checkForm.backendStoreName" placeholder="门店名称">
                            <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="商盟ID（多个ID以逗号隔开）">
                            <input type="text" class="form-control" v-model="checkForm.merchantName" placeholder="商盟商户名称">


                            <select class="form-control" v-model="checkForm.createType">
                                    <option value="">请选择生成方式</option>
                                    <option value="1">系统生成</option>
                                    <option value="2">手工单</option>
                                    <option value="3">手工结算</option>
                                </select>

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
                        <a class="btn btn-info add-top" v-on:click="checkNew" data-ksa="subsidy_tax_rebate_detail_manage.search">查询</a>
                    </div>
                </div>

                <div v-show="!!subsidyTaxRebateDetailList.length"  class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table">
                            <thead>
                                <tr>
                                <th><input type="checkbox" v-model="checkAll" @click="chooseAll"/>ID</th>
                                    <th>生成日期</th>
                                    <th>分公司</th>
                                    <th>城市</th>
                                    <th>付款账户</th>
                                    <th>商户号</th>
                                    <th>商户简称</th>
                                    <th>门店号</th>
                                    <th>门店名称</th>
                                    <th>商盟ID</th>
                                    <th>商盟商户名称</th>
                                    <th>收款账户名</th>
                                    <th>收款账号</th>
                                    <th>生成方式</th>
                                    <th>暂扣税金</th>
                                    <th>交易</th>
                                    <th>状态</th>
                                    <th>付款流水</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(index,strd) in subsidyTaxRebateDetailList" v-bind:class="{'odd':(index%2==0)}">
                                    <td>
                                        <input v-if="strd.status==1" type="checkbox" @click="checked(strd.ischeck,strd.id)" v-model="strd.ischeck"/>
                                        {{strd.id}}
                                    </td>
                                    <td>{{strd.createTime | datetime}}</td>
                                    <td>{{strd.subCompanyName}}</td>
                                    <td>{{strd.cityName}}</td>
                                    <td>{{strd.payAccount}}</td>
                                    <td>{{strd.backendMerchantCode}}</td>
                                    <td>{{strd.backendMerchantName}}</td>
                                    <td>{{strd.backendStoreCode}}</td>
                                    <td>{{strd.backendStoreName}}</td>
                                    <td>{{strd.merchantOperationID}}</td>
                                    <td>
                                        <span v-if="!strd.backendStoreCode">{{strd.merchantName}}</span>
                                    </td>
                                    <td>{{strd.collectionAccountName}}</td>
                                    <td>{{strd.collectionAccountNumber}}</td>
                                    <td>
                                        <template v-if="strd.createType==1">系统生成</template>
                                        <template v-if="strd.createType==2">手工单</template>
                                        <template v-if="strd.createType==3">手工结算</template>
                                    </td>
                                    <td>{{strd.taxRebateAmount/100 | currency ''}}</td>
                                    <td><a v-link="{name:'trade-info',params:{subsidyTaxRebateId:strd.id}}" data-ksa="trade_detail_manage.search">明细</a> </td>
                                    <td>
                                        <template v-if="strd.status==0">
                                            已关闭
                                        </template>
                                        <template v-if="strd.status==1">
                                            等待审核
                                        </template>
                                        <template v-if="strd.status==2">
                                            等待划付
                                        </template>
                                        <template v-if="strd.status==3">
                                            转账中
                                        </template>
                                        <template v-if="strd.status==4">
                                            等待对账
                                        </template>
                                        <template v-if="strd.status==5">
                                            对账成功
                                        </template>
                                        <template v-if="strd.status==6">
                                            划付失败
                                        </template>
                                        <template v-if="strd.status==7">等待复核</template>
                                    </td>
                                    <td>
                                        <template v-if="strd.status==1">
                                            <a href="javascript:void(0);" @click="showModalApplyPayById(strd.id)" data-ksa="subsidy_tax_rebate_detail_manage.apply_pay">申请划付</a>&nbsp;
                                            <a href="javascript:void(0);" @click="updateById(strd.id)" data-ksa="subsidy_tax_rebate_detail_manage.update">更新</a>
                                        </template>
                                        <template v-if="strd.status==7">
                                            <a @click="goRecheck(strd.id,3)" data-ksa="reserve_cash_order_manage.search">查看</a>
                                        </template>
                                        <template v-if="strd.status!=7&&strd.status!=1">
                                            <a @click="gopayment(strd.id,3)" data-ksa="reserve_cash_order_manage.search">查看</a>
                                        </template>
                                    </td>
                                    <td>{{strd.remarks}}</td>
                                </tr>
                                <tr>
                                    <td>合计：</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{{total.taxRebateAmount/100 | currency ''}}</td><td></td><td></td><td></td><td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div  v-else class="no-list">
                    未查询到补贴退税信息！
                </div>


                <div v-show="!!subsidyTaxRebateDetailList.length" class="datatable-bottom">
                   <div class="left">
                        <a class="icon-file-excel" style="line-height: 30px;" v-on:click="subsidyTaxexcel" data-ksa="subsidy_tax_rebate_detail_manage.export">Excel导出</a>
                   </div>

                   <div class="right" v-show="!!subsidyTaxRebateDetailList.length">
                        <page :all="pageall"
                              :cur.sync="checkForm.pageIndex"
                              :page_size.sync="checkForm.pageSize">
                        </page>
                   </div>
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
                            <span style="color: #ff0000;font-family: Bold;font-weight: 700;">{{applyPayInfo.suspensionTaxAmount/100 | currency ''}}</span>  元
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
                    </div> 
            </content-dialog>

        </div>
    </index>
</template>
<style>
    .modal-body button{
        width:35%;
    }
</style>
<script>
    import model from '../../ajax/PaymentOfPayment/rebate_model'
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
                    remarks:'',
                    endDate:"",
                    merchantOperationID:"",
                    merchantName:"",
                    backendMerchantCode:"",
                    backendMerchantName:"",
                    backendStoreCode:"",
                    backendStoreName:"",
                    pageIndex:1,
                    pageSize:10,
                    timeRange:'4'
                },
                subcompanyList:[],
                pageall:1,
                cityList:[],
                AccountS:[],
                subsidyTaxRebateDetailList:[],
                payTypes:'',
                mergePay:false,
                showPayAccount:'',
                applyPayRemarks:'',
                dialogTitle:'',
                submitId:'',
                applyPayInfo:{
                },
                total:{
                    taxRebateAmount:'',
                }
            }
        },
        computed:{
            checkAll(){
                let clength=0;
                this.subsidyTaxRebateDetailList.map((value)=>{
                    (!value.ischeck&&value.status==1)?clength++:null;
                })
                return !clength
            }
        },
        methods:{
            chooseAll(){
                this.AccountS=[];
                let cloneData=_.cloneDeep(this.subsidyTaxRebateDetailList);
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
                this.subsidyTaxRebateDetailList=cloneData;
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
             getsubsidyTaxRebateDetailList(data){
                 if(sessionStorage.getItem('isHttpin')==1)return;
                 this.model.rebate_list(data)
                    .then((response)=>{
                        if(response.data.code==0){
                            this.$set('subsidyTaxRebateDetailList', response.data.data)
                            this.$set('pageall', response.data.total)
                        }
                    });
                 this.model.rebate_total(data)
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
            clear(){
                this.payTypes='';
                this.mergePay=false;
            },
            updateById(id){
                this.model.rebate_update(id)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.query();
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
                array.push(id);
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
                    subsidyType:3
                }
                this.submitId=idArray;
                this.clear();
                this.model.select_rebate(data)
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
                var mes;
                (this.submitId.length>1)?mes='审核成功':mes='申请成功';
                let data={
                    ids:this.submitId,
                    payType:this.payTypes,
                    mergePay:this.mergePay
                    
                }
                this.model.rebate_applyPay(JSON.stringify(data))
                        .then((response)=>{
                            // *** 判断请求是否成功如若
                            if(response.data.code==0){
                                dialogs('success',mes);
                                this.modal_applyPay = false;
                            }
                            this.query();
                        });
            },
            checkNew(){
                this.checkForm.pageIndex=1;
                this.query();
            },
            query() {
                this.AccountS=[];
                if (this.checkForm.startDate=="" && this.checkForm.endDate=="") {
                    this.getTime();
                }
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getsubsidyTaxRebateDetailList(this.checkForm);
            },
            subsidyTaxexcel(){
                if(!this.subsidyTaxRebateDetailList.length>0)return;
                if (this.checkForm.startDate=="" && this.checkForm.endDate=="") {
                    this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                    this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
                }
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.subsidyTaxexcel+ $.param(this.checkForm));
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
            (this.$route.params.subsidyTaxRebateID==':subsidyTaxRebateID')?this.checkForm.id='':this.checkForm.id=this.$route.params.subsidyTaxRebateID;
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