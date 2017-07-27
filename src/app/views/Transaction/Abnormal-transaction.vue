<template>
    <index :title="'异常交易'"
           :ptitle="'交易管理'"
           :hname="'trade-info'"  
           :isshow="'isshow'">
        <div class="content Abnormal-transaction" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="trade_detail_manage"><a v-link="{name:'trade-info'}">交易明细</a></li>
                    <li data-ksa="adjust_trade_detail_pre_manage"><a v-link="{name:'adjust-trade-detailpre'}">调账管理</a></li>
                    <li data-ksa="manual_trade_detail"><a v-link="{name:'manual-trade-detail'}">手工单管理</a></li>
                    <li data-ksa="manually_settlement"><a v-link="{name:'manually-settlement'}">手工结算</a></li>
                    <li data-ksa="exception_trade_manage" class="active"><a v-link="{name:'Abnormal-transaction'}">异常交易</a></li>
                    <li data-ksa="exception_trade_white_list_manage"><a v-link="{name:'white-lists'}">异常白名单</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="checkForm.subCompanyID" @change="getCity(checkForm.subCompanyID)">
                                <option value="">全部分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>

                            <select class="form-control" v-model="checkForm.cityID">
                                <option value="">全部城市</option>
                                <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                            </select>

                            <select class="form-control" v-model="checkForm.isHandled">
                                <option value="">请选择状态</option>
                                <option value="0">待处理</option>
                                <option value="1">已处理</option>
                            </select>

                            <select class="form-control" v-model="checkForm.timeRange">
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

                            <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="商户ID" v-limitnumber="checkForm.merchantOperationID">

                            <input type="text" class="form-control" v-model="checkForm.merchantName" placeholder="商户名">

                            <input type="text" class="form-control" v-model="checkForm.tradeDetailID" v-limitnumber="checkForm.tradeDetailID" placeholder="交易ID">

                            <input type="text" class="form-control" v-model="checkForm.serialNumber" placeholder="交易流水号">

                            <input type="number" class="form-control" v-model="checkForm.phone" placeholder="手机号">

                            <input type="text" class="form-control" placeholder="活动ID" v-limitnumber="checkForm.activityOperationID" v-model="checkForm.activityOperationID">
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
                                <th>交易ID</th>
                                <th>交易流水号</th>
                                <th>分公司</th>
                                <th>城市</th>
                                <th>商户ID</th>
                                <th>商户名称</th>
                                <th>消费金额</th>
                                <th>可打折金额</th>
                                <th>实付金额</th>
                                <th>额度抵扣</th>
                                <th>本金抵扣</th>
                                <th>银行应补</th>
                                <th>商户应补</th>
                                <th>折扣差</th>
                                <th>扣收金额</th>
                                <th>导流佣金</th>
                                <th>交易时间</th>
                                <th>手机号</th>
                                <th>卡号</th>
                                <th>参与活动</th>
                                <th>状态</th>
                                <th>操作</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr  v-for="(index,trlist) in tradeList" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.tradeDetailID}}</td>
                                <td><a v-link="{name:'trade-info',params:{serialNumber:trlist.serialNumber}}">{{trlist.serialNumber}}</a></td>
                                <td>{{trlist.subCompanyName}}</td>
                                <td>{{trlist.cityName}}</td>
                                <td>{{trlist.merchantOperationID}}</td>
                                <td>{{trlist.merchantName}}</td>
                                <td>{{trlist.consumptionAmount/100 | currency ''}}</td>
                                <td>{{trlist.discountAmount/100 | currency ''}}</td>
                                <td>{{trlist.payAmount/100 | currency ''}}</td>
                                <td>
                                    <span>{{trlist.limitDeduct/100 | currency ''}}</span>
                                </td>
                                <td>
                                    <span>{{trlist.principalDeduct/100 | currency ''}}</span>
                                </td>
                                <td>
                                    {{trlist.thirdPartyReceivable/100 | currency ''}}
                                </td>
                                <td>{{trlist.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{trlist.discountDiff/100 | currency ''}}</td>
                                <td>{{trlist.collectionAmount/100 | currency ''}}</td>
                                <td>{{trlist.commission33211/100 | currency ''}}</td>
                                <td>{{trlist.tradeTime | datetime}}</td>
                                <td>{{trlist.consumptionPhone}}</td>
                                <td>{{trlist.consumptionAccountNumber}}</td>
                                <td> <a data-ksa="activity_manage.search" v-link="{name:'activity-lists',params:{operationID:trlist.activityOperationID,name:trlist.activityName,osubcompanyID:trlist.subCompanyID}}">{{trlist.activityOperationID}}:{{trlist.activityName}}</a></td>
                                <td>
                                    <span v-if="trlist.isHandled==0" style="color:red;">
                                        待处理
                                    </span>
                                    <span v-if="trlist.isHandled==1" style="color:green;">
                                        已处理
                                    </span>
                                </td>
                                <td>
                                    <template v-if="trlist.isHandled==0">
                                        <a type="button" @click="back(trlist.id)"  data-ksa="exception_trade_manage.handle">处理异常</a>
                                    </template>
                                </td>
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            <tr>
                                <td>合计：</td>
                                <td></td><td></td><td></td><td></td><td></td>
                                <td>{{nums.consumptionAmount/100 | currency ''}}</td>
                                <td>{{nums.discountAmount/100 | currency ''}}</td>
                                <td>{{nums.payAmount/100 | currency ''}}</td>
                                <td>{{nums.limitDeduct/100 | currency ''}}</td>
                                <td>{{nums.principalDeduct/100 | currency ''}}</td>
                                <td>{{nums.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{nums.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{nums.discountDiff/100 | currency ''}}</td>
                                <td>{{nums.collectionAmount/100 | currency ''}}</td>
                                <td>{{nums.commission33211/100 | currency ''}}</td>
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
                    未查询到交易明细数据！
                </div>

                <content-dialog
                        :show.sync="modal_waring" :is-cancel="true" :type.sync="'infos'"
                        :title.sync="'处理异常'" @kok="backTrue" @kcancel="modal_waring = false"
                        >
                        <div class="modal-body">
                            <div class="form-group" style="overflow: hidden;">
                                <label class="col-lg-3 control-label"><i>*</i>备注</label>
                                <div class="col-lg-10">
                                    <textarea rows="5" cols="5" class="form-control" v-model="remarks" placeholder=""></textarea>
                                </div>
                            </div>
                            <div class="form-group tc">
                                <span v-show="!remarks&&fires" class="validation-error-label">
                                  请填写备注
                                </span>
                            </div>
                        </div>
                </content-dialog>
            </div>
        </div>
    </index>
</template>

<script>
    import model from '../../ajax/Transaction/abnormal'
    export default{
        data(){
            this.model=model(this);
            return{
                modal_waring: false,
                checkForm:{
                    subCompanyID:"",
                    cityID:"",
                    isHandled:"0",
                    startDate:"",
                    endDate:"",
                    merchantOperationID:"",
                    merchantName:"",
                    tradeDetailID:"",
                    serialNumber:"",
                    phone:"",
                    activityOperationID:'',
                    pageIndex:1,
                    pageSize:10,
                    timeRange:'3'
                },
                accountId:'',
                subcompanyList:[],
                pageall:1,
                cityList:[],
                tradeList:[],
                remarks:'',
                fires:false,
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
                this.model.abnormaldetail(data)
                        .then((response)=>{
                                if(response.data.code==0){
                                this.$set('tradeList', response.data.data)
                                this.$set('pageall', response.data.total)
                            }
                        });
                this.model.abnormaltotal(data)
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
                $(".modal").modal("hide");
                //初始化
                if (this.checkForm.startDate=="" && this.checkForm.endDate=="") {
                    this.checkForm.startDate=init_date('3')[0];
                    this.checkForm.endDate=init_date('3')[1];
                }
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getTradeList(this.checkForm);

            },
            excel(){
                if(!this.tradeList.length>0)return;
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.abnormalexcel+ $.param(this.checkForm));
            },
            back(a){
                this.remarks='';
                this.fires=false;
                this.accountId=a;
                this.modal_waring = true;
            },
            backTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.remarks==''){this.fires=true;return;}
                let data={
                    'id':this.accountId,
                    'remarks':this.remarks,
                }
                this.model.abnormalhandle(data)
                        .then( (response)=> {
                            if(response.data.code==0){
                                this.query();
                                dialogs('success','已处理！');
                                this.modal_waring = false;
                            }
                    })
            }
        },
        ready() {
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