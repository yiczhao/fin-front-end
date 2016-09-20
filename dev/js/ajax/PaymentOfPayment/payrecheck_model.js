/**
 * @description 备付金支出补贴划付接口
 * @author 赵俊涵
 * @date 2016.06.02
 */
function model(_this){
    return {
        /**
         * @description 查询划付复核数据
         * @params {data}
         * @returns {*}
         * */
        payrecheck_list(data){
            return _this.$http.get(_this.$API.payrecheck_list+$.param(data))
        },
        /**
         * @description 合计
         * @params {data}
         * @returns {*}
         * */
        payrecheck_total(data){
            return _this.$http.get(_this.$API.payrecheck_total+ $.param(data))
        },
        /**
         * @description 通过
         * @params {data}
         * @returns {*}
         * */
        payrecheck_pass(data){
            return _this.$http.post(_this.$API.payrecheck_pass,data)
        },
        /**
         * @description 回退
         * @params {data}
         * @returns {*}
         * */
        payrecheck_back(data){
            return _this.$http.post(_this.$API.payrecheck_back,data)
        },
        /**
         * @description 查看当前订单号及付款方式
         * @param {data}
         * @returns {*}
         */
        skipToPayRecheck(data){
            return _this.$http.get(_this.$API.skipToPayRecheck + $.param(data))
        },
        /**
         * @description 跳转
         * @param {data}
         * @returns {*}
         */
        skipToSubsidyAccount(data){
            return _this.$http.get(_this.$API.skipToSuspensionTaxAccountDetail+ $.param(data))
        }
    }
}
module.exports=model;