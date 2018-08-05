const app = getApp()
Page({
  data: {
  title:'',
  subtitle:'加载中...',
  type: 'in_theaters',
  hasMore:true,
  page:1,
  size:20,
  movies:[]
  },
loadMore() {
  if(!this.data.hasMore) return
  wx.showLoading({
    title: '加载中...'
  })
  this.setData({
    subtitle: '加载中...'
  })
  // find(type, page = 1, count = 20, search = '') 
  return app.douban.find(this.data.type, this.data.page++, this.data.size).then(d=>{
    console.log(d)
    if (d.subjects.length) {
      this.setData({
        subtitle: d.title,
        movies:this.data.movies.concat(d.subjects)
      })
    } else {
      this.setData({
        subtitle: d.title,
        hasMore:false
      })
      wx.hideLoading()
    }
  }).catch(e => {
    this.setData({ subtitle: '获取数据异常' })
    console.error(e)
    wx.hideLoading()
  })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.title = options.title
    this.data.type = options.type
    this.loadMore()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({ title: this.data.title})
    wx.hideLoading()
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh() {
    this.setData({ movies: [], page: 1, hasMore: true })
    this.loadMore()
      .then(() => {
        return wx.stopPullDownRefresh()
      })
  },
  onReachBottom() {
    this.loadMore()
  }
})