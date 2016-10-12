<template>
    <index :title="'活动执行表'"
           :ptitle="'活动执行表列表'"
           :hname="'activity-effect-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.subCompanyID">
                                <option value="">全部分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <getmonth  :value.sync="defaultData.startDate" ></getmonth>至
                            <getmonth  :value.sync="defaultData.endDate"></getmonth>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" @click="initList" data-ksa="activity_effect_manage.search">查询</a>
                        </div>
                    </form>
                </div>
                <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer" v-cloak>
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th rowspan="2">分公司 </th>
                                <th rowspan="2">合同编号</th>
                                <th rowspan="2">活动ID</th>
                                <th rowspan="2">三方名称</th>
                                <th rowspan="2">活动归属</th>
                                <th rowspan="2">经办人</th>
                                <th rowspan="2">活动名称</th>
                                <th rowspan="2">活动时间</th>
                                <th rowspan="2">活动说明 </th>
                                <th colspan="2">结算金额</th>
                                <th colspan="2">服务费</th>
                                <th colspan="2">广告费</th>
                                <th colspan="2">物料费</th>
                                <th colspan="2">微信营销费</th>
                                <th colspan="2">税费</th>
                                <th rowspan="2">回款金额</th>
                                <th rowspan="2">开票金额 </th>
                                <th rowspan="2">三方应收 </th>
                                <th rowspan="2">商户应补 </th>
                                <th rowspan="2">三方折扣差 </th>
                                <th rowspan="2">佣金 </th>
                                <th rowspan="2">市场毛利 </th>
                                <th rowspan="2">商合毛利 </th>
                                <th rowspan="2">市场毛利率 </th>
                                <th rowspan="2">商合毛利率 </th>
                                <th rowspan="2">活动毛利率 </th>
                                <th rowspan="2">回款账期 </th>
                                <th rowspan="2">备注 </th>
                            </tr>
                            <tr role="row">
                                <th>合同金额</th>
                                <th >实际金额</th>
                                <th>合同金额</th>
                                <th >实际金额</th>
                                <th>合同金额</th>
                                <th >实际金额</th>
                                <th>合同金额</th>
                                <th >实际金额</th>
                                <th>合同金额</th>
                                <th >实际金额</th>
                                <th>合同金额</th>
                                <th >实际金额</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists">
                                <td>{{trlist.subCompanyName}}</td>
                                <td>{{trlist.contractNumber}}</td>
                                <td>{{trlist.activityOperationID}}</td>
                                <td>{{trlist.thirdPartyAccountName}}</td>
                                <td>{{trlist.activityAttribution}}</td>
                                <td>{{trlist.operator}}</td>
                                <td>{{trlist.activityName}}</td>
                                <td>{{trlist.startDate | datetimes}}至{{trlist.endDate | datetimes}}</td>
                                <td>{{trlist.description}}</td>
                                <td>{{trlist.contractSettlementFee/100 | currency ''}}</td>
                                <td>{{trlist.actualSettlementFee/100 | currency ''}}</td>
                                <td>{{trlist.contractServiceFee/100 | currency ''}}</td>
                                <td>{{trlist.actualServiceFee/100 | currency ''}}</td>
                                <td>{{trlist.contractAdvertisementFee/100 | currency ''}}</td>
                                <td>{{trlist.actualAdvertisementFee/100 | currency ''}}</td>
                                <td>{{trlist.contractMaterialFee/100 | currency ''}}</td>
                                <td>{{trlist.actualMaterialFee/100 | currency ''}}</td>
                                <td>{{trlist.contractWeixinMarketFee/100 | currency ''}}</td>
                                <td>{{trlist.actualWeixinMarketFee/100 | currency ''}}</td>
                                <td>{{trlist.contractTaxFee/100 | currency ''}}</td>
                                <td>{{trlist.actualTaxFee/100 | currency ''}}</td>
                                <td>{{trlist.collectAmount/100 | currency ''}}</td>
                                <td>{{trlist.invoiceAmount/100 | currency ''}}</td>
                                <td>{{trlist.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{trlist.thirdPartyDiscountDiff/100 | currency ''}}</td>
                                <td>{{trlist.commission33211/100 | currency ''}}</td>
                                <td>{{trlist.marketGrossProfit/100 | currency ''}}</td>
                                <td>{{trlist.merchantCooperationGrossProfit/100 | currency ''}}</td>
                                <td>
                                    <template v-if="trlist.marketGrossProfitRate">{{trlist.marketGrossProfitRate}}%</template>
                                </td>
                                <td>
                                    <template v-if="trlist.merchantCooperationGrossProfitRate">{{trlist.merchantCooperationGrossProfitRate}}%</template>
                                </td>
                                <td>
                                    <template v-if="trlist.activityGrossProfitRate">{{trlist.activityGrossProfitRate}}%</template>
                                </td>
                                <td>{{trlist.collectPeriod}}</td>
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-footer">
                        <page :all="pageall"
                              :cur.sync="defaultData.pageIndex"
                              :page_size.sync="defaultData.pageSize">
                        </page>
                    </div>
                </div>
                <div class="no-list" v-show="!zdlists.length" >
                    未找到数据
                </div>

            </div>
        </div>
    </index>
</template>
<style lang="sass" scoped>
    table tr{
        td,th{
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        span{
            cursor: pointer;
            color: #3c8dbc;
        &:hover{
             opacity: 80;
         }
        }
    }

    .form-group{
        overflow: hidden;
        line-height: 36px;
    }
    }
</style>
<script>
    import model from '../../ajax/Activity/activity_effect_model'
    export default{
        data(){
            this.model =model(this)
            return{
                pageall:1,
                companylists:[],
                defaultData:{
                    'subCompanyID':'',
                    'year':'',
                    'startMonth':'',
                    'endMonth':'',
                    'startDate':new Date().getFullYear()+'-'+(new Date().getMonth() + 1),
                    'endDate':new Date().getFullYear()+'-'+(new Date().getMonth() + 1),
                    'pageIndex': 1,
                    'pageSize': 10
                },
                shdata:{
                    'subCompanyID':'',
                },
                zdlists:[],
                xhlist:[],
                addId:[],
                id:'',
                firstAdd:false
            }
        },
        methods:{
            // *** 请求活动执行表列表数据
            getZlists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                var startDate = data.startDate.split('-');
                var startYear = parseInt(startDate[0]);
                var startMonth = parseInt(startDate[1]);

                var endDate = data.endDate.split('-');
                var endYear = parseInt(endDate[0]);
                var endMonth = parseInt(endDate[1]);
                if(startYear > endYear || (startYear == endYear && startMonth > endMonth)){
                    dialogs('error','开始年月不能大于结束年月！');
                    return;
                }
                if(startYear != endYear){
                    dialogs('error','不能跨年查询！');
                    return;
                }
                if(startMonth != 1 && startMonth != endMonth){
                    dialogs('error','只能查询某个月份的数据或者从一月份开始的多个月份累计的数据！');
                    return;
                }
                data.year = startYear;
                data.startMonth = startMonth;
                data.endMonth = endMonth;
                this.model.activity_effect_list(data)
                .then((response)=>{
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if(response.data.code==0){
                        this.$set('zdlists', response.data.data)
                        this.$set('pageall', response.data.total)
                    }
                });
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
            initList(){
                $('.modal').modal('hide');
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
            clearUl(){
                this.xhlist=[];
            },
        },
        ready() {
            var vm=this;
            vm.getClist();
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
        },
        watch:{
            'defaultData.pageIndex + defaultData.pageSize'(){
                this.initList();
            }
        }
    }
</script>