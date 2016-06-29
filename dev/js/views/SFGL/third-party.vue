<template>
    <index :title="'账户列表'"
           :ptitle="'三方管理'"
           :hname="'third-party'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <input type="button" class="btn btn-info" @click="addUser" value="添加">
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control" v-model="defaultData.operationID" placeholder="账户ID"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.merchantName" placeholder="名称">
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.subCompanyID" @change="getCity(defaultData.subCompanyID)">
                                <option value="">全部分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.cityID">
                                <option value="">全部城市</option>
                                <option v-for="(index,n) in city" v-text="n.name" :value="n.cityID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.status">
                                <option value="">请选择状态</option>
                                <option value="1">正常</option>
                                <option value="0">停用</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="button" class="btn btn-info" @click="initList" value="查询">
                        </div>
                    </form>
                </div>
                <div v-if="zdlists.length>0" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div>

                    </div>
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>账户ID</th>
                                <th>名称</th>
                                <th>分公司</th>
                                <th>城市 </th>
                                <th>余额</th>
                                <th>状态</th>
                                <th>操作</th>
                                <th>开通时间</th>
                                <th>联系人</th>
                                <th>电话</th>
                                <th>工作人员</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in zdlists">
                                    <td>{{trlist.operationID}}</td>
                                    <td>{{trlist.accountName}}</td>
                                    <td>{{trlist.subCompanyName}}</td>
                                    <td>{{trlist.cityName}}</td>
                                    <td>{{trlist.balanceAmount/100 | currency ''}}</td>
                                    <td>
                                        <template v-if="trlist.status==0">停用</template>
                                        <template v-if="trlist.status==1">正常</template>
                                    </td>
                                    <td>
                                        <a v-if="trlist.status==1" @click="recharge(trlist.id,trlist.accountName,trlist.balanceAmount)" data-toggle="modal" data-target="#modal_submit">回款</a>
                                        <a v-link="{name:'third-info',params:{'id':trlist.id}}">明细</a>
                                        <a v-if="trlist.status==1" @click="startParty(trlist.id,0)" data-toggle="modal" data-target="#modal_waring">停用</a>
                                        <a v-if="trlist.status==0" @click="startParty(trlist.id,1)" data-toggle="modal" data-target="#modal_waring">启用</a>
                                    </td>
                                    <td>{{trlist.openTime | datetime}}</td>
                                    <td>{{trlist.contactName}}</td>
                                    <td>{{trlist.contactNumber}} </td>
                                    <td>{{trlist.staffName}} </td>
                                </tr>
                                <tr role="row">
                                    <td></td>
                                    <td>合计：</td>
                                    <td></td>
                                    <td></td>
                                    <td>{{total/100 | currency ''}}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
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

                <validator name="vali">
                    <form novalidate>
                <div data-backdrop="static"  id="modal_submit" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">回款充值</h5>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label class="control-label">名称：{{redata.name}}</label>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">余  额：{{redata.balanceAmount/100 | currency ''}}</label>
                                </div>
                                <div class="form-group">
                                    <label class="control-label"><i>*</i>金额：</label>
                                    <input type="text" v-validate:val1="['required']" class="form-control" v-model="redata.money" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')">
                                </div>
                                <div class="form-group">
                                    <label style="position: relative;top: -95px;" class="control-label"><i>*</i>备注：</label>
                                    <textarea rows="5" cols="5" class="form-control" v-model="redata.remarks" v-validate:val2="['required']"></textarea>
                                </div>
                                <div class="form-group tc">
                                    <button  type="button" @click="rechargeTrue" class="btn btn-primary">确认回款</button>
                                </div>
                                <div class="form-group tc">
                                    <span v-show="$vali.invalid&&saveerror" class="validation-error-label">
                                        您的信息未填写完整
                                    </span>
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
                                <h5 v-if="isEnable==1" class="modal-title">你确定启用该账户？</h5>
                                <h5 v-if="isEnable==0" class="modal-title">你确定停用该账户？</h5>
                            </div>
                            <div class="modal-body">
                                <div class="form-group tc">
                                    <button type="button" @click="change_status" class="btn btn-primary">确认</button>
                                    <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--添加商户dialog-->
                <div data-backdrop="static"  id="modal_add" class="modal fade" style="display: none;">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">添加账户</h5>
                            </div>
                            <div class="modal-body">
                                <div class="addtop">
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="shdata.subCompanyID" @change="getshCity(shdata.subCompanyID)">
                                            <option value="">全部分公司</option>
                                            <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="shdata.cityID">
                                            <option value="">全部城市</option>
                                            <option v-for="(index,n) in shcity" v-text="n.name" :value="n.cityID"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <select class="form-control" v-model="shdata.type">
                                            <option value="">请选择类型</option>
                                            <option value="1">银行</option>
                                            <option value="2">运营商</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" v-model="shdata.name" placeholder="名称">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="button" class="btn btn-info" @click="searchDigest" value="查询">
                                    </div>
                                </div>
                                <div class="addbottom">
                                    <div style="text-indent: 68%">已选择：</div>
                                    <div class="col-md-7">
                                        <table v-if="xhlist.length>0" class="table datatable-selection-single dataTable no-footer">
                                            <thead>
                                            <tr role="row">
                                                <th><label><input @click="allCkb($event)" type="checkbox">全选</label></th>
                                                <th>分公司</th>
                                                <th>城市</th>
                                                <th>商户名</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr role="row" v-for="n in xhlist">
                                                <td>
                                                    <label>
                                                        <input :value="n.id"
                                                               type="checkbox"
                                                               :name="n.name"
                                                               :subCompanyID="n.subCompanyOperationID"
                                                               :cityID="n.cityID"
                                                               :_type="n.type"
                                                        >{{$index+1}}
                                                    </label>
                                                </td>
                                                <td>{{n.subCompanyName}}</td>
                                                <td>{{n.cityName}}</td>
                                                <td>{{n.name}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <span v-if="!xhlist.length>0&&firstAdd">
                                            无可添加数据
                                        </span>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="button" class="btn btn-info" @click="addTrue($event)" value="添加">
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
    .addtop,  .addbottom{
        overflow: hidden;
    .form-control{
        padding: 7px;
    }
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
    table tr{
    td,th{
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    span{
        cursor: pointer;
        color: #3c8dbc;
    &:hover{
         opacity: 80;
     }
    }
    }
    input[type="checkbox"]{
        position: relative;
        top: 2px;
        left: -2px;
    }
    }
    .addbottom table tr td,  .addbottom table tr th{
        padding: 2px;
    }
    #modal_submit{
        label i{
            color: red;
        }
        .form-control{
            width: 80%;
            display: inline-block;
        }
    }
    .pull-left label i{
        color:red;
    }
    .pull-left{
        .validation-error-label{
            line-height: 20px;
            padding-left: 18px;
            margin-top: 10px;
        }
    }
    .validation-error-label{
        display: inline;
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/SFGL/thirdlist_model'
    export default{
        data(){
            this.model =model(this)
            return{
                pagecur:1,
                page_size:10,
                pageall:1,
                city:[],
                shcity:[],
                companylists:[],
                defaultData:{
                    'operationID': '',
                    'accountName': '',
                    'subCompanyID': '',
                    'cityID': '',
                    'status': '',
                    'pageIndex': 1,
                    'pageSize': 10
                },
                shdata:{
                    'subCompanyID':'',
                    'cityID':'',
                    'type':'',
                    'name':''
                },
                zdlists:[],
                xhlist:[],
                addId:[],
                id:'',
                isEnable: 0,
                redata:{
                    id:'',
                    money:'',
                    remarks:'',
                    name:'',
                    balanceAmount:''
                },
                saveerror:false,
                firstAdd:false,
                total:0
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.thirdParty_list(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                            (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                        });
                this.model.gettotal(this.defaultData)
                        .then((response)=>{
                            (response.data.code==0)?this.$set('total',response.data.data):null;
                        })
            },
            getClist(){
                // *** 请求公司数据
                let data={
                    'type':'ImportUser'
                }
                this.$common_model.getcompany(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('companylists', response.data.data) : null;
                        });
            },
            //获取城市数据
            getCity(_id){
                this.defaultData.cityID='';
                let data={
                    'subCompanyID':_id
                }
                this.$common_model.getcity(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('city', response.data.data) : null;
                        });
            },
            //获取城市数据
            getshCity(_id){
                this.shdata.cityID='';
                let data={
                    'subCompanyID':_id
                }
                this.$common_model.getcity(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('shcity', response.data.data) : null;
                        });
            },
            initList(){
                $('.modal').modal('hide');
                this.getZlists(this.defaultData);
            },
            clearUl(){
                this.xhlist=[];
                $('.col-md-7 tr input[type="checkbox"]').prop('checked',false);
                $('.addbottom .col-md-4').children('ul').html('');
            },
            addUser(){
                this.shdata={
                    'subCompanyID':'',
                    'cityID':'',
                    'type':'',
                    'name':'',
                };
                this.getshCity();
                this.clearUl();
                this.firstAdd=false;
                $('#modal_add').modal('show');
            },
            searchDigest(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.clearUl();
                this.firstAdd=true;
                this.model.thirdParty_accountlist(this.shdata)
                        .then((response)=>{
                            (response.data.code==0) ? this.$set('xhlist', response.data.data) : null;
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
                let subCompanyID=_this.attr('subCompanyID');
                let cityID=_this.attr('cityID');
                let type=_this.attr('_type');
                _ul.append('<li value="'+a+'"subCompanyId="'+subCompanyID+'" cityID="'+cityID+'" type="'+type+'">'+_tr.children('td:last').html()+'</li>');
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
                if(sessionStorage.getItem('isHttpin')==1)return;
                let _li=$(e.target).parent('.col-md-1').next('.col-md-4').children('ul').children('li');
                if(!_li.length>0)return;
                var data=[];
                _li.each(function(index){
                    let _this=$(this);
                    let operationID=_this.attr('value');
                    let subCompanyID=_this.attr('subCompanyID');
                    let cityID=_this.attr('cityID');
                    let type=_this.attr('type');
                    data.push(
                    {
                        operationID:operationID,
                        name:_this.html(),
                        subCompanyID:subCompanyID,
                        cityID:cityID,
                        type:type
                    })
                })
                this.model.thirdParty_save(JSON.stringify(data))
                        .then((response)=>{
                            if(response.data.code == 0){
                                this.initList();
                                dialogs('success','已添加！');
                            }
                        })
            },
            delstore(_id){
                this.id=_id;
            },
            del_true(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.delstore(this.id)
                        .then((res)=> {
                            if(res.data.code==0){
                                dialogs('success','已删除');
                                this.initList();
                            }
                        })
            },
            startParty(_id, status){
                this._id = _id;
                this.isEnable = status;
            },
            change_status(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                let data = {
                    'id': this._id,
                    'status': this.isEnable
                }
                this.model.thirdParty_status(data)
                        .then((res) => {
                                if(res.data.code == 0&&this.isEnable==1){
                                    this.initList()
                                    dialogs('success','已启用！')
                                }else if(res.data.code == 0&&this.isEnable==0){
                                    this.initList()
                                    dialogs('success','已停用！')
                                }
                        })
            },
            recharge(_id,_name,_money){
                this.saveerror=false;
                this.redata={
                    id:_id,
                    money:'',
                    remarks:'',
                    name:_name,
                    balanceAmount:_money
                }
            },
            rechargeTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.saveerror=true;
                if(this.$vali.invalid || this.redata.money==0)return;
                let data={
                    id:this.redata.id,
                    money:this.redata.money *100,
                    remarks:this.redata.remarks
                }
                this.model.thirdParty_recharge(data)
                        .then((res) => {
                                if(res.data.code == 0){
                                    this.initList()
                                    dialogs('success','已充值！')
                                }
                        })
            }
        },
        ready() {
            var vm=this;
            vm.initList();
            vm.getClist();
            vm.getCity();
            $(document).on('click','.addbottom .col-md-4 ul li',function(){
                $(this).toggleClass('check-li');
                ($(this).hasClass('check-li'))?$(this).css('background','#ccc'):$(this).css('background','none');
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
        }
    }
</script>