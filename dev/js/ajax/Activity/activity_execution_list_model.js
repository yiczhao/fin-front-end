/**
 * @description 活动执行表列表接口
 * @author 冷艳君
 * @date 2016.10.10
 */
function model(_this){
    return {
        /**
         * @description 查询活动执行表数据
         * @params {data}
         * @returns {*}
         * */
        activity_execution_list(data){
            return _this.$http.get(_this.$API.activity_execution_list+ $.param(data))
        }
    }
}
module.exports=model;
