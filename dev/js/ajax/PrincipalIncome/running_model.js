/**
 * @description 通道管理接口
 * @author 赵俊涵
 * @date 2016.11.10
 */
function model(_this) {
    return {
        /**
         * @description 查询通道列表
         * @param data
         * @returns {*}
         */
        getchannellist (data) {
            return _this.$http.get(_this.$API.getchannellist)
        },
        /**
         * @description 查询配置信息
         * @param id
         * @returns {*}
         */
        getAccountList(a) {
            return _this.$http.get(_this.$API.getAccountList+a)
        },
        /**
         * @description 保存配置信息
         * @param data
         * @returns {*}
         */
        saveAccountList (data) {
            return _this.$http.post(_this.$API.saveAccountList,data)
        },
        /**
         * @description 删除配置信息
         * @param id
         * @returns {*}
         */
        deleteAccountList(a) {
            return _this.$http.delete(_this.$API.deleteAccountList+a)
        },
        /**
         * @description 启用账户
         * @param id
         * @returns {*}
         */
        startChannel (a) {
            return _this.$http.post(_this.$API.startChannel+a)
        },
        /**
         * @description 新增通道信息
         * @param data
         * @returns {*}
         */
        addChannel (data) {
            return _this.$http.post(_this.$API.addChannel,data)
        },
        /**
         * @description 修改通道信息
         * @param data
         * @returns {*}
         */
        editChannel (data) {
            return _this.$http.post(_this.$API.editChannel,data)
        }
    }
}
module.exports = model
