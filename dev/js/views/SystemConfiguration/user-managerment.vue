<template>
    <index title="员工管理" ptitle="系统配置"  isshow="isshow">
        <div class="content user-managerment" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa='user_manage' class="active"><a>员工管理</a></li>
                    <li data-ksa='system_log_manage'><a v-link="{name:'log-management'}">系统日志</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" v-on:click="addUser" data-ksa="user_manage.import">导入员工</a>
                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="checkForm.subCompanyID" >
                                <option value="">全部分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>

                            <input type="text" class="form-control" v-model="checkForm.keywords" placeholder="用户名、手机号、姓名">
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="checkNew" data-ksa="user_manage.search">查询</a>
                    </div>
                </div>

                <div v-show="!!userList.length" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>分公司</th>
                                    <th>用户名</th>
                                    <th>手机号</th>
                                    <th>姓名</th>
                                    <th>最后登录时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(index,user) in userList" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{index+1}}</td>
                                    <td>{{user.subCompanyName}}</td>
                                    <td>{{user.name}}</td>
                                    <td>{{user.phone}}</td>
                                    <td>{{user.name}}</td>
                                    <td>{{user.loginTime | datetime}}</td>
                                    <td>
                                        <a  @click="showCS(user.id)" data-ksa="user_manage.control_span">管辖范围</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">

                       <div class="right">
                            <page :all="pageall"
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                       </div>
                    </div>
                </div>

                <div class="no-list" v-else>
                    未查询到员工数据信息！
                </div>

                <content-dialog
                        :show.sync="modal_ControlSpan" :is-cancel="true" :type.sync="'infos'"
                        :title.sync="'管辖范围'" @kok="submits" @kcancel="modal_ControlSpan = false"
                        >
                         <div class="modal-body">
                             <input type="button" id="All" value="全选" v-on:click="checkAlls()"/>
                             <input type="button" id="othercheck" value="反选" v-on:click="othercheck()"/>
                             <hr/>
                             <div class="controlSpan" v-for="controlSpan in controlSpanList">
                                 <input type="checkbox" :id="controlSpan.subCompanyID" name="ckbox"  :checked="controlSpan.selected"/>
                                 <label :for="controlSpan.subCompanyID">{{controlSpan.name}}</label>   
                             </div>
                         </div>
                </content-dialog>

<!--                 <div id="modal_ControlSpan" data-backdrop="static" class="modal fade" style="display: none;">
                    <div class="modal-dialog mg">
                        <div class="modal-content">
                             <div class="modal-header">
                                <h3>管辖范围</h3>
                                <button type="button" class="close" data-dismiss="modal">×</button>
                             </div>
                             <div class="modal-body">
                                 <input type="button" id="All" value="全选" v-on:click="checkAll()"/>
                                 <input type="button" id="othercheck" value="反选" v-on:click="othercheck()"/>
                                 <hr/>
                                 <div class="controlSpan" v-for="controlSpan in controlSpanList">
                                     <input type="checkbox" :id="controlSpan.subCompanyID" name="ckbox"  :checked="controlSpan.selected"/>
                                     <label :for="controlSpan.subCompanyID">{{controlSpan.name}}</label>   
                                 </div>
                             </div>
                             <div class="modal-foot">
                                <input type="button" class="btn btn-primary" v-on:click="submit" value="提交">
                                <input type="button" class="btn btn-gray" data-dismiss="modal" value="取消">
                             </div>
                        </div>
                    </div>
                </div>
 -->
                <!--导入员工dialog-->
                <content-dialog
                        :show.sync="modal_add" :is-button="false" :type.sync="'infos'"
                        :title.sync="'导入员工'"  
                >
                            <div class="addDialogs">
                                <div class="addtop">
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="userdata.subCompanyID">
                                            <option value="">请选择分公司</option>
                                            <option v-for="(index,n) in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" v-model="userdata.keyWord" placeholder="用户名、姓名、手机号">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="button" class="btn btn-info" @click="queryUser" value="查询">
                                    </div>
                                </div>
                                <div class="addbottom clearfix">
                                    <div style="text-indent: 76%">已选择：</div>
                                    <div class="left">
                                        <table v-if="merchantList.length>0" class="table">
                                            <thead>
                                            <tr role="row">
                                                <th><input type="checkbox" v-model="checkAll" @click="chooseAll"/>全选</th>
                                                <th>分公司</th>
                                                <th>用户名</th>
                                                <th>手机号</th>
                                                <th>姓名</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr role="row" v-for="(index,n) in merchantList" v-show="n.isAdd">
                                                <td>
                                                    <input type="checkbox" @click="checked(n)" v-model="n.ischeck"/>
                                                    {{index+1}}
                                                </td>
                                                <td>{{n.subCompanyName}}</td>
                                                <td>{{n.userName}}</td>
                                                <td>{{n.phone}}</td>
                                                <td>{{n.empName}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <span v-if="firstAdd && !merchantList.length>0">
                                            无可添加数据
                                        </span>
                                    </div>
                                    <div class="center">
                                        <input type="button" class="btn btn-info" @click="addTrue" value="添加">
                                        <input type="button" class="btn btn-info" @click="delTrue" value="删除">
                                        <input type="button" class="btn btn-info" @click="submit" value="确认">
                                    </div>
                                    <div class="right">
                                        <ul>
                                            <li v-for="n in checkedLis" @click="checkLi($event,n)">{{n.empName}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                </content-dialog>
                
            </div>
        </div>
    </index>
</template>

<script>
    import model from '../../ajax/SystemConfiguration/user_model'

    export default{
        data(){
            this.model =model(this)
            return{
                modal_add: false,
                modal_ControlSpan: false,
                checkForm:{
                    subCompanyID:"",
                    keywords:"",
                    pageSize:10,
                    pageIndex:1
                },
                id:"",
                userID:"",
                subcompanyList:[],
                controlSpanList:[],
                pageall:1,
                userList:[],
                controlSpanArray:[],
                merchantList:[],
                userdata:{
                    subCompanyID:'',
                    keyWord:''
                },
                checkedIds: [],
                checkedLis: [],
                removeIds: [],
                firstAdd:false
            }
        },
        computed:{
            checkAll(){
                let clength=0;
                this.merchantList.map((value)=>{
                    (!value.ischeck)?clength++:null;
                })
                return !clength
            }
        },
        methods: {
            checkLi(e,n){
                if(!e.target.classList.length){
                    this.removeIds.push(n.operationID);
                    e.target.classList.add('check-li');
                }
                else{
                    _.remove(this.removeIds, function(e) {
                        return e==n.operationID;
                    })
                    e.target.classList.remove('check-li');
                }
            },
            addTrue() {
                if(this.checkedIds==''){
                    dialogs('info','请勾选要添加的商户！');
                    return;
                }
                this.$set('checkedLis',this.checkedIds);
                let data=_.cloneDeep(this.merchantList);
                _.map(data,(val)=>{
                    this.checkedLis.map((value)=>{
                        if(val.operationID==value.operationID){
                            val.isAdd=false;
                        }
                    })
                })
                this.$set('merchantList',data);
                this.checkedIds=[];
            },
            delTrue() {
                if(this.removeIds==''){
                    dialogs('info','请选择要删除的商户！');
                    return;
                }
                let dataLi=_.cloneDeep(this.checkedLis);
                _.map(this.removeIds,(val)=>{
                    _.remove(dataLi, function(e) {
                        return e.operationID==val;
                    })
                })
                this.$set('checkedLis',dataLi);
                let data=_.cloneDeep(this.merchantList);
                _.map(data,(val)=>{
                    this.removeIds.map((value)=>{
                        if(val.operationID==value){
                            val.isAdd=true;
                            val.ischeck=false;
                        }
                    })
                })
                this.$set('merchantList',data);
                this.removeIds=[];
            },
            submits(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                var arrays = [];
                $("input[name='ckbox']:checked").each(function(){
                    arrays.push($(this).prop("id"));
                });
                let data={
                    userID:this.userID,
                    subCompanyIDs:arrays
                }
                this.model.saveUserControlSpans(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若
                            if (response.data.code==0)
                            {
                                dialogs("保存成功！");
                                this.modal_ControlSpan = false;
                            }
                        });
                //关闭弹出层
                //$(".modal").modal("hide");
            },
            submit() {
                if(this.checkedLis==''){
                    return;
                }
                var data={data:[]};
                _.map(this.checkedLis,(val)=>{
                    data.data.push(
                        {
                            operationID:val.operationID+"",
                            subCompanyId:val.subCompanyId+"",
                            userName:val.userName,
                            phone:val.phone,
                            empName:val.empName
                        }
                    );
                })
                this.model.importUser(data)
                        .then((response)=>{
                                if(response.data.code == 0){
                                this.query();
                                this.modal_add = false;
                                dialogs('success','已添加！');
                            }
                        })
            },
            chooseAll(){
                this.checkedIds=[];
                let cloneData=_.cloneDeep(this.merchantList);
                cloneData.map((value)=>{
                    if(this.checkAll){
                        value.ischeck=false;
                    }else{
                        this.checkedIds.push(value);
                        value.ischeck=true;
                    }
                })
                this.merchantList=cloneData;
            },
            checked(n){
                if(!n.ischeck){
                    this.checkedIds.push(n);
                }else{
                    _.remove(this.checkedIds, function(e) {
                        return e.operationID==n.operationID;
                    })
                }
            },
            //获取员工数据
             getUserList(data){
                 if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.user_list(data)
                    .then((response)=>{
                        (response.data.code==0) ? this.$set('userList', response.data.data) : null;
                        (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                    });
            },
            //获取分公司数据
            getSubcompany(){
                let data={
                    'type':'ImportUser'
                }
                 this.$common_model.getcompany(data)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('subcompanyList', response.data.data) : null;
                    });
            },
            checkNew(){
                this.checkForm.pageIndex=1;
                this.query();
            },
            query() {
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getUserList(this.checkForm);
            },
            //显示员工管辖
            showCS(userId) {
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.userID=userId
                this.model.userControl_list(userId)
                    .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('controlSpanList', response.data.data) : null;
                        });
                this.modal_ControlSpan = true;
            },
            addUser(){
                this.modal_add = true;
                this.firstAdd=false;
                this.clearUl();
            },
            clearUl(){
                this.merchantList=[];
                this.checkedIds=[];
                this.checkedLis=[];
                this.firstAdd=false;
            },
            checkAlls(){
                $("input[name='ckbox']").prop({'checked':true});
            },
            othercheck(){
                $("input[name='ckbox']").each(function(){
                    $(this).prop({'checked': !$(this).prop("checked")});
                })
            },
            queryUser(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.firstAdd=true;
                this.checkedLis=[];
                this.model.readyImportUser(this.userdata)
                        .then((response)=>{
                            if(response.data.code == 0){
                                this.$set('merchantList',response.data.data);
                                _.map(this.merchantList, function(value) {
                                    value.isAdd=true;
                                })
                             }
                        })
            }
        },
        ready() {
            this.getSubcompany({});
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.getUserList(this.checkForm);
        },
       watch:{
           'checkForm.pageIndex+checkForm.pageSize'(){
                this.query();
            }
       },
        components:{
        }
    }
</script>