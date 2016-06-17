function model(_this) {
    return {
        // 额度采购账户明细
        limitPurchaseAccount_detail (data) {
            return _this.$http.get(_this.$API.limitPurchaseAccount_detail+ decodeURIComponent($.param(data)))
        },
        limitPurchaseAccount_getsumBalance(data) {
            return _this.$http.get(_this.$API.limitPurchaseAccount_getsumBalance+ decodeURIComponent($.param(data)))
        }
    }
}
module.exports = model