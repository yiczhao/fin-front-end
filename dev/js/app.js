/**
 * 入口文件
 * @author cwxtDesigner
 */
require('../sass/app.scss');
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import validator from 'vue-validator'
import config from  './config'
import filters from './filters'
import directives from './directives'
import routers from './routers.js'
import interceptor from './interceptor.js'
// *** 公共组件
import Index from './views/components/index.vue'
import page from './views/components/page.vue'
import datepicker from './views/components/datepicker.vue'
import getmonth from './views/components/vue-picker/picker.vue'
import ContentDialog from './views/components/ContentDialog.vue'
import common from  './utils/common'
import Auth from  './utils/KsAuth'
import store from './utils/store.js'
import API from './ajax/api.js'
import common_model from './ajax/components/model.js'
import notify_instance from './views/components/notify'
Vue.component('index', Index);
Vue.component('datepicker', datepicker);
Vue.component('getmonth', getmonth);
Vue.component('page', page);
Vue.component('ContentDialog', ContentDialog);
// *** 引入filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
// *** 引入directive
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]));

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(validator);
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