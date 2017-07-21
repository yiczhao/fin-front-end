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
            return _this.$http.get(_this.$API.tradedetail + $.param(data))
        },
        /**
         * @description 获取交易合计
         * @param data
         * @returns {*}
         */
        tradedetailsum(data){
            return _this.$http.get(_this.$API.tradedetailsum+ $.param(data));
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
         * @description 快速对账
         * @param data
         * @returns {*}
         */
        quickCheck(data){
            return _this.$http.get(_this.$API.quickCheck+ $.param(data));
        }
    }
}
module.exports = model
