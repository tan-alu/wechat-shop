// 获取数据流
const db = wx.cloud.database()
// 获取集合
const goods= db.collection('goods')
Page({
  data:{
    goods:[],
    _page:0,
    hasMore:true//是否有更多数据可加载
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
      _page:++_page,
      hasMore:res.data.length===LIMIT
    })
  },
  // 上拉刷新
  onReachBottom(){

    // 没有更多数据的时候
    if(!this.data.hasMore){
      return console.log('没有更多数据了')
    }
    console.log('shuaxin')
    this.loadListData()
  }
})