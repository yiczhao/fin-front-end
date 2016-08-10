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
                        <input data-ksa="account.add" type="button" data-toggle="modal" data-target="#modal_add"  class="btn btn-info" @click="addUser" value="添加账户">
                    </div>
                    <div class="form-group">
                        <select class="form-control" v-model="defaultData.companyId">
                            <option value="">全部分公司</option>
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
                        <input type="text" class="form-control" v-model="defaultData.accountNumber" placeholder="账号" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
                    </div>
                    <div class="form-group">
                        <input type="button" class="btn btn-info" @click="checkNew" value="查询" data-ksa="account.search">
                    </div>
                </form>
            </div>
            <div v-show="!!zdlists.length" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer" v-cloak>
                <div class="datatable-scroll">
                    <table class="table">
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
                            <td>{{trlist.startDate | datetimes}}</td>
                            <td>
                                <a v-link="{name:'provisions-info',params:{accountId:trlist.id,certificate:0,aname:trlist.shortName,balance:trlist.balanceAmount}}">{{ trlist.balanceAmount/100 | currency '' }} </a>
                            </td>
                            <td v-if="trlist.status==0">
                                <span @click="rewrite(trlist)">编辑</span>
                                <span data-toggle="modal" data-target="#modal_waring" @click="start(trlist.id)">启用</span>
                                <span data-toggle="modal" data-target="#modal_waring" @click="delBtn(trlist.id)">删除</span>
                            </td>
                            <td v-else>
                                <span chargePerson="{{trlist.chargePerson}}" @click.self="personDialog(trlist.chargePerson,trlist.id)">负责人</span>
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
                未找到数据
            </div>
        </div>
            <validator name="vali2">
                <form novalidate>
                        <!-- Promotion Modal -->
                        <div id="modal_fzr" data-backdrop="static"  class="modal fade" style="display: none;">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">×</button>
                                        <h5 class="modal-title">负责人</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label><i>*</i>负责人</label>
                                            <input type="text" class="form-control" id="uname" v-validate:uname="['required']" v-model="person.name" value.sync="person.name">
                                            <span v-if="$vali2.uname.required && fire" class="validation-error-label">请输入负责人姓名</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>手机号</label>
                                            <input type="text" class="form-control" id="phone"  v-validate:phone="['required']" v-model="person.phone" value.sync="person.phone">
                                            <span v-if="$vali2.phone.required && fire" class="validation-error-label">请输入负责人电话</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>邮箱</label>
                                            <input type="text" class="form-control" id="email" v-validate:email="['required']" v-model="person.email" value.sync="person.email">
                                            <span v-if="$vali2.email.required && fire" class="validation-error-label">请输入负责人邮箱</span>
                                        </div>
                                        <div class="form-group tc">
                                            <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                                            <button type="button" @click="personTrue(person.id)" class="btn btn-primary">保存</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </validator>
            <div id="modal_waring" data-backdrop="static" class="modal fade" style="display: none;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">×</button>
                            <h5 class="modal-title" v-text="waring"></h5>
                        </div>
                        <div class="modal-body">
                            <div class="form-group tc">
                                <button v-show="waring=='你确认启用该账户？'" type="button" @click="startTrue" class="btn btn-primary">确认</button>
                                <button v-show="waring=='你确认删除该账户？'" type="button" @click="delTrue" class="btn btn-primary">确认</button>
                                <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <validator name="vali">
                <form novalidate>
                    <div id="modal_add" data-backdrop="static"  class="modal fade" style="display: none;">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                    <h5 class="modal-title" v-text="addtitle"></h5>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label><i>*</i>分公司</label>
                                        <select class="form-control" v-model="relist.companyId" v-validate:val1="['required']">
                                            <option value="">请选择分公司</option>
                                            <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                                        </select>
                                        <span v-if="$vali.val1.required && fire1" class="validation-error-label">请选择分公司</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>简称</label>
                                        <input type="text" class="form-control" v-validate:val2="['required']" v-model="relist.shortName" value="relist.shortName" maxlength="15" placeholder="15字以内">
                                        <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入简称</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>账户名</label>
                                        <input type="text" class="form-control" v-validate:val3="['required']" value="relist.accountName" v-model="relist.accountName">
                                        <span v-if="$vali.val3.required && fire1" class="validation-error-label">请输入账户名</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>账号</label>
                                        <input type="text" class="form-control" v-validate:val4="['required']" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" value="relist.accountNumber" v-model="relist.accountNumber">
                                        <span v-if="$vali.val4.required && fire1" class="validation-error-label">请输入账号</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>开户行</label>
                                        <input type="text" class="form-control" v-validate:val5="['required']" value="relist.bankName" v-model="relist.bankName">
                                        <span v-if="$vali.val5.required && fire1" class="validation-error-label">请输入开户行</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>起始日期</label>
                                        <datepicker :width="'67%'" :readonly="true" :value.sync="relist.startDate" format="YYYY-MM-DD"></datepicker>
                                        <span class="timeerror validation-error-label">请选择起始日期</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>类型</label>
                                        <select class="form-control" v-validate:val7="['required']" v-model="relist.accountType">
                                            <option value="">请选择类型</option>
                                            <option value="1">备付金</option>
                                            <option value="2">本金</option>
                                            <option value="3">佣金</option>
                                        </select>
                                        <span v-if="$vali.val7.required && fire1" class="validation-error-label">请选择类型</span>
                                    </div>
                                    <div class="form-group tc">
                                        <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                                        <button type="button" @click="addBtn" class="btn btn-primary">保存</button>
                                    </div>
                                    <div class="form-group">
                                        <span v-show="saveerror!=''" class="validation-error-label" v-text="saveerror"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                </validator>
        </div>
    </index>
</template>
<style lang="sass" scoped>
     .validation-error-label{
        margin-left: 20%;
    }
     .timeerror,.suberror,.suberror1{
        display: none;
    }
     .suberror,.suberror1{
        padding-top: 3px;
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
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/AccountManagement/account_model'
    export default{
        data(){
            this.model =model(this)
            return{
                pagecur:1,
                page_size:10,
                pageall:1,
                loginList:{},
                defaultData:{"companyId": "","accountType": "","accountNumber": "","pageIndex": 1, "pageSize": 10},
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
                fire:false,
                fire1:false,
                person:{
                    name:'',
                    phone:'',
                    email:''
                },
                accountId:'',
                saveerror:'',
            }
        },
        methods:{
            // *** 请求账户列表数据
            errorHide(){
                $('.suberror,.timeerror').hide();
                this.saveerror='';
            },
            getZlists(data){
                    this.model.getbanklist(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('zdlists', response.data.data)
                                this.$set('pageall', response.data.total)
                            }
                        });
            },
            getClist(){
                // *** 请求公司数据
                    this.$common_model.getcompany().then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('companylists', response.data.data)
                            }
                    });
            },
            checkNew(){
                this.initList();
            },
            addUser(){
                this.errorHide();
                this.fire1=false;
                this.relist={
                    startDate:'',companyId:'',accountType:'',shortName:'',accountName:'',accountNumber:'',bankName:'',
                },
                this.accountId='';
                this.addtitle = '添加账户';
            },
            initList(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                $(".modal").modal("hide");
                this.getZlists(this.defaultData);
            },
            rewrite(_list){
                this.errorHide();
                this.fire1=false;
                this.accountId=_list.id;
                $.extend(true, this.relist, _list);
                this.addtitle = '编辑账户';
                $('#modal_add').modal('show');
            },
            start(a){
                this.waring = '你确认启用该账户？';
                this.accountId=a;
            },
            delBtn(a){
                this.waring = '你确认删除该账户？';
                this.accountId=a;
            },
            personDialog(a,b){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.errorHide();
                this.fire=false;
                this.accountId=b;
                this.model.queryperson(a)
                        .then((response)=>{
                            if(response.data.code == 0){
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
                                $('#modal_fzr').modal('show');
                            }
                        })
            },
            personTrue(a){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(!this.$vali2.valid){this.fire=true;return;}
                let data={
                    "id": a,
                    "accountId":this.accountId,
                    "name": this.person.name,
                    "phone": this.person.phone,
                    "email": this.person.email,
                }
                this.model.saveperson(data)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.initList();
                                dialogs();
                            }
                        })
            },
            startTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                // *** 启用提交
                this.model.startaccount(this.accountId)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则启用该数据
                            if(response.data.code==0){
                                this.initList();
                                dialogs('success','已启用！');
                            }
                        })
            },
            delTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                // *** 删除提交
                this.model.deleteaccount(this.accountId)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则删除该条数据
                            if(response.data.code==0){
                                this.initList();
                                dialogs('success','已删除！');
                            }
                        })
            },
            addBtn(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.errorHide();
                if(!this.$vali.valid){this.fire1=true;return;}
                if(this.relist.startDate==''){$('.timeerror').show();return;}
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
                this.model.changeaccount(data)
                        .then((response)=>{
                            if(response.data.code==-1){
                                this.$set('saveerror', response.data.message)
                            }else{
                                this.initList();
                                dialogs();
                            }
                        })
            }
        },
        ready: function () {
            (!!sessionStorage.getItem('userData')) ? this.$set('loginList',JSON.parse(sessionStorage.getItem('userData'))) : null;
            this.initList();
            this.getClist();
            let vm=this;
            $('#modal_fzr,#modal_add').on('show.bs.modal', function () {
                this.fire=false;
                vm.$resetValidation();
            })
        },
        components:{
            'datepicker': datepicker
        },
        watch:{
            pagecur(){
                this.defaultData.pageIndex=this.pagecur;
                this.initList();
            },
            page_size(){
                this.defaultData.pageSize=this.page_size;
                this.initList();
            }
        },
        validators: {
            numeric(val) {
                return /^[-+]?[0-9]+$/.test(val)
            }
        }
    }
</script>