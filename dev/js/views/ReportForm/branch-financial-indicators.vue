<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'财务指标排行'"
           :ptitle="'报表管理'"
           :hname="'financial-index-total'"
           :isshow="'isshow'">
        <div class="content branch-financial-indicators" slot="content">
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
                            <a class="btn btn-info add-top" @click="initList()">查询</a>
                    </div>
                </div>
                 <div v-show="!listData[0]" class="dataTables_wrapper no-footer">
                <!--<div class="dataTables_wrapper no-footer">-->
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row sortSpan">
                                <th>排名</th>
                                <th>分公司</th>
                                <th @click="sortByKey('income',0)">
                                    <span v-if="boll[0]">&#9660;</span>
                                    <span v-if="!boll[0]">&#9650;</span>
                                    收入
                                </th>
                                <th @click="sortByKey('cost',1)">
                                    <span v-if="boll[1]">&#9660;</span>
                                    <span v-if="!boll[1]">&#9650;</span>
                                    成本
                                </th>
                                <th @click="sortByKey('spend',2)">
                                    <span v-if="boll[2]">&#9660;</span>
                                    <span v-if="!boll[2]">&#9650;</span>费用
                                </th>
                                <th @click="sortByKey('profit',3)">
                                    <span v-if="boll[3]">&#9660;</span>
                                    <span v-if="!boll[3]">&#9650;</span>净利润
                                </th>
                                <th @click="sortByKey('profitRate',4)">
                                    <span v-if="boll[4]">&#9660;</span>
                                    <span v-if="!boll[4]">&#9650;</span>
                                    净利率
                                </th>
                                <th @click="sortByKey('profitFinished',5)">
                                    <span v-if="boll[5]">&#9660;</span>
                                    <span v-if="!boll[5]">&#9650;</span>净利润指标完成率
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in listData" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{index+1}}</td><!-- {{排名}} -->
                                    <td>{{trlist.subCompanyName}}</td><!-- {{分公司}} -->
                                    <td>{{trlist.income/100 | currency ''}}</td><!-- {{收入}} -->
                                    <td>{{trlist.cost/100 | currency ''}}</td><!-- {{成本}} -->
                                    <td>{{trlist.spend/100 | currency ''}}</td><!-- {{费用}} -->
                                    <td>{{trlist.profit/100 | currency ''}}</td><!-- {{净利润}} -->
                                    <td>{{trlist.profitRate}}%</td><!-- {{净利率}} -->
                                    <td>{{trlist.profitFinished}}%</td><!-- {{净利润指标完成率}} -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="no-list" v-else>
                    未找到数据
                </div>
            </div>
        </div>
	</index>
</template>
<style lang="sass" scoped>
    .line-height{
        line-height: 30px;
    }
    .sortSpan{
        span{
            color:#999;
        }
        .chooseSort{
            color:#444;
        }
    }
</style>
<script>
    import model from '../../ajax/ReportForm/report_form_model.js'
	export default{
		data(){
			this.model = model(this);
			return{
                checkForm:{
                    subCompanyID:'',
                    date:yestodayMonth(),
                    year:'',
                    month:'',
                    pageIndex: 1,
                    pageSize: 10,
                    mid:'',
                },
                pageall:1,
                companylists:[],
                listData:[],
                boll:[false,false,false,false,false,false],
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
                // this.setTime();
                // this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                // window.open(window.origin+this.$API.activityEffectExcel+ $.param(this.checkForm));
            },
            initList(){
                this.setTime();
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getZlists();
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
            getZlists(){
                this.sortByKey('profitFinished',0)
                this.model.getFinanceRanking(this.checkForm).then((res)=>{
                    if(res.data.code==0){
                        this.$set('listData',res.data.data);
                        this.sortByKey('profitFinished',0)
                    }
                })
            },
            sortByKey(key,index){
                let data=_.cloneDeep(this.listData);
                let boll=_.cloneDeep(this.boll);
                if(boll[index]){
                    data= data.sort((a,b)=>{return a[key]-b[key]});//正序
                }else{
                    data= data.sort((a,b)=>{return b[key]-a[key]});//倒序
                }
                boll[index]=!boll[index];
                this.$set('listData', data);
                this.$set('boll', boll);
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