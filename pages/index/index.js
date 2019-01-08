const app=getApp()
let sign=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText:"首页",
    nickName:"",
    avatarUrl:"",
    small_nav:[
      { "img": "http://pk1897l3c.bkt.clouddn.com/icon_1.jpg", "text": "免租金开店" },
      { "img": "http://pk1897l3c.bkt.clouddn.com/icon_2.jpg", "text": "店铺装修" },
      { "img": "http://pk1897l3c.bkt.clouddn.com/icon_3.jpg", "text": "外卖运营" },
      { "img": "http://pk1897l3c.bkt.clouddn.com/icon_4.jpg", "text": "菜品拍摄" },
    ],
    scrollX_msgs: [
      { "img_src": "", "alt": "限前200位用户限前200位用户限前200位用户", "btn_text": "店铺装修" },
      { "img_src": "", "alt": "再来一次品牌升级", "btn_text": "定制海报" },
      { "img_src": "", "alt": "订单搜搜赚翻天", "btn_text": "提升下单神器" },
      { "img_src": "", "alt": "限前200位用户", "btn_text": "店铺装修" }
    ],
    guess_title:"猜你想要",
    guess_msgs:[
      { "img_src": "http://pk1897l3c.bkt.clouddn.com/guess_1.jpg", "title": "我这里下雨了,你那里呢！我这里下雨了,你那里呢！我这里下雨了,你那里呢！我这里下雨了,你那里呢！我这里下雨了,你那里呢！我这里下雨了,你那里呢！我这里下雨了,你那里呢！","price":"9.50","member_price":"0.00","scope":"美团外卖、饿了么通用"},
      { "img_src": "http://pk1897l3c.bkt.clouddn.com/guess_2.jpg", "title": "六一儿童节,回忆一下你的同年", "price": "9.50", "member_price": "0.00", "scope": "美团外卖、饿了么通用" },
      { "img_src": "http://pk1897l3c.bkt.clouddn.com/guess_1.jpg", "title": "我这里下雨了,你那里呢！", "price": "9.50", "member_price": "0.00", "scope": "美团外卖、饿了么通用" },
      { "img_src": "http://pk1897l3c.bkt.clouddn.com/guess_2.jpg", "title": "六一儿童节,回忆一下你的同年", "price": "9.50", "member_price": "0.00", "scope": "美团外卖、饿了么通用" },
      { "img_src": "http://pk1897l3c.bkt.clouddn.com/guess_1.jpg", "title": "我这里下雨了,你那里呢！", "price": "9.50", "member_price": "0.00", "scope": "美团外卖、饿了么通用" },
      { "img_src": "http://pk1897l3c.bkt.clouddn.com/guess_2.jpg", "title": "六一儿童节,回忆一下你的同年", "price": "9.50", "member_price": "0.00", "scope": "美团外卖、饿了么通用" }
    ],
    recommend_title:"智能推荐",
    recommend_img:"http://pk1897l3c.bkt.clouddn.com/index_banner1.jpg",
    recommend_msgs: [
      { "img_src": "http://pk1897l3c.bkt.clouddn.com/guess_1.jpg", "title": "我这里下雨了,你那里呢！我这里下雨了,你那里呢！我这里下雨了,你那里呢！我这里下雨了,你那里呢！我这里下雨了,你那里呢！我这里下雨了,你那里呢！我这里下雨了,你那里呢！", "price": "9.50", "member_price": "0.00", "scope": "美团外卖、饿了么通用" },
      { "img_src": "http://pk1897l3c.bkt.clouddn.com/guess_2.jpg", "title": "六一儿童节,回忆一下你的同年", "price": "9.50", "member_price": "0.00", "scope": "美团外卖、饿了么通用" },
      { "img_src": "http://pk1897l3c.bkt.clouddn.com/guess_1.jpg", "title": "我这里下雨了,你那里呢！", "price": "9.50", "member_price": "0.00", "scope": "美团外卖、饿了么通用" },
      { "img_src": "http://pk1897l3c.bkt.clouddn.com/guess_2.jpg", "title": "六一儿童节,回忆一下你的同年", "price": "9.50", "member_price": "0.00", "scope": "美团外卖、饿了么通用" },
      { "img_src": "http://pk1897l3c.bkt.clouddn.com/guess_1.jpg", "title": "我这里下雨了,你那里呢！", "price": "9.50", "member_price": "0.00", "scope": "美团外卖、饿了么通用" },
      { "img_src": "http://pk1897l3c.bkt.clouddn.com/guess_2.jpg", "title": "六一儿童节,回忆一下你的同年", "price": "9.50", "member_price": "0.00", "scope": "美团外卖、饿了么通用" }
    ],

  },

  test:function(){
    
    wx.navigateTo({
      url: '../test/test',
      success:function(){
        sign++
      }
    })
  },

  goNav:function(e){
    if(app.globalData.accessToken){
      switch (e.currentTarget.dataset.id) {
        case 0:
          wx.navigateTo({
            url: '../test/test',
          })
          break;
        case 1:
          wx.navigateTo({
            url: '../storeDecorate/storeDecorate',
          })
          break;
        case 2:
          break;
        case 3:
          break;
      }
    }
    else{
      wx.navigateTo({
        url: '../login/login',
      })
    }
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options)
    // wx.navigateTo({
    //   url: '../login/login',
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
    if(sign==1){
      wx.navigateTo({
        url: '../test/test',
        success:function(){
          sign++
        }
      })
    }
    wx.getStorage({
      key: 'userInfo',
      success: (res)=>{
        console.log(res)
        this.setData({
          nickName: res.data.nickName,
          avatarUrl:res.data.avatarUrl
        })
      },
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