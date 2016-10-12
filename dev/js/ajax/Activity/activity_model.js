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
            return _this.$http.get(_this.$API.activity_list+ $.param(data))
        },
        /**
         * @description 查询合计数据
         * @params {data}
         * @returns {*}
         * */
        activity_total(data){
            return _this.$http.get(_this.$API.activity_total+ $.param(data))
        },
        /**
         * @description 查询配置三方数据
         * @params {data}
         * @returns {*}
         * */
        activity_info(data){
            return _this.$http.get(_this.$API.activity_info+ $.param(data))
        },
        /**
         * @description 保存配置三方数据
         * @params {data}
         * @returns {*}
         * */
        activity_save(data){
            return _this.$http.post(_this.$API.activity_save,data)
        },
        /**
         * @description 保存其他信息数据
         * @params {data}
         * @returns {*}
         * */
        saveOther(data){
            return _this.$http.post(_this.$API.saveOther,data)
        },
        /**
         * @description 查询其他信息数据
         * @params {id}
         * @returns {*}
         * */
        otherInfo(_id){
            return _this.$http.get(_this.$API.otherInfo+_id)
        },
    }
}
module.exports=model;