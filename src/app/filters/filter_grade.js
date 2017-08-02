/**
 * author zdzDesigner
 * [渲染等级 序列等级转换为中文]
 * @param  {[type]} index     [序列 0、1、2 ...]
 * @return {[type]}           [中文等级 一、二、三 ...]
 */
exports.filter_grade = (index) => {
	// console.log(index)
    var arr = ['一','二','三','四','五','六','七','八','九','十']
    return arr[index]

}

