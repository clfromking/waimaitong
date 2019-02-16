// pages/payRecode/payRecode.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "购买记录",
    index:0,
    pageSize:20,
    ishave:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    app.postData('/member/bought/rd/list',{"accessToken":app.globalData.accessToken,"index":this.data.index,"pageSize":this.data.pageSize}).then((res)=>{
      console.log(res)
      if(res.data.code==404){
        app.showToast(res.data.msg)
        setTimeout(function(){
          wx.navigateBack({
            
          })
        },1500)
        return
      }
      // res.data.data = {
      //   "total": 22,
      //   "list": [
      //     {
      //       "id": 2,
      //       "poiId": "c7ea3c983fd849fea7bcdb4e8db74343",
      //       "durationUnit": "MONTH",
      //       "duration": 1,
      //       "buyTime": "2019-01-11 16:30:46",
      //       "userId": "c226527e25c5425ea95d9340486cf2d9",
      //       "total": 38800,
      //       "newDiscount": 10000,
      //       "payment": 28800,
      //       "payStatus": 1,
      //       "payTime": "",
      //       "payNo": "",
      //       "feeRenew": 1
      //     },
      //   ]
      // }
      if(res.data.data.list.length<20){
        this.setData({
          ishave:false
        })
      }
      for(let i=0;i<res.data.data.list.length;i++){
        // res.data.data.list[i].duration=3
        if (res.data.data.list[i].durationUnit =="DAY"){
          res.data.data.list[i].name="日度会员卡"
        }
        else if (res.data.data.list[i].durationUnit == "WEEK"){
          res.data.data.list[i].name = "周度会员卡"
        }
        else if (res.data.data.list[i].durationUnit == "MONTH" && res.data.data.list[i].duration !== 3) {
          res.data.data.list[i].name = "月度会员卡"
        }
        else if (res.data.data.list[i].durationUnit == "MONTH" && res.data.data.list[i].duration==3){
          res.data.data.list[i].name = "季度会员卡"
        }
        else if (res.data.data.list[i].durationUnit == "YEAR") {
          res.data.data.list[i].name = "年度会员卡"
        }
        res.data.data.list[i].total = (Number(res.data.data.list[i].total)/100).toFixed(2)
        res.data.data.list[i].payment = (Number(res.data.data.list[i].payment) / 100).toFixed(2)
      }
      this.setData(res.data.data)
    }).catch((error)=>{
      console.log(error)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      index: 0
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      index: 0
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.ishave==false){
      return
    }
    var index=this.data.index
    this.setData({
      index:index+1
    })
    app.postData('/member/bought/rd/list', { "accessToken": app.globalData.accessToken, "index": this.data.index, "pageSize": this.data.pageSize }).then((res)=>{
      if(res.data.code==200){
        var list=this.data.list
        for (let i = 0; i < res.data.data.list.length; i++) {
          // res.data.data.list[i].duration=3
          if (res.data.data.list[i].durationUnit == "DAY") {
            res.data.data.list[i].name = "日度会员卡"
          }
          else if (res.data.data.list[i].durationUnit == "WEEK") {
            res.data.data.list[i].name = "周度会员卡"
          }
          else if (res.data.data.list[i].durationUnit == "MONTH" && res.data.data.list[i].duration !== 3) {
            res.data.data.list[i].name = "月度会员卡"
          }
          else if (res.data.data.list[i].durationUnit == "MONTH" && res.data.data.list[i].duration == 3) {
            res.data.data.list[i].name = "季度会员卡"
          }
          else if (res.data.data.list[i].durationUnit == "YEAR") {
            res.data.data.list[i].name = "年度会员卡"
          }
          res.data.data.list[i].total = (Number(res.data.data.list[i].total) / 100).toFixed(2)
          res.data.data.list[i].payment = (Number(res.data.data.list[i].payment) / 100).toFixed(2)
          list.push(res.data.data.list[i])
        }
        this.setData({
          total:res.data.data.total,
          list,
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})