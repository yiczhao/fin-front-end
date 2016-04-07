<template>
    <nv-header :name="'飞洒发放'"></nv-header>
    <nv-menu></nv-menu>
    <div class="content-wrapper">
        <section class="content-header">
            <div>
                <ol class="breadcrumb">
                    <li><a v-link="{'name':'index'}">首页</a></li>
                    <li><a v-link="{'name':'account-management'}">财务处理</a></li>
                    <li class="active">账户管理</li>
                </ol>
            </div>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <form class="form-inline manage-form">
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" value="添加账户">
                                </div>
                                <div class="form-group">
                                    <select class="form-control">
                                        <option v-for="company in pointRules.companylists">{{company}}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select class="form-control">
                                        <option v-for="type in pointRules.typelists">{{type}}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="账号信息">
                                </div>
                                <div class="form-group">
                                    <input type="button" class="btn btn-info" value="查询">
                                </div>
                            </form>
                        </div>
                        <div class="box-body">
                            <table id="table1" class="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>分公司</th>
                                    <th>简称</th>
                                    <th>账户名</th>
                                    <th>账号</th>
                                    <th>开户行</th>
                                    <th>类型</th>
                                    <th>起始日期</th>
                                    <th>余额</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="trlist in pointRules.zdlists">
                                    <td v-for="tdlists in trlist">
                                        <a v-link="{'name':{{tdlists.link1}}}" v-if="tdlists.link1">{{tdlists.mes1}}</a>
                                        <span v-else>{{tdlists.mes1}}</span>
                                        <a v-link="{'name':{{tdlists.link2}}}" v-if="tdlists.link2">{{tdlists.mes2}}</a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <nv-footer></nv-footer>
</template>
<script>
    export default{
        data(){
            return{
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
                        let udata= {
                            'companylists':['请选择分公司','南昌卡说','武汉卡说','上海卡说','苏州卡说'],
                            'typelists':['请选择类型','成功','失败','撤单'],
                            'zdlists':[
                                [
                                    {'mes1':'南昌卡说'},
                                    {'mes1':'南昌备付金'},
                                    {'mes1':'南昌卡说信息技术有限公司'},
                                    {'mes1':'3060440044040407044'},
                                    {'mes1':'中国建设银行南昌怡园支行'},
                                    {'mes1':'备付金'},
                                    {'mes1':'2016-01-01'},
                                    {'mes1':'123456','link1':'index'},
                                    {'mes1':'负责人','link1':'index','mes2':'通道管理','link2':'index'}
                                ],
                                [
                                    {'mes1':'南昌卡说'},
                                    {'mes1':'南昌备付金'},
                                    {'mes1':'南昌卡说信息技术有限公司'},
                                    {'mes1':'3060440044040407044'},
                                    {'mes1':'中国建设银行南昌怡园支行'},
                                    {'mes1':'备付金'},
                                    {'mes1':'2016-01-01'},
                                    {'mes1':'123456','link1':'index'},
                                    {'mes1':'负责人','link1':'index','mes2':'通道管理','link2':'index'}
                                ]
                            ]
                        };
                        this.$set('pointRules', udata)
                    });
        },
        methods:{


        },
        components:{}
    }
</script>