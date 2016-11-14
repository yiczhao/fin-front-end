/**
 * @description 入账明细接口
 * @author 赵俊涵
 * @date 2016.11.11
 */
function model(_this) {
    return {
        /**
         * @description 入账明细列表
         * @param data
         * @returns {*}
         */
        principleorderList (data) {
            return _this.$http.get(_this.$API.principleorderList+$.param(data))
        },
        /**
         * @description 入账明细合计
         * @param data
         * @returns {*}
         */
        principleorderTotal (data) {
            return _this.$http.get(_this.$API.principleorderTotal+$.param(data))
        },
        /**
         * @description 获取通道
         * @param data
         * @returns {*}
         */
        selectrunningList() {
            return _this.$http.get(_this.$API.selectrunningList)
        },
    }
}
module.exports = model
