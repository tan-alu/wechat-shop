//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env:'tan-vzf5z'
    })
  },
  globalData: {
    userInfo: null
  }
})