<template>
    <index :title="'商户列表'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :isshow="'isshow'">
        <div class="content blists" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <input type="button" data-toggle="modal" data-target="#modal_add"  class="btn btn-info" @click="addUser" value="添加">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.id" placeholder="商户ID">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.accountName" placeholder="商户名">
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.companyId">
                                <option value="">请选择分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.city">
                                <option value="">请选择城市</option>
                                <option v-for="(index,n) in city" v-text="n.cityName" :value="n.cityId"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.city">
                                <option value="">自动划付状态</option>
                                <option value="0">开启</option>
                                <option value="1">关闭</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.city">
                                <option value="">账户状态</option>
                                <option value="0">正常</option>
                                <option value="1">停用</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.startNum" placeholder="循环次数">
                            -
                            <input type="text" class="form-control" v-model="defaultData.endNum" placeholder="循环次数">
                        </div>
                        <div class="form-group">
                            <input type="button" class="btn btn-info" @click="checkNew" value="查询">
                        </div>
                    </form>
                </div>
                <div v-if="!zdlists.length" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
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
                            <tr role="row">
                                <td>2587</td>
                                <td>南昌玩聚和他(她)朋友</td>
                                <td>南昌卡说</td>
                                <td>南昌</td>
                                <td>{{ 38122121/100 | currency '' }}</td>
                                <td>{{ 38122121/100 | currency '' }}</td>
                                <td>{{ 38122/100 | currency '' }}</td>
                                <td>22%</td>
                                <td>{{ 646546/100 | currency '' }}</td>
                                <td>66</td>
                                <td>2015-06-15 16:34:47</td>
                                <td>{{ 300/100 | currency '' }}</td>
                                <td>全单</td>
                                <td>开启</td>
                                <td>正常</td>
                                <td>
                                    <a data-toggle="modal" data-target="#modal_update" href="javascript:void(0)" @click="setAcc()">编辑</a>
                                    <a href="javascript:void(0)" @click="setAcc()">明细</a>
                                    <a href="javascript:void(0)" @click="setAcc()">停用</a>
                                </td>
                                <td><a data-toggle="modal"  data-target="#modal_see" href="javascript:void(0)">查看</a></td>
                                <td>邹里堃</td>
                                <td>13079101524</td>
                            </tr>
                            <!--<tr role="row" v-for="(index,trlist) in zdlists">-->
                                <!--<td>{{trlist.companyName}}</td>-->
                                <!--<td>{{trlist.shortName}}</td>-->
                                <!--<td>{{trlist.accountName}}</td>-->
                                <!--<td>{{trlist.accountNumber}}</td>-->
                                <!--<td>{{trlist.bankName}}</td>-->
                                <!--<td></td>-->
                                <!--<td>{{trlist.startDate}}</td>-->
                                <!--<td><a v-link="{name:'provisions-info',params:{accountId:trlist.id}}">{{ trlist.balanceAmount/100 | currency '' }} </a></td>-->
                                <!--<td>{{trlist.companyName}}</td>-->
                                <!--<td>{{trlist.shortName}}</td>-->
                                <!--<td>{{trlist.accountName}}</td>-->
                                <!--<td>{{trlist.accountNumber}}</td>-->
                                <!--<td>{{trlist.bankName}}</td>-->
                                <!--<td></td>-->
                                <!--<td>{{trlist.startDate}}</td>-->
                                <!--<td></td>-->
                                <!--<td></td>-->
                            <!--</tr>-->
                             <tr>
                                 <td></td>
                                 <td></td>
                                 <td>合计</td>
                                 <td></td>
                                 <td>{{ 381/100 | currency '' }}</td>
                                 <td>{{ 38122121/100 | currency '' }}</td>
                                 <td>{{ 38122/100 | currency '' }}</td>
                                 <td></td>
                                 <td>{{ 3811/100 | currency '' }}</td>
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
                                        <label class="w28" ><i>*</i>抵扣方式：</label>
                                        <select class="form-control" v-model="defaultData.city">
                                            <option value="0">全单</option>
                                            <option value="1">可打折</option>
                                        </select>
                                        <label class="w28" ><i>*</i>自动划付：</label>
                                        <input type="radio" value="one" v-model="zdhf">
                                        <label class="w28" for="one">开启</label>
                                        <input type="radio" value="two" v-model="zdhf">
                                        <label class="w28" for="two">关闭</label>
                                    </div>
                                    <div class="form-group">
                                        <label class="w28" ><i>*</i>单笔采购额度：</label>
                                        <input class="form-control" type="text" placeholder="10000">元
                                        <label class="w28" ><i>*</i>单笔采购本金：</label>
                                        <input class="form-control" type="text" placeholder="10000">元
                                    </div>
                                    <div class="form-group">
                                        <button type="button" @click="personTrue(person.id)" class="btn">添加消化账户</button>
                                    </div>
                                    <table v-show="bthf" class="table datatable-selection-single dataTable no-footer" style="border: 1px solid #ccc;">
                                        <thead>
                                        <tr role="row">
                                            <th>商户ID</th>
                                            <th>商户名称</th>
                                            <th>分公司</th>
                                            <th>城市</th>
                                            <th>开始时间</th>
                                            <th>操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr role="row">
                                                <td>1</td>
                                                <td>昌玩聚和他(她)朋友们</td>
                                                <td>南昌卡说</td>
                                                <td>南昌</td>
                                                <td>2013-06-03 13:26:19</td>
                                                <td><a href="javascript:void(0)">删除</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div>
                                        <div class="form-group">
                                            <label class="w28"><i>*</i>上传凭证：</label>
                                            <input type="file">
                                            <label for="tarea" class="w28"><i>*</i>备注：</label>
                                            <textarea class="form-control" width="70%" cols="20" rows="3"></textarea>
                                            <button type="button" @click="personTrue(person.id)" class="btn btn-primary">保存</button>
                                        </div>
                                    </div>
                                    <div>历史记录：</div>
                                    <table class="table datatable-selection-single dataTable no-footer" style="border: 1px solid #ccc;">
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
                                        <tr role="row">
                                            <td>1</td>
                                            <td>
                                                <p>抵扣方式：全单</p>
                                                <p>自动划付：开启</p>
                                                <p>单笔采购额度：10,000.00元</p>
                                                <p>单笔采购额度：7,500.00元</p>
                                            </td>
                                            <td><a href="javascript:void(0)">查看</a></td>
                                            <td>2013-06-03 13:26:19</td>
                                            <td>贾燕</td>
                                            <td><a href="javascript:void(0)">下载</a></td>
                                            <td>总店额度采购</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                </div>
                </div>

                <!--添加账户dialog-->
                <div data-backdrop="static"  id="modal_add" class="modal fade" style="display: none;">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">划款账户</h5>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <span>商户id：4392</span>
                                    <span>商户名：南昌玩聚恒茂店</span>
                                </div>
                                <div>
                                    <div><span @click="bthfShow(0)">补贴划付</span><span @click="bthfShow(1)">额度采购</span></div>
                                    <div><span>账户名：魏璇</span><span>账  号：6214837910896095</span></div>
                                    <div><span>开户行：招商银行股份有限公司南昌营业部</span><span>提入行号：308421022022</span></div>
                                    <a data-toggle="modal"  data-target="#modal_updata" href="javascript:void(0);">更新</a>
                                </div>
                                <table v-show="bthf" class="table datatable-selection-single dataTable no-footer" style="border: 1px solid #ccc;">
                                    <thead>
                                    <tr role="row">
                                        <th>ID</th>
                                        <th>账户信息</th>
                                        <th>更新时间</th>
                                        <th>更新人</th>
                                        <th>变更凭证</th>
                                        <th>更新备注</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr role="row">
                                        <td>1</td>
                                        <td>昌玩聚和他(她)朋友们</td>
                                        <td>2013-06-03 13:26:19</td>
                                        <td>贾燕</td>
                                        <td><a href="javascript:void(0)">下载</a></td>
                                        <td>总店额度采购</td>
                                    </tr>
                                    <!--<tr role="row"  v-for="n in checkLists">-->
                                    <!--<td>{{n.certificate}}</td>-->
                                    <!--<td>{{n.collectionName}}</td>-->
                                    <!--<td>{{n.tradeTime || datetime}}</td>-->
                                    <!--<td>{{n.payoutAmount/100 | currency '' }}</td>-->
                                    <!--<td><a href="javascript:void(0)">下载</a></td>-->
                                    <!--<td>{{n.remarks}}</td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>
                                <table v-else class="table datatable-selection-single dataTable no-footer" style="border: 1px solid #ccc;">
                                    <thead>
                                    <tr role="row">
                                        <th>ID</th>
                                        <th>账户信息1</th>
                                        <th>更新时间1</th>
                                        <th>更新人1</th>
                                        <th>变更凭证1</th>
                                        <th>更新备注1</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr role="row">
                                        <td>1</td>
                                        <td>昌玩聚和他(她)朋友们</td>
                                        <td>2013-06-03 13:26:19</td>
                                        <td>贾燕</td>
                                        <td><a href="javascript:void(0)">下载</a></td>
                                        <td>总店额度采购</td>
                                    </tr>
                                    <!--<tr role="row"  v-for="n in checkLists">-->
                                    <!--<td>{{n.certificate}}</td>-->
                                    <!--<td>{{n.collectionName}}</td>-->
                                    <!--<td>{{n.tradeTime || datetime}}</td>-->
                                    <!--<td>{{n.payoutAmount/100 | currency '' }}</td>-->
                                    <!--<td><a href="javascript:void(0)">下载</a></td>-->
                                    <!--<td>{{n.remarks}}</td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!--查看账户dialog-->
                <div data-backdrop="static"  id="modal_see" class="modal fade" style="display: none;">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">划款账户</h5>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <span>商户id：4392</span>
                                    <span>商户名：南昌玩聚恒茂店</span>
                                </div>
                                <div>
                                    <div><span @click="bthfShow(0)">补贴划付</span><span @click="bthfShow(1)">额度采购</span></div>
                                    <div><span>账户名：魏璇</span><span>账  号：6214837910896095</span></div>
                                    <div><span>开户行：招商银行股份有限公司南昌营业部</span><span>提入行号：308421022022</span></div>
                                    <a data-toggle="modal"  data-target="#modal_updata" href="javascript:void(0);">更新</a>
                                </div>
                                <table v-show="bthf" class="table datatable-selection-single dataTable no-footer" style="border: 1px solid #ccc;">
                                    <thead>
                                    <tr role="row">
                                        <th>ID</th>
                                        <th>账户信息</th>
                                        <th>更新时间</th>
                                        <th>更新人</th>
                                        <th>变更凭证</th>
                                        <th>更新备注</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr role="row">
                                        <td>1</td>
                                        <td>昌玩聚和他(她)朋友们</td>
                                        <td>2013-06-03 13:26:19</td>
                                        <td>贾燕</td>
                                        <td><a href="javascript:void(0)">下载</a></td>
                                        <td>总店额度采购</td>
                                    </tr>
                                    <!--<tr role="row"  v-for="n in checkLists">-->
                                    <!--<td>{{n.certificate}}</td>-->
                                    <!--<td>{{n.collectionName}}</td>-->
                                    <!--<td>{{n.tradeTime || datetime}}</td>-->
                                    <!--<td>{{n.payoutAmount/100 | currency '' }}</td>-->
                                    <!--<td><a href="javascript:void(0)">下载</a></td>-->
                                    <!--<td>{{n.remarks}}</td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>
                                <table v-else class="table datatable-selection-single dataTable no-footer" style="border: 1px solid #ccc;">
                                    <thead>
                                    <tr role="row">
                                        <th>ID</th>
                                        <th>账户信息1</th>
                                        <th>更新时间1</th>
                                        <th>更新人1</th>
                                        <th>变更凭证1</th>
                                        <th>更新备注1</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr role="row">
                                        <td>1</td>
                                        <td>昌玩聚和他(她)朋友们</td>
                                        <td>2013-06-03 13:26:19</td>
                                        <td>贾燕</td>
                                        <td><a href="javascript:void(0)">下载</a></td>
                                        <td>总店额度采购</td>
                                    </tr>
                                    <!--<tr role="row"  v-for="n in checkLists">-->
                                    <!--<td>{{n.certificate}}</td>-->
                                    <!--<td>{{n.collectionName}}</td>-->
                                    <!--<td>{{n.tradeTime || datetime}}</td>-->
                                    <!--<td>{{n.payoutAmount/100 | currency '' }}</td>-->
                                    <!--<td><a href="javascript:void(0)">下载</a></td>-->
                                    <!--<td>{{n.remarks}}</td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </index>
</template>
<style>
     .blists .form-group{
        text-align: left;
    }
     .blists .form-group.tc{
        text-align: center;
    }
     .blists .modal-body .form-control{
        text-align: left;
        width:67%;
        display: inline-block;
    }
     .blists .modal-body label{
        width:20%;
        display: inline-block;
    }
     .blists .modal-body label i{
        color:red;
    }
     .blists .modal-body .waring{
        color: red;
        margin-left: 5px;
    }
     .blists .modal-body button{
        width:35%;
    }
     .blists table tr td, .blists table tr th{
         padding: 20px 2px;
         text-align: center;
         text-overflow: ellipsis;
         overflow: hidden;
         white-space: nowrap;
     }
     .blists td span{
        cursor: pointer;
        color: #3c8dbc;
    }
     .blists td span:hover{
        opacity: 80;
    }
     .blists  .page-bar{
        margin: 25px auto;
        text-align: center;
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
                defaultData:{"companyId": "","accountType": "","accountNumber": "","pageIndex": 1, "pageSize": 15},
                zdlists:[],
                relist:{
                    startDate:'',companyId:'',accountType:'',shortName:'',accountName:'',accountNumber:'',bankName:'',
                },
                companylists:[],
                typelists:[],
                params:{},
                tSelect:'',
                cSelect:'',
                uText:'',
                addtitle:'',
                waring:'',
                fire:false,
                person:{
                    name:'',
                    phone:'',
                    email:''
                },
                accountId:'',
                bthf:true,
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(data){
                return;
                    this.$http.post('./bankaccount/list',data)
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
            checkNew(){
                this.initList();
            },
            initList(){
                $(".modal").modal("hide");
                this.getZlists(this.defaultData);
            },
            setAcc(){

            },
            bthfShow(type){
                switch (type){
                    case 0:
                        if(this.bthf){
                            return
                        }
                        else{
                            this.bthf=true;
                        }
                        break;
                    case 1:
                        if(!this.bthf){
                            return
                        }
                        else{
                            this.bthf=false;
                        }
                        break;
                }
            }
        },
        ready() {
            (!!sessionStorage.getItem('userData')) ? this.$set('loginList',JSON.parse(sessionStorage.getItem('userData'))) : null;
            this.initList();
            this.getClist();
        },
        components:{
            'datepicker': datepicker,
            'dialog': dialog,
        },
        watch:{
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