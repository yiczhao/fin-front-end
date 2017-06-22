<template>
    <index :title="'新增合同'"
           :p2title="'合同管理'"
           :ptitle="'三方结算管理'"
           :h2name="'contract-management-info'"
           :hname="'third-party'"
           :isshow="'isshow'">
        <div class="content activity-formulae" slot="content">
            <div class="panel panel-flat">
                <div class="panel-row">
                    <div class="col">
                        <div>分公司</div>
                        <div style="width: 100%;">
                            <select class="form-control" v-model="defaultData.subCompanyID" @change="getThirdParty(defaultData.subCompanyID)">
                                <option value="">全部分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div><i>*</i>三方</div>
                        <div style="width: 100%;">
                            <select class="form-control" v-model="defaultData.thirdPartyAccountID">
                                <option value="">请选择三方</option>
                                <option v-for="(index,n) in thirdPartyList" v-text="n.name" :value="n.id"></option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div><i>*</i>合同编号：</div>
                        <div style="width: 100%;">
                            <input type="text" v-model="defaultData.contractNumber" class="form-control" placeholder=" 多个合同编号以逗号隔开，没有合同编号请填写合同名称">
                        </div>
                    </div>
                    <div class="col">
                        <div>关联活动ID：</div>
                        <div style="width: 100%;">
                            <input type="text" v-model="defaultData.activityOperationID" class="form-control" placeholder="多个活动ID以逗号隔开">
                        </div>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>合同结算金额=</div>
                        <div style="width: 100%;">
                            <input type="text" v-model="defaultData.contractSettlementFee" class="form-control" v-limitaddprice="defaultData.contractSettlementFee">
                        </div>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>合同税费=</div>
                        <div style="width: 100%;">
                            <input type="text" v-model="defaultData.contractTaxFee" class="form-control" v-limitaddprice="defaultData.contractTaxFee">
                        </div>
                    </div>
                    <div class="col">
                        <div>合同广告费=</div>
                        <div style="width: 100%;">
                            <input type="text" v-model="defaultData.contractAdvertisementFee" class="form-control" v-limitaddprice="defaultData.contractAdvertisementFee">
                        </div>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>合同物料费=</div>
                        <div style="width: 100%;">
                            <input type="text" v-model="defaultData.contractMaterialFee" class="form-control" v-limitaddprice="defaultData.contractMaterialFee">
                        </div>
                    </div>
                    <div class="col">
                        <div>合同现金红包=</div>
                        <div style="width: 100%;">
                            <input type="text" v-model="defaultData.contractRedPacket" class="form-control" v-limitaddprice="defaultData.contractRedPacket">
                        </div>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>合同微信运营=</div>
                        <div style="width: 100%;">
                            <input type="text" v-model="defaultData.contractWeChatMarketFee" class="form-control" v-limitaddprice="defaultData.contractWeChatMarketFee">
                        </div>
                    </div>
                    <div class="col">
                        <div>合同服务费=</div>
                        <div style="width: 100%;">
                            <input type="text" v-model="defaultData.contractServiceFee" class="form-control" v-limitaddprice="defaultData.contractServiceFee">
                        </div>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>合同其他=</div>
                        <div style="width: 100%;">
                            <input type="text" v-model="defaultData.contractOther" class="form-control" v-limitaddprice="defaultData.contractOther">
                        </div>
                    </div>
                    <div class="col">
                        <div>合同备注</div>
                        <div style="width: 100%;"><input type="text" class="form-control" v-model="defaultData.contractMemo" placeholder="合同备注"></div>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>合同</div>
                        <div style="width: 100%;">
                            <span>
                                 <input type="file" style="display: none;" @change="uploads($event)">
                                 <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick">上传</a>
                                 <span v-text="uploadText" v-show="uploadText!=''"></span>
                            </span>
                            <a v-if="!!defaultData.contractFileID && $route.params.contractAddId!==':contractAddId'"
                               @click="removeContarct"
                            >删除</a>
                            <a class="btn btn-primary" v-if="!!defaultData.contractFileID && $route.params.contractAddId!==':contractAddId'" href="{{origin}}/file/download/{{defaultData.contractFileID}}">下载</a>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <span class="btn btn-primary" v-if="$route.params.contractAddId===':contractAddId'" @click="submit">保存</span>
                    <span class="btn btn-primary" v-if="$route.params.contractAddId!==':contractAddId'" @click="edit">保存</span>
                    <span class="btn btn-default" v-link="{name:'contract-management-info'}">取消</span>
                </div>
            </div>
        </div>
    </index>
</template>
<script>
    import vSelect from "../components/vue-select/vue-select.vue"
    import model from '../../ajax/ThreeParty/contract_add_model'
    export default{
        components: {vSelect},
        data(){
            this.model =model(this)
            return{
                origin:window.origin,
                companylists:[],
                thirdPartyList:[],
                uploadText:'',
                activityOperationID:'',
                defaultData:{
                    activityID:'',
                    contractMemo  :'',
                    contractFileID:'',
                    contractNumber:'',
                    subCompanyID :'',
                    thirdPartyAccountID :'',
                    contractAdvertisementFee :'',
                    contractMaterialFee :'',
                    contractOther :'',
                    contractRedPacket :'',
                    contractServiceFee :'',
                    contractSettlementFee :'',
                    contractTaxFee :'',
                    contractWeChatMarketFee :''
                }
            }
        },
        methods:{
            removeContarct(){
                this.defaultData.contractFileID='';
                this.uploadText='';
            },
            getList(){
                let data={
                    id:this.$route.params.contractAddId
                };
                this.model.contractaddList(data).then((res)=>{
                    if(res.data.code==0){
                        this.$set('defaultData',res.data.data);
                        this.getThirdParty(this.defaultData.subCompanyID,true);
                    }
                })
            },
            //获取分公司数据
            getSubcompany(){
                this.$common_model.getcompany()
                    .then((response)=>{
                        if(response.data.code==0){
                            this.$set('companylists', response.data.data)
                        }
                    });
            },
            //获取城市数据
            getThirdParty(_id,isEdit){
                if(!_id){
                    this.defaultData.thirdPartyAccountID='';
                    return;
                }
                this.cityID='';
                let data={
                    'subCompanyID':_id
                }
                this.model.getThirdPartyAccountList(data)
                    .then((response)=>{
                        if(response.data.code==0){
                            this.$set('thirdPartyList', response.data.data);
                            if(!isEdit){
                                this.defaultData.thirdPartyAccountID='';
                            }
                        }
                    });
            },
            uploadClick(){
                $('input[type="file"]').val('');
                $('input[type="file"]').click();
            },
            uploads(e){
                if (e.target.value == '' && this.uploadText != '') {
                    return;
                }
                let files = e.target.files[0];
                let vm = this;
                var reader = new FileReader();
                if (!check_upload(files.name)) {
                    return;
                }
                if(check_upload_size(files.size)){
                    return;
                }
                reader.readAsDataURL(files);
                reader.onload = function (e) {
                    let datas = {
                        name: files.name,
                        data: this.result.split(',')[1]
                    }
                    vm.$common_model.upload(datas)
                        .then((response)=> {
                            if (response.data.code == 0) {
                                vm.defaultData.contractFileID = response.data.data;
                                vm.uploadText = files.name;
                                dialogs('success', '上传成功！');
                            }
                        })
                }
            },
            submit() {
                if(!this.defaultData.thirdPartyAccountID){
                    dialogs('info','请选择三方');
                    return;
                }
                if(!this.defaultData.contractNumber){
                    dialogs('info','请填写合同编号');
                    return;
                }
                this.model.saveFormulae(this.defaultData).then((res)=>{
                    if(res.data.code==0){
                        dialogs('successTime',res.data.message);
                        setTimeout(()=>{
                            this.$router.go({name:'contract-management-info'})
                        },1800)
                    }
                })
            },
            edit(){
                if(!this.defaultData.thirdPartyAccountID){
                    dialogs('info','请选择三方');
                    return;
                }
                if(!this.defaultData.contractNumber){
                    dialogs('info','请填写合同编号');
                    return;
                }
                let data=_.cloneDeep(this.defaultData);
                data.id=this.$route.params.contractAddId;
                this.model.editContract(data).then((res)=>{
                    if(res.data.code==0){
                        dialogs('successTime',res.data.message);
                        setTimeout(()=>{
                            this.$router.go({name:'contract-management-info'})
                        },1800)
                    }
                })
            }
        },
        ready() {
            this.getSubcompany();
            if(this.$route.params.contractAddId!=':contractAddId'){
                this.getList();
            }
        }
    }
</script>