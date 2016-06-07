/**
 * @description 公用数据接口
 * @author 赵俊涵
 * @date 2016.05.31
 */
function conmon_model(_this) {
    return {
        /**
         * @description 查询分公司数据
         * @param {}
         * @returns {*}
         */
        getcompany () {
            return _this.$http.get(_this.$API.subcompany)
        },
        /**
         * @description 查询城市列表数据
         * @param {data}
         * @returns {*}
         */
        getcity (data) {
            return _this.$http.get(_this.$API.city+ decodeURIComponent($.param(data)))
        },
        /**
         * @description 上传数据
         * @param {data}
         * @returns {*}
         */
        upload (data) {
            return _this.$http.post(_this.$API.upload, data)
        },
        /**
         * @description 查看当前订单号及付款方式
         * @param {data}
         * @returns {*}
         */
        skipToOrder(data){
            return _this.$http.get(_this.$API.skipToOrder+ decodeURIComponent($.param(data)))
        },
        /**
         * @description 获取商户数据
         * @param {data}
         * @returns {*}
         */
        getmerchant_list(data){
            return _this.$http.get(_this.$API.getmerchant_list + decodeURIComponent($.param(data)))
        },

    }
}
module.exports = conmon_model
