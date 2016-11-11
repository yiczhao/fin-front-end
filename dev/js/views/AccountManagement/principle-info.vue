<template>
    <index :title="'本金明细'"
           :ptitle="'财务处理'"
           :p2title="'账户列表'"
           :hname="'account-management'"
           :h2name="'account-management'"
           :isshow="'isshow'">
        <div class="content " slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="dateS" @change="getTime">
                                <option value="0">昨天</option>
                                <option value="1">最近一周</option>
                                <option value="2">最近一个月</option>
                                <option value="3">最近三个月</option>
                                <option value="4">自定义时间</option>
                            </select>
                            <div v-show="dateS==4" class="inline">
                                <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                                <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                            </div>
                            <select class="form-control" v-model="checkForm.status">
                                <option value="">全部对账状态</option>
                                <option value="2">成功</option>
                                <option value="1">待对账</option>
                                <option value="3">差额入账</option>
                            </select>
                            <select class="form-control" v-model="checkForm.purpose">
                                <option value="">请选择用途</option>
                                <option value="1">交易入账</option>
                                <option value="2">往来款</option>
                                <option value="3">还扣收款</option>
                                <option value="4">商户退款</option>
                                <option value="5">账户费用</option>
                                <option value="6">测试款</option>
                                <option value="7">其它</option>
                            </select>
                            <input type="text" class="form-control" v-model="checkForm.certificate" placeholder="凭证号">
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="checkNew" data-ksa="">查询</a>
                    </div>
                </div>
                <div style="margin: 0 20px;font-size: 18px;">
                    <span>账户简称：</span><span style="margin-right: 10px;">{{balance.shortName}}</span>
                    <span>余额：</span><span style="margin-right: 10px;">{{balance.balanceAmount/100 | currency ''}}</span>
                </div>
                <div v-if="zdlists.length>0"  class="dataTables_wrapper no-footer" v-cloak>
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                                <tr role="row">
                                    <th>凭证号</th>
                                    <th>对方账户名</th>
                                    <th>对方账号</th>
                                    <th>支出</th>
                                    <th>收入</th>
                                    <th>余额</th>
                                    <th>交易时间</th>
                                    <th>用途</th>
                                    <th>对账状态</th>
                                    <th>差额</th>
                                    <th>差额日期</th>
                                    <th>操作</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{trlist.certificateNumber}}</td>
                                    <td>{{trlist.accountName}}</td>
                                    <td>{{trlist.accountNumber}}</td>
                                    <td>{{trlist.payoutAmount/100 | currency ''}}</td>
                                    <td>{{trlist.incomeAmount/100 | currency ''}}</td>
                                    <td>{{trlist.balanceAmount/100 | currency ''}}</td>
                                    <td>{{trlist.tradeTime | datetime}}</td>
                                    <td>
                                        <template v-if="trlist.purpose==1"> 交易入账</template>
                                        <template v-if="trlist.purpose==2"> 往来款</template>
                                        <template v-if="trlist.purpose==3">还扣收款</template>
                                        <template v-if="trlist.purpose==4">商户退款</template>
                                        <template v-if="trlist.purpose==5">账户费用</template>
                                        <template v-if="trlist.purpose==6"> 测试款</template>
                                        <template v-if="trlist.purpose==7">其他</template>
                                    </td>
                                    <td>
                                        <span v-if="trlist.status==1">等待对账</span>
                                        <span v-if="trlist.status==2">对账成功</span>
                                        <span v-if="trlist.status==3">差额入账</span>
                                    </td>
                                    <td>{{trlist.diffAmount/100 | currency ''}}</td>
                                    <td>{{trlist.diffTime | datetime}} </td>
                                    <td>
                                        <a data-ksa="" @click="duizhang(trlist)" v-if="trlist.status!=2">对账</a>
                                    </td>
                                    <td>{{trlist.remarks}}</td>
                                </tr>
                                <tr>
                                    <td>合计：</td>
                                    <td></td>
                                    <td></td>
                                    <td>{{total.payoutAmount/100 | currency ''}}</td>
                                    <td>{{total.incomeAmount/100 | currency ''}}</td>
                                    <td>{{total.balanceAmount/100 | currency ''}}</td>
                                    <td></td><td></td><td></td>
                                    <td>{{total.diffAmount/100 | currency ''}}</td>
                                    <td></td><td></td><td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-bottom">
                       <div class="right">
                            <page :all="pageall"
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                       </div>
                    </div>
                </div>
                <div class="no-list" v-else v-cloak>
                    未找到数据
                </div>
            </div>
        </div>
    </index>
</template>
<style lang="sass" scoped>
     div.wrapper{
        overflow: visible;
    }
     .m20{
        margin-bottom:20px;
    }
    .datetime-picker{
        margin:0 15px;
    }
</style>
<script>
    import model from '../../ajax/AccountManagement/principle_model'
    export default{
        props:{
        },
        data(){
            this.model=model(this);
            return{
                zdlists:[],
                pageall:1,
                dateS:'3',
                checkForm:{
                    bankAccountID:'',
                    certificate:'',
                    status:'',
                    purpose:'',
                    startDate:'',
                    endDate:'',
                    pageIndex:1,
                    pageSize:10
                },
                balance:{},
                total:{}
            }
        },
        methods:{
            // *** 请求账户数据
            getZlists(data){
                if(data.endDate<data.startDate){
                    let a=data.endDate,b=data.startDate;
                    this.checkForm.startDate=a;
                    this.checkForm.endDate=b;
                    data.startDate=a;
                    data.endDate=b;
                }
                this.model.principleList(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('zdlists', response.data.data)
                                this.$set('pageall', response.data.total)
                            }
                        });
                this.model.principleCashDetailModel(data).then((res)=>{
                    if(res.data.code == 0){
                        this.$set('total', res.data.data)
                    }
                });
            },
            checkNew(){
                this.initList();
            },
            initList(){
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getZlists(this.checkForm);
            },
            getTime(){
                this.checkForm.startDate=init_date(this.dateS)[0];
                this.checkForm.endDate=init_date(this.dateS)[1];
            },
            getShortName(){
                this.model.principleBalanceList(this.checkForm.bankAccountID).then((res)=>{
                    if(res.data.code == 0){
                        this.$set('balance', res.data.data)
                    }
                });
            }
        },
        ready: function () {
            var vm=this;
            vm.getTime();
            (vm.$route.params.principleId==':principleId')?vm.checkForm.bankAccountID='' : vm.checkForm.bankAccountID=vm.$route.params.principleId;
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.checkForm=back_json.fetchArray(vm.$route.path):null;
            vm.getShortName();
            vm.initList();
        },
        watch:{
            'checkForm.pageSize + checkForm.pageIndex'(){
                this.initList();
            }
        }
    }
</script>