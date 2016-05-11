<template>
    <div class="login-container">
        <div class="page-container" style="min-height:907px">
        <!-- Page content -->
        <div class="page-content">
            <!-- Main content -->
            <div class="content-wrapper">
                <!-- Content area -->
                <div class="content">
                    <!-- Simple login form -->
                    <form action="index.html" class="form-validate">
                        <div class="panel panel-body login-form">
                            <div class="text-center">
                                <div class="icon-object border-slate-300 text-slate-300"><i class="icon-reading"></i></div>
                                <h5 class="content-group">财务管理系统<small class="display-block">登录</small></h5>
                            </div>
                            <div class="form-group has-feedback has-feedback-left">
                                <input @keyup.enter="login" type="text" class="form-control userName" v-model="username" placeholder="用户名">
                                <div class="form-control-feedback">
                                    <i class="icon-user text-muted"></i>
                                </div>
                                <label v-show="usershow" class="validation-error-label" v-text="usererror"></label>
                            </div>
                            <div class="form-group has-feedback has-feedback-left">
                                <input @keyup.enter="login" type="password" class="form-control" name="password" v-model="password" placeholder="密码">
                                <div class="form-control-feedback">
                                    <i class="icon-lock2 text-muted"></i>
                                </div>
                                <label v-show="passshow" class="validation-error-label" v-text="passerror"></label>
                            </div>
                            <div class="form-group">
                                <span @click="login" v-bind:class="{ 'btn-default': isD,'btn-primary':!isD}" class="btn btn-block">登录 <i class="icon-circle-right2 position-right"></i></span>
                            </div>
                            <div class="form-group">
                                <label v-show="suberror" class="validation-error-label suberror" v-text="errortext"></label>
                            </div>
                        </div>
                    </form>
                    <!-- /simple login form -->
                    <!-- Footer -->
                    <!-- /footer -->
                </div>
                <!-- /content area -->
            </div>
            <!-- /main content -->
        </div>
        <!-- /page content -->
    </div>
    </div>
</template>
<style lang="sass">
    .login{
        min-width: 1280px;
    }
    .login-container .pd50{
        padding: 50px;
    }
    .login-container .pd50 .box-footer{
        text-align: center;
    }
    .login-container .pd50 .box-footer .btn{
        width:20%;
        margin-top: 20px;
    }
    .login-container .page-container{
        min-height:auto!important;
    }
    .login-container .suberror{
        left: 75px;
    }
    .login .message-notify .message-notify-content{
        border:0;
        background:none;
        box-shadow: none;
        i{
            font-size: 20px;
        }
        a{
            display: none;
        }
    }
    .login .message-notify.show{
        top:400px;
    }
</style>
<script>
    export default{
        data(){
            return{
                username:'',
                password:'',
                usererror:'',
                passerror:'',
                usershow:false,
                passshow:false,
                suberror:false,
                errortext:'',
                isD:false
            }
        },
        components:{
        },
        methods:{
            login(){
                this.suberror=false;
                if(this.username==''){this.usererror='请输入用户名';this.usershow=true;return;}
                if(this.password==''){this.passerror='请输入密码';this.passshow=true;return;}
                if(this.usershow||this.passshow||this.isD){return false;}
                this.isD=true;
                let data={'username':this.username,'password':this.password};
                this.$http.post('./passport/login',data)
                        .then(function (response) {
                            if(response.data.code===0){
                                $('body').removeClass('login');
                                sessionStorage.setItem('userData',JSON.stringify(response.data.data));
                                this.$router.go({name:'default'});
                            }
                            else{
                                this.suberror=true;
                                this.errortext=response.data.message;
                            }
                            this.isD=false;
                        }, function (response) {
                            this.isD=false;
                            console.log(response);
                        });
            }
        },
        watch:{
          username(){
              if(this.username!=''){this.usererror='';this.usershow=false;this.suberror=false;}
          },
          password(){
              if(this.password!=''){this.passerror='';this.passshow=false;this.suberror=false;}
          }
        },
        ready(){
            $('.userName').focus();
            $('body').addClass('login').removeClass('stop-scrolling');
        }
    }
</script>