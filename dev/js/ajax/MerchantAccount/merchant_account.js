/**
 * @description 商户账户 接口
 * @author 于凯乐
 * @date 2017年3月23日10:00:18
 */
function model(_this) {
	return {
		/**
		 * @description 查询商户账户列表
		 * @param data
		 * @returns {*}
		 */
		getMerchantAccountList (data) {
			return _this.$http.get(_this.$API.merchantAccountList + $.param(data))
		},

		merchantAccountDetail(_id){
			return _this.$http.get(_this.$API.merchantAccountDetail+_id);
		},

		merchantAccountConfirm(data){
			return _this.$http.get(_this.$API.merchantAccountConfirm + $.param(data))
		},

		merchantAccountConfigure(data){
			return _this.$http.get(_this.$API.merchantAccountConfigure + $.param(data))
		},

		merchantAccountConfigureConfirm(data){
			return _this.$http.get(_this.$API.merchantAccountConfigureConfirm + $.param(data))
		},

		merchantAccountExportToExcel(data){
			return _this.$http.get(_this.$API.merchantAccountExportToExcel + $.param(data))
		}

	}
}
module.exports = model;
