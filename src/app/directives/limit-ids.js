/**
 * author zjh
 *
 */
export default {
	twoWay: true,
	bind: function () {
		this.handler = function () {
			// 将数据写回 vm
			// 如果指令这样绑定 v-example="a.b.c"
			// 它将用给定值设置 `vm.a.b.c`
			let num=this.el.value.replace(/[^\d+\,\?$+\，\?$]/g,'');
			this.el.value = num;
			this.set(num)
		}.bind(this)
		this.el.addEventListener('keyup', this.handler)
	}
}