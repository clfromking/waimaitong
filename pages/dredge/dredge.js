// pages/dredge/dredge.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText:"开通会员",
    plans: [{ "title": "连续包月卡", "money": "388", "alt": "新用户立减100元", "isselect": true }, { "title": "连续包季卡", "money": "588", "alt": "", "isselect": false }, { "title": "连续包年卡", "money": "1388", "alt": "", "isselect": false }],
    pay_money:"298"
  },

  selectPlan:function(e){
    console.log(e)
    var plans=this.data.plans
    for(let i=0;i<plans.length;i++){
      plans[i].isselect=false
    }
    plans[e.currentTarget.dataset.id].isselect=true
    this.setData({
      plans
    })
  },

  //去支付
  goPay:function(){
    wx.navigateTo({
      url: '../pay/pay',
    })
  },

  goAgree: function () {
    wx.navigateTo({
      url: '../renewAgreement/renewAgreement',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    this.setData(app.globalData)
    app.getData('/card/list?accessToken='+app.globalData.accessToken).then((res)=>{
      console.log(res)
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