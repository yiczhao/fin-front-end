<template>
    <div class="navbar navbar-inverse">
        <div class="navbar-inner">
            <div class="container-fluid">
                <img class="companylogo"  src="../../../img/logo.png">
                <a class="thislogo" >
                    <span class="font-large">卡说大后台</span>
                </a>
                <ul class="nav navbar-nav">
                    <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>
                </ul>
                <div id="menu-list" class="k-header-list"
                     v-el:menu-system
                     :class="listshow && 'active'"
                     @click="listshow = !listshow"
                >
                    <div class="k-header-rcontainer">
                        <div class="f14 open-head-owner">商户管理系统</div>
                        <i class="bg-listshow"></i>
                    </div>
                    <ul class="k-header-list-active"
                        v-if="listshow"
                    >
                        <template  v-for="system in systemlist">
                            <li @click="addusual(system)" v-if="system.system_type=='1'">
                                <a>{{system.system_name}}</a>
                                <div class="system-add" @click="removeshowlist(system)"></div>
                            </li>
                        </template>

                    </ul>
                </div>
                <template v-for="system in systemlist">
                    <div id="menu-list" class="k-header-item k-header-list  trans" v-if="system.system_type == '2'">
                        <div class="k-header__rcontainer" @click="addusual(system)">
                            <span class="f14">{{system.system_name}}</span>
                            <div class="system-del" @click="addshowlist(system)"></div>
                        </div>
                    </div>
                </template>
                <div id="menu-button" class="k-header-item k-header-menu r trans"
                     v-el:menu-btn
                     :class="show && 'active'"
                     @click="show = !show"
                >
                    <div class="k-header-rcontainer">
                        <span class="f14">您好, {{username}}</span>
                        <i class="bg-listshow"></i>
                    </div>
                    <ul class="k-header-menu-active m0 p0"
                        v-if="show"
                    >
                        <!--<li v-link ="{name: 'updatePwd'}"><a><i class="icon-quill4"></i> 修改密码</a></li>-->
                        <li @click="loginOut"><i class="fa fa-key"></i> 登出</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CryptoJS from '../../utils/brix-crypto-js'
    import Cookie from '../../utils/Cookie'
    export default {
        props:{

        },
        data() {
            return{
                systemId: 9,
                username:'',
                show: false,
                listshow: false,
                xxx:false,
                systemlist: [
                    {
                        id: '1',
                        type: '1',
                        name: '商户管理系统',
                        url: 'http://backend.dev.kashuo.net'},
                    {
                        id: '2',
                        type: '2',
                        name: '权限系统管理',
                        url: 'http://auth.boss.kashuo.net'},
                    {
                        id: '3',
                        type: '1',
                        name: 'POS进销存'
                    }
                ]
            }
        },
        created () {
            this.showsystemlist()
        },
        methods:{
            loginOut(){
                var self = this;
                document.cookie = 'JSESSID=; path=/; domain=.kashuo.net; expires=' + new Date(0).toUTCString();
                document.cookie = 'JSESSTOKEN=; path=/; domain=.kashuo.net; expires=' + new Date(0).toUTCString();
                // window.location.href = loginUrl
                window.location.href = authUrl

            },
            showsystemlist () {
                alert('111');
                let self = this
                self.$http({
                    options:{xhr : { withCredentials: true }},
                    url: authUrl + '/auth/usersystem/list',
                    method: 'post'
                }).then(res => {
                    let arr = res.data.data.system
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].sys_id === self.systemId) {
                            arr.splice(i, 1)
                            break
                        }
                    }
                    self.systemlist = arr
                })
            },
            addusual (index) {
                // Cookie.set('KSAuthSysId', index.sys_id)
                // document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
                // document.cookie = 'KSAuthSysId=' + index.sys_id + ';path=/; domain=.kashuo.net; expires=100'
                window.location.href = index.system_url
            },
            removeshowlist (index) {
                let _this = this
                for (var i = 0; i < this.systemlist.length; i++) {
                    if (index.sys_id === this.systemlist[i].sys_id) {
                        index.system_type = 2
                        let arr = index
                        // _this.$set('systemlist[i]', arr)
                        _this.systemlist[i] = arr
                        // console.log(this.systemlist)
                    }
                }
                this.$http({
                    options:{xhr : { withCredentials: true }},
                    url: authUrl + '/auth/usersystem/insert/' + index.sys_id,
                    method: 'GET',
                    data: {
                        systemid: parseInt(index.sys_id)
                    }
                }).then(res => {
                })
            },
            addshowlist (index) {
                let _this = this
                for (var i = 0; i < this.systemlist.length; i++) {
                    if (index.sys_id === this.systemlist[i].sys_id) {
                        index.system_type = 1
                        let arr = index
                        // _this.$set('systemlist[i]', arr)
                        _this.systemlist[i] = arr
                    }
                }
                this.$http({
                    options:{xhr : { withCredentials: true }},
                    url: authUrl + '/auth/usersystem/delete/' + index.sys_id,
                    method: 'GET',
                    data: {
                        systemid: parseInt(index.sys_id)
                    }
                }).then(res => {
                })
            },
            /**
             * @description 展开后失去焦点关闭菜单
             * @param e 事件对象
             */
            windowClickHandle (e) {
                !this.$els.menuBtn.contains(e.target) && (this.show = false)
                !this.$els.menuSystem.contains(e.target) && (this.listshow = false)
            }
        },
        ready () {
            if (Cookie.get('JSESSID')) {
                let idandname = Cookie.get('JSESSID');
                // let asd = CryptoJS.enc.Base64.stringify(idandname)
                // console.log(asd)
                let hash = CryptoJS.enc.Base64.parse(idandname)
                var _id = hash.toString(CryptoJS.enc.Utf8);
                let idd = _id.split(":")[1];
                this.username = idd;
            }
            window.addEventListener('click', this.windowClickHandle)
        },
        destroyed () {
            window.removeEventListener('click', this.windowClickHandle)
        }
    };
</script>
<style>
    .companylogo{
        padding-top: 11px;
        padding-left: 20px;
        float: left;
        cursor: pointer;
    }
    .open-head-owner{
        float: left;
        margin-left: 18px;
        margin-right: 0px;
        margin-top: 2px;
    }
    .icon-change-margin{
    }
    .thislogo{margin-top:8px;display: inline-block;float:left;padding-right:10px;display: inline-block;margin-top: -2px;margin-right: 0;padding-left: 0;padding-right: 0;float: left;padding: 13px 20px 10px;margin-left: 0px;font-size: 20px;font-weight: 200;}
    .thislogo .font-large{font-size: 16px;color:#fcfcfc;}
    .thislogo{color:#e24246;font-size: 13px;}
    .header.navbar{min-height:46px;height:46px;border:none;}
    .navbar-inner{
        font-size: 14px;
        height:48px!important;
        background-color: #36474f!important;
    }
    .header .nav > li.dropdown.user .dropdown-toggle .username{color:#ddd;}
    .header .nav li.dropdown .dropdown-toggle i {color: #8a8a8a !important;}
    .nav li{
        padding: 0 !important;
        font-size: 16px!important;
    }
    .nav>li>a{padding: 10px 0!important;}
    .header .nav .dropdown-toggle:hover, .header .nav .dropdown.open .dropdown-toggle{background-color: #36474f}
    .dropdown-menu {position: absolute;top: 100%;left: 0;z-index: 1000;display: none;float: left;list-style: none;text-shadow: none;padding: 0px;margin: 0px;-webkit-box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);-moz-box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);font-size: 14px;font-family: "Segoe UI",Helvetica, Arial, sans-serif;border: 1px solid #ddd;}
    .navbar .pull-right>li>.dropdown-menu, .navbar .nav>li>.dropdown-menu.pull-right {right: -10px;left: auto;top: 50px;}
    .nav>li>a:focus, .nav>li>a:hover {text-decoration: none;background:none;}
    .system-add{
        float:right;
        margin-top:14px;
        margin-right:9px;
        width: 20px;
        height: 20px;
        background: url(../../../img/addsystem.png) center /80% 80% no-repeat;
    }
    .system-add:hover{
        background: url(../../../img/addsystem-hover.png) center /80% 80% no-repeat;
    }
    .system-del{
        float:right;
        margin-top:15px;
        margin-right: 10px;
        width: 20px;
        height: 20px;
        background: url(../../../img/delsystem.png) center /80% 80% no-repeat;
    }
    .system-del:hover{
        background: url(../../../img/delsystem-hover.png) center /80% 80% no-repeat;
    }
    .k-header-list{
        cursor: pointer;user-select: none;
        float: left;
        text-align: center;
        line-height: 46px;
        width: 145px;
        color: #eee;
    }
    .k-header-list:hover {
        background: rgba(0, 0, 0, 0.2)
    }
    .k-header-list:active {
        background: rgba(0, 0, 0, 0.2)

    }
    .k-header-list-active{
        z-index: 1000;
        position: absolute;
        color: #eee;
        line-height: 45px;
        padding: 7px 0;min-width: 145px;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        background: #2b393f;
        color: #eee;line-height: 16px;
        list-style: none;
    }
    .k-header-list li{
        color: #eee;
        line-height: 45px;
    }
    .k-header-list li:hover {background: rgba(0, 0, 0, 0.2)}
    .k-header-list a {
        color: #eee;
        height: 26px;padding: 6px 16px;
        line-height: 26px;font-size: 14px;
    }
    .k-header-menu{
        cursor: pointer;user-select: none;
        float: right;
        text-align: center;
        line-height: 48px;
        width: 145px;
        color: #eee;
    }
    .k-header-menu:hover {
        background: rgba(0, 0, 0, 0.2)
    }
    .k-header-menu:active {
        background: rgba(0, 0, 0, 0.2)

    }
    .k-header-menu-active{
        position: absolute;
        cursor: pointer;
        color: #fff;
        float: right;
        line-height: 30px!important;
        padding: 7px 0;min-width: 145px;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        background: #fafafa;
        color: #eee;line-height: 16px;
        list-style: none;
        z-index: 99;
    }
    .k-header-menu-active li{
        text-align: center;
        color: #444;
        line-height: 30px;
        font-size: 15px;
    }
    .k-header-menu-active li:hover {background: rgba(211, 211, 211, 0.2)}
    .bg-listshow{
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-bottom: -7px;
        background: url(../../../img/listshow.svg) center /80% 80% no-repeat;
    }
</style>