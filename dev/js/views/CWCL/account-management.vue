<template>
    <index name="xxxx" title="账户列表" ptitle="财务处理1" hname="account-management" isshow="isshow">
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
                                    <select class="form-control" v-model="cSelect">
                                        <option value="">请选择分公司</option>
                                        <option v-for="(index,n) in companylists" v-text="n.companyName" :value="n.companyId"></option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="tSelect">
                                        <option value="">请选择类型</option>
                                        <option v-for="(index,n) in typelists" v-text="n.value" :value="n.accountType"></option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="uText" placeholder="账号信息">
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
                                <tr v-if="!!zdlists.length" v-for="trlist in zdlists">
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
                                        <a v-link="{name:'default',params:{lid: '123'}}">{{trlist.balanceAmount}} {{$router.params | json}}</a>
                                    </td>
                                    <td v-if="trlist.status==0">
                                        <span v-on:click="rewrite(trlist)">编辑</span>
                                        <span v-on:click="start">启用</span>
                                        <span v-on:click="delete">删除</span>
                                    </td>
                                    <td v-else>
                                        <span chargePerson="{{trlist.chargePerson}}" v-on:click.self="personDialog(trlist.chargePerson)">负责人</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

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
                        <dialog :title="'添加账户'" :show="add_show" :cb-close="close_dialog" :width="500">
                            <div class="modal-body member_rules_modal-body">
                                <div class="form-group">
                                    <label><i>*</i>分公司</label>
                                    <select class="form-control" v-model="addcSelect">
                                        <option value="">请选择分公司</option>
                                        <option v-for="(index,n) in companylists" v-text="n.companyName" :value="n.companyId"></option>
                                    </select>
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>简称</label>
                                    <input type="text" class="form-control" v-model="addJc" placeholder="15字以内">
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>账户名</label>
                                    <input type="text" class="form-control" v-model="addName">
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>账号</label>
                                    <input type="text" class="form-control" v-model="addNum" >
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>开户行</label>
                                    <input type="text" class="form-control" v-model="addBank">
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>起始日期</label>
                                    <datepicker :width="'70%'" :readonly="true" :value.sync="params.create_time_begin" format="YYYY-MM-DD"></datepicker>
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>类型</label>
                                    <select class="form-control" v-model="addtSelect">
                                        <option value="">请选择类型</option>
                                        <option v-for="(index,n) in typelists" v-text="n.value" :value="n.accountType"></option>
                                    </select>
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group tc">
                                    <button class="btn">添加</button>
                                </div>
                            </div>
                        </dialog>
                        <!-- Promotion Modal -->

                        <!-- Promotion Modal -->
                        <dialog :title="'编辑账户'" :show="re_show" :cb-close="close_dialog" :width="500">
                            <div class="modal-body member_rules_modal-body">
                                <div class="form-group">
                                    <label><i>*</i>分公司</label>
                                    <select class="form-control" v-model="recSelect">
                                        <option value="">请选择分公司</option>
                                        <option v-for="(index,n) in companylists" v-text="n.companyName" :value="n.companyId"></option>
                                    </select>
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>简称</label>
                                    <input type="text" class="form-control" v-model="reJc" placeholder="15字以内">
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>账户名</label>
                                    <input type="text" class="form-control" v-model="reName">
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>账号</label>
                                    <input type="text" class="form-control" v-model="reNum" >
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>开户行</label>
                                    <input type="text" class="form-control" v-model="reBank">
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>起始日期</label>
                                    <datepicker :width="'70%'" :readonly="true" :value.sync="params.create_time_begin" format="YYYY-MM-DD"></datepicker>
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group">
                                    <label><i>*</i>类型</label>
                                    <select class="form-control" v-model="retSelect">
                                        <option value="">请选择类型</option>
                                        <option v-for="(index,n) in typelists" v-text="n.value" :value="n.accountType"></option>
                                    </select>
                                    <span class="waring"></span>
                                </div>
                                <div class="form-group tc">
                                    <button class="btn">添加</button>
                                </div>
                            </div>
                        </dialog>
                        <!-- Promotion Modal -->
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
        width:70%;
        display: inline-block;
    }
    .modal-body label{
        width:15%;
        display: inline-block;
    }
    .modal-body label i{
        color:red;
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
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import dialog from '../components/dialog.vue'
    export default{
        props:{

        },
        data(){
            return{
                zdlists:[],
                companylists:[],
                typelists:[],
                params:{},
                tSelect:'',
                cSelect:'',
                uText:'',
                add_show: false,
                re_show: false,
                start_show: false,
                delete_show: false,
                addcSelect:'0',addJc:'',addName:'',addNum:'',addBank:'',dataPick:'',addtSelect:'0',
                recSelect:'0',reJc:'',reName:'',reNum:'',reBank:'',rePick:'',retSelect:'0'
            }
        },
        methods:{
            // http://192.168.1.123:80/dist/data-member-rules.json
            // 'http://localhost:9000/dist/data-member-rules.json'
            // +'/level_setting/list'

            // *** 请求账户列表数据
            getZlists:function(data){
                    this.$http.get('/dev/js/postjson/zdlist.json',{data})
                            .then(function (response) {
                                // *** 判断请求是否成功如若成功则填充数据到模型
                                (response.data.code==0) ? this.$set('zdlists', response.data.dataList) : null;
                            }, function (response) {
                                console.log(response);
                            });
            },
            getClist:function(){
                // *** 请求公司数据
                this.$http.get('/dev/js/postjson/companylists.json',{})
                        .then(function (response) {
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('companylists', response.data.dataList) : null;
                        }, function (response) {
                            console.log(response);
                        });
            },
            getTlists:function(){
                // *** 请求类型数据
                this.$http.get('/dev/js/postjson/typelists.json',{})
                        .then(function (response) {
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('typelists', response.data.dataList) : null;
                        }, function (response) {
                            console.log(response);
                        })
            },
            checkNew:function(){
               let data={
                        "companyId": this.cSelect,
                        "accountType": this.tSelect,
                        "accountNumber": this.uText,
                        "pageNumber": 1,
                        "pageCount": 15
                    };
                console.log(data);
                this.getZlists(data);
            },
            addUser:function(){
                this.add_show = true
            },
            close_dialog() {
                this.add_show = false
                this.re_show = false
                this.start_show = false
                this.delete_show = false
            },
            rewrite:function(_list){
                this.re_show = true;
                console.log(_list);
            },
            start:function(){
                this.start_show = true
            },
            delete:function(){
                this.delete_show = true
            },
            personDialog:function(a){
                console.log(a);
            },
            startTrue:function(){
                // *** 启用提交
                this.$http.get('/dev/js/postjson/typelists.json',{})
                        .then(function (response) {
                            // *** 判断请求是否成功如若成功则启用该数据
                            !!response.data.length ? this.$set('typelists', response.data) : null;
                        }, function (response) {
                            console.log(response);
                        })
            },
            delTrue:function(){
                // *** 删除提交
                this.$http.get('/dev/js/postjson/typelists.json',{})
                        .then(function (response) {
                            // *** 判断请求是否成功如若成功则删除该条数据

                        }, function (response) {
                            console.log(response);
                        })
            }
        },
        ready: function () {
            this.getZlists({"accountId": 10010});
            this.getClist({"accountId": 10010});
            this.getTlists({"accountId": 10010});
        },
        components:{
            'datepicker': datepicker,
            'dialog': dialog,
        }
    }
</script>