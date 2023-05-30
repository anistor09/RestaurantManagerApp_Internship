<template></template>

<script lang="ts" setup>
definePageMeta({
	layout: 'empty',
});

onBeforeMount(async () => {
	const route = useRoute();
	const code = route.query.code;

	// Make a request to the token endpoint to exchange the code for an access token

	await useFetch('/api/auth/token', {
		method: 'POST',
		body: code,
	});

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	await sleep(400);
	navigateTo('/');
});
</script>
