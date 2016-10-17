<template>
    <index :title="'调账管理'"
           :ptitle="'交易管理'"
           :hname="'adjust-trade-detailpre'"
           :isshow="'isshow'">
        <div class="content adjust-trade-detailpre" slot="content">
            <div class="panel panel-flat">

                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" v-on:click="addTrade" data-ksa="">添加调账交易</a>
                    </div>

                    <div class="heading-right">
                        <select class="form-control" v-model="checkForm.subCompanyID" @change="getCity(checkForm.subCompanyID)">
                            <option value="">全部分公司</option>
                            <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                        </select>

                        <select class="form-control" v-model="checkForm.cityID">
                            <option value="">全部城市</option>
                            <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                        </select>

                        <select class="form-control" v-model="checkForm.timeRange">
                            <option value="0">昨天</option>
                            <option value="1">最近一周</option>
                            <option value="2">最近一个月</option>
                            <option value="3">最近三个月</option>
                            <option value="4">自定义时间</option>
                        </select>

                        <div  v-show="checkForm.timeRange==4">
                            <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                            <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                        </div>

                        <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="商户ID" v-limitnumber="checkForm.merchantOperationID">

                        <input type="text" class="form-control" placeholder="活动ID" v-limitnumber="checkForm.activityOperationID" v-model="checkForm.activityOperationID">
                        <select class="form-control" v-model="checkForm.status">
                            <option value="">全部手工单状态</option>
                            <option value="1">未提交</option>
                            <option value="2">待审核</option>
                            <option value="3">审核通过</option>
                            <option value="4">审核不通过</option>
                        </select>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="query" data-ksa="manually_settlement.search">查询</a>
                    </div>
                </div>

                <div v-cloak v-show="tradeList.length>0" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table">
                            <thead>
                            <tr role="row">
                                <th>交易ID</th>
                                <th>交易流水号</th>
                                <th>分公司</th>
                                <th>城市</th>
                                <th>商户ID</th>
                                <th>商户名称</th>
                                <th>额度抵扣</th>
                                <th>本金抵扣</th>
                                <th>三方应收</th>
                                <th>商户应补</th>
                                <th>扣收金额</th>
                                <th>33211佣金</th>
                                <th>状态</th>
                                <th>操作</th>
                                <th>参与活动</th>
                                <th>调账</th>
                                <th>凭证</th>
                                <th>备注</th>
                                <th>不通过原因</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="trlist in tradeList" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.tradeDetailID}}</td>
                                <td>{{trlist.serialNumber}}</td>
                                <td>{{trlist.subCompanyName}}</td>
                                <td>{{trlist.cityName}}</td>
                                <td>{{trlist.merchantOperationID}}</td>
                                <td>{{trlist.merchantName}}</td>
                                <td>{{trlist.limitDeduct/100 | currency ''}}</td>
                                <td>{{trlist.principalDeduct/100 | currency ''}}</td>
                                <td>{{trlist.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{trlist.collectionAmount/100 | currency ''}}</td>
                                <td>{{trlist.commission33211/100 | currency ''}}</td>
                                <td>
                                    <template v-if="trlist.status==1">未提交</template>
                                    <template v-if="trlist.status==2">等待审核</template>
                                    <template v-if="trlist.status==3">审核通过</template>
                                    <template v-if="trlist.status==4">审核不通过</template>
                                </td>
                                <td>
                                    <a @click="editAdd" v-if="trlist.status==1||trlist.status==4">编辑</a>
                                    <a v-if="trlist.status==1||trlist.status==4">提交</a>
                                    <a v-if="trlist.status==2">通过</a>
                                    <a v-if="trlist.status==2">退回</a>
                                    <a v-if="trlist.status==4">删除</a>
                                </td>
                                <td>
                                    <template v-if="!trlist.activityName">
                                        无
                                    </template>
                                    <a data-ksa="activity_manage.search" v-else v-link="{name:'activity-lists',params:{operationID:trlist.activityOperationID,name:trlist.activityName}}">{{trlist.activityOperationID}}:{{trlist.activityName}}</a>
                                </td>
                                <td>
                                    <a>明细</a>
                                </td>
                                <td>
                                    <a href="{{origin}}/file/download/{{trlist.certificateID}}">下载</a>
                                </td>
                                <td>
                                    {{trlist.remarks}}
                                </td>
                                <td>
                                    {{trlist.refuseReason}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">
                       <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" v-on:click="manuallyexcel" data-ksa="manually_settlement.export">Excel导出</a>
                       </div>

                       <div class="right">
                            <page :all="pageall"
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                       </div>
                    </div>

                </div>
                <div class="no-list" v-else>
                    未查询到数据！
                </div>
                
                <div class="nums" v-show="tradeList.length>0">
                    <table cellspacing="0" cellpadding="0" border="1px solid #000;">
                        <tr>
                            <td rowspan="4">
                                <span>合计： </span>
                            </td>
                            <td>
                                <span>额度抵扣:</span>
                                <span>{{nums.consumptionAmount/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>本金抵扣:</span>
                                <span>{{nums.discountAmount/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>三方应收:</span>
                                <span>{{nums.payAmount/100 | currency ''}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>33211佣金:</span>
                                <span>{{nums.thirdPartyReceivable/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>商户应补:</span>
                                <span>{{nums.merchantSubsidyShould/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>扣收金额:</span>
                                <span>{{nums.suspensionTax/100 | currency ''}}</span>
                            </td>
                        </tr>
                    </table>
                </div>

                <content-dialog
                        :show.sync="addShow" :is-cancel="true" :type.sync="'infos'"
                        :title.sync="addTitle" @kok="saveAdd" @kcancel="addShow = false"
                >

                </content-dialog>

            </div>
        </div>
    </index>
</template>

<script>
    import model from '../../ajax/Transaction/adjust_tradeDetailPre_model'
    export default{
        data(){
            this.model=model(this);
            return{
                origin:window.origin,
                checkForm:{
                    subCompanyID:"",
                    cityID:"",
                    startDate:"",
                    endDate:"",
                    merchantOperationID:"",
                    activityOperationID:'',
                    status:'',
                    pageIndex:1,
                    timeRange:'3',
                    pageSize:10
                },
                subcompanyList:[],
                pageall:1,
                tradeList:[],
                cityList:[],
                nums:{},
                applyPayInfo:{},
                addShow:false,
                addTitle:''
            }
        },
        methods:{
            //获取交易记录
             getTradeList(data){
                 this.model.adjustTradeDetailPre_total(data)
                         .then((response)=>{
                             (response.data.code==0)?this.$set('nums',response.data.data):null;
                         });
                 this.model.adjustTradeDetailPre_list(data)
                    .then((response)=>{
                         if(response.data.code==0){
                            this.$set('tradeList', response.data.data)
                            this.$set('pageall', response.data.total)
                        }
                    });
            },
            //获取分公司数据
            getSubcompany(){
                 this.$common_model.getcompany()
                    .then((response)=>{
                        if(response.data.code==0){
                            this.$set('subcompanyList', response.data.data)
                        }
                    });
            },
            //获取城市数据
            getCity(_id){
                this.cityID='';
                let data={
                    'subCompanyID':_id
                }
                 this.$common_model.getcity(data)
                    .then((response)=>{
                        if(response.data.code==0){
                            this.$set('cityList', response.data.data)
                        }
                    });
            },
            query() {
                if(sessionStorage.getItem('isHttpin')==1)return;
                //初始化
                this.show=false;
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getTradeList(this.checkForm);
            },
            manuallyexcel() {
                if(!this.tradeList.length>0)return;
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.manuallyexcel+ $.param(this.checkForm));
            },
            getTime(){
                this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
            },
            addTrade(){
                this.addShow=true;
                this.addTitle='添加调账交易';
            },
            editAdd(){
                this.addShow=true;
                this.addTitle='编辑调账交易';
            },
            saveAdd(){

            }
        },
        ready() {
            this.getSubcompany();
            this.getCity();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.getTime()
            this.query();
        },
       watch:{
            'checkForm.timeRange'(){
                this.getTime()
            },
            'checkForm.pageIndex+checkForm.pageSize'(){
                this.query();
            }
       }
    }
</script>