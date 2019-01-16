const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "订单",
    islogin:false,
    orders:[],
    isNothing:true
  },

  //现在下单
  placeOrder:function(){
    wx.switchTab({
      url: '../index/index',
    })
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
        
        var postData = { "accessToken": res.data.accessToken}
        app.postData('/order/my',postData).then((res) => {
          console.log(res)
          // res.data.data={}
          if(res.data.data.total){
            let orders = res.data.data.list
            for (let i = 0; i < orders.length; i++) {
              orders[i].payment = Number(orders[i].payment / 100).toFixed(2)
            }
            console.log(orders)
            this.setData({
              orders,
              isNothing:false
            })
            wx.hideLoading()
          }
          else{
            this.setData({
              isNothing:true
            })
            wx.hideLoading()
          }
          
        })
      },
      fail: function () {
        wx.hideLoading()
      },
      error:function(error){
        console.log(111)
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