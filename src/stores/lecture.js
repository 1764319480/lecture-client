import { ref } from 'vue'
import { defineStore } from 'pinia'
import lecture1 from '@/resource/lecture1.png';//测试
import lecture2 from '@/resource/lecture2.jpg';//测试
import lecture3 from '@/resource/lecture3.jpg';//测试
import lecture4 from '@/resource/lecture4.jpg';//测试
import axios from '@/utils/request.js';

//讲座数据
export const useLecture = defineStore('lecture', () => {
    const key = ref();
    function setKey (keyword) {
      this.key = keyword;
    }
    // 所有讲座数据
    const lectures = ref();
    // 热门讲座
    const hotLectures = ref();
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
    async function allLecture () {
      const res = await axios.get('/api/allLecture');
      this.lectures = res.data;
      // console.log(this.lectures);
    }
    // 获取热门讲座
    async function hotLecture () {
      const res = await axios.get('/api/hotLecture');
      this.hotLectures = res.data;
    }
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
    const carousel = ref([
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
    return { carousel, hotLecture, hotLectures, key, allLecture, setKey, lectures, getLecture, lectureType, searchLecture, orderLecture, cancelLecture };
  },
  {
    persist: true,
  })