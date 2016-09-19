<template>
    <index :title="'手工结算'"
           :ptitle="'交易管理'"
           :hname="'manually-settlement'"
           :isshow="'isshow'">
        <div class="content blists" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                       <div class="form-group">
                           <a class="btn btn-info" v-on:click="payApply">生成划付</a>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.subCompanyID" @change="getCity(checkForm.subCompanyID)">
                                <option value="">全部分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.cityID">
                                <option value="">全部城市</option>
                                <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.type">
                            <option value="">请选择交易类型</option>
                            <option value="1">正常交易</option>
                            <option value="2">手工单</option>
                                <option v-for="(index,n) in typelists" v-text="n.value" :value="n.accountType"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.timeRange">
                                <option value="0">昨天</option>
                                <option value="1">最近一周</option>
                                <option value="2">最近一个月</option>
                                <option value="3">最近三个月</option>
                                <option value="4">自定义时间</option>
                            </select>
                        </div>
                        <div class="form-group" v-show="checkForm.timeRange==4">
                            <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                            <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="商户ID"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="checkForm.merchantName" placeholder="商户名">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="checkForm.tradeDetailID" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"  placeholder="交易ID">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="checkForm.serialNumber" placeholder="交易流水号">
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control" v-model="checkForm.phone" placeholder="手机号">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="活动ID" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" v-model="checkForm.activityOperationID">
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" v-on:click="query" data-ksa="trade_detail_manage.search">查询</a>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" v-on:click="tradeDetailexcel" data-ksa="trade_detail_manage.export">导出</a>
                        </div>
                    </form>
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
                                <th>消费金额</th>
                                <th>折扣金额</th>
                                <th>实付金额</th>
                                <th>额度抵扣</th>
                                <th>本金抵扣</th>
                                <th>三方应收</th>
                                <th>商户应补</th>
                                <th>退税款</th>
                                <th>商户实补</th>
                                <th>折扣差</th>
                                <th>扣收金额</th>
                                <th>33211佣金</th>
                                <th>入账金额</th>
                                <th>交易时间</th>
                                <th>手机号</th>
                                <th>卡号</th>
                                <th>参与活动</th>
                                <th>交易类型</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="trlist in tradeList">
                                <td>{{trlist.id}}</td>
                                <td>{{trlist.serialNumber}}</td>
                                <td>{{trlist.subCompanyName}}</td>
                                <td>{{trlist.cityName}}</td>
                                <td>{{trlist.merchantOperationID}}</td>
                                <td>{{trlist.merchantName}}</td>
                                <td>{{trlist.consumptionAmount/100 | currency ''}}</td>
                                <td>{{trlist.discountAmount/100 | currency ''}}</td>
                                <td>{{trlist.payAmount/100 | currency ''}}</td>
                                <td><span>{{trlist.limitDeduct/100 | currency ''}}</span></td>
                                <td><span>{{trlist.principalDeduct/100 | currency ''}}</span></td>
                                <td>{{trlist.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{trlist.suspensionTax/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyActual/100 | currency ''}}</td>
                                <td>{{trlist.discountDiff/100 | currency ''}}</td>
                                <td>{{trlist.collectionAmount/100 | currency ''}}</td>
                                <td>{{trlist.commission33211/100 | currency ''}}</td>
                                <td>{{trlist.entryAmount/100 | currency ''}}</td>
                                <td>{{trlist.tradeTime | datetime}}</td>
                                <td>{{trlist.consumptionPhone}}</td>
                                <td>{{trlist.consumptionAccountNumber}}</td>
                                <td>
                                    <template v-if="!trlist.activityName">
                                        无
                                    </template>
                                    <a data-ksa="activity_manage.search" v-else v-link="{name:'activity-lists',params:{operationID:trlist.activityOperationID,name:trlist.activityName}}">{{trlist.activityOperationID}}:{{trlist.activityName}}</a>
                                </td>
                                <td>
                                    <template v-if="trlist.type==1">
                                        正常交易
                                    </template>
                                    <template v-if="trlist.type==2">
                                        手工单
                                    </template>
                                </td>
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            </tbody>
                            <tr role="row" v-if="nums.length>0">
                                <th>合计：</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th><b>{{nums.consumptionAmount/100 | currency ''}}</b></th>
                                <th><b>{{nums.discountAmount/100 | currency ''}}</b></th>
                                <th><b>{{nums.payAmount/100 | currency ''}}</b></th>
                                <th><b>{{nums.limitDeduct/100 | currency ''}}</b></th>
                                <th><b>{{nums.principalDeduct/100 | currency ''}}</b></th>
                                <th><b>{{nums.thirdPartyReceivable/100 | currency ''}}</b></th>
                                <th><b>{{nums.merchantSubsidyShould/100 | currency ''}}</b></th>
                                <th><b>{{nums.suspensionTax/100 | currency ''}}</b></th>
                                <th><b>{{nums.merchantSubsidyActual/100 | currency ''}}</b></th>
                                <th><b>{{nums.discountDiff/100 | currency ''}}</b></th>
                                <th><b>{{nums.collectionAmount/100 | currency ''}}</b></th>
                                <th><b>{{nums.commission33211/100 | currency ''}}</b></th>
                                <th><b>{{nums.entryAmount/100 | currency ''}}</b></td>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </table>
                    </div>
                    <div class="datatable-footer">
                        <page :all="pageall"
                              :cur.sync="checkForm.pageIndex"
                              :page_size.sync="checkForm.pageSize">
                        </page>
                    </div>
                </div>
                <div style="padding: 30px;font-size: 16px;text-align: center" v-else>
                    未查询到手工单数据！
                </div>

                <content-dialog
                        :show.sync="show" :is-cancel="true" :type.sync="'primary'"
                        :title.sync="'申请划付'" @kok="submit" @kcancel="show = false"
                >
                    <div class="modal-body">
                        <div class="form-group">
                            您目前选择了
                            <span style="color: #008000;font-family: Bold;font-weight: 700;">{{applyPayInfo.tradeSize}}</span>笔交易记录，
                            三方应收： <span style="color: #ff0000;font-family: Bold;font-weight: 700;">{{applyPayInfo.thirdPartyReceivable/100 | currency ''}}</span>  元，
                            补贴划付： <span style="color: #ff0000;font-family: Bold;font-weight: 700;">{{applyPayInfo.payAmount/100 | currency ''}}</span>  元，
                            暂扣税金： <span style="color: #ff0000;font-family: Bold;font-weight: 700;">{{applyPayInfo.suspensionTax/100 | currency ''}}</span>  元
                        </div>
                        <div class="form-group">
                            <label class="payment-method"><i style="color:red;">*</i>付款方式：</label>
                            <select class="form-control" v-model="payTypes" style="width: 30%;display: inline-block;">
                                <option value="1">备付金账户</option>
                                <option value="2">商户预付款账户</option>
                                <option value="3">银行结算</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label><input type="checkbox" v-model="mergePay"/>
                                相同账户合并付款</label>
                        </div>
                    </div>
                </content-dialog>

            </div>
        </div>
    </index>
</template>
<style lang="sass" scoped>
    .validation-error-label{
        margin-left: 20%;
    }
    .timeerror,.suberror,.suberror1{
        display: none;
    }
     .suberror,.suberror1{
        padding-top: 3px;
    }
    .datatable-scroll{
        overflow: auto;
    }
    label i{
        color: red;
    }
    .btns{
        text-align: center;
    }

    .form-group{
        text-align: left;
    }
      .form-group.tc{
        text-align: center;
    }
     .modal-body .form-control{
        text-align: left;
        width:83%;
        display: inline-block;
    }
     .modal-body label{
        display: inline-block;
         font-size:13px;
    }
     .modal-body label i{
        color:red;
    }
    .modal-body button{
        width:35%;
    }

</style>
<script>
    import ContentDialog from '../components/ContentDialog.vue'
    import model from '../../ajax/Transaction/manually_model'
    export default{
        components: { ContentDialog },
        computed:{
        },
        data(){
            this.model=model(this);
            return{
                origin:window.origin,
                checkedIds:[],
                checkForm:{
                    subCompanyID:"",
                    cityID:"",
                    type:"",
                    startDate:"",
                    endDate:"",
                    merchantOperationID:"",
                    merchantName:"",
                    tradeDetailID:"",
                    serialNumber:"",
                    phone:"",
                    activityOperationID:'',
                    pageIndex:1,
                    timeRange:'3',
                    pageSize:10
                },
                subcompanyList:[],
                pageall:1,
                tradeList:[],
                cityList:[],
                merchantList:[],
                nums:{},
                applyPayInfo:{

                },
                show:false,
                submitId:[],
                payTypes:'1',
                mergePay:''
            }
        },
        methods:{
            //获取交易记录
             getTradeList(data){
                 this.model.manuallysum(data)
                         .then((response)=>{
                             (response.data.code==0)?this.$set('nums',response.data.data):null;
                         });
                 this.model.manually_list(data)
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
                this.checkedIds=[];
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getTradeList(this.checkForm);
            },
            tradeDetailexcel() {
                if(!this.tradeList.length>0)return;
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.tradeDetailexcel+ $.param(this.checkForm));
            },
            payApply(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.select_manuallypay(this.checkForm)
                        .then((response)=>{
                            // *** 判断请求是否成功如若
                            // *** 判断请求是否成功如若
                            if(response.data.code==0){
                                this.$set('applyPayInfo', response.data.data)
                                this.show=true;
                            }
                        });
            },
            submit(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                let data=_.cloneDeep(this.checkForm);
                data.payType=this.payTypes;
                data.mergePay=this.mergePay;
                this.model.manuallypay(data)
                        .then((response)=>{
                            if(response.data.code==0){
                                dialogs('success',response.data.message);
                                this.query();
                            }
                        });
            },
            getTime(){
                this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
            },
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