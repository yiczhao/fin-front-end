<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'财务指标分析表（总）'"
           :ptitle="'报表管理'"
           :hname="'financial-index-total'"
           :isshow="'isshow'">
        <div class="content" slot="content">
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
                            <select class="form-control" v-model="checkForm.itemId">
                                <option value="">项目</option>
                            </select>
                            <select class="form-control" v-model="checkForm.businessId">
                                <option value="">业务名称</option>
                            </select>
                            <select class="form-control" v-model="checkForm.businessDetailId">
                                <option value="">业务明细项目</option>
                            </select>
                            <getmonth :value.sync="checkForm.date"></getmonth>
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
                                <th>项目</th>
                                <th>业务名称</th>
                                <th>业务明细项目</th>
                                <th>收入 </th>
                                <th>成本</th>
                                <!-- <th>费用</th> -->
                                <!-- <th>净利润</th> -->
                                <!-- <th>净利率 </th> -->
                                <!-- <th>净利润指标完成率</th> -->
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trlist) in listData" v-bind:class="{'odd':(index%2==0)}">
                            <tr role="row">
                                <!-- <td>{{index+1}}</td>{{序号}} -->
                                <!-- <td>{{trlist.itemNname}}</td>{{项目}} -->
                                <!-- <td>{{trlist.businessName}}</td>{{业务名称}} -->
                                <!-- <td>{{trlist.businessDetailName}}</td>{{业务明细项目}} -->
                                <!-- <td>{{trlist.income}}</td>{{收入}} -->
                                <!-- <td>{{trlist.cost}}</td>{{成本}} -->
                            </tr>
                            <tr>
                                <!-- <td>{{trlist.spend}}</td>{{费用}} -->
                                <!-- <td>{{trlist.profit}}</td>{{净利润}} -->
                                <!-- <td>{{trlist.profitRate}}</td>{{净利率}} -->
                                <!-- <td>{{trlist.profitFinished}}</td>{{净利润指标完成率}} -->
                            </tr>
                            <tr>
                                <td>合计：</td>
                                <td></td>
                                <!-- <td></td> -->
                                <!-- <td></td> -->
                                <!-- <td></td> -->
                                <!-- <td></td> -->
                                <td>{{totalData.costTotal}}</td><!--{{费用}} -->
                                <td>{{totalData.profitTotal}}</td><!--{{净利润}} -->
                                <td>{{totalData.profitRateTotal}}</td><!--{{净利率}} -->
                                <td>{{totalData.targetFinishTotal}}</td><!--{{净利润指标完成率}} -->
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-bottom">
                        <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" @click="export()">Excel导出</a>
                        </div>
                        <div class="right">
                        <!-- v-if="zdlists.length>0"  -->
                            <page :all="pageall"
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                       </div>
                    </div>
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
                    itemId:'',
                    businessId:'',
                    businessDetailId:'',
                    date:'',
                    year:'',
                    month:'',
                    pageIndex: 1,
                    pageSize: 10,
                    mid:'',
                },
                dateS:'3',
                pageall:1,
                listData:{},
                totalData:{},
			}
		},
		methods:{
            setTime(){
                var date =  this.checkForm.date.split('-');
                var year = parseInt(date[0]);
                var month = parseInt(date[1]);
                this.checkForm.year = year;
                this.checkForm.month = month;
            },
            export(){
                console.log('success');
                this.setTime();
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                // window.open(window.origin+this.$API.activityEffectExcel+ $.param(this.checkForm));
            },
            searchData(){
                this.checkForm.pageIndex=1;
                this.setTime();
                this.getAllData();
            },
            getAllData(){
                // this.model.getTotalFinanceList(this.checkForm).then((res)=>{
                //     if(res.data.code==0){
                //         this.$set('totalData',res.data.data);
                //     }
                // });
                // this.model.getTotalFinanceSum(this.checkForm).then((res)=>{
                //     if(res.data.code==0){
                //         this.$set('listData',res.data.data);
                //     }
                // })
            },
        },
		ready(){
            this.getAllData();
            this.getAllData();
		},
	}
</script>