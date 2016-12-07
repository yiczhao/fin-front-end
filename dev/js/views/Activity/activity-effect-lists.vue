<template>
    <index :title="'活动执行表'"
           :ptitle="'活动列表'"
           :hname="'activity-effect-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="activity_manage"><a v-link="{name:'activity-lists'}">活动列表</a></li>
                    <li data-ksa="tax_rate"><a v-link="{name:'taxRate'}">税率管理</a></li>
                    <li data-ksa="activity_effect_manage" class="active"><a v-link="{name:'activity-effect-lists'}">活动执行表</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                    </div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="defaultData.subCompanyID">
                                <option value="">全部分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>

                            <getmonth :value.sync="defaultData.startDate"></getmonth>
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="checkNew" data-ksa="activity_effect_manage.search" style="margin-left: -60px;">查询</a>
                    </div>
                </div>

                <div  v-show="!!zdlists.length" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer" v-cloak>
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
                                <th>折扣差 </th>
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
                            <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.subCompanyName}}</td>
                                <td>{{trlist.contractNumber}}</td>
                                <td>{{trlist.activityOperationID}}</td>
                                <td>{{trlist.thirdPartyAccountName}}</td>
                                <td>
                                    <span v-if="trlist.activityAttribution==1">分-分</span>
                                    <span v-if="trlist.activityAttribution==2">总-总</span>
                                </td>
                                <td>{{trlist.operator}}</td>
                                <td>{{trlist.activityName}}</td>
                                <td>{{trlist.startDate | datetimes}}至{{trlist.endDate | datetimes}}</td>
                                <td aria-label="{{trlist.description}}" v-bind:class="{'hint--top':(trlist.description!=null&&trlist.description.length>15)}">
                                    {{trlist.description | substring 15}}
                                </td>
                                <td>
                                    <span v-if="trlist.contractSettlementFee==null">--</span>
                                    <span v-else>{{trlist.contractSettlementFee/100 | currency ''}}</span>
                                    <span v-if="trlist.actualSettlementFee==null">--</span>
                                    <span v-else>{{trlist.actualSettlementFee/100 | currency ''}}</span>
                                </td>
                                <td>
                                    <span v-if="trlist.contractServiceFee==null">--</span>
                                    <span v-else>{{trlist.contractServiceFee/100 | currency ''}}</span>
                                    <span v-if="trlist.actualServiceFee==null">--</span>
                                    <span v-else>{{trlist.actualServiceFee/100 | currency ''}}</span>
                                </td>
                                <td>
                                    <span v-if="trlist.contractAdvertisementFee==null">--</span>
                                    <span v-else>{{trlist.contractAdvertisementFee/100 | currency ''}}</span>
                                    <span v-if="trlist.actualAdvertisementFee==null">--</span>
                                    <span v-else>{{trlist.actualAdvertisementFee/100 | currency ''}}</span>
                                </td>
                                <td>
                                    <span v-if="trlist.contractMaterialFee==null">--</span>
                                    <span v-else>{{trlist.contractMaterialFee/100 | currency ''}}</span>
                                    <span v-if="trlist.actualMaterialFee==null">--</span>
                                    <span v-else>{{trlist.actualMaterialFee/100 | currency ''}}</span>
                                </td>
                                <td>
                                    <span v-if="trlist.contractWeChatMarketFee==null">--</span>
                                    <span v-else>{{trlist.contractWeChatMarketFee/100 | currency ''}}</span>
                                    <span v-if="trlist.actualWeChatMarketFee==null">--</span>
                                    <span v-else>{{trlist.actualWeChatMarketFee/100 | currency ''}}</span>
                                </td>
                                <td>
                                    <span v-if="trlist.contractTaxFee==null">--</span>
                                    <span v-else>{{trlist.contractTaxFee/100 | currency ''}}</span>
                                    <span v-if="trlist.actualTaxFee==null">--</span>
                                    <span v-else>{{trlist.actualTaxFee/100 | currency ''}}</span>
                                </td>
                                <td>
                                    <template v-if="trlist.collectAmount==null">--</template>
                                    <template v-else>{{trlist.collectAmount/100 | currency ''}}</template>
                                </td>
                                <td>
                                    <template v-if="trlist.invoiceAmount==null">--</template>
                                    <template v-else>{{trlist.invoiceAmount/100 | currency ''}}</template>
                                </td>
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
                                <td aria-label="{{trlist.remarks}}" v-bind:class="{'hint--top':(trlist.remarks!=null&&trlist.remarks.length>15)}">
                                    {{trlist.remarks | substring 15}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">
                       <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" v-on:click="export" data-ksa="activity_effect_manage.export">Excel导出</a>
                       </div>

                       <div class="right">
                            <page :all="pageall"
                                  :cur.sync="defaultData.pageIndex"
                                  :page_size.sync="defaultData.pageSize">
                            </page>
                       </div>
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
                    'month':'',
                    'startDate':firstMonth(),
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
                var year = parseInt(startDate[0]);
                var month = parseInt(startDate[1]);

                this.defaultData.year = year;
                this.defaultData.startMonth = month;
                this.defaultData.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.activityEffectExcel+ $.param(this.defaultData));
            },
            // *** 请求活动执行表列表数据
            getZlists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                var startDate = data.startDate.split('-');
                var year = parseInt(startDate[0]);
                var month = parseInt(startDate[1]);

                data.year = year;
                data.month = month;
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
            checkNew(){
                this.defaultData.pageIndex=1;
                this.initList();
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