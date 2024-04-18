<script setup>
import { useUser } from './stores/user';
import { useLecture } from './stores/lecture';
const lectureData = new useLecture();
const userData = new useUser();
window.onload = function() {
  if (sessionStorage.getItem('token')) {
    userData.updateUser();
    lectureData.getCarousel();
    userData.setTimer(true);
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


