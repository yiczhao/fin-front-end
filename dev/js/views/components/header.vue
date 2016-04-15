<template>
    <header class="main-header">
        <a v-link="{name:'default'}" class="logo">
            <span class="logo-lg"><b>财务管理系统</b></span>
        </a>
        <nav class="navbar navbar-static-top">
            <div class="navbar-custom-menu">
                <div class="pull-right">
                    您好，<span v-text="uname"></span> <a href="javascript:void(0);" v-on:click="loginout" class="">退出</a>
                </div>
            </div>
        </nav>
    </header>
</template>
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
                this.$http.post('./passport/loginout')
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
            (!!sessionStorage.getItem('userData')) ? this.$set('uname',JSON.parse(sessionStorage.getItem('userData')).trueName) : null;
        }
    }
</script>


