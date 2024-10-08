<script setup>

</script>

<template>
  <div id="page">
    <el-backtop :right="100" :bottom="100" />
    <!-- 顶部导航栏 -->
    <div id="nav-bottom">
      <p style="font-family: fangsong;">高校讲座预约系统</p>
      <div>
        <router-link to="/home/page" style="text-decoration: none;">首页</router-link>
        <router-link to="/home/sort" style="text-decoration: none;">分类</router-link>
        <router-link to="/home/person" style="text-decoration: none;">个人</router-link>
      </div>
    </div>
    <br>
    <!-- <router-view></router-view> -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.path" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" :key="$route.path" v-if="!$route.meta.keepAlive" />
    </router-view>
  </div>
</template>

<style scoped>
#page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}



/* 顶部导航菜单 */
#nav-bottom {
  position: sticky;
  top: 0;
  z-index: 99;
  width: 70%;
  height: 8%;
  background-color: #dfdfdf;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid white;
}

#nav-bottom div {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 50%;
  /* background-color: red; */
}

#nav-bottom p {
  font-size: 3.5vw;
  align-self: center;
  color: rgb(23 44 213);
  font-weight: bold;
  font-family: serif;
}

/* 选项高亮 */
.router-link-active {
  color: red;
  font-size: 22px;
}
</style>
