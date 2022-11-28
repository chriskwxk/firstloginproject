import Vue from "vue";
import Vuex from "vuex";
import router from "./router/router.js";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,

    allUsers: [
      { id: 1, name: "hoza", email: "hoza@email.com", password: "12345" },
      { id: 2, name: "bj", email: "bj@email.com", password: "12345" },
    ],

    isLogin: false,
    isLoginError: false,
  },
  mutations: {
    //mutation에서 함수를 만들어놓고 actions에서 commit으로 state의 값을 바꾼다.
    //로그인 성공시
    loginSuccess(state, payload) {
      state.isLogin = true;
      state.isLoginError = false;
      state.userInfo = payload;
    },
    //로그인 실패시
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },

    logOut(state) {
      state.isLogin = false;
      state.isLoginError = false;
      state.userInfo = null;
    },
  },
  actions: {
    // action에서 mutation을 실행시키려면 commit이란 함수를 사용함
    // commit은 실행시킨다 정도로 알면됨
    // DB역할을하는 부분이 state안에있음으로

    login({ dispatch }, loginObj) {
      //singinObj안에 Login.vue에서 던져준 값들이 들어옴
      //토큰반환
      axios
        .post("https://reqres.in/api/login", loginObj)
        .then((res) => {
          // ** 이 파라매터가 들어간 함수가 실행되면 다음을 출력 **
          //성공시 토큰을 받아오고 그 토큰을 다시 헤더에 포함시켜서 유저정보 요청
          //당연한거지만 res를 모객체로 받아야함

          let token = res.data.token; //굿
          localStorage.setItem("acess_token", token); //로컬스토리지에 저장
          dispatch("getMemberInfo"); //저장후 getMemberInfo함수실행
        })
        .catch(() => {
          alert("이메일과 비밀번호를 확인하세요");
        });
    },

    // let selectUser = null;
    // 	state.allUsers.forEach(user =>{ 	 //allUsers내에서 반복문을 돌려서
    // 		if(user.email == loginObj.email) //임시DB에 저장된값과 입력된값이 같은 유저를
    // 		selectUser = user 							 //selectUser에 담아줌
    // 	})

    // 	if(selectUser === null || selectUser.password !== loginObj.password)
    // 	commit("loginError")
    // 	else{
    // 			commit("loginSuccess", selectUser)
    // 			router.push({name: "mypage"})
    // 		}

    logOut({ commit }) {
      commit("logOut");
      router.push({ name: "home" });
    },

    getMemberInfo({ commit }) {
      let token = localStorage.getItem("access_token");
      let config = {
        headers: {
          "access-token": token,
        },
      };
      axios
        .get("https://reqres.in/api/users/2", config)
        .then((response) => {
          let userInfo = {
            id: response.data.data.id,
            first_name: response.data.data.first_name,
            last_name: response.data.data.last_name,
            avatar: response.data.data.avatar,
          };
          commit("loginSuccess", userInfo);
        })
        //실패했을경우
        .catch(() => {
          alert("이메일과 비밀번호를 확인하세요");
        });
    },
  },
});
