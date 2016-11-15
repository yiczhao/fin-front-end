/**
 * @description 本金对账接口
 * @author 赵俊涵
 * @date 2016.11.14
 */
function model(_this) {
    return {
        /**
         * @description 查询本金明细列表
         * @param data
         * @returns {*}
         */
        principleCheckingdetailList (data) {
            return _this.$http.get(_this.$API.principleCheckingdetailList+$.param(data))
        },
        /**
         * @description 查询入账列表
         * @param id
         * @returns {*}
         */
        principleCheckingorderList(data) {
            return _this.$http.get(_this.$API.principleCheckingorderList+$.param(data))
        },
        /**
         * @description 本金对账
         * @param data
         * @returns {*}
         */
        principleCheckingordermanualCheck (data) {
            return _this.$http.post(_this.$API.principleCheckingordermanualCheck,data)
        },
        /**
         * @description 获取本金明细列表
         * @param id
         * @returns {*}
         */
        principleCashDetailinfo(a) {
            return _this.$http.get(_this.$API.principleCashDetailinfo+a)
        },
        /**
         * @description 查询简称和余额
         * @param data
         * @returns {*}
         */
        principleBalanceList (id) {
            return _this.$http.get(_this.$API.principleBalanceList+id)
        }
    }
}
module.exports = model
