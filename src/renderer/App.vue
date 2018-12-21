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
/* open-sans-300 - latin_cyrillic-ext */
@font-face {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 300;
  src: local("Open Sans Light"), local("OpenSans-Light"),
    url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-300.woff2")
      format("woff2"),
    /* Chrome 26+, Opera 23+, Firefox 39+ */
      url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-300.woff")
      format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-300italic - latin_cyrillic-ext */
@font-face {
  font-family: "Open Sans";
  font-style: italic;
  font-weight: 300;
  src: local("Open Sans Light Italic"), local("OpenSans-LightItalic"),
    url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-300italic.woff2")
      format("woff2"),
    /* Chrome 26+, Opera 23+, Firefox 39+ */
      url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-300italic.woff")
      format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-regular - latin_cyrillic-ext */
@font-face {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  src: local("Open Sans Regular"), local("OpenSans-Regular"),
    url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-regular.woff2")
      format("woff2"),
    /* Chrome 26+, Opera 23+, Firefox 39+ */
      url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-regular.woff")
      format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-italic - latin_cyrillic-ext */
@font-face {
  font-family: "Open Sans";
  font-style: italic;
  font-weight: 400;
  src: local("Open Sans Italic"), local("OpenSans-Italic"),
    url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-italic.woff2")
      format("woff2"),
    /* Chrome 26+, Opera 23+, Firefox 39+ */
      url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-italic.woff")
      format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-600 - latin_cyrillic-ext */
@font-face {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  src: local("Open Sans SemiBold"), local("OpenSans-SemiBold"),
    url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-600.woff2")
      format("woff2"),
    /* Chrome 26+, Opera 23+, Firefox 39+ */
      url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-600.woff")
      format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-600italic - latin_cyrillic-ext */
@font-face {
  font-family: "Open Sans";
  font-style: italic;
  font-weight: 600;
  src: local("Open Sans SemiBold Italic"), local("OpenSans-SemiBoldItalic"),
    url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-600italic.woff2")
      format("woff2"),
    /* Chrome 26+, Opera 23+, Firefox 39+ */
      url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-600italic.woff")
      format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-700 - latin_cyrillic-ext */
@font-face {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  src: local("Open Sans Bold"), local("OpenSans-Bold"),
    url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-700.woff2")
      format("woff2"),
    /* Chrome 26+, Opera 23+, Firefox 39+ */
      url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-700.woff")
      format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-700italic - latin_cyrillic-ext */
@font-face {
  font-family: "Open Sans";
  font-style: italic;
  font-weight: 700;
  src: local("Open Sans Bold Italic"), local("OpenSans-BoldItalic"),
    url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-700italic.woff2")
      format("woff2"),
    /* Chrome 26+, Opera 23+, Firefox 39+ */
      url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-700italic.woff")
      format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-800 - latin_cyrillic-ext */
@font-face {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 800;
  src: local("Open Sans ExtraBold"), local("OpenSans-ExtraBold"),
    url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-800.woff2")
      format("woff2"),
    /* Chrome 26+, Opera 23+, Firefox 39+ */
      url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-800.woff")
      format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-800italic - latin_cyrillic-ext */
@font-face {
  font-family: "Open Sans";
  font-style: italic;
  font-weight: 800;
  src: local("Open Sans ExtraBold Italic"), local("OpenSans-ExtraBoldItalic"),
    url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-800italic.woff2")
      format("woff2"),
    /* Chrome 26+, Opera 23+, Firefox 39+ */
      url("./assets/fonts/open-sans-v15-latin_cyrillic-ext-800italic.woff")
      format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
html {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Open Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 14px;
  line-height: 1.5;
  background-color: #fff;
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
