var app = getApp();
Page({
    data: {
        cameraAllow: null  // 是否开启了摄像头权限（能让页面重新渲染，防止从设置页开启权限后返回该页面不能启用摄像头）
    },

    // 使用onShow是因为每次返回到该页面的时候都会执行
    // onLoad: 只在初次进入的时候执行
    // 现在需要在设置完摄像头权限之后返回该页面即可调用摄像头
    // 所以从设置页面返回时需要重新执行以下代码
    onShow() {
        wx.getSetting({
            success: (res) => {
                if(!res.authSetting['scope.camera']) {
                    this.setData({
                        cameraAllow: false
                    })
                } else {
                    this.setData({
                        cameraAllow: true
                    })
                }
            },
            fail() {
                wx.showModal({
                    title: '提示',
                    content: '获取小程序设置信息失败',
                    showCancel: false
                })
            }
        })
    },

    onOpenSetting(e) {
        console.log(e)
    },

    faceLogin() {
        wx.showActionSheet({
            itemList: ['A', 'B', 'C'],
            success: (res) => {
                console.log(res)
            }
        })
        wx.showLoading();
        let CameraContext = wx.createCameraContext();
        CameraContext.takePhoto({
            quality: 'high',
            success: (res) => {
                wx.uploadFile({
                    url: app.globalData.hostUrl + '/collage/getCollageProductList',
                    filePath: res.tempImagePath,
                    name: 'file',
                    success: (res) => {
                        console.log(res)
                        if(res.statusCode == 200) {
                            console.log('上传成功')
                        }
                    },
                    fail: (res) => {
                        console.log('上传失败')
                    },
                    complete: (res) => {
                        wx.hideLoading();
                    }
                })
            },
            fail() {
                this.showModal({
                    title: '提示',
                    content: '获取人脸失败，请重新获取'
                })
            }
        })
    }
})