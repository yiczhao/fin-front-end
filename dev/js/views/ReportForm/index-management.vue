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
                            <select class="form-control" v-model="checkForm.subCompanyID">
                                <option value="">全部分公司</option>
                                <option :value="n.subCompanyID" v-for="(index,n) in companylists" v-text="n.name"></option>
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
                                <tr role="row" v-for="(index,trlist) in listData" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{index+1}}</td>
                                    <th>{{trlist.subCompanyName}}</th><!-- {{分公司}} -->
                                    <th>{{trlist.year}}</th><!-- {{年份}} -->
                                    <th>{{trlist.yearTarget}}百万</th><!-- {{年收入目标}} -->
                                    <th>{{trlist.yearProfitTarget}}</th><!-- {{年净利润目标}} -->
                                    <th>{{trlist.january}}</th><!-- {{1月（元）}} -->
                                    <th>{{trlist.february}}</th><!-- {{2月（元）}} -->
                                    <th>{{trlist.march}}</th><!-- {{3月（元）}} -->
                                    <th>{{trlist.april}}</th><!-- {{4月（元）}} -->
                                    <th>{{trlist.may}}</th><!-- {{5月（元）}} -->
                                    <th>{{trlist.june}}</th><!-- {{6月（元）}} -->
                                    <th>{{trlist.july}}</th><!-- {{7月（元）}} -->
                                    <th>{{trlist.august}}</th><!-- {{8月（元）}} -->
                                    <th>{{trlist.september}}</th><!-- {{9月（元）}} -->
                                    <th>{{trlist.october}}</th><!-- {{10月（元）}} -->
                                    <th>{{trlist.november}}</th><!-- {{11月（元）}} -->
                                    <th>{{trlist.december}}</th><!-- {{12月（元）}} -->
                                </tr>
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
                            <select class="form-control" v-model="typeIn.subCompanyID" v-validate:val1="['required']">
                                <option value="">请选择分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                            <!-- <span v-if="$vali.val1.required && fire1" class="validation-error-label">请选择分公司</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>年份</label>
                            <span>{{yearShow}}年</span>
                        </div>
                        <div class="form-group" v-for="(index,value) in timeList">
                            <label><i>*</i>{{yearShow}}年{{$index+1}}月</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="typeIn.info[index]" maxlength="15" placeholder="">
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
                checkForm:{
                    subCompanyID:'',
                    date:'',
                    year:'',
                    month:'',
                    pagIndex: 1,
                    pageSize: 10,
                },
                dateS:'3',
                typeIn:{
                    subCompanyID:'',
                    info:[],
                },
                pageall:1,
                companylists:[],
                listData:{},
                timeList:['1','2','3','4','5','6','7','8','9','10','11','12'],
                yearShow:'',
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
            indexIn(){
                this.type_in=true;
            },
            saveChange(){
                this.model.getIndexAdd(this.typeIn).then((res)=>{
                    if(res.data.code==0){
                        dialog('success','保存成功！');
                    }
                })
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
                this.model.getIndexManagement(this.checkForm).then((res)=>{
                    if(res.data.code==0){
                        this.$set('listData',res.data.data);
                        this.yearShow=res.data.data.year;
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