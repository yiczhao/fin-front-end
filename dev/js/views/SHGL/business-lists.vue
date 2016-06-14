<template>
    <index :title="'商户列表'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.merchantOperationID" placeholder="商户ID" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.merchantName" placeholder="商户名">
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.companyId" @change="getCity(defaultData.companyId)">
                                <option value="">全部分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.cityId">
                                <option value="">全部城市</option>
                                <option v-for="(index,n) in city" v-text="n.name" :value="n.cityID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="text" debounce="300" class="form-control" v-model="defaultData.startValue" placeholder="佣金值">
                            -
                            <input type="text" debounce="300" class="form-control" v-model="defaultData.endValue" placeholder="佣金值">
                        </div>
                        <div class="form-group">
                            <input type="button" class="btn btn-info" @click="checkNew" value="查询">
                        </div>
                    </form>
                </div>
                <div v-if="!!zdlists.length" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table">
                            <thead>
                                <tr role="row">
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>分公司</th>
                                    <th>城市</th>
                                    <th>消费总笔数</th>
                                    <th>消费总金额</th>
                                    <th>实付总金额</th>
                                    <th>33211总佣金 </th>
                                    <th>三方折扣差</th>
                                    <th>额采折扣差</th>
                                    <th>交易</th>
                                    <th>佣金值</th>
                                    <th>额度采购消化账户</th>
                                    <th>划款账户</th>
                                    <th>联系人</th>
                                    <th>电话 </th>
                                    <th>工作人员</th>
                                </tr>
                            </thead>
                        <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists">
                                <td>{{trlist.merchantOperationID}}</td>
                                <td>{{trlist.merchantName}}</td>
                                <td>{{trlist.subCompanyName}}</td>
                                <td>{{trlist.cityName}}</td>
                                <td>{{trlist.consumeTotal}}</td>
                                <td>{{trlist.consumeMoney/100 | currency '' }} </td>
                                <td>{{trlist.realMoney/100 | currency '' }} </td>
                                <td>{{trlist.value01/100 | currency '' }} </td>
                                <td>{{trlist.value02/100 | currency '' }} </td>
                                <td>{{trlist.value03/100 | currency '' }} </td>
                                <td><a v-link="{name:'trade-info',params:{merchantOperationID:trlist.merchantOperationID,merchantName:trlist.merchantName}}">明细</a></td>
                                <td>{{trlist.commission/100 | currency '' }} </td>
                                <td>
                                    <a data-toggle="modal" data-target="#modal_checking" href="javascript:void(0)">查看消化账户</a>
                                    <!--<a v-link="{'name':'business-limit'}">额度消化商户</a>-->
                                </td>
                                <td><a href="javascript:void(0)" @click="control(trlist)">管理</a></td>
                                <td>{{trlist.contactsPerson}}</td>
                                <td>{{trlist.contactsPhone}}</td>
                                <td>{{trlist.servicePerson}}</td>
                            </tr>
                             <tr>
                                 <td></td>
                                 <td>合计</td>
                                 <td></td>
                                 <td></td>
                                 <td>{{nums.consumeTotal}}</td>
                                 <td>{{nums.consumeMoney}}</td>
                                 <td>{{nums.realMoney}}</td>
                                 <td>{{nums.value01}}</td>
                                 <td>{{nums.value02}}</td>
                                 <td>{{nums.value03}}</td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
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

                <div data-backdrop="static"  id="modal_checking" class="modal" style="display: none;">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">额度采购消化账户</h5>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <span>商户ID：4392</span>
                                    <span>商户名：南昌玩聚恒茂店</span>
                                    <span class="pull-right">额度采购消化账户：<a v-link="{'name':'business-limit'}">南昌玩聚和他(她)朋友的咖啡馆</a></span>
                                </div>
                                <div style="padding: 10px 0;">历史记录：</div>
                                <table class="table datatable-selection-single dataTable no-footer" style="border: 1px solid #ccc;">
                                    <thead>
                                    <tr role="row">
                                        <th>ID</th>
                                        <th>账户名</th>
                                        <th>更新时间</th>
                                        <th>更新人</th>
                                        <th>变更凭证</th>
                                        <th>更新备注</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr role="row">
                                        <td>1</td>
                                        <td><a data-toggle="modal" data-dismiss="modal" data-target="#modal_control" href="javascript:void(0)">昌玩聚和他(她)朋友们</a></td>
                                        <td>2013-06-03 13:26:19</td>
                                        <td>贾燕</td>
                                        <td><a href="">下载</a></td>
                                        <td>总店额度采购</td>
                                    </tr>
                                    <!--<tr role="row"  v-for="n in checkLists">-->
                                        <!--<td>{{n.certificate}}</td>-->
                                        <!--<td>{{n.collectionName}}</td>-->
                                        <!--<td>{{n.tradeTime || datetime}}</td>-->
                                        <!--<td>{{n.payoutAmount/100 | currency '' }}</td>-->
                                        <!--<td><a href="{{origin}}/file/download/{{n.certificates}}">下载</a></td>-->
                                        <!--<td>{{n.remarks}}</td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-backdrop="static"  id="modal_control" class="modal fade" style="display: none;">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">划款账户</h5>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <span>商户ID：{{controllist.merchantOperationID}}</span>
                                    <span>商户名：{{controllist.merchantName}}</span>
                                    <a class="updatebtn" @click="modal_updata" href="javascript:void(0);">更新</a>
                                </div>
                                <div  v-if="relist!=''" class="mt35">
                                    <div v-if="relist!=''"><span>账户名：{{relist[0].accountName}}</span><span>账  号：{{relist[0].accountNumber}}</span></div>
                                    <div v-if="relist!=''"><span>开户行：{{relist[0].bankName}}</span><span>提入行号：{{relist[0].bankNumber}}</span></div>
                                    <table v-if="index!=0&&relist.length>0" class="table dataTable">
                                        <thead>
                                        <tr role="row">
                                            <th>ID</th>
                                            <th>账户信息</th>
                                            <th>更新时间</th>
                                            <th>更新人</th>
                                            <th>变更凭证</th>
                                            <th>更新备注</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr role="row" v-for="n in relist">
                                                <td>{{$index+1}}</td>
                                                <td>
                                                    {{n.accountName}}
                                                    {{n.accountNumber}}
                                                </td>
                                                <td>{{n.createAt | datetime}}</td>
                                                <td>{{n.createBy}}</td>
                                                <td><a href="{{origin}}/file/download/{{n.certificates}}">下载</a></td>
                                                <td>{{n.remarks}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-backdrop="static"  id="modal_updata" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">更新账户</h5>
                            </div>
                            <validator name="vali">
                                <form novalidate>
                            <div class="modal-body member_rules_modal-body">
                                    <div class="form-group">
                                        <label class="w28"><i>*</i>账户名：</label>
                                        <input v-validate:accountName="['required']" v-model="updateList.accountName" class="form-control" type="text" placeholder="账户名">
                                    </div>
                                    <div class="form-group">
                                        <label class="w28" ><i>*</i>账 号：</label>
                                        <input v-validate:accountNumber="['required']" v-model="updateList.accountNumber" class="form-control" type="text" placeholder="账 号">
                                    </div>
                                    <div class="form-group">
                                        <label class="w28" ><i>*</i>开户行：</label>
                                        <input v-validate:bankName="['required']" v-model="updateList.bankName" class="form-control" type="text" placeholder="开户行">
                                    </div>
                                    <div class="form-group">
                                        <label class="w28" ><i>*</i>提入行号：</label>
                                        <input v-validate:bankNumber="['required']" v-model="updateList.bankNumber" class="form-control" type="text" placeholder="提入行号">
                                        <a href="https://www.hebbank.com/corporbank/otherBankQueryWeb.do" target="_blank">查询行号</a>
                                    </div>
                                    <div class="form-group">
                                        <label class="w28" ><i>*</i>建行否：</label>
                                        <input type="radio" id="one" value="1" v-model="updateList.isCcb" v-validate:isCcb="['required']">
                                        <label class="w28" for="one">是</label>
                                        <input type="radio" id="two" value="0" v-model="updateList.isCcb" v-validate:isCcb="['required']">
                                        <label class="w28" for="two">否</label>
                                    </div>
                                    <div class="form-group">
                                        <label class="w28" ><i>*</i>划付周期：</label>
                                        <select class="form-control"  v-model="updateList.settlementCycle"  v-validate:settlementCycle="['required']">
                                            <option value="0">请选择补贴划付周期</option>
                                            <option value="1">日结</option>
                                            <option value="2">周结</option>
                                            <option value="3">月结</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="w28" ><i>*</i>补贴税率：</label>
                                        <input debounce="300" @keyup="numberMax($event)" v-validate:subsidyRate="['required']" v-model="updateList.subsidyRate" class="form-control" type="number" placeholder="0~100">%
                                    </div>
                                    <div class="form-group">
                                        <label class="w28"><i>*</i>上传凭证：</label>
                                        <input style="display:none" type="file" @change="uploads($event)">
                                        <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick">上传凭证</a>
                                        <span v-text="uploadText" v-show="uploadText!=''"></span>
                                    </div>
                                    <div class="form-group">
                                        <label for="tarea" class="w28" style="position: relative;top: -40px;">备注：</label>
                                        <textarea class="form-control" v-model="updateList.remarks"></textarea>
                                    </div>
                                    <div class="form-group tc">
                                        <button type="button" @click="updateTrue(updateList)" class="btn btn-primary">保存</button>
                                    </div>
                                    <div class="form-group tc">
                                        <span v-show="(!$vali.valid&&updataerror)|| errortext!=''" class="validation-error-label" v-text="errortext"></span>
                                    </div>
                                </div>
                            </form>
                            </validator>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </index>
</template>
<style lang="sass" scoped>
      .form-group{
        text-align: left;
    }
      .form-group.tc{
        text-align: center;
    }
      .modal-body .form-control{
        text-align: left;
        width:67%;
        display: inline-block;
    }
      .modal-body label{
        width:20%;
        display: inline-block;
    }
      .modal-body label i{
        color:red;
    }
      .modal-body .waring{
        color: red;
        margin-left: 5px;
    }
      .modal-body button{
        width:35%;
    }
      table tr td,  table tr th{
         padding: 20px 2px;
         text-align: center;
         text-overflow: ellipsis;
         overflow: hidden;
         white-space: nowrap;
     }
      td span{
        cursor: pointer;
        color: #3c8dbc;
    }
      td span:hover{
        opacity: 80;
    }
      .modal-body .mt35{
         border: 1px solid #ddd;
         margin-top: 35px;
         position: relative;
         padding-top: 15px;
    }
      .modal-body .mt35 table{
         border-top: 1px solid #ddd;
     }
      .modal-body .mt35 .togglebtn{
         display: block;
         position: absolute;
         width: 80px;
         line-height: 25px;
         height: 25px;
         top:-25px;
         left: -1px;
         background: #dadada;
         text-align: center;
         border: 1px solid #ccc;
         border-radius: 15px 15px 0 0;
         cursor: pointer;
     }
      .modal-body .mt35 .active{
        color:#1E88E5;
         top: -30px;
         height: 30px;
         line-height: 30px;
    }
      .modal-body .mt35 div{
         margin-bottom: 10px;
     }
      .modal-body .mt35 div span{
         margin: 0 30px 0 15px;
     }
      .modal-body .mt35 .updatebtn{
         position: absolute;
         right: 20px;
         top: 45px;
     }
    .validation-error-label{
        display: inline-block;
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/SHGL/buslists_model'
    import common_model from '../../ajax/components/model'
    export default{
        data(){
            this.model =model(this)
            this.common_model=common_model(this)
            return{
                origin:window.origin,
                pagecur:1,
                page_size:15,
                pageall:1,
                loginList:{},
                defaultData:{
                    "merchantOperationID": "",
                    "merchantName": "",
                    "companyId": "",
                    "cityId": "",
                    "startValue": "",
                    "endValue": "",
                    "pageIndex": 1,
                    "pageSize": 15
                },
                city:[],
                companylists:[],
                zdlists:[],
                controllist:{},
                relist:[
                    {
                        "id": '',
                        "accountName": "",
                        "accountNumber": "",
                        "bankName": "",
                        "bankNumber": "",
                        "createBy": "",
                        "createAt": "",
                        "certificates": "",
                        "expired": 0,
                        "remarks": ""
                    }
                ],
                typelists:[],
                params:{},
                accountId:'',
                bthf:true,
                nums:{
                    consumeTotal:0,
                    consumeMoney:0,
                    realMoney:0,
                    value01:0,
                    value02:0,
                    value03:0
                },
                updateList:
                {
                    id: '',
                    accountName:'',
                    accountNumber:'',
                    bankName: '',
                    bankNumber: '',
                    createBy:'',
                    createAt: '',
                    certificates: '',
                    expired: '',
                    remarks: '',
                    isCcb:'',
                    accountType:'',
                    settlementCycle:0,
                    subsidyRate:'',
                    merchantID:''
                },
                updataerror:false,
                uploadText:'',
                errortext:''
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(data){
                if(data.endValue<data.startValue){
                    this.defaultData.endValue=b;
                    data.startValue=a;
                    data.endValue=b;
                }
                    this.model.merchant_lists(data)
                            .then((response)=>{
                                (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                                (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                            });
            },
            getClist(){
                // *** 请求公司数据
                this.common_model.getcompany()
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('companylists', response.data.data) : null;
                        });
            },
            //获取城市数据
            getCity(_id){
                this.defaultData.cityId='';
                let data={
                    'subCompanyID':_id
                }
                this.common_model.getcity(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('city', response.data.data) : null;
                        });
            },
            checkNew(){
                this.initList();
            },
            initList(){
                $(".modal").modal("hide");
                this.getZlists(this.defaultData);
            },
            control(_list){
                this.$set('controllist',_list);
                this.updateList.merchantID=_list.merchantID;
                this.accountId=_list.merchantID;
                this.bthf=true;
                this.accountType=1;
                this.checkcontrol( _list.merchantID)
            },
            checkcontrol(_id){
                this.model.merchant_account(_id)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('relist', response.data.data) : null;
                            $('#modal_control').modal('show');
                        });
            },
            bthfShow(type,a){
                switch (type){
                    case 0:
                        if(this.bthf){
                            return
                        }
                        else{
                            this.bthf=true;
                            this.accountType=1;
                            this.checkcontrol(a)
                        }
                        break;
                    case 1:
                        if(!this.bthf){
                            return
                        }
                        else{
                            this.bthf=false;
                            this.accountType=2;
                            this.checkcontrol(a);
                        }
                        break;
                }
            },
            modal_updata(){
                this.errortext='';
                $('#modal_updata').modal('show');
            },
            uploadClick(){
                $('input[type="file"]').val('');
                $('input[type="file"]').click();
            },
            updateBtn(_list){
                var a=_list;
                if(typeof _list=='undefined'){
                    this.updateList={
                        id: '',
                        accountName:'',
                        accountNumber:'',
                        bankName: '',
                        bankNumber: '',
                        createBy:'',
                        createAt: '',
                        certificates: '',
                        expired: '',
                        remarks: '',
                        isCcb:'',
                        accountType:'',
                        settlementCycle:0,
                        subsidyRate:'',
                        merchantID:this.accountId
                    }
                }else{
                    $.extend(true, this.updateList, a);
                }
                this.uploadText='';
                this.updateList.certificates='';
                this.updateList.accountType=this.accountType;
            },
            updateTrue(data){
                if(!this.$vali.valid){
                    this.updataerror=true;
                    this.errortext='您的信息未填写完整！';
                    return;}
                if(this.updateList.certificates==''){
                    this.updataerror=true;
                    this.errortext='请上传凭证！';
                    return;}
                this.updataerror=false;
                this.model.merchant_update(this.updateList)
                        .then(()=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            $(".modal").modal("hide");
                            dialogs();
                        });
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
                    vm.common_model.upload(datas)
                            .then((response)=>{
                                    vm.updateList.certificates=response.data.data;
                                    vm.uploadText=files.name;
                                    this.updataerror=false;
                                    dialogs('success','上传成功！');
                            })
                }
            },
            numberMax(e){
                if(e.target.value>100){
                    return e.target.value=100;
                }
                else if(e.target.value<0){
                    return e.target.value=0;
                }
                else if(e.target.value>=0&&e.target.value<=100){
                    return e.target.value;
                }
                else{
                    return  e.target.value='';
                }
            }
        },
        ready() {
            let vm=this;
            (!!sessionStorage.getItem('userData')) ? vm.$set('loginList',JSON.parse(sessionStorage.getItem('userData'))) : null;
            vm.initList();
            vm.getClist();
            vm.getCity()
            $('#modal_updata').on('show.bs.modal', function () {
                vm.updateBtn(vm.relist[0]);
            })
            $('#modal_control').on('hidden.bs.modal', function () {
                $('body').css('padding-right',0);
                vm.uploadText='';
                vm.updateList.certificates='';
            })
            $('#modal_updata').on('hidden.bs.modal',function(){
                if(!$('#modal_control').is(':hidden')){
                    $('#app').addClass('modal-open');
                }
            })
        },
        components:{
            'datepicker': datepicker
        },
        watch:{
            zdlists(){
                var a=0,b=0,c=0,d=0,g=0,f=0;
                this.zdlists.forEach(function(e){
                    a+=e.consumeTotal;
                    b+=e.consumeMoney;
                    c+=e.realMoney;
                    d+=e.value01;
                    f+=e.value02;
                    g+=e.value03;
                });
                this.nums.consumeTotal=(a/100).toFixed(2);
                this.nums.consumeMoney=(b/100).toFixed(2);
                this.nums.realMoney=(c/100).toFixed(2);
                this.nums.value01=(d/100).toFixed(2);
                this.nums.value02=(f/100).toFixed(2);
                this.nums.value03=(g/100).toFixed(2);
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