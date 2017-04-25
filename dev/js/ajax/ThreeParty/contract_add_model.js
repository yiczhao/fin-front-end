/**
 * @description 新增合同接口
 * @author 赵俊涵
 * @date 2017.04.25
 */
function model(_this){
    return {
        /**
         * @description 新增合同
         * @params {data}
         * @returns {*}
         * */
        saveFormulae(data){
            return _this.$http.post(_this.$API.contract_add,data)
        },
        /**
         * @description 根据分公司ID获取三方列表
         * @params {data}
         * @returns {*}
         * */
        getThirdPartyAccountList(data){
            return _this.$http.get(_this.$API.getThirdPartyAccountList+$.param(data));
        }
    }
}
module.exports=model;