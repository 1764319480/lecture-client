<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { useUser } from '@/stores/user';
import { useManager } from '@/stores/manager';
import router from '@/router';
import { ElMessage } from 'element-plus';


const userData = useUser();
const managerData = useManager();
onBeforeMount(async () => {
    await managerData.getManagerList();
    userData.setTimer(false);
})

// 登录
const oldAccount = ref('');
const oldPassword = ref('');
const login = async () => {

    //判断管理员身份
    if (managerData.list.includes(oldAccount.value)) {
        const res = await managerData.login(oldAccount.value, oldPassword.value);
        if (res) {
            ElMessage('欢迎管理员');
            await managerData.getCarousel();
            setTimeout(() => {
                router.push('/super/welcome');
            }, 1000)
        }
        return;
    }
    // 普通用户验证
    if (oldAccount.value.length != 11 || typeof Number(oldAccount.value) == NaN) {
        ElMessage('账号格式错误');
        return;
    }
    if (oldPassword.value.length < 8) {
        ElMessage('密码长度不能少于8位！');
        return;
    }
    const res = userData.login(oldAccount.value, oldPassword.value);
    res.then(async data => {
        if (data == 1) {
            sessionStorage.setItem('token', userData.user.token);
            ElMessage('登录成功');
            if (userData.detailPath) {
                setTimeout(() => {
                    router.push(`/lecture/?lec_id=${userData.detailPath}`);
                }, 1000);
            } else {
                setTimeout(() => {
                    router.push('/home/page');
                }, 1000);
            }
        } else {
            ElMessage(data);
            return;
        }
    })

}
// 发送验证码
let timer = null;
let checkIdCode = '';
const timeText = ref('发送验证码');
async function sendIdCode(typeText) {
    if (typeText == '注册' && newAccount.value.length != 11 || typeof Number(newAccount.value) == NaN) {
        ElMessage('账号格式错误');
        return;
    }
    if (typeText == '修改密码' && oldAccount.value.length != 11 || typeof Number(oldAccount.value) == NaN) {
        ElMessage('账号格式错误');
        return;
    }
    const res = await userData.isLogon(typeText == '注册' ? newAccount.value : oldAccount.value);
    if (typeText == '修改密码' && res == 'false') {
        ElMessage('用户不存在');
        return;
    }
    if (typeText == '注册' && res == 'true') {
        ElMessage('用户已存在');
        return;
    }
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
// 注册
const newAccount = ref('');
const idCode = ref('');
const newPassword = ref('');
const newPasswords = ref('');
async function logon() {
    if (newAccount.value.length != 11 || typeof Number(newAccount.value) == NaN) {
        ElMessage('账号格式错误');
        return;
    }
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
    await userData.logon(newAccount.value, newPasswords.value);
    newAccount.value = '';
    newPassword.value = '';
    newPasswords.value = '';
    idCode.value = '';
    status.value = true;
    ElMessage('注册成功');
}
// 切换登录和注册
const status = ref(true);
//切换登录和改密
const status2 = ref(true);

//修改密码
function changePwd() {
    if (oldAccount.value.length != 11 || typeof Number(oldAccount.value) == NaN) {
        ElMessage('账号格式错误');
        return;
    }
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
    if (!userData.user) {
        ElMessage('账号不存在');
        return;
    }
    const res = userData.changePwd(oldAccount.value, newPasswords.value);
    res.then(data => {
        if (data == 1) {
            oldAccount.value = '';
            newPassword.value = '';
            newPasswords.value = '';
            idCode.value = '';
            status2.value = true;
            ElMessage('修改成功');
        } else {
            ElMessage(data);
            return;
        }
    })

}
//批量添加enter点击事件
onMounted(() => {
    function keyEnter() {
        const inputs = document.querySelectorAll('form input');
        inputs.forEach(node => {
            node.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    if (status.value === true && status2.value === true) {
                        login();
                        return;
                    }
                    if (status.value === true && status2.value === false) {
                        changePwd();
                        return;
                    }
                    if (status.value === false) {
                        logon();
                        return;
                    }
                }
            })
        })
    }
    keyEnter();
})
</script>

<template>
    <div class="login">
        <p style="color: white;position: fixed;top: 5vw;text-align: center;font-size: 7vmin;font-family: cursive;">
            高校讲座预约系统</p>
        <div class="left"></div>
        <div class="loginForm" v-show="status">
            <div v-show="status2">
                <h2 style="text-align: center;">登录</h2>
                <br>
                <form action="">
                    <div>
                        <p>账号：</p>
                        <el-input v-model="oldAccount" style="width: 13.5vw" placeholder="请输入手机号" clearable />
                    </div>
                    <br>
                    <div>
                        <p>密码：</p>
                        <el-input v-model="oldPassword" style="width: 13.5vw" type="password" placeholder="请输入密码"
                            show-password />
                    </div>
                    <div style="display: flex; justify-content: space-between; border-top: 8px solid white;">
                        <a @click="status = false" href="JavaScript: ;"
                            style="font-size: 10px;text-decoration: none;">没有账号？点击注册</a>
                        <a @click="status2 = false" href="JavaScript: ;"
                            style="font-size: 10px;text-decoration: none;">忘记密码</a>
                    </div>
                    <br>
                    <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
                </form>
                <br>
                <hr>
                <ul style="list-style: inside; font-size: 2vh; color: grey;">
                    <li>请使用11位号码进行登录或注册。</li>
                    <li>若忘记密码，可通过验证码方式找回。</li>
                </ul>

            </div>
            <div v-show="!status2">
                <h2 style="text-align: center;">修改密码</h2>
                <br>
                <form action="">
                    <div>
                        <p>账号：</p>
                        <el-input v-model="oldAccount" style="width: 13.5vw" placeholder="请输入手机号" clearable />
                    </div>
                    <br>
                    <div style="position: relative; display: flex; align-items: center;">
                        验证码：<el-input v-model="idCode" style="width: 13.5vw" placeholder="请输入验证码"></el-input>
                        <a href="JavaScript: ;" @click="sendIdCode('修改密码')"
                            style=" text-decoration: none; font-size: calc(0.5vw + 2px); position: absolute; right: 4px;">{{
                                timeText
                            }}</a>
                    </div>
                    <br>
                    <div>
                        <p>密码：</p>
                        <el-input v-model="newPassword" style="width: 13.5vw" type="password" placeholder="请输入密码"
                            show-password />
                    </div>
                    <br>
                    <div>
                        <p>确认密码：</p>
                        <el-input v-model="newPasswords" style="width: 13.5vw" type="password" placeholder="请再次输入密码"
                            show-password />
                    </div>
                    <a @click="status2 = true" href="JavaScript: ;"
                        style="font-size: 10px;text-decoration: none;">返回登录</a>
                    <br><br>
                    <el-button type="primary" style="width: 100%" @click="changePwd">确认</el-button>
                </form>
            </div>

        </div>
        <div class="loginForm" v-show="!status">
            <div>
                <h2 style="text-align: center;">注册</h2>
                <br>
                <form action="">
                    <div>
                        <p>账号：</p>
                        <el-input v-model="newAccount" style="width: 13.5vw" placeholder="请输入手机号" clearable />
                    </div>
                    <br>
                    <div style="position: relative; display: flex; align-items: center;">
                        验证码：<el-input v-model="idCode" style="width: 13.5vw" placeholder="请输入验证码"></el-input>
                        <a href="JavaScript: ;" @click="sendIdCode('注册')"
                            style=" text-decoration: none; font-size: calc(0.5vw + 2px); position: absolute; right: 4px;">{{
                                timeText
                            }}</a>
                    </div>
                    <br>
                    <div>
                        <p>密码：</p>
                        <el-input v-model="newPassword" style="width: 13.5vw" type="password" placeholder="请输入密码"
                            show-password />
                    </div>
                    <br>
                    <div>
                        <p>确认密码：</p>
                        <el-input v-model="newPasswords" style="width: 13.5vw" type="password" placeholder="请再次输入密码"
                            show-password />
                    </div>
                    <a @click="status = true" href="JavaScript: ;"
                        style="font-size: 10px;text-decoration: none;">已有账号？点击登录</a>
                    <br><br>
                    <el-button type="primary" style="width: 100%" @click="logon">注册</el-button>
                </form>
            </div>
        </div>
        <div></div>
    </div>
</template>

<style scoped>
h1 {
    font-style: italic;
}

.left {
    width: 20vw;
    height: 52vh;
    padding: 10px;
    background-image: url("@/assets/img/login_left.png");
}

.loginForm {
    background-color: white;
    width: max-content;
    height: 52vh;
    padding: 10px;
    width: 20vw;
    /* border-radius: 5px; */
}

.loginForm>div>form>div {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.login {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-image: url("@/assets/img/login5.jpg");
    overflow: visible;
    background-repeat: no-repeat;
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
}
</style>