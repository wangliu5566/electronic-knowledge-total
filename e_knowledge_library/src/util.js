import hex_sha1 from 'crypto-js/sha1';
export default {
  install(Vue, options) {
    Vue.prototype.dateToSeconds = function(date) {
      let d = new Date(date);
      let formatDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
      let seconds = new Date(formatDate).getTime();
      return seconds;
    };
    Vue.prototype.secondsToDate = function(seconds) {
      let d = new Date(parseInt(seconds));
      return d;
    };
    Vue.prototype.secondsToNormalDate = function(seconds) {
      if (seconds && seconds > 0) {
        let d = new Date(seconds * 1000);
        let formatDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        return formatDate;
      } else {
        return "-"
      }
    };
    Vue.prototype.formatClass = function(data) {
      if (data == 'jpg' || data == 'JPG' || data == 'jpeg' || data == 'JPEG' || data == 'png' || data == 'PNG' || data == 'gif' || data == 'GIF' || data == 'svg' || data == 'SVG') {
        return '4'
      } else if (data == 'mp4' || data == 'rm' || data == 'rmvb' || data == 'wmv' || data == 'avi' || data == '3gp' || data == 'mkv') {
        return '6'
      } else if (data == 'doc' || data == 'docx') {
        return '2'
      } else if (data == 'ppt' || data == 'pptx') {
        return '3'
      } else if (data == 'pdf') {
        return '1'
      } else if (data == 'txt') {
        return '5'
      } else if (data == 'xlsm' || data == 'xltx' || data == 'xltm' || data == 'xlt' || data == 'csv') {
        return '7'
      } else {
        return '8'
      }
    };
    Vue.prototype.scrollTop = function(el, from = 0, to, duration = 500) {
        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
              return window.setTimeout(callback, 1000 / 60);
            }
          );
        }
        const difference = Math.abs(from - to);
        const step = Math.ceil(difference / duration * 50);

        function scroll(start, end, step) {
          if (start === end) return;

          let d = (start + step > end) ? end : start + step;
          if (start > end) {
            d = (start - step < end) ? end : start - step;
          }
          if (el === window) {
            window.scrollTo(d, d);
          } else {
            el.scrollTop = d;
          }
          window.requestAnimationFrame(() => scroll(d, end, step));
        }
        scroll(from, to, step);
      };
      //更新本地筛选条件存储
      Vue.prototype.updateFilter = function(value) {
        let filters = window.sessionStorage.getItem('bg_user_filter');
        let newFilters;
        if (value != '') {
          if (filters != null && filters != '' && filters != {}) {
            newFilters = Object.assign({}, JSON.parse(filters), value)
            window.sessionStorage.setItem('bg_user_filter', JSON.stringify(newFilters));
          } else {
            window.sessionStorage.setItem('bg_user_filter', JSON.stringify(value));
          }
        }
      },
      //格式化价格
      Vue.prototype.formatPrice = function(s, n) {
        /*
         * 参数说明：
         * s：要格式化的数字
         * n：保留几位小数
         * */
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
          r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
      },

      //        加密
      Vue.prototype.token = function token(obj) {
        var keyArr = [];
        var objStr = '';
        var secret = JSON.parse(window.sessionStorage.getItem('bg_user_info')).access_token
        if (obj instanceof Object && !(obj instanceof Array)) {
          obj = { ...obj,
            timestamp: new Date().getTime()
          }
          for (var k in obj) {
            keyArr.push(k)
          }; //按键排列
          keyArr.sort()

          for (var i = 0; i < keyArr.length; i++) {
            for (var j in obj) {
              if (j == keyArr[i]) {
                keyArr[i] = {};
                keyArr[i][j] = obj[j]
              }
            }
          }

          var tokeyStr = '';
          keyArr.forEach(function(item, index) {
            for (var m in item) {
              if (index !== keyArr.length - 1) {
                tokeyStr += (m + '=' + item[m])
              } else {
                tokeyStr += (m + '=' + item[m])
              }
            }
          })
          //                    for (var n in obj) {
          //
          //                        objStr += (n + '=' + obj[n] + '&')
          //
          //                    }
          objStr = ''
          keyArr.map((item) => {
            for (var i in item) {
              objStr += (i + '=' + item[i] + '&')
            }
          })



          //                    if (secret) {
          //                        console.log(objStr)
          return {
            ...obj,
            url: objStr + "sign=" + hex_sha1(objStr),
            token: secret
          };
          //                    } else {
          //                        return {
          //                            url: objStr+"token=" + hex_sha1(tokeyStr),
          //                            token: hex_sha1(tokeyStr)
          //                        }
          //                    }

        } else {
          obj = {
            timestamp: new Date().getTime()
          }
          for (var i in obj) {
            objStr += (i + '=' + obj[i] + '&')
          }
          return {
            url: objStr + "sign=" + hex_sha1(objStr),
            token: secret
          };
        }
      }

  }
}
