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
            else if(Number(res.data.code) == 412){
              wx.hideLoading()
              return
            }
            else if(Number(res.data.code) == 400){
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
          wx.navigateBack({
            
          })
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

  savePhoto:function(data){
    var that = this
    var promise =  new Promise((resolve,reject)=>{
      wx.downloadFile({
        url: data,
        success: function (res) {
          if (res.statusCode == 200) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function (res) {
                console.log(res)
                that.showToast('保存成功，请到相册中查看')
              },
              fail: function () {
                wx.getSetting({
                  success(res) {
                    if (res.authSetting["scope.writePhotosAlbum"]) {
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
          }
        },
        fail: function () {
          that.showToast('下载失败，请重试')
        }
      })
    })
    return promise
  },

  allShare:function(path){
    console.log(path)
    var imageUrl = ''
    var title = ''
    if(path == 'freeShop'){
      title = '诚邀你一起免房租开店'
      imageUrl = 'https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/share/kd.png'
    }
    else if(path == 'storeDecorate'){
      title = '限时豪送外卖店铺装修'
      imageUrl = 'https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/share/zx.png'
    }
    else if(path == 'operating'){
      title = '外卖通免费外卖代运营正在持续助力餐饮商户'
      imageUrl = 'https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/share/yy.png'
    }
    else if(path == 'zero'){
      title = '外卖新福利即将开抢'
      imageUrl = 'https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/share/zero.png'
    }
    else if(path == 'member'){
      title = '立即加入外卖通成为免费运营合作伙伴吧'
      imageUrl = 'https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/share/hy.png'
    }
    else if(path == 'invite1'){       //邀请商户领现金主页以及今日邀请，历史邀请
      title = '外卖通免费外卖代运营正在持续助力餐饮商户'
      imageUrl = 'https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/share/yq1.png'
    }
    else if(path == 'invite2'){
      title = '人脉既钱脉，我愿持续助力餐饮商户'
      imageUrl = 'https://waimaitong.oss-cn-beijing.aliyuncs.com/wechat/share/yq2.png'
    }
    return {
      title: title,
      path: 'pages/member/member?inviterId=' + this.globalData.puid + "&type=share",
      imageUrl: imageUrl
    }
  },

  openFree:function(){
    var that = this
    var promise = new Promise((resolve,reject)=>{
      that.postData('/setting/poi/balance/pwd/required', { "accessToken": that.globalData.accessToken, "flag": 1 }).then(res => {
        resolve(res.data.code)
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


