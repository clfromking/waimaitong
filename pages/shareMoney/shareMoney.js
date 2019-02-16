// pages/shareMoney/shareMoney.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "分享金",
    money:""

  },
  goWithdrawal:function(){
    app.showToast('此功能暂未开放')
    return
    wx.navigateTo({
      url: '../withdrawal/withdrawal',
    })
  },

  goMoneyDetail:function(){
    app.showToast('此功能暂未开放')
    return
    wx.navigateTo({
      url: '../moneyDetail/moneyDetail',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    app.postData('/wechat/login/token', { "accessToken": app.globalData.accessToken }).then(res => {
      if (res.data.code == 200) {
        app.globalData.shareBalance = res.data.data.shareBalance
        var currShareBalance = (Number(app.globalData.shareBalance) / 100).toFixed(2)
        this.setData({
          // isMember: res.data.data.isMember,
          money: currShareBalance,
        })
        // wx.stopPullDownRefresh()
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