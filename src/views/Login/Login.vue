<template>
  <form @submit.prevent="onLogin">
    <div>
      <label for="username">ID: </label>
      <input type="text" v-model="username" />
    </div>
    <div>
      <label for="password">PW: </label>
      <input type="text" v-model="password" />
    </div>
    <button type="submit">로그인</button>
  </form>
</template>

<script>
import { loginUser } from "@/apis";
import { saveAuthToCookie } from "@/utils/cookies";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onLogin() {
      const userdata = {
        username: this.username,
        password: this.password,
        token: 123,
      };

      const { data } = await loginUser(userdata);
      console.log(data);
      this.$store.commit("setToken", data.token);
      this.$store.commit("setUsername", data.username);

      // 쿠키에 토큰 저장
      saveAuthToCookie(data.token);

      this.resetForm();
      this.$router.push("/home");
    },

    resetForm() {
      this.username = "";
      this.password = "";
      this.nickname = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
