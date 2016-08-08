exports.filter_dates = (value) => {
	if(value==null || value=='')return '';
	var time = new Date(value);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	function add0(m){return m<10?'0'+m:m }
	return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

