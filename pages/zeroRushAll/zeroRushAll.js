// pages/zeroRushAll/zeroRushAll.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "0元抢服务",
    decorate_options: [],
    header_navs: [{ "time": "10:00", "status": "开抢结束" }, { "time": "15:00", "status": "已开抢" }, { "time": "10:00", "status": "即将开始" }, { "time": "10:00", "status": "即将开始" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this)
    app.getData('/decoration/material/list?accessToken=' + app.globalData.accessToken).then((res) => {
      console.log(res.data.data)
      var data = res.data.data
      for (let i = 0; i < data.length; i++) {
        data[i].memberPrice = (Number(data[i].memberPrice) / 100).toFixed(2)
        data[i].price = (Number(data[i].price) / 100).toFixed(2)
      }
      this.setData({
        decorate_options: data
      })
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