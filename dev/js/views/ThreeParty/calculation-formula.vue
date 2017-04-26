<template>
    <index :title="'计算公式'"
           :ptitle="'三方管理'"
           :p2title="'活动收入成本管理'"
           :hname="'third-party'"
           :h2name="'activity-cost-management'"
           :isshow="'isshow'">
        <div class="content calculation-formula" slot="content">
            <div class="panel panel-flat">
                <div class="panel-title"><span class="btn btn-primary" data-ksa="activity_manage.config" @click="loadDault()">加载默认公式</span></div>
                <div style="margin: 0 0 20px 20px;font-size: 18px;">
                    <span>活动名称：</span><span style="margin-right: 10px;">{{activityName}}</span>
                    <span>活动ID：</span><span style="margin-right: 10px;">{{operationID}}</span>
                    <span><i style="color:red">*</i>合同：</span><span style="margin-right: 10px;">压缩包文件名</span>
                    <span class="btn btn-primary" @click="">下载</span>
                </div>
                <div class="other-info">
                	<span>注：收入小计需要设置公式来计算，成本小计直接取各个成本项的和，无需编辑计算公式</span>
                </div>
                <div class="part_1">收入<span>根绝合同中的规定，直接录入或者编辑计算公式来确认活动的收入</span></div>
                <div class="panel-row">
                    <div class="col">
                        <div>服务费=</div>
                        <v-select :editable="!defaultData.actualAdvertisementFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.incomeServiceFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>税费=</div>
                        <v-select :editable="!defaultData.contractAdvertisementFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.incomeTaxFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>广告费=</div>
                        <v-select :editable="!defaultData.actualMaterialFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.incomeAdvertisementFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>物料费=</div>
                        <v-select :editable="!defaultData.contractMaterialFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.incomeMaterialFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>现金红包=</div>
                        <v-select :editable="!defaultData.actualWeChatMarketFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.incomeRedPacketFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>微信运营=</div>
                        <v-select :editable="!defaultData.contractWeChatMarketFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.incomeWeChatMarketFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>其他=</div>
                        <v-select :editable="!defaultData.actualServiceFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.incomeOtherExpense" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>收入小计=</div>
                        <v-select :editable="!defaultData.contractServiceFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.incomeSum" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="part_1 part_2">成本<span>根绝合同中的规定，直接录入或者编辑计算公式来确认活动的成本</span></div>
                <div class="panel-row">
                    <div class="col">
                        <div>服务费分润=</div>
                        <v-select :editable="!defaultData.actualTaxFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.costServiceFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>税费=</div>
                        <v-select :editable="!defaultData.contractTaxFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.costTaxFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>现金红包=</div>
                        <v-select :editable="!defaultData.actualSettlementFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.costRedPacketFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>微信运营=</div>
                        <v-select :editable="!defaultData.contractSettlementFeeStatus" :multiple="true" :taggable="true" :value.sync="defaultData.costWeChatMarketFee" :options="chooseData"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>资金占用=</div>
                        <v-select :editable="!defaultData.actualOtherExpenseStatus" :multiple="true" :taggable="true" :value.sync="defaultData.costFundOccupyFee" :options="chooseData"></v-select>
                    </div>
                    <div class="col">
                        <div>其他=</div>
                        <div style="width: 100%;"><input type="text" class="form-control" v-model="defaultData.costOtherExpense" placeholder="其他费用备注"></div>
                    </div>
                </div>
                <div class="panel-footer">
                    <span class="btn btn-primary" @click="saveDefault()">设为默认公式</span>
                    <span class="btn btn-primary" @click="submit()">保存</span>
                </div>
            </div>
        </div>
    </index>
</template>
<script>
	import vSelect from "../components/vue-select/vue-select.vue"
    import model from '../../ajax/ThreeParty/costmanagement_model.js'
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
                operationID:'',
                getDataDefault:{
                	activityName:'',
                	contractFileID:'',
                },
                defaultData:{
                	activityID:'',
                	subCompanyID:'',
                	id:'',//活动收入成本计算公式主键ID
                    incomeServiceFee:'',
                    incomeTaxFee:[],
                    incomeAdvertisementFee:[],
                    incomeMaterialFee:[],
                    incomeRedPacketFee:[],
                    incomeWeChatMarketFee:[],
                    incomeOtherExpense:[],
                    incomeSum:[],
                    costServiceFee:[],
                    costTaxFee:[],
                    costRedPacketFee:[],
                    costWeChatMarketFee:[],
                    costFundOccupyFee:[],
                    costOtherExpense:[]
                },
            }
        },
        methods:{
            loadDault(){
            	this.model.getDefaultFormulae(this.getDataDefault.subCompanyID).then((res)=>{
            		if(res.data.code==0){
            			// this.$set('defaultData',res.data.data)
            			console.log('success')
            		}
            	})
            },
            getFormulae(){
            	let data={
            		activityID:this.getDataDefault.activityID,
            		subCompanyID:this.getDataDefault.subCompanyID,
            	}
            	this.model.getFormulae(data).then((res)=>{
            		if(res.data.code==0){
            			// this.$set('defaultData',res.data.data)
            			console.log('success')
            		}
            	})
            },
            submit(){
            	this.model.saveFormulae(this.defaultData).then((res)=>{
            		if(res.data.code==0){
            			// this.defaultData.id=res.data.data.id;
            			console.log('success')
            		}
            	})
            },
            saveDefault(){
            	if(!this.defaultData.id){
            		dialogs('info','请先保存公式再设为默认公式！');
            		return
            	};
            	this.model.saveDefaultFormulae(this.defaultData.id).then((res)=>{
            		if(res.data.code==0){
            			console.log('success')
            		}
            	})
            },
        },
        ready() {
            // (this.$route.params.formulaeName!=':formulaeName')?this.activityName=this.$route.params.formulaeName:null;
            (this.$route.params.acmActivityID!=':acmActivityID')?this.defaultData.activityID=this.$route.params.acmActivityID:null;//活动主键id
            (this.$route.params.OperationID!=':OperationID')?this.getDataDefault.z=this.$route.params.OperationID:null;//活动主键id
            (this.$route.params.acmCompanyID!=':acmCompanyID')?this.getDataDefault.subCompanyID=this.$route.params.acmCompanyID:null;//分公司ID
            (this.$route.params.acmContractID!=':acmContractID')?this.getDataDefault.contractFileID=this.$route.params.acmContractID:null;//合同编号id
            this.getFormulae();
        },
        watch:{
        }
    }
</script>