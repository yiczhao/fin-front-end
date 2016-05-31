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
        getcompany (data) {
            return _this.$http.post(_this.$API.subcompany, data)
        }
    }
}
module.exports = conmon_model
