/**
 * WeChat API 模块
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
const wechat = require('./utils/wechat.js')

/**
 * Douban API 模块
 * @type {Object}
 */
const douban = require('./utils/douban.js')

/**
 * Baidu API 模块
 * @type {Object}
 */
const baidu = require('./utils/baidu.js')

/**
 * Global shared
 * 可以定义任何成员，用于在整个应用中共享
 */
App({
  data: {
    name:'豆瓣电影',
    version:'v1',
    currentCity:'深圳'
  },
  wechat: wechat,
  douban: douban,
  baidu: baidu,
    /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch() {
    // 获取当前城市名称
    wechat.getLocation().then(res=>{
      // console.log(res);
      const { latitude, longitude } = res;
      return baidu.getCityName(latitude, longitude);
    }).then(city=>{
     city = city.replace('市',''); // 去掉市字
      this.data.currentCity = city;
      }).catch(err => {
        console.error(err)
      })
  }
})