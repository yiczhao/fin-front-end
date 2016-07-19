<template>
    <div class="navbar navbar-inverse">
        <div class="navbar-header" style="font-size: 24px;line-height: 24px;padding: 10px 18px;">
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
                                this.$router.go({name:'login'});
                            }
                            else{
                                alert(response.data.message);
                            }
                        }, function (response) {
                            console.log(response);
                        });

            }
        },
        ready(){
            if(!!sessionStorage.getItem('userData')) {
                this.$set('uname',JSON.parse(sessionStorage.getItem('userData')).trueName)
            }else{
                this.$router.go('login');
            }
        }
    }
</script>


