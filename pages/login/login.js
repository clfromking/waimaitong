// pages/login/login.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "登录",
  },

  getuserinfo:function(e){
    if(e.detail.userInfo){
      wx.showLoading({
        title: '请稍候',
        mask:true
      })
      wx.login({
        success:function(res){
          wx.getUserInfo({
            withCredentials:true,
            success:(res1)=>{
              var postData = {}
              console.log(app.globalData.inviterId)
              if(app.globalData.inviterId){
                // console.log('you')
                postData = { 'code': res.code, 'encryptedData': res1.encryptedData, 'iv': res1.iv ,'inviterId':app.globalData.inviterId}
              }
              else {
                // console.log('meiy')
                postData = { 'code': res.code, 'encryptedData': res1.encryptedData, 'iv': res1.iv }
              }
             
              app.postData('/wechat/login',postData).then((res)=>{
                console.log(res)
                var timestamp = new Date().getTime();
                if(res.data.code==200){
                  wx.setStorage({
                    key: 'userInfo',
                    data: res.data.data,
                    success:function(){
                      
                      wx.getSystemInfo({
                        success: function (res2) {
                          var inviterId = ''
                          if(app.globalData.inviterId){
                            inviterId = app.globalData.inviterId
                            app.globalData = res.data.data
                            app.globalData.double = 750 / res2.screenWidth
                            app.globalData.statusBarHeight = Number(res2.statusBarHeight)
                            app.globalData.inviterId = inviterId
                          }
                          else {
                            app.globalData = res.data.data
                            app.globalData.double = 750 / res2.screenWidth
                            app.globalData.statusBarHeight = Number(res2.statusBarHeight)
                          }
                          
                          console.log(app.globalData)
                          wx.showToast({
                            title: '登录成功',
                            icon: 'none',
                            mask: true,
                            duration: 1500
                          })
                          setTimeout(function () {
                            wx.navigateBack({

                            })
                          }, 1500)
                        }
                      })
                      
                      
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
      // wx.showToast({
      //   title: '授权失败，请重试！',
      //   icon:'none',
      //   mask:true,
      //   duration:1500
      // })
    }
  },

  getPhoneNumber:function(e){
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    // app.getData('/go/form/get?accessToken=' + app.globalData.accessToken).then((res) => {
    //   console.log(res)

    // })
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