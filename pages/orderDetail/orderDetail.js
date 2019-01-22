const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "订单详情",
    order_msgs:{
      "order_status":"已付款",
      "order_alt":"您的订单申请已提交成功",
      "order_btn":"继续下单",
      "order_list":[
        { "img": "http://pk1897l3c.bkt.clouddn.com/member/liberty_two_icon.png", "name":"清爽一夏主题banner","num":"1","money":"29.00"},
        { "img": "http://pk1897l3c.bkt.clouddn.com/member/liberty_two_icon.png", "name": "清爽一夏主题banner", "num": "1", "money": "29.00" }
      ],
      "business_detail": { "businesser_name": "狗小姐", 'businesser_phone': "12345678912", "business_name": "狗小姐（望京商业街中心店）", "business_address":"北京市朝阳区望京商业中心f座"}
    },
    service_score:[false,false,false,false,false],
    ability_score: [false, false, false, false, false],
    speed_score: [false, false, false, false, false],
    textArea:"",
    isMember:false,
    nickName:"",
    mobile:"",
    brandName: "",
    address:""
  },

  inputTextArea:function(e){
    this.setData({
      textArea:e.detail.value
    })
  },

  mark:function(e){
    // console.log(this.data.orderServiceData.commentStatus)
    if (this.data.orderServiceData.commentStatus==1){
      app.showToast('您已完成评价')
      return
    }
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let score_arr = [false,false,false,false,false]
    for(let i=0;i<index+1;i++){
      score_arr[i]=true
    }
    switch(Number(id)){
      case 0:
        this.setData({
          service_score: score_arr
        })
        break;
      case 1:
        this.setData({
          ability_score: score_arr
        })
        break;
      case 2:
        this.setData({
          speed_score: score_arr
        })
        break;
    }
  },

  goRefund:function(){
    wx.navigateTo({
      url: '../refund/refund?orderId='+this.data.orderId,
    })
  },

  continueOrpay:function(){
    if (this.data.payStatus==2){
      wx.switchTab({
        url: '../index/index',
      })
    }
    else{
      wx.navigateTo({
        url: '../pay/pay',
      })
    }
  },


  submit:function(){
    if (this.data.service_score.indexOf(true)<=-1){
      app.showToast('综合服务打分不能为空')
    }
    else if (this.data.ability_score.indexOf(true)<=-1){
      app.showToast('专业能力打分不能为空')
    }
    else if (this.data.speed_score.indexOf(true) <= -1){
      app.showToast('相应速度打分不能为空')
    }
    else if(this.data.textArea==''){
      app.showToast('评价内容不能为空')
    }
    else{
      console.log(this.arrCheck(this.data.service_score))
      var postData = { "accessToken": app.globalData.accessToken, "orderId": this.data.orderId, "scoreService": this.arrCheck(this.data.service_score), "scoreProfess": this.arrCheck(this.data.ability_score), "scoreResponse": this.arrCheck(this.data.speed_score),"commentText":this.data.textArea}
      
      app.postData('/order/comment/submit',postData).then((res)=>{
        console.log(res)
        if(res.data.code==200){
          app.showToast('评价成功')
          setTimeout(function(){
            wx.redirectTo({
              url: '../order/order',
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
    console.log(options)
    var postData = { "accessToken": app.globalData.accessToken, "orderId":options.orderId }
    app.postData('/order/detail', postData).then((res)=>{
      console.log(res)
      // res.data.code=200
      if(res.data.code==404){
        app.showToast('请求的订单不存在')
        setTimeout(function(){
          wx.navigateBack({

          })
        },1500)
        
      }
      else if(res.data.code==200){
        var data = res.data.data
        // data.payStatus=2 
        // data.serviceStatus=2
        // data.orderServiceData.commentStatus =1

        
        if (data.orderServiceData){
          if (data.orderServiceData.commentStatus == 1) {

            var score = [false, false, false, false, false]
            for (let i = 0; i < data.orderServiceData.scoreService; i++) {
              score[i] = true
            }
            this.setData({
              service_score: score
            })
            score = [false, false, false, false, false]

            for (let i = 0; i < data.orderServiceData.scoreProfess; i++) {
              score[i] = true
            }
            this.setData({
              ability_score: score
            })
            score = [false, false, false, false, false]

            for (let i = 0; i < data.orderServiceData.scoreResponse; i++) {
              score[i] = true
            }
            this.setData({
              speed_score: score
            })
            this.setData({
              textArea: data.orderServiceData.commentText || ""
            })
            // console.log(this.data.textArea)
          }
        }

        for (let i = 0; i < data.itemList.length; i++) {
          data.itemList[i].unitPrice = (Number(data.itemList[i].unitPrice) / 100).toFixed(2)
        }
        if (Number(data.couponPaid) == 0) {

        }
        else {
          data.couponPaid = (Number(data.couponPaid) / 100).toFixed(2)
        }
        if (Number(data.balancePaid) == 0) {

        }
        else {
          data.balancePaid = (Number(data.balancePaid) / 100).toFixed(2)
        }
        if (Number(data.wechatPaid) == 0) {

        }
        else {
          data.wechatPaid = (Number(data.wechatPaid) / 100).toFixed(2)
        }
        data.nickName=app.globalData.nickName
        data.mobile=app.globalData.mobile
        data.brandName=app.globalData.poiBasicData.brandName
        data.address=app.globalData.poiBasicData.address
        this.setData(data)
        console.log(app.globalData)
      }
      
      app.postData('/member/my/get',{"accessToken":app.globalData.accessToken}).then(res=>{
        if(res.data.code==200){
          this.setData({
            isMember:res.data.data.isMember
          })
        }
      })

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

  },

  arrCheck:function (arr){
    var count=0
    for(var i = 0; i<arr.length;i++){
      if(arr[i]==true){
        count++
      }
    }
    return count;
  }


})