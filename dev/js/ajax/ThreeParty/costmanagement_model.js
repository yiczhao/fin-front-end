/**
 * @description 三方管理 活动成本管理列表接口
 * @author 郑杰
 * @date 2017.04.25
 */
function model(_this){
    return {
    	/**
         * @description 查询管理列表数据
         * @params {data}
         * @returns {*}
         * */
        getCostList(data){
            return _this.$http.get(_this.$API.activityIncomeCostInfo+ $.param(data))
        },
        /**
         * @description 三方停用启用
         * @params {data}
         * @returns {*}
         * */
        // thirdParty_status(data){
        //     return _this.$http.post(_this.$API.thirdParty_status,data)
        // },
    }
}
module.exports=model;
