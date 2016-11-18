<template>
    <index :title="'入账明细'"
           :ptitle="'本金收入'"
           :hname="'principle-order'"
           :isshow="'isshow'">
        <div class="content " slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="" class="active"><a v-link="{name:'principle-order'}">入账明细</a></li>
                    <li data-ksa=""><a v-link="{name:'running-channel'}">通道管理</a></li>
                </ul>
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
                            <select class="form-control" v-model="checkForm.runningChannelID">
                                <option value="">全部交易通道</option>
                                <option v-for="(index,n) in runningChannel" v-text="n.shortName" :value="n.id"></option>
                            </select>
                            <select class="form-control" v-model="checkForm.status">
                                <option value="">全部对账状态</option>
                                <option value="2">成功</option>
                                <option value="1">等待对账</option>
                                <option value="3">差额入账</option>
                            </select>
                        </form>
                    </div>
                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="checkNew" data-ksa="">查询</a>
                    </div>
                </div>
                <div v-if="zdlists.length>0"  class="dataTables_wrapper no-footer" v-cloak>
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>订单号</th>
                                <th>交易日期</th>
                                <th>交易通道</th>
                                <th>分公司</th>
                                <th>账户名称</th>
                                <th>账号</th>
                                <th>扣收金额</th>
                                <th>佣金</th>
                                <th>入账金额</th>
                                <th>用途</th>
                                <th>对账状态</th>
                                <th>差额</th>
                                <th>差额日期</th>
                                <th>入账时间</th>
                                <th>对账时间</th>
                                <th>银行流水</th>
                                <th>操作</th>
                                <th>异常入账</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.orderID }}</td>
                                <td>{{trlist.tradeDate | datetimes }}</td>
                                <td>{{trlist.runningChannelName}}</td>
                                <td>{{trlist.subCompanyName}}</td>
                                <td>{{trlist.accountName}}</td>
                                <td>{{trlist.accountNumber}}</td>
                                <td>
                                    {{trlist.collectionAmount/100 | currency ''}}
                                </td>
                                <td>
                                    {{trlist.commission/100 | currency ''}}
                                </td>
                                <td>
                                    {{trlist.entryAmount/100 | currency ''}}
                                </td>
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
                                <td>
                                    <span v-if="trlist.diffAmount!=null">{{trlist.diffAmount/100 | currency ''}}</span>
                                </td>
                                <td>{{trlist.diffTime}}</td>
                                <td>{{trlist.payTime | datetime}}</td>
                                <td>{{trlist.successTime | datetime}}</td>
                                <td>
                                    <a v-if="trlist.status!=1" data-ksa="" v-link="{name:'principle-info',params:{principleId:trlist.id,certificate:0}}">查看</a>
                                </td>
                                <td><a v-if="trlist.status==1" v-link="{name:'balance-of-account',params:{shortId:trlist.id,principleAccountId:trlist.id,tradeTime:trlist.tradeDate}}">对账</a></td>
                                <td></td>
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            <tr>
                                <td>合计：</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    {{total.collectionAmount/100 | currency ''}}
                                </td>
                                <td>
                                    {{total.commission/100 | currency ''}}
                                </td>
                                <td>
                                    {{total.entryAmount/100 | currency ''}}
                                </td>
                                <td></td>
                                <td></td>
                                <td>{{total.diffAmount/100 | currency ''}}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-bottom">
                        <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" v-on:click="principleexport" data-ksa="">Excel导出</a>
                        </div>

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
    import model from '../../ajax/AccountManagement/principle_order_model'
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
                    runningChannelID:'',
                    status:'',
                    startDate:'',
                    endDate:'',
                    pageIndex:1,
                    pageSize:10
                },
                runningChannel:[],
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
                this.model.principleorderList(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('zdlists', response.data.data)
                                this.$set('pageall', response.data.total)
                            }
                        });
                this.model.principleorderTotal(data).then((res)=>{
                    if(res.data.code == 0){
                        this.$set('total', res.data.data)
                    }
                });
            },
            getClist(){
                this.model.selectrunningList().then((response)=>{
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if(response.data.code==0){
                        this.$set('runningChannel', response.data.data)
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
            principleexport(){
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.principleexport+ $.param(this.checkForm));
            },
        },
        ready: function () {
            this.getTime();
            this.getClist();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.initList();
        },
        watch:{
            'checkForm.pageSize + checkForm.pageIndex'(){
                this.initList();
            }
        }
    }
</script>