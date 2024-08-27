<script setup>
import Form from "@/components/LectureForm.vue";
import { ref } from 'vue';
import { useManager } from "@/stores/manager";

const managerData = new useManager();
const keyword = ref('');
const lectureData = ref({});
async function search() {
    if (keyword.value == '') {
        ElMessage('请输入编号');
        return;
    }
    lectureData.value = {};
    const res = await managerData.findLecture(keyword.value);
    if (res) {
        lectureData.value = res;
        // console.log(lectureData.value);
    }
}
</script>

<template>
    <div id="page">
        <div id="content">
            <h2>修改讲座</h2>
            <br>
            <div id="search">
                <div>
                    <el-input v-model="keyword" style="width: 60vw; height: 100%;" placeholder="输入讲座编号" clearable />
                    <el-button type="danger" style="width: 10vw; height: 100%;" @click="search(keyword)">搜索</el-button>
                </div>
            </div>
            <br>
            <div v-if="Object.keys(lectureData).length != 0">
                <Form :alecture="lectureData">修改</Form>
            </div>      
        </div>

    </div>
</template>

<style scoped>
#page {
    display: flex;
    justify-content: center;
    align-items: center;
}
#content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>