<template>
    <div class="card-message" @click="toMessagePage">
        <van-image
                style="position: relative;display: block; padding: 10px; "
                round
                width="4rem"
                height="4rem"
                :src="message.avatarUrl"
                alt=""/>
        <div class="card-message-text">
            <div class="card-message-name">{{ message.userName }}</div>
            <div class="card-message-content">{{ message.content }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {MessageType} from "../models/message";
import {getCurrentUser} from "../services/user";
import {onMounted, ref} from "vue";


const currentUser = ref<any>();
const router = useRouter();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

interface MessageCardListProps {
    message: MessageType,
    loading: boolean,
}

// const props = defineProps<{ user: object, loading: boolean}>()
//@ts-ignore
const props = withDefaults(defineProps<MessageCardListProps>(), {
    message: undefined,
    loading: true,
});



const toMessagePage = () => {
    console.log("props.message-----", props.message)
    router.push({
        name: "userChat",
        params: {
            // toUserId: props.message.receiveType === 1 ? props.message.receiveUserId : props.message.sendUserId,
            toUserId: props.message.receiveType === 1 ? props.message.teamId : (currentUser.value.id === props.message.sendUserId ? props.message.receiveUserId :props.message.sendUserId),
            receiveType: props.message.receiveType,
            status: 0
        }
    })
}

</script>

<style scoped>

html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}

.card-message {
    display: flex;
    background-color: #fff;
    border-radius: 15px;
    width: 96%;
    margin: 10px auto;
    box-shadow: 1px 1px 7px #999;
}

.card-message-name {
    line-height: 3rem;
    font-weight: bold;
    font-size: 19px;
    font-family: system-ui;
}

.card-message-content {
    font-size: 15px;
    margin-top: -10px;
    color: #9b9fa5;
    width: 230px;
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*禁止换行*/
    text-overflow: ellipsis; /*省略号*/
}
</style>
