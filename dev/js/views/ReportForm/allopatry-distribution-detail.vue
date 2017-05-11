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
                            <select class="form-control" v-model="defaultData.subCompanyId">
                                <option value="">收入成本确认分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                            <select class="form-control" v-model="defaultData.businessTypeId">
                                <option value="">业务类型</option>
                                <option v-for="(index,n) in commonbusinessList" v-text="n.name" :value="n.id"></option>
                            </select>
                            <select class="form-control" v-model="defaultData.snType">
                                <option value="">sn归属合伙人</option>
                                <option v-for="(index,n) in SnPartnerList" v-text="n.name" :value="n.id"></option>
                            </select>
                            <span>门店所在地分公司</span>
                            <select class="form-control" v-model="defaultData.localSubCompanyId">
                                <option value="">门店所在地分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                            <span>合伙人所在地分公司</span>
                            <select class="form-control" v-model="defaultData.partnerCompany">
                                <option value="">合伙人所在地分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                            <getmonth :value.sync="date"></getmonth>
                        </form>
                    </div>
                    <div class="heading-middle">
                            <a class="btn btn-info add-top" @click="initList()">查询</a>
                    </div>
                </div>
                <div v-show="listData.length>0" class="dataTables_wrapper">
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
                                <tr role="row" v-for="(index,trlist) in listData" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{index+1}}</td><!-- 序号 -->
                                    <td>{{trlist.subCompanyName}}</td><!-- 收入成本确认分公司 -->
                                    <td>{{trlist.businessName}}</td><!-- 业务类型 -->
                                    <td>{{trlist.snTypeName}}</td><!-- SN归属合伙人 -->
                                    <td>{{trlist.storeSubCompanyName}}</td><!-- 门店所在地分公司 -->
                                    <td>{{trlist.localSubCompanyName}}</td><!-- 合伙人所在地分公司 -->
                                    <td>{{trlist.number}}</td><!-- 台数 -->
                                    <td>{{trlist.income/100 | currency ''}}</td><!-- 收入 -->
                                    <td>{{trlist.cost/100 | currency ''}}</td><!-- 成本 -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-bottom">
                       <!--  <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" @click="">Excel导出</a>
                        </div> -->
                        <div class="right">
                            <page :all="pageall"
                                  :cur.sync="defaultData.pageIndex"
                                  :page_size.sync="defaultData.pageSize">
                            </page>
                       </div>
                    </div>
                </div>
                <div class="no-list" v-else>
                    未找到数据
                </div>
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
                defaultData:{
                    subCompanyId:'',
                    businessTypeId:'',
                    snType:'',
                    localSubCompanyId:'',
                    partnerCompany:'',
                    year:'',
                    month:'',
                    pageIndex: 1,
                    pageSize: 10,
                },
                date:yestodayMonth(),
                partnerOrder:{
                    amount:'',
                    quantity:'',
                },
                quantityNum:'',
                SnPartnerList:{},
                saveTypeIn:{},
                type_in:false,
                typeTitle:'',
                pageall:1,
                companylists:[],
                commonbusinessList:[],
                listData:{},
			}
		},
		methods:{
            setTime(){
                var date =  this.date.split('-');
                var year = parseInt(date[0]);
                var month = parseInt(date[1]);
                this.defaultData.year = year;
                this.defaultData.month = month;
            },
            initList(){
                this.setTime();
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
            typeInShow(title){
                this.type_in=true;
                if(title!='partner'){this.typeTitle='发货数量'}else{this.typeTitle='合伙人订单'};
            },
            saveChange(){
                this.type_in=false;//test
            },
            getClist(){
                this.$common_model.getcompany()
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('companylists', response.data.data)
                        }
                    });
                //获取合伙人
                this.model.getAllopatrySnPartner().then((res)=>{
                    if(res.data.code==0){
                        this.$set('SnPartnerList',res.data.data);
                    }
                });
                this.model.getCommonActivation()
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('commonbusinessList', response.data.data)
                        }
                    });
            },
            getZlists(data){
                this.model.getAllopatryListDetali(data).then((res)=>{
                    if(res.data.code==0){
                        this.$set('listData',res.data.data);
                        this.$set('pageall',res.data.total);
                    }
                });
            },
        },
		ready:function(){
            var vm=this;
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            (this.$route.params.distributionsubCompanyId==':distributionsubCompanyId')?this.defaultData.subCompanyId='':this.defaultData.subCompanyId=this.$route.params.distributionsubCompanyId;
            (this.$route.params.distributionbusinessTypeId==':distributionbusinessTypeId')?this.defaultData.businessTypeId='':this.defaultData.businessTypeId=this.$route.params.distributionbusinessTypeId;
            (this.$route.params.distributionsnType==':distributionsnType')?this.defaultData.snType='':this.defaultData.snType=this.$route.params.distributionsnType;
            vm.initList();
            vm.getClist();
		},
        watch:{
            'defaultData.pageSize + defaultData.pageIndex'(){
                this.initList();
            }
        }
	}
</script>