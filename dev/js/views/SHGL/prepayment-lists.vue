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
                            <input type="button" class="btn btn-info"  data-toggle="modal"  data-target="#modal_prepayment_info" @click="queryForMerchantList" value="添加">
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
                                    <th>客情人员</th>
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
                                     <template v-if="prepayment.status==0" style="color:red">
                                        停用
                                     </template>
                                     <template v-if="prepayment.status==1">
                                        启用
                                     </template>
                                </td>
                                <td>
                                    <a href="#">预付</a>
                                    <a href="#">门店</a>
                                    <a href="#">退款</a>
                                    <a href="#">明细</a>
                                    <a href="#">停用</a>
                                </td>
                                <td>{{prepayment.startTime | datetime}}</td>
                                <td>{{prepayment.connectionPerson}}</td>
                                <td>{{prepayment.connectionPhone}}</td>
                                <td>{{prepayment.servicePerson}}</td>
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
                                            <input type="button" class="btn btn-info" @click="" value="查询">
                                        </div>
                                     </form>
                                 </div>
                                <div v-show="!!merchantList.length" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                                    <div class="datatable-scroll datatable-width">
                                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
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
                                                    <input type="checkbox" :id="merchant.merchantID" name="ckbox" />
                                                    {{index+1}}
                                                </td>
                                                <td>{{merchant.subCompanyName}}</td>
                                                <td>{{merchant.cityName}}</td>
                                                <td>{{merchant.merchantName}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                    <div class="prepayment-modal-btns">
                                        <button type="button" @click="submit()" class="btn btn-primary">添加商户</button>
                                        <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                                    </div>
                                </div>
                             </div>
                             <div class="modal-foot btns">
                                
                                <br/>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </index>
</template>
<style>
    .datatable-width{
        max-width: 500px;
    }
    .prepayment-modal-btns{
       text-align: center;
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import dialog from '../components/dialog.vue'
    export default{
        data(){
            return{
                pagecur:1,
                page_size:15,
                pageall:1,
                subCompanyID:"",
                cityID :"",    
                merchantOperationID :"",    
                merchantName:"",
                status:"",
                subcompanyList:[],
                cityList:[],
                prepaymentList:[],
                merchantList:[]
            }
        },
        methods:{
            //获取预付款商户数据
             getPrepaymentList:function(data){
                this.$http.post('./advancePaymentMerchant/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('prepaymentList', response.data.data) : null;
                        (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            //获取商户数据
             getMerchantList:function(data){
                this.$http.post('./merchant/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('merchantList', response.data.data) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            //获取分公司数据
            getSubcompany:function(data){
                 this.$http.post('./subcompany/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('subcompanyList', response.data.data) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            //获取城市数据
            getCity:function(data){
                 this.$http.post('./city/list',data)
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
            queryForMerchantList:function(){
                //设置全选属性
                let data={
                    isAdvancePayment:0
                    // subCompanyID:this.
                    // cityID :"",    
                    // merchantOperationID :"",    
                    // merchantName:"",
                }
                this.getMerchantList(data);
            },
            submit:function(){
                var arrays = [];
                $("input[name='ckbox']:checked").each(function(){
                  arrays.push($(this).prop("id"));  
                });
                let data={
                    merchantIDs:arrays
                }
                this.$http.post('./advancePaymentMerchant/insertBatch',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若
                        if (response.data.code==0)
                        {
                            alert("保存成功！");
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
                        status:this.status
                    };
                this.getPrepaymentList(data);
            },
        },
        ready: function () {
            this.getPrepaymentList({});
            this.getSubcompany({});
            this.getCity({});
        },
        components:{
            'datepicker': datepicker,
            'dialog': dialog,
        },
        watch:{
            pagecur:function(){
                this.defaultData.pageIndex=this.pagecur;
                this.initList();
            },
            page_size:function(){
                this.defaultData.pageSize=this.page_size;
                this.initList();
            }
        }
    }
</script>