<template>
    <index :title="'合同管理'"
           :ptitle="'三方管理'"
           :hname="'third-party'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" @click="addContract" data-ksa="">添加合同</a>
                    </div>
                    <span>三方名称：{{contractName}}</span>
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
                                    <td>{{trlist.contractNumbers}}</td>
                                    <td>{{trlist.activityID}} </td>
                                    <td>

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
                            <input placeholder="固定的金额请在此处填写" type="text" class="form-control" v-model="reData.contractAdvertisementFee" v-limitprice="reData.contractAdvertisementFee">
                        </div>
                        <div class="form-group">
                            <label>合同物料费 =</label>
                            <input placeholder="固定的金额请在此处填写" type="text" class="form-control" v-model="reData.contractMaterialFee" v-limitprice="reData.contractMaterialFee">
                        </div>
                        <div class="form-group">
                            <label>合同微信营销费 =</label>
                            <input placeholder="固定的金额请在此处填写" type="text" class="form-control" v-model="reData.contractWeChatMarketFee" v-limitprice="reData.contractWeChatMarketFee">
                        </div>
                        <div class="form-group">
                            <label>合同服务费 =</label>
                            <input placeholder="固定的金额请在此处填写" type="text" class="form-control" v-model="reData.contractServiceFee" v-limitprice="reData.contractServiceFee">
                        </div>
                        <div class="form-group">
                            <label>合同税费 =</label>
                            <input placeholder="固定的金额请在此处填写" type="text" class="form-control" v-model="reData.contractTaxFee" v-limitprice="reData.contractTaxFee">
                        </div>
                        <div class="form-group">
                            <label>合同结算金额 =</label>
                            <input placeholder="固定的金额请在此处填写" type="text" class="form-control" v-model="reData.contractSettlementFee" v-limitprice="reData.contractSettlementFee">
                        </div>
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
                addTitle:'',
                pageall:1,
                companylists:[],
                defaultData:{
                    'thirdPartyAccountID': '',
                    'pageIndex': 1,
                    'pageSize': 10
                },
                zdlists:[],
                addId:[],
                reData:{
                    contractNumber:'',
                    contractAdvertisementFee:'',
                    contractMaterialFee:'',
                    contractWeChatMarketFee:'',
                    contractServiceFee:'',
                    contractTaxFee:'',
                    contractSettlementFee:''
                },
                contractName:'',
                contractCity:'',
                contractCompanyName:''
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
                            (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                        });
            },
            initList(){
                this.modal_add=false;
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
            addContract(){
                this.addTitle='添加合同';
                this.reData={
                    contractNumber:'',
                    contractAdvertisementFee:'',
                    contractMaterialFee:'',
                    contractWeChatMarketFee:'',
                    contractServiceFee:'',
                    contractTaxFee:'',
                    contractSettlementFee:''
                },
                this.modal_add = true;
            },
            addBtn(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.reData.contractNumber==''){
                    dialogs('info','合同标号为必填项！');
                    return;
                }
                this.model.contract_add(this.reData)
                        .then((response)=>{
                            if(response.data.code == 0){
                                this.initList();
                                dialogs('success',response.data.message);
                            }
                        })
            },
        },
        ready() {
            var vm=this;
            (this.$route.params.contractId==':contractId')?this.defaultData.thirdPartyAccountID='' :this.defaultData.thirdPartyAccountID=this.$route.params.contractId;
            (this.$route.params.contractName==':contractName')?this.contractName='' :this.contractName=this.$route.params.contractName;
            (this.$route.params.contractCity==':contractCity')?this.contractCity='' :this.contractCity=this.$route.params.contractCity;
            (this.$route.params.contractCompanyName==':contractCompanyName')?this.contractCompanyName='' :this.contractCompanyName=this.$route.params.contractCompanyName;
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