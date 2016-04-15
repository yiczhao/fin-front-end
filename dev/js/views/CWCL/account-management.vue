<template>
    <index :name="loginList.trueName"
           :title="'账户列表'"
           :ptitle="'财务处理'"
           :hname="'account-management'"
           :isshow="'isshow'">
        <section class="content" slot="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <form class="form-inline manage-form">
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" v-on:click="addUser" value="添加账户">
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
                        <div class="box-body">
                            <table id="table1" class="table table-bordered table-hover">
                                <thead>
                                <tr>
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
                                <tr v-if="!!zdlists.length" v-for="(index,trlist) in zdlists">
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
                                        <span v-on:click="rewrite(trlist)">编辑</span>
                                        <span v-on:click="start(trlist.id)">启用</span>
                                        <span v-on:click="delBtn(trlist.id)">删除</span>
                                    </td>
                                    <td v-else>
                                        <span chargePerson="{{trlist.chargePerson}}" v-on:click.self="personDialog(trlist.chargePerson,trlist.id)">负责人</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <page :all="pageall"
                                  :cur.sync="pagecur"
                                  :page_size.sync="page_size">
                            </page>
                        </div>
                        <!-- Promotion Modal -->
                        <dialog :title="'负责人'" :show="person_show" :cb-close="close_dialog" :width="550">
                            <div class="modal-body member_rules_modal-body">
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
                                    <div class="form-group tc">
                                        <button class="btn" v-on:click="personTrue(person.id)">保存</button>
                                    </div>
                            </div>
                        </dialog>
                        <!-- Promotion Modal -->
                        <!-- Promotion Modal -->
                        <dialog :title="'你确定启用该账户么？'" :show="start_show" :cb-close="close_dialog" :width="400">
                            <div class="modal-body member_rules_modal-body">
                                <div class="form-group tc">
                                    <button class="btn" v-on:click="startTrue">确认</button>
                                    <button class="btn" v-on:click="close_dialog">取消</button>
                                </div>
                            </div>
                        </dialog>
                        <!-- Promotion Modal -->
                        <!-- Promotion Modal -->
                        <dialog :title="'你确定删除该账户么？'" :show="delete_show" :cb-close="close_dialog" :width="400">
                            <div class="modal-body member_rules_modal-body">
                                <div class="form-group tc">
                                    <button class="btn" v-on:click="delTrue">确认</button>
                                    <button class="btn" v-on:click="close_dialog">取消</button>
                                </div>
                            </div>
                        </dialog>
                        <!-- Promotion Modal -->
                        <!-- Promotion Modal -->
                        <validator name="validation1">
                        <dialog :title="re_title" :show="re_show" :cb-close="close_dialog" :width="600">
                            <div class="modal-body member_rules_modal-body">
                                <div class="form-group">
                                    <label><i>*</i>分公司</label>
                                    <select class="form-control" v-model="recSelect">
                                        <option value="">请选择分公司</option>
                                        <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>简称</label>
                                    <input type="text" class="form-control" v-model="reshortName" :value="relist.shortName" maxlength="15" placeholder="15字以内">
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>账户名</label>
                                    <input type="text" class="form-control" :value="relist.accountName" v-model="accountName">
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>账号</label>
                                    <input class="form-control" :value="relist.accountNumber" v-model="accountNumber">
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>开户行</label>
                                    <input type="text" class="form-control" :value="relist.bankName" v-model="bankName">
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>起始日期</label>
                                    <datepicker :width="'65%'" :readonly="true" :value.sync="relist.startDate" format="YYYY-MM-DD"></datepicker>
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>类型</label>
                                    <select class="form-control" v-model="retSelect">
                                        <option value="">请选择类型</option>
                                        <option value="1">备付金</option>
                                        <option value="2">本金</option>
                                        <option value="3">佣金</option>
                                    </select>
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group tc">
                                    <button class="btn" v-on:click="addBtn">保存</button>
                                </div>
                            </div>
                        </dialog>
                        <!-- Promotion Modal -->
                        </validator>
                    </div>
                </div>
            </div>
        </section>
    </index>
</template>
<style>
    .form-group{
        text-align: left;
    }
    .form-group.tc{
        text-align: center;
    }
    .modal-body .form-control{
        text-align: left;
        width:65%;
        display: inline-block;
    }
    .modal-body label{
        width:13%;
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
                loginList:{},
                defaultData:{"companyId": "","accountType": "","accountNumber": "","pageIndex": 1, "pageSize": 15},
                zdlists:[],
                pageall:1,
                relist:{},
                companylists:[],
                typelists:[],
                params:{},
                tSelect:'',
                cSelect:'',
                uText:'',
                re_show: false,
                start_show: false,
                delete_show: false,
                person_show:false,
                startDate:'',re_title:'',recSelect:'',retSelect:'',reshortName:'',accountName:'',accountNumber:'',bankName:'',
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
                this.relist={};
                this.re_title='添加账户';
                this.recSelect='';
                this.retSelect='';
                this.accountId='';
                this.re_show = true;
            },
            close_dialog() {
                this.re_show = false;
                this.start_show = false;
                this.delete_show = false;
                this.person_show=false;
            },
            initList:function(){
                this.close_dialog();
                this.getZlists(this.defaultData);
            },
            rewrite:function(_list){
                this.accountId=_list.id;
                this.$set('relist', _list);
                this.$set('recSelect',_list.companyId);
                this.$set('retSelect', _list.accountType);
                this.re_show = true; this.re_title='编辑账户';
            },
            submit:function(a){
                console.log(a);
            },
            start:function(a){
                this.start_show = true;
                this.accountId=a;
            },
            delBtn:function(a){
                this.delete_show = true;
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
                    "companyId": this.recSelect,
                    "shortName": this.reshortName,
                    "accountName": this.accountName,
                    "accountNumber": this.accountNumber,
                    "bankName": this.bankName,
                    "accountType": this.retSelect,
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
                this.getZlists(this.defaultData);
            },
            page_size:function(){
                this.defaultData.pageSize=this.page_size;
                this.getZlists(this.defaultData);
            }
        },
        validators: {
            numeric: function (val) {
                return /^[-+]?[0-9]+$/.test(val)
            }
        }
    }
</script>