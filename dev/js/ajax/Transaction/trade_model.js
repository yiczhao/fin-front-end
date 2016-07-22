/**
 * @description 交易明细接口
 * @author 赵俊涵
 * @date 2016.06.01
 */
function model(_this) {
    return {
        /**
         * @description 查询交易明细数据列表
         * @param data
         * @returns {*}
         */
        tradedetail (data) {
            return _this.$http.get(_this.$API.tradedetail + decodeURIComponent($.param(data)))
        },
        /**
         * @description 添加交易
         * @param data
         * @returns {*}
         */
        addtrade(data){
            return _this.$http.post(_this.$API.addtrade,data);
        },
        /**
         * @description 获取交易合计
         * @param data
         * @returns {*}
         */
        tradedetailsum(data){
            return _this.$http.get(_this.$API.tradedetailsum+ decodeURIComponent($.param(data)));
        },
        /**
         * @description 跳转至三方
         * @param data
         * @returns {*}
         */
        skipToThird(_id){
            return _this.$http.get(_this.$API.skipToThird+ _id);
        },
        /**
         * @description 导出
         * @param data
         * @returns {*}
         */
        tradeDetailexcel(data){
            return _this.$http.get(_this.$API.tradeDetailexcel+ decodeURIComponent($.param(data)));
        }
    }
}
module.exports = model
