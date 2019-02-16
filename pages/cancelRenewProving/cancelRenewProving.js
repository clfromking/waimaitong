// pages/cancelRenewProving/cancelRenewProving.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "取消自动续费管理验证",
    iscancelRenew:false,
    mobile: "",
    smsCode: "",
    getCode_msg: "获取验证码",
    type: "",
    phone: "",
    beforeSmsCode: "",
    full_mobille:""
  },

  next:function(){
    

    var postData = {"smsCode":this.data.smsCode,"accessToken":app.globalData.accessToken}
    // console.log(this.data.smsCode)
    // return
    app.postData('/member/renew/cancel',postData).then(res=>{
      console.log(res)
      if(res.data.code == 200){
        this.setData({
          iscancelRenew: true
        })
      }
      // else {
      //   app.showToast('请重试')
      // }
    })
    
  },

  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  inputCode: function (e) {
    this.setData({
      smsCode: e.detail.value
    })
  },

  getSmsCode: function () {
    console.log(this.data.full_mobille)
    if (this.data.type == "next") {
      if (!this.data.phone) {
        app.showToast("手机号不能为空")
      }
      else if (this.data.phone.length < 11) {
        app.showToast("手机号格式不正确")
      }
      else {
        var postData = { "accessToken": app.globalData.accessToken, "mobile": this.data.phone }
        app.postData('/setting/sms/auth', postData).then((res) => {
          console.log(res)
          if (res.data.code == 200) {
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
    else {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({
      mobile: app.globalData.poiBasicData.masterMobile || "",
    })
    var mobile = this.data.mobile
    mobile = mobile.substr(0, 3) + "****" + mobile.substr(7)
    this.setData({
      mobile,
      full_mobille: app.globalData.poiBasicData.masterMobile || ""
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