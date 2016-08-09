<template>
    <div class="sidebar sidebar-main">
        <div class="sidebar-content">
            <!-- Main navigation -->
            <div class="sidebar-category sidebar-category-visible">
                <div class="category-content no-padding">
                    <ul class="navigation navigation-main navigation-accordion">
                        <!-- 生成菜单 -->
                        <template v-for="menu in menu_list">
                        <li :class="menu_status[$index] && 'km-open'" :data-ksa="menu.ksa">
                            <template v-if="menu.sub_menu.length>1">
                                <a class="has-ul" @click="menu_status.splice($index, 1, !menu_status[$index])">
                                    <i :class="menu.icon"></i><span v-text="menu.name"></span>
                                </a>
                                <ul v-show="menu_status[$index]" :data-parent="$index">
                                    <li v-for="sub_menu in menu.sub_menu"
                                        :class="sub_menu.link == current_menu && 'active'" :data-ksa="sub_menu.ksa"
                                    >
                                        <a v-text="sub_menu.name" v-link="{'name': sub_menu.link}"
                                           @click="view_switch($event, sub_menu.link)"
                                        ></a>
                                    </li>
                                </ul>
                            </template>
                            <template v-else>
                                <a v-link="{'name': menu.sub_menu[0].link}"
                                   @click="view_switch($event, menu.sub_menu[0].link)"
                                ><i :class="menu.icon"></i><span v-text="menu.sub_menu[0].name"></span></a>
                            </template>
                        </li>
                        </template>
                    </ul>
                </div>
            </div>
            <!-- /main navigation -->
        </div>
    </div>
</template>

<script>
    import menu_list from '../../ajax/menu.js'
    import MenuAdapter from '../../utils/menu_adapter'

    export default{
        data(){
            return{
                menu_status: [],
                menu_list: menu_list,
                current_menu: 'default'
            }
        },
        ready(){
            var _this = this,

            //- todo 初始化菜单默认状态
            route_path = _this.$route.path.split('/');
            _this.current_menu = route_path[route_path.length - 1]

            //- todo 生成菜单
//            _this.menu_list = MenuAdapter(JSON.parse(sessionStorage.getItem('user_data')).menus)
            // *** 设置菜单展开
            _this.menu_list.forEach(function (o, i) {
                _this.menu_status.push(1)
                o.sub_menu.forEach(function (_o) {
                    if (_o.link == _this.current_menu)
                        _this.menu_status.splice(i, 1, 1)
                })
            })

            var availableHeight = $(window).height() - $('.page-container').offset().top -46;
            $('.page-container').attr('style', 'min-height:' + availableHeight + 'px');
            window.onresize=(()=>{
                var availableHeight = $(window).height() - $('.page-container').offset().top -46;
                $('.page-container').attr('style', 'min-height:' + availableHeight + 'px');
            })
        },
        methods:{
            /**
             * @description 视图切换 handle function
             * @param sub_menu {String} 子菜单路由名称
             */
            view_switch(sub_menu){this.current_menu = sub_menu}
        }
    }
</script>