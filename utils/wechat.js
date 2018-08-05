// 登陆
function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: resolve,
      fail: reject
    })
  })
}

// 获取用户信息
function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: resolve,
      fail: reject
    })
  })
}

// 设置本地数据缓存
function setStorage(key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key: key,
      data: value,
      success: resolve,
      fail: reject
    })
  })
}
// 获取本地数据缓存
function getStorage(key) {
  return new Promise((resolve,reject)=> {
    wx.getStorage({
      key: key,
      success: resolve,
      fail: reject
    })
  })
}
// 获取当前的地理位置、速度。
function getLocation(type) {
  return new Promise((resolve,reject)=>{
    wx.getLocation({
      type: type,
      success: resolve,
      fail: reject
    })
  })
}

module.exports = {
  login,
  getUserInfo,
  setStorage,
  getStorage,
  getLocation,
  original: wx
}