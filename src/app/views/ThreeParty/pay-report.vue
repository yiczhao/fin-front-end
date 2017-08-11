<template>
    <index :title="'划付报表'"
           :ptitle="'银行管理'"
           :hname="'third-party'"
           :isshow="'isshow'">
        <div class="content Abnormal-transaction" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li class="active" data-ksa="third_party_account_manage" class="active"><a>划付报表</a></li>
                    <li data-ksa="third_party_account_manage"><a v-link="{name:'third-party'}">银行管理</a></li>
                    <li data-ksa="contract" ><a v-link="{name:'contract-management-info'}">合同管理</a></li>
                    <li data-ksa="activity_income_cost_manage"><a v-link="{name:'activity-cost-management'}">活动收入成本管理</a></li>
                    <li data-ksa="tax_rate"><a v-link="{name:'taxRate'}">税率管理</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="checkForm.subCompanyId" @change="getCity(checkForm.subCompanyId)">
                                <option value="">全部分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                            <select class="form-control" v-model="checkForm.cityId">
                                <option value="">全部城市</option>
                                <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                            </select>
                            <input type="text" class="form-control" v-model="checkForm.backendMerchantCode" placeholder="商户号">
                            <input type="text" class="form-control" v-model="checkForm.backendMerchantName" placeholder="商户简称">
                            <input type="text" class="form-control" v-model="checkForm.storeCode" placeholder="门店号">
                            <input type="text" class="form-control" v-model="checkForm.storeName" placeholder="门店名称">
                            <input type="text" class="form-control" v-model="checkForm.operationId" placeholder="商盟ID（多个ID以逗号隔开）">
                            <input type="text" class="form-control" v-model="checkForm.merchantName" placeholder="商盟商户名称">
                            <input type="text" class="form-control" v-model="checkForm.activityIds" placeholder="活动ID（多个ID以逗号隔开）" >
                            <input type="text" class="form-control" v-model="checkForm.activityName" placeholder="活动名称">
                            <div class="inline">
                                <span>时间</span>
                                <datepicker :value.sync="checkForm.beginDate"></datepicker>
                                <span>至</span>
                                <datepicker :value.sync="checkForm.endDate"></datepicker>
                            </div>
                        </form>
                    </div>
                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="checkNew" data-ksa="exception_trade_manage.search">查询</a>
                    </div>
                </div>

                <div v-cloak v-show="!!tradeList.length" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>分公司</th>
                                <th>城市</th>
                                <th>活动ID</th>
                                <th>活动名称</th>
                                <th>商户号</th>
                                <th>商户简称</th>
                                <th>门店号</th>
                                <th>门店名称</th>
                                <th>商盟ID</th>
                                <th>商盟商户名称</th>
                                <th>交易笔数</th>
                                <th>银行应补</th>
                                <th>商户应补</th>
                                <th>补贴代扣</th>
                                <th>商户实补</th>
                                <th>暂扣税金</th>
                                <th>导流佣金</th>
                                <th>已划付</th>
                                <th>待划付</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr  v-for="(index,trlist) in tradeList" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.subCompanyName }}</td>
                                <td>{{trlist.cityName}}</td>
                                <td>{{trlist.activityId}}</td>
                                <td>{{trlist.activityName }}</td>
                                <td>{{trlist.backendMerchantCode}}</td>
                                <td>{{trlist.backendMerchantName}}</td>
                                <td>{{trlist.backendStoreCode}}</td>
                                <td>{{trlist.backendStoreName}}</td>
                                <td>{{trlist.merchantOperationID }}</td>
                                <td><span v-if="!trlist.backendStoreCode">{{trlist.merchantName}}</span></td>
                                <td>
                                    <span>{{trlist.consumptionCount}}</span>
                                </td>
                                <td>
                                    {{trlist.thirdPartyReceivable/100 | currency ''}}
                                </td>
                                <td>{{trlist.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{trlist.subsidyWithhold/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyActual/100 | currency ''}}</td>
                                <td>{{trlist.suspensionTax/100 | currency ''}}</td>
                                <td>{{trlist.commission33211/100 | currency ''}}</td>
                                <td>{{trlist.paidAmount/100 | currency '' }}</td>
                                <td>{{trlist.unpaidAmount/100 | currency ''}}</td>
                            </tr>
                            <tr>
                                <td>合计：</td>
                                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                <td></td>
                                <td>{{nums.consumptionCount}}</td>
                                <td>{{nums.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{nums.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{nums.subsidyWithhold/100 | currency ''}}</td>
                                <td>{{nums.merchantSubsidyActual/100 | currency ''}}</td>
                                <td>{{nums.suspensionTax/100 | currency ''}}</td>
                                <td>{{nums.commission33211/100 | currency ''}}</td>
                                <td>{{nums.paidAmount/100 | currency ''}}</td>
                                <td>{{nums.unpaidAmount/100 | currency ''}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">
                       <div class="left">
                             <a class="icon-file-excel" style="line-height: 30px;" v-on:click="excel" data-ksa="exception_trade_manage.export">Excel导出</a>
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
                    未查询到划付报表数据！
                </div>
            </div>
        </div>
    </index>
</template>

<script>
    import model from '../../ajax/ThreeParty/pay_report'
    export default{
        data(){
            this.model=model(this);
            return{
                checkForm:{
                    subCompanyId:"",
                    cityId:"",
                    startDate:"",
                    beginDate:"",
                    operationId:"",
                    merchantName:"",
                    storeCode:"",
                    storeName:"",
                    backendMerchantCode:"",
                    backendMerchantName:'',
                    activityIds:'',
                    activityName:'',
                    pageIndex:1,
                    pageSize:10
                },
                subcompanyList:[],
                pageall:1,
                cityList:[],
                tradeList:[],
                nums:{
                    "consumptionCount":"",
                    "thirdPartyReceivable":"",
                    "merchantSubsidyShould":"",
                    "subsidyWithhold":"",
                    "merchantSubsidyActual":"",
                    "suspensionTax":"",
                    "commission33211":"",
                    "paidAmount":"",
                    "unpaidAmount":"",
                    "consumptionCount":""
                }
            }
        },
        methods:{
            //获取交易记录
            getTradeList(data){
                this.model.payReportList(data)
                        .then((response)=>{
                                if(response.data.code==0){
                                this.$set('tradeList', response.data.data)
                                this.$set('pageall', response.data.total)
                            }
                        });
                this.model.payReportTotal(data)
                        .then((response)=>{
                            (response.data.code==0)?this.$set('nums',response.data.data):null;
                        })
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
            checkNew(){
                this.checkForm.pageIndex=1;
                this.query();
            },
            query() {
                if(sessionStorage.getItem('isHttpin')==1)return;
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getTradeList(this.checkForm);

            },
            excel(){
                if(!this.tradeList.length>0)return;
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.payReportExcel+ $.param(this.checkForm));
            },
        },
        ready() {
            this.getSubcompany();
            this.getCity();
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