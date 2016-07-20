<template>
    <index :title="'异常交易'"
           :ptitle="'交易管理'"
           :hname="'trade-info'"  
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <select class="form-control" v-model="subCompanyID" @change="getCity(subCompanyID)">
                                <option value="">全部分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="cityID">
                                <option value="">全部城市</option>
                                <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="isHandled">
                                <option value="">请选择状态</option>
                                <option value="0">待处理</option>
                                <option value="1">已处理</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="timeRange">
                                <option value="0">昨天</option>
                                <option value="1">最近一周</option>
                                <option value="2">最近一个月</option>
                                <option value="3">最近三个月</option>
                                <option value="4">自定义时间</option>
                            </select>
                        </div>
                        <div class="form-group" v-show="timeRange==4">
                            <datepicker  :readonly="true" :value.sync="startDate" format="YYYY-MM-DD"></datepicker>至
                            <datepicker  :readonly="true" :value.sync="endDate" format="YYYY-MM-DD"></datepicker>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="merchantOperationID" placeholder="商户ID"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="merchantName" placeholder="商户名">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="id" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"  placeholder="交易ID">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="serialNumber" placeholder="交易流水号">
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control" v-model="phone" placeholder="手机号">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="活动ID" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" v-model="activityOperationID">
                        </div>
                        <div class="form-group">
                            <input type="button" class="btn btn-info" v-on:click="query" value="查询">
                        </div>
                    </form>
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
                                <th>折扣差</th>
                                <th>扣收金额</th>
                                <th>33211佣</th>
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
                            <tr  v-for="trlist in tradeList">
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
                                <td> <a v-link="{name:'activity-lists',params:{operationID:trlist.activityOperationID,name:trlist.activityName}}">{{trlist.activityOperationID}}:{{trlist.activityName}}</a></td>
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
                                        <a data-toggle="modal" data-target="#modal_waring" type="button" @click="back(trlist.id)" >处理异常</a>
                                    </template>
                                </td>
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            </tbody>
                            <tr role="row">
                                <th></th>
                                <th>合计：</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th><b>{{nums.consumptionAmount/100 | currency ''}}</b></th>
                                <th><b>{{nums.discountAmount/100 | currency ''}}</b></th>
                                <th><b>{{nums.payAmount/100 | currency ''}}</b></th>
                                <th><b>{{nums.limitDeduct/100 | currency ''}}</b></th>
                                <th><b>{{nums.principalDeduct/100 | currency ''}}</b></th>
                                <th><b>{{nums.thirdPartyReceivable/100 | currency ''}}</b></th>
                                <th><b>{{nums.merchantSubsidyShould/100 | currency ''}}</b></th>
                                <th><b>{{nums.discountDiff/100 | currency ''}}</b></th>
                                <th><b>{{nums.collectionAmount/100 | currency ''}}</b></th>
                                <th><b>{{nums.commission33211/100 | currency ''}}</b></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </table>
                    </div>
                    <div class="datatable-footer">
                        <page :all="pageall"
                              :cur.sync="pagecur"
                              :page_size.sync="page_size">
                        </page>
                    </div>
                </div>
                <div style="padding: 30px;font-size: 16px;text-align: center" v-else>
                    未查询到交易明细数据！
                </div>

                <div id="modal_waring" data-backdrop="static" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">处理异常</h5>
                            </div>
                            <div class="modal-body">
                                <div class="form-group" style="overflow: hidden;">
                                    <label class="col-lg-3 control-label"><i>*</i>备注</label>
                                    <div class="col-lg-10">
                                        <textarea rows="5" cols="5" class="form-control" v-model="remarks" placeholder=""></textarea>
                                    </div>
                                </div>
                                <div class="form-group tc">
                                    <button type="button" @click="backTrue" class="btn btn-primary">确认</button>
                                </div>
                                <div class="form-group tc">
                                    <span v-show="!remarks&&fires" class="validation-error-label">
                                      请填写备注
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </index>
</template>
<style lang="sass" scoped>
    .form-group{
        text-align: left;
    }
    .form-group.tc{
        text-align: center;
    }
    .modal-body .form-control{
        text-align: left;
        display: inline-block;
    }
    .modal-body label{
        width:13%;
        display: inline-block;
        text-align: right;
    }
    .modal-body label i{
        color:red;
    }
    .modal-body button{
        width:35%;
    }
    .validation-error-label{
        display: inline-block;
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/Transaction/abnormal'
    export default{
        data(){
            this.model=model(this);
            return{
                accountId:'',
                subCompanyID:"",
                cityID:"",
                isHandled:"0",
                timeRange:'1',
                startDate:"",
                endDate:"",
                merchantOperationID:"",
                merchantName:"",
                id:"",
                serialNumber:"",
                phone:"",
                activityOperationID:'',
                subcompanyList:[],
                pageall:1,
                pagecur:1,
                page_size:10,
                pageIndex:1,
                pageSize:10,
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
            query() {
                if(sessionStorage.getItem('isHttpin')==1)return;
                $(".modal").modal("hide");
                //初始化
                if (this.startDate=="" && this.endDate=="") {
                    this.startDate=init_date('1')[0];
                    this.endDate=init_date('1')[1];
                }
                let data={
                    subCompanyID:this.subCompanyID,
                    cityID:this.cityID,
                    isHandled:this.isHandled,
                    merchantOperationID:this.merchantOperationID,
                    merchantName:this.merchantName,
                    tradeDetailID:this.id,
                    serialNumber:this.serialNumber,
                    phone:this.phone,
                    activityOperationID:this.activityOperationID,
                    startDate:this.startDate,
                    endDate:this.endDate,
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                };
                this.getTradeList(data);
            },
            back(a){
                this.remarks='';
                this.fires=false;
                this.accountId=a;
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
                            }
                    })
            }
        },
        ready() {
            this.query();
            this.getSubcompany();
            this.getCity();
        },
        components:{
            'datepicker': datepicker
        },
        watch:{
            timeRange(){
                this.startDate=init_date(this.timeRange)[0];
                this.endDate=init_date(this.timeRange)[1];
            },
            pagecur(){
                this.defaultData.pageIndex=this.pagecur;
                this.initList();
            },
            page_size(){
                this.defaultData.pageSize=this.page_size;
                this.initList();
            }
        }
    }
</script>