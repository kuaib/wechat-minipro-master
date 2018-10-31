Component({
    data: {
        num: 0
    },

    methods: {
        changeNum(e) {
            let types = e.target.dataset.types;
            if(types == 'desc') {
                this.setData({
                    num: this.data.num - 1
                })
            } else {
                this.setData({
                    num: this.data.num + 1
                })
            }
            this.triggerEvent('changeNumF', {num: this.data.num});
        }
    }
})