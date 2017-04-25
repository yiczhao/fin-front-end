/**
 * @description 系统日志接口
 * @author 郑杰
 * @date 2017.04.25
 */
function model(_this){
    return {
        /**
         * @description 查询系统日志数据
         * @params {data}
         * @returns {*}
         * */
        log_list(data){
            return _this.$http.get(_this.$API.log_list+ $.param(data))
        },
    }
}
module.exports=model;