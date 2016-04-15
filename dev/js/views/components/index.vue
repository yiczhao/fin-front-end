<template>
    <nv-header
            :name="name"
            keep-alive
    ></nv-header>
    <nv-menu keep-alive></nv-menu>
    <div class="content-wrapper">
        <breadcrumb
                :isshow="isshow"
                :ptitle="ptitle"
                :title="title"
                :p2title="p2title"
                :hname="hname"
                ></breadcrumb>
        <slot name="content" slot="content"></slot>
    </div>
    <nv-footer keep-alive></nv-footer>
</template>
<script>
    import nvHeader from './header.vue'
    import nvMenu from './menu.vue'
    import breadcrumb from './breadcrumb.vue'
    import nvFooter from './footer.vue'
    export default{
        data(){
            return{
                userData: {}
            }
        },
        watch: {
            userData() {
                if (!!this.$parent.$data.userData) {
                    this.$parent.$set('userData', this.userData);
                }
            }
        },
        props:{
            name: {type: String,default:'xxxx'},
            isshow: {type: String,default:''},
            title: {type: String,default:'首页'},
            ptitle: {type: String,default:''},
            p2title:{type:String ,default:''},
            hname: {type: String,default:''},
        },
        components:{
            'nvHeader': nvHeader,
            'nvMenu': nvMenu,
            'breadcrumb': breadcrumb,
            'nvFooter': nvFooter
        }
    }
</script>