<template>
    <index :title="'通道管理'"
           :ptitle="'本金收入'"
           :hname="''"
           :isshow="'isshow'">
        <div class="content account-management" slot="content">
        <div class="panel panel-flat">
            <ul class="tab-bor">
                <li data-ksa=""><a v-link="{name:'principle-order'}">入账明细</a></li>
                <li data-ksa="" class="active"><a v-link="{name:'running-channel'}">通道管理</a></li>
            </ul>
            <div class="panel-heading">
                <div class="heading-left">
                    <a class="btn btn-add" @click="addUser" data-ksa="">添加通道</a>
                </div>
            </div>
            <div  v-show="!!zdlists.length"  class="dataTables_wrapper no-footer" v-cloak>
                <div class="datatable-scroll">
                    <table class="table">
                        <thead>
                            <tr role="row">
                                <th>简称</th>
                                <th>全称</th>
                                <th>代码</th>
                                <th>联系人</th>
                                <th>电话</th>
                                <th>邮箱</th>
                                <th>收单回款账号</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.shortName}}</td>
                                <td>{{trlist.fullName}}</td>
                                <td>{{trlist.code}}</td>
                                <td>{{trlist.connectionPerson}}</td>
                                <td>{{trlist.connectionPhone}}</td>
                                <td>{{trlist.connectionEmail}}</td>
                                <td>
                                    <a @click.self="getAccountList(trlist.id)" data-ksa="">配置</a>
                                </td>
                                <td>
                                    <template v-if="trlist.status==0">
                                        未启用
                                    </template>
                                    <template v-if="trlist.status==1">
                                        已启用
                                    </template>
                                </td>
                                <td>
                                    <a data-ksa="" @click="rewrite(trlist)">编辑</a>
                                    <a data-ksa="" v-if="trlist.status==0" @click="start(trlist.id)">启用</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="no-list" v-show="!zdlists.length">
                当前无通道数据
            </div>
        </div>

            <content-dialog
                    :show.sync="addAccountshow" :is-button="false" :type.sync="'infos'"
                    :title.sync="'配置收单回款账号'" @kcancel="addAccountshow = false"
                    >
                    <div><a @click="addAccountTr=true" class="btn btn-add">新增</a></div>
                    <table class="table" style="margin:0 15px 30px 15px; text-align:center">
                        <thead>
                        <tr role="row">
                            <th>ID</th>
                            <th>账户名</th>
                            <th>账号</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(index,trlist) in addAccountList" v-bind:class="{'odd':(index%2==0)}">
                            <td>{{trlist.id}}</td>
                            <td>{{trlist.accountName}}</td>
                            <td>{{trlist.accountNumber}}</td>
                            <td><a @click="delAccountBtn(trlist.id)">删除</a></td>
                        </tr>
                        <tr v-show="addAccountTr||!addAccountList.length">
                            <td></td>
                            <td>
                                <input type="text" class="form-control" placeholder="请输入账户名" v-model="addAccountData.accountName">
                            </td>
                            <td>
                                <input type="text" class="form-control" placeholder="请输入账号" v-model="addAccountData.accountNumber">
                            </td>
                            <td>
                                <a @click="addAccountBtn">保存</a>
                                <a v-if="!!addAccountList.length" @click="addAccountTr=false">取消</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
            </content-dialog>

            <content-dialog
                    :show.sync="waringshow" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="'操作提示'" @kok="waringBtn" @kcancel="waringshow = false"
            >
                <div class="form-group">{{waring}}</div>
            </content-dialog>
            <content-dialog
                    :show.sync="addshow" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="addtitle" @kok="addDialogBtn" @kcancel="addshow = false"
            >
                <validator name="vali">
                    <div class="form-group">
                        <label><i>*</i>简称</label>
                        <input type="text" class="form-control" v-validate:val2="['required']" v-model="relist.shortName" maxlength="10" placeholder=" 10个字符以内">
                    </div>
                    <div class="form-group">
                        <label><i>*</i>全称</label>
                        <input type="text" class="form-control" v-validate:val3="['required']" v-model="relist.fullName" maxlength="50" placeholder="50个字符以内">
                    </div>
                    <div class="form-group">
                        <label><i>*</i>代码</label>
                        <input type="text" class="form-control" v-if="relist.status==1" maxlength="20" v-model="relist.code" readonly>
                        <input type="text" class="form-control" v-else v-validate:val4="['required']" maxlength="20" v-model="relist.code">
                    </div>
                    <div class="form-group">
                        <label>联系人</label>
                        <input type="text" class="form-control" v-model="relist.connectionPerson">
                    </div>
                    <div class="form-group">
                        <label>电话</label>
                        <input type="text" class="form-control" v-model="relist.connectionPhone">
                    </div>
                    <div class="form-group">
                        <label>邮箱</label>
                        <input type="text" class="form-control" v-model="relist.connectionEmail">
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
    import model from '../../ajax/PrincipalIncome/running_model'
    export default{
        data(){
            this.model =model(this)
            return{
                zdlists:[],
                relist:{
                    shortName :'',
                    fullName :'',
                    code :'',
                    connectionPerson :'',
                    connectionPhone :'',
                    connectionEmail :'',
                },
                addtitle:'',
                waring:'',
                addAccountData:{
                    accountName:'',
                    accountNumber:'',
                },
                accountId:'',
                delaccountId:'',
                addAccountList:[],
                addshow:false,
                waringshow:false,
                addAccountshow:false,
                addAccountTr:false
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(){
                this.model.getchannellist().then((response)=>{
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if(response.data.code==0){
                        this.$set('zdlists', response.data.data)
                    }
                });
            },
            checkNew(){
                this.initList();
            },
            addUser(){
                this.fire1=false;
                this.relist={
                    shortName :'',
                    fullName :'',
                    code :'',
                    connectionPerson :'',
                    connectionPhone :'',
                    connectionEmail :'',
                },
                this.accountId='';
                this.addtitle = '添加收单通道';
                this.addshow=true;
            },
            initList(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.waringshow=false;
                this.addAccountshow=false;
                this.addAccountTr=false;
                this.addshow=false;
                this.getZlists();
            },
            rewrite(_list){
                this.accountId=_list.id;
                this.relist=_.cloneDeep(_list);
                this.addtitle = '编辑收单通道';
                this.addshow=true;
            },
            start(a){
                this.waring = '你确认启用该账户？';
                this.accountId=a;
                this.waringshow=true;
            },
            delAccountBtn(a){
                this.waring = '你确定删除该回款账号？';
                this.delaccountId=a;
                this.waringshow=true;
            },
            waringBtn(){
                (this.waring == '你确认启用该账户？')?this.startTrue():this.deleteAccountList();
            },
            addAccountBtn(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.addAccountData.accountName==''||this.addAccountData.accountNumber==''){
                    dialogs('info','账户名及账号为必填项！');
                    return;
                }
                let data={
                    runningChannelID:this.accountId,
                    accountName:this.addAccountData.accountName,
                    accountNumber:this.addAccountData.accountNumber
                }
                this.model.saveAccountList(data).then((response)=>{
                    if(response.data.code == 0){
                        dialogs('success',response.data.message);
                        this.addAccountList.push(response.data.data);
                        this.addAccountData={
                            accountName:'',
                            accountNumber:''
                        };
                        this.addAccountTr=false;
                    }
                })
            },
            getAccountList(a){
                this.accountId=a;
                this.addAccountTr=false;
                this.addAccountData={
                    accountName:'',
                    accountNumber:''
                };
                this.model.getAccountList(this.accountId).then((response)=>{
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if(response.data.code==0){
                        this.$set('addAccountList', response.data.data);
                        this.addAccountshow=true;
                    }
                });
            },
            deleteAccountList(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.deleteAccountList(this.delaccountId).then((response)=>{
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if(response.data.code==0){
                        dialogs('success', response.data.message);
                        let data=_.cloneDeep(this.addAccountList);
                        _.remove(data,(value)=>{
                            return value.id==this.delaccountId
                        })
                        this.addAccountList=data;
                        this.waringshow=false;
                    }
                });
            },
            startTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                // *** 启用提交
                this.model.startChannel(this.accountId).then((response)=>{
                    // *** 判断请求是否成功如若成功则启用该数据
                    if(response.data.code==0){
                        this.initList();
                        dialogs('success',response.data.message);
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
                        dialogs('success',response.data.message);
                    }
                })
            },
            addDialogBtn(){
                (this.addtitle == '添加收单通道')?this.addAccountTrue():this.editAccountList();
            },
            addAccountTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(!this.$vali.valid){
                    dialogs('info','请填写带*必填项！');
                    return;
                }
                // *** 新增修改保存
                this.model.addChannel(this.relist).then((response)=>{
                    if(response.data.code==0){
                        this.initList();
                        dialogs('success',response.data.message);
                    }
                })
            },
            editAccountList(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(!this.$vali.valid){
                    dialogs('info','请填写带*必填项！');
                    return;
                }
                // *** 新增修改保存
                this.model.editChannel(this.relist).then((response)=>{
                    if(response.data.code==0){
                        this.initList();
                        dialogs('success',response.data.message);
                    }
                })
            }
        },
        ready: function () {
            this.initList();
        }
    }
</script>