<template>
    <div class="navbar navbar-inverse">
        <div class="navbar-header">
            <a class="navbar-brand" v-link="{name:'default'}">
                <!--<img src="" alt="">-->
            </a>
        </div>
        <div class="navbar-collapse collapse" id="navbar-mobile">
            <div class="navbar-right" style="margin: 13px;">
                您好，<span v-text="uname"></span> <a href="javascript:void(0);" v-on:click="loginout" class="">退出</a>
            </div>
        </div>
    </div>
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
            if(!!sessionStorage.getItem('userData')) {
                this.$set('uname',JSON.parse(sessionStorage.getItem('userData')).trueName)
            }else{
                this.$router.go('login');
            }
        }
    }
</script>


