//app.js
App({
  data:{
    // url:'https://www.alpha.com',     //本地
    url: 'https://www.beta.com'      //测试
  },
  postData:function(url,data){
    var that=this
    var promise=new Promise((resolve,reject)=>{
      wx.request({
        url: that.data.url+url,
        data:data,
        method:'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // resolve(res)
          if(res.data.code==401){
            wx.showToast({
              title: '登陆超时，请重新登陆',
              icon:'none',
              duration:1500,
              mask:true
            })
            setTimeout(function(){
              wx.redirectTo({
                url: '../test/test',
              })
            },1500)
            // reject(res)
          }
          else{
            resolve(res)
          }
        },
        error: function (e) {
          reject(e)
        }
      })
    })
    return promise
  },
  getData:function(url){
    var that=this
    var promise=new Promise((resolve,reject)=>{
      wx.request({
        url: that.data.url+url,
        success:function(res){
          resolve(res)
        },
        error:function(e){
          reject(e)
        }
      })
    })
    return promise
  },
  onLaunch: function () {
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res.data.tick)
        if ((new Date().getTime() - res.data.tick) / (24 * 60 * 60 * 1000)>30){
          wx.showToast({
            title: '您的登录已过期,请重新登录。',
            icon:'none',
            mask:'true',
            duration:1500,
          })
          setTimeout(function(){
            wx.redirectTo({
              url: '../login/login',
            })
          },1500)
        }
      },
      fail:function(){
        console.log('没有')
      }
    })
  },
  globalData: {
    userInfo: null
  }
})