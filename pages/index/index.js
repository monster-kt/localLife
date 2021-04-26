// index.js
// 获取应用实例
const app = getApp();
const fetch = require('../../utils/fetch')
Page({
  data: {
    slides: [],
    categories: [],
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    // 改成箭头函数后的 this 就是 onload 的this 也就是实例对象
    fetch('slides').then((res) => {
      // success
      this.setData({ slides: res.data });
    })
    fetch('categories').then((res) => {
      this.setData({ categories: res.data });
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: "title", // 分享标题
      desc: "desc", // 分享描述
      path: "path", // 分享路径
    };
  },
});
