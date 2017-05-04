exports.get_sub_company = (_id,lists) => {
	for(let i=0;i<lists.length;i++){
		if(_id==lists[i].subCompanyID){
			return lists[i].name;
			break;
		}
	}
}

