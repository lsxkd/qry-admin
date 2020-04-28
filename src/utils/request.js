
import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'
import UtilsAes from "@/utils/utilsAes.js";
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  // console.log(config)
  config.headers = {
    // 'Content-Type':'application/x-www-form-urlencoded',
    'Content-Type':'application/json'
  }
  if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers['X-Token'] = getToken()
    config.headers.Authorization  = store.getters.token
  }
  // console.log(config)
  // console.log(config.encryptedOrNot)

  if(config.data && config.encryptedOrNot){
    let pas = UtilsAes.randomWord(false,16)
    let ak = UtilsAes.getRsaCode(pas)
    let ct = UtilsAes.encrypt(JSON.stringify(config.data), pas,"A1hqTqQYeZ2URKuD");
    // console.log("config.data")
    // console.log(config.data)
    config.data = {
      'ct':ct,
      'ak':ak
    }
    // console.log(config)
  }



  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  
  // response => {
  //   console.log(response)
  //   return response.data
  // },
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    // console.log(response.data)
    // return
    if(response.data && response.data.code){
      let res = response.data
      if(res.code == 200){
        // console.log(response.data)
        return response.data
      }else if (res.code === 402 || res.code === 403 || res.code === 401 ) {
        // 请自行在引入 MessageBox
        MessageBox.confirm('你已被登出或者token已过期，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }else{
        Message.error(res.msg)
      }
    }else{
      let resultData = JSON.parse(response.data)
      let Base64 = require('js-base64').Base64
      // console.log(resultData.ak)
      let ak = UtilsAes.getRsaCodeJie(resultData.ak);
      // console.log(ak)
      let ct = UtilsAes.decrypt(resultData.ct, Base64.decode(ak), "A1hqTqQYeZ2URKuD");
      // console.log(ct)
      if(UtilsAes.isString(ct)){
        response.data = JSON.parse(ct)
      }else{
        response.data = ct
      }
      let res = response.data
      if(res.code == 200){
        // console.log(response.data)
        return response.data
      }else if (res.code === 402 || res.code === 403 || res.code === 401 ) {
        // 请自行在引入 MessageBox
        MessageBox.confirm('你已被登出或者token已过期，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }else{
        Message.error(res.msg)
      }
      return response.data
    }

    return
    if(JSON.parse(response.data).ct){
      let resultData = JSON.parse(response.data)
      let Base64 = require('js-base64').Base64
      // console.log(resultData.ak)
      let ak = UtilsAes.getRsaCodeJie(resultData.ak);
      // console.log(ak)
      let ct = UtilsAes.decrypt(resultData.ct, Base64.decode(ak), "A1hqTqQYeZ2URKuD");
      // console.log(ct)
      if(UtilsAes.isString(ct)){
        response.data = JSON.parse(ct)
      }else{
        response.data = ct
      }
      return response.data
    }else{
      let res = response.data
      if(res.code == 200){
        console.log(response.data)
        return response.data
      }else if (res.code === 402 || res.code === 403 || res.code === 401 ) {
        // 请自行在引入 MessageBox
        MessageBox.confirm('你已被登出或者token已过期，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }else{
        Message.error(res.msg)
      }
      // if (res.code !== 200) {
      //   if (res.code === 402 || res.code === 403 || res.code === 401 ) {
      //     // 请自行在引入 MessageBox
      //     MessageBox.confirm('你已被登出或者token已过期，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //       confirmButtonText: '重新登录',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(() => {
      //       store.dispatch('FedLogOut').then(() => {
      //         location.reload() // 为了重新实例化vue-router对象 避免bug
      //       })
      //     })
      //   }else{
      //     Message.error(res.msg)
      //   }
      //   return Promise.reject(res.msg)
      // } else {
      //   return response.data
      // }
    }
    

    // const res = response.data

    // // console.log(res.code);
    // if (res.code !== 200) {
    //   // console.log(res.msg)
    //   // Message.error(res.msg)
    //   // Message({
    //   //   message: res.msg,
    //   //   type: 'error',
    //   //   duration: 3 * 1000
    //   // })
    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 402 || res.code === 403 || res.code === 401 ) {
    //     // 请自行在引入 MessageBox
    //     MessageBox.confirm('你已被登出或者token已过期，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload() // 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }else{
    //     Message.error(res.msg)
    //   }
    //   return Promise.reject(res.msg)
    // } else {
    //   // console.log(200)
    //   return response.data
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
