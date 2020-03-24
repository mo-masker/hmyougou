// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 
    this.setData({
      address : wx.getStorageSync("address")
    })

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
  }


})