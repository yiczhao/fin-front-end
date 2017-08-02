/**
 * @description 商户暂扣税金账户明细接口
 * @author 赵俊涵
 * @date 2016.08.17
 */
function model(_this){
    return {
        /**
         * @description 查询商户暂扣税金账户明细数据
         * @params {data}
         * @returns {*}
         * */
        suspensionTaxAccountDetail_list(data){
            return _this.$http.get(_this.$API.suspensionTaxAccountDetail_list+ $.param(data))
        },
        /**
         * @description 商户暂扣税金账户明细合计
         * @params {data}
         * @returns {*}
         * */
        suspensionTaxAccountDetail_total(data){
            return _this.$http.get(_this.$API.suspensionTaxAccountDetail_total+ $.param(data))
        },
        /**
         * @description 商户补贴账户管理申请提现页面税金池和可提现金额
         * @params {data}
         * @returns {*}
         * */
        subsidyAccount_info(data){
            return _this.$http.get(_this.$API.subsidyAccount_info+ $.param(data))
        },
        /**
         * @description 商户暂扣税金账户明细申请提现
         * @params {data}
         * @returns {*}
         * */
        subsidyAccount_applyPay(data){
            return _this.$http.post(_this.$API.subsidyAccount_applyPay,data)
        }
    }
}
module.exports=model;