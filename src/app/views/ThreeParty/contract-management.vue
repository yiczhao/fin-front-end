<template>
    <index :title="'合同管理'"
           :ptitle="'银行管理'"
           :hname="'third-party'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" @click="addContract" data-ksa="contract.add">添加合同</a>
                    </div>
                    <span>银行名称：{{contractName}}</span>
                    <span>分公司：{{contractCompanyName}}</span>
                    <span>城市：{{contractCity}}</span>
                </div>
                <div v-show="zdlists.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>合同编号</th>
                                <th>活动ID</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{trlist.contractNumber}}</td>
                                    <td>{{trlist.activityOperationID}} </td>
                                    <td>
                                        <a data-ksa="contract.edit" @click="editShow(trlist.id,trlist.activityOperationID)">编辑</a>
                                        <a data-ksa="contract.associate" @click="associateShow(trlist.contractNumber,trlist.id,trlist.activityOperationID)">关联</a>
                                    </td>
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
                    'thirdPartyAccountID': '',
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
                this.model.contract_list(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
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
            (this.$route.params.contractId==':contractId')?this.defaultData.thirdPartyAccountID='' :this.defaultData.thirdPartyAccountID=this.$route.params.contractId;
            (this.$route.params.contractName==':contractName')?this.contractName='' :this.contractName=this.$route.params.contractName;
            (this.$route.params.contractCity==':contractCity')?this.contractCity='' :this.contractCity=this.$route.params.contractCity;
            (this.$route.params.contractCompanyName==':contractCompanyName')?this.contractCompanyName='' :this.contractCompanyName=this.$route.params.contractCompanyName;
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
        }
    }
</script>