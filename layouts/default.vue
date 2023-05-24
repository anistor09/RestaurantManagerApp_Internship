<script setup lang="ts">
import { useRestaurantStore } from '~/store/restaurant';
const imageURL = '/_nuxt/assets/images/Logo.png';

const restaurantStore = useRestaurantStore();
await restaurantStore.getRestaurant();

const loading = computed(() => restaurantStore.loadingGetter);
</script>

<template>
	<div v-if="loading" v-loading.fullscreen.lock="true"></div>
	<div v-else>
		<el-container style="min-height: 100vh">
			<el-aside style="overflow: hidden">
				<el-menu default-active="1" text-color="white" active-text-color="black">
					<el-image :src="imageURL" />
					<el-menu-item index="1" @click="navigateTo('/')">
						<span>Home</span>
					</el-menu-item>
					<el-menu-item index="2" @click="navigateTo('/')">
						<span>Menus</span>
					</el-menu-item>
					<el-menu-item index="3" @click="navigateTo('/')">
						<span>Products</span>
					</el-menu-item>
					<el-menu-item index="4" @click="navigateTo('/tables')">
						<span>Tables</span>
					</el-menu-item>
					<el-menu-item index="5" @click="navigateTo('/')">
						<span>Help</span>
					</el-menu-item>
					<el-menu-item style="top: 15vh; left: 0%" index="6" @click="navigateTo('/settings')">
						<el-image class="icon" src="https://cdn.onlinewebfonts.com/svg/img_574534.png" />
						<span id="setting">Settings</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main style="padding: 0"><slot></slot></el-main>
		</el-container>
	</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans');
span {
	padding-left: 20%;
}
.el-menu-item {
	display: flex;
	font-size: xx-large;
	align-items: center;
	top: 10vh;
	padding-top: 20%;
	padding-bottom: 20%;
	font-family: 'Open Sans';
}
.el-menu-item:hover {
	background-color: transparent;
}

.el-menu-item.is-active {
	color: white;
	text-shadow: 3px 2px black;
}
.el-menu {
	border-right: unset;
	padding-top: 10%;
	background: rgb(255, 97, 121);
	background: linear-gradient(180deg, rgba(255, 97, 121, 1) 0%, rgba(255, 58, 113, 1) 100%);
	min-height: 100vh;
}
.el-image {
	display: grid;
	justify-content: center;
	width: auto;
	height: auto;
}
.icon {
	box-shadow: 0.1vh 0.1vw 1svh 0.2vw rgba(0, 0, 0, 0.5) !important;
	position: relative;
	border-radius: 50%;
	width: 50px;
	height: 50px;
	background-color: white;
}
#setting {
	color: white;
	font-family: 'Open Sans';
	font-size: xx-large;
	padding-left: 5%;
}
</style>
