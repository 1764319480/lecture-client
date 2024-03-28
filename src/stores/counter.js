import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import headImg from '@/assets/img/user1.jpg';
 // 普通用户数据
export const useUser = defineStore('user', () => {
  const user = ref({
    userImg: headImg,
    userName: '11343245643',
    userId: '100001',
    userPwd: '12345abc',
    lec_order: ['101101'],
    lec_finish: [],
    lec_cancel: []
  });
  function changeLecture (lecId) {
    if (this.user.lec_order.includes(lecId)) {
      this.user.lec_order.pop(lecId);
    }
    else {
      this.user.lec_order.push(lecId);
    }
   
  }
  return { user, changeLecture, };
})
//讲座数据
export const useLecture = defineStore('lecture', () => {
  const lectures = ref([
    { 
      lec_title: "垃圾分类小知识",
      lec_id: '101101',
      lec_master: '李老师',
      lec_time: '2024-4-28-14:30~16:00',
      lec_place: '勤学楼201',
      lec_detail: '提升环保意识，保护环境',
      lec_type: 'protect',
      lec_num: 50,
      lec_numed: 10
    },
    { 
      lec_title: "人工智能的应用",
      lec_id: '101102',
      lec_master: '王老师',
      lec_time: '2024-3-28-9:30~11:30',
      lec_place: '笃行楼401',
      lec_detail: '本次讲座主要介绍人工智能在各领域的应用',
      lec_type: 'science',
      lec_num: 40,
      lec_numed: 40
    }
  ]);
  // 类型中英文转换
  const lectureType = ref({
    alls: '全部',
    culture: '文化',
    science: '科普',
    protect: '环保',
    academic: '学术',
    topic: '热点',
    technical: '科技',
    other: '其他'
  })
  function getLecture (lecId) {
    for (let k of this.lectures) {
      if (k.lec_id == lecId) 
        return k;
    }
    return null;
  }

  return { lectures, getLecture, lectureType };
})