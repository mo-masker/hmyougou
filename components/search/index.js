// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 组件可以传递的值
    keyword:{
      type:String,
      value: "搜索" // 这个是默认值，类似于vue里面的default
    }
  },
  // 外部扩展的样式  声明接收的样式
  externalClasses: ['my-class'],

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
