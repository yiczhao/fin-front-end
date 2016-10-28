<template>
    <index title="补贴退税" ptitle="备付金支出"  isshow="isshow">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li><a v-link="{name:'payment-details'}" data-ksa="reserve_cash_detail_manage">付款明细</a></li>
                    <li><a v-link="{name:'pay-recheck'}" data-ksa="pay_recheck">划付复核</a></li>
                    <li><a v-link="{name:'subsidy-appropriation'}" data-ksa="subsidy_pay_detail_manage">补贴划付</a></li>
                    <!--<li><a v-link="{name:'limit-purchase-detail'}" data-ksa="advance_payment_account_manage">额度采购</a></li>-->
                    <li class="active"><a v-link="{name:'subsidy-tax-rebate'}" data-ksa="subsidy_tax_rebate_detail_manage">补贴退税</a></li>
                    <li><a v-link="{name:'subsidy-management'}" data-ksa="">退税管理</a></li>
                    <li><a v-link="{name:'advance-payment-detail'}" data-ksa="advance_payment_detail_manage">预付款划付</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" data-toggle="modal"  @click="batchs()" data-ksa="subsidy_tax_rebate_detail_manage.apply_pay">一键审核</a>
                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form">
                                <select class="form-control" v-model="checkForm.subCompanyID"  @change="getCity(checkForm.subCompanyID)">
                                    <option value="">全部分公司</option>
                                    <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                                </select>

                                <select class="form-control" v-model="checkForm.cityID">
                                    <option value="">全部城市</option>
                                    <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                                </select>

                                <select class="form-control" v-model="checkForm.timeRange">
                                    <option value="5">今天</option>
                                    <option value="0">昨天</option>
                                    <option value="1">最近一周</option>
                                    <option value="2">最近一个月</option>
                                    <option value="3">最近三个月</option>
                                    <option value="4">自定义时间</option>
                                </select>

                            <div  v-show="checkForm.timeRange==4">
                                <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                                <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                            </div>

                                <input type="text" class="form-control" v-model="checkForm.id" v-limitnumber="checkForm.id" placeholder="ID">

                                <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="商户ID" v-limitnumber="checkForm.merchantOperationID">

                                <input type="text" class="form-control" v-model="checkForm.keywords" style="width:192px;" placeholder="商户名、收款账户名、帐号">

                                <select class="form-control" v-model="checkForm.createType">
                                    <option value="">请选择生成方式</option>
                                    <option value="1">系统生成</option>
                                    <option value="2">手工单</option>
                                    <option value="3">手工结算</option>
                                </select>

                                <select class="form-control" v-model="checkForm.status">
                                    <option value="">请选择状态</option>
                                    <option value="1">等待审核</option>
                                    <option value="7">等待复核</option>
                                    <option value="2">等待划付</option>
                                    <option value="3">转账中</option>
                                    <option value="4">等待对账</option>
                                    <option value="5">对账成功</option>
                                    <option value="6">划付失败</option>
                                </select>

                                <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="备注">
                        </form> 
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="query" data-ksa="subsidy_tax_rebate_detail_manage.search">查询</a>
                    </div>
                </div>

                <div v-show="!!subsidyTaxRebateDetailList.length"  class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table">
                            <thead>
                                <tr>
                                <th><input type="checkbox" id="All"  class="check-boxs" @click="checkAll($event)"/>ID</th>
                                    <th>生成日期</th>
                                    <th>分公司</th>
                                    <th>城市</th>
                                    <th>付款账户</th>
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>收款账户信息</th>
                                    <th>生成方式</th>
                                    <th>退税款</th>
                                    <th>交易</th>
                                    <th>状态</th>
                                    <th>付款流水</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(index,strd) in subsidyTaxRebateDetailList" v-bind:class="{'odd':(index%2==0)}">
                                    <td>
                                        <template v-if="strd.status!=1">
                                            <input type="checkbox" disabled="true" name="ckbox-disabled" :id="strd.id"/>{{strd.id}}
                                        </template>
                                        <template v-else>
                                            <input type="checkbox" name="ckbox" :id="strd.id" :class="strd.collectionAccountName+strd.collectionAccountNumber"/>{{strd.id}}
                                        </template>
                                    </td>
                                    <td>{{strd.createTime | datetime}}</td>
                                    <td>{{strd.subCompanyName}}</td>
                                    <td>{{strd.cityName}}</td>
                                    <td>{{strd.payAccount}}</td>
                                    <td>{{strd.merchantOperationID}}</td>
                                    <td>{{strd.merchantName}}</td>
                                    <td>{{strd.collectionAccountName}}<br/>{{strd.collectionAccountNumber}}</td>
                                    <td>
                                        <template v-if="strd.createType==1">系统生成</template>
                                        <template v-if="strd.createType==2">手工单</template>
                                        <template v-if="strd.createType==3">手工结算</template>
                                    </td>
                                    <td>{{strd.taxRebateAmount/100 | currency ''}}</td>
                                    <td><a v-link="{name:'trade-info',params:{subsidyTaxRebateId:strd.id}}" data-ksa="trade_detail_manage.search">明细</a> </td>
                                    <td>
                                        <template v-if="strd.status==0">
                                            已关闭
                                        </template>
                                        <template v-if="strd.status==1">
                                            等待审核
                                        </template>
                                        <template v-if="strd.status==2">
                                            等待划付
                                        </template>
                                        <template v-if="strd.status==3">
                                            转账中
                                        </template>
                                        <template v-if="strd.status==4">
                                            等待对账
                                        </template>
                                        <template v-if="strd.status==5">
                                            对账成功
                                        </template>
                                        <template v-if="strd.status==6">
                                            划付失败
                                        </template>
                                        <template v-if="strd.status==7">等待复核</template>
                                    </td>
                                    <td>
                                        <template v-if="strd.status==1">
                                            <a href="javascript:void(0);" @click="showModalApplyPayById(strd.id)" data-ksa="subsidy_tax_rebate_detail_manage.apply_pay">申请划付</a>&nbsp;
                                            <a href="javascript:void(0);" @click="updateById(strd.id)" data-ksa="subsidy_tax_rebate_detail_manage.update">更新</a>
                                        </template>
                                        <template v-if="strd.status==7">
                                            <a @click="goRecheck(strd.id,3)" data-ksa="reserve_cash_order_manage.search">查看</a>
                                        </template>
                                        <template v-if="strd.status!=7&&strd.status!=1">
                                            <a @click="gopayment(strd.id,3)" data-ksa="reserve_cash_order_manage.search">查看</a>
                                        </template>
                                    </td>
                                    <td>{{strd.remarks}}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>合计：</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{{total.taxRebateAmount/100 | currency ''}}</td><td></td><td></td><td></td><td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div  v-else style="padding: 30px;font-size: 16px;text-align: center" >
                    未查询到补贴退税信息！
                </div>


                <div v-show="!!subsidyTaxRebateDetailList.length" class="datatable-bottom">
                   <div class="left">
                        <a class="icon-file-excel" style="line-height: 30px;" v-on:click="subsidyTaxexcel" data-ksa="subsidy_tax_rebate_detail_manage.export">Excel导出</a>
                   </div>

                   <div class="right" v-show="!!subsidyTaxRebateDetailList.length">
                        <page :all="pageall"
                              :cur.sync="checkForm.pageIndex"
                              :page_size.sync="checkForm.pageSize">
                        </page>
                   </div>
                </div>
            </div>

            <content-dialog
                    :show.sync="modal_applyPay" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="dialogTitle" @kok="submit" @kcancel="modal_applyPay = false"
                    >
                    <div class="modal-body">
                        <div class="form-group">
                            您目前选择了 <span style="color:#ff9900; font-size:13px;font-family: Bold;font-weight: 700;">{{applyPayInfo.payCount}}</span> 条划付记录，
                            共计 <span style="color: #008000;font-family: Bold;font-weight: 700;">{{applyPayInfo.tradeCount}}</span>  笔，
                            <span style="color: #ff0000;font-family: Bold;font-weight: 700;">{{applyPayInfo.suspensionTaxAmount/100 | currency ''}}</span>  元
                        </div>
                        <div class="form-group">
                            <label class="payment-method"><i style="color:red;">*</i>付款方式：</label>
                            <select class="form-control" v-model="payTypes" style="width: 30%;display: inline-block;">
                                <option value="">请选择付款方式</option>
                                <option value="1">备付金账户</option>
                                <option value="2">商户预付款账户</option>
                                <option value="3">银行结算</option>
                            </select>
                        </div>
                    </div> 
            </content-dialog>

        </div>
    </index>
</template>
<style>
    .modal-body button{
        width:35%;
    }
</style>
<script>
    import model from '../../ajax/PaymentOfPayment/rebate_model'
    export default{
        data(){
            this.model =model(this)
            return{
                modal_applyPay: false,
                checkForm:{
                    id:"",
                    subCompanyID:"",
                    cityID:"",
                    createType:"",
                    status:"",
                    startDate:"",
                    remarks:'',
                    endDate:"",
                    merchantOperationID:"",
                    keywords:"",
                    pageIndex:1,
                    pageSize:10,
                    timeRange:'3'
                },
                subcompanyList:[],
                pageall:1,
                cityList:[],
                subsidyTaxRebateDetailList:[],
                payTypes:'',
                mergePay:false,
                showPayAccount:'',
                applyPayRemarks:'',
                dialogTitle:'',
                submitId:'',
                applyPayInfo:{
                },
                total:{
                    taxRebateAmount:'',
                }
            }
        },
        methods:{
            //获取补贴划付数据
             getsubsidyTaxRebateDetailList(data){
                 if(sessionStorage.getItem('isHttpin')==1)return;
                 this.model.rebate_list(data)
                    .then((response)=>{
                        if(response.data.code==0){
                            this.$set('subsidyTaxRebateDetailList', response.data.data)
                            this.$set('pageall', response.data.total)
                        }
                    });
                 this.model.rebate_total(data)
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
            //获取城市数据
            getCity(_id){
                this.cityID='';
                let data={
                    'subCompanyID':_id
                }
                this.$common_model.getcity(data)
                    .then((response)=>{
                        if(response.data.code==0){
                            this.$set('cityList', response.data.data)
                         }
                    });
            },
             checkAll(ck){
                if(ck.target.checked){
                    $("input[name='ckbox']").prop({'checked':true});
                }else{
                    $("input[name='ckbox']").prop({'checked':false});
                }
            },
            clear(){
                this.payTypes='';
                this.mergePay=false;
            },
            updateById(id){
                this.model.rebate_update(id)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.query();
                                dialogs('success','更新成功！');
                            }
                        });
            },
            batchs(){
                let AccountS = [];
                $("input[name='ckbox']:checked").each(function(){
                    AccountS.push($(this).prop("id"));
                });
                if(AccountS.length<=0){
                    dialogs('info','请勾选审核信息！');
                    return false
                }
                this.getApplyPayInfoByIDs(AccountS);
                this.dialogTitle='一键审核';
            },
            showModalApplyPayById(id){
                let array=[];
                array.push(id);
                this.getApplyPayInfoByIDs(array);
                this.dialogTitle='申请划付';
            },
            getApplyPayInfoByIDs(idArray){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(idArray.length<=0){
                    return false
                }
                let data={
                    ids:idArray.toString(),
                    subsidyType:3
                }
                this.submitId=idArray;
                this.clear();
                this.model.select_rebate(data)
                        .then((response)=>{
                                // *** 判断请求是否成功如若
                                // *** 判断请求是否成功如若
                                if(response.data.code==0){
                                        this.$set('applyPayInfo', response.data.data)
                                        this.modal_applyPay = true;
                                    }
                                });
            },
            submit(){
                if(sessionStorage.getItem('isHttpin')==1||this.payTypes=='')return;
                var mes;
                (this.submitId.length>1)?mes='审核成功':mes='申请成功';
                let data={
                    ids:this.submitId,
                    payType:this.payTypes,
                    mergePay:this.mergePay
                    
                }
                this.model.rebate_applyPay(JSON.stringify(data))
                        .then((response)=>{
                            // *** 判断请求是否成功如若
                            if(response.data.code==0){
                                dialogs('success',mes);
                                this.modal_applyPay = false;
                            }
                            this.query();
                        });
            },
            query() {
                $('.modal').modal('hide');
                $(".check-boxs").prop({'checked':false})
                if (this.checkForm.startDate=="" && this.checkForm.endDate=="") {
                    this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                    this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
                }
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getsubsidyTaxRebateDetailList(this.checkForm);
            },
            subsidyTaxexcel(){
                if(!this.subsidyTaxRebateDetailList.length>0)return;
                if (this.checkForm.startDate=="" && this.checkForm.endDate=="") {
                    this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                    this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
                }
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.subsidyTaxexcel+ $.param(this.checkForm));
            },
            gopayment(a,b){
                let data={
                    "streamID":a ,
                    "streamType": b
                }
                this.$common_model.skipToOrder(data)
                    .then((response)=>{
                            if(response.data.code==0){
                                this.$router.go({name:'payment-details',params:{reserveCashOrderNumber:response.data.data.orderNumber,payType:response.data.data.payType}});
                            }
                    })
            },
            goRecheck(a,b){
                let data={
                    "streamID":a ,
                    "streamType": b
                }
                this.$common_model.skipToRecheck(data)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.$router.go({name:'pay-recheck',params:{recheckId:response.data.data.id}});
                            }
                        })
            }
        },
        ready() {
            (this.$route.params.subsidyTaxRebateID==':subsidyTaxRebateID')?this.checkForm.id='':this.checkForm.id=this.$route.params.subsidyTaxRebateID;
            this.getSubcompany();
            this.getCity();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.query();
        },
         watch:{
             'checkForm.timeRange'(){
                this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
            },
            'checkForm.pageIndex+checkForm.pageSize'(){
                this.query();
            }
       }
    }
</script>