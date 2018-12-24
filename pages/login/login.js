// pages/login/login.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "首页",
  },

  getuserinfo:function(e){
    console.log(e)
    if(e.detail.userInfo){
      wx.login({
        success:function(res){
          console.log(res)
          wx.getUserInfo({
            withCredentials:true,
            success:(res1)=>{
              console.log(res1)
              var postData = { 'code': res.code, 'encryptedData': res1.encryptedData, 'iv': res1.iv }
             
              app.postData('/wechat/login',postData).then((res)=>{
                console.log(res)
                var timestamp = new Date().getTime();
                if(res.data.code==200){
                  wx.setStorage({
                    key: 'userInfo',
                    data: res.data.data,
                    success:function(){
                      wx.showToast({
                        title: '登录成功',
                        icon:'none',
                        mask:true,
                        duration:1500
                      })
                      setTimeout(function(){
                        wx.redirectTo({
                          url: '../test/test',
                        })
                      },1500)
                      
                    },
                    fail:function(){
                      wx.showToast({
                        title: '登录失败，请重新授权!',
                        icon:'none',
                        mask:true,
                        duration:1500
                      })
                    }
                  })
                }
              }).catch((error)=>{
                console.log(error)
              })
            }
          })
        },
        fail:function(){
          wx.showToast({
            title: '授权失败，请重试！',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        }
      })
    }
    else{
      wx.showToast({
        title: '授权失败，请重试！',
        icon:'none',
        mask:true,
        duration:1500
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(new Date().getTime())
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