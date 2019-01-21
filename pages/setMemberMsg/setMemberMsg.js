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
    region:["","",""],
    // customItem: '全部',
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

  bindInput:function(e){
    // console.log(e.detail.value)
    switch(Number(e.currentTarget.dataset.id)){
      case 0:
        this.setData({
          memberName:e.detail.value
        })
        break;
      case 1:
        this.setData({
          poiAddress: e.detail.value
        })
        // console.log(11)
        break;
      case 2:
        this.setData({
          poiBrandName: e.detail.value
        })
        break;
    }
  },

  changeAll:function(){
    
    if (this.data.isdisabled==true){
      this.setData({
        isdisabled: false
      })
    }
    else{
      // console.log(this.data.poiAddress)
      // return
      for (var i = 0 ; i < allArr.length ; i++){
        if (allArr[i].name == this.data.multiArray[0][this.data.multiIndex[0]] && allArr[i].subName == this.data.multiArray[1][this.data.multiIndex[1]]){
          break
        }
      }
      // console.log(allArr[i].cateId)
      // console.log(this.data.region)
      if (!this.data.memberName){
        app.showToast('真实姓名不能为空')
        return
      }
      else if (!this.data.poiAddress){
        app.showToast('店铺位置不能为空')
        return
      }
      else if (!this.data.poiBrandName){
        app.showToast('品牌名称不能为空')
        return
      }
      else{
        wx.showLoading({
          title: '保存中',
        })
        var postData = { "accessToken": app.globalData.accessToken, "poiBrandName": this.data.poiBrandName, "poiCateId": allArr[i].cateId, "poiProvince": this.data.region[0], "poiCity": this.data.region[1], "poiDistricts": this.data.region[2], "poiStreet": "", "poiAddress": this.data.poiAddress, "memberName": this.data.memberName}
        console.log(postData)
        app.postData("/setting/poi/basic/set", postData).then(res=>{
          if(res.data.code==200){
            wx.hideLoading()
            app.showToast('保存成功')
            app.globalData.poiBasicData.address = this.data.poiAddress
            app.globalData.poiBasicData.brandName = this.data.poiBrandName
            app.globalData.poiBasicData.province = this.data.region[0]
            app.globalData.poiBasicData.city = this.data.region[1]
            app.globalData.poiBasicData.districts = this.data.region[2]
            app.globalData.name = this.data.memberName
            this.setData({
              isdisabled: true
            })
          }
        })
      }

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
    console.log(data)
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
        console.log(res)
        var data1 = {
          multiArray: this.data.multiArray,
          multiIndex: this.data.multiIndex
        };
        // res.data.data.cateId=3
        let area = ''
        area += res.data.data.province + " "
        area += res.data.data.city + " "
        area += res.data.data.districts + " "
        area += res.data.data.street
        let region=[]
        region[0]=res.data.data.province||"北京市"
        region[1]=res.data.data.city||"北京市"
        region[2]=res.data.data.districts||"朝阳区"
        let data = {
          "memberMobile": app.globalData.mobile,
          "memberName": app.globalData.name,
          "poiAddress": res.data.data.address||"测试测试",
          "poiBrandName": res.data.data.brandName||"测试",
          "area": area,
          "region": region

        }
        for (let i = 0; i < allArr.length; i++) {
          if (Number(res.data.data.cateId) == Number(allArr[i].cateId)) {
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
    this.setData({
      "memberMobile":app.globalData.mobile,
    })
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    arr=[]
    allArr=[]
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    arr = []
    allArr = []
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