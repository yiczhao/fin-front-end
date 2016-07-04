/**
 * @description 三方管理列表接口
 * @author 赵俊涵
 * @date 2016.06.08
 */
function model(_this){
    return {
        /**
         * @description 查询三方数据
         * @params {data}
         * @returns {*}
         * */
        thirdParty_list(data){
            return _this.$http.get(_this.$API.thirdParty_list+ decodeURIComponent($.param(data)))
        },
        /**
         * @description 三方停用启用
         * @params {data}
         * @returns {*}
         * */
        thirdParty_status(data){
            return _this.$http.post(_this.$API.thirdParty_status,data)
        },
        /**
         * @description 三方回款充值
         * @params {data}
         * @returns {*}
         * */
        thirdParty_recharge(data){
            return _this.$http.post(_this.$API.thirdParty_recharge,data)
        },
        /**
         * @description 三方添加账户
         * @params {data}
         * @returns {*}
         * */
        thirdParty_accountlist(data){
            return _this.$http.get(_this.$API.thirdParty_accountlist+ decodeURIComponent($.param(data)))
        },
        /**
         * @description 三方确认添加账户
         * @params {data}
         * @returns {*}
         * */
        thirdParty_save(data){
            return _this.$http.post(_this.$API.thirdParty_save,data)
        },
        /**
         * @description 三方合计
         * @params {data}
         * @returns {*}
         * */
        gettotal(data){
            return _this.$http.get(_this.$API.gettotal+ decodeURIComponent($.param(data)))
        }
    }
}
module.exports=model;