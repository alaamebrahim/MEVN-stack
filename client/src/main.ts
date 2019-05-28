import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Notifications from "vue-notification";

const isProduction = process.env.NODE_ENV === "production";
Vue.config.productionTip = false;

// Notifications
Vue.use(Notifications);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
