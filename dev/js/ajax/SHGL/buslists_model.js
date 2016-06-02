/**
 * @description 商户列表接口
 * @author 赵俊涵
 * @date 2016.06.02
 */
function model(_this){
    return {
        /**
         * @description 查询商户列表数据
         * @params {data}
         * @returns {*}
         * */
        merchant_lists(data){
            return _this.$http.post(_this.$API.merchant_lists,data)
        },
        /**
         * @description 查询划款账户数据
         * @params {data}
         * @returns {*}
         * */
        merchant_account(data){
            return _this.$http.post(_this.$API.merchant_account,data)
        },
        /**
         * @description 编辑划款账户数据
         * @params {data}
         * @returns {*}
         * */
        merchant_update(data){
            return _this.$http.post(_this.$API.merchant_update,data)
        },
    }
}
module.exports=model;