exports.filter_length = (value) => {
	if(value==null || value=='')return '';
	if(value.length>9){
		return value.slice(0,9)+'...';
	}else{
		return value;
	}
}

