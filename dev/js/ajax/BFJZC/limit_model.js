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
            return _this.$http.post(_this.$API.limit_list,data)
        }
    }
}
module.exports=model;