<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  background: #ffffff;
  color: #333333;
}

#app{
  font-size: 16px;
}

/* 自定义导航样式 */
.van-nav-bar__placeholder {
  height: 1.22667rem !important;
}
/* 背景色 */
.van-nav-bar {
  background: #f8f8f8;
}
/* 按钮色 */
.van-nav-bar .van-icon,
.van-nav-bar__text,
.van-nav-bar__right,
.van-nav-bar__left {
  color: #3396fb;
}
/* title色 */
.van-nav-bar__title {
  color: #333;
}
/* slot nav style */
.solt-nav-bar .slot-span:not(:first-child) {
  margin-left: 6px;
}

/* 自定义vant中的icon，iconfont.cn */
@font-face {
  font-family: "iconfont";
  src: url("./assets/fonts/iconfont.woff2");
}
.user-icon {
  font-family: "iconfont";
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.user-icon-extra::before {
  content: "\e501";
}
/* <van-icon class-prefix="user-icon" name="extra" /> */
</style>
