exports.filter_string = (value,len) => {
	if(value.length>len)
		value=value.substring(0,len)+'...';
	return value;
}

