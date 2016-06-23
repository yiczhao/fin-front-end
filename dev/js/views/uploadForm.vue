<template>
    <index :title="'上传文件'" 
           :ptitle="'上传文件'"
           :hname="'uploadForm'"  
           :isshow="'isshow'">
        <div class="content blists" slot="content">
        	<div class="panel panel-flat">
        	 <div class="panel-heading">
        	 	<div class="upload-rows">
	           		<div th:if="${message}">
						<h2 th:text="${message}"/></h2>
					</div>
					<div>
						<form method="POST" enctype="multipart/form-data" action="{{origin}}/merchant/account/tax">
							<table>
								<tr><td>File to upload:</td><td><input type="file" name="file" /></td></tr>
								<tr><td>Name:</td><td><input type="text" name="name" /></td></tr>
								<tr><td></td><td><input type="submit" value="Upload" /></td></tr>
							</table>
						</form>
					</div>
				 </div>

				 <div class="upload-rows">
	           		<div th:if="${message}">
						<h2 th:text="${message}"/></h2>
					</div>
					<div>
						<form method="POST" enctype="multipart/form-data" action="{{origin}}/merchant/account/tax">
							<table>
								<tr><td>File to upload:</td><td><input type="file" name="file" /></td></tr>
								<tr><td>Name:</td><td><input type="text" name="name" /></td></tr>
								<tr><td></td><td><input type="submit" value="Upload" /></td></tr>
							</table>
						</form>
					</div>
				 </div>
			 </div>
			</div>
        </div>
    </index>
</template>
<style lang="sass" scoped>
	.upload-rows div{
		padding:10px;
		td{
			padding:20px;
		}
	}
</style>
<script>
    export default{
        props:{
        },
        data(){
            return{
                origin:window.origin,
            }
        },
        methods:{
        },
        ready() {
        },
       watch:{
       }
    }
</script>