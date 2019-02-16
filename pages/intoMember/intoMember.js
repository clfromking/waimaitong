// pages/intoMember/intoMember.js
const app = getApp()
const ctx = wx.createCanvasContext('myCanvas')
const ctx1 = wx.createCanvasContext('myCanvas1')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "会员创建成功",
    member_num:"",
    isshare:false,
    avatarUrl:"",
    shareImg:"",
    isClick:false,
    shareImgSmall:""
  },

  not:function(){
    wx.switchTab({
      url: '../member/member',
    })
  },

  goShare:function(){
    this.setData({
      isClick:true
    })
    console.log(this.data.shareImg)
    if (this.data.shareImg && this.data.shareImgSmall){
      this.setData({
        isshare: true
      })
    }
    else{
      wx.showLoading({
        title: '',
        mask:true
      })
    }
    
  },

  cancelShare:function(){
    this.setData({
      isshare: false
    })
  },

  shareRing:function(){

  },

  shareFriend:function(){

  },

  shareRing:function(){
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImg,
      success: function (res) {
        console.log(res)
        that.showToast('保存成功，请到相册中查看')
      },
      fail: function () {
        wx.getSetting({
          success(res) {
            if (res.authSetting["scope.writePhotosAlbum"]) {
            }
            else {
              wx.navigateTo({
                url: '../authorization/authorization',
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.hideShareMenu()
    
    app.postData('/member/my/get',{"accessToken":app.globalData.accessToken}).then(res=>{
      res.data.code = 200
      if(res.data.code == 200){
        this.setData({
          member_num: res.data.data.poiMemberData.memberId,
          // member_num: 100000
        })
        // return
        this.drawShareImg()
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      return {
        title: '惊喜福利-免费外卖运营等你加入赚翻天',
        path: 'pages/member/member?inviterId=' + app.globalData.puid + "&type=share",
        imageUrl: this.data.shareImgSmall
      }
      
    }
  },

  //获取图片信息
  getimginfo: function (img) {
    var promise = new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: img,
        success: function (res) {
          resolve(res)
        },
        fail: function (error) {
          reject(error);
        }
      })
    })
    return promise
  },

  drawImg:function(){
    var bg = "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/intoMember/fx_ewm.png"
    var that = this
    that.setData({
      // avatarUrl: app.globalData.avatarUrl || "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/all/avatarUrl.png"
      avatarUrl:  "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/all/avatarUrl.png"
    })
    app.postData('/invite/getwxacodeunlimit', { "accessToken": app.globalData.accessToken, "r": '0', "g": '0', "b": '0', "pageUrlIndex": 0 }).then(res => {
      console.log(res)
      if (res.data.code == 200) {
        Promise.all([
          that.getimginfo(bg),
          // that.getimginfo(that.data.avatarUrl),
          that.getimginfo(res.data.data)
        ]).then((res) => {
          ctx.drawImage(res[0].path, 0, 0, 525, 933.8)
          // ctx.drawImage(res[1].path, 175, 118.4, 176.4, 176.4)
          ctx.fillStyle = "#fff";
          ctx.setFontSize(19.6)
          ctx.setTextAlign('center')
          ctx.fillText("我已成为第", 262.5, 227)
          ctx.setFontSize(95.2)
          ctx.setTextAlign('center')
          // ctx.font = 'normal bold 47.6px DINAlternate - Bold'
          ctx.fillText(that.data.member_num, 262.5, 325.3)
          const metrics = ctx.measureText(10)
          // that.data.member_num.length * 55.8
          var i = that.data.member_num;
          var l = i.toString().length;
          const left = 2 * ((262.5 - l * 27.9) / 2 + l * 27.9 + 2)
          console.log(left)
          ctx.setFontSize(19.6)
          ctx.setTextAlign('left')
          ctx.fillText("位", left,315.3)
          ctx.setTextAlign('center')
          ctx.fillText("外卖通免费运营合作伙伴", 262.5, 371)
          ctx.beginPath()
          ctx.setLineJoin('round')
          ctx.setStrokeStyle('white')
          ctx.lineTo(156.5, 514)
          ctx.lineTo(368.5, 514)
          ctx.lineTo(368.5, 726)
          ctx.lineTo(156.5, 726)
          ctx.lineTo(156.5, 514)
          ctx.stroke()
          ctx.setFillStyle('white')
          ctx.fill()
          ctx.drawImage(res[1].path,192.5, 550, 140, 140)
          ctx.draw(false,function(e){
            if (e.errMsg == 'drawCanvas:ok'){
              setTimeout(function () {
                wx.canvasToTempFilePath({
                  canvasId: 'myCanvas',
                  success: function (res) {
                    console.log(res.tempFilePath)
                    that.setData({
                      // shareTitle: that.data.gift_detail.uname+'赠送给你一种礼物',
                      shareImg: res.tempFilePath,
                      // sharePath:'pages/index/index'
                    })

                    wx.hideLoading()
                    if(that.data.isClick){
                      that.setData({
                        isshare: true
                      })
                    }
                    
                  },

                }, this)
              }, 0)
            }
          })
        }).catch((error) => {
          console.log(error)
          that.drawImg()
        })
      }
    })
  },

  drawShareImg:function(){
    this.getimginfo('https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/intoMember/fx_pic.png').then(res => {
      console.log(res)
      ctx1.drawImage(res.path, 0, 0, 500, 400)
      ctx1.fillStyle = "#fff";
      ctx1.setFontSize(24)
      ctx1.setTextAlign('left')
      ctx1.fillText("我已成为第", 65, 134)
      ctx1.setFontSize(68)
      ctx1.setTextAlign('left')
      ctx1.fillText(this.data.member_num, 187, 136)
      // const metrics = ctx1.measureText(1)
      // console.log(metrics.width)
      var i = this.data.member_num;
      var l = i.toString().length;
      const left = ((l * 19.9) + 95.5) * 2
      console.log(left)
      ctx1.setFontSize(24)
      ctx1.setTextAlign('left')
      ctx1.fillText("位", left, 134)
      ctx1.fillText("外卖通免费运营合作伙伴", 203, 185)
      var that = this
      ctx1.draw(false,function(e){
        if (e.errMsg == 'drawCanvas:ok') {
          setTimeout(function () {
            wx.canvasToTempFilePath({
              canvasId: 'myCanvas1',
              success: function (res) {
                console.log(res.tempFilePath)
                // return res.tempFilePath
                that.setData({
                  // shareTitle: that.data.gift_detail.uname+'赠送给你一种礼物',
                  shareImgSmall: res.tempFilePath,
                  // sharePath:'pages/index/index'
                })
                that.drawImg()
                // wx.hideLoading()
              },

            }, this)
          }, 0)
        }
      })
    })
  },

})