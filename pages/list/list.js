// pages/list/list.js
const fetch = require("../../utils/fetch");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前加载的分类
    category: {},
    // 子分类下的全部店铺
    shops: [],
    pageIndex: 0,
    pageSize: 20,
    totalCount: 0,
    hasMore: true,
  },
  // 加载下一页数据
  loadMore: function () {
    if (!this.data.hasMore) return;
    let { pageIndex, pageSize, searchText } = this.data;
    const params = { _page: ++pageIndex, _limit: pageSize };
    if (searchText) params.q = searchText;
    return fetch(`categories/${this.data.category.id}/shops`, params).then(
      (res) => {
        const totalCount = parseInt(res.header["x-total-count"]);
        // 将另一个数组拼在后面
        const shops = this.data.shops.concat(res.data);
        const hasMore = pageIndex * pageSize < totalCount;
        this.setData({ shops, pageIndex, totalCount, hasMore });
      }
    );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求分类信息
    fetch(`categories/${options.cat}`).then((res) => {
      // 这里不能确定一定是在 onReady 之后执行
      this.setData({
        category: res.data,
      });
      wx.setNavigationBarTitle({
        title: res.data.name,
      });
      // 请求商店信息
      this.loadMore();
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 导航头要在页面加载之后才能设置
    if (this.data.category.name) {
      wx.setNavigationBarTitle({
        title: this.data.category.name,
      });
    }
  },
  /**
   * 监听用户下拉动作
   */
  // 下拉刷新
  onPullDownRefresh: function () {
    // 重新加载数据
    this.setData({
      shops: [],
      pageIndex: 0,
      hasMore: true,
    });
    this.loadMore().then(() => wx.stopPullDownRefresh());
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // TODO：节流
    // 判断是否正在加载
    this.loadMore();
  },
});
