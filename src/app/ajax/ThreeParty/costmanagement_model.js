/**
 * @description 三方管理 活动成本管理列表接口
 * @author 郑杰
 * @date 2017.04.25
 */
function model(_this){
    return {
    	/**
         * @description 查询管理列表数据
         * @params {data}
         * @returns {*}
         * */
        getCostList(data){
            return _this.$http.get(_this.$API.activityIncomeCostInfo+ $.param(data))
        },
        /**
         * @description 三方停用启用
         * @params {data}
         * @returns {*}
         * */
        // thirdParty_status(data){
        //     return _this.$http.post(_this.$API.thirdParty_status,data)
        // },
        /**
         * @description 获取计算公式信息
         * @params {data}
         * @returns {*}
         * */
        getFormulae(data){
            return _this.$http.get(_this.$API.getActivityFormulae+ $.param(data))
        },
        /**
         * @description 获取默认公式信息
         * @params {data}
         * @returns {*}
         * */
        getDefaultFormulae(_id){
            return _this.$http.get(_this.$API.getActivityFormulaeDefault+ _id)
        },
        /**
         * @description 保存计算公式信息
         * @params {data}
         * @returns {*}
         * */
        saveFormulae(data){
            return _this.$http.post(_this.$API.saveActivityFormulae,data)
        },
        /**
         * @description 获取其他信息
         * @params {data}
         * @returns {*}
         * */
        getOtherInfo(data){
            return _this.$http.get(_this.$API.getActivityOtherInfo+ $.param(data))
        },
        /**
         * @description 保存其他信息
         * @params {data}
         * @returns {*}
         * */
        saveOtherInfo(data){
            return _this.$http.post(_this.$API.saveActivityOtherInfo,data)
        },
        /**
         * @description 设为默认公式信息
         * @params {data}
         * @returns {*}
         * */
        saveDefaultFormulae(_id){
            return _this.$http.post(_this.$API.saveActivityDefaultFormulae+ _id)
        },
    }
}
module.exports=model;
