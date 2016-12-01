exports.filter_string = (value,len) => {
	(value!=null&&value.length>len)?value=value.substring(0,len)+'...':value=value;
	return value;
}

