<script setup>
import { useUser } from './stores/user';
import { useLecture } from './stores/lecture';
import { useManager } from './stores/manager';
const lectureData = new useLecture();
const userData = new useUser();
const managerData = new useManager();
window.onload = function() {
  if (sessionStorage.getItem('token')) {
    userData.updateUser();
    lectureData.getCarousel();
    userData.setTimer(true);
  }
  if (sessionStorage.getItem('supertoken')) {
    managerData.getCarousel();
  }
}
</script>

<template>
   <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.path" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" :key="$route.path" v-if="!$route.meta.keepAlive" />
    </router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>


