<template>
    <index title="日志管理" ptitle="系统配置"  isshow="isshow">
        <div class="content log-management" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa='user_manage'><a v-link="{name:'user-managerment'}">员工管理</a></li>
                    <li data-ksa='system_log_manage' class="active"><a>系统日志</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">

                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form">
                                <input type="text" class="form-control" v-model="checkForm.keywords" placeholder="用户名、姓名、描述">

                                <select class="form-control" v-model="checkForm.subCompanyID" >
                                <option value="">全部分公司</option>
                                    <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                                </select>

                                <select class="form-control" v-model="checkForm.timeRange" @change="getTime">
                                    <option value="5">今天</option>
                                    <option value="0">昨天</option>
                                    <option value="1">最近一周</option>
                                    <option value="2">最近一个月</option>
                                    <option value="3">最近三个月</option>
                                    <option value="4">自定义时间</option>
                                </select>

                                <div v-show="checkForm.timeRange==4" class="inline">
                                    <datepicker :value.sync="checkForm.startDate"></datepicker>
                                    <span>至</span>
                                    <datepicker :value.sync="checkForm.endDate"></datepicker>
                                </div>
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="checkNew" data-ksa="system_log_manage.search">查询</a>
                    </div>
                </div>

                <div v-show="!!logList.length" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>用户名</th>
                            <th>姓名</th>
                            <th>分公司</th>
                            <th>URL</th>
                            <th>描述</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(index,log) in logList" v-bind:class="{'odd':(index%2==0)}">
                            <td>{{index+1}}</td>
                            <td>{{log.userName}}</td>
                            <td>{{log.name}}</td>
                            <td>{{log.subCompanyName}}</td>
                            <td>{{log.website}}{{log.uri}}</td>
                            <td>
                                {{log.uri | geturl descriptions}}
                            </td>
                            <td>{{log.createTime | datetime}}</td>
                            <td>
                                <a v-on:click="showLog(log.id)" data-ksa="system_log_manage.detail">详情</a>
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
                    未查询到日志数据！
                </div>

                <content-dialog
                        :show.sync="modal_logInfo" :is-button="false" :type.sync="'infos'"
                        :title.sync="'日志详情'" 
                >
                    <div class="modal-body">
                        <div>
                            <div><label>用户名：</label>{{log.userName}}</div>
                            <div><label>姓名：</label>{{log.name}}</div>
                            <div>
                                <label style="position: relative;top: -25px;">URL：</label>
                                <textarea class="textarea-w">{{log.website}}{{log.uri}}</textarea>
                            </div>
                            <div>
                                <label style="position: relative;top: -25px;">描述：</label>
                                <textarea  v-show="log.uri!=''" class="textarea-w">{{log.uri | geturl descriptions}}</textarea>
                            </div>
                            <div>
                                <label style="position: relative;top: -80px;">详情：</label>
                                <textarea class="textarea-w textarea-h">{{log.logInfo}}</textarea>
                            </div>
                            <div><label>创建IP：</label>{{log.createIp}}</div>
                            <div><label>创建时间：</label>{{log.createTime | datetime}}</div>
                        </div>
                    </div>
                </content-dialog>


            </div>
        </div>
    </index>
</template>

<script>
    import model from '../../ajax/SystemConfiguration/log_model'
    export default{
        data(){
            this.model =model(this)
            return{
                modal_logInfo: false,
                checkForm:{
                    subCompanyID:"",
                    keywords:"",
                    startDate:'',
                    endDate:'',
                    startDate:'',
                    endDate:'',
                    pageIndex:1,
                    pageSize:10,
                    timeRange:'3'
                },
                subcompanyList:[],
                pageall:1,
                logList:[],
                log:{
                    "userName":"",
                    "name":"",
                    "uri":"",
                    "description":"",
                    "logInfo":"",
                    "createIP":"",
                    "createTiome":"",
                    "website":""
                },
                descriptions:[],
            }
        },
        methods:{
            //获取员工数据
             getLogList(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.modal_logInfo=false;
                this.model.log_list(data)
                    .then((response)=>{
                        (response.data.code==0) ? this.$set('logList', response.data.data) : null;
                        (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                    });
                 this.model.log_description()
                         .then((response)=>{
                             (response.data.code==0)?this.$set('descriptions',response.data.data):null
                         })
            },
            //获取分公司数据
            getSubcompany(){
                let data={
                    'type':'ImportUser'
                }
                 this.$common_model.getcompany(data)
                    .then((response)=>{
                        (response.data.code==0) ? this.$set('subcompanyList', response.data.data) : null;
                    });
            },
            showLog(id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.log_info(id)
                    .then((response)=>{
                            (response.data.code==0) ? this.$set('log', response.data.data) : null;
                            this.modal_logInfo=true;
                        })
            },
            checkNew(){
                this.checkForm.pageIndex=1;
                this.query();
            },
            query() {
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getLogList(this.checkForm);
            },
            getTime(){
                this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
            }
        },
        ready() {
            this.getTime();
            this.getSubcompany({});
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.query();
        },
       watch:{
            'checkForm.pageIndex+checkForm.pageSize'(){
                this.query();
            }
       }
    }
</script>