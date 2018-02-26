<template>
  <div class="footer-main">
    <p class="contact"></p>
    <div class="container">
      <ul class="contact-list">
        <li>
          <b class="mobile-icon"></b>
          <span>028-1245-1222</span>
        </li>
        <li>
          <b class="address-icon"></b>
          <span>青羊区温哥华广场5栋CBD</span>
        </li>
        <li>
          <b class="email-icon"></b>
          <span>sangxing.net.com</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}

</script>
<style lang="less">
.footer-main {
  height: 180px;
  width: 100%;
  background-color: #20b391;
  overflow: hidden;
  .contact {
    height: 1px;
    background-color: #4cc1a5;
    margin: 61px 0 54px;
    position: relative;
    color: #fff;
    font-size: 20px;
    &:after {
      content: '联系方式';
      display: inline-block;
      text-align: center;
      position: absolute;
      top: -14px;
      width: 140px;
      background-color: #20b391;
      left: 50%;
      margin-left: -70px;
    }
  }
  .contact-list {
    overflow: hidden;
    >li {
      width: 400px;
      text-align: center;
      float: left;
      color: #fff;
      font-size: 18px;
      >b {
        margin: 0;
        padding: 0;
        font-weight: normal;
        display: inline-block;
        vertical-align: middle;
      }
      >span {
        display: inline-block;
        line-height: 28px;
        vertical-align: middle;
      }
    }
  }

  .mobile-icon {
    width: 22px;
    height: 28px;
    background: url('/static/images/mobile.png') no-repeat center center;
    background-size: contain;
    margin: 14px;
  }

  .address-icon {
    width: 22px;
    height: 28px;
    background: url('/static/images/address.png') no-repeat center center;
    background-size: contain;
    margin: 14px;
  }

  .email-icon {
    width: 28px;
    height: 22px;
    background: url('/static/images/email.png') no-repeat center center;
    background-size: contain;
    margin: 14px;
  }
}

</style>
