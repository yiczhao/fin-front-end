/**
 * @description 预付款账户明细接口
 * @author 赵俊涵
 * @date 2016.06.06
 */
function model(_this){
    return {
        /**
         * @description 查询明细数据
         * @params {data}
         * @returns {*}
         * */
        advancePaymentAccount_list(data){
            return _this.$http.get(_this.$API.advancePaymentAccount_list+ decodeURIComponent($.param(data)))
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
         * @description 预付合计
         * @params {data}
         * @returns {*}
         * */
        total(data){
            return _this.$http.get(_this.$API.advancePaymentAccount_total+ decodeURIComponent($.param(data)))
        },
        /**
         * @description 预付商户名余额
         * @params {data}
         * @returns {*}
         * */
        getBlance(_id){
            return _this.$http.get(_this.$API.getBlance+_id)
        },
    }
}
module.exports=model;