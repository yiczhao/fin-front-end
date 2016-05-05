<template>
    <index :title="'额度采购账户列表'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="check-panel">
                <span>账户列表</span>
                <a v-link="{name:'limitaccount-info'}">账户明细</a>
            </div>
         <div class="panel">
                <div class="panel-heading">
                    <div>
                        <span>商户名：南昌玩聚和他(她)朋友们咖啡馆</span>
                        <span>累计总额度：{{nums.val1}}</span>
                        <span>累计使用：{{nums.val2}}</span>
                        <span>使用比：{{nums.val3}}%</span>
                        <span>剩余额度：{{nums.val4}}</span>
                    </div>
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.keyword" placeholder="账户名">
                        </div>
                        <div class="form-group">
                            <input type="button" class="btn btn-info" @click="initList" value="查询">
                        </div>
                    </form>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <div v-if="zdlists.length>0"  class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
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
                            <tr role="row" v-for="trlist in zdlists">
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
                                <td><a data-toggle="modal" data-target="#modal_pay" href="javascript:void(0)">充值</a></td>
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <page :all="pageall"
                              :cur.sync="pagecur"
                              :page_size.sync="page_size">
                        </page>
                    </div>
                    <div style="padding: 30px;font-size: 16px;text-align: center" v-else>
                        未找到您要查询的账户
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
                                        <span>南昌玩聚和他(她)朋友们咖啡馆</span>
                                    </div>
                                    <div class="form-group">
                                        <label>额度余额：</label>
                                        <span>4,539.00</span>
                                    </div>
                                    <div class="form-group">
                                        <label>本金余额：</label>
                                        <span>3,631.20</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>额度：</label>
                                        <input type="text" class="form-control" v-validate:val1="['required']">
                                        <span v-if="$vali.val1.required && $vali.val1.dirty" class="validation-error-label">请输入额度</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>本金：</label>
                                        <input type="text" class="form-control" v-validate:val2="['required']">
                                        <span v-if="$vali.val2.required && $vali.val2.dirty" class="validation-error-label">请输入简额度</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>折扣：</label>
                                        <input type="text" class="form-control" v-validate:val3="['required']">
                                        <span v-if="$vali.val3.required && $vali.val3.dirty" class="validation-error-label">请输入折扣</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>方式：</label>
                                        <label><input type="radio" value="one" v-model="payType">
                                        现金转账</label>
                                        <label><input type="radio" value="two" v-model="payType">
                                        资源置换</label>
                                    </div>
                                    <template v-show="payType=='one'">
                                        <div class="form-group">
                                            <label>付款账户：</label>
                                            <span>南昌备付金</span>
                                        </div>
                                        <div class="form-group">
                                            <label>收款信息：</label>
                                            <p>账户名：魏璇</p>
                                            <p>账  号：6214837910896095</p>
                                            <p>开户行：招商银行股份有限公司南昌营业部</p>
                                            <p>提入行号：308421022022</p>
                                        </div>
                                    </template>
                                    <div class="form-group" v-else>
                                        <label><i>*</i>上传凭证：</label>
                                        <input type="file">
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>类型：</label>
                                        <label><input type="radio" v-model="zdhf" value="one">
                                        循环充值</label>
                                        <label><input type="radio" v-model="zdhf" value="two">
                                        结算充值</label>
                                    </div>
                                    <div class="form-group">
                                        <label for="tarea" class="w28"><i>*</i>备注：</label>
                                        <textarea class="form-control" width="70%" cols="20" rows="3"></textarea>
                                    </div>
                                    <div class="form-group tc">
                                        <button type="button" @click="addBtn" class="btn btn-primary">充值</button>
                                    </div>
                                    <div class="form-group">
                                        <span class="suberror validation-error-label">你的信息未填写完整</span>
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
        margin-left: 20%;
    }
     .timeerror,.suberror,.suberror1{
        display: none;
    }
     .suberror,.suberror1{
        padding-top: 3px;
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
                width: 80%;
                margin: 0 auto;
                padding: 5px 0;
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
    import model from './model.js'
    export default{
        data(){
            this.model=model(this.$http);
            return{
                pagecur:1,
                page_size:15,
                pageall:1,
                loginList:{},
                defaultData:{"id": "","keyword": "","pageIndex": 1, "pageSize": 15},
                zdlists:[],
                accountId:'',
                zdhf:'one',
                payType:'one',
                nums:{
                    'val1':0,
                    'val2':0,
                    'val3':0,
                    'val4':0,
                }
            }
        },
        methods:{
            getZlists(data){
                this.model.post_point_exchange_list(data)
                            .then(function (response) {
                                // *** 判断请求是否成功如若成功则填充数据到模型
                                this.$set('zdlists', response.data.data)
                                this.$set('pageall', response.data.total)
//                                (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
//                                (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                            }, function (response) {
                                console.log(response);
                            });
            },
            initList(){
                $(".modal").modal("hide");
                this.getZlists(this.defaultData);
            },
            addBtn(){

            }
        },
        ready: function () {
            let vm=this;
            vm.accountId=vm.defaultData.id=vm.$route.params.merchantID;
            vm.initList();
            $('#modal_fzr,#modal_add').on('show.bs.modal', function () {
                this.fire=false;
                vm.$resetValidation();
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
                this.nums.val2=this.nums.val1-this.nums.val4;
                this.nums.val3=(this.nums.val2/this.nums.val1)*100;

            },
            pagecur(){
                this.defaultData.pageIndex=this.pagecur;
                this.initList();
            },
            page_size(){
                this.defaultData.pageSize=this.page_size;
                this.initList();
            }
        },
        validators: {
            numeric: function (val) {
                return /^[-+]?[0-9]+$/.test(val)
            }
        }
    }
</script>