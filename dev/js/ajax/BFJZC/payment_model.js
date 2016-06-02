/**
 * @description 备付金支出付款明细接口
 * @author 赵俊涵
 * @date 2016.05.31
 */
function model(_this) {
    return {
        /**
         * @description 查询备付金明细数据
         * @param {data}
         * @returns {*}
         */
        getlist (data) {
            return _this.$http.post(_this.$API.reservecash_list,data)
        },
        /**
         * @description 查询备付金详情数据
         * @param {id}
         * @returns {*}
         */
        getpart(_id){
            return _this.$http.post(_this.$API.reservecashlist+_id)
        },
        /**
         * @description 查询对账数据
         * @param {id}
         * @returns {*}
         */
        checklist(_id){
            return _this.$http.post(_this.$API.checklist+_id)
        },
        /**
         * @description 确认对账
         * @param {data
         * @returns {*}
         */
        checking(data){
            return _this.$http.post(_this.$API.checking,data)
        },
        /**
         * @description 更新备付金账单数据
         * @param {id}
         * @returns {*}
         */
        reservecash_update(_id){
            return _this.$http.post(_this.$API.reservecash_update+_id)
        },
        /**
         * @description 划付备付金账单数据
         * @param {id}
         * @returns {*}
         */
        reservecash_allow(_id){
            return _this.$http.post(_this.$API.reservecash_allow+_id)
        },


    }
}
module.exports = model
