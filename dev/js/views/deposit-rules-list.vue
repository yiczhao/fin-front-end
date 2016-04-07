<template>
    <nv-header :name="'飞洒发放'"></nv-header>
    <nv-menu></nv-menu>
    <div class="content-wrapper">
        <!-- Main content -->

        <!-- Main content -->
    </div>
    <nv-footer></nv-footer>
</template>
<style>
    #memberRules tr td {vertical-align: middle;}
</style>
<script>
    export default {
        data:function () {
            return {
                pointRules:[]
            }
        },
        ready: function () {
            // http://192.168.1.123:80/dist/data-member-rules.json
            // 'http://localhost:9000/dist/data-member-rules.json'
            // +'/level_setting/list'
            // *** 请求会员规则列表数据
            this.$http.post('./deposit/rule_list',{})
            .then(function (response) {
                // *** 判断请求是否成功如若成功则填充数据到模型
                !!response.data.result.length ? this.$set('pointRules', response.data.result) : null;
            }, function (response) {
                console.log(response);
            });
        },
        methods:{


        },
        components:{}
    }
</script>