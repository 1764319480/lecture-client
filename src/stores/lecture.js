import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/utils/request.js';

//讲座数据
export const useLecture = defineStore('lecture', () => {
  const key = ref();
  function setKey(keyword) {
    this.key = keyword;
  }
  // 所有讲座数据
  const lectures = ref();
  // 热门讲座
  const hotLectures = ref();
  // 清除信息
  function clear() {
    this.lectures = [];
    this.hotLectures = [];
    this.carousel = [];
  }
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
  // 获取所有讲座
  async function allLecture() {
    const res = await axios.get('/api/allLecture');
    this.lectures = res.data;
    // console.log(this.lectures);
  }
  // 获取热门讲座
  async function hotLecture() {
    const res = await axios.get('/api/hotLecture');
    this.hotLectures = res.data;
  }
  // 预约讲座
  function orderLecture(lecId, userName) {
    for (let k in this.lectures) {
      if (this.lectures[k].lec_id == lecId) {
        this.lectures[k].lec_people.push(userName);
        this.lectures[k].lec_length++;
        return true;
      }
    }
    return false;
  }
  //取消预约讲座
  function cancelLecture(lecId, userName) {
    for (let k in this.lectures) {
      if (this.lectures[k].lec_id == lecId) {
        this.lectures[k].lec_people = this.lectures[k].lec_people.filter(item => item != userName);
        this.lectures[k].lec_length--;
        return true;
      }
    }
    return false;
  }

  // 搜索讲座
  function searchLecture(keyword) {
    const searchLectures = [];
    if (isNaN(Number(keyword))) {//为名称
      for (let k of this.lectures) {
        if (k.lec_title.includes(keyword)) {
          searchLectures.push(k);
        }
      }
    } else {//为编号
      for (let k of this.lectures) {
        if (k.lec_id == keyword) {
          searchLectures.push(k);
        }
      }
    }
    return searchLectures;
  }
  // 查询讲座详情
  function getLecture(lecId) {
    for (let k of this.lectures) {
      if (k.lec_id == lecId)
        return k;
    }
    return null;
  }
  // 轮播图
  const carousel = ref();
  async function getCarousel () {
    const res = await axios.get('/api/getCarousel');
    this.carousel = res.data;
  }
  
  return {clear, carousel, getCarousel, hotLecture, hotLectures, key, allLecture, setKey, lectures, getLecture, lectureType, searchLecture, orderLecture, cancelLecture };
},
  {
    persist: true,
  })