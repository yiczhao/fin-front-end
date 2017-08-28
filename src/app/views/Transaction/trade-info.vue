<template>
    <index :title="'交易明细'" 
           :ptitle="'交易管理'"
           :hname="'trade-info'"  
           :isshow="'isshow'">
        <div class="content trade-info" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li class="active" data-ksa="trade_detail_manage"><a v-link="{name:'trade-info'}">交易明细</a></li>
                    <li data-ksa="adjust_trade_detail_pre_manage"><a v-link="{name:'adjust-trade-detailpre'}">调账管理</a></li>
                    <li data-ksa="manual_trade_detail"><a v-link="{name:'manual-trade-detail'}">手工单管理</a></li>
                    <li data-ksa="manually_settlement"><a v-link="{name:'manually-settlement'}">手工结算</a></li>
                    <li data-ksa="exception_trade_manage"><a v-link="{name:'Abnormal-transaction'}">异常交易</a></li>
                    <li data-ksa="exception_trade_white_list_manage"><a v-link="{name:'white-lists'}">异常白名单</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top"
                           @click="quickCheck" data-ksa="trade_detail_manage.check">快速对账</a>
                    </div>
                    <div class="heading-right">
                        <select class="form-control" v-model="checkForm.subCompanyID" @change="getCity(checkForm.subCompanyID)">
                            <option value="">全部分公司</option>
                            <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                        </select>

                        <select class="form-control" v-model="checkForm.cityID">
                            <option value="">全部城市</option>
                            <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                        </select>

                        <select class="form-control" v-model="checkForm.type">
                            <option value="">请选择交易类型</option>
                            <option value="1">正常交易</option>
                            <option value="2">手工单</option>
                            <option value="3">调账</option>
                            <option v-for="(index,n) in typelists" v-text="n.value" :value="n.accountType"></option>
                        </select>
                        <div  class="inline">
                            <label style="font-size: 14px;position: relative;top: 6px;"><input type="checkbox" v-model="leakFlag" @change="changeleakFlag"/>
                            <span>仅展示补单</span>
                            </label>
                        </div>


                        <div  class="inline"><label style="font-size: 14px;position: relative;top: 6px;">交易时间：</label></div>
                        <select class="form-control" v-model="checkForm.timeRange" @change="getTime">
                            <option value="0">昨天</option>
                            <option value="1">最近一周</option>
                            <option value="2">最近一个月</option>
                            <option value="3">最近三个月</option>
                            <option value="4">自定义时间</option>
                        </select>

                        <div  v-show="checkForm.timeRange==4" class="inline">
                            <datepicker :value.sync="checkForm.startDate"></datepicker>
                            <span>至</span>
                            <datepicker :value.sync="checkForm.endDate"></datepicker>
                        </div>

                        <input type="text" class="form-control" v-model="checkForm.subsidyPayId" v-limitnumber="checkForm.subsidyPayId" placeholder="补贴划付ID">

                        <input type="text" class="form-control" v-model="checkForm.subsidyTaxRebateId" v-limitnumber="checkForm.subsidyTaxRebateId" placeholder="补贴退税ID">

                        <input type="text" class="form-control" v-model="checkForm.backendMerchantCode" placeholder="商户号">
                        <input type="text" class="form-control" v-model="checkForm.backendMerchantName" placeholder="商户简称">
                        <input type="text" class="form-control" v-model="checkForm.backendStoreCode" placeholder="门店号">
                        <input type="text" class="form-control" v-model="checkForm.backendStoreName" placeholder="门店名称">
                        <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="商盟ID" v-limitnumber="checkForm.merchantOperationID">
                        <input type="text" class="form-control" v-model="checkForm.merchantName" placeholder="商盟商户名称">

                        <input type="text" class="form-control" v-model="checkForm.tradeDetailID" v-limitnumber="checkForm.tradeDetailID" placeholder="交易ID">

                        <input type="text" class="form-control" v-model="checkForm.serialNumber" placeholder="交易流水号">

                        <input type="text" class="form-control" placeholder="活动ID" v-limitnumber="checkForm.activityOperationID" v-model="checkForm.activityOperationID" >
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="checkNew" data-ksa="trade_detail_manage.search">查询</a>
                    </div>
                </div>

                <div v-cloak v-show="!!tradeList.length" class="dataTables_wrapper no-footer">
                        <div style="position:relative;padding-top:100px;margin-top: -100px;overflow: auto;">
                            <div class="datatable-fixed" style="height:45px;position: absolute;top: 100px;overflow: hidden;background:#fff;">
                                <table id="datatable" class="table">
                                    <thead>
                                    <tr role="row">
                                        <th>交易ID</th>
                                        <th>交易流水号</th>
                                        <th>分公司</th>
                                        <th>城市</th>
                                        <th>商户号</th>
                                        <th>商户简称</th>
                                        <th>门店号</th>
                                        <th>门店名称</th>
                                        <th>商盟ID</th>
                                        <th>商盟商户名称</th>
                                        <th>消费金额</th>
                                        <th>可打折金额</th>
                                        <th>实付金额</th>
                                        <th>额度抵扣</th>
                                        <th>本金抵扣</th>
                                        <th>银行应补</th>
                                        <th>商户应补</th>
                                        <th>补贴代扣</th>
                                        <th>暂扣税金</th>
                                        <th>商户实补</th>
                                        <th>折扣差</th>
                                        <th>扣收金额</th>
                                        <th>导流佣金</th>
                                        <th>入账金额</th>
                                        <th>交易时间</th>
                                        <th>参与活动</th>
                                        <th>交易类型</th>
                                        <th>凭证</th>
                                        <th>备注</th>
                                    </tr>
                                    </thead>
                                    <tr v-for="(index,trlist) in tradeList" v-bind:class="{'odd':(index%2==0)}">
                                        <td>{{trlist.id}}</td>
                                        <td>{{trlist.serialNumber}}</td>
                                        <td>{{trlist.subCompanyName}}</td>
                                        <td>{{trlist.cityName}}</td>
                                        <td>{{trlist.backendMerchantCode}}</td>
                                        <td>{{trlist.backendMerchantName}}</td>
                                        <td>{{trlist.backendStoreCode}}</td>
                                        <td>{{trlist.backendStoreName}}</td>
                                        <td>{{trlist.merchantOperationID}}</td>
                                        <td>
                                            <span v-if="!trlist.existInBackend">{{trlist.merchantName}}</span>
                                        </td>
                                        <td>{{trlist.consumptionAmount/100 | currency ''}}</td>
                                        <td>{{trlist.discountAmount/100 | currency ''}}</td>
                                        <td>{{trlist.payAmount/100 | currency ''}}</td>
                                        <td>
                                            <!--<a v-link="{name:'limitaccount-info'}" v-if="trlist.limitDeduct>0||trlist.principalDeduct>0">{{trlist.limitDeduct/100 | currency ''}}</a>-->
                                            <!--<span v-else>{{trlist.limitDeduct/100 | currency ''}}</span>-->
                                            <span>{{trlist.limitDeduct/100 | currency ''}}</span>
                                        </td>
                                        <td>
                                            <!--<a v-link="{name:'limitaccount-info'}" v-if="trlist.limitDeduct>0||trlist.principalDeduct>0">{{trlist.principalDeduct/100 | currency ''}}</a>-->
                                            <!--<span v-else>{{trlist.principalDeduct/100 | currency ''}}</span>-->
                                            <span>{{trlist.principalDeduct/100 | currency ''}}</span>
                                        </td>
                                        <td>
                                            <a data-ksa="third_party_account_manage.search" @click="goThird(trlist.id,trlist.serialNumber)" v-if="trlist.activityOperationID!=0&&trlist.thirdPartyReceivable!=0">{{trlist.thirdPartyReceivable/100 | currency ''}}</a>
                                            <span v-else>0.00</span>
                                        </td>
                                        <td>{{trlist.merchantSubsidyShould/100 | currency ''}}</td>
                                        <td>{{trlist.subsidyWithhold/100 | currency ''}}</td>
                                        <td>
                                            <a data-ksa="subsidy_tax_rebate_detail_manage.search" v-link="{name:'subsidy-tax-rebate',params:{subsidyTaxRebateID:trlist.subsidyTaxRebateID}}" v-if="trlist.subsidyTaxRebateID>0">{{trlist.suspensionTax/100 | currency ''}}</a>
                                            <a data-ksa="subsidy_pay_detail_manage.search" v-link="{name:'subsidy-appropriation',params:{subsidyPayID:trlist.subsidyPayID}}" v-if="trlist.subsidyTaxRebateID==0&&trlist.suspensionTax!=0&&trlist.subsidyPayID>0">{{trlist.suspensionTax/100 | currency ''}}</a>
                                            <span v-if="trlist.subsidyTaxRebateID==0&&trlist.suspensionTax==0">{{trlist.suspensionTax/100 | currency ''}}</span>
                                            <span v-if="trlist.subsidyTaxRebateID==0&&trlist.suspensionTax!=0&&trlist.subsidyPayID==0">{{trlist.suspensionTax/100 | currency ''}}</span>
                                        </td>
                                        <td>
                                            <a data-ksa="subsidy_pay_detail_manage.search" v-link="{name:'subsidy-appropriation',params:{subsidyPayID:trlist.subsidyPayID}}" v-if="trlist.subsidyPayID!=0&&trlist.merchantSubsidyActual!=0">{{trlist.merchantSubsidyActual/100 | currency ''}}</a>
                                            <span v-else>{{trlist.merchantSubsidyActual/100 | currency ''}}</span>
                                        </td>
                                        <td>{{trlist.discountDiff/100 | currency ''}}</td>
                                        <td>{{trlist.collectionAmount/100 | currency ''}}</td>
                                        <td>{{trlist.commission33211/100 | currency ''}}</td>
                                        <td>{{trlist.entryAmount/100 | currency ''}}</td>
                                        <td>{{trlist.tradeTime | datetime}}</td>
                                        <td>
                                            <template v-if="!trlist.activityName">
                                                无
                                            </template>
                                            <a data-ksa="activity_manage.search" v-else v-link="{name:'activity-lists',params:{operationID:trlist.activityOperationID,name:trlist.activityName,osubcompanyID:trlist.subCompanyID}}">{{trlist.activityOperationID}}:{{trlist.activityName}}</a>
                                        </td>
                                        <td>
                                            <template v-if="trlist.type==1">
                                                正常交易
                                            </template>
                                            <template v-if="trlist.type==2">
                                                手工单
                                            </template>
                                            <template v-if="trlist.type==3">
                                                调账
                                            </template>
                                        </td>
                                        <td>
                                            <template v-if="trlist.type==2||trlist.type==3">
                                                <a href="{{origin}}/file/download/{{trlist.certificateId}}">下载</a>
                                            </template>
                                        </td>
                                        <td aria-label="{{trlist.remarks}}" v-bind:class="{'hint--top':(trlist.remarks!=null&&trlist.remarks.length>15)}">
                                            {{trlist.remarks | substring 15}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>合计：</td>
                                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                        <td>{{nums.consumptionAmount/100 | currency ''}}</td>
                                        <td>{{nums.discountAmount/100 | currency ''}}</td>
                                        <td>{{nums.payAmount/100 | currency ''}}</td>
                                        <td>{{nums.limitDeduct/100 | currency ''}}</td>
                                        <td>{{nums.principalDeduct/100 | currency ''}}</td>
                                        <td>{{nums.thirdPartyReceivable/100 | currency ''}}</td>
                                        <td>{{nums.merchantSubsidyShould/100 | currency ''}}</td>
                                        <td>{{nums.subsidyWithhold/100 | currency ''}}</td>
                                        <td>{{nums.suspensionTax/100 | currency ''}}</td>
                                        <td>{{nums.merchantSubsidyActual/100 | currency ''}}</td>
                                        <td>{{nums.discountDiff/100 | currency ''}}</td>
                                        <td>{{nums.collectionAmount/100 | currency ''}}</td>
                                        <td>{{nums.commission33211/100 | currency ''}}</td>
                                        <td>{{nums.entryAmount/100 | currency ''}}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </table>
                            </div>
                            <div style="max-height: 800px;overflow-x: hidden;" :style="{ width: tableWidth}">
                                <table class="table">
                                    <thead>
                                    <tr role="row">
                                        <th>交易ID</th>
                                        <th>交易流水号</th>
                                        <th>分公司</th>
                                        <th>城市</th>
                                        <th>商户号</th>
                                        <th>商户简称</th>
                                        <th>门店号</th>
                                        <th>门店名称</th>
                                        <th>商盟ID</th>
                                        <th>商盟商户名称</th>
                                        <th>消费金额</th>
                                        <th>可打折金额</th>
                                        <th>实付金额</th>
                                        <th>额度抵扣</th>
                                        <th>本金抵扣</th>
                                        <th>银行应补</th>
                                        <th>商户应补</th>
                                        <th>补贴代扣</th>
                                        <th>暂扣税金</th>
                                        <th>商户实补</th>
                                        <th>折扣差</th>
                                        <th>扣收金额</th>
                                        <th>导流佣金</th>
                                        <th>入账金额</th>
                                        <th>交易时间</th>
                                        <th>参与活动</th>
                                        <th>交易类型</th>
                                        <th>凭证</th>
                                        <th>备注</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(index,trlist) in tradeList" v-bind:class="{'odd':(index%2==0)}">
                                        <td>{{trlist.id}}</td>
                                        <td>{{trlist.serialNumber}}</td>
                                        <td>{{trlist.subCompanyName}}</td>
                                        <td>{{trlist.cityName}}</td>
                                        <td>{{trlist.backendMerchantCode}}</td>
                                        <td>{{trlist.backendMerchantName}}</td>
                                        <td>{{trlist.backendStoreCode}}</td>
                                        <td>{{trlist.backendStoreName}}</td>
                                        <td>{{trlist.merchantOperationID}}</td>
                                        <td>
                                            <span v-if="!trlist.existInBackend">{{trlist.merchantName}}</span>
                                        </td>
                                        <td>{{trlist.consumptionAmount/100 | currency ''}}</td>
                                        <td>{{trlist.discountAmount/100 | currency ''}}</td>
                                        <td>{{trlist.payAmount/100 | currency ''}}</td>
                                        <td>
                                            <!--<a v-link="{name:'limitaccount-info'}" v-if="trlist.limitDeduct>0||trlist.principalDeduct>0">{{trlist.limitDeduct/100 | currency ''}}</a>-->
                                            <!--<span v-else>{{trlist.limitDeduct/100 | currency ''}}</span>-->
                                            <span>{{trlist.limitDeduct/100 | currency ''}}</span>
                                        </td>
                                        <td>
                                            <!--<a v-link="{name:'limitaccount-info'}" v-if="trlist.limitDeduct>0||trlist.principalDeduct>0">{{trlist.principalDeduct/100 | currency ''}}</a>-->
                                            <!--<span v-else>{{trlist.principalDeduct/100 | currency ''}}</span>-->
                                            <span>{{trlist.principalDeduct/100 | currency ''}}</span>
                                        </td>
                                        <td>
                                            <a data-ksa="third_party_account_manage.search" @click="goThird(trlist.id,trlist.serialNumber)" v-if="trlist.activityOperationID!=0&&trlist.thirdPartyReceivable!=0">{{trlist.thirdPartyReceivable/100 | currency ''}}</a>
                                            <span v-else>0.00</span>
                                        </td>
                                        <td>{{trlist.merchantSubsidyShould/100 | currency ''}}</td>
                                        <td>{{trlist.subsidyWithhold/100 | currency ''}}</td>
                                        <td>
                                            <a data-ksa="subsidy_tax_rebate_detail_manage.search" v-link="{name:'subsidy-tax-rebate',params:{subsidyTaxRebateID:trlist.subsidyTaxRebateID}}" v-if="trlist.subsidyTaxRebateID>0">{{trlist.suspensionTax/100 | currency ''}}</a>
                                            <a data-ksa="subsidy_pay_detail_manage.search" v-link="{name:'subsidy-appropriation',params:{subsidyPayID:trlist.subsidyPayID}}" v-if="trlist.subsidyTaxRebateID==0&&trlist.suspensionTax!=0&&trlist.subsidyPayID>0">{{trlist.suspensionTax/100 | currency ''}}</a>
                                            <span v-if="trlist.subsidyTaxRebateID==0&&trlist.suspensionTax==0">{{trlist.suspensionTax/100 | currency ''}}</span>
                                            <span v-if="trlist.subsidyTaxRebateID==0&&trlist.suspensionTax!=0&&trlist.subsidyPayID==0">{{trlist.suspensionTax/100 | currency ''}}</span>
                                        </td>
                                        <td>
                                            <a data-ksa="subsidy_pay_detail_manage.search" v-link="{name:'subsidy-appropriation',params:{subsidyPayID:trlist.subsidyPayID}}" v-if="trlist.subsidyPayID!=0&&trlist.merchantSubsidyActual!=0">{{trlist.merchantSubsidyActual/100 | currency ''}}</a>
                                            <span v-else>{{trlist.merchantSubsidyActual/100 | currency ''}}</span>
                                        </td>
                                        <td>{{trlist.discountDiff/100 | currency ''}}</td>
                                        <td>{{trlist.collectionAmount/100 | currency ''}}</td>
                                        <td>{{trlist.commission33211/100 | currency ''}}</td>
                                        <td>{{trlist.entryAmount/100 | currency ''}}</td>
                                        <td>{{trlist.tradeTime | datetime}}</td>
                                        <td>
                                            <template v-if="!trlist.activityName">
                                                无
                                            </template>
                                            <a data-ksa="activity_manage.search" v-else v-link="{name:'activity-lists',params:{operationID:trlist.activityOperationID,name:trlist.activityName,osubcompanyID:trlist.subCompanyID}}">{{trlist.activityOperationID}}:{{trlist.activityName}}</a>
                                        </td>
                                        <td>
                                            <template v-if="trlist.type==1">
                                                正常交易
                                            </template>
                                            <template v-if="trlist.type==2">
                                                手工单
                                            </template>
                                            <template v-if="trlist.type==3">
                                                调账
                                            </template>
                                        </td>
                                        <td>
                                            <template v-if="trlist.type==2||trlist.type==3">
                                                <a href="{{origin}}/file/download/{{trlist.certificateId}}">下载</a>
                                            </template>
                                        </td>
                                        <td aria-label="{{trlist.remarks}}" v-bind:class="{'hint--top':(trlist.remarks!=null&&trlist.remarks.length>15)}">
                                            {{trlist.remarks | substring 15}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>合计：</td>
                                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                        <td>{{nums.consumptionAmount/100 | currency ''}}</td>
                                        <td>{{nums.discountAmount/100 | currency ''}}</td>
                                        <td>{{nums.payAmount/100 | currency ''}}</td>
                                        <td>{{nums.limitDeduct/100 | currency ''}}</td>
                                        <td>{{nums.principalDeduct/100 | currency ''}}</td>
                                        <td>{{nums.thirdPartyReceivable/100 | currency ''}}</td>
                                        <td>{{nums.merchantSubsidyShould/100 | currency ''}}</td>
                                        <td>{{nums.subsidyWithhold/100 | currency ''}}</td>
                                        <td>{{nums.suspensionTax/100 | currency ''}}</td>
                                        <td>{{nums.merchantSubsidyActual/100 | currency ''}}</td>
                                        <td>{{nums.discountDiff/100 | currency ''}}</td>
                                        <td>{{nums.collectionAmount/100 | currency ''}}</td>
                                        <td>{{nums.commission33211/100 | currency ''}}</td>
                                        <td>{{nums.entryAmount/100 | currency ''}}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    <div class="datatable-bottom">
                        <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" v-on:click="tradeDetailexcel" data-ksa="trade_detail_manage.export">Excel导出</a>
                        </div>

                        <div class="right">
                            <page :all="pageall"
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                        </div>
                    </div>
                </div>
                <div class="no-list" v-show="!tradeList.length&&searched">
                    请输入筛选条件查询交易数据！
                </div>
                <div class="no-list" v-show="!tradeList.length&&!searched">
                    未查询到交易明细数据！
                </div>
            </div>
        </div>
    </index>
</template>
<script>
    import model from '../../ajax/Transaction/trade_model'
    export default{
        props:{

        },
        data(){
            this.model=model(this);
            return{
                searched:false,
                origin:window.origin,
                leakFlag:false,
                searched:true,
                checkForm:{
                    subsidyPayId:"",
                    subsidyTaxRebateId:"",
                    subCompanyID:"",
                    cityID:"",
                    type:"",
                    startDate:"",
                    endDate:"",
                    startSettlementDate:"",
                    endSettlementDate:"",
                    merchantOperationID:"",
                    merchantName:"",
                    backendMerchantCode:"",
                    backendMerchantName:"",
                    backendStoreCode:"",
                    backendStoreName:"",
                    tradeDetailID:"",
                    serialNumber:"",
                    activityOperationID:'',
                    leakFlag:null,
                    pageIndex:1,
                    timeRange:'3',
                    pageSize:10
                },
                tableWidth:0,
                subcompanyList:[],
                pageall:1,
                select_merchantId:'',
                tradeList:[],
                cityList:[],
                merchantList:[],
                nums:{
                    "consumptionAmount":"",
                    "discountAmount":"",
                    "payAmount":"",
                    "limitDeduct":"",
                    "principalDeduct":"",
                    "thirdPartyReceivable":"",
                    "merchantSubsidyShould":"",
                    "suspensionTax":"",
                    "merchantSubsidyActual":"",
                    "discountDiff":"",
                    "collectionAmount":"",
                    "commission33211":"",
                    "entryAmount":""
                }
            }
        },
        methods:{
            changeleakFlag(){
                if(this.leakFlag){
                    this.checkForm.leakFlag=1
                }else{
                    this.checkForm.leakFlag=null
                }
            },
            quickCheck(){
                if(!this.checkForm.backendStoreCode||!this.checkForm.activityOperationID){
                    dialogs('info','门店号与活动ID为必填项！')
                    return;
                }
                this.$router.go({name:'quick-check', params:{
                    checkstartDate:this.checkForm.startDate,
                    checkendDate:this.checkForm.endDate,
                    checkbackendStoreCode:this.checkForm.backendStoreCode,
                    checkactivityOperationID:this.checkForm.activityOperationID
                }})
            },
            //获取交易记录
             getTradeList(data){
                 this.model.tradedetail(data)
                    .then((response)=>{
                         if(response.data.code==0){
                            this.$set('tradeList', response.data.data.list);
                            this.$set('nums',response.data.data.total);
                            this.$set('pageall', response.data.total);
                            this.$nextTick(()=>{
                                this.tableWidth=$('#datatable').width()+'px';
                            })
                        }
                    });
            },
            //获取分公司数据
            getSubcompany(){
                 this.$common_model.getcompany()
                    .then((response)=>{
                        if(response.data.code==0){
                            this.$set('subcompanyList', response.data.data);
                            if(response.data.data.length==1){
                                this.checkForm.subCompanyID=response.data.data[0].subCompanyID;
                            }
                        }
                    });
            },
            //获取城市数据
            getCity(_id){
                this.checkForm.cityID='';
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
            checkNew(){
                this.checkForm.pageIndex=1;
                this.query();
            },
            query() {
                if(sessionStorage.getItem('isHttpin')==1)return;
                //初始化
                this.searched=false;
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getTradeList(this.checkForm);
            },
            tradeDetailexcel() {
                if(!this.tradeList.length>0)return;
                //初始化
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.tradeDetailexcel+ $.param(this.checkForm));
            },
            goThird(_id,_serialNumber){
                this.model.skipToThird(_id)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.$router.go({'name':'third-info',params:{'id':response.data.data,'serialNumber':_serialNumber}});
                            }
                        })
            },
            getTime(){
                this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
            },
        },
        ready() {
            (this.$route.params.subsidyPayId==':subsidyPayId')?this.checkForm.subsidyPayId='' : this.checkForm.subsidyPayId=this.$route.params.subsidyPayId;
            (this.$route.params.subsidyTaxRebateId==':subsidyTaxRebateId')? this.checkForm.subsidyTaxRebateId='' : this.checkForm.subsidyTaxRebateId=this.$route.params.subsidyTaxRebateId;
            (this.$route.params.merchantOperationID==':merchantOperationID')?this.checkForm.merchantOperationID='' : this.checkForm.merchantOperationID=this.$route.params.merchantOperationID;
            (this.$route.params.merchantName==':merchantName')? this.checkForm.merchantName='' : this.checkForm.merchantName=this.$route.params.merchantName;
            (this.$route.params.activityOperationID==':activityOperationID')? this.checkForm.activityOperationID='' : this.checkForm.activityOperationID=this.$route.params.activityOperationID;
            (this.$route.params.serialNumber==':serialNumber')? this.checkForm.serialNumber='' : this.checkForm.serialNumber=this.$route.params.serialNumber;
            (this.$route.params.backendStoreCode==':backendStoreCode')? this.checkForm.backendStoreCode='' : this.checkForm.backendStoreCode=this.$route.params.backendStoreCode;
            this.getSubcompany();
            this.getTime();
            (this.$route.params.tradeCompanyId==':tradeCompanyId')? this.checkForm.subCompanyID='' : this.checkForm.subCompanyID=this.$route.params.tradeCompanyId;
            this.getCity();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            if(location.href.indexOf('/trade-info/:subsidyPayId/:subsidyTaxRebateId/:merchantOperationID/:merchantName/:activityOperationID/:serialNumber/:tradeCompanyId/:backendStoreCode')<0){
                this.query();
            }
        },
       watch:{
            'checkForm.pageIndex+checkForm.pageSize'(){
                this.query();
            }
       }
    }
</script>