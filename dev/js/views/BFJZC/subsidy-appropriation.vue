<template>
    <index title="补贴划付" ptitle="备付金之出"  isshow="isshow">
        <section class="content" slot="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header"></div>
                        <div class="box-body">
                            <table id="table1" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>生成日期</th>
                                        <th>分公司</th>
                                        <th>城市</th>
                                        <th>付款账户</th>
                                        <th>商户ID</th>
                                        <th>商户名称</th>
                                        <th>收款账户信息</th>
                                        <th>生成方式</th>
                                        <th>三方应补</th>
                                        <th>划付金额</th>
                                        <th>交易</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                        <th>活动名称</th>
                                        <th>备注</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="!!subsidyAppropriationList.length" v-for="sa in subsidyAppropriationList">
                                        <td>{{}}</td>
                                        <td>{{}}</td>
                                        <td>{{}}</td>
                                        <td>{{}}</td>
                                        <td>{{}}</td>
                                        <td>{{}}</td>
                                        <td>{{}}</td>
                                        <td>{{}}</td>
                                        <td>{{}}</td>
                                        <td>{{}}</td>
                                        <td>{{}}</td>
                                        <td>{{}}</td>
                                        <td>{{}}</td>
                                        <td>{{}}</td>
                                        <td>{{}}</td>
                                    </tr>
                                </tbody>
                        </div>
                    </div>
                </div>
            </div>
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
                id:'',
                subsidyAppropriationList:[]
            }
        },
        components:{
           
        }
    }
</script>