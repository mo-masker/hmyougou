import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 记录当前点击的菜单
    current:0,
    // 保存分类数据
    categoryList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求分类数据
    request({
      url:"/categories"
    }).then(res=>{
      // console.log(res)
      const {message} = res.data;

      this.setData({
        categoryList:message
      })
    })
  },

  onShow() {
    // 自定义tab使用
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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