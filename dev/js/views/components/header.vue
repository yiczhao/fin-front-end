<template>
    <div class="navbar navbar-inverse">
        <div class="navbar-header" style="padding: 10px 18px;">
            <img src="../../../images/header_logo.png" width="120" height="30">
        </div>

        <div class="navbar-header1" style="font-size: 14px;line-height: 30px;padding: 10px 0; float: left;">
            财务管理系统
        </div>

        <ul class="nav navbar-nav">
            <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>
        </ul>
        <div class="navbar-collapse collapse" id="navbar-mobile">
            <div class="navbar-right" style="margin: 13px;">
                您好，<span v-text="uname"></span> <a href="javascript:void(0);" v-on:click="loginout" class="">退出</a>
            </div>
        </div>
    </div>
</template>
<style>
    .navbar-inverse{
        padding: 5px 20px;
    }
</style>
<script>
    export default {
        props:{
        },
        data(){
            return {
                show:false,
                uname:'',
            }
        },
        methods:{
            loginout() {
                this.$http.post('./passport/loginOut')
                        .then(function (response) {
                            if(response.data.code===0){
                                sessionStorage.removeItem('userData');
                                removeCookie();
                                // 注销 cookie
                                if (window.KSAuthKit) {
                                    window.KSAuthKit.destroy()
                                }
                                this.$router.go({name:'login'});
                            }
                            else{
                                alert(response.data.message);
                            }
                        }, function (response) {
                        });

            }
        },
        created(){
        },
        ready(){
            this.uname=JSON.parse(sessionStorage.getItem('userData')).trueName;
        }
    }
</script>


