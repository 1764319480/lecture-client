<script setup>
import { ref } from 'vue';
const lectureType = ref([
    {
        value: 'culture',
        label: '文化'
    },
    {
        value: 'science',
        label: '科普'
    },
    {
        value: 'protect',
        label: '环保'
    },
    {
        value: 'academic',
        label: '学术'
    },
    {
        value: 'topic',
        label: '热点'
    },
    {
        value: 'technical',
        label: '科技'
    },
    {
        value: 'other',
        label: '其他'
    }
]);
const lectureStatus =ref([
    {
        value: '1',
        label: '报名中',
    },
    {
        value: '0',
        label: '进行中',
    },
    {
        value: '-1',
        label: '已完结',
    }
])
const lectures = ref({
    lec_title: '',
    lec_id: '',
    lec_master: '',
    lec_time: '',
    lec_place: '',
    lec_detail: '',
    lec_type: '',
    lec_status: '',
    lec_num: '',
    lec_people: '',
    lec_sign: ''
})
</script>

<template>
    <div id="page1">
        <div>
            <label>标题:</label>
            <el-input v-model="lectures.lec_title" style="width: 50vw; height: 6vh;" placeholder="请输入标题" />
        </div>
        <div>
            <label>编号:</label>
            <el-input v-model="lectures.lec_id" style="width: 50vw; height: 6vh;" placeholder="请输入6位编号" />
        </div>
        <div>
            <label>举办方:</label>
            <el-input v-model="lectures.lec_master" style="width: 50vw; height: 6vh;" placeholder="请输入举办单位" />
        </div>
        <div>
            <label>举办时间:</label>
            <el-input v-model="lectures.lec_time" style="width: 50vw; height: 6vh;" placeholder="日期格式20xx-xx-xx-xx:xx~xx:xx" />
        </div>
        <div>
            <label>举办地点:</label>
            <el-input v-model="lectures.lec_place" style="width: 50vw; height: 6vh;" placeholder="请输入地点" />
        </div>
        <div>
            <label>介绍:</label>
            <el-input v-model="lectures.lec_detail" style="width: 50vw; height: 6vh;" placeholder="请输入文字介绍" />
        </div>
        <div>
            <label>类型:</label>
            <el-select v-model="lectures.lec_type" placeholder="请选择类型" style="width: 50vw; height: 6vh;">
                <el-option v-for="item in lectureType" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div>
            <label>状态:</label>
            <el-select v-model="lectures.lec_status" placeholder="请选择状态" style="width: 50vw; height: 6vh;">
                <el-option v-for="item in lectureStatus" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div>
            <label>座位数量:</label>
            <el-input v-model="lectures.lec_num" style="width: 50vw; height: 6vh;" placeholder="请输入人数" />
        </div>
        <div>
            <label>已预约:</label>
            <el-input v-model="lectures.lec_people" style="width: 50vw; height: 6vh;" placeholder="添加预约人" />
        </div>
        <div>
            <label>签到码:</label>
            <el-input v-model="lectures.lec_sign" style="width: 50vw; height: 6vh;" placeholder="请输入签到码" />
        </div>
    </div>
</template>

<style scoped>

#page1>div {
    width: 60vw;
    height: 8vh;
    /* background-color: green; */
    display: flex;
    /* flex-direction: row; */
    justify-content: space-between;
    align-items: center;
}
</style>