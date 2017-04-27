<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'费用管理'"
           :ptitle="'报表管理'"
           :hname="'financial-index-total'"
           :isshow="'isshow'">
        <div class="content expense-management" slot="content">
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
                            <select class="form-control" v-model="checkForm.subCompanyID">
                                <option value="">全部分公司</option>
                                <option :value="n.subCompanyID" v-for="(index,n) in companylists" v-text="n.name"></option>
                            </select>
                            <select class="form-control" v-model="checkForm.budget">
                                <option value="">预算/实际</option>
                            </select>
                            <select class="form-control" v-model="checkForm.budgetType">
                                <option value="">选择费用类型</option>
                                <option value="0">工资</option>
                            </select>
                            <getmonth :value.sync="checkForm.date"></getmonth>
                        </form>
                    </div>
                    <div class="heading-middle">
                            <a class="btn btn-info add-top" @click="searchData()">查询</a>
                    </div>
                </div>
                <!-- <div v-show="listData.length>0" class="dataTables_wrapper no-footer"> -->
                <div class="dataTables_wrapper no-footer">
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
                                <!-- <tr role="row" v-for="(index,trlist) in listData" v-bind:class="{'odd':(index%2==0)}"> -->
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
                        :show.sync="type_in" :is-button="true" :is-cancle="true" :type.sync="'infos'"
                        :title.sync="typeTitle" @kok="runTest" @kcancel="type_in=false"
                        >
                    <validator name="vali" v-if="typeTitle=='实际费用录入'">
                        <div class="form-group">
                            <label><i>*</i>分公司</label>
                            <select class="form-control" v-model="infaceList.subCompanyID" v-validate:val1="['required']">
                                <option value="">请选择分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
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
                            <label><i>*</i>时间</label>
                            <getmonth :value.sync="infaceList.date"></getmonth>
                        </div>
                        <div class="form-group">
                            <label><i>*</i>金额</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="infaceList.amount" maxlength="15" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入金额</span> -->
                        </div>
                    </validator>
                    <validator name="vali" v-if="typeTitle=='预算录入'">
                        <div class="form-group">
                            <label><i>*</i>分公司</label>
                            <select class="form-control" v-model="budgetList.subCompanyID" v-validate:val1="['required']">
                                <option value="">请选择分公司</option>
                                <option value="" v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label><i>*</i>费用类型</label>
                            <select class="form-control" v-model="budgetList.expenseType" v-validate:val1="['required']">
                                <option value="">请选择费用类型</option>
                                <!-- <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option> -->
                            </select>
                        </div>
                        <div class="form-group" v-for="(index,value) in timeList">
                            <label><i>*</i>2017年{{$index+1}}月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="budgetList.info[index]" maxlength="15" placeholder="">
                        </div>
                    </validator>
                </content-dialog>
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
                type_in:false,
                typeTitle:'',
                checkForm:{
                    subCompanyID:'',
                    budget:'',
                    budgetType:'',
                    date:'',
                    year:'',
                    month:'',
                    pageIndex: 1,
                    pageSize: 10,
                },
                infaceList:{
                    subCompanyID:'',
                    expenseType:'',
                    department:'',
                    date:'',
                    amount:'',
                },
                budgetList:{
                    subCompanyID:'',
                    expenseType:'',
                    info:[],
                },
                pageall:1,
                companylists:[],
                timeList:['1','2','3','4','5','6','7','8','9','10','11','12']
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
            typeIn(title){
                this.type_in=true;
                if(title=='infact'){
                    this.typeTitle='实际费用录入';
                }else{
                    this.typeTitle='预算录入';
                }
                console.log(this.typeTitle);
            },
            searchData(){
                this.setTime();
                this.checkForm.pageIndex=1;
                //this.getAllData();//没有接口
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
            budgetTypeIn(){
                this.model.costBugetTypeIn(this.budgetList).then((res)=>{
                    if(res.data.code==0){

                    }
                })
            },
            runTest(){
                console.log('success')
            },
        },
		ready(){
            this.getClist();
		},
	}
</script>