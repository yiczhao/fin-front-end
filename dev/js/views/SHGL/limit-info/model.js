function member_model(http) {
    return {
        // 额度采购账户明细
        post_point_exchange_list (data) {
            data = {
                code: 0,
                message: "success",
                data: [{
                    certificate: 3874,
                    collectionName: "卡说账户321321",
                    accountName: 582,
                    accountNumber: 12485,
                    incomeAmount: 744,
                    payoutAmount: 12485,
                    status: 2,
                    tradeTime: "2016-04-29 12:12:12",
                    purpose: 3,
                    remarks:""
                }],
                total: 25
            }
            return http.post('./limitPurchaseAccount/list',data)
        }
    }
}
module.exports = member_model