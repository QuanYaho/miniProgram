const app = getApp(); // 获取全局应用程序实例对象

Page({
      data: {
        movieData: [{
            key: 'in_theaters'
          },
          {
            key: 'coming_soon'
          },
          {
            key: 'new_movies'
          },
          {
            key: 'top250'
          }
        ]
      },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function(options) {
          wx.showLoading({
            title: '加载中...',
          })
          const tasks = this.data.movieData.map((value, index, array) => {
            return app.douban.find(value.key, 1, 8).then(d => {
              value.title = d.title
              value.movies = d.subjects
              return value
            })
          })
          Promise.all(tasks).then(res => {
            this.setData({
              movieData: res
            })
          })

        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function() {
          wx.hideLoading();
        }
      })