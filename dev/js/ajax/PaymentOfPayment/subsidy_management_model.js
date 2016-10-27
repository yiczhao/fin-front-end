/**
 * @description 退税管理接口
 * @author 赵俊涵
 * @date 2016.10.26
 */
function model(_this){
    return {
        /**
         * @description 查询退税管理数据
         * @params {data}
         * @returns {*}
         * */
        subsidyManagement_list(data){
            return _this.$http.get(_this.$API.subsidyManagement_list+ $.param(data))
        },
        /**
         * @description 退税管理合计
         * @params {data}
         * @returns {*}
         * */
        subsidyManagement_total(data){
            return _this.$http.get(_this.$API.subsidyManagement_total+ $.param(data))
        },
        /**
         * @description 退税管理申请提现页面税金池和可提现金额
         * @params {data}
         * @returns {*}
         * */
        subsidyManagement_info(data){
            return _this.$http.get(_this.$API.subsidyManagement_info+ $.param(data))
        },
        /**
         * @description 退税管理发票充值
         * @params {data}
         * @returns {*}
         * */
        subsidyManagement_recharge(data){
            return _this.$http.post(_this.$API.subsidyManagement_recharge,data)
        },
        /**
         * @description 退税管理申请提现
         * @params {data}
         * @returns {*}
         * */
        subsidyManagement_applyPay(data){
            return _this.$http.post(_this.$API.subsidyManagement_applyPay,data)
        },
        /**
         * @description 退税管理申请提现页面税金池和可提现金额
         * @params {data}
         * @returns {*}
         * */
        subsidyManagement_batch(data){
            return _this.$http.get(_this.$API.subsidyManagement_batch+ $.param(data))
        },
        /**
         * @description 退税管理批量提现
         * @params {data}
         * @returns {*}
         * */
        subsidyManagement_batchs(data){
            return _this.$http.post(_this.$API.subsidyManagement_batchs,data)
        },
        /**
         * @description 退税管理每商户发票充值
         * @params {data}
         * @returns {*}
         * */
        rechargeByMerchantAndActivity(data){
            return _this.$http.post(_this.$API.rechargeByMerchantAndActivity,data)
        }
    }
}
module.exports=model;