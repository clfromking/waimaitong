// pages/components/navigationTitle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    statusHeight:{
      type:Number,
      value:20
    },
    statusBgcolor:{
      type:String,
      value:"#fff"
    },
    navHeight: {
      type: Number,
      value: 46,
    },
    navBgcolor: {
      type: String,
      value: "#fff"
    },
    navText:{
      type:String,
      value:""
    },
    navTextcolor:{
      type:String,
      value:"#000"
    },
    bgImg:{
      type:String,
      value:""
    }
    

    
  },

  /**
   * 组件的初始数据
   */
  data: {
    isshowNavback:false,
    isshowOptions:false,
    isshowHome:false
  },
  attached() {
    var thisRoute = getCurrentPages()[getCurrentPages().length - 1].route
    // 在组件实例进入页面节点树时执行
    if (getCurrentPages().length >1){
      this.setData({
        isshowNavback: true
      })
    }
    else if (getCurrentPages().length <= 1 && thisRoute !== 'pages/index/index' && thisRoute !== 'pages/member/member' && thisRoute !== 'pages/order/order' && thisRoute !== 'pages/my/my'){
      this.setData({
        isshowHome: true
      })
    }
    else if (thisRoute == 'pages/my/my'){
      this.setData({
        isshowOptions: true
      })
    }
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    navBack:function(){
      // console.log(111)
      console.log(getCurrentPages()[getCurrentPages().length - 1].route)
      if (getCurrentPages()[getCurrentPages().length - 1].route=='pages/test/test'){
        wx.showModal({
          title: 'asd',
          content: 'hjaah',
          success:function(res){
            console.log(res)
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateBack({

              })
            } 
            else if (res.cancel) {
              console.log('用户点击取消')
              
            }
            
          },
          fail:function(){

          }
        })
        // wx.navigateBack({
          
        // })
      }
      else{
        wx.navigateBack({
          
        })
      }
      // wx.navigateBack({
        
      // })
    },
    navHome:function(){
      console.log('首页')
    },
    navOtherRoute:function(){
      console.log('qita luyou')
    }
  }
})
