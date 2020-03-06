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
    pagenum: 1,
    // 是否正在加载
    loading: true
  },

  // 封装请求的方法 方便调用
  getGoods() {

    // 如果没有更多数据，就不用再请求
    if (this.data.hasMore == false) {
      return
    }

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
          goods: [...this.data.goods, ...goods],
          // 数据加载完成  更改加载状态
          loading: false
        })

        // 判断是否是最后一页
        if (this.data.goods.length >= message.total) {
          this.setData({
            hasMore: false
          })
        }
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
    // 需要等上一次的请求回来再执行下一页的请求
    if (this.data.loading === false) {
      // 页数+1
      this.setData({
        pagenum: this.data.pagenum + 1,
        // 每次发起请求前重新设置loading为正在加载
        loading: true
      })
    }
    this.getGoods();
  }


})