<script setup>
import { ref, onBeforeMount } from 'vue';
let today;
let hour;
let timer;
const bgimg = ref();
function changeBgimg () {
    today = new Date();
    hour = today.getHours();
    if (hour >= 4 && hour <12) bgimg.value = 'morning';
    else if (hour >= 12 && hour < 19) bgimg.value = 'afternoon';
    else bgimg.value = 'evening';
}
onBeforeMount(() => {
    changeBgimg();
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(changeBgimg, 1000*60);
})

</script>

<template>
    <div id="page" :class="bgimg">
    </div>
</template>

<style scoped>
#page {
    width: 100%;
    height: 100%;  
}
.morning {
    background-image: url("@/assets/img/morning.png");
    background-size: cover;
}
.afternoon {
    background-image: url("@/assets/img/afternoon.png");
    background-size: cover;
}
.evening {
    background-image: url("@/assets/img/evening.png");
    background-size: cover;
}

</style>