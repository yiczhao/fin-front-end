/**
 * @description 预付款门店接口
 * @author 赵俊涵
 * @date 2016.06.06
 */
function model(_this){
    return {
        /**
         * @description 查询门店数据
         * @params {data}
         * @returns {*}
         * */
        prepayment_store(data){
            return _this.$http.get(_this.$API.prepayment_store+ decodeURIComponent($.param(data)))
        },
    }
}
module.exports=model;