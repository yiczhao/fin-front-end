<template>
    <index :title="'额度采购'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :isshow="'isshow'">
        <div class="content blimit" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <input type="button" data-toggle="modal" data-target="#modal_add"  class="btn btn-info" @click="addUser" value="添加">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.merchantId" placeholder="商户ID">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.merchantName" placeholder="商户名">
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.companyId">
                                <option value="">请选择分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.cityId">
                                <option value="">请选择城市</option>
                                <option v-for="(index,n) in city" v-text="n.cityName" :value="n.cityId"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.isAutoPay">
                                <option value="">自动划付状态</option>
                                <option value="0">开启</option>
                                <option value="1">关闭</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.status">
                                <option value="">账户状态</option>
                                <option value="0">正常</option>
                                <option value="1">停用</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.startValue" placeholder="循环次数">
                            -
                            <input type="text" class="form-control" v-model="defaultData.endValue" placeholder="循环次数">
                        </div>
                        <div class="form-group">
                            <input type="button" class="btn btn-info" @click="checkNew" value="查询">
                        </div>
                    </form>
                </div>
                <div v-if="!!zdlists.length" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                                <tr role="row">
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>分公司</th>
                                    <th>城市</th>
                                    <th>总额度</th>
                                    <th>总本金</th>
                                    <th>使用额度</th>
                                    <th>使用比(%) </th>
                                    <th>剩余额度</th>
                                    <th>循环次数</th>
                                    <th>首次充值时间</th>
                                    <th>抵扣方式</th>
                                    <th>自动划付</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                    <th>消化商户 </th>
                                    <th>联系人</th>
                                    <th>电话</th>
                                    <th>客情人员</th>
                                </tr>
                            </thead>
                        <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists">
                                <td>{{trlist.id}}</td>
                                <td>{{trlist.name}}</td>
                                <td>{{trlist.company}}</td>
                                <td>{{trlist.city}}</td>
                                <td>{{trlist.totalLimit/100 | currency ''}}</td>
                                <td>{{trlist.totalPrincipal/100 | currency '' }} </td>
                                <td>{{trlist.usedLimit/100 | currency '' }} </td>
                                <td>{{trlist.usedPercent}}</td>
                                <td>{{trlist.balanceLimit/100 | currency ''}}</td>
                                <td>{{trlist.loopNumber}}</td>
                                <td>{{trlist.firstTime | datetime}}</td>
                                <td>
                                    <template v-if="trlist.discountType==1">全单</template>
                                    <template v-if="trlist.discountType==0">可打折</template>
                                </td>
                                <td>
                                    <template v-if="trlist.discountType==0">关闭</template>
                                    <template v-if="trlist.discountType==1">开启</template>
                                </td>
                                <td>
                                    <template v-if="trlist.discountType==0">已过期</template>
                                    <template v-if="trlist.discountType==1">正常</template>
                                </td>
                                <td>
                                    <a data-toggle="modal" data-target="#modal_update" href="javascript:void(0)" @click="updateNew(trlist)">编辑</a>
                                    <a href="javascript:void(0)">明细</a>
                                    <a href="javascript:void(0)">停用</a>
                                    <a href="javascript:void(0)" v-link="{'name':'limitaccount-management'}">账户</a>
                                </td>
                                <td><a data-toggle="modal"  data-target="#modal_see" href="javascript:void(0)">查看</a></td>
                                <td>{{trlist.contactsPerson}}</td>
                                <td>{{trlist.contactsPhone}}</td>
                                <td>{{trlist.servicePerson}}</td>
                            </tr>
                             <tr>
                                 <td></td>
                                 <td></td>
                                 <td>合计</td>
                                 <td></td>
                                 <td>{{nums.totalLimit}}</td>
                                 <td>{{nums.totalPrincipal}}</td>
                                 <td>{{nums.usedLimit}}</td>
                                 <td></td>
                                 <td>{{nums.balanceLimit}}</td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
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
                    未找到您要查询的账户
                </div>

                <!--编辑账户dialog-->
                <div data-backdrop="static"  id="modal_update" class="modal fade" style="display: none;">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">编辑账户</h5>
                            </div>
                            <div class="modal-body">
                                <div class="modal-body member_rules_modal-body">
                                    <div class="form-group">
                                        <div class="pull-left">
                                            <label class="w28" ><i>*</i>抵扣方式：</label>
                                        </div>
                                        <div class="col-md-3">
                                            <select class="form-control" v-model="defaultData.city">
                                                <option value="0">全单</option>
                                                <option value="1">可打折</option>
                                            </select>
                                        </div>
                                        <div class="pull-left">
                                            <label class="w28" ><i>*</i>自动划付：</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="radio" value="one" v-model="zdhf">
                                            <label class="w28" for="one">开启</label>
                                            <input type="radio" value="two" v-model="zdhf">
                                            <label class="w28" for="two">关闭</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="pull-left">
                                            <label class="w28" ><i>*</i>单笔采购额度：</label>
                                        </div>
                                        <div class="col-md-3">
                                             <input class="form-control" type="text" placeholder="10000">
                                        </div>
                                        <div class="col-md-1">
                                            元
                                        </div>
                                        <div class="pull-left">
                                            <label class="w28" ><i>*</i>单笔采购本金：</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input class="form-control" type="text" placeholder="10000">
                                        </div>
                                        <div class="pull-left">
                                            元
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <button type="button" data-toggle="modal" data-target="#modal_add"  @click="addUser2" class="btn">添加消化账户</button>
                                    </div>
                                    <table class="table datatable-selection-single dataTable no-footer" style="border: 1px solid #ccc;">
                                        <thead>
                                        <tr role="row">
                                            <th>商户ID</th>
                                            <th>商户名称</th>
                                            <th>分公司</th>
                                            <th>城市</th>
                                            <th>开始时间</th>
                                            <th>操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr role="row">
                                                <td>1</td>
                                                <td>昌玩聚和他(她)朋友们</td>
                                                <td>南昌卡说</td>
                                                <td>南昌</td>
                                                <td>2013-06-03 13:26:19</td>
                                                <td><a href="javascript:void(0)">删除</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="form-group">
                                        <div class="pull-left">
                                            <label class="w28" ><i>*</i>上传凭证：</label>
                                        </div>
                                        <div class="pull-left">
                                            <input type="file">
                                        </div>
                                        <div class="pull-left">
                                            <label for="tarea" class="w28"><i>*</i>备注：</label>
                                        </div>
                                        <div class="col-md-3">
                                            <textarea class="form-control" width="70%" cols="20" rows="3"></textarea>
                                        </div>
                                        <div class="col-md-3">
                                            <button type="button" @click="personTrue(person.id)" class="btn btn-primary">保存</button>
                                        </div>
                                    </div>
                                    <div>历史记录：</div>
                                    <table class="table datatable-selection-single dataTable no-footer" style="border: 1px solid #ccc;">
                                        <thead>
                                        <tr role="row">
                                            <th>ID</th>
                                            <th>账户信息</th>
                                            <th>消化商户</th>
                                            <th>更新时间</th>
                                            <th>更新人</th>
                                            <th>变更凭证</th>
                                            <th>更新备注</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr role="row">
                                            <td>1</td>
                                            <td>
                                                <p>抵扣方式：全单</p>
                                                <p>自动划付：开启</p>
                                                <p>单笔采购额度：10,000.00元</p>
                                                <p>单笔采购额度：7,500.00元</p>
                                            </td>
                                            <td><a href="javascript:void(0)">查看</a></td>
                                            <td>2013-06-03 13:26:19</td>
                                            <td>贾燕</td>
                                            <td><a href="javascript:void(0)">下载</a></td>
                                            <td>总店额度采购</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                </div>
                </div>

                <!--添加商户dialog-->
                <div data-backdrop="static"  id="modal_add" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title" v-text="addTitle"></h5>
                            </div>
                            <div class="modal-body">
                                <div class="addtop">
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="defaultData.companyId">
                                            <option value="">请选择分公司</option>
                                            <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="defaultData.city">
                                            <option value="">请选择城市</option>
                                            <option v-for="(index,n) in city" v-text="n.cityName" :value="n.cityId"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" v-model="defaultData.id" placeholder="商户ID">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" v-model="defaultData.accountName" placeholder="商户名">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="button" class="btn btn-info" @click="checkAccount" value="查询">
                                    </div>
                                </div>
                                <div class="addbottom">
                                    <div style="text-indent: 68%">已选择：</div>
                                    <div class="col-md-6">
                                        <table class="table datatable-selection-single dataTable no-footer" style="border: 1px solid #ccc;">
                                            <thead>
                                            <tr role="row">
                                                <th><label><input v-model="addId" type="checkbox">全选</label></th>
                                                <th>分公司</th>
                                                <th>城市</th>
                                                <th>商户名</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr role="row">
                                                <td>
                                                    <label>
                                                        <input v-model="addId" value="1" type="checkbox">1
                                                    </label>
                                                </td>
                                                <td>南昌卡说</td>
                                                <td>南昌</td>
                                                <td>南宁汉斯自酿啤酒城</td>
                                            </tr>
                                            <tr role="row">
                                                <td>
                                                    <label>
                                                        <input v-model="addId" value="2" type="checkbox">2
                                                    </label>
                                                </td>
                                                <td>南昌卡说</td>
                                                <td>南昌</td>
                                                <td>南宁汉斯自酿啤酒城</td>
                                            </tr>
                                            <tr role="row">
                                                <td>
                                                    <label>
                                                        <input v-model="addId" value="3" type="checkbox">3
                                                    </label>
                                                </td>
                                                <td>南昌卡说</td>
                                                <td>南昌</td>
                                                <td>南宁汉斯自酿啤酒城</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="button" class="btn btn-info" @click="addTrue($event)" value="添加">
                                        <input type="button" class="btn btn-info" @click="checkAccount" value="删除">
                                        <input type="button" class="btn btn-info" @click="checkAccount" value="确认">
                                    </div>
                                    <div class="col-md-4">
                                        <ul>
                                            <li v-for="n in liLists" track-by="$index" @click="checkLi($event)">{{n}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--查看账户dialog-->
                <div data-backdrop="static"  id="modal_see" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">查看消化商户</h5>
                            </div>
                            <div class="modal-body">
                                <div class="addtop">
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="defaultData.companyId">
                                            <option value="">请选择分公司</option>
                                            <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="defaultData.city">
                                            <option value="">请选择城市</option>
                                            <option v-for="(index,n) in city" v-text="n.cityName" :value="n.cityId"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" v-model="defaultData.id" placeholder="商户ID">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" v-model="defaultData.accountName" placeholder="商户名">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="button" class="btn btn-info" @click="checkAccount" value="查询">
                                    </div>
                                </div>
                                <div class="addbottom">
                                    <div class="col-md-12">
                                        <table class="table datatable-selection-single dataTable no-footer" style="border: 1px solid #ccc;">
                                            <thead>
                                            <tr role="row">
                                                <th>商户ID</th>
                                                <th>分公司</th>
                                                <th>城市</th>
                                                <th>商户名</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr role="row">
                                                <td>1</td>
                                                <td>南昌卡说</td>
                                                <td>南昌</td>
                                                <td>南宁汉斯自酿啤酒城</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="tc">
                                        <input type="button" class="btn btn-gray" data-dismiss="modal" value="关闭">
                                        <input type="button" class="btn btn-gray" data-dismiss="modal" data-toggle="modal" data-target="#modal_update" value="调整消化商户">
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
<style>
    .blimit .addtop,.blimit  .addbottom{
        overflow: hidden;
    }
    .blimit  .addbottom{
        margin-top: 15px;
    }
    .blimit  .addbottom  .col-md-2{
        text-align: center;
    }
    .blimit  .addbottom  .col-md-2 input{
        margin-bottom: 10px;
    }
    .blimit .addtop  .form-control,.blimit  .addbottom .form-control{
        padding: 7px;
    }
    .blimit .addbottom table tr td, .blimit .addbottom table tr th{
        padding: 2px;
    }
    .blimit .addbottom ul{
        list-style: none;
        border: 1px solid #ccc;
        padding:10px;
    }
    .blimit .addbottom ul li{
        margin:5px 0;
        cursor: pointer;
        padding-left:3px;
    }
    .blimit .addbottom ul li.check-li{
        background: #ccc;
    }
     .blimit table tr td, .blimit table tr th{
         padding: 20px 2px;
         text-align: center;
         text-overflow: ellipsis;
         overflow: hidden;
         white-space: nowrap;
     }
     .blimit td span{
        cursor: pointer;
        color: #3c8dbc;
    }
     .blimit td span:hover{
        opacity: 80;
    }
    .blimit  #modal_update .form-group{
        overflow: hidden;
        line-height: 36px;
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import dialog from '../components/dialog.vue'
    export default{
        data(){
            return{
                pagecur:1,
                page_size:15,
                pageall:1,
                loginList:{},
                defaultData:{
                    "merchantId": "",
                    "merchantName": "",
                    "companyId": "",
                    "cityId": "",
                    "isAutoPay": "",
                    "status": "",
                    "startValue": "",
                    "endValue": "",
                    "pageIndex": 1,
                    "pageSize": 15
                },
                zdlists:[],
                companylists:[],
                accountId:'',
                liLists:[],
                nums:{
                    totalLimit:0,
                    totalPrincipal:0,
                    usedLimit:0,
                    balanceLimit:0
                }
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(data){
//                this.$set('zdlists',[
//                    {
//                        "id": 3874,
//                        "name": "武汉麦格芬经开万达店",
//                        "company": "武汉卡说",
//                        "city": "武汉",
//                        "totalLimit": 744,
//                        "totalPrincipal": 58000,
//                        "usedLimit": 26451,
//                        "usedPercent": 39652,
//                        "balanceLimit": 4562,
//                        "loopNumber": 3,
//                        "firstTime": "2016-04-20 15:42:30",
//                        "discountType": 1,
//                        "isAutoPay": 1,
//                        "status": 0,
//                        "contactsPerson": "刘楠",
//                        "contactsPhone": "13437169531",
//                        "servicePerson": "胡俊",
//                        "isLimitPurchase": "1",
//                    },
//                    {
//                        "id": 3874,
//                        "name": "武汉麦格芬经开万达店",
//                        "company": "武汉卡说",
//                        "city": "武汉",
//                        "totalLimit": 744,
//                        "totalPrincipal": 58000,
//                        "usedLimit": 26451,
//                        "usedPercent": 39652,
//                        "balanceLimit": 4562,
//                        "loopNumber": 3,
//                        "firstTime": "2016-04-20 15:42:30",
//                        "discountType": 1,
//                        "isAutoPay": 1,
//                        "status": 0,
//                        "contactsPerson": "刘楠",
//                        "contactsPhone": "13437169531",
//                        "servicePerson": "胡俊",
//                        "isLimitPurchase": "1",
//                    }
//                ])
//                return;
                    this.$http.post('./reservecash/limitPurchaseMerchant/list',data)
                            .then(function (response) {
                                // *** 判断请求是否成功如若成功则填充数据到模型
                                (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                                (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                            }, function (response) {
                                console.log(response);
                            });
            },
            getClist(){
                // *** 请求公司数据
                this.$http.post('./subcompany/list',{})
                        .then(function (response) {
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('companylists', response.data.data) : null;
                        }, function (response) {
                            console.log(response);
                        });
            },
            checkNew(){
                this.initList();
            },
            checkAccount(){

            },
            initList(){
                $(".modal").modal("hide");
                this.getZlists(this.defaultData);
            },
            addUser(){
              this.addTitle='添加商户';
            },
            addUser2(){
                this.addTitle='添加消化商户';
            },
            appendLi(a){
                let _tr=$("input[value='" + a + "']").closest('tr');
                let _html=_tr.children('td:last').html();
                this.liLists.push(_html);
                _tr.remove();
            },
            addTrue(e){
                let a=this.addId;
                for(let i=0;i<a.length;i++){
                    this.appendLi(a[i]);
                }
                this.addId=[];
            },
            checkLi(e){
                $(e.target).toggleClass('check-li');
            }
        },
        ready() {
            (!!sessionStorage.getItem('userData')) ? this.$set('loginList',JSON.parse(sessionStorage.getItem('userData'))) : null;
            this.initList();
            this.getClist();
            $('#modal_add').on('hidden.bs.modal',function(){
                if(!$('#modal_update').is(':hidden')){
                    $('#app').addClass('modal-open');
                }
            })
        },
        components:{
            'datepicker': datepicker,
            'dialog': dialog,
        },
        watch:{
            zdlists(){
                var a=0,b=0,c=0,d=0;
                this.zdlists.forEach(function(e){
                    a+=e.totalLimit;
                    b+=e.totalPrincipal;
                    c+=e.usedLimit;
                    d+=e.balanceLimit;
                });
                this.nums.totalLimit=(a/100).toFixed(2);
                this.nums.totalPrincipal=(b/100).toFixed(2);
                this.nums.usedLimit=(c/100).toFixed(2);
                this.nums.balanceLimit=(d/100).toFixed(2);
            },
            pagecur:function(){
                this.defaultData.pageIndex=this.pagecur;
                this.initList();
            },
            page_size:function(){
                this.defaultData.pageSize=this.page_size;
                this.initList();
            }
        }
    }
</script>