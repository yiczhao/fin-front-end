<template>
    <index :title="'活动收入成本管理'"
           :ptitle="'三方管理'"
           :hname="'third-party'"
           :isshow="'isshow'">
        <div class="content" slot="content">
           	<div class="panel panel-flat">
           	 	<!-- <ul class="tab-bor">
                    <li><a v-link="{name:'third-party'}">账户列表</a></li>
                    <li class="active"><a>活动收入成本管理</a></li>
                </ul> -->
                <div class="heading">
                    <div class="heading-left"></div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="checkForm.subCompanyID">
                                <option value="">全部分公司</option>
                                <option :value="n.subCompanyID" v-for="(index,n) in companylists" v-text="n.name"></option>
                            </select>
                            <input type="number" class="form-control" v-model="checkForm.thirdPartyAccountName" placeholder="三方名称" v-limitnumber="checkForm.operationID">
                            <select class="form-control" v-model="checkForm.contractNumber">
                                <option value="">合同编号</option>
                            </select>
                            <input type="number" class="form-control" v-model="checkForm.activityID" placeholder="活动ID" v-limitnumber="checkForm.activityId">
                        </form>
                    </div>
                    <div class="heading-middle">
                            <a class="btn btn-info add-top" @click="searchData()">查询</a>
                    </div>
                </div>
                <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>序号</th>
                                <th>分公司</th>
                                <th>三方名称</th>
                                <th>合同编号</th>
                                <th>活动ID</th>
                                <th>执行表参数</th>
                                <th>审核状态</th>
                                <th>操作</th>
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
                                <th>合同金额说明</th>
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
                                <th>活动归属</th>
                                <th>经办人</th>
                                <th>活动说明</th>
                                <th>回款账期</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in infoList" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{index+1}}</td><!-- 序号 -->
                                    <td>{{trlist.subCompanyName}}</td><!-- 分公司 -->
                                    <td>{{trlist.thirdPartyAccountName}}</td><!-- 三方名称 -->
                                    <td>{{trlist.contractNumber}}</td><!-- 合同编号 -->
                                    <td>{{trlist.activityID}}</td><!-- 活动ID -->
                                    <td>
                                        <a v-link="{name:'calculation-formula',params:{'acmActivityID':n.activityID}}">计算公式</a>
                                        <a @click="">其他信息</a>
                                    </td><!-- 执行表参数 -->
                                    <td>{{trlist.我的天}}</td><!-- 审核状态 -->
                                    <td>
                                        <a>去审核</a>
                                    </td><!-- 操作 -->
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
                                    <td>{{trlist.activityAttribution}}</td><!-- 活动归属 -->
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
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                       </div>
                    </div>
                </div>
                <div class="no-list" v-else>
                    未找到数据
                </div>
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
                checkForm:{
                    subCompanyID:'',
                    thirdPartyAccountName:'',
                    contractNumber:'',
                    activityID:'',
                    year:'',
                    month:'',
                    pageIndex:1,
                    pageSize:10,
                },
                pageall:1,
                companylists:[],
                infoList:[],
			}
		},
		methods:{
            searchData(){
                console.log('success')
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
            getInfoList(){
                // this.model.getCostList(this.checkForm).then((res)=>{
                //     if(res.data.code==0){
                //         this.$set('infoList',res.data.data);
                //         this.pageall=res.data.total;
                //     }
                // })
            },
        },
		ready(){
            var vm=this;
            vm.getClist();
            vm.getInfoList();
        },
	}
</script>