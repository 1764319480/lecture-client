<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useManager } from '@/stores/manager';
import router from '@/router';
const managerData = useManager();
const newPwd = ref();
const newPwds = ref();

// 重置
function reset() {
    newPwd.value = '';
    newPwds.value = '';
}
// 确认修改密码
async function changePwd() {
    if (newPwd.value == '') {
        ElMessage('请输入新密码');
        return;
    }
    if (newPwds.value == '') {
        ElMessage('请再次输入密码');
        return;
    }
    if (newPwds.value != newPwd.value) {
        ElMessage('密码不一致');
        return;
    }
    const res = await managerData.modifyPwd(newPwds.value);
    if (res) {
        sessionStorage.removeItem('supertoken');
        const timer = setTimeout(() => {
            router.push('/login');
            managerData.clear();
            clearTimeout(timer);
        }, 2000);
    }
}
</script>

<template>
    <div id="page">
        <br>
        <h1>修改密码</h1>
        <!-- <hr> -->
        <br>
        <div id="content">
            <div>
                <label>密码：&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <el-input v-model="newPwd" style="width: 30vw; height: 6vh;" placeholder="请输入新密码" type="password"
                    show-password></el-input>
            </div>
            <br>
            <div>
                <label>确认密码：</label>
                <el-input v-model="newPwds" style="width: 30vw; height: 6vh;" placeholder="请再次输入密码" type="password"
                    show-password></el-input>
            </div>
            <br>
            <div style="display: flex; justify-content: space-between;">
                <el-button type="primary" @click="reset">重置</el-button>
                <el-button type="primary" @click="changePwd">确认</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
#page {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#content>div {
    /* background-color: green; */
    display: flex;
    /* flex-direction: row; */
    justify-content: space-between;
    align-items: center;
}
</style>