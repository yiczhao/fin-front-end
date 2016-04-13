'use strict'

export default function(router){
    router.map({
        //账户管理
        '/account-management':{
            name:'account-management',
            router_type:'deposit',
            component: function(resolve){
                require(['./views/CWCL/account-management.vue'],resolve);
            }
        },
        //交易明细
        '/trade-info':{
            name:'trade-info',
            router_type:'deposit',
            component: function(resolve){
                require(['./views/CWCL/trade-info.vue'],resolve);
            }
        },
        //补贴划付
        '/subsidy-appropriation':{
            name:'subsidy-appropriation',
            router_type:'deposit',
            component: function(resolve){
                require(['./views/BFJZC/subsidy-appropriation.vue'],resolve);
            }
        },
        /* 首页 */
        '/default/':{
            name:'default',
            router_type:'deposit',
            component: function(resolve){
                require(['./views/default.vue'],resolve);
            }
        },
        // 404
        '*':{
            component:function () {
                router.go({name:'default'})
            }
        }
    })
    router.beforeEach(transition =>{
        transition.next();
    });
}