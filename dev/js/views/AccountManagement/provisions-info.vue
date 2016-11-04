<template>
    <index :title="'备付金明细'"
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
                            <input type="text" class="form-control" v-model="checkForm.certificate" placeholder="凭证号">

                            <input type="text" class="form-control" v-model="checkForm.keyword" placeholder="收款方、账户名、账号">

                            <select class="form-control" v-model="checkForm.status">
                                <option value="">请选择状态</option>
                                <option value="1">成功</option>
                                <option value="0">待对账</option>
                            </select>

                            <select class="form-control" v-model="checkForm.purpose">
                                <option value="">请选择用途</option>
                                <option value="1">补贴划付</option>
                                <option value="2">额度采购</option>
                                <option value="3">退税划付</option>
                                <option value="4">预付款</option>
                                <option value="5">供货商划付</option>
                                <option value="6">往来款</option>
                                <option value="7">转账退款</option>
                                <option value="8">账户费用</option>
                                <option value="10">税金提现</option>
                                <option value="9">其它</option>
                            </select>

                            <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="备注">
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="checkNew" data-ksa="reserve_cash_detail_manage.search">查询</a>
                    </div>
                </div>

            <div style="margin: 0 20px 20px 0;font-size: 18px;">
                <span>账户简称：</span><span style="margin-right: 10px;">{{aname}}</span>
                <span>余额：</span><span style="margin-right: 10px;">{{balance/100 | currency ''}}</span>
                <span  v-if="zdlists.length>0">总收入：</span><span style="margin-right: 10px;" v-if="zdlists.length>0">{{shouru/100 | currency ''}}元</span>
                <span  v-if="zdlists.length>0">总支出：</span><span style="margin-right: 10px;" v-if="zdlists.length>0">{{zhichu/100 | currency ''}}元</span>
            </div>

            <div v-if="zdlists.length>0"  class="dataTables_wrapper no-footer" v-cloak>
                <div class="datatable-scroll">
                    <table id="table1" class="table datatable-selection-single dataTable no-footer">
                        <thead>
                            <tr  role="row">
                                <th>编号</th>
                                <th>收款方</th>
                                <th>凭证号</th>
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
                            <tr role="row" v-for="(index,trlist) in zdlists">
                                <td>{{index+1}}</td>
                                <td>{{trlist.collectionName}}</td>
                                <td>{{trlist.certificate}}</td>
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
                                    <template v-if="trlist.purpose==10">税金提现</template>
                                </td>
                                <td>
                                    <span v-if="trlist.status==1">成功</span>
                                    <span v-else>待对账</span>
                                </td>
                                <td>
                                    <a data-ksa="reserve_cash_detail_manage.check"   @click="duizhang(trlist)" v-if="trlist.status==0">对账</a>
                                    <a data-ksa="reserve_cash_order_manage.search" v-link="{name:'payment-details',params:{reserveCashOrderNumber:trlist.reserveCashOrderNumber}}" v-if="trlist.status==1&&trlist.checkType==1">详情</a>
                                </td>
                                <td>{{trlist.remarks}}</td>
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

            <div style="padding: 30px;font-size: 16px;text-align: center" v-else v-cloak>
                未找到数据
            </div>

            <content-dialog
                    :show.sync="modal_fzr" :is-button="false" :type.sync="'infos'"
                    :title.sync="'交易对账'"
            >
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
                                        <button class="btn" @click="dzOne(dzList.id)">选择付款流水</button>
                                    </div>
                                    <div class="form-group" v-show="glradio=='one'&&dzcheckList.purpose!=''">
                                        <span class="iblock">用途：</span>
                                        <span v-if="dzcheckList.purpose==1"> 补贴划付</span>
                                        <span v-if="dzcheckList.purpose==2"> 额度采购</span>
                                        <span v-if="dzcheckList.purpose==3"> 退税划付</span>
                                        <span v-if="dzcheckList.purpose==4"> 预付款</span>
                                        <span v-if="dzcheckList.purpose==5"> 供货商划付</span>
                                        <span v-if="dzcheckList.purpose==6"> 往来款</span>
                                        <span v-if="dzcheckList.purpose==7"> 转账退款</span>
                                        <span v-if="dzcheckList.purpose==8"> 账户费用</span>
                                        <span v-if="dzcheckList.purpose==10"> 税金提现</span>
                                        <span v-if="dzcheckList.purpose==9"> 其它</span>
                                    </div>
                                    <div class="form-group" v-show="glradio=='one'&&dzcheckList.purpose!=''">
                                        <span class="iblock">备注：</span><span>{{dzcheckList.remarks}}</span>
                                    </div>
                                <div  v-show="glradio=='two'">
                                    <div class="form-group">
                                        <label class="w20"><i>*</i>用途：</label>
                                        <select class="form-control"  v-model="manualCheck.purpose">
                                            <option value="">请选择用途</option>
                                            <option value="1">补贴划付</option>
                                            <option value="2">额度采购</option>
                                            <option value="3">退税划付</option>
                                            <option value="4">预付款</option>
                                            <option value="5">供货商划付</option>
                                            <option value="6">往来款</option>
                                            <option value="7">转账退款</option>
                                            <option value="8">账户费用</option>
                                            <option value="10">税金提现</option>
                                            <option value="9">其它</option>
                                        </select>
                                    </div>
                                    <div class="form-group" >
                                        <label class="w20">收款方：</label>
                                        <input type="text" class="form-control" v-model="manualCheck.collectionName" placeholder="五十字以内">
                                    </div>
                                    <div class="form-group">
                                        <label for="tarea" class="w20" style="position: relative;top: -59px;"><i>*</i>备注：</label>
                                        <textarea class="form-control" v-model="manualCheck.remarks" width="70%" cols="20" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="form-group tc"  v-show="glradio=='one'&&dzcheckList.purpose!=''||glradio=='two'">
                                    <button type="button" @click="dzTrue(dzList.id)" class="btn btn-primary">保存</button>
                                </div>
                                <div class="form-group tc">
                                    <span v-show="errortext!=''" class="validation-error-label" v-text="errortext"></span>
                                </div>
                            </div>
                        </div>
            </content-dialog>

            <content-dialog
                    :show.sync="modal_dzone" :is-button="false" :type.sync="'infos'"
                    :title.sync="'交易对账'" 
            >
                        <div class="modal-body">
                            <table v-show="gllists.length>0" class="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>订单号</th>
                                    <th>付款时间</th>
                                    <th>收款方</th>
                                    <th>收款信息</th>
                                    <th>付款金额</th>
                                    <th>用途</th>
                                    <th>备注 </th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="n in gllists">
                                    <td>{{n.orderId}}</td>
                                    <td>{{n.payTime | datetime}}</td>
                                    <td :title="n.displayName">{{n.displayName | filterlength}}</td>
                                    <td :title="n.collectionAccountName+n.collectionAccountNumber">
                                        {{n.collectionAccountName | filterlength}}
                                        </br>
                                        {{n.collectionAccountNumber}}
                                    </td>
                                    <td>{{n.payAmount/100 | currency '' }}</td>
                                    <td>
                                        <template v-if="n.purpose==1"> 补贴划付</template>
                                        <template v-if="n.purpose==2"> 额度采购</template>
                                        <template v-if="n.purpose==3"> 退税划付</template>
                                        <template v-if="n.purpose==4"> 预付款</template>
                                        <template v-if="n.purpose==5"> 供货商划付</template>
                                        <template v-if="n.purpose==6"> 往来款</template>
                                        <template v-if="n.purpose==7"> 转账退款</template>
                                        <template v-if="n.purpose==8"> 账户费用</template>
                                        <template v-if="n.purpose==9"> 其它</template>
                                        <template v-if="n.purpose==10">税金提现</template>
                                    </td>
                                    <td :title="n.remarks">{{n.remarks | filterlength}}</td>
                                    <td><a href="javascript:void(0);" @click="checkDz(n.purpose,n.remarks,n.id)">选择</a></td>
                                </tr>
                                </tbody>
                            </table>
                            <div v-else>
                                未查询到对账数据
                            </div>
                        </div>
            </content-dialog>

            </div>
            </div>
        </div>
    </index>
</template>
<style lang="sass" scoped>
     div.wrapper{
        overflow: visible;
    }
     div.dialog .content .box-body{
        padding: 0 20px;
    }
     .table2{
        position: relative;
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
         #table1{
             tr{
                 td,th{
                     padding-left: 5px;
                     padding-right: 5px;
                 }
             }
         }
    }
      .datetime-picker{
        margin:0 15px;
    }
     .modal-body{
        padding: 0 15px;
         .form-control{
             width: 80%;
             display: inline-block;
         }
         .w20{
             width: 18%;
             i{color: red}
         }
    }
     .datatable-scroll{
        overflow:auto;
         table{
             th{
                 text-align: center;
             }
             td{
                 text-align: center;
             }
         }
    }
     .modal-header{
        margin-bottom: 20px;
    }
     .validation-error-label{
         display: inline-block;
     }
</style>
<script>
    import model from '../../ajax/AccountManagement/provisions_model'
    export default{
        props:{
        },
        data(){
            this.model=model(this);
            return{
                modal_fzr: false,//
                modal_dzone: false,
                loginList:{},
                zdlists:[],
                dzList:{},
                pageall:1,
                accountId:'',
                checkOne:false,
                shouru:'',
                zhichu:'',
                gllists:[],
                aname:'',
                balance:'',
                subCompanyID:'',
                dateS:'3',
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
                    pageSize:10
                },
                dzcheckList:{
                    purpose:'',
                    remarks:'',
                },
                glradio:'one',
                associateCheck:{
                    "orderID":'',
                    "detailID":''
                },
                manualCheck:[],
                errortext:'',
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
                this.model.detail(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('zdlists', response.data.data)
                                this.$set('pageall', response.data.total)
                            }
                        });
            },
            cleardz(){
                this.dzcheckList={
                    purpose:'',
                            remarks:'',
                };
                this.manualCheck={
                    "id":'',
                    "collectionName":'',
                    "purpose":'',
                    "remarks":''
                }
                this.glradio='one';
            },
            duizhang(a){
                this.cleardz();
                this.$set('dzList', a);
                this.errortext='';
                this.modal_fzr=true;//
            },
            checkNew(){
                this.initList();
            },
            initList(){
                this.modal_fzr = false;//
                this.modal_dzone = false;//
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getZlists(this.checkForm);
            },
            dzOne(id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                // *** 请求对账数据
                this.model.selectReserveCashOrderListByID(id)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('gllists', response.data.data);
                                (this.checkOne)?this.checkOne=false:this.checkOne=true;
                                this.modal_dzone = true;//
                            }
                        });
            },
            checkDz(purpose,remarks,_id){
                  this.dzcheckList={
                      purpose:purpose,
                      remarks:remarks,
                  }
                  this.associateCheck.orderID=_id;
                  this.modal_dzone = false;
            },
            dzTrue(_id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.glradio=='one'){
                    this.associateCheck.detailID=_id;
                    this.model.associateCheck(this.associateCheck)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.initList();
                                dialogs('success','对账成功！');
                            }
                        })
                }else{
                    if(this.manualCheck.remarks==''||this.manualCheck.purpose==''){
                        this.errortext='您的信息未填写完整';
                        return;
                    }
                    this.manualCheck.id=_id;
                    this.model.manualCheck(this.manualCheck)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.initList();
                                dialogs('success','对账成功！');
                            }
                        })
                }
            },
            getTime(){
                this.checkForm.startDate=init_date(this.dateS)[0];
                this.checkForm.endDate=init_date(this.dateS)[1];
            },
            getBalance(){
                this.model.getBalance(this.subCompanyID).then((res)=>{
                    if(res.data.code == 0){
                        this.aname=res.data.data.shortName;
                        this.balance=res.data.data.balanceAmount;
                        this.checkForm.accountId=res.data.data.id;
                        this.initList();
                    }
                });
            }

        },
        ready: function () {
            (!!sessionStorage.getItem('userData')) ? this.$set('loginList',JSON.parse(sessionStorage.getItem('userData'))) : null;
            var vm=this;
            vm.getTime();
            (vm.$route.params.accountId==0)?vm.accountId=vm.checkForm.accountId='' : vm.accountId=vm.checkForm.accountId=vm.$route.params.accountId;
            (vm.$route.params.certificate==0)? vm.checkForm.certificate='' : vm.checkForm.certificate=vm.$route.params.certificate;
            (vm.$route.params.aname==':aname')? vm.aname='' : vm.aname=vm.$route.params.aname;
            (vm.$route.params.balance==':balance')? vm.balance='' : vm.balance=vm.$route.params.balance;
            (vm.$route.params.subCompanyID==':subCompanyID')? vm.subCompanyID='' : vm.subCompanyID=vm.$route.params.subCompanyID;
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.checkForm=back_json.fetchArray(vm.$route.path):null;
            if(vm.subCompanyID != ''){
                vm.getBalance();
            }else{
                vm.initList();
            }

        },
        watch:{
            'zdlists'(){
                this.model.incomeAndPayoutAmount(this.checkForm)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.shouru=response.data.data[0].incomeAmount;
                                this.zhichu=response.data.data[0].payoutAmount;
                            }
                        })
            },
            'checkForm.pageSize + checkForm.pageIndex'(){
                this.initList();
            }
        }
    }
</script>