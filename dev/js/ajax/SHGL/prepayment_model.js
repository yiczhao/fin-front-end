/**
 * @description 预付款接口
 * @author 赵俊涵
 * @date 2016.06.02
 */
function model(_this){
    return {
        /**
         * @description 查询预付款数据
         * @params {data}
         * @returns {*}
         * */
        prepayment_lists(data){
            return _this.$http.post(_this.$API.prepayment_lists,data)
        },
        /**
         * @description 获取预付充值数据
         * @params {data}
         * @returns {*}
         * */
        advancePaymentMerchant(data){
            return _this.$http.post(_this.$API.advancePaymentMerchant,data)
        },
        /**
         * @description 预付申请付款
         * @params {data}
         * @returns {*}
         * */
        applyAdvancePay(data){
            return _this.$http.post(_this.$API.applyAdvancePay,data)
        },
        /**
         * @description 预付添加商户
         * @params {data}
         * @returns {*}
         * */
        insertBatch(data){
            return _this.$http.post(_this.$API.insertBatch,data)
        },

    }
}
module.exports=model;