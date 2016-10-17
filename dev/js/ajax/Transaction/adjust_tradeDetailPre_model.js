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
         * @description 合计
         * @param data
         * @returns {*}
         */
        adjustTradeDetailPre_total(data) {
            return _this.$http.get(_this.$API.adjustTradeDetailPre_total+$.param(data))
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
         * @description 根据调账的交易流水号查询交易笔数和消费金额
         * @param data
         * @returns {*}
         */
        getTradeData(data){
            return _this.$http.get(_this.$API.getTradeData+$.param(data));
        },
        /**
         * @description 调账编辑
         * @param _id
         * @returns {*}
         */
        adjustTradeDetailPre_item(_id){
            return _this.$http.get(_this.$API.adjustTradeDetailPre_item+_id);
        },
        /**
         * @description 提交调账
         * @param data
         * @returns {*}
         */
        adjustTradeDetailPre_apply(_id){
            return _this.$http.post(_this.$API.adjustTradeDetailPre_apply+_id);
        },
        /**
         * @description 通过调账
         * @param data
         * @returns {*}
         */
        adjustTradeDetailPre_approved(_id){
            return _this.$http.post(_this.$API.adjustTradeDetailPre_approved+_id);
        },
        /**
         * @description 退回调账
         * @param data
         * @returns {*}
         */
        adjustTradeDetailPre_back(data){
            return _this.$http.post(_this.$API.adjustTradeDetailPre_back,data);
        },/**
         * @description 删除调账
         * @param data
         * @returns {*}
         */
        adjustTradeDetailPre_delete(_id){
            return _this.$http.post(_this.$API.adjustTradeDetailPre_delete+_id);
        },
    }
}
module.exports = model