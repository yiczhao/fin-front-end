 <template>
    <index :title="'手工单'"
           :ptitle="'交易管理'"
           :isshow="'isshow'">
        <div class="content manual-trade-detail" slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-left">
                        <a  class="btn btn-add add-top" data-toggle="modal" data-target="#modal_add" @click="addTradeInfo"
                           data-ksa="manual_trade_detail.add">录入手工单</a>
                    </div>
                    <div class="heading-right">
                        <select class="form-control" v-model="defaultData.subCompanyID" title=""
                                @change="getCityData(defaultData.subCompanyID)">
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
                        <datepicker v-show="defaultData.timeRange==4" :readonly="true"
                                    :value.sync="defaultData.startDate"
                                    format="YYYY-MM-DD"></datepicker>
                        <span v-show="defaultData.timeRange==4">至</span>
                        <datepicker v-show="defaultData.timeRange==4" :readonly="true" :value.sync="defaultData.endDate"
                                    format="YYYY-MM-DD"></datepicker>
                        <select class="form-control" v-model="defaultData.status">
                            <option value="">全部手工单状态</option>
                            <option value="1">未提交</option>
                            <option value="2">待审核</option>
                            <option value="3">审核通过</option>
                            <option value="4">审核不通过</option>
                        </select>
                        <input type="text" class="form-control" v-model="defaultData.merchantOperationID"
                               placeholder="商户ID" v-limitnumber="defaultData.merchantOperationID">
                        <input type="text" class="form-control" v-model="defaultData.merchantName" placeholder="商户名">
                        <input type="text" class="form-control" placeholder="活动ID"
                               v-limitnumber="defaultData.activityOperationID"
                               v-model="defaultData.activityOperationID">
                        <input type="text" class="form-control" v-model="defaultData.tradeDetailID"
                               v-limitnumber="defaultData.tradeDetailID" placeholder="交易ID">
                        <input type="text" class="form-control" v-model="defaultData.serialNumber" placeholder="交易流水号">
                    </div>
                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="getManualTradeDetailData()" data-ksa="manual_trade_detail.search">查询</a>
                    </div>
                </div>

                <div v-if="!!manualTradeDetailList.length" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer" v-cloak>
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
                            <tr v-show="!!manualTradeDetailList.length" role="row"
                                v-for="(index,manualTradeDetail) in manualTradeDetailList"
                                v-bind:class="{'odd':(index%2==0)}">
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
                                <td>
                                    <a v-if="manualTradeDetail.status==1 || manualTradeDetail.status==4"
                                       @click="editTradeInfo(manualTradeDetail.id)" data-ksa="manual_trade_detail.update">编辑</a>
                                    <a v-if="manualTradeDetail.status==1 || manualTradeDetail.status==4"
                                       @click="apply(manualTradeDetail.id)" data-ksa="manual_trade_detail.apply">提交</a>
                                    <a v-if="manualTradeDetail.status==2" @click="approved(manualTradeDetail.id)"
                                       data-ksa="manual_trade_detail.review">通过</a>
                                    <a v-if="manualTradeDetail.status==2" @click="refused(manualTradeDetail.id)"
                                       data-ksa="manual_trade_detail.review">退回</a>
                                    <a v-if="manualTradeDetail.status==1 || manualTradeDetail.status==4"
                                       @click="deleteManualTradeDetail(manualTradeDetail.id)"
                                       data-ksa="manual_trade_detail.delete">删除</a>
                                </td>
                                <td>
                                    <a data-ksa="activity_manage.search" v-else v-link="{name:'activity-lists',params:{operationID:manualTradeDetail.activityOperationID,name:manualTradeDetail.activityName}}">{{manualTradeDetail.activityOperationID}}:{{manualTradeDetail.activityName}}</a>
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

                    <div class="datatable-bottom">
                       <div class="left">
                            <a class="icon-file-excel" @click="manualTradeDetailExcel" style="line-height: 30px;" >Excel导出</a>
                       </div>

                       <div class="right">
                            <page :all="pageall"
                                  :cur.sync="defaultData.pageIndex"
                                  :page_size.sync="defaultData.pageSize">
                            </page>
                       </div>
                    </div>
                </div>

                <div class="no-list" v-show="!manualTradeDetailList.length">
                    未找到数据
                </div>
                
                <div class="nums" v-show="manualTradeDetailList.length">
                    <table cellspacing="0" cellpadding="0">
                        <tr>
                            <td rowspan="4">
                                <span>合计： </span>
                            </td>
                            <td>
                                <span>消费金额:</span>
                                <span>{{nums.consumptionAmount/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>折扣金额:</span>
                                <span>{{nums.discountAmount/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>实付金额:</span>
                                <span>{{nums.payAmount/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>额度抵扣:</span>
                                <span>{{nums.limitDeduct/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>本金抵扣:</span>
                                <span>{{nums.principalDeduct/100 | currency ''}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>三方应收:</span>
                                <span>{{nums.thirdPartyReceivable/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>商户应补:</span>
                                <span>{{nums.merchantSubsidyShould/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>退税款:</span>
                                <span>{{nums.suspensionTax/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>商户实补:</span>
                                <span>{{nums.merchantSubsidyActual/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>折扣差:</span>
                                <span>{{nums.discountDiff/100 | currency ''}}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <content-dialog
                    :show.sync="modal_add" :type.sync="'infos'" :is-cancel="true"
                    :title.sync="addtitle" @kok="saveTradeInfo" @kcancel="modal_add=false"
            >
                <validator name="vali">
                    <div class="dialog-row">
                        <label><i>*</i>商户ID：</label>
                        <input type="text" class="form-control" placeholder="商户ID"
                               v-model="tradeInfo.merchantOperationID"
                               v-validate:val1="['required']"
                               v-limitnumber="tradeInfo.merchantOperationID"
                               v-bind:class="{'error-input':fire && $vali.val1.required}"
                        >
                        <span v-if="$vali.val1.required && fire" class="validation-error-label">请输入商户ID</span>
                    </div>
                    <div class="dialog-row">
                        <label><i>*</i>参与活动ID：</label>
                        <input type="text" class="form-control" placeholder="活动ID"
                               v-model="tradeInfo.activityOperationID"
                               v-validate:val2="['required']"
                               v-limitnumber="tradeInfo.activityOperationID"
                               v-bind:class="{'error-input':fire && $vali.val2.required}">
                        <span v-if="$vali.val2.required && fire" class="validation-error-label">请输入活动ID</span>
                    </div>
                    <div class="dialog-row">
                        <label><i>*</i>消费金额：</label>
                        <input type="text" class="form-control"
                               v-model="tradeInfo.consumptionAmount" v-validate:val3="['required']"
                               v-limitaddprice="tradeInfo.consumptionAmount"
                               v-bind:class="{'error-input':fire && $vali.val3.required}"
                               min="0">
                        <span v-if="$vali.val3.required && fire" class="validation-error-label">请输入消费金额</span>
                    </div>
                    <div class="dialog-row">
                        <label><i>*</i>折扣金额：</label>
                        <input type="text" class="form-control" v-model="tradeInfo.discountAmount"
                               v-validate:val4="['required']"
                               v-limitaddprice="tradeInfo.discountAmount"
                               min="0"
                               v-bind:class="{'error-input':fire && $vali.val4.required}">
                        <span v-if="$vali.val4.required && fire" class="validation-error-label">请输入折扣金额</span>
                    </div>
                    <div class="dialog-row">
                        <label><i>*</i>实付金额：</label>
                        <input type="text" class="form-control" v-model="tradeInfo.payAmount"
                               v-validate:val5="['required']" v-limitaddprice="tradeInfo.payAmount"
                               min="0"
                               v-bind:class="{'error-input':fire && $vali.val5.required}">
                        <span v-if="$vali.val5.required && fire" class="validation-error-label">请输入实付金额</span>
                    </div>
                    <div class="dialog-row">
                        <label><i>*</i>三方应收：</label>
                        <input type="text" class="form-control"
                               v-model="tradeInfo.thirdPartyReceivable"
                               v-validate:val6="['required']"
                               v-limitaddprice="tradeInfo.thirdPartyReceivable"
                               min="0"
                               v-bind:class="{'error-input':fire && $vali.val6.required}">
                        <span v-if="$vali.val6.required && fire" class="validation-error-label">请输入三方应收</span>
                    </div>
                    <div class="dialog-row">
                        <label><i>*</i>退税款：</label>
                        <input type="text" class="form-control" v-model="tradeInfo.suspensionTax"
                               v-validate:val7="['required']"
                               v-limitaddprice="tradeInfo.suspensionTax"
                               min="0"
                               v-bind:class="{'error-input':fire && $vali.val7.required}">
                        <span v-if="$vali.val7.required && fire" class="validation-error-label">请输入退税款</span>
                    </div>
                    <div class="dialog-row">
                        <label><i>*</i>商户实补：</label>
                        <input type="text" class="form-control"
                               v-model="tradeInfo.merchantSubsidyActual"
                               v-validate:val8="['required']"
                               v-limitaddprice="tradeInfo.merchantSubsidyActual"
                               v-bind:class="{'error-input':fire && $vali.val8.required}">
                        <span v-if="$vali.val8.required && fire" class="validation-error-label">请输入商户实补</span>
                    </div>
                    <div class="dialog-row">
                        <label><i>*</i>上传凭证：</label>
                        <input type="file" style="display: none;" @change="uploads($event)">
                        <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick">上传凭证</a>
                        <span v-text="uploadText" v-show="uploadText!=''"></span>
                        <span v-if="tradeInfo.certificateID=='' && fire"
                              class="validation-error-label">请上传凭证</span>
                    </div>
                    <div class="dialog-row">
                        <label style="position: relative;top: -40px;">备注：</label>
                        <textarea class="form-control" id="remarks"
                                  v-model="tradeInfo.remarks"></textarea>
                    </div>
                </validator>
            </content-dialog>
            
            <content-dialog
                    :show.sync="show" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="dtitle" @kok="processManualTradeDetail" @kcancel="show = false"
            >
                <div class="form-group" style="overflow:hidden" v-show="dtitle=='审核退回'">
                    <label class="col-lg-3 control-label"><i style="color:red">*</i>退回原因：</label>
                    <div class="col-lg-9">
                        <textarea rows="5" cols="5" class="form-control" v-bind:class="{ 'error': !refuseReason&&fires}"
                                  v-model="refuseReason" placeholder=""></textarea>
                        <span v-show="!refuseReason&&fires" class="validation-error-label">
                            请填写退回原因
                        </span>
                    </div>
                </div>
            </content-dialog>
        </div>
    </index>
</template>
<script>
    import model from '../../ajax/Transaction/manual_trade_detail_model'
    export default{
        data(){
            this.model = model(this);
            return {
                origin:origin,
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
                    status:'',
                    timeRange: '3'
                },
                pageall:1,
                manualTradeDetailList: [],
                cityList: [],
                subCompanyList: [],
                fire: false,
                fires: false,
                show: false,
                dtitle: '',
                tradeInfo: {
                    id: '',
                    merchantOperationID: '',
                    activityOperationID: '',
                    consumptionAmount: '',
                    discountAmount: '',
                    payAmount: '',
                    thirdPartyReceivable: '',
                    suspensionTax: '',
                    merchantSubsidyActual: '',
                    certificateID: '',
                    remarks: ''
                },
                refuseReason: '',
                uploadText: '',
                addtitle:'',
                modal_add: false,
                nums:{
                    "consumptionAmount":"",
                    "discountAmount":"",
                    "payAmount":"",
                    "limitDeduct":"",
                    "principalDeduct":"",
                    "thirdPartyReceivable":"",
                    "merchantSubsidyShould":"",
                    "suspensionTax":"",
                    "merchantSubsidyActual":"",
                    "discountDiff":"",
                    "collectionAmount":"",
                    "commission33211":"",
                    "entryAmount":""
                }
            }
        },
        methods: {
            getManualTradeDetailData(){
                back_json.saveArray(this.$route.path, this.defaultData);
                this.model.getManualTradeDetailSum(this.defaultData)
                        .then((response)=>{
                            (response.data.code==0)?this.$set('nums',response.data.data):null;
                        });
                this.model.getManualTradeDetailList(this.defaultData).then((response)=> {
                    if (response.data.code == 0) {
                        this.$set('manualTradeDetailList', response.data.data);
                        this.$set('pageall', response.data.total);
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
                this.select_merchantId = '';
                this.tradeInfo.merchantOperationID = '';
                this.tradeInfo.activityOperationID = '';
                this.tradeInfo.consumptionAmount = '';
                this.tradeInfo.discountAmount = '';
                this.tradeInfo.payAmount = '';
                this.tradeInfo.thirdPartyReceivable = '';
                this.tradeInfo.suspensionTax = '';
                this.tradeInfo.merchantSubsidyActual = '';
                this.tradeInfo.certificateID = '';
                this.tradeInfo.remarks = '';
                this.uploadText = '';
                this.addtitle='添加手工单';
                this.modal_add=true;
            },
            processManualTradeDetail(){
                if (sessionStorage.getItem('isHttpin') == 1)return;
                if (this.dtitle == '提交审核') {
                    let data = {
                        "id": this.id
                    };
                    this.model.applyManualTradeDetail(data)
                            .then((response)=> {
                                if (response.data.code == 0) {
                                    this.getManualTradeDetailData();
                                    this.show = false;
                                    dialogs("success", response.data.message);
                                }
                            });
                }
                else if (this.dtitle == '审核退回') {
                    if (this.refuseReason == '') {
                        this.fires = true;
                        return;
                    }
                    let data = {
                        'id': this.id,
                        'refuseReason': this.refuseReason
                    }
                    this.model.refusedManualTradeDetail(data)
                            .then((response)=> {
                                if (response.data.code == 0) {
                                    this.getManualTradeDetailData();
                                    this.show = false;
                                    dialogs('success', response.data.message);
                                }
                            })
                }
                else if (this.dtitle == '审核通过') {
                    let data = {
                        "id": this.id
                    };
                    this.model.approvedManualTradeDetail(data)
                            .then((response)=> {
                                if (response.data.code == 0) {
                                    this.getManualTradeDetailData();
                                    this.show = false;
                                    dialogs("success", response.data.message);
                                }
                            });
                } else if (this.dtitle == '删除手工单') {
                    let data = {
                        "id": this.id
                    };
                    this.model.deleteManualTradeDetail(data)
                            .then((response)=> {
                                if (response.data.code == 0) {
                                    this.getManualTradeDetailData();
                                    this.show = false;
                                    dialogs("success", response.data.message);
                                }
                            });
                }
            },
            editTradeInfo(_id){
                let data = {
                    "id": _id
                };
                this.model.searchManualTradeDetail(data)
                        .then((response)=> {
                            if (response.data.code == 0) {
                                this.$set('tradeInfo', response.data.data);
                                this.errorHideL();
                                this.modal_add=true;
                                this.addtitle='编辑手工单';
                            }
                        });
            },
            apply(_id){
                this.id = _id;
                this.dtitle = '提交审核';
                this.show = true;
            },
            approved(_id){
                this.id = _id;
                this.dtitle = '审核通过';
                this.show = true;
            },
            refused(_id){
                this.id = _id;
                this.dtitle = '审核退回';
                this.refuseReason = '';
                this.fires =false;
                this.show = true;
            },
            deleteManualTradeDetail(_id){
                this.id = _id;
                this.dtitle = '删除手工单';
                this.show = true;
            },
            errorHideL(){
                this.fire = false;
            },
            saveTradeInfo(){
                if (sessionStorage.getItem('isHttpin') == 1)return;
                //隐藏非空提示
                this.errorHideL();
                //验证非空
                if (!this.$vali.valid || this.tradeInfo.certificateID == '') {
                    this.fire = true;
                    return;
                }
                let data = {};
                $.extend(true, data, this.tradeInfo);
                data.consumptionAmount = this.tradeInfo.consumptionAmount;
                data.discountAmount = this.tradeInfo.discountAmount;
                data.payAmount = this.tradeInfo.payAmount;
                data.thirdPartyReceivable = this.tradeInfo.thirdPartyReceivable;
                data.suspensionTax = this.tradeInfo.suspensionTax;
                data.merchantSubsidyActual = this.tradeInfo.merchantSubsidyActual;
                this.model.addtrade(data)
                        .then((response)=> {
                            if (response.data.code == 0) {
                                this.getManualTradeDetailData();
                                dialogs(response.data.message);
                                this.modal_add=false;
                            }
                        })
            },
            //初始化
            clear(){
                this.tradeInfo = {
                    merchantOperationID: '',
                    activityOperationID: '',
                    consumptionAmount: '',
                    discountAmount: '',
                    payAmount: '',
                    thirdPartyReceivable: '',
                    suspensionTax: '',
                    merchantSubsidyActual: '',
                    certificateID: '',
                    remarks: ''
                };
                this.uploadText = '';
            },
            uploadClick(){
                $('input[type="file"]').val('');
                $('input[type="file"]').click();
            },
            uploads(e){
                if (e.target.value == '' && this.uploadText != '') {
                    return;
                }
                let files = e.target.files[0];
                let vm = this;
                var reader = new FileReader();
                if (!check_upload(files.name)) {
                    return;
                }
                reader.readAsDataURL(files);
                reader.onload = function (e) {
                    let datas = {
                        name: files.name,
                        data: this.result.split(',')[1]
                    }
                    vm.$common_model.upload(datas)
                            .then((response)=> {
                                if (response.data.code == 0) {
                                    vm.tradeInfo.certificateID = response.data.data;
                                    vm.uploadText = files.name;
                                    dialogs('success', '上传成功！');
                                }
                            })
                }
            },
            manualTradeDetailExcel(){
                if(!this.manualTradeDetailList.length>0)return;
                //初始化
                this.defaultData.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.manualTradeDetailExcel+ $.param(this.defaultData));
            }
        },
        ready: function () {
            this.defaultData.startDate = init_date(this.defaultData.timeRange)[0];
            this.defaultData.endDate = init_date(this.defaultData.timeRange)[1];
            (back_json.isback && back_json.fetchArray(this.$route.path) != '') ? this.checkForm = back_json.fetchArray(this.$route.path) : null;
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
