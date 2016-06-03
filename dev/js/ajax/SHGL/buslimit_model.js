/**
 * @description 额度采购接口
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
        limitPurchaseMerchant_lists(data){
            return _this.$http.get(_this.$API.limitPurchaseMerchant_lists+ decodeURIComponent($.param(data)))
        },
        /**
         * @description 编辑额度采购查询
         * @params {_id}
         * @returns {*}
         * */
        limitPurchaseMerchant_history(_id){
            return _this.$http.get(_this.$API.limitPurchaseMerchant_history+_id)
        },
        /**
         * @description 编辑额度采购保存
         * @params {data}
         * @returns {*}
         * */
        limitPurchaseMerchant_editDigest(data){
            return _this.$http.post(_this.$API.limitPurchaseMerchant_editDigest,data)
        },
        /**
         * @description 额度采购停用启用
         * @params {data}
         * @returns {*}
         * */
        limitPurchaseMerchant_change(data){
            return _this.$http.post(_this.$API.limitPurchaseMerchant_change,data)
        },
        /**
         * @description 额度采购消化商户查询
         * @params {data}
         * @returns {*}
         * */
        limitPurchaseMerchant_viewDigest(_id){
            return _this.$http.get(_this.$API.limitPurchaseMerchant_viewDigest+_id)
        },
        /**
         * @description 额度采购添加商户
         * @params {data}
         * @returns {*}
         * */
        limitPurchaseMerchant_add(data){
            return _this.$http.post(_this.$API.limitPurchaseMerchant_add,data)
        },
        /**
         * @description 额度采购添加消化商户
         * @params {data}
         * @returns {*}
         * */
        limitPurchaseMerchant_addDigest(data){
            return _this.$http.post(_this.$API.limitPurchaseMerchant_addDigest,data)
        },

    }
}
module.exports=model;