export default {
  install(Vue, options) {

    // 不带参数的页面跳转
    Vue.prototype.goPath = function(path) {
      this.$router.push(path)
    }
    // 带参数的页面跳转
    Vue.prototype.goPathParams = function(path,id) {
      this.$router.push({
        path:path,
        query:{
          id:id
        }
      })
    }
    Vue.prototype.dateToSeconds = function(date) {
      let d = new Date(date);
      let formatDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
      let seconds = new Date(formatDate).getTime();
      return seconds;
    }
    Vue.prototype.secondsToDate = function(seconds) {
      let d = new Date(parseInt(seconds));
      return d;
    }
    Vue.prototype.secondsToNormalDate = function(seconds) {
      let d = new Date(seconds);
      let formatDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      return formatDate;
    }

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
    }

    //快捷计算时间
    Vue.prototype.calculateDate = function(value) {
      let date = new Date();
      let nowDate = this.secondsToNormalDate(date.getTime())
      switch (parseInt(value)) {
        //昨天
        case 0:
          return [this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24), this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24)];
          break;
          //今天
        case 1:
          return [nowDate, nowDate];
          break;
          //最近7天
        case 7:
          return [this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 7), nowDate]
          break;
          //最近1月
        case 30:
          return [this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 30), nowDate]
        case 90:
          return [this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 90), nowDate]
          break;
          //最近7天
        case 180:
          return [this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 180), nowDate]
          break;
          //最近1月
        case 360:
          return [this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 360), nowDate]
        case -1:
          return ['', '']
        default:
          // statements_def
          break;
      }
    }
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
    }

    //格式化日期
    Vue.prototype.formatDate = function(date) {
      if (date.indexOf(':') != -1 && date.indexOf(' ') != -1) {
        return date.split(' ')[0];
      }
    }

    //秒转换为活动倒计时HH/MM/dd
    Vue.prototype.secondToHMS = function(value) {
      var theTime = parseInt(value); // 秒
      var theTime1 = 0; // 分
      var theTime2 = 0; // 小时
      // alert(theTime);
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        // alert(theTime1+"-"+theTime);
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60);
          theTime1 = parseInt(theTime1 % 60);
        }
      }

      return this.addEge(theTime2) + ':' + this.addEge(theTime1) + ':' + this.addEge(theTime);
    }

    Vue.prototype.addEge = function(a) {
      return a < 10 ? a = "0" + a : a = a
    },

    Vue.prototype.acFlag = function(type){
      switch (parseInt(type)) {
        case 1:
          return '即将开始';
          break;
        case 2:
          return '正在进行';
          break;
        case 3:
          return '已结束';
          break;
        default:

          break;
      }
    },

    Vue.prototype.dbFlag = function(type){
      switch (parseInt(type)) {
        case 1:
          return '测试';
          break;
        case 2:
          return '正式';
          break;
        default:

          break;
      }
    },

    Vue.prototype.toDbDetail = function(id){
      // this.$router.push({
      //   path:'/database/dataBaseDetail',
      //   query:{
      //     id:id
      //   }
      // });
      window.open('/database/dataBaseDetail?id='+id,'_blank')
    },

    Vue.prototype.markCover = function(value) {
      let data = value.toLowerCase();
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

  }
}
