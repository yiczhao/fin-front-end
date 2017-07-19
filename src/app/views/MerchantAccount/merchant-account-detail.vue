<template>
    <index :title="'明细'"
           :ptitle="'商户账户管理'"
           :hname="'merchant-account-detail'"
           :isshow="'isshow'">

        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div v-show="merchantAccountDetailList.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>ID</th>
                                <th>账户名</th>
                                <th>账号</th>
                                <th>开户行</th>
                                <th>联行号</th>
                                <th>是否建行</th>
                                <th>结算周期</th>
                                <th>补贴税率</th>
                                <th>转账备注</th>
                                <th>状态</th>
                                <th>账号更新时间</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trList) in merchantAccountDetailList">
                                <td>{{trList.id}}</td>
                                <td>{{trList.accountName}}</td>
                                <td>{{trList.accountNumber}}</td>
                                <td>{{trList.bankName}}</td>
                                <td>{{trList.bankNumber}}</td>
                                <td>
                                    <template v-if="trList.isCcb == 1">是</template>
                                    <template v-else>否</template>
                                </td>
                                <td>
                                    <template v-if="trList.settlementCycle == 1">日结</template>
                                    <template v-if="trList.settlementCycle == 2">周结</template>
                                    <template v-if="trList.settlementCycle == 3">月结</template>
                                    <template v-if="trList.settlementCycle == 4">手工结算</template>
                                </td>
                                <td>{{trList.subsidyRate}}
                                    <template v-if="!!trList.subsidyRate">%</template>
                                </td>
                                <td>{{trList.specialRemarks}}</td>
                                <td>
                                    <template v-if="trList.expired == 0">历史账号</template>
                                    <template v-if="trList.expired == 1">正在使用</template>
                                    <template v-if="trList.expired == 2">待确认</template>
                                </td>
                                <td>{{trList.updatedAt | datetime}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="no-list" v-else>
                    未找到数据
                </div>
                <div class="datatable-bottom">
                    <span class="btn btn-add add-top" v-link="{name:'merchant-account'}" style="margin-left:20px;">返回上一步</span>
                </div>
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
				id: '',
				merchantAccountDetailList: [],
			}
		},
		methods: {
			// *** 请求账户列表数据
			getMerchantAccountDetail(id){
				if (sessionStorage.getItem('isHttpin') == 1)return;
				this.model.merchantAccountDetail(id)
					.then((response) => {
						// *** 判断请求是否成功如若成功则填充数据到模型
						if (response.data.code == 0) {
							this.$set('merchantAccountDetailList', response.data.data);
						}
					});
			}
		},
		ready() {
			this.$route.params.merchantID != ':merchantID' ? this.id = this.$route.params.merchantID : null;
			this.getMerchantAccountDetail(this.id);
		}
	}
</script>
