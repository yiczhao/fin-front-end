/**
 * @description 员工管理接口
 * @author 赵俊涵
 * @date 2016.06.02
 */
function model(_this){
    return {
        /**
         * @description 查询员工数据
         * @params {data}
         * @returns {*}
         * */
        user_list(data){
            return _this.$http.get(_this.$API.user_list+ decodeURIComponent($.param(data)))
        },
        /**
         * @description 员工管辖查询
         * @params {_id}
         * @returns {*}
         * */
        userControl_list(_id){
            return _this.$http.get(_this.$API.userControl_list+_id)
        },
        /**
         * @description 员工管辖保存
         * @params {data}
         * @returns {*}
         * */
        saveUserControlSpans(data){
            return _this.$http.post(_this.$API.saveUserControlSpans,data)
        },
        /**
         * @description 新增员工列表查询
         * @params {data}
         * @returns {*}
         * */
        readyImportUser(data){
            return _this.$http.post(_this.$API.readyImportUser,data)
        },
        /**
         * @description 新增员工保存
         * @params {data}
         * @returns {*}
         * */
        importUser(data){
            return _this.$http.post(_this.$API.importUser,data)
        },
    }
}
module.exports=model;