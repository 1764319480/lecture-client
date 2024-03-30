import { ref } from 'vue'
import { defineStore } from 'pinia'
import headImg from '@/assets/img/user1.jpg';//测试头像，以后删
import lecture1 from '@/resource/lecture1.png';//测试
import lecture2 from '@/resource/lecture2.jpg';//测试
import lecture3 from '@/resource/lecture3.jpg';//测试
import lecture4 from '@/resource/lecture4.jpg';//测试

 // 普通用户数据
export const useUser = defineStore('user', () => {
  const user = ref({
    userImg: headImg,
    userName: '15986906128',
    // userId: '100001',
    userPwd: '15986906128',
    lec_order: ['101101'],
    lec_finish: [],
    lec_cancel: [],
    token: ''
  });
  function changeLecture (lecId) {
    if (this.user.lec_order.includes(lecId)) {
      this.user.lec_order.pop(lecId);
    }
    else {
      this.user.lec_order.push(lecId);
    }
   
  }
  return { user, changeLecture };
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
      lec_detail: '提升环保意识，保护环境。',
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
      lec_detail: '本次讲座主要介绍人工智能在各领域的应用。',
      lec_type: 'technical',
      lec_num: 40,
      lec_numed: 40
    },
    { 
      lec_title: "法律讲座",
      lec_id: '101103',
      lec_master: '张三',
      lec_time: '2024-5-02-14:00~15:00',
      lec_place: '拓新楼101',
      lec_detail: '知名律师张三为同学们普法,讲座将结合经典案例介绍常用的维权方法。',
      lec_type: 'science',
      lec_num: 100,
      lec_numed: 0
    },
    { 
      lec_title: "中医养生课堂讲座",
      lec_id: '101104',
      lec_master: '李医生',
      lec_time: '2024-4-30-16:30~18:00',
      lec_place: '笃行楼310',
      lec_detail: '本次讲座将介绍养生相关知识，提倡健康的生活方式。',
      lec_type: 'other',
      lec_num: 150,
      lec_numed: 66
    },
    { 
      lec_title: "国际脑科科学研究大会",
      lec_id: '101105',
      lec_master: '王教授',
      lec_time: '2024-5-10-09:00~11:30',
      lec_place: '勤学楼101',
      lec_detail: '在当前脑科学研究中,最具意义的研究领域之一是对人类认知的研究。这一领域的研究旨在深入了解人类认知过程中的基本要素和机制,以及不同认知能力之间的关系和差异。',
      lec_type: 'academic',
      lec_num: 200,
      lec_numed: 124
    },
    { 
      lec_title: "道德讲座",
      lec_id: '101106',
      lec_master: '谢教授',
      lec_time: '2024-5-14-14:00~16:00',
      lec_place: '笃行楼208',
      lec_detail: '相见及待人真诚而友善，帮助别人快乐自己。道德是发展先进文化,构成人类文明,特别是精神文明的重要内容。',
      lec_type: 'culture',
      lec_num: 100,
      lec_numed: 55
    },
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
  // 查询讲座详情
  function getLecture (lecId) {
    for (let k of this.lectures) {
      if (k.lec_id == lecId) 
        return k;
    }
    return null;
  }
  // 轮播图
  const hotLecture = ref([
    {
      src: lecture1,
      lec_id: '101103'
    },
    {
      src: lecture2,
      lec_id: '101104'
    },
    {
      src: lecture3,
      lec_id: '101105'
    },
    {
      src: lecture4,
      lec_id: '101106'
    },
  ]);
  return { lectures, getLecture, lectureType, hotLecture };
})