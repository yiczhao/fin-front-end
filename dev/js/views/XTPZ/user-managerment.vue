<template>
    <index title="员工管理" ptitle="系统配置"  isshow="isshow">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                        <div class="panel-heading">
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
                        <div v-cloak v-show="!!userList.length" class="dataTables_wrapper no-footer">
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
                                <tr v-for="(index,user) in userList">
                                    <td>{{index+1}}</td>
                                    <td>{{user.subCompanyName}}</td>
                                    <td>{{user.name}}</td>
                                    <td>{{user.phone}}</td>
                                    <td>{{user.name}}</td>
                                    <td>{{user.loginTime | datetime}}</td>
                                    <td>
                                        <a href="javascript:void(0);" data-toggle="modal" data-target="#modal_ControlSpan" @click="showCS(user.id)">管辖范围</a>                                        
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
                    未查询到员工数据信息！
                </div>
                        <div id="modal_ControlSpan" data-backdrop="static" class="modal fade" style="display: none;">
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
                                         <hr/>
                                     </div>
                                     <div class="modal-foot">
                                        <input type="button" class="btn btn-primary" v-on:click="submit" value="提交">
                                        <input type="button" class="btn btn-gray" v-on:click="cancel" data-dismiss="modal" value="取消">
                                        <br/>
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
    [v-cloak]{
        display: none;
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
    .controlSpan{
        float: left;
        margin-right: 10px;
    }
    .modal-foot{
        clear:both;
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
                subCompanyID:"",
                keywords:"",
                id:"",
                userID:"",
                subcompanyList:[],
                controlSpanList:[],
                pageall:1,
                pagecur:1,
                page_size:15,
                pageIndex:1,
                pageSize:15,
                userList:[],
                controlSpanArray:[]
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
                        subCompanyID:this.subCompanyID,
                        keywords:this.keywords,
                        pageIndex: this.pageIndex, 
                        pageSize: this.pageSize
                    };
                this.getUserList(data);
            },
            
            //显示员工管辖
            showCS: function (userId) {
                this.userID=userId
                this.$http.post('./user/userControlSpanList/'+userId)
                    .then(function (response) {
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('controlSpanList', response.data.data) : null;
                        },
                         function (response) {
                            console.log(response);
                        });
            },
            checkAll:function(){
                $("input[name='ckbox']").prop({'checked':true});
            },
            othercheck:function(){
                $("input[name='ckbox']").each(function(){
                  $(this).prop({'checked': !$(this).prop("checked")});  
                })
            },
            submit:function(){
                var arrays = [];
                $("input[name='ckbox']:checked").each(function(){
                  arrays.push($(this).prop("id"));  
                });

                let data={
                    userID:this.userID,
                    subCompanyIDs:arrays
                }
                this.$http.post('./user/saveUserControlSpans',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若
                        if (response.data.code==0)
                        {
                            alert("保存成功！");
                        }
                    }, function (response) {
                        console.log(response);
                    });
                    //关闭弹出层
                    $(".modal").modal("hide");
            },
            cancel:function(){

            }
        },
        ready: function () {
            this.getUserList({});
            this.getSubcompany({});
        },
       watch:{
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
           'dialog': dialog,
        }
    }
</script>