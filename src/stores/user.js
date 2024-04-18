import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/utils/request.js';
import { useLecture } from '@/stores/lecture';
import { ElMessage } from 'element-plus';

// 普通用户数据
export const useUser = defineStore('user', () => {
  // 用户信息
  const user = ref();
  const timer = ref();
  // 清除信息
  function clear() {
    this.user = {};
  }
  // 修改头像
  // async function changeHeadImg (headImg) {
  //   const res = await axios.post('/api/changeHead', {
  //     headImg
  //   })
  //   console.log(res.data);
  // }
  // 更新用户数据
  async function getUser () {
    const res = await axios.post('/api/getUser', {
      token: this.user.token,
      userName: this.user.userName
    });
    if (res.data.hasOwnProperty('error')) {
      ElMessage(res.error);
    } else {
      this.user = { ...(res.data) };
    }
  }
  //登录
  async function login(userName, userPwd) {
    const lectureData = new useLecture();
    // console.log(userName, userPwd);
    const res = await axios.post('/api/login', {
      userName,
      userPwd
    });
    // console.log(res.data)
    if (res.data.hasOwnProperty('error')) {
      // console.log(res.data.error)
      return res.data.error;
    } else {
      this.user = { ...(res.data) };
      this.updateUser();
      lectureData.getCarousel();
      this.timer = setInterval(this.updateUser, 1000*10);
      return 1;
    }
  }
  // 定时器
  function setTimer (option) {
    if (option) {
      this.timer = setInterval(this.updateUser, 1000*10);
    } else {
      clearInterval(this.timer);
      this.timer = '';
    }
    
  }

  // 更新数据
  async function updateUser() {
    const lectureData = new useLecture();
    let orderLectures = this.user.lec_order;
    await lectureData.allLecture();
    await lectureData.hotLecture();
    await this.getUser();
    // console.log(1);
    // console.log(orderLectures);
    if (orderLectures) {
      for (let k of orderLectures) {
        let lecdata = lectureData.getLecture(k);
        if (lecdata.lec_status == -1) {
          await this.failSign(k);
        }       
      }
    }
  }
  // 注册
  async function logon(userName, userPwd) {
    await axios.post('/api/logon', {
      userName,
      userPwd
    });
  }

  // 登录页直接跳转到详情页
  const detailPath = ref();
  function setDetailPath(query_id) {
    this.detailPath = query_id;
  }
  // 判断用户是否存在
  async function isLogon(userName) {
    const res = await axios.post('/api/isLogon', {
      userName
    });
    // console.log(res);
    if (res.data.hasOwnProperty('error')) {
      return res.data.error;
    } else {
      return res.data.message;
    }
  }
  // 修改密码
  async function changePwd(userName, userPwd) {
    const res = await axios.post('/api/changePwd', {
      userName,
      userPwd
    });
    if (res.data.hasOwnProperty('error')) {
      // console.log(res.data.error)
      return res.data.error;
    } else {
      return 1;
    }
  }
  // 预约或取消
  async function changeLecture(lec_id) {
    const lectureData = useLecture();
    if (this.user.lec_order.includes(lec_id)) {
      // 取消讲座
      const res = await axios.post('/api/cancelLecture', {
        userName: this.user.userName,
        lec_id
      });
      if (res.data.hasOwnProperty('error')) {
        ElMessage(res.data.error);
      } else {
        this.user.lec_order = this.user.lec_order.filter(item => item != lec_id);
        lectureData.cancelLecture(lec_id, this.user.userName);
        ElMessage('取消成功');
      }
    }
    else {
      // 预约讲座
      const res = await axios.post('/api/orderLecture', {
        userName: this.user.userName,
        lec_id
      });
      if (res.data.hasOwnProperty('error')) {
        ElMessage(res.data.error);
      } else {
        this.user.lec_order.push(lec_id);
        lectureData.orderLecture(lec_id, this.user.userName);
        // lectureData
        ElMessage('预约成功');
      }

    }
  }
  // 签到
  async function toSign(lec_id, lec_sign) {
    const res = await axios.post('/api/signing', {
      userName: this.user.userName,
      lec_id,
      lec_sign
    });
    if (res.data.hasOwnProperty('error')) {
      ElMessage(res.data.error);
    } else {
      this.user.lec_order = this.user.lec_order.filter(item => item != lec_id);
      this.user.lec_finish.push(lec_id);
      ElMessage('签到成功');
      return true;
    }
  }
  async function failSign(lec_id) {
    await axios.post('/api/failSign', {
      userName: this.user.userName,
      lec_id
    });
    this.user.lec_order = this.user.lec_order.filter(item => item != lec_id);
    this.user.lec_timeout.push(lec_id);
  }

  return { getUser, setTimer, timer, updateUser, failSign, toSign, logon, isLogon, clear, user, changeLecture, detailPath, setDetailPath, changePwd, login };
},
  {
    persist: true,
  }
)