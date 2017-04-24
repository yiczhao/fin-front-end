<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'费用管理'"
           :ptitle="'报表管理'"
           :hname="'financial-index-total'"
           :isshow="'isshow'">
        <div class="content" slot="content">
           	<div class="panel panel-flat">
           	 	<ul class="tab-bor">
                    <li><a v-link="{name:'financial-index-total'}">财务指标分析表（总）</a></li>
                    <li><a v-link="{name:'financial-index-branch'}">财务指标分析表（分）</a></li>
                    <li><a v-link="{name:'branch-financial-indicators'}">财务指标排行</a></li>
                    <li class="active"><a>费用管理</a></li>
                    <li><a v-link="{name:'index-management'}">指标管理</a></li>
                    <li><a v-link="{name:'departmental-expense-detail'}">部门费用明细</a></li>
                    <li><a v-link="{name:'allopatry-distribution-total'}">异地激活收入成本分配总表</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add" @click="typeIn('infact')" >实际费用录入</a>
                        <a class="btn btn-add" @click="typeIn('budget')" >预算录入</a>
                    </div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="checkForm.company">
                                <option value="">分公司</option>
                            </select>
                            <select class="form-control" v-model="checkForm.budget">
                                <option value="">预算/实际</option>
                            </select>
                            <select class="form-control" v-model="checkForm.budgetType">
                                <option value="">选择费用类型</option>
                                <option value="0">工资</option>
                            </select>
                            <select class="form-control" v-model="checkForm.dateS" @change="getTime">
                                <option value="5">今天</option>
                                <option value="0">昨天</option>
                                <option value="1">最近一周</option>
                                <option value="2">最近一个月</option>
                                <option value="3">最近三个月</option>
                                <option value="4">自定义时间</option>
                            </select>
                            <div v-show="checkForm.dateS==4"  class="inline">
                                <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                                <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                            </div>
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
                                <th>序号</th>
                                <th>分公司</th>
                                <th>预算/实际</th>
                                <th>员工人数</th>
                                <th>小计</th>
                                <th>毛利占比</th>
                                <th>工资</th>
                                <th>毛利占比</th>
                                <th>社保公积金</th>
                                <th>毛利占比</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template>
                                <!-- <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}"> -->
                                <tr role="row">
                                    <!-- <td>{{index+1}}</td>序号 -->
                                    <td></td><!-- {{序号}} -->
                                    <td></td><!-- {{分公司}} -->
                                    <td></td><!-- {{预算/实际}} -->
                                    <td></td><!-- {{员工人数}} -->
                                    <td></td><!-- {{小计}} -->
                                    <td></td><!-- {{毛利占比}} -->
                                    <td></td><!-- {{工资}} -->
                                    <td></td><!-- {{毛利占比}} -->
                                    <td></td><!-- {{社保公积金}} -->
                                    <td></td><!-- {{毛利占比}} -->
                                </tr>
                            </template>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-bottom">
                        <div class="right">
                        <!-- v-if="zdlists.length>0"  -->
                            <page :all="pageall"
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                       </div>
                    </div>
                </div>
                <content-dialog
                        :show.sync="type_in" :is-button="false" :type.sync="'infos'"
                        :title.sync="'typeTitle'"
                        >
                    <validator name="vali" v-show="typeTitle=='infact'">
                        <div class="form-group">
                            <label><i>*</i>分公司</label>
                            <select class="form-control" v-model="infaceList.companyId" v-validate:val1="['required']">
                                <option value="">请选择分公司</option>
                                <!-- <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option> -->
                            </select>
                            <!-- <span v-if="$vali.val1.required && fire1" class="validation-error-label">请选择分公司</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>费用类型</label>
                            <select class="form-control" v-model="infaceList.expenseType" v-validate:val1="['required']">
                                <option value="">请选择费用类型</option>
                                <!-- <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option> -->
                            </select>
                            <!-- <span v-if="$vali.val1.required && fire1" class="validation-error-label">请选择费用类型</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>部门</label>
                            <select class="form-control" v-model="infaceList.department" v-validate:val1="['required']">
                                <option value="">请选择部门</option>
                                <option value="1">总经办</option>
                                <option value="2">商合部</option>
                                <option value="3">市场部</option>
                                <option value="4">运营支撑部</option>
                                <option value="5">综合部</option>
                            </select>
                            <!-- <span v-if="$vali.val1.required && fire1" class="validation-error-label">请选择费用类型</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>起始日期</label>
                            <datepicker :width="'79%'" :readonly="true" :value.sync="infaceList.startDate | datetimes" format="YYYY-MM-DD"></datepicker>
                            <span v-show="timeerror">请选择起始日期</span>
                        </div>
                        <div class="form-group">
                            <label><i>*</i>结束日期</label>
                            <datepicker :width="'79%'" :readonly="true" :value.sync="infaceList.endDate | datetimes" format="YYYY-MM-DD"></datepicker>
                            <span v-show="timeerror">请选择结束日期</span>
                        </div>
                        <div class="form-group">
                            <label><i>*</i>金额</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="infaceList.amount" maxlength="15" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入金额</span> -->
                        </div>
                        <div class="form-group">
                            <span v-show="saveerror!=''" class="validation-error-label" v-text="saveerror"></span>
                        </div>
                    </validator>
                    <validator name="vali" v-show="typeTitle=='budget'">
                        <div class="form-group">
                            <label><i>*</i>分公司</label>
                            <select class="form-control" v-model="budgetList.companyId" v-validate:val1="['required']">
                                <option value="">请选择分公司</option>
                                <!-- <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option> -->
                            </select>
                            <!-- <span v-if="$vali.val1.required && fire1" class="validation-error-label">请选择分公司</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>费用类型</label>
                            <select class="form-control" v-model="budgetList.expenseType" v-validate:val1="['required']">
                                <option value="">请选择费用类型</option>
                                <!-- <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option> -->
                            </select>
                            <!-- <span v-if="$vali.val1.required && fire1" class="validation-error-label">请选择费用类型</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>2017年1月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="budgetList.January" maxlength="15" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入时间</span> -->
                        </div>
                    </validator>
                </content-dialog>
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
                type_in:false,
                typeTitle:'',
                checkForm:{
                    company:'',
                    budget:'',
                    budgetType:'',
                    dateS:'',
                    startDate:'',
                    endDate:'',
                    pageIndex: 1,
                    pageSize: 10,
                },
                infaceList:{
                    companyId:'',
                    expenseType:'',
                    department:'',
                    startDate:'',
                    endDate:'',
                    amount:'',
                },
                budgetList:{
                    companyId:'',
                    expenseType:'',
                    January:'',
                },
                pageall:1,
			}
		},
		methods:{
            getTime(){},
            typeIn(title){
                this.type_in=true;
                (title!='infact')?this.typeTitle='预算录入':this.typeTitle='实际费用录入';
            },
        },
		ready(){

		},
	}
</script>