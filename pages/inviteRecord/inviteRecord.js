// pages/todayInvite/todayInvite.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    pageSize: 6,
    nothing:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var url = ''
    if(options.type == 'today'){
      url = '/invite/today/list'
      wx.setNavigationBarTitle({
        title: '今日邀请'
      })
    }
    else{
      url = '/invite/all/list'
      wx.setNavigationBarTitle({
        title: '历史邀请'
      })
    }
    this.setData({
      type: options.type
    })
    console.log(url)
    app.getData(url+'?accessToken='+app.globalData.accessToken+'&index='+this.data.index+'&pageSize='+this.data.pageSize).then(res=>{
      console.log(res)
      if(res.data.code == 200){
        if(res.data.data.total <= 0){
          this.setData({
            nothing:true
          })
          return
          if(options.type == 'today'){
            app.showToast('暂无今日邀请记录')
            setTimeout(()=>{
              wx.navigateBack({
                
              })
            },1500)
          }
          else {
            app.showToast('暂无历史邀请记录')
            setTimeout(() => {
              wx.navigateBack({

              })
            }, 1500)
          }
        }
        else{
          for (let i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i].share = (res.data.data.list[i].share / 100).toFixed(2)
            if (res.data.data.list[i].durationUnit == 'DAY') {
              res.data.data.list[i].name = '日度会员'
            }
            else if (res.data.data.list[i].durationUnit == 'WEEK') {
              res.data.data.list[i].name = '周度会员'
            }
            else if (res.data.data.list[i].durationUnit == "MONTH" && res.data.data.list[i].duration !== 3) {
              res.data.data.list[i].name = "月度会员"
            }
            else if (res.data.data.list[i].durationUnit == "MONTH" && res.data.data.list[i].duration == 3) {
              res.data.data.list[i].name = "季度会员"
            }
            else if (res.data.data.list[i].durationUnit == "YEAR") {
              res.data.data.list[i].name = "年度会员"
            }
          }
          this.setData(res.data.data)
        }
        
      }
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
    if (this.data.list.length < this.data.total){
      var url = ''
      if (this.data.type == 'today') {
        url = '/invite/today/list'
      }
      else {
        url = '/invite/all/list'
      }

      var index = this.data.index
      this.setData({
        index: index + 1
      })
      var list = this.data.list
      app.getData(url+'?accessToken=' + app.globalData.accessToken + '&index=' + this.data.index + '&pageSize=' + this.data.pageSize).then(res=>{
        if(res.data.code == 200){
          for(let i=0; i<res.data.data.list.length;i++){
            res.data.data.list[i].share = (res.data.data.list[i].share / 100).toFixed(2)
            if (res.data.data.list[i].durationUnit == 'DAY') {
              res.data.data.list[i].name = '日度会员'
            }
            else if (res.data.data.list[i].durationUnit == 'WEEK') {
              res.data.data.list[i].name = '周度会员'
            }
            else if (res.data.data.list[i].durationUnit == "MONTH" && res.data.data.list[i].duration !== 3) {
              res.data.data.list[i].name = "月度会员"
            }
            else if (res.data.data.list[i].durationUnit == "MONTH" && res.data.data.list[i].duration == 3) {
              res.data.data.list[i].name = "季度会员"
            }
            else if (res.data.data.list[i].durationUnit == "YEAR") {
              res.data.data.list[i].name = "年度会员"
            }
            list.push(res.data.data.list[i])
          }
          this.setData({
            list,
            total:res.data.data.total
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.allShare('invite1')
  }
})