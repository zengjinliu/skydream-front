/*
ajax请求函数封装模块
  url:请求路径
  data:请求参数，默认为空(是一个对象)
  type:请求方式,默认是GET
  返回值：promise对象(异步返回的数据是：response.data)
*/

import axios from 'axios'
import Vue from 'vue'
import VueRouter from '../router'

//请求地址
export const url = 'http://localhost:8080/skydream';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8080/skydream';

/**
 * 请求拦截
 */
axios.interceptors.request.use(config => {
  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
axios.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
    clearLoginInfo()
    VueRouter.push({path: '/login'})
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default function ajax(url, data = {}, type = 'GET') {
  /*高阶函数*/
  return new Promise(function (resolve, reject) {
    let promise
    if (type === "GET") {
      //准备url query参数数据
      let dataStr = '';//数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })

      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送 get 请求
      promise = axios.get(url)
    } else {
      // 发送 post 请求
      promise = axios.post(url, data)
    }
    //成功了调用resolve
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      //失败了调用reject
      reject(error);
    })
  });
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  Vue.cookie.delete('token')
}

