<template>
    <index :title="'手工单'"
           :ptitle="'交易管理'"


           :isshow="'isshow'">
        <div class="content account-management" slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-left">
                        <a data-toggle="modal" data-target="#modal_add" class="btn btn-info" @click="addTradeInfo"
                           data-ksa="manual_trade_detail.add">录入手工单</a>
                    </div>
                    <div class="heading-right">
                        <select class="form-control" v-model="defaultData.subCompanyID" title="" @change="getCityData(defaultData.subCompanyID)">
                            <option value="">全部分公司</option>
                            <option v-for="(index,n) in subCompanyList" v-text="n.name"
                                    :value="n.subCompanyID"></option>
                        </select>
                        <select class="form-control" v-model="defaultData.cityID">
                            <option value="">全部城市</option>
                            <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                        </select>
                        <select class="form-control" v-model="defaultData.timeRange">
                            <option value="0">昨天</option>
                            <option value="1">最近一周</option>
                            <option value="2">最近一个月</option>
                            <option value="3">最近三个月</option>
                            <option value="4">自定义时间</option>
                        </select>
                        <datepicker v-show="defaultData.timeRange==4" :readonly="true" :value.sync="defaultData.startDate"
                                        format="YYYY-MM-DD"></datepicker>
                        <span v-show="defaultData.timeRange==4">至</span>
                        <datepicker v-show="defaultData.timeRange==4" :readonly="true" :value.sync="defaultData.endDate"
                                        format="YYYY-MM-DD"></datepicker>
                        <input type="text" class="form-control" v-model="defaultData.merchantOperationID"
                               placeholder="商户ID" v-limitnumber="defaultData.merchantOperationID">
                        <input type="text" class="form-control" v-model="defaultData.merchantName" placeholder="商户名">
                        <input type="text" class="form-control" placeholder="活动ID"
                               v-limitnumber="defaultData.activityOperationID"
                               v-model="defaultData.activityOperationID">
                        <input type="text" class="form-control" v-model="defaultData.tradeDetailID"
                               v-limitnumber="defaultData.tradeDetailID" placeholder="交易ID">
                        <input type="text" class="form-control" v-model="defaultData.serialNumber" placeholder="交易流水号">
                        <a class="btn btn-info" @click="getManualTradeDetailData()" data-ksa="manual_trade_detail.search">查询</a>
                    </div>
                </div>
                <div id="DataTables_Table_0_wrapper"
                     class="dataTables_wrapper no-footer"
                     v-cloak>
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
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
                                <th>状态</th>
                                <th>操作</th>
                                <th>参与活动</th>
                                <th>凭证</th>
                                <th>备注</th>
                                <th>不通过原因</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-show="!!manualTradeDetailList.length" role="row" v-for="(index,manualTradeDetail) in manualTradeDetailList" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{manualTradeDetail.tradeDetailID}}</td>
                                <td>{{manualTradeDetail.serialNumber}}</td>
                                <td>{{manualTradeDetail.subCompanyName}}</td>
                                <td>{{manualTradeDetail.cityName}}</td>
                                <td>{{manualTradeDetail.merchantOperationID}}</td>
                                <td>{{manualTradeDetail.merchantName}}</td>
                                <td>{{manualTradeDetail.consumptionAmount/100 | currency ''}}</td>
                                <td>{{manualTradeDetail.discountAmount/100 | currency ''}}</td>
                                <td>{{manualTradeDetail.payAmount/100 | currency ''}}</td>
                                <td>{{manualTradeDetail.limitDeduct/100 | currency ''}}</td>
                                <td>{{manualTradeDetail.principalDeduct/100 | currency ''}}</td>
                                <td>{{manualTradeDetail.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{manualTradeDetail.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{manualTradeDetail.suspensionTax/100 | currency ''}}</td>
                                <td>{{manualTradeDetail.merchantSubsidyActual/100 | currency ''}}</td>
                                <td>{{manualTradeDetail.discountDiff/100 | currency ''}}</td>
                                <td>
                                    <template v-if="manualTradeDetail.status==1">
                                        未提交
                                    </template>
                                    <template v-if="manualTradeDetail.status==2">
                                        待审核
                                    </template>
                                    <template v-if="manualTradeDetail.status==3">
                                        审核通过
                                    </template>
                                    <template v-if="manualTradeDetail.status==4">
                                        审核不通过
                                    </template>
                                </td>
                                <td>编辑、提交、通过、退回、删除</td>
                                <td>
                                    {{manualTradeDetail.activityOperationID}}:{{manualTradeDetail.activityName}}
                                </td>
                                <td>
                                    <a href="{{origin}}/file/download/{{manualTradeDetail.certificateID}}">下载</a>
                                </td>
                                <td>
                                    {{manualTradeDetail.remarks}}
                                </td>
                                <td>
                                    {{manualTradeDetail.refuseReason}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="table-footer">
                        <page :all="pageall"
                              :cur.sync="defaultData.pageIndex"
                              :page_size.sync="defaultData.pageSize">
                        </page>
                    </div>
                </div>
                <div class="no-list" v-show="!manualTradeDetailList.length" >
                    未找到数据
                </div>
                <validator name="vali">
                    <form novalidate>
                        <div id="modal_trade_info" data-backdrop="static" class="modal fade" style="display: none;">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h3>添加交易</h3>
                                        <button type="button" class="close" data-dismiss="modal">×</button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label>
                                                <i class="aaaa">*</i>商户ID：
                                            </label>
                                            <input type="text" class="form-control" placeholder="商户ID" v-model="tradeInfo.merchantOperationID" v-validate:val1="['required']" v-limitnumber="tradeInfo.merchantOperationID">
                                            <span v-if="$vali.val1.required && fire" class="validation-error-label">请输入商户ID</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>参与活动：</label>
                                            <input type="text" class="form-control" placeholder="活动ID" v-model="tradeInfo.activityOperationID" v-validate:val2="['required']" v-limitnumber="tradeInfo.activityOperationID">
                                            <span v-if="$vali.val2.required && fire" class="validation-error-label">请输入活动ID</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>消费金额：</label>
                                            <input type="text" class="form-control" v-model="tradeInfo.consumptionAmount" v-validate:val3="['required']" v-limitprice="tradeInfo.consumptionAmount">
                                            <span v-if="$vali.val3.required && fire" class="validation-error-label">请输入消费金额</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>折扣金额：</label>
                                            <input type="text" class="form-control" v-model="tradeInfo.discountAmount" v-validate:val4="['required']" v-limitprice="tradeInfo.discountAmount">
                                            <span v-if="$vali.val4.required && fire" class="validation-error-label">请输入折扣金额</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>实付金额：</label>
                                            <input type="text" class="form-control" v-model="tradeInfo.payAmount" v-validate:val5="['required']" v-limitprice="tradeInfo.payAmount">
                                            <span v-if="$vali.val5.required && fire" class="validation-error-label">请输入实付金额</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>三方应收：</label>
                                            <input type="text" class="form-control" v-model="tradeInfo.thirdPartyReceivable" v-validate:val6="['required']" v-limitprice="tradeInfo.thirdPartyReceivable">
                                            <span v-if="$vali.val6.required && fire" class="validation-error-label">请输入三方应收</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>退税款：</label>
                                            <input type="text" class="form-control" v-model="tradeInfo.suspensionTax" v-validate:val7="['required']" v-limitprice="tradeInfo.suspensionTax">
                                            <span v-if="$vali.val7.required && fire" class="validation-error-label">请输入退税款</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>商户实补：</label>
                                            <input type="text" class="form-control" v-model="tradeInfo.merchantSubsidyActual" v-validate:val8="['required']" v-limitprice="tradeInfo.merchantSubsidyActual">
                                            <span v-if="$vali.val8.required && fire" class="validation-error-label">请输入商户实补</span>
                                        </div>
                                        <div class="form-group">
                                            <label><i>*</i>上传凭证：</label>
                                            <input type="file" style="display: none;" @change="uploads($event)">
                                            <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick">上传凭证</a>
                                            <span v-text="uploadText" v-show="uploadText!=''"></span>
                                            <span v-if="tradeInfo.certificateID=='' && fire" class="validation-error-label">请选择凭证</span>
                                        </div>
                                        <div class="form-group">
                                            <label style="position: relative;top: -40px;">备注:</label>
                                            <textarea class="form-control"  id="remarks" v-model="tradeInfo.remarks"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group tc">
                                        <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                                        <button type="button" @click="saveTradeInfo" class="btn btn-primary">保存</button>
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
<script>
    import model from '../../ajax/Transaction/manual_trade_detail_model'
    export default{
        data(){
            this.model = model(this);
            return {
                defaultData: {
                    subCompanyID: "",
                    pageIndex: 1,
                    pageSize: 10,
                    cityID: "",
                    startDate: "",
                    endDate: "",
                    merchantOperationID: "",
                    merchantName: "",
                    tradeDetailID: "",
                    serialNumber: "",
                    activityOperationID: '',
                    timeRange: '3'
                },
                manualTradeDetailList: [],
                cityList: [],
                subCompanyList: [],
                fire:false,
                tradeInfo:{
                    merchantOperationID:'',
                    activityOperationID:'',
                    consumptionAmount:'',
                    discountAmount:'',
                    payAmount:'',
                    thirdPartyReceivable:'',
                    suspensionTax:'',
                    merchantSubsidyActual:'',
                    certificateID:'',
                    remarks:''
                },
                uploadText:'',
            }
        },
        methods: {
            getManualTradeDetailData(){
                back_json.saveArray(this.$route.path,this.defaultData);
                this.model.getManualTradeDetailList(this.defaultData).then((response)=> {
                    if (response.data.code == 0) {
                        this.$set('manualTradeDetailList', response.data.data);
                    }
                })
            },
            getSubCompanyData(){
                // *** 请求分公司数据
                this.$common_model.getcompany().then((response)=> {
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if (response.data.code == 0) {
                        this.$set('subCompanyList', response.data.data)
                    }
                });
            },
            //获取城市数据
            getCityData(_id){
                this.cityID = '';
                let data = {
                    'subCompanyID': _id
                }
                this.$common_model.getcity(data)
                        .then((response)=> {
                            if (response.data.code == 0) {
                                this.$set('cityList', response.data.data)
                            }
                        });
            },
            addTradeInfo(){
                this.errorHideL();
                this.select_merchantId='';
                this.tradeInfo.merchantOperationID='';
                this.tradeInfo.activityOperationID='';
                this.tradeInfo.consumptionAmount='';
                this.tradeInfo.discountAmount='';
                this.tradeInfo.payAmount='';
                this.tradeInfo.thirdPartyReceivable='';
                this.tradeInfo.suspensionTax='';
                this.tradeInfo.merchantSubsidyActual='';
                this.tradeInfo.certificateID='';
                this.tradeInfo.remarks='';
                this.uploadText='';
                $('#modal_trade_info').modal('show');
            },
            errorHideL(){
                $('.suberror,.timeerror').hide();
                this.fire=false;
            },
            saveTradeInfo(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                //隐藏非空提示
                this.errorHideL();
                //验证非空
                if(!this.$vali.valid||this.tradeInfo.certificateID==''){
                    this.fire=true;
                    return;
                }
                let data={};
                $.extend(true,data,this.tradeInfo);
                data.consumptionAmount= accMul(this.tradeInfo.consumptionAmount,100);
                data.discountAmount=accMul(this.tradeInfo.discountAmount,100);
                data.payAmount=accMul(this.tradeInfo.payAmount,100);
                data.thirdPartyReceivable=accMul(this.tradeInfo.thirdPartyReceivable,100);
                data.suspensionTax=accMul(this.tradeInfo.suspensionTax,100);
                data.merchantSubsidyActual=accMul(this.tradeInfo.merchantSubsidyActual,100);
                this.model.addtrade(data)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.getManualTradeDetailData();
                                dialogs();
                                $(".modal").modal("hide");
                            }
                        })
            },
            //初始化
            clear(){
                this.tradeInfo={
                    merchantOperationID:'',
                    activityOperationID:'',
                    consumptionAmount:'',
                    discountAmount:'',
                    payAmount:'',
                    thirdPartyReceivable:'',
                    suspensionTax:'',
                    merchantSubsidyActual:'',
                    certificateID:'',
                    remarks:''
                },
                        this.uploadText='';
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
                                if(response.data.code==0){
                                    vm.tradeInfo.certificateID=response.data.data;
                                    vm.uploadText=files.name;
                                    dialogs('success','上传成功！');
                                }
                            })
                }
            },
        },
        ready: function () {
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.getSubCompanyData();
            this.getCityData();
            this.getManualTradeDetailData();
        },
        watch: {
            'defaultData.timeRange'(){
                this.defaultData.startDate = init_date(this.defaultData.timeRange)[0];
                this.defaultData.endDate = init_date(this.defaultData.timeRange)[1];
            },
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.getManualTradeDetailData();
            }
        },
    }
</script>
