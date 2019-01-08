const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    header_alts: [
      { "icon": "http://pk1897l3c.bkt.clouddn.com/member/member_icon1.png", "text": "海量折扣" }, 
      { "icon": "http://pk1897l3c.bkt.clouddn.com/member/member_icon2.png", "text": "低至0元" },
      { "icon": "http://pk1897l3c.bkt.clouddn.com/member/member_icon3.png", "text": "外卖运营" }]

  },

  goOther:function(e){
    console.log(e.currentTarget.dataset.id)
    switch(Number(e.currentTarget.dataset.id)){
      case 0:
        wx.navigateTo({
          url: '../memberIdentity/memberIdentity',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../payRecord/payRecord',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../renewAdmin/renewAdmin',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../changePhone/changePhone',
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../feedback/feedback',
        })
        break;
    }
  },

  dredgeMember:function(){
    wx.navigateTo({
      url: '../dredge/dredge',
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