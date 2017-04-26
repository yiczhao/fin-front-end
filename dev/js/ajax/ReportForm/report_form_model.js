/**
 * @description 系统日志接口
 * @author 郑杰
 * @date 2017.04.25
 */
function model(_this){
    return {
        /**
         * @description  获取财务指标分析（总）合计
         * @params {data}
         * @returns {*}
         * */
        getTotalFinanceSum(data){
            return _this.$http.get(_this.$API.getFinanceSumTotal+ $.param(data))
        },
        /**
         * @description  获取财务指标分析（总）列表
         * @params {data}
         * @returns {*}
         * */
        getTotalFinanceList(data){
            return _this.$http.get(_this.$API.getFinanceListTotal+ $.param(data))
        },
        /**
         * @description  获取财务指标分析（分）合计
         * @params {data}
         * @returns {*}
         * */
        getBranchFinanceSum(data){
            return _this.$http.get(_this.$API.getFinanceSumBranch+ $.param(data))
        },
        /**
         * @description  获取财务指标分析（分）列表
         * @params {data}
         * @returns {*}
         * */
        getBranchFinanceList(data){
            return _this.$http.get(_this.$API.getFinanceListBranch+ $.param(data))
        },
    }
}
module.exports=model;