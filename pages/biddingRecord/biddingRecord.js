// pages/biddingRecord/biddingRecord.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "",
    isSelect:0,
    index:0,
    pageSize:20,
    nothing:false
  },

  changeNav:function(e){
    this.setData({
      total:0,
      list:[]
    })
    if(this.data.isSelect==e.currentTarget.dataset.index){
      return
    }
    this.setData({
      isSelect:e.currentTarget.dataset.index,
      index:0
    })
    var url=""
    if(e.currentTarget.dataset.index==0){
      url = "/bidding/recharge/in/list"
      
    }
    else{
      url = "/bidding/recharge/out/list"
      
      
    }
    var postData = { "accessToken": app.globalData.accessToken, "index": this.data.index, "pageSize": this.data.pageSize }
    app.postData(url,postData).then((res)=>{
      console.log(res)
      if(res.data.code==404){
        this.setData({
          total:0,
          list:[],
          nothing:true
        })
        // app.showToast(res.data.msg)
      }
      else if (res.data.code == 200) {
        this.setData(res.data.data)
        this.setData({
          nothing: false
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    var postData = {"accessToken":app.globalData.accessToken,"index":this.data.index,"pageSize":this.data.pageSize}
    app.postData('/bidding/recharge/in/list',postData).then((res)=>{
      console.log(res)
      if(res.data.code==404){
        this.setData({
          total: 0,
          list: [],
          nothing:true
        })
        // app.showToast(res.data.msg)
      }
      else if (res.data.code == 200) {
        this.setData(res.data.data)
        this.setData({
          nothing: false
        })
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
    if(this.data.list.length<this.data.total){
      var index = this.data.index
      this.setData({
        index: index + 1
      })
      var postData = { "accessToken": app.globalData.accessToken, "index": this.data.index, "pageSize": this.data.pageSize }
      app.postData('/bidding/recharge/in/list', postData).then(res=>{
        console.log(res)
        if (res.data.code == 404) {
          this.setData({
            total: 0,
            list: []
          })
          app.showToast(res.data.msg)
        }
        else if (res.data.code == 200) {
          var list=this.data.list
          for(let i=0;i<res.data.data.list.length;i++){
            list.push(res.data.data.list[i])
          }
          this.setData({
            list,
            total:res.data.data.total
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})