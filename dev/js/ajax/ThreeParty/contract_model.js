/**
 * @description 合同管理列表接口
 * @author 赵俊涵
 * @date 2016.11.29
 */
function model(_this){
    return {
        /**
         * @description 查询合同数据
         * @params {data}
         * @returns {*}
         * */
        contract_list(data){
            return _this.$http.get(_this.$API.contract_list+ $.param(data))
        },
        /**
         * @description 查询合同合计数据
         * @params {data}
         * @returns {*}
         * */
        contract_sum(data){
            return _this.$http.get(_this.$API.contract_sum+ $.param(data))
        },
        /**
         * @description 添加合同
         * @params {data}
         * @returns {*}
         * */
        contract_add(data){
            return _this.$http.post(_this.$API.contract_add,data)
        },
        /**
         * @description 开票合同
         * @params {data}
         * @returns {*}
         * */
        contract_invoice(data){
            return _this.$http.post(_this.$API.contract_invoice,data)
        },
        /**
         * @description 回款合同
         * @params {data}
         * @returns {*}
         * */
        contract_collection(data){
            return _this.$http.post(_this.$API.contract_collection,data)
        },
        /**
         * @description 结算确认
         * @params {data}
         * @returns {*}
         * */
        contractSettlement(data){
            return _this.$http.post(_this.$API.contractSettlement,data)
        },
        /**
         * @description 回款开票信息
         * @params {data}
         * @returns {*}
         * */
        contractInvoiceInfo(data){
            return _this.$http.get(_this.$API.contractInvoiceInfo+$.param(data))
        },
        /**
         * @description 回款开票明细
         * @params {data}
         * @returns {*}
         * */
        invoiceCollection(data){
            return _this.$http.get(_this.$API.invoiceCollection+$.param(data))
        },
        /**
         * @description 回款开票明细合计
         * @params {data}
         * @returns {*}
         * */
        invoiceCollectionSum(data){
            return _this.$http.get(_this.$API.invoiceCollectionSum+$.param(data))
        },
        /**
         * @description 查询合同编号
         * @params {data}
         * @returns {*}
         * */
        getContractNumber(data){
            return _this.$http.get(_this.$API.getContractNumber+$.param(data))
        },
    }
}
module.exports=model;