<template>
    <index :title="'账户明细'"
           :ptitle="'三方管理'"
           :hname="'third-party'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                            <div class="form-group">
                                <input type="button" @click="recharge()" data-toggle="modal" data-target="#modal_submit" class="btn btn-info" value="回款充值">
                            </div>
                            <div class="form-group">
                                <select class="form-control" v-model="dateS">
                                    <option value="0">昨天</option>
                                    <option value="1">最近一周</option>
                                    <option value="2">最近一个月</option>
                                    <option value="3">最近三个月</option>
                                    <option value="4">自定义时间</option>
                                </select>
                            </div>
                            <div class="form-group" v-show="dateS==4">
                                <datepicker :readonly="true" :value.sync="defaultData.startDate"
                                            format="YYYY-MM-DD"></datepicker>
                                至
                                <datepicker :readonly="true" :value.sync="defaultData.endDate"
                                            format="YYYY-MM-DD"></datepicker>
                            </div>
                        <div class="form-group">
                            <input type="number" class="form-control" v-model="defaultData.merchantOperationID" placeholder="商户ID"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.merchantName" placeholder="商户名">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.serialNumber" placeholder="订单号、交易流水号">
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.type">
                                <option value="">请选择类型</option>
                                <option value="2">三方补贴</option>
                                <option value="1">回款充值</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.remarks" placeholder="备注">
                        </div>
                        <div class="form-group">
                            <input type="button" class="btn btn-info" @click="initList" value="查询">
                        </div>
                    </form>
                </div>
                <div class="datatable-header">
                    <span>账户名：{{blanceList.accountName}}</span>
                    <span>账户余额：{{blanceList.balanceAmount/100 | currency ''}}元</span>
                </div>
                <div v-if="zdlists.length>0" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>订单号/交易流水号</th>
                                <th>商户ID</th>
                                <th>商户名称</th>
                                <th>金额 </th>
                                <th>类型</th>
                                <th>交易时间</th>
                                <th>操作</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in zdlists">
                                    <td>{{trlist.serialNumber}}</td>
                                    <td><template v-if="trlist.type==2">{{trlist.merchantOperationID}}</template></td>
                                    <td><template v-if="trlist.type==2">{{trlist.merchantName}}</template></td>
                                    <td>
                                        <template v-if="trlist.type==2">-</template>{{trlist.amount/100 | currency ''}}
                                    </td>
                                    <td>
                                        <template v-if="trlist.type==1">回款充值</template>
                                        <template v-if="trlist.type==2">三方补贴</template>
                                    </td>
                                    <td>{{trlist.tradeTime | datetime}}</td>
                                    <td>
                                        <a v-if="trlist.type==2" v-link="{'name':'trade-info',params:{'serialNumber':trlist.serialNumber}}">查看</a>
                                    </td>
                                    <td>{{trlist.remarks}}</td>
                                </tr>
                                <tr role="row">
                                    <td></td>
                                    <td></td>
                                    <td>合计：</td>
                                    <td>{{total/100 | currency ''}}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
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
                    未找到数据
                </div>

                <validator name="vali">
                    <form novalidate>
                <div data-backdrop="static"  id="modal_submit" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">回款充值</h5>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label class="control-label">名称：{{blanceList.accountName}}</label>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">余  额：{{blanceList.balanceAmount/100 | currency ''}}</label>
                                </div>
                                <div class="form-group">
                                    <label class="control-label"><i>*</i>金额：</label>
                                    <input type="text" v-validate:val1="['required']" class="form-control" v-model="redata.money"  onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')">
                                </div>
                                <div class="form-group">
                                    <label style="position: relative;top: -95px;" class="control-label"><i>*</i>备注：</label>
                                    <textarea rows="5" cols="5" class="form-control" v-model="redata.remarks" v-validate:val2="['required']"></textarea>
                                </div>
                                <div class="form-group tc">
                                    <button  type="button" @click="rechargeTrue" class="btn btn-primary">确认回款</button>
                                </div>
                                <div class="form-group tc">
                                    <span v-show="$vali.invalid&&saveerror" class="validation-error-label">
                                        您的信息未填写完整
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </form>
                </validator>

            </div>
        </div>
    </index>
</template>
<style lang="sass" scoped>
    .datatable-header{
        padding-bottom: 20px;
        span{
            margin-right: 20px;
        }
    }
    .m20{
        margin-bottom: 20px;
    }
    .addtop,  .addbottom{
        overflow: hidden;
    .form-control{
        padding: 7px;
    }
    }
    .addbottom{
        margin-top: 15px;
    .col-md-2{
        text-align: center;
    input{
        margin-bottom: 10px;
    }
    }
    .col-md-7{
        height: 300px;
        overflow: auto;
        border: 1px solid #ccc;
    }
    .col-md-1{
        padding-top: 40px;
        text-align: center;
    input{
        margin:15px 0;
    }
    }
    .col-md-4{
        border: 1px solid #ccc;
        padding:10px;
    }
    ul{
        list-style: none;
        height: 278px;
        overflow: auto;
    li{
        margin:5px 0;
        cursor: pointer;
        padding-left:3px;
    }
    }
    }
    table tr{
    td,th{
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    span{
        cursor: pointer;
        color: #3c8dbc;
    &:hover{
         opacity: 80;
     }
    }
    }
    input[type="checkbox"]{
        position: relative;
        top: 2px;
        left: -2px;
    }
    }
    .addbottom table tr td,  .addbottom table tr th{
        padding: 2px;
    }
    #modal_submit{
        label i{
            color: red;
        }
        .form-control{
            width: 80%;
            display: inline-block;
        }
    }
    .pull-left label i{
        color:red;
    }
    .pull-left{
        .validation-error-label{
            line-height: 20px;
            padding-left: 18px;
            margin-top: 10px;
        }
    }
    .validation-error-label{
        display: inline;
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/SFGL/thirdinfo_model'
    export default{
        data(){
            this.model =model(this)
            return{
                blanceList:{
                    accountName:'',
                    balanceAmount:'',
                },
                dateS:'1',
                pagecur:1,
                page_size:10,
                pageall:1,
                city:[],
                shcity:[],
                companylists:[],
                defaultData:{
                    'thirdPartyAccountID': '',
                    'merchantName': '',
                    'merchantOperationID': '',
                    'serialNumber': '',
                    'type': '',
                    'remarks':'',
                    'pageIndex': 1,
                    'pageSize': 10,
                    'startDate':'',
                    'endDate':''
                },
                zdlists:[],
                id:'',
                redata:{
                    id:'',
                    money:'',
                    remarks:'',
                    name:'',
                    balanceAmount:''
                },
                saveerror:false,
                total:0
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if (data.endDate < data.startDate) {
                    let a = data.endDate, b = data.startDate;
                    this.checkForm.startDate = a;
                    this.checkForm.endDate = b;
                    data.startDate = a;
                    data.endDate = b;
                }
                this.model.thirdinfo_list(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                            (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                        });
                this.model.getthirdinfo_total(data)
                        .then((response)=>{
                            (response.data.code==0)?this.$set('total',response.data.data):null;
                        })
            },
            getClist(){
                // *** 请求公司数据
                let data={
                    'type':'ImportUser'
                }
                this.$common_model.getcompany(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('companylists', response.data.data) : null;
                });
            },
            //获取城市数据
            getCity(_id){
                this.defaultData.cityID='-1';
                    let data={
                        'subCompanyID':_id
                    }
                    this.$common_model.getcity(data)
                            .then((response)=>{
                                // *** 判断请求是否成功如若成功则填充数据到模型
                                (response.data.code==0) ? this.$set('city', response.data.data) : null;
                            });
            },
            //获取城市数据
            getshCity(_id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.shdata.cityID='-1';
                let data={
                    'subCompanyID':_id
                }
                this.$common_model.getcity(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('shcity', response.data.data) : null;
                        });
            },
            initList(){
                $('.modal').modal('hide');
                this.getZlists(this.defaultData);
                this.getBlance();
            },
            recharge(){
                this.saveerror=false;
                this.redata={
                    id:this.defaultData.thirdPartyAccountID,
                    money:'',
                    remarks:'',
                }
            },
            getTime(){
                this.defaultData.startDate = init_date(this.dateS)[0];
                this.defaultData.endDate = init_date(this.dateS)[1];
            },
            getBlance(){
                this.model.thirdinfo_Blance(this.defaultData.thirdPartyAccountID)
                        .then((res)=>{
                            (res.data.code==0)?this.$set('blanceList',res.data.data):null;
                        })
            },
            rechargeTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.saveerror=true;
                if(this.$vali.invalid)return;
                let data={
                    id:this.redata.id,
                    money:this.redata.money *100,
                    remarks:this.redata.remarks
                }
                this.model.thirdParty_recharge(data)
                        .then((res) => {
                                if(res.data.code == 0){
                                    this.initList()
                                    dialogs('success','已充值！')
                                }
                            })
            }
        },
        ready() {
            var vm=this;
            this.defaultData.startDate = init_date(this.dateS)[0];
            this.defaultData.endDate = init_date(this.dateS)[1];
            (vm.$route.params.id != ':id') ? vm.defaultData.thirdPartyAccountID = vm.$route.params.id : null;
            (vm.$route.params.serialNumber != ':serialNumber') ? vm.defaultData.serialNumber = vm.$route.params.serialNumber : null;
            vm.getClist();
            vm.initList();
        },
        components:{
            'datepicker': datepicker
        },
        watch:{
            dateS(){
                this.getTime();
            },
            pagecur(){
                this.defaultData.pageIndex=this.pagecur;
                this.initList();
            },
            page_size(){
                this.defaultData.pageSize=this.page_size;
                this.initList();
            }
        }
    }
</script>