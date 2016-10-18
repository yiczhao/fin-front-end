<template>
    <index :title="'账户列表'"
           :ptitle="'财务处理'"
           :hname="'account-management'"
           :isshow="'isshow'">
        <div class="content account-management" slot="content">
        <div class="panel panel-flat">

            <div class="heading">
                <div class="heading-left">
                    <a data-toggle="modal" data-target="#modal_add"  class="btn btn-add" @click="addUser" data-ksa="account_manage.add">添加账户</a>
                </div>
                <div class="heading-right">
                    <select class="form-control" v-model="defaultData.companyId">
                        <option value="">全部分公司</option>
                        <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                    </select>
                    <select class="form-control" v-model="defaultData.accountType">
                        <option value="">请选择类型</option>
                        <option value="1">备付金</option>
                        <option value="2">本金</option>
                        <option value="3">佣金</option>
                    </select>
                    <input type="text" class="form-control" v-model="defaultData.accountNumber" placeholder="账号" v-limitnumber="defaultData.accountNumber">
                    <a class="btn btn-info" @click="checkNew" data-ksa="account_manage.search">查询</a>
                </div>
            </div>

            <div  v-show="!!zdlists.length"  class="dataTables_wrapper no-footer" v-cloak>
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
                            <tr v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
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
                                    <a data-ksa="reserve_cash_detail_manage.search" v-link="{name:'provisions-info',params:{accountId:trlist.id,certificate:0,aname:trlist.shortName,balance:trlist.balanceAmount}}">{{ trlist.balanceAmount/100 | currency '' }} </a>
                                </td>
                                <td v-if="trlist.status==0">
                                    <span data-ksa="account_manage.add" @click="rewrite(trlist)">编辑</span>
                                    <span data-ksa="account_manage.enable" @click="start(trlist.id)">启用</span>
                                    <span data-ksa="account_manage.enable" @click="delBtn(trlist.id)">删除</span>
                                </td>
                                <td v-else>
                                    <span chargePerson="{{trlist.chargePerson}}" @click.self="personDialog(trlist.chargePerson,trlist.id)" data-ksa="charge_person_manage.add">负责人</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="datatable-bottom">
                   <div class="left">
                        <a class="icon-file-excel" style="line-height: 30px;" >Excel导出</a>
                   </div>

                   <div class="right">
                        <page :all="pageall"
                              :cur.sync="defaultData.pageIndex"
                              :page_size.sync="defaultData.pageSize">
                        </page>
                   </div>
                </div>
            </div>

            <div class="no-list" v-show="!zdlists.length">
                未找到数据
            </div>
        </div>

            <content-dialog
                    :show.sync="personshow" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="'负责人'" @kok="personTrue(person.id)" @kcancel="personshow = false"
                    >
                <validator name="vali2">
                    <div class="form-group">
                        <label><i>*</i>负责人</label>
                        <input type="text" class="form-control" v-validate:uname="['required']" v-model="person.name" value.sync="person.name">
                        <span v-if="$vali2.uname.required && fire" class="validation-error-label">请输入负责人姓名</span>
                    </div>
                    <div class="form-group">
                        <label><i>*</i>手机号</label>
                        <input type="text" class="form-control" v-validate:phone="['required']" v-model="person.phone" value.sync="person.phone">
                        <span v-if="$vali2.phone.required && fire" class="validation-error-label">请输入负责人电话</span>
                    </div>
                    <div class="form-group">
                        <label><i>*</i>邮箱</label>
                        <input type="text" class="form-control" v-validate:email="['required']" v-model="person.email" value.sync="person.email">
                        <span v-if="$vali2.email.required && fire" class="validation-error-label">请输入负责人邮箱</span>
                    </div>
                </validator>
            </content-dialog>

            <content-dialog
                    :show.sync="waringshow" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="'操作提示'" @kok="waringBtn" @kcancel="waringshow = false"
            >
                <div class="form-group">{{waring}}</div>
            </content-dialog>

            <content-dialog
                    :show.sync="addshow" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="addtitle" @kok="addBtn" @kcancel="addshow = false"
            >
                <validator name="vali">
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
                        <input type="text" class="form-control" v-validate:val2="['required']" v-model="relist.shortName" maxlength="15" placeholder="15字以内">
                        <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入简称</span>
                    </div>
                    <div class="form-group">
                        <label><i>*</i>账户名</label>
                        <input type="text" class="form-control" v-validate:val3="['required']" v-model="relist.accountName">
                        <span v-if="$vali.val3.required && fire1" class="validation-error-label">请输入账户名</span>
                    </div>
                    <div class="form-group">
                        <label><i>*</i>账号</label>
                        <input type="text" class="form-control" v-validate:val4="['required']" v-limitnumber="relist.accountNumber" v-model="relist.accountNumber">
                        <span v-if="$vali.val4.required && fire1" class="validation-error-label">请输入账号</span>
                    </div>
                    <div class="form-group">
                        <label><i>*</i>开户行</label>
                        <input type="text" class="form-control" v-validate:val5="['required']" v-model="relist.bankName">
                        <span v-if="$vali.val5.required && fire1" class="validation-error-label">请输入开户行</span>
                    </div>
                    <div class="form-group">
                        <label><i>*</i>起始日期</label>
                        <datepicker :width="'79%'" :readonly="true" :value.sync="relist.startDate | datetimes" format="YYYY-MM-DD"></datepicker>
                        <span v-show="timeerror">请选择起始日期</span>
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
                    <div class="form-group">
                        <span v-show="saveerror!=''" class="validation-error-label" v-text="saveerror"></span>
                    </div>
                </validator>
            </content-dialog>

        </div>
    </index>
</template>
<script>
    import model from '../../ajax/AccountManagement/account_model'
    export default{
        data(){
            this.model =model(this)
            return{
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
                waringshow:false,
                addshow:false,
                personshow:false,
                timeerror:false,
            }
        },
        methods:{
            // *** 请求账户列表数据
            errorHide(){
                this.timeerror=false;
                this.saveerror='';
                this.fire1=false;
            },
            getZlists(data){
                this.model.getbanklist(data).then((response)=>{
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
                this.addshow=true;
            },
            initList(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.waringshow=false;
                this.addshow=false;
                this.personshow=false;
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
            rewrite(_list){
                this.errorHide();
                this.accountId=_list.id;
                this.relist=_.cloneDeep(_list);
                this.addtitle = '编辑账户';
                this.addshow=true;
            },
            start(a){
                this.waring = '你确认启用该账户？';
                this.accountId=a;
                this.waringshow=true;
            },
            delBtn(a){
                this.waring = '你确认删除该账户？';
                this.accountId=a;
                this.waringshow=true;
            },
            waringBtn(){
                (this.waring == '你确认启用该账户？')?this.startTrue():this.delTrue();
            },
            personDialog(a,b){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.errorHide();
                this.fire=false;
                this.accountId=b;
                this.model.queryperson(a).then((response)=>{
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
                        this.personshow=true;
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
                this.model.saveperson(data).then((response)=>{
                    if(response.data.code==0){
                        this.initList();
                        dialogs();
                    }
                })
            },
            startTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                // *** 启用提交
                this.model.startaccount(this.accountId).then((response)=>{
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
                this.model.deleteaccount(this.accountId).then((response)=>{
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
                if(this.relist.startDate==''){this.timeerror=true;return;}
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
                this.model.changeaccount(data).then((response)=>{
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
            this.getClist();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.defaultData=back_json.fetchArray(this.$route.path):null;
            this.initList();
        },
        watch:{
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.initList();
            }
        }
    }
</script>