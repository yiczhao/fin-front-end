<template>
    <index title="申请划付"
           :ptitle="'交易管理'"
           :p2title="'手工结算'"
           :hname="'trade-info'"
           :h2name="'manually-settlement'"
           isshow="isshow">
        <div class="content pay-recheck" slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" @click="batchsBtn" data-ksa="" style="margin-top:20px;">确定提现</a>
                        <span class="btn btn-add add-top" v-link="{name:'manually-settlement'}" data-ksa="" style="margin-top:20px;">返回上一步</span>
                    </div>
                </div>
                <div v-show="recheckLists.length>0" class="dataTables_wrapper">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>活动ID</th>
                                    <th>活动名称</th>
                                    <th>交易笔数</th>
                                    <th>三方应收</th>
                                    <th>补贴划付</th>
                                    <th>暂扣税金</th>
                                </tr>
                            </thead>
                            <tr v-for="(index,n) in recheckLists" v-bind:class="{'odd':(index%2==0)}">
                                <td></td>
                                <td>{{n.activityOperationID}}</td>
                                <td>{{n.activityName}}</td>
                                <td>{{n.merchantOperationID}}</td>
                                <td>{{n.merchantName}}</td>
                                <td>{{n.receiptAccountNumber}}</td>
                                <td>{{n.receiptAccountName}}</td>
                                <td>{{n.suspensionTaxAmount/100 | currency ''}}</td>
                            </tr>
                            <tr>
                                <td>合计：</td>
                                <td></td><td></td><td></td><td></td>
                                <td>{{suspensionTaxAmount/100 | currency ''}}</td>
                                <td>{{suspensionTaxAmount/100 | currency ''}}</td>
                                <td>{{total/100 | currency ''}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="no-list" v-show="!recheckLists.length>0" v-cloak>
                    未查询到数据！
                </div>
            </div>
            <content-dialog
                    :show.sync="show" :is-cancel="true" :type.sync="'primary'"
                    :title.sync="'申请划付'" @kok="submit" @kcancel="show = false"
            >
                <div class="modal-body">
                    <div class="form-group">
                        <label class="payment-method"><i style="color:red;">*</i>付款方式：</label>
                        <select class="form-control" v-model="batchsData.payTypes" style="width: 30%;display: inline-block;">
                            <option value="">请选择付款方式</option>
                            <option value="1">备付金账户</option>
                            <option value="2">商户预付款账户</option>
                            <option value="3">银行结算</option>
                        </select>
                    </div>
                    <div class="form-group" v-show="batchsData.payTypes==1">
                        <label><input type="checkbox" v-model="batchsData.mergePay"/>
                            相同账户合并付款</label>
                    </div>
                </div>
            </content-dialog>
        </div>
    </index>
</template>
<script>
    import model from '../../ajax/Transaction/manually_model'

    export default {
        data(){
            this.model =model(this)
            return {
                show:false,
                total:0,
                batchsData:{
                    mergePay:false,
                    payType:''
                },
                recheckLists:[],
                id:''
            }
        },
        methods:{
            getLists(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.total=this.suspensionTaxAmount=0;
                this.model.subsidyManagement_batch(JSON.parse(sessionStorage.getItem('manuallybatchData')))
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('recheckLists', response.data.data);
                                response.data.data.map((value)=>{
                                    this.total+=value.withdrawCashAmount;
                                    this.suspensionTaxAmount+=value.suspensionTaxAmount;
                                })
                            }
                        });
            },
            query(){
                this.show=false;
                this.getLists();
            },
            payApply(){
                this.batchData={
                    mergePay:false,
                    payType:''
                }
                this.show=true;
            },
            submit(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.batchData.payTypes==''){
                    dialogs('info','请选择付款方式！');
                    return false
                }
                this.model.manuallypay(this.batchData)
                        .then((response)=>{
                            if(response.data.code==0){
                                dialogs('success',response.data.message);
                                this.query();
                            }
                        });
            },
        },
        ready(){
            this.query();
        }
    }
</script>
