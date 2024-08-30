<script setup>
import managerhead from '@/assets/img/manager.jpg';
import { ref } from 'vue';
import { useManager } from '@/stores/manager';
import router from '@/router';
import { ElMessage } from 'element-plus';
// import Form from '@/components/LectureForm.vue';
// 退出登录
const centerDialogVisible = ref(false);
function logout() {
  centerDialogVisible.value = false;
  ElMessage('管理员已登出');
  sessionStorage.removeItem('supertoken');
  const timer = setTimeout(() => {
    router.push('/login');
    managerData.clear();
    clearTimeout(timer);
  }, 1000);
}
const managerData = new useManager();
// 功能区
const tree = ref(
  [
    {
      label: '讲座管理',
      children: [
        {
          label: '新增讲座',
        },
        {
          label: '删除讲座',
        },
        {
          label: '修改讲座',
        }
      ]
    },
    {
      label: '轮播图管理'
    },
    {
      label: '设置',
      children: [
        {
          label: '退出登录',
        },
        {
          label: '修改密码',
        }
      ]
    }
  ],
)
const defaultProps = ref({
  children: 'children',
  label: 'label'
})
//选中时的处理方法
const handleNodeClick = (tree) => {
  //   console.log(tree.label);
  switch (tree.label) {
    case "新增讲座": {
      router.push('/super/addLecture');
      // console.log("新增讲座")
      break
    }
    case "删除讲座": {
      router.push('/super/removeLecture');
      // console.log("删除讲座")
      break
    }
    case "修改讲座": {
      router.push('/super/changeLecture');
      // console.log("修改讲座")
      break
    }
    case "轮播图管理": {
      router.push('/super/carousel');
      // console.log("轮播图管理")
      break
    }
    case "退出登录": {
      centerDialogVisible.value = true;
      // console.log("退出登录")
      break
    }
    case "修改密码": {
      router.push('/super/changePwd');
      // console.log("修改密码")
      break
    }
  }
}
</script>

<template>
  <div id="page">
    <div id="managerInfo">
      <el-avatar :size="100" :src="managerhead" fit="cover" />
      <span id="manargerName" style="font-size: 2vw;">{{ managerData.manager.name }}</span>
    </div>
    <div id="titleName">
      <h1 style="font-family: fangsong;">后台管理系统</h1>
    </div>
    <div id="tools">
      <el-tree style="max-width: 600px" :data="tree" :props="defaultProps" @node-click="handleNodeClick" />
    </div>
    <div id="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.path" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" :key="$route.path" v-if="!$route.meta.keepAlive" />
      </router-view>
      <el-dialog v-model="centerDialogVisible" title="温馨提示" width="500" center>
        <span>
          确认退出吗？
        </span>
        <template #footer>
          <div class="dialog-footer" style="display: flex; justify-content: center;">
            <el-button @click="centerDialogVisible = false;">否</el-button>
            <el-button type="primary" @click="logout">
              是
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped>
#page {
  width: 100%;
  height: 100%;
  /* background-color: pink; */
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 1fr 5fr;
}

/* 管理员信息 */
#managerInfo {
  /* background-color: rgb(110, 110, 194); */
  border-bottom: 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-right: 1px solid black; */
}

#manegerInfo span {
  flex: 2;
  color: rgb(83, 8, 90);
  font-size: 1.5vw;
}

/* 标题 */
#titleName {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid;
  /* background-color: rgb(108, 144, 226); */
}

/* 功能区 */
#tools {
  /* background-color: rgb(110, 110, 194); */
  border-top: 20px solid white;
  border-right: 1px solid;
}
</style>