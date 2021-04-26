/**
 * @description: 发生请求
 * @param {*} url
 * @param {*} data
 * @return {*} Promise
 * @author: ksr
 */
module.exports = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      // 这里的地址没有跨域的概念
      // 但是处于安全 可以在后台设置哪些地址运行请求
      // 域名必须备案，服务端必须采用 https
      url: `https://locally.uieee.com/${url}`,
      // 设置请求的 header
      /* 
      header: {
        "Conten-Type": "json",
      }, */
      success: resolve,
      fail: reject,
    });
  });
};
