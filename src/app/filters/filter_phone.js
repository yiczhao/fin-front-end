/**
 * author zdzDesigner
 * [phone格式 过滤]
 * @param  {[type]} input     [输入值]
 */
exports.filter_phone = function (val,input){
	// console.log(val,input)
	var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
	return !reg.test(input) && val
}
