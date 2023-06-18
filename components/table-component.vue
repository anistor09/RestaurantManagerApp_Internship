<script lang="ts" setup>
import { computed } from "vue"
import { ElButton, ElCard } from 'element-plus';
import { useLanguageStore } from '../store/language';
import translations from '../mockData/translations.json';

const languageStore = useLanguageStore();

const computedLanguageId = computed(() => languageStore.idGetter);
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
			<div id="title">{{translations[computedLanguageId].table}} {{ number }}</div>
			<div id="capacity">{{ capacity }} {{translations[computedLanguageId].seats}}</div>
			<div id="QRButton">
				<el-button color="#ED5087" plain round size="large" @click="$emit('qr-code', url)"
					>{{translations[computedLanguageId].seeQrCode}}</el-button
				>
			</div>
			<div id="bottomButtons">
				<el-button color="#ED5087" plain round @click="$emit('edit', id)">{{translations[computedLanguageId].edit}}</el-button>
				<el-button color="#ED5087" plain round @click="$emit('delete', id)">{{translations[computedLanguageId].delete}}</el-button>
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
	height: 28vh;
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
	justify-content: center;
	align-items: center;
	height: 10vh;
	width: 100%;
}

#bottomButtons .el-button {
	width: 4.5vw;
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
