<template>
    <index :title="'额度采购账户明细'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :p2title="'额度采购'"
           :h2name="'business-limit'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <div style="padding-bottom: 20px;font-size: 15px;">
                        <span>商户名：{{accountName}}</span>
                    </div>
                    <form class="form-inline manage-form">
                            <div class="form-group">
                                <select class="form-control" v-model="dateS">
                                    <option value="0">昨天</option>
                                    <option value="1">最近一周</option>
                                    <option value="2">最近一个月</option>
                                    <option value="3">最近三个月</option>
                                    <option value="4">自定义时间</option>
                                </select>
                            </div>
                            <div class="form-group" v-show="dateS==4">
                                <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                                <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                            </div>
                        <div  class="">
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="商户ID"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.merchantName" placeholder="商户名">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.serialNumber" placeholder="订单号/交易流水号">
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.streamType">
                                    <option value="">请选择类型</option>
                                    <option value="1">消化额度</option>
                                    <option value="2">充值额度 </option>
                                    <option value="3">冲抵额度 </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.payType">
                                    <option value="">请选择付款方式</option>
                                    <option value="1">账户抵扣</option>
                                    <option value="2">现金转账</option>
                                    <option value="3">资源置换</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.status">
                                    <option value="">请选择状态</option>
                                    <option value="1">已关闭 </option>
                                    <option value="0">等待审核</option>
                                    <option value="0">等待划付 </option>
                                    <option value="0">转账中</option>
                                    <option value="0">等待对账</option>
                                    <option value="0">对账成功</option>
                                    <option value="0">划付失败</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="备注">
                            </div>
                            <div class="form-group">
                                <input type="button" class="btn btn-info" @click="initList" value="查询">
                            </div>
                            <!--<div class="form-group">-->
                            <!--<input type="button" class="btn btn-info" value="导出">-->
                            <!--</div>-->
                        </div>
                    </form>
                </div>
                <div v-show="!!zdlists.length"  class="dataTables_wrapper no-footer" v-cloak>
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                                <tr  role="row">
                                    <th>订单号/交易流水号</th>
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>额度</th>
                                    <th>本金</th>
                                    <th>操作账户</th>
                                    <th>流水类型</th>
                                    <th>状态 </th>
                                    <th>付款方式</th>
                                    <th>交易时间</th>
                                    <th>操作</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in zdlists">
                                    <td>{{trlist.serialNumber}}</td>
                                    <td>{{trlist.merchantOperationID}}</td>
                                    <td>{{trlist.merchantName}}</td>
                                    <td>{{trlist.purchaseLimit/100 | currency '' }}</td>
                                    <td>{{trlist.purchaseCost/100 | currency ''}}</td>
                                    <td><a v-link="{'name':'limitaccount-management',params:{'limitPurchaseMerchantInfoID':checkForm.limitPurchaseMerchantInfoID,'accountName':trlist.accountName}}">{{trlist.accountName}}</a></td>
                                    <td>{{trlist.streamType}}</td>
                                    <td>{{trlist.accountStatus}}</td>
                                    <td>
                                        <template v-if="trlist.payType==1">现金转账</template>
                                        <template v-if="trlist.payType==2">资源置换</template>
                                    </td>
                                    <td>{{trlist.tradeTime|datetime}}</td>
                                    <td>
                                        <a v-link="{name:'payment-details','params':{'reserveCashOrderNumber':trlist.serialNumber,'payType':'1'}}" v-if="trlist.payType==1">查看</a>
                                        <a v-link="{name:'payment-details','params':{'reserveCashOrderNumber':trlist.serialNumber,'payType':'4'}}" v-if="trlist.payType==2">查看</a>
                                        <a href="{{origin}}/file/download/{{trlist.certificatesID}}" v-if="trlist.payType==2&&trlist.certificatesID!=0">下载</a>
                                        <a v-link="{name:'trade-info',params:{'serialNumber':trlist.serialNumber}}" v-if="trlist.payType!=1&&trlist.payType==3">查看</a>
                                    </td>
                                    <td>{{trlist.remarks}}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>合计：</td>
                                    <td></td>
                                    <td>{{nums.purchaseLimitAmount/100 | currency ''}}</td>
                                    <td>{{nums.purchaseCostAmount/100 | currency ''}}</td>
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
                    <div class="datatable-footer">
                        <page :all="pageall"
                              :cur.sync="pagecur"
                              :page_size.sync="page_size">
                        </page>
                    </div>
                </div>
                <div style="padding: 30px;font-size: 16px;text-align: center" v-else>
                    未找到数据
                </div>
            </div>
        </div>
    </index>
</template>
<style lang="sass" scoped>
     .m20{
        margin-bottom:20px;
    }
     .content{
        padding: 0 15px;
    }
      .datetime-picker{
        margin:0 15px;
    }
     .modal-body{
        padding: 0 15px;
    }
     .page-bar{
        margin: 25px auto;
        text-align: center;
    }
     .datatable-scroll{
        overflow:auto;
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/SHGL/limitinfo_model'
    export default{
        data(){
            this.model =model(this)
            return{
                origin:window.origin,
                accountName:'',
                loginList:{},
                zdlists:[],
                dzList:{},
                dz_show:false,
                pagecur:1,
                page_size:10,
                pageall:1,
                accountId:'',
                checkOne:false,
                dateS:'1',
                shouru:0,
                zhichu:0,
                gllists:[],
                checkForm:{
                    limitPurchaseMerchantInfoID:'',
                    accountName:'卡说账户',
                    merchantOperationID:'',
                    merchantName:'',
                    serialNumber:'',
                    streamType:'',
                    status:'',
                    payType:'',
                    remarks:'',
                    startDate:'',
                    endDate:'',
                    pageIndex:1,
                    pageSize:10
                },
                nums:{
                    purchaseLimitAmount:'',
                    purchaseCostAmount:''
                },
                glradio:'one',
                skf:''
            }
        },
        methods:{
            // *** 请求账户数据
            getZlists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(data.endDate<data.startDate){
                    let a=data.endDate,b=data.startDate;
                    this.checkForm.startDate=a;
                    this.checkForm.endDate=b;
                    data.startDate=a;
                    data.endDate=b;
                }
                this.model.limitPurchaseAccount_detail(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            this.$set('zdlists', response.data.data)
                            this.$set('pageall', response.data.total)
//                            (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
//                            (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                        });
            },
            getsumBalance(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.limitPurchaseAccount_getsumBalance(this.checkForm)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            this.$set('nums', response.data.data)
                        });
            },
            initList(){
                $(".modal").modal("hide");
                this.getZlists(this.checkForm);
                this.getsumBalance();
            },
            getTime(){
                this.checkForm.startDate=init_date(this.dateS)[0];
                this.checkForm.endDate=init_date(this.dateS)[1];
            }
        },
        ready: function () {
            (!!sessionStorage.getItem('userData')) ? this.$set('loginList',JSON.parse(sessionStorage.getItem('userData'))) : null;
            (this.$route.params.limitPurchaseMerchantInfoID != ':limitPurchaseMerchantInfoID') ? this.checkForm.limitPurchaseMerchantInfoID = this.$route.params.limitPurchaseMerchantInfoID : null;
            (this.$route.params.accountName != ':accountName') ? this.accountName = this.$route.params.accountName : null;
            this.accountId=this.checkForm.accountId=this.$route.params.accountId
            this.getTime();
            this.initList();
        },
        components:{
            'datepicker': datepicker,
        },
        watch:{
            pagecur(){
                this.checkForm.pageIndex=this.pagecur;
                this.initList();
            },
            page_size(){
                this.checkForm.pageSize=this.page_size;
                this.initList();
            },
            dateS(){
                this.getTime();
            }
        },
        validators: {

        }
    }
</script>