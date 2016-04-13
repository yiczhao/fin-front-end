/**
 * 拦截器
 * @author zdzDesigner
 */

import md5 from 'md5'
import date_format from 'date-format-lite'

export default function install(Vue,router_proto) {

	window.origin && (Vue.http.options.root = window.origin );
	Vue.http.options.emulateJSON = false;
	Vue.http.interceptors.push({

		//request (request) {
		//	Message.show('loading','加载中...');
		//	return request
		//},

		//response (response) {
		//	Message.hide();
		//
		//	// *** 拦截session过期
		//	if(response.data.code === 50000){
		//	  setTimeout(()=>{
		//	    router_proto.go('login');
		//	  })
		//	}
		//	if(response.data.code === 30000){
		//	  Message.show('error',response.data.message,1);
		//	}
		//	return response
		//}

	});

}