<template>
  <template v-if="team">
    <van-row justify="center">
      <van-col span="6"><img :src="team.teamImage" alt=""
                             style="width: 6rem; height: 6rem;border-radius: 50%"></van-col>
    </van-row>
    <van-cell-group inset class="my-cell-group">
      <van-cell title="房间名" :value="team.name"/>
      <van-cell title="房间描述" :value="team.description"/>
      <van-cell title="加入人数" :value="team.joinNum"/>
      <van-cell title="最大人数" :value="team.maxNum"/>
      <van-cell title="房间状态" :value="team.status === 0 ? '公开' : '加密'"/>
      <van-cell title="创建人" :value="team.username"/>
      <van-cell title="创建时间" class="last-cell"
                :value="moment(team.createTime).format('YYYY-MM-DD HH:mm:ss')"/>
      <van-button
          v-if="!isDetail"
          plain type="success"
          @click="preJoinTeam(team)"
          style="width: 90%; margin: 0 auto" block>
        加入队伍
      </van-button>
      <van-button
          v-if="isDetail && team.userId === currentUser?.id"
          plain type="primary" @click="doUpdateTeam(team.id)"
          style="width: 90%; margin: 0 auto" block>
        更新队伍
      </van-button>
      <div style="margin-top: 10px"/>
      <van-button
          v-if="isDetail"
          plain type="warning" @click="doQuitTeam(team.id)"
          style="width: 90%; margin: 0 auto" block>
        退出队伍
      </van-button>
      <div style="margin-top: 10px"/>
      <van-button
          v-if="isDetail && team.userId === currentUser?.id"
          plain type="danger" @click="doDeleteTeam(team.id)"
          style="width: 90%; margin: 0 auto" block>
        解散队伍
      </van-button>

    </van-cell-group>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button
                @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password" type="password" placeholder="请输入密码"/>
    </van-dialog>
  </template>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import moment from "moment";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {TeamType} from "../models/team";
import {getCurrentUser} from "../services/user";

const team = ref();
const isDetail = ref();

const showPasswordDialog = ref(false);
const joinTeamId = ref();
const password = ref('');
const currentUser = ref();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
  team.value = JSON.parse(decodeURIComponent(<string>route.query.team));
  console.log('当前队伍信息:', team.value);
  console.log('当前路由信息:', route.query.isDetail)
  isDetail.value = route.query.isDetail
})

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = undefined;
  password.value = '';
}

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  // 加入队伍 -> 跳转聊天室
  await myAxios.post("/team/join", {
    teamId: joinTeamId.value,
    password: password.value
  })
      .then(res => {
        if (res?.code === 0) {
          doJoinCancel();
          router.push({
            name: 'userChat',
            params: {
              toUserId: team.value.id,
              receiveType: 1,
              status: team.value.status
            }
          })
        } else {
          showFailToast('加入失败' + (res.description ? `，${res.description}` : ''));
          doJoinCancel();
        }
      })
}
/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  await myAxios.post("/team/quit", {
    teamId: id
  })
      .then(res => {
        if (res?.code === 0) {
          showSuccessToast('退出成功');
          router.push("/message")
        } else {
          showFailToast('退出失败' + (res.description ? `，${res.description}` : ''));
        }
      })
}

/**
 * 更新队伍
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id
    }
  });
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id
  })
  if (res?.code === 0) {
    showSuccessToast('解散成功');
  } else {
    showFailToast('解散失败' + (res.description ? `，${res.description}` : ''));
  }
}

</script>

<style scoped>

.last-cell:after {
  border-bottom: none;
}

.last-cell {
  margin-bottom: 40px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
