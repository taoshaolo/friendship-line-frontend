<template>
<!--  <van-skeleton title avatar :row="3" :loading="props.loading" >-->
    <van-card
        v-for="user in props.userList"
        :desc="user.profile"
        :key="user.id"
        :title="user.username"
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="primary" v-for="tag in user.tags"
                 style="margin-right: 8px;margin-bottom: 8px;margin-top: 8px">
          {{ tag }}
        </van-tag>
      </template>

      <template #footer>
        <van-button size="mini" @click="toMessageChat(user.id)">联系我</van-button>
      </template>
    </van-card>
<!--  </van-skeleton>-->
</template>

<script setup lang="ts">
import {UserType} from "../models/user";
import {defineProps} from 'vue';
import {useRouter} from "vue-router";

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

//@ts-ignore
const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  userList: [] as UserType[],
});

const router = useRouter();

const toMessageChat = (id: number) => {
  router.push({
    name: 'userChat',
    params: {
      toUserId: id,
      receiveType: 0,
      status: 0
    }
  })
}


</script>

<style >

</style>