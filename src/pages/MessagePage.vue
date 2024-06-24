<template>
  <div class="card-body">
    <message-card-list v-if="messageList.length > 0" v-for="message in messageList" :message="message"
                       :key="message.id"
                       :loading="loading"/>

    <van-empty v-if="messageList.length === 0" description="暂无消息"/>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import MessageCardList from "../components/MessageCardList.vue";

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

</script>

<style scoped>

</style>