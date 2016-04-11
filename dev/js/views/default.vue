<style>
    .col-xs-12{
        background: #fff;
        padding: 30px;
    }
</style>
<template>
    <index title="会员特权" title-align="tc" title-bk-color="#f2f2f2" title-ft-color="#424242">
        <div class="content-wrapper" slot="content">
            <section class="content">
                <div class="col-xs-12">
                    <p>[财务管理系统]欢迎您!</p>
                    <p>尊敬的[{{uname}}]您好! 这是您第[{{timenum}}]次登录本系统!</p>
                    <p>最近一次登录时间：{{utime}} 最近一次登录IP地址：{{uip}}</p>
                </div>
            </section>
        </div>
    </index>
</template>
<script>
    export default{
        data(){
            return{
                uname:'123',
                timenum:123,
                utime:'2015/7/29 10:19:19',
                uip:'192.168.1.1'
            }
        },
        components:{
        },
        ready:function(){
//            console.log(this.$route.params);
        }
    }
</script>