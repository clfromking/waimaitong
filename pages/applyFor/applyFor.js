// pages/applyFor/applyFor.js
const app = getApp()
let arr = new Array()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navType:"",
    region: ['北京市', '北京市', '东城区'],
    // customItem: '全部',
    radios: [{ "name": '美团', "isselect": false }, { "name": '饿了么', "isselect": false }],
    array: ['单店自创品牌', '连锁加盟店', '连锁直营店'],
    index: 0,
    multiArray: [[], []],
    multiIndex: [0, 0],
    brandName: "",
    address: "",
    num: 1,
    name: "",
    phone: "",
    code: "",
    area:"",
    isdisabled:false,
    smsCodeText:"获取验证码",
    isGetCode:true
  },

  chooseLocation:function(){
    if(this.data.isdisabled){
      return
    }
    app.chooseLocation().then((res)=>{
      console.log(res)
      this.setData({
        address:res.name,
        area: res.address
      })
    })
  },

  //地区选择器改变
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  //单选框选择
  selectRadio: function (e) {
    let radios = this.data.radios
    radios[e.currentTarget.dataset.id].isselect = !radios[e.currentTarget.dataset.id].isselect
    this.setData({
      radios
    })
  },

  //单列选择器改变
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //所有输入框输入
  inputMsgs: function (e) {
    let inputName = ''
    switch (Number(e.currentTarget.dataset.id)) {
      case 0:
        inputName = 'brandName'
        break;
      case 1:
        inputName = 'address'
        break;
      case 2:
        inputName = 'num'
        if(e.detail.value<=0){
          e.detail.value=1
        }
        break;
      case 3:
        inputName = 'name'
        break;
      case 4:
        inputName = 'phone'
        break;
      case 5:
        inputName = 'code'
        break;
    }
    this.setData({
      [inputName]: e.detail.value
    })
  },

  getCode: function () {
    // console.log(this.data.smsCodeText)
    if(this.data.smsCodeText!=="获取验证码"){
      return
    }
    if(!this.data.phone){
      app.showToast('手机号码不能为空')
    }
    else if(this.data.phone.length<11){
      app.showToast('手机号码格式不正确')
    }
    else{
      var postData = { "accessToken": app.globalData.accessToken,"mobile":this.data.phone}
      app.postData('/setting/sms/go',postData).then((res)=>{
        if(res.data.code==200){
          for (let i = 60; i >= 0; i--) {
            var timeOut=setTimeout(() => {
              // console.log(i)
              if (i < 1) {
                this.setData({
                  smsCodeText: "获取验证码"
                })
              }
              else {
                this.setData({
                  smsCodeText: i + "S"
                })
              }

            }, (60 - i) * 1000)
          }
        }
      })
    }
  },

  sub:function(){
    if(this.data.num==1){
      return
    }
    this.setData({
      num:this.data.num-1
    })
  },

  add:function(){
    this.setData({
      num: this.data.num+1
    })
  },

  //提交
  submit: function () {
    // wx.redirectTo({
    //   url: '../successApplyFor/successApplyFor?type='+this.data.navType,
    // })
    // return
    var platform = "0"
    if (this.data.radios[0].isselect == true && this.data.radios[1].isselect == false){
      platform = "1"
    }
    else if (this.data.radios[0].isselect == false && this.data.radios[1].isselect == true){
      platform = "2"
    }
    else if (this.data.radios[0].isselect == true && this.data.radios[1].isselect == true){
      platform = "1,2"
    }
    if (!this.data.brandName) {
      app.showToast('品牌名不能为空')
      return
    }
    else if (!this.data.area){
      app.showToast('店铺地址不能为空')
      return
    }
    else if (!this.data.address) {
      app.showToast('详细地址不能为空')
      return
    }
    else if (platform== 0) {
      app.showToast('已上线外卖平台不能为空')
      return
    }
    else if (!this.data.num) {
      app.showToast('品牌门店数量不能为空')
      return
    }
    else if (!this.data.name) {
      app.showToast('姓名不能为空')
      return
    }
    else if (!this.data.phone) {
      app.showToast('手机号码不能为空')
      return
    }
    else if(this.data.phone.length<11){
      app.showToast('手机号码格式不正确')
      return
    }
    else if (!this.data.code) {
      app.showToast('验证码不能为空')
      return
    }
    else if(this.data.code.length<6){
      app.showToast('验证码格式不正确')
      return
    }

    if(this.data.navType=='freeShop'){
      let dishCateId = arr[this.data.multiArray[0][this.data.multiIndex[0]]][this.data.multiIndex[1]].cateId
      var postData = { "accessToken": app.globalData.accessToken, "brandName": this.data.brandName,  "address": this.data.address, "platform": platform, "poiType": this.data.index + 1, "dishCateId": dishCateId, "amount": this.data.num,  "smsCode": this.data.code }
      console.log(postData)
      app.postData('/go/kaidian/submit', postData).then((res) => {
        console.log(res)
        if(res.data.code==200){
          wx.redirectTo({
            url: '../successApplyFor/successApplyFor?type=freeShop',
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    else{
      var postData = { "accessToken": app.globalData.accessToken, "brandName": this.data.brandName, "address": this.data.address, "platform": platform, "poiType": this.data.index + 1, "amount": this.data.num,  "smsCode": this.data.code }
      console.log(postData)
      app.postData('/go/yunying/submit', postData).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          wx.redirectTo({
            url: '../successApplyFor/successApplyFor?type=operating',
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    
  },


  //多列选择器确定改变
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  //多列选择器列数改变
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    if (e.detail.column == 0) {
      data.multiArray[1] = []
      for (let i = 0; i < arr[data.multiArray[0][e.detail.value]].length; i++) {
        data.multiArray[1].push(arr[data.multiArray[0][e.detail.value]][i].subName)
      }
    }
    this.setData(data)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.type=="freeShop"){
      wx.setNavigationBarTitle({
        title: '免租金开店申请'
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#abca9a',
      })
    }
    else{
      wx.setNavigationBarTitle({
        title: '外卖运营申请'
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#256ef6',
      })
    }
    // options.type="freeShop"
    this.setData({
      navType:options.type
    })
    if(options.type=='freeShop'){
      app.getData('/go/kaidian/get?accessToken=' + app.globalData.accessToken).then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
        this.setData({
          isdisabled: false
        })
      })
    }
    else{
      app.getData('/go/yunying/get?accessToken=' + app.globalData.accessToken).then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
        this.setData({
          isdisabled: false
        })
      })
    }
    
    app.getData('/dish/allcate?accessToken=' + app.globalData.accessToken).then((res) => {
      console.log(res)

      for (let i = 0; i < res.data.data.length; i++) {
        if (arr[res.data.data[i].name] == null) {
          arr[res.data.data[i].name] = new Array()
        }
        let obj = { "subName": res.data.data[i].subName, "cateId": res.data.data[i].cateId }
        arr[res.data.data[i].name].push(obj)
      }
      let multiArray = this.data.multiArray
      multiArray[0] = []
      multiArray[1] = []
      for (var obj in arr) {
        console.log(obj)
        multiArray[0].push(obj)
      }

      for (let i = 0; i < arr[multiArray[0][0]].length; i++) {
        multiArray[1].push(arr[multiArray[0][0]][i].subName)
      }
      this.setData({
        multiArray
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
    // clearTimeout(timeOut)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // clearTimeout(timeOut)
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