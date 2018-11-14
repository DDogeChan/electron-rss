<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "electron-rss"
};
</script>

<style>
/* CSS */
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
  /* -webkit-app-region: drag; */
}
::-webkit-scrollbar {
  display: none;
}
#app {
  height: 100%;
}
</style>
