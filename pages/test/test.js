const app = getApp()
Page({
  data: {
    height: app.globalData.height,
    winHeight: 0,
    hidden:true,
    bottom:0,
    pos:"fixed"
  },
  onLoad(options) {
    var that = this;   
    // 获取资讯内容高度
    wx.createSelectorQuery().selectAll('.infDetails-head').boundingClientRect(function(rect) {
      that.setData({
        winHeight: rect[0].height,
      });
    }).exec()
  },
  openKeyboard:function(e){
    console.log(e.detail.height)
    this.setData({
      bottom: e.detail.height,
      hidden: false
      // pos:'static'
    })
  },

})