const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: app.globalData.mobile,
    statusHeight: app.globalData.statusBarHeight,
    header_alts: [
      { "icon": "http://pk1897l3c.bkt.clouddn.com/member/member_icon1.png", "text": "海量折扣" }, 
      { "icon": "http://pk1897l3c.bkt.clouddn.com/member/member_icon2.png", "text": "低至0元" },
      { "icon": "http://pk1897l3c.bkt.clouddn.com/member/member_icon3.png", "text": "外卖运营" }],
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ],
    isMember:false,
    

  },

  goOther:function(e){
    // console.log(e.currentTarget.dataset.id)
    switch(Number(e.currentTarget.dataset.id)){
      case 0:
        wx.navigateTo({
          url: '../memberIdentity/memberIdentity',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../payRecord/payRecord',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../renewAdmin/renewAdmin',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../changePhone/changePhone?mobile='+this.data.mobile,
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../feedback/feedback',
        })
        break;
    }
  },

  dredgeMember:function(){

    if(!app.globalData.accessToken){
      wx.navigateTo({
        url: '../login/login',
      })
    }
    else if (!app.globalData.eleAuth && !app.globalData.mtAuth){
      wx.navigateTo({
        url: '../identityConfirm/identityConfirm',
      })
    }
    else{
      wx.navigateTo({
        url: '../dredge/dredge?type=',
      })
    }
  },

  renewal:function(){
    wx.navigateTo({
      url: '../dredge/dredge?type=renew',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // console.log(app.globalData)
    this.setData({
      mobile:app.globalData.mobile||""
    })
    // app.globalData.isMember = 1
      if(!app.globalData.accessToken){
        return
      }
      app.postData('/member/my/get', { "accessToken": app.globalData.accessToken }).then(res => {
        console.log(res.data)
        
        if(res.data.code==403){
          this.setData({
            isMember: false
          })
        }
        else if(res.data.code==200){
          if(res.data.data.isMember==false){
            this.setData({
              isMember: false
            })
            return
          }
          // res.data.data.isMember = true
          // res.data.data.poiMemberData = {
          //   "costSave": 0,
          //   "durationUnit": "MONTH",
          //   "duration": 0,
          //   "buyTime": "2019-01-11 16:31:17",
          //   "expiredAt": "2019-02-10 23:59:59",
          //   "autoFeeRenew": 1,
          //   "autoFee": 38800,
          //   "memberId": 1
          // }
          res.data.data.poiMemberData.buyTime = res.data.data.poiMemberData.buyTime.substr(0, res.data.data.poiMemberData.buyTime.indexOf(" "))
          res.data.data.poiMemberData.expiredAt = res.data.data.poiMemberData.expiredAt.substr(0, res.data.data.poiMemberData.expiredAt.indexOf(" "))
          // res.data.data.poiMemberData.duration=3
          if (res.data.data.poiMemberData.durationUnit == "DAY") {
            res.data.data.poiMemberData.name = "日度会员"
          }
          else if (res.data.data.poiMemberData.durationUnit == "WEEK") {
            res.data.data.poiMemberData.name = "周度会员"
          }
          else if (res.data.data.poiMemberData.durationUnit == "MONTH" && res.data.data.poiMemberData.duration !== 3) {
            res.data.data.poiMemberData.name = "月度会员"
          }
          else if (res.data.data.poiMemberData.durationUnit == "MONTH" && res.data.data.poiMemberData.duration == 3) {
            res.data.data.poiMemberData.name = "季度会员"
          }
          else if (res.data.data.poiMemberData.durationUnit == "YEAR") {
            res.data.data.poiMemberData.name = "年度会员"
          }
          this.setData(res.data.data)
          this.setData({
            isMember: true
          })
        }
        
      })
      
    
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