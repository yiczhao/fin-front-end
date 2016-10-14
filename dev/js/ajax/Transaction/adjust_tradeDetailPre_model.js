/**
 * @description 调账管理接口
 * @author 赵俊涵
 * @date 2016.10.14
 */
function model(_this) {
    return {
        /**
         * @description 查询列表
         * @param data
         * @returns {*}
         */
        adjustTradeDetailPre_list (data) {
            return _this.$http.get(_this.$API.adjustTradeDetailPre_list+$.param(data))
        },
        /**
         * @description 添加调账
         * @param data
         * @returns {*}
         */
        adjustTradeDetailPre_save(data){
            return _this.$http.post(_this.$API.adjustTradeDetailPre_save,data);
        },
        /**
         * @description 调账合计
         * @param data
         * @returns {*}
         */
        adjustTradeDetailPre_total(data){
            return _this.$http.get(_this.$API.adjustTradeDetailPre_total+$.param(data));
        },
        /**
         * @description 调账编辑
         * @param _id
         * @returns {*}
         */
        adjustTradeDetailPre_item(_id){
            return _this.$http.get(_this.$API.adjustTradeDetailPre_item+_id);
        },
    }
}
module.exports = model