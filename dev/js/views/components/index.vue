<template>
    <nv-header
            :title="title"
            :align="titleAlign"
            :type="titleType"
            :bk-color="titleBkColor"
            :ft-color="titleFtColor"
            :section="titleSection"
    ></nv-header>
    <nv-menu keep-alive></nv-menu>
    <slot name="content" slot="content"></slot>
    <nv-footer keep-alive></nv-footer>
</template>
<script>
    import nvHeader from './header.vue'
    import nvMenu from './menu.vue'
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
            title: {type: String, default: 'Title'},
            titleAlign: {type: String, default: 'tc'},
            titleType: {type: String, default: 'NORMAL'},
            titleBkColor: {type: String, default: '#3d434f'},
            titleFtColor: {type: String, default: '#fff'},
            titleSection: {type: Array, default() {return [];}}
        },
        components:{
            'nvHeader': nvHeader,
            'nvMenu': nvMenu,
            'nvFooter': nvFooter
        }
    }
</script>