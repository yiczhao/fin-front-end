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

    Object.defineProperties(Vue.prototype, {
        $API: {get(){return _o}}
    })
}
