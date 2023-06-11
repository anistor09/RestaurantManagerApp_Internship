<script lang="ts" setup>
import { defineEmits } from 'vue';

defineEmits(['closeNoName']);

const props = defineProps({
	message: String,
	
});
</script>

<template>
	
		<el-dialog  width="20%" style="border-radius: 10%">
			<div id="text" class="delete">
				Please input the name before you request an AI {{ props.message }} description.
				<div id="change-bottom-button">
					<el-button color="#ED5087" plain round @click="$emit('closeNoName')">Ok</el-button>
				</div>
			</div>
		</el-dialog>
	
</template>

<style scoped>
/* Imported font used in Figma, may be changed when we receive the brand identity docs from Ewai */
@import url('https://fonts.googleapis.com/css?family=Cairo');

* {
	font-family: 'Cairo';
}


#change-bottom-button {
	display: flex;
	padding-top: 8%;
	justify-content: center;
}

.delete {
	position: relative;
	text-align: center;
	font-size: 0.85vw;
	font-weight: 300;
	color: black;
}
</style>
