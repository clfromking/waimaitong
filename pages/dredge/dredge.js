// pages/dredge/dredge.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText:"开通会员",
    plans: [],
    pay_money:0,
    isselect:0,
    type:"",
    expire_time:0,
    isin:0,
    poiBasicData:""
  },

  selectPlan:function(e){
    var pay_money=this.data.pay_money
    if(this.data.newbie){
      pay_money = (this.data.plans[e.currentTarget.dataset.id].price - this.data.plans[e.currentTarget.dataset.id].newDiscount) / 100
    }
    else{
      pay_money = this.data.plans[e.currentTarget.dataset.id].price/100
    }
    console.log(pay_money)
    this.setData({
      isselect:e.currentTarget.dataset.id,
      isin:e.currentTarget.dataset.id,
      pay_money
    })
  },

  //去支付
  goPay:function(){
    // console.log(app.globalData.poiBasicData.isBalancePwdSet)
    if (!app.globalData.poiBasicData.balancePwdSet){
      wx.navigateTo({
        url: '../changePassword/changePassword?type=next&all=false&other=',
      })
    }
    else{
      let postData = { "accessToken": app.globalData.accessToken, "memberCardId": this.data.plans[this.data.isselect].id, "feeRenew": 1 }
      app.postData('/member/buy/submit', postData).then(res=>{
        console.log(res)
        if(res.data.code==200){
          wx.navigateTo({
            url: '../pay/pay?pay=' + res.data.data.payment + "&total=" + res.data.data.total + "&discount=" + res.data.data.discount + '&orderId=' + res.data.data.orderId+"&type=member&newbie="+this.data.newbie,
          })
        }
      })
      
    }
    
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
    console.log(options.type)
    wx.hideShareMenu()
    this.setData({
      type:options.type
    })
    app.postData('/wechat/login/token',{"accessToken":app.globalData.accessToken}).then(res=>{
      if(res.data.code == 200){
        app.globalData.name = res.data.data.name
        app.globalData.mobile = res.data.data.mobile
        this.setData(app.globalData)
      }
    })
    
    app.postData('/member/my/get', { "accessToken": app.globalData.accessToken }).then(res1 => {
      if(res1.data.code == 200){
        this.setData(res1.data.data)
        app.getData('/card/list?accessToken=' + app.globalData.accessToken).then(res => {
          let data = res.data.data
          if (options.type == "renew") {
            var expiredAt = new Date(res1.data.data.poiMemberData.expiredAt.replace(/-/g, '/')).getTime()
            var buyTime = new Date(res1.data.data.poiMemberData.buyTime.replace(/-/g, '/')).getTime();

            // res1.data.data.poiMemberData.duration = 1
            for (let i = 0; i < res.data.data.length; i++) {
              if (res1.data.data.poiMemberData.durationUnit == res.data.data[i].durationUnit && res1.data.data.poiMemberData.duration == res.data.data[i].duration) {
                this.setData({
                  isin: i,
                  isselect: i
                })
                console.log(i)
                break
              }
            }


            this.setData({
              expire_time: ((expiredAt - buyTime) / 1000 / 60 / 60 / 24).toFixed(0)
            })

            console.log(this.data.expire_time)
            console.log(((expiredAt - buyTime) / 1000 / 60 / 60 / 24).toFixed(0))
          }
          else if (options.type == "upgrade") {
            // res1.data.data.poiMemberData.duration = 3
            // res1.data.data.poiMemberData.durationUnit="YEAR"
            for (let i = 0; i < res.data.data.length; i++) {
              if (res1.data.data.poiMemberData.durationUnit == res.data.data[i].durationUnit && res1.data.data.poiMemberData.duration == res.data.data[i].duration) {
                console.log(i)
                this.setData({
                  isin: i,
                  // isselect: i
                })

                break
              }
            }
            this.setData({
              isselect: options.id
            })
          }
          var pay_money = this.data.pay_money
          var poiBasicData = app.globalData.poiBasicData
          // console.log(poiBasicData)
          if (res1.data.data.newbie) {
            pay_money = (data[0].price - data[0].newDiscount) / 100
          }
          else {
            pay_money = data[0].price / 100
          }

          if (options.type == "upgrade" || options.type == "renew") {
            pay_money = data[this.data.isselect].price / 100
          }

          this.setData({
            plans: data,
            pay_money,
            poiBasicData
          })
        })
      }
      // res1.data.data.newbie = false
      // res1.data.data.isMember = true
      // res1.data.data.poiMemberData = {
      //   "costSave": 0,
      //   "durationUnit": "MONTH",
      //   "duration": 0,
      //   "buyTime": "2019-01-11 16:31:17",
      //   "expiredAt": "2019-02-10 23:59:59",
      //   "autoFeeRenew": 1,
      //   "autoFee": 38800,
      //   "memberId":1
      // }
      
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