// pages/forum/forum-my.js
const {
    myForum,
    deleteData,
    detail
} = require("../../api/index.js") // pages/forumCenter/
const utils = require("../../utils/index.js")
Page({
    data: {
        list: [],
        currentList: [],
        name: "",
        ischeck: true,
        addShow: true,
        addAuth: "",
        delAuth: "",
        editAuth: "",
        checkAuth: ""
    },
    async onLoad(options) {
        this.getData()
        this.setData({
            addAuth: utils.isAuth("forum", "新增"),
            delAuth: utils.isAuth("forum", "删除"),
            editAuth: utils.isAuth("forum", "修改"),
            checkAuth: utils.isAuth("forum", "查看")
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onShow() {},
    searhandler() {
        const result = this.data?.list.filter((item, index) => {
            if (item.title?.includes(this.data.name)) {
                return item
            }

        })
        this.setData({
            currentList: result,
            addShow: false
        })
    },
    delTap(e) {
        const id = e.currentTarget.dataset.id;
        wx.showModal({
            title: '提示',
            content: '确认删除？',
            complete: async (res) => {
                if (res.cancel) {}
                if (res.confirm) {
                    const res = await deleteData("forum", [id])
                    if (res.code == 0) {
                        this.onLoad()
                    }
                }
            }
        })
    },
    async editTap(e) {
        const id = e.currentTarget.dataset.id;
        const {
            data
        } = await detail("forum", id)
        getApp().globalData.editorContent = data.content
        // 将数组转换为字符串
        const encodedArray = encodeURIComponent(JSON.stringify(data));
        wx.navigateTo({
            url: `/pages/forum/forum-add-or-update?data=${encodedArray}`,
        })
    },

    async todetail(e) {
        const id = e.currentTarget.dataset.id;
        wx.setStorageSync('parentId', id)
        // 将数组转换为字符串
        wx.navigateTo({
            url: '/pages/forum/forum-detail',
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */

    async getData() {
        const data = {
            page: 1,
            limit: 20,
        }
        const res = await myForum("forum", data)

        this.setData({
            list: res.data.list,
            currentList: res.data.list,
            name: ""
        })
    },
    async addTap() {
        wx.navigateTo({
            url: '/pages/forum/forum-add-or-update',
        })
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        const pages = utils.getCurrentPageUrl(2)
        console.log("pppa", pages);
        if (pages.includes("forum-add-or-update")) {
            wx.navigateBack({
                delta: 2
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