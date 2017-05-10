<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'财务指标分析表（分）'"
           :ptitle="'报表管理'"
           :hname="'financial-index-total'"
           :isshow="'isshow'">
        <div class="content financial-index-branch" slot="content">
           	<div class="panel panel-flat">
           	 	<ul class="tab-bor">
                    <li><a v-link="{name:'financial-index-total'}">财务指标分析表（总）</a></li>
                    <li class="active"><a>财务指标分析表（分）</a></li>
                    <li><a v-link="{name:'branch-financial-indicators'}">财务指标排行</a></li>
                    <li><a v-link="{name:'expense-management'}">费用管理</a></li>
                    <li><a v-link="{name:'index-management'}">指标管理</a></li>
                    <li><a v-link="{name:'departmental-expense-detail'}">部门费用明细</a></li>
                    <li><a v-link="{name:'allopatry-distribution-total'}">异地激活收入成本分配总表</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left"></div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="checkForm.subCompanyId">
                                <option value="">全部分公司</option>
                                <option :value="n.subCompanyID" v-for="(index,n) in companylists" v-text="n.name"></option>
                            </select>
                            <select class="form-control" v-model="checkForm.itemId">
                                <option value="">项目</option>
                                <option :value="n.id" v-text="n.name" v-for="(index,n) in item"></option>
                            </select>
                            <select class="form-control" v-model="checkForm.businessId">
                                <option value="">业务名称</option>
                                <option :value="n.id" v-text="n.name" v-for="(index,n) in business"></option>
                            </select>
                            <select class="form-control" v-model="checkForm.businessDetailId">
                                <option value="">业务明细项目</option>
                                <option :value="n.id" v-text="n.name" v-for="(index,n) in itemDetail"></option>
                            </select>
                            <getmonth :value.sync="date"></getmonth>
                        </form>
                    </div>
                    <div class="heading-middle">
                            <a class="btn btn-info add-top" @click="initList()" >查询</a>
                    </div>
                </div>
                <div v-show="listData.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>序号</th>
                                <th>分公司</th>
                                <th>项目</th>
                                <th>业务名称</th>
                                <th>业务明细项目</th>
                                <th>收入 </th>
                                <th>成本</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in listData" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{index+1}}</td>
                                    <td>{{trlist.subCompanyName }}</td><!-- 分公司 -->
                                    <td>{{trlist.itemName  }}</td><!-- 项目 -->
                                    <td>{{trlist.businessName  }}</td><!-- 业务名称 -->
                                    <td>{{trlist.businessDetailName  }}</td><!-- 业务明细项目 -->
                                    <td>{{trlist.income/100 | currency ''  }}</td><!-- 收入 -->
                                    <td>{{trlist.cost/100 | currency ''}}</td><!-- 成本 -->
                                </tr>
                                <tr>
                                    <td>合计：</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{{totalData.incomeTotal/100 | currency ''}}</td>
                                    <td>{{totalData.costTotal/100 | currency ''}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-bottom">
                        <!-- <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px" @click="export">Excel导出</a>
                        </div> -->
                        <div class="right">
                            <page :all="pageall"
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                       </div>
                    </div>
                    <div v-show="listData.length>0" style="padding:20px">
                        <span style="font-size: 16px;margin-right: 20px;">费用:{{totalData.spendTotal/100 | currency ''}}</span>
                        <span style="font-size: 16px;margin-right: 20px;">净利润:{{totalData.profitTotal/100 | currency ''}}</span>
                        <span style="font-size: 16px;margin-right: 20px;">净利率:{{totalData.profitRateTotal}}%</span>
                        <span style="font-size: 16px;margin-right: 20px;">净利润指标完成率:{{totalData.targetFinishTotal}}%</span>
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
    import model from '../../ajax/ReportForm/report_form_model.js'
	export default{
		data(){
			this.model = model(this);
			return{
                checkForm:{
                    subCompanyId:'',
                    itemId:'',
                    businessId:'',
                    businessDetailId:'',
                    year:'',
                    month:'',
                    pageIndex: 1,
                    pageSize: 10,
                },
                date:yestodayMonth(),
                pageall:1,
                item:[],
                business:[],
                itemDetail:[],
                companylists:[],
                listData:[],
                totalData:[],
			}
		},
		methods:{
            setTime(){
                var date =  this.date.split('-');
                var year = parseInt(date[0]);
                var month = parseInt(date[1]);
                this.checkForm.year = year;
                this.checkForm.month = month;
            },
            initList(){
                this.setTime();
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getZlists(this.checkForm);
            },
            getClist(){
                this.$common_model.getcompany(data)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('companylists', response.data.data)
                        }
                    });
                //获取搜索条件-查询业务(选项)
                this.model.getSearchBusiness().then((res)=>{
                    if(res.data.code==0){
                        this.$set('business',res.data.data);
                    }
                })
                //获取搜索条件-查询项目(选项)
                this.model.getSearchItem().then((res)=>{
                    if(res.data.code==0){
                        this.$set('item',res.data.data);
                    }
                })
                //获取搜索条件-查询业务项目明细(选项)
                this.model.getSearchBusinessDetail().then((res)=>{
                    if(res.data.code==0){
                        this.$set('itemDetail',res.data.data);
                    }
                })
            },
            getZlists(data){
                this.model.getBranchFinanceSum(data).then((res)=>{
                    if(res.data.code==0){
                        this.$set('totalData',res.data.data);
                    }
                })
                this.model.getBranchFinanceList(data).then((res)=>{
                    if(res.data.code==0){
                        this.$set('listData',res.data.data);
                        this.$set('pageall',res.data.total);
                    }
                });
            },
        },
		ready(){
            this.getClist();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.initList();
		},
        watch:{
            'checkForm.pageIndex+checkForm.pageSize'(){
                this.initList();
            }
        }
	}
</script>