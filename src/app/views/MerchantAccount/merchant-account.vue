<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'商户账户管理'"
           :ptitle="'商户管理'"
           :hname="'merchant-account'"
           :isshow="'isshow'">

        <div class="content merchant-account" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="merchant_account_manage" class="active"><a v-link="{name:'merchant-account'}">商户账户</a></li>
                    <li data-ksa="merchant_manage"><a v-link="{name:'business-lists'}">商户列表</a></li>
                    <li data-ksa="advance_payment_account_manage"><a v-link="{name:'prepayment-lists'}">预付款</a></li>
                </ul>
                <div class="heading">

                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <input type="number" class="form-control" v-model="conditionData.merchantOperationID"
                                   placeholder="商户ID"
                                   v-limitnumber="">
                            <input type="text" class="form-control" v-model="conditionData.backendMerchantCode"
                                   placeholder="商户号">

                            <input type="text" class="form-control" v-model="conditionData.backendMerchantName"
                                   placeholder="商户简称">

                            <input type="number" class="form-control" v-model="" placeholder="门店号"
                                   v-limitnumber="conditionData.backendStoreCode">

                            <input type="text" class="form-control" v-model="conditionData.storeName"
                                   placeholder="门店名称">

                            <select class="form-control" v-model="conditionData.subCompanyID"
                                    @change="getCityList(conditionData.subCompanyID)">
                                <option value="">全部分公司</option>
                                <option v-for="(index,n) in companyList" v-text="n.name"
                                        :value="n.subCompanyID"></option>
                            </select>

                            <select class="form-control" v-model="conditionData.cityID">
                                <option value="">全部城市</option>
                                <option v-for="(index,n) in cityList" v-text="n.name" :value="n.cityID"></option>
                            </select>

                            <select class="form-control" v-model="conditionData.settlementCycle">
                                <option value="">结算周期</option>
                                <option value="1">日结</option>
                                <option value="2">周结</option>
                                <option value="3">月结</option>
                                <option value="4">手工结算</option>
                            </select>

                            <select class="form-control" v-model="conditionData.expired">
                                <option value="">状态</option>
                                <option value="1">已确认</option>
                                <option value="2">待确认</option>
                            </select>
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="searchByCondition"
                           data-ksa="merchant_account_manage.search"
                           style="margin-left: -21px;">查询</a>
                    </div>
                </div>

                <div v-show="merchantAccountList.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>商户ID</th>
                                <th>商户号</th>
                                <th>商户简称</th>
                                <th>商户类型</th>
                                <th>门店号</th>
                                <th>门店名称</th>
                                <th>分公司</th>
                                <th>城市</th>
                                <th>账户名</th>
                                <th>账号</th>
                                <th>开户行</th>
                                <th>联行号</th>
                                <th>是否建行</th>
                                <th>结算周期</th>
                                <th>补贴税率</th>
                                <th>账号变更</th>
                                <th>状态</th>
                                <th>操作</th>
                                <th>最新更新时间</th>
                                <th>确认时间</th>
                                <th>转账配置</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trList) in merchantAccountList">
                                <td>{{trList.merchantOperationID}}</td>
                                <td>{{trList.backendMerchantCode}}</td>
                                <td>{{trList.backendMerchantName}}</td>
                                <td>
                                    <template v-if="trList.merchantType ==1 ">单店</template>
                                    <template v-if="trList.merchantType ==2">连锁商户</template>
                                </td>
                                <td>{{trList.backendStoreCode}}</td>
                                <td>{{trList.storeName}}</td>
                                <td>{{trList.subCompanyName}}</td>
                                <td>{{trList.cityName}}</td>
                                <td>{{trList.accountName}}</td>
                                <td>{{trList.accountNumber}}</td>
                                <td>{{trList.bankName}}</td>
                                <td>{{trList.bankNumber}}</td>
                                <td>
                                    <template v-if="trList.isCcb == 0 ">否</template>
                                    <template v-if="trList.isCcb == 1">是</template>
                                </td>
                                <td>
                                    <template v-if="trList.settlementCycle == 1">日结</template>
                                    <template v-if="trList.settlementCycle == 2">周结</template>
                                    <template v-if="trList.settlementCycle == 3">月结</template>
                                    <template v-if="trList.settlementCycle == 4">手工结算</template>
                                </td>
                                <!--补贴税率-->
                                <td>{{trList.subsidyRate}}
                                    <template v-if="!!trList.subsidyRate">%</template>
                                </td>
                                <td>
                                    <a v-link="{name:'merchant-account-detail',params:{'merchantID':trList.id}}" data-ksa="merchant_account_manage.search">明细</a>

                                </td>
                                <td>
                                    <template v-if="trList.expired==1">已确认</template>
                                    <template v-if="trList.expired==2">待确认</template>
                                </td>
                                <td>
                                    <a v-if="trList.expired==2" @click="confirmAlert(trList.id)" data-ksa="merchant_account_manage.update">确认</a>
                                    <a v-if="trList.existInBackend == 0"  @click="modal_update(trList.id)" href="javascript:void(0);" data-ksa="merchant_account_manage.update">更新</a>
                                </td>
                                <td>{{trList.updateAt | datetime}}</td>
                                <td>{{trList.confirmTime | datetime}}</td>
                                <!--确认按钮-->
                                <td>
                                    <a v-if="trList.expired!=2" v-link="{name:'merchant-account-transConf',params:{'transConfMerchantID':trList.id, 'transConfMerchantOperationID':trList.merchantOperationID}}" data-ksa="merchant_account_manage.update">配置</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">
                        <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" v-on:click="exportToExcel" data-ksa="merchant_account_manage.export">Excel导出</a>
                        </div>
                        <div class="right">
                            <page :all="pageAll"
                                  :cur.sync="conditionData.pageIndex"
                                  :page_size.sync="conditionData.pageSize">
                            </page>
                        </div>
                    </div>
                </div>

                <div class="no-list" v-else>
                    未找到数据
                </div>

                <!--确定-->
                <content-dialog
                        :show.sync="modal_confirm" :is-button="false" :type.sync="'infos'"
                        :title.sync="'确认账号'" @kok="confirm"
                >
                    <div class="modal-body">
                        <div class="form-group tc">
                            <button type="button" @click="confirm" class="btn btn-primary" data-ksa="merchant_account_manage.confirm">确认</button>
                            <button type="button" class="btn btn-gray" @click="modal_confirm=false">取消</button>
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
                                    <label class="w28" ><i>*</i>建行否：</label>
                                    <input type="radio" id="one" value="1" v-model="updateList.isCcb" v-validate:isCcb="['required']">
                                    <label class="w28" for="one">是</label>
                                    <input type="radio" id="two" value="0" v-model="updateList.isCcb" v-validate:isCcb="['required']">
                                    <label class="w28" for="two">否</label>
                                </div>
                                <div class="form-group" v-if="updateList.isCcb!=1">
                                    <label class="w28" ><i>*</i>提入行号：</label>
                                    <input v-validate:bankNumber="['required']" v-limitnumber="updateList.bankNumber" v-model="updateList.bankNumber" class="form-control" type="text" placeholder="提入行号">
                                    <a href="https://www.hebbank.com/corporbank/otherBankQueryWeb.do" target="_blank">查询行号</a>
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
                                    <button type="button" @click="updateTrue(updateList)" class="btn btn-primary" data-ksa="merchant_account_manage.update">保存</button>
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
	import model from '../../ajax/MerchantAccount/merchant_account'
	export default{
		data(){
			this.model = model(this);
			return {
				pageAll: 1,
				modal_confirm: false,
                modal_updatas: false,
				cityList: [],
				merchantAccountList: [],
				companyList: [],
				conditionData: {
					'id': '',
					'merchantOperationID': '',
					'subCompanyID': '',
					'cityID': '',
					'backendMerchantCode': '',
					'storeName': '',
					'backendMerchantName': '',
					'backendStoreCode': '',
					'expired': '',
					'settlementCycle': '',
					'pageIndex': 1,
					'pageSize': 10
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
                        isCcb:0,
                        accountType:'',
                        settlementCycle:0,
                        subsidyRate:'',
                        merchantID:'',
                        specialRemarks:''
                    },
                updataerror:false,
                uploadText:'',
                errortext:''
			}
		},
		methods: {
			// *** 请求账户列表数据
			getMerchantAccountList(data){
				if (sessionStorage.getItem('isHttpin') == 1)return;
				this.model.getMerchantAccountList(data)
					.then((response) => {
						// *** 判断请求是否成功如若成功则填充数据到模型
						if (response.data.code == 0) {
							this.$set('merchantAccountList', response.data.data);
							this.$set('pageAll', response.data.total);
						}
					});
			},
			getCompanyList(){
				this.$common_model.getcompany()
					.then((response) => {
						// *** 判断请求是否成功如若成功则填充数据到模型
						(response.data.code == 0) ? this.$set('companyList', response.data.data) : null;
					});
			},
			//获取城市数据
			getCityList(_id){
				this.conditionData.cityID = '';
				let data = {
					'subCompanyID': _id
				};
				this.$common_model.getcity(data)
					.then((response) => {
						// *** 判断请求是否成功如若成功则填充数据到模型
						if (response.data.code == 0) {
							this.$set('cityList', response.data.data)
						}
					});
			},
        /*查询*/
			searchByCondition(){
				this.conditionData.pageIndex = 1;
				this.initList();
			},
        /*导出Excel*/
			exportToExcel(){
				if (!this.merchantAccountList.length > 0)return;
				this.conditionData.mid = JSON.parse(sessionStorage.getItem('userData')).authToken;
				window.open(window.origin + this.$API.merchantAccountExportToExcel + $.param(this.conditionData));
			},
			initList(){
				this.modal_confirm = false;
                this.modal_updatas = false;
				back_json.saveArray(this.$route.path, this.conditionData);
				this.getMerchantAccountList(this.conditionData);
			},
			confirmAlert(_id){
				this.modal_confirm = true;
				this.conditionData.id = _id;
			},
			confirm(){
				if (sessionStorage.getItem('isHttpin') == 1)return;
				let data = {
					merchantID: this.conditionData.id,
				};
				this.model.merchantAccountConfirm(data)
					.then((res) => {
						if (res.data.code == 0) {
							this.initList();
							dialogs('success', '确认成功！')
						}
					})
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
            /*商户账户更新弹出框*/
            modal_update(_id){
                this.errortext='';
                if (sessionStorage.getItem('isHttpin') == 1)return;
                this.model.merchantAccountInfo(_id).then((res) => {
                    if (res.data.code == 0) {
                        this.updateBtn(res.data.data,_id);
                        this.modal_updatas = true;
                    }
                })
            },
            updateBtn(_list,_id){
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
                        merchantID:_id
                    }
                }else{
                    $.extend(true, this.updateList, a);
                    this.updateList.id = a.id;
                    this.updateList.merchantID = a.merchantId;
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
            }
		},
		ready() {
			const vm = this;
            (back_json.isback && back_json.fetchArray(vm.$route.path) != '') ? vm.conditionData = back_json.fetchArray(vm.$route.path) : null;
			vm.getCompanyList();
			vm.getCityList();
			vm.initList();
		},
		watch: {
			'conditionData.pageSize+conditionData.pageIndex'(){
				this.initList();
			}
		}
	}
</script>
