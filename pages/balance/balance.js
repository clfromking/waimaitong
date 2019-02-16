// pages/balance/balance.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "余额充值",
    top_up_moneys: ["100", "300", "500", "1000", "3000", "5000", "8000","10000"],
    isselectMoney:0,
    isshowAlert:false,
    ischecked:false,
    topUp: '',
    returnMoney:"",
    inputMoney:"",
    curBalance:"0.00",
    isHidePrompt:true,
    isSetPws:false,

    password_length: 6,
    password_val: "",
    before_pws:"",
    title: "设置余额密码",
    alt: "请设置余额支付密码，用于支付验证",
    type: "",
    isFocus: false,  //聚焦,
    type:"" 
  },

  selectMoney:function(e){
    // console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.id!==undefined){
      if (Number(this.data.top_up_moneys[e.currentTarget.dataset.id])<100){
        this.setData({
          isselectMoney: e.currentTarget.dataset.id,
          topUp: Number(this.data.top_up_moneys[e.currentTarget.dataset.id]),
          returnMoney: Number(this.data.top_up_moneys[e.currentTarget.dataset.id]) / 10,
          inputMoney: "",
          isHidePrompt:false
        })
      }
      else{
        this.setData({
          isselectMoney: e.currentTarget.dataset.id,
          topUp: Number(this.data.top_up_moneys[e.currentTarget.dataset.id]),
          returnMoney: Number(this.data.top_up_moneys[e.currentTarget.dataset.id]) / 10,
          inputMoney: "",
          isHidePrompt: true
        })
      }
      
      
    }
    else{
      console.log(this.data.inputMoney)
      if (this.data.inputMoney){
        if(Number(this.data.inputMoney)<100){
          this.setData({
            isselectMoney: 8,
            topUp: Number(this.data.inputMoney),
            returnMoney: Number(this.data.inputMoney) / 10,
            isHidePrompt: false
          })
        }
        else{
          this.setData({
            isselectMoney: 8,
            topUp: Number(this.data.inputMoney),
            returnMoney: Number(this.data.inputMoney) / 10,
            isHidePrompt: true
          })
        }
        
        return
      }
      this.setData({
        isselectMoney: 8,
        topUp: 0,
        returnMoney:0,
        isHidePrompt: false
      })
    }
    
  },

  changeSwitch:function(e){
    // return
    if (!app.globalData.poiBasicData.balancePwdSet) {
      this.setData({
        ischecked:this.data.ischecked
      })
      wx.navigateTo({
        url: '../changePassword/changePassword?type=next&all=false&other=',
      })
      return
    }
    console.log(e.detail.value)
    this.setData({
      isshowAlert: e.detail.value
    })
    if(e.detail.value == false){
      wx.navigateTo({
        url: '../closeFreeAuth/closeFreeAuth',
      })
      /*
      app.postData('/setting/poi/balance/pwd/required',{"accessToken":app.globalData.accessToken,"flag":0}).then(res=>{
        if(res.data.code == 200){
          this.setData({
            ischecked:false
          })
          app.showToast('已取消余额免密支付')
          app.globalData.poiBasicData.balancePwdFree = 0
        }
        else{
          this.setData({
            ischecked:true
          })
        }
      })
      */
    }
  },
  
  closeAlert:function(){
    this.setData({
      isshowAlert:false,
      ischecked:false
    })
  },

  know:function(){
    this.setData({
      isshowAlert: false,
      ischecked:true
    })
    app.postData('/setting/poi/balance/pwd/required', { "accessToken": app.globalData.accessToken, "flag": 1 }).then(res => {
      if (res.data.code == 200) {
        app.showToast('已开通余额免密支付')
        app.globalData.poiBasicData.balancePwdFree = 1
      }
    })
  },

  goAgreement:function(){
    wx.navigateTo({
      url: '../agreement/agreement',
    })
  },

  changePassword:function(){
    if (!app.globalData.poiBasicData.balancePwdSet) {
      wx.navigateTo({
        url: '../changePassword/changePassword?type=next&all=false&other=',
      })
    }
    else{
      wx.navigateTo({
        url: '../changePassword/changePassword?all=true&other=',
      })
    }
    
  },

  inputMoney:function(e){
    console.log(e.detail.value)
    if(Number(e.detail.value)<100){
      this.setData({
        inputMoney: e.detail.value,
        topUp: Number(e.detail.value),
        returnMoney: 0,
        isHidePrompt:false
      })
    }
    else{
      this.setData({
        inputMoney: e.detail.value,
        topUp: Number(e.detail.value),
        returnMoney: Number(e.detail.value) / 10,
        isHidePrompt: true
      })
    }
    
  },

  Blur:function(e){
    console.log(e)
    if(Number(e.detail.value)==0){
      this.setData({
        inputMoney:""
      })
    }
  },

  next:function(){
    if (!this.data.password_val) {
      app.showToast('余额密码不能为空')
      return
    }
    else if (this.data.password_val.length < 6) {
      app.showToast('余额密码不得少于6位')
      return
    }
    if(this.data.type == 'again'){
      if(this.data.before_pws == this.data.password_val){
        app.postData('/setting/poi/balance/pwd/set', { "accessToken": app.globalData.accessToken, "pwd": this.data.password_val }).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            app.globalData.poiBasicData.balancePwdSet = true   
            app.openFree().then(res => {
              if(res == 200){
                app.globalData.poiBasicData.balancePwdFree = 1
                app.showToast('设置成功')
                setTimeout(() => {
                  this.setData({
                    title: "设置余额密码",
                    alt: "请设置余额支付密码，用于支付验证",
                    before_pws: "",
                    password_val: "",
                    type: "",
                    isSetPws: false,
                    isFocus: false
                  })
                }, 1500)
              }
            })
          }
        })
      }
      else{
        app.showToast('两次密码不一致，请重新输入')
        setTimeout(()=>{
          this.setData({
            title: "设置余额密码",
            alt: "请设置余额支付密码，用于支付验证",
            before_pws: "",
            password_val: "",
            type: "",     
          })
        },1500)
      }
    }
    else{
      this.setData({
        title: "设置余额密码",
        alt: "请再次填写以确认",
        before_pws: this.data.password_val,
        password_val: "",
        type: "again"
      })
    }
    
  },

  drmp:function(){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要跳过设置余额支付密码吗？',
      success(res) {
        if (res.confirm) {
          that.setData({
            title: "设置余额密码",
            alt: "请设置余额支付密码，用于支付验证",
            before_pws: "",
            password_val: "",
            type: "",
            isSetPws: false,
            isFocus: false
          })
          wx.setStorage({
            key: 'drmp',
            data: true,
          })
        } 
        else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
    
  },

  topUp:function(){
    const value = wx.getStorageSync('drmp')
    if (!app.globalData.poiBasicData.balancePwdSet){
      if(value == true || value == "true"){

      }
      else{
        this.setData({
          isSetPws: true,
          isFocus: true
        })
        return
      }
    }
    if(this.data.topUp<=0){
      app.showToast('充值金额不能少于0元')
    }
    else{
      wx.showLoading({
        title: '',
        mask: true
      })
      // var postData = { "accessToken": app.globalData.accessToken,"amount":this.data.topUp*100}
      var postData = { "accessToken": app.globalData.accessToken, "amount": 1 }
      app.postData('/balance/recharge/in', postData).then(res=>{
        if(res.data.code==200){
          wx.hideLoading()
          app.pay(res.data.data).then(res=>{
            console.log(res)
            app.getData('/setting/poi/basic/get?accessToken='+app.globalData.accessToken).then(res=>{
              if(res.data.code==200){
                app.globalData.poiBasicData = res.data.data
                this.setData({
                  curBalance: ((Number(res.data.data.curBalance)+Number(res.data.data.curRedBalance)) / 100).toFixed(2) || "0.00"
                })
              } 
            })
          })
        }
      })
    }
  },

  gobalanceRecord:function(){
    wx.navigateTo({
      url: '../balanceRecord/balanceRecord',
    })
  },



  inputPassword: function (e) {
    console.log(e)
    this.setData({
      password_val: e.detail.value
    })
  },

  gofocus: function () {
    
    this.setData({
      isFocus: true
    })
    console.log(this.data.isFocus)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.openFree().then(res=>{
      console.log(res)
    })
    console.log()
    wx.hideShareMenu()
    this.setData({
      topUp:Number(this.data.top_up_moneys[this.data.isselectMoney]),
      returnMoney: Number(this.data.top_up_moneys[this.data.isselectMoney])/10
    })
    console.log(this.data.topUp)
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
    // app.globalData.poiBasicData.curBalance=500
    if (app.globalData.poiBasicData){
      var ischecked = false
      if (app.globalData.poiBasicData.balancePwdFree == 0){
        ischecked = false
      }
      else{
        ischecked = true
      }
      this.setData({
        curBalance: ((Number(app.globalData.poiBasicData.curBalance) + Number(app.globalData.poiBasicData.curRedBalance)) / 100).toFixed(2) || "0.00",
        ischecked: ischecked
      })
    }
    else {
      
    }
    
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


  stop:function(){

  }
})