<template>
    <index :title="'额度采购账户列表'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :p2title="'额度采购'"
           :h2name="'business-limit'"
           :isshow="'isshow'">
        <div class="content" slot="content">
         <div class="panel">
                <div class="panel-heading">
                    <div>
                        <span>商户名：{{accountName}}</span>
                        <span v-if="zdlists.length>0">累计总额度：{{nums.val1}}</span>
                        <span v-if="zdlists.length>0">累计使用：{{nums.val2}}</span>
                        <span v-if="zdlists.length>0">使用比：{{nums.val3}}%</span>
                        <span v-if="zdlists.length>0">剩余额度：{{nums.val4}}</span>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <div v-if="zdlists.length>0"  class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>账户ID</th>
                                <th>账户名</th>
                                <th>总额度</th>
                                <th>总本金</th>
                                <th>剩余额度</th>
                                <th>剩余本金</th>
                                <th>当前折扣率</th>
                                <th>首次充值时间 </th>
                                <th>循环次数</th>
                                <th>优先级</th>
                                <th>供货商</th>
                                <th>操作 </th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.id}}</td>
                                <td>{{trlist.accountName}}</td>
                                <td>{{ trlist.totalLimit/100 | currency '' }}</td>
                                <td>{{ trlist.totalPrincipal/100 | currency '' }}</td>
                                <td>{{ trlist.balanceLimit/100 | currency '' }}</td>
                                <td>{{ trlist.balancePrincipal/100 | currency '' }}</td>
                                <td>{{trlist.currentDiscount}}%</td>
                                <td>{{trlist.firstRechargeTime |datetime}}</td>
                                <td>{{trlist.recycleCount}}</td>
                                <td>{{trlist.priorLevel}}</td>
                                <td><a href="">{{trlist.supplyMerchant}}</a></td>
                                <td><a @click="selectRecharge(trlist.id)" href="javascript:void(0)" data-ksa="limit_purchase_account_manage.recharge">充值</a></td>
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            </tbody>
                        </table>

                        <div class="datatable-bottom">
                           <div class="left">
                                <a class="icon-file-excel" style="line-height: 30px;" v-on:click="tradeDetailexcel" data-ksa="trade_detail_manage.export">Excel导出</a>
                           </div>

                           <div class="right">
                                <page :all="pageall"
                                      :cur.sync="defaultData.pageIndex"
                                      :page_size.sync="defaultData.pageSize">
                                </page>
                           </div>
                        </div>
                    </div>
                    <div style="padding: 30px;font-size: 16px;text-align: center" v-else>
                        未找到数据
                    </div>
                </div>
            </div>
            <validator name="vali">
                <form novalidate>
                    <div id="modal_pay" data-backdrop="static"  class="modal fade" style="display: none;">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                    <h5 class="modal-title">充值</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label>商户名：</label>
                                        <span>{{rechargeInfo.merchantName}}</span>
                                    </div>
                                    <div class="form-group">
                                        <label>额度余额：</label>
                                        <span>{{rechargeInfo.balanceLimit/100 | currency '' }}</span>
                                    </div>
                                    <div class="form-group">
                                        <label>本金余额：</label>
                                        <span>{{rechargeInfo.balancePrincipal/100 | currency '' }}</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>额度：</label>
                                        <input type="text" class="form-control" v-validate:val1="['required']" v-model="addData.purchaseLimit"></div>
                                    <div class="form-group">
                                        <label><i>*</i>本金：</label>
                                        <input type="text" class="form-control" v-validate:val2="['required']" v-model="addData.purchaseCost"></div>
                                    <div class="form-group">
                                        <label><i>*</i>折扣：</label>
                                        <input type="text" class="form-control" v-validate:val3="['required']" v-model="addData.discount"></div>
                                    <div class="form-group">
                                        <label><i>*</i>方式：</label>
                                        <label><input type="radio" value="1" v-model="addData.payType">
                                        现金转账</label>
                                        <label><input type="radio" value="2" v-model="addData.payType">
                                        资源置换</label>
                                    </div>
                                    <div class="form-group" v-show="addData.payType=='1'">
                                        <label>付款账户：</label>
                                        <span>{{rechargeInfo.payAccount}}</span>
                                    </div>
                                    <div class="form-group" v-show="addData.payType=='1'">
                                        <label>收款信息：</label>
                                        <p>账户名：{{rechargeInfo.collectionAccountName}}</p>
                                        <p>账  号：{{rechargeInfo.collectionAccountNumber}}</p>
                                        <p>开户行：{{rechargeInfo.collectionBankName}}</p>
                                        <p>提入行号：{{rechargeInfo.collectionBankNumber}}</p>
                                    </div>
                                    <div class="form-group" v-else>
                                        <label><i>*</i>上传凭证：</label>
                                        <input  style="display:none" @change="uploads($event)" type="file">
                                        <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick">上传凭证</a>
                                        <span v-text="uploadText" v-show="uploadText!=''"></span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>类型：</label>
                                        <label><input type="radio" v-model="addData.rechargeType" value="1">
                                        循环充值</label>
                                        <label><input type="radio" v-model="addData.rechargeType" value="2">
                                        结算充值</label>
                                    </div>
                                    <div class="form-group">
                                        <label for="tarea" class="w28" style="position: relative;top: -70px;"><i>*</i>备注：</label>
                                        <textarea class="form-control" v-validate:val4="['required']" v-model="addData.remarks" width="70%" cols="20" rows="3"></textarea>
                                    </div>
                                    <div class="form-group tc">
                                        <button type="button" @click="addBtn" class="btn btn-primary">充值</button>
                                    </div>
                                    <div class="form-group tc">
                                        <span v-show="($vali.invalid && fire) || errortext!=''" class="validation-error-label" v-text="errortext"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                </validator>
        </div>
    </index>
</template>
<style lang="sass" scoped>
     .validation-error-label{
         display: inline-block;
    }
     .panel-heading{
         div{
             span{
                 margin:0 20px 10px 0;display: inline-block
             }
         }
     }
     th,td{
         text-align: center;
     }
     .modal-body {
         .form-group{
             margin-bottom: 0;
            text-align: left;
             width: 100%;
            display: inline-block;
             input[type="file"],.form-control{
                 width: 75%;
                 display: inline-block;
                 margin-bottom: 10px;
             }
             label{
                 display: inline-block;
                 i{
                     color:red;
                 }
             }
             .waring{
                 color: red;
                 margin-left: 5px;
             }
             button{
                 width:35%;
             }
             td span{
                 cursor: pointer;
                 color: #3c8dbc;
                 &:hover{
                      opacity: 80;
                  }
             }
            p{
                width: 90%;
                margin: 0 auto;
                padding: 5px 0;
                background: #ccc;
                text-indent: 10px;
            }
         }
         .tc{
             text-align: center;
         }
     }
     .page-bar{
        margin: 25px auto;
        text-align: center;
    }
</style>
<script>
    import model from '../../ajax/BusinessManagement/limitmana_model'
    export default{
        data(){
            this.model =model(this)
            return{
                pageall:1,
                loginList:{},
                accountName:'',
                defaultData:{'limitPurchaseMerchantInfoID': '','accountName': '','pageIndex': 1, 'pageSize': 10},
                zdlists:[],
                accountId:'',
                zdhf:'one',
                addData:{},
                errortext:'',
                nums:{
                    'val1':0,
                    'val2':0,
                    'val3':0,
                    'val4':0,
                },
                rechargeInfo:{},
                uploadText:'',
                fire:false
            }
        },
        methods:{
            getZlists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.limitPurchaseAccount(data)
                            .then((response)=>{
                                // *** 判断请求是否成功如若成功则填充数据到模型
                                (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                                (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                            });
            },
            initList(){
                $('.modal').modal('hide');
                this.addData={
                    'limitPurchaseAccountInfoID':'',
                            'purchaseLimit':'',
                            'purchaseCost':'',
                            'discount':'',
                            'payType':'1',
                            'rechargeType':'1',
                            'remarks':'',
                            'certificatesID':''
                };
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
            selectRecharge(_id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.accountId=_id;
                this.model.limitPurchase_selectRechargeInfoByID(_id)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0) {
                                this.$set('rechargeInfo', response.data.data);
                                $('#modal_pay').modal('show');
                            }
                        });
            },
            uploadClick(){
                $('input[type="file"]').val('');
                $('input[type="file"]').click();
            },
            uploads(e){
                if(e.target.value==''&&this.uploadText!=''){
                    return;
                }
                let files=e.target.files[0];
                let vm=this;
                var reader = new FileReader();
                if(!check_upload(files.name)){
                    return;
                }
                reader.readAsDataURL(files);
                reader.onload = function(e){
                    let datas={
                        name:files.name,
                        data:this.result.split(',')[1]
                    }
                    vm.$common_model.upload(datas)
                            .then((response)=>{
                                if(response.data.code == 0){
                                    vm.addData.certificatesID=response.data.data;
                                    vm.saveerror='';
                                    vm.uploadText=files.name;
                                    dialogs('success','上传成功！');
                                }
                     })
                }
            },
            addBtn(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.errortext='';
                if(!this.$vali.valid){this.fire=true;this.errortext='您的信息未填写完整';return;}
                if(this.addData.certificatesID==''&&this.addData.payType=='2'){this.fire=true;this.errortext='请上传凭证';return;}
                let data={};this.addData.limitPurchaseAccountInfoID=this.accountId;
                $.extend(true, data,this.addData);
                data.purchaseLimit=parseInt(data.purchaseLimit)*100;
                data.purchaseCost=parseInt(data.purchaseCost)*100;
                this.model.recharge(data)
                        .then((response)=>{
                            if(response.data.code == 0){
                                dialogs('success','已充值！');
                                this.initList();
                            }
                        });
            }
        },
        ready() {
            let vm=this;
            (this.$route.params.limitPurchaseMerchantInfoID != ':limitPurchaseMerchantInfoID') ? this.defaultData.limitPurchaseMerchantInfoID = this.$route.params.limitPurchaseMerchantInfoID : null;
            (this.$route.params.accountName != ':accountName') ? this.accountName = this.$route.params.accountName : null;
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
            $('#modal_pay').on('hidden.bs.modal', function () {
                $('body').css('padding-right',0);
                vm.uploadText='';
                vm.addData.certificatesID='';
            })
        },
        components:{
        },
        watch:{
            zdlists(){
                var a=0,b=0,c=0,d=0;
                this.zdlists.forEach(function(e){
                    a+=e.totalLimit;
                    b+=e.balanceLimit;
                });
                this.nums.val1=(a/100).toFixed(2);
                this.nums.val4=(b/100).toFixed(2);
                this.nums.val2=(this.nums.val1-this.nums.val4).toFixed(2);
                (this.nums.val1!='0.00')?this.nums.val3=((this.nums.val2/this.nums.val1)*100).toFixed(2):null;
            },
            'defaultData.pageSize+defaultData.pageIndex'(){
                this.initList();
            }
        },
        validators: {
            numeric(val){
                return /^[-+]?[0-9]+$/.test(val)
            }
        }
    }
</script>