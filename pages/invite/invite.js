// pages/invite/invite.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myNickname:"",
    myAvatarurl:""
  },

  go:function(e){
    switch(Number(e.currentTarget.dataset.index)){
      case 0:
        wx.navigateTo({
          url: '../inviteRecord/inviteRecord?type=today',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../inviteRecord/inviteRecord?type=all',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../allEarn/allEarn?total=' + this.data.totalIncome,
        })
        break
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({
      myNickname: app.globalData.nickName,
      myAvatarurl: app.globalData.avatarUrl || "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/all/avatarUrl.png"
    })
    app.getData('/invite/home?accessToken='+app.globalData.accessToken).then(res=>{
      console.log(res)
      if(res.data.code == 200){
        res.data.data.totalIncome = (res.data.data.totalIncome/100).toFixed(2)
        this.setData(res.data.data)

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
    return app.allShare('invite1')
  }
})