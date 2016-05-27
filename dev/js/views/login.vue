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
                    <form autocomplete="on">
                        <div class="panel panel-body login-form">
                            <div class="t200">财务管理系统</div>
                            <div class="form-group">
                                <span class="f18">请登录</span>
                            </div>
                            <div class="form-group has-feedback has-feedback-left">
                                <input @keyup.enter="login" type="text" class="form-control userName" name="username" v-model="username" placeholder="用户名">
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
                                <span @click="login" v-bind:class="{ 'btn-default': isD,'btn-primary':!isD}" class="btn btn-block">登录</span>
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
    #app{
        .form-group{
            margin:0 0 30px;
        }
    }
    .login-container {
        .pd50{
            padding: 50px;
            .box-footer{
                text-align: center;
                .btn{
                    width:20%;
                    margin-top: 20px;
                }
            }
        }
        .page-container{
            min-height:auto!important;
            .login-form{
                position: relative;
                width: 870px;
                padding: 40px 80px 0 460px;
                height:360px;
                background: url("../../images/login_bg.png") no-repeat;
                .form-group{
                    .form-control-feedback{
                        top:3px;
                    }
                    .f18{
                        display: inline-block;
                        font-size: 18px;
                        color:#b0b0b0;
                    }
                    .form-control{
                        height: 42px;
                        border-color:#c8c8c8;
                    }
                    .btn-primary{
                        height: 42px;
                        line-height: 25px;
                        font-size: 16px;
                        background: #ee7839;
                        color:#fff;
                        border-color:#ee7839;
                    }
                }
                .t200{
                    position: absolute;
                    top:200px;
                    left: 130px;
                    font-size: 20px;
                    color:#fff;
                    font-weight: bold;
                    line-height: 100%;
                }
            }
        }
        .suberror{
            left: 75px;
        }
    }
    .login {
        .message-notify {
            .message-notify-content{
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
        }
        .message-notify.show{
            top: 375px;
            left: 190px;
        }
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
          },
          isD(){
               if(this.isD){
                   let pd=($('body').height()-$('.login-form').height())/2-80;
                   $('.message-notify.show').css('top',pd+335);
               }
          }
        },
        ready(){
            $('.userName').focus();
            $('body').addClass('login').removeClass('stop-scrolling');
            let pd=($('body').height()-$('.login-form').height())/2-80;
            $('.page-container').css('padding-top',pd);
        }
    }
</script>