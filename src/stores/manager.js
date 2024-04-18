import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/utils/request.js';
import { ElMessage } from 'element-plus';

// 管理员信息
export const useManager = defineStore('manager', () => {
  const manager = ref({
    name: '',
    supertoken: '',
  });
  // 退出登录时清除信息
  function clear () {
    this.manager.name = '';
    this.manager.supertoken = '';
  }
  // 管理员列表
  const list = ref([]);
  // 获取管理员列表
  async function getManagerList() {
    const res = await axios.get('/api/superList');
    this.list = res.data;
    // console.log(this.list)
  }
  // 管理员登录
  async function login(name, pwd) {
    const res = await axios.post('/api/superLogin', {
      name,
      pwd
    });
    // console.log(res);
    if (res.data.hasOwnProperty('error')) {
      ElMessage(res.data.error);
      return false;
    } else {
      this.manager.name = res.data.name;
      this.manager.supertoken = res.data.supertoken;
      sessionStorage.setItem('supertoken', res.data.supertoken);
      return true;
    }
  }
  // 添加讲座
  async function addLecture(lecture) {
    const res = await axios.post('/api/addLecture', {
      lec_title: lecture.lec_title,
      lec_id: lecture.lec_id,
      lec_master: lecture.lec_master,
      lec_time: lecture.lec_time,
      lec_place: lecture.lec_place,
      lec_detail: lecture.lec_detail,
      lec_type: lecture.lec_type,
      lec_status: lecture.lec_status,
      lec_num: lecture.lec_num,
      lec_people: lecture.lec_people,
      lec_sign: lecture.lec_sign,
      lec_length: lecture.lec_length
    });
    if (res.data.hasOwnProperty('error')) {
      ElMessage(res.data.error);
      return false;
    } else {
      ElMessage(res.data.message);
      return true;
    }
  }
  // 搜索某一讲座
  async function findLecture (lec_id) {
    const res = await axios.post('/api/findLecture', {
      lec_id
    });
    if (res.data.hasOwnProperty('error')) {
      ElMessage(res.data.error);
      return false;
    } else {
      return res.data;
    }
  }
  // 删除讲座
  async function removeLecture (lec_id) {
    const res = await axios.post('/api/removeLecture', {
      lec_id
    });
    if (res.data.hasOwnProperty('error')) {
      ElMessage(res.data.error);
      return false;
    } else {
      ElMessage(res.data.message);
      return true;
    }
  }
  // 修改讲座
  async function modifyLecture (lectures) {
    const res = await axios.post('/api/modifyLecture', {
      lectures
    });
    if (res.data.hasOwnProperty('error')) {
      ElMessage(res.data.error);
      return false;
    } else {
      ElMessage(res.data.message);
      return true;
    }
  }
   // 修改密码
   async function modifyPwd (pwd) {
    const res = await axios.post('/api/modifyPwd', {
      name: this.manager.name,
      pwd
    });
    if (res.data.hasOwnProperty('error')) {
      ElMessage(res.data.error);
      return false;
    } else {
      ElMessage(res.data.message);
      return true;
    }
  }
  return { clear, modifyPwd, modifyLecture, removeLecture, findLecture, addLecture, manager, list, getManagerList, login };
},
  {
    persist: true,
  })