<template>
    <index :title="'供应商划付'"
           :ptitle="'备付金支出'"
           :hname="'provider-pay-detail'"
           :isshow="'isshow'">
        <div class="content provider-pay-detail" slot="content">
        <div class="panel panel-flat">
            <ul class="tab-bor">
                <li data-ksa="reserve_cash_detail_manage"><a v-link="{name:'payment-details'}">付款明细</a></li>
                <li data-ksa="pay_recheck"><a v-link="{name:'pay-recheck'}">划付复核</a></li>
                <li data-ksa="subsidy_pay_detail_manage"><a v-link="{name:'subsidy-appropriation'}">补贴划付</a></li>
                <!--<li class="active"><a v-link="{name:'limit-purchase-detail'}" data-ksa="advance_payment_account_manage">额度采购</a></li>-->
                <li data-ksa="subsidy_tax_rebate_detail_manage"><a v-link="{name:'subsidy-tax-rebate'}">补贴退税</a></li>
                <li data-ksa="subsidy_account_manage"><a v-link="{name:'subsidy-management'}">税金管理</a></li>
                <li data-ksa="advance_payment_detail_manage"><a v-link="{name:'advance-payment-detail'}">预付款划付</a></li>
                <li class="active" data-ksa="provider_pay_detail"><a v-link="{name:'provider-pay-detail'}">供应商划付</a></li>
            </ul>
            <div class="heading">
                <div class="heading-left">
                    <a class="btn btn-add" @click="addUser" data-ksa="provider_pay_detail.add">新增划付</a>
                </div>
                <div class="heading-right">
                    <select class="form-control" v-model="defaultData.ifBankActivityPay">
                        <option value="">请选择划付类型</option>
                        <option :value="1">银行活动划付</option>
                        <option :value="0">非银行活动划付</option>
                    </select>
                    <select class="form-control" v-model="defaultData.payType">
                        <option value="">请选择付款方式</option>
                        <option :value="5">网银转账</option>
                        <option :value="1">备付金</option>
                    </select>
                    <select class="form-control" v-model="defaultData.subCompanyID">
                        <option value="">请选择付款账户</option>
                        <option v-for="(index,n) in companylists" :value="n.subCompanyID">{{n.name}}备付金</option>
                    </select>
                    <select class="form-control" v-model="dateS" @change="getTime">
                        <option value="5">今天</option>
                        <option value="0">昨天</option>
                        <option value="1">最近一周</option>
                        <option value="2">最近一个月</option>
                        <option value="3">最近三个月</option>
                        <option value="4">自定义时间</option>
                    </select>
                    <div v-show="dateS==4" class="inline">
                        <datepicker :value.sync="defaultData.startDate"></datepicker>
                        <span>至</span>
                        <datepicker :value.sync="defaultData.endDate"></datepicker>
                    </div>
                    <input type="text" class="form-control" v-model="defaultData.accountNumber" placeholder="请输入活动ID" v-limitnumber="defaultData.activityID">
                    <select class="form-control" v-model="defaultData.modelstatus" @change="getStatus(defaultData.modelstatus)">
                        <option value="">全部状态</option>
                        <option value="1,s">未提交</option>
                        <option value="2,s">等待审核</option>
                        <option value="4,s">审核不通过</option>
                        <option value="2,o">等待划付</option>
                        <option value="3,o">转账中</option>
                        <option value="4,o">等待对账</option>
                        <option value="5,o">对账成功</option>
                    </select>
                    <a class="btn btn-info" @click="checkNew" data-ksa="provider_pay_detail.search">查询</a>
                </div>
            </div>

            <div  v-show="!!zdlists.length"  class="dataTables_wrapper no-footer">
                <div class="datatable-scroll">
                    <table class="table">
                        <thead>
                            <tr role="row">
                                <th>ID</th>
                                <th>划付类型</th>
                                <th>付款方式</th>
                                <th>申请时间</th>
                                <th>结算三方</th>
                                <th>付款账户</th>
                                <th>活动ID</th>
                                <th>账户名</th>
                                <th>收款账号</th>
                                <th>开户行</th>
                                <th>提入行号</th>
                                <th>是否建行</th>
                                <th>金额</th>
                                <th>用途</th>
                                <th>状态</th>
                                <th>操作</th>
                                <th>数据流转</th>
                                <th>备注</th>
                                <th>不通过原因</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.id}}</td>
                                <td>
                                    <template v-if="trlist.ifBankActivityPay==1">银行活动划付</template>
                                    <template v-if="trlist.ifBankActivityPay==0">非银行活动划付</template>
                                </td>
                                <td>
                                    <template v-if="trlist.payType==5">网银转账</template>
                                    <template v-if="trlist.payType==1">备付金</template>
                                </td>
                                <td>{{trlist.applyTime | datetime}}</td>
                                <td>{{trlist.thirdPartyAccountName}}</td>
                                <td>{{trlist.payAccount}}</td>
                                <td>{{trlist.activityID}}</td>
                                <td>{{trlist.collectionAccountName}}</td>
                                <td>{{trlist.collectionAccountNumber}}</td>
                                <td>{{trlist.collectionBankName}}</td>
                                <td>{{trlist.collectionBankNumber}}</td>
                                <td>
                                    <template v-if="trlist.ccb==0">否</template>
                                    <template v-if="trlist.ccb==1">是</template>
                                </td>
                                <td>{{trlist.payAmount | currency ''}}</td>
                                <td>
                                    <template v-if="trlist.purpose==0">其它</template>
                                    <template v-if="trlist.purpose==1">广告费</template>
                                    <template v-if="trlist.purpose==2">物料费</template>
                                </td>
                                <td>
                                    <template v-if="trlist.status==3">
                                        <template v-if="trlist.orderStatus==1">等待审核</template>
                                        <template v-if="trlist.orderStatus==2">等待划付</template>
                                        <template v-if="trlist.orderStatus==3">转账中</template>
                                        <template v-if="trlist.orderStatus==4">等待对账</template>
                                        <template v-if="trlist.orderStatus==5">对账成功</template>
                                    </template>
                                    <template v-if="trlist.status==1">未提交</template>
                                    <template v-if="trlist.status==2">等待审核</template>
                                    <template v-if="trlist.status==4">审核不通过</template>
                                </td>
                                <td>
                                    <template v-if="trlist.status==1||trlist.status==4">
                                        <a data-ksa="provider_pay_detail.edit" @click="rewrite(trlist)">编辑</a>
                                        <a data-ksa="provider_pay_detail.apply" @click="submit(trlist.id)">提交</a>
                                        <a data-ksa="provider_pay_detail.delete" @click="deleteList(trlist.id)">删除</a>
                                    </template>
                                    <template v-if="trlist.status==2">
                                        <a data-ksa="provider_pay_detail.approve" @click="pass(trlist.id)">通过</a>
                                        <a data-ksa="provider_pay_detail.refuse" @click="back(trlist.id)">退回</a>
                                    </template>
                                </td>
                                <td>
                                    <a v-if="trlist.orderNumber!=''&&trlist.orderNumber!=null" v-link="{'name':'payment-details',params:{'reserveCashOrderNumber':trlist.orderNumber,'payType':trlist.payType}}" data-ksa="reserve_cash_order_manage.search">付款订单</a>
                                </td>
                                <td>{{trlist.remarks}}</td>
                                <td>{{trlist.refuseReason}}</td>
                            </tr>
                            <tr>
                                <td>合计：</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                <td>{{total | currency ''}}</td><td></td><td></td><td></td><td></td><td></td><td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="datatable-bottom">
                    <div class="left">
                        <a class="icon-file-excel" style="line-height: 30px;" @click="excel" data-ksa="reserve_cash_order_manage.export">Excel导出</a>
                    </div>
                   <div class="right">
                        <page :all="pageall"
                              :cur.sync="defaultData.pageIndex"
                              :page_size.sync="defaultData.pageSize">
                        </page>
                   </div>
                </div>
            </div>
            <div class="no-list" v-show="!zdlists.length">
                未找到数据
            </div>
        </div>

            <content-dialog
                    :show.sync="waringshow" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="'操作提示'" @kok="waringBtn" @kcancel="waringshow = false"
            >
                <div class="form-group">{{waring}}</div>
            </content-dialog>

            <content-dialog
                    :show.sync="addshow" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="'供应商划付'" @kok="addBtn" @kcancel="addshow = false"
            >
                <validator name="vali">
                    <div class="form-group">
                        <label class="w28" ><i>*</i>划付类型：</label>
                        <input type="radio" id="one1" :value="1" v-model="relist.ifBankActivityPay">
                        <label class="w28" for="one1">银行活动划付</label>
                        <input type="radio" id="two1" :value="0" @change="relist.thirdPartyAccountID=''" v-model="relist.ifBankActivityPay">
                        <label class="w28" for="two1">非银行活动划付</label>
                    </div>
                    <div class="form-group">
                        <label class="w28" ><i>*</i>付款方式：</label>
                        <select class="form-control" v-model="relist.payType" @change="relist.subCompanyID=''">
                            <option :value="5">网银转账</option>
                            <option :value="1">备付金</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i>*</i>付款账号</label>
                        <template v-if="relist.payType===1">
                            <select class="form-control" v-model="relist.subCompanyID" v-validate:val10="['required']">
                                <option value="">请选择付款账号</option>
                                <option v-for="(index,n) in companylists" :value="n.subCompanyID">{{n.name}}备付金</option>
                            </select>
                        </template>
                        <span v-if="relist.payType===5">网银转账</span>
                    </div>
                    <div class="form-group" v-if="relist.payType!==1">
                        <label><i>*</i>所属分公司</label>
                        <select class="form-control" v-model="relist.subCompanyID">
                            <option value="">请选择所属分公司</option>
                            <option v-for="(index,n) in companylists" :value="n.subCompanyID">{{n.name}}</option>
                        </select>
                    </div>
                    <div class="form-group" v-if="relist.ifBankActivityPay===0">
                        <label><i>*</i>结算三方</label>
                        <select class="form-control" v-model="relist.thirdPartyAccountID" v-validate:val1="['required']">
                            <option value="">请选择结算三方</option>
                            <option v-for="(index,n) in thirdPartyAccountlists" :value="n.id">{{n.accountName}}</option>
                        </select>
                    </div>
                    <div class="form-group" v-if="relist.ifBankActivityPay===1">
                        <label><i>*</i>活动ID</label>
                        <input type="text" class="form-control" v-validate:val2="['required']" v-limitnumber="relist.activityID" v-model="relist.activityID" placeholder="活动ID">
                    </div>
                    <div class="form-group" v-if="relist.payType!==5">
                        <label><i>*</i>账户名</label>
                        <input type="text" class="form-control" v-validate:val3="['required']" v-model="relist.collectionAccountName" placeholder="50字以内" maxlength="50">
                    </div>
                    <div class="form-group" v-if="relist.payType!==5">
                        <label><i>*</i>收款账号</label>
                        <input type="text" class="form-control" v-validate:val4="['required']" v-model="relist.collectionAccountNumber">
                    </div>
                    <div class="form-group" v-if="relist.payType!==5">
                        <label><i>*</i>开户行</label>
                        <input type="text" class="form-control" v-validate:val5="['required']" v-model="relist.collectionBankName">
                    </div>
                    <div class="form-group" v-if="relist.payType!==5">
                        <label class="w28" ><i>*</i>建行否：</label>
                        <input type="radio" id="one" value="true" v-model="relist.ccb" v-validate:val7="['required']">
                        <label class="w28" for="one">是</label>
                        <input type="radio" id="two" value="false" v-model="relist.ccb" v-validate:val7="['required']">
                        <label class="w28" for="two">否</label>
                    </div>
                    <div class="form-group" v-if="relist.ccb != 'true'&&relist.payType!==5">
                        <label><i>*</i>提入行号</label>
                        <input type="text" class="form-control w65" v-validate:val6="['required']" v-model="relist.collectionBankNumber">
                        <a href="https://www.hebbank.com/corporbank/otherBankQueryWeb.do" target="_blank" class="btn btn-primary" style="vertical-align: top;">查询行号</a>
                    </div>
                    <div class="form-group">
                        <label><i>*</i>金额</label>
                        <input type="text" class="form-control" v-validate:val8="['required']" v-limitaddprice="relist.payAmount" v-model="relist.payAmount">
                    </div>
                    <div class="form-group">
                        <label><i>*</i>用途</label>
                        <select class="form-control" v-validate:val9="['required']" v-model="relist.purpose">
                            <option value="">请选择用途</option>
                            <option value="1">广告费</option>
                            <option value="2">物料费</option>
                            <option value="0">其他</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="w28"><i>*</i>备注：</label>
                        <input v-model="relist.remarks" class="form-control" type="text" placeholder="最多15字符" maxlength="15" v-validate:val0="['required']">
                    </div>
                </validator>
            </content-dialog>

            <content-dialog
                    :show.sync="modal_back" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="'退回'" @kok="backTrue" @kcancel="modal_back = false"
            >
                <div class="modal-body">
                    <div class="form-group">
                        <label class="col-lg-3 control-label"><i>*</i>退回原因</label>
                        <div>
                            <textarea rows="5" cols="5" class="form-control" v-model="remarks" placeholder=""></textarea>
                        </div>
                    </div>
                </div>
            </content-dialog>

        </div>
    </index>
</template>
<script>
    import model from '../../ajax/PaymentOfPayment/provider_model'
    export default{
        data(){
            this.model =model(this)
            return{
                pageall:1,
                defaultData:{
                    modelstatus:'',
                    "subCompanyID": "",
                    "startDate": "",
                    "endDate": "",
                    "activityID": "",
                    "status": "",
                    "orderStatus": "",
                    "pageIndex": 1,
                    ifBankActivityPay:'',
                    payType:'',
                    "pageSize": 10
                },
                dateS:'3',
                zdlists:[],
                thirdPartyAccountlists:[],
                relist:{},
                companylists:[],
                waring:'',
                remarks:'',
                total:0,
                modal_back:false,
                accountId:'',
                waringshow:false,
                addshow:false
            }
        },
        methods:{
            getZlists(data){
                this.model.providerPay_list(data).then((response)=>{
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if(response.data.code==0){
                        this.$set('zdlists', response.data.data)
                        this.$set('pageall', response.data.total)
                    }
                });
                this.model.providerPay_sum(data).then((response)=>{
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if(response.data.code==0){
                        this.$set('total', response.data.data.payAmount)
                    }
                });
            },
            getClist(){
                // *** 请求公司数据
                this.$common_model.getcompany().then((response)=>{
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if(response.data.code==0){
                        this.$set('companylists', response.data.data)
                    }
                });
            },
            getThird(){
                // *** 请求三方数据
                this.$common_model.thirdPartyAccount().then((response)=>{
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if(response.data.code==0){
                        this.$set('thirdPartyAccountlists', response.data.data)
                    }
                });
            },
            getStatus(a){
                let values=a.split(',');
                this.defaultData.status=this.defaultData.orderStatus='';
                (values[1]=='s')?this.defaultData.status=values[0]:this.defaultData.orderStatus=values[0];
            },
            checkNew(){
                this.defaultData.pageIndex=1;
                this.initList();
            },
            initList(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.waringshow=false;
                this.addshow=false;
                this.modal_back=false;
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
            addUser(){
                this.fire1=false;
                this.relist={
                    activityID :'',
                    applyTime :'',
                    id:'',
                    ccb :'false',
                    collectionAccountName:'',
                    collectionAccountNumber:'',
                    collectionBankName:'',
                    collectionBankNumber:'',
                    payAccount:'',
                    payAmount:'',
                    purpose:'',
                    remarks:'',
                    subCompanyID:'',
                    status:'',
                    ifBankActivityPay:1,
                    thirdPartyAccountID:'',
                    payType:5
                },
                    this.accountId='';
                this.addshow=true;
            },
            rewrite(_list){
                this.relist=_.cloneDeep(_list);
                this.relist.purpose= this.relist.purpose+'';
                (this.relist.ccb=='0')? this.relist.ccb='false':this.relist.ccb='true';
                this.addshow=true;
            },
            submit(a){
                this.waring = '你确认提交信息？';
                this.accountId=a;
                this.waringshow=true;
            },
            deleteList(a){
                this.waring = '你确认删除信息？';
                this.accountId=a;
                this.waringshow=true;
            },
            pass(a){
                this.waring = '你确认通过信息？';
                this.accountId=a;
                this.waringshow=true;
            },
            back(a){
                this.modal_back=true;
                this.accountId=a;
                this.remarks='';
            },
            backTrue(){
                if(this.remarks == ''){
                    dialogs('info','请填写退回原因！');
                    return;
                }
                let data={
                    id:this.accountId,
                    refuseReason:this.remarks
                }
                this.model.providerPay_back(data).then((response)=>{
                    // *** 判断请求是否成功如若成功则启用该数据
                    if(response.data.code==0){
                        this.initList();
                        dialogs('success',response.data.message);
                    }
                })
            },
            waringBtn(){
                if(this.waring == '你确认提交信息？'){
                    this.model.providerPay_submit(this.accountId).then((response)=>{
                        // *** 判断请求是否成功如若成功则启用该数据
                        if(response.data.code==0){
                            this.initList();
                            dialogs('success',response.data.message);
                        }
                    })
                }
                if(this.waring == '你确认删除信息？'){
                    this.model.providerPay_delete(this.accountId).then((response)=>{
                        // *** 判断请求是否成功如若成功则启用该数据
                        if(response.data.code==0){
                            this.initList();
                            dialogs('success',response.data.message);
                        }
                    })
                }
                if(this.waring == '你确认通过信息？'){
                    this.model.providerPay_pass(this.accountId).then((response)=>{
                        // *** 判断请求是否成功如若成功则启用该数据
                        if(response.data.code==0){
                            this.initList();
                            dialogs('success',response.data.message);
                        }
                    })
                }
            },
            addBtn(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(!this.$vali.valid){
                    dialogs('info','请填写所有必填项！');
                    return;}
                let data=_.cloneDeep(this.relist);
                data.payAmount=accMul(data.payAmount,100);
                if(data.id==''){
                    this.model.providerPay_add(data).then((response)=>{
                        if(response.data.code==-1){
                            dialogs('error',response.data.message);
                        }else{
                            this.initList();
                            dialogs('success',response.data.message);
                        }
                    })
                }else{
                    this.model.providerPay_edit(data).then((response)=>{
                        if(response.data.code==-1){
                            dialogs('error',response.data.message);
                        }else{
                            this.initList();
                            dialogs('success',response.data.message);
                        }
                    })
                }
            },
            getTime(){
                this.defaultData.startDate=init_date(this.dateS)[0];
                this.defaultData.endDate=init_date(this.dateS)[1];
            },
            excel(){
                if(!this.zdlists.length>0)return;
                this.defaultData.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.providerPayDetailexcel+ $.param(this.defaultData));
            }
        },
        ready() {
            this.getTime();
            this.getClist();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.defaultData=back_json.fetchArray(this.$route.path):null;
            (this.$route.params.providerID==':providerID')?this.defaultData.id='' :this.defaultData.id=this.$route.params.providerID;
            this.initList();
            this.getThird();
        },
        watch:{
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.initList();
            }
        }
    }
</script>