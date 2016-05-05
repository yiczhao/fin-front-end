<template>
    <index title="补贴退税" ptitle="备付金支出"  isshow="isshow">
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
                            </form> 
                        </div>
                        <div class="box-body box-tbl">
                            <table id="table1" class="table table-bordered table-hover">
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
                                    <tr v-if="!!subsidyTaxRebateDetailList.length" v-for="strd in subsidyTaxRebateDetailList">
                                        <td>{{strd.id}}</td>
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
                                        <td><a :href="strd.id">明细</a> </td>
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
                                                <a href="#">申请划付</a>&nbsp;
                                                <a href="#">更新</a>
                                            </template>
                                            <template v-else>
                                                <a href="#">查看</a>
                                            </template>
                                        </td>
                                        <td>{{strd.remarks}}</td>
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
    .box-tbl{
        overflow:auto;
    }
    .page-bar{
        margin: 25px auto;
        text-align: center;
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
                keywords:"",
                subcompanyList:[],
                pageall:1,
                pagecur:1,
                page_size:15,
                pageIndex:1,
                pageSize:15,
                cityList:[],
                subsidyTaxRebateDetailList:[]
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
            query: function () {
                // let data=this.data;
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
            this.getsubsidyTaxRebateDetailList({});
            this.getSubcompany({});
            this.getCity({});
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