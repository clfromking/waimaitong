// pages/changePhone/changePhone.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "安全监测",
    mobile:"",
    smsCode:"",
    getCode_msg:"获取验证码",
    type:"",
    phone:"",
    beforeSmsCode:""
  },

  inputPhone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },

  inputCode:function(e){
    this.setData({
      smsCode:e.detail.value
    })
  },

  getSmsCode:function(){
    console.log(this.data.full_mobille)
    if(this.data.type=="next"){
      if(!this.data.phone){
        app.showToast("手机号不能为空")
      }
      else if(this.data.phone.length<11){
        app.showToast("手机号格式不正确")
      }
      else{
        var postData = { "accessToken": app.globalData.accessToken, "mobile": this.data.phone }
        app.postData('/setting/sms/auth',postData).then((res)=>{
          console.log(res)
          if(res.data.code==200){
            for (let i = 60; i >= 0; i--) {
              setTimeout(() => {
                // console.log(i)
                this.setData({
                  getCode_msg: i + "S"
                })
                if (i == 0) {
                  this.setData({
                    getCode_msg: "获取验证码"
                  })
                }
              }, 1000 * (60 - i))
            }
          }
        })
        
      }
    }
    else{
      var postData = { "accessToken": app.globalData.accessToken, "mobile": this.data.full_mobille }
      app.postData('/setting/sms/auth', postData).then((res) => {
        console.log(res)
        for (let i = 60; i >= 0; i--) {
          setTimeout(() => {
            // console.log(i)
            this.setData({
              getCode_msg: i + "S"
            })
            if (i == 0) {
              this.setData({
                getCode_msg: "获取验证码"
              })
            }
          }, 1000 * (60 - i))
        }
      })
    }
    
    
  },

  next:function(){
    if(this.data.type=="next"){
      console.log(this.data.beforeSmsCode)
      console.log(this.data.smsCode)
      var postData = { "accessToken": app.globalData.accessToken, "newMobile": this.data.phone, "oldSMSCode": this.data.beforeSmsCode, "newSMSCode": this.data.smsCode }
      
      app.postData('/setting/mobile/replace',postData).then(res=>{
        if(res.data.code==200){
          app.globalData.mobile=this.data.phone
          console.log(app.globalData)
          wx.redirectTo({
            url: '../sucAlter/sucAlter?phone=' + this.data.phone,
          })
        }
        else{
          // setTimeout
        }
      })
    }
    else{
      wx.redirectTo({
        url: '../changePhone/changePhone?type=next&smsCode=' + this.data.smsCode,
      })
    }
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type=="next"){
      this.setData({
        type:options.type,
        beforeSmsCode:options.smsCode,
        navText:"更换会员手机号"
      })
    }
    else{
      // options.mobile = "15210257790"
      var mobile = options.mobile
      mobile = mobile.substr(0, 3) + "****" + mobile.substr(7)
      this.setData({
        mobile,
        full_mobille: options.mobile
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