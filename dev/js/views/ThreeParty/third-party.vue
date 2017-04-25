<template>
    <index :title="'三方管理'"
           :ptitle="'三方结算管理'"
           :hname="'third-party'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="third_party_account_manage" class="active"><a v-link="{name:'third-party'}">三方管理</a></li>
                    <li data-ksa="activity_manage"><a v-link="{name:'contract-management-info'}">合同管理</a></li>
                    <li data-ksa="activity_effect_manage"><a v-link="{name:'activity-effect-lists'}">活动收入成本</a></li>
                    <li data-ksa="tax_rate"><a v-link="{name:'taxRate'}">税率管理</a></li>
                    <li class="active"><a>账户列表</a></li>
                    <li><a v-link="{name:'activity-cost-management'}">活动收入成本管理</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" @click="addUser" data-ksa="third_party_account_manage.add">添加</a>
                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <input type="number" class="form-control" v-model="defaultData.operationID" placeholder="账户ID" v-limitnumber="defaultData.operationID">

                            <input type="text" class="form-control" v-model="defaultData.accountName" placeholder="名称">

                            <select class="form-control" v-model="defaultData.subCompanyID" @change="getCity(defaultData.subCompanyID)">
                                <option value="">全部分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>

                            <select class="form-control" v-model="defaultData.cityID">
                                <option value="">全部城市</option>
                                <option v-for="(index,n) in city" v-text="n.name" :value="n.cityID"></option>
                            </select>

                            <select class="form-control" v-model="defaultData.status">
                                <option value="">请选择状态</option>
                                <option value="1">正常</option>
                                <option value="0">停用</option>
                            </select>
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="checkNew" data-ksa="third_party_account_manage.search" style="margin-left: -21px;">查询</a>
                    </div>
                </div>

                <div v-show="zdlists.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>账户ID</th>
                                <th>名称</th>
                                <th>分公司</th>
                                <th>城市 </th>
                                <th>合同结算金额</th>
                                <th>待结算金额</th>
                                <th>开票金额</th>
                                <th>已回款</th>
                                <th>应收账款</th>
                                <th>数据穿透</th>
                                <th>状态</th>
                                <th>操作</th>
                                <th>开通时间</th>
                                <th>联系人</th>
                                <th>电话</th>
                                <th>工作人员</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{trlist.operationID}}</td>
                                    <td>{{trlist.accountName}}</td>
                                    <td>{{trlist.subCompanyName}}</td>
                                    <td>{{trlist.cityName}}</td>
                                    <td>{{trlist.contractSettlementAmount/100 | currency ''}}</td>
                                    <td>{{trlist.unsettlementAmount/100 | currency ''}}</td>
                                    <td>{{trlist.collectionAmount/100 | currency ''}}</td>
                                    <td>{{trlist.billingAmount/100 | currency ''}}</td>
                                    <td>{{trlist.accountsReceivable/100 | currency ''}}</td>
                                    <td>
                                        <a v-link="{name:'contract-management-info',params:{'contractId':trlist.id,'contractName':trlist.accountName,'contractCity':trlist.cityName,'contractCompanyName':trlist.subCompanyName,'contractCompanyId':trlist.subCompanyID}}" data-ksa="contract.search">合同</a>
                                    </td>
                                    <!--<td>-->
                                        <!--<a v-link="{name:'third-info',params:{'id':trlist.id}}" data-ksa="third_party_account_manage">明细</a>-->
                                    <!--</td>-->
                                    <td>
                                        <template v-if="trlist.status==0">停用</template>
                                        <template v-if="trlist.status==1">正常</template>
                                    </td>
                                    <td>
                                        <a v-if="trlist.status==1" @click="startParty(trlist.id,0)" data-toggle="modal" data-target="#modal_waring" data-ksa="third_party_account_manage.enable_disable">停用</a>
                                        <a v-if="trlist.status==0" @click="startParty(trlist.id,1)" data-toggle="modal" data-target="#modal_waring" data-ksa="third_party_account_manage.enable_disable">启用</a>
                                    </td>
                                    <td>{{trlist.openTime | datetime}}</td>
                                    <td>{{trlist.contactName}}</td>
                                    <td>{{trlist.contactNumber}} </td>
                                    <td>{{trlist.staffName}} </td>
                                </tr>
                                <tr role="row">
                                    <td>合计：</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{{total.contractSettlementAmountTotal/100 | currency ''}}</td>
                                    <td>{{total.unsettlementAmountTotal/100 | currency ''}}</td>
                                    <td>{{total.collectionAmountTotal/100 | currency ''}}</td>
                                    <td>{{total.billingAmountTotal/100 | currency ''}}</td>
                                    <td>{{total.accountsReceivableTotal/100 | currency ''}}</td>
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
                                    <input type="text" v-validate:val1="['required']" class="form-control" v-model="redata.money" v-limitaddprice="redata.money">
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
                <content-dialog
                        :show.sync="modal_add" :is-button="false" :type.sync="'infos'"
                        :title.sync="'添加账户'"
                        >
                        <div class="addDialogs">
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
                            <div class="addbottom clearfix">
                                <div style="text-indent: 76%">已选择：</div>
                                <div class="left">
                                    <table v-if="merchantList.length>0"
                                           class="table">
                                        <thead>
                                        <tr role="row">
                                            <th><input type="checkbox" v-model="checkAll" @click="chooseAll"/>全选</th>
                                            <th>分公司</th>
                                            <th>城市</th>
                                            <th>商户名</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(index,merchant) in merchantList" v-show="merchant.isAdd">
                                            <td>
                                                <input type="checkbox" @click="checked(merchant)" v-model="merchant.ischeck"/>
                                                {{index+1}}
                                            </td>
                                            <td>{{merchant.subCompanyName}}</td>
                                            <td>{{merchant.cityName}}</td>
                                            <td>{{merchant.name}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <span v-if="!merchantList.length>0 && firstAdd">
                                        未查询到商户数据！
                                    </span>
                                </div>
                                <div class="center">
                                    <input type="button" class="btn btn-info" @click="addTrue" value="添加">
                                    <input type="button" class="btn btn-info" @click="delTrue" value="删除">
                                    <input type="button" class="btn btn-info" @click="submit" value="确认">
                                </div>
                                <div class="right">
                                    <ul>
                                        <li v-for="n in checkedLis" @click="checkLi($event,n)">{{n.name}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                </content-dialog>

            </div>
        </div>
    </index>
</template>
<style lang="sass" scoped>
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
    import model from '../../ajax/ThreeParty/thirdlist_model'
    export default{
        data(){
            this.model =model(this)
            return{
                modal_add: false,
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
                merchantList:[],
                id:'',
                isEnable: 0,
                redata:{
                    id:'',
                    money:'',
                    remarks:'',
                    name:'',
                    balanceAmount:0
                },
                saveerror:false,
                firstAdd:false,
                checkedIds: [],
                checkedLis: [],
                removeIds: [],
                total:{
                    contractSettlementAmountTotal:0,
                    unsettlementAmountTotal:0,
                    collectionAmountTotal:0,
                    billingAmountTotal:0,
                    accountsReceivableTotal:0
                },
            }
        },
        computed:{
            checkAll(){
                let clength=0;
                this.merchantList.map((value)=>{
                    (!value.ischeck)?clength++:null;
                })
                return !clength
            }
        },
        methods: {
            checkLi(e,n){
                if(!e.target.classList.length){
                    this.removeIds.push(n.operationID);
                    e.target.classList.add('check-li');
                }
                else{
                    _.remove(this.removeIds, function(e) {
                        return e==n.operationID;
                    })
                    e.target.classList.remove('check-li');
                }
            },
            addTrue() {
                if(this.checkedIds==''){
                    dialogs('info','请勾选要添加的商户！');
                    return;
                }
                this.$set('checkedLis',this.checkedIds);
                let data=_.cloneDeep(this.merchantList);
                _.map(data,(val)=>{
                    this.checkedLis.map((value)=>{
                        if(val.operationID==value.operationID){
                            val.isAdd=false;
                        }
                    })
                })
                this.$set('merchantList',data);
                this.checkedIds=[];
            },
            delTrue() {
                if(this.removeIds==''){
                    dialogs('info','请选择要删除的商户！');
                    return;
                }
                let dataLi=_.cloneDeep(this.checkedLis);
                _.map(this.removeIds,(val)=>{
                    _.remove(dataLi, function(e) {
                        return e.operationID==val;
                    })
                })
                this.$set('checkedLis',dataLi);
                let data=_.cloneDeep(this.merchantList);
                _.map(data,(val)=>{
                    this.removeIds.map((value)=>{
                        if(val.operationID==value){
                            val.isAdd=true;
                            val.ischeck=false;
                        }
                    })
                })
                this.$set('merchantList',data);
                this.removeIds=[];
            },
            submit() {
                if(this.checkedLis==''){
                    return;
                }
                let data=[];
                _.map(this.checkedLis,(val)=>{
                    data.push(
                        {
                            operationID:val.id+"",
                            name:val.name,
                            subCompanyID:val.subCompanyOperationID,
                            cityID:val.cityID,
                            type:val.type
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
            chooseAll(){
                this.checkedIds=[];
                let cloneData=_.cloneDeep(this.merchantList);
                cloneData.map((value)=>{
                    if(this.checkAll){
                        value.ischeck=false;
                    }else{
                        this.checkedIds.push(value);
                        value.ischeck=true;
                    }
                })
                this.merchantList=cloneData;
            },
            checked(n){
                if(!n.ischeck){
                    this.checkedIds.push(n);
                }else{
                    _.remove(this.checkedIds, function(e) {
                        return e.operationID==n.operationID;
                    })
                }
            },
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
            checkNew(){
                this.defaultData.pageIndex=1;
                this.initList();
            },
            initList(){
                this.modal_add=false;
                $('.modal').modal('hide');
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
            clearUl(){
                this.merchantList=[];
                this.firstAdd=false;
                this.merchantList=[];
                this.checkedIds=[];
                this.checkedLis=[];
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
                this.modal_add = true;
            },
            searchDigest(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.clearUl();
                this.firstAdd=true;
                this.model.thirdParty_accountlist(this.shdata)
                        .then((response)=>{
                            (response.data.code==0) ? this.$set('merchantList', response.data.data) : null;
                            _.map(this.merchantList, function(value) {
                                value.isAdd=true;
                            })
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
                    money:accMul(this.redata.money,100),
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
            vm.getClist();
            vm.getCity();
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
        },
        watch:{
            'defaultData.pageSize+defaultData.pageIndex'(){
                this.initList();
            }
        }
    }
</script>