<template>
    <index title="日志管理" ptitle="系统配置"  isshow="isshow">
        <section class="content" slot="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <form class="form-inline manage-form">
                                <br/>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="keywords" placeholder="用户名、手机号、姓名">
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="subCompanyID" >
                                    <option value="">请选择分公司</option>
                                        <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="timeRange">
                                        <option value="">请选择日期</option>
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
                        <div class="box-body box-tbl">
                            <table id="table1" class="table table-bordered table-hover">
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
                                <tr role="row" v-if="!!logList.length" v-for="(index,log)in logList">
                                    <td>{{index+1}}</td>
                                    <td>{{log.userName}}</td>
                                    <td>{{log.name}}</td>
                                    <td>{{log.subCompanyName}}</td>
                                    <td>{{log.URL}}</td>
                                    <td>{{log.description}}</td>
                                    <td>{{log.createTiome}}</td>
                                    <td>
                                        <a href="#">详情</a>                     
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer">
                            <page :all="pageall"
                                  :cur.sync="pagecur"
                                  :page_size.sync="page_size">
                            </page>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </index>
</template>
<style>
    body{
        background-color:#fff;
    }
    .box-tbl{
        overflow:auto;
    }
    .page-bar{
        margin: 25px auto;
        text-align: center;
    }
    .box-body #table1 th{
        min-width: 85px;
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
                subCompanyID:"",
                keywords:"",
                timeRange:'',
                subcompanyList:[],
                pageall:1,
                pagecur:1,
                page_size:15,
                logList:[],
            }
        },
        methods:{
            //获取员工数据
             getLogList:function(data){
                this.$http.post('./log/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('logList', response.data.data) : null;
                        (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            //获取分公司数据
            getSubcompany:function(data){
                 this.$http.post('./subcompany/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('subcompanyList', response.data.data) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            getTwo:function(num){
                if(num.toString().length>=2) return num;
                var str="";
                for(var i=num.toString().length;i<2;i++)
                    str +="0";
                return str + num.toString();
            },
            query: function () {
                let data={
                        subCompanyID:this.subCompanID,
                        keywords:this.keywords
                    };
                this.getTradeList(data);
            },
        },
        ready: function () {
            this.getLogList({});
            this.getSubcompany({});
        },
       watch:{
            timeRange:function(){
                console.log();
                var d=new Date()
                var day=d.getDate()
                var month=d.getMonth() + 1
                var year=d.getFullYear()
                var newD;
                switch (this.timeRange){
                    case '0':
                        newD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day-1);
                        break;
                    case '1':
                        newD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day-7);
                        break;
                    case '2':
                        newD=year + "-" + this.getTwo(month-1) + "-" + this.getTwo(day);
                        break;
                    case '3':
                        newD=year + "-" + this.getTwo(month-3) + "-" + this.getTwo(day);
                        break;
                    case '4':
                        newD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                        break;
                }
                var endD=year + "-" + this.getTwo(month) + "-" + this.getTwo(day);
                this.startDate=newD;
                this.endDate=endD;
            }
       },
        components:{
           'datepicker': datepicker,
           'dialog': dialog,
        }
    }
</script>