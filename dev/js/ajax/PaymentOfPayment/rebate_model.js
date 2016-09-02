/**
 * @description 备付金支出补贴退税接口
 * @author 赵俊涵
 * @date 2016.06.02
 */
function model(_this){
    return {
        /**
         * @description 查询补贴退税数据
         * @params {data}
         * @returns {*}
         * */
        rebate_list(data){
            return _this.$http.get(_this.$API.rebate_list+ $.param(data))
        },
        /**
         * @description 更新补贴退税
         * @params {_id}
         * @returns {*}
         * */
        rebate_update(_id){
            return _this.$http.post(_this.$API.rebate_update+_id)
        },
        /**
         * @description 补贴退税申请划付
         * @params {data}
         * @returns {*}
         * */
        rebate_applyPay(data){
            return _this.$http.post(_this.$API.rebate_applyPay,data)
        },
        /**
         * @description 申请划付数据查询
         * @params {data}
         * @returns {*}
         * */
        select_rebate(data){
            return _this.$http.get(_this.$API.select_rebate+ $.param(data))
        },
        /**
         * @description 一键审核
         * @params {data}
         * @returns {*}
         * */
        rebate_batchCheck(data){
            return _this.$http.post(_this.$API.rebate_batchCheck,data)
        },
        /**
         * @description 导出
         * @params {data}
         * @returns {*}
         * */
        subsidyTaxexcel(data){
            return _this.$http.get(_this.$API.subsidyTaxexcel+ $.param(data))
        },
        /**
         * @description 合计
         * @params {data}
         * @returns {*}
         * */
        rebate_total(data){
            return _this.$http.get(_this.$API.rebate_total+ $.param(data))
        }
    }
}
module.exports=model;