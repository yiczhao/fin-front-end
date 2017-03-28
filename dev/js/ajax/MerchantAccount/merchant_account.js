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
			return _this.$http.get(_this.$API.merchantAccountDetail + _id);
		},

		/**
		 * @description 确认账户信息
		 * @param data
		 * @returns {*}
		 */
		merchantAccountConfirm(data){
			return _this.$http.post(_this.$API.merchantAccountConfirm, data)
		},

		/**
		 * @description 转账配置 信息
		 * @param data
		 * @returns {*}
		 */
		merchantAccountConfigureInfo(_id){
			return _this.$http.get(_this.$API.merchantAccountConfigureInfo + _id)
		},

		/**
		 * @description 转账配置 保存
		 * @param data
		 * @returns {*}
		 */
		merchantAccountConfigure(data){
			return _this.$http.post(_this.$API.merchantAccountConfigure, data)
		},

		/**
		 * @description 导出excel
		 * @param data
		 * @returns {*}
		 */
		merchantAccountExportToExcel(data){
			return _this.$http.get(_this.$API.merchantAccountExportToExcel + $.param(data))
		}

	}
}
module.exports = model;
