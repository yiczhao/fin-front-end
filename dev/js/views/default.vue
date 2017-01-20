<template>
    <index isshow="">
            <section class="content-wrapper" slot="content">
                <div class="col-xs-12" style="background: #fff;padding: 20px;">
                    <p>[财务管理系统]欢迎您!</p>
                    <p>尊敬的[{{loginList.trueName}}]您好! 这是您第[{{loginList.loginedCount}}]次登录本系统!</p>
                    <p>最近一次登录时间：{{loginList.lastLoginedTime | datetime}} 最近一次登录IP地址：{{loginList.lastLoginedAddr}}</p>
                </div>
            </section>
    </index>
</template>
<script>
    import Cookie from '../utils/Cookie'
    export default{
        data(){
            return{
                loginList:{}
            }
        },
        components:{
        },
        ready(){
            this.$http.post(this.$API.login,{username:Cookie.get('KSAuthUserName')})
                    .then((response)=>{
                        debugger
                        if(response.data.code===0){
                            sessionStorage.setItem('userData',JSON.stringify(response.data.data));
                            this.loginList=JSON.parse(sessionStorage.getItem('userData'));
                            $('body').removeClass('login');
                            $('.message-notify.show,.message-notify').css('top','6px');
                        }
                    });
        }
    }
</script>