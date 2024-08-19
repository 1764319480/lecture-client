<script setup>
import defhead from '@/assets/img/head.png';
import { useUser } from "@/stores/user";
import Card from "@/components/LectureCard.vue";
import { useLecture } from '@/stores/lecture';
import { computed, ref } from 'vue';
import router from '@/router';
import { ElMessage } from 'element-plus';


const lectureData = useLecture();
// const lectures = lectureData.lectures;
const userData = useUser();
// 已预约讲座
const lec_order = computed(() => {
    // console.log(userData.user)
    return userData.user?.lec_order?.map((item) => lectureData.getLecture(item)) || [];
});
// 已完成讲座
const lec_finish = computed(() => {
    return userData.user?.lec_finish?.map((item) => lectureData.getLecture(item)) || [];
});
// 超时讲座
const lec_timeout = computed(() => {
    return userData.user?.lec_timeout?.map((item) => lectureData.getLecture(item)) || [];
});
// 退出登录
const centerDialogVisible = ref(false);
function logout() {
    centerDialogVisible.value = false;
    // sessionStorage.removeItem('token');
    sessionStorage.clear();
    userData.clear();//调用
    lectureData.clear();
    // userData.setTimer(false);
    router.push('/login');
};
// 修改头像
// const headImg = ref(null);
// function changeHead() {
//     headImg.value.click();
//     // console.log(1);
// };
// function chooseImg(e) {
//     const files = e.target.files[0]
//     // console.log(files);
//     const reader = new FileReader();
//     reader.readAsDataURL(files)
//     reader.addEventListener('load', () => {
//         userData.changeHeadImg(reader.result);
//     })   
// };
// 发送验证码
let timer = null;
let checkIdCode = '';
const timeText = ref('发送验证码');
function sendIdCode(typeText) {
    if (!timer) {
        ElMessage('发送成功');
        let seconds = 60;
        timer = setInterval(() => {
            if (seconds == 0) {
                timeText.value = '发送验证码';
                checkIdCode = '';//1分钟验证码过期
                clearInterval(timer);
                timer = null;
            } else {
                timeText.value = seconds;
                seconds--;
            }
        }, 1000)
        checkIdCode = Math.floor(Math.random() * 900000) + 100000;
        console.log(`尊敬的用户，您正在进行${typeText}操作，这是您的验证码:${checkIdCode}，1分钟内有效！`)
    }
}
// 修改密码
const dialogFormVisible = ref(false);
const newPassword = ref('');
const newPasswords = ref('');
const idCode = ref('');
function changePwd() {
    if (newPassword.value.length < 8 || newPasswords.value.length < 8) {
        ElMessage('密码长度不能少于8位！');
        return;
    }
    if (!idCode.value) {
        ElMessage('请输入验证码！');
        return;
    }
    if (newPassword.value != newPasswords.value) {
        ElMessage('密码必须一致！');
        return;
    }
    if (checkIdCode != idCode.value) {
        ElMessage('验证码错误！');
        return;
    }
    const res = userData.changePwd(userData.user.userName, newPasswords.value);
    res.then(data => {
        if (data == 1) {
            newPassword.value = '';
            newPasswords.value = '';
            idCode.value = '';
            dialogFormVisible.value = false;
            sessionStorage.removeItem('token');
            const timer = setTimeout(() => {
                router.push('/login');
                clearTimeout(timer);
            }, 2000);
            ElMessage('修改成功');
        } else {
            ElMessage(data);
            return;
        }
    })

}

</script>

<template>
    <div id="content">
        <div id="information">
            <el-avatar :size="100" :src="userData.user.userImg || defhead" fit="cover" />
            <span id="userName">{{ userData.user.userName }}</span>
        </div>
        <br>
        <div>
            <el-tabs tab-position="left" style="height: 40vh;" class="demo-tabs">
                <el-tab-pane label="已预约">
                    <el-empty type="primary" v-show="!lec_order.length" />
                    <div style="height: 40vh; overflow-y:auto" v-show="lec_order">
                        <Card :lectures="lec_order" style="width:auto"></Card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已完成">
                    <el-empty type="primary" v-show="!lec_finish.length" />
                    <div style="height: 40vh; overflow-y:auto" v-show="lec_finish">
                        <Card :lectures="lec_finish" style="width:auto"></Card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已超时">
                    <el-empty type="primary" v-show="!lec_timeout.length" />
                    <div style="height: 40vh; overflow-y:auto" v-show="lec_timeout">
                        <Card :lectures="lec_timeout" style="width:auto"></Card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="设置">
                    <div id="setting">
                        <!-- <div @click="changeHead">
                            <div>修改头像</div>
                            <input ref="headImg" type="file" accept="image/*" style="display: none;"
                                @change="chooseImg">
                            <p>></p>
                        </div> -->

                        <div @click="dialogFormVisible = true">
                            <div>修改密码</div>
                            <p>></p>
                        </div>
                        <el-dialog v-model="dialogFormVisible" title="修改密码" width="500">
                            <div style="border: none;">
                                密码：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="newPassword"
                                    style="width: 80%" type="password" placeholder="请输入密码" show-password />
                            </div>
                            <div style="border: none;">
                                确认密码：<el-input v-model="newPasswords" style="width: 80%" type="password"
                                    placeholder="请再次输入密码" show-password />
                            </div>
                            <div style="position: relative; display: flex; align-items: center; border: none;">
                                验证码：&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="idCode" style="width: 80%"
                                    placeholder="请输入验证码"></el-input>
                                <a href="#" @click="sendIdCode('修改密码')" style=" text-decoration: none; font-size: 1vw;
                                     position: absolute; right: 3vw;">{{ timeText }}</a>
                            </div>
                            <template #footer>
                                <div class="dialog-footer" style="display: flex; justify-content: center;">
                                    <el-button @click="dialogFormVisible = false">取消</el-button>
                                    <el-button type="primary" @click="changePwd">
                                        确认
                                    </el-button>
                                </div>
                            </template>
                        </el-dialog>

                        <div @click="centerDialogVisible = true">
                            <div>退出登录</div>
                            <p>></p>
                        </div>
                        <el-dialog v-model="centerDialogVisible" title="温馨提示" width="500" center>
                            <span>
                                确认退出吗？
                            </span>
                            <template #footer>
                                <div class="dialog-footer" style="display: flex; justify-content: center;">
                                    <el-button @click="centerDialogVisible = false;">否</el-button>
                                    <el-button type="primary" @click="logout">
                                        是
                                    </el-button>
                                </div>
                            </template>
                        </el-dialog>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style scoped>
#content {
    height: auto;
    width: 70%;
    /* background-color: pink; */
    flex: 2;
}

/* 头像简洁信息 */
#information {
    /* background-color: green; */
    display: flex;
    align-items: center;
}

#userName {
    font-size: 4vh;
    color: blue;
}

/* 设置选项 */
#setting div {
    height: 40px;
    width: 100%;
    border-bottom: 1px solid rgb(189, 181, 181);
    vertical-align: bottom;
    display: flex;
    align-content: space-evenly;
    align-items: center;
}

#setting div:hover {
    cursor: default;
}
</style>