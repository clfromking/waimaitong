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
    wx.hideShareMenu()
    var postData = { "accessToken": app.globalData.accessToken, "orderId": options.orderId }
    app.postData('/order/detail', postData).then((res) => {
      console.log(res)
      res.data.code = 200
      if (res.data.code == 404) {
        app.showToast('请求的订单不存在')
        setTimeout(function () {
          wx.navigateBack({

          })
        }, 1500)

      }
      else if (res.data.code == 200) {
        var data = res.data.data
        // data = {
        //   "orderId": "20190107094396062010",
        //   "goodsType": 2,
        //   "createTime": "2019-01-01 11:31:35",
        //   "payStatus": 1,
        //   "payment": 69900,
        //   "serviceStatus": 1,
        //   "itemList": [
        //     {
        //       "id": 1,
        //       "goodsType": 2,
        //       "orderId": "20190107094396062010",
        //       "goodsId": "1",
        //       "goodsName": "LOGO设计",
        //       "imgUrl": "",
        //       "num": 1,
        //       "unitPrice": 5900,
        //       "total": 5900
        //     },
        //     {
        //       "id": 2,
        //       "goodsType": 2,
        //       "orderId": "20190107094396062010",
        //       "goodsId": "2",
        //       "goodsName": "海报设计",
        //       "imgUrl": "",
        //       "num": 1,
        //       "unitPrice": 5900,
        //       "total": 5900
        //     },
        //     {
        //       "id": 3,
        //       "goodsType": 2,
        //       "orderId": "20190107094396062010",
        //       "goodsId": "3",
        //       "goodsName": "招牌设计",
        //       "imgUrl": "",
        //       "num": 1,
        //       "unitPrice": 5900,
        //       "total": 5900
        //     },
        //     {
        //       "id": 4,
        //       "goodsType": 2,
        //       "orderId": "20190107094396062010",
        //       "goodsId": "4",
        //       "goodsName": "菜单设计",
        //       "imgUrl": "",
        //       "num": 1,
        //       "unitPrice": 5900,
        //       "total": 5900
        //     },
        //     {
        //       "id": 5,
        //       "goodsType": 2,
        //       "orderId": "20190107094396062010",
        //       "goodsId": "5",
        //       "goodsName": "爆品梳理",
        //       "imgUrl": "",
        //       "num": 1,
        //       "unitPrice": 5900,
        //       "total": 5900
        //     },
        //     {
        //       "id": 6,
        //       "goodsType": 2,
        //       "orderId": "20190107094396062010",
        //       "goodsId": "6",
        //       "goodsName": "成本把控",
        //       "imgUrl": "",
        //       "num": 1,
        //       "unitPrice": 5900,
        //       "total": 5900
        //     },
        //     {
        //       "id": 7,
        //       "goodsType": 2,
        //       "orderId": "20190107094396062010",
        //       "goodsId": "7",
        //       "goodsName": "主推菜品",
        //       "imgUrl": "",
        //       "num": 1,
        //       "unitPrice": 5900,
        //       "total": 5900
        //     },
        //     {
        //       "id": 8,
        //       "goodsType": 2,
        //       "orderId": "20190107094396062010",
        //       "goodsId": "8",
        //       "goodsName": "活动设置",
        //       "imgUrl": "",
        //       "num": 1,
        //       "unitPrice": 5900,
        //       "total": 5900
        //     }
        //   ],
        //   "total": 0,
        //   "couponPaid": 0,
        //   "balancePaid": 1,
        //   "wechatPaid": 1,
        //   "orderServiceData": {
        //     "orderId": "20190107094396062010",
        //     "servicerId": 1222,
        //     "servicerName": "周仓",
        //     "createTime": "2019-01-07 13:16:16",
        //     "commentStatus": 0,
        //     "scoreService": 3,
        //     "scoreProfess": 2,
        //     "scoreResponse": 4,
        //     "commentText": "jajajaja",
        //     "commentUserId": null,
        //     "commentTime": null,
        //     "totalScore": 266
        //   }
        // }
        
        for (let i = 0; i < data.itemList.length; i++) {
          data.itemList[i].unitPrice = (Number(data.itemList[i].unitPrice) / 100).toFixed(2)
        }


        this.setData(data)
      }

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