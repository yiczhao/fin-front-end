/**
 * @description 三方管理列表接口
 * @author 赵俊涵
 * @date 2016.06.08
 */
function model(_this){
    return {
        /**
         * @description 查询三方明细数据
         * @params {data}
         * @returns {*}
         * */
        thirdinfo_list(data){
            return _this.$http.get(_this.$API.thirdinfo_list+ decodeURIComponent($.param(data)))
        },
        /**
         * @description 三方余额
         * @params {data}
         * @returns {*}
         * */
        thirdinfo_Blance(_id){
            return _this.$http.get(_this.$API.thirdinfo_Blance+_id)
        },
        /**
         * @description 三方回款充值
         * @params {data}
         * @returns {*}
         * */
        thirdParty_recharge(data){
            return _this.$http.post(_this.$API.thirdParty_recharge,data)
        }
    }
}
module.exports=model;