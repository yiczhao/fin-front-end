/**
 * @description 备付金支出预付款划付接口
 * @author 赵俊涵
 * @date 2016.06.02
 */
function model(_this){
    return {
        /**
         * @description 查询预付款划付数据
         * @params {data}
         * @returns {*}
         * */
        advance_list(data){
            return _this.$http.get(_this.$API.advance_list+ $.param(data))
        },
        /**
         * @description 新增预付款划付划付
         * @param {data}
         * @returns {*}
         */
        advance_add (data) {
            return _this.$http.post(_this.$API.advance_add,data)
        },
        /**
         * @description 预付款划付划付退回
         * @param {data}
         * @returns {*}
         */
        advance_back (data) {
            return _this.$http.post(_this.$API.advance_back,data)
        },
        /**
         * @description 预付款划付划付删除
         * @param {data}
         * @returns {*}
         */
        advance_delete (id) {
            return _this.$http.delete(_this.$API.advance_delete+id)
        },
        /**
         * @description 预付款划付划付编辑
         * @param {data}
         * @returns {*}
         */
        advance_edit(data) {
            return _this.$http.post(_this.$API.advance_edit,data)
        },
        /**
         * @description 预付款划付划付通过
         * @param {data}
         * @returns {*}
         */
        advance_pass(id) {
            return _this.$http.post(_this.$API.advance_pass+id)
        },
        /**
         * @description 预付款划付划付提交
         * @param {data}
         * @returns {*}
         */
        advance_submit(id) {
            return _this.$http.post(_this.$API.advance_submit+id)
        },
        /**
         * @description 预付款划付划付提交
         * @param {data}
         * @returns {*}
         */
        queryAdvancePaymentMerchantList(id) {
            return _this.$http.get(_this.$API.queryAdvancePaymentMerchantList+ id)
        },/**
         * @description 预付款划付划付提交
         * @param {data}
         * @returns {*}
         */
        advancePaymentMerchant(id) {
            return _this.$http.get(_this.$API.advancePaymentMerchant+ id)
        },
        changeBankInfo(id) {
            return _this.$http.get(_this.$API.changeBankInfo+ id)
        },
        advancePaymentEdit(data) {
            return _this.$http.get(_this.$API.advancePaymentEdit+ $.param(data))
        },
        advance_save (data) {
            return _this.$http.post(_this.$API.advance_save,data)
        },
    }
}
module.exports=model;