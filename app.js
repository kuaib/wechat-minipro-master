//app.js
App({
    onLaunch() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // console.log(res.code)
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                console.log(res)
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })

    },
    onPageNotFound(res) {
        console.log('99999')
        wx.redirectTo({
            url: 'pages/index/index'
        })
    },
    globalData: {
        userInfo: null
    },

    // 公用请求接口
    requestApp(url, data, method, successCallback, failCallback, completeCallback) {
        wx.request({
            url: 'https://mallapi.lechun.cc' + url,
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
                failCallback &&  failCallback()
            },
            complete: () =>  {
                completeCallback && typeof completeCallback === 'function' && completeCallback()
            }
        })
    }
})