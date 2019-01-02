// pages/certification/certification.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "店铺认证授权",
    certifications_list: [{ "src": "http://pk1897l3c.bkt.clouddn.com/member/liberty_two_icon.png", "text": "饿了么商家授权" }, { "src": "http://pk1897l3c.bkt.clouddn.com/member/liberty_two_icon.png", "text": "美团外卖商家授权" }, { "src": "http://pk1897l3c.bkt.clouddn.com/member/liberty_two_icon.png", "text": "商户老板手机号授权" }]

  },

  goStoreAuthor:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../storeAuthor/storeAuthor?type=' + e.currentTarget.dataset.id,
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