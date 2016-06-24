<template>
    <index title="预付款划付" ptitle="备付金支出"  isshow="isshow">
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
                                <input type="text" class="form-control" v-model="advanceId" placeholder="预付款流水ID" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="merchantID" placeholder="商户ID"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="keywords" placeholder="商户名、收款账户名、帐号" style="width:185px">
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="status">
                                        <option value="">请选择状态</option>
                                        <option value="0">已关闭</option>
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
                            </form> 
                        </div>
                        <div v-show="!!advancePaymentDetailList.length" class="dataTables_wrapper no-footer">
                            <div class="datatable-scroll">
                                <table id="table1" class="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>申请时间</th>
                                            <th>分公司</th>
                                            <th>城市</th>
                                            <th>付款账户</th>
                                            <th>商户ID</th>
                                            <th>商户名称</th>
                                            <th>收款账户信息</th>
                                            <th>预付金额</th>
                                            <th>账户详情</th>
                                            <th>状态</th>
                                            <th>付款流水</th>
                                            <th>备注</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(index,apd) in advancePaymentDetailList">
                                            <td>{{index+1}}</td>
                                            <td>{{apd.applyTime | datetime}}</td>
                                            <td>{{apd.subCompanyName}}</td>
                                            <td>{{apd.cityName}}</td>
                                            <td>{{apd.payAccount}}</td>
                                            <td>{{apd.merchantOperationID}}</td>
                                            <td>{{apd.merchantName}}</td>
                                            <td>{{apd.collectionAccountName}}<br/>{{apd.collectionAccountNumber}}</td>
                                            <td>{{apd.advancePaymentAmount/100 | currency ''}}</td>
                                            <td><a @click="gopreinfo(apd.id,4,apd.advancePaymentMerchantId)">查看</a></td>
                                            <td>
                                                <template v-if="apd.status==0">已关闭</template>
                                                <template v-if="apd.status==1">等待审核</template>
                                                <template v-if="apd.status==2">等待划付</template>
                                                <template v-if="apd.status==3">转账中</template>
                                                <template v-if="apd.status==4">等待对账</template>
                                                <template v-if="apd.status==5">对账成功</template>
                                                <template v-if="apd.status==6">划付失败</template>
                                            </td>
                                            <td><a v-if="apd.status!=1" @click="gopayment(apd.id,4)">查看</a></td>
                                            <td>{{apd.remarks}}</td>
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
                            未查询到预付款划付数据！
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
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/BFJZC/advance_model'
    export default{
        data(){
            this.model=model(this);
            return{
                advanceId:"",
                subCompanyID:"",
                cityID:"",
                createType:"",
                status:"",
                remarks:"",
                timeRange:'1',
                startDate:"",
                endDate:"",
                merchantID:"",      
                merchantName:"",
                keywords:"", 
                seriesNumber:"",        
                subcompanyList:[],
                pageall:1,
                pagecur:1,
                page_size:10,
                pageIndex:1,
                pageSize:10,
                cityList:[],
                advancePaymentDetailList:[]
            }
        },
        methods:{
            //获取补贴划付数据
             getadvancePaymentDetailList(data){
                this.model.advance_list(data)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('advancePaymentDetailList', response.data.data) : null;
                        (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                    });
            },
             //获取分公司数据
            getSubcompany(){
                 this.$common_model.getcompany()
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('subcompanyList', response.data.data) : null;
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
                        (response.data.code==0) ? this.$set('cityList', response.data.data) : null;
                    });
            },
            query() {
                // let data=this.data;
                if (this.startDate=="" && this.endDate=="") {
                    this.startDate=init_date(this.timeRange)[0];
                    this.endDate=init_date(this.timeRange)[1];
                }
                let data={
                    id:this.advanceId,
                    subCompanyID:this.subCompanyID,
                    cityID:this.cityID,
                    startDate:this.startDate,
                    endDate:this.endDate,
                    merchantOperationID:this.merchantID,
                    keywords:this.keywords,
                    status:this.status,
                    remarks:this.remarks,
                    pageIndex: this.pageIndex, 
                    pageSize: this.pageSize
                    };
                this.getadvancePaymentDetailList(data);
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
            },
            gopreinfo(a,b,_id){
                let data={
                    "streamID":a ,
                    "streamType": b
                }
                this.$common_model.skipToOrder(data)
                        .then((response)=>{
                                if(response.data.code==0){
                                    this.$router.go({'name':'prepayment-info',params:{'id':_id,'orderNumber':response.data.data.orderNumber}});
                                }
                        })
            }
        },
        ready() {
            (this.$route.params.advanceId==':advanceId')?this.advanceId='':this.advanceId=this.$route.params.advanceId;
            this.query();
            this.getCity();
            this.getSubcompany();
        },
         watch:{
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