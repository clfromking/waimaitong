// pages/setMemberMsg/setMemberMsg.js
const app = getApp()
let arr = new Array()
let allArr=new Array()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "会员信息设置",
    memberMobile:"",
    memberName:"",
    poiBrandName:"",
    poiAddress:"",
    area: '',
    customItem: '全部',
    multiArray: [[], []],
    multiIndex: [0, 0],
    isdisabled:true

  },

  changePhone:function(){
    if(this.data.isdisabled){
      return
    }
    wx.navigateTo({
      url: '../changePhone/changePhone?mobile=' + this.data.memberMobile,
    })
  },


  location:function(){
   
    if (this.data.isdisabled){
     return 
    }
    app.chooseLocation().then(res=>{
      this.setData({
        area: res.address,
        poiAddress: res.name
      })
    })

  
  },

  changeAll:function(){
    this.setData({
      isdisabled: !this.data.isdisabled
    })
    if(this.data.isdisabled){
      console.log(arr)
      console.log(allArr)
      console.log(this.data.multiArray[0][this.data.multiIndex[0]])
      console.log(this.data.multiArray[1][this.data.multiIndex[1]])
      for (var i = 0 ; i < allArr.length ; i++){
        if (allArr[i].name == this.data.multiArray[0][this.data.multiIndex[0]] && allArr[i].subName == this.data.multiArray[1][this.data.multiIndex[1]]){
          break
        }
      }
      console.log(allArr[i].cateId)

      //保存时提交
      // let postData={}
      // app.postData("/setting/poi/basic/set",postData).then(res)=>{
      //   console.log(res)
      // }
    }
  },

  //地区选择器改变
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
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
    app.getData('/dish/allcate?accessToken=' + app.globalData.accessToken).then((res) => {
      allArr = res.data.data
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
        multiArray[0].push(obj)
      }

      for (let i = 0; i < arr[multiArray[0][0]].length; i++) {
        multiArray[1].push(arr[multiArray[0][0]][i].subName)
      }
      this.setData({
        multiArray
      })

      app.getData('/setting/poi/basic/get?accessToken=' + app.globalData.accessToken).then((res) => {
        var data1 = {
          multiArray: this.data.multiArray,
          multiIndex: this.data.multiIndex
        };
        let area = ''
        area += res.data.data.poiProvince + " "
        area += res.data.data.poiCity + " "
        area += res.data.data.poiDistricts + " "
        area += res.data.data.poiStreet
        let data = {
          "memberMobile": res.data.data.memberMobile,
          "memberName": res.data.data.memberName,
          "poiAddress": res.data.data.poiAddress,
          "poiBrandName": res.data.data.poiBrandName,
          "area": area,

        }
        for (let i = 0; i < allArr.length; i++) {
          if (Number(res.data.data.poiCateId) == Number(allArr[i].cateId)) {
            // if (11 == Number(allArr[i].cateId)) {
            data1.multiIndex[0] = this.data.multiArray[0].indexOf(allArr[i].name)
            var arr1 = []
            for (let j = 0; j < arr[allArr[i].name].length; j++) {
              arr1.push(arr[allArr[i].name][j].subName)
            }

            data1.multiArray[1] = arr1
            data1.multiIndex[1] = this.data.multiArray[1].indexOf(allArr[i].subName)
            break;
          }
        }
        this.setData({
          multiArray: data1.multiArray,
          multiIndex: data1.multiIndex
        })
        this.setData(data)
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
    app.getData('/setting/poi/basic/get?accessToken=' + app.globalData.accessToken).then((res)=>{
      this.setData({
        "memberMobile": res.data.data.memberMobile,
      })
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