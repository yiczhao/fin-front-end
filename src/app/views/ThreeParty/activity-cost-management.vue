<template>
    <index :title="'活动收入成本管理'"
           :ptitle="'银行管理'"
           :hname="'third-party'"
           :isshow="'isshow'">
        <div class="content activity-cost-management" slot="content">
           	<div class="panel panel-flat">
           	 	<ul class="tab-bor">
                    <li data-ksa="third_party_account_manage"><a v-link="{name:'pay-report'}">划付报表</a></li>
                    <li data-ksa="third_party_account_manage"><a v-link="{name:'third-party'}">银行管理</a></li>
                    <li data-ksa="contract" ><a v-link="{name:'contract-management-info'}">合同管理</a></li>
                    <li data-ksa="activity_income_cost_manage" class="active"><a>活动收入成本管理</a></li>
                    <li data-ksa="tax_rate"><a v-link="{name:'taxRate'}">税率管理</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left"></div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="defaultData.subCompanyID">
                                <option value="">全部分公司</option>
                                <option :value="n.subCompanyID" v-for="(index,n) in companylists" v-text="n.name"></option>
                            </select>
                            <input type="text" class="form-control" v-model="defaultData.thirdPartyAccountName" placeholder="银行名称">
                            <input type="text" class="form-control" v-model="defaultData.contractNumber" placeholder="合同编号">
                            <input type="text" class="form-control" v-model="defaultData.activityOperationID" placeholder="活动ID" v-limitnumber="defaultData.activityId">
                            <getmonth :value.sync="date"></getmonth>
                        </form>
                    </div>
                    <div class="heading-middle">
                            <a class="btn btn-info add-top" data-ksa="activity_income_cost_manage.search" @click="initList()">查询</a>
                    </div>
                </div>
                <div v-show="listData.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr class="border-none">
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th style="background:#f1f1f1" colspan="11">收入</th>
                                <th style="background:#e1e1e1" colspan="12">成本</th>
                                <th style="background:#d1d1d1" colspan="3">毛利</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr role="row border-top">
                                <th class="top-none">序号</th>
                                <th class="top-none">分公司</th>
                                <th class="top-none">银行名称</th>
                                <th class="top-none">合同编号</th>
                                <th class="top-none">活动ID</th>
                                <th class="top-none">执行表参数</th>
                                <th>服务费</th>
                                <th>三方应收</th>
                                <th>税费</th>
                                <th>佣金</th>
                                <th>广告费</th>
                                <th>物料费</th>
                                <th>现金红包</th>
                                <th>微信运营</th>
                                <th>其他</th>
                                <th>小计</th>
                                <th class="top-none">合同金额说明</th>
                                <th>商户应补</th>
                                <th>服务费分润</th>
                                <th>折扣差分润</th>
                                <th>佣金分润</th>
                                <th>税费</th>
                                <th>广告费</th>
                                <th>物料费</th>
                                <th>现金红包</th>
                                <th>微信运营</th>
                                <th>资金占用</th>
                                <th>其他</th>
                                <th>小计</th>
                                <th>商合部毛利</th>
                                <th>市场部毛利</th>
                                <th>小计</th>
                                <th class="top-none">活动归属</th>
                                <th class="top-none">经办人</th>
                                <th class="top-none">活动说明</th>
                                <th class="top-none">回款账期</th>
                                <th class="top-none">备注</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in listData" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{index+1}}</td><!-- 序号 -->
                                    <td>{{trlist.subCompanyName}}</td><!-- 分公司 -->
                                    <td>{{trlist.thirdPartyAccountName}}</td><!-- 三方名称 -->
                                    <td>{{trlist.contractNumber}}</td><!-- 合同编号 -->
                                    <td>{{trlist.activityOperationID }}</td><!-- 活动ID -->
                                    <td>
                                        <a data-ksa="activity_income_cost_manage.formulae" v-link="{name:'calculation-formula',params:{'acmActivityID':trlist.activityID,'acmCompanyID':trlist.subCompanyID}}">计算公式</a>
                                        <a data-ksa="activity_income_cost_manage.other_info" @click="otherInfo(trlist.activityID,trlist.subCompanyID)">其他信息</a>
                                    </td><!-- 执行表参数 -->
                                    <!-- 收入 -->
                                    <td>
                                        <span v-if="trlist.incomeServiceAmount==null">--</span>
                                        <span v-else>{{trlist.incomeServiceAmount/100 | currency ''}}</span>
                                    </td><!-- 服务费 -->
                                    <td>
                                        <span v-if="trlist.thirdPartyReceivable==null">--</span>
                                        <span v-else>{{trlist.thirdPartyReceivable/100 | currency ''}}</span>
                                    </td><!-- 三方应收 -->
                                    <td>
                                        <span v-if="trlist.incomeTaxFee==null">--</span>
                                        <span v-else>{{trlist.incomeTaxFee/100 | currency ''}}</span>
                                    </td><!-- 税费 -->
                                    <td>
                                        <span v-if="trlist.incomeCommision==null">--</span>
                                        <span v-else>{{trlist.incomeCommision/100 | currency ''}}</span>
                                    </td><!-- 佣金 -->
                                    <td>
                                        <span v-if="trlist.incomeAdvertisementFee==null">--</span>
                                        <span v-else>{{trlist.incomeAdvertisementFee/100 | currency ''}}</span>
                                    </td><!-- 广告费 -->
                                    <td>
                                        <span v-if="trlist.incomeMaterialFee==null">--</span>
                                        <span v-else>{{trlist.incomeMaterialFee/100 | currency ''}}</span>
                                    </td><!-- 物料费 -->
                                    <td>
                                        <span v-if="trlist.incomeRedPackets==null">--</span>
                                        <span v-else>{{trlist.incomeRedPackets/100 | currency ''}}</span>
                                    </td><!-- 现金红包 -->
                                    <td>
                                        <span v-if="trlist.incomeWeChatMarketFee==null">--</span>
                                        <span v-else>{{trlist.incomeWeChatMarketFee/100 | currency ''}}</span>
                                    </td><!-- 微信运营 -->
                                    <td>
                                        <span v-if="trlist.incomeOther==null">--</span>
                                        <span v-else>{{trlist.incomeOther/100 | currency ''}}</span>
                                    </td><!-- 其他 -->
                                    <td>{{trlist.incomeSum/100 | currency ''}}</td><!-- 小计 -->
                                    <td>{{trlist.contractAmountMemo}}</td><!-- 合同金额说明 -->
                                    <!-- 成本 -->
                                    <td>
                                        <span v-if="trlist.merchantSubsidyShould==null">--</span>
                                        <span v-else>{{trlist.merchantSubsidyShould/100 | currency ''}}</span>
                                    </td><!-- 商户应补 -->
                                    <td>
                                        <span v-if="trlist.costServiceAmount==null">--</span>
                                        <span v-else>{{trlist.costServiceAmount/100 | currency ''}}</span>
                                    </td><!-- 服务费分润 -->
                                    <td>
                                        <span v-if="trlist.costDiscountDiff==null">--</span>
                                        <span v-else>{{trlist.costDiscountDiff/100 | currency ''}}</span>
                                    </td><!-- 折扣差分润 -->
                                    <td>
                                        <span v-if="trlist.costCommision==null">--</span>
                                        <span v-else>{{trlist.costCommision/100 | currency ''}}</span>
                                    </td><!-- 佣金分润 -->
                                    <td>
                                        <span v-if="trlist.costTaxFee==null">--</span>
                                        <span v-else>{{trlist.costTaxFee/100 | currency ''}}</span>
                                    </td><!-- 税费 -->
                                    <td>
                                        <span v-if="trlist.costAdvertisementFee==null">--</span>
                                        <span v-else>{{trlist.costAdvertisementFee/100 | currency ''}}</span>
                                    </td><!-- 广告费 -->
                                    <td>
                                        <span v-if="trlist.costMaterialFee==null">--</span>
                                        <span v-else>{{trlist.costMaterialFee/100 | currency ''}}</span>
                                    </td><!-- 物料费 -->
                                    <td>
                                        <span v-if="trlist.costRedPackets==null">--</span>
                                        <span v-else>{{trlist.costRedPackets/100 | currency ''}}</span>
                                    </td><!-- 现金红包 -->
                                    <td>
                                        <span v-if="trlist.costWeChatMarketFee==null">--</span>
                                        <span v-else>{{trlist.costWeChatMarketFee/100 | currency ''}}</span>
                                    </td><!-- 微信运营 -->
                                    <td>
                                        <span v-if="trlist.costAmountOccupy==null">--</span>
                                        <span v-else>{{trlist.costAmountOccupy/100 | currency ''}}</span>
                                    </td><!-- 资金占用 -->
                                    <td>
                                        <span v-if="trlist.costOther==null">--</span>
                                        <span v-else>{{trlist.costOther/100 | currency ''}}</span>
                                    </td><!-- 其他 -->
                                    <td>{{trlist.costSum/100 | currency ''}}</td><!-- 小计 -->
                                    <!-- 毛利 -->
                                    <td>
                                        <span v-if="trlist.merchantCooperationGrossProfit==null">--</span>
                                        <span v-else>{{trlist.merchantCooperationGrossProfit/100 | currency ''}}</span>
                                    </td><!-- 商合部毛利 -->
                                    <td>
                                        <span v-if="trlist.marketGrossProfit==null">--</span>
                                        <span v-else>{{trlist.marketGrossProfit/100 | currency ''}}</span>
                                    </td><!-- 市场部毛利 -->
                                    <td>
                                        <span v-if="trlist.grossProfitSum==null">--</span>
                                        <span v-else>{{trlist.grossProfitSum/100 | currency ''}}</span>
                                    </td><!-- 小计 -->
                                    <td><!-- 活动归属 -->
                                        <span v-if="trlist.activityAttribution==1">分-分</span>
                                        <span v-if="trlist.activityAttribution==2">总-总</span>
                                        <span v-if="trlist.activityAttribution==3">总-总 分-分</span>
                                    </td>
                                    <td>{{trlist.operator}}</td><!-- 经办人 -->
                                    <td>{{trlist.description}}</td><!-- 活动说明 -->
                                    <td>{{trlist.collectPeriod}}</td><!-- 回款账期 -->
                                    <td>{{trlist.remarks}}</td><!-- 备注 -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-bottom">
                        <div class="left">
                            <a class="icon-file-excel" data-ksa="activity_income_cost_manage.export" style="line-height: 30px;" v-on:click="activityIncomeExcel">Excel导出</a>
                        </div>
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
                <content-dialog
                        :show.sync="modal_other" :type.sync="'infos'" :is-cancel="true"
                        :title.sync="'录入数据'" @kok="saveOther" @kcancel="modal_other=false"
                >
                    <div class="dialog-row">
                        <span>
                             <label>活动归属：</label>
                            <select class="form-control" v-model="redata.activityAttribution">
                                <option value="">请选择活动归属</option>
                                <option value="1">分-分</option>
                                <option value="2">总-总</option>
                                <option value="3">总-总 分-分</option>
                            </select>
                        </span>
                    </div>
                    <div class="dialog-row">
                        <span>
                            <label>经办人：</label>
                             <input type="text" class="form-control" v-model="redata.operator" placeholder="请输入经办人">
                        </span>
                        <span>
                            <label>回款帐期：</label>
                           <input type="text" class="form-control" v-model="redata.collectPeriod" v-limitnumber="redata.collectPeriod" placeholder="请输入回款帐期">
                            个月
                        </span>
                    </div>
                    <div class="dialog-row">
                         <span>
                             <label class="tlabel"><i>*</i>活动说明：</label>
                             <textarea rows="3" class="form-control" v-model="redata.description"></textarea>
                         </span>
                    </div>
                    <div class="dialog-row">
                        <span>
                             <label class="tlabel">备注：</label>
                             <textarea rows="3" class="form-control" v-model="redata.remarks"></textarea>
                        </span>
                    </div>
                </content-dialog>
            </div>
        </div>
	</index>
</template>
<script>
	import model from '../../ajax/ThreeParty/costmanagement_model.js'
	export default{
		data(){
			this.model = model(this);
			return{
                modal_other:false,
                origin:window.origin,
                defaultData:{
                    subCompanyID:'',
                    thirdPartyAccountName:'',
                    contractNumber:'',
                    activityOperationID:'',
                    year:'',
                    month:'',
                    pageIndex:1,
                    pageSize:10
                },
                date:yestodayMonth(),
                pageall:1,
                companylists:[],
                listData:[],
                redata:{
                    "subCompanyID":'',
                    "activityID": '',
                    "activityAttribution": '',
                    "operator": '',
                    "collectPeriod": '',
                    "description": '',
                    "remarks": '',
                },
			}
		},
		methods:{
            setTime(){
                let date,year,month,myDate,today;
                myDate=new Date();
                today=myDate.getDate();
                date =  this.date.split('-');
                year = parseInt(date[0]);
                month = parseInt(date[1]);
                this.defaultData.year = year;
                this.defaultData.month=month;
                // if(today-1!=0){this.defaultData.month = month+1;this.data='2017-5';}else{this.defaultData.month=month};
            },
            initList(){
                this.setTime();
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlist();
            },
            getClist(){
                this.$common_model.getcompany()
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('companylists', response.data.data)
                        }
                    });
            },
            getZlist(){
                 this.model.getCostList(this.defaultData).then((res)=>{
                     if(res.data.code==0){
                         this.$set('listData',res.data.data);
                         this.pageall=res.data.total;
                     }
                 })
            },
            otherInfo(activityID,subCompanyID){
                this.redata={"subCompanyID":'',"activityID": '',"activityAttribution": '',"operator": '',"collectPeriod": '',"description": '',"remarks": ''};
                this.redata.activityID=activityID;
                this.redata.subCompanyID=subCompanyID;
                this.modal_other=true;
                let data={
                    activityID:activityID,
                    subCompanyID:subCompanyID,
                }
                this.model.getOtherInfo(data).then((res)=>{
                    if(res.data.code==0&&!!res.data.data){
                        this.$set('redata',res.data.data);
                    }
                })
            },activityIncomeExcel() {
                if(!this.listData.length>0)return;
                //初始化
                this.defaultData.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.activityIncomeExcel+ $.param(this.defaultData));
            },
            saveOther(){
                if(this.redata.description==''){
                    dialogs('info','请输入活动说明！');
                    return;
                }
                this.model.saveOtherInfo(this.redata).then((res)=>{//保存
                    if(res.data.code==0){
                        dialogs('success','保存成功！');
                        this.modal_other=false;
                        this.redata={};
                        this.initList();
                    }
                })
            },
        },
		ready(){
            var vm=this;
            vm.getClist();
            (vm.$route.params.activityCostNumber!=':activityCostNumber')?vm.defaultData.contractNumber=vm.$route.params.activityCostNumber:null;
            (vm.$route.params.activityCostName!=':activityCostName')?vm.defaultData.thirdPartyAccountName=vm.$route.params.activityCostName:null;
            vm.initList();
        },
        watch:{
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.initList();
            }
        }
	}
</script>