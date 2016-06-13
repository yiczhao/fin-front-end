<template>
    <index title="日志管理" ptitle="系统配置"  isshow="isshow">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                        <div class="panel-heading">
                            <form class="form-inline manage-form">
                                <br/>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="keywords" placeholder="用户名、姓名、描述">
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="subCompanyID" >
                                    <option value="">请选择分公司</option>
                                        <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="timeRange">
                                        <option value="5">今天</option>
                                        <option value="0">昨天</option>
                                        <option value="1">最近一周</option>
                                        <option value="2">最近一个月</option>
                                        <option value="3">最近三个月</option>
                                        <option value="4">自定义时间</option>
                                    </select>
                                </div>
                                <div class="form-group" v-show="timeRange==4">
                                    <datepicker  :readonly="true" :value.sync="startDate" format="YYYY-MM-DD"></datepicker>至
                                    <datepicker  :readonly="true" :value.sync="endDate" format="YYYY-MM-DD"></datepicker>
                                </div>
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" v-on:click="query" value="查询">
                                </div>
                            </form>
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
                                <tr v-if="!!logList.length" v-for="(index,log) in logList">
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
                                        <a data-toggle="modal" data-target="#modal_logInfo" v-on:click="showLog(log.id)">详情</a>
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
                            未查询到日志数据！
                        </div>
                        
                        <div id="modal_logInfo" data-backdrop="static" class="modal fade" style="display: none;">
                            <div class="modal-dialog mg">
                                <div class="modal-content">
                                     <div class="modal-header">
                                        <h3>日志详情</h3>
                                        <button type="button" class="close" data-dismiss="modal">×</button>
                                     </div>
                                     <div class="modal-body">
                                        <div>
                                            <div><label>用户名：</label>{{log.userName}}</div>
                                            <div><label>姓名：</label>{{log.name}}</div>
                                            <div><label style="position: relative;top: -25px;">URL：</label>
                                                <textarea class="textarea-w">{{log.website}}{{log.uri}}</textarea>
                                            </div>
                                            <div><label style="position: relative;top: -25px;">描述：</label>
                                                <textarea  v-if="log.uri!=''" class="textarea-w">{{log.uri | geturl descriptions}}</textarea>
                                            </div>
                                            <div><label style="position: relative;top: -80px;">详情：</label>
                                                <textarea class="textarea-w textarea-h">{{log.logInfo}}</textarea>
                                            </div>
                                            <div><label>创建IP：</label>{{log.createIp}}</div>
                                            <div><label>创建时间：</label>{{log.createTime | datetime}}</div>
                                        </div>
                                     </div>
                                </div>
                            </div>
                        </div>
            </div>
        </div>
    </index>
</template>
<style scoped>
    body{
        background-color:#fff;
    }
    .datatable-scroll{
        overflow:auto;
    }
    .page-bar{
        margin: 25px auto;
        text-align: center;
    }
    .box-body #table1 th{
        min-width: 85px;
    }
    .textarea-w{
        width: 500px;
        height: 40px;
    }
    .textarea-h{
        height: 100px;
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/XTPZ/log_model'
    import common_model from '../../ajax/components/model'
    export default{
        data(){
            this.model =model(this)
            this.common_model=common_model(this)
            return{
                subCompanyID:"",
                keywords:"",
                timeRange:'1',
                startDate:'',
                endDate:'',
                subcompanyList:[],
                startDate:'',
                endDate:'',
                pageall:1,
                pagecur:1,
                page_size:15,
                pageIndex:1,
                pageSize:15,
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
                this.model.log_list(data)
                    .then((response)=>{
                        (response.data.code==0) ? this.$set('logList', response.data.data) : null;
                        (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                    });
            },
            //获取分公司数据
            getSubcompany(){
                let data={
                    'type':'ImportUser'
                }
                 this.common_model.getcompany(data)
                    .then((response)=>{
                        (response.data.code==0) ? this.$set('subcompanyList', response.data.data) : null;
                    });
            },
            getdescription(){
                this.model.log_description()
                        .then((response)=>{
                            (response.data.code==0)?this.$set('descriptions',response.data.data):null
                        })
            },
            showLog(id){
                this.model.log_info(id)
                    .then((response)=>{
                            (response.data.code==0) ? this.$set('log', response.data.data) : null;
                        })
            },
            query: function () {
                let data={
                        subCompanyID:this.subCompanyID,
                        keywords:this.keywords,
                        startDate:this.startDate,
                        endDate:this.endDate,
                        pageIndex: this.pageIndex, 
                        pageSize: this.pageSize
                    };
                this.startDate=init_date(this.timeRange)[0];
                this.endDate=init_date(this.timeRange)[1];
                this.getLogList(data);
            },
        },
        ready: function () {
            this.startDate=init_date(this.timeRange)[0];
            this.endDate=init_date(this.timeRange)[1];
            this.getdescription();
            this.getLogList({});
            this.getSubcompany({});
        },
       watch:{
            timeRange:function(){
                this.startDate=init_date(this.timeRange)[0];
                this.endDate=init_date(this.timeRange)[1];
            },
             pagecur(){
                this.pageIndex=this.pagecur;
                this.query();
            },
            page_size(){
                this.pageSize=this.page_size;
                this.query();
            }
       },
        components:{
           'datepicker': datepicker,
        }
    }
</script>