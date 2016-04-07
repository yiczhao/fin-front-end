/*app.js*/
	require('../sass/app.scss');

	window.$ = require('jquery')
	import Vue from 'vue'
	import VueRouter from 'vue-router'
	import VueResource from './lib/vue-resource'
	import validator from 'vue-validator'
	import filters from './filters'
	import directives from './directives'
	import router_map from './routers'
	import md5 from 'md5'
	import date_format from 'date-format-lite'

	// 公共组件
	import nvHeader from './components/header.vue'
	import nvMenu from './components/menu.vue'
	import nvFooter from './components/footer.vue'
	import page from './components/page.vue'

// 引入filter
	Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
	// console.log(filters)
// 引入directive
	Object.keys(directives).forEach(k => Vue.directive(k, directives[k]))

	Vue.component('page' , page )
	Vue.component('nvHeader' , nvHeader )
	Vue.component('nvMenu' , nvMenu )
	Vue.component('nvFooter' , nvFooter )


	// 使用
	Vue.use(VueResource)
	Vue.use(VueRouter)
	Vue.use(validator)

//实例化VueRouter
	let router = new VueRouter({
	    hashbang: true,
	    history: false,
	    saveScrollPosition: true,
	    transitionOnLoad: true
	});

	router.beforeEach(transition =>{
		window.scrollTo(0,0)
		transition.next()
	})

	let app = Vue.extend({})

	router_map(router)

	router.start(app, "#app")

	Vue.config.debug = true;
// 拦截器
	// Vue.http.headers.common['Content-Type'] = 'application/json'
	// Vue.http.options.root = 'http://192.168.1.112:8080/crm'
	// Vue.http.options.root = 'http://192.168.1.136:8080/zdcrm-ws-1.0'
	// Vue.http.options.root = 'http://192.168.1.113:8080/zdcrm-ws'

	// {mid:'m002',sid:'1',uid:'1'}
	document.cookie='user='+encodeURIComponent(JSON.stringify({mid:'m002',sid:'1',uid:'1'}))+';domain=.kashuo.net'
	
	Vue.http.options.root = window.origin
	Vue.http.options.emulateJSON = true

	Vue.http.interceptors.push({
		request (request) {
			// Essage.show('00000')
			var now = new Date()
			var app_key = 'cfda7cc5068caf908a72556a6c4116c5'
			var secret_key = '1dcf0bd968afbee005f4b239cf2982e1'
			var X_AUTH_TIME = now.format('YYYYMMDDhhmmss')
			var X_AUTH_TOKEN = md5(app_key+X_AUTH_TIME+secret_key)
			// request.headers['Content-Type'] = 'application/json'
			request.headers['X-AUTH-TIME'] = X_AUTH_TIME
			request.headers['X-AUTH-APPKEY'] = app_key
			request.headers['X-AUTH-TOKEN'] = X_AUTH_TOKEN
			// request.headers['X-INFO-USER'] = encodeURIComponent(JSON.stringify({mid:'m002',sid:'1',uid:'1'}))
			// request.headers['Cookies'] = encodeURIComponent(JSON.stringify({mid:'m002',sid:'1',uid:'1'}))
			// request.headers['Cookie'] = encodeURIComponent(JSON.stringify({mid:'m002',sid:'1',uid:'1'}))
			
	    	return request
		},

		response (response) {
			// console.log(response.data.code)
			// Essage.hide()
	    	if(response.data.code === 10000) {return response}
		}
	})


	
	

