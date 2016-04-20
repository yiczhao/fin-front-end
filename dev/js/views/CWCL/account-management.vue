<template>
    <index :title="'账户列表'"
           :ptitle="'财务处理'"
           :hname="'account-management'"
           :isshow="'isshow'">

        <div class="content" slot="content">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <form class="form-inline manage-form">
                    <div class="form-group">
                        <input type="button" data-toggle="modal" data-target="#modal_add"  class="btn btn-info" v-on:click="addUser" value="添加账户">
                    </div>
                    <div class="form-group">
                        <select class="form-control" v-model="defaultData.companyId">
                            <option value="">请选择分公司</option>
                            <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="form-control" v-model="defaultData.accountType">
                            <option value="">请选择类型</option>
                            <option value="1">备付金</option>
                            <option value="2">本金</option>
                            <option value="3">佣金</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="defaultData.accountNumber" placeholder="账号">
                    </div>
                    <div class="form-group">
                        <input type="button" class="btn btn-info" v-on:click="checkNew" value="查询">
                    </div>
                </form>
            </div>
            <div v-if="!!zdlists.length" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                <div class="datatable-scroll">
                    <table id="table1" class="table datatable-selection-single dataTable no-footer">
                        <thead>
                            <tr role="row">
                                <th>分公司</th>
                                <th>简称</th>
                                <th>账户名</th>
                                <th>账号</th>
                                <th>开户行</th>
                                <th>类型</th>
                                <th>起始日期</th>
                                <th>余额 </th>
                                <th>操作</th>
                            </tr>
                        </thead>
                    <tbody>
                        <tr role="row" v-for="(index,trlist) in zdlists">
                            <td>{{trlist.companyName}}</td>
                            <td>{{trlist.shortName}}</td>
                            <td>{{trlist.accountName}}</td>
                            <td>{{trlist.accountNumber}}</td>
                            <td>{{trlist.bankName}}</td>
                            <td>
                                <template v-if="trlist.accountType==1">
                                    备付金
                                </template>
                                <template v-if="trlist.accountType==2">
                                    本金
                                </template>
                                <template v-if="trlist.accountType==3">
                                    佣金
                                </template>
                            </td>
                            <td>{{trlist.startDate}}</td>
                            <td>
                                <a v-link="{name:'provisions-info',params:{accountId:trlist.id}}">{{ trlist.balanceAmount/100 | currency '' }} </a>
                            </td>
                            <td v-if="trlist.status==0">
                                <span data-toggle="modal" data-target="#modal_add"  v-on:click="rewrite(trlist)">编辑</span>
                                <span data-toggle="modal" data-target="#modal_waring" v-on:click="start(trlist.id)">启用</span>
                                <span data-toggle="modal" data-target="#modal_waring" v-on:click="delBtn(trlist.id)">删除</span>
                            </td>
                            <td v-else>
                                <span data-toggle="modal" data-target="#modal_fzr" chargePerson="{{trlist.chargePerson}}" v-on:click.self="personDialog(trlist.chargePerson,trlist.id)">负责人</span>
                            </td>
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
                未找到您要查询的账单信息
            </div>
        </div>
                        <!-- Promotion Modal -->
                        <div id="modal_fzr" class="modal fade" style="display: none;">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">×</button>
                                        <h5 class="modal-title">负责人</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label><i>*</i>负责人</label>
                                            <input type="text" class="form-control" v-model="person.name" :value="person.name">
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>手机号</label>
                                            <input type="text" class="form-control" v-model="person.phone" :value="person.phone">
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>邮箱</label>
                                            <input type="text" class="form-control" v-model="person.email" :value="person.email">
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                                        <button type="button" v-on:click="personTrue(person.id)" class="btn btn-primary">保存</button>
                                    </div>
                                </div>
                            </div>
                        </div>
            <div id="modal_waring" class="modal fade" style="display: none;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">×</button>
                            <h5 class="modal-title" v-text="waring"></h5>
                        </div>
                        <div class="modal-body">
                            <div class="form-group tc">
                                <button v-show="waring=='你确认启用该账户？'" type="button" v-on:click="startTrue" class="btn btn-primary">确认</button>
                                <button v-show="waring=='你确认删除该账户？'" type="button" v-on:click="delTrue" class="btn btn-primary">确认</button>
                                <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal_add" class="modal fade" style="display: none;">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">×</button>
                            <h5 class="modal-title" v-text="addtitle"></h5>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label><i>*</i>分公司</label>
                                <select class="form-control" v-model="relist.companyId">
                                    <option value="">请选择分公司</option>
                                    <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                                </select>
                                <span v-show="!relist.companyId" class="validation-error-label">请选择分公司</span>
                            </div>
                            <div class="form-group">
                                <label><i>*</i>简称</label>
                                <input type="text" class="form-control" v-model="relist.shortName" :value="relist.shortName" maxlength="15" placeholder="15字以内">
                                <span v-show="!relist.shortName" class="validation-error-label">请输入简称</span>
                            </div>
                            <div class="form-group">
                                <label><i>*</i>账户名</label>
                                <input type="text" class="form-control" :value="relist.accountName" v-model="relist.accountName">
                                <span v-show="!relist.accountName" class="validation-error-label">请输入账户名</span>
                            </div>
                            <div class="form-group">
                                <label><i>*</i>账号</label>
                                <input class="form-control" :value="relist.accountNumber" v-model="relist.accountNumber">
                                <span v-show="!relist.accountNumber" class="validation-error-label">请输入账号</span>
                            </div>
                            <div class="form-group">
                                <label><i>*</i>开户行</label>
                                <input type="text" class="form-control" :value="relist.bankName" v-model="relist.bankName">
                                <span v-show="!relist.bankName" class="validation-error-label">请输入开户行</span>
                            </div>
                            <div class="form-group">
                                <label><i>*</i>起始日期</label>
                                <datepicker :width="'67%'" :readonly="true" :value.sync="relist.startDate" format="YYYY-MM-DD"></datepicker>
                                <span v-show="!relist.startDate" class="validation-error-label">请选择起始日期</span>
                            </div>
                            <div class="form-group">
                                <label><i>*</i>类型</label>
                                <select class="form-control" v-model="relist.accountType">
                                    <option value="">请选择类型</option>
                                    <option value="1">备付金</option>
                                    <option value="2">本金</option>
                                    <option value="3">佣金</option>
                                </select>
                                <span v-show="!relist.accountType" class="validation-error-label">请选择类型</span>
                            </div>
                            <div class="form-group tc">
                                <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                                <button type="button" v-on:click="addBtn" class="btn btn-primary">保存</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </index>
</template>
<style>
    .validation-error-label{
        margin-left: 20%;
    }
    .form-group{
        text-align: left;
    }
    .form-group.tc{
        text-align: center;
    }
    .modal-body .form-control{
        text-align: left;
        width:67%;
        display: inline-block;
    }
    .modal-body label{
        width:20%;
        display: inline-block;
    }
    .modal-body label i{
        color:red;
    }
    .modal-body .waring{
        color: red;
        margin-left: 5px;
    }
    .modal-body button{
        width:35%;
    }
    td span{
        cursor: pointer;
        color: #3c8dbc;
    }
    td span:hover{
        opacity: 80;
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
        props:{

        },
        data(){
            return{
                pagecur:1,
                page_size:15,
                pageall:1,
                loginList:{},
                defaultData:{"companyId": "","accountType": "","accountNumber": "","pageIndex": 1, "pageSize": 15},
                zdlists:[],
                relist:{
                    startDate:'',companyId:'',accountType:'',shortName:'',accountName:'',accountNumber:'',bankName:'',
                },
                companylists:[],
                typelists:[],
                params:{},
                tSelect:'',
                cSelect:'',
                uText:'',
                addtitle:'',
                waring:'',
                person:{
                    name:'',
                    phone:'',
                    email:''
                },
                accountId:''
            }
        },
        methods:{
            // http://192.168.1.123:80/dist/data-member-rules.json
            // 'http://localhost:9000/dist/data-member-rules.json'
            // +'/level_setting/list'

            // *** 请求账户列表数据
            getZlists:function(data){
                    this.$http.post('./bankaccount/list',data)
                            .then(function (response) {
                                // *** 判断请求是否成功如若成功则填充数据到模型
                                (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                                (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                            }, function (response) {
                                console.log(response);
                            });
            },
            getClist:function(){
                // *** 请求公司数据
                this.$http.post('./subcompany/list',{})
                        .then(function (response) {
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('companylists', response.data.data) : null;
                        }, function (response) {
                            console.log(response);
                        });
            },
            checkNew:function(){
                this.initList();
            },
            addUser:function(){
                this.relist={
                    startDate:'',companyId:'',accountType:'',shortName:'',accountName:'',accountNumber:'',bankName:'',
                },
                this.accountId='';
                this.addtitle = '添加账户';
            },
            close_dialog() {
                this.re_show = false;
                this.start_show = false;
                this.delete_show = false;
                this.person_show=false;
            },
            initList:function(){
                $(".modal").modal("hide");
                this.getZlists(this.defaultData);
            },
            rewrite:function(_list){
                this.accountId=_list.id;
                this.$set('relist', _list);
                this.addtitle = '编辑账户';
            },
            submit:function(a){
                console.log(a);
            },
            start:function(a){
                this.waring = '你确认启用该账户？';
                this.accountId=a;
            },
            delBtn:function(a){
                this.waring = '你确认删除该账户？';
                this.accountId=a;
            },
            personDialog:function(a,b){
                this.accountId=b;
                this.$http.post('./chargeperson/query/'+a)
                        .then(function (response) {
                            // *** 判断请求是否成功如若成功则启用该数据
                            var newperson={
                                name:'',
                                phone:'',
                                email:''
                            };
                            if(response.data.data){
                                this.$set('person', response.data.data)
                            }else{
                                this.$set('person',newperson)
                            }
                            this.person_show=true;
                        }, function (response) {})
            },
            personTrue:function(a){
                let data={
                    "id": a,
                    "accountId":this.accountId,
                    "name": this.person.name,
                    "phone": this.person.phone,
                    "email": this.person.email,
                }
                this.$http.post('./chargeperson/save',data)
                        .then(function (response) {
                            this.initList();
                        }, function (response) {
                            console.log(response);
                        })
            },
            startTrue:function(){
                // *** 启用提交
                this.$http.get('./bankaccount/change/'+this.accountId)
                        .then(function (response) {
                            // *** 判断请求是否成功如若成功则启用该数据
                            this.initList();
                        }, function (response) {
                            console.log(response);
                        })
            },
            delTrue:function(){
                // *** 删除提交
                this.$http.get('./bankaccount/delete/'+this.accountId)
                        .then(function (response) {
                            // *** 判断请求是否成功如若成功则删除该条数据
                            this.initList();
                        }, function (response) {
                            console.log(response);
                        })
            },
            addBtn:function(){
                // *** 新增修改保存
                let data={
                    "id": this.accountId,
                    "companyId": this.relist.companyId,
                    "shortName": this.relist.shortName,
                    "accountName": this.relist.accountName,
                    "accountNumber": this.relist.accountNumber,
                    "bankName": this.relist.bankName,
                    "accountType": this.relist.accountType,
                    "startDate": this.relist.startDate
                };
                this.$http.post('./bankaccount/save',data)
                        .then(function (response) {
                            this.initList();
                        }, function (response) {
                            console.log(response);
                        })
            }
        },
        ready: function () {
            (!!sessionStorage.getItem('userData')) ? this.$set('loginList',JSON.parse(sessionStorage.getItem('userData'))) : null;
            this.initList();
            this.getClist();
        },
        components:{
            'datepicker': datepicker,
            'dialog': dialog,
        },
        watch:{
            pagecur:function(){
                this.defaultData.pageIndex=this.pagecur;
                this.initList();
            },
            page_size:function(){
                this.defaultData.pageSize=this.page_size;
                this.initList();
            }
        },
        validators: {
            numeric: function (val) {
                return /^[-+]?[0-9]+$/.test(val)
            }
        }
    }
</script>