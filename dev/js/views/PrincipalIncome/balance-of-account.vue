<template>
    <index :title="'对账'"
           :ptitle="'本金收入'"
           :hname="'principle-order'"
           :isshow="'isshow'">
        <div class="content balance-of-account" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <div class="heading-left">
                        <span class="btn btn-info" v-show="dzradio=='S'" @click="manualCheck" data-ksa="">入账</span>
                        <div class="inline ml20">
                            <label class="w28">对账方式：</label>
                            <input type="radio" id="one" value="G" v-model="dzradio">
                            <label class="w28" for="one">关联对账</label>
                            <input type="radio" id="two" value="S" v-model="dzradio" @click="searchInfo">
                            <label class="w28" for="two">手工对账</label>
                        </div>
                        <div class="inline ml20">
                            <span>账户简称：</span><span style="margin-right: 10px;font-size:14px">{{balance.shortName}}</span>
                            <span>余额：</span><span style="margin-right: 10px;font-size:14px">{{balance.balanceAmount/100 | currency ''}}</span>
                        </div>
                    </div>
                </div>
                <div class="datatable-body" v-show="dzradio=='G'">
                    <div class="datatable-title">
                        <span>请选择银行流水</span>
                        <datepicker  :readonly="true" :value.sync="detailData.startDate" format="YYYY-MM-DD"></datepicker>至
                        <datepicker  :readonly="true" :value.sync="detailData.endDate" format="YYYY-MM-DD"></datepicker>
                        <a class="btn btn-info add-top" @click="searchDetail" data-ksa="">查询</a>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <!--<th><input v-show="!!detailLists.length" type="checkbox" v-model="checkAllDetail" @click="chooseAlldetail"></th>-->
                                <th>记账日期</th>
                                <th>凭证号</th>
                                <th>对方账户名</th>
                                <th>对方账号</th>
                                <th>收入</th>
                                <th>备注</th>
                            </tr>
                        </thead>
                        <tr v-show="!!detailLists.length" role="row" v-for="(index,trlist) in detailLists" v-bind:class="{'odd':(index%2==0)}">
                            <!--<td><input type="checkbox" @click="checked(trlist.ischeck,trlist.id)" v-model="trlist.ischeck"/></td>-->
                            <td>{{trlist.diffTime | datetime}}</td>
                            <td>{{trlist.certificateNumber}}</td>
                            <td>{{trlist.accountName}}</td>
                            <td>{{trlist.accountNumber}}</td>
                            <td>{{trlist.accounincomeAmount/100 | currency ''}}</td>
                            <td>{{trlist.remarks}}</td>
                        </tr>
                        <tr v-show="!!detailLists.length" role="row">
                            <!--<td></td>-->
                            <td>合计：</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{detailTotal/100 | currency ''}}</td>
                            <td></td>
                        </tr>
                        <tr v-show="!detailLists.length" role="row">
                            <td colspan="7" style="text-align:center;">无银行流水</td>
                        </tr>
                    </table>
                </div>
                <div class="datatable-body br20" v-show="dzradio=='G'">
                    <div class="datatable-title">
                        <span>请选择本金入账订单</span>
                        <datepicker  :readonly="true" :value.sync="orderData.startDate" format="YYYY-MM-DD"></datepicker>至
                        <datepicker  :readonly="true" :value.sync="orderData.endDate" format="YYYY-MM-DD"></datepicker>
                        <a class="btn btn-info add-top" @click="searchOrder" data-ksa="">查询</a>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <!--<th><input v-show="!!orderLists.length" type="checkbox" v-model="checkAllorder" @click="chooseAllorder"></th>-->
                                <th>交易日期</th>
                                <th>交易通道</th>
                                <th>入账金额</th>
                            </tr>
                        </thead>
                        <tr v-show="!!orderLists.length" role="row" v-for="(index,trlist) in orderLists" v-bind:class="{'odd':(index%2==0)}">
                            <!--<td><input type="checkbox" @click="checked(trlist.ischeck,trlist.id)" v-model="trlist.ischeck"/></td>-->
                            <td>{{trlist.tradeDate | datetime}}</td>
                            <td>{{trlist.runningChannelShortName}}</td>
                            <td>{{trlist.entryAmount/100 | currency ''}}</td>
                        </tr>
                        <tr v-show="!!orderLists.length" role="row">
                            <!--<td></td>-->
                            <td>合计：</td>
                            <td></td>
                            <td>{{orderTotal/100 | currency ''}}</td>
                        </tr>
                        <tr v-show="!orderLists.length" role="row">
                            <td colspan="4" style="text-align:center;">无本金入账订单</td>
                        </tr>
                    </table>
                </div>
                <div class="datatable-body Sbody" v-show="dzradio=='S'">
                    <div class="form-group">
                        <span class="iblock">对方账户名：</span><span>{{infoList.accountName}}</span>
                    </div>
                    <div class="form-group">
                        <span class="iblock">账 号：</span><span>{{infoList.accountNumber}}</span>
                    </div>
                    <div class="form-group">
                        <span class="iblock">收入：</span><span>{{infoList.incomeAmount/100 | currency '' }}</span>
                        <span class="tr iblock">支出：</span><span>{{infoList.payoutAmount/100 | currency '' }}</span>
                    </div>
                    <div class="form-group">
                        <span class="iblock">交易时间：</span><span>{{infoList.tradeTime | datetime}}</span>
                    </div>
                    <div class="form-group">
                        <span class="iblock">凭证号：</span><span>{{infoList.certificateNumber}}</span>
                    </div>
                    <div>
                        <div class="form-group">
                            <label  class="iblock"><i>*</i>用途：</label>
                            <select class="form-control"  v-model="infoList.purpose">
                                <option value="">请选择用途</option>
                                <option value="1">交易入账</option>
                                <option value="2">往来款</option>
                                <option value="3">还扣收款</option>
                                <option value="4">商户退款</option>
                                <option value="5">账户费用</option>
                                <option value="6">测试款</option>
                                <option value="7">其他</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label  class="iblock" for="tarea" style="position: relative;top: -59px;"><i>*</i>备注：</label>
                            <textarea class="form-control" v-model="infoList.remarks" width="70%" cols="20" rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </index>
</template>
<style lang="sass">
.balance-of-account{
    .btn{
        vertical-align: baseline;
    }
    .datatable-body{
        margin:20px 0;
        .datatable-title{
            padding: 0 20px;
            text-align: right;
            span{
                font-size: 17px;
                float:left;
            }
        }
    }
    .br20{
        border-top: 20px solid #f5f5f5;
        padding-top: 20px;
    }
    .Sbody{
        font-size: 16px;
        padding-left: 132px;
        color: #666;
        .form-group{
            margin-bottom: 25px;
        }
        .iblock{
            width: 115px;
            display: inline-block;
            text-align: right;
            margin-right: 20px;
            i{
                color:red;
            }
        }
        .form-control{
            display: inline-block;
            width: 400px;
        }
    }
}
</style>
<script>
    import model from '../../ajax/PrincipalIncome/balance_of_account_model'
    export default{
        computed:{
//            checkAllOrder(){
//                let clength=0;
//                this.orderLists.map((value)=>{
//                    (!value.ischeck)?clength++:null;
//                })
//                return !clength
//            },
//            checkAllDetail(){
//                let clength=0;
//                this.detailLists.map((value)=>{
//                    (!value.ischeck)?clength++:null;
//                })
//                return !clength
//            }
        },
        data(){
            this.model=model(this);
            return{
                dzradio:'G',
                detailData:{
                    startDate:'',
                    bankAccountID:'',
                    endDate:''
                },
                orderData:{
                    startDate:'',
                    bankAccountID:'',
                    endDate:''
                },
                detailLists:[],
                orderLists:[],
                infoList:[],
                balance:{

                }
            }
        },
        methods:{
            // *** 请求账户数据
            searchDetail(){
                let data=_.cloneDeep(this.detailData);
                if(data.endDate<data.startDate){
                    let a=data.endDate,b=data.startDate;
                    this.detailData.startDate=a;
                    this.detailData.endDate=b;
                    data.startDate=a;
                    data.endDate=b;
                }
                this.model.principleCheckingdetailList(this.detailData)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('detailLists', response.data.data);
                                response.data.data.map((value)=>{
                                    this.detailTotal+=value.accounincomeAmount;
                                })
                            }
                        });
            },
            searchOrder(){
                let data=_.cloneDeep(this.orderData);
                if(data.endDate<data.startDate){
                    let a=data.endDate,b=data.startDate;
                    this.orderData.startDate=a;
                    this.orderData.endDate=b;
                    data.startDate=a;
                    data.endDate=b;
                }
                this.model.principleCheckingorderList(this.orderData)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('orderLists', response.data.data);
                                response.data.data.map((value)=>{
                                    this.orderTotal+=value.entryAmount;
                                })
                            }
                        });
            },
            searchInfo(){
                this.model.principleCashDetailinfo(this.orderData.bankAccountID)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('infoList', response.data.data);
                            }
                        });
            },
            manualCheck(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.infoList.purpose==''||this.infoList.remarks==''){
                    dialogs('info','请填写必填信息！');
                    return;
                }
                this.model.principleCheckingordermanualCheck(this.infoList)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                dialogs('success',response.data.message);
                                this.$router.go({name:'principle-info',params:{principleId:this.$route.params.shortId}});
                            }
                        });
            },
            getShortName(){
                this.model.principleBalanceList(this.$route.params.shortId).then((res)=>{
                    if(res.data.code == 0){
                        this.$set('balance', res.data.data)
                    }
                });
            }
//            chooseAllDetail(){
//                this.checkedIds=[];
//                let cloneData=_.cloneDeep(this.recheckLists);
//                cloneData.map((value)=>{
//                    if(this.checkAll){
//                        value.ischeck=false;
//                    }else{
//                        if(value.status==7){
//                            this.checkedIds.push(value.id);
//                            value.ischeck=true;
//                        }
//                    }
//                })
//                this.recheckLists=cloneData;
//            },
//            chooseAllOrder(){
//                this.checkedOrderIds=[];
//                let cloneData=_.cloneDeep(this.orderLists);
//                cloneData.map((value)=>{
//                    if(this.checkAll){
//                        value.ischeck=false;
//                    }else{
//                        this.checkedOrderIds.push(value.id);
//                        value.ischeck=true;
//                    }
//                })
//                this.orderLists=cloneData;
//            },
//            checkedOrder(bool,_id){
//                if(!bool){
//                    this.checkedOrderIds.push(_id);
//                }else{
//                    _.remove(this.checkedOrderIds, function(n) {
//                        return n==_id;
//                    })
//                }
//            },
//            chooseAllDetail(){
//                this.checkedDetailIds=[];
//                let cloneData=_.cloneDeep(this.detailLists);
//                cloneData.map((value)=>{
//                    if(this.checkAll){
//                        value.ischeck=false;
//                    }else{
//                        this.checkedDetailIds.push(value.id);
//                        value.ischeck=true;
//                    }
//                })
//                this.detailLists=cloneData;
//            },
//            checkedOrder(bool,_id){
//                if(!bool){
//                    this.checkedDetailIds.push(_id);
//                }else{
//                    _.remove(this.checkedDetailIds, function(n) {
//                        return n==_id;
//                    })
//                }
//            },
        },
        ready: function () {
            (this.$route.params.principleAccountId==':principleAccountId')?this.detailData.bankAccountID=this.orderData.bankAccountID='' : this.detailData.bankAccountID=this.orderData.bankAccountID=this.$route.params.principleAccountId;
            this.searchDetail();
            this.searchOrder();
            this.getShortName();
        },
    }
</script>
