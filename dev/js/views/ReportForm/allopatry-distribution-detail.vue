<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'异地激活收入成本分配明细表'"
           :ptitle="'报表管理'"
           :p2title="'异地激活收入成本分配总表'"
           :hname="'financial-index-total'"
           :h2name="'allopatry-distribution-total'"
           :isshow="'isshow'">
        <div class="content allopatry-distribution" slot="content">
           	<div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-left"></div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <span>收入成本确认分公司</span>
                            <select class="form-control" v-model="checkForm.confirmCompany">
                                <option value="">收入成本确认分公司</option>
                            </select>
                            <select class="form-control" v-model="checkForm.seleType">
                                <option value="">业务类型</option>
                                <option value="1">知店销售</option>
                                <option value="2">K1销售</option>
                            </select>
                            <select class="form-control" v-model="checkForm.Partner">
                                <option value="">sn归属合伙人</option>
                                <option value="0">汉付信通</option>
                                <option value="1">上海新卡说</option>
                            </select>
                            <span>门店所在地分公司</span>
                            <select class="form-control" v-model="checkForm.storeCompany">
                                <option value="">门店所在地分公司</option>
                            </select>
                            <span>合伙人所在地分公司</span>
                            <select class="form-control" v-model="checkForm.partnerCompany">
                                <option value="">合伙人所在地分公司</option>
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
                <div class="dataTables_wrapper">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>序号</th>
                                <th>收入成本确认分公司</th>
                                <th>业务类型</th>
                                <th>SN归属合伙人</th>
                                <th>门店所在地分公司 </th>
                                <th>合伙人所在地分公司</th>
                                <th>台数</th>
                                <th>收入</th>
                                <th>成本</th>
                            </tr>
                            </thead>
                            <tbody>
                                <!-- <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}"> -->
                                <!-- <tr role="row">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr> -->
                                <tr role="row">
                                    <td>序号</td>
                                    <td>收入成本确认分公司</td>
                                    <td>业务类型</td>
                                    <td>SN归属合伙人</td>
                                    <td>门店所在地分公司</td>
                                    <td>合伙人所在地分公司</td>
                                    <td>台数</td>
                                    <td>收入</td>
                                    <td>成本</td>
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
                    confirmCompany:'',
                    seleType:'',
                    Partner:'',
                    storeCompany:'',
                    partnerCompany:'',
                    startDate:'',
                    endDate:'',
                    pageIndex: 1,
                    pageSize: 10,
                },
                dateS:'3',
                partnerOrder:{
                    amount:'',
                    quantity:'',
                },
                quantityNum:'',
                saveTypeIn:{},
                type_in:false,
                typeTitle:'',
                pageall:1,
			}
		},
		methods:{
            getTime(){
                debugger
                this.checkForm.startDate=init_date(this.dateS)[0];
                this.checkForm.endDate=init_date(this.dateS)[1];
            },
            initList(){
                back_json.saveArray(this.$route.path,this.checkForm);
            },
            typeInShow(title){
                this.type_in=true;
                if(title!='partner'){this.typeTitle='发货数量'}else{this.typeTitle='合伙人订单'};
            },
            saveChange(){
                this.type_in=false;//test
                console.log('success+kok');
            },
            searchData(){
                this.checkForm.pageIndex=1;
                console.log(this.checkForm);
            },
            getTime(){
                this.checkForm.startDate=init_date(this.dateS)[0];
                this.checkForm.endDate=init_date(this.dateS)[1];
            },
        },
		ready:function(){
            var vm=this;
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.checkForm=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
		},
        watch:{
            'checkForm.pageSize + checkForm.pageIndex'(){
                this.initList();
            }
        }
	}
</script>