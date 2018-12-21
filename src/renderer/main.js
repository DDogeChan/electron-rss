import Vue from "vue";
import axios from "axios";

import App from "./App";
import router from "./router";
import store from "./store";
import "./plugins/vuetify.js";
import "./plugins/notifications.js";
import db from "./datastore";
import feeder from "./feedbot.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

Vue.filter("dayjs", function(value) {
  if (!value) return "";
  value = value.toString();
  return dayjs(value).fromNow();
});

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.$db = db;
let func = async () => {
  Vue.prototype.$bot = await feeder;
  // Vue.prototype.$bot.feedAdd({
  //   url: "https://rsshub.app/weibo/search/hot",
  //   refresh: 30000
  // });
};
func();

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
