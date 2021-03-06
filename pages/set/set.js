// pages/set/set.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "设置",
    options: ["会员信息设置", "店铺成员管理", "我的邀请二维码", "关于外卖通",],
    isMaster:false
  },

  goOther:function(e){
    console.log(e.currentTarget.dataset.id)
    switch(Number(e.currentTarget.dataset.id)){
      case 0:
        wx.navigateTo({
          url: '../setMemberMsg/setMemberMsg',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../personAdmin/personAdmin',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../Qrcode/Qrcode',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../about/about',
        })
        break;

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
    console.log(app.globalData)
    if(app.globalData.isMaster==2){
      this.setData({
        isMaster:true
      })
    }
    else{
      this.setData({
        isMaster:false
      })
    }
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