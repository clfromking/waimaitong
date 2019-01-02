// pages/storeAuthor/storeAuthor.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "认证授权",
    logo:"",
    type:0,
    placeholder_user:"",
    placeholder_password:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
    let src=""
    let placeholder_user =''
    let placeholder_password =''
    if(options.type==0){
      src ="http://pk1897l3c.bkt.clouddn.com/renewAdmin/promise_icon1.png"
      placeholder_user ="请输入饿了么商户端账号"
      placeholder_password ="请输入饿了么商户端密码"
    }
    else if (options.type==1){
      src ="http://pk1897l3c.bkt.clouddn.com/renewAdmin/promise_icon2.png"
      placeholder_user = "请输入美团外卖商户端账号"
      placeholder_password = "请输入美团外卖商户端密码"
    }
    else{
      src = "http://pk1897l3c.bkt.clouddn.com/renewAdmin/promise_icon3.png"
      placeholder_user = ""
      placeholder_password = "请输入商户老板常用或绑定外卖平台手机"
    }
    this.setData({
      logo:src,
      type: options.type,
      placeholder_user,
      placeholder_password
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