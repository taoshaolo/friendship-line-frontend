<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view/>
  </div>

  <van-tabbar route >
    <van-tabbar-item to="/" icon="home-o" name="index">首页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="friends-o" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/message" icon="chat-o" name="message">消息</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<script setup>

import {useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/router.ts";

const router = useRouter();
const DEFAULT_TITLE = '友链';
const title = ref(DEFAULT_TITLE);

/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath === route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})
const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/search')
};


</script>

<style scoped>
#content{
  padding-bottom: 50px;
}
</style>