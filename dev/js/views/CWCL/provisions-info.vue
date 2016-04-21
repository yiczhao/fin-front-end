<template>
    <index :title="'备付金明细'"
           :ptitle="'财务处理'"
           :p2title="'账户列表'"
           :hname="'account-management'"
           :isshow="'isshow'">
        <div class="content info" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="m20">
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
                        </div>
                        <div  class="">
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.certificate" placeholder="凭证号">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.keyword" placeholder="收款方、账户名、账号">
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.status">
                                    <option value="">请选择对账状态</option>
                                    <option value="1">成功</option>
                                    <option value="0">待对账</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.purpose">
                                    <option value="">请选择用途</option>
                                    <option value="1">佣金划付</option>
                                    <option value="2">往来款</option>
                                    <option value="3">转账退款</option>
                                    <option value="4">账户费用</option>
                                    <option value="5">其它</option>
                                    <option value="6">往来款</option>
                                    <option value="7">转账退款</option>
                                    <option value="8">账户费用</option>
                                    <option value="9">其它</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="备注">
                            </div>
                            <div class="form-group">
                                <input type="button" class="btn btn-info" v-on:click="checkNew" value="查询">
                            </div>
                            <!--<div class="form-group">-->
                            <!--<input type="button" class="btn btn-info" value="导出">-->
                            <!--</div>-->
                        </div>
                    </form>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <div style="margin: 0 0 20px 20px;font-size: 20px;">
                        <span>总收入：</span><span>{{shouru}}</span>
                        <span>总支出：</span><span>{{zhichu}}</span>
                    </div>
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                                <tr  role="row">
                                    <th>编号</th>
                                    <th>凭证号</th>
                                    <th>收款方</th>
                                    <th>账户名</th>
                                    <th>账号</th>
                                    <th>借(收入)</th>
                                    <th>贷(支出)</th>
                                    <th>余额 </th>
                                    <th>交易时间</th>
                                    <th>用途 </th>
                                    <th>对账状态</th>
                                    <th>操作</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-if="!!zdlists.length" v-for="(index,trlist) in zdlists">
                                    <td>{{index+1}}</td>
                                    <td>{{trlist.certificate}}</td>
                                    <td>{{trlist.collectionName}}</td>
                                    <td>{{trlist.accountName}}</td>
                                    <td>{{trlist.accountNumber}}</td>
                                    <td>{{trlist.incomeAmount/100 | currency '' }}</td>
                                    <td>{{trlist.payoutAmount/100 | currency '' }}</td>
                                    <td>{{trlist.balanceAmount/100 | currency '' }}</td>
                                    <td>{{trlist.tradeTime | datetime}} </td>
                                    <td>
                                        <template v-if="trlist.purpose==1"> 补贴划付</template>
                                        <template v-if="trlist.purpose==2"> 额度采购</template>
                                        <template v-if="trlist.purpose==3">退税划付</template>
                                        <template v-if="trlist.purpose==4">预付款</template>
                                        <template v-if="trlist.purpose==5">供货商划付</template>
                                        <template v-if="trlist.purpose==6"> 往来款</template>
                                        <template v-if="trlist.purpose==7">转账退款</template>
                                        <template v-if="trlist.purpose==8">账户费用</template>
                                        <template v-if="trlist.purpose==9">其它</template>
                                    </td>
                                    <td>
                                        <span v-if="trlist.status==1">成功</span>
                                        <span v-else>待对账</span>
                                    </td>
                                    <td>
                                        <a href="javascript:void(0);" data-toggle="modal" data-target="#modal_fzr"  v-on:click="duizhang(trlist)" v-if="trlist.status==0">对账</a>
                                        <a v-link="" v-if="trlist.status==1">详情</a>
                                    </td>
                                    <td>{{trlist.remarks}}</td>
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
                <div id="modal_fzr" class="modal fade" style="display: none;">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">负责人</h5>
                            </div>
                            <div class="modal-body">
                                <div class="modal-body member_rules_modal-body">
                                    <div class="form-group">
                                        <span class="iblock">账户名：</span><span>{{dzList.accountName}}</span>
                                    </div>
                                    <div class="form-group">
                                        <span class="iblock">账 号：</span><span>{{dzList.accountNumber}}</span>
                                    </div>
                                    <!--<div class="form-group">-->
                                    <!--<span class="iblock">开户行：</span><span>{{dzList.khh}}</span>-->
                                    <!--</div>-->
                                    <div class="form-group">
                                        <span class="iblock">时 间：</span><span>{{dzList.tradeTime | datetime}}</span>
                                    </div>
                                    <div class="form-group">
                                        <span class="iblock">收入：</span><span>{{dzList.incomeAmount/100 | currency '' }}</span>
                                        <span class="tr iblock">支出：</span><span>{{dzList.payoutAmount/100 | currency '' }}</span>
                                    </div>
                                    <div class="form-group">
                                        <span class="iblock">凭证号：</span><span>{{dzList.certificate}}</span>
                                    </div>
                                    <div class="form-group">
                                        <label class="w28" ><i>*</i>对账方式：</label>
                                        <input type="radio" id="one" value="one" v-model="glradio">
                                        <label class="w28" for="one">关联对账</label>
                                        <input type="radio" id="two" value="two" v-model="glradio">
                                        <label class="w28" for="two">手工对账</label>
                                    </div>
                                    <div class="form-group tc" v-show="glradio=='one'">
                                        <button class="btn" v-on:click="dzOne">选择付款流水</button>
                                    </div>
                                    <div class="table2" v-show="checkOne&&glradio=='one'">
                                        <div class="box-body">
                                            <table id="table2" class="table table-bordered table-hover">
                                                <thead>
                                                <tr>
                                                    <th>订单号</th>
                                                    <th>付款日期</th>
                                                    <th>名称</th>
                                                    <th>收款信息</th>
                                                    <th>付款金额</th>
                                                    <th>用途</th>
                                                    <th>备注 </th>
                                                    <th>操作</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>20150418105038252</td>
                                                    <td>2015-04-18</td>
                                                    <td>张青</td>
                                                    <td>张青
                                                        36001050307052501764</td>
                                                    <td>{{377/100 | currency '' }}</td>
                                                    <td>佣金划付</td>
                                                    <td>2015年3月份商户返佣</td>
                                                    <td><a href="">选择</a></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div  v-show="glradio=='two'">
                                        <div class="form-group">
                                            <label class="w28"><i>*</i>用途：</label>
                                            <select  v-model="checkForm.purpose">
                                                <option value="">请选择用途</option>
                                                <option value="1">佣金划付</option>
                                                <option value="2">往来款</option>
                                                <option value="3">转账退款</option>
                                                <option value="4">账户费用</option>
                                                <option value="5">其它</option>
                                                <option value="6">往来款</option>
                                                <option value="7">转账退款</option>
                                                <option value="8">账户费用</option>
                                                <option value="9">其它</option>
                                            </select>
                                        </div>
                                        <div class="form-group" >
                                            <label class="w28">收款方：</label>
                                            <input type="text" v-model="skf" placeholder="五十字以内">
                                        </div>
                                        <div class="form-group">
                                            <label for="tarea" class="w28"><i>*</i>备注：</label>
                                            <textarea id="tarea" width="70%" cols="20" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                                <button type="button" v-on:click="personTrue(person.id)" class="btn btn-primary">保存</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </index>
</template>
<style>
    .info div.wrapper{
        overflow: visible;
    }
    .info div.dialog .content .box-body{
        padding: 0 20px;
    }
    .info .table2{
        position: relative;
        background: rgb(255, 255, 255);
        padding: 20px 0;
    }
    .info .box .box-header{
        padding-top: 20px;
    }
    .info .m20{
        margin-bottom:20px;
    }
    .info .modal-body .form-group{
         width: auto;
         text-align: left;
     }
    .info  .modal-body .tc{
        text-align: center;
    }
    .info .modal-body .tr{
        text-align: right;
        margin-left: 10px;
    }
    .info .modal-body .form-group .iblock{
        width: 20%;
        display: inline-block;
    }
    .info  .modal-body .form-group .w28{
        width: 28%;
    }
    .info .modal-body .form-group .w28 i{
        color:red;
    }
    .info .content{
        padding: 0 15px;
    }
    .info  .datetime-picker{
        margin:0 15px;
    }
    .info .modal-body{
        padding: 0 15px;
    }
    .info .page-bar{
        margin: 25px auto;
        text-align: center;
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    export default{
        props:{
        },
        data(){
            return{
                loginList:{},
                zdlists:[],
                dzList:{},
                dz_show:false,
                pagecur:1,
                page_size:15,
                pageall:1,
                accountId:'',
                checkOne:false,
                dateS:'1',
                shouru:0,
                zhichu:0,
                checkForm:{
                    accountId:'',
                    certificate:'',
                    keyword:'',
                    status:'',
                    purpose:'',
                    remarks:'',
                    startDate:'',
                    endDate:'',
                    pageIndex:1,
                    pageSize:15
                },
                glradio:'one',
                shm:''
            }
        },
        methods:{
            // *** 请求账户数据
            getZlists:function(data){
                if(data.endDate<data.startDate){
                    let a=data.endDate,b=data.startDate;
                    this.checkForm.startDate=a;
                    this.checkForm.endDate=b;
                    data.startDate=a;
                    data.endDate=b;
                }
                this.$http.post('./reservecash/detail',data)
                        .then(function (response) {
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                            (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                        }, function (response) {
                            console.log(response);
                        });
            },
            duizhang:function(a){
                this.$set('dzList', a);
                this.dz_show=true;
            },
            checkNew:function(){
                this.getZlists(this.checkForm);
            },
            close_dialog() {
                this.dz_show = false;
            },
            initList:function(){
                $(".modal").modal("hide");
                this.getZlists(this.checkForm);
            },
            dzOne:function(){
                console.log(222);
                var model=$('.info .modal-sm');
                (this.checkOne)?this.checkOne=false:this.checkOne=true;
                (model.hasClass('modal-lg'))?model.removeClass('modal-lg'):model.addClass('modal-lg')
            },
            getTwo:function(num){
                if(num.toString().length>=2) return num;
                var str="";
                for(var i=num.toString().length;i<2;i++)
                    str +="0";
                return str + num.toString();
            },
            getTime(){
                var d=new Date()
                var day=d.getDate()
                var month=d.getMonth() + 1
                var year=d.getFullYear()
                var newD,endD;
                switch (this.dateS){
                    case '0':
                        newD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day-1);
                        endD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                        break;
                    case '1':
                        newD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day-7);
                        endD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                        break;
                    case '2':
                        newD=year + "-" + this.getTwo(month-1) + "-" + this.getTwo(day);
                        endD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                        break;
                    case '3':
                        newD=year + "-" + this.getTwo(month-3) + "-" + this.getTwo(day);
                        endD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                        break;
                    case '4':
                        newD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                        endD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                        break;
                    default:
                        newD=endD='';
                        break;
                }
                this.checkForm.startDate=newD;
                this.checkForm.endDate=endD;
            }
        },
        ready: function () {
            (!!sessionStorage.getItem('userData')) ? this.$set('loginList',JSON.parse(sessionStorage.getItem('userData'))) : null;
            this.accountId=this.checkForm.accountId=this.$route.params.accountId
            this.getTime();
            this.initList();
        },
        components:{
            'datepicker': datepicker,
        },
        watch:{
            zdlists:function(){
                var sr=0,zc=0;
                this.zdlists.forEach(function(e){
                    sr+=e.incomeAmount;
                    zc+=e.payoutAmount;
                });
                this.shouru=(sr/100).toFixed(2);
                this.zhichu=(zc/100).toFixed(2);
            },
            pagecur:function(){
                this.checkForm.pageIndex=this.pagecur;
                this.initList();
            },
            page_size:function(){
                this.checkForm.pageSize=this.page_size;
                this.initList();
            },
            dateS:function(){
                this.getTime();
            }
        },
        validators: {

        }
    }
</script>