<template>
    <index :title="'待划付金额'"
           :ptitle="'备付金支出'"
           :p2title="'税金管理'"
           :hname="'payment-details'"
           :h2name="'subsidy-management'"
           :isshow="'isshow'">
        <div class="content adjust-trade-detailpre" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <span class="mr20" v-show="unpaidHd!=''">活动名称：{{unpaidHd}}</span>
                    <span class="mr20" v-show="unpaidSh!=''">商户名称：{{unpaidSh}}</span>
                    <span class="mr20" v-show="unpaidYe!=''">待划付：{{unpaidYe/100 | currency ''}}元</span>
                    <span class="mr20" >未进税金账户金额：{{nums.suspensionTax/100+nums.merchantSubsidyActual/100 | currency ''}}元</span>
                    <span class="mr20" >已进税金账户金额：{{unpaidTs/100 | currency ''}}元</span>
                    <span class="mr20" >提现中金额：{{Amount/100 | currency ''}}元</span>
                </div>
                <div v-show="!!tradeList.length" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>交易ID</th>
                                <th>交易流水号</th>
                                <th>消费金额</th>
                                <th>折扣金额</th>
                                <th>实付金额</th>
                                <th>额度抵扣</th>
                                <th>本金抵扣</th>
                                <th>三方应收</th>
                                <th>商户应补</th>
                                <th>暂扣税金</th>
                                <th>商户实补</th>
                                <th>折扣差</th>
                                <th>扣收金额</th>
                                <th>33211佣金</th>
                                <th>入账金额</th>
                                <th>交易时间</th>
                                <th>交易类型</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(index,trlist) in tradeList" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.id}}</td>
                                <td>{{trlist.serialNumber}}</td>
                                <td>{{trlist.consumptionAmount/100 | currency ''}}</td>
                                <td>{{trlist.discountAmount/100 | currency ''}}</td>
                                <td>{{trlist.payAmount/100 | currency ''}}</td>
                                <td>{{trlist.limitDeduct/100 | currency ''}}</td>
                                <td>{{trlist.principalDeduct/100 | currency ''}}</td>
                                <td>{{trlist.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{trlist.suspensionTax/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyActual/100 | currency ''}}</td>
                                <td>{{trlist.discountDiff/100 | currency ''}}</td>
                                <td>{{trlist.collectionAmount/100 | currency ''}}</td>
                                <td>{{trlist.commission33211/100 | currency ''}}</td>
                                <td>{{trlist.entryAmount/100 | currency ''}}</td>
                                <td>{{trlist.tradeTime | datetime}}</td>
                                <td>
                                    <template v-if="trlist.type==1">正常交易</template>
                                    <template v-if="trlist.type==2">手工单</template>
                                    <template v-if="trlist.type==3">调账交易</template>
                                </td>
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            <tr>
                                <td>合计：</td>
                                <td></td>
                                <td>{{nums.consumptionAmount/100 | currency ''}}</td>
                                <td>{{nums.discountAmount/100 | currency ''}}</td>
                                <td>{{nums.payAmount/100 | currency ''}}</td>
                                <td>{{nums.limitDeduct/100 | currency ''}}</td>
                                <td>{{nums.principalDeduct/100 | currency ''}}</td>
                                <td>{{nums.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{nums.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{nums.suspensionTax/100 | currency ''}}</td>
                                <td>{{nums.merchantSubsidyActual/100 | currency ''}}</td>
                                <td>{{nums.discountDiff/100 | currency ''}}</td>
                                <td>{{nums.collectionAmount/100 | currency ''}}</td>
                                <td>{{nums.commission33211/100 | currency ''}}</td>
                                <td>{{nums.entryAmount/100 | currency ''}}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="no-list" v-show="!tradeList.length">
                    未查询到数据！
                </div>
                <div class="datatable-bottom">
                    <div class="right">
                        <page :all="defaultData.pageTotal"
                              :cur.sync="defaultData.pageIndex"
                              :page_size.sync="defaultData.pageSize">
                        </page>
                    </div>
                </div>
            </div>
        </div>
    </index>
</template>
<script>
import model from '../../ajax/PaymentOfPayment/subsidy_management_model'
export default{
    data(){
        this.model=model(this);
            return{
                defaultData:{
                    id:'',
                    pageTotal:1,
                    pageIndex:1,
                    pageSize:10,
                },
                unpaidHd:'',
                unpaidSh:'',
                unpaidTs:'',
                unpaidYe:'',
                Amount:'',
                tradeList:[],
                nums:{}
            }
        },
        methods:{
            //获取交易记录
             getTradeList(){
                 this.model.unpaidAmount_total(this.defaultData)
                         .then((response)=>{
                             if(response.data.code==0){
                                 this.$set('nums', response.data.data)
                             }
                         });
                 this.model.unpaidAmount_list(this.defaultData)
                    .then((response)=>{
                         if(response.data.code==0){
                             this.$set('tradeList', response.data.data);
                             this.defaultData.pageTotal=response.data.total
                        }
                    });
                 let data={
                     id:this.defaultData.id
                 }
                 this.model.unpaidAmount_Amount(data)
                         .then((response)=>{
                             if(response.data.code==0){
                                 this.Amount= response.data.data;
                             }
                         });
            },
        },
        ready() {
            (this.$route.params.unpaidId!=':unpaidId')?this.defaultData.id=this.$route.params.unpaidId:null;
            (this.$route.params.unpaidHd!=':unpaidHd')?this.unpaidHd=this.$route.params.unpaidHd:null;
            (this.$route.params.unpaidSh!=':unpaidSh')?this.unpaidSh=this.$route.params.unpaidSh:null;
            (this.$route.params.unpaidTs!=':unpaidTs')?this.unpaidTs=this.$route.params.unpaidTs:null;
            (this.$route.params.unpaidYe!=':unpaidYe')?this.unpaidYe=this.$route.params.unpaidYe:null;
            this.getTradeList();
        },
        watch:{
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.getTradeList()
            }
        }
    }
</script>