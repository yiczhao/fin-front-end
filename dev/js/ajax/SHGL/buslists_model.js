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
            return _this.$http.get(_this.$API.merchant_lists+ decodeURIComponent($.param(data)))
},
        /**
         * @description 查询划款账户数据
         * @params {data}
         * @returns {*}
         * */
        merchant_account(_id){
            return _this.$http.get(_this.$API.merchant_account+_id)
        },
        /**
         * @description 编辑划款账户数据
         * @params {data}
         * @returns {*}
         * */
        merchant_update(data){
            return _this.$http.post(_this.$API.merchant_update,data)
        },
        /**
         * @description 查看消化账户数据
         * @params {data}
         * @returns {*}
         * */
        merchant_digest(_id){
            return _this.$http.get(_this.$API.merchant_digest+_id)
        },
        /**
         * @description 查看合计数据
         * @params {data}
         * @returns {*}
         * */
        merchant_total(data){
            return _this.$http.get(_this.$API.merchant_total+ decodeURIComponent($.param(data)))
        },

    }
}
module.exports=model;