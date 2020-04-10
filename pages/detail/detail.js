const db = wx.cloud.database()
const goods = db.collection('goods')
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {id} = options
    // console.log('id',id)
    this.loadListData(id)
  },
  // 详情数据
 async loadListData(id){
  let res = await goods.doc(id).get()
  console.log(res)
  this.setData({
    detail:res.data
  })
  }

 

  
})