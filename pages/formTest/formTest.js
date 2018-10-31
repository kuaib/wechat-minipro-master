Page({
    data: {
        src: null
    },
    onLoad() {
        // 获取用户当前的授权状态
        wx.getSetting({
            success(res) {
                if(!res.authSetting['scope.camera']) {
                    // 向用户发起授权请求
                    wx.authorize({
                        scope: 'scope.camera',
                        success () {
                            console.log('同意授权')
                        },
                        fail () {
                            console.log('拒绝授权')
                            wx.showModal({
                                title: '提示',
                                content: '您已拒绝摄像头访问，是否开启？',
                                success(res) {
                                    if(res.confirm) {
                                        console.log('开启')
                                        wx.openSetting({
                                            success () {
                                                console.log('重新授权')
                                            }
                                        })
                                    } else if(res.cancel) {
                                        console.log('取消')
                                    }
                                },
                                fail() {
                                    console.log('接口调用失败')
                                }
                            })
                        }
                    })
                }
            }
        })
    },
    formSubmit: function(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    formReset: function() {
        console.log('form发生了reset事件')
    },

    takePhoto() {
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
            quality: 'high',
            success: (res) => {
                console.log(res)
                this.setData({
                    src: res.tempImagePath
                })
            }
        })
    },
})