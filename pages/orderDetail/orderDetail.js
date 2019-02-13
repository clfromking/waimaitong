const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "订单详情",
    order_msgs:{},
    service_score:[false,false,false,false,false],
    ability_score: [false, false, false, false, false],
    speed_score: [false, false, false, false, false],
    textArea:"",
    isMember:false,
    nickName:"",
    mobile:"",
    brandName: "",
    address:"",
    totalScore:[0,0,0,0,0]
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
    app.showToast('暂不支持退单')
    return
    wx.navigateTo({
      url: '../refund/refund?orderId='+this.data.orderId,
    })
  },

  continueOrpay:function(){
    // console.log(this.data)
    // return
    if (this.data.payStatus==2){
      wx.switchTab({
        url: '../index/index',
      })
    }
    else{
      var discount = this.data.total - this.data.payment
      // console.log(this.data.total)
      // console.log(discount)
      // console.log(this.data.payment)
      // return
      wx.navigateTo({
        url: '../pay/pay?pay=' + this.data.payment + "&total=" + this.data.total + "&discount=" + discount + '&orderId=' + this.data.orderId + "&type=order",
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
            wx.switchTab({
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
    wx.hideShareMenu()
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
        data.orderServiceData={
          totalScore:0
        }
        data.orderServiceData.totalScore = 4.5
        if (data.orderServiceData){
          
          if (parseInt(data.orderServiceData.totalScore) == data.orderServiceData.totalScore){
            var totalScore = this.data.totalScore
            for (let i = 0; i < data.orderServiceData.totalScore; i++){
              totalScore[i]=1
            }
            this.setData({
              totalScore
            })
          }
          else{
            var totalScore = this.data.totalScore
            for (let i = 0; i < parseInt(data.orderServiceData.totalScore); i++) {
              totalScore[i] = 1
            }
            totalScore[parseInt(data.orderServiceData.totalScore)] = 0.5
            this.setData({
              totalScore
            })
          }

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
        console.log(this.data.totalScore)

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