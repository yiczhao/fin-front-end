/**
 * @description 交易白名单接口
 * @author 赵俊涵
 * @date 2016.07.13
 */
function model(_this) {
    return {
        /**
         * @description 查询白名单数据列表
         * @param data
         * @returns {*}
         */
        abnormaldetail (data) {
            return _this.$http.get(_this.$API.abnormaldetail + decodeURIComponent($.param(data)))
        },
        /**
         * @description 保存白名单
         * @param data
         * @returns {*}
         */
        abnormaltotal(data){
            return _this.$http.get(_this.$API.abnormaltotal+ decodeURIComponent($.param(data)));
        },
        /**
         * @description 失效白名单
         * @param data
         * @returns {*}
         */
        abnormalhandle(data){
            return _this.$http.post(_this.$API.abnormalhandle,data);
        },
    }
}
module.exports = model
