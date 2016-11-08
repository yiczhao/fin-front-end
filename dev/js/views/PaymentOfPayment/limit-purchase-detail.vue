<template>
    <index title="额度采购" ptitle="备付金支出"  isshow="isshow">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="reserve_cash_detail_manage"><a v-link="{name:'payment-details'}">付款明细</a></li>
                    <li data-ksa="pay_recheck"><a v-link="{name:'pay-recheck'}">划付复核</a></li>
                    <li data-ksa="subsidy_pay_detail_manage"><a v-link="{name:'subsidy-appropriation'}">补贴划付</a></li>
                    <!--<li class="active"><a v-link="{name:'limit-purchase-detail'}" data-ksa="advance_payment_account_manage">额度采购</a></li>-->
                    <li data-ksa="subsidy_tax_rebate_detail_manage"><a v-link="{name:'subsidy-tax-rebate'}">补贴退税</a></li>
                    <li data-ksa="subsidy_account_manage"><a v-link="{name:'subsidy-management'}">退税管理</a></li>
                    <li data-ksa="advance_payment_detail_manage"><a v-link="{name:'advance-payment-detail'}">预付款划付</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">

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

                            <select class="form-control" v-model="checkForm.timeRange" @change="getTime()">
                                <option value="5">今天</option>
                                <option value="0">昨天</option>
                                <option value="1">最近一周</option>
                                <option value="2">最近一个月</option>
                                <option value="3">最近三个月</option>
                                <option value="4">自定义时间</option>
                            </select>

                            <div class="inline" v-show="checkForm.timeRange==4">
                                <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                                <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                            </div>

                            <input type="text" class="form-control" v-model="checkForm.id" v-limitnumber="checkForm.id" placeholder="ID">

                            <input type="text" class="form-control" v-model="checkForm.merchantID" placeholder="商户ID" v-limitnumber="checkForm.merchantID">

                            <input type="text" class="form-control" v-model="checkForm.keywords" style="width:192px;" placeholder="商户名、收款账户名、帐号">

                            <select class="form-control" v-model="checkForm.status">
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

                            <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="备注">
                        </form> 
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="query" data-ksa="limit_purchase_account_manage.search">查询</a>
                    </div>
                </div>

                <div v-show="!!limitPurchaseDetailList.length" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table">
                            <thead>
                                <tr>
                                    <th>编号</th>
                                    <th>采购时间</th>
                                    <th>分公司</th>
                                    <th>城市</th>
                                    <th>付款账户</th>
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>收款账户信息</th>
                                    <th>采购额度</th>
                                    <th>采购成本</th>
                                    <th>账户详情</th>
                                    <th>状态</th>
                                    <th>付款方式</th>
                                    <th>付款流水</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(index,lpd) in limitPurchaseDetailList">
                                    <td>{{index+1}}</td>
                                    <td>{{lpd.purchaseTime | datetime}}</td>
                                    <td>{{lpd.subCompanyName}}</td>
                                    <td>{{lpd.cityName}}</td>
                                    <td>{{lpd.payAccount}}</td>
                                    <td>{{lpd.merchantOperationID}}</td>
                                    <td>{{lpd.merchantName}}</td>
                                    <td>{{lpd.collectionAccountName}}<br/>{{lpd.collectionAccountNumber}}</td>
                                    <td>{{lpd.purchaseLimit/100 | currency ''}}</td>
                                    <td>{{lpd.purchaseCost/100 | currency ''}}</td>
                                    <td><a  @click="goinfo(lpd.limitPurchaseAccountInfoID,lpd.merchantName)" data-ksa="limit_purchase_account_manage.search">查看</a></td>
                                    <td>
                                        <template v-if="lpd.status==1">
                                            已关闭
                                        </template>
                                        <template v-if="lpd.status==2">
                                            等待划付
                                        </template>
                                        <template v-if="lpd.status==3">
                                            转账中
                                        </template>
                                        <template v-if="lpd.status==4">
                                            等待对账
                                        </template>
                                        <template v-if="lpd.status==5">
                                            对账成功
                                        </template>
                                        <template v-if="lpd.status==6">
                                            对账失败
                                        </template>
                                        <template v-if="lpd.status==7">等待复核</template>
                                        <template v-if="lpd.status==8">复核不通过</template>
                                    </td>
                                    <td>
                                        <template v-if="lpd.payType==1">现金购买</template>
                                        <template v-if="lpd.payType==2">刷卡购买</template>
                                    </td>
                                    <td><a @click="gopayment(lpd.id,2)" data-ksa="reserve_cash_order_manage.search">查看</a></td>
                                    <td>{{lpd.remarks}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">
                       <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" v-on:click="tradeDetailexcel" data-ksa="trade_detail_manage.export">Excel导出</a>
                       </div>

                       <div class="right">
                            <page :all="pageall"
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                       </div>
                    </div>
                </div>

                <div style="padding: 30px;font-size: 16px;text-align: center" v-else>
                    未查询到额度采购数据！
                </div>
            </div>
        </div>
    </index>
</template>
<style>
    .datatable-scroll{
        overflow:auto;
    }
    .page-bar{
        margin: 25px auto;
        text-align: center;
    }
</style>
<script>
    import model from '../../ajax/PaymentOfPayment/limit_model'
    export default{
        data(){
            this.model=model(this);
            return{
                checkForm:{
                    id:'',
                    subCompanyID:"",
                    cityID:"",
                    status:"",
                    remarks:"",
                    startDate:"",
                    endDate:"",
                    merchantID:"",
                    merchantName:"",
                    keywords:"",
                    pageIndex:1,
                    pageSize:10,
                    timeRange:'3'
                },
                pageall:1,
                subcompanyList:[],
                cityList:[],
                limitPurchaseDetailList:[]
            }
        },
        methods:{
            //获取补贴划付数据
             getlimitPurchaseDetailList(data){
                 if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.limit_list(data)
                    .then((response)=>{
                        if(response.data.code==0){
                             this.$set('limitPurchaseDetailList', response.data.data)
                             this.$set('pageall', response.data.total)
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
            query() {
                // let data=this.data;
                if (this.checkForm.startDate=="" && this.checkForm.endDate=="") {
                    this.getTime()
                }
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getlimitPurchaseDetailList(this.checkForm);
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
            goinfo(a,b){
                this.model.skipToInfo(a)
                        .then((response)=>{
                                if(response.data.code==0){
                                    this.$router.go({'name':'limitaccount-info',params:{'limitPurchaseMerchantInfoID':response.data.data,'accountName':b}});
                                }
                        })
            },
            getTime(){
                this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
            }
        },
        ready() {
            (this.$route.params.id==':id')? this.id='' :this.id=this.$route.params.id;
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