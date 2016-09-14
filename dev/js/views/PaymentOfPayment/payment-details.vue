<template>
    <index :title="'备付金付款明细'"
           :ptitle="'备付金支出'"
           :hname="'account-management'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.payType">
                                    <option value="1">备付金账户</option>
                                    <option value="2">商户预付款账户</option>
                                    <option value="3">银行结算</option>
                                    <option value="4">其他</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.subCompanyID" @change="getCity(subCompanyID)">
                                    <option value="">全部分公司</option>
                                    <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.orderNumber" placeholder="订单号">
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.dateS">
                                    <option value="5">今天</option>
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
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.merchantOperationID" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" placeholder="商户ID">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.keyword" placeholder="商户名、账户名、账号">
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.status">
                                    <option value="">请选择对账状态</option>
                                    <option value="2">等待划付</option>
                                    <option value="3">转账中</option>
                                    <option value="4">等待对账</option>
                                    <option value="5">对账成功</option>
                                    <option value="6">划付失败</option>
                                    <option value="0">已关闭</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.purpose">
                                    <option value="">请选择用途</option>
                                    <option value="1">补贴划付</option>
                                    <!--<option value="2">额度采购</option>-->
                                    <option value="3">退税划付</option>
                                    <option value="4">预付款</option>
                                    <option value="5">供货商划付</option>
                                    <option value="10">税金提现</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="备注">
                            </div>
                            <div class="form-group">
                                <a class="btn btn-info" @click="initList" data-ksa="reserve_cash_order_manage.search">查询</a>
                            </div>
                            <div class="form-group">
                                <a class="btn btn-info" @click="payDetailexcel" data-ksa="reserve_cash_order_manage.export">导出</a>
                            </div>
                            <br>
                            <div class="form-group">
                                <a class="btn btn-info" @click="batchs()" data-ksa="reserve_cash_order_manage.pay">一键划付</a>
                            </div>
                    </form>
                </div>
                <div  v-if="zdlists.length>0" class="datatable-scroll" v-cloak>
                    <table class="table main-table">
                        <thead>
                            <tr role="row">
                                <th><input type="checkbox" class="check-all" @change="addAll($event)"></th>
                                <th>订单号</th>
                                <th>商户ID</th>
                                <th>商户名称</th>
                                <th>划付金额</th>
                                <th>退税款</th>
                                <th>付款账户</th>
                                <th>用途</th>
                                <th>状态</th>
                                <th>操作 </th>
                                <th>备注</th>
                                <th>银行流水</th>
                                <th>收款账户名</th>
                                <th>收款账号</th>
                                <th>收款开户行</th>
                                <th>申请时间</th>
                                <th>划付时间</th>
                                <th>对账时间</th>
                                <th>失败原因</th>
                            </tr>
                        </thead>
                        <tbody>
                        <template v-for="(index,n) in zdlists">
                            <tr role="row">
                                <td>
                                    <template v-if="n.status==2"><input type="checkbox" class="check-boxs" @change="addorderIDs($event,n.id)" :value="n.id"></template>
                                </td>
                                <td>
                                    <span>{{n.orderNumber}}</span>
                                </td>
                                <td>
                                    {{n.merchantOperationID}}
                                </td>
                                <td>{{n.merchantName}}</td>
                                <td>
                                    {{n.payoutAmount/100 | currency '' }}
                                </td>
                                <td>
                                    <template v-if="n.purpose==1 || n.purpose==3">{{n.suspensionTaxAmount/100 | currency '' }}</template>
                                    <template v-else>--</template>
                                </td>
                                <td>{{n.payoutAccount}}</td>
                                <td>
                                    <template v-if="n.purpose==1"> 补贴划付</template>
                                    <template v-if="n.purpose==2"> 额度采购</template>
                                    <template v-if="n.purpose==3"> 退税划付</template>
                                    <template v-if="n.purpose==4"> 预付款</template>
                                    <template v-if="n.purpose==5"> 供货商划付</template>
                                    <template v-if="n.purpose==10">税金提现</template>
                                </td>
                                <td >
                                    <template v-if="n.status==1"> 等待审核</template>
                                    <template v-if="n.status==2"> 等待划付</template>
                                    <template v-if="n.status==3"> 转账中</template>
                                    <template v-if="n.status==4"> 等待对账</template>
                                    <template v-if="n.status==5"> 对账成功</template>
                                    <span v-bind:class="{'redrow':n.status==6}" v-if="n.status==6"> 划付失败</span>
                                    <template v-if="n.status==0"> 已关闭</template>
                                </td>
                                <td>
                                    <a v-if="n.status!=0" @click="getInfo(n,index)" data-ksa="reserve_cash_order_manage.detail">详情</a>
                                    <template v-if="n.status==2">
                                        <a data-toggle="modal" data-target="#modal_waring" @click="pay(n.id)" data-ksa="reserve_cash_order_manage.pay">确认划付</a>
                                        <a data-toggle="modal" data-target="#modal_submit" @click="back(n.id)" data-ksa="reserve_cash_order_manage.retrial">退回重审</a>
                                    </template>
                                    <template v-if="n.status==4">
                                        <a data-toggle="modal" data-target="#modal_checking" @click="checking(n.id)" data-ksa="reserve_cash_order_manage.check">对账</a>
                                    </template>
                                    <template v-if="n.status==6">
                                        <a data-toggle="modal" data-target="#modal_waring" @click="update(n.id)" data-ksa="reserve_cash_order_manage.update">更新订单</a>
                                        <a @click="applyTrue(n.id)" data-ksa="reserve_cash_order_manage.apply_pay">申请划付</a>
                                        <a data-toggle="modal" data-target="#modal_waring" @click="close(n.id)" data-ksa="reserve_cash_order_manage.close">关闭订单</a>
                                    </template>
                                </td>
                                <td>{{n.remarks}}</td>
                                <td>
                                    <template v-if="n.certificate!=''"><a data-ksa="reserve_cash_detail_manage.search" v-link="{name:'provisions-info',params:{accountId:0,subCompanyID:n.subCompanyID,certificate:n.certificate}}">查看</a></template>
                                </td>
                                <td>
                                    <span v-if="n.payType==1">{{n.incomeAccountName }}</span>
                                </td>
                                <td>
                                    <span v-if="n.payType==1">{{n.incomeAccountNumber }}</span>
                                </td>
                                <td>
                                    <span v-if="n.payType==1">{{n.incomeBankName}}</span>
                                </td>
                                <td>{{n.applyTime | datetime}}</td>
                                <td>{{n.paymentTime  | datetime}}</td>
                                <td>{{n.successTime | datetime}}</td>
                                <td>{{n.refuseReason }}</td>
                            </tr>
                        </template>
                        <tr role="row">
                            <td></td>
                            <td>合计：</td>
                            <td></td>
                            <td></td>
                            <td>{{total.payoutAmount/100 | currency ''}}</td>
                            <td>{{total.suspensionTaxAmount/100 | currency ''}}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td> </td>
                            <td></td>
                            <td></td>
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
                <page v-if="zdlists.length>0" :all="pageall"
                      :cur.sync="checkForm.pageIndex"
                      :page_size.sync="checkForm.pageSize">
                </page>
                <div style="padding: 30px;font-size: 16px;text-align: center" v-if="!zdlists.length>0" v-cloak>
                    未找到数据
                </div>
            </div>

            <div data-backdrop="static"  id="list_info" class="modal fade" style="display: none;">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">×</button>
                        </div>
                        <div class="modal-body">
                        <table class="table main-table">
                            <thead>
                                <tr role="row">
                                    <th>生成日期</th>
                                    <th>
                                        <span v-if="listinfos!=''&&listinfos[0].purpose=='补贴退税'">退税金额</span>
                                        <span v-else>划付金额</span>
                                    </th>
                                    <th  v-if="listinfos!=''&&listinfos[0].purpose=='补贴划付'">退税款</th>
                                    <th>用途</th>
                                    <th>操作</th>
                                    <th>状态</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tr v-if="listinfos!=null" class="div-table" v-for="trlist in listinfos">
                                <td>{{trlist.createAt | datetimes}}</td>
                                <td>{{trlist.amount/100 | currency '' }}</td>
                                <td  v-if="trlist.purpose=='补贴划付'">{{trlist.taxAmount/100 | currency '' }}</td>
                                <td>{{trlist.purpose}}</td>
                                <td>
                                    <template v-if="trlist.purpose=='补贴划付'"><a data-ksa="subsidy_pay_detail_manage.search" v-link="{name:'subsidy-appropriation',params:{subsidyPayID:trlist.id}}">详情</a></template>
                                    <template v-if="trlist.purpose=='额度采购'"><a data-ksa="limit_purchase_account_manage.search" v-link="{name:'limit-purchase-detail',params:{id:trlist.id}}">详情</a></template>
                                    <template v-if="trlist.purpose=='补贴退税'"><a data-ksa="subsidy_tax_rebate_detail_manage.search" v-link="{name:'subsidy-tax-rebate',params:{subsidyTaxRebateID:trlist.id}}">详情</a></template>
                                    <template v-if="trlist.purpose=='预付款'"><a data-ksa="advance_payment_detail_manage.search" v-link="{name:'advance-payment-detail',params:{advanceId:trlist.id}}">详情</a></template>
                                    <template v-if="trlist.purpose=='税金提现'"><a @click="skipToSubsidyAccount(trlist.id)" data-ksa="suspension_tax_account_detail_manage.search">详情</a></template>
                                </td>
                                <td>
                                    <template v-if="trlist.status==1"> 等待审核</template>
                                    <template v-if="trlist.status==2"> 等待划付</template>
                                    <template v-if="trlist.status==3"> 转账中</template>
                                    <template v-if="trlist.status==4"> 等待对账</template>
                                    <template v-if="trlist.status==5"> 对账成功</template>
                                    <template v-if="trlist.status==6"> 划付失败</template>
                                    <template v-if="trlist.status==0"> 已关闭</template>
                                </td>
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            <tr style="padding: 30px;font-size: 16px;text-align: center"  v-if="!listinfos.length" v-cloak>
                                <td>未找到数据</td>
                            </tr>
                        </table>
                        </div>
                    </div>
                </div>
            </div>

            <div data-backdrop="static"  id="modal_waring" class="modal fade" style="display: none;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">×</button>
                            <h5 class="modal-title" v-text="waring"></h5>
                        </div>
                        <div class="modal-body">
                            <div class="form-group tc">
                                <button  v-if="waring=='你确认更新账单？'" type="button" @click="updateTrue" class="btn btn-primary">确认</button>
                                <button  v-if="waring=='你确认划付账单？'" type="button" @click="payTrue" class="btn btn-primary">确认</button>
                                <button  v-if="waring=='你确认一键划付？'" type="button" @click="batchPay" class="btn btn-primary">确认</button>
                                <button  v-if="waring=='你确认关闭该账单？'" type="button" @click="closeTrue" class="btn btn-primary">确认</button>
                                <!--<button  v-if="waring=='你确认删除该订单流水？'" type="button" @click="delTrue" class="btn btn-primary">确认</button>-->
                                <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div data-backdrop="static"  id="modal_submit" class="modal fade" style="display: none;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">×</button>
                            <h5 class="modal-title" v-text="title"></h5>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label class="col-lg-3 control-label" v-if="subtitle=='退回重审'"><i>*</i>退回原因</label>
                                <div class="col-lg-9">
                                    <textarea rows="5" cols="5" class="form-control" v-model="remarks" placeholder=""></textarea>
                                </div>
                            </div>
                            <div class="form-group tc">
                                <button  v-if="subtitle=='退回重审'" type="button" @click="backTrue" class="btn btn-primary">退回</button>
                            </div>
                            <div class="form-group tc">
                                <span v-show="!remarks&&fires" class="validation-error-label">
                                    <template v-if="subtitle=='退回重审'">请填写退回原因</template>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div data-backdrop="static"  id="modal_checking" class="modal fade" style="display: none;">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">×</button>
                            <h5 class="modal-title">对账</h5>
                        </div>
                        <div  v-if="!!checkLists.length&&checkLists != ''" class="modal-body">
                            <div class="tc f20">
                                请选择备付金银行流水
                            </div>
                            <table class="table" style="border: 1px solid #ccc;">
                                <thead>
                                    <tr role="row">
                                        <th>凭证号</th>
                                        <th>交易时间</th>
                                        <th>收款方</th>
                                        <th>收款信息</th>
                                        <th>付款金额</th>
                                        <th>用途</th>
                                        <th>备注</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr role="row"  v-for="n in checkLists">
                                        <td>{{n.certificate}}</td>
                                        <td>{{n.tradeTime | datetime}}</td>
                                        <td :title = "n.collectionName">{{n.collectionName}}</td>
                                        <td :title = "n.accountName">{{n.accountName | filterlength}}</br>{{n.accountNumber}}</td>
                                        <td>{{n.payoutAmount/100 | currency '' }}</td>
                                        <td>
                                            <template v-if="n.purpose==1"> 补贴划付</template>
                                            <template v-if="n.purpose==2"> 额度采购</template>
                                            <template v-if="n.purpose==3"> 退税划付</template>
                                            <template v-if="n.purpose==4"> 预付款</template>
                                            <template v-if="n.purpose==5"> 供货商划付</template>
                                        </td>
                                        <td>{{n.remarks}}</td>
                                        <td><a href="javascript:void(0)" @click="checkTrue(n.reserveCashId)">选择</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-body" v-else>
                            未找到对账数据
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </index>
</template>
<style lang="sass" scoped>
     .f20{
        font-size: 20px;
        font-weight: bolder;
    }
       .modal-body label i{
        color:red;
    }
      .modal-body button{
        width:35%;
    }
      .m20{
        margin-bottom:20px;
    }
      .mt0{
        margin-top: 0
    }
     .panel-title p span{
        width: 24%;
        margin-bottom: 3px;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 13px;
    }
     .datatable-scroll{
         overflow: auto;
        padding-bottom: 20px;
        background:#fff;
         .main-table{
             .bgddd{
                 background: #ECECEC;
             }
            .morebtn{
                cursor: pointer;
                line-height: 18px;
                position: relative;
                left: 8px;
                i{
                    color: rgb(0, 188, 212);
                    font-size: 14px;
                }
            }
             tr{
                 td,th{
                     padding: 15px 10px;
                     text-align:center;
                 }
                 .lists{
                     border-bottom: 1px solid #ccc;
                 }
                 .title,.lists{
                    overflow:hidden;
                     border-right: 1px solid #ccc;
                     display: table-row;
                     span{
                         display: table-cell;
                         padding: 0 15px;
                         height: 30px;
                         line-height: 30px;
                         border: 1px solid #ccc;
                         border-bottom: 0;
                         border-right: 0;
                     }
                 }
             }
             .redrow{
                 display: inline-block;
                 padding:6px;
                 border-radius: 6px;
                 background: rgb(253,110,73);
                 color: #fff;
                 font-size: 12px;
             }
         }
   }
     .div-table{
         td{
             position: relative;
             .pull-left{
                 margin: 10px;
             }

         }
     }
     .modal-body tr td, .modal-body tr th{
        padding: 10px;
    }
    .tc .validation-error-label{
        display: inline-block;
    }
    .modal-body{
        .form-group{
            overflow: hidden;
        }
    }
</style>
<script>
    import model from '../../ajax/PaymentOfPayment/payment_model'
    export default{
        data(){
            this.model =model(this)
            return{
                id:'',
                pageall:1,
                waring:'',
                subtitle:'',
                checkForm:{
                    subCompanyID:'',
                    payType: '1',
                    orderNumber: '',
                    merchantOperationID:'',
                    keyword:'',
                    status:'',
                    purpose:'',
                    remarks:'',
                    startDate:'',
                    endDate:'',
                    mid:'',
                    pageIndex:1,
                    dateS:'3',
                    pageSize:10
                },
                total:{
                    suspensionTaxAmount:'',
                    payoutAmount:''
                },
                listinfos:[],
                zdlists:[],
                checkLists:[],
                remarks:'',
                delPurpose:'',
                fires:false,
                subcompanyList:'',
                orderIDs:[]
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
                this.model.getlist(data)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.$set('zdlists', response.data.data)
                                this.$set('pageall', response.data.total)
                            }
                        });
                this.model.reserveCashOrdertotal(data)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.$set('total', response.data.data)
                            }
                        });
            },
            //获取分公司数据
            getSubcompany(){
                this.$common_model.getcompany()
                        .then((response)=>{
                            if(response.data.code==0){
                            this.$set('subcompanyList', response.data.data)
                        }
                    });
            },
            initList(){
                $(".modal").modal("hide");
                $(".check-boxs").prop({'checked':false})
                if (this.checkForm.startDate=="" && this.checkForm.endDate=="") {
                    this.checkForm.startDate=init_date('1')[0];
                    this.checkForm.endDate=init_date('1')[1];
                }
                this.listinfos=[];
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getZlists(this.checkForm);
            },
            payDetailexcel(){
                if(!this.zdlists.length>0)return;
                if (this.checkForm.startDate=="" && this.checkForm.endDate=="") {
                    this.checkForm.startDate=init_date('3')[0];
                    this.checkForm.endDate=init_date('3')[1];
                }
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.payDetailexcel+ $.param(this.checkForm));
            },
            getInfo(a){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.listinfos = []
                this.id=a.id;
                this.model.getpart(a.id)
                        .then( (response)=> {
                            if(response.data.code==0) {
                                this.$set('listinfos',response.data.data);
                                $('#list_info').modal('show');
                            }
                        });
            },
            back(a){
                this.subtitle = '退回重审';
                this.remarks='';
                this.fires=false;
                this.accountId=a;
            },
            update(a){
                this.waring = '你确认更新账单？';
                this.accountId=a;
            },
            pay(a){
                this.waring = '你确认划付账单？';
                this.accountId=a;
            },
            payTrue(){
                this.orderIDs=[];
                this.orderIDs.push(this.accountId);
                this.model.reservecash_batchPay(JSON.stringify(this.orderIDs))
                        .then( (response)=> {
                            if(response.data.code==0){
                                    this.initList();
                                    dialogs('success','划付成功！');
                                }
                            })
            },
            batchs(){
                if(this.orderIDs==''){
                    dialogs('info','请勾选划付信息！');
                    return;
                }
                this.waring = '你确认一键划付？';
                $('#modal_waring').modal('show');
            },
            close(a){
                this.waring = '你确认关闭该账单？';
                this.accountId=a;
            },
//            delBtn(a,b){
//                this.waring = '你确认删除该订单流水？';
//                this.accountId=a;
//                this.delPurpose=b;
//            },
            checking(a){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.accountId=a;
                this.model.checklist(a)
                        .then( (response)=> {
                            if(response.data.code==0){
                                this.$set('checkLists',response.data.data)
                            }
            })
            },
            checkTrue(_id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                let data={
                    'orderId':this.accountId,
                    'reserveCashId':_id
                }
                this.model.checking(data)
                        .then( (response)=> {
                                if(response.data.code==0){
                                    this.initList()
                                    dialogs('success','对账成功！');
                                }
                        })
            },
            updateTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.reservecash_update(this.accountId)
                    .then( (response)=> {
                        if(response.data.code==0){
                            this.initList()
                            dialogs('success','已更新！');
                        }
                    })
            },
//            delTrue(){
//                if(sessionStorage.getItem('isHttpin')==1)return;
//                let data={
//                    'id':this.accountId,
//                    'purpose':this.delPurpose
//                }
//                this.model.reservecash_delete(data)
//                        .then((response)=>{
//                            if(response.data.code==0){
//                                this.initList();
//                                dialogs('success','已删除！');
//                            }
//                        })
//            },
            closeTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.reservecash_close(this.accountId)
                        .then( (response)=> {
                            if(response.data.code==0){
                                this.initList();
                                dialogs('success','已关闭！');
                            }
                        })
            },
            backTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.remarks==''){this.fires=true;return;}
                let data={
                    'id':this.accountId,
                    'remarks':this.remarks,
                }
                this.model.reservecash_retrial(data)
                        .then( (response)=> {
                                if(response.data.code==0){
                                    this.initList();
                                    dialogs('success','已退回！');
                                }
                            })
            },
            applyTrue(_id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                let data={
                    'id':_id,
                }
                this.model.reservecash_applypay(data)
                        .then( (response)=> {
                                if(response.data.code==0){
                                    this.initList();
                                    dialogs('success','已申请！');
                                }
                        })
            },
            checkingTrue(a){
            },
            getTime(){
                this.checkForm.startDate=init_date(this.checkForm.dateS)[0];
                this.checkForm.endDate=init_date(this.checkForm.dateS)[1];
            },
            addorderIDs(e){
                if(e.target.checked){
                    $(e.target).addClass('checked-boxs');
                }else{
                    $(e.target).removeClass('checked-boxs');
                }
                this.orderIDs= Array.from($(".checked-boxs"), i => parseInt(i.value));
            },
            addAll(e){
                if(e.target.checked){
                    $(".check-boxs").prop({'checked':true}).addClass('checked-boxs');
                    this.orderIDs= Array.from($(".check-boxs"), i => parseInt(i.value));
                }else{
                    $(".check-boxs").prop({'checked':false}).removeClass('checked-boxs');
                    this.orderIDs=[];
                }
            },
            batchPay(){
                this.model.reservecash_batchPay(JSON.stringify(this.orderIDs))
                        .then( (response)=> {
                                if(response.data.code==0){
                                     $("#modal_waring").modal("hide");
                                    dialogs('success','划付成功！');
                                }
                                this.orderIDs=[];
                                this.initList();
                        })
            },
            skipToSubsidyAccount(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.skipToSubsidyAccount(this.id)
                        .then( (response)=> {
                            if(response.data.code==0&&!!response.data.data){
                                let trlist=response.data.data;
                                this.$router.go({name:'suspension-tax',params:{orderId:trlist.reserveCashOrder.orderId,suspensionHDid:trlist.subsidyAccount.id,suspensionBTid:trlist.reserveCashOrder.merchantId,suspensionZHname:trlist.activity.name,suspensionSHid:trlist.merchant.merchantID,suspensionZHbalance:trlist.subsidyAccount.suspensionTaxAmount,suspensionSHname:trlist.merchant.name}});
                            }
                        })
            }
        },
        watch:{
            'checkForm.pageSize+checkForm.pageIndex'(){
                this.initList();
            },
            'checkForm.dateS'(){
                this.getTime();
            }
        },
        ready(){
            (this.$route.params.reserveCashOrderNumber==':reserveCashOrderNumber')?this.checkForm.orderNumber='' :this.checkForm.orderNumber=this.$route.params.reserveCashOrderNumber;
            (this.$route.params.payType==':payType')?this.checkForm.payType='1' :this.checkForm.payType=this.$route.params.payType;
            (this.$route.params.merchantOperationIDs==':merchantOperationIDs')?this.checkForm.merchantOperationID='' :this.checkForm.merchantOperationID=this.$route.params.merchantOperationIDs;
            this.getTime();
            this.getSubcompany();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.initList();
        }
    }
    // Collapse on click
    $(document).on('click','.table .morebtn',function (e) {
        e.preventDefault();
        var $categoryCollapse = $(this).closest('tr').next();
        $(this).find('i').toggleClass('glyphicon-minus');
        $categoryCollapse.slideToggle(150);
    });
</script>