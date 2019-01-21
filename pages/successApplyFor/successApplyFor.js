// pages/successApplyFor/successApplyFor.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navType: "",
    isprocess:false,
    isfail:false
  },

  freeShopRecord:function(){
    if(this.data.isprocess){
      return
    }
    wx.navigateTo({
      url: '../goRecord/goRecord?type='+this.data.navType,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navType: options.type
    })
    // options.type='freeShop' 
    if (options.type=="freeShop"){
      app.getData('/go/kaidian/get?accessToken=' + app.globalData.accessToken).then((res) => {
        console.log(res)
        // res.data.data.auditStatus=1
        if(res.data.data.auditStatus==0){
          this.setData({
            isprocess:true
          })
        }

      }).catch((error) => {
          
      })
    }
    else{
      app.getData('/go/yunying/get?accessToken=' + app.globalData.accessToken).then((res) => {
        console.log(res)
        // res.data.data.auditStatus=1
        if (res.data.data.auditStatus == 1) {
          this.setData({
            isfail: true
          })
        }

      }).catch((error) => {
        this.setData({
          isfail: true
        })
        console.log(error)
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