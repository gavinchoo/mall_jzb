import fetch from 'isomorphic-fetch'
import {message} from 'antd'
import * as CONFIG from '../config'

import StringUtil from '../utils/stringutil'

export function requestPost(route, opt){
    request(route, {}, opt.props, opt.success, opt.error,
      {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(opt.body)
      })
}

export function requestGet(route, opt){
    request(route, {}, opt.props, opt.success, opt.error,
      {
          method: 'POST',
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body: StringUtil.bodyUrlencoded(opt.body)
      })
}

export function request(route, params, props, success = null, error = null, {method = 'GET', headers = {}, body = null} = {}) {
    // dispatch({ type: TYPES.REQUEST_PEDDING, [pendingTasks]: begin })
    // if (method !== 'GET') dispatch({ type: TYPES.REQUEST_LOADING })
    // 处理query
    const p = params ? '?' + Object.entries(params).map((i) => `${i[0]}=${encodeURI(i[1])}`).join('&') : '';
    const uri = `${ CONFIG.API_URI }${ route }${ p }`;

    var token = sessionStorage.getItem('token')
    console.log('cache token === ' + token)
    if (token !== 'undefined' && token != null) {
        headers['Authorization'] = token
    }

    let data = {method: method, headers: headers}
    if (method !== 'GET') data.body = body
    console.log(`[${method}]:${uri}`)
    fetch(uri, data)
      .then((response) => {
          if (response.status === 200) {
              return response.json()
          } else {
              return {code: response.status, message: response.message}
          }
      })
      .then((result) => {
          console.log(result)
          if (route == '/api/accesstoken') {
              sessionStorage.setItem('token', result.token)
          }
          if (result.code != undefined) {
              // if (method !== 'GET') dispatch({ type: TYPES.REQUEST_SUCCESS })
              if (result.code === 400) {
                  // dispatch({ type: TYPES.LOGGED_OUT })
              } else if (result.code === 401) {
                  message.warn('登录认证已过期，请从新登录')
                  error && error(result)
                  props.history.push('/admin')
              } else {
                  // dispatch({ type: TYPES.REQUEST_ERROR, ...data })
                  error && error(result)
              }
          } else {
              success && success(result)
          }
      })
      .catch((err) => {
          console.warn(err)
      })
}