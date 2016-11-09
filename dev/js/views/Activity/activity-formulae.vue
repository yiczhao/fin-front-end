<template>
    <index :title="'计算公式'"
           :ptitle="'活动列表'"
           :hname="'activity-lists'"
           :isshow="'isshow'">
        <div class="content activity-formulae" slot="content">
            <div class="panel panel-flat">
                <div class="panel-title"><span class="btn btn-primary" data-ksa="activity_manage.config" @click="usedefalut">加载默认公式</span></div>
                <div class="panel-row">
                    <div class="col">
                        <div>实际广告费=</div>
                        <v-select :value.sync="defaultData.actualAdvertisementFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>合同广告费=</div>
                        <v-select :value.sync="defaultData.contractAdvertisementFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>实际物料费=</div>
                        <v-select :value.sync="defaultData.actualMaterialFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>合同物料费=</div>
                        <v-select :value.sync="defaultData.contractMaterialFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>实际微信营销费=</div>
                        <v-select :value.sync="defaultData.actualWeChatMarketFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>合同微信营销费=</div>
                        <v-select :value.sync="defaultData.contractWeChatMarketFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>实际服务费=</div>
                        <v-select :value.sync="defaultData.actualServiceFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>合同服务费=</div>
                        <v-select :value.sync="defaultData.contractServiceFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div><i>*</i>实际税费=</div>
                        <v-select :value.sync="defaultData.actualTaxFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>合同税费=</div>
                        <v-select :value.sync="defaultData.contractTaxFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div><i>*</i>实际结算金额=</div>
                        <v-select :value.sync="defaultData.actualSettlementFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>合同结算金额=</div>
                        <v-select :value.sync="defaultData.contractSettlementFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-footer">
                    <span class="btn btn-primary" data-ksa="activity_manage.config" @click="setdefaultFormulae">设为默认公式</span>
                    <span class="btn btn-primary" data-ksa="activity_manage.config" @click="submit">保存</span>
                </div>
            </div>
        </div>
    </index>
</template>
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
                    '税率',
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
                    actualWeChatMarketFee:[],
                    actualServiceFee:[],
                    actualTaxFee:[],
                    actualSettlementFee:[],
                    contractAdvertisementFee:[],
                    contractMaterialFee:[],
                    contractWeChatMarketFee:[],
                    contractServiceFee:[],
                    contractTaxFee:[],
                    contractSettlementFee:[]
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
                    (value!=null)?data[key]=this.toStrings(value):data[key]="";
                })
                return data;
            },
            enString(value){
                let a=value.split('】');
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
                            (value!=null&&key!='activityID'&&key!='id'&&key!='subCompanyID'&&key!='defaultFormulae')?data[key]=this.enString(value):data[key]=[];
                        })
                        this.$set('defaultData',data);
                    }
                })
            },
            usedefalut(){
                this.model.useDefault(this.$route.params.subCompanyID).then((res)=>{
                    if(res.data.code==0){
                        if(typeof res.data.data=='undefined'){
                            dialogs('info','无默认公式！')
                            return;
                        }
                        let data={};
                        _.forEach(res.data.data,(value,key)=>{
                            (value!=null&&key!='activityID'&&key!='id'&&key!='subCompanyID'&&key!='defaultFormulae')?data[key]=this.enString(value):data[key]=[];
                        })
                        this.$set('defaultData',data);
                        dialogs('success','加载成功！')
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
                        dialogs('success','设置成功！')
                    }
                })
            },
            submit() {
                if(this.defaultData.actualTaxFee==''||this.defaultData.actualSettlementFee==''){
                    dialogs('info','请填写实际税费及实际结算金额');
                    return;
                }
                let data=this.getsubitData();
                data.id = '';
                data.activityID=this.$route.params.activityID;
                data.subCompanyID=this.$route.params.subCompanyID;
                this.model.saveFormulae(data).then((res)=>{
                    if(res.data.code==0){
                        dialogs('success','保存成功！');
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