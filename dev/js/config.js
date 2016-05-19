import md5 from 'md5'
import date_format from 'date-format-lite'
/**
 * [模拟数据 配置]
 */
var mock = (Vue,ismock)=>{

    if(ismock){
        Vue.ismock = true
        /**
         * Mock 数据 必要配置
         * 添加 mock 标示在请求头中
         * mock参数解析为json (request payload)
         */
        Vue.http.headers.common['MOCK'] = true
        Vue.http.options.emulateJSON = false

    }else{
        Vue.http.options.emulateJSON = false
    }

}

var mock_get =  (Vue,request) => {
    request.beforeSend = function () {
        if(Vue.ismock && request.method === 'GET'){
            request.method = 'POST'
            request.data = JSON.stringify(request.params)
        }
    }
}


/**
 * [node 代理配置]
 */
var proxy = (Vue,isproxy)=>{

    if(isproxy){
        console.log('proxy ....')
        /**
         * 代理 数据
         */
        Vue.http.options.root = '.'
        Vue.http.headers.common['DOMAIN'] = 'http://172.16.10.188:8080'
        // Vue.http.headers.common['DOMAIN'] = 'http://wxhb.kashuo.com/zdcrm-ws-1.0'
        // document.cookie='user=%7b%22uid%22%3a%22TmVTP54HnGY%3d%22%2c%22sid%22%3a%221hmipoAnlhg%3d%22%2c%22mid%22%3a%22eymfLeTkMnn5G5LDBwWA%2fBvIE3Le0OQz%22%2c%22name%22%3a%22%e8%b0%8c%e4%ba%91%e5%b3%b0%22%2c%22phone%22%3a%2213166430721%22%2c%22mname%22%3a%22%e4%b8%87%e8%be%be%e5%95%86%e6%88%b7%22%2c%22uidm%22%3a%22E4DA3B7FBBCE2345D7772B0674A318D5%22%7d; IMPOWER_INFO={"mid":"1607402179315712","appid":"wx28def492d7e39cbc","openid":"6807633251404492"}'
        // document.cookie='user='+encodeURIComponent(JSON.stringify({"uid":"TmVTP54HnGY=","sid":"1hmipoAnlhg=","mid":"m002","name":"谌云峰","phone":"13166430721","mname":"海底捞","uidm":"E4DA3B7FBBCE2345D7772B0674A318D5"}))
    }else{
        // Vue.http.options.root = window.origin || 'http://wxhb.kashuo.com/zdcrm-ws-1.0'
        Vue.http.options.root = window.origin || 'http://172.16.10.188:8080'
        Vue.http.options.emulateJSON = false
    }
}
/**
 * 鉴权配置
 */
var auth = (request)=>{
    var now = new Date()
    var app_key = 'cfda7cc5068caf908a72556a6c4116c5'
    var secret_key = '1dcf0bd968afbee005f4b239cf2982e1'
    var X_AUTH_TIME = now.format('YYYYMMDDhhmmss')
    var X_AUTH_TOKEN = md5(app_key+X_AUTH_TIME+secret_key)
    if('http://zd.kashuo.com/api/Store/SePos'!=request.url){
        request.headers['X-AUTH-TIME'] = X_AUTH_TIME
        request.headers['X-AUTH-APPKEY'] = app_key
        request.headers['X-AUTH-TOKEN'] = X_AUTH_TOKEN
    }
}

module.exports = {
    mock:mock,
    mock_get:mock_get,
    proxy:proxy,
    auth:auth
}