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
            return _this.$http.get(_this.$API.prepayment_store+ $.param(data))
        },
        /**
         * @description 删除门店
         * @params {id}
         * @returns {*}
         * */
        delstore(_id){
            return _this.$http.delete(_this.$API.delstore+_id)
        },
        /**
         * @description 添加商户
         * @params {data}
         * @returns {*}
         * */
        store_add(data){
            return _this.$http.post(_this.$API.store_add,data)
        },
    }
}
module.exports=model;