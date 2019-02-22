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
      { "img": "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/index/freeshop.png", "text": "免租金开店" },
      { "img": "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/index/storeDecorate.png", "text": "店铺装修" },
      { "img": "https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/index/operating.png", "text": "外卖运营" },
      // { "img": "http://pk1897l3c.bkt.clouddn.com/icon_4.jpg", "text": "菜品拍摄" },
    ],
    scrollX_msgs: [],
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
    isMember:2
  },

  goMember:function(){
    if (this.data.isMember == true || this.data.isMember == 'true') {
      wx.navigateTo({
        url: '../dredge/dredge?type=renew',
      })
    }
    else {
      wx.switchTab({
        url: '../member/member',
      })
    }
  },

  gologin:function(){
    if (app.globalData.accessToken) {

    }
    else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
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
    // app.globalData.isAuthDone = 1
    // app.globalData.eleAuth=false
    // app.globalData.mtAuth=false
    if(!app.globalData.accessToken){
      wx.navigateTo({
        url: '../login/login',
      })
    }
    else if (app.globalData.poiBasicData){
      if (app.globalData.accessToken && !app.globalData.poiBasicData.eleAuth && !app.poiBasicData.globalData.mtAuth) {
        wx.navigateTo({
          url: '../identityConfirm/identityConfirm',
        })
      }
      else if (app.globalData.accessToken && (app.globalData.poiBasicData.eleAuth || app.globalData.poiBasicData.mtAuth)) {
        switch (e.currentTarget.dataset.id) {
          case 0:
            app.getData('/go/kaidian/get?accessToken=' + app.globalData.accessToken).then((res) => {
              // console.log(res)
              // res.data.code=200
              if (res.data.code == 404) {
                wx.navigateTo({
                  url: '../applyFor/applyFor?type=freeShop',
                })
              }
              else if (res.data.code == 200) {
                wx.navigateTo({
                  url: '../successApplyFor/successApplyFor?type=freeShop',
                })
              }


            }).catch((error) => {
              console.log(error)

            })
            break;
          case 1:
            wx.navigateTo({
              url: '../storeDecorate/storeDecorate',
            })
            break;
          case 2:
            app.getData('/go/yunying/get?accessToken=' + app.globalData.accessToken).then((res) => {
              // res.data.code=404
              if (res.data.code == 404) {
                wx.navigateTo({
                  url: '../operatingState/operatingState',
                })
              }
              else if (res.data.code == 200) {
                // res.data.data.auditStatus=2
                if (res.data.data.auditStatus == 2) {
                  wx.navigateTo({
                    url: '../operatingCharts/operatingCharts',
                  })
                  return
                }
                wx.navigateTo({
                  url: '../successApplyFor/successApplyFor?type=operating',
                })
              }

            }).catch((error) => {
              console.log(error)

            })
            // wx.navigateTo({
            //   url: '../applyFor/applyFor?type=operating',
            // })
            break;
          case 3:
            break;
        }
      }
    }
    else if (!app.globalData.poiBasicData){
      wx.navigateTo({
        url: '../identityConfirm/identityConfirm',
      })
    }
    
    
  },

  goZero:function(e){
    console.log(e.currentTarget.dataset.id)
    console.log(app.globalData.accessToken)
    if(app.globalData.accessToken){
      app.postData('/member/my/get',{"accessToken":app.globalData.accessToken}).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          if(res.data.data.isMember == false || res.data.data.isMember == 'false'){
            app.showToast('请先开通会员')
            setTimeout(()=>{
              wx.switchTab({
                url: '../member/member',
              })
            },1500)
            
          }
          else{
            wx.navigateTo({
              url: '../zeroRushAll/zeroRushAll?id=' + e.currentTarget.dataset.id,
            })
          }
        }
        else if(res.data.code == 403){
          app.showToast('您还没有店铺，请先认证')
          setTimeout(()=>{
            wx.navigateTo({
              url: '../identityConfirm/identityConfirm',
            })
          },1500)
        }
      })
    }
    else{
      this.gologin()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.scene)
    wx.hideShareMenu()
    if(options.scene){
      var scene = decodeURIComponent(options.scene)
      app.globalData.inviterId = scene
    }
    else{
      
    }
    console.log(app.globalData)
    app.getData('/snap/cate/list').then(res=>{
      // console.log(res)
      if(res.data.code==200){
        this.setData({
          scrollX_msgs:res.data.data
        })
      }
    })
    // var data = {}
    // wx.navigateToMiniProgram({
    //   appId: 'wxbd687630cd02ce1d', //固定值，这个是填写微信官方签约小程序的id
    //   extraData: data,
    //   path: 'pages/index/index',
    //   success(res) {
    //     wx.setStorageSync('contract_id', "");
    //     // me.globalData.contract_id = "";
    //     // 成功跳转到签约小程序 
    //   },
    //   fail(res) {
    //     console.log(res);
    //     // 未成功跳转到签约小程序 
    //   }
    // });
    // return
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
    if(!app.globalData.accessToken){
      this.setData({
        isMember:false
      })
      return
    }
    app.postData('/member/my/get', { "accessToken": app.globalData.accessToken }).then(res => {
      if (res.data.code == 200) {
        this.setData({
          isMember: res.data.data.isMember
        })
      }
      else{
        this.setData({
          isMember: false
        })
      }
    })
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
    wx.stopPullDownRefresh()
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