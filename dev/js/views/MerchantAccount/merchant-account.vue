<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'商户账户管理'"
           :ptitle="'商户账户'"
           :hname="'merchant-account'"
           :isshow="'isshow'">

        <div class="content" slot="content">
            <div class="panel panel-flat">
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

                            <select class="form-control" v-model="conditionData.merchantType">
                                <option value="">商户类型</option>
                                <option value="1">单店</option>
                                <option value="2">连锁总店</option>
                            </select>

                            <input type="number" class="form-control" v-model="" placeholder="门店号"
                                   v-limitnumber="conditionData.backendStoreCode">

                            <input type="text" class="form-control" v-model="conditionData.storeName"
                                   placeholder="门店简称">

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
                                <option value="1">D+1</option>
                                <option value="2">T+0</option>
                                <option value="3">T+1</option>
                                <option value="4">T+7</option>
                                <option value="5">T+30</option>
                                <option value="6">T+365</option>
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
                           data-ksa="third_party_account_manage.search"
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
                                <th>转账配置</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trList) in merchantAccountList">
                                <td>{{trList.operationID}}</td>
                                <td>{{trList.backendMerchantCode}}</td>
                                <td>{{trList.backendMerchantName}}</td>
                                <td>
                                    <template v-if="trList.merchantType ==1 ">单店</template>
                                    <template v-if="trList.merchantType ==2">连锁商户</template>
                                </td>
                                <td>{{trList.backendStoreCode}}</td>
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
                                <td>{{trList.subsidyRate}}</td>
                                <td>
                                    <a v-link="{name:'merchant-account-detail',params:{'merchantID':trList.id}}">明细</a>
                                    <!--data-ksa="third_party_account_manage.detail"-->
                                </td>
                                <td>
                                    <template v-if="trList.expired==1">已确认</template>
                                    <template v-if="trList.expired==2">未确认</template>
                                </td>
                                <td>
                                    <a v-if="trList.expired==2" @click="confirmAlert(trList.id)" data-toggle="modal"
                                       data-target="#modal_submit">确认</a>
                                </td>
                                <td>{{trList.createAt | datetime}}</td>
                                <!--确认按钮-->
                                <td>
                                    <a v-link="">配置</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">
                        <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" v-on:click="exportToExcel">Excel导出</a>
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
                            <button type="button" @click="confirm" class="btn btn-primary">确认</button>
                            <button type="button" class="btn btn-gray" @click="modal_confirm=false">取消</button>
                        </div>
                    </div>
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
					'merchantType': '',
					'backendStoreCode': '',
					'expired': '',
					'settlementCycle': '',
					'pageIndex': 1,
					'pageSize': 10
				}
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
							this.$set('pageAll', response.data.total)
						}

					});
			},
			getCompanyList(){
				// *** 请求公司数据
				let data = {
					'type': 'ImportUser'
				};
				this.$common_model.getcompany(data)
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
				if (!this.merchantList.length > 0)return;
//				this.checkForm.mid = JSON.parse(sessionStorage.getItem('userData')).authToken;
				window.open(window.origin + this.$API.merchantAccountExportToExcel + $.param(this.conditionData));
			},
			initList(){
				this.modal_confirm = false;
				$('.modal').modal('hide');

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
			}
		},
		ready() {
			const vm = this;
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
