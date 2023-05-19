<script lang="ts" setup>
const value = ref('');
defineProps({
	options: [],
});
</script>

<template>
	<el-select v-model="value" class="specialSelect" filterable placeholder="Select">
		<el-option v-for="item in options" :value="item" />
	</el-select>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans');
* {
	font-family: 'Open Sans';
}
</style>
