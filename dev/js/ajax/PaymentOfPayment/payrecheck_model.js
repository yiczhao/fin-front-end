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
        payrecheckexcel_total(data){
            return _this.$http.get(_this.$API.payrecheckexcel_total+ $.param(data))
        },
        /**
         * @description 通过
         * @params {data}
         * @returns {*}
         * */
        payrecheck_pass(data){
            return _this.$http.post(_this.$API.payrecheckexcel_back,data)
        },
        /**
         * @description 回退
         * @params {data}
         * @returns {*}
         * */
        payrecheck_back(data){
            return _this.$http.post(_this.$API.payrecheckexcel_back,data)
        }
    }
}
module.exports=model;