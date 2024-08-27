<script setup>
import { computed, ref, watch } from "vue";
import Card from '@/components/LectureCard.vue';
import { useLecture } from '@/stores/lecture';

const lectureData = useLecture();
const allLectures = lectureData.lectures;//所有讲座信息

const culture = ref(true);
const science = ref(true);
const protect = ref(true);
const academic = ref(true);
const topic = ref(true);
const technical = ref(true);
const other = ref(true);

const alls = computed({
    get: () => {
        return culture.value&&science.value&&protect.value&&academic.value&&topic.value&&technical.value&&other.value
    },
    set: (newValue) => {
       culture.value = newValue;
       science.value = newValue;
       protect.value = newValue;
       academic.value = newValue;
       topic.value = newValue;
       technical.value = newValue;
       other.value = newValue;
    }
})
// 筛选讲座
const filtLectures = ref([...allLectures]);
watch(culture, (newValue) => {
    if (!newValue) {
        const newLectures = (filtLectures.value.filter(item => item.lec_type != 'culture'));
        filtLectures.value.splice(0, filtLectures.value.length);
        filtLectures.value.push(...newLectures);
    } else {
        filtLectures.value.push(...(allLectures.filter(item => item.lec_type == 'culture')));
    }
})
watch(science, (newValue) => {
    if (!newValue) {
        const newLectures = (filtLectures.value.filter(item => item.lec_type != 'science'));
        filtLectures.value.splice(0, filtLectures.value.length);
        filtLectures.value.push(...newLectures);
    } else {
        filtLectures.value.push(...(allLectures.filter(item => item.lec_type == 'science')));
    }
})
watch(protect, (newValue) => {
    if (!newValue) {
        const newLectures = (filtLectures.value.filter(item => item.lec_type != 'protect'));
        filtLectures.value.splice(0, filtLectures.value.length);
        filtLectures.value.push(...newLectures);
    } else {
        filtLectures.value.push(...(allLectures.filter(item => item.lec_type == 'protect')));
    }
})
watch(academic, (newValue) => {
    if (!newValue) {
        const newLectures = (filtLectures.value.filter(item => item.lec_type != 'academic'));
        filtLectures.value.splice(0, filtLectures.value.length);
        filtLectures.value.push(...newLectures);
    } else {
        filtLectures.value.push(...(allLectures.filter(item => item.lec_type == 'academic')));
    }
})
watch(topic, (newValue) => {
    if (!newValue) {
        const newLectures = (filtLectures.value.filter(item => item.lec_type != 'topic'));
        filtLectures.value.splice(0, filtLectures.value.length);
        filtLectures.value.push(...newLectures);
    } else {
        filtLectures.value.push(...(allLectures.filter(item => item.lec_type == 'topic')));
    }
})
watch(technical, (newValue) => {
    if (!newValue) {
        const newLectures = (filtLectures.value.filter(item => item.lec_type != 'technical'));
        filtLectures.value.splice(0, filtLectures.value.length);
        filtLectures.value.push(...newLectures);
    } else {
        filtLectures.value.push(...(allLectures.filter(item => item.lec_type == 'technical')));
    }
})
watch(other, (newValue) => {
    if (!newValue) {
        const newLectures = (filtLectures.value.filter(item => item.lec_type != 'other'));
        filtLectures.value.splice(0, filtLectures.value.length);
        filtLectures.value.push(...newLectures);
    } else {
        filtLectures.value.push(...(allLectures.filter(item => item.lec_type == 'other')));
    }
})
</script>

<template>
    <div id="content">
        <div id="filts">
            <input type="checkbox" name="alls" id="alls" class="alls" v-model="alls">
            <label for="alls">全部</label>
            <input type="checkbox" name="culture" id="culture" v-model="culture">
            <label for="culture">文化</label>
            <input type="checkbox" name="science" id="science" v-model="science">
            <label for="science">科普</label>
            <input type="checkbox" name="protect" id="protect" v-model="protect">
            <label for="protect">环保</label>
            <input type="checkbox" name="academic" id="academic" v-model="academic">
            <label for="academic">学术</label>
            <input type="checkbox" name="topic" id="topic" v-model="topic">
            <label for="topic">热点</label>
            <input type="checkbox" name="technical" id="technical" v-model="technical">
            <label for="technical">科技</label>
            <input type="checkbox" name="other" id="other" v-model="other">
            <label for="other">其他</label>
            <!-- <template v-for="item in checkboxs" :key="item.name">
            <input class="sign" type="checkbox" :name="item.name" :id="item.name" checked="checked" @change="changeOnly">
            <label :for="item.name">{{ item.label }}</label>
            </template> -->
        </div>
        <br>
        <div id="filtLectures">
            <Card :lectures="filtLectures"></Card>
        </div>
    </div>
</template>

<style scoped>
#content {
    /* background-color: pink; */
    flex: 2;
    width: 70%;
}
#filtLectures {
    width: 100%;
    height: 100%;
    /* background-color: blue; */
}
</style>