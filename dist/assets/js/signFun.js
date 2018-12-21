'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _md = require('./md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sign_key = '6abcc6172819ead01b0d75758eb6a3c7';

// 参数排序
function objKeySort(arys) {
  var newkey = Object.keys(arys).sort();
  var newObj = {};
  for (var i = 0, LEN = newkey.length; i < LEN; i++) {
    newObj[newkey[i]] = arys[newkey[i]];
  }
  return newObj;
}

// get签名
function signHash(url, oldparams) {
  var _oldparams = JSON.parse(JSON.stringify(oldparams));
  _oldparams.sign = '';
  try {
    _oldparams.lh_authinfo = decodeURIComponent(window.localStorage.lh_authinfo || '');
  } catch (error) {
    _oldparams.lh_authinfo = '';
  }
  /* oldparams.__platform='web'; */
  var params = objKeySort(_oldparams);
  var arr = [];
  var _params = '';
  var locks = '';
  for (var key in params) {
    _params = params[key];
    if (Array.isArray(_params)) {
      var a = _params.reduce(function (l, r) {
        return JSON.stringify(l) + JSON.stringify(r);
      });
      arr.push(a);
    } else {
      arr.push(_params);
    }
  }
  locks = arr.join('') + sign_key;
  return (0, _md2.default)(locks);
}

// post签名
function resignHash(url, data) {
  // url解析
  var response = {};
  if (url.indexOf('?') !== -1) {
    url = url.split('?')[1];
    var strs = url.split('&');
    for (var i = 0, LEN = strs.length; i < LEN; i++) {
      response[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
  }
  // url排序
  var params = objKeySort(response);
  var arr = [];
  var _params = '';
  for (var key in params) {
    _params = params[key];
    if (Array.isArray(_params)) {
      var a = _params.reduce(function (l, r) {
        return JSON.stringify(l) + JSON.stringify(r);
      });
      arr.push(a);
    } else {
      arr.push(_params);
    }
  }

  var locks = JSON.stringify(data) + arr.join('') + sign_key;
  return (0, _md2.default)(locks);
}

// url解析
function urlConcat(data) {
  var url = '';
  for (var k in data) {
    var value = data[k] !== undefined ? data[k] : '';
    url += '&' + k + '=' + encodeURIComponent(value);
  }
  return url ? url.substring(1) : '';
}

exports.default = { signHash: signHash, resignHash: resignHash, urlConcat: urlConcat };