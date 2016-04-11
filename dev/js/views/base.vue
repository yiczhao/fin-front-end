<template>
    <index title="交易明细" title-align="tc" title-bk-color="#f2f2f2" title-ft-color="#424242">
        <div class="content-wrapper" slot="content">
           <section class="content-header">
            <div>
                <ol class="breadcrumb">
                    <li><a v-link="{'name':'default'}">首页</a></li>
                    <li><a v-link="{'name':'trade-info'}">财务处理</a></li>
                    <li class="active">交易明细</li>
                </ol>
            </div>
        </section>
        <section class="content">
            
        </section>
        </div>
    </index>
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
           
        }
    }
</script>