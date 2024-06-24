<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="0"></van-tab>
      <van-tab title="加密" name="2"></van-tab>
      <van-tab title="私有" name="1"></van-tab>
    </van-tabs>
    <van-loading size="24px" vertical v-show="loading">加载中...</van-loading>

    <div class="card-body">
      <friend-card-list v-if="teamList.length > 0" :status="parseInt(active)" :teamList="teamList"/>
      <van-empty v-if="teamList.length === 0" description="暂无队伍"/>
    </div>
    <van-floating-bubble
        v-model:offset="offset"
        axis="xy"
        icon="plus"
        magnetic="x"
        @click="toAddTeam"
    />
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import MyAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
import FriendCardList from "../components/FriendCardList.vue";

const router = useRouter()
const searchText = ref('')
const loading = ref(true);
const active = ref('0');

// 跳转到创建队伍页面
const toAddTeam = () => {
  router.push('/team/add')
}

const teamList = ref([])

const offset = ref({x: 303, y: 550});

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

/**
 * 搜索队伍
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listTeam = async (val = '', status = 0) => {
  loading.value = true;
  const res = await MyAxios.get("/team/list", {
    params: {
      searchText: val,
      status
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  }else {
    teamList.value = []
    showFailToast(res?.message)
  }
  loading.value = false;
}

//页面加载时只触发一次
onMounted(() => {
  listTeam();
})

const onSearch = (val) => {
  listTeam(val);
};


</script>

<style scoped>
.card-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* 水平居中 */
}
</style>