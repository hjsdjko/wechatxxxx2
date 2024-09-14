// pages/forumCenter/forumCenter.js
const {
    forumList
} = require("../../api/index")
Page({

    data: {
        list: [],
        currentList: [],
        name: ""
    },
    async onLoad(options) {
        this.getData()

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    async onShow() {
        this.getData()
    },

    searhandler() {
        const result = this.data.list.filter((item, index) => {
            if (item.title.includes(this.data.name)) {
                return item
            }

        })
        this.setData({
            currentList: result
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
        const obj = {
            parentid: 0,
            isdone: '开放',
            sort: 'addtime',
            order: 'desc',
            page: 1,
            limit: 10,
            title: '% %',
        }
        const {
            data
        } = await forumList(obj)
        this.setData({
            list: data.list,
            currentList: data.list,
            name: ""
        })
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        console.log("2");
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