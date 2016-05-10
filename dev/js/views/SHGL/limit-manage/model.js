function member_model(http) {
    return {
        // 额度采购账户列表
        post_point_exchange_list (data) {

            // data = {
            //     code: 0,
            //     message: "success",
            //     data: [{
            //         id: 3874,
            //         accountName: "卡说账户321321",
            //         totalLimit: 582,
            //         totalPrincipal: 12485,
            //         balanceLimit: 744,
            //         balancePrincipal: 58000,
            //         currentDiscount: "80%",
            //         firstRechargeTime: "2016-04-29 12:12:12",
            //         recycleCount: 15,
            //         priorLevel: 3,
            //         supplyMerchant:"" ,
            //         remarks:""
            //     }],
            //     total: 25
            // }
            return http.post('./limitPurchaseAccount/list',data)
        }
    }

}


module.exports = member_model

