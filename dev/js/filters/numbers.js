/**
 * author zjhDesigner
 * [过滤 ，只留合法数值]
 * @param  {[type]} index     [合法数值]
 */
exports.numbers = (val)=>{
	val=val.replace(/\D/g,'');
	return val;
}



