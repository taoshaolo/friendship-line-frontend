<template>
  <div class="login-logo"></div>
  <div class="login-title">
    伙伴交友平台
  </div>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div @click="goRegister" style="float: left; color: #38b9fa; font-size: 14px; margin: 10px 10px 10px 6%;">
      没有账号，立即注册
    </div>

    <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      登录
    </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">

import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";


const router = useRouter();
const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const res = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  })
  if (res.code === 0 && res.data) {
    showSuccessToast('登录成功');
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl
  } else {
    showFailToast('登录失败');
  }
};

/**
 * 跳转注册页面
 */
const goRegister = () => {
  router.push("/user/register")
}

</script>

<style scoped>

.login-logo {
  margin: 0 auto;
  width: 10rem;
  height: 10rem;
  background: url("../assets/logo.png");
  background-size: 100% 100%;
  border-radius: 50%;
}

.login-title {
  width: 9rem;
  text-align: center;
  margin: 0 auto;
  padding: 10px;
  font-size: 22px;
  font-weight: bold;
}
</style>