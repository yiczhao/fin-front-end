<template>
    <index title="预付款划付" ptitle="备付金支出"  isshow="isshow">
        <div class="content provider-pay-detail" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="reserve_cash_detail_manage"><a v-link="{name:'payment-details'}">付款明细</a></li>
                    <li data-ksa="pay_recheck"><a v-link="{name:'pay-recheck'}">划付复核</a></li>
                    <li data-ksa="subsidy_pay_detail_manage"><a v-link="{name:'subsidy-appropriation'}">补贴划付</a></li>
                    <li data-ksa="subsidy_tax_rebate_detail_manage"><a v-link="{name:'subsidy-tax-rebate'}">补贴退税</a></li>
                    <li data-ksa="subsidy_account_manage"><a v-link="{name:'subsidy-management'}">税金管理</a></li>
                    <li data-ksa="advance_payment_detail_manage" class="active"><a v-link="{name:'advance-payment-detail'}">预付款划付</a></li>
                    <li data-ksa="provider_pay_detail"><a v-link="{name:'provider-pay-detail'}">供应商划付</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add" @click="addUser" data-ksa="advance_payment_detail_manage.add">新增划付</a>
                    </div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="checkForm.subCompanyID">
                                <option value="">全部分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>

                            <select class="form-control" v-model="checkForm.timeRange" @change="getTime">
                                <option value="5">今天</option>
                                <option value="0">昨天</option>
                                <option value="1">最近一周</option>
                                <option value="2">最近一个月</option>
                                <option value="3">最近三个月</option>
                                <option value="4">自定义时间</option>
                            </select>

                            <div class="inline" v-show="checkForm.timeRange==4">
                                <datepicker :value.sync="checkForm.startDate"></datepicker>
                                <span>至</span>
                                <datepicker :value.sync="checkForm.endDate"></datepicker>
                            </div>

                            <input type="text" class="form-control" v-model="checkForm.advancePaymentAccountDetailID" placeholder="预付款流水ID" v-limitnumber="checkForm.advancePaymentAccountDetailID">

                            <input type="text" class="form-control" v-model="checkForm.keywords" placeholder="收款账户名、帐号" >
                                <input type="text" class="form-control" v-model="checkForm.advancePaymentAccountName" placeholder="预付款账户名" >
                            <select class="form-control" v-model="checkForm.modelstatus" @change="getStatus(checkForm.modelstatus)">
                                <option value="">全部状态</option>
                                <option value="1,s">未提交</option>
                                <option value="2,s">等待审核</option>
                                <option value="4,s">审核不通过</option>
                                <option value="2,o">等待划付</option>
                                <option value="3,o">转账中</option>
                                <option value="4,o">等待对账</option>
                                <option value="5,o">对账成功</option>
                            </select>
                            <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="备注">
                        </form> 
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="checkNew" data-ksa="advance_payment_detail_manage.search">查询</a>
                    </div>
                </div>

                <div v-show="!!advancePaymentDetailList.length" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>申请时间</th>
                                    <th>分公司</th>
                                    <th>预付款账户名</th>
                                    <th>收款账户信息</th>
                                    <th>预付金额</th>
                                    <th>付款方式</th>
                                    <th>付款账户</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                    <th>账户详情</th>
                                    <th>数据流转</th>
                                    <th>备注</th>
                                    <th>不通过原因</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(index,apd) in advancePaymentDetailList" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{apd.advancePaymentAccountDetailID}}</td>
                                    <td>{{apd.applyTime | datetime}}</td>
                                    <td>{{apd.subCompanyName}}</td>
                                    <td>{{apd.advancePaymentAccountName}}</td>
                                    <td>
                                        {{apd.collectionAccountName}}
                                        <br>
                                        {{apd.collectionAccountNumber}}
                                    </td>
                                    <td>{{apd.advancePaymentAmount/100 | currency ''}}</td>
                                    <td>
                                        <template v-if="apd.payType==1">备付金账户</template>
                                        <template v-if="apd.payType==5">网银转账</template>
                                    </td>
                                    <td>
                                        {{apd.payAccount}}
                                    </td>
                                    <td>
                                        <template v-if="!!apd.reserveCashOrderID">
                                            <template v-if="apd.status==0">审核不通过</template>
                                            <template v-if="apd.status==2">等待划付</template>
                                            <template v-if="apd.status==3">转账中</template>
                                            <template v-if="apd.status==4">等待对账</template>
                                            <template v-if="apd.status==5">对账成功</template>
                                            <template v-if="apd.status==6">划付失败</template>
                                        </template>
                                        <template v-else>
                                            <template v-if="apd.status==1">未提交</template>
                                            <template v-if="apd.status==2">等待审核</template>
                                            <template v-if="apd.status==3">审核通过</template>
                                            <template v-if="apd.status==4">审核不通过</template>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-if="!apd.reserveCashOrderID">
                                            <template v-if="apd.status==1||apd.status==4">
                                                <a data-ksa="advance_payment_detail_manage.edit" @click="rewrite(apd.advancePaymentAccountDetailID)">编辑</a>
                                                <a data-ksa="advance_payment_detail_manage.submit" @click="submit(apd.advancePaymentAccountDetailID)">提交</a>
                                                <a data-ksa="advance_payment_detail_manage.delete" @click="deleteList(apd.advancePaymentAccountDetailID)">删除</a>
                                            </template>
                                            <template v-if="apd.status==2">
                                                <a data-ksa="advance_payment_detail_manage.approve" @click="pass(apd.advancePaymentAccountDetailID)">通过</a>
                                                <a data-ksa="advance_payment_detail_manage.back" @click="back(apd.advancePaymentAccountDetailID)">退回</a>
                                            </template>
                                        </template>
                                        <template v-else>
                                            <template v-if="apd.status==0">
                                                <a data-ksa="advance_payment_detail_manage.edit" @click="rewrite(apd.advancePaymentAccountDetailID)">编辑</a>
                                                <a data-ksa="advance_payment_detail_manage.submit" @click="submit(apd.advancePaymentAccountDetailID)">提交</a>
                                                <a data-ksa="advance_payment_detail_manage.delete" @click="deleteList(apd.advancePaymentAccountDetailID)">删除</a>
                                            </template>
                                        </template>
                                    </td>
                                    <td>
                                        <a v-if="apd.reserveCashOrderID==0" v-link="{'name':'prepayment-info',params:{'id':apd.advancePaymentMerchantID,'payRecheckID':apd.payRecheckID}}" data-ksa="advance_payment_account_manage.search">查看</a>
                                        <a v-if="apd.reserveCashOrderID!=0" v-link="{'name':'prepayment-info',params:{'id':apd.advancePaymentMerchantID,'orderNumber':apd.orderNumber}}" data-ksa="advance_payment_account_manage.search">查看</a>
                                    </td>
                                    <td>
                                        <template v-if="!!apd.reserveCashOrderID">
                                            <a v-if="apd.status!=0" @click="gopayment(apd.reserveCashOrderID,4)" data-ksa="reserve_cash_order_manage.search">付款订单</a>
                                        </template>
                                       </td>
                                    <td>{{apd.remarks}}</td>
                                    <td>{{apd.refuseReason}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">
                        <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" @click="excel" data-ksa="advance_payment_detail_manage.export">Excel导出</a>
                        </div>
                       <div class="right">
                            <page :all="pageall"
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                       </div>
                    </div>
                </div>

                <div class="no-list" v-else>
                    未查询到预付款划付数据！
                </div>


                <content-dialog
                        :show.sync="waringshow" :is-cancel="true" :type.sync="'infos'"
                        :title.sync="'操作提示'" @kok="waringBtn" @kcancel="waringshow = false"
                >
                    <div class="form-group">{{waring}}</div>
                </content-dialog>

                <content-dialog
                        :show.sync="addshow" :is-cancel="true" :type.sync="'infos'"
                        :title.sync="'新增划付'" @kok="addBtn" @kcancel="addshow = false"
                >
                    <validator name="vali">
                        <div class="form-group">
                            <label><i>*</i>分公司</label>
                            <select class="form-control" v-model="relist.subCompanyId" @change="queryAdvancePaymentMerchantList(relist.subCompanyId)">
                                <option value="">请选择分公司</option>
                                <option v-for="(index,n) in subcompanyList" :value="n.subCompanyID">{{n.name}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>预付款账户名：</label>
                            <select class="form-control" v-model="relist.advancePaymentId" @change="getRechargeInfo(relist.advancePaymentId)">
                                <option value="">请预付款账户名</option>
                                <option v-for="(index,n) in accountList" :value="n.id">{{n.accountName}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>余额：</label><span style="color:red">{{balanceAmount/100 | currency ''}}</span>
                        </div>
                        <div class="form-group">
                            <label class="w28" ><i>*</i>付款方式：</label>
                            <select class="form-control" v-model="relist.payType" @change="relist.paymentAccountId=relist.receiveAccountId=''">
                                <option :value="5">网银转账</option>
                                <option :value="1">备付金</option>
                            </select>
                        </div>

                        <div class="form-group"  v-show="relist.payType==1">
                            <label class="payment-method"><i style="color:red;">*</i>付款账号：</label>
                            <select class="form-control" v-model="relist.paymentAccountId" style="width: 60%;display: inline-block;">
                                <option value="">请选择付款账号</option>
                                <option v-for="n in bankAccountList" v-text="n.shortName" :value="n.id"></option>
                            </select>
                        </div>
                        <div class="form-group"  v-show="relist.payType==1">
                            <label class="payment-method"><i style="color:red;">*</i>收款信息：</label>
                            <select class="form-control" @change="changePayType" v-model="relist.receiveAccountId" style="width: 60%;display: inline-block;">
                                <option value="">请选择收款信息</option>
                                <option v-for="n in merchantIdList" v-text="n.name" :value="n.id"></option>
                            </select>
                        </div>
                        <div class="form-group" v-show="!!relist.receiveAccountId" style="padding-left: 40px;background: #ddd;">
                            <div class="collectionAccount-bgcolor">
                                <label>账户名：</label> {{collectionAccountName}}<br/>
                                <label>账号：</label>{{collectionAccountNumber}}<br/>
                                <label>开户行：</label>{{collectionBankName}}<br/>
                                <label>提入行号：</label>{{collectionBankNumber}}
                            </div>
                        </div>
                        <div class="form-group">
                            <label><i style="color:red">*</i>预付金额：</label>
                            <input v-validate:val1="['required']" type="text" class="form-control"
                                   name="advancePaymentAmount"
                                   v-model="relist.amount" v-limitprice="relist.amount"/>
                        </div>
                        <div class="form-group">
                            <label style="position: relative;top: -35px;"><i style="color:red">*</i>备注：</label>
                            <textarea v-validate:val2="['required']" class="form-control" maxlength="15" name="remark"
                                      v-model="relist.remark" placeholder="最多15字符"></textarea>
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
        </div>
    </index>
</template>
<script>
    import model from '../../ajax/PaymentOfPayment/advance_model'
    export default{
        data(){
            this.model=model(this);
            return{
                checkForm:{
                    subCompanyID:"",
                    advancePaymentAccountDetailID:"",
                    cityID:"",
                    status:"",
                    remarks:"",
                    startDate:"",
                    endDate:"",
                    merchantOperationID:"",
                    merchantName:"",
                    keywords:"",
                    pageIndex:1,
                    pageSize:10,
                    modelstatus:'',
                    timeRange:'3'
                },
                balanceAmount:'',
                collectionAccountName:'',
                collectionAccountNumber:'',
                collectionBankName:'',
                collectionBankNumber:'',
                subcompanyList:[],
                pageall:1,
                cityList:[],
                advancePaymentDetailList:[],
                accountList:[],
                merchantIdList:[],
                bankAccountList:[],
                waring:'',
                relist:{},
                remarks:'',
                modal_back:false,
                accountId:'',
                waringshow:false,
                merchantHasId:true,
                addshow:false
            }
        },
        methods:{
            excel(){
                if(!this.advancePaymentDetailList.length>0)return;
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.advancePaymentDetailexcel+ $.param(this.checkForm));
            },
            //获取付款账户数据
            getBankAccountList(_type){
                this.$common_model.getbankAccount(_type)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('bankAccountList', response.data.data)
                        }
                    });
            },
            //获取补贴划付数据
             getadvancePaymentDetailList(data){
                 if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.advance_list(data)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                             this.$set('advancePaymentDetailList', response.data.data)
                             this.$set('pageall', response.data.total)
                        }
                    });
            },
            queryAdvancePaymentMerchantList(id){
                if(!id)return;
                this.relist.advancePaymentId='';
                this.model.queryAdvancePaymentMerchantList(id)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('accountList', response.data.data)
                        }
                    });
            },
             //获取分公司数据
            getSubcompany(){
                 this.$common_model.getcompany()
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                         if(response.data.code == 0){
                                this.$set('subcompanyList', response.data.data)
                         }
                    });
            },
            //获取城市数据
            getCity(_id){
                this.cityID='';
                let data={
                    'subCompanyID':_id
                }
                 this.$common_model.getcity(data)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                         if((response.data.code==0)){
                            this.$set('cityList', response.data.data)
                        }

                    });
            },
            getStatus(a){
                let values=a.split(',');
                this.checkForm.status=this.checkForm.orderStatus='';
                (values[1]=='s')?this.checkForm.status=values[0]:this.checkForm.orderStatus=values[0];
            },
            changePayType(e){
                if(!!this.relist.receiveAccountId){
                    this.collectionAccountName='';
                    this.collectionAccountNumber='';
                    this.collectionBankName='';
                    this.collectionBankNumber='';
                    this.model.changeBankInfo(this.relist.receiveAccountId)
                        .then((response)=>{
                            if (response.data.code == 0) {
                                this.collectionAccountName =response.data.data.accountName;
                                this.collectionAccountNumber = response.data.data.accountNumber;//1
                                this.collectionBankName = response.data.data.bankName;//2
                                this.collectionBankNumber = response.data.data.bankNumber;
                            }
                        });
                }
            },
            checkNew(){
                this.checkForm.pageIndex=1;
                this.query();
            },
            query() {
                if (this.checkForm.startDate=="" && this.checkForm.endDate=="") {
                   this.getTime();
                }
                this.waringshow=false;
                this.addshow=false;
                this.modal_back=false;
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getadvancePaymentDetailList(this.checkForm);
            },
            gopayment(a){
                this.$common_model.skipToOrderById(a)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.$router.go({name:'payment-details',params:{reserveCashOrderNumber:response.data.data.orderId,payType:response.data.data.payType}});
                            }

                    })
            },
            addUser(){
                this.fire1=false;
                this.collectionAccountName='';
                this.collectionAccountNumber='';
                this.collectionBankName='';
                this.collectionBankNumber='';
                this.balanceAmount='';
                this.relist={
                    subCompanyId:'',
                    advancePaymentId :'',
                    receiveAccountId :'',
                    paymentAccountId :'',
                    amount :'',
                    remark:'',
                    payType:5
                },
                this.accountId='';
                this.merchantIdList=[];
                this.accountList=[];
                this.addshow=true;

            },
            //获取预付充值数据
            getRechargeInfo(prepaymentId) {
                if(!prepaymentId)return;
                this.relist.receiveAccountId='';
                _.map(this.accountList,(val)=>{
                    if(val.id===prepaymentId){
                        this.balanceAmount=val.balanceAmount;
                    }
                })
                this.model.advancePaymentMerchant(prepaymentId)
                    .then((response)=>{
                        if (response.data.code == 0) {
                            this.merchantHasId=false;
                            this.$set('merchantIdList', response.data.data.list)
                        }else{
                            this.merchantIdList=[];
                            this.merchantHasId=true;
                        }
                    });
            },
            rewrite(_id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.advancePaymentEdit(_id)
                    .then((response)=>{
                        if (response.data.code == 0) {
                            this.$set('relist', response.data.data);
                            this.model.queryAdvancePaymentMerchantList(this.relist.subCompanyId)
                                .then((response)=>{
                                    // *** 判断请求是否成功如若成功则填充数据到模型
                                    if(response.data.code==0){
                                        this.$set('accountList', response.data.data);
                                        _.map(this.accountList,(val)=>{
                                            if(val.id===this.relist.advancePaymentId){
                                                this.balanceAmount=val.balanceAmount;
                                            }
                                        })
                                        this.model.advancePaymentMerchant(this.relist.advancePaymentId)
                                            .then((response)=>{
                                                if (response.data.code == 0) {
                                                    this.$set('merchantIdList', response.data.data.list)
                                                    this.addshow=true;
                                                    this.changePayType();
                                                }
                                            })
                                    }
                                });
                        }
                    });
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
                this.model.advance_back(data).then((response)=>{
                    // *** 判断请求是否成功如若成功则启用该数据
                    if(response.data.code==0){
                        this.query();
                        dialogs('success',response.data.message);
                    }
                })
            },
            waringBtn(){
                if(this.waring == '你确认提交信息？'){
                    this.model.advance_submit(this.accountId).then((response)=>{
                        // *** 判断请求是否成功如若成功则启用该数据
                        if(response.data.code==0){
                            this.query();
                            dialogs('success',response.data.message);
                        }
                    })
                }
                if(this.waring == '你确认删除信息？'){
                    this.model.advance_delete(this.accountId).then((response)=>{
                        // *** 判断请求是否成功如若成功则启用该数据
                        if(response.data.code==0){
                            this.query();
                            dialogs('success',response.data.message);
                        }
                    })
                }
                if(this.waring == '你确认通过信息？'){
                    this.model.advance_pass(this.accountId).then((response)=>{
                        // *** 判断请求是否成功如若成功则启用该数据
                        if(response.data.code==0){
                            this.query();
                            dialogs('success',response.data.message);
                        }
                    })
                }
            },
            verifyField (data) {
                let errMapper={};
                if(data.payType==1){
                    errMapper= {
                        subCompanyId:'分公司',
                        advancePaymentId :'预付款账户名',
                        receiveAccountId :'收款信息',
                        paymentAccountId :'付款账号',
                        amount :'预付金额',
                        remark:'备注',
                    }
                }else {
                    errMapper= {
                        subCompanyId:'分公司',
                        advancePaymentId :'预付款账户名',
                        amount :'预付金额',
                        remark:'备注',
                    }
                }
                // 检测是否存在未填写项
                for (let k in data) {
                    let m = data[k]
                    let err = errMapper[k] && new Error(`请检查${errMapper[k]}项!`)
                    /*global _*/
                    if ((!m && err) || (_.isArray(m) && !m.length && err)) {
                        throw err
                    }
                }
            },
            errHandle(err){
                dialogs('info', err)
            },
            addBtn(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                let data=_.cloneDeep(this.relist);
                data.amount=accMul(data.amount,100);
                if (true) {
                    try {
                        this.verifyField(data)
                    } catch (e) {
                        this.errHandle(e.message)
                        return
                    }
                }
                if(this.merchantHasId){
                    this.errHandle('当前预付款账户尚未添加门店，不能充值！')
                    return;
                }
                if(data.id==''){
                    this.model.advance_save(data).then((response)=>{
                        if(response.data.code==-1){
                            dialogs('error',response.data.message);
                        }else{
                            this.query();
                            dialogs('success',response.data.message);
                        }
                    })
                }else{
                    this.model.advance_save(data).then((response)=>{
                        if(response.data.code==-1){
                            dialogs('error',response.data.message);
                        }else{
                            this.query();
                            dialogs('success',response.data.message);
                        }
                    })
                }
            },
            getTime(){
                this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
            }
        },
        ready() {
            (this.$route.params.advanceId==':advanceId')?this.checkForm.advancePaymentAccountDetailID='':this.checkForm.advancePaymentAccountDetailID=this.$route.params.advanceId;
            this.getCity();
            this.getSubcompany();
            this.getBankAccountList('1');
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.query();
        },
         watch:{
            'checkForm.pageIndex+checkForm.pageSize'(){
                this.query();
            }
       }
    }
</script>