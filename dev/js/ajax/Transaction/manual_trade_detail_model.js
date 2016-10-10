/**
 * @description 手工单管理接口
 * @author 洪钢
 * @date 2016.10.09
 */
function model(_this) {
    return {
        /**
         * @description 查询列表
         * @param data
         * @returns {*}
         */
        getManualTradeDetailList (data) {
            return _this.$http.get(_this.$API.getManualTradeDetailList+$.param(data))
        },
        /**
         * @description 添加手工单
         * @param data
         * @returns {*}
         */
        addtrade(data){
            return _this.$http.post(_this.$API.addtrade,data);
        },
    }
}
module.exports = model