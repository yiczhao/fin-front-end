<template>
    <div class="box box-info pd50">
        <div class="box-header with-border">
            <h3 class="box-title">财务系统用户登录</h3>
        </div>
        <form class="form-horizontal">
            <div class="box-body">
                <div class="form-group">
                    <label class="col-sm-2 control-label">用户名</label>
                    <div class="col-sm-10">
                        <input type="text" v-model="username" class="form-control" placeholder="请输入用户名">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">密码</label>
                    <div class="col-sm-10">
                        <input type="password" v-model="password" class="form-control" placeholder="请输入密码">
                    </div>
                </div>
            </div>
            <div class="box-footer">
                <span  @click="login" class="btn btn-info">登录</span>
            </div>
        </form>
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
                password:''
            }
        },
        components:{
        },
        methods:{
            login:function(){
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
        }
    }
</script>