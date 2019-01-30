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
    isNothing:true,
    index:0,
    pageSize:20,
    total:0,
    isload:true
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

  deleteItem:function(e){
    wx.showModal({
      title: '提示',
      content: '确认要删除此订单嘛?',
      cancelText:"点错了",
      confirmText:"确认删除",
      success:(res)=>{
        if (res.confirm) {
          var postData = { "accessToken": app.globalData.accessToken, "orderId": this.data.orders[e.currentTarget.dataset.index].orderId }
          app.postData('/order/rm',postData).then(res=>{
            // console.log(res)
            if(res.data.code==200){
              // console.log(this.data.orders[e.currentTarget.dataset.index].orderId)
              var orders = this.data.orders
              var total = this.data.total
              orders.splice(e.currentTarget.dataset.index, 1)
              if (!orders.length) {
                // console.log('meil')
                this.setData({
                  isNothing: true
                })
              }
              this.setData({
                orders,
                total: total - 1
              })
              app.showToast('删除成功')
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
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
    this.setData({
      islogin:false,
      isNothing:true,
      isload:true
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.setData({
          islogin: true,

        })
        
        var postData = { "accessToken": res.data.accessToken,"index":this.data.index,"pageSize":this.data.pageSize}
        app.postData('/order/my',postData).then((res) => {
          // res.data.data = {
          //   "total": 11,
          //   "list": [
          //     {
          //       "orderId": "20190107094396062010",
          //       "goodsType": 2,
          //       "createTime": "2019-01-01 11:31:35",
          //       "payStatus": 1,
          //       "payment": 69900,
          //       "serviceStatus": 1,
          //       "itemList": [
          //         {
          //           "id": 1,
          //           "goodsId": 1,
          //           "goodsName": "LOGO设计",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         },
          //         {
          //           "id": 2,
          //           "goodsId": 2,
          //           "goodsName": "海报设计",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         },
          //         {
          //           "id": 3,
          //           "goodsId": 3,
          //           "goodsName": "招牌设计",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         },
          //         {
          //           "id": 4,
          //           "goodsId": 4,
          //           "goodsName": "菜单设计",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         },
          //         {
          //           "id": 5,
          //           "goodsId": 5,
          //           "goodsName": "爆品梳理",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         },
          //         {
          //           "id": 6,
          //           "goodsId": 6,
          //           "goodsName": "成本把控",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         },
          //         {
          //           "id": 7,
          //           "goodsId": 7,
          //           "goodsName": "主推菜品",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         },
          //         {
          //           "id": 8,
          //           "goodsId": 8,
          //           "goodsName": "活动设置",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         }
          //       ]
          //     },
          //     {
          //       "orderId": "20190107094396062003",
          //       "goodsType": 1,
          //       "createTime": "2019-01-01 11:31:35",
          //       "payStatus": 1,
          //       "payment": 69900,
          //       "serviceStatus": 0,
          //       "itemList": []
          //     },
          //     {
          //       "orderId": "20190107094396062007",
          //       "goodsType": 1,
          //       "createTime": "2019-01-01 11:21:42",
          //       "payStatus": 1,
          //       "payment": 49900,
          //       "serviceStatus": 0,
          //       "itemList": []
          //     }
          //   ]
          // }
          if(res.data.data){
            let orders = res.data.data.list
            for (let i = 0; i < orders.length; i++) {
              orders[i].payment = Number(orders[i].payment / 100).toFixed(2)
            }
            console.log(orders)
            this.setData({
              orders,
              total:res.data.data.total,
              isNothing:false,
              isload: false
            })
            wx.hideLoading()
          }
          else{
            this.setData({
              isNothing:true,
              isload: false
            })
            wx.hideLoading()
          }
          
        })
      },
      fail:()=> {
        // console.log(1)
        this.setData({
          isload:false
        })
        wx.hideLoading()
      },
      error:function(error){
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      index:0
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      index: 0
    })
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
    if(this.data.orders.length<this.data.total){
      var index=this.data.index
      this.setData({
        index:index+1
      })
      // console.log(this.data.index)
      var postData = { "accessToken": app.globalData.accessToken, "index": this.data.index, "pageSize": this.data.pageSize }
      console.log(postData)
      app.postData('/order/my', postData).then(res=>{   
        if(res.data.code==200){
          // res.data.data = {
          //   "total": 11,
          //   "list": [
          //     {
          //       "orderId": "20190107094396062010",
          //       "goodsType": 2,
          //       "createTime": "2019-01-01 11:31:35",
          //       "payStatus": 1,
          //       "payment": 69900,
          //       "serviceStatus": 1,
          //       "itemList": [
          //         {
          //           "id": 1,
          //           "goodsId": 1,
          //           "goodsName": "LOGO设计",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         },
          //         {
          //           "id": 2,
          //           "goodsId": 2,
          //           "goodsName": "海报设计",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         },
          //         {
          //           "id": 3,
          //           "goodsId": 3,
          //           "goodsName": "招牌设计",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         },
          //         {
          //           "id": 4,
          //           "goodsId": 4,
          //           "goodsName": "菜单设计",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         },
          //         {
          //           "id": 5,
          //           "goodsId": 5,
          //           "goodsName": "爆品梳理",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         },
          //         {
          //           "id": 6,
          //           "goodsId": 6,
          //           "goodsName": "成本把控",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         },
          //         {
          //           "id": 7,
          //           "goodsId": 7,
          //           "goodsName": "主推菜品",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         },
          //         {
          //           "id": 8,
          //           "goodsId": 8,
          //           "goodsName": "活动设置",
          //           "imgUrl": "",
          //           "num": 1,
          //           "unitPrice": 5900,
          //           "total": 5900
          //         }
          //       ]
          //     },
          //     {
          //       "orderId": "20190107094396062003",
          //       "goodsType": 1,
          //       "createTime": "2019-01-01 11:31:35",
          //       "payStatus": 1,
          //       "payment": 69900,
          //       "serviceStatus": 0,
          //       "itemList": []
          //     },
          //     {
          //       "orderId": "20190107094396062007",
          //       "goodsType": 1,
          //       "createTime": "2019-01-01 11:21:42",
          //       "payStatus": 1,
          //       "payment": 49900,
          //       "serviceStatus": 0,
          //       "itemList": []
          //     }
          //   ]
          // }
          console.log(res.data.data)
          if (res.data.data) {
            let orders = res.data.data.list
            let orders1=this.data.orders
            for (let i = 0; i < orders.length; i++) {
              orders[i].payment = Number(orders[i].payment / 100).toFixed(2)
              orders1.push(orders[i])
            }
            // console.log(orders)
            this.setData({
              orders : orders1,
              total: res.data.data.total,
            })
          }
        }
        
      })
    }
    else{

    }
  },  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})