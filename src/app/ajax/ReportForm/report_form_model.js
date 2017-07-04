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
         * @description  获取财务指标分析（总）（分） 查询业务(选项)
         * @params {data}
         * @returns {*}
         * */
        getSearchBusiness(){
            return _this.$http.get(_this.$API.getCommonBusiness)
        },
        /**
         * @description  获取财务指标分析（总）（分） 查询业务(选项)
         * @params {data}
         * @returns {*}
         * */
        getCommonActivation(){
            return _this.$http.get(_this.$API.getCommonActivation)
        },
        /**
         * @description  获取财务指标分析（总）（分） 查询项目(选项)
         * @params {data}
         * @returns {*}
         * */
        getSearchItem(){
            return _this.$http.get(_this.$API.getCommonItem)
        },
        /**
         * @description  获取财务指标分析（总）（分） 查询业务项目明细(选项)
         * @params {data}
         * @returns {*}
         * */
        getSearchBusinessDetail(){
            return _this.$http.get(_this.$API.getCommonBusinessDetail)
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
         * @description  指标管理 查询部门(选项)
         * @params {data}
         * @returns {*}
         * */
        getSearchDepartment(){
            return _this.$http.get(_this.$API.getCommonDepartment)
        },
        /**
         * @description  指标录入
         * @params {data}
         * @returns {*}
         * */
        getIndexAdd(data){
            return _this.$http.post(_this.$API.typeInFinanceAdd,data)
        },
        /**
         * @description  费用管理-费用管理
         * @params {data}
         * @returns {*}
         * */
        getExpenseManageLlst(data){
            return _this.$http.get(_this.$API.getExpenseManagementLlst+ $.param(data))
        },
        getExpenseManageSubject(data){
            return _this.$http.get(_this.$API.getExpenseManageSubject+ $.param(data))
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
            return _this.$http.get(_this.$API.costBugetIn + $.param(data))
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
         * @description  部门费用明细
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
            return _this.$http.get(_this.$API.getAllopatryActivationDetailList+ $.param(data))
        },
        /**
         * @description  异地激活收入成本分配明细--获取合伙人
         * @params {data}
         * @returns {*}
         * */
        getAllopatrySnPartner(){
            return _this.$http.get(_this.$API.getAllopatrySnPartnerList)
        },
        /**
         * @description  异地激活收入成本分配统计
         * @params {data}
         * @returns {*}
         * */
        getAllopatryListCount(data){
            return _this.$http.get(_this.$API.getAllopatryActivationCountList+ $.param(data))
        },
        /**
         * @description  异地激活收入成本分配统计--合伙人订单录入
         * @params {data}
         * @returns {*}
         * */
        snInfoTypeIn(data){
            return _this.$http.get(_this.$API.snInfoSave+ $.param(data))
        },
        /**
         * @description  异地激活收入成本分配统计--合伙人订单录入
         * @params {data}
         * @returns {*}
         * */
        departmentList(){
            return _this.$http.get(_this.$API.departmentList)
        },
        /**
         * @description  异地激活收入成本分配统计--合伙人订单录入
         * @params {data}
         * @returns {*}
         * */
        snPartnerList(){
            return _this.$http.get(_this.$API.snPartnerList)
        },
        /**
         * @description  获取分公司的指标
         * @params {data}
         * @returns {*}
         * */
        financeInfo(data){
            return _this.$http.get(_this.$API.financeInfo+$.param(data))
        },

    }
}
module.exports=model;