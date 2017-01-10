/**
 * @description 本金明细接口
 * @author 赵俊涵
 * @date 2016.11.11
 */
function model(_this) {
    return {
        /**
         * @description 查询本金数据列表
         * @param data
         * @returns {*}
         */
        principleList (data) {
            return _this.$http.get(_this.$API.principleList+$.param(data))
        },
        /**
         * @description 总收入支出
         * @param data
         * @returns {*}
         */
        principleCashDetailModel (data) {
            return _this.$http.get(_this.$API.principleCashDetailModel+$.param(data))
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
