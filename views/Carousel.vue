<script setup>
import { useManager } from '@/stores/manager';
import { ElMessage } from 'element-plus';
import { ref } from "vue";
const managerData = new useManager();
const carousel = managerData.carousel;

// 删除图片
const lecId = ref('');
const centerDialogVisible1 = ref(false);
function chooseId (id) {
    lecId.value = id;
    centerDialogVisible1.value = true;  
}
async function deletePicture () {
    console.log(lecId.value);
    const res = await managerData.deleteCarousel(lecId.value);
    if (res) {
        centerDialogVisible1.value = false;
        await managerData.getCarousel();
        location.replace(location.href);
    } else {
        centerDialogVisible1.value = false;
    }
}
// 图片转base64
function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function() {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
// 添加图片
const dialogFormVisible = ref(false);
const imageFile = ref(null);
const newId = ref('');
async function addPicture () {
    if (newId.value == '') {
        ElMessage('请输入讲座编号');
        return;
    }
    if (imageFile.value) {
        const file = imageFile.value.files[0];
        if (file) {
            const img = await convertImageToBase64(file);
            // console.log(img);
            const res = await managerData.addCarousel(newId.value, img);
            if (res) {
                dialogFormVisible.value = false;
                await managerData.getCarousel();
                location.replace(location.href);
                newId.value = '';
                imageFile.value = null;
            }
        }
    } else {
        ElMessage('请选择图片文件');
        return;
    }
}
</script>

<template>
    <div id="page">
        <div id="content">
            <br>
            <template v-for="item in carousel" :key="item.lec_id">
                <div style=" display: flex;justify-content: space-evenly;align-items: center;">
                    <img :src="item.src" alt="图片加载失败" style="width: 15vw;">
                    <p style="font-size: 1vw;">讲座编号：{{ item.lec_id }}</p>
                    <a href="javascript:;" style="text-decoration: none;" @click="chooseId(item.lec_id)">X</a>
                    <el-dialog v-model="centerDialogVisible1" title="温馨提示" width="500" :modal="false" center>
                        <span>
                            确认删除编号为{{ lecId }}的海报吗？
                        </span>
                        <template #footer>
                            <div class="dialog-footer">
                                <el-button @click="centerDialogVisible1 = false">否</el-button>
                                <el-button type="primary" @click="deletePicture">
                                    是
                                </el-button>
                            </div>
                        </template>
                    </el-dialog>
                </div> 
                <br> 
            </template>
            <div>
                <p style="font-size: 5vh; text-align:center;" @click="dialogFormVisible = true">+</p>
                <el-dialog v-model="dialogFormVisible" title="选择讲座编号和图片" width="500">
                            <div style="border: none;">
                                讲座编号：<el-input v-model="newId"></el-input>
                            </div>
                            <div style="border: none;">
                               选择图片：<input type="file" accept="image/*" ref="imageFile">
                            </div>
                            <template #footer>
                                <div class="dialog-footer" style="display: flex; justify-content: center;">
                                    <el-button @click="dialogFormVisible = false">取消</el-button>
                                    <el-button type="primary" @click="addPicture">
                                        确认
                                    </el-button>
                                </div>
                            </template>
                        </el-dialog>
            </div>
        </div>
    </div>
</template>

<style scoped>
#content {
    height: 100%;
    width: 100%;
    /* background-color: pink; */
    border: none;
}
#content>div {
    /* background-color: pink; */
    border-bottom: 1px solid black;
    border-top: 1px solid black;
}
</style>