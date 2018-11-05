const app = getApp();
Page({
    data: {
        imgUrl: null
    },

    // 拍照
    takePhoto() {
        wx.chooseImage({
            count: 1,
            // sourceType: ['camera'],
            success: res => {
                console.log(res)
                this.setData({
                    imgUrl: res.tempFilePaths[0]
                })
                wx.showLoading({
                    title: '图片上传中...'
                })
                wx.uploadFile({
                    url: app.globalData.hostUrl + '/abc' ,
                    filePath: this.data.imgUrl,
                    name: 'file',
                    success: fileRes => {
                        console.log(fileRes)
                        if(fileRes.statusCode == 200) {
                            wx.showToast({
                                title: '上传成功',
                                duration: 2000,
                                icon: 'none'
                            })
                        } else {
                            wx.showToast({
                                title: '上传失败',
                                duration: 2000,
                                icon: 'none'
                            })
                        }
                    },
                    fail: () => {
                        wx.showToast({
                            title: '上传失败',
                            duration: 2000,
                            icon: 'none'
                        })
                    },
                    complete: () => {
                        wx.hideLoading()
                    }
                })
            }
        })
    }
})