<template>
    <index title="补贴划付" ptitle="备付金支出"  isshow="isshow">
        <section class="content" slot="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
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
                                    <input type="text" class="form-control" v-model="keywords" placeholder="商户名、收款账户名、帐号">
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="createType">
                                        <option value="">请选择生成方式</option>
                                        <option value="1">系统生成</option>
                                        <option value="2">手工录入</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="activityID">
                                    <option value="">请选择参与活动</option>
                                        <option v-for="(index,n) in activityList" v-text="n.name" :value="n.activityID"></option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="status">
                                        <option value="">请选择状态</option>
                                        <option value="1">等待审核</option>
                                        <option value="2">等待划付</option>
                                        <option value="3">等待对账</option>
                                        <option value="4">对账成功</option>
                                        <option value="5">划付失败</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="remarks" placeholder="备注">
                                </div>
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" v-on:click="query" value="查询">
                                </div>
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" data-toggle="modal" @click="showModalApplyPay" value="批量划付">
                                </div>
                            </form> 
                        </div>
                        <div v-show="!!subsidyAppropriationList.length" class="box-body box-tbl">
                            <table   id="table1" class="table table-bordered table-hover">
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
                                                <input type="checkbox" disabled="true" name="ckbox-disabled" :id="sa.id"/>{{sa.id}}</td>
                                            </template>
                                            <template v-else>
                                                <input type="checkbox" name="ckbox" :id="sa.id" :class="sa.receiptAccountName+sa.receiptAccountNumber"/>{{sa.id}}</td>
                                            </template>
                                        </td>
                                        <td>{{sa.createAT}}</td>
                                        <td>{{sa.subCompanyName}}</td>
                                        <td>{{sa.cityName}}</td>
                                        <td>{{sa.paymentAccountShortName}}</td>
                                        <td>{{sa.merchantID}}</td>
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
                                        <td>{{sa.payAmount}}</td>
                                        <td><a href="#">明细</a></td>
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
                                                等待对账
                                            </template>
                                            <template v-if="sa.status==4">
                                                对账成功
                                            </template>
                                            <template v-if="sa.status==5">
                                                划付失败
                                            </template>
                                        </td>
                                        <td>
                                            <template v-if="sa.status==1">
                                                <a href="#">申请划付</a></td>&nbsp;
                                                <a href="#">更新</a></td>
                                            </template>
                                            <template v-else>
                                                <a href="#">查看</a></td>
                                            </template>
                                        
                                        <td>{{sa.activityName}}</td>
                                        <td>{{sa.remarks}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="box-footer">
                            <page :all="pageall"
                                  :cur.sync="pagecur"
                                  :page_size.sync="page_size">
                            </page>
                        </div>
                        </div>
                        <div style="padding: 30px;font-size: 16px;text-align: center" v-else>
                            未查询到员工数据信息！
                        </div>

                        <div id="modal_applyPay" data-backdrop="static" class="modal fade" style="display: none;">
                            <div class="modal-dialog mg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h3>合并付款</h3>
                                        <button type="button" class="close" data-dismiss="modal">×</button>
                                    </div>
                                     <div class="modal-body">
                                         <div class="form-group">
                                             您目前选择了 <span style="color:#ff9900; font-size:13px;font-family: Bold;font-weight: 700;">{{applyPayInfo.recordCount}}</span> 条划付记录，共计 <span style="color: #008000;font-family: Bold;font-weight: 700;">{{applyPayInfo.tradeCount}}</span>  笔， <span style="color: #ff0000;font-family: Bold;font-weight: 700;">{{applyPayInfo.payAmount}}</span>  元
                                         </div>
                                         <div class="form-group">
                                             <label class="payment-method"><i style="color:red;">*</i>付款方式：</label>
                                             <select v-model="">
                                                 <option value="">备付金账户</option>
                                                 <option value="2">商户预付款账户</option>
                                             </select>
                                             <label>付款账户：</label>
                                             <span>南宁卡说信息技术有限公司</span>
                                         </div>
                                         <div class="form-group">
                                             <label>收款方：</label><span>{{applyPayInfo.displayName}}</span>
                                         </div>
                                         <div class="form-group">
                                             <label class="remarks">备  注：</label>
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

                    </div>
                </div>
            </div>
        </div>
    </index>
</template>
<style scoped>

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
        width: 92%;
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
                timeRange:'',
                startDate:"",
                endDate:"",
                merchantID:"",      
                merchantName:"",
                keywords:"",  
                id:"",
                remarks:"",   
                seriesNumber:"",        
                activityID:"",
                subcompanyList:[],
                pageall:1,
                pagecur:1,
                page_size:15,
                pageIndex:1,
                pageSize:15,
                activityList:[],
                cityList:[],
                subsidyAppropriationList:[],
                applyPayInfo:{},
                applyPayRemarks:''

            }
        },
        methods:{
            //获取补贴划付数据
             getSubsidyAppropriationList:function(data){
                this.$http.post('./subsidypaydetail/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('subsidyAppropriationList', response.data.data) : null;
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
            checkAll:function(ck){
                if(ck.target.checked){
                    $("input[name='ckbox']").prop({'checked':true});
                }else{
                    $("input[name='ckbox']").prop({'checked':false});
                }
            },
            clear:function(){
                this.applyPayInfo={};
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

                
                var array = [];
                $("input[name='ckbox']:checked").each(function(){
                  array.push($(this).prop("id"));  
                });
                let data={
                    ids:array
                }
                this.$http.post('./subsidypaydetail/selectApplyPayInfoByIDs',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若
                        (response.data.code==0) ? this.$set('applyPayInfo', response.data.data) : null;
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
                let data={
                    ids:array,
                    remarks:this.applyPayRemarks,
                    displayName:this.applyPayInfo.displayName,
                }
               this.$http.post('./subsidypaydetail/applyPay',data).then(function (response) {
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
            getTwo:function(num){
                if(num.toString().length>=2) return num;
                var str="";
                for(var i=num.toString().length;i<2;i++)
                    str +="0";
                return str + num.toString();
            },
            query: function () {
                // let data=this.data;
                let data={
                    subCompanyID:this.subCompanyID,
                    cityID:this.cityID,
                    startDate:this.startDate,
                    endDate:this.endDate,
                    merchantID:this.merchantID,
                    createType:this.createType,
                    status:this.status,
                    activityID:this.activityID,
                    remarks:this.remarks,
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize,
                    keywords:this.keywords 
                    };
                this.getSubsidyAppropriationList(data);
            },
        },
        ready: function () {
            this.getSubsidyAppropriationList({});
            this.getSubcompany({});
            this.getCity({});
            this.getactivitys({});
        },
         watch:{
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