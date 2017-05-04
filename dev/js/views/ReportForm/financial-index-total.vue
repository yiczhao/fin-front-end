<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'财务指标分析表（总）'"
           :ptitle="'报表管理'"
           :hname="'financial-index-total'"
           :isshow="'isshow'">
        <div class="content financial-index-total" slot="content">
           	<div class="panel panel-flat">
           	 	<ul class="tab-bor">
                    <li class="active"><a>财务指标分析表（总）</a></li>
                    <li><a v-link="{name:'financial-index-branch'}">财务指标分析表（分）</a></li>
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
                            <select class="form-control" v-model="defaultData.itemId">
                                <option value="">项目</option>
                                <option :value="n.id" v-text="n.name" v-for="(index,n) in item"></option>
                            </select>
                            <select class="form-control" v-model="defaultData.businessId">
                                <option value="">业务名称</option>
                                <option :value="n.id" v-text="n.name" v-for="(index,n) in business"></option>
                            </select>
                            <select class="form-control" v-model="defaultData.businessDetailId">
                                <option value="">业务明细项目</option>
                                <option :value="n.id" v-text="n.name" v-for="(index,n) in itemDetail"></option>
                            </select>
                            <getmonth :value.sync="date"></getmonth>
                        </form>
                    </div>
                    <div class="heading-middle">
                            <a class="btn btn-info add-top" @click="initList">查询</a>
                    </div>
                </div>
                <div v-show="listData.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>序号</th>
                                <th>项目</th>
                                <th>业务名称</th>
                                <th>业务明细项目</th>
                                <th>收入 </th>
                                <th>成本</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trlist) in listData" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{index+1}}</td><!-- {{序号}} -->
                                <td>{{trlist.itemNname}}</td><!-- {{项目}} -->
                                <td>{{trlist.businessName}}</td><!-- {{业务名称}} -->
                                <td>{{trlist.businessDetailName}}</td><!-- {{业务明细项目}} -->
                                <td>{{trlist.income}}</td><!-- {{收入}} -->
                                <td>{{trlist.cost}}</td><!-- {{成本}} -->
                            </tr>
                            <tr>
                                <td>合计：</td>
                                <td></td>
                                <td>费用:{{totalData.costTotal}}</td><!--{{费用}} -->
                                <td>净利润:{{totalData.profitTotal}}</td><!--{{净利润}} -->
                                <td>净利率:{{totalData.profitRateTotal}}</td><!--{{净利率}} -->
                                <td>净利润指标完成率:{{totalData.targetFinishTotal}}</td><!--{{净利润指标完成率}} -->
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-bottom">
                        <!-- <div class="left">
                            <a class="icon-file-excel" @click="export()">Excel导出</a>
                        </div> -->
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
                defaultData:{
                    itemId:'',
                    businessId:'',
                    businessDetailId:'',
                    year:'',
                    month:'',
                    pageIndex: 1,
                    pageSize: 10,
                    mid:'',
                },
                date:'',
                dateS:'3',
                pageall:1,
                business:[],
                item:[],
                itemDetail:[],
                listData:[],
                totalData:[],
			}
		},
		methods:{
            getSlist(){
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
            getZlists(){
                this.model.getTotalFinanceSum(this.defaultData).then((res)=>{
                    if(res.data.code==0){
                        this.$set('totalData',res.data.data);//获取合计信息
                    }
                })
                this.model.getTotalFinanceList(this.defaultData).then((res)=>{
                    if(res.data.code==0){
                        this.$set('listData',res.data.data);//获取数据列表填充到表格模型
                    }
                });
            },
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
                this.getZlists()
            },
        },
		ready(){
            this.getSlist();
            this.initList();
		},
        watch:{
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.initList();
            }
        }
	}
</script>