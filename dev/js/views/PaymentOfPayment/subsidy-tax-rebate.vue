<template>
    <index title="补贴退税" ptitle="备付金支出"  isshow="isshow">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                        <div class="panel-heading">
                            <form class="form-inline manage-form">
                                <div class="form-group">
                                    <select class="form-control" v-model="subCompanyID"  @change="getCity(subCompanyID)">
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
                                    <select class="form-control" v-model="timeRange">
                                        <option value="5">今天</option>
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
                                    <input type="text" class="form-control" v-model="subsidyTaxRebateID" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"  placeholder="ID">
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="merchantID" placeholder="商户ID"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="keywords" style="width:192px;" placeholder="商户名、收款账户名、帐号">
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="createType">
                                        <option value="">请选择生成方式</option>
                                        <option value="1">系统生成</option>
                                        <option value="2">手工录入</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="status">
                                        <option value="">请选择状态</option>
                                        <option value="1">等待审核</option>
                                        <option value="2">等待划付</option>
                                        <option value="3">转账中</option>
                                        <option value="4">等待对账</option>
                                        <option value="5">对账成功</option>
                                        <option value="6">划付失败</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="remarks" placeholder="备注">
                                </div>
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" v-on:click="query" value="查询">
                                </div>
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" v-on:click="subsidyTaxexcel" value="导出">
                                </div>
                                <br>
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" data-toggle="modal" @click="showModalApplyPay" value="一键审核">
                                </div>
                            </form> 
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
                                        <th>退税金额</th>
                                        <th>交易</th>
                                        <th>状态</th>
                                        <th>付款流水</th>
                                        <th>备注</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="strd in subsidyTaxRebateDetailList">
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
                                            <template v-if="strd.createType==2">手工录入</template>
                                        </td>
                                        <td>{{strd.taxRebateAmount/100 | currency ''}}</td>
                                        <td><a v-link="{name:'trade-info',params:{subsidyTaxRebateId:strd.id}}">明细</a> </td>
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
                                        </td>
                                        <td>
                                            <template v-if="strd.status==1">
                                                <a href="javascript:void(0);" @click="showModalApplyPayById(strd.id)">申请划付</a>&nbsp;
                                                <a href="javascript:void(0);" @click="updateById(strd.id)">更新</a>
                                            </template>
                                            <template v-else>
                                                <a @click="gopayment(strd.id,3)">查看</a>
                                            </template>
                                        </td>
                                        <td>{{strd.remarks}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                        <div  v-else style="padding: 30px;font-size: 16px;text-align: center" >
                            未查询到补贴退税信息！
                        </div>
                        <div v-show="!!subsidyTaxRebateDetailList.length" class="datatable-footer">
                            <page :all="pageall"
                                  :cur.sync="pagecur"
                                  :page_size.sync="page_size">
                            </page>
                        </div>
            </div>
        </div>
    </index>
</template>
<style>
     .datatable-scroll{
        overflow:auto;
    }
    .page-bar{
        margin: 25px auto;
        text-align: center;
    }
    .payment-method {
        float: left;
    }
    .remarks{
        float: left;
    }
    .remarks-form-control{
        width: 90%;
    }
    .modal-foot{
        text-align: center;
        height: 60px;
    }
    
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/PaymentOfPayment/rebate_model'
    export default{
        data(){
            this.model =model(this)
            return{
                subsidyTaxRebateID:"",
                subCompanyID:"",
                cityID:"",
                createType:"",
                status:"",
                timeRange:'1',
                startDate:"",
                remarks:'',
                endDate:"",
                merchantID:"",      
                keywords:"",
                subcompanyList:[],
                pageall:1,
                pagecur:1,
                page_size:10,
                pageIndex:1,
                pageSize:10,
                cityList:[],
                subsidyTaxRebateDetailList:[],
                payTypes:[],
                showPayAccount:'',
                payType:"1",
                applyPayInfo:{
                    payType:{
                       1:"",
                       2:""
                    }
                },
                applyPayRemarks:'',
                dialogTitle:'',
                submitId:''
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
                this.applyPayRemarks="", 
                this.applyPayInfo={payType:{
                       1:"",
                       2:""
                    }};
            },
            showModalApplyPay(){
                var AccountS = [];
                $("input[name='ckbox']:checked").each(function(){
                  AccountS.push($(this).prop("class"));  
                });
                if(AccountS.length<=0){
                    dialogs('info','请勾选审核信息！');
                   return false
                }
                let array = [];
                $("input[name='ckbox']:checked").each(function(){
                  array.push(parseInt($(this).prop("id")));
                });
                this.model.rebate_batchCheck(JSON.stringify(array))
                        .then((response)=>{
                            // *** 判断请求是否成功如若
                            if(response.data.code==0){
                                dialogs('success','审核成功！');
                            }
                            this.query();
                        });
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
            showModalApplyPayById(id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                var AccountS = [];
                AccountS.push(id);
                if(AccountS.length<=0){
                    return false
                }
                this.model.rebate_batchCheck(JSON.stringify(AccountS))
                        .then((response)=>{
                        // *** 判断请求是否成功如若
                        if(response.data.code==0){
                                dialogs('success','划付成功！');
                                this.query();
                            }
                        });
            },
            submitOne(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                let data={
                    ids:this.submitId,
                    remarks:this.applyPayRemarks,
                    payType:this.payType,
                    displayName:this.applyPayInfo.displayName
                }
                this.model.rebate_applyPay(data).then((response)=>{
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if (response.data.code==0)
                    {
                        dialogs();
                        this.query();
                        //关闭弹出层
                        $(".modal").modal("hide");
                    }
                });
            },
            submit(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                var array = [];
                $("input[name='ckbox']:checked").each(function(){
                  array.push(parseInt($(this).prop("id")));
                });
                if ($('#displayName').prop("readonly")) {
                    array.push(parseInt($('#displayName').prop("class")));
                 }
                let data={
                    ids:array,
                    remarks:this.applyPayRemarks,
                    payType:this.payType,
                    displayName:this.applyPayInfo.displayName
                }
               this.model.rebate_applyPay(data).then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if (response.data.code==0)
                        {
                            dialogs();
                            this.query();
                            //关闭弹出层
                            $(".modal").modal("hide");
                        }
                    });
            },
            query() {
                $(".check-boxs").prop({'checked':false})
                if (this.startDate=="" && this.endDate=="") {
                    this.startDate=init_date(this.timeRange)[0];
                    this.endDate=init_date(this.timeRange)[1];
                }
                let data={
                        id:this.subsidyTaxRebateID,
                        subCompanyID:this.subCompanyID,
                        merchantOperationID:this.merchantID,
                        cityID:this.cityID,
                        createType:this.createType,
                        timeRange:this.timeRange,
                        keywords:this.keywords,
                        status:this.status,
                        remarks:this.remarks,
                        startDate:this.startDate,
                        endDate:this.endDate,
                        pageIndex: this.pageIndex, 
                        pageSize: this.pageSize
                    };
                this.getsubsidyTaxRebateDetailList(data);
            },
            subsidyTaxexcel(){
                if (this.startDate=="" && this.endDate=="") {
                    this.startDate=init_date(this.timeRange)[0];
                    this.endDate=init_date(this.timeRange)[1];
                }
                let data={
                    id:this.subsidyTaxRebateID,
                    subCompanyID:this.subCompanyID,
                    merchantOperationID:this.merchantID,
                    cityID:this.cityID,
                    createType:this.createType,
                    timeRange:this.timeRange,
                    keywords:this.keywords,
                    status:this.status,
                    remarks:this.remarks,
                    startDate:this.startDate,
                    endDate:this.endDate,
                    pageIndex: this.pageIndex,
                    mid:JSON.parse(sessionStorage.getItem('userData')).authToken
                };
                window.open(window.origin+this.$API.subsidyTaxexcel+ decodeURIComponent($.param(data)));
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
            }
        },
        ready() {
            (this.$route.params.subsidyTaxRebateID==':subsidyTaxRebateID')?this.subsidyTaxRebateID='':this.subsidyTaxRebateID=this.$route.params.subsidyTaxRebateID;
            this.query();
            this.getSubcompany();
            this.getCity();
        },
         watch:{
            payType(){
                let type=$("#payType").val()
                for(var i in this.payTypes){
                    if(type == this.payTypes[i].type){
                        this.showPayAccount=this.payTypes[i].value
                    }
                }
            },
            timeRange(){
                this.startDate=init_date(this.timeRange)[0];
                this.endDate=init_date(this.timeRange)[1];
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
        }
    }
</script>