import { ref } from 'vue'
import { defineStore } from 'pinia'
import headImg from '@/assets/img/head.png';//测试头像，以后删
import lecture1 from '@/resource/lecture1.png';//测试
import lecture2 from '@/resource/lecture2.jpg';//测试
import lecture3 from '@/resource/lecture3.jpg';//测试
import lecture4 from '@/resource/lecture4.jpg';//测试
import axios from '@/utils/request.js';

 // 普通用户数据
export const useUser = defineStore('user', () => {
  // 用户信息
  const user = ref({
    userImg: headImg,
    userName: '15986906128',
    // userId: '100001',
    userPwd: '15986906128',
    lec_order: ['101103', '101105'],
    lec_finish: ['101107'],
    lec_timeout: ['101102'],
    token: '20abcdefg'
  });
  //登录
  async function login (userName, userPwd) {
    const res = await axios.post('/api/login', {
      userName,
      userPwd
    });
  console.log(res.data);
  }
  // 注册，功能后续调后端
  function setUser (account, pwd) {
    this.user.userName = account;
    this.user.userPwd = pwd;
  }
  // 登录页直接跳转到详情页
  const detailPath = ref();
  function setDetailPath (query_id) {
    this.detailPath = query_id;
  }
  // 修改头像
  function changeHeadImg (imgSrc) {
    this.user.userImg = imgSrc;
  }
  // 修改密码
  function changePwd (pwd) {
    this.user.userPwd = pwd;
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
  return { user, changeLecture, changeHeadImg, detailPath, setDetailPath, changePwd, setUser, login};
})

//讲座数据
export const useLecture = defineStore('lecture', () => {
  const key = ref();
  function setKey (keyword) {
    this.key = keyword;
  }
  const lectures = ref([
    { 
      lec_title: "垃圾分类小知识",
      lec_id: '101101',
      lec_master: '李老师',
      lec_time: '2024-4-28-14:30~16:00',
      lec_place: '勤学楼201',
      lec_detail: '提升环保意识，保护环境。',
      lec_type: 'protect',
      lec_status: 0,//1 报名中；0 进行中；-1 已完结
      lec_num: 50,
      lec_people: ['13645783946', '13648766346', '12537466348'],
      lec_sign: '123456'//签到码
    },
    { 
      lec_title: "人工智能的应用",
      lec_id: '101102',
      lec_master: '王老师',
      lec_time: '2024-3-28-9:30~11:30',
      lec_place: '笃行楼401',
      lec_detail: '本次讲座主要介绍人工智能在各领域的应用。',
      lec_type: 'technical',
      lec_status: -1,
      lec_num: 30,
      lec_people: ['15986906128', '13645783946', '13648766347', '12526466348', '18423644876', '13734688345', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
      lec_sign: '234567'
    },
    { 
      lec_title: "法律讲座",
      lec_id: '101103',
      lec_master: '张三',
      lec_time: '2024-5-02-14:00~15:00',
      lec_place: '拓新楼101',
      lec_detail: '知名律师张三为同学们普法,讲座将结合经典案例介绍常用的维权方法。',
      lec_type: 'science',
      lec_status: 1,
      lec_num: 100,
      lec_people: ['15986906128', '13615723946', '13648764347', '12424466348', '14423644876', '14734648345'],
      lec_sign: '234562'
    },
    { 
      lec_title: "中医养生课堂讲座",
      lec_id: '101104',
      lec_master: '李医生',
      lec_time: '2024-4-30-16:30~18:00',
      lec_place: '笃行楼310',
      lec_detail: '本次讲座将介绍养生相关知识，提倡健康的生活方式。',
      lec_type: 'other',
      lec_status: 1,
      lec_num: 150,
      lec_people: ['13245283946', '12522466348', '12423624876', '13724628345'],
      lec_sign: '124572'
    },
    { 
      lec_title: "国际脑科科学研究大会",
      lec_id: '101105',
      lec_master: '王教授',
      lec_time: '2024-5-10-09:00~11:30',
      lec_place: '勤学楼101',
      lec_detail: '在当前脑科学研究中,最具意义的研究领域之一是对人类认知的研究。这一领域的研究旨在深入了解人类认知过程中的基本要素和机制,以及不同认知能力之间的关系和差异。',
      lec_type: 'academic',
      lec_status: 1,
      lec_num: 200,
      lec_people: ['15986906128', '13245682946', '13628666247', '12526466348', '18222644876', '13234288345'],
      lec_sign: '785677'
    },
    { 
      lec_title: "道德讲座",
      lec_id: '101106',
      lec_master: '谢教授',
      lec_time: '2024-5-14-14:00~16:00',
      lec_place: '笃行楼208',
      lec_detail: '相见及待人真诚而友善，帮助别人快乐自己。道德是发展先进文化,构成人类文明,特别是精神文明的重要内容。',
      lec_type: 'culture',
      lec_status: 1,
      lec_num: 100,
      lec_people: ['16645743976', '16648767347', '16527466348', '16474644876', '16774488345'],
      lec_sign: '228905'
    },
    { 
      lec_title: "就业形势分析讲座",
      lec_id: '101107',
      lec_master: '曾老师',
      lec_time: '2024-3-14-08:00~09:00',
      lec_place: '笃行楼403',
      lec_detail: '分析当前就业形势，解决就业过程中可能遇到的一系列问题。',
      lec_type: 'topic',
      lec_status:-1,
      lec_num: 80,
      lec_people: ['15986906128', '16645743976', '16648767347', '16527466348', '16474644876', '16774488345', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
      lec_sign: '112233'
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
  // 预约讲座
  function orderLecture (lecId, userName) {
    for (let k in this.lectures) {
      if (this.lectures[k].lec_id == lecId) {
        if (this.lectures[k].lec_people.length < this.lectures[k].lec_num) {
          this.lectures[k].lec_people.push(userName);
          return true;
        }
      }
    }
    return false;
  }
  //取消预约讲座
  function cancelLecture (lecId, userName) {
    for (let k in this.lectures) {
      if (this.lectures[k].lec_id == lecId) {
        this.lectures[k].lec_people = this.lectures[k].lec_people.filter(item => item != userName);
        return true;
      } 
    }
    return false;
  }
 
  // 搜索讲座
  function searchLecture (keyword) {
    const searchLectures = [];
    if (isNaN(Number(keyword))) {//为名称
      for (let k of this.lectures) {
        if (k.lec_title.includes(keyword)) {
          searchLectures.push(k);
        }
      }
    }else {//为编号
      for (let k of this.lectures) {
        if (k.lec_id == keyword) {
          searchLectures.push(k);
        }
      }
    }
    return searchLectures;
  }
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
  return { key, setKey, lectures, getLecture, lectureType, hotLecture, searchLecture, orderLecture, cancelLecture };
})
// 管理员信息
export const useManeger = defineStore('maneger', () => {
  const maneger = ref({
    manegerName: 'vip001',
    manegerPwd: 'vip1234567',
    token: 'abc1234567',
  });

  return { maneger};
})