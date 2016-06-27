<template>
	<div :class="wrapClasses" :style="style">
  		<div :class="componentClass + '-content'" v-el:content>
			<i class="icon-spinner2 spinner"></i><span class="" v-text="content"></span>&nbsp;&nbsp;<a href="javascript:;" @click="close('force')">x</a>
		</div>
	</div>	
</template>
<script type="text/javascript">
	
	import {defaultProps , oneOfType} from '../../../utils'
	import cx from 'classnames'
	
	export default {
		props: defaultProps({
			prefixCls: 'message',
			duration: oneOfType([Number, 'Null']),
			content: '',
			style: {
				type: Object,
				default: function() {
					return {
						right:'50%',
//						position: 'absolute',
//						width: '100%',
//						height: '100%',
//						background: '#000',
//						top: '0',
//						zIndex: '9999',
//						opacity: '0.5',
					}
				}
			},
			closable: Boolean,
			className: String,
			icon:String,
			on_end: () => {},
			onClose: () => {}
		}),
		data() {
			return {
				show:false
			}
		},
		computed: {
			componentClass() {
				return `${this.prefixCls}-notify`
			},

			wrapClasses() {
				return cx({
					[this.componentClass]: 1, 
					[this.className]: !!this.className, 
					show:this.show,
					[`${this.componentClass}-closable`]: this.closable
				})
			},

			// icon() {
			// 	return cx({
			// 		iconDefault:this.iconDefault
			// 	})
			// }
		},

		methods: {
			_renderContent() {
				// const node = this.$els.content
				// const span = document.createElement('span')

				// console.log(node)
				// span.innerHTML = this.content
				// node.appendChild(span)
			},

			clear_close_timer() {
				if (this.closeTimer) {
					clearTimeout(this.closeTimer)
					this.closeTimer = null
				}

			},

			close(type) {
				// console.log(this.count)
				if('force' == type) this.count = 0
				this.clear_close_timer()
				this.onClose()
				this.show = false
			},
			auto_hide() {
				if (this.duration) {
					console.log('auto_hide')
					this.closeTimer = setTimeout(() => {
			        	this.on_end && this.on_end()
			        	this.close()

			      	}, this.duration * 1000)
				}
			},
			// 超10s强制销毁
			force_destroy(show) {
				if(this.duration) return
				this.clear_close_timer()
				if(show){
					this.closeTimer = setTimeout(()=>{
						this.close()
					},6000)
				}
			}
		},
		watch:{
		},

		ready() {
			this.clear_close_timer()
			
		}
	}
</script>
