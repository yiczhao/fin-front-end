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
                                <input @keyup.enter="login" type="text" class="form-control" v-model="username" placeholder="用户名">
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
                                <span @click="login" class="btn btn-primary btn-block">登录 <i class="icon-circle-right2 position-right"></i></span>
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
<style>
    .pd50{
        padding: 50px;
    }
    .pd50 .box-footer{
        text-align: center;
    }
    .pd50 .box-footer .btn{
        width:20%;
        margin-top: 20px;
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
                passshow:false
            }
        },
        components:{
        },
        methods:{
            login(){
                if(this.username==''){this.usererror='请输入用户名';this.usershow=true;return;}
                if(this.password==''){this.passerror='请输入密码';this.passshow=true;return;}
                if(this.usershow||this.passshow){return false;}
                let data={'username':this.username,'password':this.password};
                this.$http.post('./passport/login',data)
                        .then(function (response) {
                            if(response.data.code===0){
                                sessionStorage.setItem('userData',JSON.stringify(response.data.data));
                                this.$router.go({name:'default'});
                            }
                            else{
                                alert(response.data.message);
                            }
                        }, function (response) {
                            console.log(response);
                        });
            }
        },
        watch:{
          username(){
              if(this.username==''){this.usererror='请输入用户名';this.usershow=true;}else{this.usererror='';this.usershow=false;}
          },
          password(){
              if(this.password==''){this.passerror='请输入密码';this.passshow=true;}else{this.passerror='';this.passshow=false;}
          }
        },
        ready(){
        }
    }
</script>