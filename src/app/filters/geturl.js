exports.geturl = (url,lists) => {
		for(let i=0;i<lists.length;i++){
			if(url==lists[i].url){
				return lists[i].description;
				break;
			}
		}
}

