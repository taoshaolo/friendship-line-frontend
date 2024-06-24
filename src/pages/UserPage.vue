<template>
  <van-card
      :desc="user?.profile"
      :title="user?.username"
      :thumb="user?.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in tagList" closeable
               style="margin-right: 8px;margin-bottom: 8px;margin-top: 8px"
               @close="delTag(tag)">
        {{ tag }}
      </van-tag>
      <van-tag style="margin: 4px" :show="true" size="medium" plain type="primary" @click="showAddTag">
        +
      </van-tag>

      <van-popup
          v-model:show="isShowAddTag"
          round
      >
        <van-cell-group inset>
          <van-field
              v-model="tag"
              center
              placeholder="请输入标签名"
          >
            <template #button>
              <van-button size="small" type="primary" @click="submitAddTag">提交</van-button>
            </template>
          </van-field>
        </van-cell-group>
      </van-popup>

    </template>
  </van-card>

  <van-cell title="修改信息" is-link to="/user/update"/>
  <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
  <van-cell title="我加入的队伍" is-link to="/user/team/join"/>
  <van-button plain type="danger" size="large" @click="show = true">退出</van-button>
  <van-dialog v-model:show="show" title="提示" message="是否退出" theme="round-button" show-cancel-button
              @confirm="doLogout">

  </van-dialog>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import myAxios from "../plugins/myAxios";
import {showConfirmDialog, showFailToast, showSuccessToast} from "vant";


const user = ref();
const tagList = ref([]);
const router = useRouter()
const isShowAddTag = ref(false);
const show = ref(false);
const tag = ref('');

//当页面首次加载时，触发
onMounted( () => {
  loadUserInfo()
})

const loadUserInfo = async () => {
  const currentUser = await getCurrentUser()
  if (currentUser) {
    user.value = currentUser;
    tagList.value = JSON.parse(currentUser.tags)
  }else {
    showFailToast("获取用户信息失败")
  }
}

/**
 * 显示添加标签输入框
 */
const showAddTag = async () => {
  isShowAddTag.value = true
}

/**
 * 添加标签
 */
const submitAddTag = async () => {
  const res = await myAxios.post('/user/tag/add', {
    tag: tag.value,
    id: user.value.id
  })
  if (res.code === 0 && res.data){
    showSuccessToast("添加成功")
    isShowAddTag.value = false
    tag.value = ''
    await loadUserInfo()
  } else {
    showFailToast("添加失败")
  }
}


/**
 * 删除标签
 * @param tag
 */
const delTag = async (tag: string) => {
  if (tagList.value.length > 1) {
    showConfirmDialog({
      title: '提示',
      message: `确定删除 ${tag} 标签嘛？`,
      theme: 'round-button',
    }).then(async () => {
      // on confirm
      const res = await myAxios.post('/user/tag/remove', {
        tag,
        oldTags: tagList.value,
        id: user.value.id
      })
      if (res?.code === 0 && res.data) {
        showSuccessToast("删除成功")
        await loadUserInfo()
      } else {
        showFailToast("删除失败")
      }
    }).catch(() => {
      // on cancel
    })
  }else {
    showFailToast("至少保留一个标签")
  }
}




const doLogout = async () => {
  await myAxios.post('/user/logout')
      .then((res) => {
        if (res?.code === 0) {
          window.location.href = '/user/login';
          showSuccessToast("退出成功")
        }
      })
}

</script>

<style scoped>
.van-card {
  background: #FFFFFF;
}
</style>