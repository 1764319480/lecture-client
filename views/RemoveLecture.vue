<script setup>
import { ref } from 'vue';
import { useManager } from '@/stores/manager';
import { ElMessage } from 'element-plus';

const managerData = new useManager();
const keyword = ref('');
const lec_id = ref('');
const lec_title = ref('');
const lock = ref(false);
// 搜索讲座
async function search() {
    if (keyword.value == '') {
        ElMessage('请输入编号');
        return;
    }
    lock.value = false;
    const res = await managerData.findLecture(keyword.value);
    if (res) {
        lec_title.value = res.lec_title;
        lec_id.value = res.lec_id;
        lock.value = true;
    }
}
// 删除讲座
const centerDialogVisible = ref(false);
async function remove() {
    centerDialogVisible.value = false;
    const res = await managerData.removeLecture(lec_id.value);
    if (res) {
        lec_id.value == '';
        lec_title.value == '';
        lock.value = false;
    }
}
</script>

<template>
    <div id="page">
        <h2>删除讲座</h2>
        <div id="content">
            <br>
            <div id="search">
                <div>
                    <el-input v-model="keyword" style="width: 60vw; height: 100%;" placeholder="输入讲座编号" clearable />
                    <el-button type="danger" style="width: 10vw; height: 100%;" @click="search()">搜索</el-button>
                </div>
            </div>
            <br>
            <div v-show="lock" style="padding-left: 10px; padding-right: 10px; width: 100%; border: 1px solid; 
            display: flex;justify-content: space-between;align-items: center;">
                <h2 style="font-size: 2vw;" :innerText="lec_title">------------</h2>
                <el-button type="primary" @click="centerDialogVisible = true">删除</el-button>
                <el-dialog v-model="centerDialogVisible" title="温馨提示" width="500" center>
                    <span>
                        确定删除吗？
                    </span>
                    <template #footer>
                        <div class="dialog-footer" style="display: flex; justify-content: center;">
                            <el-button @click="centerDialogVisible = false;">否</el-button>
                            <el-button type="primary" @click="remove">
                                是
                            </el-button>
                        </div>
                    </template>
                </el-dialog>
            </div>
        </div>

    </div>
</template>

<style scoped>
#page {
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    align-items: center;
}
</style>