<script setup>
import router from '@/router';
import { useLecture } from '@/stores/lecture';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUser } from "@/stores/user";
// import { ElMessage } from 'element-plus';

const userData = useUser();
const lectureData = useLecture();
const route = useRoute();
const lectureDetails = lectureData.getLecture(route.query.lec_id);

onBeforeMount(() => {
    // console.log(1, 'before')
    if (!lectureDetails) {
        // console.log(1, 'before',2)
        router.push('/home/page');
    }
});
// 返回
function goback(e) {
    e.preventDefault();
    // console.log(1, 'goback',userData.detailPath)

    //判断是否从登录页直接进来
    if (userData.detailPath) {
        // console.log(1, 'goback',1)
        userData.setDetailPath('');
        // console.log(1, 'goback',3)   
        router.push('/home/page');
    } else {
        // console.log(1, 'goback',2)
        // router.back();
        router.back();
    }
};
// 分享
const centerDialogVisible = ref(false);
function shareLecture() {
    centerDialogVisible.value = false;
    // console.log(route.path);
    navigator.clipboard.writeText(`http://localhost:8080${route.path}?lec_id=${lectureDetails.lec_id}`);
}
// 确定预约
const centerDialogVisible1 = ref(false);
function confirmOrder() {
    centerDialogVisible1.value = false;
    userData.changeLecture(lectureDetails.lec_id);
}
// 签到
const dialogFormVisible = ref(false);
function signStatus (lec_id) {
    if (userData.user.lec_finish?.includes(lec_id)) {
        return '已签到';
    }
    return '签到';
}
const sign = ref();
async function checkSign () {
    const res = await userData.toSign(lectureDetails.lec_id, sign.value);
    if (res == true) {
        signStatus(lectureDetails.lec_id);
    }
    sign.value = '';
    dialogFormVisible.value = false;
}
// 按钮颜色动态变化
const btn_color = (lec_id) => {
  if (userData.user.lec_order.includes(lec_id)
    || userData.user.lec_finish.includes(lec_id))
    return 'success';
  else if (userData.user.lec_timeout.includes(lec_id))
    return 'danger';
  else return 'primary';
}
// 按钮文字动态变化
const btn_text = (lec_id) => {
  if (userData.user.lec_order.includes(lec_id))
    return '已预约';
  else if (userData.user.lec_finish.includes(lec_id))
    return '已完成';
  else if (userData.user.lec_timeout.includes(lec_id))
    return '已超时';
  else return '预约';
}
</script>

<template>
    <div id="page">
        <div id="content">
            <br>
            <a href="#" style="text-decoration: none;" @click="goback">
                    <p style="font-size: 4vh;">&larr;返回</p>
                </a>
                <br>
                <hr>
            <div id="title">
                
                <h3 style="text-align: center; font-size: 5vh;">讲座详情</h3>
                <div></div>
            </div>
            <br>
            <br>
            <div id="options">
                <div><strong>讲座名称：</strong><strong>{{ lectureDetails.lec_title }}</strong></div>
                <div><strong>讲座编号：</strong>{{ lectureDetails.lec_id }}</div>
                <div><strong>举办方：</strong>{{ lectureDetails.lec_master }}</div>
                <div><strong>举办时间：</strong>{{ lectureDetails.lec_time }}</div>
                <div><strong>举办地点：</strong>{{ lectureDetails.lec_place }}</div>
                <div style="height: 10vh;"><strong>介绍：</strong>{{ lectureDetails.lec_detail }}</div>
                <div><strong>讲座类型：</strong>{{ lectureData.lectureType[lectureDetails.lec_type] }}</div>
                <div><strong>座位数量：</strong>{{ lectureDetails.lec_num }}</div>
                <div><strong>剩余数量：</strong>{{ lectureDetails.lec_num - lectureDetails.lec_length }}</div>
                <br>
                <el-button @click="centerDialogVisible = true" type="primary"
                    style="width: 4.5vw; font-size: 1.5vw;">分享</el-button>
                <el-dialog v-model="centerDialogVisible" title="温馨提示" width="500" center>
                    <span>
                        是否复制当前链接？
                    </span>
                    <template #footer>
                        <div class="dialog-footer">
                            <el-button @click="centerDialogVisible = false">否</el-button>
                            <el-button type="primary" @click="shareLecture">
                                是
                            </el-button>
                        </div>
                    </template>
                </el-dialog>
                &nbsp;
                <el-button :type="btn_color(lectureDetails.lec_id)"
                    @click="centerDialogVisible1 = true" :disabled="lectureDetails.lec_status == 1 ? false : true"
                    style="width: 4.5vw; font-size: 1.5vw;">
                    {{ btn_text(lectureDetails.lec_id)}}
                </el-button>
                <el-dialog v-model="centerDialogVisible1" title="温馨提示" width="500" center>
                    <span>
                        {{ userData.user.lec_order?.includes(lectureDetails.lec_id)
                            || userData.user.lec_finish?.includes(lectureDetails.lec_id)
                            || userData.user.lec_timeout?.includes(lectureDetails.lec_id) ? '确定取消吗？' : '确定预约吗？' }}
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
                &nbsp;
                <el-button :type="signStatus(lectureDetails.lec_id) == '签到' ? 'primary' : '' " style="width: 4.5vw; font-size: 1.5vw;" 
                @click="dialogFormVisible = true" 
                v-show="lectureDetails.lec_status == 0
                && userData.user.lec_order?.includes(lectureDetails.lec_id)
                || userData.user.lec_finish?.includes(lectureDetails.lec_id)"
                :disabled="signStatus(lectureDetails.lec_id) == '签到' ? false : true"
                >{{ signStatus(lectureDetails.lec_id) }}</el-button>
                <el-dialog v-model="dialogFormVisible" title="请输入签到码" width="500">
                    <div>
                        <el-input v-model="sign"></el-input>
                    </div>
                    <template #footer>
                        <div class="dialog-footer" style="display: flex; justify-content: center;">
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                            <el-button type="primary" @click="checkSign">
                                确认
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
    width: 100%;
    height: 100%;
    /* background-color: pink; */
    display: flex;
    justify-content: center;
}

#content {
    width: 70%;
    height: 100%;
    background-color: rgb(227, 231, 227);
    padding: 0 20px;
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: space-around; */
}

#title {
    display: flex;
    justify-content: space-between;
}

#options>div {
    height: 6vh;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;

}
</style>