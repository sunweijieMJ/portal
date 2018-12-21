'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('./axios');

var _axios2 = _interopRequireDefault(_axios);

var _signFun = require('./signFun');

var _signFun2 = _interopRequireDefault(_signFun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseURL = 'https://api.lanehub.cn/';

// axios 配置
var Axios = _axios2.default.create({
  timeout: 6000,
  responseType: 'json',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
});

function apiAxios(method, url, params) {
  return new Promise(function (resolve, reject) {
    Axios({
      baseURL: baseURL,
      method: method,
      url: url,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      data: method === 'POST' || method === 'PUT' ? params : null
    }).then(function (res) {
      if (res.data.code === '00006') {
        resolve({ status: true, message: 'success', data: res.data.data });
      } else {
        reject({ status: false, message: res.data.message, data: null });
      }
    }).catch(function (err) {
      if (err) console.warn(err);
      reject({ status: false, message: '接口异常', data: null });
    });
  });
}

var outApi = {
  get: function get(url, params) {
    params.__platform = 'm';
    params.sign = _signFun2.default.signHash(url, params);
    return apiAxios('GET', url, params);
  },
  post: function post(url, params) {
    url = url + ((url.indexOf('?') === -1 ? '?' : '&') + 'lh_authinfo=' + encodeURIComponent(window.localStorage.lh_authinfo) + '&__platform=m');
    url = url + ('&sign=' + _signFun2.default.resignHash(url, params));
    return apiAxios('POST', url, params);
  }
};

exports.default = outApi;