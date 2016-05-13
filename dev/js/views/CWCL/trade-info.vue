<template>
    <index :title="'交易明细'" 
           :ptitle="'财务处理'"
           :hname="'trade-info'"  
           :isshow="'isshow'">
        <div class="content blists" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                       <div class="form-group">
                            <input type="button" class="btn btn-info" v-on:click="addTradeInfo" value="添加交易">
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="subCompanID" >
                            <option value="">请选择分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="cityID">
                            <option value="">请选择城市</option>
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
                                <option value="">请选择日期</option>
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
                        <br/>
                        <br/>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="merchantID" placeholder="商户ID">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="merchantName" placeholder="商户名">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="id" placeholder="交易ID">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="serialNumber" placeholder="交易流水号">
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control" v-model="phone" placeholder="手机号">
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="activityID">
                            <option value="">请选择参与活动</option>
                                <option v-for="n in activityList" v-text="n.name" :value="n.activityID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="button" class="btn btn-info" v-on:click="query" value="查询">
                        </div>
                    </form>
                    <div v-cloak v-show="!!tradeList.length" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                        <div class="datatable-scroll">
                            <table id="table1" class="table datatable-selection-single dataTable no-footer">
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
                                        <th>暂扣税金</th>
                                        <th>商户实补</th>
                                        <th>折扣差</th>
                                        <th>扣收金额</th>
                                        <th>33211佣</th>
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
                                        <a v-link="{name:'limitaccount-info'}">{{trlist.limitDeduct/100 | currency ''}}</a>
                                    </td>
                                    <td>
                                        <a v-link="{name:'limitaccount-info'}">{{trlist.principalDeduct/100 | currency ''}}</a>
                                    </td>
                                    <td>{{trlist.thirdpartyReceivable/100 | currency ''}}</td>
                                    <td>{{trlist.merchantSubsidyShould/100 | currency ''}}</td>
                                    <td>
                                        <a v-link="{name:'subsidy-tax-rebate'}">{{trlist.suspensionTax/100 | currency ''}}</a>
                                    </td>
                                    <td>
                                        <a v-link="{name:'subsidy-appropriation'}">{{trlist.merchantSubsidyActual/100 | currency ''}}</a>
                                    </td>
                                    <td>{{trlist.discountDiff/100 | currency ''}}</td>
                                    <td>{{trlist.collectionAmount/100 | currency ''}}</td>
                                    <td>{{trlist.commission33211/100 | currency ''}}</td>
                                    <td>{{trlist.entryAmount/100 | currency ''}}</td>
                                    <td>{{trlist.tradeTime | datetime}}</td>
                                    <td>{{trlist.consumptionPhone}}</td>
                                    <td>{{trlist.consumptionAccountNumber}}</td>
                                    <td>{{trlist.activityID}}</td>
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
                                        <th><h5><b>合计</b><h5></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th><b>{{count_consumptionAmount/100 | currency ''}}</b></th>
                                        <th><b>{{count_discountAmount/100 | currency ''}}</b></th>
                                        <th><b>{{count_payAmount/100 | currency ''}}</b></th>
                                        <th><b>{{count_limitDeduct/100 | currency ''}}</b></th>
                                        <th><b>{{count_principalDeduct/100 | currency ''}}</b></th>
                                        <th>
                                            <b><template v-if="count_thirdpartyReceivable==NaN">0</template></b>
                                        </th>
                                        <th><b>{{count_merchantSubsidyShould/100 | currency ''}}</b></th>
                                        <th><b>{{count_suspensionTax/100 | currency ''}}</b></th>
                                        <th><b>{{count_merchantSubsidyActual/100 | currency ''}}</b></th>
                                        <th><b>{{count_discountDiff/100 | currency ''}}</b></th>
                                        <th><b>{{count_collectionAmount/100 | currency ''}}</b></th>
                                        <th><b>{{count_commission33211/100 | currency ''}}</b></th>
                                        <th><b>{{count_entryAmount/100 | currency ''}}</b></td>
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
                        <div class="box-footer">
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
                                                <i>*</i>商户名称：
                                            </label>
                                            <select class="form-control" id="tradeInfo_merchantId" v-model="select_merchantId" v-validate:val1="['required']">
                                            <option value="">请选择商户</option>
                                                <option v-for="n in merchantList" v-text="n.merchantName" :value="n.merchantID"></option>
                                            </select>
                                            <span v-if="$vali.val1.required && fire" class="validation-error-label">请选择商户</span>
                                         </div>
                                         <div class="form-group">
                                             <label><i>*</i>参与活动：</label>
                                             <select class="form-control" v-model="tradeInfo.activityId" v-validate:val2="['required']">
                                                <option value="">请选择参与活动</option>
                                                <option v-for="n in activityList" v-text="n.name" :value="n.activityID"></option>
                                             </select>
                                             <span v-if="$vali.val2.required && fire" class="validation-error-label">请选择活动</span>
                                         </div>
                                         <div class="form-group">
                                             <label><i>*</i>消费金额：</label>
                                             <input type="number" class="form-control" id="consumptionAmount" v-model="tradeInfo.consumptionAmount" v-validate:val3="['required']">
                                             <span v-if="$vali.val3.required && fire" class="validation-error-label">请输入消费金额</span>
                                         </div>
                                         <div class="form-group">
                                             <label><i>*</i>折扣金额：</label>
                                             <input type="number" class="form-control" id="discountAmount" v-model="tradeInfo.discountAmount" v-validate:val4="['required']" >
                                             <span v-if="$vali.val4.required && fire" class="validation-error-label">请输入折扣金额</span>
                                         </div>
                                         <div class="form-group">
                                             <label><i>*</i>实付金额：</label>
                                             <input type="number" class="form-control" id="paAmount" v-model="tradeInfo.paAmount" v-validate:val5="['required']" >
                                             <span v-if="$vali.val5.required && fire" class="validation-error-label">请输入实付金额</span>
                                         </div>
                                         <div class="form-group">
                                             <label><i>*</i>三方应收：</label>
                                             <input type="number" class="form-control" id="thirdPartyReceivable" v-model="tradeInfo.thirdPartyReceivable" v-validate:val6="['required']">
                                             <span v-if="$vali.val6.required && fire" class="validation-error-label">请输入三方应收</span>
                                         </div>
                                         <div class="form-group">
                                             <label><i>*</i>暂扣税金：</label>
                                             <input type="number" class="form-control" id="suspensionTax" v-model="tradeInfo.suspensionTax" v-validate:val7="['required']" >
                                             <span v-if="$vali.val7.required && fire" class="validation-error-label">请输入暂扣税金</span>
                                         </div>
                                         <div class="form-group">
                                             <label><i>*</i>商户实补：</label>
                                             <input type="number" class="form-control" id="merchantSubsidyActual" v-model="tradeInfo.merchantSubsidyActual" v-validate:val8="['required']">
                                             <span v-if="$vali.val8.required && fire" class="validation-error-label">请输入商户实补</span>
                                         </div>
                                         <div class="form-group">
                                             <label><i>*</i>上传凭证：</label>
                                             <input type="file" style="display: inline-block;" @change="uploads($event)" v-validate:val9="['required']">
                                             <span v-if="$vali.val9.required && fire" class="validation-error-label">请选择凭证</span>
                                         </div>
                                         <div class="form-group">
                                             <label>备注</label>
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
    import dialog from '../components/dialog.vue'
    
    export default{
        props:{

        },
        data(){
            return{
                origin:window.origin,
                subCompanID:"",
                cityID:"",
                type:"",
                timeRange:'',
                startDate:"",
                endDate:"",
                merchantID:"",      
                merchantName:"",   
                id:"",   
                serialNumber:"",        
                phone:"",      
                activityID:'',
                subcompanyList:[],
                pageall:1,
                pagecur:1,
                page_size:15,
                pageIndex:1,
                pageSize:15,
                select_merchantId:'',
                fire:false,
                tradeInfo:{
                    merchantId:'',
                    activityId:'',
                    consumptionAmount:'',         
                    discountAmount:'',    
                    paAmount:'',  
                    thirdPartyReceivable:'',    
                    suspensionTax:'', 
                    merchantSubsidyActual:'',
                    certificates:'',     
                    remarks:''
                },
                tradeList:[],
                cityList:[],
                activityList:[],
                merchantList:[],
                count_consumptionAmount:0,count_discountAmount:0,count_payAmount:0,count_limitDeduct:0,
                count_principalDeduct:0,count_thirdpartyReceivable:0,count_merchantSubsidyShould:0,
                count_suspensionTax:0,count_merchantSubsidyActual:0,
                count_discountDiff:0,count_collectionAmount:0,count_commission33211:0,count_entryAmount:0
            }
        },
        methods:{
            //获取交易记录
             getTradeList:function(data){
                this.$http.post('./tradedetail/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('tradeList', response.data.data) : null;
                        (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            //获取分公司数据
            getSubcompany:function(data){
                 this.$http.post('./subcompany/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('subcompanyList', response.data.data) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            //获取城市数据
            getCity:function(data){
                 this.$http.post('./city/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('cityList', response.data.data) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            //获取活动数据
            getactivitys:function(data){
                 this.$http.post('./activity/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('activityList', response.data.data) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            getTwo:function(num){
                if(num.toString().length>=2) return num;
                var str="";
                for(var i=num.toString().length;i<2;i++)
                    str +="0";
                return str + num.toString();
            },
            addTradeInfo:function(){
                this.errorHideL();
                this.select_merchantId='';
                this.tradeInfo.merchantId='';
                this.tradeInfo.activityId='';
                this.tradeInfo.consumptionAmount='';         
                this.tradeInfo.discountAmount='';    
                this.tradeInfo.paAmount='';  
                this.tradeInfo.thirdPartyReceivable='';    
                this.tradeInfo.suspensionTax=''; 
                this.tradeInfo.merchantSubsidyActual='';
                this.tradeInfo.certificates='';     
                this.tradeInfo.remarks='';
                //初始化获取所有商户信息
                this.$http.post('./merchant/list',{})
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('merchantList', response.data.data) : null;
                        $('#modal_trade_info').modal('show');
                    }, function (response) {
                        console.log(response);
                    });
            },
            checkInfo:function(){
                this.select_merchantId;
                this.tradeInfo.consumptionAmount       
                this.tradeInfo.discountAmount
                this.tradeInfo.paAmount
                this.tradeInfo.thirdPartyReceivable 
                this.tradeInfo.suspensionTax
                this.tradeInfo.merchantSubsidyActual
            },
            errorHideL:function(){
                $('.suberror,.timeerror').hide();
                this.fire=false;
            },
            saveTradeInfo:function(){
                //隐藏非空提示
                this.errorHideL();
                //验证非空
                if(!this.$vali.valid){
                    this.fire=true;
                    return;
                }
                this.tradeInfo.merchantId=this.select_merchantId;
                this.tradeInfo.consumptionAmount= this.tradeInfo.consumptionAmount*100;         
                this.tradeInfo.discountAmount=this.tradeInfo.discountAmount*100;
                this.tradeInfo.paAmount=this.tradeInfo.paAmount*100;
                this.tradeInfo.thirdPartyReceivable=this.tradeInfo.thirdPartyReceivable*100;    
                this.tradeInfo.suspensionTax=this.tradeInfo.suspensionTax*100;
                this.tradeInfo.merchantSubsidyActual=this.tradeInfo.merchantSubsidyActual*100;

                this.$http.post('./tradedetail/add',this.tradeInfo)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if (response.data.code==0)
                        {
                            this.query();
                            swal({
                                title: "保存成功！",
                                type: "success",
                                confirmButtonColor: "#2196F3"
                            })
                        }
                    }, function (response) {
                        console.log(response);
                });
                $(".modal").modal("hide");
            },
            query: function () {
                //初始化
                this.clear();
                // let data=this.data;
                let data={
                        subCompanyID:this.subCompanID,
                        cityID:this.cityID,
                        type:this.type,
                        merchantOperationID:this.merchantID,
                        merchantName:this.merchantName,
                        tradeDetailID:this.id,
                        serialNumber:this.serialNumber,        
                        phone:this.phone,      
                        activityID:this.activityID,
                        startDate:this.startDate,
                        endDate:this.endDate,
                        pageIndex: this.pageIndex, 
                        pageSize: this.pageSize
                    };
                this.getTradeList(data);
            },
            //初始化
            clear:function(){
                this.tradeInfo={
                    merchantId:'',
                    activityId:'',
                    consumptionAmount:'',         
                    discountAmount:'',    
                    paAmount:'',  
                    thirdPartyReceivable:'',    
                    suspensionTax:'', 
                    merchantSubsidyActual:'',
                    certificates:'',     
                    remarks:''
                },
                this.count_consumptionAmount=0;this.count_discountAmount=0;this.count_payAmount=0;this.count_limitDeduct=0;
                this.count_principalDeduct=0;this.count_thirdpartyReceivable=0;this.count_merchantSubsidyShould=0;
                this.count_suspensionTax=0;this.count_merchantSubsidyActual=0;
                this.count_discountDiff=0;this.count_collectionAmount=0;this.count_commission33211=0;this.count_entryAmount=0;
            },
            uploads(e){
                console.log(e.target);
                let files=e.target.files[0];
                let vm=this;
                var reader = new FileReader();
                reader.readAsDataURL(files);
                reader.onload = function(e){
                    let datas={
                        name:files.name,
                        data:this.result.split(',')[1]
                    }
                    vm.$http.post('./file/upload',datas)
                            .then((response)=>{
                        vm.tradeInfo.certificates=response.data.data;
                })
                }
            },
        },
        
        ready: function () {
            this.clear();
            var d=new Date()
            var day=d.getDate()
            var month=d.getMonth() + 1
            var year=d.getFullYear()
            var newD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day-7);
            var endD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
            let data={
                startDate:newD,
                endDate:endD
            }
            this.getTradeList(data);
            this.getSubcompany({});
            this.getCity({});
            this.getactivitys({});
        },
       watch:{
            select_merchantId:function(){
                let id=$('#tradeInfo_merchantId').val();
                let data = {
                    cityID:''
                };
                for(var i in this.merchantList){
                    if(id == this.merchantList[i].merchantID){
                        data={
                            cityID:this.merchantList[i].cityID
                        }
                    }
                }

               this.getactivitys(data);
            },
            timeRange:function(){
                var d=new Date()
                var day=d.getDate()
                var month=d.getMonth() + 1
                var year=d.getFullYear()
                var newD;
                switch (this.timeRange){
                    case '0':
                        newD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day-1);
                        break;
                    case '1':
                        newD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day-7);
                        break;
                    case '2':
                        newD=year + "-" + this.getTwo(month-1) + "-" + this.getTwo(day);
                        break;
                    case '3':
                        newD=year + "-" + this.getTwo(month-3) + "-" + this.getTwo(day);
                        break;
                    case '4':
                        newD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                        break;
                }
                var endD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                this.startDate=newD;
                this.endDate=endD;
            },
            tradeList(){
                var _this=this;
                this.tradeList.forEach(function(e){
                     _this.count_consumptionAmount+=e.consumptionAmount;
                     _this.count_discountAmount+=e.discountAmount;
                     _this.count_payAmount+=e.payAmount;
                     _this.count_limitDeduct+=e.limitDeduct;
                     _this.count_principalDeduct+=e.principalDeduct;
                     _this.count_thirdpartyReceivable+=e.thirdpartyReceivable;
                     _this.count_merchantSubsidyShould+=e.merchantSubsidyShould;
                     _this.count_suspensionTax+=e.suspensionTax;
                     _this.count_merchantSubsidyActual+=e.suspensionTax;
                     _this.count_discountDiff+=e.discountDiff;
                     _this.count_collectionAmount+=e.collectionAmount;
                     _this.count_commission33211+=e.commission33211;
                     _this.count_entryAmount+=e.entryAmount;
                });
                // this.shouru=(sr/100).toFixed(2);
                // this.zhichu=(zc/100).toFixed(2);
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
           'datepicker': datepicker,
           'dialog': dialog,
        },
        validators: {
            numeric: function (val) {
                return /^[-+]?[0-9]+$/.test(val)
            }
        }
    }
</script>