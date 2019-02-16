// pages/identityConfirm/identityConfirm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "身份选择",
  },

  goIdentity:function(e){
    // console.log(e.currentTarget.dataset.id)
    // app.globalData.isMaster = 1
    
    if(e.currentTarget.dataset.id==0){
      console.log(app.globalData.isMaster)
      if(app.globalData.isMaster==2){
        wx.navigateTo({
          url: '../certification/certification',
        })
      } 
      else{
        wx.navigateTo({
          url: '../identityVerify/identityVerify?typeId=' + e.currentTarget.dataset.id,
        })
      }
    }
    else{
      wx.navigateTo({
        url: '../identityVerify/identityVerify?typeId=' + e.currentTarget.dataset.id,
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
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