<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'指标管理'"
           :ptitle="'报表管理'"
           :hname="'financial-index-total'"
           :isshow="'isshow'">
        <div class="content index-management" slot="content">
           	<div class="panel panel-flat">
           	 	<ul class="tab-bor">
                    <li><a v-link="{name:'financial-index-total'}">财务指标分析表（总）</a></li>
                    <li><a v-link="{name:'financial-index-branch'}">财务指标分析表（分）</a></li>
                    <li><a v-link="{name:'branch-financial-indicators'}">财务指标排行</a></li>
                    <li><a v-link="{name:'expense-management'}">费用管理</a></li>
                    <li class="active"><a>指标管理</a></li>
                    <li><a v-link="{name:'departmental-expense-detail'}">部门费用明细</a></li>
                    <li><a v-link="{name:'allopatry-distribution-total'}">异地激活收入成本分配总表</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add" @click="indexIn()">指标录入</a>
                    </div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="checkForm.company">
                                <option value="">分公司</option>
                            </select>
                            <select class="form-control" v-model="dateS" @change="getTime">
                                <option value="5">今天</option>
                                <option value="0">昨天</option>
                                <option value="1">最近一周</option>
                                <option value="2">最近一个月</option>
                                <option value="3">最近三个月</option>
                                <option value="4">自定义时间</option>
                            </select>
                            <div v-show="dateS==4"  class="inline">
                                <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                                <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                            </div>
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
                                <th>分公司</th>
                                <th>年份</th>
                                <th>年收入目标</th>
                                <th>年净利润目标 </th>
                                <th>1月（元）</th>
                                <th>2月（元）</th>
                                <th>3月（元）</th>
                                <th>4月（元）</th>
                                <th>5月（元）</th>
                                <th>6月（元）</th>
                                <th>7月（元）</th>
                                <th>8月（元）</th>
                                <th>9月（元）</th>
                                <th>10月（元）</th>
                                <th>11月（元）</th>
                                <th>12月（元）</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template>
                                <!-- <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}"> -->
                                <tr role="row">
                                    <!-- <td>{{index+1}}</td> 序号-->
                                    <th></th><!-- {{序号}} -->
                                    <th></th><!-- {{分公司}} -->
                                    <th></th><!-- {{年份}} -->
                                    <th></th><!-- {{年收入目标}} -->
                                    <th></th><!-- {{年净利润目标}} -->
                                    <th></th><!-- {{1月（元）}} -->
                                    <th></th><!-- {{2月（元）}} -->
                                    <th></th><!-- {{3月（元）}} -->
                                    <th></th><!-- {{4月（元）}} -->
                                    <th></th><!-- {{5月（元）}} -->
                                    <th></th><!-- {{6月（元）}} -->
                                    <th></th><!-- {{7月（元）}} -->
                                    <th></th><!-- {{8月（元）}} -->
                                    <th></th><!-- {{9月（元）}} -->
                                    <th></th><!-- {{10月（元）}} -->
                                    <th></th><!-- {{11月（元）}} -->
                                    <th></th><!-- {{12月（元）}} -->
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
                <content-dialog
                        :show.sync="type_in" :is-button="true" :is-cancle="true" :type.sync="'infos'"
                        :title.sync="'指标录入'" @kok="saveChange" @kcancel="this.type_in=false"
                        >
                    <validator name="vali">
                        <div class="form-group">
                            <label><i>*</i>分公司</label>
                            <select class="form-control" v-model="typeIn.companyId" v-validate:val1="['required']">
                                <option value="">请选择分公司</option>
                                <!-- <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option> -->
                            </select>
                            <!-- <span v-if="$vali.val1.required && fire1" class="validation-error-label">请选择分公司</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>年份</label>
                            <span>2017年</span>
                        </div>
                        <div class="form-group">
                            <label><i>*</i>2017年1月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="typeIn.Jan" maxlength="15" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入时间</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>2017年2月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="typeIn.Feb" maxlength="15" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入时间</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>2017年3月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="typeIn.Mar" maxlength="15" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入时间</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>2017年4月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="typeIn.Apr" maxlength="15" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入时间</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>2017年5月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="typeIn.May" maxlength="15" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入时间</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>2017年6月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="typeIn.Jun" maxlength="15" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入时间</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>2017年7月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="typeIn.Jul" maxlength="15" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入时间</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>2017年8月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="typeIn.Aug" maxlength="15" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入时间</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>2017年9月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="typeIn.Sept" maxlength="15" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入时间</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>2017年10月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="typeIn.Oct" maxlength="15" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入时间</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>2017年11月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="typeIn.Nov" maxlength="15" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入时间</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>2017年12月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="typeIn.Dec" maxlength="15" placeholder="">
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
                checkForm:{
                    company:'',
                    startDate:'',
                    endDate:'',
                    pagIndex: 1,
                    pageSize: 10,
                },
                dateS:'3',
                typeIn:{
                    companyId:'',
                    Jan:'',
                    Feb:'',
                    Mar:'',
                    Apr:'',
                    May:'',
                    Jun:'',
                    Jul:'',
                    Aug:'',
                    Sept:'',
                    Oct:'',
                    Nov:'',
                    Dec:'',
                },
                pageall:1,
			}
		},
		methods:{
            getTime(){
                this.checkForm.startDate=init_date(this.dateS)[0];
                this.checkForm.endDate=init_date(this.dateS)[1];
            },
            indexIn(){
                this.type_in=true;
            },
            saveChange(){
                this.type_in=false;
                console.log('success');
            },
            searchData(){
                this.checkForm.pageIndex=1;
            },
        },
		ready(){

		},
	}
</script>