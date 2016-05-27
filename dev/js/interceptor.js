/**
 * 拦截器
 * @author zdzDesigner
 */
import config from './config'

export default function install(Vue,router_proto) {
	var conut;
	window.origin && (Vue.http.options.root = window.origin );
	Vue.http.options.emulateJSON = false;
	Vue.http.interceptors.push({
		request (request) {
			Message.show('loading','loading...');
			conut=0;
			var token=(!!sessionStorage.getItem('userData')) ? JSON.parse(sessionStorage.getItem('userData')).authToken : null;
			request.headers['X-Auth-Token']=token;
			config.mock_get(Vue,request)
			return request;
		},
		response (response) {
			Message.hide();
			// *** 拦截session过期
			if(response.data.code === 50000){
			  setTimeout(()=>{
				  router_proto.go({name:'login'});
			  })	
			}
			else if(!response.ok&&conut===0){
				dialogs('error','系统错误,请及时联系开发人员解决！');
				conut++;
			}
			else if(response.data.code !== 0){
				dialogs('error',response.data.message);
				conut++;
				return;
			}
			return response;
		}
	});

}