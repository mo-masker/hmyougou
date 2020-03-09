// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 监听输入框的输入事件
  handleInput(e) {
    // console.log(e.detail);
    const {
      value
    } = e.detail;

    this.setData({
      inputValue: value
    })
  }

})