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
    loading: false
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
  }

})