/**
 * @description 退税管理管理接口
 * @author 赵俊涵
 * @date 2016.10.26
 */
function model(_this){
    return {
        /**
         * @description 查询商户补贴账户管理数据
         * @params {data}
         * @returns {*}
         * */
        subsidyManagement_list(data){
            return _this.$http.get(_this.$API.subsidyManagement_list+ $.param(data))
        },
        /**
         * @description 商户补贴账户管理合计
         * @params {data}
         * @returns {*}
         * */
        subsidyManagement_total(data){
            return _this.$http.get(_this.$API.subsidyManagement_total+ $.param(data))
        },
        /**
         * @description 商户补贴账户管理申请提现页面税金池和可提现金额
         * @params {data}
         * @returns {*}
         * */
        subsidyManagement_info(data){
            return _this.$http.get(_this.$API.subsidyManagement_info+ $.param(data))
        },
        /**
         * @description 商户补贴账户管理发票充值
         * @params {data}
         * @returns {*}
         * */
        subsidyManagement_recharge(data){
            return _this.$http.post(_this.$API.subsidyManagement_recharge,data)
        },
        /**
         * @description 商户补贴账户管理申请提现
         * @params {data}
         * @returns {*}
         * */
        subsidyManagement_applyPay(data){
            return _this.$http.post(_this.$API.subsidyManagement_applyPay,data)
        }
    }
}
module.exports=model;