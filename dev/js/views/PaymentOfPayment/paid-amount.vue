<template>
    <index :title="'已划付金额'"
           :ptitle="'备付金支出'"
           :p2title="'税金管理'"
           :hname="'payment-details'"
           :h2name="'subsidy-management'"
           :isshow="'isshow'">
        <div class="content adjust-trade-detailpre" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <span v-show="paidHd!=''">活动名称：{{paidHd}}</span>
                    <span class="mr20" v-show="!!paidSh1">商户号：{{paidSh1}}</span>
                    <span class="mr20" v-show="!!paidSh2">商户简称：{{paidSh2}}</span>
                    <span class="mr20" v-show="!!paidSh3">门店号：{{paidSh3}}</span>
                    <span class="mr20" v-show="!!paidSh4">门店名称：{{paidSh4}}</span>
                    <span v-show="paidSh!=''&&!paidSh3">商盟商户名称：{{paidSh}}</span>
                </div>
                <div v-cloak v-show="tradeList.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>ID</th>
                                <th>划付时间</th>
                                <th>付款账户</th>
                                <th>付款方式</th>
                                <th>收款账户信息</th>
                                <th>用途</th>
                                <th>划付金额</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(index,trlist) in tradeList" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.id}}</td>
                                <td>{{trlist.payTime | datetime}}</td>
                                <td>{{trlist.payAccount}}</td>
                                <td>
                                    <template v-if="trlist.payType==1">备付金账户</template>
                                    <template v-if="trlist.payType==2">商户预付款账户</template>
                                    <template v-if="trlist.payType==3">银行结算</template>
                                    <template v-if="trlist.payType==4">其他</template>
                                    <template v-if="trlist.payType==5">网银转账</template>
                                </td>
                                <td>
                                    {{trlist.collectionAccountName}}
                                    {{trlist.collectionAccountNumber}}
                                </td>
                                <td>
                                    <template v-if="trlist.purpose==1">补贴划付</template>
                                    <template v-if="trlist.purpose==2">额度采购</template>
                                    <template v-if="trlist.purpose==3">补贴退税</template>
                                    <template v-if="trlist.purpose==4">预付款</template>
                                    <template v-if="trlist.purpose==5">供货商划付</template>
                                    <template v-if="trlist.purpose==10">税金提现</template>
                                </td>
                                <td>{{trlist.payAmount/100 | currency ''}}</td>
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            <tr>
                                <td>合计：</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{{nums.payAmount/100 | currency ''}}</td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="no-list" v-else>
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
                paidHd:'',
                paidSh:'',
                paidSh1:'',
                paidSh2:'',
                paidSh3:'',
                paidSh4:'',
                tradeList:[],
                nums:{}
            }
        },
        methods:{
            //获取交易记录
             getTradeList(){
                 this.model.paidAmount_total(this.defaultData)
                         .then((response)=>{
                             if(response.data.code==0){
                                 this.$set('nums', response.data.data)
                             }
                         });
                 this.model.paidAmount_list(this.defaultData)
                    .then((response)=>{
                         if(response.data.code==0){
                             this.$set('tradeList', response.data.data);
                             this.defaultData.pageTotal=response.data.total
                        }
                    });
            },
        },
        ready() {
            (this.$route.params.paidId!=':paidId')?this.defaultData.id=this.$route.params.paidId:null;
            (this.$route.params.paidHd!=':paidHd')?this.paidHd=this.$route.params.paidHd:null;
            (this.$route.params.paidSh!=':paidSh')?this.paidSh=this.$route.params.paidSh:null;
            (this.$route.params.paidSh1!=':paidSh1')?this.paidSh1=this.$route.params.paidSh1:null;
            (this.$route.params.paidSh2!=':paidSh2')?this.paidSh2=this.$route.params.paidSh2:null;
            (this.$route.params.paidSh3!=':paidSh3')?this.paidSh3=this.$route.params.paidSh3:null;
            (this.$route.params.paidSh4!=':paidSh4')?this.paidSh4=this.$route.params.paidSh4:null;
            this.getTradeList();
        },
        watch:{
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.getTradeList()
            }
        }
    }
</script>