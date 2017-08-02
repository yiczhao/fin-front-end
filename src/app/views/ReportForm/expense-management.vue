<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'费用管理'"
           :ptitle="'报表管理'"
           :hname="'financial-index-total'"
           :isshow="'isshow'">
        <div class="content expense-management" slot="content">
           	<div class="panel panel-flat">
           	 	<ul class="tab-bor">
                    <li data-ksa="target_total"><a v-link="{name:'financial-index-total'}">财务指标分析表（总）</a></li>
                    <li data-ksa="target_branch"><a v-link="{name:'financial-index-branch'}">财务指标分析表（分）</a></li>
                    <li data-ksa="ranking"><a v-link="{name:'branch-financial-indicators'}">财务指标排行</a></li>
                    <li data-ksa="cost" class="active"><a>费用管理</a></li>
                    <li data-ksa="cost"><a v-link="{name:'departmental-expense-detail'}">部门费用明细</a></li>
                    <li data-ksa="target_manage"><a v-link="{name:'index-management'}">指标管理</a></li>
                    <li data-ksa="activation_detail"><a v-link="{name:'allopatry-distribution-total'}">激活收入成本分配表</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add" data-ksa="cost.edit_budget" @click="typeIn('budget')" >预算编辑</a>
                    </div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="checkForm.subCompanyId">
                                <option value="">全部分公司</option>
                                <option :value="n.subCompanyID" v-for="(index,n) in companylists" v-text="n.name"></option>
                            </select>
                            <select class="form-control" v-model="checkForm.type">
                                <option value="">预算/实际</option>
                                <option value="1">预算</option>
                                <option value="2">实际</option>
                            </select>
                            <div class="inline">
                                <getmonth :value.sync="checkForm.startDate"></getmonth>
                            </div>
                        </form>
                    </div>
                    <div class="heading-middle">
                        <a class="btn btn-info add-top" data-ksa="cost.search" @click="initList">查询</a>
                    </div>
                </div>
                 <div class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>序号</th>
                                <th>分公司</th>
                                <th>预算/实际</th>
                                <th>小计</th>
                                <th v-for="i in subjectData">{{i.optionName}}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-for="(key,trlist) in listData">
                             <tr role="row" v-for="n in trlist" v-bind:class="{'odd':($parent.$index%2==0)}">
                                 <td>
                                     {{$parent.$index+1}}
                                 </td>
                                 <td>
                                    {{key | get_sub_company companylists}}
                                 </td>
                                 <td>
                                     <template v-if="$key==1">预算</template>
                                     <template v-if="$key==2">实际</template>
                                 </td>
                                 <td>
                                    {{n | get_sum | currency ''}}
                                 </td>
                                 <td v-for="m in n" track-by="$index">
                                     {{m/100 | currency ''}}
                                 </td>
                             </tr>
                            </template>
                            <tr v-if="!!totalList.length">
                                <td colspan="4">
                                    合计：
                                </td>
                                <td v-for="m in totalList" track-by="$index">
                                    {{m/100 | currency ''}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                     <div class="datatable-bottom">
                         <div class="left">
                             <a class="icon-file-excel" style="line-height: 30px;" v-on:click="costExcel" data-ksa="cost.export">Excel导出</a>
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
                            <div class="inline" style="width:75%;position: relative;top: 13px;">
                                <datepicker :value.sync="infaceList.date"></datepicker>
                            </div>
                        </div>
                        <div class="form-group">
                            <label><i>*</i>金额</label>
                            <input type="text" class="form-control" v-limitaddprice="infaceList.amount" v-model="infaceList.amount" placeholder="">
                            <!-- <span v-if="$vali.val2.required && fire1" class="validation-error-label">请输入金额</span> -->
                        </div>
                        <div class="form-group">
                            <label style="position: relative;top: -95px;" class="control-label">备   注：</label>
                            <textarea style="display: inline-block;" rows="5" cols="5" class="form-control" v-model="infaceList.remarks "></textarea>
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
                            <input type="text" class="form-control" v-limitprice="budgetList.amountList[index]" v-model="budgetList.amountList[index]" placeholder="">
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
                origin:window.origin,
                typeTitle:'',
                checkForm:{
                    subCompanyId:'',
                    type:'',
                    startDate:yestodayMonth(),
                },
                budgetList:{
                    // subCompanyId:'',
                    // subject:'',
                    // year:'2017',
                    // amountList:[],
                },
                totalList:[],
                companylists:[],
                costType:{},
                departmentList:[],
                timeList:['1','2','3','4','5','6','7','8','9','10','11','12'],
                listData:{},
                subjectData:{},
			}
		},
		methods:{
            setTime(){
                var date =  this.checkForm.startDate.split('-');
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
                this.model.departmentList().then((res)=>{
                    if(res.data.code==0){
                        this.$set('departmentList',res.data.data)
                    }
                })
                this.typeTitle='预算录入';
                this.budgetList={subCompanyId:'',subject:'',year:'2017',amountList:[]};
            },
            cancel(){
                this.budgetList={amountList:[]};
                this.type_in=false;
            },
            initList(){
                this.setTime();
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getZlists(this.checkForm);//没有接口
            },
            getClist(){
                this.$common_model.getcompany().then((res)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(res.data.code==0){
                            this.$set('companylists', res.data.data)
                        }
                    });
            },
            verifyField (data) {
                let errMapper;
                if(this.typeTitle=='预算录入'){ // 错误名称映射表 表内是需要检测的字段
                    errMapper = {
                        subCompanyId:'分公司',
                        subject:'费用类型',
                    }
                    // 金额检查
                    let amountList = data.amountList
                    if(amountList.length<12){
                        throw new Error('金额都是必填项!');
                    }
                    amountList && amountList.forEach(m => {
                        if (m==='') {
                            throw new Error('金额都是必填项!')
                        }
                    })
                }else{
                    errMapper = {
                        subCompanyId:'分公司',
                        subject:'费用类型',
                        department:'部门',
                        date:'时间',
                        amount:'金额'
                    }
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
                if(this.typeTitle!=='预算录入'){
                    data=_.cloneDeep(this.infaceList);
//                    data.amount=accMul(data.amount,100);
                }else{
                    data=_.cloneDeep(this.budgetList);
//                    _.map(data.amountList,(val,index)=>{
//                        data.amountList[index]=accMul(val,100);
//                    })
                }
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
            showType(){
                if(this.typeTitle=='预算录入'){
                    if(!!this.budgetList.subCompanyId&&!!this.budgetList.subject){
                        this.model.costBugetTypeInG(this.budgetList).then((res)=>{
                            if(res.data.code==0){
                                this.$set('budgetList.amountList',res.data.data.amountList)
                            }
                        });
                    }
                }
            },
            costExcel(){
                if(!this.subjectData.length>0){
                    alert("return"); return;
                }
                //初始化
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.costExport+ $.param(this.checkForm));
            },
            getZlists(data){
                this.model.getExpenseManageSubject(data).then((res)=>{
                    if(res.data.code==0){
                        this.$set('subjectData',res.data.data.data);
                        this.model.getExpenseManageLlst(data).then((res)=>{
                            if(res.data.code==0){
                                this.$set('listData',res.data.data);
                                let x;
                                let list=[];
                                for (x in this.listData)
                                {
                                    if(!!this.listData[x]['1']){
                                        _.map(this.listData[x],(arr)=>{
                                            _.map(arr,(val,index)=>{
                                                list[index]=list[index] || 0;
                                                list[index]+=val;
                                            })
                                        });
                                    }
                                }
                                this.$set('totalList',list);
                            }
                        })
                    }
                })
            },
        },
		ready(){
            this.getClist();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.initList();
		}
	}
</script>