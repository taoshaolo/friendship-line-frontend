<template>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadData"
  >
    <user-card-list :user-list="userList" :loading="loading"/>
  </van-list>
  <van-empty v-if="finished && userList.length === 0" description="数据为空"/>
  <van-back-top style="margin-bottom: 10%"/>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";
import {showFailToast} from "vant";
import {watchEffect} from "vue";
import {UserType} from "../models/user";

const route = useRoute()
/** 用户列表 */
const userList = ref([])
/** 加载标识 */
const loading = ref(true);
/** 路由参数：标签 */
const {tags, username} = route.query
/** 分页参数 */
const currentPage = ref(1); // 当前页码
const finished = ref(false);


//在组件挂载后立即被调用，适合执行初始化操作
onMounted(() => {
  loadData();
})

const loadData = async () => {
  try {
    let response;
    loading.value = true;
    // 请求搜索结果
    response = await myAxios.get('/user/search/tags', {
      params: {
        tagNameList: tags,
        username: username,
        pageSize: 10,
        pageNum: currentPage.value
      },
      paramsSerializer: params => {
        return qs.stringify(params, {indices: false})
      }
    })
    console.log('/user/search/tags', response)
    const userListData = response?.data?.records;
    userListData.forEach(user => {
      if (user.tags) {
        try {
          user.tags = JSON.parse(user.tags);
        } catch (e) {
          console.error('Error parsing user tags', e);
          // 可以选择在这里设置 user.tags 为一个默认值或者空数组
          user.tags = [];
        }
      }
    });
    if (userListData.length === 0) {
      finished.value = true;
      loading.value = false;
      userList.value = [];
      return;
    }
    userList.value = [...userList.value, ...userListData];
    currentPage.value++; // 增加页码
    finished.value = false; // 只有在没有更多数据时才设置为 true

  } catch (error) {
    console.log('Error fetching user data', error);
    showFailToast('请求失败');
    finished.value = true; // 如果请求失败，可能意味着没有更多数据了
  } finally {
    loading.value = false;
  }
}

</script>

<style scoped>

</style>