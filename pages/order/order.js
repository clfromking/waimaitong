const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "订单",
    islogin:false,
    orders:[
      { "order_time": "2018-07-01  12:52:03", "order_status": "已付款", "order_list": [{ "ware_name": "夏季之风-主题Banner", "ware_img": "http://pk1897l3c.bkt.clouddn.com/index_banner1.jpg", "ware_number": "1" }], "order_price": "1.00", "order_number":"1234567891234","pay_method":"微信支付"},
      { "order_time": "2018-07-01  12:52:03", "order_status": "已付款", "order_list": [{ "ware_name": "夏季之风-主题Banner", "ware_img": "http://pk1897l3c.bkt.clouddn.com/index_banner1.jpg", "ware_number": "1" }, { "ware_name": "夏季之风-主题Banner", "ware_img": "http://pk1897l3c.bkt.clouddn.com/index_banner1.jpg", "ware_number": "1" }, { "ware_name": "夏季之风-主题Banner", "ware_img": "http://pk1897l3c.bkt.clouddn.com/index_banner1.jpg", "ware_number": "1" }, { "ware_name": "夏季之风-主题Banner", "ware_img": "http://pk1897l3c.bkt.clouddn.com/index_banner1.jpg", "ware_number": "1" }], "order_price": "1.00", "order_number": "1234567891234", "pay_method": "微信支付" },
      { "order_time": "2018-07-01  12:52:03", "order_status": "已付款", "order_list": [{ "ware_name": "夏季之风-主题Banner", "ware_img": "http://pk1897l3c.bkt.clouddn.com/index_banner1.jpg", "ware_number": "1" }], "order_price": "1.00", "order_number": "1234567891234", "pay_method": "微信支付" },
      { "order_time": "2018-07-01  12:52:03", "order_status": "已付款", "order_list": [{ "ware_name": "夏季之风-主题Banner", "ware_img": "http://pk1897l3c.bkt.clouddn.com/index_banner1.jpg", "ware_number": "1" }], "order_price": "1.00", "order_number": "1234567891234", "pay_method": "微信支付" }
    ]
  },

  goOrderDetail:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderId=' + e.currentTarget.dataset.id,
    })
  },

  goLogin:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '',
      mask: true
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
    
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.setData({
          islogin: true,

        })
        wx.hideLoading()
        var postData = { "accessToken": res.data.accessToken}
        app.postData('/order/my',postData).then((res) => {
          console.log(res)
          let orders = res.data.data
          for (let i = 0; i < orders.length; i++) {
            orders[i].payment = Number(orders[i].payment / 100).toFixed(2)
          }
          console.log(orders)
          this.setData({
            orders
          })
        })
      },
      fail: function () {
        wx.hideLoading()
      }
    })
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