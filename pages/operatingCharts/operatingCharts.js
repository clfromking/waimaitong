// pages/operatingCharts/operatingCharts.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusBarHeight,
    navText: "外卖运营数据",
    selectHeaderNav:0,
    times: ["07月02日", "07月02日", "07月02日", "07月02日", "07月02日", "07月02日", "07月02日", "07月02日"],
    detail_options_money: ["1423.00","3523.00"],
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    service_score: [false, false, false, false, false],
    ability_score: [false, false, false, false, false],
    speed_score: [false, false, false, false, false],
    textArea: ""
  },

  inputTextArea: function (e) {
    this.setData({
      textArea: e.detail.value
    })
  },

  // 点击按钮后初始化图表
  init: function () {
    this.ecComponent.init((canvas, width, height) => {
      // console.log(height)
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        // isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },


  changeHeaderNav:function(e){
    this.setData({
      selectHeaderNav:e.currentTarget.dataset.id
    })
  },

  mark: function (e) {
    // console.log(e.currentTarget.dataset.id)
    // console.log(e.currentTarget.dataset.index)
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let score_arr = [false, false, false, false, false]
    for (let i = 0; i < index + 1; i++) {
      score_arr[i] = true
    }
    switch (Number(id)) {
      case 0:
        this.setData({
          service_score: score_arr
        })
        break;
      case 1:
        this.setData({
          ability_score: score_arr
        })
        break;
      case 2:
        this.setData({
          speed_score: score_arr
        })
        break;
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    this.init()
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



function setOption(chart) {
  const option = {
    title: {
      text: '测试下面legend的红色区域不应被裁剪',
      left: 'center'
    },
    color: ["#FFCF52", "#51E6FF", "#FF591C"],
    legend: {
      data: ['托管前', '托管后', '约定均值'],
      bottom: 0,
      left: 'right',
      // backgroundColor: 'red',
      z: 100
    },
    grid: {
      backgroundColor: "#256ef6",
      show:true,
      containLabel: true,
      width:710/app.globalData.double,
      height: 452 / app.globalData.double,
      boundaryGap:[0,0],
      left:-10,
      top:10,
      right:20,
      bottom: 68 / app.globalData.double,
      
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['7.1', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7','7.8','7.9','7.10'],
      axisTick:{
        show:false
      },
      splitLine:{
        show:true,
        lineStyle:{
          color:"#2F76F8"
        }
      },
      // splitArea:{
      //   show:true
      // }
      // show: false
    },
    yAxis: {
      show:false,
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [
      {
        name: '托管前',
        type: 'line',
        smooth: true,
        symbolSize:0,
        areaStyle: {
          normal: {//设置线下面部分颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
              [{ offset: 0, color: '#3188FF' },
                { offset: 1, color: '#31C5FF' }
              ])
          }
        },
        data: [18, 36, 65, 30, 78, 40, 33,30,40,20]
      }, 
      {
        name: '托管后',
        type: 'line',
        smooth: true,
        symbolSize: 0,
        data: [12, 50, 51, 35, 70, 30, 20,15,16,10]
      }, 
      {
        name: '约定均值',
        type: 'line',
        smooth: true,
        symbolSize: 0,
        data: [ 20, 20, 20,20,20, 20, 20,20,20,20]
      }
    ]
  };
  chart.setOption(option);
}