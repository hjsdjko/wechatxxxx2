// pages/edit/edit.js
const {
detail,
option,
update,
add,
list,
    follow,
    faceMatch,
    session,
    rubbish,
    baiduIdentify
} = require("../../api/index.js")

const des = require('../../utils/des.js')
const utils = require("../../utils/index.js")

Page({

/**
* 页面的初始数据
*/
data: {
    baseURL:'',
    sessionReadArr:[],

detailList: null,
id: "",
cross:"",
ruleForm:{},
userid:getApp().globalData.userInfo.id,
userInfo:getApp().globalData.userInfo,
ro:{
},

    yonghuzhanghao:"",
    yonghuxingming:"",
    dakaneirong:"",
    dakashijian:"请选择时间",
showdakashijian:false,
    beizhu:"",
},

    // 监听 yiwanjiage 字段的变化
    watch: {

    },
/**
* 生命周期函数--监听页面加载
*/
async onLoad(options) {
    if(!this.data.userid){
        let nowTable = wx.getStorageSync("nowTable");
        const res = await session(nowTable)
        getApp().globalData.userInfo=res.data
    }
    let baseURL =wx.getStorageSync('baseURL') + '/'
const id = getApp().globalData.detailId
    this.setData({
        refid:id,
        baseURL
    })
//人脸识别


let  ro=this.data.ro
if(options?.cross){
var obj = wx.getStorageSync('crossObj');
for (var o in obj){
if(o=='yonghuzhanghao'){
this.setData({
  'ruleForm.yonghuzhanghao' : obj[o],
})
ro.yonghuzhanghao = true;
continue;
}
if(o=='yonghuxingming'){
this.setData({
  'ruleForm.yonghuxingming' : obj[o],
})
ro.yonghuxingming = true;
continue;
}
if(o=='dakaneirong'){
this.setData({
  'ruleForm.dakaneirong' : obj[o],
})
ro.dakaneirong = true;
continue;
}
if(o=='dakashijian'){
this.setData({
  'ruleForm.dakashijian' : obj[o],
})
ro.dakashijian = true;
continue;
}
if(o=='beizhu'){
this.setData({
  'ruleForm.beizhu' : obj[o],
})
ro.beizhu = true;
continue;
}
}
  let  statusColumnName=wx.getStorageSync('statusColumnName');
    statusColumnName=statusColumnName.replace('[',"").replace(']',"");
    this.setData({
        ro,
        cross:options?.cross,
        statusColumnName
    })
}

if(id){
// 如果上一级页面传递了id，获取改id数据信息
const   data=getApp().globalData.detailList


const url = wx.getStorageSync("baseURL") + "/"
const detailList = data
this.setData({
detailList,
     yonghuzhanghao: data.yonghuzhanghao,
     yonghuxingming: data.yonghuxingming,
     dakaneirong: data.dakaneirong,
        dakashijian:utils.getCurrentDate("yMDhms"),
     beizhu: data.beizhu,

});
//ss读取
let c = this.data
this.setData({
});

}else {
    this.setData({
    })
}



// ss读取
let sessionReadArr=[]
    let yonghuzhanghao= getApp().globalData.userInfo.yonghuzhanghao
    ro.yonghuzhanghao=true
    this.setData({
            yonghuzhanghao,
    })
    sessionReadArr.push('yonghuzhanghao')
    let yonghuxingming= getApp().globalData.userInfo.yonghuxingming
    ro.yonghuxingming=true
    this.setData({
            yonghuxingming,
    })
    sessionReadArr.push('yonghuxingming')

this.setData({
cross:options?.cross,
ro,
id,
 sessionReadArr

})




},

getUUID () {
return new Date().getTime();
},
onUnload: function () {
console.log('页面被卸载，执行销毁操作');
},
onShow() {




this.setData({
        dakashijian:utils.getCurrentDate("yMDhms")
})


},





































ondakashijianTap(){
this.setData({
    showdakashijian: true,
})
},
dakashijianTap(e) {
this.setData({
    dakashijian: e.detail.data
})

},














async submit() {
    let that = this
    var query = wx.createSelectorQuery();




if(this.data.dakashijian=="请选择打卡时间"){
this.setData({
        dakashijian:""
})

}


    const baseURL = wx.getStorageSync('baseURL') + "/"
    const regex = new RegExp(baseURL, "g");
const obj={
    yonghuzhanghao: this.data. yonghuzhanghao,
    yonghuxingming: this.data. yonghuxingming,
    dakaneirong: this.data. dakaneirong,
    dakashijian: this.data. dakashijian,
    beizhu: this.data. beizhu,
}
const detailId= getApp().globalData.detailId
const tableName= `dakaxinxi`

//跨表计算判断
    var obj2;
    var  ruleForm=obj
    obj2 = ruleForm
    this.data.refid==""? ruleForm['refid']= getApp().globalData.detailId:""
    ruleForm['userid']=getApp().globalData.userInfo.id
    var userInfo=getApp().globalData.userInfo


const sessionReadArr=this.data.sessionReadArr
                            ruleForm['yonghuzhanghao']=this.data.yonghuzhanghao







                            ruleForm['yonghuxingming']=this.data.yonghuxingming






















    //更新跨表属性
    var crossuserid;
    var crossrefid;
    var crossoptnum;

    if(this.data.cross) {
        wx.setStorageSync('crossCleanType', true);
        var statusColumnName = wx.getStorageSync('statusColumnName');
        if (statusColumnName != '') {
                obj2 = wx.getStorageSync('crossObj');
            if (!statusColumnName.startsWith("[")) {
                for (var o in obj2) {
                    if (o == statusColumnName) {
                        obj2[o] = statusColumnValue;
                    }

                }
                var table = wx.getStorageSync('crossTable');
                 await update(table, obj2)
            } else {

                crossuserid =getApp().globalData.userInfo.id
                crossrefid =  this.data.id
                crossoptnum = wx.getStorageSync('statusColumnName');
                crossoptnum = crossoptnum.replace(/\[/, "").replace(/\]/, "");
                            }
        }
    }
    this.data.cross ? (crossrefid = this.data.id, crossuserid = getApp().globalData.userInfo.id) : ""

        if(crossrefid && crossuserid) {
            ruleForm['crossuserid'] = getApp().globalData.userInfo.id
            ruleForm['crossrefid'] =this.data.id

            this.setData({
                ruleForm
            })
            let params = {
                page: 1,
                limit: 10,
                crossuserid: crossuserid,
                crossrefid: crossrefid,
            }
                        const tips = wx.getStorageSync('tips')
            let corssRes = await list(`dakaxinxi`, params)
            crossoptnum = wx.getStorageSync('statusColumnName');
            crossoptnum = crossoptnum.match(/\d+/g);
            if (corssRes.data.total >= parseInt(crossoptnum)) {
                wx.showToast({
                    icon: "none",
                    title: tips,
                })
                                wx.removeStorageSync('crossCleanType');
                return ;
            }
            else {


//跨表计算





if (ruleForm.id) {
await update(`dakaxinxi`, ruleForm)
}
else {
await add(`dakaxinxi`, ruleForm)
            }
        }


        }
        else {


//跨表计算
if (ruleForm.id) {
await update(`dakaxinxi`, ruleForm)
}
else {
await add(`dakaxinxi`, ruleForm)
            }
        }
getApp().globalData.editorContent=''
wx.showToast({
title: '提交成功',
icon: "none"
})
    const preId = getApp().globalData.detailId

    if(res){
        let res = await detail(table, preId)
        getApp().globalData.detailList = res.data
    }


            wx.navigateBack({
                delta: 1,
                complete: () => {
                    // 触发事件通知，传递需要更新的数据
                    const pages = getCurrentPages();
                    if (pages.length >= 1) {
                        const prePage = pages[pages.length - 1];
                        prePage.onLoad(); //
                    }
                }
            })













 },

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

}
})