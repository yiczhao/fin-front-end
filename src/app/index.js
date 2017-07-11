/**
 * 入口文件
 * @author cwxtDesigner
 */
import VueRouter from 'vue-router'
import config from  './config'
import filters from './filters'
import directives from './directives'
import routers from './routers.js'
import interceptor from './interceptor.js'
// *** 公共组件

import common from  './utils/common'
import store from './utils/store.js'
import API from './ajax/api.js'
import common_model from './ajax/components/model.js'
import serviceInstall from './service/install.js'
import components from './views/components'
// *** 引入filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
// *** 引入directive
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]));

Vue.use(components)
Vue.use(VueRouter);
Vue.use(store);
Vue.use(API);
Vue.use(common_model);
// *** 实例化VueRouter
let router = new VueRouter({
	hashbang: true,
	history: false,
	saveScrollPosition: true,
	transitionOnLoad: true
});
let app = Vue.extend({});
// Service.router = routers(Vue);
// Service.router.start(app,'#app');
routers(router);
router.start(app, "#app");

Vue.set(app, '_userData', {});
Vue.use(interceptor,router);
// 配置
config.mock(Vue,false)
config.proxy(Vue,false)
// config.mock(Vue,true)
// config.proxy(Vue,true)
window.check_upload=common.check_upload;
window.dialogs=common.dialogs;
window.init_date=common.init_date;
window.accMul=common.accMul;
window.removeCookie=common.removeCookie;
window.onbeforeunload=()=>{
	localStorage.clear();
}
Vue.config.debug = true;