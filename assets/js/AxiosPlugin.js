import axios from './axios';
import linsign from './signFun';
const baseURL = 'https://portal.weiheinc.com/';

// axios 配置
const Axios = axios.create({
  timeout: 6000,
  responseType: 'json',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
});

function apiAxios(method, url, params) {
  return new Promise((resolve, reject) => {
    Axios({
      baseURL,
      method,
      url,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      data: method === 'POST' || method === 'PUT' ? params : null
    }).then((res) => {
      if (res.data.code === '00006') {
        resolve({ status: true, message: 'success', data: res.data.data });
      } else {
        reject({ status: false, message: res.data.message, data: null });
      }
    }).catch((err) => {
      if (err) console.warn(err);
      reject({ status: false, message: '接口异常', data: null });
    });
  });
}

const outApi = {
  get: (url, params) => {
    params.__platform = 'm';
    params.sign = linsign.signHash(url, params);
    return apiAxios('GET', url, params);
  },
  post: (url, params) => {
    url = url + `${url.indexOf('?') === -1 ? '?' : '&'}lh_authinfo=${encodeURIComponent(window.localStorage.lh_authinfo)}&__platform=m&app=i-lanehub&version=3.0`;
    url = url + `&sign=${linsign.resignHash(url, params)}`;
    return apiAxios('POST', url, params);
  }
};

export default outApi;
