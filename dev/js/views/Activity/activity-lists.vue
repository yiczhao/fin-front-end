<template>
    <index :title="'活动管理'"
           :ptitle="'活动列表'"
           :hname="'activity-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="activity_manage" class="active"><a v-link="{name:'activity-lists'}">活动管理</a></li>
                    <li data-ksa="tax_rate"><a v-link="{name:'taxRate'}">税率管理</a></li>
                    <li data-ksa="activity_effect_manage"><a v-link="{name:'activity-effect-lists'}">活动执行表</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">

                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <input type="number" class="form-control" v-model="defaultData.operationID" placeholder="活动ID" v-limitnumber="defaultData.operationID">

                            <input type="text" class="form-control" v-model="defaultData.name" placeholder="活动名称">
                            <input type="text" class="form-control" v-model="defaultData.contractNumber" placeholder="合同编号">

                            <select class="form-control" v-model="defaultData.subCompanyID">
                                <option value="">全部分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>

                            <select class="form-control" v-model="defaultData.status">
                                <option value="">请选择状态</option>
                                <option value="1">待上线</option>
                                <option value="2">运行中</option>
                                <option value="3">已结束</option>
                            </select>
                        </form>
                    </div>
                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="checkNew" data-ksa="activity_manage.search">查询</a>
                    </div>
                </div>

                <div v-show="zdlists.length>0" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>活动ID</th>
                                <th>活动名称</th>
                                <th>三方名称</th>
                                <th>合同编号</th>
                                <th>分公司 </th>
                                <th>起止时间</th>
                                <th>状态</th>
                                <th>消费总笔数</th>
                                <th>消费总金额 </th>
                                <th>三方结算金额</th>
                                <th>商户结算金额</th>
                                <th>商户已付金额</th>
                                <th>退税款</th>
                                <th>额采折扣差 </th>
                                <th>三方折扣差</th>
                                <th>佣金</th>
                                <th>操作</th>
                                <th>执行表参数</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.operationID}}</td>
                                <td>{{trlist.name}}</td>
                                <td>
                                    <template v-if="trlist.thirdPartyAccountID==0"><a @click="addUser(trlist.id)" data-ksa="activity_manage.config">配置</a></template>
                                    <template v-else>{{trlist.thirdPartyAccountName}}</template>
                                </td>
                                <td>{{trlist.contractNumber}}</td>
                                <td>{{trlist.subCompanyName}}</td>
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
                                <td><a data-ksa="trade_detail_manage.search" v-link="{'name':'trade-info','params':{'activityOperationID':trlist.operationID}}">交易明细</a></td>
                                <td>
                                    <a data-ksa="activity_manage.config" class="mr20" @click="checkformulae(trlist)">计算公式</a>
                                    <a data-ksa="activity_manage.config" @click="otherInfo(trlist.subCompanyID,trlist.id)">其他信息</a>
                                </td>
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
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">

                       <div class="right">
                            <page :all="pageall"
                                  :cur.sync="defaultData.pageIndex"
                                  :page_size.sync="defaultData.pageSize">
                            </page>
                       </div>
                    </div>

                </div>
                
                <div class="no-list" v-else>
                    未找到数据
                </div>

                <content-dialog
                        :show.sync="companymodal" :is-cancel="true" :type.sync="'infos'"
                        :title.sync="'选择分公司'"  @kok="goformulae" @kcancel="companymodal=false"
                >
                    <div class="dialog-row">
                        <span>
                            <label>分公司：</label>
                            <select class="form-control" v-model="goformulaeData.subCompanyID">
                                <option value="">请选择分公司</option>
                                <option v-for="(index,n) in usercompanylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </span>
                    </div>
                </content-dialog>
                
                <!--添加商户dialog-->
                <content-dialog
                        :show.sync="modal_add" :is-Button="false" :type.sync="'infos'"
                        :title.sync="'配置第三方'"
                >
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
                </content-dialog>

                <content-dialog
                        :show.sync="modal_other" :type.sync="'infos'" :is-cancel="true"
                        :title.sync="'录入数据'" @kok="saveOther" @kcancel="modal_other=false"
                >
                    <div class="dialog-row">
                        <span>
                             <label>活动归属：</label>
                            <select class="form-control" v-model="redata.activityAttribution">
                                <option value="">请选择活动归属</option>
                                <option value="1">分-分</option>
                                <option value="2">总-总</option>
                                <option value="3">总-总 分-分</option>
                            </select>
                        </span>
                    </div>
                    <div class="dialog-row">
                        <span>
                            <label>经办人：</label>
                             <input type="text" class="form-control" v-model="redata.operator" placeholder="请输入经办人">
                        </span>
                        <span>
                            <label>回款帐期：</label>
                           <input type="text" class="form-control" v-model="redata.collectPeriod" v-limitnumber="redata.collectPeriod" placeholder="请输入回款帐期">
                            个月
                        </span>
                    </div>
                    <div class="dialog-row">
                        <span>
                             <label>回款金额：</label>
                             <input type="text" class="form-control" v-model="redata.collectAmount" v-limitaddprice="redata.collectAmount" placeholder="请输入回款金额">
                        </span>
                        <span>
                            <label>开票金额：</label>

                           <input type="text" class="form-control" v-model="redata.invoiceAmount" v-limitaddprice="redata.invoiceAmount" placeholder="请输入开票金额">

                        </span>
                    </div>
                    <div class="dialog-row">
                         <span>
                             <label class="tlabel"><i>*</i>活动说明：</label>
                             <textarea rows="3" class="form-control" v-model="redata.description"></textarea>
                         </span>
                    </div>
                    <div class="dialog-row">
                        <span>
                             <label class="tlabel">备注：</label>
                             <textarea rows="3" class="form-control" v-model="redata.remarks"></textarea>
                        </span>
                    </div>
                </content-dialog>
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
        margin: 20px 0;
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
    input[type="checkbox"]{
        position: relative;
        top: 2px;
        left: -2px;
    }
    .addbottom table tr td,  .addbottom table tr th{
        padding:10px 5px;
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
    .dialog-row{
        margin-bottom: 10px;
        span{
            display: inline-block;
            min-width: 300px;
            input,textarea,select {
                display: inline-block;
                width: 190px;
            }
            label{
                display: inline-block;
                width: 72px;
                text-align: right;
            }
            textarea,select{
                width: 495px;
            }
            .tlabel{
                position: relative;
                top: -55px;
                i{
                    color:red;
                }
            }
        }
    }
</style>
<script>
    import model from '../../ajax/Activity/activity_model'
    export default{
        data(){
            this.model =model(this)
            return{
                pageall:1,
                city:[],
                companylists:[],
                usercompanylists:[],
                defaultData:{
                    'operationID': '',
                    'name': '',
                    'contractNumber': '',
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
                firstAdd:false,
                modal_add:false,
                modal_other:false,
                companymodal:false,
                goformulaeData:{
                    'id':'',
                    'subCompanyID':''
                },
                redata:{
                    "id": '',
                    "activityId": '',
                    "activityAttribution": '',
                    "operator": '',
                    "collectPeriod": '',
                    "collectAmount": '',
                    "invoiceAmount": '',
                    "description": '',
                    "remarks": '',
                }
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
            checkNew(){
                this.defaultData.pageIndex=1;
                this.initList();
            },
            initList(){
                this.modal_add=false;
                this.modal_other=false;
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
                this.modal_add=true;
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
            },
            otherInfo(subCompanyID,_id){
                this.redata={
                    "subCompanyID":subCompanyID,
                    "activityID": _id,
                    "activityAttribution": '',
                    "operator": '',
                    "collectPeriod": '',
                    "collectAmount": '',
                    "invoiceAmount": '',
                    "description": '',
                    "remarks": '',
                }
                let data={
                    subCompanyID:subCompanyID,
                    activityID:_id
                }
                this.model.otherInfo(data)
                        .then((res)=> {
                            if(res.data.code==0){
                                this.modal_other=true;
                                if(typeof res.data.data !='undefined'){
                                    let data=_.cloneDeep(res.data.data);
                                    data.collectAmount=data.collectAmount/100;
                                    data.invoiceAmount=data.invoiceAmount/100;
                                    this.$set('redata',data )
                                }

                            }
                        })
            },
            saveOther(){
                if(this.redata.description==''){
                    dialogs('info','请输入活动说明！');
                    return;
                }
                let data=_.cloneDeep(this.redata);
                data.collectAmount=accMul(data.collectAmount,100);
                data.invoiceAmount=accMul(data.invoiceAmount,100);
                this.model.saveOther(data)
                        .then((res)=> {
                            if(res.data.code==0){
                                dialogs();
                                this.initList();
                            }
                        })
            },
            checkformulae({id, name, operationID}){
                // *** 请求公司数据
                let data={
                    'type':'Activity',
                    'activityID':id
                }
                this.$common_model.getcompany(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                if(typeof response.data.data=='undefined'||response.data.data==''){
                                    dialogs('info','该活动下没有交易，暂无法编辑计算公式！');
                                    return
                                }
                                else if(response.data.data.length==1){
                                    this.$router.go({'name':'activity-formulae','params':{'activityID':id, 'subCompanyID':response.data.data[0].subCompanyID, 'formulaeID':operationID, 'formulaeName':name}});
                                }
                                else{
                                    this.$set('usercompanylists', response.data.data);
                                    this.goformulaeData.id=id;
                                    this.companymodal=true;
                                }
                            }
                        });
            },
            goformulae(){
                if(this.goformulaeData.subCompanyID==''){
                    return;
                }
                this.$router.go({'name':'activity-formulae','params':{'activityID':this.goformulaeData.id, 'subCompanyID':this.goformulaeData.subCompanyID}});
            }
        },
        ready() {
            var vm=this;
            (vm.$route.params.operationID!=':operationID')?vm.defaultData.operationID=vm.$route.params.operationID:null;
            (vm.$route.params.name!=':name')?vm.defaultData.name=vm.$route.params.name:null;
            vm.getClist();
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
        },
        watch:{
            'defaultData.pageIndex + defaultData.pageSize'(){
                this.initList();
            }
        }
    }
</script>