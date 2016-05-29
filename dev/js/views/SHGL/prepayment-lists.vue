<template>
    <index :title="'预付款商户'"
           :ptitle="'商户管理'"
           :hname="'prepayment-lists'"
           :isshow="'isshow'">
        <div class="content blists" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <input type="button" class="btn btn-info"  data-toggle="modal"  @click="showMerchants()" value="添加">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="merchantOperationID" placeholder="商户ID">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="merchantName" placeholder="商户名">
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="subCompanyID" >
                            <option value="">请选择分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="cityID">
                            <option value="">请选择城市</option>
                                <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="status">
                            <option value="">账户状态</option>
                            <option value="0">停用</option>
                            <option value="1">正常</option>
                                <option v-for="(index,n) in typelists" v-text="n.value" :value="n.accountType"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="button" class="btn btn-info" @click="query" value="查询">
                        </div>
                    </form>
                </div>

                <div v-show="!!prepaymentList.length" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                                <tr role="row">
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>分公司</th>
                                    <th>城市</th>
                                    <th>余额</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                    <th>开通时间</th>
                                    <th>联系人</th>
                                    <th>电话</th>
                                    <th>工作人员</th>
                                </tr>
                            </thead>
                        <tbody>
                            <tr v-for="(index,prepayment) in prepaymentList">
                                <td>{{prepayment.merchantOperationID}}</td>
                                <td>{{prepayment.merchantName}}</td>
                                <td>{{prepayment.subCompanyName}}</td>
                                <td>{{prepayment.cityName}}</td>
                                <td>{{prepayment.balanceAmount}}</td>
                                <td>
                                     <template v-if="prepayment.status==0" >
                                        <span style="color:rgb(255,​ 0,​ 0);">停用</span>
                                     </template>
                                     <template v-if="prepayment.status==1" >
                                        <span style="color:rgb(0,​ 128,​ 0);">正常</span>
                                     </template>
                                </td>
                                <td>
                                    <a href="javascript:void(0);" @click="getRechargeInfo(prepayment.id)">预付</a>
                                </td>
                                <td>{{prepayment.startTime | datetime}}</td>
                                <td>{{prepayment.connectionPerson}}</td>
                                <td>{{prepayment.connectionPhone}}</td>
                                <td>{{prepayment.servicePerson}}</td>
                            </tr>
                        </tbody>
                        <tr role="row">
                            <th></th>
                            <th></th>
                            <th><h5><b>合计</b></h5></th>
                            <th></th>
                            <th><B>{{count_balanceAmount}}</B></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </table>
                    </div>
                    <div class="datatable-footer">
                        <page :all="pageall"
                              :cur.sync="pagecur"
                              :page_size.sync="page_size">
                        </page>
                    </div>
                </div>
                <div v-else style="padding: 30px;font-size: 16px;text-align: center">
                    未查询到预付款商户信息！
                </div>

                <div id="modal_prepayment_info" data-backdrop="static" class="modal fade" style="display: none;">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                             <div class="modal-header">
                                <h3>添加商户</h3>
                                <button type="button" class="close" data-dismiss="modal">×</button>
                             </div>
                             <div class="modal-body">
                                 <div class="panel-heading">
                                     <form class="form-inline manage-form">
                                        <div class="form-group"> 
                                            <input type="text" class="form-control" v-model="merchantInfo.merchantOperationID" placeholder="商户ID">
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" v-model="merchantInfo.merchantName" placeholder="商户名">
                                        </div>
                                        <div class="form-group">
                                            <select class="form-control" v-model="merchantInfo.companyId" >
                                            <option value="">请选择分公司</option>
                                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <select class="form-control" v-model="merchantInfo.cityId">
                                            <option value="">请选择城市</option>
                                                <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <input type="button" class="btn btn-info" @click="queryForMerchantList" value="查询">
                                        </div>
                                     </form>
                                 </div>

                                <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer addbottom">
                                    <div style="text-indent: 68%">已选择：</div>
                                    <div class="col-md-7" style="height:300px;overflow: auto;border: 1px solid #ccc;">
                                        <table v-if="merchantList.length>0" id="table1" class="table datatable-selection-single dataTable no-footer">
                                                <thead>
                                                    <tr role="row">
                                                        <th><input id="ckAll" type="checkbox" @click="checkAll($event)"/>全选</th>
                                                        <th>分公司</th>
                                                        <th>城市</th>
                                                        <th>商户名</th>
                                                    </tr>
                                                </thead>
                                            <tbody>
                                                <tr v-for="(index,merchant) in merchantList">
                                                    <td>
                                                        <input type="checkbox" :value="merchant.merchantID" :id="merchant.merchantID" name="ckbox" />
                                                        {{index+1}}
                                                    </td>
                                                    <td>{{merchant.subCompanyName}}</td>
                                                    <td>{{merchant.cityName}}</td>
                                                    <td>{{merchant.merchantName}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <span v-else>
                                            未查询到商户数据！
                                        </span>
                                    </div>
                                     <div class="col-md-1">
                                        <input type="button" class="btn btn-info" @click="addTrue($event)" value="添加">
                                        <input type="button" class="btn btn-info" @click="delTrue($event)" value="删除">
                                        <input type="button" class="btn btn-info" @click="submit()" value="确认">
                                    </div>
                                    <div class="col-md-4">
                                        <ul id="IDS"></ul>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>


                <div id="modal_prepayment_recharge" data-backdrop="static" class="modal fade" style="display: none;">
                    <div class="modal-dialog modal-mg">
                        <div class="modal-content">
                             <div class="modal-header">
                                <h3>预付充值</h3>
                                <button type="button" class="close" data-dismiss="modal">×</button>
                             </div>
                             <div class="modal-body">
                                 <div class="panel-heading">
                                    <div class="form-group"> 
                                        <label>商户名：</label>{{applyAdvancePay.merchantName}}
                                    </div>
                                    <div class="form-group"> 
                                        <label>余额：</label><span style="color:red">{{applyAdvancePay.balanceAmount}}</span>
                                    </div>
                                    <div class="form-group">
                                        <label><i style="color:red">*</i>金额：</label>
                                        <input type="text" class="input-w" name="advancePaymentAmount" v-model="applyAdvancePay.advancePaymentAmount"></input>
                                    </div>
                                    <div class="form-group">
                                        <label><i style="color:red">*</i>备注：</label>
                                        <textarea  class="input-w" name="remarks" v-model="applyAdvancePay.remarks"></textarea>
                                    </div>
                                    <div class="form-group"> 
                                    <div><label>付款账户：</label>{{applyAdvancePay.payAccount}}</div>
                                    </div>
                                    <div class="form-group"> 
                                        <label>收款信息：</label>
                                        <br/>
                                            <div class="collectionAccount-bgcolor">
                                               <label>账户名：</label> {{applyAdvancePay.collectionAccountName}}<br/>
                                               <label>账号：</label>{{applyAdvancePay.collectionAccountNumber}}<br/>
                                               <label>开户行：</label>{{applyAdvancePay.collectionBankName}}<br/>
                                               <label>提入行号：</label>{{applyAdvancePay.collectionBankNumber}}
                                           </div>
                                    </div>
                                 </div>
                             <div class="modal-foot btns">
                                <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                                <button type="button" @click="subApplyAdvancePay()" class="btn btn-primary">申请付款</button>
                                <br/>
                             </div>




                               
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </index>
</template>
<style lang="sass">
    .prepayment-modal-btns{
       text-align: center;
    }
    .collectionAccount-bgcolor{
        margin-left: 30px;
        background-color: #c0c0c0;
    }
    .input-w{
        width: 86%;
    }
    .btns{
        text-align: center;
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
            input{
                margin:15px 0;
            }
        }
        ul{
            list-style: none;
            border: 1px solid #ccc;
            padding:10px;
            height: 300px;
            overflow: auto;
            li{
                margin:5px 0;
                cursor: pointer;
                padding-left:3px;
            }
            li.check-li{
                background: #ccc;
            }
        }
    }
    .btn.btn-info {
        margin: 2px;
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import dialog from '../components/dialog.vue'
    export default{
        data(){
            return{
                pageall:1,
                pagecur:1,
                page_size:15,
                pageIndex:1,
                pageSize:15,
                subCompanyID:"",
                cityID :"",    
                merchantOperationID :"",    
                merchantName:"",
                status:"",
                subcompanyList:[],
                cityList:[],
                prepaymentList:[],
                merchantList:[],
                addId:[],
                merchantInfo:{
                    companyId:"",
                    cityId:"",
                    merchantOperationID:"",
                    merchantName:"",
                    isAdvancePayment:"0"
                },
                applyAdvancePay:{
                    merchantName:"",//商户名
                    balanceAmount:"",//余额
                    advancePaymentMerchantId:"",//    预付款商户ID Integer  
                    collectionBankName:"",//  开户行 String       
                    collectionBankNumber:"",//    提入行号    String    
                    subCompanyID:"",//    分公司ID   Integer          
                    merchantID:"",//  商户ID    Integer          
                    payAccount:"",//  付款账户    String           
                    collectionAccountName:"",//   收款账户    String           
                    collectionAccountNumber:"",// 收款账号    String           
                    advancePaymentAmount:"",//    预付金额    Integer          
                    remarks:"",// 备注  String           
                    merchantAccountID:""//商户账户ID   Integer   
                },
                entity:{},
                count_balanceAmount:0,
            }
        },
        methods:{
            //获取预付款商户数据
             getPrepaymentList:function(data){
                this.$http.get('./advancePaymentMerchant/list?' + decodeURIComponent($.param(data)))
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('prepaymentList', response.data.data) : null;
                        (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            //获取预付充值数据
            getRechargeInfo:function(prepaymentId){
                let data={
                    id:prepaymentId
                }                 
                this.$http.get('./advancePaymentMerchant/chargeInfo?' + decodeURIComponent($.param(data)))
                    .then(function (response) {
                        if(response.data.code==0){
                            this.$set('entity', response.data.data);
                            console.log(this.entity);
                            this.applyAdvancePay.advancePaymentMerchantId=this.entity.id;
                            this.applyAdvancePay.merchantName=this.entity.merchantName;//1
                            this.applyAdvancePay.balanceAmount=this.entity.balanceAmount;//2
                            this.applyAdvancePay.payAccount=this.entity.payAccount;//  付款账户    String  --5         
                            this.applyAdvancePay.collectionAccountName=this.entity.collectionAccountName;//   收款账户    String   --6-1        
                            this.applyAdvancePay.collectionAccountNumber=this.entity.collectionAccountNumber;// 收款账号    String   --6-2 
                            this.applyAdvancePay.collectionBankName=this.entity.collectionBankName;//  开户行 String            --6-3    
                            this.applyAdvancePay.collectionBankNumber=this.entity.collectionBankNumber;//    提入行号    String    --6-4   

                            this.applyAdvancePay.advancePaymentAmount="";//    预付金额    Integer   --3       
                            this.applyAdvancePay.remarks="";// 备注  String           --4
                        }

                        //判断是否有银行卡账号
                        if(this.applyAdvancePay.collectionAccountNumber== null){
                            dialogs('success','该商户未设置划款账户，无法充值！');
                            return false;
                        }else{
                            //显示窗口
                            $("#modal_prepayment_recharge").modal('show');
                        }
                    }, function (response) {
                        console.log(response);
                    });

            },
            //获取商户数据
             getMerchantList:function(data){
                this.$http.get('./merchant/list?' + decodeURIComponent($.param(data)))
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('merchantList', response.data.data) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            //获取分公司数据
            getSubcompany:function(data){
                 this.$http.get('./subCompany/list')
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('subcompanyList', response.data.data) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            //获取城市数据
            getCity:function(data){
                 this.$http.get('./city/list')
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('cityList', response.data.data) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            getTwo:function(num){
                if(num.toString().length>=2) return num;
                var str="";
                for(var i=num.toString().length;i<2;i++)
                    str +="0";
                return str + num.toString();
            },
            checkAll:function(ck){
                if(ck.target.checked){
                    $("input[name='ckbox']").prop({'checked':true});
                }else{
                    $("input[name='ckbox']").prop({'checked':false});
                }
            },
            //显示选择商户窗口
            showMerchants:function(){
                this.merchantInfo.companyId="",
                this.merchantInfo.cityId="",
                this.merchantInfo.merchantOperationID="",
                this.merchantInfo.merchantName="",
                this.queryForMerchantList();

                $("#modal_prepayment_info").modal('show');
            },
            queryForMerchantList:function(){
                //设置全选属性
                this.clear();
                this.getMerchantList(this.merchantInfo);
            },
            subApplyAdvancePay:function(){
                let entity={
                   advancePaymentMerchantId:this.applyAdvancePay.advancePaymentMerchantId,
                   advancePaymentAmount:this.applyAdvancePay.advancePaymentAmount*100,     
                   remarks:this.applyAdvancePay.remarks,
                }
                this.$http.post('./advancePaymentMerchant/applyPayment',entity)
                    .then(function (response) {
                        // *** 判断请求是否成功如若
                        if (response.data.code==0)
                        {
                            alert("保存成功！");
                            this.query();
                        }
                    }, function (response) {
                        console.log(response);
                    });
                    //关闭弹出层
                    $(".modal").modal("hide");
            },
            //清除
            clear:function(){
                this.addId=[];
                $('.col-md-7 tr input[type="checkbox"]').prop('checked',false);
                $('.addbottom .col-md-4').children('ul').html('');
            },
            appendLi:function(a){

                let _tr=$("input[value='" + a + "']").closest('tr');
                let _ul=$('.addbottom .col-md-4').children('ul');
                _ul.append('<li value="'+a+'">'+_tr.children('td:last').html()+'</li>');
                _tr.hide();
            },
            addTrue:function(e){
                this.addId = Array.from($(".col-md-7 td input[type='checkbox']:checked"), i => i.value);
                for(let i=0;i<this.addId.length;i++){
                    this.appendLi(this.addId[i]);
                }
                this.addId=[];
            },
            delTrue:function(e){
                let _ul=$(e.target).parent('.col-md-1').next('.col-md-4').children('ul'),
                    _table=$(e.target).parent('.col-md-1').prev('.col-md-7').children('table').find('tr:hidden'),
                    _li= _ul.find('.check-li');
                for(let i=0;i<_li.length;i++){
                    _table.eq(_li.eq(i).index()).show();
                }
                _li.remove();
            },
            submit:function(e){
                let _li=$("#IDS").children('li');
                if(!_li.length>0)return;
                let data={'merchantIDs':Array.from(_li, i => i.getAttribute('value'))}
                this.$http.post('./advancePaymentMerchant/create',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若
                        if (response.data.code==0)
                        {
                            this.query();
                            dialogs();
                        }
                    }, function (response) {
                        console.log(response);
                    });
                    //关闭弹出层
                    $(".modal").modal("hide");
            },
            query: function () {
                // let data=this.data;
                let data={
                        subCompanyID:this.subCompanyID,
                        cityID:this.cityID,
                        merchantOperationID:this.merchantOperationID,
                        merchantName:this.merchantName,
                        status:this.status,
                        pageIndex: this.pageIndex, 
                        pageSize: this.pageSize
                    };
                this.getPrepaymentList(data);
            },
        },
        ready: function () {
            this.getPrepaymentList({});
            this.getSubcompany({});
            this.getCity({});
             $(document).on('click','.addbottom .col-md-4 ul li',function(){
                $(this).toggleClass('check-li');
            });
        },
        components:{
            'datepicker': datepicker,
            'dialog': dialog,
        },
        watch:{
            prepaymentList(){
                var _this=this;
                this.prepaymentList.forEach(function(e){
                    _this.count_balanceAmount+=e.balanceAmount;
                });
            },
            pagecur(){
                this.pageIndex=this.pagecur;
                this.query();
            },
            page_size(){
                this.pageSize=this.page_size;
                this.query();
            }
        }
    }
</script>