// pages/feedback/feedback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "会员体验反馈",
    radio_options: [{ "isselect": true, "option": "非常满意" }, { "isselect": false, "option": "满意" }, { "isselect": false, "option": "试试看" },{ "isselect": false, "option": "很不满意" }]

  },

  selectRadio:function(e){
    var radio_options=this.data.radio_options
    for(let i=0;i<radio_options.length;i++){
      radio_options[i].isselect=false
    }
    radio_options[e.currentTarget.dataset.id].isselect=true
    this.setData({
      radio_options
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