// 获取数据流
const db = wx.cloud.database()
// 获取集合
const goods= db.collection('goods')
Page({
  data:{
    goods:[]
  },
  onLoad(){
    this.loadListData()
  },
  async loadListData(){
    let res =await goods.get()
    console.log(res)
    this.setData({
      goods:res.data
    })
  }
})