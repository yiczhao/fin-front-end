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
         * @description  费用管理-费用管理
         * @params {data}
         * @returns {*}
         * */
        getExpenseManageLlst(data){
            return _this.$http.get(_this.$API.getExpenseManagementLlst+ $.param(data))
        },
        /**
         * @description  费用管理-费用预算录入
         * @params {data}
         * @returns {*}
         * */
        costBugetTypeInP(data){
            return _this.$http.post(_this.$API.costBugetIn,data)
        },
        /**
         * @description  费用管理-费用预算查询
         * @params {data}
         * @returns {*}
         * */
        costBugetTypeInG(data){
            return _this.$http.get(_this.$API.CostBugetIn + $.param(data))
        },
        /**
         * @description  费用管理-费用实际费用录入
         * @params {data}
         * @returns {*}
         * */
        costBugetActualTypeInP(data){
            return _this.$http.post(_this.$API.commonCostDetail,data)
        },
        /**
         * @description  费用管理-预算-预算录入-查询费用类型
         * @params {data}
         * @returns {*}
         * */
        costCommonTypeIn(){
            return _this.$http.get(_this.$API.commonCostType)
        },
        /**
         * @description  费用管理-部门费用明细查询
         * @params {data}
         * @returns {*}
         * */
        getCostCommonDetail(data){
            return _this.$http.get(_this.$API.commonCostDetail+ $.param(data))
        },
        /**
         * @description  异地激活收入成本分配明细
         * @params {data}
         * @returns {*}
         * */
        getAllopatryListDetali(data){
            return _this.$http.get(_this.$API.getAllopatryActivationList+ $.param(data))
        },
        /**
         * @description  异地激活收入成本分配统计
         * @params {data}
         * @returns {*}
         * */
        getAllopatryListCount(data){
            return _this.$http.get(_this.$API.getAllopatryActivationCountList+ $.param(data))
        },
    }
}
module.exports=model;