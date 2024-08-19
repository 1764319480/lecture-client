<script setup>
import { onBeforeMount, ref } from 'vue';
import Card from '@/components/LectureCard.vue';
import { useLecture } from '@/stores/lecture';
import router from '@/router';


const lectureData = useLecture();
const searchLectures = ref([]);
const keyword = ref();

function search (keyword) {
    searchLectures.value = lectureData.searchLecture(keyword);
    lectureData.setKey(keyword);
    // console.log(searchLectures.value);
}
function goBack () {
    router.back();
}
onBeforeMount(() => {
    if (lectureData.key) {
        keyword.value = lectureData.key;
        search (lectureData.key);
        // lectureData.setKey('');
    }
})
</script>

<template>
    <div id="page">
        <div id="content">
            <div style="border: 1px solid; border-left: none;">
                <a href="javascript:;" style="text-decoration: none;" @click="goBack">&larr;返回</a>
            </div>
            <br>
            <div id="search">
                <el-input v-model="keyword" style="width: 80%; height: 100%;" placeholder="输入讲座名称或编号" clearable />
                <el-button type="danger" style="width: 20%; height: 100%;" @click="search(keyword)">搜索</el-button>
            </div>
            <br>
            <div id="selectLectures">
                <Card :lectures="searchLectures" v-show="searchLectures"></Card>               
            </div>
        </div>
    </div>
</template>

<style scoped>
#page {
    /* background-color: #d05757; */
    width: 100%;
    height: 100%;
    position: inherit;
    /* display: flex;
    justify-content: center; */
}

#content {
    width: 70%;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    /* background: pink; */
}

#selectLectures {
    width: 100%;
    height: 100%;
    border-top: 1px solid;
    border-left: 1px solid;
    border-right: 1px solid;
    /* background-color: green; */
}
</style>