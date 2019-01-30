// pages/storeAuthor/storeAuthor.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "认证授权",
    logo:"",
    type:0,
    placeholder_user:"",
    placeholder_password:"",
    account:"",
    password:""
  },

  inputMsg:function(e){
    if(e.currentTarget.dataset.index==0){
      this.setData({
        account:e.detail.value
      })
    }
    else{
      this.setData({
        password: e.detail.value
      })
    }
  },

  author:function(){
    if(!this.data.account){
      app.showToast('账号不能为空')
    }
    else if(!this.data.password){
      app.showToast('密码不能为空')
    }
    else{
      console.log(app.globalData)
      var double=app.globalData.double
      var statusBarHeight=app.globalData.statusBarHeight
      var url=""
      if(this.data.type==0){
        url ="/setting/poi/auth/ele"
      }
      else{
        url = "/setting/poi/auth/mt"
      } 
      var postData = { "accountName": this.data.account,"accountPwd":this.data.password,"accessToken":app.globalData.accessToken}
      app.postData(url,postData).then((res)=>{
        console.log(res)
        if(res.data.code==200&&res.data.data){
          app.globalData.poiBasicData=res.data.data
          if (this.data.type == 0){
            app.globalData.eleAuth = true
          }
          else{
            app.globalData.mtAuth = true
          }
          app.showToast('认证成功')      
          console.log(app.globalData)
          setTimeout(function(){
            wx.switchTab({
              url: '../index/index',
            })
          },1500)
          
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
    // options.type=1
    let src=""
    let placeholder_user =''
    let placeholder_password =''
    if(options.type==0){
      src ="http://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/all/elmlogo.png"
      placeholder_user ="请输入饿了么商户端账号"
      placeholder_password ="请输入饿了么商户端密码"
    }
    else if (options.type==1){
      src ="https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/all/mtlogo.png"
      placeholder_user = "请输入美团外卖商户端账号"
      placeholder_password = "请输入美团外卖商户端密码"
    }
    else{
      src = "http://pk1897l3c.bkt.clouddn.com/renewAdmin/promise_icon3.png"
      placeholder_user = ""
      placeholder_password = "请输入商户老板常用或绑定外卖平台手机"
    }
    this.setData({
      logo:src,
      type: options.type,
      placeholder_user,
      placeholder_password
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