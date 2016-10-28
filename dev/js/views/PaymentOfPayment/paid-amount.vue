<template>
    <index :title="'已划付金额'"
           :ptitle="'退税管理'"
           :p2title="'备付金支出'"
           :hname="'subsidy-management'"
           :h2name="'payment-details'"
           :isshow="'isshow'">
        <div class="content adjust-trade-detailpre" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <span v-show="paidHd!=''">活动名称：{{paidHd}}</span>
                    <span v-show="paidSh!=''">商户名称：{{paidSh}}</span>
                </div>
                <div v-cloak v-show="tradeList.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>ID</th>
                                <th>划付时间</th>
                                <th>付款账户</th>
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
            this.getTradeList();
        },
        watch:{
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.getTradeList()
            }
        }
    }
</script>