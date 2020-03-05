import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 保存输入的搜索参数
    keyword: '',
    // 商品数据
    goods: [],
    // 是否还有数据
    hasMore: true,
    // 页码数
    pagenum: 1
  },

  // 封装请求的方法 方便调用
  getGoods() {
    setTimeout(v => {
      // 传入参数请求商品列表数据
      request({
        url: "/goods/search",
        data: {
          // 参数 关键字
          query: this.data.keyword,
          // 页码
          pagenum: this.data.pagenum,
          // 数据条数
          pagesize: 10
        }
      }).then(res => {
        // console.log(res)
        const {
          message
        } = res.data;

        // 遍历修改goods下面的价格
        const goods = message.goods.map(v => {
          // 给价格保留两个小数点
          v.goods_price = Number(v.goods_price).toFixed(2);
          return v;
        })

        this.setData({
          // 合并原来的商品列表和请求回来的列表  解构赋值
          goods:[...this.data.goods,...goods]
        })
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    const {
      keyword
    } = options;

    this.setData({
        keyword
      }),

      this.getGoods();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 页数+1
    this.setData({
      pagenum: this.data.pagenum + 1
    })
    this.getGoods();
  }


})