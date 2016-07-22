/**
 * @description 交易白名单接口
 * @author 赵俊涵
 * @date 2016.07.13
 */
function model(_this) {
    return {
        /**
         * @description 查询异常交易数据列表
         * @param data
         * @returns {*}
         */
        abnormaldetail (data) {
            return _this.$http.get(_this.$API.abnormaldetail + decodeURIComponent($.param(data)))
        },
        /**
         * @description 异常交易合计
         * @param data
         * @returns {*}
         */
        abnormaltotal(data){
            return _this.$http.get(_this.$API.abnormaltotal+ decodeURIComponent($.param(data)));
        },
        /**
         * @description 异常交易处理异常
         * @param data
         * @returns {*}
         */
        abnormalhandle(data){
            return _this.$http.post(_this.$API.abnormalhandle,data);
        },
        /**
         * @description 异常交易导出
         * @param data
         * @returns {*}
         */
        abnormalexcel(data){
            return _this.$http.get(_this.$API.abnormalexcel+ decodeURIComponent($.param(data)));
        }
    }
}
module.exports = model
