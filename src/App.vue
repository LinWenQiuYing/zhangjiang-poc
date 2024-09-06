<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #c7c7c7;
  border-radius: 5px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-corner {
  background-color: transparent;
}

input::-webkit-input-placeholder {
  /* WebKit browsers*/
  color: #97a3b7 !important;
  font-size: 14px;
}
input::-moz-input-placeholder {
  /* Mozilla Firefox 4 to 18*/
  color: #97a3b7 !important;
  font-size: 14px;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+*/
  color: #97a3b7 !important;
  font-size: 14px;
}

input::-ms-input-placeholder {
  /* Internet Explorer 10+*/
  color: #97a3b7 !important;
  font-size: 14px;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  #app {
    width: 100%;
    height: 100%;

    .app-main {
      width: 100%;
      height: 100%;
      overflow: auto;
      min-width: 1440px;
      // min-width: 1600px;
      background-image: url("./assets/bg.jpg");
      background-repeat: no-repeat;
      background-size: cover;

      .search-main-header {
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 56px;
        position: absolute;
        padding-top: 10px;
        // min-width: 1600px;
        min-width: 1440px;
        padding-left: 360px;
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
