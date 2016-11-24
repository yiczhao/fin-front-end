<template>
    <index :title="'手工结算'"
           :ptitle="'交易管理'"
           :hname="'manually-settlement'"
           :isshow="'isshow'">
        <div class="content manually-settlement" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="trade_detail_manage"><a v-link="{name:'trade-info'}">交易明细</a></li>
                    <li data-ksa="adjust_trade_detail_pre_manage"><a v-link="{name:'adjust-trade-detailpre'}">调账管理</a></li>
                    <li data-ksa="manual_trade_detail"><a v-link="{name:'manual-trade-detail'}">手工单管理</a></li>
                    <li class="active" data-ksa="manually_settlement"><a v-link="{name:'manually-settlement'}">手工结算</a></li>
                    <li data-ksa="exception_trade_manage"><a v-link="{name:'Abnormal-transaction'}">异常交易</a></li>
                    <li data-ksa="exception_trade_white_list_manage"><a v-link="{name:'white-lists'}">异常白名单</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" v-on:click="payApply" data-ksa="manually_settlement.apply_pay">申请划付</a>
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
                        <input type="text" class="form-control" v-model="checkForm.merchantOperationIDs" placeholder="商户ID（多个ID以逗号隔开）" v-limitids="checkForm.merchantOperationIDs">
                        <input type="text" class="form-control" v-model="checkForm.merchantName" placeholder="商户名">
                        <input type="text" class="form-control" v-model="checkForm.tradeDetailID" placeholder="交易ID" v-limitnumber="checkForm.tradeDetailID">
                        <input type="text" class="form-control" v-model="checkForm.serialNumber" placeholder="交易流水号">
                        <input type="number" class="form-control" v-model="checkForm.phone" placeholder="手机号">
                        <input type="text" class="form-control" placeholder="活动ID（多个ID以逗号隔开）" v-limitids="checkForm.activityOperationIDs" v-model="checkForm.activityOperationIDs">
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="checkNew" data-ksa="manually_settlement.search">查询</a>
                    </div>
                </div>

                <div v-cloak v-show="tradeList.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
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
                                <td><span>{{trlist.limitDeduct/100 | currency ''}}</span></td>
                                <td><span>{{trlist.principalDeduct/100 | currency ''}}</span></td>
                                <td>{{trlist.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{trlist.suspensionTax/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyActual/100 | currency ''}}</td>
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
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            </tbody>
                            <tr role="row" v-if="nums!=''" >
                                <td>合计：</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><b>{{nums.consumptionAmount/100 | currency ''}}</b></td>
                                <td><b>{{nums.discountAmount/100 | currency ''}}</b></td>
                                <td><b>{{nums.payAmount/100 | currency ''}}</b></td>
                                <td><b>{{nums.limitDeduct/100 | currency ''}}</b></td>
                                <td><b>{{nums.principalDeduct/100 | currency ''}}</b></td>
                                <td><b>{{nums.thirdPartyReceivable/100 | currency ''}}</b></td>
                                <td><b>{{nums.merchantSubsidyShould/100 | currency ''}}</b></td>
                                <td><b>{{nums.suspensionTax/100 | currency ''}}</b></td>
                                <td><b>{{nums.merchantSubsidyActual/100 | currency ''}}</b></td>
                                <td><b>{{nums.discountDiff/100 | currency ''}}</b></td>
                                <td><b>{{nums.collectionAmount/100 | currency ''}}</b></td>
                                <td><b>{{nums.commission33211/100 | currency ''}}</b></td>
                                <td><b>{{nums.entryAmount/100 | currency ''}}</b></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>

                    <div class="datatable-bottom">
                       <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" v-on:click="manuallyexcel" data-ksa="manually_settlement.export">Excel导出</a>
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
                    未查询到手工结算数据！
                </div>

                <content-dialog
                        :show.sync="modal_batch" :is-button="false" :type.sync="'infos'"
                        :title.sync="'申请划付'"
                >
                    <div class="form-group">
                        <label style="width:18%;text-align:right;" class="control-label">时间：</label>
                        <select class="form-control" style="display: inline-block;width: 80%;" v-model="batchData.timeRange" @change="getbatchDataTime">
                            <option value="0">昨天</option>
                            <option value="1">最近一周</option>
                            <option value="2">最近一个月</option>
                            <option value="3">最近三个月</option>
                            <option value="4">自定义时间</option>
                        </select>
                        <div style="width: 80%;margin: 15px 0 0 19%;" v-show="batchData.timeRange==4">
                            <datepicker  :readonly="true" :value.sync="batchData.startDate" format="YYYY-MM-DD"></datepicker>至
                            <datepicker  :readonly="true" :value.sync="batchData.endDate" format="YYYY-MM-DD"></datepicker>
                        </div>
                    </div>
                    <div class="form-group">
                        <label style="width:18%;text-align:right;position: relative;top: -95px;" class="control-label">活动ID：</label>
                        <textarea style="display: inline-block;width: 80%;" rows="5" cols="5" class="form-control" v-limitids="batchData.activityOperationIDs" v-model="batchData.activityOperationIDs"></textarea>
                    </div>
                    <div class="form-group">
                        <label style="width:18%;text-align:right;position: relative;top: -95px;" class="control-label">商户ID：</label>
                        <textarea style="display: inline-block;width: 80%;" rows="5" cols="5" class="form-control" v-limitids="batchData.merchantOperationIDs" v-model="batchData.merchantOperationIDs"></textarea>
                    </div>
                    <div class="form-group tc">
                        <a @click="payApplyTrue" class="btn btn-primary">下一步</a>
                    </div>
                </content-dialog>
            </div>
        </div>
    </index>
</template>

<script>
    import model from '../../ajax/Transaction/manually_model'
    export default{
        data(){
            this.model=model(this);
            return{
                origin:window.origin,
                checkedIds:[],
                checkForm:{
                    subCompanyID:"",
                    cityID:"",
                    startDate:"",
                    endDate:"",
                    merchantOperationIDs:"",
                    merchantName:"",
                    tradeDetailID:"",
                    serialNumber:"",
                    phone:"",
                    activityOperationIDs:'',
                    pageIndex:1,
                    timeRange:'3',
                    pageSize:10
                },
                subcompanyList:[],
                pageall:1,
                tradeList:[],
                cityList:[],
                merchantList:[],
                nums:{},
                applyPayInfo:{

                },
                show:false,
                modal_batch:false,
                submitId:[],
                payTypes:'',
                batchData:{
                    timeRange:'3',
                    startDate:'',
                    endDate:'',
                    activityOperationIDs:'',
                    merchantOperationIDs:''
                },
                mergePay:''
            }
        },
        methods:{
            //获取交易记录
             getTradeList(data){
                 this.model.manuallysum(data)
                         .then((response)=>{
                             (response.data.code==0)?this.$set('nums',response.data.data):null;
                         });
                 this.model.manually_list(data)
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
            checkNew(){
                this.checkForm.pageIndex=1;
                this.query();
            },
            query() {
                if(sessionStorage.getItem('isHttpin')==1)return;
                //初始化
                this.show=false;
                this.checkedIds=[];
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getTradeList(this.checkForm);
            },
            manuallyexcel() {
                if(!this.tradeList.length>0)return;
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.manuallyexcel+ $.param(this.checkForm));
            },
            payApply(){
                this.batchData={
                    timeRange:this.checkForm.timeRange,
                    startDate:this.checkForm.startDate,
                    endDate:this.checkForm.endDate,
                    activityOperationIDs:this.checkForm.activityOperationIDs,
                    merchantOperationIDs:this.checkForm.merchantOperationIDs
                }
                this.modal_batch=true;
            },
            payApplyTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.batchData.merchantOperationIDs==''&&this.batchData.activityOperationIDs==''){
                    dialogs('info','商户ID和活动ID不能都为空！');
                    return false
                }
                this.model.manuallySettlement_list(this.batchData)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.checkForm.merchantOperationIDs=this.batchData.merchantOperationIDs;
                                this.checkForm.activityOperationIDs=this.batchData.activityOperationIDs;
                                back_json.saveArray(this.$route.path,this.checkForm);
                                sessionStorage.setItem('manuallybatchData',JSON.stringify(this.batchData));
                                this.$router.go({'name':'manually-settlement-batchpay'});
                            }
                        });
            },
            getTime(){
                this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
            },
            getbatchDataTime(){
                this.batchData.startDate=init_date(this.batchData.timeRange)[0];
                this.batchData.endDate=init_date(this.batchData.timeRange)[1];
            }
        },
        ready() {
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