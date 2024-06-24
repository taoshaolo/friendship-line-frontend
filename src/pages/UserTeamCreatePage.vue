<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍"  @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="0"></van-tab>
      <van-tab title="加密" name="2"></van-tab>
      <van-tab title="私有" name="1"></van-tab>
    </van-tabs>
    <friend-card-list v-if="teamList.length > 0" :status="parseInt(active)" :team-list="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
    <van-floating-bubble
        v-model:offset="offset"
        axis="xy"
        icon="plus"
        magnetic="x"
        @click="toAddTeam"
    />
  </div>
</template>

<script setup lang="ts">

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  if (name === '0') {
    listTeam(searchText.value, 0);
  } else if (name === '1') {
    listTeam(searchText.value, 1);
  } else {
    listTeam(searchText.value, 2);
  }
}
//页面加载时只触发一次
onMounted(() => {
  listTeam();
})

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import MyAxios from "../plugins/myAxios.ts";
import {showFailToast, showToast} from "vant";
import FriendCardList from "../components/FriendCardList.vue";

const router = useRouter()
const searchText = ref('')
const active = ref('0');

const offset = ref({x: 303, y: 550});
const toAddTeam = () => {
  router.push('/team/add')
}

const teamList = ref([])

const listTeam = async (val = '', status = 0) => {
  const res = await MyAxios.get("/team/list/my/create", {
    params: {
      searchText: val,
      status
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast("加入队伍失败，请稍后重试");
  }
}



const onSearch = (val) => {
  listTeam(val);
};


</script>

<style scoped>

</style>