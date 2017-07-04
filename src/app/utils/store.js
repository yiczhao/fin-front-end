/**
 * [本地存储]
 */
import store from 'store'
export default function install(Vue) {
	// Vue.prototype.$store = store
	
	Object.defineProperties(Vue.prototype, {
		$store:{
			get:function(){
				return store
			}
		}
	})
	

}