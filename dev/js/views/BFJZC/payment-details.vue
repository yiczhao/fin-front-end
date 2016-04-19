<template>
    <index :title="'备付金付款明细'"
           :ptitle="'备付金支出'"
           :hname="'account-management'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="m20">
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.merchantId">
                                    <option value="">请选择账户</option>
                                    <option value="0">南昌备付金</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.orderNumber" placeholder="订单号">
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="dateS">
                                    <option value="">请选择日期</option>
                                    <option value="0">昨天</option>
                                    <option value="1">最近一周</option>
                                    <option value="2">最近一个月</option>
                                    <option value="3">最近三个月</option>
                                    <option value="4">自定义时间</option>
                                </select>
                            </div>
                            <div class="form-group" v-show="dateS==4">
                                <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                                <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                            </div>
                        </div>
                        <div  class="">
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.certificate" placeholder="凭证号">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.keyword" placeholder="收款方、账户名、账号">
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.status">
                                    <option value="">请选择对账状态</option>
                                    <option value="1">成功</option>
                                    <option value="0">待对账</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.purpose">
                                    <option value="">请选择用途</option>
                                    <option value="1">佣金划付</option>
                                    <option value="2">往来款</option>
                                    <option value="3">转账退款</option>
                                    <option value="4">账户费用</option>
                                    <option value="5">其它</option>
                                    <option value="6">往来款</option>
                                    <option value="7">转账退款</option>
                                    <option value="8">账户费用</option>
                                    <option value="9">其它</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="备注">
                            </div>
                            <div class="form-group">
                                <input type="button" class="btn btn-info" v-on:click="checkNew" value="查询">
                            </div>
                            <!--<div class="form-group">-->
                            <!--<input type="button" class="btn btn-info" value="导出">-->
                            <!--</div>-->
                        </div>
                    </form>
                </div>
            </div>
            <div v-if="!!zdlists.length" class="panel panel-flat panel-collapsed" v-for="n in zdlists">
                <div class="panel-heading bgddd">
                    <div class="panel-title">
                        <p>
                            <span>订单号:{{n.orderNumber}}</span>
                            <span>付款金额:{{n.payoutAmount/100 | currency '' }}</span>
                            <span>付款账户:{{n.payoutAccount}}</span>
                            <span>收款方:{{n.payoutAccountName}}</span>
                            <span>付款账户名:{{n.payoutAccountName}}</span>
                            <span>付款账号:{{n.payoutAccountNumber}}</span>
                            <span>收款账户名:{{n.incomeAccountName}}</span>
                            <span>收款账号:{{n.incomeAccountNumber}}</span>
                            <span>银行凭证号:{{n.certificate}}</span>
                            <span>付款时间:{{n.paymentTime}}</span>
                            <span>用途:{{n.purpose}}</span>
                            <span>收款开户行:{{n.incomeBankName}}</span>
                            <span>申请分公司:{{n.applyCompany}}</span>
                            <span>申请时间:{{n.applyTime}}</span>
                            <span>状态:{{n.message}}</span>
                            <span>对账时间:</span>
                        </p>
                        <p>备注:{{n.remarks}}</p>
                    </div>
                    <div class="pull-right">
                        <span class="pull-left">查看详情</span>
                        <ul class="icons-list pull-left" >
                            <li><a data-action="collapse"></a></li>
                        </ul>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr  role="row">
                                <th>生成日期</th>
                                <th>商户名称</th>
                                <th>划付金额</th>
                                <th>用途</th>
                                <th>操作</th>
                                <th>状态</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" >
                                <td>20150703</td>
                                <td>3898|深圳探鱼海岸城店</td>
                                <td>{{7985111/100 | currency '' }}</td>
                                <td>补贴划付</td>
                                <td><a href="">详情</a></td>
                                <td>等待划付</td>
                                <td>0000134|20150602至20150630|共计156笔</td>
                            </tr>
                            <tr role="row" v-if="!!zdlists.length" v-for="(index,trlist) in zdlists">
                                <td>{{index+1}}</td>
                                <td>{{trlist.certificate}}</td>
                                <td>{{trlist.collectionName}}</td>
                                <td>{{trlist.accountName}}</td>
                                <td>{{trlist.accountNumber}}</td>
                                <td>{{trlist.incomeAmount/100 | currency '' }}</td>
                                <td>{{trlist.payoutAmount/100 | currency '' }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="pull-right">
                            <input type="button" class="btn btn-gray" value="对账">
                        </div>
                    </div>
                </div>
            </div>
            <!--<div class="panel panel-flat panel-collapsed">-->
                <!--<div class="panel-heading bgddd">-->
                    <!--<div class="panel-title">-->
                        <!--<p>-->
                            <!--<span>订单号:20150802105038252</span>-->
                            <!--<span>付款金额:{{5800000/100 | currency '' }}</span>-->
                            <!--<span>付款账户:深圳备付金</span>-->
                            <!--<span>收款方:深圳探鱼餐饮管理有限公司</span>-->
                            <!--<span>付款账户名:深圳卡说信息技术有限公司</span>-->
                            <!--<span>付款账号:36001050307052502264</span>-->
                            <!--<span>收款账户名:深圳探鱼餐饮管理有限公司</span>-->
                            <!--<span>收款账号:626606960</span>-->
                            <!--<span>银行凭证号:</span>-->
                            <!--<span>付款时间:</span>-->
                            <!--<span>用途:补贴划付</span>-->
                            <!--<span>收款开户行:民生银行海岸城支行</span>-->
                            <!--<span>申请分公司:深圳卡说</span>-->
                            <!--<span>申请时间:2015-08-02 10:50:38</span>-->
                            <!--<span>状态:待划付</span>-->
                            <!--<span>对账时间:</span>-->
                        <!--</p>-->
                        <!--<p>备注:浦发银行[随机折扣1到5，就是这么任性！2015第一季],深圳探鱼4家门店,20150602至20150630补贴划付款</p>-->
                    <!--</div>-->
                    <!--<div class="pull-right">-->
                        <!--<span class="pull-left">查看详情</span>-->
                        <!--<ul class="icons-list pull-left">-->
                            <!--<li><a data-action="collapse"></a></li>-->
                        <!--</ul>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="dataTables_wrapper no-footer">-->
                    <!--<div class="datatable-scroll">-->
                        <!--<table class="table datatable-selection-single dataTable no-footer">-->
                            <!--<thead>-->
                            <!--<tr  role="row">-->
                                <!--<th>生成日期</th>-->
                                <!--<th>商户名称</th>-->
                                <!--<th>划付金额</th>-->
                                <!--<th>用途</th>-->
                                <!--<th>操作</th>-->
                                <!--<th>状态</th>-->
                                <!--<th>备注</th>-->
                            <!--</tr>-->
                            <!--</thead>-->
                            <!--<tbody>-->
                            <!--<tr role="row" >-->
                                <!--<td>20150703</td>-->
                                <!--<td>3898|深圳探鱼海岸城店</td>-->
                                <!--<td>{{7985111/100 | currency '' }}</td>-->
                                <!--<td>补贴划付</td>-->
                                <!--<td><a href="">详情</a></td>-->
                                <!--<td>等待划付</td>-->
                                <!--<td>0000134|20150602至20150630|共计156笔</td>-->
                            <!--</tr>-->
                            <!--<tr role="row" v-if="!!zdlists.length" v-for="(index,trlist) in zdlists">-->
                                <!--<td>{{index+1}}</td>-->
                                <!--<td>{{trlist.certificate}}</td>-->
                                <!--<td>{{trlist.collectionName}}</td>-->
                                <!--<td>{{trlist.accountName}}</td>-->
                                <!--<td>{{trlist.accountNumber}}</td>-->
                                <!--<td>{{trlist.incomeAmount/100 | currency '' }}</td>-->
                                <!--<td>{{trlist.payoutAmount/100 | currency '' }}</td>-->
                            <!--</tr>-->
                            <!--</tbody>-->
                        <!--</table>-->
                        <!--<div class="pull-right">-->
                            <!--<input type="button" class="btn btn-gray" value="确认划付">-->
                            <!--<input type="button" class="btn btn-gray" value="退回重审">-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="panel panel-flat panel-collapsed">-->
                <!--<div class="panel-heading bgddd">-->
                    <!--<div class="panel-title">-->
                        <!--<p>-->
                            <!--<span>订单号:20150802105038252</span>-->
                            <!--<span>付款金额:{{5800000/100 | currency '' }}</span>-->
                            <!--<span>付款账户:深圳备付金</span>-->
                            <!--<span>收款方:深圳探鱼餐饮管理有限公司</span>-->
                            <!--<span>付款账户名:深圳卡说信息技术有限公司</span>-->
                            <!--<span>付款账号:36001050307052502264</span>-->
                            <!--<span>收款账户名:深圳探鱼餐饮管理有限公司</span>-->
                            <!--<span>收款账号:626606960</span>-->
                            <!--<span>银行凭证号:</span>-->
                            <!--<span>付款时间:</span>-->
                            <!--<span>用途:补贴划付</span>-->
                            <!--<span>收款开户行:民生银行海岸城支行</span>-->
                            <!--<span>申请分公司:深圳卡说</span>-->
                            <!--<span>申请时间:2015-08-02 10:50:38</span>-->
                            <!--<span>状态:待划付</span>-->
                            <!--<span>对账时间:</span>-->
                        <!--</p>-->
                        <!--<p>备注:浦发银行[随机折扣1到5，就是这么任性！2015第一季],深圳探鱼4家门店,20150602至20150630补贴划付款</p>-->
                    <!--</div>-->
                    <!--<div class="pull-right">-->
                        <!--<span class="pull-left">查看详情</span>-->
                        <!--<ul class="icons-list pull-left mt0">-->
                            <!--<li><a data-action="collapse"></a></li>-->
                        <!--</ul>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="dataTables_wrapper no-footer">-->
                    <!--<div class="datatable-scroll">-->
                        <!--<table class="table datatable-selection-single dataTable no-footer">-->
                            <!--<thead>-->
                            <!--<tr  role="row">-->
                                <!--<th>生成日期</th>-->
                                <!--<th>商户名称</th>-->
                                <!--<th>划付金额</th>-->
                                <!--<th>用途</th>-->
                                <!--<th>操作</th>-->
                                <!--<th>状态</th>-->
                                <!--<th>备注</th>-->
                            <!--</tr>-->
                            <!--</thead>-->
                            <!--<tbody>-->
                            <!--<tr role="row" >-->
                                <!--<td>20150703</td>-->
                                <!--<td>3898|深圳探鱼海岸城店</td>-->
                                <!--<td>{{7985111/100 | currency '' }}</td>-->
                                <!--<td>补贴划付</td>-->
                                <!--<td><a href="">详情</a></td>-->
                                <!--<td>等待划付</td>-->
                                <!--<td>0000134|20150602至20150630|共计156笔</td>-->
                            <!--</tr>-->
                            <!--<tr role="row" >-->
                                <!--<td>20150703</td>-->
                                <!--<td>3898|深圳探鱼海岸城店</td>-->
                                <!--<td>{{7985111/100 | currency '' }}</td>-->
                                <!--<td>补贴划付</td>-->
                                <!--<td><a href="">详情</a></td>-->
                                <!--<td>等待划付</td>-->
                                <!--<td>0000134|20150602至20150630|共计156笔</td>-->
                            <!--</tr>-->
                            <!--<tr role="row" >-->
                                <!--<td>20150703</td>-->
                                <!--<td>3898|深圳探鱼海岸城店</td>-->
                                <!--<td>{{7985111/100 | currency '' }}</td>-->
                                <!--<td>补贴划付</td>-->
                                <!--<td><a href="">详情</a></td>-->
                                <!--<td>等待划付</td>-->
                                <!--<td>0000134|20150602至20150630|共计156笔</td>-->
                            <!--</tr>-->
                            <!--<tr role="row" v-if="!!zdlists.length" v-for="(index,trlist) in zdlists">-->
                                <!--<td>{{index+1}}</td>-->
                                <!--<td>{{trlist.certificate}}</td>-->
                                <!--<td>{{trlist.collectionName}}</td>-->
                                <!--<td>{{trlist.accountName}}</td>-->
                                <!--<td>{{trlist.accountNumber}}</td>-->
                                <!--<td>{{trlist.incomeAmount/100 | currency '' }}</td>-->
                                <!--<td>{{trlist.payoutAmount/100 | currency '' }}</td>-->
                            <!--</tr>-->
                            <!--</tbody>-->
                        <!--</table>-->
                        <!--<div class="pull-right">-->
                            <!--<input type="button" class="btn btn-gray" value="更新订单">-->
                            <!--<input type="button" class="btn btn-gray" value="申请划付">-->
                            <!--<input type="button" class="btn btn-gray" value="关闭订单">-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="datatable-footer pd15">-->
                        <!--失败原因：<span>余额不足。</span>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        </div>
    </index>
</template>
<style>
    .m20{
        margin-bottom:20px;
    }
    .mt0{
        margin-top: 0
    }
    .page-bar{
        margin: 25px auto;
        text-align: center;
    }
    .panel-title p span{
        width: 24%;
        margin-bottom: 3px;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 13px;
    }
   .panel-heading .pull-right{
        position: absolute;
        right: 10px;
        bottom: 30px;
       cursor: pointer;
        background: #ECECEC;
    }
   .dataTables_wrapper{
       display: none;
   }
   .datatable-scroll{
       overflow: hidden;
       padding-bottom: 20px;
       padding-top: 20px;
   }
    .datatable-scroll table{
        float: left;
        width: 80%;
        border: 1px solid #ccc;
        margin-left: 20px;
    }
    .datatable-scroll .pull-right{
        width: 15%;
    }
    .pull-right input{
        width: 80%;
        margin-bottom: 15px;
    }
    .panel-flat > .panel-heading.bgddd{
        background: #ECECEC;
    }
    div.datatable-footer.pd15{
        padding: 15px 20px;
        font-weight: bolder;
    }
    div.datatable-footer.pd15 span{
        color:red;
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    export default{
        data(){
            return{
                pagecur:1,
                page_size:15,
                pageall:1,
                dateS:'',
                checkForm:{
                    merchantId: '',
                    orderNumber: '',
                    certificate:'',
                    keyword:'',
                    status:'',
                    purpose:'',
                    remarks:'',
                    startDate:'',
                    endDate:'',
                    pageIndex:1,
                    pageSize:15
                },
                zdlists:[
                    {
                        "orderNumber": "20150802105038252",
                        "payoutAccount": "深圳备付金",
                        "payoutAccountNumber": "36001050307052502264",
                        "payoutAccountName": "深圳探鱼餐饮管理有限公司",
                        "payoutAmount": 58000,
                        "incomeAccount": "深圳探鱼餐饮管理有限公司",
                        "incomeAccountNumber": "626606960",
                        "incomeAccountName": "深圳探鱼餐饮管理有限公司",
                        "incomeBankName": "民生银行海岸城支行",
                        "certificate": "",
                        "purpose": "1",
                        "paymentTime": "2015-08-02 10:50:38",
                        "applyTime": "2015-08-02 10:50:38",
                        "applyCompany": "深圳卡说",
                        "remarks": "",
                        "status": 0
                    },
                    {
                        "orderNumber": "20150802105038252",
                        "payoutAccount": "深圳备付金",
                        "payoutAccountNumber": "36001050307052502264",
                        "payoutAccountName": "深圳探鱼餐饮管理有限公司",
                        "payoutAmount": 58000,
                        "incomeAccount": "深圳探鱼餐饮管理有限公司",
                        "incomeAccountNumber": "626606960",
                        "incomeAccountName": "深圳探鱼餐饮管理有限公司",
                        "incomeBankName": "民生银行海岸城支行",
                        "certificate": "",
                        "purpose": "1",
                        "paymentTime": "2015-08-02 10:50:38",
                        "applyTime": "2015-08-02 10:50:38",
                        "applyCompany": "深圳卡说",
                        "remarks": "",
                        "status": 0
                    },
                ],
            }
        },
        methods:{
            // *** 请求账户数据
            getZlists:function(data){
                if(data.endDate<data.startDate){
                    let a=data.endDate,b=data.startDate;
                    this.checkForm.startDate=a;
                    this.checkForm.endDate=b;
                    data.startDate=a;
                    data.endDate=b;
                }
                this.$http.post('./reservecash/order/list',data)
                        .then(function (response) {
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                            (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                        }, function (response) {
                            console.log(response);
                        });
            },
            initList:function(){
                $(".modal").modal("hide");
                this.getZlists(this.checkForm);
            },
            checkNew:function(){
                this.getZlists(this.checkForm);
            }
        },
        watch:{
            pagecur:function(){
                this.checkForm.pageIndex=this.pagecur;
                this.initList();
            },
            page_size:function(){
                this.checkForm.pageSize=this.page_size;
                this.initList();
            },
            dateS:function(){
                var d=new Date()
                var day=d.getDate()
                var month=d.getMonth() + 1
                var year=d.getFullYear()
                var newD;
                switch (this.dateS){
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
                this.checkForm.startDate=newD;
                this.checkForm.endDate=endD;
            }
        },
        components:{
            'datepicker': datepicker,
        },
    }
    // Collapse on click
    $(document).on('click','.panel-heading .pull-right',function (e) {
        e.preventDefault();
        var $categoryCollapse = $(this).closest('.panel-heading').nextAll();
        $(this).find('.icons-list [data-action=collapse]').parents('.category-title').toggleClass('category-collapsed');
        $(this).find('.icons-list [data-action=collapse]').toggleClass('rotate-180');
        $categoryCollapse.slideToggle(150);
    });
</script>