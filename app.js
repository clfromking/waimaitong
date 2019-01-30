//app.js
App({
  data:{
    // url:'https://www.alpha.com',     //本地
    // url: 'https://www.beta.com',      //测试
    url:"https://www.waimaitong.xin"     //生产
  },
  postData:function(url,data,header){
    var that=this
    var promise=new Promise((resolve,reject)=>{
      wx.request({
        url: that.data.url+url,
        data:data,
        method:'POST',
        header: {
          'content-type': header || 'application/x-www-form-urlencoded'
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
              wx.navigateTo({
                url: '../login/login',
              })
            },1500)
            
          }
          else if (res.data.code == 200) {
            resolve(res)
          }
          else if((Number(res.data.code)>=1&&Number(res.data.code)<=199)||(Number(res.data.code)>=500&&Number(res.data.code)<=9999)){
            wx.showToast({
              title: '服务器错误，请重试！',
              icon:'none',
              mask:true,
              duration:1500
            })
          }
          else if (Number(res.data.code)>=300&&Number(res.data.code)<=499){
            resolve(res)
            
            if (Number(res.data.code)==404){
              wx.hideLoading()
              return
            }
            else if (Number(res.data.code) == 403) {
              wx.hideLoading()
              return
            }
            // reject(res)
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              mask: true,
              duration: 1500
            })
            // setTimeout(function () {
            //   wx.navigateBack({

            //   })
            // }, 1500)
          }
          
        },
        fail:function(){
          console.log('chucuo')
          that.showToast('网络错误，请重试')
        },  
        error: function (e) {
         
          wx.showToast({
            title: '服务器错误，请重试！',
            icon: 'none',
            mask: true,
            duration: 1500
          })
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
          if (res.data.code == 401) {
            wx.showToast({
              title: '登陆超时，请重新登陆',
              icon: 'none',
              duration: 1500,
              mask: true
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '../login/login',
              })
            }, 1500)

          }
          else if (res.data.code == 200) {
            resolve(res)
          }
          else if ((Number(res.data.code) >= 1 && Number(res.data.code) <= 199) || (Number(res.data.code) >= 500 && Number(res.data.code) <= 9999)) {
            wx.showToast({
              title: '服务器错误，请重试！',
              icon: 'none',
              mask: true,
              duration: 1500
            })
          }
          else if (Number(res.data.code) >= 300 && Number(res.data.code) <= 499) {
            resolve(res)
            if (Number(res.data.code) == 404) {
              wx.hideLoading()
              return
            }
            else if (Number(res.data.code) == 403){
              wx.hideLoading()
              return
            }
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              mask: true,
              duration: 1500
            })
            // setTimeout(function(){
            //   wx.navigateBack({
                
            //   })
            // },1500)
          }
        },
        fail:function(){
          console.log('错误')
          that.showToast('网络错误，请重试')
        },  
        error:function(e){
          reject(e)
          wx.showToast({
            title: '服务器错误，请重试！',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        }
      })
    })
    return promise
  },

  chooseLocation:function(){
    var promise=new Promise((resolve,reject)=>{
      wx.authorize({
        scope: 'scope.userLocation',
        success:function(res){
          console.log(res)
          wx.chooseLocation({
            success: function (res) {
              resolve(res)
            },
            fail: function (res) {
              console.log(res)
              wx.getSetting({
                success(res) {
                  if (res.authSetting["scope.userLocation"]) {
                  }
                  else {
                    wx.navigateTo({
                      url: '../authorization/authorization',
                    })
                  }
                }
              })
            }
          })
        },
        fail:function(res){
          console.log(res)
          wx.getSetting({
            success(res) {
              console.log(res)
              if (res.authSetting["scope.userLocation"]) {
              }
              else {
                wx.navigateTo({
                  url: '../authorization/authorization',
                })
              }
            }
          })
        }
      })
      
    })
    return promise
  },

  onLaunch: function () {
    var that=this
    let userInfo=wx.getStorageSync('userInfo')
    // console.log(userInfo)
    if (userInfo){
      that.globalData.accessToken = userInfo.accessToken
      let postData={"accessToken":userInfo.accessToken}
      that.postData('/wechat/login/token',postData).then((res)=>{
        console.log(res)
        that.globalData=res.data.data
        wx.getSystemInfo({
          success: function (res) {
            that.globalData.double = 750 / res.screenWidth
            that.globalData.statusBarHeight = Number(res.statusBarHeight)
            // console.log(that.globalData)
          }
        })
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.double = 750 / res.screenWidth
        that.globalData.statusBarHeight = Number(res.statusBarHeight)
        // console.log(that.globalData)
      }
    })
    


    
  },

  showToast: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      mask: true,
      duration: 1500
    })
  },

  onPageScroll: function (e) {
    if (e.scrollTop < 0) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },

  pay:function (data){
    var that=this
    var promise= new Promise((resolve,reject)=>{
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          that.showToast('支付失败')
          // reject(res)
        },
      })
    })
    return promise
  },

  globalData: {
    userInfo: null,
    accessToken:"",
    double:2
  }
})


