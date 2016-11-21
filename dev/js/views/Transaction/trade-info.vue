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

                        <select class="form-control" v-model="checkForm.timeRange" @change="getTime">
                            <option value="0">昨天</option>
                            <option value="1">最近一周</option>
                            <option value="2">最近一个月</option>
                            <option value="3">最近三个月</option>
                            <option value="4">自定义时间</option>
                        </select>

                        <div  v-show="checkForm.timeRange==4" class="inline">
                            <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                            <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                        </div>

                        <input type="text" class="form-control" v-model="checkForm.subsidyPayId" v-limitnumber="checkForm.subsidyPayId" placeholder="补贴划付ID">

                        <input type="text" class="form-control" v-model="checkForm.subsidyTaxRebateId" v-limitnumber="checkForm.subsidyTaxRebateId" placeholder="补贴退税ID">

                        <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="商户ID" v-limitnumber="checkForm.merchantOperationID">

                        <input type="text" class="form-control" v-model="checkForm.merchantName" placeholder="商户名">

                        <input type="text" class="form-control" v-model="checkForm.tradeDetailID" v-limitnumber="checkForm.tradeDetailID" placeholder="交易ID">

                        <input type="text" class="form-control" v-model="checkForm.serialNumber" placeholder="交易流水号">

                        <input type="number" class="form-control" v-model="checkForm.phone" placeholder="手机号">

                        <input type="text" class="form-control" placeholder="活动ID" v-limitnumber="checkForm.activityOperationID" v-model="checkForm.activityOperationID" >  
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="query" data-ksa="trade_detail_manage.search">查询</a>
                    </div>
                </div>

                <div v-cloak v-show="!!tradeList.length" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table">
                            <thead>
                            <tr role="row">
                                <th>交易ID</th>
                                <th>交易流水号</th>
                                <th>分公司</th>
                                <th>城市</th>
                                <th>商户ID</th>
                                <th>商户名称</th>
                                <th>消费金额</th>
                                <th>折扣金额</th>
                                <th>实付金额</th>
                                <th>额度抵扣</th>
                                <th>本金抵扣</th>
                                <th>三方应收</th>
                                <th>商户应补</th>
                                <th>退税款</th>
                                <th>商户实补</th>
                                <th>折扣差</th>
                                <th>扣收金额</th>
                                <th>33211佣金</th>
                                <th>入账金额</th>
                                <th>交易时间</th>
                                <th>手机号</th>
                                <th>卡号</th>
                                <th>参与活动</th>
                                <th>交易类型</th>
                                <th>操作</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(index,trlist) in tradeList" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.id}}</td>
                                <td>{{trlist.serialNumber}}</td>
                                <td>{{trlist.subCompanyName}}</td>
                                <td>{{trlist.cityName}}</td>
                                <td>{{trlist.merchantOperationID}}</td>
                                <td>{{trlist.merchantName}}</td>
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
                                <td>{{trlist.consumptionPhone}}</td>
                                <td>{{trlist.consumptionAccountNumber}}</td>
                                <td>
                                    <template v-if="!trlist.activityName">
                                        无
                                    </template>
                                    <a data-ksa="activity_manage.search" v-else v-link="{name:'activity-lists',params:{operationID:trlist.activityOperationID,name:trlist.activityName}}">{{trlist.activityOperationID}}:{{trlist.activityName}}</a>
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
                                        <a href="{{origin}}/file/download/{{trlist.certificateId}}">详情</a>
                                    </template>
                                </td>
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>合计：</td><td></td><td></td><td></td><td></td>
                                <td>{{nums.consumptionAmount/100 | currency ''}}</td>
                                <td>{{nums.discountAmount/100 | currency ''}}</td>
                                <td>{{nums.payAmount/100 | currency ''}}</td>
                                <td>{{nums.limitDeduct/100 | currency ''}}</td>
                                <td>{{nums.principalDeduct/100 | currency ''}}</td>
                                <td>{{nums.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{nums.merchantSubsidyShould/100 | currency ''}}</td>
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
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
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
                
                <div style="padding: 30px;font-size: 16px;text-align: center" v-else>
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
                origin:window.origin,
                checkForm:{
                    subsidyPayId:"",
                    subsidyTaxRebateId:"",
                    subCompanyID:"",
                    cityID:"",
                    type:"",
                    startDate:"",
                    endDate:"",
                    merchantOperationID:"",
                    merchantName:"",
                    tradeDetailID:"",
                    serialNumber:"",
                    phone:"",
                    activityOperationID:'',
                    pageIndex:1,
                    timeRange:'3',
                    pageSize:10
                },
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
            //获取交易记录
             getTradeList(data){
                 this.model.tradedetailsum(data)
                         .then((response)=>{
                             (response.data.code==0)?this.$set('nums',response.data.data):null;
                         });
                 this.model.tradedetail(data)
                    .then((response)=>{
                         if(response.data.code==0){
                            this.$set('tradeList', response.data.data)
                            this.$set('pageall', response.data.total)
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
            query() {
                debugger
                if(sessionStorage.getItem('isHttpin')==1)return;
                //初始化
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
            }
        },
        ready() {
            (this.$route.params.subsidyPayId==':subsidyPayId')?this.checkForm.subsidyPayId='' : this.checkForm.subsidyPayId=this.$route.params.subsidyPayId;
            (this.$route.params.subsidyTaxRebateId==':subsidyTaxRebateId')? this.checkForm.subsidyTaxRebateId='' : this.checkForm.subsidyTaxRebateId=this.$route.params.subsidyTaxRebateId;
            (this.$route.params.merchantOperationID==':merchantOperationID')?this.checkForm.merchantOperationID='' : this.checkForm.merchantOperationID=this.$route.params.merchantOperationID;
            (this.$route.params.merchantName==':merchantName')? this.checkForm.merchantName='' : this.checkForm.merchantName=this.$route.params.merchantName;
            (this.$route.params.activityOperationID==':activityOperationID')? this.checkForm.activityOperationID='' : this.checkForm.activityOperationID=this.$route.params.activityOperationID;
            (this.$route.params.serialNumber==':serialNumber')? this.checkForm.serialNumber='' : this.checkForm.serialNumber=this.$route.params.serialNumber;
            this.getSubcompany();
            this.getCity();
            this.getTime();
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