<script setup>
import router from "@/router";
import { useUser } from "@/stores/counter";

const userData = useUser();
const props = defineProps({
    lectures: Array
});
// 详情跳转
function goDetail (lec_id) {
    // console.log(lec_id)
    router.push(`/lecture/${lec_id}`);
}
// console.log(props.lectures);
</script>

<template>
    <div id="page">
        <template v-for="(item) in lectures" :key="item.lec_id">
            <div id="content">
                <div style="width: 40%;">
                    <h2>{{ item.lec_title }}</h2>
                </div>
                <div>
                    <p style="color: dimgray;">举办方：{{ item.lec_master }}</p>
                </div>
                <div>
                    <el-button type="primary" @click="goDetail(item.lec_id)">详情</el-button>
                    <el-button :type="userData.user.lec_order.includes(item.lec_id)?'':'primary' " @click="userData.changeLecture(item.lec_id)" >
                        {{ userData.user.lec_order.includes(item.lec_id)?'已预约':'预约' }}
                        <!-- <p v-text="userData.user.lec_order.includes(item.lec_id)?'已预约':'预约'"></p> -->
                    </el-button>
                </div>
            </div>
        </template>
    </div>
</template>




<style scoped>
#page {
    width: 100%;
    height: auto;
    border: 1px solid;
    border-bottom: none;
}
#content {
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px dashed;
}

</style>