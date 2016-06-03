export default function install(Vue) {
    var _o={};

    //- todo 公用
    /**
     * @description 获取分公司接口地址
     * @author 洪钢
     * @method POST
     */
    _o.subcompany = './subcompany/list';
    /**
     * @description 获取分公司接口地址
     * @author 洪钢
     * @method POST
     */
    _o.city = './city/list';
    /**
     * @description 上传接口地址
     * @author 洪钢
     * @method POST
     */
    _o.upload = './file/upload';
    /**
     * @description 查看当前订单号及付款方式接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.skipToOrder = 'reservecash/order/selectReserveCashOrderByDetails';
    /**
     * @description 获取商户数据接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.getmerchant_list ='./merchant/list';


    //- todo 登陆 login
    /**
     * @description 登陆接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.login = './passport/login';

    //- todo 财务处理-账户列表 account-management
    /**
     * @description 账户列表接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.banklist = './bankaccount/list';
    /**
     * @description 负责人接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.queryperson = './chargeperson/query/';
    /**
     * @description 修改负责人接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.saveperson = './chargeperson/save';
    /**
     * @description 启用账户接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.startaccount = './bankaccount/change/';
    /**
     * @description 删除账户接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.deleteaccount = './bankaccount/delete/';
    /**
     * @description 新增及修改账户接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.changeaccount = './bankaccount/save';

    //- todo 财务处理-账户管理-备付金明细 provisions-info
    /**
     * @description 备付金明细列表接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.detail = './reservecash/detail';
    /**
     * @description 对账数据接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.selectReserveCashOrderListByID = './reservecash/selectReserveCashOrderListByID';
    /**
     * @description 自动对账接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.associateCheck = './reservecash/associateCheck';
    /**
     * @description 人工对账接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.manualCheck = './reservecash/manualCheck';
    /**
     * @description 总收入支出接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.incomeAndPayoutAmount = './reservecash/incomeAndPayoutAmount';

    //- todo 财务处理-交易明细 trade-info
    /**
     * @description 交易明细列表接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.tradedetail = './tradedetail/list';
    /**
     * @description 添加交易接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.addtrade = './tradedetail/add';
    /**
     * @description 合计接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.tradedetailsum = './tradedetail/sum';

    //- todo  备付金支出-付款明细 payment-details
    /**
     * @description 备付金支出明细列表接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.reservecash_list = './reservecash/order/list';
    /**
     * @description 备付金支出明细详情接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.getpart = './reservecash/order/getpart/';
    /**
     * @description 查询对账数据接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.checklist = './reservecash/order/checklist/';
    /**
     * @description 确认对账接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.checking = './reservecash/order/checking';
    /**
     * @description 更新备付金账单接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.reservecash_update='./reservecash/order/update/';
    /**
     * @description 申请划付备付金账单接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.reservecash_allow='./reservecash/order/allow/';
    /**
     * @description 删除备付金详请接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.reservecash_delete='reservecash/order/deleteDetail';
    /**
     * @description 备付金账单关闭接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.reservecash_close='./reservecash/order/close/';
    /**
     * @description 备付金账单退回接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.reservecash_retrial='./reservecash/order/retrial';
    /**
     * @description 确认划付备付金账单接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.reservecash_applypay='./ reservecash/order/applypay';

    //- todo  备付金支出-预付款划付 advance-payment-details
    /**
     * @description 预付款划付列表接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.advance_list = './advancePaymentDetail/list';

    //- todo  备付金支出-额度采购 limit-purchase-detail
    /**
     * @description 预付款划付列表接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.limit_list = './limitPurchaseDetail/list';

    //- todo  备付金支出-补贴划付 subsidy-appropriation
    /**
     * @description 补贴划付列表接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.appropriation_list = './subsidypaydetail/list';
    /**
     * @description 补贴划付更新接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.subsidy_update = './subsidypaydetail/update/';
    /**
     * @description 补贴划付申请划付接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.subsidy_applyPay = './subsidypaydetail/applyPay';
    /**
     * @description 申请划付数据查询接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.select_subsidypay = './subsidypaydetail/selectApplyPayInfoByIDs';

    //- todo  备付金支出-补贴退税 subsidy-tax-rebate
    /**
     * @description 补贴退税列表接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.rebate_list = './subsidyTaxRebateDetail/list';
    /**
     * @description 补贴退税更新接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.rebate_update = './subsidyTaxRebateDetail/update/';
    /**
     * @description 补贴退税申请划付接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.rebate_applyPay = './subsidyTaxRebateDetail/applyPay';
    /**
     * @description 申请划付数据查询接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.select_rebate = './subsidyTaxRebateDetail/selectApplyPayInfoByIDs';

    //- todo  系统配置-系统日志 log-management
    /**
     * @description 系统日志列表接口地址
     * @author 洪钢
     * @method POST
     */
    _o.log_list = './log/list';
    /**
     * @description 系统日志描述及url接口地址
     * @author 洪钢
     * @method POST
     */
    _o.log_description = './log/description';
    /**
     * @description 日志详情
     * @author 洪钢
     * @method POST
     */
    _o.log_info = './log/info/';

    //- todo  系统配置-系统日志 user-management
    /**
     * @description 员工管理接口地址
     * @author 洪钢
     * @method POST
     */
    _o.user_list = './user/list';
    /**
     * @description 员工管辖查询接口地址
     * @author 洪钢
     * @method POST
     */
    _o.userControl_list = './user/userControlSpanList/';
    /**
     * @description 员工管辖保存接口地址
     * @author 洪钢
     * @method POST
     */
    _o.saveUserControlSpans = './user/saveUserControlSpans';
    /**
     * @description 新增员工查询接口地址
     * @author 洪钢
     * @method POST
     */
    _o.readyImportUser = './user/readyImportUser';
    /**
     * @description 新增员工保存接口地址
     * @author 洪钢
     * @method POST
     */
    _o.importUser = './user/importUser';

    //- todo  商户管理-商户列表 business-lists
    /**
     * @description 商户列表数据接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.merchant_lists = './merchant/pages';
    /**
     * @description 划款账户接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.merchant_account = './merchant/account';
    /**
     * @description 编辑划款账户接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.merchant_update = './merchant/update';

    //- todo  商户管理-额度采购 business-limit
    /**
     * @description 额度采购数据接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.limitPurchaseMerchant_lists = './limitPurchaseMerchant/list';
    /**
     * @description 额度采购编辑查询接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.limitPurchaseMerchant_history = './limitPurchaseMerchant/history/';
    /**
     * @description 额度采购编辑保存接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.limitPurchaseMerchant_editDigest = './limitPurchaseMerchant/editDigest';
    /**
     * @description 额度采购停用启用接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.limitPurchaseMerchant_change = './limitPurchaseMerchant/change';
    /**
     * @description 额度采购消化商户查询接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.limitPurchaseMerchant_viewDigest = './limitPurchaseMerchant/viewDigest/';
    /**
     * @description 额度采购添加商户接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.limitPurchaseMerchant_add = './limitPurchaseMerchant/add';
    /**
     * @description 额度采购添加消化商户接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.limitPurchaseMerchant_addDigest = './limitPurchaseMerchant/addDigest';

    //- todo  商户管理-预付款 prepayment-lists
    /**
     * @description 预付款数据接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.prepayment_lists = './advancePaymentMerchant/list';
    /**
     * @description 获取预付充值数据接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.advancePaymentMerchant = './ advancePaymentMerchant/selectRechargeInfoByID';
    /**
     * @description 预付申请付款接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.applyAdvancePay = './advancePaymentMerchant/applyAdvancePay';
    /**
     * @description 预付添加商户接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.insertBatch = './advancePaymentMerchant/insertBatch';

    //- todo  商户管理-额度采购-账户列表 prepayment-lists
    /**
     * @description 列表数据接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.limitPurchaseAccount = './limitPurchaseAccount/list';
    /**
     * @description 充值接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.limitPurchase_selectRechargeInfoByID = './limitPurchaseAccount/selectRechargeInfoByID';
    /**
     * @description 确认充值接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.recharge = './limitPurchaseAccount/recharge';

    Object.defineProperties(Vue.prototype, {
        $API: {get(){return _o}}
    })
}
