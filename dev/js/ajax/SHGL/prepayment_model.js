/**
 * @description 预付款接口
 * @author 赵俊涵
 * @date 2016.06.02
 */
function model(_this){
    return {
        /**
         * @description 查询预付款数据
         * @params {data}
         * @returns {*}
         * */
        prepayment_lists(data){
            return _this.$http.post(_this.$API.prepayment_lists,data)
        },

    }
}
module.exports=model;