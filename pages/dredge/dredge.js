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
    isin:0
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
      pay_money
    })
  },

  //去支付
  goPay:function(){
    console.log(app.globalData.isBalancePwdSet)
    if (app.globalData.isBalancePwdSet == 0 || app.globalData.isBalancePwdSet==undefined){
      wx.navigateTo({
        url: '../changePassword/changePassword?type=next',
      })
    }
    else{
      wx.navigateTo({
        url: '../pay/pay',
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
    this.setData({
      type:options.type
    })
    this.setData(app.globalData)
    app.postData('/member/my/get', { "accessToken": app.globalData.accessToken }).then(res1 => {
      // res1.data.data.newbie=true
      this.setData(res1.data.data)
      app.getData('/card/list?accessToken=' + app.globalData.accessToken).then(res => {
        let data = res.data.data
        if (options.type == "renew") {
          var expiredAt = new Date(res1.data.data.poiMemberData.expiredAt).valueOf()
          var date = Date.parse(new Date());
          // res1.data.data.poiMemberData.duration = 3
          for (let i = 0; i < res.data.data.length; i++) {
            if (res1.data.data.poiMemberData.durationUnit == res.data.data[i].durationUnit && res1.data.data.poiMemberData.duration == res.data.data[i].duration) {
              this.setData({
                isin: i,
                isselect:i
              })
              console.log(i)
              break
            }
          }


          this.setData({
            expire_time: ((expiredAt - date) / 1000 / 60 / 60 / 24).toFixed(0)
          })
        }
        else if (options.type == "upgrade"){
          // res1.data.data.poiMemberData.duration = 1
          // res1.data.data.poiMemberData.durationUnit="YEAR"
          for (let i = 0; i < res.data.data.length; i++) {
            if (res1.data.data.poiMemberData.durationUnit == res.data.data[i].durationUnit && res1.data.data.poiMemberData.duration == res.data.data[i].duration) {
              this.setData({
                isin: i,
                // isselect: i
              })

              break
            }
          }
          this.setData({
            isselect:options.id
          })
        }
        var pay_money = this.data.pay_money
        if (res1.data.data.newbie) {
          pay_money = (data[0].price - data[0].newDiscount) / 100
        }
        else {
          pay_money = data[0].price / 100
        }

        if (options.type == "upgrade" || options.type == "renew"){
          pay_money = data[this.data.isselect].price / 100
        }
        
        this.setData({
          plans: data,
          pay_money
        })
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