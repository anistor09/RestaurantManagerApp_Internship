<script lang="ts" setup>
import { ref } from 'vue';
const value = ref('');
defineProps({
	options: {
		type: Array as () => String[],
		required: true,
	},
});
</script>

<template>
	<el-select
		v-model="value"
		data-testid="select"
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
</style>
