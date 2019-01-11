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
      { "icon": "http://pk1897l3c.bkt.clouddn.com/member/member_icon3.png", "text": "外卖运营" }],
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ],
    isMember:false

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
    console.log(app.globalData.accessToken)
    app.globalData.isAuthDone=1
    // app.globalData.accessToken=1
    if(!app.globalData.accessToken){
      wx.navigateTo({
        url: '../login/login',
      })
    }
    else if (app.globalData.isAuthDone==0){
      wx.navigateTo({
        url: '../identityConfirm/identityConfirm',
      })
    }
    else{
      wx.navigateTo({
        url: '../dredge/dredge',
      })
    }
    console.log(app.globalData.isAuthDone)
    
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
    // app.globalData.isMember = 1
    if(app.globalData.isMember==0||!app.globalData.isMember){
      this.setData({
        isMember:false
      })
    }
    else{
      this.setData({
        isMember: true
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