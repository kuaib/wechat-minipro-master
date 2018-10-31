const hostUrl = "https://api.lechun.cc";
App({
    onLaunch() {
        this.storageFn();       // 本地存储
        this.updateVersion();   // 更新基础库版本
        this.loginFn();         // 登录
        this.authorizeFn();     // 获取用户当前的授权状态
    },

    // 全局变量
    globalData: {
        userInfo: null,     // 用户信息
    },

    // 本地存储
    storageFn() {
        let logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
    },

    // 更新小程序基础版本(当新的应用需要更高的版本去支持的时候,就更新)
    updateVersion() {
        let compareVersion = (v1, v2) => {
            v1 = v1.split('.')
            v2 = v2.split('.')
            var len = Math.max(v1.length, v2.length)

            while (v1.length < len) {
                v1.push('0')
            }
            while (v2.length < len) {
                v2.push('0')
            }

            for (var i = 0; i < len; i++) {
                var num1 = parseInt(v1[i])
                var num2 = parseInt(v2[i])

                if (num1 > num2) {
                    return 1
                } else if (num1 < num2) {
                    return -1
                }
            }
            return 0
        }
        let systemInfo = wx.getSystemInfoSync();
        console.log(systemInfo.SDKVersion)
        let SDKVersionFlag = compareVersion(systemInfo.SDKVersion, '1.0.3'); // 新版本不能低于1.0.3
        if(SDKVersionFlag >= 0) {
            const updateManager = wx.getUpdateManager()

            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                console.log(res.hasUpdate)
            })

            updateManager.onUpdateReady(function () {
                wx.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启应用？',
                    success: function (res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate()
                        }
                    }
                })
            })

            updateManager.onUpdateFailed(function () {
                // 新版本下载失败
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
    },

    // 登陆
    loginFn() {
        wx.checkSession({
            success() { // session_key 未过期

            },
            fail() {    // session_key 已过期
                wx.login({
                    success(res) {
                        // console.log(res.code)
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    }
                })
            }
        })
    },

    // 授权
    authorizeFn() {
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userInfo']) {
                    wx.authorize({
                        scope: 'scope.userInfo',
                        success() {
                            console.log('用户同意授权：获取用户信息');
                            wx.getUserInfo({
                                success: res => {
                                    this.globalData.userInfo = res.userInfo; // 可以将 res 发送给后台解码出 unionId
                                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                    // 所以此处加入 callback 以防止这种情况
                                    if (this.userInfoReadyCallback) {
                                        this.userInfoReadyCallback(res)
                                    }
                                }
                            })
                        },
                        fail() {
                            console.log('用户拒绝授权：不能获取用户信息');
                        }
                    })
                }
            }
        })
    },

    // 公用请求接口
    requestApp(url, data, method, successCallback, failCallback, completeCallback) {
        wx.request({
            url: hostUrl + url,
            data: data,
            method: method ? method : 'GET',
            success: res => {
                if (res.statusCode != 200) {
                    console.log(typeof this.onPageNotFound)
                    wx.showToast({
                        icon: 'none',
                        duration: 2000,
                        title: res.data.error_msg
                    })
                } else {
                    successCallback && typeof successCallback === 'function' && successCallback(res)
                }
            },
            fail: () => {
                wx.showToast({
                    icon: 'none',
                    duration: 2000,
                    title: '啊偶，系统出小差了'
                })
                failCallback && failCallback()
            },
            complete: () => {
                completeCallback && typeof completeCallback === 'function' && completeCallback()
            }
        })
    }
})