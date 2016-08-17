'use strict'

export default function(router){
    router.map({
        /* 登录 */
        '/login':{
            name:'login',
            component: function(resolve){
                require(['./views/login.vue'],resolve);
            }
        },
        /* 首页 */
        '/default/':{
            name:'default',
            component: function(resolve){
                require(['./views/default.vue'],resolve);
            }
        },
        //账户列表
        '/account-management':{
            name:'account-management',
            component: function(resolve){
                require(['./views/AccountManagement/account-management.vue'],resolve);
            }
        },
        //账户明细
        '/provisions-info/:accountId/:certificate/:aname/:balance/:subCompanyID':{
            name:'provisions-info',
            component: function(resolve){
                require(['./views/AccountManagement/provisions-info.vue'],resolve);
            }
        },
        //交易处理-交易明细
        '/trade-info/:subsidyPayId/:subsidyTaxRebateId/:merchantOperationID/:merchantName/:activityOperationID/:serialNumber':{
            name:'trade-info',
            component: function(resolve){
                require(['./views/Transaction/trade-info.vue'],resolve);
            }
        },
        //交易处理-交易白名单
        '/white-lists/':{
            name:'white-lists',
            component: function(resolve){
                require(['./views/Transaction/white-lists.vue'],resolve);
            }
        },
        //交易处理-异常交易
        '/Abnormal-transaction/':{
            name:'Abnormal-transaction',
            component: function(resolve){
                require(['./views/Transaction/Abnormal-transaction.vue'],resolve);
            }
        },
        //备付金支出-付款明细
        '/payment-details/:reserveCashOrderNumber/:payType/:merchantOperationIDs':{
            name:'payment-details',
            component: function(resolve){
                require(['./views/PaymentOfPayment/payment-details.vue'],resolve);
            }
        },
        //备付金支出-额度采购
        '/limit-purchase-detail/:id':{
            name:'limit-purchase-detail',
            component: function(resolve){
                require(['./views/PaymentOfPayment/limit-purchase-detail.vue'],resolve);
            }
        },
        //备付金支出-预付款划付
        '/advance-payment-detail/:advanceId':{
            name:'advance-payment-detail',
            component: function(resolve){
                require(['./views/PaymentOfPayment/advance-payment-detail.vue'],resolve);
            }
        },
        //备付金支出-补贴划付
        '/subsidy-appropriation/:subsidyPayID/:subsidySHid/:subsidyHDid':{
            name:'subsidy-appropriation',
            component: function(resolve){
                require(['./views/PaymentOfPayment/subsidy-appropriation.vue'],resolve);
            }
        },
        //备付金支出-补贴退税
        '/subsidy-tax-rebate/:subsidyTaxRebateID':{
            name:'subsidy-tax-rebate',
            component: function(resolve){
                require(['./views/PaymentOfPayment/subsidy-tax-rebate.vue'],resolve);
            }
        },
        /* 三方管理-账户列表 */
        '/third-party/':{
            name:'third-party',
            component: function(resolve){
                require(['./views/ThreeParty/third-party.vue'],resolve);
            }
        },
        /* 三方管理-账户明细 */
        '/third-info/:id/:serialNumber':{
            name:'third-info',
            component: function(resolve){
                require(['./views/ThreeParty/third-info.vue'],resolve);
            }
        },
        /* 商户管理-商户列表 */
        '/business-lists/':{
            name:'business-lists',
            component: function(resolve){
                require(['./views/BusinessManagement/business-lists.vue'],resolve);
            }
        },
        /* 商户管理-商户列表-活动管理 */
        '/merchat-activity-subsidy-account/:merchantID/:merchantName/:merchantOperationID':{
            name:'merchat-activity',
            component: function(resolve){
                require(['./views/BusinessManagement/merchat-activity-subsidy-account.vue'],resolve);
            }
        },
        /* 商户管理-额度采购 */
        '/business-limit/:id':{
            name:'business-limit',
            component: function(resolve){
                require(['./views/BusinessManagement/business-limit.vue'],resolve);
            }
        },
        /* 商户管理-额度采购账户列表 */
        '/limitaccount-management/:limitPurchaseMerchantInfoID/:accountName':{
            name:'limitaccount-management',
            component: function(resolve){
                require(['./views/BusinessManagement/limitaccount-management.vue'],resolve);
            }
        },
        /* 商户管理-额度采购账户明细 */
        '/limitaccount-info/:limitPurchaseMerchantInfoID/:accountName':{
            name:'limitaccount-info',
            component: function(resolve){
                require(['./views/BusinessManagement/limitaccount-info.vue'],resolve);
            }
        },
        /* 商户管理-预付款 */
        '/prepayment-lists/':{
            name:'prepayment-lists',
            component: function(resolve){
                require(['./views/BusinessManagement/prepayment-lists.vue'],resolve);
            }
        },
        /* 商户管理-预付款门店管理 */
        '/prepayment-store/:id/:storeMerchantName':{
            name:'prepayment-store',
            component: function(resolve){
                require(['./views/BusinessManagement/prepayment-store.vue'],resolve);
            }
        },
        /* 商户管理-预付款账户明细 */
        '/prepayment-info/:id/:orderNumber':{
            name:'prepayment-info',
            component: function(resolve){
                require(['./views/BusinessManagement/prepayment-info.vue'],resolve);
            }
        },
        /* 活动管理-活动列表 */
        '/activity-lists/:operationID/:name':{
            name:'activity-lists',
            component: function(resolve){
                require(['./views/Activity/activity-lists.vue'],resolve);
            }
        },
        /* 系统配置-员工管理 */
        '/user-managerment/':{
            name:'user-managerment',
            component: function(resolve){
                require(['./views/SystemConfiguration/user-managerment.vue'],resolve);
            }
        },
        /* 系统配置-日志管理 */
        '/log-management/':{
            name:'log-management',
            component: function(resolve){
                require(['./views/SystemConfiguration/log-management.vue'],resolve);
            }
        },
        /* 系统配置-日志管理 */
        '/uploadForm/':{
            name:'uploadForm',
            component: function(resolve){
                require(['./views/uploadForm.vue'],resolve);
            }
        },
        // 转到登录页
        '*':{
            component:function () {
                router.go({name:'login'})
            }
        }
    })
    router.beforeEach(transition =>{
        $(".modal").modal("hide");
        $("body").scrollTop(0);
        transition.next();
    });
}