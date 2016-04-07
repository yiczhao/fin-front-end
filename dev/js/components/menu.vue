<template>
	 <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
         <aside class="main-sidebar">
             <section class="sidebar">
                 <ul class="sidebar-menu">
                     <li class="header">功能导航</li>
                     <li class="treeview">
                         <a v-link="{'name':'index'}">
                             <span>首页</span></i>
                         </a>
                     </li>
                     <li class="treeview active">
                         <a href="javascript:void(0);">
                             <span>财务处理</span><i class="fa fa-angle-left pull-right"></i>
                         </a>
                         <ul class="treeview-menu menu-open" style="display: block;">
                             <li><a v-link="{'name':'account-management'}"><i class="fa fa-circle-o"></i>账户管理</a></li>
                             <li><a href="#"><i class="fa fa-circle-o"></i>交易明细</a></li>
                             <li><a href="#"><i class="fa fa-circle-o"></i>3211佣金明细</a></li>
                             <li class="treeview">
                                 <a href="#"><i class="fa fa-circle-o"></i>本金收入<i class="fa fa-angle-left pull-right"></i></a>
                                 <ul class="treeview-menu">
                                     <li><a href="#"><i class="fa fa-circle-o"></i>入账明细</a></li>
                                     <li><a href="#"><i class="fa fa-circle-o"></i>交易入账</a></li>
                                     <li><a href="#"><i class="fa fa-circle-o"></i>商户退款</a></li>
                                 </ul>
                             </li>
                             <li class="treeview">
                                 <a href="#"><i class="fa fa-circle-o"></i>备付金支出<i class="fa fa-angle-left pull-right"></i></a>
                                 <ul class="treeview-menu">
                                     <li><a href="#"><i class="fa fa-circle-o"></i>付款明细</a></li>
                                     <li><a href="#"><i class="fa fa-circle-o"></i>补贴划付</a></li>
                                     <li><a href="#"><i class="fa fa-circle-o"></i>额度采购</a></li>
                                     <li><a href="#"><i class="fa fa-circle-o"></i>补贴退税</a></li>
                                     <li><a href="#"><i class="fa fa-circle-o"></i>预付款划付</a></li>
                                     <li><a href="#"><i class="fa fa-circle-o"></i>供货商划付</a></li>
                                 </ul>
                             </li>
                             <li class="treeview">
                                 <a href="#"><i class="fa fa-circle-o"></i>佣金支出<i class="fa fa-angle-left pull-right"></i></a>
                                 <ul class="treeview-menu">
                                     <li><a href="#"><i class="fa fa-circle-o"></i>付款明细</a></li>
                                 </ul>
                             </li>
                             <li><a href="#"><i class="fa fa-circle-o"></i>三方管理</a></li>
                             <li class="treeview">
                                 <a href="#"><i class="fa fa-circle-o"></i>商户管理<i class="fa fa-angle-left pull-right"></i></a>
                                 <ul class="treeview-menu">
                                     <li><a href="#"><i class="fa fa-circle-o"></i>商户管理</a></li>
                                     <li><a href="#"><i class="fa fa-circle-o"></i>额度采购</a></li>
                                     <li><a href="#"><i class="fa fa-circle-o"></i>预付款</a></li>
                                 </ul>
                             </li>
                             <li><a href="#"><i class="fa fa-circle-o"></i>代理商管理</a></li>
                             <li><a href="#"><i class="fa fa-circle-o"></i>会员管理</a></li>
                             <li><a href="#"><i class="fa fa-circle-o"></i>供货商管理</a></li>
                         </ul>
                     </li>
                     <li class="treeview">
                         <a href="#">
                             <span>活动管理</span><i class="fa fa-angle-left pull-right"></i>
                         </a>
                         <ul class="treeview-menu">
                             <li><a href="#"><i class="fa fa-circle-o"></i>活动列表</a></li>
                         </ul>
                     </li>
                     <li class="treeview">
                         <a href="#">
                             <span>佣金管理</span><i class="fa fa-angle-left pull-right"></i>
                         </a>
                         <ul class="treeview-menu">
                             <li><a href="#"><i class="fa fa-circle-o"></i>概况</a></li>
                             <li><a href="#"><i class="fa fa-circle-o"></i>自定义统计</a></li>
                         </ul>
                     </li>
                     <li class="treeview">
                         <a href="#">
                             <span>系统配置</span><i class="fa fa-angle-left pull-right"></i>
                         </a>
                         <ul class="treeview-menu">
                             <li><a href="#"><i class="fa fa-circle-o"></i>通道管理</a></li>
                             <li><a href="#"><i class="fa fa-circle-o"></i>角色管理</a></li>
                             <li><a href="#"><i class="fa fa-circle-o"></i>员工管理</a></li>
                             <li><a href="#"><i class="fa fa-circle-o"></i>系统日志</a></li>
                         </ul>
                     </li>
                 </ul>
             </section>
         </aside>
         <!-- /.sidebar -->
    </aside>
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