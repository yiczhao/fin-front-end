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
        '/trade-info/:subsidyPayId/:subsidyTaxRebateId/:merchantOperationID/:merchantName':{
            name:'trade-info',
            component: function(resolve){
                require(['./views/CWCL/trade-info.vue'],resolve);
            }
        },
        //额度采购
        '/limit-purchase-detail':{
            name:'limit-purchase-detail',
            component: function(resolve){
                require(['./views/BFJZC/limit-purchase-detail.vue'],resolve);
            }
        },
        //预付款划付
        '/advance-payment-detail/:advanceId':{
            name:'advance-payment-detail',
            component: function(resolve){
                require(['./views/BFJZC/advance-payment-detail.vue'],resolve);
            }
        },
        //补贴划付
        '/subsidy-appropriation/:subsidyPayID':{
            name:'subsidy-appropriation',
            component: function(resolve){
                require(['./views/BFJZC/subsidy-appropriation.vue'],resolve);
            }
        },
        //补贴退税
        '/subsidy-tax-rebate/:subsidyTaxRebateID':{
            name:'subsidy-tax-rebate',
            component: function(resolve){
                require(['./views/BFJZC/subsidy-tax-rebate.vue'],resolve);
            }
        },
        //备付金支出交易明细
        '/payment-details/:reserveCashOrderNumber/:payType':{
            name:'payment-details',
            component: function(resolve){
                require(['./views/BFJZC/payment-details.vue'],resolve);
            }
        },
        /* 首页 */
        '/default/':{
            name:'default',
            component: function(resolve){
                require(['./views/default.vue'],resolve);
            }
        },
        /* 员工管理 */
        '/user-managerment/':{
            name:'user-managerment',
            component: function(resolve){
                require(['./views/XTPZ/user-managerment.vue'],resolve);
            }
        },
        /* 日志管理 */
        '/log-management/':{
            name:'log-management',
            component: function(resolve){
                require(['./views/XTPZ/log-management.vue'],resolve);
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
        '/business-limit/':{
            name:'business-limit',
            component: function(resolve){
                require(['./views/SHGL/business-limit.vue'],resolve);
            }
        },
        /* 商户管理-额度采购账户列表 */
        '/limitaccount-management/:merchantID':{
            name:'limitaccount-management',
            component: function(resolve){
                require(['./views/SHGL/limit-manage/limitaccount-management.vue'],resolve);
            }
        },
        /* 商户管理-额度采购账户明细 */
        '/limitaccount-info/':{
            name:'limitaccount-info',
            component: function(resolve){
                require(['./views/SHGL/limit-info/limitaccount-info.vue'],resolve);
            }
        },
        /* 商户管理-预付款 */
        '/prepayment-lists/':{
            name:'prepayment-lists',
            component: function(resolve){
                require(['./views/SHGL/prepayment-lists.vue'],resolve);
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