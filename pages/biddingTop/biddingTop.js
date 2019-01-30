// pages/biddingTop/biddingTop.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "竞价充值",
    money_list: ["200", "300", "500", "1000", "3000", "5000", "10000", "20000", "",],
    isSelect:0,
    money:"",
    curBiddingBalance:0
  },

  goRecord:function(){
    wx.navigateTo({
      url: '../biddingRecord/biddingRecord',
    })
  },

  select:function(e){
    this.setData({
      isSelect:e.currentTarget.dataset.index,
      money:""
    })
  },

  bindInput:function(e){
    this.setData({
      money:e.detail.value
    })
  },

  goBiddingAgree:function(){
    wx.navigateTo({
      url: '../biddingAgree/biddingAgree',
    })
  },

  topUp:function(){
    // console.log(this.data.isSelect)
    wx.showLoading({
      title: '',
      mask:true
    })
    var amount=0
    if(this.data.isSelect==8){
      // console.log(this.data.money)
      amount=Number(this.data.money)*100
    }
    else{
      // console.log(this.data.money_list[this.data.isSelect])
      amount = Number(this.data.money_list[this.data.isSelect]) * 100
    }
    console.log(amount)
    // var postData = { "accessToken": app.globalData.accessToken, "amount": amount}
    var postData = { "accessToken": app.globalData.accessToken, "amount": 1 }
    app.postData('/bidding/recharge/in',postData).then(res=>{
      if(res.data.code==200){
        wx.hideLoading()
        app.pay(res.data.data).then(res => {
          console.log(res)
          app.getData('/setting/poi/basic/get?accessToken=' + app.globalData.accessToken).then(res => {
            if (res.data.code == 200) {
              app.globalData.poiBasicData = res.data.data
              this.setData({
                curBiddingBalance: (Number(res.data.data.curBiddingBalance) / 100).toFixed(2) || "0.00"
              })
            }
          })
        })
        // wx.navigateTo({
        //   url: '../pay/pay',
        // })
      }
      else{
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      curBiddingBalance: (Number(app.globalData.poiBasicData.curBiddingBalance) / 100).toFixed(2) || "0.00"
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})