/**
 * @description 备付金支出供应商划付接口
 * @author 赵俊涵
 * @date 2016.11.28
 */
function model(_this) {
    return {
        /**
         * @description 查询供应商划付数据
         * @param {data}
         * @returns {*}
         */
        providerPay_list (data) {
            return _this.$http.get(_this.$API.providerPay_list+$.param(data))
        },
        /**
         * @description 新增供应商划付
         * @param {data}
         * @returns {*}
         */
        providerPay_add (data) {
            return _this.$http.post(_this.$API.providerPay_add,data)
        },
        /**
         * @description 供应商划付退回
         * @param {data}
         * @returns {*}
         */
        providerPay_back (data) {
            return _this.$http.post(_this.$API.providerPay_back,data)
        },
        /**
         * @description 供应商划付删除
         * @param {data}
         * @returns {*}
         */
        providerPay_delete (id) {
            return _this.$http.delete(_this.$API.providerPay_delete+id)
        },
        /**
         * @description 供应商划付编辑
         * @param {data}
         * @returns {*}
         */
        providerPay_edit(data) {
            return _this.$http.post(_this.$API.providerPay_edit,data)
        },
        /**
         * @description 供应商划付通过
         * @param {data}
         * @returns {*}
         */
        providerPay_pass(id) {
            return _this.$http.post(_this.$API.providerPay_pass+id)
        },
        /**
         * @description 供应商划付提交
         * @param {data}
         * @returns {*}
         */
        providerPay_submit(id) {
            return _this.$http.post(_this.$API.providerPay_submit+id)
        },
        /**
         * @description 供应商划付合计
         * @param {data}
         * @returns {*}
         */
        providerPay_sum(data) {
            return _this.$http.get(_this.$API.providerPay_sum+$.param(data))
        }
    }
}
module.exports = model
