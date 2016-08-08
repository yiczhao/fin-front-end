/**
 * @description 备付金支出付款明细接口
 * @author 赵俊涵
 * @date 2016.06.02
 */
function model(_this) {
    return {
        /**
         * @description 查询备付金明细数据
         * @param {data}
         * @returns {*}
         */
        getlist (data) {
            return _this.$http.get(_this.$API.reservecash_list+$.param(data))
        },
        /**
         * @description 查询备付金详情数据
         * @param {id}
         * @returns {*}
         */
        getpart(_id){
            return _this.$http.get(_this.$API.getpart+_id)
        },
        /**
         * @description 查询对账数据
         * @param {id}
         * @returns {*}
         */
        checklist(_id){
            return _this.$http.get(_this.$API.checklist+_id)
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
         * @description 确认划付
         * @param {id}
         * @returns {*}
         */
        reservecash_allow(_id){
            return _this.$http.post(_this.$API.reservecash_allow+_id)
        },
        /**
         * @description 备付金账单详情删除
         * @param {data}
         * @returns {*}
         */
        reservecash_delete(data){
            return _this.$http.delete(_this.$API.reservecash_delete,data)
        },
        /**
         * @description 备付金账单关闭
         * @param {_id}
         * @returns {*}
         */
        reservecash_close(_id){
            return _this.$http.post(_this.$API.reservecash_close+_id)
        },
        /**
         * @description 备付金账单关闭
         * @param {data}
         * @returns {*}
         */
        reservecash_retrial(data){
            return _this.$http.post(_this.$API.reservecash_retrial,data)
        },
        /**
         * @description 申请划付
         * @param {data}
         * @returns {*}
         */
        reservecash_applypay(data){
            return _this.$http.post(_this.$API.reservecash_applypay,data)
        },
        /**
         * @description 一键划付
         * @param {data}
         * @returns {*}
         */
        reservecash_batchPay(data){
            return _this.$http.post(_this.$API.reservecash_batchPay,data)
        },
        /**
         * @description 导出
         * @param {data}
         * @returns {*}
         */
        payDetailexcel(data) {
            return _this.$http.get(_this.$API.payDetailexcel+$.param(data))
        }
    }
}
module.exports = model
