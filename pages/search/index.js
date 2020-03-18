import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue: '',
    // 上一次输入框输入请求的值
    lastValue: '',
    // 推荐的内容列表
    recommend: [],
    // 加载的状态
    loading: false,
    // 本地存储的历史记录
    history:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取本地存储的关键字
    let arr = wx.getStorageSync("history")
    // 如果arr没有数据或不是一个数组，就把它变成一个数组
    if (!Array.isArray(arr)) {
      arr = []
    }
    this.setData({
      history:arr
    })
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
    // value为空就返回  有值继续请求
    if (!value) {
      // 把搜索建议的数组清空
      this.setData({
        recommend: []
      })
      return;
    }

    this.getRecommend();
  },

  // 封装的请求搜索建议方法
  getRecommend() {
    if (this.data.loading == false) {
      this.setData({
        loading: true,
        lastValue: this.data.inputValue
      })

      // 请求搜索建议
      request({
        url: "/goods/qsearch",
        data: {
          query: this.data.inputValue
        }
      }).then(res => {
        // console.log(res)
        const {
          message
        } = res.data;

        // 把搜索返回的数据保存到recommend
        this.setData({
          recommend: message,
          // 数据加载完成后 更改加载状态
          loading: false
        })
        // 判断inputValue的值是最新的，如果不是再重新请求
        if (this.data.inputValue !== this.data.lastValue) {
          this.getRecommend();
        }
      })

    }

  },
  // 取消按钮的点击事件
  handleCancel() {
    this.setData({
      inputValue: "",
      recommend: ''
    })
  },

  // 按下回车键时触发的事件
  handleEnter(){
    // 每次保存前先把本地的数据获取回来
    let arr = wx.getStorageSync("history")
    // 如果arr没有数据或不是一个数组，就把它变成一个数组
    if(!Array.isArray(arr)){
      arr = []
    }
    // 把搜索关键字保存到本地
    // 先把输入的关键字添加到数组里第一位
    arr.unshift(this.data.inputValue)
    // 数组去重
    arr = [...new Set(arr)]
    // 然后存储
    wx.setStorageSync("history",arr)
    //关闭当前页面，跳转页面 传参
    wx.redirectTo({
      url:"/pages/goods_list/index?keyword="+this.data.inputValue
    })
  }
})