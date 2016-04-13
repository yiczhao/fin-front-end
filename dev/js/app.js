/**
 * 入口文件
 * @author cwxtDesigner
 */

require('../sass/app.scss');

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import validator from 'vue-validator'
import store from './store.js'
import filters from './filters'
import directives from './directives'
import routers from './routers.js'
import interceptor from './interceptor.js'
// *** 公共组件
import Index from './views/components/index.vue'
import page from './views/components/page.vue'
Vue.component('index', Index);
Vue.component('page', page);
// *** 引入filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
// *** 引入directive
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]));

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(validator);
Vue.use(store);

// console.log(validator);
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
Vue.config.debug = true;