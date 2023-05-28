<template>
	<div>
		<h1>Callback Page</h1>
	</div>
</template>

<script lang="ts" setup>
onBeforeMount(() => {
	let route = useRoute();
	let code = route.query.code;

	// Make a request to the token endpoint to exchange the code for an access token

	useFetch('/api/auth/token', {
		method: 'POST',
		body: code,
	}).then((response) => {
		console.log(response);
	});
	navigateTo('/');
});
</script>
