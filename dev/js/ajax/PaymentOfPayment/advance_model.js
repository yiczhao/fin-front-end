/**
 * @description 备付金支出预付款划付接口
 * @author 赵俊涵
 * @date 2016.06.02
 */
function model(_this){
    return {
        /**
         * @description 查询预付款划付数据
         * @params {data}
         * @returns {*}
         * */
        advance_list(data){
            return _this.$http.get(_this.$API.advance_list+ decodeURIComponent($.param(data)))
        }
    }
}
module.exports=model;