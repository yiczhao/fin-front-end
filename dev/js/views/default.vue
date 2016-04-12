<style>
    .col-xs-12{
        background: #fff;
        padding: 30px;
    }
</style>
<template>
    <index title="首页" isshow="">
            <section class="content" slot="content">
                <div class="col-xs-12">
                    <p>[财务管理系统]欢迎您!</p>
                    <p>尊敬的[{{loginList.uname}}]您好! 这是您第[{{loginList.timenum}}]次登录本系统!</p>
                    <p>最近一次登录时间：{{loginList.utime}} 最近一次登录IP地址：{{loginList.uip}}</p>
                </div>
            </section>
    </index>
</template>
<script>
    export default{
        data(){
            return{
                loginList:{}
            }
        },
        components:{
            
        },
        ready:function(){
            // *** 请求用户数据
            this.$http.get('/dev/js/postjson/default.json',{})
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('loginList', response.data.dataLists) : null;
                    }, function (response) {
                        console.log(response);
                    });
        },
        props:{

        }
    }
</script>