<script lang="ts" setup>
import { ElOption, ElSelect } from 'element-plus';
import { ref } from 'vue';
const value = ref('');
defineProps({
	options: Array as () => String[],
});
</script>

<template>
	<el-select
		data-testid="select"
		v-model="value"
		class="specialSelect"
		filterable
		placeholder="Select"
		clearable
	>
		<el-option v-for="item in options" :value="item" />
	</el-select>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans');
* {
	font-family: 'Open Sans';
}

.el-select .el-input__wrapper {
	font-family: 'Open Sans';
	font-size: 1.1vw;
	width: 12vw;
	font-weight: bolder;
	height: auto;
	border-radius: 30px;
}

.el-select .el-input.is-focus .el-input__wrapper {
	box-shadow: 0 0 0 1px #ed5087 inset !important;
}

.el-select .el-input.is-ac .el-input__wrapper {
	box-shadow: 0 0 0 1px #ed5087 inset !important;
}

.el-select {
	--el-select-input-focus-border-color: #ed5087;
}

.el-popper {
	border-radius: 25px;
}

.el-select-dropdown__item {
	font-family: 'Open Sans';
	font-size: 1vw;
	text-align: center;
}

.el-select-dropdown__item.selected {
	color: #ed5087;
}
</style>
