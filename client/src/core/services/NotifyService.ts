import Vue from "vue";

export default class NotifyService {
  static alert(message: string): void {
    Vue.notify({
      title: "Alert",
      text: message,
      type: "error"
    });
  }

  static info(message: string): void {
    Vue.notify({
      title: "Info",
      text: message,
      type: "info"
    });
  }

  static success(message: string): void {
    Vue.notify({
      title: "Info",
      text: message,
      type: "success"
    });
  }
}
