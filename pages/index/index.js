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
  //  停止下拉刷新
  wx.stopPullDownRefresh()
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
      await ml_showToast('没有更多数据了')
    }
    console.log('shuaxin')
    this.loadListData()
  },
  // 下拉刷新
  onPullDownRefresh(){
    console.log('下拉刷新')
    // 重置
    this.setData({
      goods:[],
      _page:0,
      hasMore:true
    })
    this.loadListData()
  }
})