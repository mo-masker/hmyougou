// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    // 本地的商品列表
    goods:[],
    // 总价格
    allprice:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取本地的收货数据
    this.setData({
      // 如果本地没有address就等于一个空对象
      address : wx.getStorageSync("address") || {}
    })

  },
  // 因为data和onload只会执行一次，所以需要在每次打开页面都获取一次本地的数据
  onShow(){
    this.setData({
      goods: wx.getStorageSync("goods") || []
    })

    this.handleAllprice()
    
  },

  // 获取收货地址
  handleGetAddress() {
    wx.chooseAddress({
      success: (res) => {

        this.setData({
          address: {
            // 姓名
            name: res.userName,
            // 电话
            tel: res.telNumber,
            // 地址
            detailAddress: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }

        })
        // 把地址数据保存到本地
        wx.setStorageSync("address", this.data.address)
      }
    })
  },

  // 计算总价格
  handleAllprice() {
    let price = 0;
    // 循环添加商品的价格
    this.data.goods.forEach(v => {
      price += v.goods_price
    })
    // 修改总价格
    this.setData({
      allprice: price
    })
  },

  // 点击加号事件
  handleCalc(e){
    // 保存当前点击数据的索引值
    const { index } = e.currentTarget.dataset
    // 给当前点击的商品数量 +1
    this.data.goods[index].number += 1;
    // 刷新数据
    this.setData({
      goods: this.data.goods
    })
  }


})