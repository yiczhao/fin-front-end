<template>
    <index :title="'备付金付款明细'"
           :ptitle="'备付金支出'"
           :hname="'account-management'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
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
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.certificate" placeholder="银行凭证号">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.keyword" placeholder="收款方、账户名、账号">
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.status">
                                    <option value="">请选择对账状态</option>
                                    <option value="2">等待划付</option>
                                    <option value="3">等待对账</option>
                                    <option value="4">对账成功</option>
                                    <option value="5">划付失败</option>
                                    <option value="0">已关闭</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="checkForm.purpose">
                                    <option value="">请选择用途</option>
                                    <option value="1">补贴划付</option>
                                    <option value="2">额度采购</option>
                                    <option value="3">退税划付</option>
                                    <option value="4">预付款</option>
                                    <option value="5">供货商划付</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="备注">
                            </div>
                            <div class="form-group">
                                <input type="button" class="btn btn-info" @click="initList" value="查询">
                            </div>
                    </form>
                </div>
            </div>
            <div v-if="zdlists.length>0" class="panel panel-flat panel-collapsed"   v-for="(index,n) in zdlists">
                <div class="panel-heading bgddd">
                    <div class="panel-title">
                        <p>
                            <span>订单号:{{n.orderNumber}}</span>
                            <span>付款金额:{{n.payoutAmount/100 | currency '' }}</span>
                            <span>付款账户:
                                <template v-if="payType==1">{{n.payoutAccount}}</template>
                                <template v-else>商户预付款账户</template>
                            </span>
                            <span>收款方:{{n.payoutAccountName}}</span>
                            <span>付款账户名:{{n.payoutAccountName}}</span>
                            <span>付款账号:{{n.payoutAccountNumber}}</span>
                            <span v-if="payType==1">收款账户名:{{n.incomeAccountName}}</span>
                            <span v-if="payType==1">收款账号:{{n.incomeAccountNumber}}</span>
                            <span>银行凭证号:{{n.certificate}}</span>
                            <span>付款时间:{{n.paymentTime | datetime}}</span>
                            <span>用途:
                                 <template v-if="n.purpose==1"> 补贴划付</template>
                                 <template v-if="n.purpose==2"> 额度采购</template>
                                 <template v-if="n.purpose==3"> 退税划付</template>
                                 <template v-if="n.purpose==4"> 预付款</template>
                                 <template v-if="n.purpose==5"> 供货商划付</template>
                            </span>
                            <span v-if="payType==1">收款开户行:{{n.incomeBankName}}</span>
                            <span>申请分公司:{{n.applyCompany}}</span>
                            <span>申请时间:{{n.applyTime | datetime}}</span>
                            <span>
                                状态:
                                 <template v-if="n.status==1"> 等待审核</template>
                                 <template v-if="n.status==2"> 等待划付</template>
                                 <template v-if="n.status==3"> 等待对账</template>
                                 <template v-if="n.status==4"> 对账成功</template>
                                 <template v-if="n.status==5"> 划付失败</template>
                                 <template v-if="n.status==0"> 已关闭</template>
                            </span>
                            <span>对账时间:</span>
                        </p>
                        <p>备注:{{n.remarks}}</p>
                    </div>
                    <div v-if="n.status!=0" class="pull-right" @click="getInfo(n,index)">
                        <span class="pull-left">查看详情</span>
                        <ul class="icons-list pull-left" >
                            <li><a data-action="collapse"></a></li>
                        </ul>
                    </div>
                </div>
                <div v-show="listinfos[index]!=''" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                                <tr role="row">
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
                                <tr role="row" v-for="trlist in listinfos[index]">
                                    <td>{{trlist.createAt | datetime}}</td>
                                    <td>{{trlist.merchantName}}</td>
                                    <td>{{trlist.amount/100 | currency '' }}</td>
                                    <td>
                                        {{trlist.purpose}}
                                    </td>
                                    <td>
                                        <template v-if="n.purpose==1"><a v-link="{name:'subsidy-appropriation'}">详情</a></template>
                                        <template v-if="n.purpose==2"><a v-link="{name:'limit-purchase-detail'}">详情</a></template>
                                        <template v-if="n.purpose==3"><a v-link="{name:'subsidy-tax-rebate'}">详情</a></template>
                                        <template v-if="n.purpose==4"><a v-link="{name:'advance-payment-detail'}">详情</a></template>
                                    </td>
                                    <td>
                                        <template v-if="trlist.status==1"> 等待审核</template>
                                        <template v-if="trlist.status==2"> 等待划付</template>
                                        <template v-if="trlist.status==3"> 等待对账</template>
                                        <template v-if="trlist.status==4"> 对账成功</template>
                                        <template v-if="trlist.status==5"> 划付失败</template>
                                        <template v-if="trlist.status==0"> 已关闭</template>
                                    </td>
                                    <td>{{trlist.remarks}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="pull-right">
                            <template v-if="n.status==2">
                                <input data-toggle="modal" data-target="#modal_waring" type="button" @click="pay(n.id)" class="btn btn-gray" value="确认划付">
                                <input data-toggle="modal" data-target="#modal_submit" type="button" @click="back(n.id)" class="btn btn-gray" value="退回重审">
                            </template>
                            <template v-if="n.status==3">
                                <input data-toggle="modal" data-target="#modal_checking" type="button" @click="checking(n.id)" class="btn btn-gray" value="对账">
                            </template>
                            <template v-if="n.status==5">
                                <input data-toggle="modal" data-target="#modal_waring" type="button" @click="update(n.id)" class="btn btn-gray" value="更新订单">
                                <input data-toggle="modal" data-target="#modal_submit" type="button" @click="apply(n.id)" class="btn btn-gray" value="申请划付">
                                <input data-toggle="modal" data-target="#modal_waring" type="button" @click="close(n.id)" class="btn btn-gray" value="关闭订单">
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel panel-flat panel-collapsed" style="padding: 30px;font-size: 16px;text-align: center" v-if="zdlists.length!>0" >
                未找到数据
            </div>
            <page :all="pageall"
                  :cur.sync="pagecur"
                  :page_size.sync="page_size">
            </page>
            <div data-backdrop="static"  id="modal_waring" class="modal fade" style="display: none;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">×</button>
                            <h5 class="modal-title" v-text="waring"></h5>
                        </div>
                        <div class="modal-body">
                            <div class="form-group tc">
                                <button  v-if="waring=='你确认更新账单？'" type="button" @click="updateTrue" class="btn btn-primary">确认</button>
                                <button  v-if="waring=='你确认划付该账单？'" type="button" @click="payTrue" class="btn btn-primary">确认</button>
                                <button  v-if="waring=='你确认关闭该账单？'" type="button" @click="closeTrue" class="btn btn-primary">确认</button>
                                <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div data-backdrop="static"  id="modal_submit" class="modal fade" style="display: none;">
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
                                    <textarea rows="5" cols="5" class="form-control" v-model="remarks" placeholder=""></textarea>
                                </div>
                            </div>
                            <div class="form-group tc">
                                <button  v-if="subtitle=='退回重审'" type="button" @click="backTrue" class="btn btn-primary">退回</button>
                                <button  v-if="subtitle=='申请划付'" type="button" @click="applyTrue" class="btn btn-primary">申请</button>
                            </div>
                            <div class="form-group tc">
                                <span v-show="!remarks&&fires" class="validation-error-label">
                                    <template v-if="subtitle=='退回重审'">请填写退回原因</template>
                                    <template v-else>请填写备注</template>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div data-backdrop="static"  id="modal_checking" class="modal fade" style="display: none;">
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
                            <table class="table" style="border: 1px solid #ccc;">
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
                                            <tr v-if="!!checkLists.length&&checkLists != ''" role="row"  v-for="n in checkLists">
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
                                                <td><a href="javascript:void(0)" @click="checking(n.reserveCashId)">选择</a></td>
                                            </tr>
                                            <tr v-else>
                                                <td colspan="8">未找到对账数据</td>
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
<style lang="sass" scoped>
     .f20{
        font-size: 20px;
        font-weight: bolder;
    }
    .form-group{
       overflow: hidden;
    }
       .modal-body label i{
        color:red;
    }
      .modal-body button{
        width:35%;
    }
      .m20{
        margin-bottom:20px;
    }
      .mt0{
        margin-top: 0
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
     .datatable-scroll{
       overflow: hidden;
       padding-bottom: 20px;
       padding-top: 20px;
   }
     .dataTables_wrapper{
        display: none;
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
     .modal-body tr td, .modal-body tr th{
        padding: 10px;
    }
    .tc .validation-error-label{
        display: inline-block;
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
                listinfos:[],
                zdlists:[],
                checkLists:[],
                remarks:'',
                fires:false
            }
        },
        methods:{
            // *** 请求账户数据
            getZlists(data){
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
            initList(){
                $(".modal").modal("hide");
                this.listinfos=[];
                this.getZlists(this.checkForm);
            },
            getInfo(a,index){
//                this.zdlists[index].listinfo = []
                if(this.listinfos[index] !='' && typeof(this.listinfos[index])!='undefined')return;
                this.$http.post('./reservecash/order/getpart/'+a.id)
                        .then( (response)=> {
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            //  this.zdlists.$set( index,info)
                            (response.data.code==0) ? this.listinfos.$set(index,response.data.data): null;
                        }, function (response) {
                            console.log(response);
                        });
            },
            back(a){
                this.subtitle = '退回重审';
                this.remarks='';
                this.fires=false;
                this.accountId=a;
            },
            apply(a){
                this.subtitle = '申请划付';
                this.remarks='';
                this.fires=false;
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
                this.$http.post('./reservecash/order/checklist/'+a)
                        .then( (response)=> {
                             (response.data.code==0)?this.checkLists.$set(response.data.data):null;
                        })
            },
            updateTrue(){
                this.$http.post('./reservecash/order/update/'+this.accountId)
                    .then( (response)=> {
                        if(response.data.code==0){
                            this.initList();
                            dialogs();
                        }
                    })
            },
            payTrue(){
                this.$http.post('./reservecash/order/allow/'+this.accountId)
                        .then( (response)=> {
                            if(response.data.code==0){
                                this.initList();
                                dialogs();
                            }
                        })
            },
            closeTrue(){
                this.$http.post('./reservecash/order/close/'+this.accountId)
                        .then( (response)=> {
                            if(response.data.code==0){
                                this.initList();
                                swal({
                                    title: "已关闭！",
                                    type: "success",
                                    confirmButtonColor: "#2196F3"
                                })
                            }
                        })
            },
            backTrue(){
                if(this.remarks==''){this.fires=true;return;}
                let data={
                    'id':this.accountId,
                    'remarks':this.remarks,
                }
                this.$http.post('./reservecash/order/retrial',data)
                        .then( (response)=> {
                                if(response.data.code==0){
                                    this.initList();
                                    swal({
                                        title: "已退回！",
                                        type: "success",
                                        confirmButtonColor: "#2196F3"
                                    })
                                }
                            })
            },
            applyTrue(){
                if(this.remarks==''){this.fires=true;return;}
                let data={
                    'id':this.accountId,
                    'remarks':this.remarks,
                }
                this.$http.post('./ reservecash/order/applypay',data)
                        .then( (response)=> {
                                if(response.data.code==0){
                                    this.initList();
                                    swal({
                                        title: "已划付！",
                                        type: "success",
                                        confirmButtonColor: "#2196F3"
                                    })
                            }
                        })
            },
            checkingTrue(a){
                console.log(a);
            },
            getTwo(num){
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
            pagecur(){
                this.checkForm.pageIndex=this.pagecur;
                this.initList();
            },
            page_size(){
                this.checkForm.pageSize=this.page_size;
                this.initList();
            },
            dateS(){
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