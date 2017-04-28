<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'异地激活收入成本分配总表'"
           :ptitle="'报表管理'"
           :hname="'financial-index-total'"
           :isshow="'isshow'">
        <div class="content allopatry-distribution" slot="content">
           	<div class="panel panel-flat">
           	 	<ul class="tab-bor">
                    <li><a v-link="{name:'financial-index-total'}">财务指标分析表（总）</a></li>
                    <li><a v-link="{name:'financial-index-branch'}">财务指标分析表（分）</a></li>
                    <li><a v-link="{name:'branch-financial-indicators'}">财务指标排行</a></li>
                    <li><a v-link="{name:'expense-management'}">费用管理</a></li>
                    <li><a v-link="{name:'index-management'}">指标管理</a></li>
                    <li><a v-link="{name:'departmental-expense-detail'}">部门费用明细</a></li>
                    <li class="active"><a>异地激活收入成本分配总表</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left"></div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <span>收入成本确认分公司</span>
                            <select class="form-control" v-model="checkForm.subCompanyId">
                                <option value="">收入成本确认分公司</option>
                                <option :value="n.subCompanyID" v-for="(index,n) in companylists" v-text="n.name"></option>
                            </select>
                            <select class="form-control" v-model="checkForm.businessTypeId">
                                <option value="">业务类型</option>
                            </select>
                            <select class="form-control" v-model="checkForm.snType">
                                <option value="">sn归属合伙人</option>
                                <option value="0">汉付信通</option>
                                <option value="1">上海新卡说</option>
                            </select>
                            <getmonth :value.sync="checkForm.date"></getmonth>
                        </form>
                    </div>
                    <div class="heading-middle">
                            <a class="btn btn-info add-top" @click="searchData()">查询</a>
                    </div>
                </div>
                <!-- <div v-show="listData.length>0" class="dataTables_wrapper"> -->
                <div class="dataTables_wrapper">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>序号</th>
                                <th>收入成本确认分公司</th>
                                <th>业务类型</th>
                                <th>SN归属合伙人</th>
                                <th>录入 </th>
                                <th>预收账款</th>
                                <th>采购数量</th>
                                <th>发货数量</th>
                                <th>激活数量</th>
                                <th>收入</th>
                                <th>成本</th>
                                <th>备注</th>

                            </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in listData" v-bind:class="{'odd':(index%2==0)}">
                                <!-- <tr role="row"> -->
                                    <td>{{index+1}}</td><!-- {{序号}} -->
                                    <td>{{listData.subCompanyName }}</td><!-- {{收入成本确认分公司}} -->
                                    <td>{{listData.businessName }}</td><!-- {{业务类型}} -->
                                    <td>{{listData.snTypeName }}</td><!-- {{SN归属合伙人}} -->
                                    <td>
                                        <!-- <a v-link="{name:'partner-order'}" @click="typeInShow('partner')">合伙人订单</a> -->
                                        <a @click="typeInShow('partner')">合伙人订单</a>
                                        <!-- <a v-link="{name:'shipment-quantity'}" @click="typeInShow('shipment')">发货数量</a> -->
                                        <a @click="typeInShow('shipment')">发货数量</a>
                                    </td>
                                    <td>{{listData.preIncome }}</td><!-- {{预收账款}} -->
                                    <td>{{listData.purchaseNumber }}</td><!-- {{采购数量}} -->
                                    <td>{{listData.发货数量}}</td><!-- {{发货数量}} -->
                                    <td><a v-link="{name:'allopatry-distribution-detail'}">激活数量100</a></td><!-- 激活数量 -->
                                    <td>{{listData.income }}</td><!-- {{收入}} -->
                                    <td>{{listData.cost}}</td><!-- {{成本}} -->
                                    <td>{{listData.remarks}}</td><!-- {{备注}} -->
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
                        :show.sync="type_in" :is-button="true" :is-cancel="true" :type.sync="'infos'"
                        :title.sync="typeTitle" @kok="saveChange" @kcancel="type_in = false"
                        >
                    <validator name="vali2" v-if="typeTitle=='合伙人订单'">
                        <div class="form-group">
                            <label>SN归属合伙人</label>
                            <span>汉付信通</span>
                        </div>
                        <div class="form-group">
                            <label>预收账款</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="partnerOrder.amount" placeholder=""><span>元</span>
                        </div>
                        <div class="form-group">
                            <label>采购数量</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="partnerOrder.quantity" placeholder=""><span>台</span>
                        </div>
                    </validator>
                    <validator name="vali2" v-if="typeTitle=='发货数量'">
                        <div class="form-group">
                            <label>SN归属合伙人</label>
                            <span>汉付信通</span>
                        </div>
                        <div class="form-group">
                            <label>采购数量</label>
                            <input type="text" class="form-control" v-validate:val2="['required']" v-model="quantityNum" placeholder=""><span>台</span>
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
                checkForm:{
                    subCompanyId:'',
                    businessTypeId:'',
                    snType:'',
                    date:'',
                    year:'',
                    month:'',
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
                companylists:[],
                listData:{},
			}
		},
		methods:{
            getTime(){
                this.checkForm.startDate=init_date(this.dateS)[0];
                this.checkForm.endDate=init_date(this.dateS)[1];
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
                back_json.saveArray(this.$route.path,this.checkForm);
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
                // this.model.getAllopatryListCount(this.checkForm).then((res)=>{
                //     if(res.data.code==0){
                //         this.$set('listData',res.data.data);
                //     }
                // })
            },
        },
		ready(){
            this.getClist();
            this.getAllData();
		},
        watch:{
            'checkForm.pageIndex+checkForm.pageSize'(){
                this.initList();
            }
        }
	}
</script>