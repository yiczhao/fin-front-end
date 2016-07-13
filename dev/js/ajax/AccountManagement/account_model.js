/**
 * @description 账户列表接口
 * @author 赵俊涵
 * @date 2016.05.31
 */
function model(_this) {
    return {
        /**
         * @description 查询账户列表
         * @param data
         * @returns {*}
         */
        getbanklist (data) {
            return _this.$http.get(_this.$API.banklist+decodeURIComponent($.param(data)))
        },
        /**
         * @description 查询负责人
         * @param id
         * @returns {*}
         */
        queryperson (a) {
            return _this.$http.get(_this.$API.queryperson+a)
        },
        /**
         * @description 保存负责人
         * @param data
         * @returns {*}
         */
        saveperson (data) {
            return _this.$http.post(_this.$API.saveperson,data)
        },
        /**
         * @description 启用账户
         * @param id
         * @returns {*}
         */
        startaccount (a) {
            return _this.$http.post(_this.$API.startaccount+a)
        },
        /**
         * @description 删除账户
         * @param id
         * @returns {*}
         */
        deleteaccount(a) {
            return _this.$http.delete(_this.$API.deleteaccount+a)
        },
        /**
         * @description 新增修改账户信息
         * @param data
         * @returns {*}
         */
        changeaccount (data) {
            return _this.$http.post(_this.$API.changeaccount,data)
        },
    }
}
module.exports = model
