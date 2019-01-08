// pages/balance/balance.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "余额充值",
    top_up_moneys: ["100", "300", "500", "1000", "3000", "5000", "8000","10000"],
    isselectMoney:0,
    isshowAlert:false,
    ischecked:false,
    topUp: '',
    returnMoney:"",
    inputMoney:""
  },

  selectMoney:function(e){
    console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.id!==undefined){
      this.setData({
        isselectMoney: e.currentTarget.dataset.id,
        topUp: Number(this.data.top_up_moneys[e.currentTarget.dataset.id]),
        returnMoney: Number(this.data.top_up_moneys[e.currentTarget.dataset.id]) / 10
      })
      
    }
    else{
      console.log(this.data.inputMoney)
      if (this.data.inputMoney){
        this.setData({
          isselectMoney: 8,
          topUp: Number(this.data.inputMoney),
          returnMoney: Number(this.data.inputMoney) / 10
        })
        return
      }
      this.setData({
        isselectMoney: 8,
        topUp: 0,
        returnMoney:0
      })
    }
    
  },

  changeSwitch:function(e){
    // console.log(e.detail.value)
    this.setData({
      isshowAlert: e.detail.value
    })
  },
  
  closeAlert:function(){
    this.setData({
      isshowAlert:false,
      ischecked:false
    })
  },

  know:function(){
    this.setData({
      isshowAlert: false,
    })
  },

  goAgreement:function(){
    wx.navigateTo({
      url: '../agreement/agreement',
    })
  },

  changePassword:function(){
    wx.navigateTo({
      url: '../changePassword/changePassword',
    })
  },

  inputMoney:function(e){
    console.log(e.detail.value)
    this.setData({
      inputMoney: Number(e.detail.value),
      topUp: Number(e.detail.value),
      returnMoney: Number(e.detail.value) / 10
    })
  },

  Blur:function(e){
    console.log(e)
    if(Number(e.detail.value)==0){
      this.setData({
        inputMoney:""
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      topUp:Number(this.data.top_up_moneys[this.data.isselectMoney]),
      returnMoney: Number(this.data.top_up_moneys[this.data.isselectMoney])/10
    })
    console.log(this.data.topUp)
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

  },


  stop:function(){

  }
})