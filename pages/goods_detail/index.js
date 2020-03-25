import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品信息
    goodsInfo:[],
    // tab栏的索引值
    current:0,
    // 需要预览的图片数组
    picUrls:[]
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
      // console.log(res)
      const {message} = res.data;

      // 获取图片的链接，给预览图片的接口使用
      const picUrls  = message.pics.map(v=>{
        return v.pics_big
      })

      this.setData({
        goodsInfo:message,
        picUrls // 给预览图片接口使用
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
  },

  // 图片的点击预览事件
  handlePreview(e){
    // console.log(e)
    // 保存当前点击图片的索引值
    const {index} = e.currentTarget.dataset
    // 图片预览
    wx.previewImage({
      current: this.data.picUrls[index], // 当前显示图片的http链接
      urls: this.data.picUrls // 需要预览的图片http链接列表
    })
  },

  // 购物车按钮的点击事件
  handleTabcart(){
    wx.switchTab({
      url:"/pages/cart/index"
    })
  },

  // 加入购物车点击事件
  handleAddcart(){
    // 每次加入购物车之前先判断本地有没有数据，如果没有就等于空数组
    let goods = wx.getStorageSync("goods") || [];

    // 判断当前的商品是否保存在本地goods中
    // 存在就数量加1，不存在就unshift
    // some循环数组，只要有一个true就返回true，没有就返回false
    const have = goods.some(v =>{
      // 存在就数量加1
      if (v.goods_id === this.data.goodsInfo.goods_id){
        v.number += 1;
        // 提示
        wx.showToast({
          title: '数量+1',
          icon: 'success'
        })
      }
      return v.goods_id === this.data.goodsInfo.goods_id
    })

    // 如果本地没有存储当前商品数据
    if(!have){
      // 把当前的商品添加到本地的数组中
      goods.unshift({
        goods_id: this.data.goodsInfo.goods_id,
        goods_name: this.data.goodsInfo.goods_name,
        goods_price: this.data.goodsInfo.goods_price,
        goods_small_logo: this.data.goodsInfo.goods_small_logo,
        number: 1
      })
    }

    // 保存到本地
    wx.setStorageSync("goods", goods)
  }

})