<template>
    <index :title="'合同管理'"
           :ptitle="'三方结算管理'"
           :hname="'third-party'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="third_party_account_manage"><a v-link="{name:'third-party'}">三方管理</a></li>
                    <li data-ksa="activity_manage" class="active"><a v-link="{name:'contract-management-info'}">合同管理</a></li>
                    <li data-ksa="activity_effect_manage"><a v-link="{name:'activity-effect-lists'}">活动收入成本</a></li>
                    <li data-ksa="tax_rate"><a v-link="{name:'taxRate'}">税率管理</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" v-link="{name:'contract-add'}" data-ksa="contract.add">添加合同</a>
                    </div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="defaultData.subCompanyID">
                                <option value="">全部分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                            <input type="text" class="form-control" v-model="defaultData.thirdPartyAccountName" placeholder="三方名称">
                            <input type="text" class="form-control" v-model="defaultData.contractNumber" placeholder="合同编号">
                            <getmonth :value.sync="defaultData.startDate"></getmonth>
                        </form>
                    </div>
                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="initList" data-ksa="third_party_account_manage.search" style="margin-left: -21px;">查询</a>
                    </div>
                </div>
                <!--<div style="padding: 0 20px;font-size: 18px;">-->
                    <!--<span>三方名称：{{contractName}}</span>-->
                    <!--<span>分公司：{{contractCompanyName}}</span>-->
                    <!--<span>城市：{{contractCity}}</span>-->
                <!--</div>-->
                <div v-show="zdlists.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>序号</th>
                                <th>分公司</th>
                                <th>三方名称</th>
                                <th>合同编号</th>
                                <th>合同结算金额</th>
                                <th>操作</th>
                                <th>待结算金额</th>
                                <th>开票/回款</th>
                                <th>开票金额</th>
                                <th>已回款</th>
                                <th>应收账款</th>
                                <th>成本</th>
                                <th>已划付</th>
                                <th>待划付</th>
                                <th>税金账户</th>
                                <th>欠发票账户</th>
                                <th>毛利</th>
                                <th>毛利率</th>
                                <th>结算确认</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{index+1}}</td>
                                    <td>{{trlist.subCompanyName}}</td>
                                    <td>{{trlist.thirdPartyAccountName}}</td>
                                    <td>{{trlist.contractNumber}}</td>
                                    <td>{{trlist.contractSettlementAmount/100 | currency ''}}</td>
                                    <td>
                                        <a data-ksa="contract.edit" @click="editShow(trlist.id,trlist.activityOperationID)">编辑</a>
                                        <a data-ksa="contract.associate" @click="associateShow(trlist.contractNumber,trlist.id,trlist.activityOperationID)">关联</a>
                                    </td>
                                    <td>{{trlist.unSettlementAmountcontractSettlementAmount/100 | currency ''}}</td>
                                    <td>
                                        <a data-ksa="contract.edit" @click="editShow(trlist.id,trlist.activityOperationID)">开票</a>
                                        <a data-ksa="contract.associate" @click="associateShow(trlist.contractNumber,trlist.id,trlist.activityOperationID)">回款</a>
                                    </td>
                                    <td>{{trlist.billingAmount/100 | currency ''}}</td>
                                    <td>{{trlist.collectionAmount/100 | currency ''}}</td>
                                    <td>{{trlist.accountsReceivable/100 | currency ''}}</td>
                                    <td>{{trlist.cost/100 | currency ''}}</td>
                                    <td>{{trlist.paidAmount/100 | currency ''}}</td>
                                    <td>{{trlist.unpaidAmount/100 | currency ''}}</td>
                                    <td>{{trlist.suspensionTaxAmount/100 | currency ''}}</td>
                                    <td>{{trlist.invoiceAmount/100 | currency ''}}</td>
                                    <td>{{trlist.grossProfit/100 | currency ''}}</td>
                                    <td>{{trlist.grossMargin}} <span v-if="!!trlist.grossMargin">%</span></td>
                                    <td>
                                        <template v-if="!status"><a>确认</a></template>
                                        <template v-else>已确认</template>
                                    </td>
                                    <td>{{trlist.remarks}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="no-list" v-else>
                    未找到数据
                </div>
            </div>

            <content-dialog
                    :show.sync="modal_add" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="addTitle" @kok="addBtn" @kcancel="modal_add = false"
            >
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="tlabel"><i>*</i>合同编号：</label>
                            <textarea class="form-control" row="3" v-model="reData.contractNumber" placeholder="多个合同编号以逗号隔开"></textarea>
                        </div>
                        <div class="form-group">
                            <label>合同广告费 =</label>
                            <input v-if="isAdd||!reData.contractAdvertisementFeeStatus" placeholder="固定的金额请在此处填写" type="text" class="form-control" v-model="reData.contractAdvertisementFee" v-limitaddprice="reData.contractAdvertisementFee">
                            <input v-else type="text" class="form-control" disabled="true">
                        </div>
                        <div class="form-group">
                            <label>合同物料费 =</label>
                            <input v-if="isAdd||!reData.contractMaterialFeeStatus" placeholder="固定的金额请在此处填写" type="text" class="form-control" v-model="reData.contractMaterialFee" v-limitaddprice="reData.contractMaterialFee">
                            <input v-else type="text" class="form-control" disabled="true">
                        </div>
                        <div class="form-group">
                            <label>合同微信营销费 =</label>
                            <input v-if="isAdd||!reData.contractWeChatMarketFeeStatus" placeholder="固定的金额请在此处填写" type="text" class="form-control" v-model="reData.contractWeChatMarketFee" v-limitaddprice="reData.contractWeChatMarketFee">
                            <input v-else type="text" class="form-control" disabled="true">
                        </div>
                        <div class="form-group">
                            <label>合同服务费 =</label>
                            <input v-if="isAdd||!reData.contractServiceFeeStatus" placeholder="固定的金额请在此处填写" type="text" class="form-control" v-model="reData.contractServiceFee" v-limitaddprice="reData.contractServiceFee">
                            <input v-else type="text" class="form-control" disabled="true">
                        </div>
                        <div class="form-group">
                            <label>合同税费 =</label>
                            <input v-if="isAdd||!reData.contractTaxFeeStatus" placeholder="固定的金额请在此处填写" type="text" class="form-control" v-model="reData.contractTaxFee" v-limitaddprice="reData.contractTaxFee">
                            <input v-else type="text" class="form-control" disabled="true">
                        </div>
                        <div class="form-group">
                            <label>合同结算金额 =</label>
                            <input v-if="isAdd||!reData.contractSettlementFeeStatus" placeholder="固定的金额请在此处填写" type="text" class="form-control" v-model="reData.contractSettlementFee" v-limitaddprice="reData.contractSettlementFee">
                            <input v-else type="text" class="form-control" disabled="true">
                        </div>
                    </div>
            </content-dialog>

            <content-dialog
                    :show.sync="modal_associate" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="'关联活动'" @kok="associateTrue" @kcancel="modal_associate = false"
            >
                <div class="form-group">
                    <label class="control-label">合同编号：</label>
                    <span>{{contractNumbers}}</span>
                </div>
                <div class="form-group">
                    <label style="position: relative;top: -95px;" class="control-label">活动ID：</label>
                    <textarea style="display: inline-block;width: 70%;" rows="5" cols="5" class="form-control" v-limitids="activityOperationIDs" v-model="activityOperationIDs" placeholder="多个ID以逗号隔开"></textarea>
                </div>
            </content-dialog>
        </div>
    </index>
</template>
<style lang="sass" scoped>
    .heading{
        span{
            font-size:16px; display: inline-block; padding: 23px 20px 0;
        }
    }
    .kdialog{
        .form-group{
            label,input,textarea{
                display: inline-block
            }
            label{
                width: 23%;
                text-align: right;
                i{color:red}
            }
            .tlabel{
                position: relative;
                top:-40px
            }
            input,textarea{
                width: 75%;
            }
        }
    }
</style>
<script>
    import model from '../../ajax/ThreeParty/contract_model'
    export default{
        data(){
            this.model =model(this)
            return{
                modal_add: false,
                modal_associate: false,
                isAdd: true,
                addTitle:'',
                companylists:[],
                defaultData:{
                    thirdPartyAccountID: '',
                    year:'',
                    month:'',
                    startDate:getNowMonth(),
                    thirdPartyAccountName:'',
                    contractNumber:'',
                    subCompanyID:'',
                },
                zdlists:[],
                contractNumbers:'',
                reData:{
                    subCompanyID:'',
                    thirdPartyAccountID:'',
                    contractNumber:'',
                    contractAdvertisementFee:'',
                    contractMaterialFee:'',
                    contractWeChatMarketFee:'',
                    contractServiceFee:'',
                    contractCompanyId:'',
                    contractTaxFee:'',
                    contractSettlementFee:''
                },
                activityOperationIDs:'',
                id:'',
                contractName:'',
                contractCity:'',
                contractCompanyName:'',
                activityOperationID:''
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                var startDate = data.startDate.split('-');
                var year = parseInt(startDate[0]);
                var month = parseInt(startDate[1]);

                data.year = year;
                data.month = month;
                this.model.contract_list(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                        });
            },
            getClist(){
                // *** 请求公司数据
                this.$common_model.getcompany().then((response)=>{
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if(response.data.code==0){
                        this.$set('companylists', response.data.data)
                    }
                });
            },
            initList(){
                this.modal_add=false;
                this.modal_associate=false;
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
            addContract(){
                this.addTitle='添加合同';
                this.reData=this.redata={
                    thirdPartyAccountID:this.defaultData.thirdPartyAccountID,
                    contractNumber:'',
                    contractAdvertisementFee:'',
                    contractMaterialFee:'',
                    contractWeChatMarketFee:'',
                    contractServiceFee:'',
                    contractTaxFee:'',
                    contractSettlementFee:''
                },
                this.modal_add = true;
                this.isAdd = true;
            },
            editShow(a,b){
                this.activityOperationID=b;
                this.id=a;
                let data={
                    id:this.id,
                    subCompanyID:this.$route.params.contractCompanyId,
                    activityOperationID: this.activityOperationID
                }
                this.model.contract_editInfo(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.addTitle='编辑合同';
                                this.isAdd = false;
                                this.$set('reData', response.data.data);
                                this.modal_add = true;
                            }
                        });
            },
            associateShow(a,b,c){
                this.contractNumbers=a;
                this.id=b;
                this.activityOperationIDs=c;
                this.modal_associate=true;
            },
            addBtn(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.reData.contractNumber==''){
                    dialogs('info','合同编号为必填项！');
                    return;
                }
                this.reData.id=this.id;
                this.reData.subCompanyID=this.$route.params.contractCompanyId;
                this.reData.activityOperationID=this.activityOperationID;
                if(this.addTitle=='编辑合同'){
                    this.model.contract_edit(this.reData)
                            .then((response)=>{
                                if(response.data.code == 0){
                                    this.initList();
                                    dialogs('success',response.data.message);
                                }
                            })
                }
                else{
                    this.model.contract_add(this.reData)
                            .then((response)=>{
                                if(response.data.code == 0){
                                    this.initList();
                                    dialogs('success',response.data.message);
                                }
                            })
                }
            },
            associateTrue(){
                let data={
                    id:this.id,
                    subCompanyID:this.$route.params.contractCompanyId,
                    thirdPartyAccountID:this.defaultData.thirdPartyAccountID,
                    activityOperationID:this.activityOperationIDs
                }
                this.model.contract_associate(data)
                        .then((response)=>{
                            if(response.data.code == 0){
                                dialogs('success',response.data.message);
                            }
                            this.initList();
                        })
            }
        },
        ready() {
            var vm=this;
            (this.$route.params.contractName==':contractName')?this.defaultData.thirdPartyAccountName='' :this.defaultData.thirdPartyAccountName=this.$route.params.contractName;
            this.getClist();
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
        }
    }
</script>