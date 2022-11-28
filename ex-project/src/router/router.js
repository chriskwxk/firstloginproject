import Vue from "vue";
import Router from "vue-router";
import store from "../store";

Vue.use(Router);

//밑에 경로에 들어가서 작동할 함수 만들어줌
const rejectAuthUser = (to, from, next) => {
  if (store.state.isLogin === true) {
    alert("이미 로그인을 하였습니다");
    next("/"); //홈으로 넘겨버림
  } else {
    next(); //rejectAuthUser으로의 입장을 허용
  }
};

const onlyAuthUser = (to, from, next) => {
  if (store.state.isLogin === false) {
    alert("허용되지않은 접근입니다");
    next("/");
  } else {
    next();
  }
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    },
    {
      path: "/login",
      name: "login",
      beforeEnter: rejectAuthUser,
      //라우터에 들어오기전에 조건들을 미리 체크를 해보고 next뒤에 경로가있으면 거기로 리다이렉션 시켜줌
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    },
    {
      path: "/mypage",
      name: "mypage",
      beforeEnter: onlyAuthUser,
      component: () =>
        import(/* webpackChunkName: "mypage" */ "../views/MyPage.vue"),
    },
  ],
});
