/**
 * @description 备付金支出补贴划付接口
 * @author 赵俊涵
 * @date 2016.06.02
 */
function model(_this){
    return {
        /**
         * @description 查询补贴划付数据
         * @params {data}
         * @returns {*}
         * */
        appropriation_list(data){
            return _this.$http.get(_this.$API.appropriation_list+$.param(data))
        },
        /**
         * @description 更新补贴划付
         * @params {_id}
         * @returns {*}
         * */
        subsidy_update(_id){
            return _this.$http.post(_this.$API.subsidy_update+_id)
        },
        /**
         * @description 补贴划付申请划付
         * @params {data}
         * @returns {*}
         * */
        subsidy_applyPay(data){
            return _this.$http.post(_this.$API.subsidy_applyPay,data)
        },
        /**
         * @description 申请划付数据查询
         * @params {data}
         * @returns {*}
         * */
        select_subsidypay(data){
            return _this.$http.get(_this.$API.select_subsidypay+$.param(data))
        },
        /**
         * @description 一键审核
         * @params {data}
         * @returns {*}
         * */
        subsidy_applyPay(data){
            return _this.$http.post(_this.$API.subsidy_applyPay,data)
        },
        /**
         * @description 导出
         * @params {data}
         * @returns {*}
         * */
        subsidyPayexcel(data){
            return _this.$http.get(_this.$API.subsidyPayexcel+ $.param(data))
        }
    }
}
module.exports=model;