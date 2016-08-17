<template>
    <index title="补贴划付" ptitle="备付金支出"  isshow="isshow">
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
                                    <input type="text" class="form-control" v-model="id" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" placeholder="ID">
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="merchantOperationID" style="width: 100px" placeholder="商户ID"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="keywords" style="width:185px;" placeholder="商户名、收款账户名、帐号">
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="createType">
                                        <option value="">请选择生成方式</option>
                                        <option value="1">系统生成</option>
                                        <option value="2">手工录入</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <input type="text" style="width: 100px" class="form-control" placeholder="活动ID" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" v-model="activityOperationID">
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
                                    <input type="text" class="form-control" style="width: 100px" v-model="remarks" placeholder="备注">
                                </div>
                                <div class="form-group">
                                    <a class="btn btn-info" v-on:click="query">查询</a>
                                </div>
                                <div class="form-group">
                                    <a class="btn btn-info" v-on:click="subsidyPayexcel">导出</a>
                                </div>
                                <br>
                                <div class="form-group">
                                    <a class="btn btn-info" data-toggle="modal" @click="batchs()">一键审核</a>
                                </div>
                            </form> 
                        </div>
                <div v-show="!!subsidyAppropriationList.length" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                            <table   id="table1" class="table">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox"  class="check-boxs" @click="checkAll($event)"/>ID</th>
                                        <th>生成日期</th>
                                        <th>分公司</th>
                                        <th>城市</th>
                                        <th>付款账户</th>
                                        <th>商户ID</th>
                                        <th>商户名称</th>
                                        <th>收款账户信息</th>
                                        <th>生成方式</th>
                                        <th>三方应补</th>
                                        <th>划付金额</th>
                                        <th>交易</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                        <th>活动名称</th>
                                        <th>备注</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id="All" v-for="sa in subsidyAppropriationList">
                                        <td>
                                            <template v-if="sa.status!=1">
                                                <input type="checkbox" disabled="true" name="ckbox-disabled" :id="sa.id"/>{{sa.id}}
                                            </template>
                                            <template v-else>
                                                <input type="checkbox" name="ckbox" :id="sa.id" :class="sa.receiptAccountName+sa.receiptAccountNumber"/>{{sa.id}}
                                            </template>
                                        </td>
                                        <td>{{sa.createAT | datetime}}</td>
                                        <td>{{sa.subCompanyName}}</td>
                                        <td>{{sa.cityName}}</td>
                                        <td>{{sa.paymentAccountShortName}}</td>
                                        <td>{{sa.merchantOperationID}}</td>
                                        <td>{{sa.merchantName}}</td>
                                        <td>{{sa.receiptAccountName}}<br/>{{sa.receiptAccountNumber}}</td>
                                        <td>
                                            <template v-if="sa.createType==1">
                                                系统生成
                                            </template>
                                            <template v-if="sa.createType==2">
                                                手工录入
                                            </template>
                                        </td>
                                        <td>{{sa.thirdPartySubsidyShould/100 | currency ''}}</td>
                                        <td>{{sa.payAmount/100 | currency ''}}</td>
                                        <td><a v-link="{name:'trade-info',params:{subsidyPayId:sa.id}}">明细</a> </td>
                                        <td>
                                            <template v-if="sa.status==0">
                                                已关闭
                                            </template>
                                            <template v-if="sa.status==1">
                                                等待审核
                                            </template>
                                            <template v-if="sa.status==2">
                                                等待划付
                                            </template>
                                            <template v-if="sa.status==3">
                                                转账中
                                            </template>
                                            <template v-if="sa.status==4">
                                                等待对账
                                            </template>
                                            <template v-if="sa.status==5">
                                                对账成功
                                            </template>
                                            <template v-if="sa.status==6">
                                                划付失败
                                            </template>
                                        </td>
                                        <td>
                                            <template v-if="sa.status==1">
                                                <a href="javascript:void(0);" @click="showModalApplyPayById(sa.id)">申请划付</a>
                                                <a href="javascript:void(0);" @click="updateById(sa.id)">更新</a>
                                            </template>
                                            <template v-else>
                                                <a @click="gopayment(sa.id,1)">查看</a>
                                            </template>
                                        </td>
                                        <td>
                                            {{sa.activityOperationID}},{{sa.activityName}}
                                        </td>
                                        <td>{{sa.remarks}}</td>
                                    </tr>
                                </tbody>
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
                            未查询到补贴划付信息！
                        </div>
            </div>
            <div id="modal_waring" data-backdrop="static" class="modal fade" style="display: none;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">×</button>
                            <h5 class="modal-title">你确定一键审核？</h5>
                        </div>
                        <div class="modal-body">
                            <div class="form-group tc">
                                <button type="button" @click="showModalApplyPay" class="btn btn-primary">确认</button>
                                <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </index>
</template>
<style scoped>
    .modal-body button{
        width:35%;
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/PaymentOfPayment/appropriation_model'
    export default{
        data(){
            this.model =model(this)
            return{
                id:"",
                subCompanyID:"",
                cityID:"",
                createType:"",
                status:"",
                timeRange:'3',
                startDate:"",
                endDate:"",
                merchantOperationID:"",
                merchantName:"",
                keywords:"",
                remarks:"",   
                seriesNumber:"",        
                activityOperationID:"",
                subcompanyList:[],
                pageall:1,
                pagecur:1,
                page_size:10,
                pageIndex:1,
                pageSize:10,
                cityList:[],
                payTypes:[],
                showPayAccount:'',
                subsidyAppropriationList:[],
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
             getSubsidyAppropriationList(data){
                 if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.appropriation_list(data)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('subsidyAppropriationList', response.data.data)
                            this.$set('pageall', response.data.total)
                        }
                    });
            },
             //获取分公司数据
            getSubcompany(){
                 this.$common_model.getcompany()
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
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
                        // *** 判断请求是否成功如若成功则填充数据到模型
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
            batchs(){
                let AccountS = [];
                $("input[name='ckbox']:checked").each(function(){
                    AccountS.push($(this).prop("class"));
                });
                if(AccountS.length<=0){
                    dialogs('info','请勾选审核信息！');
                    return false
                }
                $('#modal_waring').modal('show');
            },
            showModalApplyPay(){
                var AccountS = [];
                $("input[name='ckbox']:checked").each(function(){
                  AccountS.push($(this).prop("class"));  
                });
                let array = [];
                $("input[name='ckbox']:checked").each(function(){
                  array.push(parseInt($(this).prop("id")));
                });
                this.model.subsidy_applyPay(JSON.stringify(array))
                        .then((response)=>{
                                // *** 判断请求是否成功如若
                                if(response.data.code==0){
                                    dialogs('success','申请成功！');
                                    $("#modal_waring").modal("hide");
                                }
                                this.query();
                        });
            },
            updateById(id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.subsidy_update(id)
                        .then((response)=>{
                            if(response.data.code==0){
                                //刷新数据
                                this.query();
                                //提示成功
                                dialogs('success','更新成功！');
                            }
                        });
            },
            showModalApplyPayById(id){
                var AccountS = [];
                AccountS.push(id);
                if(AccountS.length<=0){
                    return false
                }
                this.model.subsidy_applyPay(JSON.stringify(AccountS))
                        .then((response)=>{
                        // *** 判断请求是否成功如若
                            if(response.data.code==0){
                                    dialogs('success','申请成功！');
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
                this.model.subsidy_applyPay(data)
                        .then((response)=>{
                            if (response.data.code==0){
                                dialogs();
                                this.query();
                            }
                        });
                $(".modal").modal("hide");
            },
            submit(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                var array = [];
                $("input[name='ckbox']:checked").each(function(){
                  array.push($(this).prop("id"));  
                });

                if ($('#displayName').prop("readonly")) {
                    array.push($('#displayName').prop("class"));
                 }
                let data={
                    ids:array,
                    remarks:this.applyPayRemarks,
                    payType:this.payType,
                    displayName:this.applyPayInfo.displayName
                    
                }
               this.model.subsidy_applyPay(data).then((response)=>{
                        if (response.data.code==0){
                            dialogs('success','申请成功！');
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
                    id:this.id,
                    subCompanyID:this.subCompanyID,
                    cityID:this.cityID,
                    startDate:this.startDate,
                    endDate:this.endDate,
                    merchantOperationID:this.merchantOperationID,
                    createType:this.createType,
                    status:this.status,
                    activityOperationID:this.activityOperationID,
                    remarks:this.remarks,
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize,
                    keywords:this.keywords 
                    };
                this.getSubsidyAppropriationList(data);
            },
            subsidyPayexcel(){
                if (this.startDate=="" && this.endDate=="") {
                    this.startDate=init_date(this.timeRange)[0];
                    this.endDate=init_date(this.timeRange)[1];
                }
                let data={
                    id:this.subsidyTaxRebateID,
                    subCompanyID:this.subCompanyID,
                    merchantOperationID:this.merchantOperationID,
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
                window.open(window.origin+this.$API.subsidyPayexcel+ $.param(data));
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
            (this.$route.params.subsidyPayID==':subsidyPayID')?this.id='':this.id=this.$route.params.subsidyPayID;
            (this.$route.params.subsidySHid==':subsidySHid')?this.merchantOperationID='':this.merchantOperationID=this.$route.params.subsidySHid;
            (this.$route.params.subsidyHDid==':subsidyHDid')?this.activityOperationID='':this.activityOperationID=this.$route.params.subsidyHDid;
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