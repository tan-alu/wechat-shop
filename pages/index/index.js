// 获取数据流
const db = wx.cloud.database()
// 获取集合
const goods= db.collection('goods')

// 引入异步操作
import {ml_showToast,ml_hideLoading,ml_showLoading} from '../../utils/asyncWX'
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

    await ml_showLoading()
    let res = await goods.limit(LIMIT).skip( _page * LIMIT).get()
   await ml_hideLoading()
    console.log(res)
    this.setData({
      // goods:[...goods,...res.data],
      goods:res.data,
      _page:++_page,
      hasMore:res.data.length===LIMIT
    })
  },
  // 上拉刷新
 async onReachBottom(){

    // 没有更多数据的时候
    if(!this.data.hasMore){
      // return console.log('没有更多数据了')
      await ml_showToast()
    }
    console.log('shuaxin')
    this.loadListData()
  }
})