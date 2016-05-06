<template>
    <index :title="'额度采购'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <input type="button" class="btn btn-info" @click="addUser" value="添加">
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control" v-model="defaultData.merchantId" placeholder="商户ID">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.merchantName" placeholder="商户名">
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.companyId">
                                <option value="">请选择分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.cityId">
                                <option value="">请选择城市</option>
                                <option v-for="(index,n) in city" v-text="n.name" :value="n.cityId"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.isAutoPay">
                                <option value="">自动划付状态</option>
                                <option value="1">开启</option>
                                <option value="0">关闭</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.status">
                                <option value="">账户状态</option>
                                <option value="1">正常</option>
                                <option value="0">停用</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control" v-model="defaultData.startValue" placeholder="循环次数">
                            -
                            <input type="number" class="form-control" v-model="defaultData.endValue" placeholder="循环次数">
                        </div>
                        <div class="form-group">
                            <input type="button" class="btn btn-info" @click="initList" value="查询">
                        </div>
                    </form>
                </div>
                <div v-if="zdlists.length>0" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                                <tr role="row">
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>分公司</th>
                                    <th>城市</th>
                                    <th>总额度</th>
                                    <th>总本金</th>
                                    <th>使用额度</th>
                                    <th>使用比(%) </th>
                                    <th>剩余额度</th>
                                    <th>循环次数</th>
                                    <th>首次充值时间</th>
                                    <th>抵扣方式</th>
                                    <th>自动划付</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                    <th>消化商户 </th>
                                    <th>联系人</th>
                                    <th>电话</th>
                                    <th>客情人员</th>
                                </tr>
                            </thead>
                        <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists">
                                <td>{{trlist.operationId}}</td>
                                <td>{{trlist.name}}</td>
                                <td>{{trlist.company}}</td>
                                <td>{{trlist.city}}</td>
                                <td>{{trlist.totalLimit/100 | currency ''}}</td>
                                <td>{{trlist.totalPrincipal/100 | currency '' }} </td>
                                <td>{{trlist.usedLimit/100 | currency '' }} </td>
                                <td>{{trlist.usedPercent}}</td>
                                <td>{{trlist.balanceLimit/100 | currency ''}}</td>
                                <td>{{trlist.loopNumber}}</td>
                                <td>{{trlist.firstTime | datetime}}</td>
                                <td>
                                    <template v-if="trlist.discountType==1">全单</template>
                                    <template v-else>可打折</template>
                                </td>
                                <td>
                                    <template v-if="trlist.isAutoPay==0">关闭</template>
                                    <template v-else>开启</template>
                                </td>
                                <td>
                                    <template v-if="trlist.status==0">停用</template>
                                    <template v-else>正常</template>
                                </td>
                                <td>
                                    <a href="javascript:void(0)" @click="updateNew(trlist)">编辑</a>
                                    <a v-link="{'name':'limitaccount-info',params:{merchantID:trlist.limitPurchaseMerchantId}}">明细</a>
                                    <template v-if="trlist.status==0"><a data-toggle="modal" data-target="#modal_waring" @click="changeDiscount(trlist.id,1)" href="javascript:void(0)">启用</a></template>
                                    <template v-else><a data-toggle="modal" data-target="#modal_waring" @click="changeDiscount(trlist.id,0)" href="javascript:void(0)">停用</a></template>
                                    <a href="javascript:void(0)" v-link="{'name':'limitaccount-management',params:{merchantID:trlist.limitPurchaseMerchantId}}">账户</a>
                                </td>
                                <td><a @click="seexh(trlist.id,true)" href="javascript:void(0)">查看</a></td>
                                <td>{{trlist.contactsPerson}}</td>
                                <td>{{trlist.contactsPhone}}</td>
                                <td>{{trlist.servicePerson}}</td>
                            </tr>
                             <tr>
                                 <td></td>
                                 <td></td>
                                 <td>合计</td>
                                 <td></td>
                                 <td>{{nums.totalLimit}}</td>
                                 <td>{{nums.totalPrincipal}}</td>
                                 <td>{{nums.usedLimit}}</td>
                                 <td></td>
                                 <td>{{nums.balanceLimit}}</td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
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
                    未找到您要查询的账户
                </div>

                <!--编辑账户dialog-->
                <div data-backdrop="static"  id="modal_update" class="modal fade" style="display: none;">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">编辑账户</h5>
                            </div>
                            <div class="modal-body">
                                <div class="modal-body member_rules_modal-body">
                                    <div class="form-group">
                                        <div class="pull-left">
                                            <label class="w28" ><i>*</i>抵扣方式：</label>
                                        </div>
                                        <div class="col-md-3">
                                            <select class="form-control" v-model="updateList.discountType">
                                                <option value="1">全单</option>
                                                <option value="2">可打折</option>
                                            </select>
                                        </div>
                                        <div class="pull-left">
                                            <label class="w28" ><i>*</i>自动划付：</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="radio" id="one" value="1" v-model="updateList.isAutoPay">
                                            <label class="w28" for="one">开启</label>
                                            <input type="radio" id="two" value="0" v-model="updateList.isAutoPay">
                                            <label class="w28" for="two">关闭</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="pull-left">
                                            <label class="w28" ><i>*</i>单笔采购额度：</label>
                                        </div>
                                        <div class="col-md-3">
                                             <input class="form-control" type="text" :value="updateList.singlePurchaseLimit">
                                        </div>
                                        <div class="col-md-1">
                                            元
                                        </div>
                                        <div class="pull-left">
                                            <label class="w28" ><i>*</i>单笔采购本金：</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input class="form-control" type="text" :value="updateList.singlePurchasePrincipal">
                                        </div>
                                        <div class="pull-left">
                                            元
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <button type="button" data-dismiss="modal" @click="addUser2" class="btn">添加消化账户</button>
                                    </div>
                                    <table class="table" style="border: 1px solid #ccc;">
                                        <thead>
                                        <tr role="row">
                                            <th>商户ID</th>
                                            <th>分公司</th>
                                            <th>城市</th>
                                            <th>商户名</th>
                                            <th>操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-if="seexhList.length>0" v-for="n in seexhList" role="row">
                                            <td class="merchantIds">{{n.merchantId}}</td>
                                            <td>{{n.companyName}}</td>
                                            <td>{{n.cityName}}</td>
                                            <td>{{n.merchantName}}</td>
                                            <th><a href="javascript:void(0)" @click="delxh(2,$event)">删除</a></th>
                                        </tr>
                                        <tr v-else>
                                            <td colspan="5" valign="center">该账户没有消化商户</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div class="form-group" style="padding-top: 25px;">
                                        <div class="pull-left">
                                            <label class="w28" ><i>*</i>上传凭证：</label>
                                        </div>
                                        <div class="pull-left">
                                            <input type="file" @change="upload($event)">
                                        </div>
                                        <div class="pull-left">
                                            <label for="tarea" class="w28"><i>*</i>备注：</label>
                                        </div>
                                        <div class="col-md-3">
                                            <textarea class="form-control" width="70%" v-model="updateList.remarks" value=""></textarea>
                                        </div>
                                        <div class="col-md-3">
                                            <button type="button" @click="submitUpdate" class="btn btn-primary">保存</button>
                                        </div>
                                    </div>
                                    <div>历史记录：</div>
                                    <div style="height:200px;overflow: auto;border: 1px solid #ccc;">
                                         <table class="table">
                                        <thead>
                                        <tr role="row">
                                            <th>ID</th>
                                            <th>账户信息</th>
                                            <th>消化商户</th>
                                            <th>更新时间</th>
                                            <th>更新人</th>
                                            <th>变更凭证</th>
                                            <th>更新备注</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-if="historyList.length>1" role="row" v-for="n in historyList">
                                            <template v-if="$index!=0">
                                                <td>{{$index}}</td>
                                                <td>
                                                    <p>抵扣方式：
                                                        <template v-if="n.discountType==1">全单</template>
                                                        <template v-else>可打折</template>
                                                    </p>
                                                    <p>自动划付：
                                                        <template v-if="n.isAutoPay==0">关闭</template>
                                                        <template v-else>开启</template>
                                                    </p>
                                                    <p>单笔采购额度：{{n.singlePurchaseLimit}}元</p>
                                                    <p>单笔采购额度：{{n.singlePurchasePrincipal}}元</p>
                                                </td>
                                                <td><a href="javascript:void(0)" @click="seexh(n.id,true)">查看</a></td>
                                                <td>{{n.updateAt | datetime}}</td>
                                                <td>{{n.updateAt}}</td>
                                                <td><a href="{{n.certificates}}">下载</a></td>
                                                <td>{{n.remarks}}</td>
                                            </template>
                                        </tr>
                                        <tr v-if="historyList.length<1">
                                            <td colspan="7" valign="center">无历史记录</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
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
                                <h5 class="modal-title" v-text="addTitle"></h5>
                            </div>
                            <div class="modal-body">
                                <div class="addtop">
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="shdata.companyId">
                                            <option value="">请选择分公司</option>
                                            <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="shdata.cityId">
                                            <option value="">请选择城市</option>
                                            <option v-for="(index,n) in city" v-text="n.name" :value="n.cityId"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" v-model="shdata.merchantOperationID" placeholder="商户ID">
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
                                        <span v-else>
                                            无可添加数据
                                        </span>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="button" class="btn btn-info" @click="addTrue($event)" value="添加">
                                        <input type="button" class="btn btn-info" @click="delTrue($event)" value="删除">
                                        <input v-if="addTitle=='添加商户'" type="button" class="btn btn-info" @click="submitTrue($event)" value="确认">
                                        <input v-else type="button" class="btn btn-info" @click="submitTrue2($event)" value="确认">
                                    </div>
                                    <div class="col-md-4">
                                        <ul></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                    <button v-if="isEnable==1" type="button" @click="changeTrue" class="btn btn-primary">确认</button>
                                    <button v-if="isEnable==0" type="button" @click="changeTrue" class="btn btn-primary">确认</button>
                                    <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--查看账户dialog-->
                <div data-backdrop="static"  id="modal_see" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">查看消化商户</h5>
                            </div>
                            <div class="modal-body">
                                <div class="addbottom">
                                    <div class="col-md-12">
                                        <table v-if="seexhList.length>0" class="table" style="border: 1px solid #ccc;">
                                            <thead>
                                            <tr role="row">
                                                <th>商户ID</th>
                                                <th>分公司</th>
                                                <th>城市</th>
                                                <th>商户名</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="n in seexhList" role="row">
                                                <td>{{n.merchantId}}</td>
                                                <td>{{n.companyName}}</td>
                                                <td>{{n.cityName}}</td>
                                                <td>{{n.merchantName}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <span v-else>
                                            该账户没有消化商户
                                        </span>
                                    </div>
                                    <div v-if="!isTrue" class="tc" style="float: left;width: 100%;margin-top: 20px;">
                                        <input type="button" class="btn btn-gray" data-dismiss="modal" value="关闭">
                                        <input type="button" class="btn btn-gray" data-dismiss="modal" data-toggle="modal" data-target="#modal_update" value="调整消化商户">
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
              adding: 7px;
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
            input{
                margin:15px 0;
            }
        }
        ul{
            list-style: none;
            border: 1px solid #ccc;
            padding:10px;
            height: 300px;
            overflow: auto;
            li{
                margin:5px 0;
                cursor: pointer;
                padding-left:3px;
            }
            li.check-li{
                background: #ccc;
            }
        }
    }
    table tr{
        td,th{
            padding: 20px 2px;
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
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import dialog from '../components/dialog.vue'
    export default{
        data(){
            return{
                pagecur:1,
                page_size:15,
                pageall:1,
                loginList:{},
                defaultData:{
                    'merchantId': '',
                    'merchantName': '',
                    'companyId': '',
                    'cityId': '',
                    'isAutoPay': '',
                    'status': '',
                    'startValue': '',
                    'endValue': '',
                    'pageIndex': 1,
                    'pageSize': 15
                },
                shdata:{
                    'companyId':'',
                    'cityId':'',
                    'merchantOperationID':'',
                    'merchantName':'',
                    'isLimitPurchase':0,
                    'isDigest':0,
                },
                isEnable:0,
                zdlists:[],
                companylists:[],
                seexhlist:[],
                addTitle:'',
                addId:[],
                city:[],
                isTrue:false,
                seexhList:[
                    {
                        'merchantId':'',
                        'merchantName': '',
                        'companyName': '',
                        'cityName': '',
                        'beginTime': ''
                    }
                ],
                xhlist:[
                    {
                        subCompanyName:'',
                        cityName:'',
                        merchantName:'',
                        merchantID:''
                    }
                ],
                updateList:{
                },
                historyList:[],
                accountId:'',
                nums:{
                    totalLimit:0,
                    totalPrincipal:0,
                    usedLimit:0,
                    balanceLimit:0
                }
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(data){
                if(data.endValue<data.startValue){
                    let a=data.endValue,b=data.startValue;
                    this.defaultData.startValue=a;
                    this.defaultData.endValue=b;
                    data.startValue=a;
                    data.endValue=b;
                }
                    this.$http.post('./limitPurchaseMerchant/list',data)
                            .then(function (response) {
                                // *** 判断请求是否成功如若成功则填充数据到模型
                                (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                                (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                            }, function (response) {
                                console.log(response);
                            });
            },
            getClist(){
                // *** 请求公司数据
                this.$http.post('./subcompany/list',{})
                        .then(function (response) {
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('companylists', response.data.data) : null;
                        }, function (response) {
                            console.log(response);
                        });
            },
            //获取城市数据
            getCity:function(data){
                this.$http.post('./city/list',data)
                        .then(function (response) {
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('city', response.data.data) : null;
                        }, function (response) {
                            console.log(response);
                        });
            },
            initList(){
                $('.modal').modal('hide');
                this.getZlists(this.defaultData);
            },
            updateNew(_list){
                this.accountId=_list.id;
                this.seexh(this.accountId,false);
                this.$http.post('./limitPurchaseMerchant/history/'+_list.merchantId)
                        .then((response)=>{
                                (response.data.code==0) ? this.$set('updateList', response.data.data[0]) : null;
                                (response.data.code==0) ? this.$set('historyList', response.data.data) : null;
                                $('#modal_update').modal('show');
                        })

            },
            delxh(_isenb,e){
                this.isEnable=_isenb;
                $(e.target).closest('tr').hide().find('.merchantIds').removeClass('merchantIds');
            },
            submitUpdate(){
                let datas = Array.from($(".merchantIds"), i => parseInt(i.innerHTML));
                this.updateList.digestMerchants=datas;
                this.$http.post('./ limitPurchaseMerchant/editDigest',this.updateList)
                        .then((response)=>{
                                this.initList();
                        })
            },
            changeDiscount(_id,_isenb){
                this.accountId=_id;
                this.isEnable=_isenb;
            },
            changeTrue(){
                let data={
                    'id': this.accountId,
                    'isEnable': this.isEnable
                }
                this.$http.post('./limitPurchaseMerchant/change',data)
                        .then((response)=>{
                                this.initList();
                        })
            },
            seexh(_id,isTrue){
                this.accountId=_id;
                this.isTrue=isTrue;
                this.$http.get('./limitPurchaseMerchant/viewDigest/'+this.accountId)
                        .then((response)=>{
                                (response.data.code==0) ? this.$set('seexhList', response.data.data) : null;
                                if(isTrue){$('#modal_see').modal('show');}
                        })
            },
            searchDigest(){
                $('.col-md-7 tr input[type="checkbox"]').prop('checked',false);
                $('.addbottom .col-md-4').children('ul').html('');
                this.$http.post('./merchant/list',this.shdata)
                        .then((response)=>{
                                (response.data.code==0) ? this.$set('xhlist', response.data.data) : null;
                                $('#modal_add').modal('show');
                            }
                        )
            },
            addUser(){
                this.addTitle='添加商户';
                this.shdata={
                    'companyId':'',
                    'cityId':'',
                    'merchantOperationID':'',
                    'merchantName':'',
                    'isLimitPurchase':0,
                    'isDigest':null,
                };
                this.searchDigest();
            },
            addUser2(){
                this.addTitle='添加消化商户';
                $('.col-md-7 tr input[type="checkbox"]').prop('checked',false);
                $('.addbottom .col-md-4').children('ul').html('');
                this.shdata={
                    'companyId':'',
                    'cityId':'',
                    'merchantOperationID':'',
                    'merchantName':'',
                    'isLimitPurchase':null,
                    'isDigest':0,
                };
                this.searchDigest();
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
                let _ul=$(e.target).parent('.col-md-1').next('.col-md-4').children('ul'),
                    _li= _ul.find('.check-li');
                let data={'merchantIds':Array.from($(".col-md-7 td input[type='checkbox']:checked"), i => parseInt(i.value))}
                this.$http.post('./limitPurchaseMerchant/add',data)
                        .then((response)=>{
                            this.initList();
                        })
            },
            submitTrue2(e){
                let _ul=$(e.target).parent('.col-md-1').next('.col-md-4').children('ul'),
                        _li= _ul.find('.check-li');
                let data={'id': this.accountId,'digestMerchants':Array.from($(".col-md-7 td input[type='checkbox']:checked"), i => parseInt(i.value))}
                this.$http.post('./limitPurchaseMerchant/addDigest',data)
                        .then((response)=>{
                            this.initList();
                })
            },
            upload(e){
                console.log(e.target);
                let files=e.target.files[0];
                let vm=this;
                var reader = new FileReader();
                reader.readAsDataURL(files);
                reader.onload = function(e){
                    let datas={
                        name:files.name,
                        data:this.result
                    }
                    vm.$http.post('./file/upload',datas)
                            .then((response)=>{
                            })
                }
            }
        },
        ready() {
            var vm=this;
            (!!sessionStorage.getItem('userData')) ? vm.$set('loginList',JSON.parse(sessionStorage.getItem('userData'))) : null;
            vm.initList();
            vm.getClist();
            vm.getCity();
            $('#modal_add,#modal_see').on('hidden.bs.modal',function(){
                if(!$('#modal_update').is(':hidden')){
                    $('#app').addClass('modal-open');
                }
            })
            $('#modal_update,#modal_add,#modal_waring,#modal_see').on('hidden.bs.modal', function () {
                $('body').css('padding-right',0);
            })
            $(document).on('click','.addbottom .col-md-4 ul li',function(){
                $(this).toggleClass('check-li');
            })
        },
        components:{
            'datepicker': datepicker,
            'dialog': dialog,
        },
        watch:{
            zdlists(){
                var a=0,b=0,c=0,d=0;
                this.zdlists.forEach(function(e){
                    a+=e.totalLimit;
                    b+=e.totalPrincipal;
                    c+=e.usedLimit;
                    d+=e.balanceLimit;
                });
                this.nums.totalLimit=(a/100).toFixed(2);
                this.nums.totalPrincipal=(b/100).toFixed(2);
                this.nums.usedLimit=(c/100).toFixed(2);
                this.nums.balanceLimit=(d/100).toFixed(2);
            },
            pagecur:function(){
                this.defaultData.pageIndex=this.pagecur;
                this.initList();
            },
            page_size:function(){
                this.defaultData.pageSize=this.page_size;
                this.initList();
            }
        }
    }
</script>