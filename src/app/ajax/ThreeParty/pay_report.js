/**
 * @description 划付报表
 * @author 赵俊涵
 * @date 2017.08.10
 */
function model(_this){
    return {
        /**
         * @description 划付报表列表
         * @params {data}
         * @returns {*}
         * */
        payReportList(data){
            return _this.$http.get(_this.$API.payReportList+$.param(data))
        },
        /**
         * @description 划付报表合计
         * @params {data}
         * @returns {*}
         * */
        payReportTotal(data){
            return _this.$http.get(_this.$API.payReportTotal+$.param(data))
        }
    }
}
module.exports=model;