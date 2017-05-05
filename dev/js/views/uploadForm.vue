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
								<tr>
									<td>
										<input type="text"/>
										File to upload:<input type="file" name="file" @change="uploads($event)"/><input type="hidden" class="hidden-data">Name:<input type="text"  class="form-control" name="name"/></td>
									<td><input class="btn btn-primary" type="button" value="提交" @click="submits($event)"/></td>
								</tr>
								<tr>
									<td>选择日期：
										<datepicker :readonly="true" :value.sync="dateStr" format="YYYY-MM-DD"></datepicker>
									</td>
									<td><input type="button" class="btn btn-primary" value="提交" @click="submitTime($event)"/></td>
								</tr>
								<tr>
									<td>选择日期（同步数据）：
										<datepicker :readonly="true" :value.sync="dateStr1" format="YYYY-MM-DD"></datepicker>
									</td>
									<td><input type="button" class="btn btn-primary" value="提交" @click="submitTime1($event)"/>
										<input type="button" class="btn btn-primary" value="统计" @click="submitTime2($event)"/>
									</td>
								</tr>
                                <tr>
                                    <td>
                                        开始日期：<datepicker  :readonly="true" :width="'150px'" :value.sync="startdateStr" format="YYYY-MM-DD"></datepicker>
                                        结束日期：<datepicker  :readonly="true" :width="'150px'" :value.sync="enddateStr" format="YYYY-MM-DD"></datepicker>
                                        <input type="text" class="form-control" v-model="bankAccountID" placeholder="账号"/>
                                    </td>
                                    <td>
                                        <input type="button" class="btn btn-primary" value="提交" @click="reserveCashDetail($event)"/>
                                    </td>
                                </tr>
								<tr>
									<td>
										<input type="text" class="form-control" v-model="flowID" placeholder="flowID"/>
										<input type="text" class="form-control" v-model="serialNumber" placeholder="交易流水号"/>
									</td>
									<td>
										<input type="button" class="btn btn-primary" value="提交" @click="revokeTradeDetail($event)"/>
									</td>
								</tr>
								<tr>
									<td>
										<input type="text" class="form-control" v-model="jobID" placeholder="jobID"/>
									</td>
									<td>
										<input type="button" class="btn btn-primary" value="执行" @click="excuteJob()"/>
									</td>
								</tr>
								<tr>
                                    <td>
                                        <input type="text" class="form-control" v-model="activityID" placeholder="activityID"/>
                                        <input type="text" class="form-control" v-model="subCompanyID" placeholder="subCompanyID"/>
                                        <input type="text" class="form-control" v-model="year" placeholder="年份"/>
                                        <input type="text" class="form-control" v-model="month" placeholder="月份"/>
                                    </td>
                                    <td>
                                        <input type="button" class="btn btn-primary" value="提交" @click="generateActivityEffect($event)"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="button" class="btn btn-primary" value="生成活动执行表" data-toggle="modal" @click="generateActivityEffectAgain($event)"/>
                                    </td>
									<td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="button" class="btn btn-primary" value="大后台数据同步" data-toggle="modal" @click="intiBOSSData($event)"/>
                                    </td>
									<td></td>
                                </tr>
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
	#app{
	table td, table th{
		overflow: visible;
	}
	.upload-rows div{
		padding:10px;
        tr{
            border:1px solid #dadada;
        }
        td{
			padding:20px;
            input{
                display: inline-block;
                width:150px;
            }
        }
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
				name1:'',
				dateStr:'',
				dateStr1:'',
                startdateStr:'',
                enddateStr:'',
				startID:'',
				endID:'',
                bankAccountID:'',
				flowID:'',
				serialNumber :'',
				jobID:''
            }
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
						dialogs('success',response.data.message);
				})
			},
            submitTime(e){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.$http.post('./dev/tool/tradeDetail/rollback',this.dateStr)
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
			submitTime1(e){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.$http.get('./dev/tool/syn/activation?dateStr='+this.dateStr1)
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
            submitTime2(e){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.$http.get('./dev/tool/count/activation')
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
            reserveCashDetail(e){
                if(sessionStorage.getItem('isHttpin')==1)return;
                let data={
                    startDate :this.startdateStr.replace(/\-/g,''),
                    endDate :this.enddateStr.replace(/\-/g,''),
					bankAccountID:this.bankAccountID
                }
                this.$http.post('./dev/tool/reserveCashDetail',data)
                        .then((response)=>{
                            dialogs('success',response.data.message);
                        })
            },
			revokeTradeDetail(e){
				if(this.flowID!=''&&this.serialNumber!=''){
					dialogs('error','只能传入一个参数！');
					return;
				}
				let data={
					flowID :this.flowID,
					serialNumber :this.serialNumber
				}
				this.$http.post('./dev/tool/tradeDetail/revoke',data)
						.then((response)=>{
							dialogs('success','撤销成功！');
						})
			},
			excuteJob(){
				this.$http.get('./job/'+this.jobID)
						.then((response)=>{
							dialogs('success',response.data.message);
						})
			},
			generateMerchantSubsidyPaidDetail(){
				this.$http.post('./dev/tool/subsidyAccount/generateMerchantSubsidyPaidDetail')
						.then((response)=>{
							dialogs('success',response.data.message);
						})
			},
			caculateSubsidyAccountTradeData(e){
                this.$http.post('./dev/tool/subsidyAccount/generateTradeStatisticsData')
                        .then((response)=>{
                            dialogs('success','处理成功！');
                        })
            },
            correctSubsidyAccountData(e){
                this.$http.post('./dev/tool/subsidyAccount/correct')
                        .then((response)=>{
                            dialogs('success','处理成功！');
                        })
            },
            generatActivitySubCompany(e){
                this.$http.post('./dev/tool/activitySubCompany/generate')
                        .then((response)=>{
                            dialogs('success',response.data.message);
                        })
            },
            generateOldActivitySubCompany(e){
                this.$http.post('./dev/tool/oldActivitySubCompany/generate')
                        .then((response)=>{
                            dialogs('success',response.data.message);
                        })
            },
            generateActivityEffect(e){
                if(sessionStorage.getItem('isHttpin')==1)return;
                    let data={
                       subCompanyID :  this.subCompanyID,
                       activityID : this.activityID,
                       year : this.year,
                       month : this.month
                    }
                this.$http.post('./dev/tool/activityEffect/generate',data)
                                    .then((response)=>{
                                        dialogs('success',response.data.message);
                                    })
            },
            updateSubsidyAccount(e){
                this.$http.post('./dev/tool/subsidyAccount/update')
                    .then((response) => {
                        dialogs('success', response.data.message);
                    })
            },
            generateActivityEffectAgain(e){
                this.$http.post('./dev/tool/activityEffect/generate/again')
                        .then((response)=>{
                            dialogs('success',response.data.message);
                        })
            },
            intiBOSSData(e){
                this.$http.post('./dev/tool/boss/data/init')
                        .then((response)=>{
                            dialogs('success',response.data.message);
                        })
            }
        },
        ready() {
        },
       watch:{
       }
    }
</script>