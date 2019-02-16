// pages/closeFreeAuth/closeFreeAuth.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password_length: 6,
    password_val: "",
    before_pws: "",
    title: "校验余额密码",
    alt: "请输入余额支付密码，用于关闭余额支付验证",
    type: "",
    isFocus: false,  //聚焦,
    type: "" 
  },

  inputPassword: function (e) {
    console.log(e)
    this.setData({
      password_val: e.detail.value
    })
  },

  gofocus: function () {

    this.setData({
      isFocus: true
    })
    console.log(this.data.isFocus)
  },

  next:function(){
    if (!this.data.password_val) {
      app.showToast('余额密码不能为空')
      return
    }
    else if (this.data.password_val.length < 6) {
      app.showToast('余额密码不得少于6位')
      return
    }
    app.postData('/setting/poi/balance/pwd/required',{"accessToken":app.globalData.accessToken,"flag":0,"pwd":this.data.password_val}).then(res=>{
      console.log(res)
      if(res.data.code == 200){
        app.showToast('已取消余额免密支付')
        app.globalData.poiBasicData.balancePwdFree = 0
        setTimeout(()=>{
          wx.navigateBack({
            
          })
        },1500)
      }
      else {
        this.setData({
          password_val:""
        })
      }
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