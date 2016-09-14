/**
 * author zdzDesigner
 * [过滤 ，只留合法数值]
 * @param  {[type]} index     [合法数值]
 */
exports.filter_number = {

		// 在写回数据之前格式化值
		write: function(val, oldVal, min, max) {
			// console.log(min)
			// console.log(max)
			
			var flag = false,number = +val.replace(/[^\d.]/g, '')

			if(number === 0) number = ''
			
			if(min && number<min){
				flag = true
			}
			if(flag){
				number = (oldVal+'').length == 1 ? '' : oldVal
			}


			event.target.value = number
			return number
		}

}


