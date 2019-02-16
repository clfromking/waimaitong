// pages/storeDecorate/storeDecorate.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "店铺装修",
    decorate_options:[],
    append_list:[],
    isMember:0,
    isShowShade:false,
    totalPrice:"0.00",
    totalMemberPrice:"0.00",
    discounts:"0.00"
  },

  //删除项
  deleteItem:function(e){
    let append_list = this.data.append_list
    let decorate_options = this.data.decorate_options
    
    console.log(decorate_options)
    for (let i = 0; i < decorate_options.length; i++) {
      if (append_list[e.currentTarget.dataset.id].id == decorate_options[i].id) {
        decorate_options[i].isappend=false
        decorate_options[i].append_num=0
        break
      }
    }
    append_list.splice(e.currentTarget.dataset.id, 1)
    this.setData({
      decorate_options,
    })
    
    this.setData({
      append_list,
    })
    if (append_list.length == 0) {
      this.setData({
        isShowShade: false
      })
    }
    this.countPrice()
  },

  delectAll:function(){
    let decorate_options = this.data.decorate_options
    let append_list = this.data.append_list
    for (let i = 0; i < decorate_options.length; i++){
      decorate_options[i].isappend = false
      decorate_options[i].append_num = 0
    }
    append_list = []
    this.setData({
      append_list,
      decorate_options,
      isShowShade: false
    })
    this.countPrice()
  },

  //添加项
  appendItem:function(e){
    let append_list=this.data.append_list
    let decorate_options=this.data.decorate_options
    if (decorate_options[e.currentTarget.dataset.id].isappend){
      return
    }
    decorate_options[e.currentTarget.dataset.id].isappend=true
    decorate_options[e.currentTarget.dataset.id].append_num = decorate_options[e.currentTarget.dataset.id].append_num + 1
    append_list.push(decorate_options[e.currentTarget.dataset.id])
    this.setData({
      append_list,
      decorate_options
    })
    console.log(this.data.append_list)
    this.countPrice()
  },

  //一键添加
  append:function(){
    if(this.data.append_list.length==0){
      let decorate_options = this.data.decorate_options
      let append_list = this.data.append_list
      for(let i=0;i<decorate_options.length;i++){
        decorate_options[i].isappend=true
        decorate_options[i].append_num = decorate_options[i].append_num + 1
        append_list.push(decorate_options[i])
      }
      this.setData({
        append_list,
        decorate_options
      })
    }
    else{
      this.setData({
        isShowShade: true
      })
    }
    this.countPrice()
  },

  inputNum:function(e){
    
    let decorate_options = this.data.decorate_options
    let append_list = this.data.append_list
    if (e.detail.value <= 0) {
      if(e.currentTarget.dataset.type=="normal"){
        decorate_options[e.currentTarget.dataset.id].append_num = 1
        for (let i = 0; i < append_list.length; i++) {
          if (decorate_options[e.currentTarget.dataset.id].id == append_list[i].id) {
            append_list[i].append_num = 1
            break
          }
        }
      }
      else{
        append_list[e.currentTarget.dataset.id].append_num = 1
        for (let i = 0; i < decorate_options.length; i++) {
          if (append_list[e.currentTarget.dataset.id].id == decorate_options[i].id) {
            decorate_options[i].append_num = 1
            break
          }
        }
      }
      
    }
    else{
      if(e.currentTarget.dataset.type=="normal"){
        console.log(e)
        decorate_options[e.currentTarget.dataset.id].append_num = e.detail.value
        for (let i = 0; i < append_list.length; i++) {
          if (decorate_options[e.currentTarget.dataset.id].id == append_list[i].id) {
            append_list[i].append_num = e.detail.value
            break
          }
        }
      }
      else{
        append_list[e.currentTarget.dataset.id].append_num = e.detail.value
        for (let i = 0; i < decorate_options.length; i++) {
          if (append_list[e.currentTarget.dataset.id].id == decorate_options[i].id) {
            decorate_options[i].append_num = e.detail.value
            break
          }
        }
      }
      
    }
    
    this.setData({
      decorate_options,
      append_list
    })
    this.countPrice()
  },

  sub:function(e){
    // console.log(e.currentTarget.dataset.id)
    let decorate_options=this.data.decorate_options
    let append_list=this.data.append_list
    decorate_options[e.currentTarget.dataset.id].append_num = Number(decorate_options[e.currentTarget.dataset.id].append_num) - 1
    if (decorate_options[e.currentTarget.dataset.id].append_num==0){
      decorate_options[e.currentTarget.dataset.id].isappend=false
      for (let i = 0; i < append_list.length; i++) {
        if (decorate_options[e.currentTarget.dataset.id].id == append_list[i].id) {
          append_list.splice(i, 1)
          break
        }
      }
      
    }
    else{
      for (let i = 0; i < append_list.length; i++) {
        if (decorate_options[e.currentTarget.dataset.id].id == append_list[i].id) {
          append_list[i].append_num = decorate_options[e.currentTarget.dataset.id].append_num
          break
        }
      }
    }  
    this.setData({
      decorate_options,
      append_list
    })
    this.countPrice()
  },

  add:function(e){
    let decorate_options = this.data.decorate_options
    let append_list = this.data.append_list
    decorate_options[e.currentTarget.dataset.id].append_num = Number(decorate_options[e.currentTarget.dataset.id].append_num) + 1
    for (let i = 0; i < append_list.length; i++) {
      if (decorate_options[e.currentTarget.dataset.id].id == append_list[i].id) {
        append_list[i].append_num = decorate_options[e.currentTarget.dataset.id].append_num
        break
      }
    }
    this.setData({
      decorate_options,
      append_list
    })
    
    this.countPrice()
  },

  subSelect: function (e) {
    let decorate_options = this.data.decorate_options
    let append_list = this.data.append_list
    append_list[e.currentTarget.dataset.id].append_num = Number(append_list[e.currentTarget.dataset.id].append_num) - 1
    if (append_list[e.currentTarget.dataset.id].append_num == 0) {   
      for (let i = 0; i < decorate_options.length; i++) {
        console.log(append_list[e.currentTarget.dataset.id].id)
        console.log(decorate_options[i].id)
        if (append_list[e.currentTarget.dataset.id].id == decorate_options[i].id) {
          decorate_options[i].isappend = false
          decorate_options[i].append_num = 0 
          break
        }
      }
      append_list.splice(e.currentTarget.dataset.id, 1) 

    }
    else {
      for (let i = 0; i < decorate_options.length; i++) {
        if (append_list[e.currentTarget.dataset.id].id == decorate_options[i].id) {
          decorate_options[i].append_num = append_list[e.currentTarget.dataset.id].append_num
          break
        }
      }
    }
    this.setData({
      decorate_options,
      append_list
    })

    if(append_list.length==0){
      this.setData({
        isShowShade: false
      })
    }
    this.countPrice()
  },

  addSelect:function(e){
    let decorate_options = this.data.decorate_options
    let append_list = this.data.append_list
    append_list[e.currentTarget.dataset.id].append_num = Number(append_list[e.currentTarget.dataset.id].append_num) + 1
    for (let i = 0; i < decorate_options.length; i++) {
      if (append_list[e.currentTarget.dataset.id].id == decorate_options[i].id) {
        decorate_options[i].append_num = append_list[e.currentTarget.dataset.id].append_num
        break
      }
    }
    this.setData({
      decorate_options,
      append_list
    })
    this.countPrice()
  },

  closeShade:function(){
    this.setData({
      isShowShade:false
    })
  },

  submitOrder:function(){
    // console.log(this.data.append_list.length)
    if (!this.data.append_list.length){
      app.showToast('请先添加服务')
      return
    }
    // console.log(this.data.append_list)
    var orderItemList = []
    for(var i=0;i<this.data.append_list.length;i++){
      orderItemList.push({ "goodsId": this.data.append_list[i].id,"num":this.data.append_list[i].append_num})
    }
    console.log(orderItemList)
    // var postData = { "accessToken": app.globalData.accessToken, "goodsType": 2, "orderItemList": orderItemList}
    var postData = {"goodsType": 2, "orderItemList": orderItemList }
    console.log(postData)
    app.postData('/order/submit?accessToken=' + app.globalData.accessToken, postData, "application/json; charset=utf-8").then((res)=>{
      console.log(res)
      if(res.data.code==200){
        var discount = res.data.data.totalCost - res.data.data.totalPayment
        wx.redirectTo({
          url: '../pay/pay?pay=' + res.data.data.totalPayment + "&total=" + res.data.data.totalCost + "&discount=" + discount + '&orderId=' + res.data.data.orderId + "&type=order",
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.postData('/member/my/get',{"accessToken":app.globalData.accessToken}).then(res=>{
      console.log(res)
      if(res.data.code==200){
        this.setData({
          isMember:res.data.data.isMember
        })
      }
    })
    // this.setData({
    //   isMember:app.globalData.isMember
    // })
    app.getData('/decoration/material/list?accessToken=' + app.globalData.accessToken).then((res)=>{
      var data=res.data.data
      // var data=""
      // data = [{ "id": 1, "name": "LOGO设计", "price": 69900, "memberPrice": 5900, "createTime": "2019-01-04 09:55:07", "coverImg": "https://pic.ibaotu.com/00/17/37/76r888piCqYe.jpg-0.jpg", "showSeq": 1 }, { "id": 2, "name": "海报设计", "price": 69900, "memberPrice": 5900, "createTime": "2019-01-04 09:56:07", "coverImg": "https://pic.ibaotu.com/00/17/37/76r888piCqYe.jpg-0.jpg", "showSeq": 2 }, { "id": 3, "name": "招牌设计", "price": 69900, "memberPrice": 5900, "createTime": "2019-01-04 09:56:26", "coverImg": "https://pic.ibaotu.com/00/17/37/76r888piCqYe.jpg-0.jpg", "showSeq": 3 }, { "id": 4, "name": "菜单设置", "price": 69900, "memberPrice": 5900, "createTime": "2019-01-04 09:56:44", "coverImg": "https://pic.ibaotu.com/00/17/37/76r888piCqYe.jpg-0.jpg", "showSeq": 4 }, { "id": 5, "name": "爆品梳理", "price": 69900, "memberPrice": 5900, "createTime": "2019-01-04 09:57:07", "coverImg": "https://pic.ibaotu.com/00/17/37/76r888piCqYe.jpg-0.jpg", "showSeq": 5 }, { "id": 6, "name": "成本挨近", "price": 69900, "memberPrice": 5900, "createTime": "2019-01-04 09:57:25", "coverImg": "https://pic.ibaotu.com/00/17/37/76r888piCqYe.jpg-0.jpg", "showSeq": 6 }, { "id": 7, "name": "主推菜品", "price": 69900, "memberPrice": 5900, "createTime": "2019-01-04 09:57:44", "coverImg": "https://pic.ibaotu.com/00/17/37/76r888piCqYe.jpg-0.jpg", "showSeq": 7 }, { "id": 8, "name": "活动设置", "price": 69900, "memberPrice": 5900, "createTime": "2019-01-04 09:58:06", "coverImg": "https://pic.ibaotu.com/00/17/37/76r888piCqYe.jpg-0.jpg", "showSeq": 8 }]
      for(let i=0;i<data.length;i++){
        data[i].memberPrice=(Number(data[i].memberPrice)/100).toFixed(2)
        data[i].price = (Number(data[i].price) / 100).toFixed(2)
        data[i].isappend=false
        data[i].append_num=0
        data[i].ismore=false
      }
      // data[1].ismore=true
      // data[4].ismore=true
      this.setData({
        decorate_options:data
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
    return app.allShare('storeDecorate')
  },

  //计算价钱
  countPrice:function(){
    let decorate_options = this.data.decorate_options
    let append_list = this.data.append_list
    let totalPrice = 0*100
    let totalMemberPrice = 0*100
    
    let discounts = this.data.discounts
    for(let i=0;i<append_list.length;i++){
      totalPrice = totalPrice + Number(append_list[i].append_num) * Number(append_list[i].price)*100
      totalMemberPrice = totalMemberPrice + Number(append_list[i].append_num) * Number(append_list[i].memberPrice) * 100
      
    }
    discounts = ((totalPrice - totalMemberPrice)/100).toFixed(2)
    totalPrice = (totalPrice/100).toFixed(2)
    totalMemberPrice = (totalMemberPrice / 100).toFixed(2)
    this.setData({
      discounts,
      totalPrice,
      totalMemberPrice
    })
  },

})