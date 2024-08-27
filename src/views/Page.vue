<script setup>
import { onBeforeMount, ref } from "vue";
import Card from '@/components/LectureCard.vue';
import { useLecture } from '@/stores/lecture';
import router from "@/router";

const keyword = ref();
const lectureData = useLecture();
const lectures = lectureData.hotLectures;//部分讲座信息
const carousel = lectureData.carousel;//轮播图热门讲座

function goDetail (lec_id) {
  // console.log(lec_id)
  router.push(`/lecture?lec_id=${lec_id}`);
}
function search (keyword) {
  if (keyword) {
    lectureData.setKey(keyword);
    router.push('/search');
  }
}
onBeforeMount(() => {
    if (lectureData.key) {
      keyword.value = lectureData.key;
    }
})
</script>

<template>
  <div id="content">
    <!--搜索框-->
    <div id="search">
      <div>
        <el-input v-model="keyword" style="width: 80%; height: 100%;" placeholder="输入讲座名称或编号" clearable />
        <el-button type="danger" style="width: 20%; height: 100%;" @click="search(keyword)">搜索</el-button>
      </div>
    </div>
    <br>
    <!--轮播图-->
    <div>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in carousel" :key="item.lec_id">
          <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
          <img :src="item.src" alt="图片加载失败" style="height: 200px; width: 100%" @click="goDetail(item.lec_id)">
        </el-carousel-item>
      </el-carousel>
    </div>
    <br>
    <h3>大家都在看：</h3>
    <!-- 热门讲座 -->
    <div id="someLecture">
      <Card :lectures="lectures"></Card>
    </div>
  </div>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

#content {
  height: auto;
  width: 70%;
}

/* 搜索模块 */
#search {
  width: 100%;
  height: 10%;
  /* background-color: green; */
}

#search div {
  display: flex;
  height: 6vh;
  justify-content: center;
  /* align-items: center; */
}

/* 讲座模块 */
#someLecture {
  width: 100%;
  /* background-color: pink; */
}
/* :deep(#someLecture>.v-modal){
    opacity: .5;
    background: rgba(255, 255, 255, .5);
} */
</style>