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
        getpart1(_id){
            return _this.$http.get(_this.$API.getpart1+_id)
        },
        /**
         * @description 查询备付金详情数据
         * @param {id}
         * @returns {*}
         */
        getpart3(_id){
            return _this.$http.get(_this.$API.getpart3+_id)
        },
        /**
         * @description 查询备付金详情数据
         * @param {id}
         * @returns {*}
         */
        getpart4(_id){
            return _this.$http.get(_this.$API.getpart4+_id)
        },
        /**
         * @description 查询备付金详情数据
         * @param {id}
         * @returns {*}
         */
        getpart10(_id){
            return _this.$http.get(_this.$API.getpart10+_id)
        },
        /**
         * @description 查询z供应商划付详情数据
         * @param {id}
         * @returns {*}
         */
        getpart11(_id){
            return _this.$http.get(_this.$API.getpart11+_id)
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
        },
        /**
         * @description 跳转
         * @param {data}
         * @returns {*}
         */
        skipToSubsidyAccount(_id){
            return _this.$http.get(_this.$API.skipToSubsidyAccount+_id)
        },
        /**
         * @description 订单跳转到供应商划付
         * @param {data}
         * @returns {*}
         */
        skipToProviderPayDetail(_id){
            return _this.$http.get(_this.$API.skipToProviderPayDetail+_id)
        },
        reserveCashOrdertotal(data){
            return _this.$http.get(_this.$API.reserveCashOrdertotal+$.param(data))
        }
    }
}
module.exports = model
