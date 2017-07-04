/**
 * author zdzDesigner
 * [保留n为小数数字]
 * @param  {[type]} index     [小数长度 init]
 * 
 */
exports.filter_to_fixed = {

		// 在写回数据之前格式化值
		write: function(val, oldVal, arg) {
			
			var temp_val = val || '' ,
				reg =  new RegExp('^[0-9]+(\\.[0-9]{0,'+arg+'})?$'),
				reg2 = /^0[0-9]+$/
			
			if(reg2.test(temp_val)){
				temp_val = temp_val.substr(1)
			}

			if(reg.test(temp_val)){
				temp_val = temp_val
			}else{
				temp_val = (oldVal+'').length == 1 ? '' : oldVal
			}
			event.target.value = temp_val
			return temp_val
		}

}


