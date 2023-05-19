<script lang="ts" setup>
</script>

<template>
  <div>
    <RestaurantComponent/>
  <div><el-row>
      <el-col :span="5"><ItemComponent /></el-col>
      <el-col :span="5"><CategoryComponent /></el-col>
    </el-row></div>
  </div>
</template>

<style scoped>
.right{
  width: 100vw;
  height: 100vh;
}
</style>
