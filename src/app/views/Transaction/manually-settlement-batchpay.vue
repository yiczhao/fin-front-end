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
                        <span class="btn btn-add add-top" @click="payApply" data-ksa="manually_settlement.apply_pay" style="margin-top:20px;">生成划付</span>
                        <span class="btn btn-add add-top" v-link="{name:'manually-settlement'}" style="margin-top:20px;">返回上一步</span>
                    </div>
                </div>
                <div v-show="recheckLists.length>0" class="dataTables_wrapper">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>商户号</th>
                                    <th>商户简称</th>
                                    <th>门店号</th>
                                    <th>门店名称</th>
                                    <th>商盟ID</th>
                                    <th>商盟商户名称</th>
                                    <th>活动ID</th>
                                    <th>活动名称</th>
                                    <th>交易笔数</th>
                                    <th>银行应补</th>
                                    <th>补贴划付</th>
                                    <th>暂扣税金</th>
                                </tr>
                            </thead>
                            <tr v-for="(index,n) in recheckLists" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{n.backendMerchantCode}}</td>
                                <td>{{n.backendMerchantName}}</td>
                                <td>{{n.backendStoreCode}}</td>
                                <td>{{n.backendStoreName}}</td>
                                <td>{{n.merchantOperationID}}</td>
                                <td>
                                    <span v-if="!n.existInBackend">{{n.merchantName}}</span>
                                </td>
                                <td>{{n.activityOperationID}}</td>
                                <td>{{n.activityName}}</td>
                                <td>{{n.tradeSize}}</td>
                                <td>{{n.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{n.merchantSubsidyActual/100 | currency ''}}</td>
                                <td>{{n.suspensionTax/100 | currency ''}}</td>
                            </tr>
                            <tr>
                                <td>合计：</td>
                                <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                <td>{{total.tradeSize}}</td>
                                <td>{{total.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{total.merchantSubsidyActual/100 | currency ''}}</td>
                                <td>{{total.suspensionTax/100 | currency ''}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="no-list" v-show="!recheckLists.length>0" v-cloak>
                    未查询到数据！
                </div>
            </div>
            <content-dialog
                    :show.sync="show" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="'生成划付'" @kok="submit" @kcancel="show = false"
            >
                <div class="modal-body">
                    <div class="form-group">
                        <div class="form-group" v-if="!!redata">
                            <span style="color:red">该门店关联了"{{redata.accountName}}"预付款账户，余额是
                            {{redata.balanceAmount/100 | currency ''}}元，请先确认付款方式</span>
                        </div>
                        <label class="payment-method"><i style="color:red;">*</i>付款方式：</label>
                        <select class="form-control" v-model="batchsData.payType" style="width: 80%;display: inline-block;">
                            <option value="">请选择付款方式</option>
                            <option value="1">备付金账户</option>
                            <option value="2">商户预付款账户</option>
                            <option value="3">银行结算</option>
                        </select>
                    </div>
                    <div class="form-group" v-show="batchsData.payType==1">
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
                total:{
                    tradeSize:0,
                    suspensionTax:0,
                    thirdPartyReceivable:0,
                    merchantSubsidyActual:0,
                },
                batchsData:{
                    mergePay:false,
                    payType:''
                },
                redata:[],
                recheckLists:[],
                id:''
            }
        },
        methods:{
            getLists(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.total={
                    tradeSize:0,
                    suspensionTax:0,
                    thirdPartyReceivable:0,
                    merchantSubsidyActual:0,
                }
                this.model.manuallySettlement_list(JSON.parse(sessionStorage.getItem('manuallybatchData')))
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('recheckLists', response.data.data);
                                response.data.data.map((value)=>{
                                    this.total.tradeSize+=value.tradeSize;
                                    this.total.suspensionTax+=value.suspensionTax;
                                    this.total.thirdPartyReceivable+=value.thirdPartyReceivable;
                                    this.total.merchantSubsidyActual+=value.merchantSubsidyActual;
                                })
                            }
                        });
            },
            query(){
                this.show=false;
                this.getLists();
            },
            payApply(){
                if(!this.recheckLists.length){
                    dialogs('info','没有可划付数据！');
                    return;
                }
                this.batchsData={
                    mergePay:false,
                    payType:''
                }
                let data=[]
                _.map(this.recheckLists,(val)=>{
                    data.push(val.merchantID);
                })
                this.model.manuallySettlement_generateInfo({merchantIDs:data.toString()})
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('redata', response.data.data);
                            this.show=true;
                        }
                    });
            },
            submit(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.batchsData.payType==''){
                    dialogs('info','请选择付款方式！');
                    return false
                }
                let data=_.cloneDeep(JSON.parse(sessionStorage.getItem('manuallybatchData')));
                data.mergePay=this.batchsData.mergePay;
                data.payType=this.batchsData.payType;
                this.model.manuallypay(data)
                        .then((response)=>{
                            if(response.data.code==0){
                                dialogs('success',response.data.message);
                            }
                            if(back_json.num==0){
                                back_json.num++;
                            }
                            this.query();
                        });
            },
        },
        ready(){
            this.query();
        }
    }
</script>
