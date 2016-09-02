/**
 * @description 公用数据接口
 * @author 赵俊涵
 * @date 2016.05.31
 */
export default function install(Vue) {
    var _m={
        /**
         * @description 查询分公司数据
         * @param {}
         * @returns {*}
         */
        getcompany (data) {
            if(typeof data=='undefined'){
                return Vue.http.get('./subCompany/list?')
            }else{
                return Vue.http.get('./subCompany/list?' + $.param(data));
            }
        },
        /**
         * @description 查询城市列表数据
         * @param {data}
         * @returns {*}
         */
        getcity (data) {
            return Vue.http.get('./city/list?' + $.param(data))
        },
        /**
         * @description 上传数据
         * @param {data}
         * @returns {*}
         */
        upload (data) {
            return Vue.http.post('./file/upload', data)
        },
        /**
         * @description 查看当前订单号及付款方式
         * @param {data}
         * @returns {*}
         */
        skipToOrder(data){
            return Vue.http.get('reserveCashOrder/skipToOrder?' + $.param(data))
        },
        /**
         * @description 获取商户数据
         * @param {data}
         * @returns {*}
         */
        getmerchant_list(data){
            return Vue.http.get('./merchant/list?' + $.param(data))
        }
    };

    Object.defineProperties(Vue.prototype, {
        $common_model: {get(){return _m}}
    })
}