import Cookie from '../utils/Cookie'
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
window.check_upload_size=((size)=>{
    if(size > 3*1024*1024 ){  //用size属性判断文件大小不能超过5M
        swal({
            title: "文件必须小于3M！",
            type:"error",
            confirmButtonColor: "#EF5350"
        });
        return true;
    }else{
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
        case 'info':
            swal({
                title: mes,
                type:"info",
                confirmButtonColor:"#00BCD4"
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
var getTwo=((num)=>{
    if(num.toString().length>=2) return num;
    var str="";
    for(var i=num.toString().length;i<2;i++)
        str +="0";
    return str + num.toString();
})
var getLastDay=(( year, month)=>{
    var  day = new Date(year,month,0);
    var lastdate =day.getDate();//获取当月最后一天日期
    return lastdate;
})
var init_date=((type)=>{
    let d=new Date()
    let day=d.getDate()
    let month=d.getMonth()+1;
    let year=d.getFullYear()
    let startT;
    switch (type){
        case '0':
            day=day-1;
            var nmonth=month;
            var nday=day;
            if(nday==0){
                day=nday=getLastDay(year,month-1)
                month=nmonth=month-1
            }
            startT=year + "-" + getTwo(nmonth) + "-" + getTwo(nday);
            break;
        case '1':
            var nmonth=month;
            var nday=day-6;
            if(nday==-6){
                nday=getLastDay(year,month-1)-6
                nmonth=month-1
            }else if(nday==-5){
                nday=getLastDay(year,month-1)-5
                nmonth=month-1
            }else if(nday==-4){
                nday=getLastDay(year,month-1)-4
                nmonth=month-1
            }else if(nday==-3){
                nday=getLastDay(year,month-1)-3
                nmonth=month-1
            }else if(nday==-2){
                nday=getLastDay(year,month-1)-2
                nmonth=month-1
            }else if(nday==-1){
                nday=getLastDay(year,month-1)-1
                nmonth=month-1
            }else if(nday==0){
                nday=1
                nmonth=month
            }
            startT=year + "-" + getTwo(nmonth) + "-" + getTwo(nday);
            break;
        case '2':
            var nmonth=month-1;
            var nyear=year;
            if(nmonth==0){
                nmonth=12;
                nyear=year-1;
            }
            startT=nyear + "-" + getTwo(nmonth) + "-" + getTwo(day);
            break;
        case '3':
            var nmonth,nyear;
            if(month-3==0){
                nmonth=12;
                nyear=year-1;
            }else if(month-3==-1){
                nmonth=11
                nyear=year-1;
            }else if(month-3==-2){
                nmonth=10
                nyear=year-1;
            }else{
                nmonth=month-3;
                nyear=year;
            }
            startT=nyear + "-" + getTwo(nmonth) + "-" + getTwo(day);
            break;
        case '4':
            var nmonth,nyear;
            nmonth=month;
            nyear=year - 1;
            startT=nyear + "-" + getTwo(nmonth) + "-" + getTwo(day);
            break;
        case '5':
            startT=year + "-" + getTwo(month) + "-" + getTwo(day);
            break;
    }
    let endT=year + "-" + getTwo(month) + "-" + getTwo(day);
    return [startT,endT];
})
var accMul=(arg1,arg2)=> {
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
var removeCookie=()=> {
    Cookie.set('KSAuthSysId', '', {domain:'.kashuo.net',maxage: -1});
    // noinspection JSUnresolvedVariable
    Cookie.set('KSAuthUserToken', '', {domain:'.kashuo.net',maxage: -1});
    // noinspection JSUnresolvedVariable
    Cookie.set('KSAuthJSURL', '', {domain:'.kashuo.net',maxage: -1});
    // noinspection JSUnresolvedVariable
    Cookie.set('KSAuthApiURL', '', {domain:'.kashuo.net',maxage: -1});
    // noinspection JSUnresolvedVariable
    Cookie.set('JSESSTOKEN', '', {domain:'.kashuo.net',maxage: -1});
    // noinspection JSUnresolvedVariable
    Cookie.set('JSESSID', '', {domain:'.kashuo.net',maxage: -1});
    // noinspection JSUnresolvedVariable
    Cookie.set('XSRF-TOKEN', '', {domain:'.kashuo.net',maxage: -1});
    localStorage.clear();
};
window.getNow=()=>{
    var time = new Date();
    var y = time.getFullYear();
    var m = time.getMonth();
    return y+'-'+m;
};
window.firstMonth=()=>{
    var time = new Date();
    var y = time.getFullYear();
    var m = 1;
    return y+'-'+m;
};
window.getDate=(value,type)=>{
    if(value==null || value=='')return '';
    switch (type){
        case 'pre':
            var time = new Date(parseInt(value)-86400000);
            break;
        case 'next':
            var time = new Date(parseInt(value)+86400000);
            break;
        default:
            var time = new Date(parseInt(value));
            break;
    }
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    function add0(m){return m<10?'0'+m:m }
    return y+'-'+add0(m)+'-'+add0(d);
};

var _i={};
_i.fetchArray=(key)=>{
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
    }
    return [];
};
_i.saveArray=(key, value)=>{
    localStorage.setItem(key, JSON.stringify(value));
}
_i.isback=false;
_i.num=0;
window.back_json=_i;

$(document).on('click','.sidebar-main-toggle', function (e) {
    e.preventDefault();
    $('body').toggleClass('sidebar-xs');
});
$(document).on('click','a', function () {
    if(back_json.num==0){
        back_json.num++;
    }
});

module.exports = {
    check_upload:check_upload,
    datetime:datetime,
    dialogs:dialog,
    geturl:geturl,
    init_date:init_date,
    removeCookie:removeCookie,
    accMul:accMul
}