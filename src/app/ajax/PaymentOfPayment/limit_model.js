/**
 * @description 备付金支出额度采购接口
 * @author 赵俊涵
 * @date 2016.06.02
 */
function model(_this){
    return {
        /**
         * @description 查询额度采购数据
         * @params {data}
         * @returns {*}
         * */
        limit_list(data){
            return _this.$http.get(_this.$API.limit_list+ $.param(data))
        },
        /**
         * @description 查询跳转ID数据
         * @params {data}
         * @returns {*}
         * */
        skipToInfo(_id){
            return _this.$http.get(_this.$API.skipToInfo+_id)
        }
    }
}
module.exports=model;