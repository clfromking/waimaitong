// pages/createPerson/createPerson.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "创建成员",
    isSuccess:false,
    mobile:"",
    name:""
  },

  createPerson:function(){
    if(!this.data.name){
      app.showToast("成员真实姓名不能为空")
    }
    else if(!this.data.mobile){
      app.showToast("成员手机号码不能为空")
    }
    else if(this.data.mobile.length<11){
      app.showToast("成员手机号码格式不正确")
    }
    else{
      var postData = { "accessToken": app.globalData.accessToken,"name":this.data.name,"mobile":this.data.mobile}
      app.postData("/setting/poi/employee/invite",postData).then((res)=>{
        console.log(res)
        if(res.data.code==200){
          this.setData({
            isSuccess:true
          })
        }
      })
    }
  },

  inputMsg:function(e){
    if(e.currentTarget.dataset.id==0){
      this.setData({
        name:e.detail.value
      })
      return
    }
    this.setData({
      mobile:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
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