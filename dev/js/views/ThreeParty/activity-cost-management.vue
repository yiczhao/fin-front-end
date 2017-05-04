<template>
    <index :title="'活动收入成本管理'"
           :ptitle="'三方结算管理'"
           :hname="'third-party'"
           :isshow="'isshow'">
        <div class="content activity-cost-management" slot="content">
           	<div class="panel panel-flat">
           	 	<ul class="tab-bor">
                    <li data-ksa="third_party_account_manage"><a v-link="{name:'third-party'}">三方管理</a></li>
                    <li data-ksa="activity_manage"><a v-link="{name:'contract-management-info'}">合同管理</a></li>
                    <li class="active"><a>活动收入成本管理</a></li>
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
                            <input type="text" class="form-control" v-model="defaultData.thirdPartyAccountName" placeholder="三方名称">
                            <input type="text" class="form-control" v-model="defaultData.contractNumber" placeholder="合同编号">
                            <input type="text" class="form-control" v-model="defaultData.activityOperationID" placeholder="活动ID" v-limitnumber="defaultData.activityId">
                            <getmonth :value.sync="date"></getmonth>
                        </form>
                    </div>
                    <div class="heading-middle">
                            <a class="btn btn-info add-top" @click="initList()">查询</a>
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
                                <th class="top-none">三方名称</th>
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
                                        <a v-link="{name:'calculation-formula',params:{'acmActivityID':trlist.activityID,'acmCompanyID':trlist.subCompanyID}}">计算公式</a>
                                        <a @click="otherInfo(trlist.activityID,trlist.subCompanyID)">其他信息</a>
                                    </td><!-- 执行表参数 -->
                                    <!-- 收入 -->
                                    <td>{{trlist.incomeServiceAmount}}</td><!-- 服务费 -->
                                    <td>{{trlist.thirdPartyReceivable}}</td><!-- 三方应收 -->
                                    <td>{{trlist.incomeTaxFee}}</td><!-- 税费 -->
                                    <td>{{trlist.incomeCommision}}</td><!-- 佣金 -->
                                    <td>{{trlist.incomeAdvertisementFee }}</td><!-- 广告费 -->
                                    <td>{{trlist.incomeMaterialFee}}</td><!-- 物料费 -->
                                    <td>{{trlist.incomeRedPackets}}</td><!-- 现金红包 -->
                                    <td>{{trlist.incomeWeChatMarketFee}}</td><!-- 微信运营 -->
                                    <td>{{trlist.incomeOther}}</td><!-- 其他 -->
                                    <td>{{trlist.incomeSum}}</td><!-- 小计 -->
                                    <td>{{trlist.contractAmountMemo}}</td><!-- 合同金额说明 -->
                                    <!-- 成本 -->
                                    <td>{{trlist.merchantSubsidyShould}}</td><!-- 商户应补 -->
                                    <td>{{trlist.costServiceAmount}}</td><!-- 服务费分润 -->
                                    <td>{{trlist.costDiscountDiff}}</td><!-- 折扣差分润 -->
                                    <td>{{trlist.costCommision}}</td><!-- 佣金分润 -->
                                    <td>{{trlist.costTaxFee}}</td><!-- 税费 -->
                                    <td>{{trlist.costAdvertisementFee }}</td><!-- 广告费 -->
                                    <td>{{trlist.costMaterialFee}}</td><!-- 物料费 -->
                                    <td>{{trlist.costRedPackets}}</td><!-- 现金红包 -->
                                    <td>{{trlist.costWeChatMarketFee}}</td><!-- 微信运营 -->
                                    <td>{{trlist.costAmountOccupy}}</td><!-- 资金占用 -->
                                    <td>{{trlist.costOther}}</td><!-- 其他 -->
                                    <td>{{trlist.costSum}}</td><!-- 小计 -->
                                    <!-- 毛利 -->
                                    <td>{{trlist.merchantCooperationGrossProfit}}</td><!-- 商合部毛利 -->
                                    <td>{{trlist.marketGrossProfit}}</td><!-- 市场部毛利 -->
                                    <td>{{trlist.grossProfitSum}}</td><!-- 小计 -->
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
                            <a class="icon-file-excel" style="line-height: 30px;" @click="">Excel导出</a>
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
                defaultData:{
                    subCompanyID:'',
                    thirdPartyAccountName:'',
                    contractNumber:'',
                    activityOperationID:'',
                    year:'',
                    month:'',
                    pageIndex:1,
                    pageSize:10,
                },
                date:'',
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
                var date =  this.date.split('-');
                var year = parseInt(date[0]);
                var month = parseInt(date[1]);
                this.defaultData.year = year;
                this.defaultData.month = month;
            },
            initList(){
                this.setTime();
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlist();
            },
            getClist(){
                // *** 请求公司数据
                let data={
                    'type':'ImportUser'
                }
                this.$common_model.getcompany(data)
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
            },
            saveOther(){
                if(this.redata.description==''){
                    dialogs('info','请输入活动说明！');
                    return;
                }
                this.model.saveOtherInfo(this.redata).then((res)=>{//保存
                    if(res.data.code==0){
                        dialogs('success','保存成功！');
                    }
                })
                this.modal_other=false;
                this.redata={};
                this.initList();
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