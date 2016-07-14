exports.filter_date = (value) => {
	if(value==null || value=='')return '';
	var time = new Date(value);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	function add0(m){return m<10?'0'+m:m }
	return y+'-'+add0(m)+'-'+add0(d);
}

