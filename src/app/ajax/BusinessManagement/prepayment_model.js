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
            return _this.$http.get(_this.$API.prepayment_lists+ $.param(data))
        },
        /**
         * @description 获取预付充值数据
         * @params {data}
         * @returns {*}
         * */
        advancePaymentMerchant(_id){
            return _this.$http.get(_this.$API.advancePaymentMerchant+_id)
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
        /**
         * @description 预付停用启用
         * @params {data}
         * @returns {*}
         * */
        status(data){
            return _this.$http.post(_this.$API.advancePaymentMerchant_status,data)
        },
        /**
         * @description 预付合计
         * @params {data}
         * @returns {*}
         * */
        total(data){
            return _this.$http.get(_this.$API.advancePaymentMerchant_total+ $.param(data))
        },
        /**
         * @description 获取预付充值数据
         * @params {data}
         * @returns {*}
         * */
        changeBnakInfo(_id){
            return _this.$http.get(_this.$API.changeBankInfo+_id)
        }
    }
}
module.exports=model;