// pages/renewAdmin/renewAdmin.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "自动续费管理",
    iscancelRenew:false
  },

  goAgree:function(){
    wx.navigateTo({
      url: '../renewAgreement/renewAgreement',
    })
  },

  cancel:function(){
    wx.navigateTo({
      url: '../cancelRenewProving/cancelRenewProving',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.postData('/member/my/get',{"accessToken":app.globalData.accessToken}).then((res)=>{
      console.log(res)
      // res.data.data.isMember = true
      // res.data.data.poiMemberData = {
      //   "costSave": 0,
      //   "durationUnit": "MONTH",
      //   "duration": 0,
      //   "buyTime": "2019-01-11 16:31:17",
      //   "expiredAt": "2019-02-10 23:59:59",
      //   "autoFeeRenew": 1,
      //   "autoFee": 38800,
      //   "memberId": 1
      // }
      res.data.data.poiMemberData.expiredAt = res.data.data.poiMemberData.expiredAt.substr(0, res.data.data.poiMemberData.expiredAt.indexOf(" "))
      // res.data.data.poiMemberData.autoFeeRenew=1
      if(res.data.data.isMember){
        this.setData(res.data.data)
      }
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