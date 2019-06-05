<template>
  <div class="d2-page-cover">
    <div class="d2-page-cover__logo">
      <slot />
    </div>
    <div class="errs-welcome">
      <img src="./image/welcome.png" alt="加载中..." class="welcome">
      <div class="bg-banner"></div>
    </div>
    <p class="d2-page-cover__title">设备资源管理系统</p>
    <p class="d2-page-cover__sub-title">优雅的资源管理集成方案</p>
    <p class="d2-page-cover__build-time">FINAL BUILD TIME {{$buildTime}}</p>
    <p class="d2-page-cover__sub-title">内测版1.0</p>
  </div>
</template>

<style lang="scss" scoped>
.d2-page-cover {
  @extend %full;
  @extend %unable-select;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .d2-page-cover__logo {
    z-index: 20;
    img {
      width: 200px;
    }
  }
  .d2-page-cover__title {
    margin: 0px;
    margin-bottom: 20px;
    font-weight: bold;
    color: $color-text-main;
  }
  .d2-page-cover__sub-title {
    margin: 0px;
    margin-bottom: 5px;
    color: $color-text-normal;
  }
  .d2-page-cover__build-time {
    margin: 0px;
    margin-bottom: 10px;
    font-size: 12px;
    color: $color-text-placehoder;
  }
  .errs-welcome {
    width: 100%;
    height: 150px;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  .welcome {
    position: absolute;
    top: 39%;
    left: 15%;
    width: 70%;
    z-index: 10;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .bg-banner {
    width: 70%;
    height: 168%;
    margin-top: -10%;
    margin-left: 15%;
    z-index: -10;
    background-image: url("./image/bg-banner.jpeg");
    background-repeat: no-repeat;
    transform: translateX(30deg);
    animation: move 40s linear infinite alternate;
  }
  @keyframes move {
    0% {
      background-size: 100%
    }
    25% {
      background-size: 120%
    }
    50% {
      background-size: 140%
    }
    100% {
      background-size: 160%
    }
  }
}
</style>
