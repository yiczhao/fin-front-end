<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'转账配置'"
           :ptitle="'商户账户'"
           :hname="'merchant-account-transConf'"
           :isshow="'isshow'">
        <div slot="content" class="content">
            <span class="flex">
            <div class="dialog-row">
                <label class="control-label">商户ID：</label>
                <label>{{merchantOperationID}}</label>
            </div>
            <div class="dialog-row">
                <label class="control-label">商户号：</label>
                <label>{{transConfModel.backendMerchantCode}}</label>
            </div>
            <div class="dialog-row">
                <label class="control-label">商户简称：</label>
                <label>{{transConfModel.backendMerchantName}}</label>
            </div>
            </span>
            <span class="flex">
            <div class="dialog-row">
                <label class="control-label">门店号：</label>
                <label>{{transConfModel.backendStoreCode}}</label>
            </div>

            <div class="dialog-row">
                <label class="control-label">门店名称：</label>
                <label>{{transConfModel.storeName}}</label>
            </div>
            <div class="dialog-row"></div>
            </span>
            <span class="flex">
            <div class="dialog-row">
                <label class="control-label">开户行：</label>
                <label>{{transConfModel.bankName}}</label>
            </div>

            <div class="dialog-row">
                <label class="control-label">是否建行：</label>
                <input type="radio" id="normalTaxPayer" value="1" v-model="transConfModel.isCcb">
                <label for="normalTaxPayer">是</label>
                <input type="radio" id="tinyTaxPayer" value="0" v-model="transConfModel.isCcb">
                <label for="tinyTaxPayer">否</label>
            </div>
            <div class="dialog-row"></div>
            </span>

            <div class="dialog-row float">
                <label>转账特殊备注：</label>
                <input type="text" class="form-control w350" v-model="transConfModel.specialRemarks"
                       placeholder="目前只有中石化商户需要在此填写商户编号">
            </div>

            <div class="dialog-row input-dialog">
                <button type="button" @click="confirm" class="btn btn-primary">确认</button>
                <button type="button" class="btn btn-gray" v-link="{name:'merchant-account'}">取消
                </button>
            </div>
        </div>
    </index>
</template>
<style scoped>
    .content .dialog-row{
        padding-bottom: 5px !important;
    }
</style>
<script>
	import model from '../../ajax/MerchantAccount/merchant_account'
	export default{
		data(){
			this.model = model(this);
			return {
				'merchantID': '',
				'merchantOperationID': '',
				'transConfModel': [],
				'saveModel': {
					'id': '',
					'isCcb': '',
					'specialRemarks': ''
				}
			}
		},
		methods: {
			getTransConfModel(_id){
				if (sessionStorage.getItem('isHttpin') == 1)return;
				this.model.merchantAccountConfigureInfo(_id)
					.then((response) => {
						// *** 判断请求是否成功如若成功则填充数据到模型
						if (response.data.code == 0) {
							this.$set('transConfModel', response.data.data);
							this.$set('saveModel.id', response.data.data.merchantAccountID);
						}
					});
			},
			confirm(){
				let data = {
					'id': this.transConfModel.merchantAccountID,
					'isCcb': this.transConfModel.isCcb,
					'specialRemarks': this.transConfModel.specialRemarks
				};
				this.model.merchantAccountConfigure(data)
					.then((res) => {
						if (res.data.code == 0) {
							this.getTransConfModel(this.merchantID);
							dialogs('success', '保存成功！');
							this.$router.go({ name: 'merchant-account'});
						}
					})
			}

		},
		ready() {
			this.$route.params.transConfMerchantID != ':transConfMerchantID' ? this.merchantID = this.$route.params.transConfMerchantID : null;
			this.$route.params.transConfMerchantOperationID != ':transConfMerchantOperationID' ? this.merchantOperationID = this.$route.params.transConfMerchantOperationID : null;
			this.getTransConfModel(this.merchantID);
		}
	}
</script>
