<template>
    <index title="补贴退税" ptitle="备付金支出"  isshow="isshow">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                        <div class="panel-heading">
                            <form class="form-inline manage-form">
                                <br/>
                                <div class="form-group">
                                    <select class="form-control" v-model="subCompanyID" >
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
                                <br/>
                                <br/>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="merchantID" placeholder="商户ID">
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
                                        <option value="1">已关闭</option>
                                        <option value="2">等待划付</option>
                                        <option value="3">等待对账</option>
                                        <option value="4">对账成功</option>
                                        <option value="5">划付失败</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="remark" placeholder="备注">
                                </div>
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" v-on:click="query" value="查询">
                                </div>
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" data-toggle="modal" @click="showModalApplyPay" value="批量划付">
                                </div>
                            </form> 
                        </div>
                        <div v-show="!!subsidyTaxRebateDetailList.length"  class="dataTables_wrapper no-footer">
                            <div class="datatable-scroll">
                            <table id="table1" class="table">
                                <thead>
                                    <tr>
                                    <th><input type="checkbox" id="All" @click="checkAll($event)"/>ID</th>
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
                                        <td>{{strd.taxRebateAmount}}</td>
                                        <td><a v-link="{name:'trade-info'}">明细</a> </td>
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
                                                等待对账
                                            </template>
                                            <template v-if="strd.status==4">
                                                对账成功
                                            </template>
                                            <template v-if="strd.status==5">
                                                划付失败
                                            </template>
                                        </td>
                                        <td>
                                            <template v-if="strd.status==1">
                                                <a href="javascript:void(0);" @click="showModalApplyPayById(strd.id)">申请划付</a>&nbsp;
                                                <a href="javascript:void(0);" @click="updateById(strd.id)">更新</a>
                                            </template>
                                            <template v-else>
                                                <a v-link="{'name':'payment-details'}">查看</a>
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

        <div id="modal_applyPay" data-backdrop="static" class="modal fade" style="display: none;">
            <div class="modal-dialog mg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>申请付款</h3>
                        <button type="button" class="close" data-dismiss="modal">×</button>
                    </div>
                     <div class="modal-body">
                         <div class="form-group">
                             您目前选择了 <span style="color:#ff9900; font-size:13px;font-family: Bold;font-weight: 700;">{{applyPayInfo.recordCount}}</span> 条划付记录，共计 <span style="color: #008000;font-family: Bold;font-weight: 700;">{{applyPayInfo.tradeCount}}</span>  笔， <span style="color: #ff0000;font-family: Bold;font-weight: 700;">{{applyPayInfo.payAmount}}</span>  元
                         </div>
                         <div class="form-group">
                             <label class="payment-method"><i style="color:red;">*</i>付款方式：</label>
                             <select id="payType" v-model="payType">
                                 <option v-for="n in payTypes" v-text="n.name" :value="n.type"></option>
                             </select>
                             <label>付款账户：</label>
                             <span >{{showPayAccount}}</span>
                         </div>
                         <div class="form-group">
                             <label>收款方：</label>
                             <input type="text" id="displayName" class="" style="width:89%" v-model="applyPayInfo.displayName"></input>
                         </div>
                         <div class="form-group">
                             <label class="remarks">备&nbsp;&nbsp;  注：</label>
                             <textarea class="remarks-form-control" cols="20" rows="3" v-model="applyPayRemarks"></textarea>
                         </div>
                     </div>
                     <div class="modal-foot">
                        <input type="button" class="btn btn-primary" @click="submit()" value="提交">
                        <input type="button" class="btn btn-gray" @click="" data-dismiss="modal" value="取消">
                     </div>
                </div>
            </div>
        </div> 
    </index>
</template>
<style>
     .box-tbl{
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
    import dialog from '../components/dialog.vue'
    export default{
        data(){
            return{
                subCompanyID:"",
                cityID:"",
                createType:"",
                status:"",
                timeRange:'1',
                startDate:"",
                endDate:"",
                merchantID:"",      
                keywords:"",
                subcompanyList:[],
                pageall:1,
                pagecur:1,
                page_size:15,
                pageIndex:1,
                pageSize:15,
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
                applyPayRemarks:''
            }
        },
        methods:{
            //获取补贴划付数据
             getsubsidyTaxRebateDetailList:function(data){
                this.$http.post('./subsidyTaxRebateDetail/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('subsidyTaxRebateDetailList', response.data.data) : null;
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
            getTwo:function(num){
                if(num.toString().length>=2) return num;
                var str="";
                for(var i=num.toString().length;i<2;i++)
                    str +="0";
                return str + num.toString();
            },
             checkAll:function(ck){
                if(ck.target.checked){
                    $("input[name='ckbox']").prop({'checked':true});
                }else{
                    $("input[name='ckbox']").prop({'checked':false});
                }
            },
            clear:function(){
                $('#displayName').attr("readonly",false);
                this.applyPayRemarks="", 
                this.applyPayInfo={payType:{
                       1:"",
                       2:""
                    }};
            },
            showModalApplyPay:function(){
                this.clear();
                //批量划付判断首款信息是否一致
                var AccountS = [];
                $("input[name='ckbox']:checked").each(function(){
                  AccountS.push($(this).prop("class"));  
                });
                if(AccountS.length<=0){
                   alert("请选择一条或多条记录，进行申请划付！");
                   return false
                }
                for (var i = 1; i < AccountS.length; i++) {
                   if (AccountS[i] != AccountS[0]) {  // 遇到了不等于x[0]的元素，设置 flag = 1，然后跳出循环
                        alert("选择的划付记录收款账户要一致！");
                        return false
                   }
                }
                let array = [];
                $("input[name='ckbox']:checked").each(function(){
                  array.push($(this).prop("id"));  
                });
                this.getApplyPayInfoByIDs(array);
            },
            updateById:function(id){
                this.$http.post('./subsidyTaxRebateDetail/update/'+id).then(function(response){
                    if(response.data.code==0){
                        this.query();
                        swal({
                            title: "更新成功！",
                            type:"success",
                            confirmButtonColor: "#2196F3"
                        }) 
                    }else{
                        swal({
                            title: "更新失败！",
                            type:"error",
                            confirmButtonColor: "rgb(244,​ 67,​ 54)"
                        }) 
                    }
                });
            },
            showModalApplyPayById:function(id){
                let array=[];
                array.push(id);
                this.getApplyPayInfoByIDs(array);
                $('#displayName').attr("readonly",true);
                $('#displayName').attr("class",id);
            },
             getApplyPayInfoByIDs:function(idArray){
                console.log(idArray);
                let data={
                    ids:idArray
                }
                this.$http.post('./subsidyTaxRebateDetail/selectApplyPayInfoByIDs',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若
                        (response.data.code==0) ? this.$set('applyPayInfo', response.data.data) : null;
                        this.payTypes=this.applyPayInfo.payType;
                        for(var i in this.payTypes){
                            if(this.payType == this.payTypes[i].type){
                                this.showPayAccount=this.payTypes[i].value
                            }
                        }
                        // this.showPayAccount=this.payTypes[0].value;
                        $('#modal_applyPay').modal('show');
                        console.log(this.applyPayInfo);
                    }, function (response) {
                        console.log(response);
                    });
            },
            submit:function(){
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
               this.$http.post('./subsidyTaxRebateDetail/applyPay',data).then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if (response.data.code==0)
                        {
                            alert("保存成功！");
                            this.query();
                        }
                    }, function (response) {
                        console.log(response);
                    });
                     //关闭弹出层
                    $(".modal").modal("hide");
            },
            query: function () {
                // let data=this.data;
                if (this.startDate=="" && this.endDate=="") {
                    var d=new Date()
                    var day=d.getDate()
                    var month=d.getMonth() + 1
                    var year=d.getFullYear()
                    this.startDate=year + "-" + this.getTwo(month) + "-" + this.getTwo(day-7);
                    this.endDate=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                }
                let data={
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
        },
        ready: function () {
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
            this.getsubsidyTaxRebateDetailList(data);
            this.getSubcompany({});
            this.getCity({});
        },
         watch:{
            payType:function(){
                let type=$("#payType").val()
                for(var i in this.payTypes){
                    if(type == this.payTypes[i].type){
                        this.showPayAccount=this.payTypes[i].value
                    }
                }
            },
            timeRange:function(){
                console.log();
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
        }
    }
</script>