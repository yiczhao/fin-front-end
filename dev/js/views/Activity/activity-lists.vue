<template>
    <index :title="'活动管理'"
           :ptitle="'活动列表'"
           :hname="'activity-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <input type="number" class="form-control" v-model="defaultData.operationID" placeholder="活动ID" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.name" placeholder="活动名称">
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
                                <option value="1">待上线</option>
                                <option value="2">运行中</option>
                                <option value="3">已结束</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" @click="initList">查询</a>
                        </div>
                    </form>
                </div>
                <div v-if="zdlists.length>0" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>ID</th>
                                <th>名称</th>
                                <th>补贴第三方</th>
                                <th>分公司 </th>
                                <th>城市</th>
                                <th>起止时间</th>
                                <th>状态</th>
                                <th>消费总笔数</th>
                                <th>消费总金额 </th>
                                <th>三方结算金额</th>
                                <th>商户结算金额</th>
                                <th>商户已付金额</th>
                                <th>暂扣税金</th>
                                <th>额采折扣差 </th>
                                <th>三方折扣差</th>
                                <th>佣金</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists">
                                <td>{{trlist.operationID}}</td>
                                <td>{{trlist.name}}</td>
                                <td>
                                    <template v-if="trlist.thirdPartyAccountID==0"><a @click="addUser(trlist.id)">配置</a></template>
                                    <template v-else>{{trlist.thirdPartyAccountName}}</template>
                                </td>
                                <td>{{trlist.subCompanyName}}</td>
                                <td>{{trlist.cityName}}</td>
                                <td>{{trlist.startDate | datetimes}}至{{trlist.endDate | datetimes}}</td>
                                <td>
                                    <template v-if="trlist.status==1">待上线</template>
                                    <template v-if="trlist.status==2">运行中</template>
                                    <template v-if="trlist.status==3">已结束</template>
                                </td>
                                <td>{{trlist.consumptionTotalNumber}}</td>
                                <td>{{trlist.consumptionTotalAmount/100 | currency ''}}</td>
                                <td>{{trlist.thirdPartySettlementAmount/100 | currency ''}}</td>
                                <td>{{trlist.merchantSettlementAmount/100 | currency ''}}</td>
                                <td>{{trlist.merchantPaidAmount/100 | currency ''}}</td>
                                <td>{{trlist.suspensionTaxAmount/100 | currency ''}}</td>
                                <td>{{trlist.purchaseDiscountDiff/100 | currency ''}}</td>
                                <td>{{trlist.thirdPartyDiscountDiff/100 | currency ''}}</td>
                                <td>{{trlist.commissionAmount/100 | currency ''}}</td>
                                <td><a v-link="{'name':'trade-info','params':{'activityOperationID':trlist.operationID}}">交易明细</a></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>合计：</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{{total.consumptionTotalNumber}}</td>
                                <td>{{total.consumptionTotalAmount/100 | currency ''}}</td>
                                <td>{{total.thirdPartySettlementAmount/100 | currency ''}}</td>
                                <td>{{total.merchantSettlementAmount/100 | currency ''}}</td>
                                <td>{{total.merchantPaidAmount/100 | currency ''}}</td>
                                <td>{{total.suspensionTaxAmount/100 | currency ''}}</td>
                                <td>{{total.purchaseDiscountDiff/100 | currency ''}}</td>
                                <td>{{total.thirdPartyDiscountDiff/100 | currency ''}}</td>
                                <td>{{total.commissionAmount/100 | currency ''}}</td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-footer">
                        <page :all="pageall"
                              :cur.sync="defaultData.pageIndex"
                              :page_size.sync="defaultData.pageSize">
                        </page>
                    </div>
                </div>
                <div style="padding: 30px;font-size: 16px;text-align: center" v-else>
                    未找到数据
                </div>

                <!--添加商户dialog-->
                <div data-backdrop="static"  id="modal_add" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">配置第三方</h5>
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
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" v-model="shdata.accountName" placeholder="名称">
                                    </div>
                                    <div class="col-md-3">
                                        <input type="button" class="btn btn-info" @click="searchDigest" value="查询">
                                    </div>
                                </div>
                                <div class="addbottom">
                                    <div class="col-md-12">
                                        <table v-if="xhlist.length>0" class="table datatable-selection-single dataTable no-footer">
                                            <thead>
                                            <tr role="row">
                                                <th></th>
                                                <th>分公司</th>
                                                <th>城市</th>
                                                <th>第三方名称</th>
                                                <th>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr role="row" v-for="n in xhlist">
                                                <td>{{$index+1}}</td>
                                                <td>{{n.subCompanyName}}</td>
                                                <td>{{n.cityName}}</td>
                                                <td>{{n.accountName}}</td>
                                                <td><a @click="checkTrue(n.id)">选择</a></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <span v-if="firstAdd && !xhlist.length>0">
                                            无可添加数据
                                        </span>
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
    .col-md-12{
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
        padding:10px 5px;
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
    import model from '../../ajax/Activity/activity_model'
    export default{
        data(){
            this.model =model(this)
            return{
                pageall:1,
                city:[],
                companylists:[],
                defaultData:{
                    'operationID': '',
                    'name': '',
                    'cityID':'',
                    'subCompanyID':'',
                    'status':'',
                    'pageIndex': 1,
                    'pageSize': 10
                },
                shdata:{
                    'subCompanyID':'',
                    'cityID':'',
                    'accountName':'',
                },
                total:{
                    "consumptionTotalNumber": 0,
                    "consumptionTotalAmount": 0,
                    "thirdPartySettlementAmount": 0,
                    "merchantSettlementAmount": 0,
                    "merchantPaidAmount": 0,
                    "suspensionTaxAmount": 0,
                    "purchaseDiscountDiff": 0,
                    "thirdPartyDiscountDiff": 0,
                    "commissionAmount": 0,
                },
                shcity:[],
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
                this.model.activity_total(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('total', response.data.data)
                            }
                        });
                this.model.activity_list(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('zdlists', response.data.data)
                                this.$set('pageall', response.data.total)
                            }
                        });
            },
            getClist(){
                // *** 请求公司数据
                let data={
                    'type':'ImportUser'
                }
                this.$common_model.getcompany(data)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('companylists', response.data.data)
                        }
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
                            if(response.data.code==0){
                                this.$set('city', response.data.data)
                            }
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
                                if(response.data.code==0){
                                    this.$set('shcity', response.data.data)
                                }
                            });
            },
            initList(){
                $('.modal').modal('hide');
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
            clearUl(){
                this.xhlist=[];
            },
            addUser(_id){
                this.shdata={
                    'subCompanyID':'',
                    'cityID':'',
                    'accountName':'',
                };
                this.id=_id;
                this.firstAdd=false;
                this.getshCity();
                $('#modal_add').modal('show');
                this.clearUl();
            },
            searchDigest(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.clearUl();
                this.firstAdd=true;
                this.model.activity_info(this.shdata)
                    .then((response)=>{
                        if(response.data.code==0){
                            this.$set('xhlist', response.data.data)
                        }
                    })
            },
            delstore(_id){
                this.id=_id;
            },
            checkTrue(_id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                let data={
                    'id':this.id,
                    'thirdPartyAccountID':_id
                }
                this.model.activity_save(data)
                    .then((res)=> {
                        if(res.data.code==0){
                            dialogs();
                            this.initList();
                        }
                    })
            }
        },
        ready() {
            var vm=this;
            (vm.$route.params.operationID!=':operationID')?vm.defaultData.operationID=vm.$route.params.operationID:null;
            (vm.$route.params.name!=':name')?vm.defaultData.name=vm.$route.params.name:null;
            vm.getClist();
            vm.getCity();
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
        },
        components:{
            'datepicker': datepicker
        },
        watch:{
            'defaultData.pageIndex + defaultData.pageSize'(){
                this.initList();
            }
        }
    }
</script>