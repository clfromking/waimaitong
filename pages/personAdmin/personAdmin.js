// pages/personAdmin/personAdmin.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "店铺成员管理",
    person_list: [],
    isNothing:false
  },


  createPerson:function(){
    wx.navigateTo({
      url: '../createPerson/createPerson',
    })
  },

  //转让
  transfer:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.showModal({
      title: '提示',
      content: '您确定要将老板转让给此人么?',
      confirmText: "确认转让",
      cancelText: "点错了",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var postData = { "accessToken": app.globalData.accessToken, "userId": e.currentTarget.dataset.id }
          // app.postData('/setting/poi/boss/transfer',postData).then(res=>{
          //   console.log(res)
          // })
        }
        else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //移除
  remove:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.showModal({
      title: '提示',
      content: '您确定要将此人从店铺成员中移除么?',
      confirmText:"确认移除",
      cancelText: "点错了",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var postData={"accessToken":app.globalData.accessToken,"userId":e.currentTarget.dataset.id}
          // app.postData('/setting/poi/employee/rm',postData).then(res=>{
          //   console.log(res)
          // })
        } 
        else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    app.postData('/setting/poi/employee/list', { "accessToken": app.globalData.accessToken }).then((res) => {
      console.log(res)
      // res.data.data = [{ "id": 0, "name": "张三", "nickName": "啦啦啦", "avatarUrl": "", "createTime": "2018-07-06 12:45" },
      //   { "id": 1, "name": "李四", "nickName": "哈哈哈", "avatarUrl": "", "createTime": "2018-07-07 12:45" },
      //   { "id": 2, "name": "王二麻子王二麻子王二麻子", "nickName": "呵呵呵", "avatarUrl": "", "createTime": "2018-07-08 12:45" }]
      if(res.data.data.length){
        let person_list=this.data.person_list
        person_list=res.data.data
        this.setData({
          isNothing: false,
          person_list
        })
      }
      else{
        console.log('meiyou')
        this.setData({
          isNothing:true
        })
      }
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