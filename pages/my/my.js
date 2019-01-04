// pages/my/my.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "我的",
    options: [
      { "icon": "http://pk1897l3c.bkt.clouddn.com/icon_1.jpg", "text":"外卖平台竞价排名充值","other":"￥0.00元"},
      { "icon": "http://pk1897l3c.bkt.clouddn.com/icon_1.jpg", "text": "免密支付", "other": "" },
      { "icon": "http://pk1897l3c.bkt.clouddn.com/icon_1.jpg", "text": "店铺认证", "other": "未认证" },
      { "icon": "http://pk1897l3c.bkt.clouddn.com/icon_1.jpg", "text": "邀请商户领现金", "other": "已邀请0位" },
      { "icon": "http://pk1897l3c.bkt.clouddn.com/icon_1.jpg", "text": "优惠卷", "other": "0张" },
      { "icon": "http://pk1897l3c.bkt.clouddn.com/icon_1.jpg", "text": "我的收藏", "other": "" },
      { "icon": "http://pk1897l3c.bkt.clouddn.com/icon_1.jpg", "text": "意见反馈", "other": "" }
    ],
    islogin:false
  },

  gologin:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },

  goShareMoney:function(){
    wx.navigateTo({
      url: '../shareMoney/shareMoney',
    })
  },

  goOtherOption:function(e){

    switch (e.currentTarget.dataset.id){
      case 0:
        break;
      case 1:
        break;
      case 2:
        wx.getStorage({
          key: 'userInfo',
          success: function(res) {
            console.log(res)
            wx.navigateTo({
              url: '../certification/certification',
            })
          },
          fail:function(){
            wx.navigateTo({
              url: '../login/login',
            })
          }
        })
       
        break;
      case 3:
        break;
      case 4:
        wx.navigateTo({
          url: '../coupons/coupons',
        })
        break;
      case 5:
        break;
      case 6:
        break;
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userInfo',
      success:(res)=>{

      },
      fail:()=>{
        this.gologin()
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
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.setData({
          islogin: true
        })
      },
      fail: () => {
        this.setData({
          islogin: false
        })
      }
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