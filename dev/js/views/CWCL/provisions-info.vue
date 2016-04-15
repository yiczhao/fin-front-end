<template>
    <index :name="loginList.trueName"
           :title="'备付金明细'"
           :ptitle="'财务处理'"
           :hname="'account-management'"
           :isshow="'isshow'">
        <section class="content" slot="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <form class="form-inline manage-form">
                                <div class="m20">
                                    <div class="form-group">
                                        <select class="form-control" v-model="checkForm.dateS">
                                            <option value="0">昨天</option>
                                            <option value="1">最近一周</option>
                                            <option value="2">最近一个月</option>
                                            <option value="3">最近三个月</option>
                                            <option value="4">自定义时间</option>
                                        </select>
                                    </div>
                                    <div class="form-group" v-show="checkForm.dateS==4">
                                        <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                                        <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                                    </div>
                                </div>
                                <div  class="m20">
                                    <div class="form-group">
                                        <input type="text" class="form-control" v-model="checkForm.pzh" placeholder="凭证号">
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" v-model="checkForm.zh" placeholder="收款方、账户名、账号">
                                    </div>
                                    <div class="form-group">
                                        <select class="form-control" v-model="checkForm.typeS">
                                            <option value="0">请选择对账状态</option>
                                            <option value="1">成功</option>
                                            <option value="2">待对账</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <select class="form-control" v-model="checkForm.ytS">
                                            <option value="0">请选择用途</option>
                                            <option value="1">佣金划付</option>
                                            <option value="2">往来款</option>
                                            <option value="3">转账退款</option>
                                            <option value="4">账户费用</option>
                                            <option value="5">其它</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" v-model="checkForm.bz" placeholder="备注">
                                    </div>
                                    <div class="form-group">
                                        <input type="button" class="btn btn-info" v-on:click="checkNew" value="查询">
                                    </div>
                                    <div class="form-group">
                                        <input type="button" class="btn btn-info" value="导出">
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="box-body">
                            <table id="table1" class="table table-bordered table-hover">
                                <thead>
                                <tr>
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
                                <tr v-if="!!zdlists.length" v-for="(index,trlist) in zdlists">
                                    <td>{{trlist.bianhao}}</td>
                                    <td>{{trlist.pingzheng}}</td>
                                    <td>{{trlist.shoukuan}}</td>
                                    <td>{{trlist.zhanghuming}}</td>
                                    <td>{{trlist.zhanghao}}</td>
                                    <td>{{trlist.shouru/100 | currency '' }}</td>
                                    <td>{{trlist.zhichu/100 | currency '' }}</td>
                                    <td>{{trlist.yue/100 | currency '' }}</td>
                                    <td>{{trlist.datatime | datetime}} </td>
                                    <td>
                                        <template v-if="trlist.accountType==1"> 佣金划付</template>
                                        <template v-if="trlist.accountType==2"> 往来款</template>
                                        <template v-if="trlist.accountType==3">转账退款</template>
                                        <template v-if="trlist.accountType==4">账户费用</template>
                                        <template v-if="trlist.accountType==5">其它</template>
                                    </td>
                                    <td>
                                        <span v-if="trlist.status==0">成功</span>
                                        <span v-else>待对账</span>
                                    </td>
                                    <td>
                                        <a href="javascript:void(0);" v-on:click="duizhang(trlist)" v-if="trlist.status==1">对账</a>
                                        <a v-link="" v-on:click="duizhang(trlist)" v-if="trlist.status==2">详情</a>
                                    </td>
                                    <td>{{trlist.beizhu}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <dialog :title="'负责人'" :show="dz_show" :cb-close="close_dialog" :width="350">
                            <div class="modal-body member_rules_modal-body">
                                <div class="form-group">
                                    <span class="iblock">账户名：</span><span>{{dzList.zhanghuming}}</span>
                                </div>
                                <div class="form-group">
                                    <span class="iblock">账 号：</span><span>{{dzList.zhanghao}}</span>
                                </div>
                                <div class="form-group">
                                    <span class="iblock">开户行：</span><span>{{dzList.khh}}</span>
                                </div>
                                <div class="form-group">
                                    <span class="iblock">时 间：</span><span>{{dzList.datatime | datetime}}</span>
                                </div>
                                <div class="form-group">
                                    <span class="iblock">收入：</span><span>{{dzList.shouru/100 | currency '' }}</span>
                                    <span class="tr iblock">支出：</span><span>{{dzList.zhichu/100 | currency '' }}</span>
                                </div>
                                <div class="form-group">
                                    <span class="iblock">凭证号：</span><span>{{dzList.pingzheng}}</span>
                                </div>
                                <div class="form-group">
                                    <label class="w28" ><i>*</i>对账方式：</label>
                                    <input type="radio" id="one" value="one" v-model="glradio">
                                    <label class="w28" for="one">关联对账</label>
                                    <input type="radio" id="two" value="two" v-model="glradio">
                                    <label class="w28" for="two">手工对账</label>
                                </div>
                                <div class="form-group tc" v-show="glradio=='one'">
                                    <button class="btn" v-on:click="dzOne" v-model="checkOne">选择付款流水</button>
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
                                        <select  v-model="checkForm.ytS">
                                            <option value="0">请选择用途</option>
                                            <option value="1">佣金划付</option>
                                            <option value="2">往来款</option>
                                            <option value="3">转账退款</option>
                                            <option value="4">账户费用</option>
                                            <option value="5">其它</option>
                                        </select>
                                    </div>
                                    <div class="form-group" >
                                        <label class="w28"><i>*</i>商户名：</label>
                                        <input type="text" v-model="shm" placeholder="商户名">
                                    </div>
                                    <div class="form-group">
                                        <label for="tarea" class="w28"><i>*</i>备注：</label>
                                        <textarea id="tarea" width="70%" cols="20" rows="3"></textarea>
                                    </div>
                                    <div class="form-group tc">
                                        <button class="btn">保存</button>
                                    </div>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </section>
    </index>
</template>
<style>
    div.wrapper{
        overflow: visible;
    }
    div.dialog .content .box-body{
        padding: 0 20px;
    }
    .table2{
        position: relative;
        right: 120%;
        width: 900px;
        background: rgb(255, 255, 255);
        padding: 20px 0;
    }
    .box .box-header{
        padding-top: 20px;
    }
    .m20{
        margin-bottom:20px;
    }
    .modal-body .form-group{
         width: auto;
         text-align: left;
     }
    .modal-body .tc{
        text-align: center;
    }
    .modal-body .tr{
        text-align: right;
        margin-left: 10px;
    }
    .modal-body .form-group .iblock{
        width: 20%;
        display: inline-block;
    }
    .modal-body .form-group .w28{
        width: 28%;
    }
    .modal-body .form-group .w28 i{
        color:red;
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
</style>

<script>
    import datepicker from '../components/datepicker.vue'
    import dialog from '../components/dialog.vue'
    export default{
        props:{
        },
        data(){
            return{
                loginList:{},
                zdlists:[{
                    'bianhao':1,
                    'pingzheng':'022981320755',
                    'shoukuan':'陈玉风',
                    'zhanghuming':'南昌卡说信息技术有限公司',
                    'zhanghao':'36001050700052509200',
                    'shouru':20000,
                    'zhichu':2132131,
                    'yue':136656,
                    'datatime':1460615725000,
                    'accountType':1,
                    'status':0,
                    'beizhu':'备注'
                },{
                    'bianhao':1,
                    'pingzheng':'022981320755',
                    'shoukuan':'陈玉风',
                    'zhanghuming':'南昌卡说信息技术有限公司',
                    'zhanghao':'36001050700052509200',
                    'shouru':20000,
                    'zhichu':2132131,
                    'yue':136656,
                    'datatime':1460615725000,
                    'accountType':1,
                    'status':1,
                    'beizhu':'备注'
                },{
                    'bianhao':1,
                    'pingzheng':'022981320755',
                    'shoukuan':'陈玉风',
                    'zhanghuming':'南昌卡说信息技术有限公司',
                    'zhanghao':'36001050700052509200',
                    'shouru':20000,
                    'zhichu':2132131,
                    'yue':136656,
                    'datatime':1460615725000,
                    'accountType':1,
                    'status':2,
                    'beizhu':'备注'
                }],
                dzList:{},
                dz_show:false,
                pageall:'',
                accountId:'',
                checkOne:false,
                checkForm:{
                    dateS:0,
                    pzh:'',
                    zh:'',
                    typeS:0,
                    ytS:0,
                    bz:'',
                    startDate:'',
                    endDate:''
                },
                glradio:'one',
                shm:''
            }
        },
        methods:{
            // *** 请求账户数据
            getZlists:function(data){
                console.log(data);
                this.$http.post('./bankaccount/list',data)
                        .then(function (response) {
                            // *** 判断请求是否成功如若成功则填充数据到模型
//                            (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                            (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                        }, function (response) {
                            console.log(response);
                        });
            },
            duizhang:function(a){
                console.log(111);
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
                this.close_dialog();
                this.getZlists(this.checkForm);
            },
            dzOne:function(){
                console.log(222);
                (this.checkOne)?this.checkOne=false:this.checkOne=true;
            }
        },
        ready: function () {
            (!!sessionStorage.getItem('userData')) ? this.$set('loginList',JSON.parse(sessionStorage.getItem('userData'))) : null;
            this.accountId=this.checkForm.zh=this.$route.params.accountId;
            this.initList();
        },
        components:{
            'datepicker': datepicker,
            'dialog': dialog,
        },
        watch:{

        },
        validators: {

        }
    }
</script>