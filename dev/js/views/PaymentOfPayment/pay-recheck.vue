<template>
    <index title="划付复核" ptitle="备付金支出"  isshow="isshow">
        <div class="content pay-recheck" slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" @click="batchsBtn" data-ksa="pay_recheck.pass">批量复核</a>
                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form"> 
                            <select class="form-control" v-model="checkForm.payType">
                                <option value="">全部付款方式</option>
                                <option value="1">备付金账户</option>
                                <option value="2">商户预付款账户</option>
                                <option value="3">银行结算</option>
                                <option value="4">其他</option>
                            </select>

                            <select class="form-control" v-model="checkForm.subCompanyID" @change="getCity(subCompanyID)">
                                <option value="">全部分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>

                            <select class="form-control" v-model="checkForm.purpose">
                                <option value="">全部用途</option>
                                <option value="1">补贴划付</option>
                                <option value="3">补贴退税</option>
                                <option value="10">税金提现</option>
                                <option value="4">预付款</option>
                                <option value="2">额度采购</option>
                            </select>

                            <select class="form-control" v-model="checkForm.status">
                                <option value="">全部状态</option>
                                <option value="7">等待复核</option>
                                <option value="9">复核通过</option>
                                <option value="8">复核不通过</option>
                            </select>

                            <select class="form-control" v-model="checkForm.timeRange">
                                <option value="5">今天</option>
                                <option value="0">昨天</option>
                                <option value="1">最近一周</option>
                                <option value="2">最近一个月</option>
                                <option value="3">最近三个月</option>
                                <option value="4">自定义时间</option>
                            </select>

                            <div v-show="checkForm.timeRange==4">
                                <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                                <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                            </div>

                            <input type="text" class="form-control" v-model="checkForm.id" placeholder="请输入ID" v-limitnumber="checkForm.id">

                            <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="请输入商户ID" v-limitnumber="checkForm.merchantOperationID">

                            <input type="text" class="form-control" v-model="checkForm.keywords"  placeholder="商户名/收款账户名/账号">

                            <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="请输入备注关键词">

                            <input type="text" class="form-control" placeholder="请输入活动ID" v-limitnumber="checkForm.activityOperationID" v-model="checkForm.activityOperationID">
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="query" data-ksa="pay_recheck.search">查询</a>
                    </div>
                </div>

                <div v-show="recheckLists.length>0" class="dataTables_wrapper">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" v-model="checkAll" @click="chooseAll"></th>
                                    <th>ID</th>
                                    <th>申请时间</th>
                                    <th>分公司</th>
                                    <th>城市</th>
                                    <th>付款账户</th>
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>活动ID</th>
                                    <th>活动名称</th>
                                    <th>收款账户信息</th>
                                    <th>付款方式</th>
                                    <th>用途</th>
                                    <th>三方应收</th>
                                    <th>划付金额</th>
                                    <th>暂扣税金</th>
                                    <th>合并类型</th>
                                    <th>复核状态</th>
                                    <th>操作</th>
                                    <th>备注</th>
                                    <th>不通过原因</th>
                                </tr>
                            </thead>
                            <tr v-for="(index,n) in recheckLists" v-bind:class="{'odd':(index%2==0)}">
                                <td><input v-if="n.status==7" type="checkbox" @click="checked(n.ischeck,n.id)" v-model="n.ischeck"/></td>
                                <td>{{n.id }}</td>
                                <td>{{n.createTime | datetime}}</td>
                                <td>{{n.subCompanyName}}</td>
                                <td>{{n.cityName }}</td>
                                <td>{{n.payAccount }}</td>
                                <td>{{n.merchantOperationID }}</td>
                                <td>{{n.merchantName }}</td>
                                <td>{{n.activityOperationID}}</td>
                                <td>{{n.activityName}}</td>
                                <td>{{n.collectionBankName }}<br>
                                    {{n.collectionBankNumber}}
                                </td>
                                <td>
                                    <template v-if="n.payType==1">备付金账户</template>
                                    <template v-if="n.payType==2">预付款账户</template>
                                    <template v-if="n.payType==3">银行结算</template>
                                </td>
                                <td>
                                    <template v-if="n.purpose==1">补贴划付</template>
                                    <template v-if="n.purpose==2">额度采购</template>
                                    <template v-if="n.purpose==3">退税划付</template>
                                    <template v-if="n.purpose==4">预付款</template>
                                    <template v-if="n.purpose==5">供货商划付</template>
                                    <template v-if="n.purpose==10">税金提现</template>
                                </td>
                                <td>{{n.thirdPartySubsidyShould/100 | currency ''}}</td>
                                <td>{{n.payAmount/100 | currency ''}}</td>
                                <td>{{n.suspensionTaxAmount/100 | currency ''}}</td>
                                <td>
                                    <template v-if="n.mergePay">是</template>
                                    <template v-else>否</template>
                                </td>
                                <td>
                                    <template v-if="n.status==7">等待复核</template>
                                    <template v-if="n.status==8">复核不通过</template>
                                    <template v-if="n.status==9">复核通过</template>
                                </td>
                                <td>
                                    <a v-if="n.status==7" @click="pass(n.id)" data-ksa="pay_recheck.pass">通过</a>
                                    <a v-if="n.status==7" @click="back(n.id)" data-ksa="pay_recheck.back">退回</a>
                                    <a @click="checkPaydetail(n)" data-ksa="pay_recheck.search">详情</a>
                                    <a v-if="n.status==9" @click="gopayment(n.reserveCashOrderID)" data-ksa="reserve_cash_order_manage.search">查看</a>
                                </td>
                                <td>{{n.remarks}}</td>
                                <td>{{n.refuseReason}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="no-list" v-show="!recheckLists.length>0" v-cloak></div>

                <div class="datatable-bottom">
                   <div class="left">
                        <a class="icon-file-excel" style="line-height: 30px;" v-on:click="payRecheckexcel" data-ksa="pay_recheck.export">Excel导出</a>
                   </div>

                   <div class="right">
                        <page v-show="recheckLists.length>0" :all="pageall"
                              :cur.sync="checkForm.pageIndex"
                              :page_size.sync="checkForm.pageSize">
                        </page>
                   </div>
                </div>

                <div class="nums">
                    <table cellspacing="0" cellpadding="0" border="1px solid #000;">
                        <tr>
                            <td >
                                <span>合计： </span>
                            </td>
                            <td>
                                <span>{{total.thirdPartySubsidyShould/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>{{total.payAmount/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>{{total.suspensionTaxAmount/100 | currency ''}}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <content-dialog
                    :show.sync="show" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="dtitle" @kok="backPass" @kcancel="show = false"
            >
                <div class="form-group dcontent" v-show="dtitle=='退回'">
                    <label class="col-lg-3 control-label"><i>*</i>退回原因：</label>
                    <div class="col-lg-9">
                        <textarea rows="5" cols="5" class="form-control" v-bind:class="{ 'error': !remarks&&fires}" v-model="remarks" placeholder=""></textarea>
                        <span v-show="!remarks&&fires" class="validation-error-label">
                            请填写退回原因
                        </span>
                    </div>
                </div>
            </content-dialog>
            <content-dialog
                    :show.sync="detailshow" :is-button="false" :type.sync="'infos'"
                    :title.sync="'详情'"
            >
                <div class="form-group dcontent">
                    <table class="table main-table">
                        <thead>
                        <tr role="row">
                            <th>生成日期</th>
                            <th>划付金额</th>
                            <th  v-if="listinfos!=''&&(listinfos[0].purpose==1||listinfos[0].purpose==3)">暂扣税金</th>
                            <th>用途</th>
                            <th>操作</th>
                            <th>状态</th>
                            <th>备注</th>
                        </tr>
                        </thead>
                        <tr v-if="listinfos!=''" class="div-table" v-for="trlist in listinfos">
                            <td>{{trlist.createTime | datetimes}}</td>
                            <td>{{trlist.payAmount/100 | currency '' }}</td>
                            <td  v-if="trlist.purpose==1||trlist.purpose==3">{{trlist.suspensionTaxAmount/100 | currency '' }}</td>
                            <td>
                                <template v-if="trlist.purpose==1">补贴划付</template>
                                <template v-if="trlist.purpose==2">额度采购</template>
                                <template v-if="trlist.purpose==3">退税划付</template>
                                <template v-if="trlist.purpose==4">预付款</template>
                                <template v-if="trlist.purpose==5">供货商划付</template>
                                <template v-if="trlist.purpose==10">税金提现</template>
                            </td>
                            <td>
                                <template v-if="trlist.purpose==1"><a data-ksa="subsidy_pay_detail_manage.search" v-link="{name:'subsidy-appropriation',params:{subsidyPayID:trlist.id}}">详情</a></template>
                                <template v-if="trlist.purpose==2"><a data-ksa="limit_purchase_account_manage.search" v-link="{name:'limit-purchase-detail',params:{id:trlist.id}}">详情</a></template>
                                <template v-if="trlist.purpose==3"><a data-ksa="subsidy_tax_rebate_detail_manage.search" v-link="{name:'subsidy-tax-rebate',params:{subsidyTaxRebateID:trlist.id}}">详情</a></template>
                                <template v-if="trlist.purpose==4"><a data-ksa="advance_payment_detail_manage.search" v-link="{name:'advance-payment-detail',params:{advanceId:trlist.id}}">详情</a></template>
                                <template v-if="trlist.purpose==10"><a @click="skipToSubsidyAccount(trlist.id)" data-ksa="suspension_tax_account_detail_manage.search">详情</a></template>
                            </td>
                            <td>
                                <template v-if="trlist.status==1"> 等待审核</template>
                                <template v-if="trlist.status==2"> 等待划付</template>
                                <template v-if="trlist.status==3"> 转账中</template>
                                <template v-if="trlist.status==4"> 等待对账</template>
                                <template v-if="trlist.status==5"> 对账成功</template>
                                <template v-if="trlist.status==6"> 划付失败</template>
                                <template v-if="trlist.status==7">等待复核</template>
                                <template v-if="trlist.status==8">复核不通过</template>
                                <template v-if="trlist.status==9">复核通过</template>
                                <template v-if="trlist.status==0"> 已关闭</template>
                            </td>
                            <td>{{trlist.remarks}}</td>
                        </tr>
                    </table>
                    <div class="no-list"  v-if="!listinfos.length" v-cloak>
                        未找到数据
                    </div>
                </div>
            </content-dialog>
        </div>
    </index>
</template>
<script>
    import model from '../../ajax/PaymentOfPayment/payrecheck_model'

    export default {
        data(){
            this.model =model(this)
            return {
                show:false,
                detailshow:false,
                checkForm:{
                    payType:'',
                    subCompanyID:'',
                    purpose:'',
                    status:'',
                    timeRange:'3',
                    startDate:'',
                    endDate:'',
                    id:'',
                    merchantOperationID:'',
                    keywords:'',
                    remarks:'',
                    pageIndex:1,
                    pageSize:10,
                    activityOperationID:''
                },
                pageall:1,
                total:{
                    thirdPartySubsidyShould:0,
                    payAmount:0,
                    suspensionTaxAmount:0
                },
                recheckLists:[],
                subcompanyList:[],
                listinfos:[],
                checkedIds:[],
                id:'',
                dtitle:'',
                remarks:'',
                fires:false
            }
        },
        methods:{
            getLists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.payrecheck_list(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('recheckLists', response.data.data)
                                this.$set('pageall', response.data.total)
                            }
                        });
                this.model.payrecheck_total(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
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
            query(){
                this.show=false;
                this.checkedIds=[];
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getLists(this.checkForm);
            },
            payRecheckexcel(){
                if(!this.recheckLists.length>0)return;
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.payrecheckexcel+ $.param(this.checkForm));
            },
            chooseAll(){
                this.checkedIds=[];
                let cloneData=_.cloneDeep(this.recheckLists);
                cloneData.map((value)=>{
                    if(this.checkAll){
                        value.ischeck=false;
                    }else{
                        if(value.status==7){
                            this.checkedIds.push(value.id);
                            value.ischeck=true;
                        }
                    }
                })
                this.recheckLists=cloneData;
            },
            checked(bool,_id){
                if(!bool){
                    this.checkedIds.push(_id);
                }else{
                    _.remove(this.checkedIds, function(n) {
                        return n==_id;
                    })
                }
            },
            getTime(){
                this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
            },
            back(a){
                this.id=a;
                this.dtitle='退回';
                this.show=true;
                this.fires=false;
                this.remarks='';
            },
            pass(a){
                this.id=a;
                this.dtitle='确认通过';
                this.show=true;
            },
            batchsBtn(){
                if(!this.checkedIds.length){
                    dialogs('info','未勾选复核信息！');
                    return;
                }
                this.dtitle='你确定批量复核？';
                this.show=true;
            },
            checkPaydetail({id,purpose}){
                let data={
                    'id':id,
                    'purpose':purpose
                }
                this.model.skipToPayRecheck(data)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.$set('listinfos',response.data.data);
                                this.detailshow=true;
                            }
                        })
            },
            gopayment(a){
                this.$common_model.skipToOrderById(a)
                        .then((response)=>{
                    if(response.data.code==0){
                        this.$router.go({name:'payment-details',params:{reserveCashOrderNumber:response.data.data.orderId,payType:response.data.data.payType}});
                    }

                })
            },
            skipToSubsidyAccount(a){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.skipToSubsidyAccount(a)
                        .then( (response)=> {
                            if(response.data.code==0&&!!response.data.data){
                                let trlist=response.data.data;
                                this.$router.go({name:'suspension-tax',params:{orderId:trlist.reserveCashOrder.orderId,suspensionHDid:trlist.subsidyAccount.id,suspensionBTid:trlist.reserveCashOrder.merchantId,suspensionZHname:trlist.activity.name,suspensionSHid:trlist.merchant.merchantID,suspensionZHbalance:trlist.subsidyAccount.suspensionTaxAmount,suspensionSHname:trlist.merchant.name}});
                            }
                        })
            },
            backPass(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.dtitle=='退回'){
                    if(this.remarks==''){
                        this.fires=true;
                        return;
                    }
                    let data={
                        'id':this.id,
                        'refuseReason':this.remarks
                    }
                    this.model.payrecheck_back(data)
                            .then( (response)=> {
                                if(response.data.code==0){
                                    this.query();
                                    dialogs('success','已退回！');
                                }
                            })
                }
                else if(this.dtitle=='你确定批量复核？'){
                    this.batchs(false);
                }
                else{
                    this.batchs(true);
                }
            },
            batchs(bool){
                let data;
                if(bool){
                    data={
                        'ids':[this.id]
                    }
                }else{
                    data={
                        'ids':this.checkedIds
                    }
                }
                this.model.payrecheck_pass(data)
                        .then( (response)=> {
                            if(response.data.code==0){
                                this.query();
                                dialogs('success','已通过！');
                            }
                        })
            }
        },
        computed:{
            checkAll(){
                let clength=0;
                this.recheckLists.map((value)=>{
                    (!value.ischeck&&value.status==7)?clength++:null;
                })
                return !clength
            }
        },
        ready(){
            (this.$route.params.recheckId==':recheckId')?this.checkForm.id='':this.checkForm.id=this.$route.params.recheckId;
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.getTime();
            this.getSubcompany();
            this.query();
        },
        watch:{
            'checkForm.pageSize+checkForm.pageIndex'(){
                this.query();
            },
            'checkForm.timeRange'(){
                this.getTime();
            }
        }
    }
</script>
