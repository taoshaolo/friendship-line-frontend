<template>
  <div>
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :title="`${team.name}`"
        :thumb="ikun"
    >
      <template #tags>
        <van-tag plain type="primary"
                 style="margin-right: 8px;margin-bottom: 8px;margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数：${team.joinNum}/${team.maxNum}` }}
        </div>
        <div>
          {{ '过期时间：' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间：' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button
            v-if="team.userId !== currentUser?.id && !team.hasJoin"
            plain type="primary" size="mini"
            @click="preJoinTeam(team)">加入队伍
        </van-button>
        <van-button
            v-if="team.userId === currentUser?.id"
            plain type="success" size="mini"
            @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <van-button
            v-if="team.userId === currentUser?.id"
            plain type="danger" size="mini"
            @click="doDeleteTeam(team.id)">解散队伍
        </van-button>
        <van-button
            v-if="team.hasJoin"
            plain type="success" size="mini"
            @click="doQuitTeam(team.id)">退出队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button
                @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password" type="password" placeholder="请输入密码"/>
    </van-dialog>


  </div>

</template>

<script setup lang="ts">

import {defineProps, onMounted, ref} from 'vue';
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import ikun from "../assets/ikun.jpg";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[];
}


//@ts-ignore
const props = withDefaults(defineProps<TeamCardListProps>(), {
  teamList: [] as TeamType[],
});

const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref();
const currentUser = ref();

const router = useRouter();

//当页面首次加载时，触发
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const preJoinTeam = (team:TeamType) => {
  joinTeamId.value = team.id;
  if(team.status === 0){
    doJoinTeam()
  }else {
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
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  });
  console.log(res)
  if (res?.code === 0) {
    showSuccessToast('加入成功');
    doJoinCancel();
  } else {
    showFailToast('加入失败' + (res.description ? `，${res.description}` : ''));
    doJoinCancel();
  }
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
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  })
  if (res?.code === 0) {
    showSuccessToast('退出成功');
  } else {
    showFailToast('退出失败' + (res.description ? `，${res.description}` : ''));
  }
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

</style>