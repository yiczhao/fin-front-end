/**
 * @description 税率管理接口
 * @author 于凯乐
 * @date 2016年10月9日16:06:02
 */

function model(_this){
    return {
        /**
         * @description 查询税率管理数据
         * @params {data}
         * @returns {*}
         * */

        taxRate_list(data){
            return _this.$http.get(_this.$API.taxRate_list+ $.param(data))
        },

        /**
         * @description 查询税率管理数据详细信息
         * @params {_id}
         * @returns {*}
         * */
        editDetail(_id){
            return _this.$http.get(_this.$API.edit_detail+ _id)
        }
    }
}
module.exports=model;