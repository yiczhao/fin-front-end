exports.get_sum = (lists) => {
	if(!lists&&!lists.length)return;
	let sum=0;
	_.map(lists,(val)=>{
		sum += parseFloat(val);
	})
	return sum/100;
}

