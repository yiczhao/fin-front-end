export default function install(Vue) {
    var _o={};
    
    //- todo 登陆 login
    /**
     * @description 登陆接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.login = './passport/login';

    //todo 导出
    /**
     * @description 交易明细导出接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.tradeDetailexcel = '/data/export/excel/tradeDetail?';
    /**
     * @description 交易白名单导出接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.abnormalWhiteexcel = '/data/export/excel/abnormalWhite?';
    /**
     * @description 异常交易导出接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.abnormalexcel = '/data/export/excel/abnormal?';
    /**
     * @description 导出接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.payDetailexcel='/data/export/excel/payDetail?';
    /**
     * @description 申请划付数据查询接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.subsidyPayexcel = '/data/export/excel/subsidyPay?';
    /**
     * @description 补贴退税导出接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.subsidyTaxexcel = '/data/export/excel/subsidyTax?';
    /**
     * @description 活动管理页面数据导出接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.activityManage = '/data/export/excel/activityManage?';
    /**
     * @description 发票充值页面数据导出接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.invoiceRechargeexcel = '/data/export/excel/invoiceRecharge?';
    /**
     * @description 商户补贴账户页面数据导出接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.subsidyAccountexcel = '/data/export/excel/subsidyAccount?';
    /**
     * @description 暂扣税金页面数据导出接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.suspensionTaxAccountDetailexcel = '/data/export/excel/suspensionTaxAccountDetail?';
    /**
     * @description 划付复核页面数据导出接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.payrecheckexcel = '/data/export/excel/payRecheck?';
    /**
     * @description 手工结算页面数据导出接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.manuallyexcel = '/data/export/excel/manuallySettle?';
    /**
     * @description 活动执行效果页面数据导出接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.activityEffectExcel = '/data/export/excel/activityEffect?';


    //- todo 财务处理-账户列表 account-management
    /**
     * @description 账户列表接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.banklist = './bankAccount/list?';
    /**
     * @description 负责人接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.queryperson = './chargePerson/info/';
    /**
     * @description 修改负责人接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.saveperson = './chargePerson/save';
    /**
     * @description 启用账户接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.startaccount = './bankAccount/enable/';
    /**
     * @description 删除账户接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.deleteaccount = './bankAccount/delete/';
    /**
     * @description 新增及修改账户接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.changeaccount = './bankAccount/save';

    //- todo 财务处理-账户管理-备付金明细 provisions-info
    /**
     * @description 备付金明细列表接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.detail = './reserveCashDetail/list?';
    /**
     * @description 对账数据接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.selectReserveCashOrderListByID = './reserveCashDetail/check/list/';
    /**
     * @description 自动对账接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.associateCheck = './reserveCashDetail/check/associate';
    /**
     * @description 人工对账接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.manualCheck = './reserveCashDetail/check/manual';
    /**
     * @description 总收入支出接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.incomeAndPayoutAmount = './reserveCashDetail/total?';

    //- todo 交易管理-交易明细 trade-info
    /**
     * @description 交易明细列表接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.tradedetail = './tradeDetail/list?';
    /**
     * @description 合计接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.tradedetailsum = './tradeDetail/total?';
    /**
     * @description 跳转三方接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.skipToThird = './tradeDetail/thirdPartyAccount/detail/';
    /**
     * @description 查询简称余额
     * @author 冷艳君
     * @method GET
     */
    _o.getBalance = './bankAccount/reserveCash/info/';

    //- todo 交易管理-手工单管理 manual-trade-detail
    /**
     * @description 交易单列表接口地址
     * @author 洪钢
     * @method GET
     */
    _o.getManualTradeDetailList = './manualTradeDetail/list?';
    /**
     * @description 交易单合计接口地址
     * @author 洪钢
     * @method GET
     */
    _o.getManualTradeDetailSum = './manualTradeDetail/total?';

    /**
     * @description 添加手工单接口地址
     * @author 洪钢
     * @method POST
     */
    _o.addtrade = './manualTradeDetail/save';

    /**
     * @description 查询手工单接口地址
     * @author 洪钢
     * @method GET
     */
    _o.searchManualTradeDetail = './manualTradeDetail/item?';

    /**
     * @description 提交手工单审核接口地址
     * @author
     * @method POST
     */
    _o.applyManualTradeDetail = './manualTradeDetail/apply?';

    /**
     * @description 审核退回手工单接口地址
     * @author 洪钢
     * @method POST
     */
    _o.refusedManualTradeDetail = './manualTradeDetail/refused?';

    /**
     * @description 审核通过手工单接口地址
     * @author 洪钢
     * @method POST
     */
    _o.approvedManualTradeDetail = './manualTradeDetail/approved?';

    /**
     * @description 删除手工单接口地址
     * @author 洪钢
     * @method GET
     */
    _o.deleteManualTradeDetail = './manualTradeDetail/delete?';

    //- todo 交易管理-调账管理 manually-settlement
    /**
     * @description 调账管理列表接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.adjustTradeDetailPre_list = './adjustTradeDetailPre/list?';
    /**
     * @description 调账管理合计接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.adjustTradeDetailPre_total = './adjustTradeDetailPre/tradeCountAndAmount?';
    /**
     * @description 调账管理编辑接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.adjustTradeDetailPre_item = './adjustTradeDetailPre/item/';
    /**
     * @description 调账管理添加接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.adjustTradeDetailPre_save = './adjustTradeDetailPre/save';


    //- todo 交易管理-手工结算 manually-settlement
    /**
     * @description 手工结算列表接口地址
     * @author 洪钢
     * @method GET
     */
    _o.manually_list = './manuallySettlement/tradeDetail/list?';
    /**
     * @description 手工结算合计接口地址
     * @author 洪钢
     * @method GET
     */
    _o.manuallysum = './manuallySettlement/tradeDetail/total?';
    /**
     * @description 手工结算划付接口地址
     * @author 洪钢
     * @method POST
     */
    _o.manuallypay = './manuallySettlement/generate';
    /**
     * @description 查询手工结算划付接口地址
     * @author 洪钢
     * @method GET
     */
    _o.select_manuallypay = './manuallySettlement/info?';


    //- todo 交易管理-交易白名单 white-lists
    /**
     * @description 交易白名单列表接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.whitedetail = './exception/trade/white/list/list?';
    /**
     * @description 保存交易白名单接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.whitesave = './exception/trade/white/list/save';
    /**
     * @description 失效白名单接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.whiteexpired = './exception/trade/white/list/expired/';
    /**
     * @description 查询活动接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.queryA = './activity/item?';
    /**
     * @description 查询商户接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.queryC = './merchant/item?';
    
    //- todo 交易管理-异常交易 white-lists
    /**
     * @description 异常交易列表接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.abnormaldetail = './exception/trade/list?';
    /**
     * @description 异常交易合计接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.abnormaltotal = './exception/trade/total?';
    /**
     * @description 异常交易处理接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.abnormalhandle = './exception/trade/handle';

    //- todo  备付金支出-付款明细 payment-details
    /**
     * @description 备付金支出明细列表接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.reservecash_list = './reserveCashOrder/list?';
    /**
     * @description 备付金支出明细补贴划付详情接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.getpart1 = './reserveCashOrder/subsidyPayDetail/list/';
    /**
     * @description 备付金支出明细补贴退税详情接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.getpart3 = './reserveCashOrder/subsidyTaxRebateDetail/list/';
    /**
     * @description 备付金支出明细预付款详情接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.getpart4 = './reserveCashOrder/advancePaymentAccountDetail/list/';
    /**
     * @description 备付金支出明细税金提现详情接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.getpart10 = './reserveCashOrder/suspensionTaxAccountDetail/list/';
    /**
     * @description 查询对账数据接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.checklist = './reserveCashOrder/check/list/';
    /**
     * @description 确认对账接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.checking = './reserveCashOrder/check';
    /**
     * @description 更新备付金账单接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.reservecash_update='./reserveCashOrder/update/';
    /**
     * @description 确认划付备付金账单接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.reservecash_allow='./reserveCashOrder/allow/';
    /**
     * @description 删除备付金详请接口地址
     * @author 冷艳君
     * @method DELETE
     */
    _o.reservecash_delete='reserveCashOrder/stream/delete';
    /**
     * @description 备付金账单关闭接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.reservecash_close='./reserveCashOrder/close/';
    /**
     * @description 备付金账单退回接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.reservecash_retrial='./reserveCashOrder/reject';
    /**
     * @description 申请划付接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.reservecash_applypay='./reserveCashOrder/applyPay';
    /**
     * @description 一键划付接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.reservecash_batchPay='./reserveCashOrder/batchPay';
    /**
     * @description 跳转至商户补贴账户
     * @author 于凯乐
     * @method GET
     */
    _o.skipToSubsidyAccount='./reserveCashOrder/skipToSubsidyAccount/';
    /**
     * @description 合计
     * @author 于凯乐
     * @method GET
     */
    _o.reserveCashOrdertotal='./reserveCashOrder/total?';


    //- todo  备付金支出-预付款划付 advance-payment-details
    /**
     * @description 预付款划付列表接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.advance_list = './advancePaymentDetail/list?';

    //- todo  备付金支出-额度采购 limit-purchase-detail
    /**
     * @description 额度采购列表接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.limit_list = './limitPurchaseDetail/list?';
    /**
     * @description 查询跳转ID接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.skipToInfo = './limitPurchaseDetail/info/';

    //- todo  备付金支出-划付复核 pay-recheck
    /**
     * @description 划付复核列表接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.payrecheck_list = './payRecheck/list?';
    /**
     * @description 合计接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.payrecheck_total = './payRecheck/total?';
    /**
     * @description 复核通过接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.payrecheck_pass = './payRecheck/pass';
    /**
     * @description 复核回退接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.payrecheck_back = './payRecheck/back';
    /**
     * @description 详情查询接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.skipToPayRecheck = 'payRecheck/detail?';
    /**
     * @description 详情 用途是税金提现的穿透到暂扣税金账户明细接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.skipToSuspensionTaxAccountDetail = 'payRecheck/skipToSuspensionTaxAccountDetail?';

    //- todo  备付金支出-补贴划付 subsidy-appropriation
    /**
     * @description 补贴划付列表接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.appropriation_list = './subsidyPayDetail/list?';
    /**
     * @description 补贴划付更新接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.subsidy_update = './subsidyPayDetail/update/';
    /**
     * @description 补贴划付申请划付接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.subsidy_applyPay = './subsidyPayDetail/applyPay';
    /**
     * @description 申请划付数据查询接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.select_subsidypay = './subsidyPayDetail/applyInfo?';
    /**
     * @description 补贴划付一键审核接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.subsidy_applyPay = './subsidyPayDetail/applyPay';
    /**
     * @description 补贴划付合计接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.appropriation_total = './subsidyPayDetail/total?';


    //- todo  备付金支出-补贴退税 subsidy-tax-rebate
    /**
     * @description 补贴退税列表接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.rebate_list = './subsidyTaxRebateDetail/list?';
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
     * @method GET
     */
    _o.select_rebate = './subsidyTaxRebateDetail/applyInfo?';
    /**
     * @description 补贴退税一键审核接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.rebate_batchCheck= './subsidyTaxRebateDetail/applyPay';
    /**
     * @description 补贴退税合计接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.rebate_total = './subsidyTaxRebateDetail/total?';

    //- todo  活动管理-活动列表 activity-lists
    /**
     * @description 查询活动列表接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.activity_list = './activity/list?';
    /**
     * @description 查询活动列表合计金额接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.activity_total = './activity/total?';
    /**
     * @description 查询可配置三方接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.activity_info = './activity/thirdPartyAccount/info?';
    /**
     * @description 查询可配置三方接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.activity_save = './activity/thirdPartyAccount/config';
    /**
     * @description 保存其他信息接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.saveOther = './activity/otherInfo/save';
    /**
     * @description 查询其他信息接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.otherInfo = './activity/otherInfo/detail?';

    /**
     * @description 查询税率管理列表
     * @author 于凯乐
     * @method GET
     */
    _o.taxRate_list = './taxRate/list?';

    /**
     * @description 获取编辑弹框税率信息
     * @author 于凯乐
     * @method GET
     */
    _o.edit_detail = './taxRate/detail/';

    /**
     * @description 获取编辑弹框税率信息
     * @author 于凯乐
     * @method GET
     */
    _o.edit_info = './taxRate/info?';

    /**
     * @description 保存税率信息
     * @author 于凯乐
     * @method POST
     */
    _o.edit_save = './taxRate/save?';
    
    //- todo  活动管理-活动列表-计算公式 activity-lists
    /**
     * @description 查询活动计算公式接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.activityformulae_list = './activity/formulae/info?';
    /**
     * @description 设为默认公式接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.defaultFormulae = './activity/formulae/default';
    /**
     * @description 保存公式接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.saveFormulae = './activity/formulae/save';
    /**
     * @description 使用默认接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.useDefault = './activity/formulae/useDefault/';

    //- todo  系统配置-系统日志 log-management
    /**
     * @description 系统日志列表接口地址
     * @author 洪钢
     * @method GET
     */
    _o.log_list = './log/list?';
    /**
     * @description 系统日志描述及url接口地址
     * @author 洪钢
     * @method POST
     */
    _o.log_description = './log/description';
    /**
     * @description 日志详情
     * @author 洪钢
     * @method GET
     */
    _o.log_info = './log/info/';

    //- todo  系统配置-系统日志 user-management
    /**
     * @description 员工管理接口地址
     * @author 洪钢
     * @method GET
     */
    _o.user_list = './user/list?';
    /**
     * @description 员工管辖查询接口地址
     * @author 洪钢
     * @method GET
     */
    _o.userControl_list = './user/controlSpan/list/';
    /**
     * @description 员工管辖保存接口地址
     * @author 洪钢
     * @method POST
     */
    _o.saveUserControlSpans = './user/controlSpan/save';
    /**
     * @description 新增员工查询接口地址
     * @author 洪钢
     * @method POST
     */
    _o.readyImportUser = './user/readyImport';
    /**
     * @description 新增员工保存接口地址
     * @author 洪钢
     * @method POST
     */
    _o.importUser = './user/import';

    //- todo  商户管理-商户列表 business-lists
    /**
     * @description 商户列表数据接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.merchant_lists = './merchant/pages?';
    /**
     * @description 划款账户接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.merchant_account = './merchant/account/';
    /**
     * @description 编辑划款账户接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.merchant_update = './merchant/update';
    /**
     * @description 查看消化账户接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.merchant_digest = './merchant/digest/list/';
    /**
     * @description 查看消化账户接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.merchant_total = './merchant/sumBalance?';

    //- todo  商户管理-商户列表-商户补贴账户管理 merchat-activity-subsidy-account
    /**
     * @description 商户补贴账户管理数据接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.subsidyAccount_list = './subsidyAccount/list?';
    /**
     * @description 商户补贴账户管理合计接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.subsidyAccount_total = './subsidyAccount/total?';
    /**
     * @description 商户补贴账户管理发票充值接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.subsidyAccount_recharge = './subsidyAccount/recharge';
    /**
     * @description 商户补贴账户管理申请提现接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.subsidyAccount_applyPay = './subsidyAccount/applyPay';
    /**
     * @description 商户补贴账户管理申请提现页面税金池和可提现金额 接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.subsidyAccount_info = './subsidyAccount/info?';

    //- todo  商户管理-商户列表-商户补贴账户管理-商户暂扣税金账户明细 suspension-tax-account-detail
    /**
     * @description 商户暂扣税金账户明细数据接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.suspensionTaxAccountDetail_list = './suspensionTaxAccountDetail/list?';
    /**
     * @description 商户暂扣税金账户明细合计接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.suspensionTaxAccountDetail_total = './suspensionTaxAccountDetail/total?';

    //- todo  商户管理-商户列表-商户补贴账户管理-商户发票账户明细 invoice-account-detail
    /**
     * @description 商户发票账户明细数据接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.invoiceAccountDetail_list = './invoiceAccountDetail/list?';
    /**
     * @description 商户发票账户明细合计接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.invoiceAccountDetail_total = './invoiceAccountDetail/total?';

    //- todo  商户管理-额度采购 business-limit
    /**
     * @description 额度采购数据接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.limitPurchaseMerchant_lists = './limitPurchaseMerchant/list?';
    /**
     * @description 额度采购编辑查询接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.limitPurchaseMerchant_history = './limitPurchaseMerchant/history/';
    /**
     * @description 额度采购编辑保存接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.limitPurchaseMerchant_editDigest = './limitPurchaseMerchant/digest/save';
    /**
     * @description 额度采购停用启用接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.limitPurchaseMerchant_change = './limitPurchaseMerchant/enable/';
    /**
     * @description 额度采购消化商户查询接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.limitPurchaseMerchant_viewDigest = './limitPurchaseMerchant/digest?';
    /**
     * @description 额度采购历史记录消化商户查询接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.seehistoryxh = './limitPurchaseMerchant/digestHistory/';
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
    _o.limitPurchaseMerchant_addDigest = './limitPurchaseMerchant/digest/add';

    //- todo  商户管理-预付款 prepayment-lists
    /**
     * @description 预付款数据接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.prepayment_lists = './advancePaymentMerchant/list?';
    /**
     * @description 获取预付充值数据接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.advancePaymentMerchant = './advancePaymentMerchant/chargeInfo/';
    /**
     * @description 预付申请付款接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.applyAdvancePay = './advancePaymentMerchant/applyPayment';
    /**
     * @description 预付添加商户接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.insertBatch = './advancePaymentMerchant/create';
    /**
     * @description 预付停用启用接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.advancePaymentMerchant_status = './advancePaymentMerchant/status';
    /**
     * @description 预付合计接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.advancePaymentMerchant_total = './advancePaymentMerchant/total?';

    //- todo  商户管理-预付款-门店管理 prepayment-store
    /**
     * @description 预付款门店数据接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.prepayment_store = './advancePaymentMerchant/store/list?';
    /**
     * @description 预付款删除门店接口地址
     * @author 于凯乐
     * @method DELETE
     */
    _o.delstore = './advancePaymentMerchant/store/remove/';
    /**
     * @description 添加商户接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.store_add = './advancePaymentMerchant/store/add';
    /**
     * @description 预付款明细商户名余额接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.getBlance = './advancePaymentMerchant/info/';

    //- todo  商户管理-预付款-账户明细 prepayment-info
    /**
     * @description 预付款明细数据接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.advancePaymentAccount_list = './advancePaymentAccount/list?';
    /**
     * @description 预付款明细合计接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.advancePaymentAccount_total = './advancePaymentAccount/total?';

    //- todo  商户管理-额度采购-账户列表 limitaccount-management
    /**
     * @description 列表数据接口地址
     * @author 冷艳君
     * @method GET
     */
    _o.limitPurchaseAccount = './limitPurchaseAccount/list?';
    /**
     * @description 充值接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.limitPurchase_selectRechargeInfoByID = './limitPurchaseAccount/chargeInfo/';
    /**
     * @description 确认充值接口地址
     * @author 冷艳君
     * @method POST
     */
    _o.recharge = './limitPurchaseAccount/charge';

    //- todo  商户管理-额度采购-账户明细 limitaccount-info
    /**
     * @description 列表数据接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.limitPurchaseAccount_detail = './limitPurchaseAccount/detail?';
    /**
     * @description 列表合计接口地址
     * @author 于凯乐
     * @method GET
     */
    _o.limitPurchaseAccount_getsumBalance = './limitPurchaseAccount/sumBalance?';


    //- todo  三方管理-账户列表 third-party
    /**
     * @description 列表数据接口地址
     * @author 于凯乐
     * @method get
     */
    _o.thirdParty_list = './thirdParty/list?';
    /**
     * @description 三方停用启用接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.thirdParty_status = './thirdParty/status';
    /**
     * @description 三方回款充值接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.thirdParty_recharge = './thirdParty/recharge';
    /**
     * @description 三方添加账户接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.thirdParty_accountlist = './thirdParty/account/list?';
    /**
     * @description 三方确认添加账户接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.thirdParty_save = './thirdParty/account/save';
    /**
     * @description 三方确认添加账户接口地址
     * @author 于凯乐
     * @method POST
     */
    _o.gettotal = './thirdParty/sum?';


    //- todo  三方管理-账户明细 third-info
    /**
     * @description 列表数据接口地址
     * @author 于凯乐
     * @method get
     */
    _o.thirdinfo_list = './thirdParty/account/detail?';
    /**
     * @description 列表数据接口地址
     * @author 于凯乐
     * @method get
     */
    _o.thirdinfo_Blance = './thirdParty/account/balance/';
     /**
     * @description 列表数据接口地址
     * @author 于凯乐
     * @method get
     */
    _o.getthirdinfo_total = './thirdParty/account/total?';

    /**
     * @description 活动执行表列表数据接口地址
     * @author 冷艳君
     * @method get
     */
    _o.activity_effect_list = './activityEffect/list?';



    Object.defineProperties(Vue.prototype, {
        $API: {get(){return _o}}
    })
}
