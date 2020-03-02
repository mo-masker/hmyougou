import request from "../../utils/request.js"
Page({
  data: {
    // 轮播图的数据
    banners: [],
    // 导航菜单的数据
    menus: [],
    // 楼层的数据
    floors:[],
    // 页面是否滚动
    isShowTop:""
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
  },

  // 回到顶部点击事件
  handleTotop(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  // 页面滚动触发事件的处理函数
  // 监听用户滑动页面事件
  onPageScroll(e){
    console.log(e)
    const { scrollTop } = e;
    // 保存当前的显示状态
    let isShow = this.data.isShowTop;

    // 判断如果滚动高度大于100，显示回到顶部的按钮
    if (scrollTop > 100){
      isShow = true
    }else {
      isShow = false;
    }

    // 避免频繁的操作setData，所以如果下面两个值是相同就没必要再赋值了
    if(isShow === isShowTop) return;

    this.setData({
      isShowTop:isShow
    })
  }
})