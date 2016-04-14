<style>
    ul,li{
        margin: 0px;
        padding: 0px;
    }
    .page-bar li{
        list-style: none;
        display: inline-block;
    }
    .page-bar li:first-child>a {
        margin-left: 0px
    }
    .page-bar a{
        display: inline-block;
        border: 1px solid #ddd;
        text-decoration: none;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #337ab7;
        cursor: pointer
    }
    .page-bar a:hover{
        background-color: #eee;
    }
    .page-bar .active a{
        color: #fff;
        cursor: default;
        background-color: #337ab7;
        border-color: #337ab7;
    }
    .page-bar i{
        font-style:normal;
        color: #d44950;
        margin: 0px 4px;
        font-size: 12px;
    }
    .page-bar .jump-button{
        background: #eee;
        border:1px solid #ccc;
        padding:5px;
    }
    .page-bar .jump-input {
        display: inline-block;
        width:60px;
    }
    .page_length{

        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        margin-right: 10px;
        margin-left: 5px;
        box-shadow: none;
        border-color: #d2d6de;
    }
</style>

<template>
    <div class="page-bar" v-show="all>0">
        <ul>
            <li v-show="islength">
                每页展示
                <select v-model="page_size" class="page_length">
                    <option v-for="n in pageSizeList" :value="+n" v-text="n"></option>
                </select>条
                &nbsp;&nbsp;&nbsp;&nbsp;
            </li>
            <li v-show="page_total>1"><a v-on:click="jump('first')">首页</a></li>
            <li v-if="page_total>1 && showFirst"><a v-on:click="cur--">上一页</a></li>
            <li v-for="index in indexs"  v-bind:class="{ 'active': cur == index}">
                <a v-on:click="btn_click(index)">{{ index }}</a>
            </li>
            <li v-if="page_total>1 && show_last"><a v-on:click="cur++">下一页</a></li>
            <li v-show="page_total>1"><a v-on:click="jump('last')">尾页</a></li>
            <li><a>共<i v-text="page_total"></i>页</a></li>
            <li v-show="page_total>page_size">&nbsp;&nbsp;&nbsp;&nbsp;第<input type="text" class="jump-input form-control" v-model="jump_val | filter_number 1 ">页 <input type="button" value="确定" class="jump-button" @click="jump()" vaule="确定"></li>

        </ul>
    </div>
</template>

<script>
    /**
     * 依赖的 filter_number 过滤器
     */
    export default {
        props: {
            all: { type: Number, default: 0 },
            cur: { type: Number, default: 0 },
            pageSizeList: { type: Array, required:false},
            page_size: { type: Number, default: '' }
        },
        data(){
            return {
                islength:false,
                jump_val:''
            }
        },
        computed: {
            page_total() {
                !this.pageSizeList && (this.pageSizeList = [15,25,50,100])
                this.page_size ? (this.islength = true) : (this.page_size = this.pageSizeList[0])
                return (this.all-(this.all%this.page_size))/this.page_size + ((this.all%this.page_size) ? 1:0)

            },
            indexs() {

                var left = 1
                var right = this.page_total
                var ar = []
                if(this.page_total>= 11){
                    if(this.cur > 5 && this.cur < this.page_total-4){
                        left = this.cur - 5
                        right = this.cur + 4
                    }else{
                        if(this.cur<=5){
                            left = 1
                            right = 10
                        }else{
                            right = this.page_total
                            left = this.page_total -9
                        }
                    }
                }
                while (left <= right){
                    ar.push(left)
                    left ++
                }
                return ar
            },
            show_last() {
                if(this.cur == this.page_total){
                    return false
                }
                return true
            },
            showFirst() {
                if(this.cur == 1){
                    return false
                }
                return true
            }
        },
        methods: {
            btn_click(data) {
                if(data != this.cur){
                    this.cur = data
                }
            },
            jump(type) {
                switch(type){
                    case 'first':
                        this.cur = 1
                        break
                    case 'last':
                        this.cur = this.page_total
                        break
                    default :
                        if(!+this.jump_val) return
                        this.cur = +this.jump_val
                        break
                }

            }
        },
        watch: {
            page_size() {
                this.cur = 1
            }
        },
        ready() {
        }
    }
</script>