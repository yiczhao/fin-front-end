<template>
    <nv-header keep-alive></nv-header>
    <div class="page-container">
        <div class="page-content">
            <nv-menu keep-alive></nv-menu>
            <breadcrumb
                    :isshow="isshow"
                    :ptitle="ptitle"
                    :title="title"
                    :p2title="p2title"
                    :hname="hname"
                    :h2name="h2name"
                    keep-alive></breadcrumb>
            <slot name="content" slot="content"></slot>
        </div>
    </div>
    <nv-footer keep-alive></nv-footer>
    <div class="script-playground" style="dispaly: none"
         v-el:script-playground
    ></div>
</template>
<script>
    import nvHeader from './header.vue'
    import nvMenu from './menu.vue'
    import breadcrumb from './breadcrumb.vue'
    import nvFooter from './footer.vue'
    import Cookie from '../../utils/Cookie'
    export default{
        data(){
            return{
                userData: {}
            }
        },
        created(){
        },
        ready () {
            // 插入权限控制 JS
            let sciprt = document.createElement('SCRIPT')
            let _src=Cookie.get('KSAuthJSURL').replace('http://auth.kashuo.net',window.authurl);
            sciprt.setAttribute('src',_src);
            this.$els.scriptPlayground.appendChild(sciprt)
        },
        watch: {
            userData() {
                if (!!this.$parent.$data.userData) {
                    this.$parent.$set('userData', this.userData);
                }
            }
        },
        props:{
            isshow: {type: String,default:''},
            title: {type: String,default:'首页'},
            ptitle: {type: String,default:''},
            p2title: {type: String,default:''},
            hname: {type: String,default:''},
            h2name: {type: String,default:''},
        },
        components:{
            'nvHeader': nvHeader,
            'nvMenu': nvMenu,
            'breadcrumb': breadcrumb,
            'nvFooter': nvFooter
        }
    }
</script>