// pages/test/test.js
const app=getApp()
let arr = new Array()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "首页",
    region: ['北京市', '北京市', '东城区'],
    customItem: '全部',
    radios:['美团','饿了么'],
    radio_select:0,
    array: ['单店自创品牌', '连锁加盟店', '连锁直营店'],
    index:0,
    multiArray: [[], []],
    multiIndex: [0, 0],
    brandName:"",
    address:"",
    num:"",
    name:"",
    phone:"",
    code:"",
  },

  //地区选择器改变
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  //单选框选择
  selectRadio:function(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      radio_select: e.currentTarget.dataset.id
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
  inputMsgs:function(e){
    let inputName=''
    switch(Number(e.currentTarget.dataset.id)){
      case 0:
        inputName='brandName'
        break;
      case 1:
        inputName = 'address'
        break;
      case 2:
        inputName = 'num'
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
      [inputName]:e.detail.value
    })
  },

  //提交
  submit:function(){
    let dishCateId = arr[this.data.multiArray[0][this.data.multiIndex[0]]][this.data.multiIndex[1]].cateId
    var postData = { "accessToken": app.globalData.accessToken,"brandName": this.data.brandName, "province": this.data.region[0], "city": this.data.region[1], "districts": this.data.region[2], "address": this.data.address, "platform": this.data.radio_select + 1, "poiType": this.data.index+1, "dishCateId": dishCateId, "amount": this.data.num, "contactName": this.data.name, "contactMobile": this.data.phone, "smsCode": this.data.code}
    console.log(postData)
    app.postData('/go/form/submit',postData).then((res)=>{
      console.log(res)
    }).catch((error)=>{
      console.log(error)
    })
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
    if(e.detail.column==0){
      data.multiArray[1] = []
      for (let i = 0; i < arr[data.multiArray[0][e.detail.value]].length;i++){
        data.multiArray[1].push(arr[data.multiArray[0][e.detail.value]][i].subName)
      }
    }
    this.setData(data)
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getData('/go/form/get?accessToken=' + app.globalData.accessToken).then((res)=>{
      console.log(res)
      
    })
    app.getData('/dish/allcate?accessToken=' + app.globalData.accessToken).then((res)=>{
      console.log(res)
      
      for(let i=0;i<res.data.data.length;i++){
        if (arr[res.data.data[i].name]==null){
          arr[res.data.data[i].name]=new Array()
        }
        let obj = { "subName": res.data.data[i].subName, "cateId": res.data.data[i].cateId }
        arr[res.data.data[i].name].push(obj)
      }
      let multiArray = this.data.multiArray
      multiArray[0] = []
      multiArray[1] = []
      for(var obj in arr){
        console.log(obj)
        multiArray[0].push(obj)
      }
      
      for (let i = 0; i < arr[multiArray[0][0]].length;i++){
        multiArray[1].push(arr[multiArray[0][0]][i].subName)
      }
      console.log(multiArray)
      this.setData({
        multiArray
      })
    })
    // app.postData({

    // })
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

  }
})