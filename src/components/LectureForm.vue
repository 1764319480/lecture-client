<script setup>
import { ElMessage } from 'element-plus';
import { onBeforeMount, ref } from 'vue';
import { useManager } from '@/stores/manager';
const managerData = new useManager();
const props = defineProps({
    alecture: {
        type: Object,
        default: () => { }
    }
});

onBeforeMount(() => {
    // console.log(props.alecture)
    if (Object.keys(props.alecture).length != 0) {
        lectures.value.lec_title = props.alecture?.lec_title;
        lectures.value.lec_id = props.alecture?.lec_id;
        lectures.value.lec_master = props.alecture?.lec_master;
        lectures.value.lec_time = props.alecture?.lec_time;
        lectures.value.lec_place = props.alecture?.lec_place;
        lectures.value.lec_detail = props.alecture?.lec_detail;
        lectures.value.lec_type = props.alecture?.lec_type;
        lectures.value.lec_status = props.alecture?.lec_status;
        lectures.value.lec_num = props.alecture?.lec_num;
        lectures.value.lec_people = props.alecture?.lec_people;
        lectures.value.lec_sign = props.alecture?.lec_sign;
        lectures.value.lec_length = props.alecture?.lec_length;
    }
})
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
const lectureStatus = ref([
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
    lec_sign: '',
    lec_length: 0
})
// 提交内容
async function submitContent(e) {
    if (lectures.value.lec_title == '') {
        ElMessage('标题不能为空');
        return;
    };
    if (lectures.value.lec_id == '') {
        ElMessage('编号不能为空');
        return;
    };
    if (lectures.value.lec_master == '') {
        ElMessage('举办方不能为空');
        return;
    };
    if (lectures.value.lec_time == '') {
        ElMessage('时间不能为空');
        return;
    };
    if (lectures.value.lec_place == '') {
        ElMessage('地点不能为空');
        return;
    };
    if (lectures.value.lec_detail == '') {
        ElMessage('介绍不能为空');
        return;
    };
    if (lectures.value.lec_type == '') {
        ElMessage('类型不能为空');
        return;
    };
    if (lectures.value.lec_status == '') {
        ElMessage('状态不能为空');
        return;
    };
    if (lectures.value.lec_num == '') {
        ElMessage('座位数不能为空');
        return;
    };
    if (lectures.value.lec_sign == '') {
        ElMessage('签到码不能为空');
        return;
    };
    if (lectures.value.lec_people != '') {
        lectures.value.lec_people = lectures.value.lec_people.toString().split(',');
        lectures.value.lec_length = lectures.value.lec_people.length;
    } else {
        lectures.value.lec_people = [];
    }
    if (e.target.innerText == '添加') {
        const res = await managerData.addLecture(lectures.value);
        if (res) {
            reset();
        }
    } else
        if (e.target.innerText == '修改') {
            await managerData.modifyLecture(lectures.value);
        } else {
            return;
        }
}
// 重置
function reset() {
    lectures.value.lec_title = '';
    lectures.value.lec_id = '';
    lectures.value.lec_master = '',
        lectures.value.lec_time = '',
        lectures.value.lec_place = '',
        lectures.value.lec_detail = '',
        lectures.value.lec_type = '',
        lectures.value.lec_status = '',
        lectures.value.lec_num = '',
        lectures.value.lec_people = [],
        lectures.value.lec_sign = '',
        lectures.value.lec_length = 0
}
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
            <el-input v-model="lectures.lec_time" style="width: 50vw; height: 6vh;"
                placeholder="日期格式20xx-xx-xx-xx:xx~xx:xx" />
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
        <div>
            <!-- 后期定制 -->
            <el-button type="primary" @click="reset">重置</el-button>
            <el-button type="primary" @click="submitContent">
                <slot>确认</slot>
            </el-button>
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