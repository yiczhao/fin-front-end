<template>
    <index :title="'计算公式'"
           :ptitle="'三方结算管理'"
           :p2title="'活动收入成本管理'"
           :hname="'third-party'"
           :h2name="'activity-cost-management'"
           :isshow="'isshow'">
        <div class="content calculation-formula" slot="content">
            <div class="panel panel-flat">
                <div class="panel-title"><span class="btn btn-primary" data-ksa="activity_manage.config" @click="loadDault()">加载默认公式</span></div>
                <div style="margin: 0 0 20px 20px;font-size: 18px;">
                    <span>活动名称：</span><span style="margin-right: 10px;">{{defaultData.activityName}}</span>
                    <span>活动ID：</span><span style="margin-right: 10px;">{{defaultData.activityOperationID}}</span>
                    <span v-if="!!defaultData.contractFileID">合同：</span><span style="margin-right: 10px;"></span>
                    <a class="btn btn-primary" v-if="!!defaultData.contractFileID" href="{{origin}}/file/download/{{defaultData.contractFileID}}">下载</a>
                </div>
                <div class="other-info">
                	<span>注：收入小计需要设置公式来计算，成本小计直接取各个成本项的和，无需编辑计算公式</span>
                </div>
                <div class="part_1">收入<span>根据合同中的规定，直接录入或者编辑计算公式来确认活动的收入</span></div>
                <div class="panel-row">
                    <div class="col">
                        <div>服务费=</div>
                        <v-select :editable="true" :multiple="true" :taggable="true" :value.sync="defaultData.incomeServiceFee" :options="chooseData_income"></v-select>
                    </div>
                    <div class="col">
                        <div>税费=</div>
                        <v-select :editable="true" :multiple="true" :taggable="true" :value.sync="defaultData.incomeTaxFee" :options="chooseData_income"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>广告费=</div>
                        <v-select :editable="true" :multiple="true" :taggable="true" :value.sync="defaultData.incomeAdvertisementFee" :options="chooseData_income"></v-select>
                    </div>
                    <div class="col">
                        <div>物料费=</div>
                        <v-select :editable="true" :multiple="true" :taggable="true" :value.sync="defaultData.incomeMaterialFee" :options="chooseData_income"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>现金红包=</div>
                        <v-select :editable="true" :multiple="true" :taggable="true" :value.sync="defaultData.incomeRedPacketFee" :options="chooseData_income"></v-select>
                    </div>
                    <div class="col">
                        <div>微信运营=</div>
                        <v-select :editable="true" :multiple="true" :taggable="true" :value.sync="defaultData.incomeWeChatMarketFee" :options="chooseData_income"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>其他=</div>
                        <v-select :editable="true" :multiple="true" :taggable="true" :value.sync="defaultData.incomeOtherExpense" :options="chooseData_income"></v-select>
                    </div>
                    <div class="col">
                        <div>收入小计=</div>
                        <v-select :editable="true" :multiple="true" :taggable="true" :value.sync="defaultData.incomeSum" :options="chooseData_income"></v-select>
                    </div>
                </div>
                <div class="part_1 part_2">成本<span>根据合同中的规定，直接录入或者编辑计算公式来确认活动的成本</span></div>
                <div class="panel-row">
                    <div class="col">
                        <div>服务费分润=</div>
                        <v-select :editable="true" :multiple="true" :taggable="true" :value.sync="defaultData.costServiceFee" :options="chooseData_cost"></v-select>
                    </div>
                    <div class="col">
                        <div>税费=</div>
                        <v-select :editable="true" :multiple="true" :taggable="true" :value.sync="defaultData.costTaxFee" :options="chooseData_cost"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>现金红包=</div>
                        <v-select :editable="true" :multiple="true" :taggable="true" :value.sync="defaultData.costRedPacketFee" :options="chooseData_cost"></v-select>
                    </div>
                    <div class="col">
                        <div>微信运营=</div>
                        <v-select :editable="true" :multiple="true" :taggable="true" :value.sync="defaultData.costWeChatMarketFee" :options="chooseData_cost"></v-select>
                    </div>
                </div>
                <div class="panel-row">
                    <div class="col">
                        <div>资金占用=</div>
                        <v-select :editable="true" :multiple="true" :taggable="true" :value.sync="defaultData.costFundOccupyFee" :options="chooseData_cost"></v-select>
                    </div>
                    <div class="col">
                        <div>其他=</div>
                        <v-select :editable="true" :multiple="true" :taggable="true" :value.sync="defaultData.costOtherExpense" :options="chooseData_cost"></v-select>
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
                origin:window.origin,
                chooseData_income:[
                    '三方应收',
                    '交易笔数',
                    '收入小计',
                ],
                chooseData_cost:[
                    '税率',
                    '收入小计',
                ],
                defaultData:{
                    id:'',
                    activityName:'',
                    activityOperationID:'',
                    contractFileID:'',
                    activityID:'',
                    subCompanyID:'',
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
            enString(value){
                if(!value ||typeof value !='string'||value.indexOf('】')<0){
                    return value;
                }
                let a=value.split('】');
                _.remove(a,(n)=>{return n==''});
                let b=a.map(function (val){ return val.replace('【','')})
                return b;
            },
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
            loadDault(){
            	this.model.getDefaultFormulae(this.defaultData.subCompanyID).then((res)=>{
            		if(res.data.code==0){
            			if(!res.data.data){
                            dialogs('info','无默认公式！')
                            return;
                        }
                        let data=_.cloneDeep(this.defaultData);
                        _.forEach(res.data.data,(value,key)=>{
                            if(key!='id'&&key!='subCompanyID'&&key!='activityOperationID'&&key!='activityName'&&key!='activityID'&&key!='contractFileID'){
                                data[key]=this.enString(value);
                            }
                        })
                        this.$set('defaultData',data);
                        dialogs('success','加载成功！')
            		}else{
                        this.defaultData.id='';
                    }
            	})
            },
            getFormulae(){
                let data={
                    activityID:this.defaultData.activityID,
                    subCompanyID:this.defaultData.subCompanyID,
                }
            	this.model.getFormulae(data).then((res)=>{
            		if(res.data.code==0){
                        let data={};
                        _.forEach(res.data.data,(value,key)=>{
                            data[key]=this.enString(value);
                        })
                        this.$set('defaultData',data);
            		}
            	})
            },
            submit(){
                let data=this.getsubitData();
            	this.model.saveFormulae(data).then((res)=>{
            		if(res.data.code==0){
            			this.defaultData.id=res.data.data;
                        dialogs('success','保存成功！');
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
            			dialogs('success','设置成功！');
            		}
            	})
            },
        },
        ready() {
            (this.$route.params.acmActivityID!=':acmActivityID')?this.defaultData.activityID=this.$route.params.acmActivityID:null;//活动主键id
            (this.$route.params.acmCompanyID!=':acmCompanyID')?this.defaultData.subCompanyID=this.$route.params.acmCompanyID:null;//分公司ID
            this.getFormulae();
        },
    }
</script>