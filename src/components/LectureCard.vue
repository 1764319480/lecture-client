<script setup>
import router from "@/router";
import { useUser } from "@/stores/user";
import { ref } from "vue";

const userData = useUser();
const props = defineProps({
    lectures: Array,
});
// 详情跳转
function goDetail(lec_id) {
    // console.log(lec_id)
    router.push(`/lecture?lec_id=${lec_id}`);
}
// console.log(props.lectures);
// 讲座状态显示
function statusName(status) {
    switch (status) {
        case -1: { return '已完结' };
        case 0: { return '进行中' };
        case 1: { return '报名中' };
    }
}
function statusStyle(status) {
    switch (status) {
        case -1: return { color: 'grey', 'font-size': '1vw' };
        case 0: return { color: 'red', 'font-size': '1vw' };
        case 1: return { color: 'blue', 'font-size': '1vw' };
    }
}
// 确定预约
const centerDialogVisible1 = ref(false);
let orderLecId = ref('');
function tochoose (lec_id) {
    centerDialogVisible1.value = true;
    orderLecId.value = lec_id;
}
function confirmOrder() {
    centerDialogVisible1.value = false;
    // console.log(orderLecId.value)
    userData.changeLecture(orderLecId.value);
    orderLecId.value = '';
}
</script>

<template>
    <div id="page">
        <template v-for="(item) in lectures" :key="item.lec_id">
            <div id="content">
                <div style="width: 40%; display: flex; align-items: center">
                    <h2 style="font-size: 2vw;">{{ item.lec_title }}</h2>
                    <p :style="statusStyle(item.lec_status)" :innerText="statusName(item.lec_status)"></p>
                </div>
                <div>
                    <p style="color: dimgray; font-size: 1vw;">举办方：{{ item.lec_master }}</p>
                </div>
                <div>
                    <el-button type="primary" @click="goDetail(item.lec_id)"
                        style="width: 4.5vw; font-size: 1.5vw;">详情</el-button>
                    <el-button :type="userData.user.lec_order?.includes(item.lec_id) ? '' : 'primary'"
                        @click="tochoose(item.lec_id)" :disabled="item.lec_status == 1 ? false : true"
                        style="width: 4.5vw; font-size: 1.5vw;">
                        {{ userData.user.lec_order?.includes(item.lec_id)
                        || userData.user.lec_finish?.includes(item.lec_id)
                        || userData.user.lec_timeout?.includes(item.lec_id) ? '已预约' : '预约' }}
                        <!-- <p v-text="userData.user.lec_order.includes(item.lec_id)?'已预约':'预约'"></p> -->
                    </el-button>
                    <el-dialog v-model="centerDialogVisible1" title="温馨提示" width="500" :modal="false" center>
                        <span>
                            {{ userData.user.lec_order?.includes(orderLecId)
                                || userData.user.lec_finish?.includes(orderLecId)
                                || userData.user.lec_timeout?.includes(orderLecId) ? '确定取消吗？' : '确定预约吗？' }}
                        </span>
                        <template #footer>
                            <div class="dialog-footer">
                                <el-button @click="centerDialogVisible1 = false">否</el-button>
                                <el-button type="primary" @click="confirmOrder">
                                    是
                                </el-button>
                            </div>
                        </template>
                    </el-dialog>
                </div>
            </div>
        </template>
    </div>
</template>




<style scoped>
#page {
    width: 100%;
    height: auto;
    border: 1px solid;
    border-bottom: none;
}

#content {
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px dashed;
}

</style>