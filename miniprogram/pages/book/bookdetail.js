var pagenum = 1;
Page({
  data: {
    bookarr: [],
    nextshow: true,
    headshow: true,
    loading: false,
    text: "数据正在加载中..."
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://neepupro.mynatapp.cc/books',
      data: {
        book_name: getApp().globalData.test
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        //console.log(res['data'][0])
        //console.log(res['data'][1])
        //console.log(res['data'][2])
        //getDataArr(res)
        console.log(res['data'])

        if (res['data'].length == 20) {
          that.setData({
            nextshow: false,
          })
        }

        that.setData({
          bookarr: res['data'],
          loading: true
        })
      },
      fail: function (res) {
        console.log("failed")
        that.setData({
          text : "数据加载超时啦,试试重新检索吧"
        })
      }
    })
  },

  pagerequest: function (pagenum) {
    var that = this
    wx.request({
      url: 'https://neepupro.mynatapp.cc/pagebooks',
      data: {
        book_name: getApp().globalData.test,
        page_num: pagenum
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        //console.log(res['data'][0])
        //console.log(res['data'][1])
        //console.log(res['data'][2])
        //getDataArr(res)
        //console.log(res['data'])

        if (res['data'].length < 20) {
          console.log('visible')
          that.setData({
            nextshow: true
          })
        }

        if (res['data'].length == 20) {
          that.setData({
            nextshow: false
          })
        }

        that.setData({
          bookarr: res['data']
        })
      },
      fail: function (res) {
        console.log("failed")
      }
    })
  },

  onReady: function () {
    // Do something when page ready. 
  },
  onShow: function () {
    // Do something when page show. 
  },
  onHide: function () {
    // Do something when page hide. 
  },
  onUnload: function () {
    // Do something when page close. 
  },
  onPullDownRefresh: function () {
    // Do something when pull down 
  },
  // Event handler. 
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  nextpage: function () {
    pagenum += 1;
    this.pagerequest(pagenum)
    this.setData({
      headshow: false
    })
    this.goTop();
  },

  headpage: function () {
    pagenum -= 1;
    this.pagerequest(pagenum)
    if (pagenum == 1) {
      this.setData({
        headshow: true
      })
    }
    this.goTop();
  },

  viewtap: function (e) {
    wx.navigateTo({
      url: '/pages/book/bookinf'
    })
    console.log(e.currentTarget.dataset.id)
    getApp().globalData.bookid = e.currentTarget.dataset.id.substring(17)
  },
}) 