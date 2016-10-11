<template>
    <index :title="'计算公式'"
           :ptitle="'活动列表'"
           :hname="'activity-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-title"><span class="btn btn-primary">使用默认公式</span></div>
                <div class="panel-row">
                    <div class="col">
                        <div>实际广告费=</div>
                        <v-select multiple taggable :value.sync="defaultData.actualAdvertisementFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>合同广告费=</div>
                        <v-select multiple taggable :value.sync="defaultData.contractAdvertisementFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>实际物料费=</div>
                        <v-select multiple taggable :value.sync="defaultData.actualMaterialFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>合同物料费=</div>
                        <v-select multiple taggable :value.sync="defaultData.contractMaterialFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>实际微信营销费=</div>
                        <v-select multiple taggable :value.sync="defaultData.actualWeixinMarketFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>合同微信营销费=</div>
                        <v-select multiple taggable :value.sync="defaultData.contractWeixinMarketFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>实际服务费=</div>
                        <v-select multiple taggable :value.sync="defaultData.actualServiceFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>合同服务费=</div>
                        <v-select multiple taggable :value.sync="defaultData.contractServiceFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div><i>*</i>实际税费=</div>
                        <v-select multiple taggable :value.sync="defaultData.actualTaxFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>合同税费=</div>
                        <v-select multiple taggable :value.sync="defaultData.contractTaxFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div><i>*</i>实际结算金额=</div>
                        <v-select multiple taggable :value.sync="defaultData.actualSettlementFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>合同结算金额=</div>
                        <v-select multiple taggable :value.sync="defaultData.contractSettlementFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-footer">
                    <span class="btn btn-primary" @click="setdefaultFormulae">设为默认公式</span>
                    <span class="btn btn-primary" @click="submit">保存</span>
                </div>
            </div>
        </div>
    </index>
</template>
<style lang="sass">
    .panel{
        padding:20px;
        .panel-title{
            margin:0px 20px 25px;
            padding: 5px 0 25px;
            border-bottom: 1px solid #ededed;
        }
        .panel-footer{
            text-align: center;
            padding-top: 20px;
        }
        .panel-row{
            display: table;
            margin-bottom: 25px;
            width:100%;
        }
        .col{
            width: 50%;
            display: table-cell;
            vertical-align: middle;
            &>div{
                display: table-cell;
                vertical-align: middle;
            }
            div:first-child{
                min-width: 135px;
                padding-right: 20px;
                text-align: right;
                i{
                    color:red;
                }
            }
            .v-select{
                min-height: 38px;
                .dropdown-toggle{
                    min-height:38px;
                    width: 600px;
                }
            }
        }
        .btn-infos{
            border: 1px solid #ddd;
            margin-left: 20px;
            background: #fff;
        }
        .checked{
            border-color:#2196F3;
            color:#2196F3;
        }
    }
    .write-div{
        border: 1px solid #ddd;
        border-radius: 3px;
        padding: 10px;
        width: 500px;
        .btn-infos,.form-control{
            margin-left: 5px;
            margin-bottom: 5px;
            float: left;
        }
        .form-control{
            width: 50px;
            border: 1px solid #ddd;
        }
    }
</style>
<script>
    import vSelect from "../components/vue-select/vue-select.vue"
    import model from '../../ajax/Activity/activityformulae_model'
    export default{
        components: {vSelect},
        data(){
            this.model =model(this)
            return{
                chooseData:[
                    '三方应收',
                    '苏州卡说税率',
                    '实际广告费',
                    '实际物料费',
                    '实际微信营销费',
                    '实际服务费',
                    '实际税费',
                    '实际结算金额',
                    '合同广告费',
                    '合同物料费',
                    '合同微信营销费',
                    '合同服务费',
                    '合同税费',
                    '合同结算金额',
                ],
                defaultData:{
                    actualAdvertisementFee:[],
                    actualMaterialFee:[],
                    actualWeixinMarketFee:[],
                    actualServiceFee:[],
                    actualTaxFee:[],
                    actualSettlementFee:[],
                    contractAdvertisementFee:[],
                    contractMaterialFee:[],
                    contractWeixinMarketFee:[],
                    contractServiceFee:[],
                    contractTaxFee:[],
                    contractSettlementFee:[],
                    used:false,
                    defaultFormulae:false,
                    refuseReason:'',
                }
            }
        },
        methods:{
            toStrings(value){
                let a=[];
                value.map((val,index)=>{
                    a[index]='【'+val+'】'
                })
                return a.join("")
            },
            getsubitData(){
                let data={};
                _.forEach(this.defaultData,(value,key)=>{
                    (key!='used'&& key!='defaultFormulae' && key!='refuseReason')?data[key]=this.toStrings(value):data[key]=value;
                })
                return data;
            },
            enString(value){
                let a=_.split(value,'】');
                _.remove(a,(n)=>{return n==''});
                let b=a.map(function (val){ return val.replace('【','')})
                return b;
            },
            getList(){
                let data={
                    activityID:this.$route.params.activityID,
                    subCompanyID:this.$route.params.subCompanyID
                };
                this.model.activityformulae_list(data).then((res)=>{
                    if(res.data.code==0){
                        let data={};
                        _.forEach(res.data.data,(value,key)=>{
                            (key!='used'&&key!='defaultFormulae'&&key!='refuseReason')?data[key]=this.enString(value):data[key]=value;
                        })
                        this.$set('defaultData',data);
                    }
                })
            },
            setdefaultFormulae(){
                let data={
                    activityID:this.$route.params.activityID,
                    subCompanyID:this.$route.params.subCompanyID
                };
                this.model.defaultFormulae(data).then((res)=>{
                    if(res.data.code==0){
                        dialogs('success','设置成功！');
                    }
                })
            },
            submit() {
                if(this.defaultData.actualTaxFee==''||this.defaultData.actualSettlementFee==''){
                    dialogs('info','请填写实际税费及实际结算金额');
                    return;
                }
                let data=this.getsubitData();
                data.activityID=this.$route.params.activityID;
                data.subCompanyID=this.$route.params.subCompanyID;
                this.model.saveFormulae(data).then((res)=>{
                    if(res.data.code==0){
                        dialogs('success','设置成功！');
                    }
                })
            }
        },
        ready() {
            this.getList();
        },
        watch:{
        }
    }
</script>