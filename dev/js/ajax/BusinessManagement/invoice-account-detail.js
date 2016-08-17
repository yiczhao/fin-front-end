/**
 * @description 商户发票账户明细明细接口
 * @author 赵俊涵
 * @date 2016.08.17
 */
function model(_this){
    return {
        /**
         * @description 查询商户发票账户明细明细数据
         * @params {data}
         * @returns {*}
         * */
        invoiceAccountDetail_list(data){
            return _this.$http.get(_this.$API.invoiceAccountDetail_list+ $.param(data))
        },
        /**
         * @description 商户发票账户明细明细合计
         * @params {data}
         * @returns {*}
         * */
        invoiceAccountDetail_total(data){
            return _this.$http.get(_this.$API.invoiceAccountDetail_total+ $.param(data))
        },
        /**
         * @description 商户发票账户明细明细发票充值
         * @params {data}
         * @returns {*}
         * */
        subsidyAccount_recharge(data){
            return _this.$http.post(_this.$API.subsidyAccount_recharge,data)
        }
    }
}
module.exports=model;