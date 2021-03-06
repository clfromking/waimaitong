// pages/identityVerify/identityVerify.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "身份验证",
    name:"",
    phone:"",
    smsCode:"",
    typeId:0,
    getCodeMsg:"获取验证码",
    showInviteList:false,
    inviteList:[]
  },

  inputMsg:function(e){
    switch(Number(e.currentTarget.dataset.id)){
      case 0:
        this.setData({
          name:e.detail.value
        })
        break;
      case 1:
        this.setData({
          phone: e.detail.value
        })
        break;
      case 2:
        this.setData({
          smsCode: e.detail.value
        })
        break;
    }
  },

  getCode:function(){
    if (this.data.getCodeMsg!=="获取验证码"){
      return
    }
    if (this.data.phone.length<11){
      app.showToast("手机号不能少于11位")
      return
    }   
    var postData = { "accessToken": app.globalData.accessToken,"mobile":this.data.phone}
    app.postData('/setting/sms/auth',postData).then((res)=>{
      console.log(res)
      if(res.data.code==200){
        for (let i = 60; i >= 0; i--) {
          setTimeout(() => {
            // console.log(i)
            this.setData({
              getCodeMsg: i + "S"
            })
            if (i == 0) {
              this.setData({
                getCodeMsg: "获取验证码"
              })
            }
          }, 1000 * (60 - i))
        }
      }
    })
  },

  next:function(){
    if(!this.data.name){
      app.showToast("真实姓名不能为空")
    }
    else if (!this.data.smsCode){
      app.showToast("验证码不能为空")
    }
    else if(this.data.smsCode.length<6){
      app.showToast("验证码格式不正确")
    }
    else{
      wx.showLoading({
        title: '请稍等',
        mask:true
      })
      var postData = { "accessToken": app.globalData.accessToken, "mobile": this.data.phone,"name":this.data.name,"smsCode":this.data.smsCode}
      var url=""
      if(this.data.typeId==0){
        url = "/setting/auth/boss/mobile"
      }
      else{
        url = "/setting/employee/upd"
      }
      app.postData(url, postData).then((res) => {
        console.log(res)
        if(res.data.code==200){
          if (this.data.typeId == 0) {
            app.globalData.isMaster = 2
            wx.hideLoading()
            wx.redirectTo({
              url: '../certification/certification',
            })
          }
          else{
            app.postData('/setting/poi/invite/list', { "accessToken": app.globalData.accessToken }).then(res => {
              console.log(res)
              if (res.data.code == 200) {
                console.log(res.data.data.length)
                if(res.data.data.length == 0){
                  app.showToast('暂无商家邀请您')      
                  setTimeout(()=>{
                    wx.navigateBack({
                      
                    })
                  },1500) 
                }
                else{
                  wx.hideLoading()
                  var inviteList = this.data.inviteList
                  inviteList = res.data.data
                  this.setData({
                    inviteList,
                    showInviteList: true
                  })
                }
                
              }
            })
          }
        }
        else if(res.data.code==403){
          app.showToast(res.data.msg)
        }
 
      })
    }
  },

  joinIn:function(e){
    wx.showModal({
      title: '提示',
      content: '确认加入此店铺么？',
      cancelText:"取消",
      confirmText:"确认",
      success:(res)=>{
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
            mask:true
          })
          app.postData('/setting/poi/bind',{"accessToken":app.globalData.accessToken,"inviteDataId":e.currentTarget.dataset.id}).then(res=>{
            if(res.data.code == 200){
              app.postData('/wechat/login/token', { "accessToken": app.globalData.accessToken }).then(res => {
                wx.hideLoading()
                var double = app.globalData.double
                var statusBarHeight = app.globalData.statusBarHeight
                var inviterId = ''
                if(app.globalData.scene){
                  inviterId = app.globalData.inviterId
                  app.globalData = res.data.data
                  app.globalData.double = double
                  app.globalData.statusBarHeight = statusBarHeight
                  app.globalData.inviterId = inviterId
                }
                else{
                  app.globalData = res.data.data
                  app.globalData.double = double
                  app.globalData.statusBarHeight = statusBarHeight
                }
                
                app.showToast("认证成功")
                app.globalData.isMaster = 1
                console.log(app.globalData)
                setTimeout(function () {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }, 1500)
              })  
            }
          })
        } 
        else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.typeId)
    wx.hideShareMenu()
    this.setData({
      typeId:options.typeId
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