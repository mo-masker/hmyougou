import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 保存输入的搜索参数
    keyword: '',
    // 商品数据
    goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    const { keyword } = options;

    this.setData({
      keyword
    }),

      // 传入参数请求商品列表数据
      request({
      url:"/goods/search",
      data:{
        // 参数 关键字
        query:this.data.keyword,
        // 页码
        pagenum:1,
        // 数据条数
        pagesize:10
      }
      }).then(res=>{
        // console.log(res)
        const { message } = res.data;

        // 遍历修改goods下面的价格
        const goods = message.goods.map(v => {
          // 给价格保留两个小数点
          v.goods_price = Number(v.goods_price).toFixed(2);
          return v;
        })

        this.setData({
          goods
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})