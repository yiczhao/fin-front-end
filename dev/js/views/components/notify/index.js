import Vue from 'vue'
import {camelcaseToHyphen } from '../../../utils'
import Notify from './notify.vue'

Notify.instance =  propers=> {


	const data = propers || {}
    let props = ''
    Object.keys(data).forEach(item => {
    	props += ' :' + camelcaseToHyphen(item) + '=' + item
    })
	const div = document.createElement('div')
	div.innerHTML = `<notify ${props}></notify>`
	document.body.appendChild(div)

	const notify = new Vue({
        el: div,
        data: data,
        components: {
            Notify
        }
    }).$children[0]

    notify.count = 0
	
    return {
        
        // notice(noticeProps) {
        //     notify.add(noticeProps)
        // },

        // removeNotice(key) {
        //     notify.remove(key)
        // },

        show(type,content,duration,on_end) {

            notify.count++
        	var types = ['info','success','error','loading']
        	if(!~types.indexOf(type)){
                on_end = duration
        		duration = content
        		content = type
            }else{
                type && (notify.className = 'message-'+type+'-notify')
                type && (notify.icon = 'message-'+type+'-icon')
            }
            
            notify.content = content || ''
            notify.duration = duration || ''

            if(notify.duration){
                notify.on_end = on_end
                notify.auto_hide()
                notify.count = 0
                
            }
        	notify.show = true
            
            
        },
        hide() {
            notify.count--
            if(notify.count <=0 ) notify.show = false

        	
        },
        // component: notify,
        destory() {
            document.body.removeChild(div)
        }
    }
}


if(!window.Message) {
	window.Message = Notify.instance()
}


export default Notify