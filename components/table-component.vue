<script lang="ts" setup>
import { ElButton, ElCard } from 'element-plus';
defineProps<{
	url: String;
	number: Number;
	capacity: Number;
	id: Number;
}>();
defineEmits(['edit', 'delete', 'qr-code']);
</script>

<template>
	<el-card id="card" shadow="always" :body-style="{ padding: '0px' }">
		<div>
			<div id="title">Table {{ number }}</div>
			<div id="capacity">{{ capacity }} seats</div>
			<div id="QRButton">
				<el-button color="#ED5087" plain round size="large" @click="$emit('qr-code', url)"
					>See QR Code</el-button
				>
			</div>
			<div id="bottomButtons">
				<el-button color="#ED5087" plain round @click="$emit('edit', id)">Edit</el-button>
				<el-button color="#ED5087" plain round @click="$emit('delete', id)">Delete</el-button>
			</div>
		</div>
	</el-card>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans');

* {
	font-size: medium;
}

#card {
	border-radius: 3vw;
	width: 12vw;
	height: 13vw;
	font-family: 'Open Sans';
	border-color: #ed5087;
}

#QRButton {
	display: flex;
	justify-content: center;
	padding-top: 10%;
}

#bottomButtons {
	display: flex;
	justify-content: space-between;
	position: relative;
	width: 80%;
	left: 10%;
	top: 3.5vh;
}

#bottomButtons .el-button {
	width: 8vw;
}

#title {
	padding-top: 2%;
	font-size: 1.7vw;
	font-weight: bolder;
	text-align: center;
}

#capacity {
	line-height: 1.5;
	text-align: center;
	font-size: 1vw;
	padding: 5% 10% 3% 10%;
}

@media only screen and (max-width: 500px) {
	#card {
		border-radius: 9vw;
		width: 65vw;
		height: 78vw;
	}

	#image {
		height: 25vw;
	}

	#title {
		font-size: 1.5rem;
	}

	#capacity {
		font-size: 4vw;
	}
}
</style>
