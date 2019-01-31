// pages/my/my.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "我的",
    options: [
      { "icon": "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/my/bidding.png", "text":"外卖平台竞价排名充值","other":"¥0.00元"},
      { "icon": "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/my/admin.png", "text": "店铺管理", "other": "" },
      { "icon": "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/my/author.png", "text": "店铺认证", "other": "未认证" },
      { "icon": "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/my/invite.png", "text": "邀请商户领现金", "other": "已邀请0位" },
      { "icon": "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/my/coupons.png", "text": "优惠卷", "other": "0张" },
      { "icon": "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/my/collect.png", "text": "我的收藏", "other": "" },
      { "icon": "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/my/feedback.png", "text": "意见反馈", "other": "" },
      { "icon": "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/my/set.png", "text": "设置", "other": "" }
    ],
    islogin:false,
    isAuthDone:0,
    curBalance:0,
    currShareBalance:0,
    isMember:false,
    nickName:"",
    avatarUrl:"",
    poiName:""
  },

  gologin:function(){
    if (app.globalData.accessToken){

    }
    else{
      wx.navigateTo({
        url: '../login/login',
      })
    }
    
  },

  goMember:function(){
    wx.switchTab({
      url: '../member/member',
    })
  },

  goShareMoney:function(){
    wx.navigateTo({
      url: '../shareMoney/shareMoney',
    })
  },

  goBalance:function(){
    // console.log(app.globalData.isAuthDone)
    if(app.globalData.poiBasicData){
      if (!app.globalData.poiBasicData.eleAuth && !app.globalData.poiBasicData.mtAuth) {
        wx.navigateTo({
          url: '../identityConfirm/identityConfirm',
        })
        return
      }
      wx.navigateTo({
        url: '../balance/balance',
      })
    }
    else{
      wx.navigateTo({
        url: '../balance/balance',
      })
    }
  },

  goOtherOption:function(e){
    // app.globalData.isAuthDone=1
    if(app.globalData.poiBasicData){
      if (!app.globalData.poiBasicData.eleAuth && !app.globalData.poiBasicData.mtAuth) {
        wx.navigateTo({
          url: '../identityConfirm/identityConfirm',
        })
        return
      }
      switch (e.currentTarget.dataset.id) {
        case 0:
          wx.navigateTo({
            url: '../biddingTop/biddingTop',
          })
          break;
        case 1:
          break;
        case 2:
          wx.getStorage({
            key: 'userInfo',
            success: function (res) {
              console.log(res)
              wx.navigateTo({
                url: '../certification/certification',
              })
            },
            fail: function () {
              wx.navigateTo({
                url: '../login/login',
              })
            }
          })

          break;
        case 3:
          break;
        case 4:
          wx.navigateTo({
            url: '../coupons/coupons',
          })
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          wx.navigateTo({
            url: '../set/set',
          })
          break;
      }
    }
    else{
      // wx.navigateTo({
      //   url: '../test/test',
      // })
      // return
      wx.navigateTo({
        url: '../identityConfirm/identityConfirm',
      })
      return
    }
    
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userInfo',
      success:(res)=>{

      },
      fail:()=>{
        this.gologin()
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
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.setData({
          islogin: true,
          nickName: app.globalData.nickName||"",
          avatarUrl: app.globalData.avatarUrl||""
        })
      },
      fail: () => {
        this.setData({
          islogin: false
        })
      }
    })
    
    if(app.globalData.poiBasicData){
      this.setData({
        poiName: app.globalData.poiBasicData.name
      })
    }
    else{
      this.setData({
        poiName: ""
      })
    }

    

    if (!app.globalData.accessToken){
      this.setData({
        isMember:false
      })
    }
    else{
      app.postData('/member/my/get', { "accessToken": app.globalData.accessToken }).then(res => {
        if (res.data.code == 200) {
          this.setData({
            isMember: res.data.data.isMember
          })
        }
      })
      app.getData('/setting/poi/basic/get?accessToken=' + app.globalData.accessToken).then(res => {
        let options = this.data.options
        if(app.globalData.poiBasicData){
          if (!app.globalData.poiBasicData.eleAuth && !app.globalData.poiBasicData.mtAuth) {
            options[2].other = "未认证"
          }
          else {
            options[2].other = "已认证"

          }
        }
        else{
          options[2].other = "未认证"
        }
        
        if (res.data.code == 200) {
          options[0].other = (Number(res.data.data.curBiddingBalance) / 100).toFixed(2) || 0.00
          options[0].other = "¥" + parseInt(options[0].other) + "元"
          var currShareBalance = parseInt((Number(res.data.data.currShareBalance) / 100))
          var curBalance = ((Number(res.data.data.curBalance) + Number(res.data.data.curRedBalance)) / 100)
          if (currShareBalance==0){
            currShareBalance=0
          }
          else{
            currShareBalance = currShareBalance
          }
          if (curBalance==0){
            curBalance=0
          }
          else{
            curBalance = parseInt(curBalance)
          }
          this.setData({
            options,
            currShareBalance: currShareBalance||0,
            curBalance: curBalance || 0,
            
          })
        }
      })
    }
    
    // app.globalData.isAuthDone=1
    
    
    // app.globalData.curBiddingBalance=null
    
    
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