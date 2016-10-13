/**
 * @description 手工单管理接口
 * @author 洪钢
 * @date 2016.10.09
 */
function model(_this) {
    return {
        /**
         * @description 查询列表
         * @param data
         * @returns {*}
         */
        getManualTradeDetailList (data) {
            return _this.$http.get(_this.$API.getManualTradeDetailList+$.param(data))
        },
        /**
         * @description 添加手工单
         * @param data
         * @returns {*}
         */
        addtrade(data){
            return _this.$http.post(_this.$API.addtrade,data);
        },
        /**
         * @description 查询手工单
         * @param data
         * @returns {*}
         */
        searchManualTradeDetail(data){
            return _this.$http.get(_this.$API.searchManualTradeDetail+$.param(data));
        },
        /**
         * @description 提交手工单审核
         * @param data
         * @returns {*}
         */
        applyManualTradeDetail(data){
            return _this.$http.post(_this.$API.applyManualTradeDetail+$.param(data));
        },
        /**
         * @description 审核退回手工单
         * @param data
         * @returns {*}
         */
        refusedManualTradeDetail(data){
            return _this.$http.post(_this.$API.refusedManualTradeDetail+$.param(data));
        },
        /**
         * @description 审核通过手工单
         * @param data
         * @returns {*}
         */
        approvedManualTradeDetail(data){
            return _this.$http.post(_this.$API.approvedManualTradeDetail+$.param(data));
        },
        /**
         * @description 删除手工单
         * @param data
         * @returns {*}
         */
        deleteManualTradeDetail(data){
            return _this.$http.delete(_this.$API.deleteManualTradeDetail+$.param(data));
        },
        /**
         * @description 删除手工单
         * @param data
         * @returns {*}
         */
        getManualTradeDetailSum(data){
            return _this.$http.get(_this.$API.getManualTradeDetailSum+$.param(data));
        }
    }
}
module.exports = model