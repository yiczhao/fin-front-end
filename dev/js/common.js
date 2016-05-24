var check_upload=((names)=>{
    var FileName=new String(names);
    var extension=new String (FileName.substring(FileName.lastIndexOf(".")+1,FileName.length));
    if(extension=='rar'||extension=='zip'){
        return true;
    }
    else{
        swal({
            title: "请上传正确的文件格式(rar,zip)！",
            type:"error",
            confirmButtonColor: "#EF5350"
        });
        return false;
    }
})
var datetime=((value)=>{
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
})
var geturl=((url,lists)=>{
    for(let i=0;i<lists.length;i++){
        if(url==lists[i].url){
            return lists[i].description;
            break;
        }
    }
})
var dialog=((types,mes)=>{
    switch (types){
        case 'error':
            swal({
                title: mes,
                type: "error",
                confirmButtonColor: "#2196F3"
            })
            break;
        case 'success':
            swal({
                title: mes,
                type:"success",
                confirmButtonColor: "#2196F3"
            })
            break;
        default:
            swal({
                title: '保存成功',
                type:"success",
                confirmButtonColor: "#2196F3"
            })
            break;
    }

})
module.exports = {
    check_upload:check_upload,
    datetime:datetime,
    dialogs:dialog,
    geturl:geturl
}