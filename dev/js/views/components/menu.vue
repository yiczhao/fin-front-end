<template>
    <div class="sidebar sidebar-main">
        <div class="sidebar-content" style="min-height: 750px">
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
                        <li>
                            <a v-link="{'name':'default'}">
                                <span>首页</span></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" class="has-ul">
                                <span>财务处理</span>
                            </a>
                            <ul class="hidden-ul">
                                <li><a v-link="{'name':'account-management'}">账户管理</a></li>
                                <li><a v-link="{'name':'trade-info'}">交易明细</a></li>
                                <li>
                                    <a href="javascript:void(0);" class="has-ul">备付金支出</a>
                                    <ul class="hidden-ul">
                                        <li><a v-link="{'name':'payment-details'}">付款明细</a></li>
                                        <li><a v-link="{'name':'subsidy-appropriation'}">补贴划付</a></li>
                                        <li><a v-link="{'name':'subsidy-tax-rebate'}">补贴退税</a></li>
                                        <li><a v-link="{'name':'limit-purchase-detail'}">额度采购</a></li>
                                        <li><a v-link="{'name':'advance-payment-detail'}">预付款划付</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="has-ul">商户管理</a>
                                    <ul class="hidden-ul">
                                        <li><a v-link="{'name':'business-lists'}">商户管理</a></li>
                                        <li><a v-link="{'name':'business-limit'}">额度采购</a></li>
                                        <li><a v-link="{'name':'prepayment-lists'}">预付款</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:void(0);" class="has-ul">
                                <span>系统配置</span>
                            </a>
                            <ul class="hidden-ul">
                                <li><a v-link="{'name':'user-managerment'}"></i>员工管理</a></li>
                                <li><a v-link="{'name':'log-management'}"></i>系统日志</a></li>
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
            var router_type = this.$route.router_type;
            // console.log(JSON.parse(JSON.stringify(this.menus[0].sub_menu)),this.menus[0].sub_menu[router_type])
            if(this.menus[0].sub_menu[router_type]){
                this.menus[0].open = true
                this.menus[0].sub_menu[router_type].open = true
            }
            // Main navigation
            $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
                e.preventDefault();
                // Collapsible
                $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);
                // Accordion
                if ($('.navigation-main').hasClass('navigation-accordion')) {
                    $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
                }
            });
            var nowa= $('.navigation').find('.v-link-active').closest('.hidden-ul');
            if(!nowa.length){
                $('.v-link-active').parent('li').addClass('active');
            }else{
                nowa.show().parent('li').addClass('active');
                if(nowa.closest('.hidden-ul').is(':hidden')){
                    nowa.parent('li').parent('.hidden-ul').show().parent('li').addClass('active');
                }
            }
        }
    }
</script>