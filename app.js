// app.js
App({
    onLaunch() {
        const tabarList=[]
        const genPages=[]
    tabarList.push("shengyinzhumian")
    tabarList.push("wuyinliaoji")
    tabarList.push("forum")
        this.globalData.tabarList=tabarList
    },
    globalData: {
        name: null,
        goodsList: [],
        detailList: {},
        detailId: null,
        tabarList:[],
        userInfo:{},
        total:"",
        editorContent:''
    },

})