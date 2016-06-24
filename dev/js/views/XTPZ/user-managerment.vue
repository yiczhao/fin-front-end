<template>
    <index title="员工管理" ptitle="系统配置"  isshow="isshow">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                        <div class="panel-heading">
                            <form class="form-inline manage-form">
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" v-on:click="addUser" value="导入员工">
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="subCompanyID" >
                                        <option value="">全部分公司</option>
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
                                        <a data-toggle="modal" data-target="#modal_ControlSpan" @click="showCS(user.id)">管辖范围</a>
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
                                     </div>
                                     <div class="modal-foot">
                                        <input type="button" class="btn btn-primary" v-on:click="submit" value="提交">
                                        <input type="button" class="btn btn-gray" data-dismiss="modal" value="取消">
                                     </div>
                                </div>
                            </div>
                        </div>

                <!--导入员工dialog-->
                <div data-backdrop="static"  id="modal_add" class="modal fade" style="display: none;">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title" v-text="addTitle"></h5>
                            </div>
                            <div class="modal-body">
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
                                <div class="addbottom">
                                    <div style="text-indent: 68%">已选择：</div>
                                    <div class="col-md-7">
                                        <table v-if="userlists.length>0" class="table">
                                            <thead>
                                            <tr role="row">
                                                <th><label><input @click="allCkb($event)" type="checkbox">全选</label></th>
                                                <th>分公司</th>
                                                <th>用户名</th>
                                                <th>手机号</th>
                                                <th>姓名</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr role="row" v-for="n in userlists">
                                                <td>
                                                    <label>
                                                        <input :value="n.operationID"
                                                               type="checkbox"
                                                               :subCompanyId="n.subCompanyId"
                                                               :userName="n.userName"
                                                               :phone="n.phone"
                                                               :empName="n.empName"
                                                        >{{$index+1}}
                                                    </label>
                                                </td>
                                                <td>{{n.subCompanyName}}</td>
                                                <td>{{n.userName}}</td>
                                                <td>{{n.phone}}</td>
                                                <td>{{n.empName}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <span v-if="firstAdd && !xhlist.length>0">
                                            无可添加数据
                                        </span>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="button" class="btn btn-info"  @click="addTrue($event)" value="添加">
                                        <input type="button" class="btn btn-info" @click="delTrue($event)" value="删除">
                                        <input type="button" class="btn btn-info" @click="submitTrue($event)" value="确认">
                                    </div>
                                    <div class="col-md-4">
                                        <ul></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </index>
</template>
<style lang="sass" scoped>
    body{
        background-color:#fff;
    }
    [v-cloak]{
        display: none;
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
    .controlSpan{
        display: inline-block;
        margin-right: 10px;
    }
    .modal-foot{
        margin-bottom: 30px;
        clear:both;
        text-align: center;
    }
    .addbottom{
        margin-top: 15px;
        .col-md-2{
            text-align: center;
            input{
                margin-bottom: 10px;
            }
        }
        .col-md-7{
            height: 300px;
            overflow: auto;
            border: 1px solid #ccc;
        }
        .col-md-1{
            padding-top: 40px;
            text-align: center;
            input{
                margin:15px 0;
            }
        }
        .col-md-4{
            border: 1px solid #ccc;
            padding:10px;
        }
        ul{
            list-style: none;
            height: 278px;
            overflow: auto;
            li{
                margin:5px 0;
                cursor: pointer;
                padding-left:3px;
            }
        }
    }
    .addbottom table tr td,  .addbottom table tr th{
        padding: 2px;
    }
    .addtop,  .addbottom{
        overflow: hidden;
        .form-control{
            padding: 7px;
        }
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/XTPZ/user_model'
//    import common_model from '../../ajax/components/model'

    export default{
        data(){
            this.model =model(this)
//            this.common_model=common_model(this)
            return{
                subCompanyID:"",
                keywords:"",
                id:"",
                userID:"",
                subcompanyList:[],
                controlSpanList:[],
                pageall:1,
                pagecur:1,
                page_size:10,
                pageIndex:1,
                pageSize:10,
                userList:[],
                controlSpanArray:[],
                userlists:[],
                userdata:{
                    subCompanyID:'',
                    keyWord:''
                },
                addId:[],
                firstAdd:false
            }
        },
        methods:{
            //获取员工数据
             getUserList(data){
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
            query() {
                let data={
                        subCompanyID:this.subCompanyID,
                        keywords:this.keywords,
                        pageIndex: this.pageIndex, 
                        pageSize: this.pageSize
                    };
                this.getUserList(data);
            },
            //显示员工管辖
            showCS(userId) {
                this.userID=userId
                this.model.userControl_list(userId)
                    .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('controlSpanList', response.data.data) : null;
                        });
            },
            checkAll(){
                $("input[name='ckbox']").prop({'checked':true});
            },
            othercheck(){
                $("input[name='ckbox']").each(function(){
                  $(this).prop({'checked': !$(this).prop("checked")});  
                })
            },
            submit(){
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
                        }
                    });
                    //关闭弹出层
                    $(".modal").modal("hide");
            },
            addUser(){
                $('#modal_add').modal('show');
                this.clearUl();
            },
            clearUl(){
                $('.col-md-7 tr input[type="checkbox"]').prop('checked',false);
                $('.addbottom .col-md-4').children('ul').html('');
            },
            queryUser(){
                this.firstAdd=true;
                this.model.readyImportUser(this.userdata)
                        .then((response)=>{
                            (response.data.code==0)?this.$set('userlists',response.data.data):null;
                            this.clearUl();
                        })
            },
            allCkb(e){
                if(e.target.checked){
                    $('.col-md-7 td input[type="checkbox"]').prop('checked',true);
                }else{
                    $('.col-md-7 td input[type="checkbox"]').prop('checked',false);
                    this.addId=[];
                }
            },
            appendLi(a){
                let _this=$("input[value='" + a + "']");
                let _tr=_this.closest('tr');
                let _ul=$('.addbottom .col-md-4').children('ul');
                let subCompanyId=_this.attr('subCompanyId');
                let userName=_this.attr('userName');
                let phone=_this.attr('phone');
                let empName=_this.attr('empName');
                _ul.append('<li subCompanyId="'+subCompanyId+'" userName="'+userName+'" phone="'+phone+'" empName="'+empName+'" operationID="'+a+'">'+userName+'</li>');
                _tr.hide();
            },
            addTrue(e){
                this.addId = Array.from($(".col-md-7 td input[type='checkbox']:checked"), i => i.value);
                for(let i=0;i<this.addId.length;i++){
                    this.appendLi(this.addId[i]);
                }
                $('.col-md-7 td input[type="checkbox"]').prop('checked',false);
                this.addId=[];
            },
            delTrue(e){
                let _ul=$(e.target).parent('.col-md-1').next('.col-md-4').children('ul'),
                        _table=$(e.target).parent('.col-md-1').prev('.col-md-7').children('table').find('tr:hidden'),
                        _li= _ul.find('.check-li');
                for(let i=0;i<_li.length;i++){
                    _table.eq(_li.eq(i).index()).show();
                }
                _li.remove();
            },
            submitTrue(e){
                let _li=$(e.target).parent('.col-md-1').next('.col-md-4').children('ul').children('li');
                if(!_li.length>0)return;
                var data={data:[]};
                _li.each(function(index){
                    let _this=$(this);
                    let operationIDs=_this.attr('operationID');
                    let subCompanyIds=_this.attr('subCompanyId');
                    let userNames=_this.attr('empName');
                    let phones=_this.attr('phone');
                    let names=_this.attr('empName');
                    data.data[index]=
                            {
                                operationID:operationIDs,
                                subCompanyId:subCompanyIds,
                                userName:userNames,
                                phone:phones,
                                empName:names
                            }

                })
                this.model.importUser(data)
                        .then((response)=>{
                            this.query();
                            $('#modal_add').modal('hide');
                            dialogs('success','已添加！');
                        })
            },
        },
        ready() {
            this.getUserList({});
            this.getSubcompany({});
            $(document).on('click','.addbottom .col-md-4 ul li',function(){
                $(this).toggleClass('check-li');
                $(this).hasClass('check-li')?$(this).css('background','#ccc'):$(this).css('background','none');
            })
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
           'datepicker': datepicker
        }
    }
</script>