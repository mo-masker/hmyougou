import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品信息
    goodsInfo:[],
    // tab栏的索引值
    current:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    const id = options.id;
    request({
      url: "/goods/detail",
      data: {
        goods_id: id
      }
    }).then(res => {
      console.log(res)
      const {message} = res.data;

      this.setData({
        goodsInfo:message
      })
    })
  },

  // 商品详情栏的点击事件
  handleTab(e){
    // console.log(e)
    // 保存点击的当前tab栏的索引值
    const {index} = e.currentTarget.dataset

    this.setData({
      current:index
    })
  }


})