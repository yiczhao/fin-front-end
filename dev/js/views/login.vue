<template>
    <div class="login-container">
        <div class="page-container" style="min-height:907px">
        <!-- Page content -->
        <div class="page-content">
            <!-- Main content -->
            <div class="content-wrapper">
                <!-- Content area -->
                <div class="content">
                    <!-- Simple login form -->
                    <form autocomplete="on">
                        <div class="panel panel-body login-form">
                            <div class="t200">财务管理系统</div>
                            <div class="form-group">
                                <span class="f18">请登录</span>
                            </div>
                            <div class="form-group has-feedback has-feedback-left">
                                <input @keyup.enter="login" type="text" class="form-control userName" name="username" v-model="username" placeholder="用户名" style="padding-left: 30px;">
                                 <div class="form-control-feedback">
                                    <i class="icon-user text-muted"></i>
                                </div>
                                <label v-show="usershow" class="validation-error-label" v-text="usererror"></label>
                            </div>
                            <div class="form-group has-feedback has-feedback-left">
                                <input @keyup.enter="login" type="password" class="form-control" name="password" v-model="password" placeholder="密码" style="padding-left: 30px;">
                                <div class="form-control-feedback">
                                    <i class="icon-lock2 text-muted"></i>
                                </div>
                                <label v-show="passshow" class="validation-error-label" v-text="passerror"></label>
                            </div>
                            <div class="form-group">
                                <span @click="login" v-bind:class="{ 'btn-default': isD,'btn-primary':!isD}" class="btn btn-block">登录</span>
                            </div>
                            <div class="form-group">
                                <label v-show="suberror" class="validation-error-label suberror" v-text="errortext"></label>
                            </div>
                        </div>
                    </form>
                    <!-- /simple login form -->
                    <!-- Footer -->
                    <!-- /footer -->
                </div>
                <!-- /content area -->
            </div>
            <!-- /main content -->
        </div>
        <!-- /page content -->
    </div>
    </div>
</template>
<style lang="sass">
    #app .login-container{
        .form-group{
            margin:0 0 30px;
        }
    }
    .login-container {
        .pd50{
            padding: 50px;
            .box-footer{
                text-align: center;
                .btn{
                    width:20%;
                    margin-top: 20px;
                }
            }
        }
        .page-container{
            min-height:auto!important;
            .login-form{
                position: relative;
                width: 870px;
                padding: 40px 80px 0 460px;
                height:360px;
                background: url("../../images/login_bg.png") no-repeat;
                .form-group{
                    .form-control-feedback{
                        top:3px;
                    }
                    .f18{
                        display: inline-block;
                        font-size: 18px;
                        color:#b0b0b0;
                    }
                    .form-control{
                        height: 42px;
                        border-color:#c8c8c8;
                    }
                    .btn-primary{
                        height: 42px;
                        line-height: 25px;
                        font-size: 16px;
                        background: #ee7839;
                        color:#fff;
                        border-color:#ee7839;
                    }
                }
                .t200{
                    position: absolute;
                    top:200px;
                    left: 130px;
                    font-size: 20px;
                    color:#fff;
                    font-weight: bold;
                    line-height: 100%;
                }
            }
        }
        .suberror{
            left: 75px;
        }
    }
    .login {
        .message-notify {
            .message-notify-content{
                border:0;
                background:none;
                box-shadow: none;
                i{
                    font-size: 20px;
                }
                a{
                    display: none;
                }
            }
        }
        .message-notify.show{
            left: 190px;
        }
    }
</style>
<script>
    import Cookie from '../utils/Cookie'
    import md5 from 'blueimp-md5'
    export default{
        data(){
            return{
                username:'',
                password:'',
                usererror:'',
                passerror:'',
                usershow:false,
                passshow:false,
                suberror:false,
                errortext:'',
                isD:false
            }
        },
        created(){
            function setCookie (key, value, expire) {
                var data = new Date()
                data.setDate(data.getDate() + expire)
                document.cookie = key + '=' + escape(value) +
                        ((expire === null) ? '' : ';expires=' + data.toGMTString())
            }
            // 移除用户 cookie
            setCookie('KSAuthUserToken', '', -1);
            setCookie('KSAuthJSURL', '', -1);
            setCookie('KSAuthApiURL', '', -1);
            setCookie('KSAuthSysId', '', -1);
            setCookie('JSESSTOKEN', '', -1);
            setCookie('JSESSID', '', -1);
            sessionStorage.removeItem('userData');
        },
        methods:{
            /**
             * @description Ajax request helper
             * @param config {Object} 配置
             * @param cb {Function} 成功回调.
             * @param errCb {Function} 失败回调.
             */
            xhrReq (config, cb, errCb) {
                var W=window;
                var xhr = null
                var xhrConfig = {
                    method: 'GET',
                    address: 'http://localhost/'
                }

                // 初始化配置项
                xhrConfig.method = config.method && config.method
                xhrConfig.address = config.address && config.address

                // 创建 XHR 对象
                // 非IE浏览器创建 XMlHttpRequest 对象
                // noinspection JSUnresolvedVariable
                if (W.XMLHttpRequest) {
                    // noinspection JSUnresolvedFunction
                    xhr = new W.XMLHttpRequest()
                }
                // IE浏览器创建XmlHttpRequest对象
                // noinspection JSUnresolvedVariable
                if (W.ActiveXObject) {
                    try {
                        // noinspection JSUnresolvedVariable
                        xhr = new W.ActiveXObject('Microsoft.XMLHTTP')
                    } catch (e) {
                        try {
                            // noinspection JSUnresolvedVariable
                            xhr = new W.ActiveXObject('msxml2.XMLHTTP')
                        } catch (ex) { }
                    }
                }
                let _appkey = 'p0obc8spr3ou8h35y1goejfod4ndngom83xzl90v'
                let _secretkey = 'vc9iwg6550dzznfxrwv8rupl0z8prqmxir6wogr4'
                let _now=Date.now();
                let token=md5(_appkey+_now+_secretkey)
                xhr.open(xhrConfig.method, xhrConfig.address, true)
                xhr.withCredentials = true;
                xhr.setRequestHeader('Accept', 'application/json, text/plain, */*')
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                xhr.setRequestHeader('X-AUTH-TIME',_now)
                xhr.setRequestHeader('X-AUTH-APPKEY',_appkey)
                xhr.setRequestHeader('X-AUTH-TOKEN',token)
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        cb(JSON.parse(xhr.responseText))
                    }
                    if (xhr.readyState === 4 && xhr.status !== 200) {
                        errCb(xhr.responseText)
                    }
                }
                return xhr
            },
            login(){
                this.suberror=false;
                if(this.username==''){this.usererror='请输入用户名';this.usershow=true;return;}
                if(this.password==''){this.passerror='请输入密码';this.passshow=true;return;}
                if(this.usershow||this.passshow||this.isD){return false;}
                this.isD=true;
//                let data={'login_name':this.username,'password':this.password,'sys_id':4};
                this.xhrReq(
                   {method: 'POST', address:window.authurl+'/auth/login/login'},
                        (response)=>{
                            if(response.code===10000){
                                var data=response.data;
                                //todo cookie 失效时间 7 日后
                                Cookie.set('KSAuthSysId', data.sys_id, {domain:'.kashuo.net',expires: 7})
                                // noinspection JSUnresolvedVariable
                                Cookie.set('KSAuthUserToken', data.user_token, {domain:'.kashuo.net',expires: 7})
                                // noinspection JSUnresolvedVariable
                                Cookie.set('KSAuthJSURL', data.js_url.replace('http://','https://'), {domain:'.kashuo.net',expires: 7,})
                                // noinspection JSUnresolvedVariable
                                Cookie.set('KSAuthApiURL', data.api_url.replace('http://','https://'), {domain:'.kashuo.net',expires: 7})
                                this.$http.post(this.$API.login,{username:data.login_name})
                                        .then((response)=>{
                                            if(response.data.code===0){
                                                sessionStorage.setItem('userData',JSON.stringify(response.data.data));
                                                $('body').removeClass('login');
                                                $('.message-notify.show,.message-notify').css('top','6px');
                                                this.$router.go({name:'default'});
                                            }
                                        });
                            }
                            else{
                                this.suberror=true;
                                this.errortext=response.message;
                            }
                            this.isD=false;
                        },()=>{
                             this.isD=false;
                        }
                ).send('login_name='+this.username+'&password='+this.password+'&sys_id=4');
            }
        },
        watch:{
          username(){
              if(this.username!=''){this.usererror='';this.usershow=false;this.suberror=false;}
          },
          password(){
              if(this.password!=''){this.passerror='';this.passshow=false;this.suberror=false;}
          },
          isD(){
               if(this.isD){
                   let pd=($('body').height()-$('.login-form').height())/2-80;
                   $('.message-notify.show,.message-notify').css('top',pd+335);
               }
          }
        },
        ready(){
            $('.userName').focus();
            $('body').addClass('login').removeClass('stop-scrolling');
            let pd=($('body').height()-$('.login-form').height())/2-80;
            $('.page-container').css('padding-top',pd);
        }
    }
</script>