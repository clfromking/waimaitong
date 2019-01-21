// pages/changePassword/changePassword.js
const app = getApp()
let now_password=""
// let all=false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    password_length:6,
    password_val:"",
    title:"提示",
    alt:"请输入当前支付密码",
    type:"",
    isFocus: true,  //聚焦 
  },
  inputPassword:function(e){
    this.setData({
      password_val:e.detail.value
    })
  },
  gofocus:function(){
    this.setData({
      isFocus:true
    })
  },
  next:function(){
    console.log(this.data.password_val)
    if(!this.data.password_val){
      app.showToast('余额密码不能为空')
      return
    }
    else if(this.data.password_val.length<6){
      app.showToast('余额密码不得少于6位')
      return
    }
    
    if (this.data.type==''){
      now_password=this.data.password_val
      
      wx.redirectTo({
        url: '../changePassword/changePassword?type=next&all='+this.data.all+'&other='+this.data.other,
      })
    }
    else if (this.data.type=="next"){
      wx.redirectTo({
        url: '../changePassword/changePassword?type=again&value=' + this.data.password_val + '&all=' + this.data.all + '&other=' + this.data.other,
      })
    }
    else{
      if(this.data.password_val==this.data.beforePassword){
        console.log(this.data.all)
        console.log(now_password)
        if(this.data.all==true||this.data.all=='true'){
          console.log('全的')
          var postData = { "accessToken":app.globalData.accessToken, "oldPwd": now_password, "newPwd": this.data.password_val}
          app.postData('/setting/poi/balance/pwd/reset',postData).then(res=>{
            if(res.data.code==200){
              app.showToast('修改成功')
              setTimeout(function(){
                wx.navigateBack({
                  
                })
              },1500)
            }
            else if(res.data.code==406){
              setTimeout(function(){
                wx.redirectTo({
                  url: '../changePassword/changePassword?all=true&other=',
                })
              },1500)
            }
          })

        }
        else{
          console.log('不全')
          console.log(this.data.other)
          if(this.data.other=='newSet'){
            console.log('忘记了设置')
            app.postData('/setting/poi/balance/forget/set', { "accessToken": app.globalData.accessToken, "newPwd": this.data.password_val}).then(res=>{
              if(res.data.code==200){
                app.showToast('设置成功')
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../balance/balance',
                  })
                }, 1500)
              }
            })
          }
          else{
            console.log('初次设置')
            app.postData('/setting/poi/balance/pwd/set', { "accessToken": app.globalData.accessToken, "pwd": this.data.password_val }).then(res => {
              console.log(res)
              if (res.data.code == 200) {
                app.globalData.poiBasicData.balancePwdSet = true
                console.log(app.globalData)
                app.showToast('设置成功')
                setTimeout(function () {
                  wx.navigateBack({

                  })
                }, 1500)
              }
            })
          }
          
        }
        // return
        
        
      }
      else {
        app.showToast('两次密码不一致，请重新输入')
        setTimeout(function(){
          wx.redirectTo({
            url: '../changePassword/changePassword?type=next&all=' + this.data.all + '&other=' + this.data.other,
          })
        },1500)
        
      }
    }
    
    
  },

  forgetPassword:function(){
    wx.redirectTo({
      url: '../authCode/authCode',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    console.log(options)
    this.setData({
      all:options.all,
      other:options.other
    })
    if(options.value){
      this.setData({
        beforePassword:options.value
      })
    }
    this.setData({
      type: options.type||""
    })
 
    
    if(options.type=='next'){
      this.setData({
        title:"设置余额密码",
        alt:"请设置微信支付密码，用于支付验证"
      })
    }
    else if (options.type =="again"){
      this.setData({
        title: "设置余额密码",
        alt: "请再次填写以确认"
      })
    }
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