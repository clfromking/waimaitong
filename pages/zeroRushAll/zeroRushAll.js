// pages/zeroRushAll/zeroRushAll.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "0元抢服务",
    decorate_options: [],
    append_list: [],
    isMember: 0,
    isShowShade: false,
    header_navs: [],
    isbefore:false,
    isafter:false,
    isnow:true,
    isSelect:0,
    price:"0.00",
    totalMemberPrice: "0.00",
    placeOrder:false,
    chance:20
  },

  selectTime:function(e){
    if(this.data.header_navs[e.currentTarget.dataset.index].status=="开抢结束"){
      this.setData({
        isbefore: true,
        isafter: false,
        isnow: false,
      })
    }
    else if (this.data.header_navs[e.currentTarget.dataset.index].status =="即将开始"){
      this.setData({
        isbefore: false,
        isafter: true,
        isnow: false,
      })
    }
    else if (this.data.header_navs[e.currentTarget.dataset.index].status == "已开抢"){
      this.setData({
        isbefore: false,
        isafter: false,
        isnow: true,
      })
    }
    this.closeShade()
    this.setData({
      isSelect:e.currentTarget.dataset.index,
      decorate_options:this.data.header_navs[e.currentTarget.dataset.index].goodsList
    })
  },

  //删除项
  deleteItem: function (e) {
    let append_list = this.data.append_list
    let decorate_options = this.data.decorate_options

    console.log(decorate_options)
    for (let i = 0; i < decorate_options.length; i++) {
      if (append_list[e.currentTarget.dataset.id].goodsId == decorate_options[i].goodsId) {
        decorate_options[i].isappend = false
        decorate_options[i].append_num = 0
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

  //添加项
  appendItem: function (e) {
    return
    let append_list = this.data.append_list
    let decorate_options = this.data.decorate_options
    if (decorate_options[e.currentTarget.dataset.id].isappend) {
      return
    }
    decorate_options[e.currentTarget.dataset.id].isappend = true
    decorate_options[e.currentTarget.dataset.id].append_num = decorate_options[e.currentTarget.dataset.id].append_num + 1
    append_list.push(decorate_options[e.currentTarget.dataset.id])
    this.setData({
      append_list,
      decorate_options
    })
    this.countPrice()
  },

  //一键添加
  append: function () {
    // console.log()
    if (this.data.header_navs[this.data.isSelect].status == "开抢结束" && this.data.append_list.length<=0){
      app.showToast('开抢已结束')
      return
    }
    // else if (this.data.header_navs[this.data.isSelect].status == "即将开始" && this.data.append_list.length <= 0){
    //   app.showToast('即将开始，请稍侯')
    //   return
    // }
    else if (this.data.header_navs[this.data.isSelect].status == "开抢结束" && this.data.append_list.length > 0){
      app.showToast('所选时间不正确')
      return
    }
    else if (this.data.header_navs[this.data.isSelect].status == "即将开始" && this.data.append_list.length > 0){
      app.showToast('所选时间不正确')
      return
    }
    if (this.data.append_list.length == 0) {
      var date = new Date()
      var selectTime = date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate()+' '+this.data.header_navs[this.data.isSelect].timeFrames+":00"
     
      selectTime = new Date(selectTime).getTime()
      var nowTime = new Date().getTime()
      var differ = (selectTime - nowTime)/1000/60
      // console.log(differ)
      // console.log(this.data.header_navs)
      //算时间差  5分钟之内才能添加
      if (differ <= 5 && differ >= this.data.header_navs[this.data.isSelect].timeArea){
        let decorate_options = this.data.decorate_options
        let append_list = this.data.append_list
        for (let i = 0; i < decorate_options.length; i++) {
          if (decorate_options[i].soldNum == decorate_options[i].stockNum) {
            app.showToast('商品已售罄，请等待下一个时间进行抢购')
            return
          }
          decorate_options[i].isappend = true
          decorate_options[i].append_num = decorate_options[i].append_num + 1
          append_list.push(decorate_options[i])
        }
        this.setData({
          append_list,
          decorate_options
        })
      }
      else if (differ < this.data.header_navs[this.data.isSelect].timeArea){
        app.showToast('商品已售罄，请等待下一个时间进行抢购')
        setTimeout(()=>{
          this.newLoadList()
        },1500)
        
      }
      else{
        //
        // let decorate_options = this.data.decorate_options
        // let append_list = this.data.append_list
        // for (let i = 0; i < decorate_options.length; i++) {
        //   if (decorate_options[i].soldNum == decorate_options[i].stockNum) {
        //     app.showToast('商品已售罄，请等待下一个时间进行抢购')
        //     return
        //   }
        //   decorate_options[i].isappend = true
        //   decorate_options[i].append_num = decorate_options[i].append_num + 1
        //   append_list.push(decorate_options[i])
        // }
        // this.setData({
        //   append_list,
        //   decorate_options
        // })
        //
        app.showToast('开抢前5分钟才可添加')
      }

      // return

      
    }
    else {
      this.setData({
        isShowShade: true
      })
    }
    this.countPrice()
  },

  cancelSnap:function(){
    let decorate_options = this.data.decorate_options
    for(let i=0;i<decorate_options.length;i++){
      decorate_options[i].isappend = false
      decorate_options[i].append_num = 0
    }
    this.setData({
      append_list:[],
      isShowShade:false,
      placeOrder:false,
      decorate_options
    })
  },

  closeShade: function () {
    this.setData({
      isShowShade: false,
      placeOrder:false
    })
  },

  submitOrder: function () {
    
    if (!this.data.append_list.length) {
      app.showToast('请先添加服务')
      return
    }

    if (this.data.header_navs[this.data.isSelect].status == "已开抢") {
      // var date = new Date()
      // var nowDate = ""
      // if (date.getMinutes().toString().length == 1) {
      //   nowDate = date.getHours().toString() + "0" + date.getMinutes().toString()

      // }
      // else {
      //   nowDate = date.getHours().toString() + date.getMinutes().toString()
      // }
      // if (Number(nowDate) !== Number(selectedTime)) {
      //   app.showToast('时间已过')
      //   setTimeout(()=>{
      //     this.loadList()
      //     let decorate_options = this.data.decorate_options
      //     for (let i = 0; i < decorate_options.length; i++) {
      //       decorate_options[i].isappend = false
      //       decorate_options[i].append_num = 0
      //     }
      //     this.setData({
      //       append_list:[],
      //       decorate_options
      //     })
      //     this.countPrice()
      //   },1500)
        
      //   return
      // }
    }
    else if (this.data.header_navs[this.data.isSelect].status == "开抢结束"){
      app.showToast('所选时间不正确')
      return
    }
    else if (this.data.header_navs[this.data.isSelect].status == "即将开始") {
      app.showToast('时间未到，请稍等')
      return
    }

    var orderItemList = []
    for (var i = 0; i < this.data.append_list.length; i++) {
      orderItemList.push({ "goodsId": this.data.append_list[i].goodsId, "num": Number(this.data.append_list[i].append_num),"snapSeq":this.data.append_list[i].snapSeq}) 
    }
    // this.setData({
    //   isShowShade: true,
    //   placeOrder: true
    // })
    // var interVal = setInterval(() => {
    //   // console.log(1)
    //   if (this.addChance()) {
    //     clearInterval(interVal)
    //   }
    // }, 500)

    //提交订单
    var postData = { "goodsType": 3, "orderItemList": orderItemList ,"cateId":this.data.optionsId}
    app.postData('/order/snap/submit?accessToken=' + app.globalData.accessToken, postData, "application/json; charset=utf-8").then((res) => {
      // console.log(res)
      if(res.data.code == 200){ 
        var discount = res.data.data.totalCost - res.data.data.totalPayment
        wx.redirectTo({
          url: '../pay/pay?pay=' + res.data.data.totalPayment + "&total=" + res.data.data.totalCost + "&discount=" + discount + '&orderId=' + res.data.data.orderId + "&type=order",
        })
      }
      else if(res.data.code == 404){
        app.showToast(res.data.msg)
        //以下默认为已卖没的情况
        setTimeout(()=>{
          wx.showModal({
            title: '提示',
            content: '抢购的商品已售罄，是否需要原价购买',
            cancelText:"不需要",
            confirmText:"需要",
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                //原价下单，直接走订单
                var orderItemList = []
                for (var i = 0; i < this.data.append_list.length; i++) {
                  orderItemList.push({ "goodsId": this.data.append_list[i].goodsId, "num": Number(this.data.append_list[i].append_num)})         
                }
                var postData = { "goodsType": 2, "orderItemList": orderItemList }
                app.postData('/order/submit?accessToken='+app.globalData.accessToken,postData).then(res=>{
                  //下单成功，去支付
                  if(res.data.code==200){
                    var discount = res.data.data.totalCost - res.data.data.totalPayment
                    wx.redirectTo({
                      url: '../pay/pay?pay=' + res.data.data.totalPayment + "&total=" + res.data.data.totalCost + "&discount=" + discount + '&orderId=' + res.data.data.orderId + "&type=order",
                    })
                  }
                  //不成
                  else {
                    app.showToast('原价下单失败')
                    this.newLoadList()
                  }
                })
              } 
              else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        },1500)
      }
      // if (res.data.code == 200) {
      //   wx.redirectTo({
      //     url: '../pay/pay',
      //   })
      // }
    })
    //结束

  },

  inputNum: function (e) {

    let decorate_options = this.data.decorate_options
    let append_list = this.data.append_list
    if (e.detail.value <= 0) {
      if (e.currentTarget.dataset.type == "normal") {
        decorate_options[e.currentTarget.dataset.id].append_num = 1
        for (let i = 0; i < append_list.length; i++) {
          if (decorate_options[e.currentTarget.dataset.id].goodsId == append_list[i].goodsId) {
            append_list[i].append_num = 1
            break
          }
        }
      }
      else {
        append_list[e.currentTarget.dataset.id].append_num = 1
        for (let i = 0; i < decorate_options.length; i++) {
          if (append_list[e.currentTarget.dataset.id].goodsId == decorate_options[i].goodsId) {
            decorate_options[i].append_num = 1
            break
          }
        }
      }

    }
    else {
      if (e.currentTarget.dataset.type == "normal") {
        console.log(e)
        if (e.detail.value > decorate_options[e.currentTarget.dataset.id].snapNumEnable){
          app.showToast('已超出最大抢购数量')
          decorate_options[e.currentTarget.dataset.id].append_num = decorate_options[e.currentTarget.dataset.id].snapNumEnable
          for (let i = 0; i < append_list.length; i++) {
            if (decorate_options[e.currentTarget.dataset.id].goodsId == append_list[i].goodsId) {
              append_list[i].append_num = decorate_options[e.currentTarget.dataset.id].snapNumEnable
              break
            }
          }
        }
        else{
          decorate_options[e.currentTarget.dataset.id].append_num = e.detail.value
          for (let i = 0; i < append_list.length; i++) {
            if (decorate_options[e.currentTarget.dataset.id].goodsId == append_list[i].goodsId) {
              append_list[i].append_num = e.detail.value
              break
            }
          }
        }
        
        
      }
      else {
        if (e.detail.value > append_list[e.currentTarget.dataset.id].snapNumEnable) {
          app.showToast('已超出最大抢购数量')
          append_list[e.currentTarget.dataset.id].append_num = append_list[e.currentTarget.dataset.id].snapNumEnable
          for (let i = 0; i < decorate_options.length; i++) {
            if (append_list[e.currentTarget.dataset.id].goodsId == decorate_options[i].goodsId) {
              decorate_options[i].append_num = append_list[e.currentTarget.dataset.id].snapNumEnable
              break
            }
          }
        }
        else {
          append_list[e.currentTarget.dataset.id].append_num = e.detail.value
          for (let i = 0; i < decorate_options.length; i++) {
            if (append_list[e.currentTarget.dataset.id].goodsId == decorate_options[i].goodsId) {
              decorate_options[i].append_num = e.detail.value
              break
            }
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

  sub: function (e) {
    // console.log(e.currentTarget.dataset.id)
    let decorate_options = this.data.decorate_options
    let append_list = this.data.append_list
    decorate_options[e.currentTarget.dataset.id].append_num = Number(decorate_options[e.currentTarget.dataset.id].append_num) - 1
    if (decorate_options[e.currentTarget.dataset.id].append_num == 0) {
      decorate_options[e.currentTarget.dataset.id].isappend = false
      for (let i = 0; i < append_list.length; i++) {
        if (decorate_options[e.currentTarget.dataset.id].goodsId == append_list[i].goodsId) {
          append_list.splice(i, 1)
          break
        }
      }

    }
    else {
      for (let i = 0; i < append_list.length; i++) {
        if (decorate_options[e.currentTarget.dataset.id].goodsId == append_list[i].goodsId) {
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

  add: function (e) {
    let decorate_options = this.data.decorate_options
    let append_list = this.data.append_list
    console.log(decorate_options[e.currentTarget.dataset.id])
    if (decorate_options[e.currentTarget.dataset.id].append_num == decorate_options[e.currentTarget.dataset.id].snapNumEnable){
      app.showToast('已超出最大抢购数量')
      return
    }
    decorate_options[e.currentTarget.dataset.id].append_num = Number(decorate_options[e.currentTarget.dataset.id].append_num) + 1
    for (let i = 0; i < append_list.length; i++) {
      if (decorate_options[e.currentTarget.dataset.id].goodsId == append_list[i].goodsId) {
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
        console.log(append_list[e.currentTarget.dataset.id].goodsId)
        console.log(decorate_options[i].id)
        if (append_list[e.currentTarget.dataset.id].goodsId == decorate_options[i].goodsId) {
          decorate_options[i].isappend = false
          decorate_options[i].append_num = 0
          break
        }
      }
      append_list.splice(e.currentTarget.dataset.id, 1)

    }
    else {
      for (let i = 0; i < decorate_options.length; i++) {
        if (append_list[e.currentTarget.dataset.id].goodsId == decorate_options[i].goodsId) {
          decorate_options[i].append_num = append_list[e.currentTarget.dataset.id].append_num
          break
        }
      }
    }
    this.setData({
      decorate_options,
      append_list
    })

    if (append_list.length == 0) {
      this.setData({
        isShowShade: false
      })
    }
    this.countPrice()
  },

  addSelect: function (e) {
    let decorate_options = this.data.decorate_options
    let append_list = this.data.append_list
    if (append_list[e.currentTarget.dataset.id].append_num == append_list[e.currentTarget.dataset.id].snapNumEnable) {
      app.showToast('已超出最大抢购数量')
      return
    }
    append_list[e.currentTarget.dataset.id].append_num = Number(append_list[e.currentTarget.dataset.id].append_num) + 1
    for (let i = 0; i < decorate_options.length; i++) {
      if (append_list[e.currentTarget.dataset.id].goodsId == decorate_options[i].goodsId) {
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      optionsId:options.id
    })
    this.newLoadList()
    // this.loadList()
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
    wx.showLoading({
      title : '加载中',
      mask : true,
    })
    this.newLoadList()
    
    // console.log(this.data.append_list)
    // console.log(this.data.decorate_options)
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

  loadList:function(){
    app.postData('/member/my/get', { "accessToken": app.globalData.accessToken }).then(res => {
      console.log(res)
      if (res.data.code == 200) {
        this.setData({
          isMember: res.data.data.isMember
        })
      }
    })
    var date = new Date()

    var nowDate = ""
    // console.log(date.getMinutes().toString().length)
    if (date.getMinutes().toString().length == 1) {
      nowDate = date.getHours().toString() + "0" + date.getMinutes().toString()

    }
    else {
      nowDate = date.getHours().toString() + date.getMinutes().toString()
    }
    console.log(nowDate)
    var header_navs = this.data.header_navs
    var isSelect = this.data.isSelect
    var isbefore = this.data.isbefore
    var isafter = this.data.isafter
    var isnow = this.data.isnow
    if (Number(nowDate) < 1000) {
      for (let i = 0; i < header_navs.length; i++) {
        header_navs[i].status = "即将开始"
      }
      isSelect = 0
      isbefore = false
      isafter = true
      isnow = false
    }
    else if (Number(nowDate) > 1000 && Number(nowDate) < 1500) {
      header_navs[0].status = "开抢结束"
      for (let i = 1; i < header_navs.length; i++) {
        header_navs[i].status = "即将开始"
      }
      isSelect = 1
      isbefore = false
      isafter = true
      isnow = false
    }
    else if (Number(nowDate) > 1500 && Number(nowDate) < 2100) {
      header_navs[0].status = "开抢结束"
      header_navs[1].status = "开抢结束"
      header_navs[2].status = "即将开始"
      header_navs[3].status = "即将开始"
      isSelect = 2
      isbefore = false
      isafter = true
      isnow = false
    }
    else if (Number(nowDate) > 2100 && Number(nowDate) < 2300) {
      header_navs[0].status = "开抢结束"
      header_navs[1].status = "开抢结束"
      header_navs[2].status = "开抢结束"
      header_navs[3].status = "即将开始"
      isSelect = 3
      isbefore = false
      isafter = true
      isnow = false
    }
    else if (Number(nowDate) > 2300) {
      for (let i = 0; i < header_navs.length; i++) {
        header_navs[i].status = "开抢结束"
      }
      isSelect = 3
      isbefore = true
      isafter = false
      isnow = false
    }
    else if (Number(nowDate) == 1000) {
      header_navs[0].status = "已开抢"
      header_navs[1].status = "即将开始"
      header_navs[2].status = "即将开始"
      header_navs[3].status = "即将开始"
      isSelect = 0
      isbefore = false
      isafter = false
      isnow = true
    }
    else if (Number(nowDate) == 1500) {
      header_navs[0].status = "开抢结束"
      header_navs[1].status = "已开抢"
      header_navs[2].status = "即将开始"
      header_navs[3].status = "即将开始"
      isSelect = 1
      isbefore = false
      isafter = false
      isnow = true
    }
    else if (Number(nowDate) == 2100) {
      header_navs[0].status = "开抢结束"
      header_navs[1].status = "开抢结束"
      header_navs[2].status = "已开抢"
      header_navs[3].status = "即将开始"
      isSelect = 2
      isbefore = false
      isafter = false
      isnow = true
    }
    else if (Number(nowDate) == 2300) {
      header_navs[0].status = "开抢结束"
      header_navs[1].status = "开抢结束"
      header_navs[2].status = "开抢结束"
      header_navs[3].status = "已开抢"
      isSelect = 3
      isbefore = false
      isafter = false
      isnow = true
    }
    this.setData({
      header_navs,
      isSelect,
      isbefore,
      isafter,
      isnow
    })
    app.getData('/decoration/material/list?accessToken=' + app.globalData.accessToken).then((res) => {
      console.log(res.data.data)
      var data = res.data.data
      for (let i = 0; i < data.length; i++) {
        data[i].memberPrice = (Number(data[i].memberPrice) / 100).toFixed(2)
        data[i].price = (Number(data[i].price) / 100).toFixed(2)
        data[i].isappend = false
        data[i].append_num = 0
        data[i].isfull = false
        data[i].ismore=false
      }
      data[2].ismore=true
      data[2].isfull = true
      this.setData({
        decorate_options: data
      })
    })
  },

  //计算价钱
  countPrice: function () {
    let decorate_options = this.data.decorate_options
    let append_list = this.data.append_list
    let price = 0 * 100
    let totalMemberPrice = 0 * 100
    // console.log(append_list)
    // let discounts = this.data.discounts
    for (let i = 0; i < append_list.length; i++) {
      if(append_list[i].isfull==false){
        price = price + Number(append_list[i].append_num) * Number(append_list[i].disPrice) * 100
        totalMemberPrice = totalMemberPrice + 0 * 100
      }
      else if (append_list[i].isfull == true){
        price = price + Number(append_list[i].append_num) * Number(append_list[i].oriPrice) * 100
        totalMemberPrice = totalMemberPrice + Number(append_list[i].append_num) * Number(append_list[i].memberPrice) * 100
      }
      

    }
    // discounts = ((totalPrice - totalMemberPrice) / 100).toFixed(2)
    price = (price / 100).toFixed(2)
    totalMemberPrice = (totalMemberPrice / 100).toFixed(2)
    this.setData({
      // discounts,
      price,
      totalMemberPrice
    })
  },
  
  addChance:function(){
    var chance=this.data.chance
    if(chance<100){
      chance+=6
      if(chance>100){
        chance=100 
        console.log(chance)
        this.setData({
          chance
        })
        return true
      }
      else{
        this.setData({
          chance
        })
        return false
      }
    }
    else{
      return true
    }
  },

  newLoadList:function(){
    app.postData('/snap/cate/goodslist', { "snapCateId": this.data.optionsId }).then(res => {
      // console.log(res)
      var decorate_options = this.data.decorate_options
      decorate_options = []
      if (res.data.code == 200) {
        var isSelect = this.data.isSelect
        var data = res.data.data
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].goodsList.length; j++) {
            data[i].goodsList[j].disPrice = (Number(data[i].goodsList[j].disPrice) / 100).toFixed(2)
            data[i].goodsList[j].oriPrice = (Number(data[i].goodsList[j].oriPrice) / 100).toFixed(2)
            data[i].goodsList[j].soldNum = data[i].soldNum
            data[i].goodsList[j].timeFrameStockNum = data[i].timeFrameStockNum
            // console.log(data[i].goodsList[j].soldNum)
            // console.log(data[i].goodsList[j].timeFrameStockNum)
            data[i].goodsList[j].isappend = false
            data[i].goodsList[j].append_num = 0
            if (data[i].goodsList[j].timeFrameStockNum == data[i].goodsList[j].soldNum) {
              data[i].goodsList[j].isfull = true
            }
            else { 
              data[i].goodsList[j].isfull = false
            }

            if (data[i].goodsList[j].snapNumEnable > 1) {
              data[i].goodsList[j].ismore = true
            }
            else {
              data[i].goodsList[j].ismore = false
            }
          }

          var date = new Date()
          var startTime = date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate() + ' ' + data[i].timeFrameStart
          var endTime = date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate() + ' ' + data[i].timeFrameEnd
          var differ = (new Date(startTime).getTime() - new Date(endTime).getTime()) / 1000 / 60
          data[i].timeArea = differ
          // console.log(data[i].timeArea)
          data[i].timeFrames = data[i].timeFrameStart.substr(0, 5)


          if (data[i].frameStatus == 1) {
            data[i].status = "开抢结束"
          }
          else if (data[i].frameStatus == 2) {
            data[i].status = "已开抢"

          }
          else if (data[i].frameStatus == 3) {
            data[i].status = "即将开始"
          }

        }


        var frameStatus = []
        for (let i = 0; i < data.length; i++) {
          frameStatus.push(data[i].frameStatus)
        }
        if (frameStatus.indexOf(2) > -1) {
          isSelect = frameStatus.indexOf(2)
        }
        else if (frameStatus.indexOf(2) <= -1 && frameStatus.indexOf(3) <= -1) {
          isSelect = frameStatus.length - 1
        }
        else if (frameStatus.indexOf(2) <= -1 && frameStatus.indexOf(1) <= -1) {
          isSelect = 0
        }
        else {
          isSelect = frameStatus.indexOf(3)
        }


        decorate_options = data[isSelect].goodsList

        if (data[isSelect].status == "开抢结束") {
          this.setData({
            isbefore: true,
            isafter: false,
            isnow: false,
          })
        }
        else if (data[isSelect].status == "即将开始") {
          this.setData({
            isbefore: false,
            isafter: true,
            isnow: false,
          })
        }
        else if (data[isSelect].status == "已开抢") {
          this.setData({
            isbefore: false,
            isafter: false,
            isnow: true,
          })
        }

        this.setData({
          header_navs: data,
          decorate_options,
          isSelect,
          // append_list:[]
        })
        this.isClear()
        wx.stopPullDownRefresh()
      }
      else if (res.data.code == 404) {
        app.showToast(res.data.msg)
        wx.stopPullDownRefresh()
        setTimeout(function () {
          wx.navigateBack({

          })
        }, 1500)
      }

      
    })

  },

  isClear:function(){
    var append_list = this.data.append_list
    var decorate_options = this.data.decorate_options
    var date = new Date()
    var selectTime = date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate() + ' ' + this.data.header_navs[this.data.isSelect].timeFrames + ":00"

    selectTime = new Date(selectTime).getTime()
    var nowTime = new Date().getTime()
    var differ = (selectTime - nowTime) / 1000 / 60

    if (differ <= 5 && differ >= this.data.header_navs[this.data.isSelect].timeArea){
      for(let i=0;i<append_list.length;i++){
        for(let j=0;j<decorate_options.length;j++){
          if(append_list[i].goodsId == decorate_options[j].goodsId){
            decorate_options[j].append_num = append_list[i].append_num
            decorate_options[j].isappend = append_list[i].isappend
          }
        }
      }
      this.setData({
        decorate_options,
        append_list
      })
      wx.hideLoading()
      this.countPrice()
    }
    else{
      this.setData({
        decorate_options,
        append_list:[]
      })
      wx.hideLoading()
      this.countPrice()
    }

  }

})