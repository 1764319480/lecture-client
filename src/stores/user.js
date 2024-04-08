import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/utils/request.js';
import { useLecture } from '@/stores/lecture';

 // 普通用户数据
 export const useUser = defineStore('user', () => {
    // 用户信息
    const user = ref();
    // 清除信息
    function clear () {
      this.user = {};
    }
    // 修改头像
    // async function changeHeadImg (headImg) {
    //   const res = await axios.post('/api/changeHead', {
    //     headImg
    //   })
    //   console.log(res.data);
    // }
    //登录
    async function login (userName, userPwd) {
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
        this.user = {...(res.data)};
        const lectureData = new useLecture();
        await lectureData.allLecture();
        await lectureData.hotLecture();
        return 1;
      }
    }
    // 注册，功能后续调后端
    async function logon (userName, userPwd) {
      await axios.post('/api/logon', {
        userName,
        userPwd
      });
    }
    
    // 登录页直接跳转到详情页
    const detailPath = ref();
    function setDetailPath (query_id) {
      this.detailPath = query_id;
    }
    // 判断用户是否存在
    async function isLogon (userName) {
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
    async function changePwd (userName, userPwd) {
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
    function changeLecture (lecId) {
      const lectureData = useLecture();
      if (this.user.lec_order.includes(lecId)) {
        if (lectureData.cancelLecture(lecId, this.user.userName)) {
          this.user.lec_order = this.user.lec_order.filter(item => item != lecId);
        } else {
          alert('取消失败');
        }      
      }
      else {
        if (lectureData.orderLecture(lecId, this.user.userName)) {
          this.user.lec_order.push(lecId);
        } else {
          alert('预约失败');
        }
        
      }
    }
    return { logon, isLogon, clear, user, changeLecture, detailPath, setDetailPath, changePwd, login};
  }, 
  {
    persist: true,
  }
  )