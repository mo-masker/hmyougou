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
  }


})