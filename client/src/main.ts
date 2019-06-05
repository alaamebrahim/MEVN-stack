import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Notifications from "vue-notification";
import { i18n } from "@/i18n";
import BootstrapVue from "bootstrap-vue";
import VeeValidate from "vee-validate";
import "./assets/scss/_base.scss";

const isProduction = process.env.NODE_ENV === "production";
Vue.config.productionTip = false;

// Notifications
Vue.use(Notifications);

// Bootstrap
Vue.use(BootstrapVue);

Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: "veeFields", // Important to name this something other than 'fields'
  errorBagName: "veeErrors"
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
