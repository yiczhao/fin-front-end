<template>
    <index :title="'门店管理'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :p2title="'预付款商户'"
           :h2name="'prepayment-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <a class="btn btn-info" @click="addUser">添加</a>
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control" v-model="defaultData.merchantOperationID" placeholder="商户ID"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.merchantName" placeholder="商户名">
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" @click="initList">查询</a>
                        </div>
                    </form>
                </div>
                <div style="margin-bottom: 20px;padding-left: 20px;font-size: 16px;">
                    <span>预付款账户名：{{merchantName}}</span>
                </div>
                <div v-if="zdlists.length>0" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                                <tr role="row">
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>操作</th>
                                    <th>更新时间 </th>
                                    <th>联系人</th>
                                    <th>电话</th>
                                    <th>更新人员</th>
                                </tr>
                            </thead>
                        <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists">
                                <td>{{trlist.merchantOperationID}}</td>
                                <td>{{trlist.merchantName}}</td>
                                <td><a @click="delstore(trlist.id)" data-toggle="modal" data-target="#modal_waring">删除</a></td>
                                <td>{{trlist.updateAt | datetime}}</td>
                                <td>{{trlist.connectionPerson}}</td>
                                <td>{{trlist.connectionPhone}} </td>
                                <td>{{trlist.updateBy}} </td>
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

                <div id="modal_waring" data-backdrop="static" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">你确定删除该商户？</h5>
                            </div>
                            <div class="modal-body">
                                <div class="form-group tc">
                                    <button type="button" @click="del_true" class="btn btn-primary">确认</button>
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
                                <h5 class="modal-title">添加商户</h5>
                            </div>
                            <div class="modal-body">
                                <div class="addtop">
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="shdata.companyId" @change="getCity(shdata.companyId)">
                                            <option value="">全部分公司</option>
                                            <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="shdata.cityId">
                                            <option value="">全部城市</option>
                                            <option v-for="(index,n) in city" v-text="n.name" :value="n.cityID"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" v-model="shdata.merchantOperationID" placeholder="商户ID"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" v-model="shdata.merchantName" placeholder="商户名">
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
                                                        <input :value="n.merchantID" type="checkbox">{{$index+1}}
                                                    </label>
                                                </td>
                                                <td>{{n.subCompanyName}}</td>
                                                <td>{{n.cityName}}</td>
                                                <td>{{n.merchantName}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <span v-if="firstAdd && !xhlist.length>0">
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
    #modal_update{
        table tr td{
            padding: 10px 2px;
        }
        .form-group{
            overflow: hidden;
            line-height: 36px;
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
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/BusinessManagement/store_model'
    export default{
        data(){
            this.model =model(this)
            return{
                pagecur:1,
                page_size:10,
                pageall:1,
                merchantName:'',
                city:[],
                companylists:[],
                defaultData:{
                    'id': '',
                    'merchantOperationID': '',
                    'merchantName': '',
                    'pageIndex': 1,
                    'pageSize': 10
                },
                shdata:{
                    'companyId':'',
                    'cityId':'',
                    'merchantOperationID':'',
                    'merchantName':'',
                    'isAdvancePayment':'0',
                    'isStore':'0'
                },
                zdlists:[],
                xhlist:[],
                addId:[],
                id:'',
                firstAdd:false
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                    this.model.prepayment_store(data)
                            .then((response)=>{
                                // *** 判断请求是否成功如若成功则填充数据到模型
                                (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                                (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                            });
            },
            getClist(){
                // *** 请求公司数据
                this.$common_model.getcompany()
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('companylists', response.data.data) : null;
                        });
            },
            //获取城市数据
            getCity(_id){
                this.shdata.cityId='';
                let data={
                    'subCompanyID':_id
                }
                this.$common_model.getcity(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('city', response.data.data) : null;
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
                    'companyId':'',
                    'cityId':'',
                    'merchantOperationID':'',
                    'merchantName':'',
                    'isAdvancePayment':'0',
                    'isStore':'0'
                };
                this.clearUl();
                this.getCity();
                this.firstAdd=false;
                $('#modal_add').modal('show');
            },
            searchDigest(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.clearUl();
                this.firstAdd=true;
                this.$common_model.getmerchant_list(this.shdata)
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
                let _tr=$("input[value='" + a + "']").closest('tr');
                let _ul=$('.addbottom .col-md-4').children('ul');
                _ul.append('<li value="'+a+'">'+_tr.children('td:last').html()+'</li>');
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
                let data={'id':this.defaultData.id,'merchantIDs':Array.from(_li, i => i.getAttribute('value'))}
                this.model.store_add(data)
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
            }
        },
        ready() {
            var vm=this;
            (vm.$route.params.id!=':id')?vm.defaultData.id=vm.$route.params.id:null;
            (vm.$route.params.storeMerchantName!=':storeMerchantName')?vm.merchantName=vm.$route.params.storeMerchantName:null;
            vm.initList();
            vm.getClist();
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