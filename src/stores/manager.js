import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/utils/request.js';

// 管理员信息
export const useManager = defineStore('manager', () => {
    const manager = ref({
      managerName: 'vip001',
      managerPwd: 'vip1234567',
      token: 'abc1234567',
    });
  
    return { manager};
  },
  {
    persist: true,
  })