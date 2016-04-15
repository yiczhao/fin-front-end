<template>
    <header class="main-header">
        <a href="#" class="logo">
            <span class="logo-lg"><b>财务管理系统</b></span>
        </a>
        <nav class="navbar navbar-static-top">
            <div class="navbar-custom-menu">
                <div class="pull-right">
                    您好，<span v-text="name"></span> <a href="javascript:void(0);" v-on:click="loginout" class="">退出</a>
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
                name:'',
            }
        },
        methods:{
            loginout() {
                console.log('loginout')
            }
        },
        ready(){
            (!!sessionStorage.getItem('userData')) ? this.$set('name',JSON.parse(sessionStorage.getItem('userData')).trueName) : null;
        }
    }
</script>


