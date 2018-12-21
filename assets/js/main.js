import Axios from './AxiosPlugin';
import linsign from './signFun';
// dom元素
const button = document.querySelector('.form .code [type="button"]');
const submit = document.querySelector('.form [type="submit"]');
const error = document.querySelector('.form .error');
// 文本
button.innerHTML = '获取验证码';
error.innerHTML = '';

// 获取验证码
button.addEventListener('click', () => {
  const mobile = document.querySelector('.form .mobile input').value;
  if((button.innerHTML !== '获取验证码') || !checkTel(mobile)) return;
  
  Axios.get('/validate_code', { mobile, forgot:0 }).then(res => {
    let overTime = 60000;
    let timer = null;
    leftTime();
    function leftTime() {
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        overTime = overTime - 1000;

        button.classList.remove('text');
        button.classList.add('num');
        button.innerHTML = `${overTime / 1000}s`;
        if (overTime <= 0) {
          window.clearInterval(timer);
          button.classList.remove('num');
          button.classList.add('text');
          button.innerHTML = '获取验证码';
        }
      }, 1000);
    }
  }).catch(err => {
    console.log(err);
  });
}, false);

// 点击上网
submit.addEventListener('click', () => {
  const mobile = document.querySelector('.form .mobile input').value;
  const code = document.querySelector('.form .code input').value;

  if(checkTel(mobile) && checkCode(code)) {
    Axios.post('/dynamic_login', { mobile, code}).then(res => {
      const params = { store_id: 2, mobile, service: parseUrl().service };
      const url = `https://portal.weiheinc.com/api/portal/create_ticket?${linsign.urlConcat(params)}`;
      fetch(url, { method: 'GET' }).then(response => {
        response.json().then(res => {
          console.log(res);
          if (res.status) {
            window.location.href = res.data.url;
          }
        });
      });
      return;

      Axios.get('/api/portal/create_ticket', { store_id: 2, mobile, service: parseUrl().service }).then(res => {
        if (res.status) {
          window.location.href = res.data.url;
        }
      }).catch(err => {
        error.innerHTML = err.message;
      });
    }).catch(err => {
      error.innerHTML = err.message;
    });
  }
}, false);

// 手机号验证
function checkTel(phone) {
  const tel = /^1[3|4|5|7|8][0-9]\d{8}$/;

  if(phone === ''){
    error.innerHTML = '请输入手机号';
  } else if(!tel.test(phone)){
    error.innerHTML = '手机号不正确';
  } else if(tel.test(phone)){
    error.innerHTML = '';
    return true;
  }
}
// 验证码验证
function checkCode(code) {
  if (!code) {
    error.innerHTML = '请输入验证码';
  } else if (code.length !== 4) {
    error.innerHTML = '请输入4位验证码';
  } else if (code.length === 4) {
    error.innerHTML = '';
    return true;
  }
}
// 终端判断
function isDeskTop() {
  const u = window.navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  for (let i = 0, LEN = Agents.length; i < LEN; i++) {
    if (u.indexOf(Agents[i]) !== -1) {
      flag = false;
      break;
    }
  }
  return flag;
}
// 解析queryString
function parseUrl() {
  const url = window.location.search;
  if (url.indexOf('?') !== -1) {
    const str = url.substr(1);
    const strs = str.split('&');
    const response = {};
    for (let i = 0, LEN = strs.length; i < LEN; i++) {
      response[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
    return response;
  } else {
    return {};
  }
}