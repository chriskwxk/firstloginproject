<template>
  <v-container fill-height style="max-width: 450px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-alert class="mb-3" :value="isLoginError" type="error">
          아이디와 비밀번호를 확인해주세요
        </v-alert>

        <v-alert class="mb-3" :value="isLogin" type="success">
          로그인 완료
        </v-alert>

        <v-card>
          <v-app-bar flat>
            <v-app-bar-title>로그인</v-app-bar-title>
          </v-app-bar>

          <div class="pa-3">
            <v-text-field
              v-model="email"
              label="이메일을 입력하세요"
            ></v-text-field>

            <v-text-field
              v-model="password"
              type="password"
              label="패스워드를 입력하세요"
            ></v-text-field>

            <v-btn
              color="primary"
              depressed
              block
              large
              @click="
                login({
                  email: email,
                  password: password,
                })
              "
              >로그인</v-btn
            >
            <!-- <v-btn @click="test">테스트</v-btn>
				<v-btn @click="postTest">포스트 테스트</v-btn> -->
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  computed: {
    ...mapState(["isLogin", "isLoginError"]),
  },

  methods: {
    ...mapActions(["login"]),
    // 		test(){
    // 			axios.get('https://reqres.in/api/users?page=2')
    // 			.then(res => {
    //   		console.log(res);
    // 			 })
    // 		 .catch(err =>{
    //   		console.log(err);
    // 	})
    // .finally(() => { //function()은 지양해야함 왜냐? 우리가 값을 다시 data에 재할당할수도있으니까 =>함수를 쓰는게 더 맞는방법
    // 	console.log("test")
    // })

    // 	 },
    // 	postTest(){
    // 		axios.post('https://reqres.in/api/register', {
    // 	email: "eve.holt@reqres.in",
    //   password: "pistol" //body에 들어가는 정보들
    // })
    // .then((res)=> {
    //   console.log(res);
    // })
    // .catch((err)=> {
    //   console.log(err);
    // });
    //  }
  },
};
</script>
