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
									<td><span>交易漏单白名单：</span></td>
									<td>
										File to upload:<input type="file" name="file" @change="uploads($event)"/><input type="hidden" class="hidden-data">Name:<input type="text"  class="form-control" name="name"/></td>
									<td><input class="btn btn-primary" type="button" value="提交" @click="submits($event)"/></td>
								</tr>
								<tr>
									<td><span>大后台交易数据拉取：</span></td>
									<td>选择日期：
										<datepicker type="date" v-bind:value.sync="dateStr3"></datepicker>
									</td>
									<td><input type="button" class="btn btn-primary" value="提交" @click="submitTime3($event)"/></td>
								</tr>
								<tr>
									<td><span>交易数据回滚：</span></td>
									<td>选择日期：
										<datepicker type="date" v-bind:value.sync="dateStr"></datepicker>
									</td>
									<td><input type="button" class="btn btn-primary" value="提交" @click="submitTime($event)"/></td>
								</tr>
								<tr>
									<td><span>终端激活明细拉取：</span></td>
									<td>选择日期（同步数据）：
										<datepicker type="date" v-bind:value.sync="dateStr1"></datepicker>
									</td>
									<td><input type="button" class="btn btn-primary" value="提交" @click="submitTime1($event)"/>
									</td>
								</tr>								<tr>
									<td><span>终端激活递延成本拉取：</span></td>
									<td>选择日期（同步数据）：
										<datepicker type="date" v-bind:value.sync="dateStrDefer"></datepicker>
									</td>
									<td><input type="button" class="btn btn-primary" value="提交" @click="submitTimeDefer($event)"/>
									</td>
								</tr>								<tr>
									<td><span>财务数据拉取：</span></td>
									<td>选择日期（同步数据）：
										<datepicker type="date" v-bind:value.sync="dateStrFinance"></datepicker>
									</td>
									<td><input type="button" class="btn btn-primary" value="提交" @click="submitTimeFinance($event)"/>
									</td>
								</tr>
								<tr>
									<td><span>终端激活明细统计：</span></td>
									<td>
										<input type="button" class="btn btn-primary" value="统计" @click="submitTime2($event)"/>
									</td>
									<td></td>
								</tr>
                                <tr>
									<td><span>备付金明细拉取：</span></td>
                                    <td>
                                        开始日期：
										<datepicker type="date" v-bind:value.sync="startdateStr"></datepicker>
										<datepicker type="date" v-bind:value.sync="enddateStr"></datepicker>
                                        <input type="text" class="form-control" v-model="bankAccountID" placeholder="账号"/>
                                    </td>
                                    <td>
                                        <input type="button" class="btn btn-primary" value="提交" @click="reserveCashDetail($event)"/>
                                    </td>
                                </tr>
								<tr>
									<td><span>撤单：</span></td>
									<td>
										<input type="text" class="form-control" v-model="flowID" placeholder="flowID"/>
										<input type="text" class="form-control" v-model="serialNumber" placeholder="交易流水号"/>
									</td>
									<td>
										<input type="button" class="btn btn-primary" value="提交" @click="revokeTradeDetail($event)"/>
									</td>
								</tr>
								<tr>
									<td><span>定时任务重跑：</span></td>
									<td>
										<input type="text" class="form-control" v-model="jobID" placeholder="jobID"/>
									</td>
									<td>
										<input type="button" class="btn btn-primary" value="执行" @click="excuteJob()"/>
									</td>
								</tr>
								<tr>
									<td><span>活动执行表：</span></td>
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
									<td><span>生成活动执行表：</span></td>
                                    <td>
                                        <input type="button" class="btn btn-primary" value="生成活动执行表" data-toggle="modal" @click="generateActivityEffectAgain($event)"/>
                                    </td>
									<td></td>
                                </tr>
								<tr>
									<td><span>生成财务指标分析表：</span></td>
									<td>选择日期：
										<datepicker type="date" v-bind:value.sync="countDateStr"></datepicker>
									</td>
									<td><input type="button" class="btn btn-primary" value="生成财务指标分析表" @click="generateFinanceTargetDetail($event)"/></td>
								</tr>
								<tr>
									<td>
										<input type="button" class="btn btn-primary" value="重新生成财务指标分析表" data-toggle="modal" @click="reGenerateFinanceTargetDetail($event)"/>
									</td>
									<td></td>
								</tr>
								<tr>
									<td><span>商户账户更新：</span></td>
									<td>
										<input type="text" class="form-control" v-model="begin" placeholder="begin"/>
										<input type="text" class="form-control" v-model="end" placeholder="end"/>
										<input type="text" class="form-control" v-model="code" placeholder="code"/>
									</td>
									<td><input type="button" class="btn btn-primary" value="商户账户更新" @click="merchantAccountSyn($event)"/></td>
								</tr>
								<tr>
									<td><span>待划付已划付金额校正：</span></td>
									<td>
										<input type="text" class="form-control" v-model="subsidyAccountIDsStr1" placeholder="subsidyAccountIDsStr"/>
										<input type="button" class="btn btn-primary" value="校正" data-toggle="modal" @click="correctUnpaidAmount($event)"/>
									</td>
									<td></td>
								</tr>
								<tr>
									<td><span>已划付金额明细校正：</span></td>
									<td>
										<input type="text" class="form-control" v-model="subsidyAccountIDsStr2" placeholder="subsidyAccountIDsStr"/>
										<input type="button" class="btn btn-primary" value="校正" data-toggle="modal" @click="correctPaidDetail($event)"/>
									</td>
									<td></td>
								</tr>
								<tr>
									<td><span>修复税金和发票数据：</span></td>
									<td>
										<input type="text" class="form-control" v-model="subsidyAccountIDs" placeholder="subsidyAccountIDs"/>
										<input type="button" class="btn btn-primary" value="修复" data-toggle="modal" @click="updateSubsidyAccountTaxAndInvoice($event)"/>
									</td>
									<td></td>
								</tr>
								<tr>
									<td><span>计算补贴账户的交易统计信息：</span></td>
									<td>
										<input type="text" class="form-control" v-model="generateSubsidyAccountIDs" placeholder="generateSubsidyAccountIDs"/>
										<input type="button" class="btn btn-primary" value="计算补贴账户的交易统计信息" @click="generateSubsidyAccount($event)"/>
									</td>
									<td></td>
								</tr>
								<tr>
									<td><span>修复暂扣税金和商户实补：</span></td>
									<td>
										<textarea rows="5" cols="5" class="form-control" v-model="serialNumbers" placeholder="交易流水号，以逗号分隔"></textarea>
									</td>
									<td>
										<input type="button" class="btn btn-primary" value="修复暂扣税金和商户实补" @click="repairTradeDetailTax($event)"/>
									</td>
								</tr>
								<tr>
									<td><span>根据大后台的交易数据进行商户id的修复：</span></td>
									<td>
										<textarea rows="5" cols="5" class="form-control" v-model="serialNumbersForSys" placeholder="交易流水号，以逗号分隔"></textarea>
									</td>
									<td>
										<input type="button" class="btn btn-primary" value="修复商户id" @click="repairTradeDetailForSys($event)"/>
									</td>
								</tr>
								<tr>
									<td><span>根据merchant_trade_detail数据更新交易的merchant_id：</span></td>
									<td>
										<textarea rows="5" cols="5" class="form-control" v-model="serialNumbersForTrade" placeholder="交易流水号，以逗号分隔"></textarea>
									</td>
									<td>
										<input type="button" class="btn btn-primary" value="修复商户merchant_id" @click="repairTradeDetailForTrade($event)"/>
									</td>
								</tr>
								<tr>
									<td><span>根据商户数据更新交易的city_id, subcompany_id：</span></td>
									<td>
										<textarea rows="5" cols="5" class="form-control" v-model="cityIdAndSubCompanyId" placeholder="交易流水号，以逗号分隔"></textarea>
									</td>
									<td>
										<input type="button" class="btn btn-primary" value="修复cityId&&subcompanyId" @click="repaircityIdAndSubCompanyId($event)"/>
									</td>
								</tr>
								<tr>
									<td><span>商户添加：</span></td>
									<td>
										<input type="text" class="form-control" v-model="merchantOperationID" placeholder="商盟ID"/>
										<input type="text" class="form-control" v-model="merchantName" placeholder="商盟商户名称"/>
										<select class="form-control" v-model="subCompanyID" @change="getCity(subCompanyID)">
											<option value="">全部分公司</option>
											<option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
										</select>

										<select class="form-control" v-model="cityID">
											<option value="">全部城市</option>
											<option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
										</select>
									</td>
									<td>
										<input type="button" class="btn btn-primary" value="保存" @click="addMerchant($event)"/>
									</td>
								</tr>
								<tr>
									<td><span>原预付充值明细处理：</span></td>
									<td>
										<input type="button" class="btn btn-primary" value="处理" data-toggle="modal" @click="dealAdvancePaymentRechargeDetail($event)"/>
									</td>
									<td></td>
								</tr>
								<tr>
									<td><span>划付报表生成：</span></td>
									<td>
										<input type="button" class="btn btn-primary" value="生成" data-toggle="modal" @click="generatePayReport($event)"/>
									</td>
									<td></td>
								</tr>
								<tr>
									<td><span>补贴账户生成：</span></td>
									<td>
										<input type="button" class="btn btn-primary" value="生成" data-toggle="modal" @click="repairSubsidyAccount($event)"/>
									</td>
									<td></td>
								</tr>
								<tr>
									<td><span>补贴代扣字段更新：</span></td>
									<td>
										<input type="button" class="btn btn-primary" value="更新" data-toggle="modal" @click="updateSubsidyWithhold($event)"/>
									</td>
									<td></td>
								</tr>
								<tr>
									<td><span>重新生成活动收入成本：</span></td>
									<td>
										<input type="button" class="btn btn-primary" value="生成" data-toggle="modal" @click="generateActivityIncomeCostAgain($event)"/>
									</td>
									<td></td>
								</tr>
								<tr>
									<td><span>修复交易时间：</span></td>
									<td>
										<textarea rows="5" cols="5" class="form-control" v-model="errorSerialNumbers" placeholder="交易流水号，以逗号分隔"></textarea>
									</td>
									<td>
										<input type="button" class="btn btn-primary" value="修复交易时间" @click="repairTradeTime($event)"/>
									</td>
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
				dateStr3:'',
                startdateStr:'',
                enddateStr:'',
                countDateStr:'',
				startID:'',
				endID:'',
                bankAccountID:'',
				flowID:'',
				serialNumber :'',
				serialNumbers :'',
                serialNumbersForSys:'',
                serialNumbersForTrade:'',
                cityIdAndSubCompanyId:'',
				jobID:'',
				end:'',
				begin:'',
				code:'',
                subsidyAccountIDsStr1:'',
                subsidyAccountIDs:'',
                generateSubsidyAccountIDs:'',
                subsidyAccountIDsStr2:'',
				subCompanyID:'',
				cityID:'',
                subcompanyList:[],
                cityList:[],
				merchantOperationID:'',
				merchantName:'',
                errorSerialNumbers:''
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
                this.$http.post('./dev/tool/syn/activation?dateStr='+this.dateStr1)
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
			submitTimeDefer(e){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.$http.post('./dev/tool/syn/deffer?dateStr='+this.dateStrDefer)
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
			submitTimeFinance(e){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.$http.post('./dev/tool/syn/finance?dateStr='+this.dateStrFinance)
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
            submitTime2(e){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.$http.post('./dev/tool/count/activation')
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
            submitTime3(e){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.$http.post('./dev/tool/tradeDetail/pull',this.dateStr3)
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
				this.$http.post('./job/'+this.jobID)
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
            generateFinanceTargetDetail(e){
                this.$http.post('./dev/tool/finance_target/generate?dateStr='+this.countDateStr)
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
            reGenerateFinanceTargetDetail(e){
                this.$http.post('./dev/tool/finance_target/regenerate')
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
			},
            merchantAccountSyn(e){
                let data={
                    begin :  this.begin,
                    end : this.end,
                    code : this.code,
                }
                this.$http.post('./dev/tool/merchant_account/syn?'+$.param(data))
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
            correctUnpaidAmount(e){
                this.$http.post('./dev/tool/subsidyAccount/amount/correct/'+this.subsidyAccountIDsStr1)
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
			},
            correctPaidDetail(e){
                this.$http.post('./dev/tool/subsidyAccount/paidDetail/correct/'+this.subsidyAccountIDsStr2)
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
            updateSubsidyAccountTaxAndInvoice(e){
                this.$http.post('./dev/tool/updateSubsidyAccountTaxAndInvoice/'+this.subsidyAccountIDs)
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
            generateSubsidyAccount(e){
                this.$http.post('./dev/tool/generateSubsidyAccountInvoiceAmount/'+this.generateSubsidyAccountIDs)
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
            repairTradeDetailTax(e){
                let data={
                    serialNumber:this.serialNumbers
                }
                this.$http.post('./dev/tool/tradeDetailTax/repair',data)
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
            repairTradeDetailForSys(e){
                let data={
                    tradeNumbers:this.serialNumbersForSys
                }
                this.$http.post('./dev/tool/tradeDetailFix/fixMerchantIdFromRemote?'+$.param(data))
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
            repairTradeDetailForTrade(e){
                let data={
                    tradeNumbers:this.serialNumbersForTrade
                }
                this.$http.post('./dev/tool/tradeDetailFix/fixMerchantIdFromNative?'+$.param(data))
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
            repaircityIdAndSubCompanyId(e){
                let data={
                    tradeNumbers:this.cityIdAndSubCompanyId
                }
                this.$http.post('./dev/tool/fixTradeDetail/cityAndMerchant?'+$.param(data))
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
            },
            //获取分公司数据
            getSubcompany(){
                this.$common_model.getcompany()
                    .then((response)=>{
                        if(response.data.code==0){
                            this.$set('subcompanyList', response.data.data)
                        }
                    });
            },
            //获取城市数据
            getCity(_id){
                this.cityID='';
                let data={
                    'subCompanyID':_id
                }
                this.$common_model.getcity(data)
                    .then((response)=>{
                        if(response.data.code==0){
                            this.$set('cityList', response.data.data)
                        }
                    });
            },
            addMerchant(e){
                let data={
                    merchantOperationID:this.merchantOperationID,
                    merchantName:this.merchantName,
                    subCompanyID:this.subCompanyID,
                    cityID:this.cityID
                }
                this.$http.post('./dev/tool/merchant/add',data)
                    .then((response)=>{
                    if(response.data.code == 0){
                        dialogs('success',response.data.message);
					}else{
                        dialogs('error',response.data.message);
					}
                    })
            },
            dealAdvancePaymentRechargeDetail(){
                this.$http.post('./dev/tool/advancePaymentRechargeDetail/deal')
                    .then((response) => {
                        dialogs('success', response.data.message);
                    })
			},
            generatePayReport(){
                this.$http.post('./dev/tool/payReport/generate')
                    .then((response) => {
                        dialogs('success', response.data.message);
                    })
			},
            repairSubsidyAccount(){
                this.$http.post('./dev/tool/subsidyAccount/repair')
                    .then((response) => {
                        dialogs('success', response.data.message);
                    })
			},
            updateSubsidyWithhold(){
                this.$http.post('./dev/tool/subsidyWithhold/update')
                    .then((response) => {
                        dialogs('success', response.data.message);
                    })
			},
            generateActivityIncomeCostAgain(){
                this.$http.post('./dev/tool/activityIncomeCost/generate/again')
                    .then((response) => {
                        dialogs('success', response.data.message);
                    })
			},
			repairTradeTime(e){
                let data={
                    serialNumber:this.errorSerialNumbers
                }
                this.$http.post('./dev/tool/tradeTime/repair?'+$.param(data))
                    .then((response)=>{
                        dialogs('success',response.data.message);
                    })
			}
        },
        ready() {
            this.getSubcompany();
            this.getCity();
        },
       watch:{
       }
    }
</script>