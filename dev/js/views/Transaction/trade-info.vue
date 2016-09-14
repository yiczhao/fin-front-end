<template>
    <index :title="'交易明细'" 
           :ptitle="'交易管理'"
           :hname="'trade-info'"  
           :isshow="'isshow'">
        <div class="content blists" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                       <div class="form-group">
                           <a class="btn btn-info" v-on:click="addTradeInfo" data-ksa="trade_detail_manage.add">添加交易</a>
                        </div>
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
                            <select class="form-control" v-model="type">
                            <option value="">请选择交易类型</option>
                            <option value="1">正常交易</option>
                            <option value="2">手工单</option>
                                <option v-for="(index,n) in typelists" v-text="n.value" :value="n.accountType"></option>
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
                            <input type="text" class="form-control" v-model="subsidyPayId" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" placeholder="补贴划付ID">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="subsidyTaxRebateId" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" placeholder="补贴退税ID">
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
                            <a class="btn btn-info" v-on:click="query" data-ksa="trade_detail_manage.search">查询</a>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" v-on:click="tradeDetailexcel" data-ksa="trade_detail_manage.export">导出</a>
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
                            <tr  v-for="trlist in tradeList">
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
                                    <a data-ksa="subsidy_pay_detail_manage.search" v-link="{name:'subsidy-appropriation',params:{subsidyPayID:trlist.subsidyPayID}}" v-if="trlist.subsidyTaxRebateID==0&&trlist.suspensionTax>0&&trlist.subsidyPayID>0">{{trlist.suspensionTax/100 | currency ''}}</a>
                                    <span v-if="trlist.subsidyTaxRebateID==0&&trlist.suspensionTax==0">{{trlist.suspensionTax/100 | currency ''}}</span>
                                    <span v-if="trlist.subsidyTaxRebateID==0&&trlist.suspensionTax>0&&trlist.subsidyPayID==0">{{trlist.suspensionTax/100 | currency ''}}</span>
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
                                </td>
                                <td>
                                    <template v-if="trlist.type==2">
                                        <a href="{{origin}}/file/download/{{trlist.certificateId}}">详情</a>
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
                                <th><b>{{nums.suspensionTax/100 | currency ''}}</b></th>
                                <th><b>{{nums.merchantSubsidyActual/100 | currency ''}}</b></th>
                                <th><b>{{nums.discountDiff/100 | currency ''}}</b></th>
                                <th><b>{{nums.collectionAmount/100 | currency ''}}</b></th>
                                <th><b>{{nums.commission33211/100 | currency ''}}</b></th>
                                <th><b>{{nums.entryAmount/100 | currency ''}}</b></td>
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
                <validator name="vali">
                    <form novalidate>
                        <div id="modal_trade_info" data-backdrop="static" class="modal fade" style="display: none;">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h3>添加交易</h3>
                                        <button type="button" class="close" data-dismiss="modal">×</button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label>
                                                <i class="aaaa">*</i>商户ID：
                                            </label>
                                            <input type="text" class="form-control" placeholder="商户ID" v-model="tradeInfo.merchantOperationID" v-validate:val1="['required']"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                                            <span v-if="$vali.val1.required && fire" class="validation-error-label">请输入商户ID</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>参与活动：</label>
                                            <input type="text" class="form-control" placeholder="活动ID" v-model="tradeInfo.activityOperationID" v-validate:val2="['required']" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                                            <span v-if="$vali.val2.required && fire" class="validation-error-label">请输入活动ID</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>消费金额：</label>
                                            <input type="text" class="form-control" v-model="tradeInfo.consumptionAmount" v-validate:val3="['required']"  onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')">
                                            <span v-if="$vali.val3.required && fire" class="validation-error-label">请输入消费金额</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>折扣金额：</label>
                                            <input type="text" class="form-control" v-model="tradeInfo.discountAmount" v-validate:val4="['required']" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')">
                                            <span v-if="$vali.val4.required && fire" class="validation-error-label">请输入折扣金额</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>实付金额：</label>
                                            <input type="text" class="form-control" v-model="tradeInfo.payAmount" v-validate:val5="['required']" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')">
                                            <span v-if="$vali.val5.required && fire" class="validation-error-label">请输入实付金额</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>三方应收：</label>
                                            <input type="text" class="form-control" v-model="tradeInfo.thirdPartyReceivable" v-validate:val6="['required']" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')">
                                            <span v-if="$vali.val6.required && fire" class="validation-error-label">请输入三方应收</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>退税款：</label>
                                            <input type="text" class="form-control" v-model="tradeInfo.suspensionTax" v-validate:val7="['required']" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" >
                                            <span v-if="$vali.val7.required && fire" class="validation-error-label">请输入退税款</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>商户实补：</label>
                                            <input type="text" class="form-control" v-model="tradeInfo.merchantSubsidyActual" v-validate:val8="['required']" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')">
                                            <span v-if="$vali.val8.required && fire" class="validation-error-label">请输入商户实补</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>上传凭证：</label>
                                            <input type="file" style="display: none;" @change="uploads($event)">
                                            <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick">上传凭证</a>
                                            <span v-text="uploadText" v-show="uploadText!=''"></span>
                                            <span v-if="tradeInfo.certificateId=='' && fire" class="validation-error-label">请选择凭证</span>
                                        </div>
                                        <div class="form-group">
                                            <label style="position: relative;top: -40px;">备注:</label>
                                            <textarea class="form-control"  id="remarks" v-model="tradeInfo.remarks"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group tc">
                                        <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                                        <button type="button" @click="saveTradeInfo" class="btn btn-primary">保存</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </validator>
            </div>
        </div>
    </index>
</template>
<style lang="sass" scoped>
    .validation-error-label{
        margin-left: 20%;
    }
    .timeerror,.suberror,.suberror1{
        display: none;
    }
     .suberror,.suberror1{
        padding-top: 3px;
    }
    .datatable-scroll{
        overflow: auto;
    }
    label i{
        color: red;
    }
    .btns{
        text-align: center;
    }

    .form-group{
        text-align: left;
    }
      .form-group.tc{
        text-align: center;
    }
     .modal-body .form-control{
        text-align: left;
        width:83%;
        display: inline-block;
    }
     .modal-body label{
        width:15%;
        display: inline-block;
    }
     .modal-body label i{
        color:red;
    }
    .modal-body button{
        width:35%;
    }

</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/Transaction/trade_model'
    export default{
        props:{

        },
        data(){
            this.model=model(this);
            return{
                origin:window.origin,
                subsidyPayId:"",
                subsidyTaxRebateId:"",
                subCompanyID:"",
                cityID:"",
                type:"",
                timeRange:'3',
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
                select_merchantId:'',
                fire:false,
                tradeInfo:{
                    merchantOperationID:'',
                    activityOperationID:'',
                    consumptionAmount:'',         
                    discountAmount:'',
                    payAmount:'',
                    thirdPartyReceivable:'',    
                    suspensionTax:'', 
                    merchantSubsidyActual:'',
                    certificateId:'',
                    remarks:''
                },
                tradeList:[],
                cityList:[],
                merchantList:[],
                uploadText:'',
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
            addTradeInfo(){
                this.errorHideL();
                this.select_merchantId='';
                this.tradeInfo.merchantOperationID='';
                this.tradeInfo.activityOperationID='';
                this.tradeInfo.consumptionAmount='';         
                this.tradeInfo.discountAmount='';    
                this.tradeInfo.payAmount='';
                this.tradeInfo.thirdPartyReceivable='';    
                this.tradeInfo.suspensionTax=''; 
                this.tradeInfo.merchantSubsidyActual='';
                this.tradeInfo.certificateId='';
                this.tradeInfo.remarks='';
                this.uploadText='';
                $('#modal_trade_info').modal('show');
            },
            checkInfo(){
                this.select_merchantId;
                this.tradeInfo.consumptionAmount       
                this.tradeInfo.discountAmount
                this.tradeInfo.payAmount
                this.tradeInfo.thirdPartyReceivable 
                this.tradeInfo.suspensionTax
                this.tradeInfo.merchantSubsidyActual
            },
            errorHideL(){
                $('.suberror,.timeerror').hide();
                this.fire=false;
            },
            saveTradeInfo(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                //隐藏非空提示
                this.errorHideL();
                //验证非空
                if(!this.$vali.valid||this.tradeInfo.certificateId==''){
                    this.fire=true;
                    return;
                }
                let data={};
                $.extend(true,data,this.tradeInfo);
                data.consumptionAmount= accMul(this.tradeInfo.consumptionAmount,100);
                data.discountAmount=accMul(this.tradeInfo.discountAmount,100);
                data.payAmount=accMul(this.tradeInfo.payAmount,100);
                data.thirdPartyReceivable=accMul(this.tradeInfo.thirdPartyReceivable,100);
                data.suspensionTax=accMul(this.tradeInfo.suspensionTax,100);
                data.merchantSubsidyActual=accMul(this.tradeInfo.merchantSubsidyActual,100);
                this.model.addtrade(data)
                    .then((response)=>{
                        if(response.data.code==0){
                            this.query();
                            dialogs();
                            $(".modal").modal("hide");
                        }
                    })
            },
            query() {
                if(sessionStorage.getItem('isHttpin')==1)return;
                //初始化
                this.clear();
                if (this.startDate=="" && this.endDate=="") {
                    this.startDate=init_date('3')[0];
                    this.endDate=init_date('3')[1];
                }
                let data={
                    subsidyPayId:this.subsidyPayId,
                    subsidyTaxRebateId:this.subsidyTaxRebateId,
                    subCompanyID:this.subCompanyID,
                    cityID:this.cityID,
                    type:this.type,
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
            tradeDetailexcel() {
                if(!this.tradeList.length>0)return;
                //初始化
                if (this.startDate=="" && this.endDate=="") {
                    this.startDate=init_date('3')[0];
                    this.endDate=init_date('3')[1];
                }
                let data={
                    subsidyPayId:this.subsidyPayId,
                    subsidyTaxRebateId:this.subsidyTaxRebateId,
                    subCompanyID:this.subCompanyID,
                    cityID:this.cityID,
                    type:this.type,
                    merchantOperationID:this.merchantOperationID,
                    merchantName:this.merchantName,
                    tradeDetailID:this.id,
                    serialNumber:this.serialNumber,
                    phone:this.phone,
                    activityOperationID:this.activityOperationID,
                    startDate:this.startDate,
                    endDate:this.endDate,
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    mid:JSON.parse(sessionStorage.getItem('userData')).authToken
                };
                window.open(window.origin+this.$API.tradeDetailexcel+ $.param(data));
            },
            //初始化
            clear(){
                this.tradeInfo={
                    merchantOperationID:'',
                    activityOperationID:'',
                    consumptionAmount:'',         
                    discountAmount:'',
                    payAmount:'',
                    thirdPartyReceivable:'',    
                    suspensionTax:'', 
                    merchantSubsidyActual:'',
                    certificateId:'',
                    remarks:''
                },
                this.uploadText='';
            },
            uploadClick(){
                $('input[type="file"]').val('');
                $('input[type="file"]').click();
            },
            uploads(e){
                if(e.target.value==''&&this.uploadText!=''){
                    return;
                }
                let files=e.target.files[0];
                let vm=this;
                var reader = new FileReader();
                if(!check_upload(files.name)){
                    return;
                }
                reader.readAsDataURL(files);
                reader.onload = function(e){
                    let datas={
                        name:files.name,
                        data:this.result.split(',')[1]
                    }
                    vm.$common_model.upload(datas)
                        .then((response)=>{
                            if(response.data.code==0){
                                vm.tradeInfo.certificateId=response.data.data;
                                vm.uploadText=files.name;
                                dialogs('success','上传成功！');
                            }
                        })
                }
            },
            errorDialog(msg){
                dialogs('error',msg);
            },
            goThird(_id,_serialNumber){
                this.model.skipToThird(_id)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.$router.go({'name':'third-info',params:{'id':response.data.data,'serialNumber':_serialNumber}});
                            }
                        })
            }
        },
        ready() {
            this.clear();
            (this.$route.params.subsidyPayId==':subsidyPayId')?this.subsidyPayId='' : this.subsidyPayId=this.$route.params.subsidyPayId;
            (this.$route.params.subsidyTaxRebateId==':subsidyTaxRebateId')? this.subsidyTaxRebateId='' : this.subsidyTaxRebateId=this.$route.params.subsidyTaxRebateId;
            (this.$route.params.merchantOperationID==':merchantOperationID')?this.merchantOperationID='' : this.merchantOperationID=this.$route.params.merchantOperationID;
            (this.$route.params.merchantName==':merchantName')? this.merchantName='' : this.merchantName=this.$route.params.merchantName;
            (this.$route.params.activityOperationID==':activityOperationID')? this.activityOperationID='' : this.activityOperationID=this.$route.params.activityOperationID;
            (this.$route.params.serialNumber==':serialNumber')? this.serialNumber='' : this.serialNumber=this.$route.params.serialNumber;
            this.query();
            this.getSubcompany();
            this.getCity();
        },
       watch:{
            timeRange(){
                this.startDate=init_date(this.timeRange)[0];
                this.endDate=init_date(this.timeRange)[1];
            },
            tradeList(){
                let data={
                    subsidyPayId:this.subsidyPayId,
                    subsidyTaxRebateId:this.subsidyTaxRebateId,
                    subCompanyID:this.subCompanyID,
                    cityID:this.cityID,
                    type:this.type,
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
                this.model.tradedetailsum(data)
                        .then((response)=>{
                            (response.data.code==0)?this.$set('nums',response.data.data):null;
                        })
            },
            pagecur(){
                this.pageIndex=this.pagecur;
                this.query();
            },
            page_size(){
                this.pageSize=this.page_size;
                this.query();
            }
       },
        components:{
           'datepicker': datepicker
        },
        validators: {
            numeric(val) {
                return /^[-+]?[0-9]+$/.test(val)
            }
        }
    }
</script>