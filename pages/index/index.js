import request from "../../utils/request.js"
Page({
  data: {
    // 轮播图的数据
    banners: []
  },
  onLoad() {
    // 请求轮播图的数据
    request({
      url: "/home/swiperdata"
    }).then(res => {
      // console.log(res)
      const { message } = res.data
      this.setData({
        banners: message
      })

    })
  }
})