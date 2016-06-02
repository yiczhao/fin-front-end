/**
 * @description 系统日志接口
 * @author 赵俊涵
 * @date 2016.06.02
 */
function model(_this){
    return {
        /**
         * @description 查询系统日志数据
         * @params {data}
         * @returns {*}
         * */
        log_list(data){
            return _this.$http.post(_this.$API.log_list,data)
        },
        /**
         * @description 查询描述及url数据
         * @params {}
         * @returns {*}
         * */
        log_description(){
            return _this.$http.post(_this.$API.log_description)
        },
        /**
         * @description 查询日志详情
         * @params {_id}
         * @returns {*}
         * */
        log_info(_id){
            return _this.$http.post(_this.$API.log_info+_id)
        },
    }
}
module.exports=model;