/**
 * @description 活动列表接口
 * @author 赵俊涵
 * @date 2016.06.08
 */
function model(_this){
    return {
        /**
         * @description 查询活动数据
         * @params {data}
         * @returns {*}
         * */
        activity_list(data){
            return _this.$http.get(_this.$API.activity_list+ decodeURIComponent($.param(data)))
        },
        /**
         * @description 查询合计数据
         * @params {data}
         * @returns {*}
         * */
        activity_total(data){
            return _this.$http.get(_this.$API.activity_total+ decodeURIComponent($.param(data)))
        },
        /**
         * @description 查询配置三方数据
         * @params {data}
         * @returns {*}
         * */
        activity_info(data){
            return _this.$http.get(_this.$API.activity_info+ decodeURIComponent($.param(data)))
        },
        /**
         * @description 保存配置三方数据
         * @params {data}
         * @returns {*}
         * */
        activity_save(data){
            return _this.$http.post(_this.$API.activity_save,data)
        },
    }
}
module.exports=model;