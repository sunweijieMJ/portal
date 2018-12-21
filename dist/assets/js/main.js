'use strict';

var _AxiosPlugin = require('./AxiosPlugin');

var _AxiosPlugin2 = _interopRequireDefault(_AxiosPlugin);

var _signFun = require('./signFun');

var _signFun2 = _interopRequireDefault(_signFun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dom元素
var button = document.querySelector('.form .code [type="button"]');
var submit = document.querySelector('.form [type="submit"]');
var error = document.querySelector('.form .error');
// 文本
button.innerHTML = '获取验证码';
error.innerHTML = '';

// 获取验证码
button.addEventListener('click', function () {
  var mobile = document.querySelector('.form .mobile input').value;
  if (button.innerHTML !== '获取验证码' || !checkTel(mobile)) return;

  _AxiosPlugin2.default.get('/validate_code', { mobile: mobile }).then(function (res) {
    var overTime = 60000;
    var timer = null;
    leftTime();
    function leftTime() {
      window.clearInterval(timer);
      timer = window.setInterval(function () {
        overTime = overTime - 1000;

        button.classList.remove('text');
        button.classList.add('num');
        button.innerHTML = overTime / 1000 + 's';
        if (overTime <= 0) {
          window.clearInterval(timer);
          button.classList.remove('num');
          button.classList.add('text');
          button.innerHTML = '获取验证码';
        }
      }, 1000);
    }
  }).catch(function (err) {
    console.log(err);
  });
}, false);

// 点击上网
submit.addEventListener('click', function () {
  var mobile = document.querySelector('.form .mobile input').value;
  var code = document.querySelector('.form .code input').value;

  if (checkTel(mobile) && checkCode(code)) {
    _AxiosPlugin2.default.post('/dynamic_login', { mobile: mobile, code: code }).then(function (res) {
      var params = { store_id: 2, mobile: 13818234979, service: parseUrl().service };
      var url = 'https://equipment.jxu.dev.weiheinc.com/api/portal/create_ticket?' + _signFun2.default.urlConcat(params);
      fetch(url, { method: 'GET' }).then(function (response) {
        response.json().then(function (res) {
          console.log(res);
          if (res.status) {
            window.location.href = res.data.url;
          }
        });
      });
      return;

      _AxiosPlugin2.default.get('/api/portal/create_ticket', { store_id: 2, mobile: mobile, service: parseUrl().service }).then(function (res) {
        if (res.status) {
          window.location.href = res.data.url;
        }
      }).catch(function (err) {
        error.innerHTML = err.message;
      });
    }).catch(function (err) {
      error.innerHTML = err.message;
    });
  }
}, false);

// 手机号验证
function checkTel(phone) {
  var tel = /^1[3|4|5|7|8][0-9]\d{8}$/;

  if (phone === '') {
    error.innerHTML = '请输入手机号';
  } else if (!tel.test(phone)) {
    error.innerHTML = '手机号不正确';
  } else if (tel.test(phone)) {
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
  var u = window.navigator.userAgent;
  var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  var flag = true;
  for (var i = 0, LEN = Agents.length; i < LEN; i++) {
    if (u.indexOf(Agents[i]) !== -1) {
      flag = false;
      break;
    }
  }
  return flag;
}
// 解析queryString
function parseUrl() {
  var url = window.location.search;
  if (url.indexOf('?') !== -1) {
    var str = url.substr(1);
    var strs = str.split('&');
    var response = {};
    for (var i = 0, LEN = strs.length; i < LEN; i++) {
      response[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
    return response;
  } else {
    return {};
  }
}