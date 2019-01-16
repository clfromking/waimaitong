// pages/changePassword/changePassword.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    password_length:6,
    password_val:"",
    title:"提示",
    alt:"请输入当前支付密码",
    type:"",
    isFocus: true,  //聚焦 
  },
  inputPassword:function(e){
    this.setData({
      password_val:e.detail.value
    })
  },
  gofocus:function(){
    this.setData({
      isFocus:true
    })
  },
  next:function(){
    // wx.showLoading({
    //   title: '授权中',
    //   mask:true
    // })
    console.log(this.data.type)
    if (this.data.type==''){
      console.log(11)
      wx.redirectTo({
        url: '../changePassword/changePassword?type=next',
      })
    }
    else if (this.data.type=="next"){
      wx.redirectTo({
        url: '../changePassword/changePassword?type=again&value='+this.data.password_val,
      })
    }
    else{
      if(this.data.password_val==this.data.beforePassword){
        app.showToast('设置成功')
        setTimeout(function(){
          wx.navigateBack({
            
          })
        },1500)
      }
      else {
        app.showToast('两次密码不一致，请重新输入')
        setTimeout(function(){
          wx.redirectTo({
            url: '../changePassword/changePassword?type=next',
          })
        },1500)
        
      }
    }
    
    
  },

  forgetPassword:function(){
    wx.navigateTo({
      url: '../authCode/authCode',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    if(options.value){
      this.setData({
        beforePassword:options.value
      })
    }
    this.setData({
      type: options.type||""
    })
 
    
    if(options.type=='next'){
      this.setData({
        title:"设置余额密码",
        alt:"请设置微信支付密码，用于支付验证"
      })
    }
    else if (options.type =="again"){
      this.setData({
        title: "设置余额密码",
        alt: "请再次填写以确认"
      })
    }
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