<template>
    <index title="员工管理" ptitle="系统配置"  isshow="isshow">
        <section class="content" slot="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <form class="form-inline manage-form">
                                <br/>
                                <div class="form-group">
                                    <select class="form-control" v-model="subCompanyID" >
                                    <option value="">请选择分公司</option>
                                        <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="keywords" placeholder="用户名、手机号、姓名">
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
                                    <th>分公司</th>
                                    <th>用户名</th>
                                    <th>手机号</th>
                                    <th>姓名</th>
                                    <th>最后登录时间</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-if="!!userList.length" v-for="user in userList">
                                    <td>{{user.loginTime}}</td>
                                    <td>{{user.subCompanyName}}</td>
                                    <td>{{user.userName}}</td>
                                    <td>{{user.phone}}</td>
                                    <td>{{user.name}}</td>
                                    <td>{{user.loginTime}}</td>
                                    <td>
                                        <a href="">权限</a>                                        
                                        <a href="">管辖范围</a>                                        
                                        <a href="">删除</a>                                        
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
                subcompanyList:[],
                pageall:1,
                pagecur:1,
                page_size:15,
                userList:[],
            }
        },
        methods:{
            //获取员工数据
             getUserList:function(data){
                this.$http.post('./user/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('userList', response.data.data) : null;
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
            query: function () {
                let data={
                        subCompanyID:this.subCompanID,
                        keywords:this.keywords
                    };
                this.getTradeList(data);
            },
        },
        ready: function () {
            this.getUserList({});
            this.getSubcompany({});
        },
       watch:{
           
       },
        components:{
           'datepicker': datepicker,
           'dialog': dialog,
        }
    }
</script>