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
                            <a class="btn btn-info" data-toggle="modal" @click="batchs">批量复核</a>
                        </div>
                    </form>
                </div>

                <div v-if="recheckLists.length>0" class="dataTables_wrapper">
                    <div class="datatable-scroll" v-show="!!recheckLists.length">
                        <table>
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
                                <td><input type="checkbox" v-model="n.ischeck"/></td>
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
                                    <a @click="pass">通过</a>
                                    <a @click="back">退回</a>
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
        </div>
    </index>
</template>
<style>
</style>
<script>
    import model from '../../ajax/PaymentOfPayment/payrecheck_model'
    export default {
        data(){
            this.model =model(this)
            return {
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
                recheckLists:[]
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
                this.getLists(this.checkForm);
            },
            payRecheckexcel(){

            },
            batchs(){

            },
            chooseAll(){
                let cloneData=_.cloneDeep(this.recheckLists);
                _.map(cloneData,(value)=>{
                    (this.checkAll)?value.ischeck=false:value.ischeck=true;
                })
                this.recheckLists=cloneData;
            }
        },
        computed:{
            checkAll(){
                let clength=0;
                _.map(this.recheckLists,(value)=>{
                    (!value.ischeck)?clength++:null;
                })
                return !clength
            }
        },
        ready(){
            this.query();
        }
    }
</script>
