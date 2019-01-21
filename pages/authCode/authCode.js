// pages/authCode/authCode.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    password_length: 6,
    password_val: "",
    title: "请输入验证码",
    alt: "",
    type: "",
    isFocus: true,  //聚焦 
    minute:60
  },
  inputPassword: function (e) {
    this.setData({
      password_val: e.detail.value
    })
  },
  gofocus: function () {
    this.setData({
      isFocus: true
    })
  },

  sendAgain:function(){
    if(this.data.minute=='重新发送'){
      this.sendPsw()
    }
  },

  next:function(){
    console.log(this.data.password_val)
    if(!this.data.password_val){
      app.showToast('验证码不能为空')
      return
    }
    else if(this.data.password_val<6){
      app.showToast('验证码格式不正确')
      return
    }
    else{
      //发送请求 判断验证码对不对
      app.postData('/setting/poi/balance/forget/sms', { "accessToken": app.globalData.accessToken, "smsCode": this.data.password_val}).then(res=>{
        if(res.data.code==200){
          wx.redirectTo({
            url: '../changePassword/changePassword?type=next&all=false&other=newSet',
          })
        }
      })
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.mobile)
    var mobile = app.globalData.mobile.substr(0, 3) + "****" + app.globalData.mobile.substr(7)
    // console.log(mobile)
    this.setData({
      alt:mobile
    })
    this.sendPsw()
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

  },
  sendPsw:function(){
    var that = this
    app.postData('/setting/sms/auth', { "accessToken": app.globalData.accessToken,"mobile":app.globalData.mobile }).then(res=>{
      if(res.data.code==200){
        for (let i = 60; i >= 0; i--) {
          setTimeout(() => {
            if (i == 0) {
              that.setData({
                minute: '重新发送'
              })
              // i=60
            }
            else {
              that.setData({
                minute: i + '秒后重发'
              })
            }

          }, 1000 * (60 - i))
        }
      }
      else if(res.data.code==402){
        that.setData({
          minute:"重新发送"
        })
      }
    })
    
  },
})