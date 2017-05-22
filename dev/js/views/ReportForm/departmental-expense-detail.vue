 <template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'部门费用明细'"
           :ptitle="'报表管理'"
           :hname="'financial-index-total'"
           :isshow="'isshow'">
        <div class="content expense-management departmental-expense-detail" slot="content">
           	<div class="panel panel-flat">
           	 	<ul class="tab-bor">
                    <li data-ksa="target_total"><a v-link="{name:'financial-index-total'}">财务指标分析表（总）</a></li>
                    <li data-ksa="target_branch"><a v-link="{name:'financial-index-branch'}">财务指标分析表（分）</a></li>
                    <li data-ksa="ranking"><a v-link="{name:'branch-financial-indicators'}">财务指标排行</a></li>
                    <li data-ksa="cost"><a v-link="{name:'expense-management'}">费用管理</a></li>
                    <li data-ksa="target_manage"><a v-link="{name:'index-management'}">指标管理</a></li>
                    <li data-ksa="cost" class="active"><a>部门费用明细</a></li>
                    <li data-ksa="activation_detail"><a v-link="{name:'allopatry-distribution-total'}">异地激活收入成本分配总表</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add" @click="typeIn()" >实际费用录入</a>
                    </div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="checkForm.subCompanyId">
                                <option value="">全部分公司</option>
                                <option :value="n.subCompanyID" v-for="(index,n) in companylists" v-text="n.name"></option>
                            </select>
                            <select class="form-control" v-model="checkForm.department">
                                <option value="">部门</option>
                                <option v-for="(index,n) in departmentType" v-text="n.name" :value="n.id"></option>
                            </select>
                            <select class="form-control" v-model="checkForm.subject">
                                <option value="">费用类型</option>
                                <option v-for="(index,n) in costType" v-text="n.name" :value="n.id"></option>
                            </select>
                            <getmonth :value.sync="date"></getmonth>
                        </form>
                    </div>
                    <div class="heading-middle">
                            <a class="btn btn-info add-top"  data-ksa="cost.search" @click="initList()">查询</a>
                    </div>
                </div>
                <div v-show="listData.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>序号</th>
                                <th>分公司</th>
                                <th>部门</th>
                                <th>费用类型</th>
                                <th>金额</th>
                                <th>时间</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in listData" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{index+1}}</td>
                                    <td>{{trlist.subCompanyName}}</td><!-- {{分公司}} -->
                                    <td>{{trlist.departmentName}}</td><!-- {{部门}} -->
                                    <td>{{trlist.subjectName}}</td><!-- {{费用类型}} -->
                                    <td>{{trlist.amount/100 | currency ''}}</td>
                                    <td>{{trlist.date | datetimes }}</td><!-- {{时间}} -->
                                    <td>{{trlist.remarks}}</td><!-- {{备注}} -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-bottom">
                        <div class="right">
                            <page :all="pageall"
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                       </div>
                    </div>
                </div>
                <div class="no-list" v-else>
                    未找到数据
                </div>
                <content-dialog
                        :show.sync="type_in" :is-button="true" :is-cancle="true" :type.sync="'infos'"
                        :title.sync="'实际费用录入'" @kok="saveChange()" @kcancel="cancel()"
                >
                    <validator name="vali">
                        <div class="form-group">
                            <label><i>*</i>分公司</label>
                            <select class="form-control" v-model="infaceList.subCompanyId">
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
                                <option v-for="(index,n) in departmentList" v-text="n.name" :value="n.id"></option>
                            </select>
                            <!-- <span v-if="$vali.val1.required && fire1" class="validation-error-label">请选择费用类型</span> -->
                        </div>
                        <div class="form-group">
                            <label><i>*</i>时间</label>
                            <datepicker :readonly="true" :value.sync="infaceList.date" format="YYYY-MM-DD"></datepicker>
                        </div>
                        <div class="form-group">
                            <label><i>*</i>金额</label>
                            <input type="text" class="form-control" v-limitprice="infaceList.amount" v-model="infaceList.amount" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入金额</span> -->
                        </div>
                        <div class="form-group">
                            <label style="position: relative;top: -95px;" class="control-label">备   注：</label>
                            <textarea style="display: inline-block;" rows="5" cols="5" class="form-control" v-model="infaceList.remarks "></textarea>
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
                    subCompanyId:'',
                    departmentName:'',
                    subject:'',
                    pageIndex: 1,
                    pageSize: 10,
                    year:'',
                    month:'',
                    department:''
                },
                date:' ',
                dateS:'3',
                pageall:1,
                companylists:[],
                listData:{},
                costType:{},
                departmentType:{},
                departmentList:[],
                infaceList:{}
			}
		},
		methods:{
            typeIn(){
                this.type_in=true;
                this.model.costCommonTypeIn().then((res)=>{
                    if(res.data.code==0){
                        this.$set('costType',res.data.data)
                    }
                })
                this.model.departmentList().then((res)=>{
                    if(res.data.code==0){
                        this.$set('departmentList',res.data.data)
                    }
                })
                this.typeTitle='实际费用录入';
                this.infaceList={subCompanyId:'',subject:'',department:'',date:'',amount:'',remarks:''};
            },
            cancel(){
                this.infaceList={date:getNowMonth()};
                this.type_in=false;
            },
            verifyField (data) {
                let errMapper= {
                        subCompanyId:'分公司',
                        subject:'费用类型',
                        department:'部门',
                        date:'时间',
                        amount:'金额'
                    }
                // 检测是否存在未填写项
                for (let k in data) {
                    let m = data[k]
                    let err = errMapper[k] && new Error(`请检查${errMapper[k]}项!`)
                    /*global _*/
                    if ((m==='' && err) || (_.isArray(m) && !m.length && err)) {
                        throw err
                    }
                }
            },
            errHandle(err){
                dialogs('info', err)
            },
            saveChange(){
                let data={};
                data=_.cloneDeep(this.infaceList);
                let key=this.typeTitle=='预算录入'?'costBugetTypeInP':'costBugetActualTypeInP';
                if (true) {
                    try {
                        this.verifyField(data)
                    } catch (e) {
                        this.errHandle(e.message)
                        return
                    }
                }
                this.model[key](data).then((res)=>{
                    if(res.data.code==0){
                        dialogs('success','保存成功！');
                        this.initList();
                        this.type_in=false;
                    }
                });
            },
            setTime(){
                if(!this.date.trim())return;
                let date,year,month,myDate,today;
                myDate=new Date();
                today=myDate.getDate();
                date =  this.date.split('-');
                year = parseInt(date[0]);
                month = parseInt(date[1]);
                this.checkForm.year = year;
                this.checkForm.month=month;
                // if(today-1!=0){this.defaultData.month = month+1;this.data='2017-5';}else{this.defaultData.month=month};
            },
            getTime(){
                this.checkForm.startDate=init_date(this.dateS)[0];
                this.checkForm.endDate=init_date(this.dateS)[1];
            },
            initList(){
                this.setTime();
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getZlists();
            },
            getClist(){
                this.$common_model.getcompany()
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('companylists', response.data.data)
                        }
                    });
                this.model.costCommonTypeIn().then((res)=>{
                    if(res.data.code==0){
                        this.$set('costType',res.data.data)
                    }
                });
                this.model.costCommonTypeIn().then((res)=>{
                    if(res.data.code==0){
                        this.$set('costType',res.data.data)
                    }
                });
                this.model.getSearchDepartment().then((res)=>{
                    if(res.data.code==0){
                        this.$set('departmentType',res.data.data)
                    }
                });
            },
            getZlists(){
                this.model.getCostCommonDetail(this.checkForm).then((res)=>{
                    if(res.data.code==0){
                        this.$set('listData',res.data.data);
                        this.$set('pageall',res.data.total);
                    }
                })
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