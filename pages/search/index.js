import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue: '',
    recommend:''
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
    if(!value) return;

    // 请求搜索建议
    request({
      url:"/goods/qsearch",
      data:{
        query:value
      }
    }).then(res=>{
      // console.log(res)
      const {message} = res.data;

      this.setData({
        recommend:message
      })
    })
  }

})