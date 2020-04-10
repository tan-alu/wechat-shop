// 获取数据流
const db = wx.cloud.database()
// 获取集合
const goods= db.collection('goods')
Page({
  data:{
    goods:[],
    _page:0
  },
  onLoad(){
    this.loadListData()
  },
  // 列表数据
  async loadListData(){
    //限制5条
    const LIMIT = 5
    let {_page}  = this.data
    // let {_page,goods}=this.data
    let res = await goods.limit(LIMIT).skip( _page * LIMIT).get()
    console.log(res)
    this.setData({
      // goods:[...goods,...res.data],
      goods:res.data,
      _page:++_page
    })
  },
  // 上拉刷新
  onReachBottom(){
    console.log('shuaxin')
    this.loadListData()
  }
})