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
                            <getmonth :value.sync="defaultData.startDate"></getmonth>
                            <span class="getmonth-span">至</span>
                            <getmonth :value.sync="defaultData.endDate"></getmonth>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" @click="initList" data-ksa="activity_effect_manage.search">查询</a>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" v-on:click="export" data-ksa="pay_recheck.export">导出</a>
                        </div>
                    </form>
                </div>
                <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer" v-cloak>
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>分公司 </th>
                                <th>合同编号</th>
                                <th>活动ID</th>
                                <th>三方名称</th>
                                <th>活动归属</th>
                                <th>经办人</th>
                                <th>活动名称</th>
                                <th>活动时间</th>
                                <th>活动说明 </th>
                                <th width="200">
                                    <div>结算金额</div>
                                    <div>
                                        <span>合同金额</span>
                                        <span>实际金额</span>
                                    </div>
                                </th>
                                <th width="200">
                                    <div>服务费</div>
                                    <div>
                                        <span>合同金额</span>
                                        <span>实际金额</span>
                                    </div>
                                </th>
                                <th width="200">
                                    <div>广告费</div>
                                    <div>
                                        <span>合同金额</span>
                                        <span>实际金额</span>
                                    </div>
                                </th>
                                <th width="200">
                                    <div>物料费</div>
                                     <div>
                                        <span>合同金额</span>
                                        <span>实际金额</span>
                                    </div>
                                </th>
                                <th width="200">
                                    <div>微信营销费</div>
                                     <div>
                                        <span>合同金额</span>
                                        <span>实际金额</span>
                                    </div>
                                </th>
                                <th width="200">
                                    <div>税费</div>
                                     <div>
                                        <span>合同金额</span>
                                        <span>实际金额</span>
                                    </div>
                                </th>
                                <th>回款金额</th>
                                <th>开票金额 </th>
                                <th>三方应收 </th>
                                <th>商户应补 </th>
                                <th>三方折扣差 </th>
                                <th>佣金 </th>
                                <th>市场毛利 </th>
                                <th>商合毛利 </th>
                                <th>市场毛利率 </th>
                                <th>商合毛利率 </th>
                                <th>活动毛利率 </th>
                                <th>回款账期 </th>
                                <th>备注 </th>
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
                                <td>
                                    <span>{{trlist.contractSettlementFee/100 | currency ''}}</span>
                                    <span>{{trlist.actualSettlementFee/100 | currency ''}}</span>
                                </td>
                                <td>
                                    <span>{{trlist.contractServiceFee/100 | currency ''}}</span>
                                    <span>{{trlist.actualServiceFee/100 | currency ''}}</span>
                                </td>
                                <td>
                                    <span>{{trlist.contractAdvertisementFee/100 | currency ''}}</span>
                                    <span>{{trlist.actualAdvertisementFee/100 | currency ''}}</span>
                                </td>
                                <td>
                                    <span>{{trlist.contractMaterialFee/100 | currency ''}}</span>
                                    <span>{{trlist.actualMaterialFee/100 | currency ''}}</span>
                                </td>
                                <td>
                                    <span>{{trlist.contractWeixinMarketFee/100 | currency ''}}</span>
                                    <span>{{trlist.actualWeixinMarketFee/100 | currency ''}}</span>
                                </td>
                                <td>
                                    <span>{{trlist.contractTaxFee/100 | currency ''}}</span>
                                    <span>{{trlist.actualTaxFee/100 | currency ''}}</span>
                                </td>
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
    .form-group{
        div{
            margin-right: 0
        }
        .getmonth-span{
            position: relative;
            top: -5px;
            margin: 0 5px;
        }
    }
    th{
        div{
            text-align: center;
            span{
                display: inline-block;
                padding: 10px 10px 0;
            }
        }
    }
        td{
            span{
                color:#444;
                display: inline-block;
                width: 50%;
                text-align: center;
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
                    'startDate':'',
                    'endDate':'',
                    'pageIndex': 1,
                    'pageSize': 10,
                    'mid': ''
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
            export(){
                var startDate =  this.defaultData.startDate.split('-');
                var startYear = parseInt(startDate[0]);
                var startMonth = parseInt(startDate[1]);

                var endDate =  this.defaultData.endDate.split('-');
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
                this.defaultData.year = startYear;
                this.defaultData.startMonth = startMonth;
                this.defaultData.endMonth = endMonth;
                this.defaultData.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.activityEffectExcel+ $.param(this.defaultData));
            },
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