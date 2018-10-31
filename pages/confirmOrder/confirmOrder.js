Page({
    data: {
        dateList: [
            {week: '三', dateNum: '2018-10-31'},
            {week: '四', dateNum: '2018-11-1'},
            {week: '五', dateNum: '2018-11-2'},
            {week: '六', dateNum: '2018-11-3'},
            {week: '日', dateNum: '2018-11-4'},
            {week: '一', dateNum: '2018-11-5'},
            {week: '二', dateNum: '2018-11-6'},
        ],

        checkIdx: null,
    },

    // 选择配送日期
    chooseDate(data) {
        console.log(data)
        this.setData({
            checkIdx: data.currentTarget.dataset.idx
        })
    }
})