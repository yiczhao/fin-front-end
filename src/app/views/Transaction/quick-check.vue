<template>
    <index :title="'快速对账'"
           :ptitle="'交易管理'"
           :hname="'trade-info'"  
           :isshow="'isshow'">
        <div class="content trade-info" slot="content">
            <div class="panel panel-flat">
                <div  style="margin:0 auto;width:950px">
                    <div style="margin:20px">
                        <span class="mr20">交易时间：{{checkForm.startDate}}--{{checkForm.endDate}}</span>
                    </div>
                    <div style="margin:20px">
                        <span class="mr20">门店号：{{checkForm.backendStoreCode}}</span>
                        <span class="mr20">门店名称：{{tradeList.backendStoreName}}</span>
                        <span class="mr20">商户号：{{tradeList.backendMerchantCode}}</span>
                        <span class="mr20">商户简称：{{tradeList.backendMerchantName}}</span>
                    </div>
                    <div style="margin:20px">
                        <span class="mr20">活动ID：{{checkForm.activityOperationID}}</span>
                    </div>

                    <div v-cloak v-if="!!tradeList.sysMoreThanTrade" class="dataTables_wrapper no-footer">
                        <div style="width:950px">
                            <div style="width:50%;float:left;padding:0 20px;margin-bottom:20px">
                                <p>大后台比财务系统多：</p>
                                <div style="max-height:500px;overflow:auto;padding:0 30px;min-height:500px;">
                                    <p v-for="n in tradeList.sysMoreThanTrade.transactionNos">
                                        {{n}}
                                    </p>
                                </div>
                                <p style="color:red;text-align:right;margin-top:20px">大后台共{{tradeList.sysMoreThanTrade.countTotal}}笔 </p>
                                <p style="color:red;text-align:right">比财务系统多{{tradeList.sysMoreThanTrade.countMore}}笔 </p>
                                <p style="color:red;text-align:right">银行应补多{{tradeList.sysMoreThanTrade.bankMore}}元 </p>
                                <p style="color:red;text-align:right">商户应补多{{tradeList.sysMoreThanTrade.merchantMore/100 | currency ''}}元</p>
                            </div>
                            <div style="width:50%;float:left;padding:0 20px;border-left:1px solid #dadada;">
                                <p>财务系统比大后台多：</p>
                                <div style="max-height:500px;overflow:auto;padding-left:30px;min-height:500px;">
                                    <p v-for="n in tradeList.tradeMoreThanSys.transactionNos">
                                        {{n}}
                                    </p>
                                </div>
                                <p style="color:red;margin-top:20px">财务系统共{{tradeList.tradeMoreThanSys.countTotal}}笔</p>
                                <p style="color:red">比大后台多{{tradeList.tradeMoreThanSys.countMore}}笔</p>
                                <p style="color:red">银行应补多{{tradeList.tradeMoreThanSys.bankMore/100 | currency ''}}元</p>
                                <p style="color:red">商户应补多{{tradeList.tradeMoreThanSys.merchantMore/100 | currency ''}}元</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </index>
</template>
<script>
    import model from '../../ajax/Transaction/trade_model'
    export default{
        props:{

        },
        data(){
            this.model=model(this);
            return{
                checkForm:{
                    activityOperationID:"",
                    backendStoreCode:"",
                    endDate:"",
                    startDate:"",
                },
                tradeList:{
                    backendName:'',
                    backendMerchantCode:'',
                    backendMerchantName:'',
                    sysMoreThanTrade:'',
                }
            }
        },
        methods:{
            //获取交易记录
             getList(){
                 if(sessionStorage.getItem('isHttpin')==1)return;
                 this.model.quickCheck(this.checkForm)
                    .then((response)=>{
                         if(response.data.code==0){
                            this.$set('tradeList', response.data.data)
                        }
                    });
            }
        },
        ready() {
            (this.$route.params.checkstartDate==':checkstartDate')?this.checkForm.startDate='' : this.checkForm.startDate=this.$route.params.checkstartDate;
            (this.$route.params.checkendDate==':checkendDate')? this.checkForm.endDate='' : this.checkForm.endDate=this.$route.params.checkendDate;
            (this.$route.params.checkbackendStoreCode==':checkbackendStoreCode')?this.checkForm.backendStoreCode='' : this.checkForm.backendStoreCode=this.$route.params.checkbackendStoreCode;
            (this.$route.params.checkactivityOperationID==':checkactivityOperationID')? this.checkForm.activityOperationID='' : this.checkForm.activityOperationID=this.$route.params.checkactivityOperationID;
            this.getList();
        }
    }
</script>