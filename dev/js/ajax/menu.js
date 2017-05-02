module.exports = [
	{
		name: '首页',
		icon: 'icon-home',
		type: 'default',
		sub_menu: [
			{name: '首页', link: 'default'}
		]
	},
	{
		name: '账户管理',
		icon: ' icon-user',
		ksa: 'account_manage',
		type: 'account',
		sub_menu: [
			{name: '账户管理', link: 'account-management', ksa: 'account_manage'}
		]
	},
	{
		name: '交易管理',
		icon: 'icon-transmission',
		type: 'trade',
		ksa: 'trade_detail_manage',
		sub_menu: [
			{name: '交易管理', link: 'trade-info', ksa: 'trade_detail_manage'},
		]
	},
	// {
	//     name: '本金收入',
	//     icon: 'icon-BJBZ',
	//     type:'Principal',
	//     ksa:'principle_cash_order',
	//     sub_menu: [
	//         {name: '本金收入', link: 'principle-order',ksa:'principle_cash_order'},
	//     ]
	// },
	{
		name: '备付金支出',
		icon: 'icon-coin-yen',
		type: 'payment',
		ksa: 'reserve_cash_detail_manage',
		sub_menu: [
			{name: '备付金支出', link: 'payment-details', ksa: 'reserve_cash_detail_manage'},
		]
	},
	{
		name: '商户管理',
		icon: 'icon-table2',
		ksa: 'merchant_manage',
		type: 'business',
		sub_menu: [
			{name: '商户管理', link: 'business-lists', ksa: 'merchant_manage'},
		]
	},
	{
		name: '三方管理',
		icon: ' icon-users4',
		type: 'third',
		ksa: 'third_party_account_manage',
		sub_menu: [
			{name: '三方管理', link: 'third-party', ksa: 'third_party_account_manage'}
		]
	},
	{
		name: '报表管理',
		icon: 'icon-table2',
		// ksa: 'report_form_mange',
		type: 'report',
		sub_menu: [
			{name: '报表管理', link: 'financial-index-total', ksa: 'report_form_mange'},
		]
	},
	{
		name: '活动管理',
		icon: 'icon-flag3',
		type: 'activity',
		ksa: 'activity_manage',
		sub_menu: [
			{name: '活动管理', link: 'activity-lists', ksa: 'activity_manage'},
		]
	},
	{
		name: '系统配置',
		icon: ' icon-wrench',
		type: 'user',
		ksa: 'user_manage',
		sub_menu: [
			{name: '系统配置', link: 'user-managerment', ksa: 'user_manage'},
		]
	},
]
