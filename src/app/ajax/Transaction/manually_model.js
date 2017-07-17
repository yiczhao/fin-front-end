/**
 * @description 手工结算接口
 * @author 赵俊涵
 * @date 2016.09.13
 */
function model(_this) {
    return {
        /**
         * @description 查询手工结算数据列表
         * @param data
         * @returns {*}
         */
        manually_list (data) {
            return _this.$http.get(_this.$API.manually_list + $.param(data))
        },
        /**
         * @description 获取交易合计
         * @param data
         * @returns {*}
         */
        manuallysum(data){
            return _this.$http.get(_this.$API.manuallysum+ $.param(data));
        },
        /**
         * @description 确认划付
         * @param data
         * @returns {*}
         */
        manuallypay(data){
            return _this.$http.post(_this.$API.manuallypay,data);
        },
        /**
         * @description 查询划付信息
         * @param data
         * @returns {*}
         */
        select_manuallypay(data){
            return _this.$http.get(_this.$API.select_manuallypay+ $.param(data));
        },
        /**
         * @description 查询划付信息
         * @param data
         * @returns {*}
         */
        manuallySettlement_list(data){
            return _this.$http.get(_this.$API.manuallySettlement_list+ $.param(data));
        },
    }
}
module.exports = model
