// pages/forum-my/add-update.js
const {
    save,
    update,
    detail
} = require("../../api/index.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isdone: "开放",
        options: ["开放", '关闭'],
        content: "",
        id: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 将字符串转换为对象
        if (options?.data) {
            const data = JSON.parse(decodeURIComponent(options.data));
            const id = data.id
            this.setData({
                id
            })
            getApp().globalData.editorContent = data.content
            this.setData({
                content: data.content,
                title: data.title,
                isdone: data.isdone
            })
        }






    },
    optionChange(e) {
        const isdone = this.data.options[e.detail.value]
        this.setData({
            isdone
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        getApp().globalData.editorContent = ""
        wx.navigateBack({
            delta: 1
        })

    },

    async submit() {
        const id = this.data.id
        if (!this.data.title) {
            wx.showToast({
                title: "请输入标题",
                icon: "none"
            })
            return;
        }
        const data = {
            content: getApp().globalData.editorContent,
            id: id || "",
            isdone: this.data.isdone,
            parentid: 0,
            title: this.data.title,
            username: wx.getStorageSync('nickname'),
        }
        if (id) {
            data["userid"] = getApp().globalData.userInfo.id
        }
        const method = id ? update : save
        const res = await method("forum", data)
        if (res.code == 0) {
            getApp().globalData.editorContent = ""
            wx.navigateTo({
                url: '/pages/forum/forum-my',
                complete: () => {
                    // 触发事件通知，传递需要更新的数据
                    const pages = getCurrentPages();
                    if (pages.length >= 1) {
                        const prePage = pages[pages.length - 1];
                        prePage.onLoad();
                    }
                }
            })
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})