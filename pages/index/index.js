import request from "../../utils/request.js"
Page({
  data: {
    // 轮播图的数据
    banners: [],
    // 导航菜单的数据
    menus: [],
    // 楼层的数据
    floors:[]
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

    // 请求中间导航的接口
    request({
      url: "/home/catitems"
    }).then(res => {
      // console.log(res)
      const {
        message
      } = res.data;

      // 循环添加跳转链接
      const newData = message.map((v, i) => {
        // 判断更改导航菜单的跳转路径
        // 更改分类的跳转路径
        if (i === 0) {
          v.url = "/pages/category/index"
        }
        // 然后把更改后的数据返回，再保存到munus中
        return v;
      })
      this.setData({
        menus: newData
      })
    })

    // 请求楼层分类的数据
    request({
      url:"/home/floordata"
    }).then(res=>{
      // console.log(res)
      const { message } = res.data;

      this.setData({
        floors:message
      })
    })
  }
})