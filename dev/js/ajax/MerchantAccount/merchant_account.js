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

		/**
		 * @description 查询商户账户列表 明细
		 * @param _id
		 * @returns {*}
		 */
		merchantAccountDetail(_id){
			return _this.$http.get(_this.$API.merchantAccountDetail+_id);
		},

		/**
		 * @description 确认账户信息
		 * @param data
		 * @returns {*}
		 */
		merchantAccountConfirm(data){
			return _this.$http.post(_this.$API.merchantAccountConfirm, data)
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
