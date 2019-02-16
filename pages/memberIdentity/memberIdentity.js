// pages/memberIdentity/memberIdentity.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "会员身份",
    identity_list:[],
    isin:0
  },

  upgradeCard:function(e){
    console.log(e.currentTarget.dataset.id)
    console.log(this.data.isin)
    if (e.currentTarget.dataset.id == this.data.isin){
      wx.navigateTo({
        url: '../renewAdmin/renewAdmin',
      })
    }
    else{
      wx.navigateTo({
        url: '../dredge/dredge?type=upgrade&id='+e.currentTarget.dataset.id,
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    app.getData('/card/list?accessToken='+app.globalData.accessToken).then(res=>{
      console.log(res)
      for(let i=0;i<res.data.data.length;i++){
        if (res.data.data[i].durationUnit=="DAY"){
          res.data.data[i].name = "日度会员卡"
        }
        else if (res.data.data[i].durationUnit == "WEEK"){
          res.data.data[i].name = "周度会员卡"
        }
        else if (res.data.data[i].durationUnit == "MONTH" && res.data.data[i].duration !==3 ){
          res.data.data[i].name = "月度会员卡"
        }
        else if (res.data.data[i].durationUnit == "MONTH" && res.data.data[i].duration == 3){
          res.data.data[i].name = "季度会员卡"
        }
        else if (res.data.data[i].durationUnit == "YEAR"){
          res.data.data[i].name = "年度会员卡"
        }
      }
      this.setData({
        identity_list:res.data.data
      })
      app.postData('/member/my/get',{"accessToken":app.globalData.accessToken}).then(res1=>{
        console.log(res1)
        // res1.data.data.isMember = true
        // res1.data.data.poiMemberData = {
        //   "costSave": 0,
        //   "durationUnit": "MONTH",
        //   "duration": 0,
        //   "buyTime": "2019-01-11 16:31:17",
        //   "expiredAt": "2019-02-10 23:59:59",
        //   "autoFeeRenew": 1,
        //   "autoFee": 38800,
        //   "memberId": 1
        // }
        // res1.data.data.poiMemberData.duration = 1
        // res1.data.data.poiMemberData.durationUnit = "YEAR"
        for(let i=0;i<res.data.data.length;i++){
          if (res1.data.data.poiMemberData.durationUnit == res.data.data[i].durationUnit && res1.data.data.poiMemberData.duration == res.data.data[i].duration){
            this.setData({
              isin:i
            })
            console.log(i)
            break
          }
        }
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