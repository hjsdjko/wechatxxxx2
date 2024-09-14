const {
    forumDetail
} = require('../../api/index')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        commentlist: [],
        content: "",
        parentId: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        const parentId = wx.getStorageSync('parentId')
        const {
            data
        } = await forumDetail("forum", parentId)
        this.setData({
            commentlist: data
        })
        const content = wx.getStorageSync('nt')
        console.log("content", content);
        this.setData({
            content
        })
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

    },
    commentBtn() {
        getApp().globalData.editorContent = null
        const parentId = this.data.commentlist.id
        wx.navigateTo({
            url: `/pages/reply/reply?parentId=${parentId}`,
        })
    },

})