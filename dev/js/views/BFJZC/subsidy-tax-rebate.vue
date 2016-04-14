<template>
    <index title="补贴退税" ptitle="备付金之出"  isshow="isshow">
        <section class="content" slot="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <form class="form-inline manage-form">
                                <br/>
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
                                    <select class="form-control" v-model="timeRange">
                                    <option value="LASTDAY">最近一周</option>
                                    <option value="LASTWEEK">最近一个月</option>
                                    <option value="LASTMONTH">最近三个月</option>
                                    <option value="LASTTHREEMONTHS">自定义</option>
                                    </select>
                                </div>
                                <br/>
                                <br/>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="merchantID" placeholder="商户ID">
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="merchantName" placeholder="商户名、收款账户名、帐号">
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
                                    <option value="0">请选择参与活动</option>
                                        <option v-for="(index,n) in typelists" v-text="n.value" :value="n.accountType"></option>
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
                                    <input type="text" class="form-control" v-model="remark" placeholder="备注">
                                </div>
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" v-on:click="" value="查询">
                                </div>
                            </form> 
                        </div>
                        <div class="box-body">
                            <table id="table1" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
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
                                    <tr v-if="!!subsidyAppropriationList.length" v-for="sa in subsidyAppropriationList">
                                        <td>{{sa.ID}}</td>
                                        <td>{{sa.createAT}}</td>
                                        <td>{{sa.subCompanyName}}</td>
                                        <td>{{sa.cityName}}</td>
                                        <td>{{sa.paymentAccount}}</td>
                                        <td>{{sa.merchantID}}</td>
                                        <td>{{sa.merchantName}}</td>
                                        <td>{{sa.proceedsPerson}}{{sa.proceedsAccount}}</td>
                                        <td>
                                            <template v-if="sa.createType==1">
                                                系统生成
                                            </template>
                                            <template v-if="sa.createType==2">
                                                手工录入
                                            </template>
                                        </td>
                                        <td>{{sa.thirdpartySubsidyShould}}</td>
                                        <td>{{sa.payAmount}}</td>
                                        <td>{{sa.status}}
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
                                        <td>{{sa.activityName}}</td>
                                        <td>{{sa.remarks}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer">
                            <page :all="pageall"
                                  :cur.sync="pagecur"
                                  :page_size.sync="page_size">
                            </page>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </index>
</template>
<style>
    .box-body{
        overflow:auto;
    }
    .page-bar{
        margin: 25px auto;
        text-align: center;
    }
    th{
        min-width: 85px;
    }
</style>
<script>
    export default{
        data(){
            return{
                subCompanID:"",
                cityID:"",
                createType:"",
                status:"",
                timeRange:"LASTDAY",
                merchantID:"",      
                merchantName:"",   
                id:"",   
                seriesNumber:"",        
                activityID:0,
                subcompanyList:[],
                pageall:1,
                pagecur:1,
                page_size:15,
                cityList:[],
                subsidyAppropriationList:[]
            }
        },
        methods:{
            //获取补贴划付数据
             getSubsidyAppropriationList:function(data){
                this.$http.post('./tradedetail/list',data)
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
            query: function () {
                // let data=this.data;
                let data={
                        subCompanID:this.subCompanID,
                        cityID:this.cityID,
                        type:this.type,
                        timeRange:this.timeRange,
                        merchantID:this.merchantID,
                        merchantName:this.merchantName,
                        id:this.id,
                        seriesNumber:this.seriesNumber,        
                        phone:this.phone,      
                        activityID:this.activityID
                    };
                this.getTradeList(data);
            },
        },
        ready: function () {
            this.getSubsidyAppropriationList({});
            this.getSubcompany({});
            this.getCity({});
        },
        components:{
           
        }
    }
</script>