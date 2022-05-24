<template>
  <form @submit.prevent="formSubmit">
    <div>
      <label for="username">ID: </label>
      <input type="text" placeholder="username" v-model="username" />
    </div>
    <div>
      <label for="username">PW: </label>
      <input type="text" placeholder="password" v-model="password" />
    </div>
    <div>
      <label for="nickname">Nickname: </label>
      <input type="text" placeholder="nickname" v-model="nickname" />
    </div>
    <button type="submit">회원가입</button>
  </form>
</template>

<script>
import { registerUser } from "@/apis";
export default {
  data() {
    return {
      username: "",
      password: "",
      nickname: "",
    };
  },
  methods: {
    async formSubmit() {
      const userdata = {
        username: this.username,
        password: this.password,
        nickname: this.nickname,
        token: 123,
      };

      const { data } = await registerUser(userdata);
      console.log(data);
      this.resetForm();
      this.$router.push("/login");
    },

    resetForm() {
      this.username = "";
      this.password = "";
      this.nickname = "";
    },
  },
};
</script>
