// pages/identityVerify/identityVerify.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "身份验证",
    name:"",
    phone:"",
    smsCode:"",
    typeId:0
  },

  inputMsg:function(e){
    switch(Number(e.currentTarget.dataset.id)){
      case 0:
        this.setData({
          name:e.detail.value
        })
        break;
      case 1:
        this.setData({
          phone: e.detail.value
        })
        break;
      case 2:
        this.setData({
          smsCode: e.detail.value
        })
        break;
    }
  },

  getCode:function(){
    console.log(this.data.phone)
    console.log(this.data.phone.length)
    if (this.data.phone.length<11){
      app.showToast("手机号不能少于11位")
      return
    }
    var postData = { "accessToken": app.globalData.accessToken,"mobile":this.data.phone}
    app.postData('/setting/sms/auth',postData).then((res)=>{
      console.log(res)
    })
  },

  next:function(){
    if(!this.data.name){
      app.showToast("真实姓名不能为空")
    }
    else if (!this.data.smsCode){
      app.showToast("验证码不能为空")
    }
    else if(this.data.smsCode.length<6){
      app.showToast("验证码格式不正确")
    }
    else{
      var postData = { "accessToken": app.globalData.accessToken, "mobile": this.data.phone,"name":this.data.name,"smsCode":this.data.smsCode}
      var url=""
      if(this.data.typeId==0){
        url = "/setting/auth/boss/mobile"
      }
      else{
        url = "/setting/auth/employee/mobile"
      }
      app.postData(url, postData).then((res) => {
        console.log(res)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.typeId)
    this.setData({
      typeId:options.typeId
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