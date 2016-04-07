<template>
    <nv-header :name="name"></nv-header>
    <nv-menu></nv-menu>
    <div class="content-wrapper">
        <section class="content">
            <div class="col-xs-12">
                <p>[财务管理系统]欢迎您!</p>
                <p>尊敬的[{{name}}]您好! 这是您第[{{timenum}}]次登录本系统!</p>
                <p>最近一次登录时间：{{utime}} 最近一次登录IP地址：{{uip}}</p>
            </div>
        </section>
    </div>
    <nv-footer></nv-footer>
</template>
<script>
    export default{
        data(){
            return{
                name:'xxxx',
                timenum:123,
                utime:'2015/7/29 10:19:19',
                uip:'192.168.1.1'
            }
        },
        components:{
        }
    }
</script>