

export default {
	bind: function () {
	    // 准备工作
	    // 例如，添加事件处理器或只需要运行一次的高耗任务
	},
	  
	unbind: function () {
	    // 清理工作
	    // 例如，删除 bind() 添加的事件监听器
	},
    // 每当绑定的数据变化时，这个函数就被调用啦
    update: function (value) {
         // 这里的 this 指向一个directive对象。
         // this.el 指向当前被绑定的DOM元素
         // value则是所绑定数据的新值
         // console.log(value)
         this.el.disabled = !!value
    }
}