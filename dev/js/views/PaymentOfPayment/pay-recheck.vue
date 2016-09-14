<template>
    <index title="划付复核" ptitle="备付金支出"  isshow="isshow">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.paytype">
                                <option value="">全部付款方式</option>
                                <option value="1">备付金账户</option>
                                <option value="2">商户预付款账户</option>
                                <option value="3">银行结算</option>
                                <option value="4">其他</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.subCompanyID">
                                <option value="">全部分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.purpose">
                                <option value="">全部用途</option>
                                <option value="1">补贴划付</option>
                                <option value="3">补贴退税</option>
                                <option value="10">税金提现</option>
                                <option value="4">预付款</option>
                                <option value="2">额度采购</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.status">
                                <option value="">全部状态</option>
                                <option value="7">等待复核</option>
                                <option value="9">复核通过</option>
                                <option value="8">复核不通过</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.createType">
                                <option value="">全部生成方式</option>
                                <option value="1">系统生成</option>
                                <option value="2">手工结算</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.timeRange">
                                <option value="5">今天</option>
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
                            <input type="text" class="form-control" v-model="checkForm.id" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" placeholder="请输入ID">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="请输入商户ID"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="checkForm.keywords"  placeholder="商户名/收款账户名/账号">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="请输入备注关键词">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="请输入活动ID" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" v-model="checkForm.activityOperationID">
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" v-on:click="query">查询</a>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" v-on:click="payRecheckexcel">导出</a>
                        </div>
                        <br>
                        <div class="form-group">
                            <a class="btn btn-info" data-toggle="modal" @click="batchs(false)">批量复核</a>
                        </div>
                    </form>
                </div>
                <div v-if="recheckLists.length>0" class="dataTables_wrapper">
                    <div class="datatable-scroll" v-show="!!recheckLists.length">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" v-model="checkAll" @click="chooseAll"></th>
                                    <th>ID</th>
                                    <th>申请时间</th>
                                    <th>分公司</th>
                                    <th>城市</th>
                                    <th>付款账户</th>
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>收款账户信息</th>
                                    <th>生成方式</th>
                                    <th>付款方式</th>
                                    <th>用途</th>
                                    <th>三方应补</th>
                                    <th>划付金额</th>
                                    <th>暂扣税金</th>
                                    <th>复核状态</th>
                                    <th>操作</th>
                                    <th>活动名称</th>
                                    <th>备注</th>
                                    <th>不通过原因</th>
                                </tr>
                            </thead>
                            <tr v-for="n in recheckLists">
                                <td><input v-if="n.status==7" type="checkbox" @change="checked(n.ischeck,n.id)" v-model="n.ischeck"/></td>
                                <td>{{n.id }}</td>
                                <td>{{n.createTime | datetime}}</td>
                                <td>{{n.subCompanyName}}</td>
                                <td>{{n.cityName }}</td>
                                <td>{{n.payAccount }}</td>
                                <td>{{n.merchantOperationID }}</td>
                                <td>{{n.merchantName }}</td>
                                <td>{{n.collectionBankName }}<br>
                                    {{n.collectionBankNumber}}
                                </td>
                                <td>
                                    <template v-if="n.createType==1">系统生成</template>
                                    <template v-if="n.createType==2">手工录入</template>
                                </td>
                                <td>
                                    <template v-if="n.payType==1">备付金账户</template>
                                    <template v-if="n.payType==2">预付款账户</template>
                                    <template v-if="n.payType==3">银行结算</template>
                                </td>
                                <td>
                                    <template v-if="n.purpose==1">补贴划付</template>
                                    <template v-if="n.purpose==2">额度采购</template>
                                    <template v-if="n.purpose==3">退税划付</template>
                                    <template v-if="n.purpose==4">预付款</template>
                                    <template v-if="n.purpose==5">供货商划付</template>
                                    <template v-if="n.purpose==10">税金提现</template>
                                </td>
                                <td>{{n.thirdPartySubsidyShould/100 | currency ''}}</td>
                                <td>{{n.payAmount/100 | currency ''}}</td>
                                <td>{{n.suspensionTaxAmount/100 | currency ''}}</td>
                                <td>
                                    <template v-if="n.status==7">待复核</template>
                                    <template v-if="n.status==8">复核不通过</template>
                                    <template v-if="n.status==9">复核通过</template>
                                </td>
                                <td>
                                    <a v-if="n.status==7" @click="pass(n.id)">通过</a>
                                    <a v-if="n.status==7" @click="back(n.id)">退回</a>
                                    <a @click="">详情</a>
                                    <a v-link="">详情</a>
                                    <a @click="">查看</a>
                                    <a v-link="">查看</a>
                                </td>
                                <td>{{n.activityOperationID}}{{n.activityName}}</td>
                                <td>{{n.remarks}}</td>
                                <td>{{n.refuseReason}}</td>
                            </tr>
                            <tr><td>合计：</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                <td>{{total.thirdPartySubsidyShould/100 | currency ''}}</td>
                                <td>{{total.payAmount/100 | currency ''}}</td>
                                <td>{{total.suspensionTaxAmount/100 | currency ''}}</td>
                                <td></td><td></td><td></td><td></td><td></td></tr>
                        </table>
                    </div>
                </div>
                <page v-if="recheckLists.length>0" :all="pageall"
                      :cur.sync="checkForm.pageIndex"
                      :page_size.sync="checkForm.pageSize">
                </page>
                <div style="padding: 30px;font-size: 16px;text-align: center" v-if="!recheckLists.length>0" v-cloak>
                    未找到数据
                </div>
            </div>
            <content-dialog
                    :show.sync="show" :is-cancel="true"
                    :title.sync="dtitle" @kok="backPass" @kcancel="show = false"
            >
                <div class="form-group dcontent" v-show="dtitle=='退回'">
                    <label class="col-lg-3 control-label"><i>*</i>退回原因：</label>
                    <div class="col-lg-9">
                        <textarea rows="5" cols="5" class="form-control" v-bind:class="{ 'error': !remarks&&fires}" v-model="remarks" placeholder=""></textarea>
                        <span v-show="!remarks&&fires" class="validation-error-label">
                            请填写退回原因
                        </span>
                    </div>
                </div>
            </content-dialog>
        </div>
    </index>
</template>
<style lang="sass">
    .dcontent{
        overflow: hidden;
        margin-bottom: 0px;
        .dtitle{
            text-align: center;
            padding-bottom: 15px;
            color:black;
        }
        .control-label {
            i{
                color:red
            }
        }
        .error{
            border-color:red;
        }
        .validation-error-label{
            font-size: 13px;
            margin-top: 15px;
        }
    }
</style>
<script>
    import model from '../../ajax/PaymentOfPayment/payrecheck_model'
    import ContentDialog from '../components/ContentDialog.vue'

    export default {
        data(){
            this.model =model(this)
            return {
                show:false,
                checkForm:{
                    paytype:'',
                    subCompanyID:'',
                    purpose:'',
                    status:'',
                    createType:'',
                    timeRange:'3',
                    startDate:'',
                    endDate:'',
                    id:'',
                    merchantOperationID:'',
                    keywords:'',
                    remarks:'',
                    pageIndex:1,
                    pageSize:10,
                    activityOperationID:''
                },
                pageall:1,
                total:{
                    thirdPartySubsidyShould:0,
                    payAmount:0,
                    suspensionTaxAmount:0
                },
                recheckLists:[],
                checkedIds:[],
                id:'',
                dtitle:'',
                remarks:'',
                fires:false
            }
        },
        methods:{
            getLists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.payrecheck_list(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('recheckLists', response.data.data)
                                this.$set('pageall', response.data.total)
                            }
                        });
                this.model.payrecheck_total(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('total', response.data.data)
                            }
                        });
            },
            query(){
                this.show=false;
                this.checkedIds=[];
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getLists(this.checkForm);
            },
            payRecheckexcel(){

            },
            chooseAll(){
                let cloneData=_.cloneDeep(this.recheckLists);
                _.map(cloneData,(value)=>{
                    if(this.checkAll){
                        value.ischeck=false;
                    }else{
                        if(value.status==7){
                            this.checkedIds.push(value.id);
                            value.ischeck=true;
                        }
                    }
                })
                if(this.checkAll){
                    this.checkedIds=[];
                }
                this.recheckLists=cloneData;
            },
            checked(bool,_id){
                if(bool){
                    this.checkedIds.push(_id);
                }else{
                    _.remove(this.checkedIds, function(n) {
                        return n==_id;
                    })
                }
            },
            getTime(){
                this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
            },
            back(a){
                this.id=a;
                this.dtitle='退回';
                this.show=true;
                this.fires=false;
                this.remarks='';
            },
            pass(a){
                this.id=a;
                this.dtitle='确认通过';
                this.show=true;
            },
            backPass(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.dtitle=='退回'){
                    if(this.remarks==''){
                        this.fires=true;
                        return;
                    }
                    let data={
                        'id':this.id,
                        'refuseReason':this.remarks
                    }
                    this.model.payrecheck_back(data)
                            .then( (response)=> {
                                if(response.data.code==0){
                                    this.query();
                                    dialogs('success','已退回！');
                                }
                            })
                }
                else{
                    this.batchs(true);
                }
            },
            batchs(bool){
                if(bool){
                    var data={
                        'ids':this.id
                    }
                }else{
                    if(!this.checkedIds.length){
                        dialogs('info','未勾选复核信息！');
                        return;
                    }
                    var data={
                        'ids':this.checkedIds
                    }
                }
                this.model.payrecheck_pass(data)
                        .then( (response)=> {
                            if(response.data.code==0){
                                this.query();
                                dialogs('success','已通过！');
                            }
                        })
            }
        },
        computed:{
            checkAll(){
                let clength=0;
                _.map(this.recheckLists,(value)=>{
                    (!value.ischeck&&value.status==7)?clength++:null;
                })
                return !clength
            }
        },
        ready(){
            (this.$route.params.recheckId==':recheckId')?this.checkForm.id='':this.checkForm.id=this.$route.params.recheckId;
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.getTime();
            this.query();
        },
        watch:{
            'checkForm.pageSize+checkForm.pageIndex'(){
                this.query();
            },
            'checkForm.timeRange'(){
                this.getTime();
            }
        },
        components: { ContentDialog }
    }
</script>
