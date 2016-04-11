<style>

    .dialog-mask {
        position: fixed;top:0;right:0;z-index:100;
        width:100%;height: 100%;
        background: #222;
        opacity: 0.3;
    }

    .dialog .content {
        /*clear*/
        padding: 0;margin:0;min-height:auto;
        /*clear end*/
        z-index:1000;
        position: absolute;
        border-radius: 3px;
        background: #ffffff;
        border-top: 3px solid #00c0ef;
        box-shadow: 0 1px 1px rgba(0,0,0,0.1);

    }
    .dialog .content .box-body{
        text-align: center;
    }
    .box-header{
        padding-top: 5px;
    }
    .btn-style{
        padding: 2px;
        font-size: 18px;
        background-color: #00c0ef;
        border-color: #00acd6;
        border-radius: 3px;
        box-shadow: none;
        border: 1px solid transparent;
        color: #fff;
        font-weight: bold;
    }
    .dialog .content .box-header h3{
        margin: 0;
        padding: 8px 10px;
        font-size: 16px;
        letter-spacing: 1px;
        font-weight: bold;
    }
    .close{
        position: absolute;
        right: 10px;
        top: 6px;
    }
    .dialog .content .box-body{
        font-size: 14px;
        padding: 0 20px 10px 20px;

    }
    .btn-def{
        background-color: #f4f4f4;
        border: 1px solid #ddd;
        border-radius: 3px;
        padding: 3px 9px;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
<template>

    <div class="dialog" v-show="show">
        <align
                :align="align"
                :visible="show"
                :monitor-buffer-time="80">
            <div class="content" :style="{width:width+'px'}">
                <div class="box-header">
                    <h3 class="box-title" v-text="title"></h3>
                    <!-- tools box -->
                    <div class="close">
                        <button class="btn-style" @click="cbClose('cancel')">×</button>
                    </div><!-- /. tools -->
                </div><!-- /.box-header -->
                <div class="box-body">
                    <slot></slot>
                </div>
            </div>
        </align>
        <div class="dialog-mask"></div>
    </div>
</template>
<script type="text/javascript">
    import align from './base/align.vue'
    export default {
        props:{
            title:{type:String,default:'标题'},
            show:{type:Boolean,default:false},
            width:{type:Number},
            cbClose:{type:Function}
        },
        data() {
            return {
                align: {
                    points: ['cc', 'cc']
                },
                monitor: true
            }
        },
        methods :{

        },
        ready(){
            // console.log(this.cbClose)
        },
        components:{
            'align': align
        }
    }
</script>
