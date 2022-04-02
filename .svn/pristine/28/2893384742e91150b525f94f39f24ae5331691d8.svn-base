import axios from 'axios';
import router from '../router';
import { Message } from 'element-ui';
import Vue from 'vue';

function getBaseUrl () {
  let url;
  if (process.env.NODE_ENV === 'development') {
    url = process.env.API_ROOT;
  } else {
    url = window.location.origin + Vue.prototype.baseConfig.BASE_URL;
  }
  return url;
}

// 自定义判断元素类型
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull (o) {
  for (let key in o) {
    if (o.hasOwnProperty(key)) {
      if (o[key] === null) {
        delete o[key]
      }
      if (toType(o[key]) === 'string') {
        o[key] = o[key].trim()
      } else if (toType(o[key]) === 'object') {
        o[key] = filterNull(o[key])
      } else if (toType(o[key]) === 'array') {
        o[key] = filterNull(o[key])
      }
    }
  }
  return o
}

function apiAxios (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params);
  } else {
    params = new URLSearchParams();
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: getBaseUrl(),
    withCredentials: true
  }).then(function (res) {
    if (Number(res.data.statusCode) === 0) {
      if (success) {
        res.data ? success(res.data) : success(res.result)
      }
    } else if (Number(res.data.statusCode) === 2) {
      router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath }
      });
    } else {
      if (failure) {
        failure(res.data);
      }
      if (['loginValid', 'process/test'].filter(eApi => url.includes(eApi)).length) {
        return success(res.data)
      }
      if (res.data.message) {
        Message.error({ message: res.data.message });
      } else {
        Message.error({ message: '系统错误' });
        console.log(res.config.data);
      }
    }
  }).catch(function (err) {
    console.log(err);
    let res = err.response;
    if (err) {
      Message.error({ message: err.message });
    }
  })
}

// http request
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      let data = new URLSearchParams();
      data.append('token', sessionStorage.getItem('token'));
      if (config.method === 'post') {
        config.data ? config.data.set('token', sessionStorage.getItem('token')) : '';
      } else {
        config.params ? config.params.set('token', sessionStorage.getItem('token')) : '';
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

// http response
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误(400)'; break;
        case 401: error.message = '未授权，请重新登录(401)'; break;
        case 403: error.message = '拒绝访问(403)'; break;
        case 404: error.message = '请求出错(404)'; break;
        case 408: error.message = '请求超时(408)'; break;
        case 500: error.message = '服务器错误(500)'; break;
        case 501: error.message = '服务未实现(501)'; break;
        case 502: error.message = '网络错误(502)'; break;
        case 503: error.message = '服务不可用(503)'; break;
        case 504: error.message = '网络超时(504)'; break;
        case 505: error.message = 'HTTP版本不受支持(505)'; break;
        default: error.message = `连接出错(${error.response.status})!`;
      }
    } else {
      console.log(error);
      error ? error.message = '连接服务器失败!' : '';
    }
    Message.error({ message: error.message });
    return Promise.reject(error)
  }
);

export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  login: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  downUrl: function () {
    return getBaseUrl()
  }
}
