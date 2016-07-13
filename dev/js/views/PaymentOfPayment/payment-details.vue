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
                                    <option value="4">其他</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.orderNumber" placeholder="订单号">
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="dateS">
                                    <option value="5">今天</option>
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
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.certificate" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" placeholder="银行凭证号">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.keyword" placeholder="收款方、账户名、账号">
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
                                    <option value="2">额度采购</option>
                                    <option value="3">退税划付</option>
                                    <option value="4">预付款</option>
                                    <option value="5">供货商划付</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="备注">
                            </div>
                            <div class="form-group">
                                <input type="button" class="btn btn-info" @click="initList" value="查询">
                            </div>
                    </form>
                </div>
                <div  v-if="zdlists.length>0" class="datatable-scroll" v-cloak>
                    <table class="table main-table">
                        <thead>
                        <tr role="row">
                            <th></th>
                            <th>订单号</th>
                            <th>付款金额</th>
                            <th>付款账户</th>
                            <th>收款方</th>
                            <th>付款账户名</th>
                            <th>付款账号</th>
                            <th>收款账户名</th>
                            <th>收款账号 </th>
                            <th>银行凭证号</th>
                            <th>付款时间</th>
                            <th>用途</th>
                            <th>收款开户行</th>
                            <th>申请分公司</th>
                            <th>申请时间</th>
                            <th>状态</th>
                            <th>对账时间</th>
                            <th>备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-for="(index,n) in zdlists">
                            <tr role="row">
                                <td>
                                    <div v-if="n.status!=0" class="pull-left morebtn" @click="getInfo(n,index)">
                                        <ul class="icons-list pull-left" >
                                            <li><i class="glyphicon glyphicon-plus"></i></li>
                                        </ul>
                                    </div>
                                </td>
                                <td>
                                    {{n.orderNumber}}
                                </td>
                                <td>{{n.payoutAmount/100 | currency '' }}</td>
                                <td>
                                    <template v-if="n.payType==1">{{n.payoutAccount}}</template>
                                    <template v-else>{{n.payoutAccount}}</template>
                                </td>
                                <td>
                                    {{n.incomeAccount}}
                                </td>
                                <td>{{n.payoutAccountName}}</td>
                                <td>{{n.payoutAccountNumber}}</td>
                                <td>
                                    <span v-if="n.payType==1">{{n.incomeAccountName}}</span>
                                </td>
                                <td>
                                    <span v-if="n.payType==1">{{n.incomeAccountNumber}}</span>
                                </td>
                                <td>
                                    <template v-if="n.certificate!=''"><a v-link="{name:'provisions-info',params:{accountId:0,certificate:n.certificate}}">{{n.certificate}}</a></template>
                                </td>
                                <td>{{n.paymentTime | datetime}}</td>
                                <td>
                                    <template v-if="n.purpose==1"> 补贴划付</template>
                                    <template v-if="n.purpose==2"> 额度采购</template>
                                    <template v-if="n.purpose==3"> 退税划付</template>
                                    <template v-if="n.purpose==4"> 预付款</template>
                                    <template v-if="n.purpose==5"> 供货商划付</template>
                                </td>
                                <td>
                                    <span v-if="n.payType==1">{{n.incomeBankName}}</span>
                                </td>
                                <td>{{n.applyCompany}}</td>
                                <td>{{n.applyTime | datetime}}</td>
                                <td>
                                    <template v-if="n.status==1"> 等待审核</template>
                                    <template v-if="n.status==2"> 等待划付</template>
                                    <template v-if="n.status==3"> 转账中</template>
                                    <template v-if="n.status==4"> 等待对账</template>
                                    <template v-if="n.status==5"> 对账成功</template>
                                    <template v-if="n.status==6"> 划付失败</template>
                                    <template v-if="n.status==0"> 已关闭</template>
                                </td>
                                <td>{{n.successTime | datetime}}</td>
                                <td>{{n.remarks}}</td>
                            </tr>
                            <tr v-show="listinfos[index]!=null" class="div-table">
                                <td colspan="18">
                                    <div class="pull-left">
                                        <div class="title">
                                            <span>生成日期</span>
                                            <span>商户名称</span>
                                            <span>划付金额</span>
                                            <span>用途</span>
                                            <span>操作</span>
                                            <span>状态</span>
                                            <span>备注</span>
                                        </div>
                                        <div class="lists" v-for="trlist in listinfos[index]">
                                            <span>{{trlist.createAt | datetime}}</span>
                                            <span>{{trlist.merchantName}}</span>
                                            <span>{{trlist.amount/100 | currency '' }}</span>
                                            <span>{{trlist.purpose}}</span>
                                        <span>
                                             <template v-if="n.purpose==1"><a v-link="{name:'subsidy-appropriation',params:{subsidyPayID:trlist.id}}">详情</a></template>
                                             <template v-if="n.purpose==2"><a v-link="{name:'limit-purchase-detail',params:{id:trlist.id}}">详情</a></template>
                                             <template v-if="n.purpose==3"><a v-link="{name:'subsidy-tax-rebate',params:{subsidyTaxRebateID:trlist.id}}">详情</a></template>
                                             <template v-if="n.purpose==4"><a v-link="{name:'advance-payment-detail',params:{advanceId:trlist.id}}">详情</a></template>
                                             <template v-if="n.status==6&&n.purpose==1||n.status==6&&n.purpose==3"><a href="javascript:;" data-toggle="modal" data-target="#modal_waring" @click="delBtn(trlist.id,n.purpose)">删除</a></template>
                                        </span>
                                        <span>
                                            <template v-if="n.status==1"> 等待审核</template>
                                            <template v-if="n.status==2"> 等待划付</template>
                                            <template v-if="n.status==3"> 转账中</template>
                                            <template v-if="n.status==4"> 等待对账</template>
                                            <template v-if="n.status==5"> 对账成功</template>
                                            <template v-if="n.status==6"> 划付失败</template>
                                            <template v-if="n.status==0"> 已关闭</template>
                                        </span>
                                            <span>{{trlist.remarks}}</span>
                                        </div>
                                    </div>
                                    <div class="pull-left">
                                        <template v-if="n.status==2">
                                            <input data-toggle="modal" data-target="#modal_waring" type="button" @click="pay(n.id)" class="btn btn-gray" value="确认划付">
                                            <input data-toggle="modal" data-target="#modal_submit" type="button" @click="back(n.id)" class="btn btn-gray" value="退回重审">
                                        </template>
                                        <template v-if="n.status==4">
                                            <input data-toggle="modal" data-target="#modal_checking" type="button" @click="checking(n.id)" class="btn btn-gray" value="对账">
                                        </template>
                                        <template v-if="n.status==6">
                                            <input data-toggle="modal" data-target="#modal_waring" type="button" @click="update(n.id)" class="btn btn-gray" value="更新订单">
                                            <input  type="button" @click="applyTrue(n.id)" class="btn btn-gray" value="申请划付">
                                            <input data-toggle="modal" data-target="#modal_waring" type="button" @click="close(n.id)" class="btn btn-gray" value="关闭订单">
                                        </template>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        </tbody>
                    </table>
                </div>
                <page v-if="zdlists.length>0" :all="pageall"
                      :cur.sync="pagecur"
                      :page_size.sync="page_size">
                </page>
                <div style="padding: 30px;font-size: 16px;text-align: center" v-if="!zdlists.length>0" v-cloak>
                    未找到数据
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
                                <button  v-if="waring=='你确认划付该账单？'" type="button" @click="payTrue" class="btn btn-primary">确认</button>
                                <button  v-if="waring=='你确认关闭该账单？'" type="button" @click="closeTrue" class="btn btn-primary">确认</button>
                                <button  v-if="waring=='你确认删除该订单流水？'" type="button" @click="delTrue" class="btn btn-primary">确认</button>
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
                                        <td>{{n.collectionName}}</td>
                                        <td>{{n.accountName}}</br>{{n.accountNumber}}</td>
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
        padding-top: 20px;
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
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/PaymentOfPayment/payment_model'
    export default{
        data(){
            this.model =model(this)
            return{
                id:'',
                pagecur:1,
                page_size:10,
                pageall:1,
                dateS:'1',
                waring:'',
                subtitle:'',
                checkForm:{
                    payType: '1',
                    orderNumber: '',
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
                listinfos:[],
                zdlists:[],
                checkLists:[],
                remarks:'',
                delPurpose:'',
                fires:false
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
            },
            initList(){
                $(".modal").modal("hide");
                this.listinfos=[];
                this.getZlists(this.checkForm);
            },
            getInfo(a,index){
                if(sessionStorage.getItem('isHttpin')==1)return;
//                this.zdlists[index].listinfo = []
                if(this.listinfos[index] !='' && typeof(this.listinfos[index])!='undefined')return;
                this.model.getpart(a.id)
                        .then( (response)=> {
                            (response.data.code==0) ? this.listinfos.$set(index,response.data.data): null;
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
                this.waring = '你确认划付该账单？';
                this.accountId=a;
            },
            close(a){
                this.waring = '你确认关闭该账单？';
                this.accountId=a;
            },
            delBtn(a,b){
                this.waring = '你确认删除该订单流水？';
                this.accountId=a;
                this.delPurpose=b;
            },
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
            payTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.reservecash_allow(this.accountId)
                        .then( (response)=> {
                            if(response.data.code==0){
                                this.initList();
                                dialogs('success','划付成功！');
                            }
                        })
            },
            delTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                let data={
                    'id':this.accountId,
                    'purpose':this.delPurpose
                }
                this.model.reservecash_delete(data)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.initList();
                                dialogs('success','已删除！');
                            }
                        })
            },
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
                console.log(a);
            },
            getTime(){
                this.checkForm.startDate=init_date(this.dateS)[0];
                this.checkForm.endDate=init_date(this.dateS)[1];
            }
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
        components:{
            'datepicker': datepicker,
        },
        ready(){
            (this.$route.params.reserveCashOrderNumber==':reserveCashOrderNumber')?this.checkForm.orderNumber='' :this.checkForm.orderNumber=this.$route.params.reserveCashOrderNumber;
            (this.$route.params.payType==':payType')?this.checkForm.payType='1' :this.checkForm.payType=this.$route.params.payType;
            this.getTime();
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