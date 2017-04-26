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
                            <select class="form-control" v-model="checkForm.subCompanyID">
                                <option value="">全部分公司</option>
                                <option :value="n.subCompanyID" v-for="(index,n) in companylists" v-text="n.name"></option>
                            </select>
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
                                <tr role="row" v-for="(index,trlist) in listData" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{index+1}}</td><!-- {{排名}} -->
                                    <td>{{listData.subCompanyName }}</td><!-- {{分公司}} -->
                                    <td>{{listData.income }}</td><!-- {{收入}} -->
                                    <td>{{listData.cost }}</td><!-- {{成本}} -->
                                    <td>{{listData.费用}}</td><!-- {{费用}} -->
                                    <td>{{listData.profit }}</td><!-- {{净利润}} -->
                                    <td>{{listData.profitRate }}</td><!-- {{净利率}} -->
                                    <td>{{listData.profitFinished }}</td><!-- {{净利润指标完成率}} -->
                                </tr>
                            </template>
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
                    subCompanyID:'',
                    date:'',
                    year:'',
                    month:'',
                    pageIndex: 1,
                    pageSize: 10,
                    mid:'',
                },
                pageall:1,
                companylists:[],
                listData:{},
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
                this.setTime();
                this.checkForm.pageIndex=1;
                this.getAllData();
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
            getAllData(){
                this.model.getFinanceRanking(this.checkForm).then((res)=>{
                    if(res.data.code==0){
                        this.$set('listData',res.data.data);
                    }
                })
            },
        },
		ready(){
            this.getClist();
            this.getAllData();
		},
	}
</script>