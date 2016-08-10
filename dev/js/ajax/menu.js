module.exports = [
    {
        name: '首页',
        icon: 'icon-home',
        sub_menu: [
            {name: '首页', link: 'default'}
        ]
    },
    {
        name: '账户管理',
        icon: ' icon-user',
        ksa:'account',
        sub_menu: [
            {name: '账户管理', link: 'account-management',ksa:'account'}
        ]
    },
    {
        name: '交易管理',
        icon: 'icon-table2',
        ksa:'function_master',
        sub_menu: [
            {name: '交易明细', link: 'trade-info',ksa:'system_manage'},
            {name: '异常交易', link: 'Abnormal-transaction',ksa:'system_manage'},
            {name: '异常白名单', link: 'white-lists',ksa:'system_manage'}
        ]
    },
    {
        name: '备付金支出',
        icon: 'icon-table2',
        sub_menu: [
            {name: '付款明细', link: 'payment-details'},
            {name: '补贴划付', link: 'subsidy-appropriation'},
            // {name: '额度采购', link: 'limit-purchase-detail'},
            {name: '补贴退税', link: 'subsidy-tax-rebate'},
            {name: '预付款划付', link: 'advance-payment-detail'}
        ]
    },
    {
        name: '商户管理',
        icon: 'icon-table2',
        sub_menu: [
            {name: '商户管理', link: 'business-lists'},
            // {name: '额度采购', link: 'business-limit'},
            {name: '预付款', link: 'prepayment-lists'}
        ]
    },
    {
        name: '三方管理',
        icon: ' icon-users4',
        sub_menu: [
            {name: '三方管理', link: 'third-party'}
        ]
    },
    {
        name: '活动管理',
        icon: 'icon-flag3',
        sub_menu: [
            {name: '活动管理', link: 'activity-lists'}
        ]
    },
    {
        name: '系统配置',
        icon: ' icon-wrench',
        sub_menu: [
            {name: '员工管理', link: 'user-managerment'},
            {name: '系统日志', link: 'log-management'}
        ]
    },
]
