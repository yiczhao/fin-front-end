<template>
    <index title="交易明细" ptitle="财务处理" p2title="交易明细"  isshow="isshow">
        <section class="content" slot="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <form class="form-inline manage-form">
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" v-on:click="showDialog" value="添加交易">
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="cSelect">
                                        <option value="" selected="selected">请选择分公司</option>
                                        <option v-for="(index,n) in companylists" v-text="n.companyName" :value="n.companyId"></option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="tSelect">
                                        <option value="">请选择类型</option>
                                        <option v-for="(index,n) in typelists" v-text="n.value" :value="n.accountType"></option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="uText" placeholder="账号信息">
                                </div>
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" v-on:click="checkNew" value="查询">
                                </div>
                            </form>
                        </div>
                        <div class="box-body">
                            <table id="table1" class="table table-bordered table-hover">
                                <thead>
                                <tr>
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
                                    <th>暂扣税金</th>
                                    <th>商户实补</th>
                                    <th>折扣差</th>
                                    <th>扣收金额</th>
                                    <th>33211佣</th>
                                    <th>入账金额</th>
                                    <th>交易时间</th>
                                    <th>手机号</th>
                                    <th>卡号</th>
                                    <th>参与活动</th>
                                    <th>交易类型</th>
                                    <th>操作</th>
                                    <th>备注</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-if="!!tradeList.length" v-for="trlist in tradeList">
                                    <td>{{trlist.id}}</td>
                                    <td>{{trlist.seriesNumber}}</td>
                                    <td>{{trlist.subCompanyName}}</td>
                                    <td>{{trlist.cityName}}</td>
                                    <td>{{trlist.merchantID}}</td> 
                                    <td>{{trlist.merchantName}}</td>
                                    <td>{{trlist.consumptionAmount}}</td>
                                    <td>{{trlist.discountAmount}}</td>
                                    <td>{{trlist.payAmount}}</td>
                                    <td>{{trlist.limitDeduct}}</td>
                                    <td>{{trlist.principalDeduct}}</td>
                                    <td>{{trlist.thirdpartyReceivable}}</td>
                                    <td>{{trlist.merchantSubsidyShould}}</td>
                                    <td>{{trlist.suspensionTax}}</td>
                                    <td>{{trlist.merchantSubsidyActual}}</td>
                                    <td>{{trlist.discountDiff}}</td>
                                    <td>{{trlist.collectionAmount}}</td>
                                    <td>{{trlist.commission33211}}</td>
                                    <td>{{trlist.entryAmount}}</td>
                                    <td>{{trlist.tradeTime}}</td>
                                    <td>{{trlist.consumptionPhone}}</td>
                                    <td>{{trlist.consumptionAccountNumber}}</td>
                                    <td>{{trlist.activityID}}</td>
                                    <td>
                                        <template v-if="trlist.type==1">
                                            正常交易
                                        </template>
                                        <template v-if="trlist.type==2">
                                            手工单
                                        </template>
                                    </td>
                                    <td>
                                       <a href="#">详情</a>
                                    </td>
                                    <td>{{trlist.remarks}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <dialog :title="dialogTitle" :show="showAddWin" :cb-close="closeDialog" :width="500">
                            <div class="modal-body member_rules_modal-body">
                                <div class="form-group">
                                    <label>流水号：</label>
                                    <input type="text" class="form-control" v-model="reNum" >
                                    <span class="waring"></span>
                                </div> 
                                <div class="form-group">
                                    <label><i>*</i>商户名称</label>
                                    <input type="text" class="form-control" v-model="reNum" >
                                    <span class="waring"></span>
                                </div>                                   
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </section>
    </index>
</template>
<style>
    body{
        background-color:#ff0000;
    }
    .box-body{
        overflow:auto;
    }
    
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import dialog from '../components/dialog.vue'
    
    export default{
        props:{

        },
        data(){
            return{
                tradeList:[],
                dialogTitle:'',
                showAddWin:false
            }
        },
        methods:{
             getTradeList:function(data){
                this.$http.get('/dev/js/postjson/tradeList.json',{data})
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('tradeList', response.data.data) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            showDialog:function(){
                this.showAddWin=true,
                this.dialogTitle="添加交易"
            },
            closeDialog:function(){
                this.showAddWin=false,
                this.dialogTitle=""
            }
        },
        ready: function () {
            this.getTradeList({"accountId": 10010});
        },
        components:{
           'datepicker': datepicker,
           'dialog': dialog,
        }
    }
</script>