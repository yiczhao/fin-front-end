/**
 * @description 公用数据接口
 * @author 赵俊涵
 * @date 2016.05.31
 */
function conmon_model(_this) {
    return {
        /**
         * @description 查询分公司数据
         * @param {}
         * @returns {*}
         */
        getcompany (data) {
            if(typeof data=='undefined'){
                return _this.$http.get(_this.$API.subcompany)
            }else{
                return _this.$http.get(_this.$API.subcompany + $.param(data));
            }
        },
        /**
         * @description 查询城市列表数据
         * @param {data}
         * @returns {*}
         */
        getcity (data) {
            return _this.$http.get(_this.$API.city + $.param(data))
        },
        /**
         * @description 上传数据
         * @param {data}
         * @returns {*}
         */
        upload (data) {
            return _this.$http.post(_this.$API.upload, data)
        },
        /**
         * @description 查看当前订单号及付款方式
         * @param {data}
         * @returns {*}
         */
        skipToOrder(data){
            return _this.$http.get(_this.$API.skipToOrder + $.param(data))
        },
        /**
         * @description 获取商户数据
         * @param {data}
         * @returns {*}
         */
        getmerchant_list(data){
            return _this.$http.get(_this.$API.getmerchant_list + $.param(data))
        },

    }
}
module.exports = conmon_model
