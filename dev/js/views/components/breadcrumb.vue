<style>
    .navbar-custom-menu{
        padding: 13px 20px 0 0;
    }
</style>
<template>
    <section class="content-header" v-if="isshow==='isshow'">
        <div>
            <ol class="breadcrumb">
                <li><a v-link="{'name':'default'}">首页</a></li>
                <li><a v-link="{'name':hname}" v-text="ptitle"></a></li>
<<<<<<< Updated upstream
=======
                <li v-show="!p2title == ''"><a v-link="{'name':hname}" v-text="p2title"></a></li>
>>>>>>> Stashed changes
                <li class="active" v-text="title"></li>
            </ol>
        </div>
    </section>
</template>
<script>
    export default {
        props:{
            isshow: {type: String, required: true},
            title: {type: String, required: true},
            ptitle: {type: String, required: true},
            hname: {type: String, required: true}
        },
        data(){
            return {
                show:false
            }
        },
        methods:{
            loginout() {
                console.log('loginout')
            }
        },
        ready(){
        }
    }
</script>


