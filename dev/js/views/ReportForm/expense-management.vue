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
                        :title.sync="typeTitle" @kok="saveChange()" @kcancel="cancel()"
                        >
                    <validator name="vali" v-if="typeTitle=='实际费用录入'">
                        <div class="form-group">
                            <label><i>*</i>分公司</label>
                            <select class="form-control" v-model="infaceList.subCompanyID" @change="showType()">
                                <option value="">请选择分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label><i>*</i>费用类型</label>
                            <select class="form-control" v-model="infaceList.subject">
                                <option value="">请选择费用类型</option>
                                <option v-for="(index,n) in costType" v-text="n.name" :value="n.id"></option>
                            </select>
                            <!-- <span v-if="$vali.val1.required && fire1" class="validation-error-label">请选择费用类型</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>部门</label>
                            <select class="form-control" v-model="infaceList.department">
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
                            <input type="text" class="form-control" v-model="infaceList.amount" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入金额</span> -->
                        </div>
                    </validator>
                    <validator name="vali" v-if="typeTitle=='预算录入'">
                        <div class="form-group">
                            <label><i>*</i>分公司</label>
                            <select class="form-control" v-model="budgetList.subCompanyId" @change="showType()">
                                <option value="">请选择分公司</option>
                                <option value="" v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label><i>*</i>费用类型</label>
                            <select class="form-control" v-model="budgetList.subject" @change="showType()">
                                <option value="">请选择费用类型</option>
                                <option v-for="(index,n) in costType" v-text="n.name" :value="n.id"></option>
                            </select>
                        </div>
                        <div class="form-group" v-for="(index,value) in timeList">
                            <label><i>*</i>2017年{{$index+1}}月</label>
                            <input type="text" class="form-control" v-model="budgetList.amountList[index]" placeholder="">
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
                    // subCompanyID:'',
                    // subject:'',
                    // department:'',
                    // date:'',
                    // amount:'',
                },
                budgetList:{
                    // subCompanyId:'',
                    // subject:'',
                    // year:'2017',
                    // amountList:[],
                },
                pageall:1,
                companylists:[],
                costType:{},
                timeList:['1','2','3','4','5','6','7','8','9','10','11','12'],

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
                this.model.costCommonTypeIn().then((res)=>{
                    if(res.data.code==0){
                        this.$set('costType',res.data.data)
                    }
                })
                if(title=='infact'){
                    this.typeTitle='实际费用录入';
                    this.infaceList={subCompanyID:'',subject:'',department:'',date:getNowMonth(),amount:''};
                }else{
                    this.typeTitle='预算录入';
                    this.budgetList={subCompanyId:'',subject:'',year:'2017',amountList:[]};
                }
            },
            cancel(){
                this.infaceList={date:getNowMonth()};
                this.budgetList={amountList:[]};
                this.type_in=false;
            },
            searchData(){
                this.setTime();
                this.checkForm.pageIndex=1;
                back_json.saveArray(this.$route.path,this.checkForm);
                //this.getAllData();//没有接口
            },
            getClist(){
                // *** 请求公司数据
                let data={
                    'type':'ImportUser'
                }
                this.$common_model.getcompany(data).then((res)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(res.data.code==0){
                            this.$set('companylists', res.data.data)
                        }
                    });
            },
            saveChange(){
                this.model.costBugetTypeInP(this.budgetList).then((res)=>{
                    if(res.data.code==0){
                        dialogs('success','保存成功！');
                        this.type_in=false;
                    }
                });
            },
            showType(){
                if(!!this.budgetList.subCompanyId&&!!this.budgetList.subject){
                    this.model.costBugetTypeInG(this.budgetList).then((res)=>{
                        if(res.data.code==0){
                            this.$set('budgetList.amountList',res.data.data.amountList)
                        }
                    });
                }
            },
        },
		ready(){
            this.getClist();
		},
        watch:{
            'checkForm.pageIndex+checkForm.pageSize'(){
                this.initList();
            }
        }
	}
</script>