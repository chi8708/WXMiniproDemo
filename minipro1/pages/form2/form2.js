// pages/form2/form2.js
//模块导入
import module1 from '../../utils/export1'
const util= require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    richTxt: "<b>dddd</b>richtext不能有事件 图片支持外部资源，不能是本地图片",
    dataFieldA: '123',
    dataFieldB: '456',
    staffA: {firstName: 'Hulk', lastName: 'Hu'},
    staffB: {firstName: 'Shang', lastName: 'You'},
    staffC: {firstName: 'Gideon', lastName: 'Lin'}
  },
  onLoad(){
    module1.sayHello();
    const dateNow= util.formatTime(new Date());
    console.log(dateNow);
  },
  txtInput: function (e) {
    this.setData({
      num: e.detail.value || 0
    })
  },
  btnAdd() {
    if (typeof this.data.num != "number") {
      this.data.num = 0;
    }
    this.setData({
      num: ++this.data.num
    });
  },
  showLoading() {
    wx.showLoading({
      title: '加载中',
      duration: 2000
    })
  },
  showAlert() {
    wx.showToast({
      title: '弹窗',
      icon: 'success',
      duration: 2000
    })
  },
  showModel() {
    wx.showModal({
      title: 'showModal',
      content: '测试丫丫',
      complete: (res) => {
        if (res.cancel) {
          this.showAlert();
        }
        if (res.confirm) {
          this.showLoading();
        }
      }
    })
  },
  getUserInfo(e){
    console.log(e);
  },
  getPhoneNumber(e){
    console.log(e);
  },
  getContact(e){
    console.log(e);
  },
  redirect(){
    wx.navigateTo({
      url: '/pages/form1/form1?id=1',
    })
  }
})