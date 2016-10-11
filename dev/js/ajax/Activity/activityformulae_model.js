/**
 * @description 活动公式接口
 * @author 赵俊涵
 * @date 2016.10.10
 */
function model(_this){
    return {
        /**
         * @description 查询公式数据
         * @params {data}
         * @returns {*}
         * */
        activityformulae_list(data){
            return _this.$http.get(_this.$API.activityformulae_list+$.param(data))
        },
        /**
         * @description 设为默认公式
         * @params {data}
         * @returns {*}
         * */
        defaultFormulae(data){
            return _this.$http.post(_this.$API.defaultFormulae,data)
        },
        /**
         * @description 保存公式
         * @params {data}
         * @returns {*}
         * */
        saveFormulae(data){
            return _this.$http.post(_this.$API.saveFormulae,data)
        },
    }
}
module.exports=model;