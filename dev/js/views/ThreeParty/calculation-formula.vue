<template>
    <index :title="'计算公式'"
           :ptitle="'三方管理'"
           :p2title="'活动收入成本管理'"
           :hname="'third-party'"
           :2hname="'activity-cost-management'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-title"><span class="btn btn-primary" data-ksa="activity_manage.config" @click="usedefalut">加载默认公式</span></div>
                <div style="margin: 0 0 20px 20px;font-size: 18px;">
                    <span>活动名称：</span><span style="margin-right: 10px;">{{activityName}}</span>
                    <span>活动ID：</span><span style="margin-right: 10px;">{{activityID}}</span>
                    <span><i>*</i>合同：</span><span style="margin-right: 10px;">压缩包文件名</span>
                    <span class="btn btn-primary" @click="">下载</span>
                </div>
                <div>
                	<span>注：收入小计需要设置公式来计算，成本小计直接取各个成本项的和，无需编辑计算公式</span>
                </div>
                <div>收入<span>根绝合同中的规定，直接录入或者编辑计算公式来确认活动的收入</span></div>
                <div class="panel-row">
                    <div class="col">
                        <div>服务费=</div>
                        <v-select :editable="!defaultData.actualAdvertisementFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.actualAdvertisementFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>税费=</div>
                        <v-select :editable="!defaultData.contractAdvertisementFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.contractAdvertisementFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>广告费=</div>
                        <v-select :editable="!defaultData.actualMaterialFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.actualMaterialFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>物料费=</div>
                        <v-select :editable="!defaultData.contractMaterialFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.contractMaterialFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>现金红包=</div>
                        <v-select :editable="!defaultData.actualWeChatMarketFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.actualWeChatMarketFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>微信运营=</div>
                        <v-select :editable="!defaultData.contractWeChatMarketFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.contractWeChatMarketFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>其他=</div>
                        <v-select :editable="!defaultData.actualServiceFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.actualServiceFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>收入小计=</div>
                        <v-select :editable="!defaultData.contractServiceFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.contractServiceFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div>成本<span>根绝合同中的规定，直接录入或者编辑计算公式来确认活动的成本</span></div>
                <div class="panel-row">
                    <div class="col">
                        <div>服务费分润=</div>
                        <v-select :editable="!defaultData.actualTaxFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.actualTaxFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>税费=</div>
                        <v-select :editable="!defaultData.contractTaxFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.contractTaxFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>现金红包=</div>
                        <v-select :editable="!defaultData.actualSettlementFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.actualSettlementFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>微信运营=</div>
                        <v-select :editable="!defaultData.contractSettlementFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.contractSettlementFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>资金占用=</div>
                        <v-select :editable="!defaultData.actualOtherExpenseStatus" :multiple="true" :taggable="true" :value.sync="defaultData.actualOtherExpense" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>其他</div>
                        <div style="width: 100%;"><input type="text" class="form-control" v-model="defaultData.otherExpenseRemarks" placeholder="其他费用备注"></div>
                    </div>
                </div>
                <div class="panel-footer">
                    <span class="btn btn-primary" @click="setdefaultFormulae">设为默认公式</span>
                    <span class="btn btn-primary" @click="submit">保存</span>
                    <span class="btn btn-primary" @click="">退出</span>
                </div>
            </div>
        </div>
    </index>
</template>
<script>
	import vSelect from "../components/vue-select/vue-select.vue"
    // import model from '../../ajax/'
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
                    '交易笔数',
                    '商户应补金额',
                    '实际其他费用',
                ],
                activityName:'',
                activityID:'',
                defaultData:{
                    otherExpenseRemarks:'',
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
                    actualOtherExpense:[],
                    contractSettlementFee:[]
                }
            }
        },
        methods:{
            toStrings(value){
                let a=[];
                if(typeof value==="object"){
                    value.map((val,index)=>{
                        a[index]='【'+val+'】'
                    })
                    return a.join("")
                }
                return value;
            },
            getsubitData(){
                let data={};
                _.forEach(this.defaultData,(value,key)=>{
                    if(value!=null){
                        data[key]=this.toStrings(value);
                    }else{
                        data[key]="";
                    }
                })
                return data;
            },
            enString(value){
                if(!value ||typeof value !='string'||value.indexOf('】')<0){
                    return value;
                }
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
                            data[key]=this.enString(value);
                        })
                        this.$set('defaultData',data);
                    }
                })
            },
            usedefalut(){
                let data={
                    subCompanyID:this.$route.params.subCompanyID,
                    activityID:this.$route.params.activityID
                }
                this.model.useDefault(data).then((res)=>{
                    if(res.data.code==0){
                        if(!res.data.data){
                            dialogs('info','无默认公式！')
                            return;
                        }
                        let data={};
                        _.forEach(res.data.data,(value,key)=>{
                            data[key]=this.enString(value);
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
            // (this.$route.params.formulaeName!=':formulaeName')?this.activityName=this.$route.params.formulaeName:null;
            (this.$route.params.formulaeID!=':acmActivityID')?this.activityID=this.$route.params.acmActivityID:null;
            this.getList();
        },
        watch:{
        }
    }
</script>