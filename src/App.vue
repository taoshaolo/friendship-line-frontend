<template>
  <BasicLayout v-if="showBasicLayout" />
  <router-view v-else />
</template>

<script setup lang="ts">
import BasicLayout from "./layouts/BasicLayout.vue";
import {computed} from 'vue';
import {useRoute} from "vue-router";

const route = useRoute();
const showBasicLayout = computed(() => {
  return !route.meta.noLayout;
});
</script>

<style>

</style>
