<template>
    <index title="交易明细" ptitle="财务处理"  isshow="isshow">
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
                                    <select class="form-control" v-model="type">
                                    <option value="">请选择交易类型</option>
                                    <option value="1">正常交易</option>
                                    <option value="2">手工单</option>
                                        <option v-for="(index,n) in typelists" v-text="n.value" :value="n.accountType"></option>
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
                                <div class="form-group" v-show="timeRange=='LASTTHREEMONTHS'">
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
                                    <input type="text" class="form-control" v-model="seriesNumber" placeholder="交易流水号">
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="phone" placeholder="手机号">
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="activityID">
                                    <option value="0">请选择参与活动</option>
                                        <option v-for="(index,n) in typelists" v-text="n.value" :value="n.accountType"></option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" v-on:click="query" value="查询">
                                </div>
                            </form>
                        </div>
                        <div class="box-body">
                            <table id="table1" class="table table-bordered table-hover">
                                <thead>
                                <tr>
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
                                <tr v-if="!!tradeList.length" v-for="trlist in tradeList">
                                    <td>{{trlist.id}}</td>
                                    <td>{{trlist.serialNumber}}</td>
                                    <td>{{trlist.subCompanyName}}</td>
                                    <td>{{trlist.cityName}}</td>
                                    <td>{{trlist.merchantID}}</td> 
                                    <td>{{trlist.merchantName}}</td>
                                    <td>{{trlist.consumptionAmount}}</td>
                                    <td>{{trlist.discountAmount}}</td>
                                    <td>{{trlist.payAmount}}</td>
                                    <td>{{trlist.limitDeduct}}</td>
                                    <td>{{trlist.principalDeduct}}</td>
                                    <td>{{trlist.thirdpartyReceivable}}</td>
                                    <td>{{trlist.merchantSubsidyShould}}</td>
                                    <td>{{trlist.suspensionTax}}</td>
                                    <td>{{trlist.merchantSubsidyActual}}</td>
                                    <td>{{trlist.discountDiff}}</td>
                                    <td>{{trlist.collectionAmount}}</td>
                                    <td>{{trlist.commission33211}}</td>
                                    <td>{{trlist.entryAmount}}</td>
                                    <td>{{trlist.tradeTime}}</td>
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
                                            <a href="#">详情</a>
                                        </template>
                                    </td>
                                    <td>{{trlist.remarks}}</td>
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
        </section>
    </index>
</template>
<style>
    body{
        background-color:#fff;
    }
    .box-body{
        overflow:auto;
    }
    .page-bar{
        margin: 25px auto;
        text-align: center;
    }
    .box-body #table1 th{
        min-width: 85px;
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
                subCompanID:"",
                cityID:"",
                type:"",
                timeRange:"LASTDAY",
                startDate:"",
                endDate:"",
                merchantID:"",      
                merchantName:"",   
                id:"",   
                seriesNumber:"",        
                phone:"",      
                activityID:0,
                subcompanyList:[],
                pageall:1,
                pagecur:1,
                page_size:15,
                tradeList:[],
                cityList:[]
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
            this.getTradeList({});
            this.getSubcompany({});
            this.getCity({});
        },
        components:{
           'datepicker': datepicker,
           'dialog': dialog,
        }
    }
</script>