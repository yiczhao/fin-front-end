'use strict'

export default function(router){
	// console.log('routers')
    router.map({
        //账户管理
        '/account-management':{
            name:'account-management',
            router_type:'deposit',
            component: function(resolve){
                // console.log('member-new',resolve)
                require(['./views/account-management.vue'],resolve);
            }
        },
        /* 首页 */
        '/index':{
            name:'index',
            router_type:'deposit',
            component: function(resolve){
                // console.log('member-new',resolve)
                require(['./views/index.vue'],resolve);
            }
        },
        /* 404路由 */
        '*': {
            component: function(resolve){
                router.go({ name: 'index'})
                // require(['./views/index.vue'],resolve);
            }
        }
    })
}