<template>
    <index :title="'备付金付款明细'"
           :ptitle="'备付金支出'"
           :hname="'account-management'"
           :isshow="'isshow'">
        <div class="content details" slot="content">
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
                        </div>
                    </form>
                </div>
            </div>
            <div v-if="!!zdlists.length" class="panel panel-flat panel-collapsed" v-for="(index,n) in zdlists">
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
                            <span>付款时间:{{n.paymentTime | datetime}}</span>
                            <span>用途:
                                 <template v-if="n.purpose==1"> 补贴划付</template>
                                 <template v-if="n.purpose==2"> 额度采购</template>
                                 <template v-if="n.purpose==3"> 退税划付</template>
                                 <template v-if="n.purpose==4"> 预付款</template>
                                 <template v-if="n.purpose==5"> 供货商划付</template>
                            </span>
                            <span>收款开户行:{{n.incomeBankName}}</span>
                            <span>申请分公司:{{n.applyCompany}}</span>
                            <span>申请时间:{{n.applyTime | datetime}}</span>
                            <span>
                                状态:
                                 <template v-if="n.status==1"> 等待审核</template>
                                 <template v-if="n.status==2"> 等待划付</template>
                                 <template v-if="n.status==3"> 等待对账</template>
                                 <template v-if="n.status==4"> 对账成功</template>
                                 <template v-if="n.status==5"> 划付失败</template>
                            </span>
                            <span>对账时间:</span>
                        </p>
                        <p>备注:{{n.remarks}}</p>
                    </div>
                    <div class="pull-right" v-on:click="getInfo(index)">
                        <span class="pull-left">查看详情</span>
                        <ul class="icons-list pull-left" >
                            <li><a data-action="collapse"></a></li>
                        </ul>
                    </div>
                </div>
                <div  v-show="!!n.listinfo.length" class="dataTables_wrapper no-footer">
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
                            <tr role="row"  v-for="trlist in n.listinfo">
                                <td>{{trlist.createAt | datetime}}</td>
                                <td>{{trlist.merchantName}}</td>
                                <td>{{trlist.amount/100 | currency '' }}</td>
                                <td>
                                    <template v-if="n.purpose==1"> 补贴划付</template>
                                    <template v-if="n.purpose==2"> 额度采购</template>
                                    <template v-if="n.purpose==3"> 退税划付</template>
                                    <template v-if="n.purpose==4"> 预付款</template>
                                    <template v-if="n.purpose==5"> 供货商划付</template>
                                </td>
                                <td><a href="">详情</a></td>
                                <td>
                                    <template v-if="trlist.status==1"> 等待审核</template>
                                    <template v-if="trlist.status==2"> 等待划付</template>
                                    <template v-if="trlist.status==3"> 等待对账</template>
                                    <template v-if="trlist.status==4"> 对账成功</template>
                                    <template v-if="trlist.status==5"> 划付失败</template>
                                    <template v-if="trlist.status==6"> 已关闭</template>
                                </td>
                                <td>{{trlist.remarks/100}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="pull-right">
                            <template v-if="n.status==2">
                                <input data-toggle="modal" data-target="#modal_waring" type="button" v-on:click="pay(n.id)" class="btn btn-gray" value="确认划付">
                                <input data-toggle="modal" data-target="#modal_submit" type="button" v-on:click="back(n.id)" class="btn btn-gray" value="退回重审">
                            </template>
                            <template v-if="n.status==3">
                                <input data-toggle="modal" data-target="#modal_checking" type="button" v-on:click="checking(n.id)" class="btn btn-gray" value="对账">
                            </template>
                            <template v-if="n.status==5">
                                <input data-toggle="modal" data-target="#modal_waring" type="button" v-on:click="update(n.id)" class="btn btn-gray" value="更新订单">
                                <input data-toggle="modal" data-target="#modal_submit" type="button" v-on:click="apply(n.id)" class="btn btn-gray" value="申请划付">
                                <input data-toggle="modal" data-target="#modal_waring" type="button" v-on:click="close(n.id)" class="btn btn-gray" value="关闭订单">
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <page :all="pageall"
                  :cur.sync="pagecur"
                  :page_size.sync="page_size">
            </page>
            <div id="modal_waring" class="modal fade" style="display: none;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">×</button>
                            <h5 class="modal-title" v-text="waring"></h5>
                        </div>
                        <div class="modal-body">
                            <div class="form-group tc">
                                <button  v-if="waring=='你确认更新账单？'" type="button" v-on:click="updateTrue" class="btn btn-primary">确认</button>
                                <button  v-if="waring=='你确认划付该账单？'" type="button" v-on:click="payTrue" class="btn btn-primary">确认</button>
                                <button  v-if="waring=='你确认关闭该账单？'" type="button" v-on:click="closeTrue" class="btn btn-primary">确认</button>
                                <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="modal_submit" class="modal fade" style="display: none;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">×</button>
                            <h5 class="modal-title" v-text="title"></h5>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label class="col-lg-3 control-label" v-if="subtitle=='退回重审'"><i>*</i>退回原因</label>
                                <label class="col-lg-3 control-label" v-if="subtitle=='申请划付'"><i>*</i>备注</label>
                                <div class="col-lg-9">
                                    <textarea rows="5" cols="5" class="form-control" placeholder=""></textarea>
                                </div>
                            </div>
                            <div class="form-group tc">
                                <button  v-if="subtitle=='退回重审'" type="button" v-on:click="backTrue" class="btn btn-primary">退回</button>
                                <button  v-if="subtitle=='申请划付'" type="button" v-on:click="applyTrue" class="btn btn-primary">申请</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="modal_checking" class="modal fade" style="display: none;">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">×</button>
                            <h5 class="modal-title">对账</h5>
                        </div>
                        <div class="modal-body">
                            <div class="tc f20">
                                请选择备付金银行流水
                            </div>
                            <table class="table datatable-selection-single dataTable no-footer" style="border: 1px solid #ccc;">
                                            <thead>
                                                <tr role="row">
                                                    <th>凭证号</th>
                                                    <th>交易时间</th>
                                                    <th>收款方</th>
                                                    <th>收款信息</th>
                                                    <th>付款金额</th>
                                                    <th>用途</th>
                                                    <th>备注</th>
                                                    <th>操作</th>
                                                </tr>
                                            </thead>
                                        <tbody>
                                            <tr role="row"  v-for="n in checkLists">
                                                <td>{{n.certificate}}</td>
                                                <td>{{n.tradeTime || datetime}}</td>
                                                <td>{{n.collectionName}}</td>
                                                <td>{{n.accountName}}</br>{{n.accountNumber}}</td>
                                                <td>{{n.payoutAmount/100 | currency '' }}</td>
                                                <td>
                                                    <template v-if="n.purpose==1"> 补贴划付</template>
                                                    <template v-if="n.purpose==2"> 额度采购</template>
                                                    <template v-if="n.purpose==3"> 退税划付</template>
                                                    <template v-if="n.purpose==4"> 预付款</template>
                                                    <template v-if="n.purpose==5"> 供货商划付</template>
                                                </td>
                                                <td>{{n.remarks}}</td>
                                                <td><a href="javascript:void(0)" v-on:click="checking(n.reserveCashId)">选择</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </index>
</template>
<style>
    .details .f20{
        font-size: 20px;
        font-weight: bolder;
    }
   .details .form-group{
        overflow: hidden;
    }
    .details   .modal-body label i{
        color:red;
    }
    .details  .modal-body button{
        width:35%;
    }
    .details  .m20{
        margin-bottom:20px;
    }
    .details  .mt0{
        margin-top: 0
    }
    .details .page-bar{
        margin: 25px auto;
        text-align: center;
    }
    .details .panel-title p span{
        width: 24%;
        margin-bottom: 3px;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 13px;
    }
    .details .panel-heading .pull-right{
        position: absolute;
        right: 10px;
        bottom: 30px;
       cursor: pointer;
        background: #ECECEC;
    }
    .details .datatable-scroll{
       overflow: hidden;
       padding-bottom: 20px;
       padding-top: 20px;
   }
    .details .dataTables_wrapper{
        display: none;
    }
    .details .datatable-scroll table{
        float: left;
        width: 80%;
        border: 1px solid #ccc;
        margin-left: 20px;
    }
    .details .datatable-scroll .pull-right{
        width: 15%;
    }
    .details  .pull-right input{
        width: 80%;
        margin-bottom: 15px;
    }
    .details  .panel-flat > .panel-heading.bgddd{
        background: #ECECEC;
    }
    .details div.datatable-footer.pd15{
        padding: 15px 20px;
        font-weight: bolder;
    }
    .details div.datatable-footer.pd15 span{
        color:red;
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    export default{
        data(){
            return{
                id:'',
                pagecur:1,
                page_size:15,
                pageall:1,
                dateS:'1',
                waring:'',
                subtitle:'',
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
                zdlists:[],
                checkLists:[]
            }
        },
        methods:{
            // *** 请求账户数据
            getZlists:function(data){
                this.zdlists=[
                    {
                        id:1,
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
                        "status": 3,
                        listinfo:[]
                    },
                    {
                        id:2,
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
                        "status": 2,
                        listinfo:[]
                    },
                    {
                        id:3,
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
                        "status": 5,
                        listinfo:[]
                    },];
                if(data.endDate<data.startDate){
                    let a=data.endDate,b=data.startDate;
                    this.checkForm.startDate=a;
                    this.checkForm.endDate=b;
                    data.startDate=a;
                    data.endDate=b;
                }
//                this.$http.post('./reservecash/order/list',data)
//                        .then(function (response) {
//                            // *** 判断请求是否成功如若成功则填充数据到模型
//                            (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
//                            (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
//                        }, function (response) {
//                            console.log(response);
//                        });
            },
            initList:function(){
                $(".modal").modal("hide");
                this.getZlists(this.checkForm);
            },
            checkNew:function(){
                this.getZlists(this.checkForm);
            },
            getInfo(a){
                if(this.zdlists[a].listinfo!='')return;
                this.zdlists[a].listinfo=[
                    {
                    "id": 123,
                    "createAt": "2016-04-12 08:32:00",
                    "merchantName": "3898|深圳探鱼海岸城店",
                    "amount": "17095",
                    "purpose": 58000,
                    "remarks": "",
                    "status": 1
                },
                    {
                    "id": 123,
                    "createAt": "2016-04-12 08:32:00",
                    "merchantName": "3898|深圳探鱼海岸城店",
                    "amount": "17095",
                    "purpose": 58000,
                    "remarks": "",
                    "status": 2
                }];
            },
            back(a){
                this.subtitle = '退回重审';
                this.accountId=a;
            },
            apply(a){
                this.subtitle = '申请划付';
                this.accountId=a;
            },
            update(a){
                this.waring = '你确认更新账单？';
                this.accountId=a;
            },
            pay(a){
                this.waring = '你确认划付该账单？';
                this.accountId=a;
            },
            close(a){
                this.waring = '你确认关闭该账单？';
                this.accountId=a;
            },
            checking(a){
                console.log(a);
                this.checkLists=[{
                    "reserveCashId": "20150802105038252",
                    "certificate": "深圳备付金",
                    "tradeTime": "2015-04-01 10:50:38",
                    "collectionName": "南昌新开味馆豫章",
                    "accountName": "张三",
                    "accountNumber": "36001050307052501764",
                    "payoutAmount": "407830",
                    "purpose": "1",
                    "remarks": "补贴划付"
                },
                {
                    "reserveCashId": "20150802105038252",
                    "certificate": "深圳备付金",
                    "tradeTime": "2015-04-01 10:50:38",
                    "collectionName": "南昌新开味馆豫章",
                    "accountName": "张三",
                    "accountNumber": "36001050307052501764",
                    "payoutAmount": "407830",
                    "purpose": "1",
                    "remarks": "补贴划付"
                }];
            },
            updateTrue(){
                console.log(this.accountId);
            },
            payTrue(){
                console.log(this.accountId);
            },
            closeTrue(){
                console.log(this.accountId);
            },
            backTrue(){
                console.log(this.accountId);
            },
            applyTrue(){
                console.log(this.accountId);
            },
            checkingTrue(a){
                console.log(a);
            },
            getTwo:function(num){
                if(num.toString().length>=2) return num;
                var str="";
                for(var i=num.toString().length;i<2;i++)
                    str +="0";
                return str + num.toString();
            },
            getTime(){
                var d=new Date()
                var day=d.getDate()
                var month=d.getMonth() + 1
                var year=d.getFullYear()
                var newD,endD;
                switch (this.dateS){
                    case '0':
                        newD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day-1);
                        endD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                        break;
                    case '1':
                        newD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day-7);
                        endD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                        break;
                    case '2':
                        newD=year + "-" + this.getTwo(month-1) + "-" + this.getTwo(day);
                        endD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                        break;
                    case '3':
                        newD=year + "-" + this.getTwo(month-3) + "-" + this.getTwo(day);
                        endD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                        break;
                    case '4':
                        newD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                        endD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                        break;
                    default:
                        newD=endD='';
                        break;
                }
                this.checkForm.startDate=newD;
                this.checkForm.endDate=endD;
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
                this.getTime();
            }
        },
        components:{
            'datepicker': datepicker,
        },
        ready(){
            this.getTime();
            this.initList();
        }
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