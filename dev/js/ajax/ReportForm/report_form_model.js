/**v
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
        /**
         * @description  获取财务指标排行
         * @params {data}
         * @returns {*}
         * */
        getFinanceRanking(data){
            return _this.$http.get(_this.$API.getFinanceRanking+ $.param(data))
        },
        /**
         * @description  指标管理
         * @params {data}
         * @returns {*}
         * */
        getIndexManagement(data){
            return _this.$http.get(_this.$API.getFinanceManagement+ $.param(data))
        },
        /**
         * @description  指标录入
         * @params {data}
         * @returns {*}
         * */
        getIndexAdd(data){
            return _this.$http.get(_this.$API.getFinanceAdd+ $.param(data))
        },
        /**
         * @description  费用管理-费用预算录入
         * @params {data}
         * @returns {*}
         * */
        costBugetTypeIn(data){
            return _this.$http.post(_this.$API.CostBugetIn,data)
        },
        /**
         * @description  异地激活收入成本分配明细
         * @params {data}
         * @returns {*}
         * */
        getAllopatryListDetali(data){
            return _this.$http.get(_this.$API.getAllopatryActivationList+ $.param(data))
        },
    }
}
module.exports=model;