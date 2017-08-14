<template>
    <index :title="'调账管理'"
           :ptitle="'交易管理'"
           :hname="'adjust-trade-detailpre'"
           :isshow="'isshow'">
        <div class="content adjust-trade-detailpre" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="trade_detail_manage"><a v-link="{name:'trade-info'}">交易明细</a></li>
                    <li class="active" data-ksa="adjust_trade_detail_pre_manage"><a v-link="{name:'adjust-trade-detailpre'}">调账管理</a></li>
                    <li data-ksa="manual_trade_detail"><a v-link="{name:'manual-trade-detail'}">手工单管理</a></li>
                    <li data-ksa="manually_settlement"><a v-link="{name:'manually-settlement'}">手工结算</a></li>
                    <li data-ksa="exception_trade_manage"><a v-link="{name:'Abnormal-transaction'}">异常交易</a></li>
                    <li data-ksa="exception_trade_white_list_manage"><a v-link="{name:'white-lists'}">异常白名单</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" @click="addTrade" data-ksa="adjust_trade_detail_pre_manage.add">添加调账交易</a>
                    </div>

                    <div class="heading-right">
                        <select class="form-control" v-model="checkForm.subCompanyID" @change="getCity(checkForm.subCompanyID)">
                            <option value="">全部分公司</option>
                            <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                        </select>

                        <select class="form-control" v-model="checkForm.cityID">
                            <option value="">全部城市</option>
                            <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                        </select>

                        <select class="form-control" v-model="checkForm.timeRange" @change="getTime">
                            <option value="0">昨天</option>
                            <option value="1">最近一周</option>
                            <option value="2">最近一个月</option>
                            <option value="3">最近三个月</option>
                            <option value="4">自定义时间</option>
                        </select>

                        <div v-show="checkForm.timeRange==4"  class="inline">
                            <datepicker :value.sync="checkForm.startDate"></datepicker>
                            <span>至</span>
                            <datepicker :value.sync="checkForm.endDate"></datepicker>
                        </div>
                        <input type="text" class="form-control" placeholder="商户号" v-model="checkForm.backendMerchantCode">
                        <input type="text" class="form-control" placeholder="商户简称" v-model="checkForm.backendMerchantName">
                        <input type="text" class="form-control" placeholder="门店号" v-model="checkForm.backendStoreCode">
                        <input type="text" class="form-control" placeholder="门店名称" v-model="checkForm.backendStoreName">
                        <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="商盟ID" v-limitnumber="checkForm.merchantOperationID">
                        <input type="text" class="form-control" placeholder="活动ID" v-limitnumber="checkForm.activityOperationID" v-model="checkForm.activityOperationID">
                        <input type="text" class="form-control" placeholder="交易流水号" v-model="checkForm.serialNumber">

                        <select class="form-control" v-model="checkForm.status">
                            <option value="">全部交易状态</option>
                            <option value="1">未提交</option>
                            <option value="2">待审核</option>
                            <option value="3">审核通过</option>
                            <option value="4">审核不通过</option>
                        </select>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="checkNew" data-ksa="adjust_trade_detail_pre_manage.search">查询</a>
                    </div>
                </div>

                <div v-cloak v-show="tradeList.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>交易ID</th>
                                <th>交易流水号</th>
                                <th>分公司</th>
                                <th>城市</th>

                                <th>商户号</th>
                                <th>商户简称</th>
                                <th>门店号</th>
                                <th>门店名称</th>
                                <th>商盟ID</th>
                                <th>商盟商户名称</th>

                                <th>额度抵扣</th>
                                <th>本金抵扣</th>
                                <th>银行应补</th>
                                <th>商户应补</th>
                                <th>补贴代扣</th>
                                <th>商户实补</th>
                                <th>暂扣税金</th>
                                <th>扣收金额</th>
                                <th>导流佣金</th>
                                <th>状态</th>
                                <th>操作</th>
                                <th>参与活动</th>
                                <th>调账</th>
                                <th>凭证</th>
                                <th>备注</th>
                                <th>不通过原因</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(index,trlist) in tradeList" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.tradeDetailID}}</td>
                                <td>{{trlist.serialNumber}}</td>
                                <td>{{trlist.subCompanyName}}</td>
                                <td>{{trlist.cityName}}</td>

                                <td>{{trlist.backendMerchantCode}}</td>
                                <td>{{trlist.backendMerchantName}}</td>
                                <td>{{trlist.backendStoreCode}}</td>
                                <td>{{trlist.backendStoreName}}</td>
                                <td>{{trlist.merchantOperationID}}</td>
                                <td>
                                    <span v-if="!trlist.backendStoreCode">{{trlist.merchantName}}</span>
                                </td>
                                <td>{{trlist.limitDeduct/100 | currency ''}}</td>
                                <td>{{trlist.principalDeduct/100 | currency ''}}</td>
                                <td>{{trlist.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{trlist.subsidyWithhold/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyActual/100 | currency ''}}</td>
                                <td>{{trlist.suspensionTax/100 | currency ''}}</td>
                                <td>{{trlist.collectionAmount/100 | currency ''}}</td>
                                <td>{{trlist.commission33211/100 | currency ''}}</td>
                                <td>
                                    <template v-if="trlist.status==1">未提交</template>
                                    <template v-if="trlist.status==2">等待审核</template>
                                    <template v-if="trlist.status==3">审核通过</template>
                                    <template v-if="trlist.status==4">审核不通过</template>
                                </td>
                                <td>
                                    <a data-ksa="adjust_trade_detail_pre_manage.update" @click="editAdd(trlist.id)" v-if="trlist.status==1||trlist.status==4">编辑</a>
                                    <a data-ksa="adjust_trade_detail_pre_manage.apply" @click="apply(trlist.id)" v-if="trlist.status==1||trlist.status==4">提交</a>
                                    <a data-ksa="adjust_trade_detail_pre_manage.pass" @click="approved(trlist.id)" v-if="trlist.status==2">通过</a>
                                    <a data-ksa="adjust_trade_detail_pre_manage.back" @click="back(trlist.id)" v-if="trlist.status==2">退回</a>
                                    <a data-ksa="adjust_trade_detail_pre_manage.delete" @click="deleteTrade(trlist.id)" v-if="trlist.status==4">删除</a>
                                </td>
                                <td>
                                    <template v-if="!trlist.activityName">
                                        无
                                    </template>
                                    <a data-ksa="activity_manage.search" v-else v-link="{name:'activity-lists',params:{operationID:trlist.activityOperationID,name:trlist.activityName,osubcompanyID:trlist.subCompanyID}}">{{trlist.activityOperationID}}:{{trlist.activityName}}</a>
                                </td>
                                <td>
                                    <a data-ksa="adjust_trade_detail_pre_manage.search" v-link="{'name':'adjust-trade-detailpre-list','params':{'adjustTradeDetailPreId':trlist.id}}">明细</a>
                                </td>
                                <td>
                                    <a href="{{origin}}/file/download/{{trlist.certificateID}}">下载</a>
                                </td>
                                <td aria-label="{{trlist.remarks}}" v-bind:class="{'hint--top':(trlist.remarks!=null&&trlist.remarks.length>15)}">
                                    {{trlist.remarks | substring 15}}
                                </td>
                                <td>
                                    {{trlist.refuseReason}}
                                </td>
                            </tr>
                            <tr>
                                <td>合计：</td>
                                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                <td>{{nums.limitDeduct/100 | currency ''}}</td>
                                <td>{{nums.principalDeduct/100 | currency ''}}</td>
                                <td>{{nums.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{nums.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{nums.subsidyWithhold/100 | currency ''}}</td>
                                <td>{{nums.merchantSubsidyActual/100 | currency ''}}</td>
                                <td>{{nums.suspensionTax/100 | currency ''}}</td>
                                <td>{{nums.collectionAmount/100 | currency ''}}</td>
                                <td>{{nums.commission33211/100 | currency ''}}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">
                        <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" v-on:click="adjustTradeDetailPre" data-ksa="adjust_trade_detail_pre_manage.export">Excel导出</a>
                        </div>

                        <div class="right">
                            <page :all="pageall"
                                  :cur.sync="checkForm.pageIndex"
                                  :page_size.sync="checkForm.pageSize">
                            </page>
                        </div>
                    </div>

                </div>
                <div class="no-list" v-else>
                    未查询到数据！
                </div>

                <content-dialog
                        :show.sync="addShow" :is-button="false" :type.sync="'infos'"
                        :title.sync="addTitle"
                >
                    <validator name="vali">
                        <div class="dialog-row">
                            <span>
                                  <label>
                                      <i>*</i>商户：
                                  </label>
                                 <select class="form-control" v-model="merchantType"
                                         @change="redata.merchantOperationID=redata.backendStoreCode=''"
                                         style="width: 76px;padding: 0;color: #777;">
                                      <option value="1">商盟ID</option>
                                      <option value="2">门店号</option>
                                  </select>
                                 <template v-if="merchantType==1">
                                    <input type="text"
                                           class="form-control"
                                           v-model="redata.merchantOperationID "
                                           v-validate:val1="['required']"
                                           v-bind:class="{'error-input':fire && $vali.val1.required}"
                                           v-limitnumber="redata.merchantOperationID"
                                           placeholder="请输入商盟ID">
                                </template>
                                <template v-if="merchantType==2">
                                    <input type="text"
                                           class="form-control"
                                           v-model="redata.backendStoreCode"
                                           v-validate:val1="['required']"
                                           v-bind:class="{'error-input':fire && $vali.val1.required}"
                                           v-limitnumber="redata.backendStoreCode"
                                           placeholder="请输入门店号">
                                </template>
                            </span>
                            <div class="pl95">
                                <span style="color:red">保存时若提示系统内多个门店ID为xxxx，请选择并填写【门店号】进行调账</span>
                            </div>
                        </div>
                        <div class="dialog-row">
                            <span>
                                 <label><i>*</i>参与活动：</label>
                                 <input type="text"
                                        class="form-control"
                                        v-model="redata.activityOperationID"
                                        v-validate:val2="['required']"
                                        v-limitnumber="redata.activityOperationID"
                                        v-bind:class="{'error-input':fire && $vali.val2.required}"
                                        placeholder="请输入活动ID">
                            </span>
                        </div>
                        <div class="dialog-row">
                         <span>
                             <label class="tlabel"><i>*</i>交易流水号：</label>
                             <textarea rows="3"
                                       class="form-control"
                                       v-model="redata.serialNumber"
                                       v-validate:val3="['required']"
                                       v-bind:class="{'error-input':fire && $vali.val3.required}"
                                       placeholder="单次最多调账300笔，每两个交易流水号之间用逗号隔开"></textarea>
                         </span>
                            <div class="pl95">
                                <a class="btn btn-info" @click="getTradeData" data-ksa="manually_settlement.search">查询</a>
                                <span style="color:red">请点击【查询】查看录入的交易笔数是否正确</span>
                            </div>
                        </div>
                        <div class="dialog-row" v-show="!!redata.tradeCount||!!redata.consumptionAmount">
                            <span class="pl95">交易笔数：{{redata.tradeCount}}笔</span>
                            <span>消费金额：{{redata.consumptionAmount | currency ''}}元</span>
                        </div>
                        <div class="dialog-row">
                        <span>
                             <label><i>*</i>额度抵扣：</label>
                             <input
                                     v-model="redata.limitDeduct"
                                     v-validate:val4="['required']"
                                     v-bind:class="{'error-input':fire && $vali.val4.required}"
                                     v-limitprice="redata.limitDeduct"
                                     type="text" class="form-control" placeholder="额度抵扣">
                        </span>
                            <span>
                             <label><i>*</i>商户应补：</label>
                             <input type="text"
                                    class="form-control"
                                    v-model="redata.merchantSubsidyShould"
                                    v-validate:val5="['required']"
                                    v-bind:class="{'error-input':fire && $vali.val5.required}"
                                    v-limitprice="redata.merchantSubsidyShould"
                                    placeholder="商户应补">
                        </span>
                        </div>
                        <div class="dialog-row">
                        <span>
                             <label><i>*</i>本金抵扣：</label>
                             <input type="text"
                                    class="form-control"
                                    v-model="redata.principalDeduct"
                                    v-validate:val6="['required']"
                                    v-bind:class="{'error-input':fire && $vali.val6.required}"
                                    v-limitprice="redata.principalDeduct"
                                    placeholder="本金抵扣">
                        </span>
                            <span>
                             <label><i>*</i>扣收金额：</label>
                             <input type="text"
                                    class="form-control"
                                    v-model="redata.collectionAmount"
                                    v-validate:val7="['required']"
                                    v-bind:class="{'error-input':fire && $vali.val7.required}"
                                    v-limitprice="redata.collectionAmount"
                                    placeholder="扣收金额">
                        </span>
                        </div>
                        <div class="dialog-row">
                        <span>
                             <label><i>*</i>银行应补：</label>
                             <input type="text"
                                    class="form-control"
                                    v-model="redata.thirdPartyReceivable"
                                    v-validate:val8="['required']"
                                    v-bind:class="{'error-input':fire && $vali.val8.required}"
                                    v-limitprice="redata.thirdPartyReceivable"
                                    placeholder="银行应补">
                        </span>
                            <span>
                             <label><i>*</i>导流佣金：</label>
                             <input type="text"
                                    class="form-control"
                                    v-model="redata.commission33211"
                                    v-model="redata.thirdPartyReceivable"
                                    v-validate:val9="['required']"
                                    v-bind:class="{'error-input':fire && $vali.val9.required}"
                                    v-limitprice="redata.commission33211"
                                    placeholder="导流佣金">
                        </span>
                        </div>
                        <div class="dialog-row">
                        <span>
                             <label><i>*</i>上传凭证：</label>
                             <input type="file" style="display: none;" @change="uploads($event)">
                             <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick">上传凭证</a>
                            <span style="color:red">rar/zip等压缩包格式，附件大小3M以内，如文件过大，可将凭证图片截图后压缩</span>
                            <span v-text="uploadText" v-show="uploadText!=''"></span>
                            <span v-if="redata.certificateID=='' && fire"
                                  class="validation-error-label">请上传凭证</span>
                        </span>
                        </div>
                        <div class="dialog-row">
                         <span>
                             <label class="tlabel"><i>*</i>备注：</label>
                             <textarea rows="3"
                                       class="form-control"
                                       v-model="redata.remarks"
                                       v-validate:val10="['required']"
                                       v-bind:class="{'error-input':fire && $vali.val10.required}"
                                       placeholder="填写本次调账的备注信息，200个中文字符以内"
                             ></textarea>
                        </span>
                        </div>
                        <div class="form-group tc">
                            <a @click="saveAdd" class="btn btn-primary">保存</a>
                            <a @click="addShow=false" class="btn btn-default">取消</a>
                        </div>
                    </validator>
                </content-dialog>

                <content-dialog
                        :show.sync="waringshow" :is-cancel="true" :type.sync="'infos'"
                        :title.sync="waringtitle" @kok="waringbtn" @kcancel="waringshow = false"
                >
                    <div class="form-group" style="overflow:hidden" v-show="waringtitle=='确定退回调账交易？'">
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
        </div>
    </index>
</template>

<script>
    import model from '../../ajax/Transaction/adjust_tradeDetailPre_model'
    export default{
        data(){
            this.model=model(this);
            return{
                origin:window.origin,
                checkForm:{
                    subCompanyID:"",
                    cityID:"",
                    startDate:"",
                    endDate:"",
                    merchantOperationID:"",
                    activityOperationID:'',
                    status:'',
                    pageIndex:1,
                    timeRange:'3',
                    pageSize:10,

                    backendMerchantCode:'',
                    backendMerchantName:'',
                    backendStoreCode:'',
                    backendStoreName:''
                },
                subcompanyList:[],
                pageall:1,
                tradeList:[],
                cityList:[],
                nums:{},
                applyPayInfo:{},
                addShow:false,
                fire:false,
                addTitle:'',
                uploadText:'',
                tradeData:{},
                merchantType:1,
                redata:{
                    "backendStoreCode":'',
                    "activityOperationID": '',
                    "certificateID": '',
                    "collectionAmount": '',
                    "commission33211": '',
                    "consumptionAmount": '',
                    "id": '',
                    "limitDeduct": '',
                    "merchantOperationID": '',
                    "merchantSubsidyShould": '',
                    "principalDeduct": '',
                    "remarks": '',
                    "serialNumber": '',
                    "thirdPartyReceivable": '',
                    "tradeCount": ''
                },
                waringshow:false,
                waringtitle:'',
                refuseReason:'',
                fires:false
            }
        },
        methods:{
            //获取交易记录
            getTradeList(data){
                this.model.adjustTradeDetailPre_total(data)
                    .then((response)=>{
                        (response.data.code==0)?this.$set('nums',response.data.data):null;
                    });
                this.model.adjustTradeDetailPre_list(data)
                    .then((response)=>{
                        if(response.data.code==0){
                            this.$set('tradeList', response.data.data)
                            this.$set('pageall', response.data.total)
                        }
                    });
            },
            //获取分公司数据
            getSubcompany(){
                this.$common_model.getcompany()
                    .then((response)=>{
                        if(response.data.code==0){
                            this.$set('subcompanyList', response.data.data)
                        }
                    });
            },
            //获取城市数据
            getCity(_id){
                this.cityID='';
                let data={
                    'subCompanyID':_id
                }
                this.$common_model.getcity(data)
                    .then((response)=>{
                        if(response.data.code==0){
                            this.$set('cityList', response.data.data)
                        }
                    });
            },
            checkNew(){
                this.checkForm.pageIndex=1;
                this.query();
            },
            query() {
                if(sessionStorage.getItem('isHttpin')==1)return;
                //初始化
                this.show=false;
                this.addShow=false;
                this.waringshow=false;
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getTradeList(this.checkForm);
            },
            manuallyexcel() {
                if(!this.tradeList.length>0)return;
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.manuallyexcel+ $.param(this.checkForm));
            },
            getTime(){
                this.checkForm.startDate=init_date(this.checkForm.timeRange)[0];
                this.checkForm.endDate=init_date(this.checkForm.timeRange)[1];
            },
            addTrade(){
                this.uploadText='';
                this.fire=false;
                this.addTitle='添加调账交易';
                this.redata={
                    "activityOperationID": '',
                    "certificateID": '',
                    "collectionAmount": '',
                    "commission33211": '',
                    "consumptionAmount": '',
                    "id": '',
                    "limitDeduct": '',
                    "merchantOperationID": '',
                    "merchantSubsidyShould": '',
                    "principalDeduct": '',
                    "remarks": '',
                    "serialNumber": '',
                    "thirdPartyReceivable": '',
                    "tradeCount": ''
                }
                this.addShow=true;
            },
            editAdd(_id){
                this.uploadText='';
                this.fire=false;
                this.addTitle='编辑调账交易';
                this.model.adjustTradeDetailPre_item(_id).then((res)=>{
                    if(res.data.code==0){
                        this.$set('redata',res.data.data)
                        this.redata.id=_id;
                        this.addShow=true;
                    }
                })
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
                if(check_upload_size(files.size)){
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
                                vm.redata.certificateID = response.data.data;
                                vm.uploadText = files.name;
                                dialogs('success', '上传成功！');
                            }
                        })
                }
            },
            getTradeData(){
                if(this.redata.serialNumber=='')return;
                let data={
                    serialNumber:this.redata.serialNumber
                }
                this.model.getTradeData(data).then((res)=>{
                    if(res.data.code==0){
                        this.redata.tradeCount=res.data.data.tradeCount;
                        this.redata.consumptionAmount=res.data.data.consumptionAmount;
                    }
                });
            },
            saveAdd(){
                if (!this.$vali.valid || this.redata.certificateID == '') {
                    this.fire = true;
                    dialogs('info','请完善信息！')
                    return;
                }
                if (this.redata.certificateID == null) {
                    this.fire = true;
                    this.redata.certificateID = '';
                    return;
                }
                this.model.adjustTradeDetailPre_save(this.redata).then((res)=>{
                    if(res.data.code==0){
                        dialogs('success','保存成功！');
                        this.query();
                    }
                })
            },
            apply(_id){
                this.id=_id;
                this.waringshow=true;
                this.waringtitle='确定提交调账交易？';
            },
            approved(_id){
                this.id=_id;
                this.waringshow=true;
                this.waringtitle='确定通过调账交易？'
            },
            back(_id){
                this.id=_id;
                this.waringshow=true;
                this.refuseReason = '';
                this.fires = false;
                this.waringtitle='确定退回调账交易？';
            },
            deleteTrade(_id){
                this.id=_id;
                this.waringshow=true;
                this.waringtitle='确定删除调账交易？'
            },
            waringbtn(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(this.waringtitle=='确定提交调账交易？'){
                    this.model.adjustTradeDetailPre_apply(this.id).then((res)=>{
                        if(res.data.code==0){
                            dialogs('success','提交成功！');
                            this.query();
                        }
                    })
                }
                if(this.waringtitle=='确定通过调账交易？'){
                    this.model.adjustTradeDetailPre_approved(this.id).then((res)=>{
                        if(res.data.code==0){
                            dialogs('success','已通过！');
                            this.query();
                        }
                    })
                }
                if(this.waringtitle=='确定退回调账交易？'){
                    if (this.refuseReason == '') {
                        this.fires = true;
                        return;
                    }
                    let backdata = {
                        'id': this.id,
                        'refuseReason': this.refuseReason
                    }
                    this.model.adjustTradeDetailPre_back(backdata).then((res)=>{
                        if(res.data.code==0){
                            dialogs('success','已退回！');
                            this.query();
                        }
                    })
                }
                if(this.waringtitle=='确定删除调账交易？'){
                    this.model.adjustTradeDetailPre_delete(this.id).then((res)=>{
                        if(res.data.code==0){
                            dialogs('success','已删除！');
                            this.query();
                        }
                    })
                }
            },
            adjustTradeDetailPre() {
                if(!this.tradeList.length>0)return;
                //初始化
                this.checkForm.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.adjustTradeDetailPre+ $.param(this.checkForm));
            }
        },
        ready() {
            this.getSubcompany();
            this.getCity();
            this.getTime();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.query();
        },
        watch:{
            'checkForm.pageIndex+checkForm.pageSize'(){
                this.query();
            }
        }
    }
</script>