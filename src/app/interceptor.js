/**
 * 拦截器
 * @author yiczhao
 */
import config from './config'
import Cookie from './utils/Cookie'
import md5 from 'blueimp-md5'
export default function install(Vue,router_proto) {
	var conut;
	window.origin && (Vue.http.options.root = window.origin );
	Vue.http.options.emulateJSON = false;
	Vue.http.interceptors.push({
		request (request) {
			if(request.url.indexOf('tradeDetail/list')<=0&&request.url.indexOf('auth/usersystem/list')<=0&&request.url.indexOf('subCompany/list')<=0&&request.url.indexOf('city/list')<=0&&request.url.indexOf('bankAccount/account/list')<=0&&request.url.indexOf('/total')<=0&&request.url.indexOf('/sum')<=0){
				Message.show('loading','loading...');
				sessionStorage.setItem('isHttpin',1);
				if(request.url.indexOf('pageIndex=')>0&&request.url.indexOf('pageSize=')>0){
					document.querySelector('.no-list').style.display='none';
				}
			}
			conut=0;
			let _appkey = 'cxcx2bles6w15xfehrbsb8vaeqwge75d7mybz8f0'
			let _secretkey = 'hsmpaf6wdryq8v5c7xsbtli7rjh45a75w9k6ejw9'
			let _now=Date.now();
			let authtoken=md5(_appkey+_now+_secretkey);
			let token=(!!Cookie.get('KSAuthUserToken')) ? Cookie.get('KSAuthUserToken') : null;
			let fintoken=(!!sessionStorage.getItem('userData')) ? JSON.parse(sessionStorage.getItem('userData')).authToken : null;
			request.headers['X-AUTH-TIME']=_now;
			request.headers['X-AUTH-APPKEY']=_appkey;
			request.headers['X-AUTH-TOKEN']=authtoken;
			request.headers['X-USER-TOKEN'] =token;
			request.headers['X-Fin-Token'] =fintoken;
			// config.mock_get(Vue,request)
			return request;
		},
		response (response) {
			sessionStorage.setItem('isHttpin',0);
			if(response.request.url.indexOf('tradeDetail/list')<=0&&response.request.url.indexOf('auth/usersystem/list')<=0&&response.request.url.indexOf('subCompany/list')<=0&&response.request.url.indexOf('city/list')<=0&&response.request.url.indexOf('/total')<=0&&response.request.url.indexOf('/sum')<=0){
				Message.hide();
				if((response.data.data==''||response.data.data==null||typeof response.data.data=='undefined')&&response.request.url.indexOf('pageIndex=')>0&&response.request.url.indexOf('pageSize=')>0){
					document.querySelector('.no-list').style.display='block';
				}
			}
			// *** 拦截session过期
			if(response.data.code === 50000){
			  setTimeout(()=>{
				  window.location.href = authUrl1;
			  })
			}
			else if(response.status===403){
				dialogs('error',response.data.message);
				conut++;
			}
			else if(response.status===504){
				dialogs('error','网络拥堵，请求超时，请稍后再试！');
				conut++;
			}
			else if(!response.ok&&conut===0){
				dialogs('error','系统错误,请及时联系开发人员解决！');
				conut++;
			}
			else if(response.data.code !== 0&&response.data.code !== 10000){
				dialogs('error',response.data.message);
				conut++;
			}
			return response;
		}
	});

}