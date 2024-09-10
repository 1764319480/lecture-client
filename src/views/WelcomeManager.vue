<script setup>
import { ref, onBeforeMount } from 'vue';
const timeWord = ref('上午好');
let today;
let hour;
let timer;
const bgimg = ref();//背景图片
//改变背景图片
function changeBgimg () {
    today = new Date();
    hour = today.getHours();
    if (hour >= 4 && hour <12) {
       bgimg.value = 'morning'; 
       timeWord.value = '上午好'
    }  
    else if (hour >= 12 && hour < 19) {
       bgimg.value = 'afternoon'; 
       timeWord.value = '下午好'
    }
    else {
       bgimg.value = 'evening'; 
       timeWord.value = '晚上好'
    }
    
}
//改变显示时间
const showTime = ref('2024')
function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleString(); // 或者使用其他格式化方法
  showTime.value = timeStr;
  requestAnimationFrame(updateTime); // 递归调用以持续更新时间
}
onBeforeMount(() => {
    updateTime();
    changeBgimg();
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(changeBgimg, 1000*60);
})

</script>

<template>
    <div id="page" :class="bgimg">
        <p style="color: white; font-size: 4vmin;">&nbsp;{{ timeWord }}，管理员! 现在是:</p>
        <br>
        <p style="color: antiquewhite;">&nbsp;{{ showTime }}</p>
    </div>
</template>

<style scoped>
#page {
    width: 100%;
    height: 100%;  
}
.morning {
    background-image: url("@/assets/img/morning.jpg");
    background-size: cover;
}
.afternoon {
    background-image: url("@/assets/img/afternoon.jpg");
    background-size: cover;
}
.evening {
    background-image: url("@/assets/img/evening.jpg");
    background-size: cover;
}

</style>