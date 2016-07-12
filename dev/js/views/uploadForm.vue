<template>
    <index :title="'上传文件'" 
           :ptitle="'上传文件'"
           :hname="'uploadForm'"  
           :isshow="'isshow'">
        <div class="content blists" slot="content">
        	<div class="panel panel-flat">
        	 <div class="panel-heading">
				 <div class="upload-rows">
					<div>
						<form method="POST" enctype="multipart/form-data">
							<table>
								<tr><td>File to upload:</td><td><input type="file" name="file" @change="uploads($event)"/><input type="hidden" class="hidden-data"></td></tr>
								<tr><td>Name:</td><td><input type="text" name="name"/></td></tr>
								<tr><td></td><td><input type="button" value="提交" @click="submits($event)"/></td></tr>
								<tr><td>选择日期：<datepicker  :readonly="true" :value.sync="dateStr" format="YYYY-MM-DD"></datepicker></td><td><input type="button" value="提交" @click="submitTime($event)"/></td></tr>
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
	table td, table th{
		overflow: visible;
	}
	.upload-rows div{
		padding:10px;
		td{
			padding:20px;
		}
	}
</style>
<script>
	import datepicker from './components/datepicker.vue'
    export default{
        props:{
        },
        data(){
            return{
                origin:window.origin,
				name1:'',
				dateStr:''
            }
        },
		components:{
			'datepicker': datepicker,
		},
        methods:{
			uploads(e){
				if(e.target.value==''){
					return;
				}
				let files=e.target.files[0];
				let _this=$(e.target);
				var reader = new FileReader();
				reader.readAsDataURL(files);
				reader.onload = function(e){
					_this.siblings('.hidden-data').val(this.result.split(',')[1])
				}
			},
			submits(e){
				if(sessionStorage.getItem('isHttpin')==1)return;
					let form=$(e.target).closest('form');
					let datas={
						name:form.find('input[type="text"]').val(),
						data:form.find('.hidden-data').val()
					}
					this.$http.post('./dev/tool/upload',datas)
							.then((response)=>{
						dialogs('success','上传成功！');
				})
			},
			submitTime(e){
				if(sessionStorage.getItem('isHttpin')==1)return;
					this.$http.post('./dev/tool/tradeDetail/rollback',this.dateStr)
							.then((response)=>{
									dialogs('success','回滚成功！');
							})
			}
        },
        ready() {
        },
       watch:{
       }
    }
</script>