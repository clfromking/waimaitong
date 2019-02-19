// pages/pay/pay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    total:'',
    discount:'',
    pay:"",
    orderId:"",
    top:false,
    isShowShade:false,
    type:"",
    payWay:3,
    actionSheetHidden: true,
    actionSheetItems: [{ 'src': 'https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/all/wx_pay.png', 'text': '微信支付', 'payWay': 3 }, { 'src': 'https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/all/yue_pay.png', 'text': '余额支付' ,'payWay':4}],
    isSelectItem:0,
    isShowYu:false,
    isShowPwd:false,
    length:6,
    password_val: "",
    isFocus: false,  //聚焦 
  },

  inputPassword: function (e) {
    this.setData({
      password_val: e.detail.value
    })
    console.log(this.data.password_val)
    if(e.detail.value.length==6){
      // console.log('请求')
      this.setData({
        isShowPwd: false,
        isFocus: false,
        password_val: ""
      })
      setTimeout(() => {
        this.setData({
          isShowYu: false,
        })
        wx.showLoading({
          title: '',
          mask:true
        })
        // console.log(this.data.password_val)
        var postData = { "accessToken": app.globalData.accessToken, "orderId": this.data.orderId, "payWay": 4, "balancePwd": e.detail.value}
        var url = ""
        if (this.data.type == "member") {
          url = "/member/buy/confirm"
        }
        else if (this.data.type == "order") {
          url = "/order/pay/confirm"
        }
        app.postData(url, postData).then(res=>{
          if(res.data.code==200){
            wx.hideLoading()
            if (this.data.newbie == true || this.data.newbie == "true") {
              wx.redirectTo({
                url: '../intoMember/intoMember',
              })
              return
            }
            app.showToast('支付成功')
            this.setData({
              isShowShade: true,

            })
            if (this.data.isShowShade) {
              this.setData({
                top: true
              })
            }
          }
          else if(res.data.code == 412){
            wx.hideLoading()
            setTimeout(() => {
              console.log(1)
              app.showToast(res.data.msg)
            }, 500)
          }
          else if(res.data.code == 400){
            // wx.hideLoading()
            setTimeout(() => {
              console.log(1)
              app.showToast(res.data.msg)
            }, 500)

            this.setData({
              isShowYu: true
            })
            if (this.data.isShowYu) {
              this.setData({
                isShowPwd: true,
                // isFocus:true
              })
              setTimeout(() => {
                this.setData({
                  isFocus: true
                })
              }, 400)
            }
          }
          else if (res.data.code == 404) {
            wx.hideLoading()
            console.log('hide')
            setTimeout(() => {
              console.log(1)
              app.showToast(res.data.msg)
            }, 500)

          }
          else{
            wx.hideLoading()
            this.setData({
              isShowYu: true
            })
            if (this.data.isShowYu) {
              this.setData({
                isShowPwd: true,
                // isFocus:true
              })
              setTimeout(() => {
                this.setData({
                  isFocus: true
                })
              }, 400)
            }
          }
        })
      }, 800)
    }
  },

  gofocus: function () {
    // console.log(this.data.isFocus)
    this.setData({
      isFocus: true
    })
  },

  changePay:function(){
    wx.showActionSheet({
      itemList: ["微信支付","余额支付"],
      success:(res)=>{
        console.log(res)
        this.setData({
          isSelectItem:res.tapIndex
        })
      }
    })    
    // this.setData({
    //   actionSheetHidden: false
    // })
    // return
  },

  pay:function(){
    // console.log(this.data.pay)
    wx.showLoading({
      title: '',
      mask:true
    })
    
    //0元时强制走余额支付
    if (Number(this.data.pay) == 0) {
      if (!app.globalData.poiBasicData.balancePwdSet) {
        wx.navigateTo({
          url: '../changePassword/changePassword?type=next&all=false&other=',
        })
        return
      }
      else if (app.globalData.poiBasicData.balancePwdSet && app.globalData.poiBasicData.balancePwdFree == 0) {    //没有开通免密的话
        app.postData('/setting/poi/balance/pwd/required',{"accessToken":app.globalData.accessToken,"flag":1}).then(res=>{
          console.log(res)
          if(res.data.code == 200){
            this.postPay()
          }
        })
      }
      else if (app.globalData.poiBasicData.balancePwdSet && app.globalData.poiBasicData.balancePwdFree == 1){
        this.postPay()
      }
      
      return
    }


    if (this.data.actionSheetItems[this.data.isSelectItem].payWay == 4){
      if (!app.globalData.poiBasicData.balancePwdSet){
        wx.navigateTo({
          url: '../changePassword/changePassword?type=next&all=false&other=',
        })
        return
      }
      else if (app.globalData.poiBasicData.balancePwdSet && app.globalData.poiBasicData.balancePwdFree == 0){
        wx.hideLoading()
        // console.log('余额') 
        this.setData({
          isShowYu: true
        })
        if (this.data.isShowYu) {
          this.setData({
            isShowPwd: true,
            // isFocus:true
          })
          setTimeout(() => {
            this.setData({
              isFocus: true
            })
          }, 400)
        }
        return
      }   
    }
    var postData ={}
    postData = { "accessToken": app.globalData.accessToken, "orderId": this.data.orderId, "payWay": this.data.actionSheetItems[this.data.isSelectItem].payWay}
    var url=""
    if(this.data.type=="member"){
      url = "/member/buy/confirm"
    }
    else if(this.data.type=="order"){
      url = "/order/pay/confirm"
    }
    app.postData(url,postData).then(res=>{
      if(res.data.code==200){
        if (this.data.actionSheetItems[this.data.isSelectItem].payWay==3){ 
          app.pay(res.data.data).then(res => {
            wx.hideLoading()
            if (this.data.newbie == true || this.data.newbie == "true") {
              wx.redirectTo({
                url: '../intoMember/intoMember',
              })
              return
            }
            this.setData({
              isShowShade: true,

            })
            if (this.data.isShowShade) {
              this.setData({
                top: true
              })
            }
          })
        }
        else{
          wx.hideLoading()
          if (this.data.newbie == true || this.data.newbie == "true") {
            wx.redirectTo({
              url: '../intoMember/intoMember',
            })
            return
          }
          app.showToast('支付成功')
          this.setData({
            isShowShade: true,

          })
          if (this.data.isShowShade) {
            this.setData({
              top: true
            })
          }
        }
        
      }
      else if(res.data.code==404){
        wx.hideLoading()
        console.log('hide')
        setTimeout(()=>{
          console.log(1)
          app.showToast(res.data.msg)
        },500)
        
      }
      else{
        wx.hideLoading()
        setTimeout(() => {
          console.log(1)
          app.showToast(res.data.msg)
        },500)
      }
    }).catch(error=>{
      wx.hideLoading()
    })
    
  },

  go:function(e){
    // console.log(this.data.type)
    if(Number(e.currentTarget.dataset.index)==0){
      this.setData({
        top: false
      })
      setTimeout(() => {
        this.setData({
          isShowShade: false,
        })
        wx.showLoading({
          title: '返回首页',
          mask: true,
        })
        setTimeout(() => {
          wx.hideLoading()
          wx.switchTab({
            url: '../index/index',
          })
        }, 1500)
      }, 800)
    }
    else{
      if(this.data.type=="member"){
        this.setData({
          top: false
        })
        setTimeout(() => {
          this.setData({
            isShowShade: false,
          })
          wx.showLoading({
            title: '查看会员',
            mask: true,
          })
          setTimeout(() => {
            wx.hideLoading()
            wx.switchTab({
              url: '../member/member',
            })
          }, 1500)
        }, 800)
      }
      else{
        this.setData({
          top: false
        })
        setTimeout(() => {
          this.setData({
            isShowShade: false,
          })
          wx.showLoading({
            title: '查看订单',
            mask: true,
          })
          setTimeout(() => {
            wx.hideLoading()
            wx.switchTab({
              url: '../order/order',
            })
          }, 1500)
        }, 800)
      }
    }
  },

  closeShade: function () {
    this.setData({
      top:false
    })
    setTimeout(()=>{
      this.setData({
        isShowShade: false,
      })
      wx.showLoading({
        title: '返回首页',
        mask:true,
      })
      setTimeout(()=>{
        wx.hideLoading()
        wx.switchTab({
          url: '../index/index',
        })
      },1500)
    },800)
    
    
  },

  closeYu:function(){
    this.setData({
      isShowPwd:false,
      isFocus:false,
      password_val:""
    })
    setTimeout(()=>{
      this.setData({
        isShowYu:false,

      })
    },800)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(options.newbie)
    wx.hideShareMenu()
    if(options.newbie=="true"){
      // console.log(true)
      this.setData({
        newbie:true
      })
    }
    else{
      // console.log(false)
      this.setData({
        newbie:false
      })
    }
    if(options.total){
      options.total = (Number(options.total)/100).toFixed(2)
    }
    if(options.pay){
      options.pay = (Number(options.pay) / 100).toFixed(2)
    }
    if(options.discount){
      options.discount = (Number(options.discount) / 100).toFixed(2)
    }
    this.setData(options)
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

  },

  //列表中取消事件
  listenerActionSheet: function () {
    this.setData({
      //取反
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },

  postPay:function(){
    var postData = {}
    postData = { "accessToken": app.globalData.accessToken, "orderId": this.data.orderId, "payWay": 4 }
    var url = ""
    if (this.data.type == "member") {
      url = "/member/buy/confirm"
    }
    else if (this.data.type == "order") {
      url = "/order/pay/confirm"
    }
    app.postData(url, postData).then(res => {
      if (res.data.code == 200) {
        wx.hideLoading()
        if (this.data.newbie == true || this.data.newbie == "true") {
          wx.redirectTo({
            url: '../intoMember/intoMember',
          })
          return
        }
        app.showToast('支付成功')
        this.setData({
          isShowShade: true,

        })
        if (this.data.isShowShade) {
          this.setData({
            top: true
          })
        }
      }
      else if (res.data.code == 412) {
        wx.hideLoading()
        setTimeout(() => {
          console.log(1)
          app.showToast(res.data.msg)
        }, 500)
      }
      else if (res.data.code == 400) {
        // wx.hideLoading()
        setTimeout(() => {
          console.log(1)
          app.showToast(res.data.msg)
        }, 500)

        this.setData({
          isShowYu: true
        })
        if (this.data.isShowYu) {
          this.setData({
            isShowPwd: true,
            // isFocus:true
          })
          setTimeout(() => {
            this.setData({
              isFocus: true
            })
          }, 400)
        }
      }
      else if (res.data.code == 404) {
        wx.hideLoading()
        console.log('hide')
        setTimeout(() => {
          console.log(1)
          app.showToast(res.data.msg)
        }, 500)

      }
      else {
        wx.hideLoading()
        this.setData({
          isShowYu: true
        })
        if (this.data.isShowYu) {
          this.setData({
            isShowPwd: true,
            // isFocus:true
          })
          setTimeout(() => {
            this.setData({
              isFocus: true
            })
          }, 400)
        }
      }
    })
  }

})