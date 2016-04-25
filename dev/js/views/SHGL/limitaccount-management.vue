<template>
    <index :title="'额度采购账户列表'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :isshow="'isshow'">
        <div class="content limitmanage" slot="content">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <div>
                    <span style="margin:0 20px 10px 0;display: inline-block">商户名：南昌玩聚和他(她)朋友们咖啡馆</span>
                    <span style="margin:0 20px 10px 0;display: inline-block">累计总额度：70,000.00</span>
                    <span style="margin:0 20px 10px 0;display: inline-block">累计使用：65,461.0</span>
                    <span style="margin:0 20px 10px 0;display: inline-block">使用比：93.51%</span>
                    <span style="margin:0 20px 10px 0;display: inline-block">剩余额度：4,539.00</span>
                </div>
                <form class="form-inline manage-form">
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="defaultData.accountNumber" placeholder="账户名">
                    </div>
                    <div class="form-group">
                        <input type="button" class="btn btn-info" @click="checkNew" value="查询">
                    </div>
                </form>
            </div>
            <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                <div class="datatable-scroll">
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
                        <tr role="row">
                            <td>1</td>
                            <td>卡说账户</td>
                            <td>{{ 400000/100 | currency '' }}</td>
                            <td>{{ 400000/100 | currency '' }}</td>
                            <td>{{ 400000/100 | currency '' }}</td>
                            <td>{{ 400000/100 | currency '' }}</td>
                            <td>80%</td>
                            <td>2015-06-15 16:34:47</td>
                            <td>3</td>
                            <td>3</td>
                            <td><a href="">江西广播电台</a></td>
                            <td><a data-toggle="modal" data-target="#modal_pay" href="javascript:void(0)">充值</a></td>
                            <td>餐饮软件置换</td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div class="datatable-footer">
                    <page :all="pageall"
                          :cur.sync="pagecur"
                          :page_size.sync="page_size">
                    </page>
                </div>
            </div>
            <div style="padding: 30px;font-size: 16px;text-align: center" v-else>
                未找到您要查询的账户
            </div>
        </div>
            <div id="modal_waring" data-backdrop="static" class="modal fade" style="display: none;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">×</button>
                            <h5 class="modal-title" v-text="waring"></h5>
                        </div>
                        <div class="modal-body">
                            <div class="form-group tc">
                                <button v-show="waring=='你确认启用该账户？'" type="button" @click="startTrue" class="btn btn-primary">确认</button>
                                <button v-show="waring=='你确认删除该账户？'" type="button" @click="delTrue" class="btn btn-primary">确认</button>
                                <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                            </div>
                        </div>
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
                                        <input type="text" class="form-control" id="val1" v-validate:val1="['required']" placeholder="">
                                        <span v-if="$vali.val1.required && $vali.val1.dirty" class="validation-error-label">请输入额度</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>本金：</label>
                                        <input type="text" class="form-control" id="val2" v-validate:val2="['required']" placeholder="">
                                        <span v-if="$vali.val2.required && $vali.val2.dirty" class="validation-error-label">请输入简额度</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>折扣</label>
                                        <input type="text" class="form-control" id="val3" v-validate:val3="['required']">
                                        <span v-if="$vali.val3.required && $vali.val3.dirty" class="validation-error-label">请输入折扣</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>方式</label>
                                        <label><input type="radio" value="one" v-model="payType">
                                        现金转账</label>
                                        <label><input type="radio" value="two" v-model="payType">
                                        资源置换</label>
                                    </div>
                                    <templete v-show="payType=='one'">
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
                                    </templete>
                                    <div class="form-group" v-else>
                                        <label><i>*</i>上传凭证</label>
                                        <input type="file">
                                    </div>
                                    <div class="form-group">
                                        <label><i>*</i>类型</label>
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
<style>
    .limitmanage .validation-error-label{
        margin-left: 20%;
    }
    .limitmanage .timeerror,.suberror,.suberror1{
        display: none;
    }
    .limitmanage .suberror,.suberror1{
        padding-top: 3px;
    }
    .limitmanage  .form-group{
        text-align: left;
    }
    .limitmanage  .form-group.tc{
        text-align: center;
    }
    .limitmanage .modal-body .form-control{
        text-align: left;
        width:67%;
        display: inline-block;
    }
    .limitmanage .modal-body label{
        width:20%;
        display: inline-block;
    }
    .limitmanage .modal-body label i{
        color:red;
    }
    .limitmanage  .modal-body .waring{
        color: red;
        margin-left: 5px;
    }
    .limitmanage  .modal-body button{
        width:35%;
    }
    .limitmanage td span{
        cursor: pointer;
        color: #3c8dbc;
    }
    .limitmanage td span:hover{
        opacity: 80;
    }
    .limitmanage .page-bar{
        margin: 25px auto;
        text-align: center;
    }
</style>
<script>
    export default{
        data(){
            return{
                pagecur:1,
                page_size:15,
                pageall:1,
                loginList:{},
                defaultData:{"companyId": "","accountType": "","accountNumber": "","pageIndex": 1, "pageSize": 15},
                zdlists:[],
                accountId:'',
                zdhf:'one',
                payType:'one'
            }
        },
        methods:{
            getZlists(data){
                    this.$http.post('./bankaccount/list',data)
                            .then(function (response) {
                                // *** 判断请求是否成功如若成功则填充数据到模型
                                (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                                (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                            }, function (response) {
                                console.log(response);
                            });
            },
            addUser(){
                this.errorHide();
                this.relist={
                    startDate:'',companyId:'',accountType:'',shortName:'',accountName:'',accountNumber:'',bankName:'',
                },
                this.accountId='';
                this.addtitle = '添加账户';
            },
            initList(){
                $(".modal").modal("hide");
                this.getZlists(this.defaultData);
            },
            addBtn(){
                this.errorHide();
                if(!this.$vali.valid){$('.suberror').show();return;}
                if(this.relist.startDate==''){$('.timeerror').show();return;}
                // *** 新增修改保存
                let data={
                    "id": this.accountId,
                    "companyId": this.relist.companyId,
                    "shortName": this.relist.shortName,
                    "accountName": this.relist.accountName,
                    "accountNumber": this.relist.accountNumber,
                    "bankName": this.relist.bankName,
                    "accountType": this.relist.accountType,
                    "startDate": this.relist.startDate
                };
                this.$http.post('./bankaccount/save',data)
                        .then(function (response) {
                            this.initList();
                        }, function (response) {
                            console.log(response);
                        })
            }
        },
        ready: function () {
            (!!sessionStorage.getItem('userData')) ? this.$set('loginList',JSON.parse(sessionStorage.getItem('userData'))) : null;
            let vm=this;
            $('#modal_fzr,#modal_add').on('show.bs.modal', function () {
                this.fire=false;
                vm.$resetValidation();
            })
        },
        components:{
        },
        watch:{
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