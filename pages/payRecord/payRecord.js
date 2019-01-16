// pages/payRecode/payRecode.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "购买记录",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.postData('/member/bought/rd/list',{"accessToken":app.globalData.accessToken,"index":0,"pageSize":20}).then((res)=>{
      console.log(res)
      for(let i=0;i<res.data.data.list.length;i++){
        // res.data.data.list[i].duration=3
        if (res.data.data.list[i].durationUnit =="DAY"){
          res.data.data.list[i].name="日度会员卡"
        }
        else if (res.data.data.list[i].durationUnit == "WEEK"){
          res.data.data.list[i].name = "周度会员卡"
        }
        else if (res.data.data.list[i].durationUnit == "MONTH" && res.data.data.list[i].duration !== 3) {
          res.data.data.list[i].name = "月度会员卡"
        }
        else if (res.data.data.list[i].durationUnit == "MONTH" && res.data.data.list[i].duration==3){
          res.data.data.list[i].name = "季度会员卡"
        }
        else if (res.data.data.list[i].durationUnit == "YEAR") {
          res.data.data.list[i].name = "年度会员卡"
        }
        res.data.data.list[i].total = (Number(res.data.data.list[i].total)/100).toFixed(2)
        res.data.data.list[i].payment = (Number(res.data.data.list[i].payment) / 100).toFixed(2)
      }
      this.setData(res.data.data)
    }).catch((error)=>{
      console.log(error)
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