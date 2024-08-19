<script setup>
import Form from '@/components/LectureForm.vue';
</script>

<template>
<div id="page">
    <h2>添加讲座</h2>
    <div id="content">
        <Form :alecture="{}">添加</Form>
    </div>  
</div>
</template>

<style scoped>
#page {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
}
</style>