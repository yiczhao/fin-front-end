/**
 * @description 备付金明细接口
 * @author 赵俊涵
 * @date 2016.05.31
 */
function model(_this) {
    return {
        /**
         * @description 查询备付金数据列表
         * @param data
         * @returns {*}
         */
        detail (data) {
            return _this.$http.get(_this.$API.detail+$.param(data))
        },
        /**
         * @description 查询对账数据列表
         * @param _id
         * @returns {*}
         */
        selectReserveCashOrderListByID (_id) {
            return _this.$http.get(_this.$API.selectReserveCashOrderListByID+_id)
        },
        /**
         * @description 自动对账
         * @param id
         * @returns {*}
         */
        associateCheck (a) {
            return _this.$http.post(_this.$API.associateCheck, a)
        },
        /**
         * @description 人工对账
         * @param id
         * @returns {*}
         */
        manualCheck (a) {
            return _this.$http.post(_this.$API.manualCheck, a)
        },
        /**
         * @description 总收入支出
         * @param data
         * @returns {*}
         */
        incomeAndPayoutAmount (data) {
            return _this.$http.get(_this.$API.incomeAndPayoutAmount+$.param(data))
        },
        /**
         * @description 查询简称和余额
         * @param data
         * @returns {*}
         */
        getBalance (id) {
            return _this.$http.get(_this.$API.getBalance+id)
        }
    }
}
module.exports = model
