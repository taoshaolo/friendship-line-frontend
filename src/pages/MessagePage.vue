<template>
  <div class="card-body">
    <van-swipe-cell  v-for="message in messageList">
        <message-card-list v-if="messageList.length > 0"  :message="message"
                           :key="message.id"
                           :loading="loading"/>
      <template #right>
        <van-button @click="doDelete(message.id)" square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>


    <van-empty v-if="messageList.length === 0" description="暂无消息"/>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import MessageCardList from "../components/MessageCardList.vue";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter()

const messageList = ref([])
const loading = ref(true)

onMounted(async () => {
  const res = await myAxios.get('/message/list')
  if (res.code === 0) {
    messageList.value = res.data
    loading.value = false
  }
})

const doDelete = async (id) => {
  const res = await myAxios.post('/message/delete', {
    id
  })
  if (res.code === 0) {
    showSuccessToast('删除成功')
  }else {
    showFailToast('退出失败' + (res.description ? `，${res.description}` : ''));
  }
}

</script>

<style scoped>
.delete-button {
  height: 100%;
}
</style>