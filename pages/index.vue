<script lang="ts" setup>
import ItemComponent from '~/components/item-component.vue';
import CategoryComponent from '~/components/category-component.vue';
</script>

<template>
	<el-row>
    <el-col :span="5"><ItemComponent /></el-col>
    <el-col :span="5"><CategoryComponent /></el-col>
  </el-row>
</template>

<style scoped></style>
