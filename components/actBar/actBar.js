Component({
	properties: {
		leftText: {	// 左侧文案
			type: String
		},
		rightText: {	// 右侧文案	
			type: String
		},
		activeLeft: {	// 左侧是否高亮显示,默认高亮
			type: Boolean,
			value: true
		},
		activeRight: {	// 右侧是否高亮显示，默认高亮
			type: Boolean,
			value: true
		}
	},
	// 引入外部类（即：左右两侧不高亮显示的样式）
	externalClasses: ['left-noact-color','right-noact-color'],
	methods: {
		// 点击左侧
		leftTap() {
			this.triggerEvent('tapLeft')
		},

		// 点击右侧
		rightTap() {
			this.triggerEvent('tapRight')
		}
	}
})