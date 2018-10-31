let app = getApp();
Page({
	data: {
		prodList: [],        // 商品列表
        count: 0,		     // 已选中的总数量
		basePrice: 90,       // 起送价格
		pathName: 'index',	 // 文件路径名称，用于切换footer
	},
	onLoad() {
		this.setData({
			prodList: [
				{
					id: '1101',
					name: 'N300纤食杯风味发酵乳',
					price: 19.8,
					unit: '盒',
					num: 0,
					isLimit: true,
					imgUrl: 'http://resource.lechun.cc/proImgStorage/3165352852202291989_O.jpg'
				},
				{
					id: '1102',
					name: '黄桃百香果三三三倍酸奶',
					price: 17.8,
					unit: '盒',
					num: 0,
					isLimit: false,
					imgUrl: 'http://resource.lechun.cc/proImgStorage/3165352852202291989_O.jpg'
				},
				{
					id: '1103',
					name: '羽衣甘蓝芒果蔬舒果昔',
					price: 12.8,
					unit: '支',
					num: 0,
					isLimit: true,
					imgUrl: 'http://resource.lechun.cc/proImgStorage/3165352852202291989_O.jpg'
				},
				{
					id: '1104',
					name: '南瓜百香果蔬舒果昔',
					price: 12.8,
					unit: '支',
					num: 0,
					isLimit: true,
					imgUrl: 'http://resource.lechun.cc/proImgStorage/3165352852202291989_O.jpg'
				},
				{
					id: '1105',
					name: '原味三三三倍酸奶',
					price: 15,
					unit: '盒',
					num: 0,
					isLimit: true,
					imgUrl: 'http://resource.lechun.cc/proImgStorage/3165352852202291989_O.jpg'
				},
				{
					id: '1106',
					name: '紫薯黑米三三三倍酸奶',
					price: 17.9,
					unit: '盒',
					num: 0,
					isLimit: true,
					imgUrl: 'http://resource.lechun.cc/proImgStorage/3165352852202291989_O.jpg'
				},
				{
					id: '1107',
					name: '榛子香草三三三倍酸奶',
					price: 17.9,
					unit: '盒',
					num: 0,
					isLimit: true,
					imgUrl: 'http://resource.lechun.cc/proImgStorage/3165352852202291989_O.jpg'
				},
				{
					id: '1108',
					name: '桂花马蹄三三三倍酸奶',
					price: 17.9,
					unit: '盒',
					num: 0,
					isLimit: true,
					imgUrl: 'http://resource.lechun.cc/proImgStorage/3165352852202291989_O.jpg'
				}
			]
		})
	},

    // 改变选购商品
    changeNum(e) {
        let idx = e.currentTarget.dataset.idx;
        let num = e.detail.num;
        let prodNum = 'prodList[' + idx + '].num';
        this.setData({
            [prodNum]: num,
        }, () => {
            let obj = this.getTotalNumAnPrice();
            this.setData({
                count: obj.num,
                basePrice: obj.price
            })
        })
    },

    // 计算已选中总数量和总价格
    getTotalNumAnPrice() {
	    let price = 0, num = 0;
        this.data.prodList.forEach((item) => {
            price += item.num * item.price;
            num += item.num;
        })
        price = price >= 90 ? 0 : 90 - price;
        return {
            price: price,
            num: num
        }
    },


	// 立即购买
	goBuy() {
		if(this.data.basePrice == 0) {
		    app.requestApp('/collage/getCollageProductList', {
                bindCode: '14d4644b7a8847f49bfcbc85c34d0a8a'
            }, '', () => {
                wx.navigateTo({
                    url: '/pages/confirmOrder/confirmOrder'
                })
            })

		}
	}
})