<style>
    .navbar-custom-menu{
        padding: 13px 20px 0 0;
    }
</style>
<template>
    <div v-show="isshow=='isshow'" class="page-header page-header-default">
        <div class="breadcrumb-line">
            <ul class="breadcrumb">
                <li><a v-link="{'name':'default'}"><i class="icon-home2 position-left"></i> 首页</a></li>
                <li><a v-link="{'name':hname}" v-text="ptitle"></a></li>
                <li v-if="!p2title==''"><a v-link="{'name':h2name}" v-text="p2title"></a></li>
                <li class="active" v-text="title"></li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            isshow: {type: String, required: true},
            title: {type: String, required: true},
            ptitle: {type: String, required: true},
            p2title: {type: String, required: true},
            hname: {type: String, required: true},
            h2name: {type: String, required: false}
        },
        data(){
            return {
                show:false
            }
        },
        methods:{
        },
        ready(){
        }
    }
</script>


