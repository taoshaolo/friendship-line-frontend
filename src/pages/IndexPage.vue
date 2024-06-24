<template>
  <div class="div-my-swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item class="scroll-div-image1"></van-swipe-item>
      <van-swipe-item class="scroll-div-image2"></van-swipe-item>
      <van-swipe-item class="scroll-div-image3"></van-swipe-item>
      <van-swipe-item class="scroll-div-image4"></van-swipe-item>
    </van-swipe>
  </div>
  <van-cell center title="精确匹配">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" @change="handleSwitchChange"/>
    </template>
  </van-cell>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadData"
  >
    <!--    <van-skeleton title avatar :row="3" v-if="loading"/>-->
    <user-card-list :user-list="userList" :loading="loading"/>
  </van-list>
  <van-empty v-if="finished && userList.length === 0" description="数据为空"/>

  <van-back-top style="margin-bottom: 10%"/>
</template>


<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue';
import myAxios from "../plugins/myAxios.ts";
import UserCardList from "../components/UserCardList.vue";
import {showFailToast} from "vant";

const isMatchMode = ref<boolean>(false);
const finished = ref(false);
const loading = ref(true);
const userList = ref([]);
const currentPage = ref(1); // 当前页码


onMounted(() => {
  loadData();
})

// 添加 handleSwitchChange 方法
const handleSwitchChange = (value: boolean) => {
  console.log('Switch value changed:', value);
  // 根据 switch 的值更新 isMatchMode
  isMatchMode.value = value;
  // 重置用户列表和当前页码
  userList.value = [];
  currentPage.value = 1;
  // 重新加载数据
  loadData();
}

/**
 * 加载数据
 */
const loadData = async () => {
  loading.value = true;
  try {
    let response;
    if (isMatchMode.value) {
      response = await myAxios.get("/user/match", {
        params: {
          num: 10,
        }
      })
      console.log('/user/match success', response)
      const userListData = response.data
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
      if (userListData.length === 10) {
        userList.value = userListData
        finished.value = true;
      }
    } else {
      response = await myAxios.get("/user/recommend", {
        params: {
          pageNum: currentPage.value,
          pageSize: 10,
        }
      })
      console.log('/user/recommend success', response)
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
    }

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
.div-my-swipe {
  background-color: #eef0f3;
  padding-top: 7px;
}

.my-swipe {
  width: 96%;
  height: 200px;
  margin: 0 auto;
  border-radius: 10px;
}

.scroll-div-image1 {
  background-image: url("../assets/1.jpg");
  background-size: 100% 100%;
}

.scroll-div-image2 {
  background-image: url("../assets/2.jpg");
  background-size: 100% 100%;
}

.scroll-div-image3 {
  background-image: url("../assets/3.jpg");
  background-size: 100% 100%;
}

.scroll-div-image4 {
  background-image: url("../assets/4.jpg");
  background-size: 100% 100%;
}
</style>