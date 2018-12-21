"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = md5;
function safe_add(d, _) {
  var m = (65535 & d) + (65535 & _);return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m;
}function bit_rol(d, _) {
  return d << _ | d >>> 32 - _;
}function md5_cmn(d, _, m, r, n, t) {
  return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(r, t)), n), m);
}function md5_ff(d, _, m, r, n, t, f) {
  return md5_cmn(_ & m | ~_ & r, d, _, n, t, f);
}function md5_gg(d, _, m, r, n, t, f) {
  return md5_cmn(_ & r | m & ~r, d, _, n, t, f);
}function md5_hh(d, _, m, r, n, t, f) {
  return md5_cmn(_ ^ m ^ r, d, _, n, t, f);
}function md5_ii(d, _, m, r, n, t, f) {
  return md5_cmn(m ^ (_ | ~r), d, _, n, t, f);
}function binl_md5(d, _) {
  d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;var m,
      r,
      n,
      t,
      f,
      i = 1732584193,
      h = -271733879,
      e = -1732584194,
      a = 271733878;for (m = 0; m < d.length; m += 16) {
    r = i, n = h, t = e, f = a, h = md5_ii(h = md5_ii(h = md5_ii(h = md5_ii(h = md5_hh(h = md5_hh(h = md5_hh(h = md5_hh(h = md5_gg(h = md5_gg(h = md5_gg(h = md5_gg(h = md5_ff(h = md5_ff(h = md5_ff(h = md5_ff(h, e = md5_ff(e, a = md5_ff(a, i = md5_ff(i, h, e, a, d[m], 7, -680876936), h, e, d[m + 1], 12, -389564586), i, h, d[m + 2], 17, 606105819), a, i, d[m + 3], 22, -1044525330), e = md5_ff(e, a = md5_ff(a, i = md5_ff(i, h, e, a, d[m + 4], 7, -176418897), h, e, d[m + 5], 12, 1200080426), i, h, d[m + 6], 17, -1473231341), a, i, d[m + 7], 22, -45705983), e = md5_ff(e, a = md5_ff(a, i = md5_ff(i, h, e, a, d[m + 8], 7, 1770035416), h, e, d[m + 9], 12, -1958414417), i, h, d[m + 10], 17, -42063), a, i, d[m + 11], 22, -1990404162), e = md5_ff(e, a = md5_ff(a, i = md5_ff(i, h, e, a, d[m + 12], 7, 1804603682), h, e, d[m + 13], 12, -40341101), i, h, d[m + 14], 17, -1502002290), a, i, d[m + 15], 22, 1236535329), e = md5_gg(e, a = md5_gg(a, i = md5_gg(i, h, e, a, d[m + 1], 5, -165796510), h, e, d[m + 6], 9, -1069501632), i, h, d[m + 11], 14, 643717713), a, i, d[m], 20, -373897302), e = md5_gg(e, a = md5_gg(a, i = md5_gg(i, h, e, a, d[m + 5], 5, -701558691), h, e, d[m + 10], 9, 38016083), i, h, d[m + 15], 14, -660478335), a, i, d[m + 4], 20, -405537848), e = md5_gg(e, a = md5_gg(a, i = md5_gg(i, h, e, a, d[m + 9], 5, 568446438), h, e, d[m + 14], 9, -1019803690), i, h, d[m + 3], 14, -187363961), a, i, d[m + 8], 20, 1163531501), e = md5_gg(e, a = md5_gg(a, i = md5_gg(i, h, e, a, d[m + 13], 5, -1444681467), h, e, d[m + 2], 9, -51403784), i, h, d[m + 7], 14, 1735328473), a, i, d[m + 12], 20, -1926607734), e = md5_hh(e, a = md5_hh(a, i = md5_hh(i, h, e, a, d[m + 5], 4, -378558), h, e, d[m + 8], 11, -2022574463), i, h, d[m + 11], 16, 1839030562), a, i, d[m + 14], 23, -35309556), e = md5_hh(e, a = md5_hh(a, i = md5_hh(i, h, e, a, d[m + 1], 4, -1530992060), h, e, d[m + 4], 11, 1272893353), i, h, d[m + 7], 16, -155497632), a, i, d[m + 10], 23, -1094730640), e = md5_hh(e, a = md5_hh(a, i = md5_hh(i, h, e, a, d[m + 13], 4, 681279174), h, e, d[m], 11, -358537222), i, h, d[m + 3], 16, -722521979), a, i, d[m + 6], 23, 76029189), e = md5_hh(e, a = md5_hh(a, i = md5_hh(i, h, e, a, d[m + 9], 4, -640364487), h, e, d[m + 12], 11, -421815835), i, h, d[m + 15], 16, 530742520), a, i, d[m + 2], 23, -995338651), e = md5_ii(e, a = md5_ii(a, i = md5_ii(i, h, e, a, d[m], 6, -198630844), h, e, d[m + 7], 10, 1126891415), i, h, d[m + 14], 15, -1416354905), a, i, d[m + 5], 21, -57434055), e = md5_ii(e, a = md5_ii(a, i = md5_ii(i, h, e, a, d[m + 12], 6, 1700485571), h, e, d[m + 3], 10, -1894986606), i, h, d[m + 10], 15, -1051523), a, i, d[m + 1], 21, -2054922799), e = md5_ii(e, a = md5_ii(a, i = md5_ii(i, h, e, a, d[m + 8], 6, 1873313359), h, e, d[m + 15], 10, -30611744), i, h, d[m + 6], 15, -1560198380), a, i, d[m + 13], 21, 1309151649), e = md5_ii(e, a = md5_ii(a, i = md5_ii(i, h, e, a, d[m + 4], 6, -145523070), h, e, d[m + 11], 10, -1120210379), i, h, d[m + 2], 15, 718787259), a, i, d[m + 9], 21, -343485551), i = safe_add(i, r), h = safe_add(h, n), e = safe_add(e, t), a = safe_add(a, f);
  }return [i, h, e, a];
}function binl2rstr(d) {
  var _,
      m = "";for (_ = 0; _ < 32 * d.length; _ += 8) {
    m += String.fromCharCode(d[_ >> 5] >>> _ % 32 & 255);
  }return m;
}function rstr2binl(d) {
  var _,
      m = [];for (m[(d.length >> 2) - 1] = void 0, _ = 0; _ < m.length; _ += 1) {
    m[_] = 0;
  }for (_ = 0; _ < 8 * d.length; _ += 8) {
    m[_ >> 5] |= (255 & d.charCodeAt(_ / 8)) << _ % 32;
  }return m;
}function rstr_md5(d) {
  return binl2rstr(binl_md5(rstr2binl(d), 8 * d.length));
}function rstr_hmac_md5(d, _) {
  var m,
      r,
      n = rstr2binl(d),
      t = [],
      f = [];for (t[15] = f[15] = void 0, n.length > 16 && (n = binl_md5(n, 8 * d.length)), m = 0; m < 16; m += 1) {
    t[m] = 909522486 ^ n[m], f[m] = 1549556828 ^ n[m];
  }return r = binl_md5(t.concat(rstr2binl(_)), 512 + 8 * _.length), binl2rstr(binl_md5(f.concat(r), 640));
}function rstr2hex(d) {
  var _,
      m,
      r = "";for (m = 0; m < d.length; m += 1) {
    _ = d.charCodeAt(m), r += "0123456789abcdef".charAt(_ >>> 4 & 15) + "0123456789abcdef".charAt(15 & _);
  }return r;
}function str2rstr_utf8(d) {
  return unescape(encodeURIComponent(d));
}function raw_md5(d) {
  return rstr_md5(str2rstr_utf8(d));
}function hex_md5(d) {
  return rstr2hex(raw_md5(d));
}function raw_hmac_md5(d, _) {
  return rstr_hmac_md5(str2rstr_utf8(d), str2rstr_utf8(_));
}function hex_hmac_md5(d, _) {
  return rstr2hex(raw_hmac_md5(d, _));
}function md5(d, _, m) {
  return _ ? m ? raw_hmac_md5(_, d) : hex_hmac_md5(_, d) : m ? raw_md5(d) : hex_md5(d);
};