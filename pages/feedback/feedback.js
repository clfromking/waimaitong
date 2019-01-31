// pages/feedback/feedback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "会员体验反馈",
    radio_options: ["非常满意","满意" , "试试看","很不满意" ],
    isselect:0,
    textAreaValue:""

  },

  selectRadio:function(e){
    this.setData({
      isselect:e.currentTarget.dataset.id
    })
    // var radio_options=this.data.radio_options
    // for(let i=0;i<radio_options.length;i++){
    //   radio_options[i].isselect=false
    // }
    // radio_options[e.currentTarget.dataset.id].isselect=true
    // this.setData({
    //   radio_options
    // })
  },

  bindInput:function(e){
    this.setData({
      textAreaValue: e.detail.value
    })
  },

  submit:function(){
    console.log(this.data.textAreaValue.length)
    if(this.data.textAreaValue.length <= 10){
      app.showToast('建议的字数不能少于10个')
      return
    }
    else if (this.data.textAreaValue.length > 200){
      app.showToast('建议的字数不能多于200个')
      return
    }
    else{
      var postData = { "accessToken": app.globalData.accessToken, "svcQty": this.data.radio_options[this.data.isselect],"suggestText":this.data.textAreaValue}
      app.postData('/member/feedback',postData).then(res=>{
        if(res.data.code == 200){
          app.showToast('提交成功')
          this.setData({
            isselect:0,
            textAreaValue:""
          })
        }
      })
    }
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