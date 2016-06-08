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
    }
}
module.exports=model;