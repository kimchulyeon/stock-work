<template>
  <div>
    <template>
      <!-- <router-link to="/login">login</router-link> -------- <router-link to="/signup">signup</router-link> <br />
			<a href="javascript:void(0)">로그아웃</a> -->
    </template>
    <template>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
};
</script>

<style lang="scss" scoped></style>
