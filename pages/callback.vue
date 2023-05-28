<template>
	<div>
		<h1>Callback Page</h1>
	</div>
</template>

<script lang="ts" setup>
onBeforeMount(() => {
	const route = useRoute();
	const code = route.query.code;

	// Make a request to the token endpoint to exchange the code for an access token

	useFetch('/api/auth/token', {
		method: 'POST',
		body: code,
	}).then(async () => {
		const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
		await sleep(1000);
		navigateTo('/');
	});
});
</script>
