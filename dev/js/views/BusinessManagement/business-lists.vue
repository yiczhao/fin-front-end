<template>
    <index :title="'商户列表'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :isshow="'isshow'">
        <div class="content business-lists" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="merchant_manage" class="active"><a v-link="{name:'business-lists'}">商户管理</a></li>
                    <!--<li><a v-link="{name:'business-limit'}" data-ksa="activity_manage">额度采购</a></li>-->
                    <li data-ksa="advance_payment_account_manage"><a v-link="{name:'prepayment-lists'}">预付款</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                    </div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <input type="text" class="form-control" v-model="defaultData.merchantOperationID" placeholder="商户ID" v-limitnumber="defaultData.merchantOperationID">
                            <input type="text" class="form-control" v-model="defaultData.merchantName" placeholder="商户名">
                            <input type="text" class="form-control" v-model="defaultData.startValue" v-limitnumber="defaultData.startValue" placeholder="佣金值" style="margin-right:0">
                            <span style="margin:0 10px;font-size:13px;">至</span>
                            <input type="text" class="form-control" v-model="defaultData.endValue" v-limitnumber="defaultData.endValue" placeholder="佣金值">
                            <select class="form-control" v-model="defaultData.companyId" @change="getCity(defaultData.companyId)">
                                <option value="">全部分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>

                            <select class="form-control" v-model="defaultData.cityId">
                                <option value="">全部城市</option>
                                <option v-for="(index,n) in city" v-text="n.name" :value="n.cityID"></option>
                            </select>
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" style="margin-left: -13px;" @click="checkNew" data-ksa="merchant_manage.search">查询</a>
                    </div>
                </div>

                <div v-show="!!zdlists.length" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table">
                            <thead>
                                <tr role="row">
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>分公司</th>
                                    <th>城市</th>
                                    <th>划款账户</th>
                                    <th>消费总笔数</th>
                                    <th>消费总金额</th>
                                    <th>实付总金额</th>
                                    <th>33211总佣金 </th>
                                    <th>三方折扣差</th>
                                    <th>额采折扣差</th>
                                    <th>交易</th>
                                    <th>佣金值</th>
                                    <th>结算周期</th>
                                    <th>补贴税率</th>
                                    <!--<th>额度采购消化账户</th>-->
                                </tr>
                            </thead>

                            <tbody>
                                <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{trlist.merchantOperationID}}</td>
                                    <td>{{trlist.merchantName}}</td>
                                    <td>{{trlist.subCompanyName}}</td>
                                    <td>{{trlist.cityName}}</td>
                                    <td><a @click="control(trlist)" data-ksa="merchant_manage.manage">管理</a></td>
                                    <td>{{trlist.consumptionCount}}</td>
                                    <td>{{trlist.consumptionAmount/100 | currency '' }} </td>
                                    <td>{{trlist.payAmount/100 | currency '' }} </td>
                                    <td>{{trlist.commission33211/100 | currency '' }} </td>
                                    <td>{{trlist.thirdPartyDiscountDiff/100 | currency '' }} </td>
                                    <td>{{trlist.limitPurchaseDiscountDiff/100 | currency '' }} </td>
                                    <td><a data-ksa="trade_detail_manage.search" v-link="{name:'trade-info',params:{merchantOperationID:trlist.merchantOperationID,merchantName:trlist.merchantName}}">明细</a></td>
                                    <td>{{trlist.commission/100 | currency '' }} </td>
                                    <td>
                                        <template v-if="trlist.settlementCycle==1">日结</template>
                                        <template v-if="trlist.settlementCycle==2">周结</template>
                                        <template v-if="trlist.settlementCycle==3">月结</template>
                                        <template v-if="trlist.settlementCycle==4">手工结算</template>
                                    </td>
                                    <td>{{trlist.subsidyRate}}%</td>
                                    <!--<template  v-if="trlist.paidAmount!=0||trlist.unpaidAmount!=0||trlist.suspensionTaxAmount!=0||trlist.invoiceAmount!=0">-->
                                        <!--<td><a data-ksa="subsidy_account_manage.search" v-link="{name:'merchat-activity',params:{merchantID1:trlist.merchantID,merchantOperationID1:trlist.merchantOperationID,merchantName1:trlist.merchantName}}">{{trlist.paidAmount/100| currency ''}}</a></td>-->
                                        <!--<td><a data-ksa="subsidy_account_manage.search" v-link="{name:'merchat-activity',params:{merchantID1:trlist.merchantID,merchantOperationID1:trlist.merchantOperationID,merchantName1:trlist.merchantName}}">{{trlist.unpaidAmount/100| currency ''}}</a></td>-->
                                        <!--<td><a data-ksa="subsidy_account_manage.search" v-link="{name:'merchat-activity',params:{merchantID1:trlist.merchantID,merchantOperationID1:trlist.merchantOperationID,merchantName1:trlist.merchantName}}">{{trlist.suspensionTaxAmount/100| currency ''}}</a></td>-->
                                        <!--<td><a data-ksa="subsidy_account_manage.search" v-link="{name:'merchat-activity',params:{merchantID1:trlist.merchantID,merchantOperationID1:trlist.merchantOperationID,merchantName1:trlist.merchantName}}">{{trlist.invoiceAmount/100| currency ''}}</a></td>-->
                                    <!--</template>-->
                                    <!--<template v-else>-->
                                        <!--<td>0.00</td>-->
                                        <!--<td>0.00</td>-->
                                        <!--<td>0.00</td>-->
                                        <!--<td>0.00</td>-->
                                    <!--</template>-->
<!--                                     <td>
                                        <a @click="check_digest(trlist,trlist.merchantName)" href="javascript:void(0)"  data-ksa="merchant_manage.search_digest">查看消化账户</a>
                                    <td> -->
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>合计：</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{{nums.consumptionCount}}</td>
                                    <td>{{nums.consumptionAmount/100 | currency ''}}</td>
                                    <td>{{nums.payAmount/100 | currency ''}}</td>
                                    <td>{{nums.commission33211/100 | currency ''}}</td>
                                    <td>{{nums.thirdPartyDiscountDiff/100 | currency ''}}</td>
                                    <td>{{nums.limitPurchaseDiscountDiff/100 | currency ''}}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">
                       <div class="right">
                            <page :all="pageall"
                                  :cur.sync="defaultData.pageIndex"
                                  :page_size.sync="defaultData.pageSize">
                            </page>
                       </div>
                    </div>
                </div>

                <div class="no-list" v-else>
                    未找到数据
                </div>

                <!--<content-dialog-->
                        <!--:show.sync="modal_checking" :is-button="false" :type.sync="'infos'"-->
                        <!--:title.sync="'额度采购消化账户'" -->
                <!--&gt;-->
                    <!--<div class="modal-body">-->
                        <!--<div v-if="checkLists.length>0">-->
                            <!--<span>商户ID：{{id}}</span>-->
                            <!--<span>商户名：{{merchantName}}</span>-->
                            <!--<span class="pull-right">额度采购消化账户：<a v-link="{'name':'business-limit','params':{'id':id}}">{{checkLists[0].merchantName}}</a></span>-->
                        <!--</div>-->
                        <!--<div style="padding: 10px 0;">历史记录：</div>-->
                        <!--<div style="padding: 10px;font-size: 16px;text-align: center" v-if="!checkLists.length>0">-->
                            <!--无历史记录-->
                        <!--</div>-->
                        <!--<table v-if="checkLists.length>0" class="table" style="border: 1px solid #ccc;">-->
                            <!--<thead>-->
                            <!--<tr role="row">-->
                                <!--<th>ID</th>-->
                                <!--<th>账户名</th>-->
                                <!--<th>开始时间</th>-->
                                <!--<th>结束时间</th>-->
                                <!--<th>更新人</th>-->
                                <!--<th>变更凭证</th>-->
                                <!--<th>更新备注</th>-->
                            <!--</tr>-->
                            <!--</thead>-->
                            <!--<tbody>-->
                            <!--<tr role="row" v-for="n in checkLists">-->
                                <!--<td>{{n.merchantID}}</td>-->
                                <!--<td><a data-toggle="modal" data-dismiss="modal" @click="control(n)">{{n.merchantName}}</a></td>-->
                                <!--<td>{{n.startDate | datetime}}</td>-->
                                <!--<td>{{n.closeTime | datetime}}</td>-->
                                <!--<td>{{n.updateBy}}</td>-->
                                <!--<td><a href="{{origin}}/file/download/{{n.certificateID}}">下载</a></td>-->
                                <!--<td>{{n.remarks}}</td>-->
                            <!--</tr>-->
                            <!--</tbody>-->
                        <!--</table>-->
                    <!--</div>-->
                <!--</content-dialog>-->

                <content-dialog
                        :show.sync="modal_control" :is-button="false" :type.sync="'infos'"
                        :title.sync="'划款账户'" 
                >
                    <div class="modal-body" style="padding-top: 0;">
                        <div>
                            <span>商户ID：{{controllist.merchantOperationID}}</span>
                            <span>商户名：{{controllist.merchantName}}</span>
                            <a class="updatebtn" @click="modal_updata" href="javascript:void(0);">更新</a>
                        </div>
                        <div  v-if="relist!=''" class="mt35" style="margin-top: 5px;">
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
                                    <th>更新说明</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr role="row" v-for="n in relist">
                                        <td>{{$index+1}}</td>
                                        <td>
                                            <p>{{n.accountName}}</p>
                                            <p>{{n.accountNumber}}</p>
                                        </td>
                                        <td>{{n.createAt | datetime}}</td>
                                        <td>{{n.createBy}}</td>
                                        <td><a href="{{origin}}/file/download/{{n.certificates}}">下载</a></td>
                                        <td>{{n.updateInfo}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </content-dialog>

                <content-dialog
                        :show.sync="modal_updatas" :is-button="false" :type.sync="'infos'"
                        :title.sync="'更新账户'" 
                >
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
                                <input v-validate:bankNumber="['required']" v-limitnumber="updateList.bankNumber" v-model="updateList.bankNumber" class="form-control" type="text" placeholder="提入行号">
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
                                    <option value="4">手工结算</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="w28" ><i>*</i>补贴税率：</label>
                                <input @keyup="numberMax($event)" v-validate:subsidyRate="['required']" v-model="updateList.subsidyRate" class="form-control" type="number" placeholder="0~100">%
                            </div>
                            <div class="form-group">
                                <label class="w28"><i>*</i>上传凭证：</label>
                                <input style="display:none" type="file" @change="uploads($event)">
                                <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick">上传凭证</a>
                                <span v-text="uploadText" v-show="uploadText!=''"></span>
                            </div>
                            <div class="form-group">
                                <label class="w28" style="position: relative;top: -40px;">更新说明：</label>
                                <textarea class="form-control" v-model="updateList.updateInfo"></textarea>
                            </div>
                            <div class="form-group">
                                <label class="w28">转账特殊备注：</label>
                                <input v-model="updateList.specialRemarks" class="form-control" type="text" placeholder="目前只有中石化商户需要在此填写商户编号">
                            </div>
                            <div class="form-group tc">
                                <button type="button" @click="updateTrue(updateList)" class="btn btn-primary" data-ksa="merchant_manage.update">保存</button>
                            </div>
                            <div class="form-group tc">
                                <span v-show="(!$vali.valid&&updataerror)|| errortext!=''" class="validation-error-label" v-text="errortext"></span>
                            </div>
                        </div>
                    </form>
                    </validator>
                </content-dialog>

            </div>
        </div>
    </index>
</template>

<script>
    import model from '../../ajax/BusinessManagement/buslists_model'
    export default{
        data(){
            this.model =model(this)
            return{
                modal_checking: false ,
                modal_control: false,
                modal_updatas: false,
                origin:window.origin,
                id:'',
                merchantName:'',
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
                    "pageSize": 10
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
                    consumptionCount:0,
                    consumptionAmount:0,
                    payAmount:0,
                    commission33211:0,
                    thirdPartyDiscountDiff:0,
                    limitPurchaseDiscountDiff:0
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
                    updateInfo: '',
                    isCcb:'',
                    accountType:'',
                    settlementCycle:0,
                    subsidyRate:'',
                    merchantID:'',
                    specialRemarks:''
                },
                checkLists:[
                    {
                        "id":'',
                        "name":"",
                        "updateAt":'',
                        "updateBy":""    ,
                        "certificates":"",
                        "remarks":""
                    }
                ],
                updataerror:false,
                uploadText:'',
                errortext:''
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(data.endValue<data.startValue){
                    let a=data.endValue,b=data.startValue;
                    this.defaultData.startValue=a;
                    this.defaultData.endValue=b;
                    data.startValue=a;
                    data.endValue=b;
                }
                this.model.merchant_lists(data).then((response)=>{
                    (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                    (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                });
                this.model.merchant_total(this.defaultData).then((res)=>{
                    (res.data.code==0)?this.$set('nums',res.data.data):null;
                })
            },
            getClist(){
                // *** 请求公司数据
                this.$common_model.getcompany().then((response)=>{
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
                this.$common_model.getcity(data).then((response)=>{
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    (response.data.code==0) ? this.$set('city', response.data.data) : null;
                });
            },
            checkNew(){
                this.defaultData.pageIndex=1;
                this.initList();
            },
            initList(){
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
                this.modal_control = false;
                this.modal_checking = false;
                this.modal_updatas = false;
            },
            control(_list){
                this.$set('controllist',_list);
                this.updateList.merchantID=_list.merchantID;
                this.accountId=_list.merchantID;
                this.bthf=true;
                this.accountType=1;
                this.checkcontrol(_list.merchantID)
            },
            checkcontrol(_id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.merchant_account(_id)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('relist', response.data.data)
                                this.modal_control = true;
                            }
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
                this.updateBtn(this.relist[0]);
                this.modal_updatas = true;
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
                        updateInfo: '',
                        isCcb:'',
                        accountType:'',
                        settlementCycle:0,
                        subsidyRate:'',
                        specialRemarks:'',
                        merchantID:this.accountId
                    }
                }else{
                    $.extend(true, this.updateList, a);
                    this.updateList.updateInfo='';
                }
                this.uploadText='';
                this.updateList.certificates='';
                this.updateList.accountType=this.accountType;
            },
            updateTrue(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
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
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code == 0){
                                dialogs();
                                this.initList();
                            }
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
                if(check_upload_size(files.size)){
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
                                        vm.updateList.certificates=response.data.data;
                                        vm.uploadText=files.name;
                                        this.updataerror=false;
                                        dialogs('success','上传成功！');
                                    }
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
            },
            check_digest(_list,_merchantName){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.id=_list.merchantOperationID;
                this.merchantName=_merchantName;
                this.model.merchant_digest(_list.merchantID)
                        .then((res)=>{
                            if(res.data.code==0){
                                this.$set('checkLists',res.data.data);
                                this.modal_checking = true;
                            }
                    })
            }
        },
        ready() {
            let vm=this;
            (!!sessionStorage.getItem('userData')) ? vm.$set('loginList',JSON.parse(sessionStorage.getItem('userData'))) : null;
            vm.getClist();
            vm.getCity();
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
            // $('#modal_updata').on('show.bs.modal', function () {
            //     vm.updateBtn(vm.relist[0]);
            // })
            // $('#modal_control').on('hidden.bs.modal', function () {
            //     $('body').css('padding-right',0);
            //     vm.uploadText='';
            //     vm.updateList.certificates='';
            // })
            // $('#modal_updata').on('hidden.bs.modal',function(){
            //     if(!$('#modal_control').is(':hidden')){
            //         $('#app').addClass('modal-open');
            //     }
            // })
        },
        watch:{
            'defaultData.pageSize+defaultData.pageIndex'(){
                this.initList();
            }
        }
    }
</script>