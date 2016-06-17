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
                require(['./views/CWCL/account-management.vue'],resolve);
            }
        },
        //账户明细
        '/provisions-info/:accountId/:certificate':{
            name:'provisions-info',
            component: function(resolve){
                require(['./views/CWCL/provisions-info.vue'],resolve);
            }
        },
        //交易明细
        '/trade-info/:subsidyPayId/:subsidyTaxRebateId/:merchantOperationID/:merchantName/:activityOperationID/:serialNumber':{
            name:'trade-info',
            component: function(resolve){
                require(['./views/CWCL/trade-info.vue'],resolve);
            }
        },
        //备付金支出-付款明细
        '/payment-details/:reserveCashOrderNumber/:payType':{
            name:'payment-details',
            component: function(resolve){
                require(['./views/BFJZC/payment-details.vue'],resolve);
            }
        },
        //备付金支出-额度采购
        '/limit-purchase-detail/:id':{
            name:'limit-purchase-detail',
            component: function(resolve){
                require(['./views/BFJZC/limit-purchase-detail.vue'],resolve);
            }
        },
        //备付金支出-预付款划付
        '/advance-payment-detail/:advanceId':{
            name:'advance-payment-detail',
            component: function(resolve){
                require(['./views/BFJZC/advance-payment-detail.vue'],resolve);
            }
        },
        //备付金支出-补贴划付
        '/subsidy-appropriation/:subsidyPayID':{
            name:'subsidy-appropriation',
            component: function(resolve){
                require(['./views/BFJZC/subsidy-appropriation.vue'],resolve);
            }
        },
        //备付金支出-补贴退税
        '/subsidy-tax-rebate/:subsidyTaxRebateID':{
            name:'subsidy-tax-rebate',
            component: function(resolve){
                require(['./views/BFJZC/subsidy-tax-rebate.vue'],resolve);
            }
        },
        /* 三方管理-账户列表 */
        '/third-party/':{
            name:'third-party',
            component: function(resolve){
                require(['./views/SFGL/third-party.vue'],resolve);
            }
        },
        /* 三方管理-账户明细 */
        '/third-info/:id':{
            name:'third-info',
            component: function(resolve){
                require(['./views/SFGL/third-info.vue'],resolve);
            }
        },
        /* 商户管理-商户列表 */
        '/business-lists/':{
            name:'business-lists',
            component: function(resolve){
                require(['./views/SHGL/business-lists.vue'],resolve);
            }
        },
        /* 商户管理-额度采购 */
        '/business-limit/:id':{
            name:'business-limit',
            component: function(resolve){
                require(['./views/SHGL/business-limit.vue'],resolve);
            }
        },
        /* 商户管理-额度采购账户列表 */
        '/limitaccount-management/:limitPurchaseMerchantInfoID/:accountName':{
            name:'limitaccount-management',
            component: function(resolve){
                require(['./views/SHGL/limitaccount-management.vue'],resolve);
            }
        },
        /* 商户管理-额度采购账户明细 */
        '/limitaccount-info/:limitPurchaseMerchantInfoID/:accountName':{
            name:'limitaccount-info',
            component: function(resolve){
                require(['./views/SHGL/limitaccount-info.vue'],resolve);
            }
        },
        /* 商户管理-预付款 */
        '/prepayment-lists/':{
            name:'prepayment-lists',
            component: function(resolve){
                require(['./views/SHGL/prepayment-lists.vue'],resolve);
            }
        },
        /* 商户管理-预付款门店管理 */
        '/prepayment-store/:id/:merchantName':{
            name:'prepayment-store',
            component: function(resolve){
                require(['./views/SHGL/prepayment-store.vue'],resolve);
            }
        },
        /* 商户管理-预付款账户明细 */
        '/prepayment-info/:id':{
            name:'prepayment-info',
            component: function(resolve){
                require(['./views/SHGL/prepayment-info.vue'],resolve);
            }
        },
        /* 活动管理-活动列表 */
        '/activity-lists/':{
            name:'activity-lists',
            component: function(resolve){
                require(['./views/HDGL/activity-lists.vue'],resolve);
            }
        },
        /* 系统配置-员工管理 */
        '/user-managerment/':{
            name:'user-managerment',
            component: function(resolve){
                require(['./views/XTPZ/user-managerment.vue'],resolve);
            }
        },
        /* 系统配置-日志管理 */
        '/log-management/':{
            name:'log-management',
            component: function(resolve){
                require(['./views/XTPZ/log-management.vue'],resolve);
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