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
            return http.get('./limitPurchaseAccount/list?' + decodeURIComponent($.param(data)))
        },
        selectRechargeInfoByID (data) {

            // data =
            // {
            //     "code": 0,
            //     "message": "success",
            //     "data": {
            //         "id": 1,
            //         "merchantID": 1667,
            //         "balanceLimit": 850,
            //         "balancePrincipal": 830,
            //         "collectionAccountName": "刘楠",
            //         "collectionAccountNumber": 6217002870014440018,
            //         "collectionBankName": "中国建设银行股份有限公司武汉神龙支行",
            //         "collectionBankNumber": 105521001099,
            //         "merchantName": "北京楚地人家长辛店店",
            //         "payAccount": "翟敬静"
            //     }
            // }
            return http.get('./limitPurchaseAccount/chargeInfo?' + decodeURIComponent($.param(data)))
        },
        recharge (data) {
            return http.post('./limitPurchaseAccount/charge',data)
        }
    }

}


module.exports = member_model

