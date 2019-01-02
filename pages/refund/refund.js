// pages/refund/refund.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText:"申请退款",
    order_msgs: {
      "order_status": "已付款",
      "order_alt": "您的订单申请已提交成功",
      "order_btn": "继续下单",
      "order_list": [
        { "img": "http://pk1897l3c.bkt.clouddn.com/member/liberty_two_icon.png", "name": "清爽一夏主题banner", "num": "1", "money": "29.00" },
        { "img": "http://pk1897l3c.bkt.clouddn.com/member/liberty_two_icon.png", "name": "清爽一夏主题banner", "num": "1", "money": "29.00" }
      ],
      // "business_detail": { "businesser_name": "狗小姐", 'businesser_phone': "12345678912", "business_name": "狗小姐（望京商业街中心店）", "business_address": "北京市朝阳区望京商业中心f座" }
    },
    font_length:"0",
    isconfirm_refund:false
  },

  bindinput:function(e){
    // console.log(e)
    this.setData({
      font_length:e.detail.value.length
    })
  },


  confirmRefund:function(){
    this.setData({
      isconfirm_refund:true
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