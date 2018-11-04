const app = getApp();

Page({
    data: {
        hasCameraScope: null,
    },

    onShow() {
        this.getUserPro();
        this.getSystemInfo();
    },

    // 点击拍照（开始识别）
    takePhoto() {
        let CameraContext =  wx.createCameraContext();
        CameraContext.takePhoto({
            quality: 'high',
            success: (res) => {
                let FileSystemManager = wx.getFileSystemManager();
                // 读取图片文件转换为base64
                FileSystemManager.readFile({
                    filePath: res.tempImagePath,
                    encoding: 'base64',
                    success: val => {
                        let base64 = 'data:image/jpg;base64,' + val.data;
                        this.setData({
                            imgUrl: base64,
                        })
                        this.txApi(); // 腾讯AI接口
                    }
                })
            }
        })




    },


    // 腾讯AI接口
    txApi() {
        wx.request({
            url: 'https://api.ai.qq.com/fcgi-bin/face/face_detectface',
            data: {
                app_id: 1000001,
                time_stamp: 1493468759,
                nonce_str: 'fa577ce340859f9fe',
                sign: '',
                image: this.data.imgUrl,
                mode: 0
            },
            method: 'POST',
            success: res => {
                console.log(res)
            },
            fail: () => {
                console.log('失败')
            }
        })
    },

    // 获取用户摄像头授权
    getUserPro() {
        wx.getSetting({
            success: res => {
                if(!res.authSetting['scope.camera']) {
                    this.setData({
                        hasCameraScope: false
                    })
                } else {
                    this.setData({
                        hasCameraScope: true
                    })
                }
            }
        })
    },


    // 获取设备信息
    getSystemInfo() {
        wx.getSystemInfo({
            success: res => {
                console.log(res.brand)  // iPhone
                console.log(res.model)  // iPhone 7 Plus<iPhone9,2>
                console.log(res.system) // iOS 10.1.1
            }
        })
    }
})