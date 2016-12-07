/**
 * @author: pkeros.
 * @date: 2016/7/15.
 * @mail: pkeros@vip.qq.com
 * @see: https://www.github.com/pkeros/
 */

;(function (window, KSAuthKit) {
    // 在顶级空间创建 KSAuthKit 对象
    window.KSAuthKit = KSAuthKit(window)
    // // KSAuthKit ready event
    // var customEvent = document.createEvent('HTMLEvents')
    // customEvent.initEvent('KSAuthKitReady', true, true)
    // window.dispatchEvent(customEvent)
    // // 初始化 KSAuthKit
    // window.KSAuthKit.getConfigForCookie()
    // window.KSAuthKit.on()
}(window, function (W) {
    'use strict'

    var _o = {}                                                                 // InnerObject
    var _config = {                                                             // Auth kit 配置
        systemId: '',
        userToken: '',
        ok: false,
        apiURL: ''
    }
    var _SS = W.sessionStorage                                                  // sessionStorage 简写
    var _DOC = W.document                                                       // document 简写
    var timerWatchDog = null                                                    // 看门狗
    var watchDog = []                                                           // 看门狗 节流
    var AuthMapper = []                                                         // 权限映射表
    var AuthSwitch = true                                                       // 权限控制开关
    var MapperReadyCb = []                                                      // 映射表准备完成回调

    /**
     * @description current version
     */
    _o.VERSION = '1.0.0'

    /**
     * @description auth mapper
     */
    _o.AuthMapper = []

    /**
     * @description cookie operation -- get
     * @param key {String} key
     * @returns {String} value
     */
    function getCookie (key) {
        var aCookie = document.cookie.split('; ')
        for (var i = 0; i < aCookie.length; i++) {
            var aCrumb = aCookie[i].split('=')
            if (key === aCrumb[0]) {
                return unescape(aCrumb[1])
            }
        }
        return null
    }

    /**
     * @description cookie operation -- create or set
     * @param key {String} key
     * @param value {String} value
     * @param expire {Number} expire date
     */
    function setCookie (key, value, expire) {
        var data = new Date()

        data.setDate(data.getDate() + expire)
        document.cookie = key + '=' + escape(value) +
            ((expire === null) ? '' : ';expires=' + data.toGMTString())
    }

    /**
     * @description Ajax request helper
     * @param config {Object} 配置
     * @param cb {Function} 成功回调.
     * @param errCb {Function} 失败回调.
     */
    function xhrReq (config, cb, errCb) {
        var xhr = null
        var xhrConfig = {
            method: 'GET',
            address: 'http://localhost/'
        }

        // 初始化配置项
        xhrConfig.method = config.method && config.method
        xhrConfig.address = config.address && config.address

        // 创建 XHR 对象
        // 非IE浏览器创建 XMlHttpRequest 对象
        // noinspection JSUnresolvedVariable
        if (W.XMLHttpRequest) {
            // noinspection JSUnresolvedFunction
            xhr = new W.XMLHttpRequest()
        }
        // IE浏览器创建XmlHttpRequest对象
        // noinspection JSUnresolvedVariable
        if (W.ActiveXObject) {
            try {
                // noinspection JSUnresolvedVariable
                xhr = new W.ActiveXObject('Microsoft.XMLHTTP')
            } catch (e) {
                try {
                    // noinspection JSUnresolvedVariable
                    xhr = new W.ActiveXObject('msxml2.XMLHTTP')
                } catch (ex) { }
            }
        }

        xhr.open(xhrConfig.method, xhrConfig.address, true)
        xhr.setRequestHeader('Accept', 'application/json, text/plain, */*')
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                cb(JSON.parse(xhr.responseText))
            }
            if (xhr.readyState === 4 && xhr.status !== 200) {
                errCb(xhr.responseText)
            }
        }

        return xhr
    }

    /**
     * @description throw a error
     * @param msg {String} error message
     */
    function exception (msg) {
        throw new Error(msg)
    }

    /**
     * @description 获取权限映射表
     * @param cb {Function} 成功回调
     * @param errCb {Function} 失败回调
     */
    function getAuthMapper (cb, errCb) {
        var authMapper = _SS.getItem('KSAuthMapper')

        // 获取缓存中的 映射表
        if (authMapper) {
            cb(JSON.parse(authMapper))

            return
        }

        // 缓存中不存在 则 从远端读取
        // 拼装请求数据
        var requestData = 'sys_id=' + _config.systemId +
            '&user_token=' + encodeURIComponent(_config.userToken)
        // 发送请求
        xhrReq({
            method: 'POST',
            address: _config.apiURL
        }, function (data) {
            var authM

            // 远端数据返回 检查数据是否正确 并存入缓存
            // noinspection JSUnresolvedVariable
            authM = (data.data && data.data.auth_mapper) || []
            _SS.setItem('KSAuthMapper', JSON.stringify(authM))

            cb(authM)
        }, errCb).send(requestData)
    }

    /**
     * @description KSAuthKit ready callback
     * @param cb {Function} callback function
     */
    _o.ready = function (cb) {
        MapperReadyCb.push(cb)
    }

    /**
     * @description 配置 KSAuthKit
     * @param config {Object} 配置对象
     */
    _o.config = function (config) {
        _config.systemId = config.systemId || exception('configure error: systemId invalid!')
        _config.userToken = config.userToken || exception('configure error: userToken invalid!')
        _config.apiURL = config.apiURL || exception('configure error: apiURL invalid!')
        _config.ok = true
    }

    /**
     * @description 从 cookie 中获取相关配置项
     */
    _o.getConfigForCookie = function () {
        this.config({
            systemId: getCookie('KSAuthSysId'),
            userToken: getCookie('KSAuthUserToken'),
            apiURL: getCookie('KSAuthApiURL')
        })
    }

    /**
     * @description 销毁所有授权 关闭 权限控制服务
     */
    _o.destroy = function () {
        // 移除用户 cookie
        setCookie('KSAuthUserToken', '', -1)
        setCookie('KSAuthJSURL', '', -1)
        setCookie('KSAuthApiURL', '', -1)

        // 移除权限映射表
        _SS.removeItem('KSAuthMapper')

        // 关闭权限控制服务
        clearInterval(timerWatchDog)
    }

    /**
     * @description 关闭权限控制服务
     */
    _o.off = function () {
        var controlNodeList = _DOC.querySelectorAll('[data-ksa]')
        var controlNodeLength = controlNodeList.length

        // 遍历 NodeList 去除对点的控制
        for (var i = 0; i < controlNodeLength; i++) {
            controlNodeList[i].style.display = ''
        }

        // 关闭权限控制服务
        AuthSwitch = false
        clearInterval(timerWatchDog)
    }

    /**
     * @description 打开权限控制服务
     */
    _o.on = function () {
        var _this = this
        var controlNodeList = _DOC.querySelectorAll('[data-ksa]')
        var controlNodeLength = controlNodeList.length

        // 检车 KSAuthKit 是否为关闭状态
        if (!AuthSwitch) {
            return
        }
        // 配置正确性检查
        if (!_config.ok) {
            exception('configuration undefined! please first call config function configure this kit!')

            return
        }

        // 遍历 NodeList 初始隐藏所有需要控制的点
        for (var i = 0; i < controlNodeLength; i++) {
            controlNodeList[i].style.display = 'none'
        }

        // 获取权限映射表
        getAuthMapper(function (data) {
            // 检查权限映射表正确性
            if (data && !data.length) {
                exception('Auth Mapper Exception!')

                return
            }

            // 建立映射表
            AuthMapper = data
            _o.AuthMapper = AuthMapper

            // 通知注册回调
            MapperReadyCb.forEach(function (cb) {
                cb(AuthMapper)
            })

            // 看门狗初始化
            timerWatchDog = setInterval(_this.watchDog, 777)
            _this.watchDog()

            // 初始化事件监听
            window.addEventListener('DOMNodeInserted', function (e) {
                // 运行看门狗程序
                _this.watchDog(e)

                // 重置看门狗状态
                clearInterval(timerWatchDog)
                timerWatchDog = setInterval(_this.watchDog, 777)
            })
            // 兼容 IE
            _DOC.getElementsByTagName('body')[0].onpropertychange = function () {
                // 运行看门狗程序
                _this.watchDog()

                // 重置看门狗状态
                clearInterval(timerWatchDog)
                timerWatchDog = setInterval(_this.watchDog, 777)
            }
        }, function (err) {
            console.error(err)
        })
    }

    /**
     * @description watch dog program.
     */
    _o.watchDog = function () {
        var controlNodeList
        var controlNodeLength

        // 节流控制
        if (watchDog.length || !AuthSwitch) {
            return
        }

        controlNodeList = _DOC.querySelectorAll('[data-ksa]')
        controlNodeLength = controlNodeList.length
        watchDog.push(controlNodeLength)

        // 检查 权限映射表 放开拥有权限
        for (var j = 0; j < controlNodeLength; j++) {
            var node = controlNodeList[j]
            var operation = node.getAttribute('data-ksa')

            // 检查 权限映射表
            if (AuthMapper.indexOf(operation) !== -1) {
                node.style.display = ''
            } else {
                node.style.display = 'none'
            }
        }

        watchDog.pop()
    }

    return _o
}))