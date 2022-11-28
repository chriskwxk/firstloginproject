import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,

  beforeCreate() {
    this.$store.dispatch("getMemberInfo");
  }, //이러면 BaseState 자체에 userInfo가 들어있는채로 실행됨

  render: (h) => h(App),
}).$mount("#app");
