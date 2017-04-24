<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'财务指标排行'"
           :ptitle="'报表管理'"
           :hname="'financial-index-total'"
           :isshow="'isshow'">
        <div class="content" slot="content">
           	<div class="panel panel-flat">
           	 	<ul class="tab-bor">
                    <li><a v-link="{name:'financial-index-total'}">财务指标分析表（总）</a></li>
                    <li><a v-link="{name:'financial-index-branch'}">财务指标分析表（分）</a></li>
                    <li class="active"><a>财务指标排行</a></li>
                    <li><a v-link="{name:'expense-management'}">费用管理</a></li>
                    <li><a v-link="{name:'index-management'}">指标管理</a></li>
                    <li><a v-link="{name:'departmental-expense-detail'}">部门费用明细</a></li>
                    <li><a v-link="{name:'allopatry-distribution-total'}">异地激活收入成本分配总表</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left"></div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="checkForm.company">
                                <option value="">分公司</option>
                            </select>
                        </form>
                    </div>
                    <div class="heading-middle">
                            <a class="btn btn-info add-top" @click="" >查询</a>
                    </div>
                </div>
                <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>排名</th>
                                <th>分公司</th>
                                <th>收入</th>
                                <th>成本</th>
                                <th>费用 </th>
                                <th>净利润</th>
                                <th>净利率</th>
                                <th>净利润指标完成率</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template>
                                <!-- <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}"> -->
                                <tr role="row">
                                    <!-- <td>{{index+1}}</td> -->
                                    <td></td><!-- {{排名}} -->
                                    <td></td><!-- {{分公司}} -->
                                    <td></td><!-- {{收入}} -->
                                    <td></td><!-- {{成本}} -->
                                    <td></td><!-- {{费用}} -->
                                    <td></td><!-- {{净利润}} -->
                                    <td></td><!-- {{净利率}} -->
                                    <td></td><!-- {{净利润指标完成率}} -->
                                </tr>
                            </template>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-bottom">
                        <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" @click="">Excel导出</a>
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
	// import model from '../../ajax/'
	export default{
		data(){
			// this.model = model(this);
			return{
                checkForm:{
                    company:'',
                    pageIndex: 1,
                    pageSize: 10,
                },
                pageall:1,
			}
		},
		methods:{
            getTime(){},
        },
		ready(){

		},
	}
</script>