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
                                <a v-link="{'name': menu.sub_menu[0].link}"
                                   @click="view_switch($event, menu.sub_menu[0].link)" :data-type="menu.type"
                                ><i :class="menu.icon"></i><span v-text="menu.sub_menu[0].name"></span></a>
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
            document.querySelector(`*[data-type=${routerType}]`).classList.add('v-link-active');
            var availableHeight = $(window).height() - $('.page-container').offset().top -46;
            $('.page-container').attr('style', 'min-height:' + availableHeight + 'px');
            if(KSAuthKit){
                console.log(11111);
                KSAuthKit.off();
                KSAuthKit.on();
            }
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
            view_switch(e,sub_menu){
                if(('/'+sub_menu)==this.$route.path)return;
            }
        }
    }
</script>