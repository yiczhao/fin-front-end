'use strict'

export default function (router) {
	router.map({
		/* 首页 */
		'/default': {
			name: 'default',
			router_type: "default",
			component: function (resolve) {
				require(['./views/default.vue'], resolve);
			}
		},
		//账户列表
		'/account-management': {
			name: 'account-management',
			router_type: "account",
			component: function (resolve) {
				require(['./views/AccountManagement/account-management.vue'], resolve);
			}
		},
		//账户列表-备付金明细
		'/provisions-info/:accountId/:certificate/:aname/:balance/:subCompanyID': {
			name: 'provisions-info',
			router_type: "account",
			component: function (resolve) {
				require(['./views/AccountManagement/provisions-info.vue'], resolve);
			}
		},
		//账户列表-本金明细
		'/principle-info/:principleId': {
			name: 'principle-info',
			router_type: "account",
			component: function (resolve) {
				require(['./views/AccountManagement/principle-info.vue'], resolve);
			}
		},
		//交易处理-交易明细
		'/trade-info/:subsidyPayId/:subsidyTaxRebateId/:merchantOperationID/:merchantName/:activityOperationID/:serialNumber/:tradeCompanyId': {
			name: 'trade-info',
			router_type: "trade",
			component: function (resolve) {
				require(['./views/Transaction/trade-info.vue'], resolve);
			}
		},
		//交易处理-手工结算
		'/manually-settlement/': {
			name: 'manually-settlement',
			router_type: "trade",
			component: function (resolve) {
				require(['./views/Transaction/manually-settlement.vue'], resolve);
			}
		},
		//交易处理-手工结算
		'/manually-settlement-batchpay/': {
			name: 'manually-settlement-batchpay',
			router_type: "trade",
			component: function (resolve) {
				require(['./views/Transaction/manually-settlement-batchpay.vue'], resolve);
			}
		},
		//交易处理-调账管理
		'/adjust-trade-detailpre/': {
			name: 'adjust-trade-detailpre',
			router_type: "trade",
			component: function (resolve) {
				require(['./views/Transaction/adjust-trade-detailpre.vue'], resolve);
			}
		},
		//交易处理-调账管理-调账明细
		'/adjust-trade-detailpre-list/:adjustTradeDetailPreId': {
			name: 'adjust-trade-detailpre-list',
			router_type: "trade",
			component: function (resolve) {
				require(['./views/Transaction/adjust-trade-detailpre-list.vue'], resolve);
			}
		},
		//交易处理-交易白名单
		'/white-lists/': {
			name: 'white-lists',
			router_type: "trade",
			component: function (resolve) {
				require(['./views/Transaction/white-lists.vue'], resolve);
			}
		},
		//交易处理-异常交易
		'/Abnormal-transaction/': {
			name: 'Abnormal-transaction',
			router_type: "trade",
			component: function (resolve) {
				require(['./views/Transaction/Abnormal-transaction.vue'], resolve);
			}
		},
		//手工单管理-列表查询
		'/manual-trade-detail/': {
			name: 'manual-trade-detail',
			router_type: "trade",
			component: function (resolve) {
				require(['./views/Transaction/manual-trade-detail.vue'], resolve);
			}
		},
		//本金收入-通道管理
		'/running-channel': {
			name: 'running-channel',
			router_type: "Principal",
			component: function (resolve) {
				require(['./views/PrincipalIncome/running-channel.vue'], resolve);
			}
		},
		//本金收入-通道管理
		'/principle-order': {
			name: 'principle-order',
			router_type: "Principal",
			component: function (resolve) {
				require(['./views/PrincipalIncome/principle-order.vue'], resolve);
			}
		},
		//本金收入-对账
		'/balance-of-account/:principleAccountId/:shortId/:tradeTime/:routeName': {
			name: 'balance-of-account',
			router_type: "Principal",
			component: function (resolve) {
				require(['./views/PrincipalIncome/balance-of-account.vue'], resolve);
			}
		},
		//备付金支出-付款明细
		'/payment-details/:reserveCashOrderNumber/:payType/:merchantOperationIDs': {
			name: 'payment-details',
			router_type: "payment",
			component: function (resolve) {
				require(['./views/PaymentOfPayment/payment-details.vue'], resolve);
			}
		},
		//备付金支出-额度采购
		// '/limit-purchase-detail/:id':{
		//     name:'limit-purchase-detail',
		//      router_type:"payment",
		//     component: function(resolve){
		//         require(['./views/PaymentOfPayment/limit-purchase-detail.vue'],resolve);
		//     }
		// },
		//备付金支出-退税管理
		'/subsidy-management': {
			name: 'subsidy-management',
			router_type: "payment",
			component: function (resolve) {
				require(['./views/PaymentOfPayment/subsidy-management.vue'], resolve);
			}
		},
		//备付金支出-退税管理-待划付明细
		'/unpaid-amount/:unpaidId/:unpaidHd/:unpaidSh/:unpaidTs/:unpaidYe': {
			name: 'unpaid-amount',
			router_type: "payment",
			component: function (resolve) {
				require(['./views/PaymentOfPayment/unpaid-amount.vue'], resolve);
			}
		},
		//备付金支出-退税管理-已划付明细
		'/paid-amount/:paidId/:paidHd/:paidSh': {
			name: 'paid-amount',
			router_type: "payment",
			component: function (resolve) {
				require(['./views/PaymentOfPayment/paid-amount.vue'], resolve);
			}
		},
		//备付金支出-退税管理-批量提现
		'/subsidy-management-batchpay': {
			name: 'subsidy-management-batchpay',
			router_type: "payment",
			component: function (resolve) {
				require(['./views/PaymentOfPayment/subsidy-management-batchpay.vue'], resolve);
			}
		},
		//备付金支出-预付款划付
		'/advance-payment-detail/:advanceId': {
			name: 'advance-payment-detail',
			router_type: "payment",
			component: function (resolve) {
				require(['./views/PaymentOfPayment/advance-payment-detail.vue'], resolve);
			}
		},
		//备付金支出-划付复核
		'/pay-recheck/:recheckId': {
			name: 'pay-recheck',
			router_type: "payment",
			component: function (resolve) {
				require(['./views/PaymentOfPayment/pay-recheck.vue'], resolve);
			}
		},
		//备付金支出-补贴划付
		'/subsidy-appropriation/:subsidyPayID/:subsidySHid/:subsidyHDid': {
			name: 'subsidy-appropriation',
			router_type: "payment",
			component: function (resolve) {
				require(['./views/PaymentOfPayment/subsidy-appropriation.vue'], resolve);
			}
		},
		//备付金支出-补贴退税
		'/subsidy-tax-rebate/:subsidyTaxRebateID': {
			name: 'subsidy-tax-rebate',
			router_type: "payment",
			component: function (resolve) {
				require(['./views/PaymentOfPayment/subsidy-tax-rebate.vue'], resolve);
			}
		},
		//备付金支出-供应商划付
		'/provider-pay-detail/:providerID': {
			name: 'provider-pay-detail',
			router_type: "payment",
			component: function (resolve) {
				require(['./views/PaymentOfPayment/provider-pay-detail.vue'], resolve);
			}
		},
		/* 三方管理-账户列表 */
		'/third-party/': {
			name: 'third-party',
			router_type: "third",
			component: function (resolve) {
				require(['./views/ThreeParty/third-party.vue'], resolve);
			}
		},
		/* 三方管理-活动收入成本管理 */
		'/activity-cost-management/:activityCostNumber/:activityCostName': {
			name: 'activity-cost-management',
			router_type: "third",
			component: function (resolve) {
				require(['./views/ThreeParty/activity-cost-management.vue'], resolve);
			}
		},
		/* 三方管理-活动收入成本管理-计算公式 */
		'/calculation-formula/:acmActivityID/:acmCompanyID/': {
			name: 'calculation-formula',
			router_type: "third",
			component: function (resolve) {
				require(['./views/ThreeParty/calculation-formula.vue'], resolve);
			}
		},
		/* 三方管理-账户明细 */
		'/third-info/:id/:serialNumber': {
			name: 'third-info',
			router_type: "third",
			component: function (resolve) {
				require(['./views/ThreeParty/third-info.vue'], resolve);
			}
		},
		/* 三方管理-合同管理 */
        // '/contract-management': {
        //     name: 'contract-management',
        //     router_type: "third",
        //     component: function (resolve) {
        //         require(['./views/ThreeParty/contract-management.vue'], resolve);
        //     }
        // },
		/* 三方管理-新增合同 */
        '/contract-add/:contractAddId': {
            name: 'contract-add',
            router_type: "third",
            component: function (resolve) {
                require(['./views/ThreeParty/contract-add.vue'], resolve);
            }
        },
		/* 三方管理-合同管理 */
		'/contract-management-info/:contractId/:contractName/:contractCity/:contractCompanyName/:contractCompanyId': {
			name: 'contract-management-info',
			router_type: "third",
			component: function (resolve) {
				require(['./views/ThreeParty/contract-management-info.vue'], resolve);
			}
		},
		/* 三方管理-合同管理-回款开票明细 */
        '/invoice-collection/:invoiceCollectionId/:invoiceCollectionName/:invoiceCollectionContract/:invoiceCollectionsubCompanyID': {
            name: 'invoice-collection',
            router_type: "third",
            component: function (resolve) {
                require(['./views/ThreeParty/invoice-collection.vue'], resolve);
            }
        },
		/* 报表管理-财务指标分析表(总) */
		'/financial-index-total': {
			name: 'financial-index-total',
			router_type: "report",
			component: function (resolve) {
				require(['./views/ReportForm/financial-index-total.vue'], resolve);
			}
		},
		/* 报表管理-财务指标分析表（分） */
		'/financial-index-branch': {
			name: 'financial-index-branch',
			router_type: "report",
			component: function (resolve) {
				require(['./views/ReportForm/financial-index-branch.vue'], resolve);
			}
		},
		/* 报表管理-分公司财务指标分析表 */
		'/branch-financial-indicators': {
			name: 'branch-financial-indicators',
			router_type: "report",
			component: function (resolve) {
				require(['./views/ReportForm/branch-financial-indicators.vue'], resolve);
			}
		},
		/* 报表管理-費用管理 */
		'/expense-management': {
			name: 'expense-management',
			router_type: "report",
			component: function (resolve) {
				require(['./views/ReportForm/expense-management.vue'], resolve);
			}
		},
		/* 报表管理-指标管理 */
		'/index-management': {
			name: 'index-management',
			router_type: "report",
			component: function (resolve) {
				require(['./views/ReportForm/index-management.vue'], resolve);
			}
		},
		/* 报表管理-部门费用明细 */
		'/departmental-expense-detail': {
			name: 'departmental-expense-detail',
			router_type: "report",
			component: function (resolve) {
				require(['./views/ReportForm/departmental-expense-detail.vue'], resolve);
			}
		},
		/* 报表管理-异地激活收入成本分配总表 */
		'/allopatry-distribution-total': {
			name: 'allopatry-distribution-total',
			router_type: "report",
			component: function (resolve) {
				require(['./views/ReportForm/allopatry-distribution-total.vue'], resolve);
			}
		},
		/* 报表管理-异地激活收入成本分配明细表 */
		'/allopatry-distribution-detail/:distributionsubCompanyId/:distributionbusinessTypeId/:distributionsnType': {
			name: 'allopatry-distribution-detail',
			router_type: "report",
			component: function (resolve) {
				require(['./views/ReportForm/allopatry-distribution-detail.vue'], resolve);
			}
		},
		/* 报表管理-合伙人订单 */
		// '/partner-order': {
		// 	name: 'partner-order',
		// 	router_type: "report",
		// 	component: function (resolve) {
		// 		require(['./views/ReportForm/partner-order.vue'], resolve);
		// 	}
		// },
		/* 报表管理-合伙人订单 */
		// '/shipment-quantity': {
		// 	name: 'shipment-quantity',
		// 	router_type: "report",
		// 	component: function (resolve) {
		// 		require(['./views/ReportForm/shipment-quantity.vue'], resolve);
		// 	}
		// },
		/*商户账户管理列表 */
		'/merchant-account/': {
			name: 'merchant-account',
			router_type: "business",
			component: function (resolve) {
				require(['./views/MerchantAccount/merchant-account.vue'], resolve);
			}
		},
		/*商户账户管理列表 -- 明细列表 */
		'/merchant-account-detail/:merchantID/': {
			name: 'merchant-account-detail',
			router_type: "business",
			component: function (resolve) {
				require(['./views/MerchantAccount/merchant-account-detail.vue'], resolve);
			}
		},

		/*商户账户管理列表 -- 转账配置 */
		'/merchant-account-transConf/:transConfMerchantID/:transConfMerchantOperationID/': {
			name: 'merchant-account-transConf',
			router_type: "business",
			component: function (resolve) {
				require(['./views/MerchantAccount/trans-configure.vue'], resolve);
			}
		},

		/* 商户管理-商户列表 */
		'/business-lists/': {
			name: 'business-lists',
			router_type: "business",
			component: function (resolve) {
				require(['./views/BusinessManagement/business-lists.vue'], resolve);
			}
		},
		// /* 商户管理-商户列表-活动管理 */
		// '/merchat-activity-subsidy-account/:merchantID1/:merchantName1/:merchantOperationID1':{
		//     name:'merchat-activity',
		//     component: function(resolve){
		//         require(['./views/BusinessManagement/merchat-activity-subsidy-account.vue'],resolve);
		//     }
		// },
		/* 商户管理-商户列表-活动管理-发票账户明细 */
		'/invoice-account-detail/:invoiceHDid/:invoiceBTid': {
			name: 'invoice-account',
			router_type: "payment",
			component: function (resolve) {
				require(['./views/BusinessManagement/invoice-account-detail.vue'], resolve);
			}
		},
		/* 商户管理-商户列表-活动管理-暂扣税金账户明细 */
		'/suspension-tax-account-detail/:suspensionHDid/:suspensionBTid': {
			name: 'suspension-tax',
			router_type: "payment",
			component: function (resolve) {
				require(['./views/BusinessManagement/suspension-tax-account-detail.vue'], resolve);
			}
		},
		/* 商户管理-额度采购 */
		// '/business-limit/:id':{
		//     name:'business-limit',
		//     component: function(resolve){
		//         require(['./views/BusinessManagement/business-limit.vue'],resolve);
		//     }
		// },
		/* 商户管理-额度采购账户列表 */
		// '/limitaccount-management/:limitPurchaseMerchantInfoID/:accountName':{
		//     name:'limitaccount-management',
		//     component: function(resolve){
		//         require(['./views/BusinessManagement/limitaccount-management.vue'],resolve);
		//     }
		// },
		/* 商户管理-额度采购账户明细 */
		// '/limitaccount-info/:limitPurchaseMerchantInfoID/:accountName':{
		//     name:'limitaccount-info',
		//     component: function(resolve){
		//         require(['./views/BusinessManagement/limitaccount-info.vue'],resolve);
		//     }
		// },
		/* 商户管理-预付款 */
		'/prepayment-lists/': {
			name: 'prepayment-lists',
			router_type: "business",
			component: function (resolve) {
				require(['./views/BusinessManagement/prepayment-lists.vue'], resolve);
			}
		},
		/* 商户管理-预付款门店管理 */
		'/prepayment-store/:id/:storeMerchantName': {
			name: 'prepayment-store',
			router_type: "business",
			component: function (resolve) {
				require(['./views/BusinessManagement/prepayment-store.vue'], resolve);
			}
		},
		/* 商户管理-预付款账户明细 */
		'/prepayment-info/:id/:orderNumber': {
			name: 'prepayment-info',
			router_type: "business",
			component: function (resolve) {
				require(['./views/BusinessManagement/prepayment-info.vue'], resolve);
			}
		},
		/* 活动管理-活动列表 */
		'/activity-lists/:operationID/:name/:osubcompanyID': {
			name: 'activity-lists',
			router_type: "activity",
			component: function (resolve) {
				require(['./views/Activity/activity-lists.vue'], resolve);
			}
		},
		/* 活动管理-活动列表-计算公式 */
		'/activity-formulae/:activityID/:subCompanyID/:formulaeID/:formulaeName': {
			name: 'activity-formulae',
			router_type: "activity",
			component: function (resolve) {
				require(['./views/Activity/activity-formulae.vue'], resolve);
			}
		},
		// 活动执行表管理
		'/activity-effect-lists/': {
			name: 'activity-effect-lists',
			router_type: "activity",
			component: function (resolve) {
				require(['./views/Activity/activity-effect-lists.vue'], resolve);
			}
		},
		// 税率管理
		'/taxRate/': {
			name: 'taxRate',
			router_type: "third",
			component: function (resolve) {
				require(['./views/Activity/taxRate.vue'], resolve);
			}
		},
		/* 系统配置-员工管理 */
		'/user-managerment/': {
			name: 'user-managerment',
			router_type: "user",
			component: function (resolve) {
				require(['./views/SystemConfiguration/user-managerment.vue'], resolve);
			}
		},
		/* 系统配置-日志管理 */
		'/log-management/': {
			name: 'log-management',
			router_type: "user",
			component: function (resolve) {
				require(['./views/SystemConfiguration/log-management.vue'], resolve);
			}
		},
		/* 系统配置-日志管理 */
		'/uploadForm/': {
			name: 'uploadForm',
			router_type: "user",
			component: function (resolve) {
				require(['./views/uploadForm.vue'], resolve);
			}
		},
		// 转到登录页
		'*': {
			component: function () {
				window.location.href = authUrl1
			}
		}
	})
	router.beforeEach(transition => {
		sessionStorage.setItem('isHttpin', 0);
		document.querySelector('body').scrollTop = 0;
		transition.next();
	});
	router.afterEach((transition) => {
		Message.hide();
		window.routerType = transition.to.matched[0].handler.router_type
		if (back_json.num == 0) {
			back_json.isback = true;
		}
		else {
			back_json.isback = false;
			back_json.num = 0;
			localStorage.removeItem(transition.to.path);
		}
	});
}