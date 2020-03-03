// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 记录当前点击的菜单
    current:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 菜单项的点击事件
  handleClick(e){
    // console.log(e)
    // 获取索引值
    const {index} = e.currentTarget.dataset;

    // 保存当前点击的索引值
    this.setData({
      current:index
    })
  }
})