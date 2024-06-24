<template xmlns:margin="http://www.w3.org/1999/xhtml">
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
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div @click="router.push('/user/login')"
         style="float: right; color: #38b9fa; font-size: 14px; margin: 10px 8% 10px 10px;">
      已有账号，立即登陆
    </div>

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册
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
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const onSubmit = async () => {
  const res = await myAxios.post('/user/register', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value
  })
  if (res.code === 0 && res.data) {
    showSuccessToast('注册成功');
    // 跳转到之前的页面
    router.push("/user/login")
  } else {
    showFailToast(res.description ? res.description : "注册失败")
  }
};

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