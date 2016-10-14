<template>
    <index title="预付款划付" ptitle="备付金支出"  isshow="isshow">
        <div class="content" slot="content">
            <div class="panel panel-flat">
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

                            <select class="form-control" v-model="checkForm.timeRange">
                                <option value="5">今天</option>
                                <option value="0">昨天</option>
                                <option value="1">最近一周</option>
                                <option value="2">最近一个月</option>
                                <option value="3">最近三个月</option>
                                <option value="4">自定义时间</option>
                            </select>

                            <div v-show="checkForm.timeRange==4">
                                <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                                <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                            </div>

                            <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="商户ID" v-limitnumber="checkForm.merchantOperationID">

                            <input type="text" class="form-control" v-model="checkForm.advancePaymentAccountDetailID" placeholder="预付款流水ID" v-limitnumber="checkForm.advancePaymentAccountDetailID">

                            <input type="text" class="form-control" v-model="checkForm.keywords" placeholder="商户名、收款账户名、帐号" >

                            <select class="form-control" v-model="checkForm.status">
                                <option value="">请选择状态</option>
                                <option value="0">已关闭</option>
                                <option value="7">等待复核</option>
                                <option value="8">复核不通过</option>
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
                        <a class="btn btn-info add-top" v-on:click="query" data-ksa="advance_payment_detail_manage.search">查询</a>
                    </div>
                </div>

                <div v-show="!!advancePaymentDetailList.length" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>申请时间</th>
                                    <th>分公司</th>
                                    <th>城市</th>
                                    <th>付款账户</th>
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>收款账户信息</th>
                                    <th>预付金额</th>
                                    <th>账户详情</th>
                                    <th>状态</th>
                                    <th>付款流水</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(index,apd) in advancePaymentDetailList" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{apd.advancePaymentAccountDetailID}}</td>
                                    <td>{{apd.applyTime | datetime}}</td>
                                    <td>{{apd.subCompanyName}}</td>
                                    <td>{{apd.cityName}}</td>
                                    <td>{{apd.payAccount}}</td>
                                    <td>{{apd.merchantOperationID}}</td>
                                    <td>{{apd.merchantName}}</td>
                                    <td>{{apd.collectionAccountName}}<br/>{{apd.collectionAccountNumber}}</td>
                                    <td>{{apd.advancePaymentAmount/100 | currency ''}}</td>
                                    <td>
                                        <a v-if="apd.reserveCashOrderID==0" v-link="{'name':'prepayment-info',params:{'id':apd.advancePaymentMerchantID,'payRecheckID':apd.payRecheckID}}" data-ksa="advance_payment_account_manage.search">查看</a>
                                        <a v-if="apd.reserveCashOrderID!=0" v-link="{'name':'prepayment-info',params:{'id':apd.advancePaymentMerchantID,'orderNumber':apd.orderNumber}}" data-ksa="advance_payment_account_manage.search">查看</a>
                                    </td>
                                    <td>
                                        <template v-if="apd.status==0">已关闭</template>
                                        <template v-if="apd.status==7">等待复核</template>
                                        <template v-if="apd.status==8">复核不通过</template>
                                        <template v-if="apd.status==2">等待划付</template>
                                        <template v-if="apd.status==3">转账中</template>
                                        <template v-if="apd.status==4">等待对账</template>
                                        <template v-if="apd.status==5">对账成功</template>
                                        <template v-if="apd.status==6">划付失败</template>
                                    </td>
                                    <td>
                                        <a v-if="apd.status==7||apd.status==8" v-link="{'name':'pay-recheck',params:{'recheckId':apd.payRecheckID}}">查看</a>
                                        <a v-if="apd.status!=1&&apd.status!=7&&apd.status!=8" @click="gopayment(apd.reserveCashOrderID,4)" data-ksa="reserve_cash_order_manage.search">查看</a>
                                    </td>
                                    <td>{{apd.remarks}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">
                       <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" >Excel导出</a>
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
                    未查询到预付款划付数据！
                </div>
            </div>
        </div>
    </index>
</template>
<script>
    import model from '../../ajax/PaymentOfPayment/advance_model'
    export default{
        data(){
            this.model=model(this);
            return{
                checkForm:{
                    subCompanyID:"",
                    advancePaymentAccountDetailID:"",
                    cityID:"",
                    status:"",
                    remarks:"",
                    startDate:"",
                    endDate:"",
                    merchantOperationID:"",
                    merchantName:"",
                    keywords:"",
                    pageIndex:1,
                    pageSize:10,
                    timeRange:'3'
                },
                subcompanyList:[],
                pageall:1,
                cityList:[],
                advancePaymentDetailList:[]
            }
        },
        methods:{
            //获取补贴划付数据
             getadvancePaymentDetailList(data){
                 if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.advance_list(data)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                             this.$set('advancePaymentDetailList', response.data.data)
                             this.$set('pageall', response.data.total)
                        }
                    });
            },
             //获取分公司数据
            getSubcompany(){
                 this.$common_model.getcompany()
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                         if(response.data.code == 0){
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
                         if((response.data.code==0)){
                            this.$set('cityList', response.data.data)
                        }

                    });
            },
            query() {
                // let data=this.data;
                if (this.checkForm.startDate=="" && this.checkForm.endDate=="") {
                    this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                    this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
                }
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getadvancePaymentDetailList(this.checkForm);
            },
            gopayment(a){
                this.$common_model.skipToOrderById(a)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.$router.go({name:'payment-details',params:{reserveCashOrderNumber:response.data.data.orderId,payType:response.data.data.payType}});
                            }

                    })
            }
        },
        ready() {
            (this.$route.params.advanceId==':advanceId')?this.checkForm.advancePaymentAccountDetailID='':this.checkForm.advancePaymentAccountDetailID=this.$route.params.advanceId;
            this.getCity();
            this.getSubcompany();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.query();
        },
         watch:{
            'checkForm.timeRange'(){
                this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
            },
            'checkForm.pageIndex+checkForm.pageSize'(){
                this.query();
            }
       }
    }
</script>