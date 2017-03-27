<template>
    <index :title="'备付金付款明细'"
           :ptitle="'备付金支出'"
           :hname="'payment-details'"
           :isshow="'isshow'">
        <div class="content payment-details" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li class="active" data-ksa="reserve_cash_detail_manage"><a v-link="{name:'payment-details'}">付款明细</a></li>
                    <li data-ksa="pay_recheck"><a v-link="{name:'pay-recheck'}">划付复核</a></li>
                    <li data-ksa="subsidy_pay_detail_manage"><a v-link="{name:'subsidy-appropriation'}">补贴划付</a></li>
                    <!--<li class="active"><a v-link="{name:'limit-purchase-detail'}" data-ksa="advance_payment_account_manage">额度采购</a></li>-->
                    <li data-ksa="subsidy_tax_rebate_detail_manage"><a v-link="{name:'subsidy-tax-rebate'}">补贴退税</a></li>
                    <li data-ksa="subsidy_account_manage"><a v-link="{name:'subsidy-management'}">税金管理</a></li>
                    <li data-ksa="advance_payment_detail_manage"><a v-link="{name:'advance-payment-detail'}">预付款划付</a></li>
                    <li data-ksa="provider_pay_detail"><a v-link="{name:'provider-pay-detail'}">供应商划付</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" @click="batchs()" data-ksa="reserve_cash_order_manage.pay">一键划付</a>
                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="checkForm.payType">
                                <option value="1">备付金账户</option>
                                <option value="2">商户预付款账户</option>
                                <option value="3">银行结算</option>
                                <option value="4">其他</option>
                                <option value="5">网银转账</option>
                            </select>

                            <select class="form-control" v-model="checkForm.subCompanyID">
                                <option value="">全部分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>

                            <input type="text" class="form-control" v-model="checkForm.orderNumber" placeholder="订单号" v-limitnumber="checkForm.orderNumber">

                            <select class="form-control" v-model="checkForm.dateS" @change="getTime">
                                <option value="5">今天</option>
                                <option value="0">昨天</option>
                                <option value="1">最近一周</option>
                                <option value="2">最近一个月</option>
                                <option value="3">最近三个月</option>
                                <option value="4">自定义时间</option>
                            </select>

                            <div v-show="checkForm.dateS==4"  class="inline">
                                <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                                <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                            </div>

                            <input type="text" class="form-control" v-model="checkForm.merchantOperationID" v-limitnumber="checkForm.merchantOperationID" placeholder="商户ID">

                            <input type="text" class="form-control" v-model="checkForm.keyword" placeholder="商户名、账户名、账号">

                            <select class="form-control" v-model="checkForm.status">
                                <option value="">请选择对账状态</option>
                                <option value="2">等待划付</option>
                                <option value="3">转账中</option>
                                <option value="4">等待对账</option>
                                <option value="5">对账成功</option>
                                <option value="6">划付失败</option>
                                <option value="0">已关闭</option>
                            </select>

                            <select class="form-control" v-model="checkForm.purpose">
                                <option value="">请选择用途</option>
                                <option value="1">补贴划付</option>
                                <!--<option value="2">额度采购</option>-->
                                <option value="3">退税划付</option>
                                <option value="4">预付款</option>
                                <option value="5">供货商划付</option>
                                <option value="10">税金提现</option>
                                <option value="11">供应商划付</option>
                            </select>

                            <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="备注">
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="checkNew" data-ksa="reserve_cash_order_manage.search">查询</a>
                    </div>
                </div>

                <div v-show="!!zdlists.length" class="dataTables_wrapper no-footer" v-cloak>
                    <div class="datatable-scroll">
                        <table class="table main-table">
                        <thead>
                            <tr role="row">
                                <th><input type="checkbox"  v-model="checkAll" @click="chooseAll"></th>
                                <th>订单号</th>
                                <th>商户ID</th>
                                <th>商户名称</th>
                                <th>划付金额</th>
                                <th>暂扣税金</th>
                                <th>付款账户</th>
                                <th>用途</th>
                                <th>状态</th>
                                <th>操作 </th>
                                <th>备注</th>
                                <th>银行流水</th>
                                <th>收款账户名</th>
                                <th>收款账号</th>
                                <th>收款开户行</th>
                                <th>提入行号</th>
                                <th>是否建行</th>
                                <th>申请时间</th>
                                <th>划付时间</th>
                                <th>对账时间</th>
                                <th>失败原因</th>
                            </tr>
                        </thead>
                        <tbody>
                        <template v-for="(index,n) in zdlists">
                            <tr role="row" v-bind:class="{'odd':(index%2==0)}">
                                <td>
                                    <template v-if="n.status==2"><input type="checkbox"  @click="checked(n.ischeck,n.id)" v-model="n.ischeck"></template>
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
                                    <template v-if="n.purpose==11">供应商划付</template>
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
                                    <template v-if="n.status!=0">
                                        <a @click="getInfo(n)" data-ksa="reserve_cash_order_manage.detail">详情</a>
                                    </template>
                                    <template v-if="n.status==2">
                                        <a @click="pay(n.id)" data-ksa="reserve_cash_order_manage.pay">确认划付</a>
                                        <a @click="back(n.id)" data-ksa="reserve_cash_order_manage.retrial">退回重审</a>
                                    </template>
                                    <template v-if="n.status==4">
                                        <a @click="checking(n.id)" data-ksa="reserve_cash_order_manage.check">对账</a>
                                    </template>
                                    <template v-if="n.status==6">
                                        <a @click="update(n.id)" data-ksa="reserve_cash_order_manage.update">更新订单</a>
                                        <a @click="applyTrue(n.id)" data-ksa="reserve_cash_order_manage.apply_pay">申请划付</a>
                                        <a @click="close(n.id)" data-ksa="reserve_cash_order_manage.close">关闭订单</a>
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
                                <td>
                                    <span v-if="n.ccb"></span>
                                    <span v-else> {{n.incomeBankNumber }}</span>
                                </td>
                                <td>
                                    <span v-if="n.ccb">是</span>
                                    <span v-else>否</span>
                                </td>
                                <td>{{n.applyTime | datetime}}</td>
                                <td>{{n.paymentTime  | datetime}}</td>
                                <td>{{n.successTime | datetime}}</td>
                                <td>{{n.refuseReason }}</td>
                            </tr>
                        </template>
                        <tr>
                            <td>合计：</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{total.payoutAmount/100 | currency ''}}</td>
                            <td>{{total.suspensionTaxAmount/100 | currency ''}}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">
                       <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" @click="payDetailexcel" data-ksa="reserve_cash_order_manage.export">Excel导出</a>
                       </div>

                       <div class="right">
                            <page v-if="zdlists.length>0" :all="pageall"
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                       </div>
                    </div>
                </div>

                <div class="no-list" v-if="!zdlists.length>0">
                    未找到数据
                </div>
            </div>

            <content-dialog
                    :show.sync="list_info" :is-button="false" :type.sync="'infos'"
                    :title.sync="'详情'"
                    >
                    <div class="modal-body">
                        <table class="table main-table">
                            <thead>
                                <tr role="row">
                                    <th>生成日期</th>
                                    <th>
                                        <span v-if="listinfos!=''&&listinfos[0].purpose=='3'">退税金额</span>
                                        <span v-else>划付金额</span>
                                    </th>
                                    <th  v-if="listinfos!=''&&listinfos[0].purpose=='1'&&!listinfos[0].providerPayDetail">暂扣税金</th>
                                    <th>用途</th>
                                    <th>操作</th>
                                    <th>状态</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tr v-show="listinfos!=''&&listinfos!=null" class="div-table" v-for="trlist in listinfos">
                                <td v-if = "!!trlist.applyTime">{{trlist.applyTime | datetimes}}</td>
                                <td v-if = "!!trlist.createTime">{{trlist.createTime | datetimes}}</td>
                                <td v-if = "!!trlist.createDate">{{trlist.createDate | datetimes}}</td>
                                <td>
                                    <span v-if="listinfos[0].purpose=='3'">{{trlist.suspensionTaxAmount/100 | currency '' }}</span>
                                    <span v-else>{{trlist.payAmount/100 | currency '' }}</span>
                                </td>
                                <td  v-if="trlist.purpose=='1'&&!listinfos[0].providerPayDetail">{{trlist.suspensionTaxAmount/100 | currency '' }}</td>
                                <td v-if="!trlist.providerPayDetail">
                                    <template v-if="trlist.purpose==1"> 补贴划付</template>
                                    <template v-if="trlist.purpose==2"> 额度采购</template>
                                    <template v-if="trlist.purpose==3"> 退税划付</template>
                                    <template v-if="trlist.purpose==4"> 预付款</template>
                                    <template v-if="trlist.purpose==5"> 供货商划付</template>
                                    <template v-if="trlist.purpose==10">税金提现</template>
                                </td>
                                <td v-else>
                                    <template v-if="trlist.purpose==0"> 其他</template>
                                    <template v-if="trlist.purpose==1"> 广告费</template>
                                    <template v-if="trlist.purpose==2"> 物料费</template>
                                </td>
                                <td>
                                    <template v-if="!trlist.providerPayDetail&&trlist.purpose=='1'"><a data-ksa="subsidy_pay_detail_manage.search" v-link="{name:'subsidy-appropriation',params:{subsidyPayID:trlist.streamID}}">详情</a></template>
                                    <template v-if="!trlist.providerPayDetail&&trlist.purpose=='2'"><a data-ksa="limit_purchase_account_manage.search" v-link="{name:'limit-purchase-detail',params:{id:trlist.streamID}}">详情</a></template>
                                    <template v-if="!trlist.providerPayDetail&&trlist.purpose=='3'"><a data-ksa="subsidy_tax_rebate_detail_manage.search" v-link="{name:'subsidy-tax-rebate',params:{subsidyTaxRebateID:trlist.streamID}}">详情</a></template>
                                    <template v-if="!trlist.providerPayDetail&&trlist.purpose=='4'"><a data-ksa="advance_payment_detail_manage.search" v-link="{name:'advance-payment-detail',params:{advanceId:trlist.streamID}}">详情</a></template>
                                    <template v-if="!trlist.providerPayDetail&&trlist.purpose=='10'"><a @click="skipToSubsidyAccount(trlist.streamID)" data-ksa="suspension_tax_account_detail_manage.search">详情</a></template>
                                    <template v-if="trlist.providerPayDetail"><a @click="skipToProviderPayDetail(trlist.id)" data-ksa="provider_pay_detail.search">详情</a></template>
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
                            <tr class="no-list" v-if="!listinfos.length" v-cloak>
                                <td>未找到数据</td>
                            </tr>
                        </table>
                    </div>
            </content-dialog>

            <content-dialog
                    :show.sync="modal_waring" :is-button="false" :type.sync="'infos'"
                    :title.sync="waring"
                    >
                    <div class="modal-body">
                        <div class="form-group tc">
                            <button  v-if="waring=='你确认更新账单？'" type="button" @click="updateTrue" class="btn btn-primary">确认</button>
                            <button  v-if="waring=='你确认划付账单？'" type="button" @click="payTrue" class="btn btn-primary">确认</button>
                            <button  v-if="waring=='你确认一键划付？'" type="button" @click="batchPay" class="btn btn-primary">确认</button>
                            <button  v-if="waring=='你确认关闭该账单？'" type="button" @click="closeTrue" class="btn btn-primary">确认</button>
                            <!--<button  v-if="waring=='你确认删除该订单流水？'" type="button" @click="delTrue" class="btn btn-primary">确认</button>-->
                            <button type="button" class="btn btn-gray" @click="modal_waring=false">取消</button>
                        </div>
                    </div>
            </content-dialog>


            <content-dialog
                    :show.sync="modal_submit" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="'退回重审'" @kok="backTrue" @kcancel="modal_submit = false"
                    >
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="col-lg-3 control-label" v-if="subtitle=='退回重审'"><i>*</i>退回原因</label>
                            <div class="col-lg-9">
                                <textarea rows="5" cols="5" class="form-control" v-model="remarks" placeholder=""></textarea>
                            </div>
                        </div>
                        <div class="form-group tc">
                            <span v-show="!remarks&&fires" class="validation-error-label">
                                <template v-if="subtitle=='退回重审'">请填写退回原因</template>
                            </span>
                        </div>
                    </div>
            </content-dialog>

            <content-dialog
                    :show.sync="modal_checking" :is-button="false" :type.sync="'infos'"
                    :title.sync="'对账'"
                    >
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
            </content-dialog>
        </div>
    </index>
</template>

<script>
    import model from '../../ajax/PaymentOfPayment/payment_model'
    export default{
        data(){
            this.model =model(this)
            return{
                modal_submit: false,
                list_info: false,
                modal_waring: false,
                modal_checking: false,
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
                    dateS:'4',
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
        computed:{
            checkAll(){
                let clength=0;
                this.zdlists.map((value)=>{
                    (!value.ischeck&&value.status==2)?clength++:null;
                })
                return !clength
            }
        },
        methods:{
            chooseAll(){
                this.orderIDs=[];
                let cloneData=_.cloneDeep(this.zdlists);
                cloneData.map((value)=>{
                    if(this.checkAll){
                        value.ischeck=false;
                    }else{
                        if(value.status==2){
                            this.orderIDs.push(value.id);
                            value.ischeck=true;
                        }
                    }
                })
                this.zdlists=cloneData;
            },
            checked(bool,_id){
                if(!bool){
                    this.orderIDs.push(_id);
                }else{
                    _.remove(this.orderIDs, function(n) {
                        return n==_id;
                    })
                }
            },
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
            checkNew(){
                this.checkForm.pageIndex=1;
                this.initList();
            },
            initList(){
                this.modal_waring = false;
                this.modal_submit= false;
                this.list_info= false;
                this.modal_checking=false;
                this.orderIDs=[];
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
                switch(a.purpose){
                    case 1:
                        this.model.getpart1(a.id)
                                .then( (response)=> {
                                    if(response.data.code==0) {
                                        this.$set('listinfos',response.data.data);
                                        this.list_info = true;
                                    }
                                });
                        break;
                    case 3:
                        this.model.getpart3(a.id)
                                .then( (response)=> {
                                    if(response.data.code==0) {
                                        this.$set('listinfos',response.data.data);
                                        this.list_info = true;
                                    }
                                });
                        break;
                    case 4:
                        this.model.getpart4(a.id)
                                .then( (response)=> {
                                    if(response.data.code==0) {
                                        this.$set('listinfos',response.data.data);
                                        this.list_info = true;
                                    }
                                });
                        break;
                    case 10:
                        this.model.getpart10(a.id)
                                .then( (response)=> {
                                    if(response.data.code==0) {
                                        this.$set('listinfos',response.data.data);
                                        this.list_info = true;
                                    }
                                });
                        break;
                    case 11:
                    this.model.getpart11(a.id)
                            .then( (response)=> {
                                if(response.data.code==0) {
                                    this.$set('listinfos',response.data.data);
                                    _.map(this.listinfos, (value) => {
                                        value.providerPayDetail = true;
                                    })
                                    this.list_info = true;
                                }
                            });
                    break;
                }
            },
            back(a){
                this.subtitle = '退回重审';
                this.remarks='';
                this.fires=false;
                this.accountId=a;
                this.modal_submit = true;
            },
            update(a){
                this.waring = '你确认更新账单？';
                this.accountId=a;
                this.modal_waring= true;
            },
            pay(a){
                this.waring = '你确认划付账单？';
                this.accountId=a;
                this.modal_waring = true;
            },
            payTrue(){
                this.orderIDs=[];
                this.orderIDs.push(this.accountId);
                this.model.reservecash_batchPay(JSON.stringify(this.orderIDs))
                        .then( (response)=> {
                            if(response.data.code==0){
                                    this.initList();
                                    dialogs('success','划付成功！');
                                    this.modal_waring = false;
                                }
                            })
            },
            batchs(){
                if(this.orderIDs==''){
                    dialogs('info','请勾选划付信息！');
                    this.modal_waring = false;
                    return;
                }
                this.waring = '你确认一键划付？';
                this.modal_waring = true;
            },
            close(a){
                this.waring = '你确认关闭该账单？';
                this.accountId=a;
                this.modal_waring = true;
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
                                this.modal_checking = true;
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
                            this.modal_waring = false;
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
                                    this.modal_submit = false;
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
            batchPay(){
                this.model.reservecash_batchPay(JSON.stringify(this.orderIDs))
                        .then( (response)=> {
                                if(response.data.code==0){
                                     this.modal_waring = false;
                                    dialogs('success','划付成功！');
                                }
                                this.orderIDs=[];
                                this.initList();
                        })
            },
            skipToSubsidyAccount(_id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.skipToSubsidyAccount(_id)
                        .then( (response)=> {
                            if(response.data.code==0&&!!response.data.data){
                                let trlist=response.data.data;
                                this.$router.go({name:'suspension-tax',params:{orderId:trlist.reserveCashOrder.orderId,suspensionHDid:trlist.subsidyAccount.id,suspensionBTid:trlist.reserveCashOrder.merchantId,suspensionZHname:trlist.activity.name,suspensionSHid:trlist.merchant.merchantID,suspensionZHbalance:trlist.subsidyAccount.suspensionTaxAmount,suspensionSHname:trlist.merchant.name}});
                            }
                        })
            },
            skipToProviderPayDetail(_id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.skipToProviderPayDetail(_id)
                    .then((response) => {
                        this.$router.go({name:'provider-pay-detail', params:{providerID:_id}});
                    })
            }
        },
        watch:{
            'checkForm.pageSize+checkForm.pageIndex'(){
                this.initList();
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
</script>