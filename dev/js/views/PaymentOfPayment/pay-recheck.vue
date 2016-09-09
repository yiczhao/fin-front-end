<template>
    <index title="划付复核" ptitle="备付金支出"  isshow="isshow">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.paytype">
                                <option value="">全部付款方式</option>
                                <option value="0">备付金账户</option>
                                <option value="1">商户预付款账户</option>
                                <option value="2">银行结算</option>
                                <option value="3">其他</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.subCompanyID">
                                <option value="">全部分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.purpose">
                                <option value="">全部用途</option>
                                <option value="">补贴划付</option>
                                <option value="">补贴退税</option>
                                <option value="">税金体现</option>
                                <option value="">预付款</option>
                                <option value="">额度采购</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.status">
                                <option value="">全部状态</option>
                                <option value="7">等待复核</option>
                                <option value="9">复核通过</option>
                                <option value="8">复核不通过</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.createType">
                                <option value="">全部生成方式</option>
                                <option value="7">系统生成</option>
                                <option value="9">手工结算</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="checkForm.timeRange">
                                <option value="5">今天</option>
                                <option value="0">昨天</option>
                                <option value="1">最近一周</option>
                                <option value="2">最近一个月</option>
                                <option value="3">最近三个月</option>
                                <option value="4">自定义时间</option>
                            </select>
                        </div>
                        <div class="form-group" v-show="checkForm.timeRange==4">
                            <datepicker  :readonly="true" :value.sync="checkForm.startDate" format="YYYY-MM-DD"></datepicker>至
                            <datepicker  :readonly="true" :value.sync="checkForm.endDate" format="YYYY-MM-DD"></datepicker>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="checkForm.id" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" placeholder="请输入ID">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="checkForm.merchantOperationID" placeholder="请输入商户ID"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="checkForm.keywords"  placeholder="请输入商户名/收款账户名/账号">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="checkForm.remarks" placeholder="请输入备注关键词">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="请输入活动ID" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" v-model="checkForm.activityOperationID">
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" v-on:click="query">查询</a>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-info" v-on:click="payRecheckexcel">导出</a>
                        </div>
                        <br>
                        <div class="form-group">
                            <a class="btn btn-info" data-toggle="modal" @click="batchs">批量复核</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </index>
</template>
<style>
</style>
<script>
    export default {
        data(){
            return {
                checkForm:{
                    paytype:'',
                    subCompanyID:'',
                    purpose:'',
                    status:'',
                    createType:'',
                    timeRange:'3',
                    startDate:'',
                    endDate:'',
                    id:'',
                    merchantOperationID:'',
                    keywords:'',
                    remarks:'',
                    activityOperationID:'',
                }
            }
        },
        methods:{
            query(){

            },
            payRecheckexcel(){

            },
            batchs(){

            }
        }
    }
</script>
