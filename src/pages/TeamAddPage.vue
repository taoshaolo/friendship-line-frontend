<template>
  <div class="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />

        <van-field
            is-link
            readonly
            name="datetimePicker"
            label="过期时间"
            :placeholder="expireTimeStr ?? '点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker-group
              title="请选择过期时间"
              :tabs="['选择日期', '选择时间']"
              @confirm="onConfirm"
              @cancel="showPicker = false"
          >
            <van-date-picker
                v-model="currentDate"
                type="datetime"
                title="请选择过期时间"
                :min-date="minDate"
            />
            <van-time-picker v-model="currentTime"/>
          </van-picker-group>
        </van-popup>

        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>

        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>


        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="userPassword"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />


      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <!--    测试-->
    <!--    {{addTeamData}}-->
  </div>
</template>

<script setup>

import {ref} from "vue";
import {useRouter} from "vue-router";
import MyAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter()

const initFormData = {
  "name": "",
  "description": "",
  "expireTime": null,
  "maxNum": 3,
  "password": "",
  "status": 0,
}

const currentDate = ref([]);

const currentTime = ref([]);

const expireTimeStr = ref('');

const minDate = new Date();

const addTeamData = ref({...initFormData})

//展示日期选择器
const showPicker = ref(false);

const onConfirm = async () => {
  showPicker.value = false;
  let dateTime = currentDate.value.join('/') + ' ' + currentTime.value.join(':')
  addTeamData.value.expireTime = new Date(dateTime)
  expireTimeStr.value = dateTime
}

const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  // todo 前端参数校验
  const res = await MyAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast("创建成功");
    router.push({
      path: '/team',
      // 这意味着当前的页面不会存储在浏览器的历史记录中，用户将无法使用后退按钮返回到之前的页面。
      replace: true
    });
  } else {
    showFailToast("创建失败");
  }
}

</script>

<style scoped>

</style>