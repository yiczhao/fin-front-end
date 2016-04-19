<template>
    <div class="sidebar sidebar-main">
        <div class="sidebar-content">
            <!-- User menu -->
            <div class="sidebar-user">
                <div class="category-content">
                    <div class="media">
                        <!--<a href="#" class="media-left"><img src="" class="img-circle img-sm" alt=""></a>-->
                        <div class="media-body">
                            <span class="media-heading text-semibold">财务管理系统</span>
                            <div class="text-size-mini text-muted">
                                <i class="icon-pin text-size-small">功能导航</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /user menu -->
            <!-- Main navigation -->
            <div class="sidebar-category sidebar-category-visible">
                <div class="category-content no-padding">
                    <ul class="navigation navigation-main navigation-accordion">
                        <li class="active">
                            <a v-link="{'name':'default'}">
                                <span>首页</span></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);">
                                <span>财务处理</span>
                            </a>
                            <ul class="hidden-ul" style="display: block">
                                <li><a v-link="{'name':'account-management'}">账户管理</a></li>
                                <li><a v-link="{'name':'trade-info'}">交易明细</a></li>
                                <li><a v-link="{'name':'subsidy-appropriation'}">补贴划付</a></li>
                                <li><a v-link="{'name':'subsidy-tax-rebate'}">补贴退税</a></li>
                                <li><a href="#">3211佣金明细</a></li>
                                <li>
                                    <a href="#" class="has-ul">本金收入</a>
                                    <ul class="hidden-ul">
                                        <li><a href="#">入账明细</a></li>
                                        <li><a href="#">交易入账</a></li>
                                        <li><a href="#">商户退款</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="has-ul">备付金支出</a>
                                    <ul class="hidden-ul">
                                        <li><a href="#">付款明细</a></li>
                                        <li><a href="#">补贴划付</a></li>
                                        <li><a href="#">额度采购</a></li>
                                        <li><a href="#">补贴退税</a></li>
                                        <li><a href="#">预付款划付</a></li>
                                        <li><a href="#">供货商划付</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">三方管理</a></li>
                                <li>
                                    <a href="#" class="has-ul">商户管理</a>
                                    <ul class="hidden-ul">
                                        <li><a href="#">商户管理</a></li>
                                        <li><a href="#">额度采购</a></li>
                                        <li><a href="#">预付款</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">代理商管理</a></li>
                                <li><a href="#">会员管理</a></li>
                                <li><a href="#">供货商管理</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" class="has-ul">
                                <span>活动管理</span>
                            </a>
                            <ul class="treeview-menu">
                                <li><a href="#">活动列表</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <span>佣金管理</span>
                            </a>
                            <ul class="treeview-menu">
                                <li><a href="#">概况</a></li>
                                <li><a href="#">自定义统计</a></li>
                            </ul>
                        </li>
                        <li class="treeview">
                            <a href="#">
                                <span>系统配置</span>
                            </a>
                            <ul class="treeview-menu">
                                <li><a href="#"></i>通道管理</a></li>
                                <li><a href="#"></i>角色管理</a></li>
                                <li><a href="#"></i>员工管理</a></li>
                                <li><a href="#"></i>系统日志</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /main navigation -->
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                menus:[
                    {
                        sub_menu:{
                            member:{open:false},
                            point:{open:false},
                            deposit:{open:false}
                        },
                        open:false
                    }
                ]
            }
        },
        methods:{
            toggle(index){
                this.menus[index].open = !this.menus[index].open
            }
        },
        ready(){
            var router_type = this.$route.router_type
            // console.log(JSON.parse(JSON.stringify(this.menus[0].sub_menu)),this.menus[0].sub_menu[router_type])
            if(this.menus[0].sub_menu[router_type]){
                this.menus[0].open = true
                this.menus[0].sub_menu[router_type].open = true
            }
        }
    }
</script>   