import Vue from "vue";
import App from "./App.vue";
import "./assets/scss/main.scss";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import { BIconPencil } from "bootstrap-vue";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component("BIconPencil", BIconPencil);

new Vue({
  render: h => h(App)
}).$mount("#app");
